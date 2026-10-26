"""Authenticated narrow WebSocket API for Assist Workspace."""

from __future__ import annotations

import asyncio

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import DOMAIN, MAX_SEARCH_QUERY_LENGTH, MAX_TEXT_LENGTH, MAX_TITLE_LENGTH
from .conversation_runner import agent_available, async_run_turn
from .models import (
    new_conversation,
    serialize_detail,
    serialize_search_hit,
    serialize_summary,
)


def _owner(connection) -> str:
    return connection.user.id


def _store(hass):
    return hass.data[DOMAIN]["store"]


def _owned_or_error(hass, connection, msg):
    item = _store(hass).owned(_owner(connection), msg["conversation_id"])
    if item is None:
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Conversation not found")
    return item


@websocket_api.websocket_command({vol.Required("type"): "assist_workspace/conversation/list"})
@websocket_api.async_response
async def ws_list(hass, connection, msg):
    connection.send_result(
        msg["id"],
        {"conversations": [serialize_summary(x) for x in _store(hass).list(_owner(connection))]},
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "assist_workspace/conversation/search",
        vol.Required("query"): vol.All(str, vol.Length(min=1, max=MAX_SEARCH_QUERY_LENGTH)),
    }
)
@websocket_api.async_response
async def ws_search(hass, connection, msg):
    connection.send_result(
        msg["id"],
        {
            "hits": [
                serialize_search_hit(hit)
                for hit in _store(hass).search(_owner(connection), msg["query"])
            ]
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "assist_workspace/conversation/get",
        vol.Required("conversation_id"): str,
    }
)
@websocket_api.async_response
async def ws_get(hass, connection, msg):
    if item := _owned_or_error(hass, connection, msg):
        connection.send_result(msg["id"], serialize_detail(item))


@websocket_api.websocket_command(
    {vol.Required("type"): "assist_workspace/conversation/create", vol.Required("agent_id"): str}
)
@websocket_api.async_response
async def ws_create(hass, connection, msg):
    if not agent_available(hass, msg["agent_id"]):
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Assistant unavailable")
        return
    item = new_conversation(_owner(connection), msg["agent_id"])
    await _store(hass).add(item)
    connection.send_result(msg["id"], serialize_detail(item))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "assist_workspace/conversation/rename",
        vol.Required("conversation_id"): str,
        vol.Required("title"): vol.All(str, vol.Length(min=1, max=MAX_TITLE_LENGTH)),
    }
)
@websocket_api.async_response
async def ws_rename(hass, connection, msg):
    if item := _owned_or_error(hass, connection, msg):
        item.title = msg["title"].strip()
        await _store(hass).touch(item)
        connection.send_result(msg["id"], serialize_summary(item))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "assist_workspace/conversation/delete",
        vol.Required("conversation_id"): str,
    }
)
@websocket_api.async_response
async def ws_delete(hass, connection, msg):
    # Authorize before touching the task registry.  Conversation ids are
    # opaque, but a caller must never be able to cancel another user's turn
    # merely by knowing its id.
    if _owned_or_error(hass, connection, msg) is None:
        return
    task_info = hass.data[DOMAIN]["tasks"].pop(msg["conversation_id"], None)
    if task_info:
        task_info["task"].cancel()
    if not await _store(hass).delete(_owner(connection), msg["conversation_id"]):
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Conversation not found")
        return
    connection.send_result(msg["id"])


@websocket_api.websocket_command(
    {
        vol.Required("type"): "assist_workspace/turn/run",
        vol.Required("conversation_id"): str,
        vol.Required("text"): vol.All(str, vol.Length(min=1, max=MAX_TEXT_LENGTH)),
        vol.Required("turn_id"): vol.All(str, vol.Length(min=1, max=128)),
    }
)
@websocket_api.async_response
async def ws_run(hass, connection, msg):
    item = _owned_or_error(hass, connection, msg)
    if item is None:
        return
    if not agent_available(hass, item.agent_id):
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Assistant unavailable")
        return
    tasks = hass.data[DOMAIN]["tasks"]
    if msg["conversation_id"] in tasks:
        connection.send_error(
            msg["id"], websocket_api.ERR_NOT_ALLOWED, "Conversation already running"
        )
        return

    def emit(event):
        connection.send_event(
            msg["id"],
            {
                **event,
                "conversation_id": msg["conversation_id"],
                "turn_id": msg["turn_id"],
                "text": msg["text"] if event.get("event") == "turn_started" else None,
            },
        )

    async def runner():
        await start_gate.wait()
        try:
            await async_run_turn(
                hass,
                item,
                msg["text"],
                connection.context(msg),
                emit,
                lambda: _store(hass).touch(item),
            )
        finally:
            tasks.pop(msg["conversation_id"], None)

    start_gate = asyncio.Event()
    task = hass.async_create_task(runner())
    tasks[msg["conversation_id"]] = {"task": task, "turn_id": msg["turn_id"]}

    def cancel():
        if not task.done():
            task.cancel()

    connection.subscriptions[msg["id"]] = cancel
    try:
        connection.send_result(msg["id"])
    finally:
        start_gate.set()


@websocket_api.websocket_command(
    {
        vol.Required("type"): "assist_workspace/turn/cancel",
        vol.Required("conversation_id"): str,
        vol.Required("turn_id"): vol.All(str, vol.Length(min=1, max=128)),
    }
)
@websocket_api.async_response
async def ws_cancel(hass, connection, msg):
    """Cancel only the caller's current turn for an owned conversation."""
    item = _owned_or_error(hass, connection, msg)
    if item is None:
        return
    task_info = hass.data[DOMAIN]["tasks"].get(msg["conversation_id"])
    if task_info is None or task_info["turn_id"] != msg["turn_id"] or task_info["task"].done():
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Turn not running")
        return
    task_info["task"].cancel()
    connection.send_result(msg["id"])


def async_register(hass: HomeAssistant) -> None:
    for command in (ws_list, ws_search, ws_get, ws_create, ws_rename, ws_delete, ws_run, ws_cancel):
        websocket_api.async_register_command(hass, command)
