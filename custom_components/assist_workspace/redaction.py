"""Backend-side diagnostic redaction and bounded serialization."""

from __future__ import annotations

import json
import re
from typing import Any

from .const import MAX_DIAGNOSTIC_BYTES

_SENSITIVE = re.compile(
    r"(?:authorization|cookie|token|api[_-]?key|password|passwd|secret|credential)", re.IGNORECASE
)
REDACTED = "[REDACTED]"


def redact(value: Any) -> Any:
    if isinstance(value, dict):
        return {
            str(k): REDACTED if _SENSITIVE.search(str(k)) else redact(v) for k, v in value.items()
        }
    if isinstance(value, list):
        return [redact(item) for item in value]
    if isinstance(value, tuple):
        return [redact(item) for item in value]
    return value


def bounded(value: Any, limit: int = MAX_DIAGNOSTIC_BYTES) -> Any:
    """Return valid JSON-compatible data, explicitly marked when it is too large."""
    safe = redact(value)
    try:
        encoded = json.dumps(safe, ensure_ascii=False, default=str).encode()
    except TypeError, ValueError:
        encoded = repr(safe).encode()
        safe = repr(safe)
    if len(encoded) <= limit:
        return safe
    preview = encoded[: min(4096, limit)].decode("utf-8", "replace")
    return {"truncated": True, "original_size": len(encoded), "preview": preview}
