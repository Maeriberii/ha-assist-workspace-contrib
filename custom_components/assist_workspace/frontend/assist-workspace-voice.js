/* Voice helpers for the Assist Workspace card (loaded on demand).
 *
 * Both directions go through Home Assistant's own Assist pipeline, so whatever speech-to-text
 * and text-to-speech engines the chosen pipeline uses (e.g. Parakeet / Pocket TTS) are used here:
 *   - Listener: streams microphone audio to `assist_pipeline/run` (STT stage only).
 *   - Speaker:  asks `assist_pipeline/run` for the TTS stage only, then plays the returned audio.
 * The conversation agent is NOT involved; the transcript goes into the chat like typed text.
 *
 * Audio is sent as raw 16-bit mono PCM at the microphone's native sample rate; Home Assistant
 * resamples it to 16 kHz on the server. Microphone access needs HTTPS (or localhost).
 */

const MAX_LISTEN_MS = 30000;
const MAX_SPEAK_CHARS = 700;

export function voiceSupported() {
  return !!(
    window.isSecureContext &&
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia &&
    (window.AudioContext || window.webkitAudioContext)
  );
}

/** A plain-English reason the microphone could not be used. */
export function micErrorMessage(err) {
  const name = err && err.name;
  if (name === "NotAllowedError" || name === "SecurityError") {
    return window.isSecureContext === false
      ? "The microphone needs a secure (HTTPS) connection to Home Assistant."
      : "Microphone permission was denied.";
  }
  if (name === "NotSupportedError" || name === "TypeError") {
    return window.isSecureContext === false
      ? "The microphone needs a secure (HTTPS) connection to Home Assistant."
      : "This browser or app doesn't allow microphone access here.";
  }
  if (name === "NotFoundError") return "No microphone was found.";
  return "Could not open the microphone.";
}

