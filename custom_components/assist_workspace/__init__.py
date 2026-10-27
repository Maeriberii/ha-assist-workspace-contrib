"""Assist Workspace integration setup."""

from __future__ import annotations

import asyncio
import logging
from datetime import timedelta
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.event import async_track_time_interval

from .const import (
    ADMIN_FRONTEND_URL,
    ADMIN_PANEL_ELEMENT,
    ADMIN_PANEL_PATH,
    DOMAIN,
    FRONTEND_URL,
    MAINTENANCE_INTERVAL_HOURS,
)
from .settings import get_settings
from .storage import ConversationStore
from .websocket_api import async_register

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = cv.empty_config_schema(DOMAIN)


async def _async_maintenance(hass: HomeAssistant) -> None:
    """Apply retention limits and drop history belonging to removed users."""
    runtime = hass.data.get(DOMAIN)
    if not runtime:
        return
    store: ConversationStore = runtime["store"]
    settings = get_settings(hass)
    protected = set(runtime["tasks"])
    removed = await store.async_prune(settings.max_conversations, settings.max_age_days, protected)
    if settings.purge_removed_users:
        users = await hass.auth.async_get_users()
        removed += await store.async_remove_unknown_owners({user.id for user in users}, protected)
    if removed:
        _LOGGER.info("Assist Workspace removed %s old conversation(s)", removed)


async def _async_setup_runtime(hass: HomeAssistant) -> None:
    """Register the one shared runtime after the config entry has loaded."""
    if DOMAIN in hass.data:
        return
    store = ConversationStore(hass)
    await store.async_load()
    hass.data[DOMAIN] = {"store": store, "tasks": {}}
    frontend_dir = Path(__file__).parent / "frontend"
    bundle_path = frontend_dir / "assist-workspace-card.js"
    admin_path = frontend_dir / "assist-workspace-admin.js"
    if not hass.data.get(f"{DOMAIN}_static_registered"):
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(FRONTEND_URL, str(bundle_path), cache_headers=False),
                StaticPathConfig(ADMIN_FRONTEND_URL, str(admin_path), cache_headers=False),
            ]
        )
        hass.data[f"{DOMAIN}_static_registered"] = True

    # A custom element cannot be replaced in an already running HA SPA.  The
    # versioned module URL makes an integration reload/update load the current
    # bundle instead of retaining an old ES-module record for the bare URL.
    module_url = f"{FRONTEND_URL}?v={bundle_path.stat().st_mtime_ns}"
    frontend.add_extra_js_url(hass, module_url)
    hass.data[DOMAIN]["module_url"] = module_url

    # Admin-only "Chat Review" sidebar page (parental control).
    await panel_custom.async_register_panel(
        hass,
        webcomponent_name=ADMIN_PANEL_ELEMENT,
        frontend_url_path=ADMIN_PANEL_PATH,
        module_url=f"{ADMIN_FRONTEND_URL}?v={admin_path.stat().st_mtime_ns}",
        sidebar_title="Chat Review",
        sidebar_icon="mdi:account-eye",
        require_admin=True,
        config={},
    )

    if not hass.data.get(f"{DOMAIN}_websocket_registered"):
        async_register(hass)
        hass.data[f"{DOMAIN}_websocket_registered"] = True

    async def _tick(_now) -> None:
        await _async_maintenance(hass)

    hass.data[DOMAIN]["maintenance_unsub"] = async_track_time_interval(
        hass, _tick, timedelta(hours=MAINTENANCE_INTERVAL_HOURS)
    )
    await _async_maintenance(hass)


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

    async def _options_updated(hass: HomeAssistant, _entry) -> None:
        await _async_maintenance(hass)

    entry.async_on_unload(entry.add_update_listener(_options_updated))
    return True


async def async_unload_entry(hass: HomeAssistant, entry) -> bool:
    """Unload the runtime when the single entry is removed."""
    runtime = hass.data.get(DOMAIN, {})
    tasks = runtime.get("tasks", {})
    active_tasks = [task_info["task"] for task_info in tasks.values()]
    for task in active_tasks:
        task.cancel()
    if active_tasks:
        await asyncio.gather(*active_tasks, return_exceptions=True)
    if unsub := runtime.get("maintenance_unsub"):
        unsub()
    if store := runtime.get("store"):
        await store.async_save()  # flush any delayed write before the runtime goes away
    if module_url := runtime.get("module_url"):
        frontend.remove_extra_js_url(hass, module_url)
    frontend.async_remove_panel(hass, ADMIN_PANEL_PATH)
    hass.data.pop(DOMAIN, None)
    return True
