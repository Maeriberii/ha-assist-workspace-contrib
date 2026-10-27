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

# Secrets that appear inside free text rather than under a sensitive key.
_BEARER = re.compile(r"(?i)\bbearer\s+[A-Za-z0-9._~+/=-]{8,}")
_JWT = re.compile(r"\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}")
_PREFIXED_KEY = re.compile(r"\b(?:sk|pk|ghp|gho|ghs|xox[abp])[-_][A-Za-z0-9_-]{16,}")
_KEY_VALUE = re.compile(
    r"(?i)\b(authorization|api[_-]?key|access[_-]?token|token|password|passwd|secret)\b(\s*[:=]\s*)(?!\[REDACTED\])([^\s,;\"']+)"
)


def _scrub(text: str) -> str:
    text = _BEARER.sub(f"Bearer {REDACTED}", text)
    text = _JWT.sub(REDACTED, text)
    text = _PREFIXED_KEY.sub(REDACTED, text)
    return _KEY_VALUE.sub(lambda m: f"{m.group(1)}{m.group(2)}{REDACTED}", text)


def redact(value: Any) -> Any:
    if isinstance(value, dict):
        return {
            str(k): REDACTED if _SENSITIVE.search(str(k)) else redact(v) for k, v in value.items()
        }
    if isinstance(value, (list, tuple)):
        return [redact(item) for item in value]
    if isinstance(value, str):
        return _scrub(value)
    return value


def bounded(value: Any, limit: int = MAX_DIAGNOSTIC_BYTES) -> Any:
    """Return valid JSON-compatible data, explicitly marked when it is too large."""
    safe = redact(value)
    try:
        encoded = json.dumps(safe, ensure_ascii=False, default=str).encode()
    except (TypeError, ValueError):
        encoded = repr(safe).encode()
        safe = repr(safe)
    if len(encoded) <= limit:
        return safe
    preview = encoded[: min(4096, limit)].decode("utf-8", "replace")
    return {"truncated": True, "original_size": len(encoded), "preview": preview}
