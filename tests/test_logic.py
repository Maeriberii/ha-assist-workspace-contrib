"""Logic tests that run without Home Assistant (HA modules are stubbed).

Run:  python -I tests/test_logic.py
"""

from __future__ import annotations

import asyncio
import sys
import types
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Generic, TypeVar

PKG_DIR = Path(__file__).resolve().parent.parent / "custom_components" / "assist_workspace"

# ---- stub the bits of Home Assistant the pure-logic modules import ----------
T = TypeVar("T")


class FakeStore(Generic[T]):
    saved = None
    delayed = 0

    def __init__(self, hass, version, key):
        pass

    async def async_load(self):
        return None

    async def async_save(self, data):
        FakeStore.saved = data

    def async_delay_save(self, data_func, delay):
        FakeStore.delayed += 1


def _mod(name, **attrs):
    module = types.ModuleType(name)
    module.__dict__.update(attrs)
    sys.modules[name] = module
    return module


_mod("homeassistant")
_mod("homeassistant.core", HomeAssistant=object)
_mod("homeassistant.helpers")
_mod("homeassistant.helpers.storage", Store=FakeStore)
_mod("homeassistant.util")
dt = _mod(
    "homeassistant.util.dt",
    utcnow=lambda: datetime.now(timezone.utc),
    parse_datetime=lambda s: datetime.fromisoformat(s),
)
sys.modules["homeassistant.util"].dt = dt

pkg = types.ModuleType("aw")
pkg.__path__ = [str(PKG_DIR)]
sys.modules["aw"] = pkg

from aw import models, redaction, storage  # noqa: E402


def conv(cid, owner="u1", age_days=0, pinned=False, title="t"):
    stamp = (datetime.now(timezone.utc) - timedelta(days=age_days)).isoformat()
    item = models.new_conversation(owner, "conversation.x")
    item.id = cid
    item.updated_at = stamp
    item.pinned = pinned
    item.title = title
    return item


class RedactionTests(unittest.TestCase):
    def test_sensitive_keys(self):
        out = redaction.redact({"api_key": "abc", "ok": 1, "nested": {"Password": "p"}})
        self.assertEqual(out["api_key"], "[REDACTED]")
        self.assertEqual(out["ok"], 1)
        self.assertEqual(out["nested"]["Password"], "[REDACTED]")

    def test_secrets_inside_text(self):
        text = "curl -H Authorization: Bearer abcdef123456789 and token=hunter2hunter2 done"
        out = redaction.redact(text)
        self.assertNotIn("abcdef123456789", out)
        self.assertNotIn("hunter2hunter2", out)
        self.assertIn("[REDACTED]", out)

    def test_jwt_redacted(self):
        jwt = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhYmMifQ.abcdefghijk"
        self.assertNotIn(jwt, redaction.redact(f"here {jwt} there"))

    def test_normal_text_untouched(self):
        self.assertEqual(redaction.redact("turn on the kitchen light"), "turn on the kitchen light")

    def test_bounded_truncates(self):
        out = redaction.bounded({"x": "a" * 5000}, limit=100)
        self.assertTrue(out["truncated"])

    def test_tuple_handled(self):
        self.assertEqual(redaction.redact(("a", {"token": "t"})), ["a", {"token": "[REDACTED]"}])


class ModelTests(unittest.TestCase):
    def test_pinned_roundtrip_and_default(self):
        item = conv("c1", pinned=True)
        back = models.deserialize_record(models.serialize_record(item))
        self.assertTrue(back.pinned)
        legacy = models.serialize_record(conv("c2"))
        del legacy["pinned"]
        self.assertFalse(models.deserialize_record(legacy).pinned)

    def test_summary_has_pinned(self):
        self.assertIn("pinned", models.serialize_summary(conv("c3")))

    def test_bad_record_rejected(self):
        self.assertIsNone(models.deserialize_record({"id": "x"}))


