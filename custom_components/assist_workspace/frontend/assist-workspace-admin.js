/* Assist Workspace "Chat Review" sidebar panel (admins only).
 * Plain web component, no build step. Uses HA theme variables. All text is inserted with
 * textContent (never innerHTML), so chat content cannot inject markup. */

function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "style") el.style.cssText = v;
    else if (k === "value") el.value = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return el;
}

function fmt(iso) {
  if (!iso) return "never";
  const d = new Date(iso);
  const now = new Date();
  const t = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const day0 = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate());
  const diff = Math.round((day0(now) - day0(d)) / 86400000);
  if (diff === 0) return `Today ${t}`;
  if (diff === 1) return `Yesterday ${t}`;
  return `${d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" })} ${t}`;
}

const ACTION_LABEL = {
  list: "Opened chat list",
  view: "Read a chat",
  delete: "Deleted a chat",
  delete_all: "Deleted all chats",
};

function transcriptMarkdown(conv, agentName) {
  const lines = [`# ${conv.title}`, `Owner: ${conv.owner_name}`, ""];
  for (const m of conv.messages) {
    const text = (m.visible_content || "").trim();
    if (!text) continue;
    lines.push(`**${m.role === "user" ? conv.owner_name : agentName}**`, "", text, "");
  }
  return lines.join("\n");
}

