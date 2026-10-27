"""Constants for Assist Workspace."""

from typing import Final

DOMAIN: Final = "assist_workspace"
STORE_VERSION: Final = 1
STORE_KEY: Final = f"{DOMAIN}.conversations"
FRONTEND_URL: Final = f"/{DOMAIN}/assist-workspace-card.js"
ADMIN_FRONTEND_URL: Final = f"/{DOMAIN}/assist-workspace-admin.js"
ADMIN_PANEL_PATH: Final = "assist-workspace-admin"
ADMIN_PANEL_ELEMENT: Final = "assist-workspace-admin"
MAX_TEXT_LENGTH: Final = 32_000
MAX_TITLE_LENGTH: Final = 160
MAX_SEARCH_QUERY_LENGTH: Final = 128
MAX_SEARCH_SNIPPET_LENGTH: Final = 180
MAX_DIAGNOSTIC_BYTES: Final = 128 * 1024
WORKSPACE_CONVERSATION_PREFIX: Final = "assist-workspace:"

# Writes are coalesced: a turn touches the store several times in a few seconds.
SAVE_DELAY_SECONDS: Final = 5
MAINTENANCE_INTERVAL_HOURS: Final = 6

# Options (config entry options flow)
CONF_MAX_CONVERSATIONS: Final = "max_conversations"
CONF_MAX_AGE_DAYS: Final = "max_age_days"
CONF_ADMIN_VIEW: Final = "admin_can_view"
CONF_PURGE_REMOVED: Final = "purge_removed_users"
DEFAULT_MAX_CONVERSATIONS: Final = 200
DEFAULT_MAX_AGE_DAYS: Final = 0
DEFAULT_ADMIN_VIEW: Final = True
DEFAULT_PURGE_REMOVED: Final = True

# Admin review
MAX_ACCESS_LOG: Final = 200
ACCESS_LOG_DEDUPE_SECONDS: Final = 600
