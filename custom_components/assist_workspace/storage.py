"""Versioned Store repository for per-user workspace history."""

from __future__ import annotations

import asyncio
import builtins
import logging
from collections.abc import Iterable
from datetime import datetime, timedelta
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import (
    ACCESS_LOG_DEDUPE_SECONDS,
    MAX_ACCESS_LOG,
    MAX_SEARCH_SNIPPET_LENGTH,
    SAVE_DELAY_SECONDS,
    STORE_KEY,
    STORE_VERSION,
)
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
        self._preferences: dict[str, dict[str, Any]] = {}
        self._access_log: builtins.list[dict[str, Any]] = []
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
        prefs = raw.get("preferences")
        if isinstance(prefs, dict):
            self._preferences = {
                str(uid): dict(value) for uid, value in prefs.items() if isinstance(value, dict)
            }
        log = raw.get("access_log")
        if isinstance(log, list):
            self._access_log = [entry for entry in log if isinstance(entry, dict)][:MAX_ACCESS_LOG]
        if any(recover_interrupted(item) for item in self._items.values()):
            await self.async_save()

    def _data(self) -> dict[str, Any]:
        return {
            "schema_version": STORE_VERSION,
            "conversations": [serialize_record(item) for item in self._items.values()],
            "preferences": self._preferences,
            "access_log": self._access_log,
        }

    async def async_save(self) -> None:
        """Write immediately (cancels any pending delayed write)."""
        async with self._lock:
            await self._store.async_save(self._data())

    def async_delay_save(self) -> None:
        """Coalesce frequent writes; Home Assistant also flushes on shutdown."""
        self._store.async_delay_save(self._data, SAVE_DELAY_SECONDS)

    # ---- conversations (always scoped to an owner) -------------------------

    def owned(self, owner: str, conversation_id: str) -> WorkspaceConversation | None:
        item = self._items.get(conversation_id)
        return item if item and item.owner_user_id == owner else None

    def list(self, owner: str) -> builtins.list[WorkspaceConversation]:
        return _ordered(item for item in self._items.values() if item.owner_user_id == owner)

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
        self.async_delay_save()

    async def delete(self, owner: str, conversation_id: str) -> bool:
        if not self.owned(owner, conversation_id):
            return False
        del self._items[conversation_id]
        await self.async_save()
        return True

    async def delete_all(self, owner: str, protected: set[str] | None = None) -> int:
        """Delete all of the owner's chats (pinned too), except ones that are running."""
        doomed = [
            cid
            for cid, item in self._items.items()
            if item.owner_user_id == owner and cid not in (protected or set())
        ]
        for cid in doomed:
            del self._items[cid]
        if doomed:
            await self.async_save()
        return len(doomed)

    async def touch(self, item: WorkspaceConversation) -> None:
        item.updated_at = dt_util.utcnow().isoformat()
        self.async_delay_save()

    async def set_pinned(self, owner: str, conversation_id: str, pinned: bool) -> WorkspaceConversation | None:
        item = self.owned(owner, conversation_id)
        if item is None:
            return None
        item.pinned = pinned
        self.async_delay_save()
        return item

    # ---- maintenance ---------------------------------------------------------

    async def async_prune(
        self, max_conversations: int, max_age_days: int, protected: set[str]
    ) -> int:
        """Apply the retention limits. Pinned and running chats are never removed."""
        doomed = _select_prunable(
            self._items.values(), dt_util.utcnow(), max_conversations, max_age_days, protected
        )
        for cid in doomed:
            del self._items[cid]
        if doomed:
            await self.async_save()
        return len(doomed)

    async def async_remove_unknown_owners(self, valid_owner_ids: set[str], protected: set[str]) -> int:
        doomed = [
            cid
            for cid, item in self._items.items()
            if item.owner_user_id not in valid_owner_ids and cid not in protected
        ]
        for cid in doomed:
            del self._items[cid]
        if doomed:
            await self.async_save()
        return len(doomed)

    # ---- per-user preferences (set by an admin) ------------------------------

    def forced_agent(self, user_id: str) -> str | None:
        value = self._preferences.get(user_id, {}).get("forced_agent_id")
        return value if isinstance(value, str) and value else None

    async def set_forced_agent(self, user_id: str, agent_id: str | None) -> None:
        prefs = self._preferences.setdefault(user_id, {})
        if agent_id:
            prefs["forced_agent_id"] = agent_id
        else:
            prefs.pop("forced_agent_id", None)
        if not prefs:
            self._preferences.pop(user_id, None)
        await self.async_save()

    # ---- admin review ----------------------------------------------------------

    def get_any(self, conversation_id: str) -> WorkspaceConversation | None:
        return self._items.get(conversation_id)

    def list_for_admin(self, owner: str) -> builtins.list[WorkspaceConversation]:
        return self.list(owner)

    def owner_stats(self) -> dict[str, dict[str, Any]]:
        stats: dict[str, dict[str, Any]] = {}
        for item in self._items.values():
            row = stats.setdefault(item.owner_user_id, {"count": 0, "last": None})
            row["count"] += 1
            if row["last"] is None or item.updated_at > row["last"]:
                row["last"] = item.updated_at
        return stats

    async def delete_any(self, conversation_id: str) -> bool:
        if conversation_id not in self._items:
            return False
        del self._items[conversation_id]
        await self.async_save()
        return True

    @property
    def access_log(self) -> builtins.list[dict[str, Any]]:
        return self._access_log

    def log_access(self, entry: dict[str, Any]) -> None:
        """Record an admin looking at someone else's chats (de-duplicated per window)."""
        now = dt_util.utcnow()
        key = (entry["admin_id"], entry["owner_id"], entry.get("conversation_id"), entry["action"])
        for prior in self._access_log:
            if (
                prior.get("admin_id"),
                prior.get("owner_id"),
                prior.get("conversation_id"),
                prior.get("action"),
            ) != key:
                continue
            seen = dt_util.parse_datetime(str(prior.get("time", "")))
            if seen and (now - seen).total_seconds() < ACCESS_LOG_DEDUPE_SECONDS:
                return
            break
        self._access_log.insert(0, {**entry, "time": now.isoformat()})
        del self._access_log[MAX_ACCESS_LOG:]
        self.async_delay_save()


def _ordered(items: Iterable[WorkspaceConversation]) -> builtins.list[WorkspaceConversation]:
    """Newest first, with pinned chats on top (sort is stable)."""
    result = sorted(items, key=lambda item: item.updated_at, reverse=True)
    result.sort(key=lambda item: not item.pinned)
    return result


def _select_prunable(
    items: Iterable[WorkspaceConversation],
    now: datetime,
    max_conversations: int,
    max_age_days: int,
    protected: set[str],
) -> builtins.list[str]:
    """Pick chats to drop: oldest beyond the per-user cap, or older than the age limit."""
    by_owner: dict[str, builtins.list[WorkspaceConversation]] = {}
    for item in items:
        if not item.pinned and item.id not in protected:
            by_owner.setdefault(item.owner_user_id, []).append(item)
    cutoff = now - timedelta(days=max_age_days) if max_age_days > 0 else None
    doomed: builtins.list[str] = []
    for owned in by_owner.values():
        owned.sort(key=lambda item: item.updated_at, reverse=True)
        kept = 0
        for item in owned:
            updated = dt_util.parse_datetime(item.updated_at)
            too_old = cutoff is not None and updated is not None and updated < cutoff
            if too_old or (max_conversations > 0 and kept >= max_conversations):
                doomed.append(item.id)
            else:
                kept += 1
    return doomed


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
