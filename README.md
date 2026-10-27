# Assist Workspace (private copy)

Chat-style Lovelace card (`custom:assist-workspace-card`) for Home Assistant's Assist conversation agents, with per-user server-side conversation history. Version 0.2.0 adds retention limits, pinning, export, a configurable title and an admin "Chat Review" page.

## Provenance

This started as a **private backup copy** of version 0.1.0 of `Maeriberii/ha-assist-workspace`, taken from a Home Assistant install on 2026-10-27 after the upstream repository stopped being publicly available (it returns 404). The first commit is that copy, unmodified apart from any line-ending normalisation by git.

- The original author is listed in `manifest.json` as `@Maeriberii`.
- **No licence file or licence text was found** in the copied files. Until the author says otherwise, treat all rights as reserved: do not make this repository public, and do not publish a release.
- The card (`frontend/assist-workspace-card.js`) is the compiled bundle, not the original TypeScript source, so frontend changes are small patches to that file.

## What 0.2.0 changes

**Fixes**
- History is saved with a short delay instead of rewriting the whole file several times per turn.
- Retention: per-user chat cap and optional maximum age (pinned chats are never removed); history of removed HA users is deleted.
- Websocket commands no longer error after the integration is unloaded.
- Python 3.14-only `except A, B:` syntax replaced, so it loads on older Home Assistant versions too.
- Rename rejects a title that is only spaces; secrets inside tool output text (bearer tokens, JWTs, `token=...`) are redacted, not just values under sensitive keys; YAML setup is accepted.

**Features**
- Configurable card title (`title:` in the card config, or the editor).
- Pin chats (a "Pinned" group at the top), export a chat as Markdown (chat menu).
- **Chat Review** sidebar page for admins (parental control): see every user, read their chats (read-only, tool activity included), export or delete them, and pin a user to one assistant (e.g. a kid-safe agent). Non-admin users see a small "an admin can review these chats" notice, and every look is written to an access log shown on the page.
- Options (Settings > Devices & services > Assist Workspace > Configure): chats kept per user, maximum age, whether admins can review others' chats, purge history of removed users.
- Integration icon and logo (`brand/`, shown by Home Assistant 2026.3 and newer).

See `TODO.md` for what's next (voice is parked) and what still needs testing on a real Home Assistant.

## Files

- `custom_components/assist_workspace/`: the integration (Python backend, card, admin page, translations, brand images).
- `tests/test_logic.py`: logic tests that run without Home Assistant (`python -I tests/test_logic.py`).
- `tests/preview.html`: renders the card and admin page in a browser with fake data (serve the repo root over HTTP, e.g. `python -m http.server`, then open `/tests/preview.html?view=card` or `?view=admin`).
- `brand_src/`: sources for the icon and logo.

## Install (private, via HACS custom repository)

Add this repository as a custom repository of type Integration, download it, restart Home Assistant, then add the card with `type: custom:assist-workspace-card` and `agent_id: <your conversation agent>`.
