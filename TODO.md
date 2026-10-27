# TODO

## Planned
- **Voice**: microphone input (HA STT, e.g. Parakeet) and spoken replies (HA TTS, e.g. Pocket TTS) in the card. Not started.
- **Retry / regenerate**: the data model has a `retry_of` field but there is no backend command or button yet.
- **Delete all my chats** button in the card (the backend command `assist_workspace/conversation/delete_all` exists).
- **Pinned chat opens as "last conversation"?** The card now opens the most recently *updated* chat, not a pinned one. Make this a card option if wanted.
- **Admin page**: search across all users' chats; per-user "this user's chats can't be reviewed" exceptions (e.g. another adult).

## Needs checking on a real Home Assistant
- Everything in v0.2.0 was tested only with stubbed HA modules and a mock websocket; none of it has run in a real HA yet.
- `hacs.json` minimum HA version (`2025.8.0`) is an estimate. Confirm against the oldest HA that has `conversation.async_get_chat_log(chat_log_delta_listener=...)`.
- `panel_custom.async_register_panel` / `frontend.async_remove_panel` calls on unload and reload.
- Options flow, and the daily/6-hourly maintenance (prune + removed-user purge).

## Licence
- Upstream (`Maeriberii/ha-assist-workspace`) went private and shipped no licence file. Asked the author (issue on `ha-codex-assist`, 2026-10-27). Keep this repo private until they answer.
