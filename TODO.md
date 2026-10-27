# TODO

## Planned
- **Retry / regenerate**: the data model has a `retry_of` field but there is no backend command or button yet.
- **Delete all my chats** button in the card (the backend command `assist_workspace/conversation/delete_all` exists).
- **Pinned chat opens as "last conversation"?** The card now opens the most recently *updated* chat, not a pinned one. Make this a card option if wanted.
- **Admin page**: search across all users' chats; per-user "this user's chats can't be reviewed" exceptions (e.g. another adult).
- **Voice, later**: hands-free mode (wake word / continuous listening), a per-user "voice off" switch in Chat Review for kids, and streaming TTS so long replies start speaking sooner.

## Needs checking on a real Home Assistant
- **Voice (0.3.0)** has only been tested with a simulated HA connection and a fake microphone (`tests/voice_test.html`, 34 checks), plus a real browser microphone opening in `tests/preview.html`. Not yet tried against real Parakeet STT / Pocket TTS. Things most likely to need adjusting: the pipeline's STT accepting our streamed 16-bit PCM (server resamples to 16 kHz), TTS audio autoplay being blocked on iOS/Android until the user has tapped, and the app's webview microphone permission.
- Microphone needs HTTPS (Cloudflare tunnel is fine; plain `http://<lan-ip>:8123` hides the mic button).
- `hacs.json` minimum HA version (`2025.8.0`) is an estimate. Confirm against the oldest HA that has `conversation.async_get_chat_log(chat_log_delta_listener=...)`.
- Options flow, and the 6-hourly maintenance (prune + removed-user purge).
- Confirmed working on the real HA (2026-10-27): integration loads, Chat Review page appears, card works after a hard refresh, old chats kept, sending works.

## Licence
- Upstream (`Maeriberii/ha-assist-workspace`) went private and shipped no licence file. Asked the author (issue on `ha-codex-assist`, 2026-10-27). Keep this repo private until they answer.
