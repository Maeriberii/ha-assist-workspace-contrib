"""Durable, provider-neutral Assist Workspace models."""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any, Literal
from uuid import uuid4

from homeassistant.util import dt as dt_util

from .const import WORKSPACE_CONVERSATION_PREFIX

Role = Literal["user", "assistant"]
Status = Literal["completed", "running", "failed", "stopped", "interrupted"]
ToolStatus = Literal["running", "completed", "cancelled", "failed"]
CURRENT_CONVERSATION_SCHEMA_VERSION = 1


def utcnow() -> str:
    return dt_util.utcnow().isoformat()


@dataclass(slots=True)
class ToolExecution:
    id: str
    name: str
    status: ToolStatus = "running"
    request: Any = None
    response: Any = None
    started_at: str | None = None
    finished_at: str | None = None
    duration_ms: int | None = None
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass(slots=True)
class Message:
    id: str
    role: Role
    visible_content: str
    created_at: str = field(default_factory=utcnow)
    status: Status = "completed"
    tool_executions: list[ToolExecution] = field(default_factory=list)
    retry_of: str | None = None


@dataclass(slots=True)
class WorkspaceConversation:
    id: str
    owner_user_id: str
    agent_id: str
    title: str = "New chat"
    created_at: str = field(default_factory=utcnow)
    updated_at: str = field(default_factory=utcnow)
    messages: list[Message] = field(default_factory=list)
    schema_version: int = CURRENT_CONVERSATION_SCHEMA_VERSION

    @property
    def ha_conversation_id(self) -> str:
        return f"{WORKSPACE_CONVERSATION_PREFIX}{self.id}"


def new_conversation(owner_user_id: str, agent_id: str) -> WorkspaceConversation:
    return WorkspaceConversation(id=uuid4().hex, owner_user_id=owner_user_id, agent_id=agent_id)


def new_message(
    role: Role, content: str, *, status: Status = "completed", retry_of: str | None = None
) -> Message:
    return Message(
        id=uuid4().hex, role=role, visible_content=content, status=status, retry_of=retry_of
    )


@dataclass(slots=True)
class SearchHit:
    conversation: WorkspaceConversation
    match_type: Literal["title", "message"]
    highlight_ranges: list[dict[str, int]]
    message_id: str | None = None
    snippet: str | None = None


def serialize_record(conversation: WorkspaceConversation) -> dict[str, Any]:
    """Serialize the current persisted record, including ownership metadata."""
    return asdict(conversation)


def serialize_summary(conversation: WorkspaceConversation) -> dict[str, Any]:
    """Serialize compact public history metadata without messages or owner data."""
    return {
        "id": conversation.id,
        "agent_id": conversation.agent_id,
        "title": conversation.title,
        "created_at": conversation.created_at,
        "updated_at": conversation.updated_at,
        "message_count": len(conversation.messages),
    }


def serialize_tool(tool: ToolExecution) -> dict[str, Any]:
    """Serialize the public tool DTO without leaking future private fields."""
    return {
        "id": tool.id,
        "name": tool.name,
        "status": tool.status,
        "request": tool.request,
        "response": tool.response,
        "started_at": tool.started_at,
        "finished_at": tool.finished_at,
        "duration_ms": tool.duration_ms,
        "metadata": tool.metadata,
    }


def serialize_message(message: Message) -> dict[str, Any]:
    """Serialize the public message DTO with its bounded tool diagnostics."""
    return {
        "id": message.id,
        "role": message.role,
        "visible_content": message.visible_content,
        "created_at": message.created_at,
        "status": message.status,
        "tool_executions": [serialize_tool(tool) for tool in message.tool_executions],
        "retry_of": message.retry_of,
    }


def serialize_detail(conversation: WorkspaceConversation) -> dict[str, Any]:
    """Serialize the public full-detail DTO without persistence-only fields."""
    return {
        **serialize_summary(conversation),
        "messages": [serialize_message(message) for message in conversation.messages],
    }


