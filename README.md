# Assist Workspace (fork)

Chat-style Lovelace card (`custom:assist-workspace-card`) for Home Assistant's Assist conversation agents, with per-user server-side conversation history. Version 0.2.0 added retention limits, pinning, export, a configurable title and an admin "Chat Review" page; 0.3.0 adds voice (microphone input and spoken replies).

## Provenance and licence

This is a fork of [`Maeriberii/ha-assist-workspace`](https://github.com/Maeriberii/ha-assist-workspace) by **Maeriberii**, who wrote the original card and integration. The author confirmed on 2026-10-31 that forking and reusing it is fine, and the upstream repository is now published under the **Beer-Ware licence** (see `LICENSE`, which must be kept). If you meet them and think it was worth it, buy them a beer.

The first commit is a copy of version 0.1.0 as installed in Home Assistant. Upstream's Python and compiled card are identical to that copy; upstream also has the TypeScript source, which this fork does not use, so frontend changes here are small patches to the compiled `assist-workspace-card.js`.

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

## Voice (0.3.0)

- **Microphone button** in the message box: tap to speak, tap again (or just stop talking) to finish. What you said is put into the message box so you can check it, then you send it. Turn on **Send what I say straight away** (`voice_auto_send: true`) to skip that step.
- **Speaker button** in the card header: when on, each reply is read aloud. Off by default (`voice_replies: true` makes it on by default); the choice is remembered per browser.
- It uses the speech-to-text and text-to-speech engines of an Assist pipeline (your preferred one, or pick one with `pipeline_id:`), so it uses whatever you have set up there (e.g. Parakeet and Pocket TTS). The chat assistant itself is not involved in voice; the transcript just goes into the chat like typed text, so Chat Review sees it too.
- The microphone only works where the browser or app allows it (HTTPS, or the HA app). The mic button is always shown; if it cannot be used, tapping it says why. Turn it all off with `voice: false`.

```yaml
type: custom:assist-workspace-card
agent_id: conversation.vault_chat
voice: true               # mic + speaker buttons
voice_replies: false      # read replies aloud by default
voice_auto_send: false    # send the transcript without a second tap
pipeline_id: ""           # empty = your preferred Assist pipeline
```

See `TODO.md` for what's next and what still needs testing on a real Home Assistant.

## Files

- `custom_components/assist_workspace/`: the integration (Python backend, card, admin page, translations, brand images).
- `tests/test_logic.py`: logic tests that run without Home Assistant (`python -I tests/test_logic.py`).
- `tests/voice_test.html`: voice protocol tests (simulated HA connection, fake microphone); same serving method, result shown on the page.
- `tests/preview.html`: renders the card and admin page in a browser with fake data (serve the repo root over HTTP, e.g. `python -m http.server`, then open `/tests/preview.html?view=card` or `?view=admin`).
- `brand_src/`: sources for the icon and logo.

## Install (private, via HACS custom repository)

Add this repository as a custom repository of type Integration, download it, restart Home Assistant, then add the card with `type: custom:assist-workspace-card` and `agent_id: <your conversation agent>`.
