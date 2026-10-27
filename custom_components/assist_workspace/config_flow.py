"""Config flow for Assist Workspace."""

from __future__ import annotations

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback

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


class ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Create the one Workspace runtime entry without user-provided secrets."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: config_entries.ConfigEntry) -> OptionsFlow:
        return OptionsFlow()

    async def async_step_user(self, user_input=None):
        """Create a single instance from Devices & Services."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        return self.async_create_entry(title="Assist Workspace", data={})

    async def async_step_import(self, user_input=None):
        """Create the entry from YAML (`assist_workspace:`) if none exists yet."""
        return await self.async_step_user(user_input)


class OptionsFlow(config_entries.OptionsFlow):
    """History limits and admin review settings."""

    async def async_step_init(self, user_input=None):
        if user_input is not None:
            return self.async_create_entry(data=user_input)
        current = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_MAX_CONVERSATIONS,
                    default=current.get(CONF_MAX_CONVERSATIONS, DEFAULT_MAX_CONVERSATIONS),
                ): vol.All(vol.Coerce(int), vol.Range(min=0, max=5000)),
                vol.Required(
                    CONF_MAX_AGE_DAYS, default=current.get(CONF_MAX_AGE_DAYS, DEFAULT_MAX_AGE_DAYS)
                ): vol.All(vol.Coerce(int), vol.Range(min=0, max=3650)),
                vol.Required(
                    CONF_ADMIN_VIEW, default=current.get(CONF_ADMIN_VIEW, DEFAULT_ADMIN_VIEW)
                ): bool,
                vol.Required(
                    CONF_PURGE_REMOVED,
                    default=current.get(CONF_PURGE_REMOVED, DEFAULT_PURGE_REMOVED),
                ): bool,
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