class StoreTests(unittest.TestCase):
    def setUp(self):
        self.store = storage.ConversationStore(None)
        FakeStore.delayed = 0

    def run_async(self, coro):
        return asyncio.run(coro)

    def test_pinned_first_then_newest(self):
        for item in (conv("old", age_days=5), conv("new"), conv("pin", age_days=9, pinned=True)):
            self.store._items[item.id] = item
        self.assertEqual([i.id for i in self.store.list("u1")], ["pin", "new", "old"])

    def test_owner_isolation(self):
        self.store._items["a"] = conv("a", owner="u1")
        self.assertIsNone(self.store.owned("u2", "a"))
        self.assertEqual(self.store.list("u2"), [])

    def test_prune_cap_keeps_pinned_and_running(self):
        for i in range(6):
            self.store._items[f"c{i}"] = conv(f"c{i}", age_days=i)
        self.store._items["keep"] = conv("keep", age_days=50, pinned=True)
        self.store._items["busy"] = conv("busy", age_days=60)
        removed = self.run_async(self.store.async_prune(3, 0, {"busy"}))
        remaining = set(self.store._items)
        self.assertEqual(removed, 3)
        self.assertTrue({"keep", "busy", "c0", "c1", "c2"} <= remaining)

    def test_prune_cap_is_per_user(self):
        for i in range(4):
            self.store._items[f"a{i}"] = conv(f"a{i}", owner="u1", age_days=i)
            self.store._items[f"b{i}"] = conv(f"b{i}", owner="u2", age_days=i)
        self.run_async(self.store.async_prune(2, 0, set()))
        self.assertEqual(len([i for i in self.store._items.values() if i.owner_user_id == "u1"]), 2)
        self.assertEqual(len([i for i in self.store._items.values() if i.owner_user_id == "u2"]), 2)

    def test_prune_by_age(self):
        self.store._items["fresh"] = conv("fresh", age_days=1)
        self.store._items["stale"] = conv("stale", age_days=40)
        self.store._items["oldpin"] = conv("oldpin", age_days=400, pinned=True)
        self.run_async(self.store.async_prune(0, 30, set()))
        self.assertEqual(set(self.store._items), {"fresh", "oldpin"})

    def test_prune_unlimited_does_nothing(self):
        self.store._items["a"] = conv("a", age_days=999)
        self.assertEqual(self.run_async(self.store.async_prune(0, 0, set())), 0)

    def test_remove_unknown_owners(self):
        self.store._items["a"] = conv("a", owner="gone")
        self.store._items["b"] = conv("b", owner="here")
        self.store._items["c"] = conv("c", owner="gone")
        removed = self.run_async(self.store.async_remove_unknown_owners({"here"}, {"c"}))
        self.assertEqual(removed, 1)
        self.assertEqual(set(self.store._items), {"b", "c"})

    def test_delete_all_skips_running(self):
        self.store._items["a"] = conv("a")
        self.store._items["b"] = conv("b")
        self.assertEqual(self.run_async(self.store.delete_all("u1", {"b"})), 1)
        self.assertEqual(set(self.store._items), {"b"})

    def test_add_and_touch_use_delayed_save(self):
        item = conv("a")
        self.run_async(self.store.add(item))
        self.run_async(self.store.touch(item))
        self.assertEqual(FakeStore.delayed, 2)

    def test_forced_agent_roundtrip(self):
        self.assertIsNone(self.store.forced_agent("kid"))
        self.run_async(self.store.set_forced_agent("kid", "conversation.safe"))
        self.assertEqual(self.store.forced_agent("kid"), "conversation.safe")
        self.assertEqual(FakeStore.saved["preferences"]["kid"]["forced_agent_id"], "conversation.safe")
        self.run_async(self.store.set_forced_agent("kid", None))
        self.assertIsNone(self.store.forced_agent("kid"))
        self.assertNotIn("kid", FakeStore.saved["preferences"])

    def test_access_log_dedupes_and_caps(self):
        entry = {"admin_id": "a", "owner_id": "k", "conversation_id": "c", "action": "view"}
        self.store.log_access(dict(entry))
        self.store.log_access(dict(entry))  # same look within the window
        self.assertEqual(len(self.store.access_log), 1)
        self.store.log_access({**entry, "conversation_id": "other"})
        self.assertEqual(len(self.store.access_log), 2)
        for i in range(300):
            self.store.log_access({**entry, "conversation_id": f"n{i}"})
        self.assertLessEqual(len(self.store.access_log), 200)

    def test_owner_stats(self):
        self.store._items["a"] = conv("a", owner="u1", age_days=2)
        self.store._items["b"] = conv("b", owner="u1", age_days=1)
        stats = self.store.owner_stats()
        self.assertEqual(stats["u1"]["count"], 2)

    def test_search_finds_title_and_message(self):
        item = conv("a", title="Pump schedule")
        item.messages.append(models.new_message("user", "when does the pool pump run?"))
        self.store._items["a"] = item
        self.assertEqual(self.store.search("u1", "pump")[0].match_type, "title")
        item.title = "other"
        hit = self.store.search("u1", "pool")[0]
        self.assertEqual(hit.match_type, "message")
        self.assertEqual(self.store.search("u2", "pool"), [])

    def test_persisted_data_shape(self):
        self.store._items["a"] = conv("a", pinned=True)
        data = self.store._data()
        self.assertEqual(set(data), {"schema_version", "conversations", "preferences", "access_log"})
        self.assertTrue(data["conversations"][0]["pinned"])


if __name__ == "__main__":
    unittest.main(verbosity=1)
