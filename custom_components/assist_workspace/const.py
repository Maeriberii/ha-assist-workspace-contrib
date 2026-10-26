"""Constants for Assist Workspace."""

from typing import Final

DOMAIN: Final = "assist_workspace"
STORE_VERSION: Final = 1
STORE_KEY: Final = f"{DOMAIN}.conversations"
FRONTEND_URL: Final = f"/{DOMAIN}/assist-workspace-card.js"
MAX_TEXT_LENGTH: Final = 32_000
MAX_TITLE_LENGTH: Final = 160
MAX_SEARCH_QUERY_LENGTH: Final = 128
MAX_SEARCH_SNIPPET_LENGTH: Final = 180
MAX_DIAGNOSTIC_BYTES: Final = 128 * 1024
WORKSPACE_CONVERSATION_PREFIX: Final = "assist-workspace:"
