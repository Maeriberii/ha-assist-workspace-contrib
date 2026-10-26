"""Bridge Workspace turns to public Home Assistant conversation APIs."""

from __future__ import annotations

import asyncio
from collections.abc import Awaitable, Callable
from dataclasses import asdict, is_dataclass
from time import monotonic
from typing import Any, cast

from homeassistant.components import conversation
from homeassistant.components.conversation.agent_manager import async_get_agent
from homeassistant.components.conversation.chat_log import AssistantContent, UserContent
from homeassistant.helpers.chat_session import async_get_chat_session

from .models import (
    ToolExecution,
    ToolStatus,
    WorkspaceConversation,
    new_message,
    serialize_message,
    serialize_summary,
    serialize_tool,
    utcnow,
)
from .redaction import bounded

EventCallback = Callable[[dict[str, Any]], None]
PersistCallback = Callable[[], Awaitable[None]]


def agent_available(hass: Any, agent_id: str) -> bool:
    """Return whether the saved, server-selected agent still exists."""
    return async_get_agent(hass, agent_id) is not None


def _as_mapping(value: Any) -> dict[str, Any]:
    if isinstance(value, dict):
        return value
    if is_dataclass(value):
        return asdict(cast(Any, value))
    return {
        key: getattr(value, key)
        for key in ("id", "tool_name", "tool_args", "name", "arguments")
        if hasattr(value, key)
    }


def _tool_from_call(call: Any) -> ToolExecution:
    data = _as_mapping(call)
    return ToolExecution(
        id=str(data.get("id") or data.get("tool_call_id") or data.get("tool_name") or "tool"),
        name=str(data.get("tool_name") or data.get("name") or "tool"),
        request=bounded(data.get("tool_args") or data.get("arguments") or data),
        started_at=utcnow(),
    )


def _restore_visible(chat_log: Any, item: WorkspaceConversation) -> None:
    """Restore semantic visible history only; no native/thinking/tool payloads."""
    if len(chat_log.content) > 1:
        return
    for message in item.messages:
        if message.role == "user":
            chat_log.async_add_user_content(UserContent(content=message.visible_content))
        elif message.role == "assistant" and message.visible_content:
            chat_log.async_add_assistant_content_without_tools(
                AssistantContent(agent_id=item.agent_id, content=message.visible_content)
            )


async def async_run_turn(
    hass: Any,
    item: WorkspaceConversation,
    text: str,
    context: Any,
    emit: EventCallback,
    persist_accepted: PersistCallback | None = None,
) -> None:
    """Run a turn and normalize all public ChatLog delta forms."""
    user = new_message("user", text)
    item.messages.append(user)
    if item.title == "New chat":
        item.title = " ".join(text.split())[:160] or "New chat"
    active = new_message("assistant", "", status="running")
    item.messages.append(active)
    turn_assistant_messages = [active]
    if persist_accepted:
        await persist_accepted()
    emit(
        {
            "event": "turn_started",
            "user_message": user.id,
            "assistant_message": active.id,
            "summary": serialize_summary(item),
        }
    )

    tools: dict[str, ToolExecution] = {}
    started: dict[str, float] = {}
    boundary_seen = False
    visible_text_seen = False

    def make_assistant() -> None:
        nonlocal active
        active = new_message("assistant", "", status="running")
        item.messages.append(active)
        turn_assistant_messages.append(active)

    def finalize_tools(status: ToolStatus) -> None:
        finished_at = utcnow()
        for tool in tools.values():
            if tool.status != "running":
                continue
            tool.status = status
            tool.finished_at = finished_at
            tool.duration_ms = round((monotonic() - started[tool.id]) * 1000)

    def terminal_messages() -> list[dict[str, Any]]:
        return [serialize_message(message) for message in turn_assistant_messages]

    def add_text(piece: Any) -> None:
        nonlocal visible_text_seen
        if isinstance(piece, str) and piece:
            visible_text_seen = True
            active.visible_content += piece
            emit({"event": "assistant_delta", "message_id": active.id, "delta": piece})

    def add_tools(calls: Any) -> None:
        for call in calls or []:
            tool = _tool_from_call(call)
            if tool.id in tools:
                continue
            tools[tool.id] = tool
            started[tool.id] = monotonic()
            active.tool_executions.append(tool)
            emit({"event": "tool_started", "message_id": active.id, "tool": serialize_tool(tool)})

    def finish_tool(delta: dict[str, Any]) -> None:
        tool_id = str(delta.get("tool_call_id") or delta.get("tool_name") or "tool")
        tool = tools.get(tool_id)
        if tool is None:
            tool = ToolExecution(
                id=tool_id, name=str(delta.get("tool_name") or "tool"), started_at=utcnow()
            )
            tools[tool_id] = tool
            started[tool_id] = monotonic()
            active.tool_executions.append(tool)
        tool.response = bounded(delta.get("tool_result"))
        tool.finished_at = utcnow()
        tool.duration_ms = round((monotonic() - started[tool_id]) * 1000)
        tool.status = "completed"
        emit({"event": "tool_finished", "message_id": active.id, "tool": serialize_tool(tool)})

    def on_delta(_chat_log: Any, raw_delta: dict[str, Any]) -> None:
        nonlocal boundary_seen
        delta = dict(raw_delta)
        role = delta.get("role")
        if role == "tool_result":
            finish_tool(delta)
            return
        if role not in (None, "assistant"):
            return
        if role == "assistant":
            if boundary_seen and (active.visible_content or active.tool_executions):
                make_assistant()
            boundary_seen = True
        add_text(delta.get("content"))
        thinking = delta.get("thinking_content")
        if isinstance(thinking, str) and thinking:
            # Ephemeral only: reasoning is never written to Workspace history.
            emit({"event": "assistant_thinking", "message_id": active.id, "delta": thinking})
        add_tools(delta.get("tool_calls"))

    try:
        with (
            async_get_chat_session(hass, item.ha_conversation_id) as session,
            conversation.async_get_chat_log(
                hass, session, chat_log_delta_listener=on_delta
            ) as chat_log,
        ):
            _restore_visible(chat_log, item)
            result = await conversation.async_converse(
                hass=hass,
                text=text,
                conversation_id=item.ha_conversation_id,
                context=context,
                language=hass.config.language,
                agent_id=item.agent_id,
            )
            response_text = result.response.speech.get("plain", {}).get("speech", "")
            if response_text and not visible_text_seen:
                add_text(response_text)
        for message in turn_assistant_messages:
            if message.status == "running":
                message.status = "completed"
        finalize_tools("completed")
        active.status = "completed"
        if persist_accepted:
            await persist_accepted()
        emit(
            {
                "event": "turn_completed",
                "messages": terminal_messages(),
                "summary": serialize_summary(item),
            }
        )
    except asyncio.CancelledError:
        for message in turn_assistant_messages:
            if message.status == "running":
                message.status = "stopped"
        finalize_tools("cancelled")
        if persist_accepted:
            await persist_accepted()
        emit(
            {
                "event": "turn_stopped",
                "messages": terminal_messages(),
                "summary": serialize_summary(item),
            }
        )
        raise
    except Exception as err:  # noqa: BLE001 - provider failures become a turn outcome.
        for message in turn_assistant_messages:
            if message.status == "running":
                message.status = "failed"
        finalize_tools("failed")
        error_text = str(err)
        if len(error_text) > 512:
            error_text = f"{error_text[:509]}..."
        if persist_accepted:
            await persist_accepted()
        emit(
            {
                "event": "turn_failed",
                "messages": terminal_messages(),
                "error": error_text,
                "summary": serialize_summary(item),
            }
        )