class AssistWorkspaceAdmin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._overview = null;
    this._agents = [];
    this._view = { kind: "users" }; // users | chats | chat
    this._chats = [];
    this._chat = null;
    this._error = "";
    this._busy = false;
    this._first = true;
  }

  set hass(hass) {
    this._hass = hass;
    if (this._first) {
      this._first = false;
      this._loadOverview();
      this._loadAgents();
    }
  }
  set narrow(v) { this._narrow = v; this._render(); }
  set panel(_) {}
  connectedCallback() { this._render(); }

  async _ws(msg) {
    try {
      this._error = "";
      return await this._hass.callWS(msg);
    } catch (e) {
      this._error = (e && e.message) || "Request failed";
      this._render();
      return null;
    }
  }

  async _loadAgents() {
    const res = await this._ws({ type: "conversation/agent/list" });
    this._agents = (res && res.agents) || [];
    this._render();
  }

  async _loadOverview() {
    const res = await this._ws({ type: "assist_workspace/admin/overview" });
    if (res) this._overview = res;
    this._render();
  }

  _agentName(id) {
    const a = this._agents.find((x) => x.id === id);
    return a ? a.name : id || "Assistant";
  }

  async _openUser(user) {
    const res = await this._ws({ type: "assist_workspace/admin/conversations", user_id: user.id });
    if (!res) return;
    this._chats = res.conversations;
    this._view = { kind: "chats", user };
    this._render();
  }

  async _openChat(summary) {
    const res = await this._ws({ type: "assist_workspace/admin/conversation/get", conversation_id: summary.id });
    if (!res) return;
    this._chat = res;
    this._view = { kind: "chat", user: this._view.user };
    this._render();
  }

  async _setAgent(user, agentId) {
    const res = await this._ws({ type: "assist_workspace/admin/user/set_agent", user_id: user.id, agent_id: agentId || null });
    if (res) user.forced_agent_id = res.forced_agent_id;
    this._render();
  }

  async _deleteChat() {
    const c = this._chat;
    if (!confirm(`Delete "${c.title}" for ${c.owner_name}? This cannot be undone.`)) return;
    const res = await this._ws({ type: "assist_workspace/admin/conversation/delete", conversation_id: c.id });
    if (res === null && this._error) return;
    await this._openUser(this._view.user);
    this._loadOverview();
  }

  async _clearUser(user) {
    if (!confirm(`Delete ALL ${user.conversation_count} chats for ${user.name}? This cannot be undone.`)) return;
    const res = await this._ws({ type: "assist_workspace/admin/user/clear", user_id: user.id });
    if (res) this._loadOverview();
  }

  _export() {
    const c = this._chat;
    const md = transcriptMarkdown(c, this._agentName(c.agent_id));
    const url = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(c.owner_name + " - " + c.title).replace(/[\\/:*?"<>|]+/g, "_").slice(0, 80)}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  _back() {
    if (this._view.kind === "chat") this._view = { kind: "chats", user: this._view.user };
    else this._view = { kind: "users" };
    this._render();
  }

  // ---- views ---------------------------------------------------------------

  _usersView() {
    const o = this._overview;
    if (!o) return h("div", { class: "empty" }, this._error || "Loading…");
    const cards = o.users.map((u) =>
      h("div", { class: "card" },
        h("div", { class: "row top" },
          h("div", { class: "avatar" }, (u.name || "?").slice(0, 1).toUpperCase()),
          h("div", { class: "grow" },
            h("div", { class: "ttl" }, u.name,
              u.is_admin ? h("span", { class: "chip" }, "Admin") : null,
              u.removed ? h("span", { class: "chip warn" }, "Removed") : null,
              !u.is_active && !u.removed ? h("span", { class: "chip warn" }, "Disabled") : null),
            h("div", { class: "meta" }, `${u.conversation_count} chat${u.conversation_count === 1 ? "" : "s"} · last active ${fmt(u.last_activity)}`))),
        u.removed ? null : h("label", { class: "field" }, "Assistant for this user",
          h("select", { onchange: (e) => this._setAgent(u, e.target.value) },
            h("option", { value: "", ...(u.forced_agent_id ? {} : { selected: true }) }, "Their choice (card setting)"),
            ...this._agents.map((a) => h("option", { value: a.id, ...(a.id === u.forced_agent_id ? { selected: true } : {}) }, `Always ${a.name}`)))),
        h("div", { class: "row actions" },
          h("button", { class: "btn primary", disabled: !o.enabled || !u.conversation_count, onclick: () => this._openUser(u) }, "Review chats"),
          h("button", { class: "btn danger", disabled: !o.enabled || !u.conversation_count, onclick: () => this._clearUser(u) }, "Delete all"))));

    const log = o.log.length
      ? h("div", { class: "scroll" }, h("table", { class: "tbl" },
          h("thead", {}, h("tr", {}, h("th", {}, "When"), h("th", {}, "Admin"), h("th", {}, "What"), h("th", { class: "hide-s" }, "Whose chat"))),
          h("tbody", {}, o.log.map((l) => h("tr", {},
            h("td", { class: "nowrap" }, fmt(l.time)),
            h("td", {}, l.admin_name || ""),
            h("td", {}, (ACTION_LABEL[l.action] || l.action) + (l.title ? `: ${l.title}` : "")),
            h("td", { class: "hide-s" }, l.owner_name || ""))))))
      : h("div", { class: "empty small" }, "Nobody has looked at anyone else's chats yet.");

    return h("div", {},
      o.enabled ? null : h("div", { class: "banner" }, "Reviewing other users' chats is turned off. Turn it on in Settings > Devices & services > Assist Workspace > Configure."),
      h("p", { class: "note" }, "Users who aren't admins see a small notice that an admin can review their chats, and every look is recorded in the log below."),
      h("div", { class: "grid" }, cards),
      h("h2", {}, "Access log"),
      log);
  }

  _chatsView() {
    const { user } = this._view;
    return h("div", {},
      h("button", { class: "btn", onclick: () => this._back() }, "← All users"),
      h("h2", {}, `${user.name}'s chats`),
      this._chats.length
        ? h("div", { class: "list" }, this._chats.map((c) => h("button", { class: "item", onclick: () => this._openChat(c) },
            h("div", { class: "grow" },
              h("div", { class: "ttl" }, c.pinned ? "📌 " : "", c.title),
              h("div", { class: "meta" }, `${c.message_count} message${c.message_count === 1 ? "" : "s"} · ${fmt(c.updated_at)} · ${this._agentName(c.agent_id)}`)),
            h("span", { class: "chev" }, "›"))))
        : h("div", { class: "empty" }, "No chats."));
  }

  _tool(t) {
    const body = (label, data) => data == null ? null : h("div", {}, h("div", { class: "meta" }, label), h("pre", {}, typeof data === "string" ? data : JSON.stringify(data, null, 2)));
    return h("details", { class: "tool" },
      h("summary", {}, `🔧 ${t.name}`, h("span", { class: `chip ${t.status === "failed" ? "bad" : ""}` }, t.status)),
      body("Request", t.request), body("Response", t.response));
  }

  _chatView() {
    const c = this._chat;
    const agent = this._agentName(c.agent_id);
    const bubbles = c.messages.map((m) => {
      const isUser = m.role === "user";
      const flag = m.status && m.status !== "completed" ? h("span", { class: "chip warn" }, m.status) : null;
      return h("div", { class: `msg ${isUser ? "user" : "bot"}` },
        h("div", { class: "who" }, isUser ? c.owner_name : agent, flag, h("span", { class: "meta" }, ` ${fmt(m.created_at)}`)),
        m.visible_content ? h("div", { class: "text" }, m.visible_content) : null,
        ...(m.tool_executions || []).map((t) => this._tool(t)));
    });
    return h("div", {},
      h("div", { class: "row between" },
        h("button", { class: "btn", onclick: () => this._back() }, `← ${this._view.user.name}'s chats`),
        h("div", { class: "row" },
          h("button", { class: "btn", onclick: () => this._export() }, "Export"),
          h("button", { class: "btn danger", onclick: () => this._deleteChat() }, "Delete"))),
      h("h2", { class: "chat-title" }, c.title),
      h("div", { class: "meta" }, `Read-only · ${c.owner_name} with ${agent} · started ${fmt(c.created_at)}`),
      h("div", { class: "thread" }, bubbles));
  }

  // ---- render ----------------------------------------------------------------

  _render() {
    const root = this.shadowRoot;
    const style = h("style", {}, `
      :host { display:block; background:var(--primary-background-color); color:var(--primary-text-color);
              min-height:100vh; font-family:var(--paper-font-body1_-_font-family, Roboto, sans-serif); }
      * { box-sizing:border-box; }
      header { display:flex; align-items:center; gap:8px; height:56px; padding:0 16px;
               background:var(--app-header-background-color, var(--primary-color));
               color:var(--app-header-text-color, #fff); font-size:20px; }
      header button { background:none; border:none; color:inherit; font-size:24px; cursor:pointer; padding:4px 8px; }
      header .spacer { flex:1; }
      header .refresh { font-size:14px; border:1px solid rgba(255,255,255,.5); border-radius:8px; padding:4px 12px; }
      main { max-width:960px; margin:0 auto; padding:16px; }
      h2 { font-size:12px; font-weight:600; margin:26px 0 10px; color:var(--secondary-text-color); text-transform:uppercase; letter-spacing:.08em; }
      h2.chat-title { font-size:20px; text-transform:none; letter-spacing:0; color:var(--primary-text-color); margin:18px 0 4px; }
      .note { color:var(--secondary-text-color); font-size:14px; margin:0 0 14px; }
      .meta { font-size:12px; color:var(--secondary-text-color); }
      .grow { flex:1; min-width:0; }
      .row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
      .row.between { justify-content:space-between; }
      .row.top { flex-wrap:nowrap; }
      .row.actions { margin-top:14px; }
      .ttl { font-size:16px; font-weight:600; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
      .err { color:var(--error-color, #db4437); padding:8px 0; }
      .empty { border:2px dashed var(--divider-color); border-radius:16px; padding:22px; text-align:center; color:var(--secondary-text-color); }
      .empty.small { padding:12px; font-size:14px; }
      .banner { background:color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent); border:1px solid var(--warning-color, #ffa600);
                border-radius:12px; padding:12px 14px; margin-bottom:14px; font-size:14px; }
      .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:14px; }
      .card { background:var(--card-background-color, #fff); border-radius:16px; padding:16px; box-shadow:var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.2)); }
      .avatar { width:44px; height:44px; border-radius:50%; display:grid; place-items:center; flex:none; font-weight:700; font-size:18px;
                background:color-mix(in srgb, var(--primary-color) 18%, transparent); color:var(--primary-color); }
      .chip { font-size:11px; font-weight:600; padding:2px 8px; border-radius:999px; color:var(--primary-color);
              background:color-mix(in srgb, var(--primary-color) 15%, transparent); margin-left:6px; }
      .chip.warn { color:var(--warning-color, #ffa600); background:color-mix(in srgb, var(--warning-color, #ffa600) 16%, transparent); }
      .chip.bad { color:var(--error-color, #db4437); background:color-mix(in srgb, var(--error-color, #db4437) 16%, transparent); }
      .field { display:grid; gap:4px; margin-top:14px; font-size:12px; color:var(--secondary-text-color); }
      select { width:100%; padding:9px 10px; border:1px solid var(--divider-color); border-radius:8px; background:var(--card-background-color);
               color:var(--primary-text-color); font:inherit; font-size:14px; }
      .btn { border:1px solid var(--divider-color); background:none; color:var(--primary-text-color); border-radius:8px; padding:7px 14px;
             cursor:pointer; font:inherit; font-size:13px; }
      .btn:disabled { opacity:.4; cursor:default; }
      .btn.primary { background:var(--primary-color); border-color:var(--primary-color); color:#fff; }
      .btn.danger:hover:not(:disabled) { border-color:var(--error-color, #db4437); color:var(--error-color, #db4437); }
      .list { background:var(--card-background-color, #fff); border-radius:14px; overflow:hidden; box-shadow:var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.2)); }
      .item { display:flex; align-items:center; gap:10px; width:100%; text-align:left; border:0; border-bottom:1px solid var(--divider-color);
              background:none; color:inherit; padding:14px 16px; cursor:pointer; font:inherit; }
      .item:last-child { border-bottom:0; }
      .item:hover { background:var(--secondary-background-color); }
      .chev { color:var(--secondary-text-color); font-size:22px; }
      .thread { display:flex; flex-direction:column; gap:14px; margin-top:18px; }
      .msg { max-width:min(760px, 92%); }
      .msg.user { align-self:flex-end; }
      .msg .who { font-size:12px; font-weight:600; color:var(--secondary-text-color); margin-bottom:3px; display:flex; align-items:center; gap:4px; }
      .msg .text { white-space:pre-wrap; overflow-wrap:anywhere; padding:10px 14px; border-radius:14px; line-height:1.5;
                   background:var(--card-background-color, #fff); box-shadow:var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.2)); }
      .msg.user .text { background:var(--primary-color); color:var(--text-primary-color, #fff); }
      .tool { margin-top:6px; font-size:13px; background:var(--secondary-background-color); border-radius:10px; padding:6px 10px; }
      .tool summary { cursor:pointer; }
      .tool pre { margin:4px 0 8px; padding:8px; border-radius:8px; overflow:auto; max-height:220px; font-size:12px;
                  background:var(--card-background-color, #fff); }
      .scroll { max-height:340px; overflow:auto; border-radius:14px; background:var(--card-background-color, #fff);
                box-shadow:var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.2)); }
      .tbl { width:100%; border-collapse:collapse; }
      .tbl th { position:sticky; top:0; background:var(--card-background-color, #fff); text-align:left; font-size:11px; letter-spacing:.06em;
                text-transform:uppercase; color:var(--secondary-text-color); padding:10px 14px; border-bottom:1px solid var(--divider-color); }
      .tbl td { padding:10px 14px; border-bottom:1px solid var(--divider-color); font-size:14px; vertical-align:top; }
      .tbl tr:last-child td { border-bottom:0; }
      .nowrap { white-space:nowrap; }
      @media (max-width:640px) { .hide-s { display:none; } }
    `);

    const menu = h("button", {
      title: "Menu",
      onclick: () => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true })),
    }, "☰");

    let body;
    if (this._view.kind === "chat" && this._chat) body = this._chatView();
    else if (this._view.kind === "chats") body = this._chatsView();
    else body = this._usersView();

    root.replaceChildren(
      style,
      h("header", {}, this._narrow ? menu : null, "Chat Review", h("span", { class: "spacer" }),
        h("button", { class: "refresh", onclick: () => { this._loadOverview(); } }, "Refresh")),
      h("main", {}, this._error ? h("div", { class: "err" }, this._error) : null, body));
  }
}

customElements.define("assist-workspace-admin", AssistWorkspaceAdmin);
