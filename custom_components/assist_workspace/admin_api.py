"""Admin-only WebSocket API: review other users' chats (parental control).

Every command needs an HA administrator. Looking at another user's chats can be
switched off in the integration options, and each look is written to an access
log that the admin page shows (and that the affected users are told exists).
"""

from __future__ import annotations

import functools

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .conversation_runner import agent_available
from .models import serialize_detail, serialize_summary
from .settings import get_settings

REMOVED_USER = "Removed user"


def _store(hass):
    return hass.data[DOMAIN]["store"]


def _requires_runtime(func):
    @functools.wraps(func)
    async def wrapper(hass, connection, msg):
        if DOMAIN not in hass.data:
            connection.send_error(
                msg["id"], websocket_api.ERR_NOT_FOUND, "Assist Workspace is not loaded"
            )
            return
        await func(hass, connection, msg)

    return wrapper


def _view_allowed(hass, connection, msg) -> bool:
    if get_settings(hass).admin_can_view:
        return True
    connection.send_error(
        msg["id"],
        websocket_api.ERR_NOT_ALLOWED,
        "Reviewing other users' chats is turned off in the Assist Workspace options",
    )
    return False


async def _user_name(hass: HomeAssistant, user_id: str) -> str:
    user = await hass.auth.async_get_user(user_id)
    return user.name if user and user.name else REMOVED_USER


async def _log(hass, connection, owner_id: str, action: str, item=None) -> None:
    _store(hass).log_access(
        {
            "admin_id": connection.user.id,
            "admin_name": connection.user.name,
            "owner_id": owner_id,
            "owner_name": await _user_name(hass, owner_id),
            "conversation_id": item.id if item else None,
            "title": item.title if item else None,
            "action": action,
        }
    )


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "assist_workspace/admin/overview"})
@websocket_api.async_response
@_requires_runtime
async def ws_overview(hass, connection, msg):
    store = _store(hass)
    stats = store.owner_stats()
    users = [user for user in await hass.auth.async_get_users() if not user.system_generated]
    known = {user.id for user in users}
    rows = [
        {
            "id": user.id,
            "name": user.name,
            "is_admin": user.is_admin,
            "is_active": user.is_active,
            "removed": False,
            "conversation_count": stats.get(user.id, {}).get("count", 0),
            "last_activity": stats.get(user.id, {}).get("last"),
            "forced_agent_id": store.forced_agent(user.id),
        }
        for user in users
    ]
    rows += [
        {
            "id": owner,
            "name": REMOVED_USER,
            "is_admin": False,
            "is_active": False,
            "removed": True,
            "conversation_count": row["count"],
            "last_activity": row["last"],
            "forced_agent_id": None,
        }
        for owner, row in stats.items()
        if owner not in known
    ]
    connection.send_result(
        msg["id"],
        {
            "enabled": get_settings(hass).admin_can_view,
            "users": rows,
            "log": store.access_log[:50],
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "assist_workspace/admin/conversations", vol.Required("user_id"): str}
)
@websocket_api.async_response
@_requires_runtime
async def ws_conversations(hass, connection, msg):
    if not _view_allowed(hass, connection, msg):
        return
    await _log(hass, connection, msg["user_id"], "list")
    items = _store(hass).list_for_admin(msg["user_id"])
    connection.send_result(msg["id"], {"conversations": [serialize_summary(x) for x in items]})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "assist_workspace/admin/conversation/get",
        vol.Required("conversation_id"): str,
    }
)
@websocket_api.async_response
@_requires_runtime
async def ws_get(hass, connection, msg):
    if not _view_allowed(hass, connection, msg):
        return
    item = _store(hass).get_any(msg["conversation_id"])
    if item is None:
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Conversation not found")
        return
    await _log(hass, connection, item.owner_user_id, "view", item)
    connection.send_result(
        msg["id"],
        {
            **serialize_detail(item),
            "owner_id": item.owner_user_id,
            "owner_name": await _user_name(hass, item.owner_user_id),
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "assist_workspace/admin/conversation/delete",
        vol.Required("conversation_id"): str,
    }
)
@websocket_api.async_response
@_requires_runtime
async def ws_delete(hass, connection, msg):
    if not _view_allowed(hass, connection, msg):
        return
    store = _store(hass)
    item = store.get_any(msg["conversation_id"])
    if item is None:
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Conversation not found")
        return
    task_info = hass.data[DOMAIN]["tasks"].pop(item.id, None)
    if task_info:
        task_info["task"].cancel()
    await _log(hass, connection, item.owner_user_id, "delete", item)
    await store.delete_any(item.id)
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "assist_workspace/admin/user/clear", vol.Required("user_id"): str}
)
@websocket_api.async_response
@_requires_runtime
async def ws_clear_user(hass, connection, msg):
    if not _view_allowed(hass, connection, msg):
        return
    await _log(hass, connection, msg["user_id"], "delete_all")
    deleted = await _store(hass).delete_all(msg["user_id"], set(hass.data[DOMAIN]["tasks"]))
    connection.send_result(msg["id"], {"deleted": deleted})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "assist_workspace/admin/user/set_agent",
        vol.Required("user_id"): str,
        vol.Required("agent_id"): vol.Any(None, str),
    }
)
@websocket_api.async_response
@_requires_runtime
async def ws_set_agent(hass, connection, msg):
    """Pin a user to one assistant (empty/None removes the restriction)."""
    agent_id = msg["agent_id"] or None
    if agent_id and not agent_available(hass, agent_id):
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Assistant unavailable")
        return
    await _store(hass).set_forced_agent(msg["user_id"], agent_id)
    connection.send_result(msg["id"], {"forced_agent_id": agent_id})


def async_register(hass: HomeAssistant) -> None:
    for command in (ws_overview, ws_conversations, ws_get, ws_delete, ws_clear_user, ws_set_agent):
        websocket_api.async_register_command(hass, command)
