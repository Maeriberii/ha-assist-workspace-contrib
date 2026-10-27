"""Runtime settings read from the config entry options."""

from __future__ import annotations

from dataclasses import dataclass

from homeassistant.core import HomeAssistant

from .const import (
    CONF_ADMIN_VIEW,
    CONF_MAX_AGE_DAYS,
    CONF_MAX_CONVERSATIONS,
    CONF_PURGE_REMOVED,
    DEFAULT_ADMIN_VIEW,
    DEFAULT_MAX_AGE_DAYS,
    DEFAULT_MAX_CONVERSATIONS,
    DEFAULT_PURGE_REMOVED,
    DOMAIN,
)


@dataclass(frozen=True, slots=True)
class Settings:
    max_conversations: int = DEFAULT_MAX_CONVERSATIONS
    max_age_days: int = DEFAULT_MAX_AGE_DAYS
    admin_can_view: bool = DEFAULT_ADMIN_VIEW
    purge_removed_users: bool = DEFAULT_PURGE_REMOVED


def get_settings(hass: HomeAssistant) -> Settings:
    """Current options; defaults when set up from YAML (no config entry)."""
    entries = hass.config_entries.async_entries(DOMAIN)
    options = entries[0].options if entries else {}
    return Settings(
        max_conversations=int(options.get(CONF_MAX_CONVERSATIONS, DEFAULT_MAX_CONVERSATIONS)),
        max_age_days=int(options.get(CONF_MAX_AGE_DAYS, DEFAULT_MAX_AGE_DAYS)),
        admin_can_view=bool(options.get(CONF_ADMIN_VIEW, DEFAULT_ADMIN_VIEW)),
        purge_removed_users=bool(options.get(CONF_PURGE_REMOVED, DEFAULT_PURGE_REMOVED)),
    )
