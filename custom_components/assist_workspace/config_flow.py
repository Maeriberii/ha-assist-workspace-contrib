"""Config flow for Assist Workspace."""

from __future__ import annotations

from homeassistant import config_entries

from .const import DOMAIN


class ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Create the one Workspace runtime entry without user-provided secrets."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Create a single instance from Devices & Services."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        return self.async_create_entry(title="Assist Workspace", data={})