def serialize_search_hit(hit: SearchHit) -> dict[str, Any]:
    """Serialize a bounded plaintext search hit."""
    result: dict[str, Any] = {
        "conversation": serialize_summary(hit.conversation),
        "match_type": hit.match_type,
        "highlight_ranges": hit.highlight_ranges,
    }
    if hit.message_id is not None:
        result["message_id"] = hit.message_id
    if hit.snippet is not None:
        result["snippet"] = hit.snippet
    return result


def migrate_record(raw: dict[str, Any]) -> dict[str, Any]:
    """Normalize one persisted conversation before constructing the current model.

    Home Assistant Store's container version and this per-record schema version are
    intentionally separate migration boundaries.
    """
    migrated = dict(raw)
    version = int(migrated.get("schema_version", 1))
    if version <= CURRENT_CONVERSATION_SCHEMA_VERSION:
        migrated["schema_version"] = CURRENT_CONVERSATION_SCHEMA_VERSION
    return migrated


def _deserialize_tool(raw: Any) -> ToolExecution | None:
    if not isinstance(raw, dict) or not raw.get("id") or not raw.get("name"):
        return None
    status = raw.get("status", "running")
    if status not in ("running", "completed", "cancelled", "failed"):
        status = "failed"
    metadata = raw.get("metadata")
    return ToolExecution(
        id=str(raw["id"]),
        name=str(raw["name"]),
        status=status,
        request=raw.get("request"),
        response=raw.get("response"),
        started_at=raw.get("started_at"),
        finished_at=raw.get("finished_at"),
        duration_ms=raw.get("duration_ms"),
        metadata=metadata if isinstance(metadata, dict) else {},
    )


def _deserialize_message(raw: Any) -> Message | None:
    if not isinstance(raw, dict) or raw.get("role") not in ("user", "assistant"):
        return None
    if not raw.get("id") or not isinstance(raw.get("visible_content", ""), str):
        return None
    status = raw.get("status", "completed")
    if status not in ("completed", "running", "failed", "stopped", "interrupted"):
        status = "interrupted"
    raw_tools = raw.get("tool_executions", [])
    if not isinstance(raw_tools, list):
        raw_tools = []
    return Message(
        id=str(raw["id"]),
        role=raw["role"],
        visible_content=raw.get("visible_content", ""),
        created_at=str(raw.get("created_at", utcnow())),
        status=status,
        tool_executions=[
            tool for value in raw_tools if (tool := _deserialize_tool(value)) is not None
        ],
        retry_of=str(raw["retry_of"]) if raw.get("retry_of") is not None else None,
    )


def deserialize_record(raw: dict[str, Any]) -> WorkspaceConversation | None:
    """Migrate and read one record defensively without breaking other history."""
    try:
        migrated = migrate_record(raw)
        raw_messages = migrated.get("messages", [])
        if not isinstance(raw_messages, list):
            raw_messages = []
        messages = [
            message
            for value in raw_messages
            if (message := _deserialize_message(value)) is not None
        ]
        required = ("id", "owner_user_id", "agent_id")
        if not all(isinstance(migrated.get(key), str) and migrated[key] for key in required):
            return None
        conversation = WorkspaceConversation(
            id=migrated["id"],
            owner_user_id=migrated["owner_user_id"],
            agent_id=migrated["agent_id"],
            title=str(migrated.get("title", "New chat")),
            created_at=str(migrated.get("created_at", utcnow())),
            updated_at=str(migrated.get("updated_at", utcnow())),
            messages=messages,
            schema_version=int(migrated["schema_version"]),
        )
        return conversation
    except TypeError, ValueError:
        return None


def recover_interrupted(conversation: WorkspaceConversation) -> bool:
    """Terminalize work left behind when the integration stopped unexpectedly."""
    changed = False
    for message in conversation.messages:
        if message.status == "running":
            message.status = "interrupted" if message.role == "assistant" else "completed"
            changed = True
        for tool in message.tool_executions:
            if tool.status == "running":
                tool.status = "cancelled"
                tool.finished_at = tool.finished_at or utcnow()
                changed = True
    return changed
