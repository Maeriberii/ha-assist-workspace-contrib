"""Versioned Store repository for per-user workspace history."""

from __future__ import annotations

import asyncio
import builtins
import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import MAX_SEARCH_SNIPPET_LENGTH, STORE_KEY, STORE_VERSION
from .models import (
    SearchHit,
    WorkspaceConversation,
    deserialize_record,
    recover_interrupted,
    serialize_record,
)

_LOGGER = logging.getLogger(__name__)


class ConversationStore:
    def __init__(self, hass: HomeAssistant) -> None:
        self._store = Store[dict](hass, STORE_VERSION, STORE_KEY)
        self._items: dict[str, WorkspaceConversation] = {}
        self._lock = asyncio.Lock()

    async def async_load(self) -> None:
        raw = await self._store.async_load() or {
            "schema_version": STORE_VERSION,
            "conversations": [],
        }
        seen: set[str] = set()
        for item in raw.get("conversations", []):
            conversation = deserialize_record(item) if isinstance(item, dict) else None
            if conversation is None or conversation.id in seen:
                _LOGGER.warning("Ignoring malformed Assist Workspace history entry")
                continue
            seen.add(conversation.id)
            self._items[conversation.id] = conversation
        if any(recover_interrupted(item) for item in self._items.values()):
            await self.async_save()

    async def async_save(self) -> None:
        async with self._lock:
            await self._store.async_save(
                {
                    "schema_version": STORE_VERSION,
                    "conversations": [serialize_record(item) for item in self._items.values()],
                }
            )

    def owned(self, owner: str, conversation_id: str) -> WorkspaceConversation | None:
        item = self._items.get(conversation_id)
        return item if item and item.owner_user_id == owner else None

    def list(self, owner: str) -> list[WorkspaceConversation]:
        result = [item for item in self._items.values() if item.owner_user_id == owner]
        return sorted(result, key=lambda item: item.updated_at, reverse=True)

    def search(self, owner: str, query: str) -> builtins.list[SearchHit]:
        normalized = query.casefold().strip()
        if not normalized:
            return []
        hits: list[SearchHit] = []
        for item in self.list(owner):
            if title_range := _match_range(item.title, normalized):
                hits.append(SearchHit(item, "title", [_range(*title_range)]))
                continue
            for message in item.messages:
                if match := _match_range(message.visible_content, normalized):
                    snippet, snippet_range = _snippet(message.visible_content, match)
                    hits.append(
                        SearchHit(
                            item,
                            "message",
                            [_range(*snippet_range)],
                            message_id=message.id,
                            snippet=snippet,
                        )
                    )
                    break
        return hits

    async def add(self, item: WorkspaceConversation) -> None:
        self._items[item.id] = item
        await self.async_save()

    async def delete(self, owner: str, conversation_id: str) -> bool:
        if not self.owned(owner, conversation_id):
            return False
        del self._items[conversation_id]
        await self.async_save()
        return True

    async def touch(self, item: WorkspaceConversation) -> None:
        item.updated_at = dt_util.utcnow().isoformat()
        await self.async_save()


def _range(start: int, end: int) -> dict[str, int]:
    return {"start": start, "end": end}


def _match_range(text: str, normalized_query: str) -> tuple[int, int] | None:
    folded: list[str] = []
    offsets: list[int] = []
    for index, character in enumerate(text):
        part = character.casefold()
        folded.append(part)
        offsets.extend([index] * len(part))
    start = "".join(folded).find(normalized_query)
    if start < 0:
        return None
    end = start + len(normalized_query)
    return offsets[start], offsets[end - 1] + 1


def _snippet(text: str, match: tuple[int, int]) -> tuple[str, tuple[int, int]]:
    start, end = match
    radius = max(24, (MAX_SEARCH_SNIPPET_LENGTH - (end - start)) // 2)
    source_start = max(0, start - radius)
    source_end = min(len(text), end + radius)
    prefix = "…" if source_start else ""
    suffix = "…" if source_end < len(text) else ""
    body = text[source_start:source_end]
    snippet = f"{prefix}{body}{suffix}"
    relative_start = len(prefix) + start - source_start
    if len(snippet) > MAX_SEARCH_SNIPPET_LENGTH:
        snippet = snippet[: MAX_SEARCH_SNIPPET_LENGTH - 1] + "…"
    return snippet, (relative_start, relative_start + end - start)
