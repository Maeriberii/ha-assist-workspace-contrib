# Assist Workspace (private copy)

Chat-style Lovelace card (`custom:assist-workspace-card`) for Home Assistant's Assist conversation agents, with per-user server-side conversation history.

## Provenance

This is a **private backup copy** of version 0.1.0 of `Maeriberii/ha-assist-workspace`, taken from a Home Assistant install on 2026-10-27 after the upstream repository stopped being publicly available (it returns 404).

- The original author is listed in `manifest.json` as `@Maeriberii`.
- **No licence file or licence text was found** in the copied files. Until the author says otherwise, treat all rights as reserved: do not make this repository public, and do not publish a release.
- The frontend (`frontend/assist-workspace-card.js`) is the compiled bundle, not the original TypeScript source.

## Files

- `custom_components/assist_workspace/`: the integration as installed (Python backend, compiled card, translations). The first commit is what was copied, unmodified apart from any line-ending normalisation by git.

## Install (private, via HACS custom repository)

Add this repository as a custom repository of type Integration, download it, restart Home Assistant, then add the card with `type: custom:assist-workspace-card` and `agent_id: <your conversation agent>`.