/** Reduce Markdown to something that sounds fine when read out. */
export function plainText(markdown) {
  let t = String(markdown || "");
  t = t.replace(/```[\s\S]*?```/g, " (code omitted) ");
  t = t.replace(/`([^`]+)`/g, "$1");
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  t = t.replace(/^\s{0,3}#{1,6}\s*/gm, "");
  t = t.replace(/^\s*[-*+]\s+/gm, "");
  t = t.replace(/^\s*\d+\.\s+/gm, "");
  t = t.replace(/^\s*>\s?/gm, "");
  t = t.replace(/(\w)_(?=\w)/g, "$1 ").replace(/[*_~|]{1,3}/g, "");
  t = t.replace(/\s*\n\s*/g, ". ").replace(/\.\s*\.+/g, ".").replace(/\s{2,}/g, " ").trim();
  if (t.length > MAX_SPEAK_CHARS) {
    const cut = t.slice(0, MAX_SPEAK_CHARS);
    const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
    t = (end > MAX_SPEAK_CHARS * 0.5 ? cut.slice(0, end + 1) : cut) + " (the rest is on screen)";
  }
  return t;
}

/** Real microphone capture. Replaceable (tests pass a synthetic one). */
export async function openMicrophone() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    const err = new Error("no getUserMedia");
    err.name = "NotSupportedError";
    throw err;
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
  });
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const ctx = new Ctx();
  const source = ctx.createMediaStreamSource(stream);
  let onChunk = () => {};
  // ScriptProcessor is deprecated but works in every browser/webview Home Assistant runs in.
  const node = ctx.createScriptProcessor(4096, 1, 1);
  node.onaudioprocess = (ev) => onChunk(new Float32Array(ev.inputBuffer.getChannelData(0)));
  const mute = ctx.createGain();
  mute.gain.value = 0;
  source.connect(node);
  node.connect(mute);
  mute.connect(ctx.destination);
  return {
    sampleRate: ctx.sampleRate,
    onChunk: (fn) => { onChunk = fn; },
    close() {
      try { node.disconnect(); source.disconnect(); mute.disconnect(); } catch (e) { /* already gone */ }
      stream.getTracks().forEach((t) => t.stop());
      ctx.close().catch(() => {});
    },
  };
}

function toPcm16(float32) {
  const out = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

/** One speech-to-text capture. Call start(), then stop() (or let Home Assistant detect silence). */
export class Listener {
  constructor(hass, { pipelineId = "", openMic = openMicrophone } = {}) {
    this.hass = hass;
    this.pipelineId = pipelineId;
    this.openMic = openMic;
    this.mic = null;
    this.handlerId = null;
    this.queue = [];
    this.unsub = null;
    this.ended = false;
    this.timer = null;
    this.finished = false;
  }

  /** handlers: { onState(state), onText(text), onError(message) }. states: listening|processing|idle */
  async start(handlers) {
    this.handlers = handlers;
    try {
      this.mic = await this.openMic();
    } catch (err) {
      this._fail(micErrorMessage(err));
      return;
    }
    this.mic.onChunk((f32) => this._audio(toPcm16(f32)));
    this.handlers.onState("listening");
    this.timer = setTimeout(() => this.stop(), MAX_LISTEN_MS);
    const msg = {
      type: "assist_pipeline/run",
      start_stage: "stt",
      end_stage: "stt",
      input: { sample_rate: Math.round(this.mic.sampleRate) },
      timeout: 45,
    };
    if (this.pipelineId) msg.pipeline = this.pipelineId;
    try {
      this.unsub = await this.hass.connection.subscribeMessage((ev) => this._event(ev), msg);
    } catch (err) {
      this._fail((err && err.message) || "Speech recognition is not available.");
    }
  }

  _event(ev) {
    if (this.finished || !ev) return;
    const data = ev.data || {};
    switch (ev.type) {
      case "run-start":
        this.handlerId = data.runner_data && data.runner_data.stt_binary_handler_id;
        for (const chunk of this.queue) this._send(chunk);
        this.queue = [];
        if (this.ended) this._sendEnd();
        break;
      case "stt-vad-end":
        this.stop();
        break;
      case "stt-end": {
        const text = ((data.stt_output && data.stt_output.text) || "").trim();
        this._finish();
        if (text) this.handlers.onText(text);
        else this.handlers.onError("I didn't catch that.");
        break;
      }
      case "error":
        this._fail(data.message || "Speech recognition failed.");
        break;
      case "run-end":
        this._finish();
        break;
    }
  }

  _audio(pcm) {
    if (this.ended || this.finished) return;
    if (this.handlerId == null) this.queue.push(pcm);
    else this._send(pcm);
  }

  _send(pcm) {
    const out = new Uint8Array(1 + pcm.byteLength);
    out[0] = this.handlerId;
    out.set(new Uint8Array(pcm.buffer, pcm.byteOffset, pcm.byteLength), 1);
    this.hass.connection.socket.send(out);
  }

  _sendEnd() {
    // An empty chunk (just the handler id) tells Home Assistant the audio is finished.
    this.hass.connection.socket.send(new Uint8Array([this.handlerId]));
  }

  /** Stop capturing and wait for the transcript. */
  stop() {
    if (this.ended || this.finished) return;
    this.ended = true;
    clearTimeout(this.timer);
    if (this.mic) { this.mic.close(); this.mic = null; }
    if (this.handlers) this.handlers.onState("processing");
    if (this.handlerId != null) this._sendEnd();
  }

  /** Abandon without a transcript. */
  cancel() {
    if (this.finished) return;
    this.ended = true;
    this._finish();
  }

  _fail(message) {
    const handlers = this.handlers;
    this._finish();
    if (handlers) handlers.onError(message);
  }

  _finish() {
    if (this.finished) return;
    this.finished = true;
    clearTimeout(this.timer);
    if (this.mic) { this.mic.close(); this.mic = null; }
    if (this.unsub) { try { this.unsub(); } catch (e) { /* ignore */ } this.unsub = null; }
    if (this.handlers) this.handlers.onState("idle");
  }
}

/** Reads text aloud with the pipeline's TTS engine. One utterance at a time. */
export class Speaker {
  constructor(hass, { pipelineId = "", makeAudio = (url) => new Audio(url) } = {}) {
    this.hass = hass;
    this.pipelineId = pipelineId;
    this.makeAudio = makeAudio;
    this.audio = null;
    this.unsub = null;
    this.generation = 0;
  }

  async speak(text) {
    const spoken = plainText(text);
    if (!spoken) return;
    this.stop();
    const mine = ++this.generation;
    const msg = {
      type: "assist_pipeline/run",
      start_stage: "tts",
      end_stage: "tts",
      input: { text: spoken },
      timeout: 60,
    };
    if (this.pipelineId) msg.pipeline = this.pipelineId;
    const url = await new Promise((resolve) => {
      let settled = false;
      const done = (value) => { if (!settled) { settled = true; resolve(value); } };
      this.pending = done; // lets stop() release us if a newer utterance replaces this one
      this.hass.connection.subscribeMessage((ev) => {
        if (!ev) return;
        if (ev.type === "tts-end") done((ev.data && ev.data.tts_output && ev.data.tts_output.url) || null);
        else if (ev.type === "error" || ev.type === "run-end") done(null);
      }, msg).then((unsub) => {
        this.unsub = unsub;
        if (settled) { try { unsub(); } catch (e) { /* ignore */ } this.unsub = null; }
      }).catch(() => done(null));
    });
    if (this.unsub) { try { this.unsub(); } catch (e) { /* ignore */ } this.unsub = null; }
    if (!url || mine !== this.generation) return;
    const absolute = typeof this.hass.hassUrl === "function" ? this.hass.hassUrl(url) : new URL(url, location.origin).href;
    await new Promise((resolve) => {
      const audio = this.makeAudio(absolute);
      this.audio = audio;
      audio.onended = audio.onerror = () => resolve();
      const started = audio.play();
      if (started && started.catch) started.catch(() => resolve()); // autoplay blocked: stay silent
    });
    if (this.audio && mine === this.generation) this.audio = null;
  }

  stop() {
    this.generation++;
    if (this.pending) { this.pending(null); this.pending = null; }
    if (this.audio) {
      try { this.audio.pause(); } catch (e) { /* ignore */ }
      if (this.audio.onended) this.audio.onended();
      this.audio = null;
    }
    if (this.unsub) { try { this.unsub(); } catch (e) { /* ignore */ } this.unsub = null; }
  }

  get speaking() { return !!this.audio; }
}
