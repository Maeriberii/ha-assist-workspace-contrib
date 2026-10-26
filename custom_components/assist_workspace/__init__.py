"""Assist Workspace integration setup."""

from __future__ import annotations

import asyncio
from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import DOMAIN, FRONTEND_URL
from .storage import ConversationStore
from .websocket_api import async_register


async def _async_setup_runtime(hass: HomeAssistant) -> None:
    """Register the one shared runtime after the config entry has loaded."""
    if DOMAIN in hass.data:
        return
    store = ConversationStore(hass)
    await store.async_load()
    hass.data[DOMAIN] = {"store": store, "tasks": {}}
    bundle_path = Path(__file__).parent / "frontend" / "assist-workspace-card.js"
    if not hass.data.get(f"{DOMAIN}_static_registered"):
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(
                    FRONTEND_URL,
                    str(bundle_path),
                    cache_headers=False,
                )
            ]
        )
        hass.data[f"{DOMAIN}_static_registered"] = True

    # A custom element cannot be replaced in an already running HA SPA.  The
    # versioned module URL makes an integration reload/update load the current
    # bundle instead of retaining an old ES-module record for the bare URL.
    module_url = f"{FRONTEND_URL}?v={bundle_path.stat().st_mtime_ns}"
    frontend.add_extra_js_url(hass, module_url)
    hass.data[DOMAIN]["module_url"] = module_url
    if not hass.data.get(f"{DOMAIN}_websocket_registered"):
        async_register(hass)
        hass.data[f"{DOMAIN}_websocket_registered"] = True


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the integration from YAML when it is explicitly configured.

    The config-flow path calls the same idempotent runtime setup from
    ``async_setup_entry``.  Keeping this path here matters for a documented
    YAML installation: otherwise the card URL can be referenced by Lovelace
    while neither its static route nor its module registration exists.
    """
    if DOMAIN in config:
        await _async_setup_runtime(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry) -> bool:
    """Set up the single Assist Workspace config entry."""
    await _async_setup_runtime(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry) -> bool:
    """Unload the runtime when the single entry is removed."""
    tasks = hass.data.get(DOMAIN, {}).get("tasks", {})
    active_tasks = [task_info["task"] for task_info in tasks.values()]
    for task in active_tasks:
        task.cancel()
    if active_tasks:
        await asyncio.gather(*active_tasks, return_exceptions=True)
    if module_url := hass.data.get(DOMAIN, {}).get("module_url"):
        frontend.remove_extra_js_url(hass, module_url)
    hass.data.pop(DOMAIN, None)
    return True
