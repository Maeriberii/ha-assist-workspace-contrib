//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = globalThis, u = l.ShadowRoot && (l.ShadyCSS === void 0 || l.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, d = Symbol(), f = /* @__PURE__ */ new WeakMap(), p = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== d) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (u && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = f.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && f.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, m = (e) => new p(typeof e == "string" ? e : e + "", void 0, d), h = (e, ...t) => new p(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, d), g = (e, t) => {
	if (u) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = l.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, _ = u ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return m(t);
})(e) : e, { is: v, defineProperty: y, getOwnPropertyDescriptor: b, getOwnPropertyNames: x, getOwnPropertySymbols: ee, getPrototypeOf: S } = Object, C = globalThis, w = C.trustedTypes, te = w ? w.emptyScript : "", T = C.reactiveElementPolyfillSupport, E = (e, t) => e, D = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? te : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, O = (e, t) => !v(e, t), ne = {
	attribute: !0,
	type: String,
	converter: D,
	reflect: !1,
	useDefault: !1,
	hasChanged: O
};
Symbol.metadata ??= Symbol("metadata"), C.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var k = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ne) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && y(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = b(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? ne;
	}
	static _$Ei() {
		if (this.hasOwnProperty(E("elementProperties"))) return;
		let e = S(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(E("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
			let e = this.properties, t = [...x(e), ...ee(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(_(e));
		} else e !== void 0 && t.push(_(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return g(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? D : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? D : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? O)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[E("elementProperties")] = /* @__PURE__ */ new Map(), k[E("finalized")] = /* @__PURE__ */ new Map(), T?.({ ReactiveElement: k }), (C.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var A = globalThis, j = (e) => e, re = A.trustedTypes, M = re ? re.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ie = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, P = "?" + N, ae = `<${P}>`, oe = document, se = () => oe.createComment(""), ce = (e) => e === null || typeof e != "object" && typeof e != "function", le = Array.isArray, ue = (e) => le(e) || typeof e?.[Symbol.iterator] == "function", de = "[ 	\n\f\r]", fe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, F = />/g, me = RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), I = /'/g, he = /"/g, L = /^(?:script|style|textarea|title)$/i, R = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), ge = Symbol.for("lit-noChange"), z = Symbol.for("lit-nothing"), _e = /* @__PURE__ */ new WeakMap(), ve = oe.createTreeWalker(oe, 129);
function ye(e, t) {
	if (!le(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return M === void 0 ? t : M.createHTML(t);
}
var be = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = fe;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === fe ? c[1] === "!--" ? o = pe : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = me) : (L.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = me) : o = F : o === me ? c[0] === ">" ? (o = i ?? fe, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? me : c[3] === "\"" ? he : I) : o === he || o === I ? o = me : o === pe || o === F ? o = fe : (o = me, i = void 0);
		let d = o === me && e[t + 1].startsWith("/>") ? " " : "";
		a += o === fe ? n + ae : l >= 0 ? (r.push(s), n.slice(0, l) + ie + n.slice(l) + N + d) : n + N + (l === -2 ? t : d);
	}
	return [ye(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, xe = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = be(t, n);
		if (this.el = e.createElement(l, r), ve.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = ve.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ie)) {
					let t = u[o++], n = i.getAttribute(e).split(N), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Te : r[1] === "?" ? Ee : r[1] === "@" ? De : we
					}), i.removeAttribute(e);
				} else e.startsWith(N) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (L.test(i.tagName)) {
					let e = i.textContent.split(N), t = e.length - 1;
					if (t > 0) {
						i.textContent = re ? re.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], se()), ve.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], se());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === P) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(N, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += N.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = oe.createElement("template");
		return n.innerHTML = e, n;
	}
};
function B(e, t, n = e, r) {
	if (t === ge) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = ce(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = B(e, i._$AS(e, t.values), i, r)), t;
}
var Se = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? oe).importNode(t, !0);
		ve.currentNode = r;
		let i = ve.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ce(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Oe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = ve.nextNode(), a++);
		}
		return ve.currentNode = oe, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ce = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = z, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = B(this, e, t), ce(e) ? e === z || e == null || e === "" ? (this._$AH !== z && this._$AR(), this._$AH = z) : e !== this._$AH && e !== ge && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ue(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== z && ce(this._$AH) ? this._$AA.nextSibling.data = e : this.T(oe.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = xe.createElement(ye(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Se(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = _e.get(e.strings);
		return t === void 0 && _e.set(e.strings, t = new xe(e)), t;
	}
	k(t) {
		le(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(se()), this.O(se()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = j(e).nextSibling;
			j(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, we = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = z, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = z;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = B(this, e, t, 0), a = !ce(e) || e !== this._$AH && e !== ge, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = B(this, r[n + o], t, o), s === ge && (s = this._$AH[o]), a ||= !ce(s) || s !== this._$AH[o], s === z ? e = z : e !== z && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === z ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Te = class extends we {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === z ? void 0 : e;
	}
}, Ee = class extends we {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== z);
	}
}, De = class extends we {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = B(this, e, t, 0) ?? z) === ge) return;
		let n = this._$AH, r = e === z && n !== z || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== z && (n === z || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Oe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		B(this, e);
	}
}, ke = {
	M: ie,
	P: N,
	A: P,
	C: 1,
	L: be,
	R: Se,
	D: ue,
	V: B,
	I: Ce,
	H: we,
	N: Ee,
	U: De,
	B: Te,
	F: Oe
}, Ae = A.litHtmlPolyfillSupport;
Ae?.(xe, Ce), (A.litHtmlVersions ??= []).push("3.3.3");
var je = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ce(t.insertBefore(se(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Me = globalThis, V = class extends k {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = je(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return ge;
	}
};
V._$litElement$ = !0, V.finalized = !0, Me.litElementHydrateSupport?.({ LitElement: V });
var Ne = Me.litElementPolyfillSupport;
Ne?.({ LitElement: V }), (Me.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/assist-workspace-editor.ts
var Pe = class extends V {
	static properties = {
		hass: { attribute: !1 },
		config: { attribute: !1 }
	};
	agents = [];
	connectedCallback() {
		super.connectedCallback(), this.loadAgents();
	}
	updated(e) {
		e.has("hass") && this.loadAgents();
	}
	setConfig(e) {
		this.config = e;
	}
	async loadAgents() {
		this.hass && (this.agents = (await this.hass.callWS({ type: "conversation/agent/list" })).agents ?? []), this.requestUpdate();
	}
	render() {
		let e = (e, t) => this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: {
				...this.config,
				[e]: t
			} },
			bubbles: !0,
			composed: !0
		})), t = (t) => (n) => e(t, n.target.checked), n = (t) => (n) => e(t, n.detail.value);
		return R`<div class="editor">
      <section>
        <h3>Assistant</h3>
        <ha-select
          label="Assistant"
          .value=${this.config?.agent_id ?? ""}
          .options=${this.agents.map((e) => ({
			value: e.id,
			label: e.name
		}))}
          @selected=${n("agent_id")}
        ></ha-select>
        <p>
          Used for newly created conversations. Existing conversations keep
          their original assistant.
        </p>
      </section>
      <section>
        <h3>Conversation</h3>
        <ha-formfield label="Open last conversation on load"
          ><ha-switch
            ?checked=${this.config?.open_last_conversation ?? !0}
            @change=${t("open_last_conversation")}
          ></ha-switch
        ></ha-formfield>
        <ha-formfield label="Press Enter to send"
          ><ha-switch
            ?checked=${this.config?.enter_sends ?? !0}
            @change=${t("enter_sends")}
          ></ha-switch
        ></ha-formfield>
        <ha-formfield label="Confirm conversation deletion"
          ><ha-switch
            ?checked=${this.config?.confirm_delete ?? !0}
            @change=${t("confirm_delete")}
          ></ha-switch
        ></ha-formfield>
      </section>
      <section>
        <h3>Workspace</h3>
        <ha-formfield label="Keep drafts locally"
          ><ha-switch
            ?checked=${this.config?.keep_drafts ?? !0}
            @change=${t("keep_drafts")}
          ></ha-switch
        ></ha-formfield>
        <ha-select
          label="Default sidebar"
          .value=${this.config?.default_sidebar_state ?? "expanded"}
          .options=${[{
			value: "expanded",
			label: "Expanded"
		}, {
			value: "collapsed",
			label: "Collapsed"
		}]}
          @selected=${n("default_sidebar_state")}
        ></ha-select>
        <ha-formfield label="Show assistant name"
          ><ha-switch
            ?checked=${this.config?.show_assistant_name ?? !0}
            @change=${t("show_assistant_name")}
          ></ha-switch
        ></ha-formfield>
        <ha-formfield label="Show tool activity"
          ><ha-switch
            ?checked=${this.config?.show_tool_activity ?? !0}
            @change=${t("show_tool_activity")}
          ></ha-switch
        ></ha-formfield>
      </section>
    </div>`;
	}
	static styles = [h`
      .editor {
        box-sizing: border-box;
        max-width: 520px;
        width: 100%;
      }
      section {
        margin: 0 0 24px;
      }
      h3 {
        margin: 0 0 12px;
        font-size: 1rem;
      }
      ha-select,
      ha-formfield {
        display: block;
        width: 100%;
        margin: 8px 0;
      }
      p {
        margin: 6px 0;
        color: var(--secondary-text-color);
        font-size: 0.9rem;
      }
    `];
};
customElements.get("assist-workspace-editor") || customElements.define("assist-workspace-editor", Pe);
//#endregion
//#region src/components/workspace-composer.ts
var Fe = class extends V {
	static properties = {
		draft: {},
		running: { type: Boolean },
		textareaDisabled: { type: Boolean },
		canSend: { type: Boolean },
		enterSends: { type: Boolean }
	};
	composing = !1;
	resize(e) {
		e.style.height = "48px", e.style.height = `${Math.max(48, Math.min(e.scrollHeight, 144))}px`;
	}
	updated(e) {
		if (e.has("draft")) {
			let e = this.renderRoot.querySelector("textarea");
			e && this.resize(e);
		}
	}
	input(e) {
		let t = e.target;
		this.resize(t), this.canSend = !!t.value.trim() && !this.running && !this.textareaDisabled, this.requestUpdate(), this.dispatchEvent(new CustomEvent("draft-changed", {
			detail: t.value,
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return R`<div class="composer-shell">
      <textarea
        aria-label="Ask Assist"
        .value=${this.draft ?? ""}
        ?disabled=${this.textareaDisabled}
        @input=${this.input}
        @compositionstart=${() => this.composing = !0}
        @compositionend=${() => this.composing = !1}
        @keydown=${(e) => {
			e.key === "Enter" && (this.enterSends ? !e.shiftKey : e.ctrlKey || e.metaKey) && !e.isComposing && !this.composing && this.canSend && (e.preventDefault(), this.dispatchEvent(new CustomEvent("send-requested", {
				bubbles: !0,
				composed: !0
			})));
		}}
      ></textarea
      ><button
        class="send"
        aria-label=${this.running ? "Stop" : "Send"}
        title=${this.running ? "Stop" : "Send"}
        ?disabled=${!this.running && !this.canSend}
        @click=${() => this.dispatchEvent(new CustomEvent(this.running ? "stop-requested" : "send-requested", {
			bubbles: !0,
			composed: !0
		}))}
      >
        ${this.running ? "■" : "↑"}
      </button>
    </div>`;
	}
	static styles = h`
    :host {
      display: block;
      padding: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .composer-shell {
      position: relative;
      display: grid;
      min-height: 48px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
    }
    .composer-shell:focus-within {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color);
    }
    textarea {
      min-width: 0;
      box-sizing: border-box;
      height: 48px;
      min-height: 48px;
      max-height: 144px;
      padding: 12px 52px 12px 12px;
      resize: none;
      overflow-y: auto;
      color: inherit;
      background: transparent;
      border: 0;
      font-family: inherit;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: normal;
    }
    textarea:focus {
      outline: none;
    }
    .send {
      position: absolute;
      right: 8px;
      bottom: 8px;
      width: var(--aw-touch-size, 34px);
      height: var(--aw-touch-size, 34px);
      border: 0;
      border-radius: 50%;
      color: var(--text-primary-color, white);
      background: var(--primary-color);
      font: inherit;
      line-height: 1;
      cursor: pointer;
    }
    .send:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  `;
};
customElements.get("assist-workspace-composer") || customElements.define("assist-workspace-composer", Fe);
//#endregion
//#region node_modules/lit-html/directive.js
var Ie = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Le = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Re = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, { I: ze } = ke, Be = (e) => e, Ve = () => document.createComment(""), He = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new ze(r.insertBefore(Ve(), i), r.insertBefore(Ve(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = Be(e).nextSibling;
				Be(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, H = (e, t, n = e) => (e._$AI(t, n), e), Ue = {}, We = (e, t = Ue) => e._$AH = t, Ge = (e) => e._$AH, Ke = (e) => {
	e._$AR(), e._$AA.remove();
}, qe = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, Je = Le(class extends Re {
	constructor(e) {
		if (super(e), e.type !== Ie.CHILD) throw Error("repeat() can only be used in text expressions");
	}
	dt(e, t, n) {
		let r;
		n === void 0 ? n = t : t !== void 0 && (r = t);
		let i = [], a = [], o = 0;
		for (let t of e) i[o] = r ? r(t, o) : o, a[o] = n(t, o), o++;
		return {
			values: a,
			keys: i
		};
	}
	render(e, t, n) {
		return this.dt(e, t, n).values;
	}
	update(e, [t, n, r]) {
		let i = Ge(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = H(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = H(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = H(i[d], a[m]), He(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = H(i[f], a[p]), He(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = qe(o, p, m), u = qe(s, d, f)), l.has(s[d])) {
			if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = He(e, i[d]);
					H(t, a[p]), c[p] = t;
				} else c[p] = H(n, a[p]), He(e, i[d], n), i[t] = null;
				p++;
			} else Ke(i[f]), f--;
		} else Ke(i[d]), d++;
		for (; p <= m;) {
			let t = He(e, c[m + 1]);
			H(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && Ke(e);
		}
		return this.ut = o, We(e, c), ge;
	}
}), Ye = class extends V {
	static properties = {
		conversations: { attribute: !1 },
		searchHits: { attribute: !1 },
		activeId: {},
		query: {},
		searchPending: { type: Boolean },
		searchError: { type: Boolean },
		runningIds: { attribute: !1 }
	};
	label(e) {
		let t = e.updated_at ? new Date(e.updated_at) : /* @__PURE__ */ new Date(), n = /* @__PURE__ */ new Date(), r = new Date(n);
		return r.setDate(n.getDate() - 1), t.toDateString() === n.toDateString() ? "Today" : t.toDateString() === r.toDateString() ? "Yesterday" : "Older";
	}
	highlighted(e, t) {
		return t ? R`${e.slice(0, t.start)}<mark>${e.slice(t.start, t.end)}</mark>${e.slice(t.end)}` : e;
	}
	row(e, t, n) {
		let r = n?.highlight_ranges?.[0];
		return R`<div
      class="chat-row ${e.id === this.activeId ? "selected" : ""}"
    >
      <button
        class="chat-title"
        @click=${() => this.dispatchEvent(new CustomEvent("select-conversation", {
			detail: e.id,
			bubbles: !0,
			composed: !0
		}))}
      >
        <span class="result-title"
          >${this.highlighted(e.title, n?.match_type === "title" ? r : void 0)}</span
        >
        ${n?.snippet ? R`<span class="result-snippet">${this.highlighted(n.snippet, n.match_type === "message" ? r : void 0)}</span>` : z}
        ${this.runningIds?.has(e.id) ? R`<span class="running-dot" aria-label="Running">●</span>` : z}
      </button>
      <button
        class="chat-menu"
        aria-label="Conversation actions"
        @click=${(t) => this.dispatchEvent(new CustomEvent("menu-conversation", {
			detail: {
				id: e.id,
				anchor: t.currentTarget
			},
			bubbles: !0,
			composed: !0
		}))}
      >
        ⋯
      </button>
    </div>`;
	}
	render() {
		let e = "", t = !!this.query?.trim();
		return R`<button
        class="new-chat"
        @click=${() => this.dispatchEvent(new Event("new-chat", {
			bubbles: !0,
			composed: !0
		}))}
      >
        <span aria-hidden="true">＋</span> New chat</button
      ><label class="search"
        ><span aria-hidden="true">⌕</span
        ><input
          aria-label="Search chats"
          .value=${this.query ?? ""}
          @input=${(e) => this.dispatchEvent(new CustomEvent("search-changed", {
			detail: e.target.value,
			bubbles: !0,
			composed: !0
		}))}
          placeholder="Search chats"
        />${this.query ? R`<button class="clear-search" aria-label="Clear search" @click=${() => this.dispatchEvent(new CustomEvent("search-changed", {
			detail: "",
			bubbles: !0,
			composed: !0
		}))}>×</button>` : z}</label
      >
      <div class="history">
        ${t ? R`<h3 class="search-heading">Search results</h3>` : z}
        ${t && this.searchPending ? R`<p class="search-status" role="status">Searching…</p>` : z}
        ${t && !this.searchPending && this.searchError ? R`<p class="no-results" role="alert">Search failed</p>` : z}
        ${t && !this.searchPending && !this.searchError && !this.searchHits?.length ? R`<p class="no-results">No results</p>` : z}
        ${t ? Je(this.searchHits ?? [], (e) => e.conversation.id, (e) => this.row(e.conversation, !0, e)) : Je(this.conversations ?? [], (e) => e.id, (t) => {
			let n = this.label(t);
			return R`${n === e ? z : (e = n, R`<h3 class="history-heading">${n}</h3>`)}${this.row(t, !1)}`;
		})}
      </div>`;
	}
	static styles = h`
    :host {
      min-height: 0;
      height: 100%;
      display: grid;
      grid-template-rows: auto auto minmax(0, 1fr);
      gap: 8px;
      padding: 10px;
      box-sizing: border-box;
    }
    .history {
      min-height: 0;
      overflow: auto;
    }
    .new-chat,
    .search {
      min-height: var(--aw-touch-size, 40px);
      border-radius: 9px;
      padding: 0 10px;
      color: inherit;
    }
    .new-chat {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 0;
      background: transparent;
      text-align: left;
      font: inherit;
      cursor: pointer;
    }
    .new-chat:hover,
    .new-chat:focus-visible {
      background: var(--secondary-background-color);
      outline: none;
    }
    .search {
      display: flex;
      align-items: center;
      gap: 7px;
      background: var(--secondary-background-color);
    }
    .search input {
      min-width: 0;
      flex: 1;
      border: 0;
      outline: none;
      color: inherit;
      background: transparent;
      font: inherit;
    }
    .clear-search {
      min-width: var(--aw-touch-size, 28px);
      min-height: var(--aw-touch-size, 28px);
      border: 0;
      color: inherit;
      background: transparent;
      cursor: pointer;
    }
    .chat-row {
      display: flex;
      width: 100%;
    }
    .chat-title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      padding: 9px;
      border: 0;
      color: inherit;
      background: transparent;
      text-align: left;
    }
    .chat-menu {
      min-width: var(--aw-touch-size, 32px);
      min-height: var(--aw-touch-size, 32px);
      border: 0;
      color: inherit;
      background: transparent;
    }
    .selected {
      background: var(--secondary-background-color);
      box-shadow: inset 2px 0 var(--primary-color);
    }
    .history-heading {
      margin: 16px 8px 6px;
      color: var(--secondary-text-color);
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .search-heading {
      margin: 12px 8px 8px;
      font-size: 0.85rem;
    }
    .no-results {
      margin: 24px 8px;
      color: var(--secondary-text-color);
    }
    .search-status {
      margin: 24px 8px;
      color: var(--secondary-text-color);
    }
    .result-title,
    .result-snippet {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .result-title {
      white-space: nowrap;
    }
    .result-snippet {
      margin-top: 3px;
      color: var(--secondary-text-color);
      font-size: 0.78rem;
      line-height: 1.35;
    }
    mark {
      color: inherit;
      background: color-mix(in srgb, var(--primary-color) 24%, transparent);
      border-radius: 2px;
    }
    .running-dot {
      margin-left: 6px;
      color: var(--primary-color);
      font-size: 0.65rem;
    }
  `;
};
customElements.get("assist-workspace-history") || customElements.define("assist-workspace-history", Ye);
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var Xe = {
	attribute: !0,
	type: String,
	converter: D,
	reflect: !1,
	hasChanged: O
}, Ze = (e = Xe, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function Qe(e) {
	return (t, n) => typeof n == "object" ? Ze(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function $e(e) {
	return Qe({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/base.js
var U = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n), et;
function tt(e) {
	return (t, n) => U(t, n, { get() {
		return (this.renderRoot ?? (et ??= document.createDocumentFragment())).querySelectorAll(e);
	} });
}
//#endregion
//#region node_modules/lit-html/directives/class-map.js
var nt = Le(class extends Re {
	constructor(e) {
		if (super(e), e.type !== Ie.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
	}
	update(e, [t]) {
		if (this.st === void 0) {
			this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((e) => e !== "")));
			for (let e in t) t[e] && !this.nt?.has(e) && this.st.add(e);
			return this.render(t);
		}
		let n = e.element.classList;
		for (let e of this.st) e in t || (n.remove(e), this.st.delete(e));
		for (let e in t) {
			let r = !!t[e];
			r === this.st.has(e) || this.nt?.has(e) || (r ? (n.add(e), this.st.add(e)) : (n.remove(e), this.st.delete(e)));
		}
		return ge;
	}
});
//#endregion
//#region node_modules/lit-html/directives/map.js
function* rt(e, t) {
	if (e !== void 0) {
		let n = 0;
		for (let r of e) yield t(r, n++);
	}
}
//#endregion
//#region node_modules/lit-html/directives/when.js
function it(e, t, n) {
	return e ? t(e) : n?.(e);
}
//#endregion
//#region node_modules/@alenaksu/json-viewer/dist/chunk-6HJCMUMX.js
var at = Object.defineProperty, ot = Object.getOwnPropertyDescriptor, st = (e, t, n, r) => {
	for (var i = r > 1 ? void 0 : r ? ot(t, n) : t, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = (r ? o(t, n, i) : o(i)) || i);
	return r && i && at(t, n, i), i;
};
function ct(e) {
	return e instanceof RegExp;
}
function lt(e) {
	return e === null ? "null" : Array.isArray(e) ? "array" : e.constructor.name.toLowerCase();
}
function ut(e) {
	return e !== Object(e);
}
function dt(e, { nodeCount: t = 3, maxLength: n = 15 } = {}) {
	let r = Array.isArray(e), i = Object.keys(e), a = i.slice(0, t), o = [], s = (e) => {
		switch (lt(e)) {
			case "object": return Object.keys(e).length === 0 ? "{ }" : "{ ... }";
			case "array": return e.length === 0 ? "[ ]" : "[ ... ]";
			case "string": return `"${e.substring(0, n)}${e.length > n ? "..." : ""}"`;
			default: return String(e);
		}
	}, c = [];
	for (let t of a) {
		let n = [], i = e[t];
		r || n.push(`${t}: `), n.push(s(i)), c.push(n.join(""));
	}
	i.length > t && c.push("..."), o.push(c.join(", "));
	let l = o.join("");
	return r ? `[ ${l} ]` : `{ ${l} }`;
}
function* ft(e) {
	let t = [[
		e,
		"",
		[]
	]];
	for (; t.length;) {
		let [e, n, r] = t.shift();
		if (n && (yield [
			e,
			n,
			r
		]), !ut(e)) for (let [i, a] of Object.entries(e)) t.push([
			a,
			`${n}${n ? "." : ""}${i}`,
			[...r, n]
		]);
	}
}
function pt(e, t) {
	let n = e.split("."), r = t.split("."), i = (e) => e === "*", a = (e) => e === "**", o = 0, s = 0;
	for (; o < n.length;) {
		let e = r[s];
		if (e === n[o] || i(e)) s++, o++;
		else if (a(e)) s++, o = n.length - (r.length - s);
		else return !1;
	}
	return s === r.length;
}
var mt = {
	fromAttribute: (e) => e && e.trim() ? JSON.parse(e) : void 0,
	toAttribute: (e) => JSON.stringify(e)
}, ht = (e) => e !== void 0, gt = (e, t) => ct(t) ? !!e.match(t) : pt(e, t), _t = (e, t) => t.split(".").reduce((e, t) => e[t], e), vt = (e, t) => (n) => ({ expanded: {
	...n.expanded,
	[e]: ht(t) ? !!t : !n.expanded[e]
} }), yt = (e, t) => (n, r) => {
	let i = {};
	if (e) for (let [, n, a] of ft(r.data)) gt(n, e) && (i[n] = t, a.forEach((e) => i[e] = t));
	return { expanded: i };
}, bt = (e) => (t, n) => {
	let r = {};
	if (e) for (let [, t, i] of ft(n.data)) gt(t, e) ? (r[t] = !1, i.forEach((e) => r[e] = !1)) : r[t] = !0;
	return { filtered: r };
}, xt = () => () => ({ filtered: {} }), St = (e) => () => ({ highlight: e }), Ct = h`
    :where(:host) {
        --background-color: #2a2f3a;
        --color: #f8f8f2;
        --string-color: #a3eea0;
        --number-color: #d19a66;
        --boolean-color: #4ba7ef;
        --null-color: #df9cf3;
        --property-color: #6fb3d2;
        --preview-color: rgba(222, 175, 143, 0.9);
        --highlight-color:  #c92a2a;
        --outline-color: #e0e4e5;
        --outline-width: 1px;
        --outline-style: dotted;

        --font-family: Nimbus Mono PS, Courier New, monospace;
        --font-size: 1rem;
        --line-height: 1.2rem;

        --indent-size: 0.5rem;
        --indentguide-size: 1px;
        --indentguide-style: solid;
        --indentguide-color: #495057;
        --indentguide-color-active: #ced4da;
        --indentguide: var(--indentguide-size) var(--indentguide-style) var(--indentguide-color);
        --indentguide-active: var(--indentguide-size) var(--indentguide-style) var(--indentguide-color-active);
    }

    :host {
        display: block;
        background-color: var(--background-color);
        color: var(--color);
        font-family: var(--font-family);
        font-size: var(--font-size);
        line-height: var(--line-height);
    }

    :focus {
        outline-color: var(--outline-color);
        outline-width: var(--outline-width);
        outline-style: var(--outline-style);
    }

    .preview {
        color: var(--preview-color);
    }

    .null {
        color: var(--null-color);
    }

    .key {
        color: var(--property-color);
        display: inline-flex;
        align-items: flex-start;
    }

    .collapsable::before {
        display: inline-flex;
        font-size: 0.8em;
        content: '▶';
        width: var(--line-height);
        height: var(--line-height);
        align-items: center;
        justify-content: center;

        transition: transform 195ms ease-out;
        transform: rotate(90deg);

        color: inherit;
    }

    .collapsable--collapsed::before {
        transform: rotate(0);
    }

    .collapsable {
        cursor: pointer;
        user-select: none;
    }

    .string {
        color: var(--string-color);
    }

    .number {
        color: var(--number-color);
    }

    .boolean {
        color: var(--boolean-color);
    }

    ul {
        padding: 0;
        clear: both;
    }

    ul,
    li {
        list-style: none;
        position: relative;
    }

    li ul > li {
        position: relative;
        margin-left: calc(var(--indent-size) + var(--line-height));
        padding-left: 0px;
    }

    ul ul::before {
        content: '';
        border-left: var(--indentguide);
        position: absolute;
        left: calc(var(--line-height) / 2 - var(--indentguide-size));
        top: 0.2rem;
        bottom: 0.2rem;
    }

    ul ul:hover::before {
        border-left: var(--indentguide-active);
    }

    mark {
        background-color: var(--highlight-color);
    }
`, wt = class extends V {
	constructor() {
		super(), this.state = {
			expanded: {},
			filtered: {},
			highlight: null
		}, this.lastFocusedItem = null, this.#e = (e) => (t) => {
			t.preventDefault(), this.setState(vt(e));
		}, this.#t = (e) => {
			let t = e.target;
			e.target === this && this.#i(this.lastFocusedItem || this.nodeElements[0]), t.matches("[role=\"treeitem\"]") && (this.lastFocusedItem && (this.lastFocusedItem.tabIndex = -1), this.lastFocusedItem = t, this.tabIndex = -1, t.tabIndex = 0);
		}, this.#n = (e) => {
			let t = e.relatedTarget;
			(!t || !this.contains(t)) && (this.tabIndex = 0);
		}, this.addEventListener("focusin", this.#t), this.addEventListener("focusout", this.#n);
	}
	static {
		this.styles = [Ct];
	}
	static customRenderer(e, t) {
		return JSON.stringify(e);
	}
	async setState(e) {
		let t = this.state;
		this.state = {
			...t,
			...e(t, this)
		};
	}
	connectedCallback() {
		!this.hasAttribute("data") && !ht(this.data) && this.setAttribute("data", this.innerText), this.setAttribute("role", "node"), this.setAttribute("tabindex", "0"), super.connectedCallback();
	}
	#e;
	#t;
	#n;
	#r(e) {
		if (![
			"ArrowDown",
			"ArrowUp",
			"ArrowRight",
			"ArrowLeft",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = [...this.nodeElements], n = this.matches(":dir(ltr)"), r = this.matches(":dir(rtl)");
		if (t.length > 0) {
			e.preventDefault();
			let i = t.findIndex((e) => e.matches(":focus")), a = t[i], o = this.state.expanded[a.dataset.path], s = ut(_t(this.data, a.dataset.path)), c = (e) => {
				let n = t[Math.max(Math.min(e, t.length - 1), 0)];
				this.#i(n);
			}, l = (e) => {
				this.setState(vt(a.dataset.path, e));
			};
			e.key === "ArrowDown" ? c(i + 1) : e.key === "ArrowUp" ? c(i - 1) : n && e.key === "ArrowRight" || r && e.key === "ArrowLeft" ? !a || o || s ? c(i + 1) : l(!0) : n && e.key === "ArrowLeft" || r && e.key === "ArrowRight" ? !a || !o || s ? c(i - 1) : l(!1) : e.key === "Home" ? c(0) : e.key === "End" && c(t.length - 1);
		}
	}
	#i(e) {
		e.focus();
	}
	expand(e) {
		this.setState(yt(e, !0));
	}
	expandAll() {
		this.setState(yt("**", !0));
	}
	collapseAll() {
		this.setState(yt("**", !1));
	}
	collapse(e) {
		this.setState(yt(e, !1));
	}
	*search(e) {
		for (let [t, n] of ft(this.data)) ut(t) && String(t).match(e) && (this.expand(n), this.updateComplete.then(() => {
			let e = this.shadowRoot.querySelector(`[data-path="${n}"]`);
			e.scrollIntoView({
				behavior: "smooth",
				inline: "center",
				block: "center"
			}), e.focus();
		}), this.setState(St(n)), yield {
			value: t,
			path: n
		});
		this.setState(St(null));
	}
	filter(e) {
		this.setState(bt(e));
	}
	resetFilter() {
		this.setState(xt());
	}
	renderObject(e, t) {
		return R`
            <ul part="object" role="group">
                ${rt(Object.entries(e), ([e, n]) => {
			let r = t ? `${t}.${e}` : e, i = ut(n), a = this.state.expanded[r];
			return this.state.filtered[r] ? z : R`
                              <li
                                  part="property"
                                  role="treeitem"
                                  data-path="${r}"
                                  aria-expanded="${a ? "true" : "false"}"
                                  tabindex="-1"
                                  .hidden="${this.state.filtered[r]}"
                                  aria-hidden="${this.state.filtered[r]}"
                              >
                                  <span
                                      part="key"
                                      class="${nt({
				key: e,
				collapsable: !i,
				"collapsable--collapsed": !this.state.expanded[r]
			})}"
                                      @click="${i ? null : this.#e(r)}"
                                  >
                                      ${e}:
                                      ${it(!i && !a, () => this.renderNodePreview(n))}
                                  </span>

                                  ${it(i || a, () => this.renderValue(n, r))}
                              </li>
                          `;
		})}
            </ul>
        `;
	}
	renderValue(e, t = "") {
		return ut(e) ? this.renderPrimitive(e, t) : this.renderObject(e, t);
	}
	renderNodePreview(e) {
		return R`<span part="preview" class="preview"> ${dt(e)} </span>`;
	}
	renderPrimitive(e, t) {
		let n = this.state.highlight, r = lt(e), i = this.constructor.customRenderer(e, t), a = R`
            <span part="primitive primitive-${r}" class="${lt(e)}"> ${i} </span>
        `;
		return t === n ? R`<mark part="highlight">${a}</mark>` : a;
	}
	render() {
		let e = this.data;
		return R`
            <div
                part="base"
                @keydown=${this.#r}
                @focusin="${this.#t}"
                @focusout="${this.#n}"
            >
                ${it(ht(e), () => this.renderValue(e))}
            </div>
        `;
	}
};
//#endregion
//#region node_modules/@alenaksu/json-viewer/dist/json-viewer.js
st([Qe({
	converter: mt,
	type: Object
})], wt.prototype, "data", 2), st([$e()], wt.prototype, "state", 2), st([$e()], wt.prototype, "lastFocusedItem", 2), st([tt("[role=\"treeitem\"]")], wt.prototype, "nodeElements", 2), customElements.define("json-viewer", wt);
//#endregion
//#region src/utils/clipboard.ts
function Tt(e) {
	return e === "copy-success" ? "✓ Copied" : e === "copy-failure" ? "Copy failed" : "Copy";
}
async function Et(e) {
	try {
		if (!navigator.clipboard?.writeText) throw Error("Clipboard unavailable");
		return await navigator.clipboard.writeText(e), !0;
	} catch {}
	let t = document.createElement("textarea");
	t.value = e, t.readOnly = !0, t.style.position = "fixed", t.style.opacity = "0", t.style.pointerEvents = "none", document.body.append(t), t.select();
	try {
		return document.execCommand?.("copy") === !0;
	} catch {
		return !1;
	} finally {
		t.remove();
	}
}
//#endregion
//#region src/utils/json.ts
function Dt(e) {
	return JSON.stringify(e ?? null, null, 2);
}
//#endregion
//#region src/utils/tool-label.ts
var Ot = new Map([
	"ha",
	"http",
	"https",
	"api",
	"url",
	"json",
	"ui",
	"ws",
	"llm",
	"mcp"
].map((e) => [e, e.toUpperCase()]));
function kt(e, t = !1) {
	return e.split(/[_.-]+/).filter(Boolean).map((e, n) => Ot.get(e.toLowerCase()) || (t && n > 0 ? e.toLowerCase() : `${e[0]?.toUpperCase() ?? ""}${e.slice(1)}`)).join(" ");
}
function At(e) {
	let t = e.name?.trim();
	if (!t) return {
		short: "Tool",
		qualified: "Tool"
	};
	let n = t.split("__").filter(Boolean), r = n.at(-1) ?? t, i = r.split(".").filter(Boolean), a = kt(i.at(-1) ?? r, !0) || t, o = n.length > 1 ? kt(n.at(-2) ?? "") : kt(i.length > 1 ? i.at(-2) ?? "" : "");
	return {
		short: a,
		qualified: o ? `${o} · ${a}` : a
	};
}
//#endregion
//#region src/components/tool-inspector.ts
var jt = class extends V {
	static properties = {
		selection: { attribute: !1 },
		tool: { attribute: !1 },
		tab: {},
		open: {
			type: Boolean,
			reflect: !0
		}
	};
	copyState = "idle";
	copyResetTimer;
	willUpdate(e) {
		(e.has("selection") || e.has("tool") || e.has("tab")) && (this.copyState = "idle", window.clearTimeout(this.copyResetTimer));
	}
	updated() {
		let e = this.renderRoot.querySelector("json-viewer");
		e && (e.setAttribute("role", "tree"), e.setAttribute("aria-label", "Tool JSON"));
	}
	disconnectedCallback() {
		window.clearTimeout(this.copyResetTimer), super.disconnectedCallback();
	}
	async copyJson(e) {
		let t = await Et(Dt(e));
		this.copyState = t ? "copy-success" : "copy-failure", window.clearTimeout(this.copyResetTimer), this.copyResetTimer = window.setTimeout(() => {
			this.copyState = "idle", this.requestUpdate();
		}, 1800), this.requestUpdate();
	}
	render() {
		let e = this.tool;
		if (!e) return z;
		let t = this.tab === "request" ? e.request : this.tab === "response" ? e.response : {
			raw_name: e.name,
			status: e.status,
			...e.metadata
		};
		return this.tab === "metadata" && (e.duration_ms !== void 0 && (t.duration_ms = e.duration_ms), e.started_at && (t.started_at = e.started_at), e.finished_at && (t.finished_at = e.finished_at)), R`<div
      class="inspector"
      role="dialog"
      aria-label="Tool inspector"
      @transitionend=${(e) => {
			e.target === e.currentTarget && e.propertyName === "transform" && !this.open && this.dispatchEvent(new Event("inspector-transition-ended", {
				bubbles: !0,
				composed: !0
			}));
		}}
    >
      <header>
        <strong>${At(e).qualified}</strong
        ><button
          @click=${() => this.dispatchEvent(new Event("inspector-closed", {
			bubbles: !0,
			composed: !0
		}))}
          aria-label="Close tool inspector"
        >
          ✕
        </button>
      </header>
      <nav aria-label="Inspector tabs">
        ${[
			"request",
			"response",
			"metadata"
		].map((e) => R`<button class=${this.tab === e ? "selected" : ""} @click=${() => this.dispatchEvent(new CustomEvent("inspector-tab", {
			detail: e,
			bubbles: !0,
			composed: !0
		}))}>${e[0].toUpperCase() + e.slice(1)}</button>`)}
      </nav>
      <div class="inspector-content">
        <div class="json-header">
          <span>JSON</span
          ><button
            aria-label="Copy JSON"
            @click=${() => void this.copyJson(t)}
          >
            ${Tt(this.copyState)}
          </button>
        </div>
        <json-viewer .data=${t ?? null}></json-viewer>
      </div>
    </div>`;
	}
	static styles = h`
    :host {
      min-width: 0;
      display: block;
      overflow: visible;
    }
    .inspector {
      transform: translateX(100%);
      transition: transform var(--aw-motion-panel-close, 120ms)
        var(--aw-ease-panel, ease);
    }
    :host([open]) .inspector {
      transform: translateX(0);
      transition-duration: var(--aw-motion-panel-open, 160ms);
    }
    .inspector {
      min-height: 0;
      height: 100%;
      display: grid;
      grid-template-rows: auto auto minmax(0, 1fr);
      border-left: 1px solid var(--divider-color);
      background: var(--card-background-color);
      box-shadow: -12px 0 30px #0003;
    }
    header {
      min-width: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      padding: 10px;
    }
    header strong {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    nav {
      display: flex;
      gap: 4px;
      padding: 0 10px;
      border-bottom: 1px solid var(--divider-color);
    }
    nav button {
      border: 0;
      border-bottom: 2px solid transparent;
      padding: 8px 10px;
      color: var(--secondary-text-color);
      background: transparent;
      cursor: pointer;
    }
    nav button.selected {
      border-color: var(--primary-color);
      color: var(--primary-text-color);
    }
    header button {
      flex: 0 0 auto;
      width: var(--aw-touch-size, 32px);
      height: var(--aw-touch-size, 32px);
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: inherit;
    }
    .inspector-content {
      min-height: 0;
      display: grid;
      grid-template-rows: auto minmax(0, 1fr);
      padding: 8px;
    }
    .json-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 6px;
      color: var(--secondary-text-color);
      font-size: 0.78rem;
    }
    .json-header button {
      border: 0;
      border-radius: 6px;
      width: 88px;
      height: 26px;
      padding: 2px 4px;
      color: inherit;
      background: transparent;
      cursor: pointer;
      text-align: right;
      font: inherit;
    }
    .json-header button:hover,
    .json-header button:focus-visible {
      background: var(--secondary-background-color);
    }
    .json-header button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    json-viewer {
      width: 100%;
      box-sizing: border-box;
      min-height: 0;
      margin: 0;
      padding: 12px;
      overflow: auto;
      --background-color: var(--card-background-color, transparent);
      --color: var(--primary-text-color, #202124);
      --property-color: var(--aw-json-key, #027c9b);
      --string-color: var(--aw-json-string, #2e7d32);
      --number-color: var(--aw-json-number, #b26a00);
      --boolean-color: var(--aw-json-boolean, #7c4dff);
      --null-color: var(--aw-json-null, #6b7280);
      --preview-color: var(--secondary-text-color, #6b7280);
      --indentguide-color: var(--divider-color, #d0d5dd);
      --indentguide-color-active: var(--primary-color, #027c9b);
    }
    @media (prefers-reduced-motion: reduce) {
      .inspector {
        transition: none;
      }
    }
  `;
};
customElements.get("assist-workspace-tool-inspector") || customElements.define("assist-workspace-tool-inspector", jt);
//#endregion
//#region src/components/conversation-dialogs.ts
var Mt = class extends V {
	static properties = {
		renameOpen: { type: Boolean },
		deleteOpen: { type: Boolean },
		title: {},
		draft: {}
	};
	updated(e) {
		e.has("renameOpen") && this.renameOpen && this.renderRoot.querySelector("input")?.focus();
	}
	closeOnBackdrop = (e) => {
		e.target === e.currentTarget && this.dispatchEvent(new Event("dialogs-closed", {
			bubbles: !0,
			composed: !0
		}));
	};
	render() {
		return this.renameOpen ? R`<div class="overlay" @click=${this.closeOnBackdrop}>
        <div class="dialog" role="dialog" aria-label="Rename conversation">
          <form
            @submit=${(e) => {
			e.preventDefault(), this.dispatchEvent(new CustomEvent("rename-confirmed", {
				detail: this.draft,
				bubbles: !0,
				composed: !0
			}));
		}}
          >
            <h3>Rename conversation</h3>
            <input
              aria-label="Rename conversation"
              .value=${this.draft}
              @input=${(e) => this.dispatchEvent(new CustomEvent("rename-draft", {
			detail: e.target.value,
			bubbles: !0,
			composed: !0
		}))}
            />
            <footer>
              <button
                type="button"
                @click=${() => this.dispatchEvent(new Event("dialogs-closed", {
			bubbles: !0,
			composed: !0
		}))}
              >
                Cancel</button
              ><button ?disabled=${!this.draft.trim()}>Save</button>
            </footer>
          </form>
        </div>
      </div>` : this.deleteOpen ? R`<div class="overlay" @click=${this.closeOnBackdrop}>
        <div class="dialog" role="alertdialog" aria-label="Delete conversation">
          <h3>Delete conversation?</h3>
          <p>“${this.title || "Conversation"}” will be permanently deleted.</p>
          <p class="dialog-detail">This cannot be undone.</p>
          <footer>
            <button
              @click=${() => this.dispatchEvent(new Event("dialogs-closed", {
			bubbles: !0,
			composed: !0
		}))}
            >
              Cancel</button
            ><button
              class="danger"
              @click=${() => this.dispatchEvent(new Event("delete-confirmed", {
			bubbles: !0,
			composed: !0
		}))}
            >
              Delete
            </button>
          </footer>
        </div>
      </div>` : z;
	}
	static styles = h`
    :host {
      position: absolute;
      z-index: 4;
      inset: 0;
      pointer-events: none;
    }
    .overlay {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: auto;
      background: #0004;
    }
    .dialog {
      width: min(420px, calc(100% - 24px));
      max-height: calc(100% - 24px);
      overflow: auto;
      box-sizing: border-box;
      border-radius: 15px;
      padding: 20px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      box-shadow: 0 16px 40px #0005;
    }
    h3 {
      margin: 0 0 14px;
    }
    p {
      margin: 0 0 8px;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      height: 42px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      padding: 0 11px;
      color: inherit;
      background: var(--secondary-background-color);
      font: inherit;
    }
    input:focus-visible,
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    footer {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      padding: 12px 0 0;
    }
    footer button {
      min-width: 76px;
      height: var(--aw-touch-size, 38px);
      border: 0;
      border-radius: 10px;
      padding: 0 13px;
      color: var(--text-primary-color, white);
      background: var(--primary-color, #1976d2);
      font: inherit;
    }
    footer button[type="button"] {
      color: inherit;
      background: transparent;
    }
    footer button:disabled {
      color: var(--primary-text-color, #202124);
      background: var(--secondary-background-color, #eeeeee);
      opacity: 1;
    }
    .dialog-detail {
      color: var(--secondary-text-color);
    }
    .danger {
      color: var(--text-primary-color, white);
      background: var(--error-color, #b3261e);
    }
  `;
};
customElements.get("assist-workspace-dialogs") || customElements.define("assist-workspace-dialogs", Mt);
//#endregion
//#region node_modules/dompurify/dist/purify.es.mjs
function Nt(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Pt(e) {
	if (Array.isArray(e)) return e;
}
function Ft(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t !== 0) for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function It() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Lt(e, t) {
	return Pt(e) || Ft(e, t) || Rt(e, t) || It();
}
function Rt(e, t) {
	if (e) {
		if (typeof e == "string") return Nt(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Nt(e, t) : void 0;
	}
}
var zt = Object.entries, Bt = Object.setPrototypeOf, Vt = Object.isFrozen, Ht = Object.getPrototypeOf, Ut = Object.getOwnPropertyDescriptor, W = Object.freeze, G = Object.seal, Wt = Object.create, Gt = typeof Reflect < "u" && Reflect, Kt = Gt.apply, qt = Gt.construct;
W ||= function(e) {
	return e;
}, G ||= function(e) {
	return e;
}, Kt ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, qt ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var Jt = J(Array.prototype.forEach), Yt = J(Array.prototype.lastIndexOf), Xt = J(Array.prototype.pop), Zt = J(Array.prototype.push), Qt = J(Array.prototype.splice), $t = Array.isArray, en = J(String.prototype.toLowerCase), tn = J(String.prototype.toString), nn = J(String.prototype.match), rn = J(String.prototype.replace), an = J(String.prototype.indexOf), on = J(String.prototype.trim), sn = J(Number.prototype.toString), cn = J(Boolean.prototype.toString), ln = typeof BigInt > "u" ? null : J(BigInt.prototype.toString), un = typeof Symbol > "u" ? null : J(Symbol.prototype.toString), K = J(Object.prototype.hasOwnProperty), dn = J(Object.prototype.toString), q = J(RegExp.prototype.test), fn = pn(TypeError);
function J(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return Kt(e, t, n);
	};
}
function pn(e) {
	return function() {
		return qt(e, [...arguments]);
	};
}
function Y(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : en;
	if (Bt && Bt(e, null), !$t(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (Vt(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function mn(e) {
	for (let t = 0; t < e.length; t++) K(e, t) || (e[t] = null);
	return e;
}
function hn(e) {
	let t = Wt(null);
	for (let r of zt(e)) {
		var n = Lt(r, 2);
		let i = n[0], a = n[1];
		K(e, i) && (t[i] = $t(a) ? mn(a) : a && typeof a == "object" && a.constructor === Object ? hn(a) : a);
	}
	return t;
}
function gn(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return sn(e);
		case "boolean": return cn(e);
		case "bigint": return ln ? ln(e) : "0";
		case "symbol": return un ? un(e) : "Symbol()";
		case "undefined": return dn(e);
		case "function":
		case "object": {
			if (e === null) return dn(e);
			let t = e, n = _n(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : dn(e);
			}
			return dn(e);
		}
		default: return dn(e);
	}
}
function _n(e, t) {
	for (; e !== null;) {
		let n = Ut(e, t);
		if (n) {
			if (n.get) return J(n.get);
			if (typeof n.value == "function") return J(n.value);
		}
		e = Ht(e);
	}
	function n() {
		return null;
	}
	return n;
}
function vn(e) {
	try {
		return q(e, ""), !0;
	} catch {
		return !1;
	}
}
var yn = W(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), bn = W(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), xn = W([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]), Sn = W([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]), Cn = W(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), wn = W([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]), Tn = W(["#text"]), En = W(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), Dn = W(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), On = W(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), kn = W([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), An = G(/{{[\w\W]*|^[\w\W]*}}/g), jn = G(/<%[\w\W]*|^[\w\W]*%>/g), Mn = G(/\${[\w\W]*/g), Nn = G(/^data-[\-\w.\u00B7-\uFFFF]+$/), Pn = G(/^aria-[\-\w]+$/), Fn = G(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), In = G(/^(?:\w+script|data):/i), Ln = G(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), Rn = G(/^html$/i), zn = G(/^[a-z][.\w]*(-[.\w]+)+$/i), Bn = G(/<[/\w!]/g), Vn = G(/<[/\w]/g), Hn = G(/<\/no(script|embed|frames)/i), Un = G(/\/>/i), Wn = {
	element: 1,
	attribute: 2,
	text: 3,
	cdataSection: 4,
	entityReference: 5,
	entityNode: 6,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentType: 10,
	documentFragment: 11,
	notation: 12
}, Gn = [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
], Kn = W(Y({}, Gn)), qn = function() {
	let e = {};
	return Jt(Gn, (t) => {
		e[t] = G(RegExp("</" + t + "(?=[\\t\\n\\f\\r />])", "i"));
	}), W(e);
}(), Jn = function() {
	return typeof window > "u" ? null : window;
}, Yn = function(e, t) {
	if (typeof e != "object" || typeof e.createPolicy != "function") return null;
	let n = null, r = "data-tt-policy-suffix";
	t && t.hasAttribute(r) && (n = t.getAttribute(r));
	let i = "dompurify" + (n ? "#" + n : "");
	try {
		return e.createPolicy(i, {
			createHTML(e) {
				return e;
			},
			createScriptURL(e) {
				return e;
			}
		});
	} catch {
		return console.warn("TrustedTypes policy " + i + " could not be created."), null;
	}
}, Xn = function() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
}, Zn = function(e, t, n, r) {
	return K(e, t) && $t(e[t]) ? Y(r.base ? hn(r.base) : {}, e[t], r.transform) : n;
}, Qn = function(e, t, n) {
	let r = K(e, t) ? e[t] : void 0;
	return r && typeof r == "object" ? hn(r) : n();
};
function $n() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Jn(), t = (e) => $n(e);
	if (t.version = "3.4.14", t.removed = [], !e || !e.document || e.document.nodeType !== Wn.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = _n(d, "cloneNode"), p = _n(d, "remove"), m = _n(d, "nextSibling"), h = _n(d, "childNodes"), g = _n(d, "parentNode"), _ = _n(d, "shadowRoot"), v = _n(d, "attributes"), y = o && o.prototype ? _n(o.prototype, "nodeType") : null, b = o && o.prototype ? _n(o.prototype, "nodeName") : null, x = o && o.prototype ? _n(o.prototype, "ownerDocument") : null, ee = function(e) {
		return y ? y(e) : e.nodeType;
	}, S = function(e) {
		return b ? b(e) : e.nodeName;
	};
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let C, w = "", te, T = !1, E = 0, D = function() {
		if (E > 0) throw fn("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, O = function(e) {
		D(), E++;
		try {
			return C.createHTML(e);
		} finally {
			E--;
		}
	}, ne = function(e) {
		D(), E++;
		try {
			return C.createScriptURL(e);
		} finally {
			E--;
		}
	}, k = function() {
		return T ||= (te = Yn(u, i), !0), te;
	}, A = n, j = A.implementation, re = A.createNodeIterator, M = A.createDocumentFragment, ie = A.getElementsByTagName, N = r.importNode, P = Xn();
	t.isSupported = typeof zt == "function" && typeof g == "function" && j && j.createHTMLDocument !== void 0;
	let ae = An, oe = jn, se = Mn, ce = Nn, le = Pn, ue = In, de = Ln, fe = zn, pe = Fn, F = null, me = Y({}, [
		...yn,
		...bn,
		...xn,
		...Cn,
		...Tn
	]), I = null, he = Y({}, [
		...En,
		...Dn,
		...On,
		...kn
	]), L = Object.seal(Wt(null, {
		tagNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: !1
		}
	})), R = null, ge = null, z = Object.seal(Wt(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	})), _e = !0, ve = !0, ye = !1, be = !0, xe = !1, B = !0, Se = !1, Ce = !1, we = null, Te = null, Ee = !1, De = !1, Oe = !1, ke = !1, Ae = !0, je = !1, Me = "user-content-", V = !0, Ne = !1, Pe = {}, Fe = null, Ie = Y({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), Le = null, Re = Y({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), ze = null, Be = Y({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), Ve = "http://www.w3.org/1998/Math/MathML", He = "http://www.w3.org/2000/svg", H = "http://www.w3.org/1999/xhtml", Ue = H, We = !1, Ge = null, Ke = Y({}, [
		Ve,
		He,
		H
	], tn), qe = W([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), Je = Y({}, qe), Ye = W(["annotation-xml"]), Xe = Y({}, Ye), Ze = Y({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), Qe = null, $e = ["application/xhtml+xml", "text/html"], U = null, et = null, tt = n.createElement("form"), nt = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, rt = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (et && et === e) return;
		(!e || typeof e != "object") && (e = {}), e = hn(e), Qe = $e.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, U = Qe === "application/xhtml+xml" ? tn : en, F = Zn(e, "ALLOWED_TAGS", me, { transform: U }), I = Zn(e, "ALLOWED_ATTR", he, { transform: U }), Ge = Zn(e, "ALLOWED_NAMESPACES", Ke, { transform: tn }), ze = Zn(e, "ADD_URI_SAFE_ATTR", Be, {
			transform: U,
			base: Be
		}), Le = Zn(e, "ADD_DATA_URI_TAGS", Re, {
			transform: U,
			base: Re
		}), Fe = Zn(e, "FORBID_CONTENTS", Ie, { transform: U }), R = Zn(e, "FORBID_TAGS", hn({}), { transform: U }), ge = Zn(e, "FORBID_ATTR", hn({}), { transform: U }), Pe = K(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? hn(e.USE_PROFILES) : e.USE_PROFILES : !1, _e = e.ALLOW_ARIA_ATTR !== !1, ve = e.ALLOW_DATA_ATTR !== !1, ye = e.ALLOW_UNKNOWN_PROTOCOLS || !1, be = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, xe = e.SAFE_FOR_TEMPLATES || !1, B = e.SAFE_FOR_XML !== !1, Se = e.WHOLE_DOCUMENT || !1, De = e.RETURN_DOM || !1, Oe = e.RETURN_DOM_FRAGMENT || !1, ke = e.RETURN_TRUSTED_TYPE || !1, Ee = e.FORCE_BODY || !1, Ae = e.SANITIZE_DOM !== !1, je = e.SANITIZE_NAMED_PROPS || !1, V = e.KEEP_CONTENT !== !1, Ne = e.IN_PLACE || !1, pe = vn(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : Fn, Ue = typeof e.NAMESPACE == "string" ? e.NAMESPACE : H, Je = Qn(e, "MATHML_TEXT_INTEGRATION_POINTS", () => Y({}, qe)), Xe = Qn(e, "HTML_INTEGRATION_POINTS", () => Y({}, Ye));
		let t = Qn(e, "CUSTOM_ELEMENT_HANDLING", () => Wt(null));
		if (L = Wt(null), K(t, "tagNameCheck") && nt(t.tagNameCheck) && (L.tagNameCheck = t.tagNameCheck), K(t, "attributeNameCheck") && nt(t.attributeNameCheck) && (L.attributeNameCheck = t.attributeNameCheck), K(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (L.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), G(L), xe && (ve = !1), Oe && (De = !0), Pe && (F = Y({}, Tn), I = Wt(null), Pe.html === !0 && (Y(F, yn), Y(I, En)), Pe.svg === !0 && (Y(F, bn), Y(I, Dn), Y(I, kn)), Pe.svgFilters === !0 && (Y(F, xn), Y(I, Dn), Y(I, kn)), Pe.mathMl === !0 && (Y(F, Cn), Y(I, On), Y(I, kn))), z.tagCheck = null, z.attributeCheck = null, K(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? z.tagCheck = e.ADD_TAGS : $t(e.ADD_TAGS) && (F === me && (F = hn(F)), Y(F, e.ADD_TAGS, U))), K(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? z.attributeCheck = e.ADD_ATTR : $t(e.ADD_ATTR) && (I === he && (I = hn(I)), Y(I, e.ADD_ATTR, U))), K(e, "ADD_FORBID_CONTENTS") && $t(e.ADD_FORBID_CONTENTS) && (Fe === Ie && (Fe = hn(Fe)), Y(Fe, e.ADD_FORBID_CONTENTS, U)), V && (F["#text"] = !0), Se && Y(F, [
			"html",
			"head",
			"body"
		]), F.table && (Y(F, ["tbody"]), delete R.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw fn("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw fn("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = C;
			C = e.TRUSTED_TYPES_POLICY;
			try {
				w = O("");
			} catch (e) {
				throw C = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (C = void 0, w = "") : (C === void 0 && (C = k()), C && typeof w == "string" && (w = O("")));
		W && W(e), et = e;
	}, it = Y({}, [
		...bn,
		...xn,
		...Sn
	]), at = Y({}, [...Cn, ...wn]), ot = function(e, t, n) {
		return t.namespaceURI === H ? e === "svg" : t.namespaceURI === Ve ? e === "svg" && (n === "annotation-xml" || Je[n]) : !!it[e];
	}, st = function(e, t, n) {
		return t.namespaceURI === H ? e === "math" : t.namespaceURI === He ? e === "math" && Xe[n] : !!at[e];
	}, ct = function(e, t, n) {
		return t.namespaceURI === He && !Xe[n] || t.namespaceURI === Ve && !Je[n] ? !1 : !at[e] && (Ze[e] || !it[e]);
	}, lt = function(e) {
		let t = g(e);
		(!t || !t.tagName) && (t = {
			namespaceURI: Ue,
			tagName: "template"
		});
		let n = en(e.tagName), r = en(t.tagName);
		return Ge[e.namespaceURI] ? e.namespaceURI === He ? ot(n, t, r) : e.namespaceURI === Ve ? st(n, t, r) : e.namespaceURI === H ? ct(n, t, r) : !!(Qe === "application/xhtml+xml" && Ge[e.namespaceURI]) : !1;
	}, ut = function(e) {
		Zt(t.removed, { element: e });
		try {
			g(e).removeChild(e);
		} catch {
			if (p(e), !g(e)) throw fn("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, dt = function(e, t, n) {
		try {
			e.removeAttributeNode(t);
		} catch {
			try {
				e.removeAttribute(n);
			} catch {}
		}
	}, ft = function(e) {
		ht(e);
		let t = h(e);
		if (t) {
			let e = [];
			Jt(t, (t) => {
				Zt(e, t);
			}), Jt(e, (e) => {
				try {
					p(e);
				} catch {}
			});
		}
		let n = v(e);
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			typeof i == "string" && dt(e, r, i);
		}
	}, pt = function(e, n, r) {
		if (!r) try {
			r = n.getAttributeNode(e);
		} catch {
			r = null;
		}
		Zt(t.removed, {
			attribute: r || null,
			from: n
		});
		try {
			r ? n.removeAttributeNode(r) : n.removeAttribute(e);
		} catch {
			try {
				n.removeAttribute(e);
			} catch {}
		}
		if (e === "is") {
			if (De || Oe) try {
				ut(n);
			} catch {}
			else try {
				n.setAttribute(e, "");
			} catch {}
		}
	}, mt = function(e) {
		let t = v(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			typeof i != "string" || I[U(i)] || dt(e, r, i);
		}
	}, ht = function(e) {
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop();
			ee(e) === Wn.element && mt(e);
			let n = h(e);
			if (n) for (let e = n.length - 1; e >= 0; --e) t.push(n[e]);
		}
	}, gt = function(e, t) {
		return B ? e === "patchsrc" || e === "for" && t !== "label" && t !== "output" : !1;
	}, _t = function(e) {
		if (!B) return;
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop(), n = ee(e);
			if (n === Wn.processingInstruction || n === Wn.comment && q(Vn, e.data)) {
				try {
					p(e);
				} catch {}
				continue;
			}
			if (n === Wn.element) {
				let t = e, n = U(S(e));
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && gt("for", n) && t.removeAttribute("for");
				} catch {}
			}
			let r = h(e);
			if (r) for (let e = r.length - 1; e >= 0; --e) t.push(r[e]);
		}
	}, vt = function(e) {
		let t = null, r = null;
		if (Ee) e = "<remove></remove>" + e;
		else {
			let t = nn(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		Qe === "application/xhtml+xml" && Ue === H && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = C ? O(e) : e;
		if (Ue === H) try {
			t = new l().parseFromString(i, Qe);
		} catch {}
		if (!t || !t.documentElement) {
			t = j.createDocument(Ue, "template", null);
			try {
				t.documentElement.innerHTML = We ? w : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), Ue === H ? ie.call(t, Se ? "html" : "body")[0] : Se ? t.documentElement : a;
	}, yt = function(e) {
		let t = x ? x(e) : e.ownerDocument;
		return re.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, bt = function(e) {
		return e = rn(e, ae, " "), e = rn(e, oe, " "), e = rn(e, se, " "), e;
	}, xt = function(e) {
		e.normalize();
		let t = x ? x(e) : e.ownerDocument, n = re.call(t || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), r = n.nextNode();
		for (; r;) r.data = bt(r.data), r = n.nextNode();
		let i = e.querySelectorAll?.call(e, "template");
		i && Jt(i, (e) => {
			Ct(e.content) && xt(e.content);
		});
	}, St = function(e) {
		let t = b ? b(e) : null;
		return typeof t != "string" || U(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== v(e) || typeof e.removeAttribute != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== y(e) || e.childNodes !== h(e);
	}, Ct = function(e) {
		if (!y || typeof e != "object" || !e) return !1;
		try {
			return y(e) === Wn.documentFragment;
		} catch {
			return !1;
		}
	}, wt = function(e) {
		if (!y || typeof e != "object" || !e) return !1;
		try {
			return typeof y(e) == "number";
		} catch {
			return !1;
		}
	};
	function Tt(e, n, r) {
		e.length !== 0 && Jt(e, (e) => {
			e.call(t, n, r, et);
		});
	}
	let Et = function(e, t) {
		return !!(B && e.hasChildNodes() && !wt(e.firstElementChild) && q(Bn, e.textContent) && q(Bn, e.innerHTML) || B && e.namespaceURI === H && Kn[t] && (wt(e.firstElementChild) || typeof e.textContent == "string" && q(qn[t], e.textContent)) || e.nodeType === Wn.processingInstruction || B && e.nodeType === Wn.comment && q(Vn, e.data));
	}, Dt = function(e, t) {
		return e instanceof RegExp ? q(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
	}, Ot = function(e, t, n) {
		if (!R[t] && Pt(t) && Dt(L.tagNameCheck, t)) return !1;
		if (V && !Fe[t]) {
			let t = g(e), r = h(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, m(e));
				}
			}
		}
		return ut(e), !0;
	}, kt = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? hn(t) : t;
	}, At = function(e, t) {
		return e === t || g(e) !== null ? !1 : (Ne && ht(e), !0);
	}, jt = function(e, n) {
		if (Tt(P.beforeSanitizeElements, e, null), At(e, n)) return !0;
		if (St(e)) return ut(e), !0;
		let r = U(S(e));
		if (F = kt(P.uponSanitizeElement, F, me, we), Tt(P.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: F
		}), At(e, n)) return !0;
		if (Et(e, r)) return ut(e), !0;
		if (R[r] || !(z.tagCheck instanceof Function && z.tagCheck(r)) && !F[r]) {
			let t = Ot(e, r, n);
			return t === !1 && Tt(P.afterSanitizeElements, e, null), t;
		}
		if (ee(e) === Wn.element && !lt(e) || (r === "noscript" || r === "noembed" || r === "noframes") && q(Hn, e.innerHTML)) return ut(e), !0;
		if (xe && e.nodeType === Wn.text) {
			let n = bt(e.textContent);
			e.textContent !== n && (Zt(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return Tt(P.afterSanitizeElements, e, null), !1;
	}, Mt = function(e, t, r) {
		if (ge[t] || gt(t, e) || Ae && (t === "id" || t === "name") && (r in n || r in tt)) return !1;
		let i = I[t] || z.attributeCheck instanceof Function && z.attributeCheck(t, e);
		return ve && q(ce, t) || _e && q(le, t) ? !0 : i ? ze[t] || q(pe, rn(r, de, "")) || (t === "src" || t === "xlink:href" || t === "href") && e !== "script" && an(r, "data:") === 0 && Le[e] || ye && !q(ue, rn(r, de, "")) ? !0 : !r : Pt(e) && Dt(L.tagNameCheck, e) && Dt(L.attributeNameCheck, t, e) || t === "is" && L.allowCustomizedBuiltInElements && Dt(L.tagNameCheck, r);
	}, Nt = Y({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), Pt = function(e) {
		return !Nt[en(e)] && q(fe, e);
	}, Ft = function(e, t, n, r) {
		if (C && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return O(r);
			case "TrustedScriptURL": return ne(r);
		}
		return r;
	}, It = function(e, n, r, i) {
		try {
			r ? e.setAttributeNS(r, n, i) : e.setAttribute(n, i), St(e) ? ut(e) : Xt(t.removed);
		} catch {
			pt(n, e);
		}
	}, Lt = function(e) {
		Tt(P.beforeSanitizeAttributes, e, null);
		let t = e.attributes;
		if (!t || St(e)) return;
		I = kt(P.uponSanitizeAttribute, I, he, Te);
		let n = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: I,
			forceKeepAttr: void 0
		}, r = t.length, i = U(e.nodeName);
		for (; r--;) {
			let a = t[r], o = a.name, s = a.namespaceURI, c = a.value, l = U(o), u = c, d = o === "value" ? u : on(u);
			if (n.attrName = l, n.attrValue = d, n.keepAttr = !0, n.forceKeepAttr = void 0, Tt(P.uponSanitizeAttribute, e, n), d = n.attrValue, je && (l === "id" || l === "name") && an(d, Me) !== 0 && (pt(o, e, a), d = Me + d), B && q(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, d)) {
				pt(o, e, a);
				continue;
			}
			if (l === "attributename" && nn(d, "href")) {
				pt(o, e, a);
				continue;
			}
			if (!n.forceKeepAttr) {
				if (!n.keepAttr) {
					pt(o, e, a);
					continue;
				}
				if (!be && q(Un, d)) {
					pt(o, e, a);
					continue;
				}
				if (xe && (d = bt(d)), !Mt(i, l, d)) {
					pt(o, e, a);
					continue;
				}
				d = Ft(i, l, s, d), d !== u && It(e, o, s, d);
			}
		}
		Tt(P.afterSanitizeAttributes, e, null);
	}, Rt = function(e) {
		let t = null, n = yt(e);
		for (Tt(P.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (Tt(P.uponSanitizeShadowNode, t, null), jt(t, e), Lt(t), Ct(t.content) && Rt(t.content), ee(t) === Wn.element) {
			let e = _(t);
			Ct(e) && (Bt(e), Rt(e));
		}
		Tt(P.afterSanitizeShadowDOM, e, null);
	}, Bt = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				Rt(e.shadow);
				continue;
			}
			let n = e.node, r = ee(n) === Wn.element, i = h(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = b ? b(n) : null;
				if (typeof e == "string" && U(e) === "template") {
					let e = n.content;
					Ct(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = _(n);
				Ct(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return t.sanitize = function(e) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, a = null, o = null, s = null;
		if (We = !e, We && (e = "<!-->"), typeof e != "string" && !wt(e) && (e = gn(e), typeof e != "string")) throw fn("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		Ce ? (F = we, I = Te) : rt(n), (P.uponSanitizeElement.length > 0 || P.uponSanitizeAttribute.length > 0) && (F = hn(F)), P.uponSanitizeAttribute.length > 0 && (I = hn(I)), t.removed = [];
		let c = Ne && typeof e != "string" && wt(e);
		if (c) {
			_t(e);
			let t = S(e);
			if (typeof t == "string") {
				let n = U(t);
				if (!F[n] || R[n]) throw ft(e), fn("root node is forbidden and cannot be sanitized in-place");
			}
			if (St(e)) throw ft(e), fn("root node is clobbered and cannot be sanitized in-place");
			try {
				Bt(e);
			} catch (t) {
				throw ft(e), t;
			}
		} else if (wt(e)) i = vt("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === Wn.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), Bt(a);
		else {
			if (!De && !xe && !Se && e.indexOf("<") === -1) return C && ke ? O(e) : e;
			if (i = vt(e), !i) return De ? null : ke ? w : "";
		}
		i && Ee && ut(i.firstChild);
		let l = c ? e : i;
		try {
			let e = yt(l);
			for (; o = e.nextNode();) jt(o, l), Lt(o), Ct(o.content) && Rt(o.content);
		} catch (n) {
			throw c && (ft(e), Jt(t.removed, (e) => {
				e.element && ht(e.element);
			})), n;
		}
		if (c) return Jt(t.removed, (e) => {
			e.element && ht(e.element);
		}), xe && xt(e), e;
		if (De) {
			if (xe && xt(i), Oe) for (s = M.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (I.shadowroot || I.shadowrootmode) && (s = N.call(r, s, !0)), s;
		}
		let u = Se ? i.outerHTML : i.innerHTML;
		return Se && F["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && q(Rn, i.ownerDocument.doctype.name) && (u = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + u), xe && (u = bt(u)), C && ke ? O(u) : u;
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		rt(e), Ce = !0, we = F, Te = I;
	}, t.clearConfig = function() {
		et = null, Ce = !1, we = null, Te = null, C = te, w = "";
	}, t.isValidAttribute = function(e, t, n) {
		et || rt({});
		let r = U(e), i = U(t);
		return Mt(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && K(P, e) && Zt(P[e], t);
	}, t.removeHook = function(e, t) {
		if (K(P, e)) {
			if (t !== void 0) {
				let n = Yt(P[e], t);
				return n === -1 ? void 0 : Qt(P[e], n, 1)[0];
			}
			return Xt(P[e]);
		}
	}, t.removeHooks = function(e) {
		K(P, e) && (P[e] = []);
	}, t.removeAllHooks = function() {
		P = Xn();
	}, t;
}
var er = $n();
//#endregion
//#region node_modules/marked/lib/marked.esm.js
function tr() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var nr = tr();
function rr(e) {
	nr = e;
}
var ir = { exec: () => null };
function ar(e) {
	let t = [];
	return (n) => {
		let r = Math.max(0, Math.min(3, n - 1)), i = t[r];
		return i || (i = e(r), t[r] = i), i;
	};
}
function X(e, t = "") {
	let n = typeof e == "string" ? e : e.source, r = {
		replace: (e, t) => {
			let i = typeof t == "string" ? t : t.source;
			return i = i.replace(Z.caret, "$1"), n = n.replace(e, i), r;
		},
		getRegex: () => new RegExp(n, t)
	};
	return r;
}
var or = ((e = "") => {
	try {
		return !!RegExp("(?<=1)(?<!1)" + e);
	} catch {
		return !1;
	}
})(), Z = {
	codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] +\S/,
	listReplaceTask: /^\[[ xX]\] +/,
	listTaskCheckbox: /\[[ xX]\]/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (e) => RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: ar((e) => RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: ar((e) => RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),
	fencesBeginRegex: ar((e) => RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: ar((e) => RegExp(`^ {0,${e}}#`)),
	htmlBeginRegex: ar((e) => RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`, "i")),
	blockquoteBeginRegex: ar((e) => RegExp(`^ {0,${e}}>`))
}, sr = /^(?:[ \t]*(?:\n|$))+/, cr = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, lr = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, ur = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, dr = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, fr = / {0,3}(?:[*+-]|\d{1,9}[.)])/, pr = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, mr = X(pr).replace(/bull/g, fr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), hr = X(pr).replace(/bull/g, fr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), gr = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, _r = /^[^\n]+/, vr = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, yr = X(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", vr).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), br = X(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, fr).getRegex(), xr = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Sr = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Cr = X("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Sr).replace("tag", xr).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), wr = (e) => X(gr).replace("hr", ur).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", e).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", xr).getRegex(), Tr = wr(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), Er = wr(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), Dr = {
	blockquote: X(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Er).getRegex(),
	code: cr,
	def: yr,
	fences: lr,
	heading: dr,
	hr: ur,
	html: Cr,
	lheading: mr,
	list: br,
	newline: sr,
	paragraph: Tr,
	table: ir,
	text: _r
}, Or = X("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", ur).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", xr).getRegex(), kr = {
	...Dr,
	lheading: hr,
	table: Or,
	paragraph: X(gr).replace("hr", ur).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Or).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", xr).getRegex()
}, Ar = {
	...Dr,
	html: X("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", Sr).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: ir,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: X(gr).replace("hr", ur).replace("heading", " *#{1,6} *[^\n]").replace("lheading", mr).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, jr = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Mr = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Nr = /^( {2,}|\\)\n(?!\s*$)/, Pr = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Fr = /[\p{P}\p{S}]/u, Ir = /[\s\p{P}\p{S}]/u, Lr = /[^\s\p{P}\p{S}]/u, Rr = X(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Ir).getRegex(), zr = /[\p{Pi}\p{Ps}"']/u, Br = /(?!~)[\p{P}\p{S}]/u, Vr = /(?!~)[\s\p{P}\p{S}]/u, Hr = /(?:[^\s\p{P}\p{S}]|~)/u, Ur = X(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", or ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Wr = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, Gr = X(Wr, "u").replace(/punct/g, Fr).getRegex(), Kr = X(Wr, "u").replace(/punct/g, Br).getRegex(), qr = X(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, zr).replace(/punct/g, Fr).getRegex(), Jr = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Yr = X(Jr, "gu").replace(/notPunctSpace/g, Lr).replace(/punctSpace/g, Ir).replace(/punct/g, Fr).getRegex(), Xr = X(Jr, "gu").replace(/notPunctSpace/g, Hr).replace(/punctSpace/g, Vr).replace(/punct/g, Br).getRegex(), Zr = X("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Lr).replace(/punctSpace/g, Ir).replace(/punct/g, Fr).getRegex(), Qr = X("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Lr).replace(/punctSpace/g, Ir).replace(/punct/g, Fr).getRegex(), $r = X("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Lr).replace(/punctSpace/g, Ir).replace(/punct/g, Fr).getRegex(), ei = X(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, Fr).getRegex(), ti = X("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Lr).replace(/punctSpace/g, Ir).replace(/punct/g, Fr).getRegex(), ni = X(/\\(punct)/, "gu").replace(/punct/g, Fr).getRegex(), ri = X(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ii = X(Sr).replace("(?:-->|$)", "-->").getRegex(), ai = X("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ii).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), oi = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/, si = X(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", oi).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), ci = X(/^!?\[(label)\]\[(ref)\]/).replace("label", oi).replace("ref", vr).getRegex(), li = X(/^!?\[(ref)\](?:\[\])?/).replace("ref", vr).getRegex(), ui = X("reflink|nolink(?!\\()", "g").replace("reflink", ci).replace("nolink", li).getRegex(), di = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, fi = {
	_backpedal: ir,
	anyPunctuation: ni,
	autolink: ri,
	blockSkip: Ur,
	br: Nr,
	code: Mr,
	del: ir,
	delLDelim: ir,
	delRDelim: ir,
	emStrongLDelim: Gr,
	emStrongRDelimAst: Yr,
	emStrongRDelimUnd: Qr,
	escape: jr,
	link: si,
	nolink: li,
	punctuation: Rr,
	reflink: ci,
	reflinkSearch: ui,
	tag: ai,
	text: Pr,
	url: ir
}, pi = {
	...fi,
	emStrongLDelim: qr,
	emStrongRDelimAst: Zr,
	emStrongRDelimUnd: $r,
	link: X(/^!?\[(label)\]\((.*?)\)/).replace("label", oi).getRegex(),
	reflink: X(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", oi).getRegex()
}, mi = {
	...fi,
	emStrongRDelimAst: Xr,
	emStrongLDelim: Kr,
	delLDelim: ei,
	delRDelim: ti,
	url: X(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", di).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: X(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", di).getRegex()
}, hi = {
	...mi,
	br: X(Nr).replace("{2,}", "*").getRegex(),
	text: X(mi.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, gi = {
	normal: Dr,
	gfm: kr,
	pedantic: Ar
}, _i = {
	normal: fi,
	gfm: mi,
	breaks: hi,
	pedantic: pi
}, vi = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, yi = (e) => vi[e];
function bi(e, t) {
	if (t) {
		if (Z.escapeTest.test(e)) return e.replace(Z.escapeReplace, yi);
	} else if (Z.escapeTestNoEncode.test(e)) return e.replace(Z.escapeReplaceNoEncode, yi);
	return e;
}
function xi(e) {
	try {
		e = encodeURI(e).replace(Z.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function Si(e, t) {
	let n = e.replace(Z.findPipe, (e, t, n) => {
		let r = !1, i = t;
		for (; --i >= 0 && n[i] === "\\";) r = !r;
		return r ? "|" : " |";
	}).split(Z.splitPipe), r = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), t) {
		if (n.length > t) n.splice(t);
		else for (; n.length < t;) n.push("");
	}
	for (; r < n.length; r++) n[r] = n[r].trim().replace(Z.slashPipe, "|");
	return n;
}
function Ci(e, t, n) {
	let r = e.length;
	if (r === 0) return "";
	let i = 0;
	for (; i < r;) {
		let a = e.charAt(r - i - 1);
		if (a === t && !n) i++;
		else if (a !== t && n) i++;
		else break;
	}
	return e.slice(0, r - i);
}
function wi(e) {
	let t = e.split("\n"), n = t.length - 1;
	for (; n >= 0 && Z.blankLine.test(t[n]);) n--;
	return t.length - n <= 2 ? e : t.slice(0, n + 1).join("\n");
}
function Ti(e, t) {
	if (e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
function Ei(e, t = 0) {
	let n = t, r = "";
	for (let t of e) if (t === "	") {
		let e = 4 - n % 4;
		r += " ".repeat(e), n += e;
	} else r += t, n++;
	return r;
}
function Di(e, t, n, r, i) {
	let a = t.href, o = t.title || null, s = e[1].replace(i.other.outputLinkReplace, "$1"), c = e[0].charAt(0) === "!";
	r.state.inLink = !0;
	let l = r.state.linkEmitted, u = r.state.inRawBlock;
	r.state.linkEmitted = !1;
	let d = r.inlineTokens(s), f = r.state.linkEmitted;
	if (r.state.linkEmitted = l, r.state.inLink = !1, !c) {
		if (f) {
			r.state.inRawBlock = u;
			return;
		}
		r.state.linkEmitted = !0;
	}
	return {
		type: c ? "image" : "link",
		raw: n,
		href: a,
		title: o,
		text: s,
		tokens: d
	};
}
function Oi(e, t, n) {
	let r = e.match(n.other.indentCodeCompensation);
	if (r === null) return t;
	let i = r[1];
	return t.split("\n").map((e) => {
		let t = e.match(n.other.beginningSpace);
		if (t === null) return e;
		let [r] = t;
		return r.length >= i.length ? e.slice(i.length) : e;
	}).join("\n");
}
var ki = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || nr;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let e = this.options.pedantic ? t[0] : wi(t[0]);
			return {
				type: "code",
				raw: e,
				codeBlockStyle: "indented",
				text: e.replace(this.rules.other.codeRemoveIndent, "")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let e = t[0], n = Oi(e, t[3] || "", this.rules);
			return {
				type: "code",
				raw: e,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: n
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let e = t[2].trim();
			if (this.rules.other.endingHash.test(e)) {
				let t = Ci(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: Ci(t[0], "\n"),
				depth: t[1].length,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: Ci(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = Ci(t[0], "\n").split("\n"), n = "", r = "", i = [];
			for (; e.length > 0;) {
				let t = !1, a = [], o;
				for (o = 0; o < e.length; o++) if (this.rules.other.blockquoteStart.test(e[o])) a.push(e[o]), t = !0;
				else if (!t) a.push(e[o]);
				else break;
				e = e.slice(o);
				let s = a.join("\n"), c = s.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
				n = n ? `${n}
${s}` : s, r = r ? `${r}
${c}` : c;
				let l = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = l, e.length === 0) break;
				let u = i.at(-1);
				if (u?.type === "code") break;
				if (u?.type === "blockquote") {
					let t = u, a = e.join("\n"), o = t.raw + "\n" + a.replace(this.rules.other.blockquoteSetextReplace2, ""), s = this.blockquote(o);
					i[i.length - 1] = s, n = `${n}
${a}`, r = r.substring(0, r.length - t.text.length) + s.text;
					break;
				}
				if (u?.type === "list") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.list(a);
					i[i.length - 1] = o, n = n.substring(0, n.length - u.raw.length) + o.raw, r = r.substring(0, r.length - t.raw.length) + o.raw, e = a.substring(i.at(-1).raw.length).split("\n");
					continue;
				}
			}
			return {
				type: "blockquote",
				raw: n,
				tokens: i,
				text: r
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			let n = t[1].trim(), r = n.length > 1, i = {
				type: "list",
				raw: "",
				ordered: r,
				start: r ? +n.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
			let a = this.rules.other.listItemRegex(n), o = !1;
			for (; e;) {
				let n = !1, r = "", s = "";
				if (!(t = a.exec(e)) || this.rules.block.hr.test(e)) break;
				r = t[0], e = e.substring(r.length);
				let c = Ei(t[2].split("\n", 1)[0], t[1].length), l = e.split("\n", 1)[0], u = !c.trim(), d = 0;
				if (this.options.pedantic ? (d = 2, s = c.trimStart()) : u ? d = t[1].length + 1 : (d = c.search(this.rules.other.nonSpaceChar), d = d > 4 ? 1 : d, s = c.slice(d), d += t[1].length), u && this.rules.other.blankLine.test(l) && (r += l + "\n", e = e.substring(l.length + 1), n = !0), !n) {
					let t = this.rules.other.nextBulletRegex(d), n = this.rules.other.hrRegex(d), i = this.rules.other.fencesBeginRegex(d), a = this.rules.other.headingBeginRegex(d), o = this.rules.other.htmlBeginRegex(d), f = this.rules.other.blockquoteBeginRegex(d);
					for (; e;) {
						let p = e.split("\n", 1)[0], m;
						if (l = p, this.options.pedantic ? (l = l.replace(this.rules.other.listReplaceNesting, "  "), m = l) : m = l.replace(this.rules.other.tabCharGlobal, "    "), i.test(l) || a.test(l) || o.test(l) || f.test(l) || t.test(l) || n.test(l)) break;
						if (m.search(this.rules.other.nonSpaceChar) >= d || !l.trim()) s += "\n" + m.slice(d);
						else {
							if (u || c.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || i.test(c) || a.test(c) || n.test(c)) break;
							s += "\n" + l;
						}
						u = !l.trim(), r += p + "\n", e = e.substring(p.length + 1), c = m.slice(d);
					}
				}
				i.loose || (o ? i.loose = !0 : this.rules.other.doubleBlankLine.test(r) && (o = !0)), i.items.push({
					type: "list_item",
					raw: r,
					task: !!this.options.gfm && this.rules.other.listIsTask.test(s),
					loose: !1,
					text: s,
					tokens: []
				}), i.raw += r;
			}
			let s = i.items.at(-1);
			if (s) s.raw = s.raw.trimEnd(), s.text = s.text.trimEnd();
			else return;
			i.raw = i.raw.trimEnd();
			for (let e of i.items) if (this.lexer.state.top = !1, e.tokens = this.lexer.blockTokens(e.text, []), !i.loose) {
				let t = e.tokens.filter((e) => e.type === "space");
				i.loose = t.length > 0 && t.some((e) => this.rules.other.anyLine.test(e.raw));
			}
			for (let e of i.items) {
				let t = e.tokens[0];
				if (e.task && (t?.type === "text" || t?.type === "paragraph")) {
					e.text = e.text.replace(this.rules.other.listReplaceTask, ""), t.raw = t.raw.replace(this.rules.other.listReplaceTask, ""), t.text = t.text.replace(this.rules.other.listReplaceTask, "");
					for (let e = this.lexer.inlineQueue.length - 1; e >= 0; e--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)) {
						this.lexer.inlineQueue[e].src = this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask, "");
						break;
					}
					let n = this.rules.other.listTaskCheckbox.exec(e.raw);
					if (n) {
						let t = {
							type: "checkbox",
							raw: n[0] + " ",
							checked: n[0] !== "[ ]"
						};
						e.checked = t.checked, i.loose ? e.tokens[0] && ["paragraph", "text"].includes(e.tokens[0].type) && "tokens" in e.tokens[0] && e.tokens[0].tokens ? (e.tokens[0].raw = t.raw + e.tokens[0].raw, e.tokens[0].text = t.raw + e.tokens[0].text, e.tokens[0].tokens.unshift(t)) : e.tokens.unshift({
							type: "paragraph",
							raw: t.raw,
							text: t.raw,
							tokens: [t]
						}) : e.tokens.unshift(t);
					}
				} else e.task &&= !1;
			}
			if (i.loose) for (let e of i.items) {
				e.loose = !0;
				for (let t of e.tokens) t.type === "text" && (t.type = "paragraph");
			}
			return i;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) {
			let e = wi(t[0]);
			return {
				type: "html",
				block: !0,
				raw: e,
				pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
				text: e
			};
		}
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			let e = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: Ci(t[0], "\n"),
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = Si(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: Ci(t[0], "\n"),
			header: [],
			align: [],
			rows: []
		};
		if (n.length === r.length) {
			for (let e of r) this.rules.other.tableAlignRight.test(e) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(e) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(e) ? a.align.push("left") : a.align.push(null);
			for (let e = 0; e < n.length; e++) a.header.push({
				text: n[e],
				tokens: this.lexer.inline(n[e]),
				header: !0,
				align: a.align[e]
			});
			for (let e of i) a.rows.push(Si(e, a.header.length).map((e, t) => ({
				text: e,
				tokens: this.lexer.inline(e),
				header: !1,
				align: a.align[t]
			})));
			return a;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) {
			let e = t[1].trim();
			return {
				type: "heading",
				raw: Ci(t[0], "\n"),
				depth: t[2].charAt(0) === "=" ? 1 : 2,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let e = t[1].charAt(t[1].length - 1) === "\n" ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let e = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(e)) {
				if (!this.rules.other.endAngleBracket.test(e)) return;
				let t = Ci(e.slice(0, -1), "\\");
				if ((e.length - t.length) % 2 == 0) return;
			} else {
				let e = Ti(t[2], "()");
				if (e === -2) return;
				if (e > -1) {
					let n = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + e;
					t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "";
				}
			}
			let n = t[2], r = "";
			if (this.options.pedantic) {
				let e = this.rules.other.pedanticHrefTitle.exec(n);
				e && (n = e[1], r = e[3]);
			} else r = t[3] ? t[3].slice(1, -1) : "";
			return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (n = this.options.pedantic && !this.rules.other.endAngleBracket.test(e) ? n.slice(1) : n.slice(1, -1)), Di(t, {
				href: n && n.replace(this.rules.inline.anyPunctuation, "$1"),
				title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let e = t[(n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " ").toLowerCase()];
			if (!e) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return Di(n, e, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let r = this.rules.inline.emStrongLDelim.exec(e);
		if (!(!r || !r[1] && !r[2] && !r[3] && !r[4] || r[4] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[3]) || !n || this.rules.inline.punctuation.exec(n))) {
			let i = [...r[0]].length - 1, a, o, s = i, c = 0, l = r[0][0], u = n === l, d = l === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			for (d.lastIndex = 0, t = t.slice(-1 * e.length + i); (r = d.exec(t)) !== null;) {
				if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a) continue;
				if (o = [...a].length, r[3] || r[4]) {
					s += o;
					continue;
				}
				if (r[5] || r[6]) {
					if (i % 3 && !((i + o) % 3)) {
						c += o;
						continue;
					}
					if (u) break;
				}
				if (s -= o, s > 0) continue;
				o = Math.min(o, o + s + c);
				let t = [...r[0]][0].length, n = e.slice(0, i + r.index + t + o);
				if (Math.min(i, o) % 2) {
					let e = n.slice(1, -1);
					return {
						type: "em",
						raw: n,
						text: e,
						tokens: this.lexer.inlineTokens(e)
					};
				}
				let l = n.slice(2, -2);
				return {
					type: "strong",
					raw: n,
					text: l,
					tokens: this.lexer.inlineTokens(l)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let e = t[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(e), r = this.rules.other.startingSpaceChar.test(e) && this.rules.other.endingSpaceChar.test(e);
			return n && r && (e = e.substring(1, e.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: e
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e, t, n = "") {
		let r = this.rules.inline.delLDelim.exec(e);
		if (r && (!r[1] || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = this.rules.inline.delRDelim;
			for (s.lastIndex = 0, t = t.slice(-1 * e.length + n); (r = s.exec(t)) !== null;) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i || (a = [...i].length, a !== n)) continue;
				if (r[3] || r[4]) {
					o += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o);
				let t = [...r[0]][0].length, s = e.slice(0, n + r.index + t + a), c = s.slice(n, -n);
				return {
					type: "del",
					raw: s,
					text: c,
					tokens: this.lexer.inlineTokens(c)
				};
			}
		}
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let e, n;
			return t[2] === "@" ? (e = t[1], n = "mailto:" + e) : (e = t[1], n = e), {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let e, n;
			if (t[2] === "@") e = t[0], n = "mailto:" + e;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				e = t[0], n = t[1] === "www." ? "http://" + t[0] : t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let e = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: t[0],
				escaped: e
			};
		}
	}
}, Ai = class e {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || nr, this.options.tokenizer = this.options.tokenizer || new ki(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			linkEmitted: !1,
			top: !0
		};
		let t = {
			other: Z,
			block: gi.normal,
			inline: _i.normal
		};
		this.options.pedantic ? (t.block = gi.pedantic, t.inline = _i.pedantic) : this.options.gfm && (t.block = gi.gfm, t.inline = this.options.breaks ? _i.breaks : _i.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: gi,
			inline: _i
		};
	}
	static lex(t, n) {
		return new e(n).lex(t);
	}
	static lexInline(t, n) {
		return new e(n).inlineTokens(t);
	}
	lex(e) {
		e = e.replace(Z.carriageReturn, "\n"), this.blockTokens(e, this.tokens);
		for (let e = 0; e < this.inlineQueue.length; e++) {
			let t = this.inlineQueue[e];
			this.inlineTokens(t.src, t.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(Z.tabCharGlobal, "    ").replace(Z.spaceLine, ""));
		let r = 1 / 0;
		for (; e;) {
			if (e.length < r) r = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			let i;
			if (this.options.extensions?.block?.some((n) => (i = n.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1)) continue;
			if (i = this.tokenizer.space(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				i.raw.length === 1 && n !== void 0 ? n.raw += "\n" : t.push(i);
				continue;
			}
			if (i = this.tokenizer.code(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if (i = this.tokenizer.fences(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.heading(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.hr(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.blockquote(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.list(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.html(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.def(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.raw, this.inlineQueue.at(-1).src = n.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = {
					href: i.href,
					title: i.title
				}, t.push(i));
				continue;
			}
			if (i = this.tokenizer.table(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.lheading(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			let a = e;
			if (this.options.extensions?.startBlock) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startBlock.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (a = e.substring(0, t + 1));
			}
			if (this.state.top && (i = this.tokenizer.paragraph(a))) {
				let r = t.at(-1);
				n && r?.type === "paragraph" ? (r.raw += (r.raw.endsWith("\n") ? "" : "\n") + i.raw, r.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : t.push(i), n = a.length !== e.length, e = e.substring(i.raw.length);
				continue;
			}
			if (i = this.tokenizer.text(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return this.state.top = !0, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	linkInText(e) {
		if (!e.includes("[")) return !1;
		let t = this.tokenizer.rules.inline.link;
		for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return !0;
		for (let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
			let e = t[0], n = e.lastIndexOf("[");
			if (!(e.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, e.slice(n + 1, -1))) && !(n > 1 && this.linkInText(e.slice(1, n - 1)))) return !0;
		}
		return !1;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = e;
		if (this.tokens.links && e.includes("[")) {
			let e = this.tokenizer.rules.inline.reflinkSearch, t = (n) => {
				let r = n.lastIndexOf("[");
				if (!Object.hasOwn(this.tokens.links, n.slice(r + 1, -1))) return n;
				if (r > 1 && n.charAt(0) !== "!") {
					let i = n.slice(1, r - 1);
					if (this.linkInText(i)) return "[" + i.replace(e, t) + "][" + "a".repeat(n.length - r - 2) + "]";
				}
				return "[" + "a".repeat(n.length - 2) + "]";
			};
			n = n.replace(e, t);
		}
		n = n.replace(this.tokenizer.rules.inline.anyPunctuation, (e) => "+".repeat(e.length)), n = n.replace(this.tokenizer.rules.inline.blockSkip, (e, t, n) => {
			let r = n ? n.length : 0;
			return e.slice(0, r) + "[" + "a".repeat(e.length - r - 2) + "]";
		}), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
		let r = !1, i = "", a = 1 / 0;
		for (; e;) {
			if (e.length < a) a = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			r || (i = ""), r = !1;
			let o;
			if (this.options.extensions?.inline?.some((n) => (o = n.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1)) continue;
			if (o = this.tokenizer.escape(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.tag(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.link(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(o.raw.length);
				let n = t.at(-1);
				o.type === "text" && n?.type === "text" ? (n.raw += o.raw, n.text += o.text) : t.push(o);
				continue;
			}
			if (o = this.tokenizer.emStrong(e, n, i)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.codespan(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.br(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.del(e, n, i)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.autolink(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (!this.state.inLink && (o = this.tokenizer.url(e))) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			let s = e;
			if (this.options.extensions?.startInline) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startInline.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1));
			}
			if (o = this.tokenizer.inlineText(s)) {
				e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (i = o.raw.slice(-1)), r = !0;
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += o.raw, n.text += o.text) : t.push(o);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return t;
	}
	infiniteLoopError(e) {
		let t = "Infinite loop on byte: " + e;
		if (this.options.silent) console.error(t);
		else throw Error(t);
	}
}, ji = class {
	options;
	parser;
	constructor(e) {
		this.options = e || nr;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(Z.notSpaceStart)?.[0], i = e.replace(Z.endingNewline, "") + "\n";
		return r ? "<pre><code class=\"language-" + bi(r) + "\">" + (n ? i : bi(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : bi(i, !0)) + "</code></pre>\n";
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return "<hr>\n";
	}
	list(e) {
		let t = e.ordered, n = e.start, r = "";
		for (let t = 0; t < e.items.length; t++) {
			let n = e.items[t];
			r += this.listitem(n);
		}
		let i = t ? "ol" : "ul", a = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + i + a + ">\n" + r + "</" + i + ">\n";
	}
	listitem(e) {
		return `<li>${this.parser.parse(e.tokens)}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let t = 0; t < e.header.length; t++) n += this.tablecell(e.header[t]);
		t += this.tablerow({ text: n });
		let r = "";
		for (let t = 0; t < e.rows.length; t++) {
			let i = e.rows[t];
			n = "";
			for (let e = 0; e < i.length; e++) n += this.tablecell(i[e]);
			r += this.tablerow({ text: n });
		}
		return r &&= `<tbody>${r}</tbody>`, "<table>\n<thead>\n" + t + "</thead>\n" + r + "</table>\n";
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${bi(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, tokens: n }) {
		let r = this.parser.parseInline(n), i = xi(e);
		if (i === null) return r;
		e = i;
		let a = "<a href=\"" + e + "\"";
		return t && (a += " title=\"" + bi(t) + "\""), a += ">" + r + "</a>", a;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = xi(e);
		if (i === null) return bi(n);
		e = i;
		let a = `<img src="${e}" alt="${bi(n)}"`;
		return t && (a += ` title="${bi(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : bi(e.text);
	}
}, Mi = class {
	strong({ text: e }) {
		return e;
	}
	em({ text: e }) {
		return e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e }) {
		return e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e }) {
		return "" + e;
	}
	image({ text: e }) {
		return "" + e;
	}
	br() {
		return "";
	}
	checkbox({ raw: e }) {
		return e;
	}
}, Ni = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || nr, this.options.renderer = this.options.renderer || new ji(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Mi();
	}
	static parse(t, n) {
		return new e(n).parse(t);
	}
	static parseInline(t, n) {
		return new e(n).parseInline(t);
	}
	parse(e) {
		this.renderer.parser = this;
		let t = "";
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (this.options.extensions?.renderers?.[r.type]) {
				let e = r, n = this.options.extensions.renderers[e.type].call({ parser: this }, e);
				if (n !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"checkbox",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(e.type)) {
					t += n || "";
					continue;
				}
			}
			let i = r;
			switch (i.type) {
				case "space":
					t += this.renderer.space(i);
					break;
				case "hr":
					t += this.renderer.hr(i);
					break;
				case "heading":
					t += this.renderer.heading(i);
					break;
				case "code":
					t += this.renderer.code(i);
					break;
				case "table":
					t += this.renderer.table(i);
					break;
				case "blockquote":
					t += this.renderer.blockquote(i);
					break;
				case "list":
					t += this.renderer.list(i);
					break;
				case "checkbox":
					t += this.renderer.checkbox(i);
					break;
				case "html":
					t += this.renderer.html(i);
					break;
				case "def":
					t += this.renderer.def(i);
					break;
				case "paragraph":
					t += this.renderer.paragraph(i);
					break;
				case "text":
					t += this.renderer.text(i);
					break;
				default: {
					let e = "Token with \"" + i.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return t;
	}
	parseInline(e, t = this.renderer) {
		this.renderer.parser = this;
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions?.renderers?.[i.type]) {
				let e = this.options.extensions.renderers[i.type].call({ parser: this }, i);
				if (e !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"checkbox",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(i.type)) {
					n += e || "";
					continue;
				}
			}
			let a = i;
			switch (a.type) {
				case "escape":
					n += t.text(a);
					break;
				case "html":
					n += t.html(a);
					break;
				case "link":
					n += t.link(a);
					break;
				case "image":
					n += t.image(a);
					break;
				case "checkbox":
					n += t.checkbox(a);
					break;
				case "strong":
					n += t.strong(a);
					break;
				case "em":
					n += t.em(a);
					break;
				case "codespan":
					n += t.codespan(a);
					break;
				case "br":
					n += t.br(a);
					break;
				case "del":
					n += t.del(a);
					break;
				case "text":
					n += t.text(a);
					break;
				default: {
					let e = "Token with \"" + a.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
}, Pi = class {
	options;
	block;
	constructor(e) {
		this.options = e || nr;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
		"emStrongMask"
	]);
	static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer(e = this.block) {
		return e ? Ai.lex : Ai.lexInline;
	}
	provideParser(e = this.block) {
		return e ? Ni.parse : Ni.parseInline;
	}
}, Fi = new class {
	defaults = tr();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = Ni;
	Renderer = ji;
	TextRenderer = Mi;
	Lexer = Ai;
	Tokenizer = ki;
	Hooks = Pi;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) n = n.concat(this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) n = n.concat(this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				n = n.concat(this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(1 / 0);
					n = n.concat(this.walkTokens(i, t));
				}) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		return e.forEach((e) => {
			let n = { ...e };
			if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e) => {
				if (!e.name) throw Error("extension name required");
				if ("renderer" in e) {
					let n = t.renderers[e.name];
					n ? t.renderers[e.name] = function(...t) {
						let r = e.renderer.apply(this, t);
						return r === !1 && (r = n.apply(this, t)), r;
					} : t.renderers[e.name] = e.renderer;
				}
				if ("tokenizer" in e) {
					if (!e.level || e.level !== "block" && e.level !== "inline") throw Error("extension level must be 'block' or 'inline'");
					let n = t[e.level];
					n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
				}
				"childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
			}), n.extensions = t), e.renderer) {
				let t = this.defaults.renderer || new ji(this.defaults);
				for (let n in e.renderer) {
					if (!(n in t)) throw Error(`renderer '${n}' does not exist`);
					if (["options", "parser"].includes(n)) continue;
					let r = n, i = e.renderer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n || "";
					};
				}
				n.renderer = t;
			}
			if (e.tokenizer) {
				let t = this.defaults.tokenizer || new ki(this.defaults);
				for (let n in e.tokenizer) {
					if (!(n in t)) throw Error(`tokenizer '${n}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(n)) continue;
					let r = n, i = e.tokenizer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.tokenizer = t;
			}
			if (e.hooks) {
				let t = this.defaults.hooks || new Pi();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					t[r] = Pi.passThroughHooks.has(n) ? (e) => {
						if (this.defaults.async && Pi.passThroughHooksRespectAsync.has(n)) return (async () => {
							let n = await i.call(t, e);
							return a.call(t, n);
						})();
						let r = i.call(t, e);
						return a.call(t, r);
					} : (...e) => {
						if (this.defaults.async) return (async () => {
							let n = await i.apply(t, e);
							return n === !1 && (n = await a.apply(t, e)), n;
						})();
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.hooks = t;
			}
			if (e.walkTokens) {
				let t = this.defaults.walkTokens, r = e.walkTokens;
				n.walkTokens = function(e) {
					let n = [];
					return n.push(r.call(this, e)), t && (n = n.concat(t.call(this, e))), n;
				};
			}
			this.defaults = {
				...this.defaults,
				...n
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return Ai.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return Ni.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (t, n) => {
			let r = { ...n }, i = {
				...this.defaults,
				...r
			}, a = this.onError(!!i.silent, !!i.async);
			if (this.defaults.async === !0 && r.async === !1) return a(/* @__PURE__ */ Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof t > "u" || t === null) return a(/* @__PURE__ */ Error("marked(): input parameter is undefined or null"));
			if (typeof t != "string") return a(/* @__PURE__ */ Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
			if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer(e) : e ? Ai.lex : Ai.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser(e) : e ? Ni.parse : Ni.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer(e) : e ? Ai.lex : Ai.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser(e) : e ? Ni.parse : Ni.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + bi(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}();
function Q(e, t) {
	return Fi.parse(e, t);
}
Q.options = Q.setOptions = function(e) {
	return Fi.setOptions(e), Q.defaults = Fi.defaults, rr(Q.defaults), Q;
}, Q.getDefaults = tr, Q.defaults = nr;
function Ii(...e) {
	return Fi.use(...e), Q.defaults = Fi.defaults, rr(Q.defaults), Q;
}
Q.use = Ii, Q.walkTokens = function(e, t) {
	return Fi.walkTokens(e, t);
}, Q.parseInline = Fi.parseInline, Q.Parser = Ni, Q.parser = Ni.parse, Q.Renderer = ji, Q.TextRenderer = Mi, Q.Lexer = Ai, Q.lexer = Ai.lex, Q.Tokenizer = ki, Q.Hooks = Pi, Q.parse = Q, Q.options, Q.setOptions, Q.walkTokens, Q.parseInline, Ni.parse, Ai.lex;
//#endregion
//#region node_modules/lit-html/directives/unsafe-html.js
var Li = class extends Re {
	constructor(e) {
		if (super(e), this.it = z, e.type !== Ie.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === z || e == null) return this._t = void 0, this.it = e;
		if (e === ge) return e;
		if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
		if (e === this.it) return this._t;
		this.it = e;
		let t = [e];
		return t.raw = t, this._t = {
			_$litType$: this.constructor.resultType,
			strings: t,
			values: []
		};
	}
};
Li.directiveName = "unsafeHTML", Li.resultType = 1;
var Ri = Le(Li), zi = (/* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	function n(e) {
		return e instanceof Map ? e.clear = e.delete = e.set = function() {
			throw Error("map is read-only");
		} : e instanceof Set && (e.add = e.clear = e.delete = function() {
			throw Error("set is read-only");
		}), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((t) => {
			let r = e[t], i = typeof r;
			(i === "object" || i === "function") && !Object.isFrozen(r) && n(r);
		}), e;
	}
	var r = class {
		constructor(e) {
			e.data === void 0 && (e.data = {}), this.data = e.data, this.isMatchIgnored = !1;
		}
		ignoreMatch() {
			this.isMatchIgnored = !0;
		}
	};
	function i(e) {
		return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
	}
	function a(e, ...t) {
		let n = Object.create(null);
		for (let t in e) n[t] = e[t];
		return t.forEach(function(e) {
			for (let t in e) n[t] = e[t];
		}), n;
	}
	var o = "</span>", s = (e) => !!e.scope, c = (e, { prefix: t }) => {
		if (e.startsWith("language:")) return e.replace("language:", "language-");
		if (e.includes(".")) {
			let n = e.split(".");
			return [`${t}${n.shift()}`, ...n.map((e, t) => `${e}${"_".repeat(t + 1)}`)].join(" ");
		}
		return `${t}${e}`;
	}, l = class {
		constructor(e, t) {
			this.buffer = "", this.classPrefix = t.classPrefix, e.walk(this);
		}
		addText(e) {
			this.buffer += i(e);
		}
		openNode(e) {
			if (!s(e)) return;
			let t = c(e.scope, { prefix: this.classPrefix });
			this.span(t);
		}
		closeNode(e) {
			s(e) && (this.buffer += o);
		}
		value() {
			return this.buffer;
		}
		span(e) {
			this.buffer += `<span class="${e}">`;
		}
	}, u = (e = {}) => {
		let t = { children: [] };
		return Object.assign(t, e), t;
	}, d = class e {
		constructor() {
			this.rootNode = u(), this.stack = [this.rootNode];
		}
		get top() {
			return this.stack[this.stack.length - 1];
		}
		get root() {
			return this.rootNode;
		}
		add(e) {
			this.top.children.push(e);
		}
		openNode(e) {
			let t = u({ scope: e });
			this.add(t), this.stack.push(t);
		}
		closeNode() {
			if (this.stack.length > 1) return this.stack.pop();
		}
		closeAllNodes() {
			for (; this.closeNode(););
		}
		toJSON() {
			return JSON.stringify(this.rootNode, null, 4);
		}
		walk(e) {
			return this.constructor._walk(e, this.rootNode);
		}
		static _walk(e, t) {
			return typeof t == "string" ? e.addText(t) : t.children && (e.openNode(t), t.children.forEach((t) => this._walk(e, t)), e.closeNode(t)), e;
		}
		static _collapse(t) {
			typeof t != "string" && t.children && (t.children.every((e) => typeof e == "string") ? t.children = [t.children.join("")] : t.children.forEach((t) => {
				e._collapse(t);
			}));
		}
	}, f = class extends d {
		constructor(e) {
			super(), this.options = e;
		}
		addText(e) {
			e !== "" && this.add(e);
		}
		startScope(e) {
			this.openNode(e);
		}
		endScope() {
			this.closeNode();
		}
		__addSublanguage(e, t) {
			let n = e.root;
			t && (n.scope = `language:${t}`), this.add(n);
		}
		toHTML() {
			return new l(this, this.options).value();
		}
		finalize() {
			return this.closeAllNodes(), !0;
		}
	};
	function p(e) {
		return e ? typeof e == "string" ? e : e.source : null;
	}
	function m(e) {
		return _("(?=", e, ")");
	}
	function h(e) {
		return _("(?:", e, ")*");
	}
	function g(e) {
		return _("(?:", e, ")?");
	}
	function _(...e) {
		return e.map((e) => p(e)).join("");
	}
	function v(e) {
		let t = e[e.length - 1];
		return typeof t == "object" && t.constructor === Object ? (e.splice(e.length - 1, 1), t) : {};
	}
	function y(...e) {
		return "(" + (v(e).capture ? "" : "?:") + e.map((e) => p(e)).join("|") + ")";
	}
	function b(e) {
		return RegExp(e.toString() + "|").exec("").length - 1;
	}
	function x(e, t) {
		let n = e && e.exec(t);
		return n && n.index === 0;
	}
	var ee = new RegExp(y(/\[(?:[^\\\]]|\\.)*\]/, /\(\?<(?![=!])[^>]+>/, /\(\?'[^']+'/, /\(\??/, /\\([1-9][0-9]*)/, /\\./));
	function S(e, { joinWith: t }) {
		let n = 0;
		return e.map((e) => {
			n += 1;
			let t = n, r = p(e), i = "";
			for (; r.length > 0;) {
				let e = ee.exec(r);
				if (!e) {
					i += r;
					break;
				}
				i += r.substring(0, e.index), r = r.substring(e.index + e[0].length), e[0][0] === "\\" && e[1] ? i += "\\" + String(Number(e[1]) + t) : (i += e[0], (e[0] === "(" || /^\(\?[<']/.test(e[0])) && n++);
			}
			return i;
		}).map((e) => `(${e})`).join(t);
	}
	var C = /\b\B/, w = "[a-zA-Z]\\w*", te = "[a-zA-Z_]\\w*", T = "\\b\\d+(\\.\\d+)?", E = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", D = "\\b(0b[01]+)", O = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", ne = (e = {}) => {
		let t = /^#![ ]*\//;
		return e.binary && (e.begin = _(t, /.*\b/, e.binary, /\b.*/)), a({
			scope: "meta",
			begin: t,
			end: /$/,
			relevance: 0,
			"on:begin": (e, t) => {
				e.index !== 0 && t.ignoreMatch();
			}
		}, e);
	}, k = {
		begin: "\\\\[\\s\\S]",
		relevance: 0
	}, A = {
		scope: "string",
		begin: "'",
		end: "'",
		illegal: "\\n",
		contains: [k]
	}, j = {
		scope: "string",
		begin: "\"",
		end: "\"",
		illegal: "\\n",
		contains: [k]
	}, re = { begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/ }, M = function(e, t, n = {}) {
		let r = a({
			scope: "comment",
			begin: e,
			end: t,
			contains: []
		}, n);
		r.contains.push({
			scope: "doctag",
			begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
			end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
			excludeBegin: !0,
			relevance: 0
		});
		let i = y("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
		return r.contains.push({ begin: _(/[ ]+/, "(", i, /[.]?[:]?([.][ ]|[ ])/, "){3}") }), r;
	}, ie = M("//", "$"), N = M("/\\*", "\\*/"), P = M("#", "$"), ae = /*#__PURE__*/ Object.freeze({
		__proto__: null,
		APOS_STRING_MODE: A,
		BACKSLASH_ESCAPE: k,
		BINARY_NUMBER_MODE: {
			scope: "number",
			begin: D,
			relevance: 0
		},
		BINARY_NUMBER_RE: D,
		COMMENT: M,
		C_BLOCK_COMMENT_MODE: N,
		C_LINE_COMMENT_MODE: ie,
		C_NUMBER_MODE: {
			scope: "number",
			begin: E,
			relevance: 0
		},
		C_NUMBER_RE: E,
		END_SAME_AS_BEGIN: function(e) {
			return Object.assign(e, {
				"on:begin": (e, t) => {
					t.data._beginMatch = e[1];
				},
				"on:end": (e, t) => {
					t.data._beginMatch !== e[1] && t.ignoreMatch();
				}
			});
		},
		HASH_COMMENT_MODE: P,
		IDENT_RE: w,
		MATCH_NOTHING_RE: C,
		METHOD_GUARD: {
			begin: "\\.\\s*[a-zA-Z_]\\w*",
			relevance: 0
		},
		NUMBER_MODE: {
			scope: "number",
			begin: T,
			relevance: 0
		},
		NUMBER_RE: T,
		PHRASAL_WORDS_MODE: re,
		QUOTE_STRING_MODE: j,
		REGEXP_MODE: {
			scope: "regexp",
			begin: /\/(?=[^/\n]*\/)/,
			end: /\/[gimuy]*/,
			contains: [k, {
				begin: /\[/,
				end: /\]/,
				relevance: 0,
				contains: [k]
			}]
		},
		RE_STARTERS_RE: O,
		SHEBANG: ne,
		TITLE_MODE: {
			scope: "title",
			begin: w,
			relevance: 0
		},
		UNDERSCORE_IDENT_RE: te,
		UNDERSCORE_TITLE_MODE: {
			scope: "title",
			begin: te,
			relevance: 0
		}
	});
	function oe(e, t) {
		e.input[e.index - 1] === "." && t.ignoreMatch();
	}
	function se(e, t) {
		e.className !== void 0 && (e.scope = e.className, delete e.className);
	}
	function ce(e, t) {
		t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = oe, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, e.relevance === void 0 && (e.relevance = 0));
	}
	function le(e, t) {
		Array.isArray(e.illegal) && (e.illegal = y(...e.illegal));
	}
	function ue(e, t) {
		if (e.match) {
			if (e.begin || e.end) throw Error("begin & end are not supported with match");
			e.begin = e.match, delete e.match;
		}
	}
	function de(e, t) {
		e.relevance === void 0 && (e.relevance = 1);
	}
	var fe = (e, t) => {
		if (!e.beforeMatch) return;
		if (e.starts) throw Error("beforeMatch cannot be used with starts");
		let n = Object.assign({}, e);
		Object.keys(e).forEach((t) => {
			delete e[t];
		}), e.keywords = n.keywords, e.begin = _(n.beforeMatch, m(n.begin)), e.starts = {
			relevance: 0,
			contains: [Object.assign(n, { endsParent: !0 })]
		}, e.relevance = 0, delete n.beforeMatch;
	}, pe = [
		"of",
		"and",
		"for",
		"in",
		"not",
		"or",
		"if",
		"then",
		"parent",
		"list",
		"value"
	], F = "keyword";
	function me(e, t, n = F) {
		let r = Object.create(null);
		return typeof e == "string" ? i(n, e.split(" ")) : Array.isArray(e) ? i(n, e) : Object.keys(e).forEach(function(n) {
			Object.assign(r, me(e[n], t, n));
		}), r;
		function i(e, n) {
			t && (n = n.map((e) => e.toLowerCase())), n.forEach(function(t) {
				let n = t.split("|");
				r[n[0]] = [e, I(n[0], n[1])];
			});
		}
	}
	function I(e, t) {
		return t ? Number(t) : +!he(e);
	}
	function he(e) {
		return pe.includes(e.toLowerCase());
	}
	var L = {}, R = (e) => {
		console.error(e);
	}, ge = (e, ...t) => {
		console.log(`WARN: ${e}`, ...t);
	}, z = (e, t) => {
		L[`${e}/${t}`] || (console.log(`Deprecated as of ${e}. ${t}`), L[`${e}/${t}`] = !0);
	}, _e = /* @__PURE__ */ Error();
	function ve(e, t, { key: n }) {
		let r = 0, i = e[n], a = {}, o = {};
		for (let e = 1; e <= t.length; e++) o[e + r] = i[e], a[e + r] = !0, r += b(t[e - 1]);
		e[n] = o, e[n]._emit = a, e[n]._multi = !0;
	}
	function ye(e) {
		if (Array.isArray(e.begin)) {
			if (e.skip || e.excludeBegin || e.returnBegin) throw R("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), _e;
			if (typeof e.beginScope != "object" || e.beginScope === null) throw R("beginScope must be object"), _e;
			ve(e, e.begin, { key: "beginScope" }), e.begin = S(e.begin, { joinWith: "" });
		}
	}
	function be(e) {
		if (Array.isArray(e.end)) {
			if (e.skip || e.excludeEnd || e.returnEnd) throw R("skip, excludeEnd, returnEnd not compatible with endScope: {}"), _e;
			if (typeof e.endScope != "object" || e.endScope === null) throw R("endScope must be object"), _e;
			ve(e, e.end, { key: "endScope" }), e.end = S(e.end, { joinWith: "" });
		}
	}
	function xe(e) {
		e.scope && typeof e.scope == "object" && e.scope !== null && (e.beginScope = e.scope, delete e.scope);
	}
	function B(e) {
		xe(e), typeof e.beginScope == "string" && (e.beginScope = { _wrap: e.beginScope }), typeof e.endScope == "string" && (e.endScope = { _wrap: e.endScope }), ye(e), be(e);
	}
	function Se(e) {
		function t(t, n) {
			return new RegExp(p(t), "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (n ? "g" : ""));
		}
		class n {
			constructor() {
				this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
			}
			addRule(e, t) {
				t.position = this.position++, this.matchIndexes[this.matchAt] = t, this.regexes.push([t, e]), this.matchAt += b(e) + 1;
			}
			compile() {
				this.regexes.length === 0 && (this.exec = () => null);
				let e = this.regexes.map((e) => e[1]);
				this.matcherRe = t(S(e, { joinWith: "|" }), !0), this.lastIndex = 0;
			}
			exec(e) {
				this.matcherRe.lastIndex = this.lastIndex;
				let t = this.matcherRe.exec(e);
				if (!t) return null;
				let n = t.findIndex((e, t) => t > 0 && e !== void 0), r = this.matchIndexes[n];
				return t.splice(0, n), Object.assign(t, r);
			}
		}
		class r {
			constructor() {
				this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
			}
			getMatcher(e) {
				if (this.multiRegexes[e]) return this.multiRegexes[e];
				let t = new n();
				return this.rules.slice(e).forEach(([e, n]) => t.addRule(e, n)), t.compile(), this.multiRegexes[e] = t, t;
			}
			resumingScanAtSamePosition() {
				return this.regexIndex !== 0;
			}
			considerAll() {
				this.regexIndex = 0;
			}
			addRule(e, t) {
				this.rules.push([e, t]), t.type === "begin" && this.count++;
			}
			exec(e) {
				let t = this.getMatcher(this.regexIndex);
				t.lastIndex = this.lastIndex;
				let n = t.exec(e);
				if (this.resumingScanAtSamePosition() && !(n && n.index === this.lastIndex)) {
					let t = this.getMatcher(0);
					t.lastIndex = this.lastIndex + 1, n = t.exec(e);
				}
				return n && (this.regexIndex += n.position + 1, this.regexIndex === this.count && this.considerAll()), n;
			}
		}
		function i(e) {
			let t = new r();
			return e.contains.forEach((e) => t.addRule(e.begin, {
				rule: e,
				type: "begin"
			})), e.terminatorEnd && t.addRule(e.terminatorEnd, { type: "end" }), e.illegal && t.addRule(e.illegal, { type: "illegal" }), t;
		}
		function o(n, r) {
			let a = n;
			if (n.isCompiled) return a;
			[
				se,
				ue,
				B,
				fe
			].forEach((e) => e(n, r)), e.compilerExtensions.forEach((e) => e(n, r)), n.__beforeBegin = null, [
				ce,
				le,
				de
			].forEach((e) => e(n, r)), n.isCompiled = !0;
			let s = null;
			return typeof n.keywords == "object" && n.keywords.$pattern && (n.keywords = Object.assign({}, n.keywords), s = n.keywords.$pattern, delete n.keywords.$pattern), s ||= /\w+/, n.keywords &&= me(n.keywords, e.case_insensitive), a.keywordPatternRe = t(s, !0), r && (n.begin ||= /\B|\b/, a.beginRe = t(a.begin), !n.end && !n.endsWithParent && (n.end = /\B|\b/), n.end && (a.endRe = t(a.end)), a.terminatorEnd = p(a.end) || "", n.endsWithParent && r.terminatorEnd && (a.terminatorEnd += (n.end ? "|" : "") + r.terminatorEnd)), n.illegal && (a.illegalRe = t(n.illegal)), n.contains ||= [], n.contains = [].concat(...n.contains.map(function(e) {
				return we(e === "self" ? n : e);
			})), n.contains.forEach(function(e) {
				o(e, a);
			}), n.starts && o(n.starts, r), a.matcher = i(a), a;
		}
		if (e.compilerExtensions ||= [], e.contains && e.contains.includes("self")) throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
		return e.classNameAliases = a(e.classNameAliases || {}), o(e);
	}
	function Ce(e) {
		return e ? e.endsWithParent || Ce(e.starts) : !1;
	}
	function we(e) {
		return e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map(function(t) {
			return a(e, { variants: null }, t);
		})), e.cachedVariants ? e.cachedVariants : Ce(e) ? a(e, { starts: e.starts ? a(e.starts) : null }) : Object.isFrozen(e) ? a(e) : e;
	}
	var Te = "11.12.0", Ee = class extends Error {
		constructor(e, t) {
			super(e), this.name = "HTMLInjectionError", this.html = t;
		}
	}, De = i, Oe = a, ke = Symbol("nomatch"), Ae = 7, je = function(e) {
		let t = Object.create(null), i = Object.create(null), a = [], o = !0, s = "Could not find the language '{}', did you forget to load/include a language module?", c = {
			disableAutodetect: !0,
			name: "Plain text",
			contains: []
		}, l = {
			ignoreUnescapedHTML: !1,
			throwUnescapedHTML: !1,
			noHighlightRe: /^(no-?highlight)$/i,
			languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
			classPrefix: "hljs-",
			cssSelector: "pre code",
			languages: null,
			__emitter: f
		};
		function u(e) {
			return l.noHighlightRe.test(e);
		}
		function d(e) {
			let t = e.className + " ";
			t += e.parentNode ? e.parentNode.className : "";
			let n = l.languageDetectRe.exec(t);
			if (n) {
				let t = A(n[1]);
				return t || (ge(s.replace("{}", n[1])), ge("Falling back to no-highlight mode for this block.", e)), t ? n[1] : "no-highlight";
			}
			return t.split(/\s+/).find((e) => u(e) || A(e));
		}
		function p(e, t, n) {
			let r = "", i = "";
			typeof t == "object" ? (r = e, n = t.ignoreIllegals, i = t.language) : (z("10.7.0", "highlight(lang, code, ...args) has been deprecated."), z("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"), i = e, r = t), n === void 0 && (n = !0);
			let a = {
				code: r,
				language: i
			};
			P("before:highlight", a);
			let o = a.result ? a.result : v(a.language, a.code, n);
			return o.code = a.code, P("after:highlight", o), o;
		}
		function v(e, n, i, a) {
			let c = Object.create(null);
			function u(e, t) {
				return e.keywords[t];
			}
			function d() {
				if (!O.keywords) {
					k.addText(j);
					return;
				}
				let e = 0;
				O.keywordPatternRe.lastIndex = 0;
				let t = O.keywordPatternRe.exec(j), n = "";
				for (; t;) {
					n += j.substring(e, t.index);
					let r = T.case_insensitive ? t[0].toLowerCase() : t[0], i = u(O, r);
					if (i) {
						let [e, a] = i;
						if (k.addText(n), n = "", c[r] = (c[r] || 0) + 1, c[r] <= Ae && (re += a), e.startsWith("_")) n += t[0];
						else {
							let n = T.classNameAliases[e] || e;
							m(t[0], n);
						}
					} else n += t[0];
					e = O.keywordPatternRe.lastIndex, t = O.keywordPatternRe.exec(j);
				}
				n += j.substring(e), k.addText(n);
			}
			function f() {
				if (j === "") return;
				let e = null;
				if (typeof O.subLanguage == "string") {
					if (!t[O.subLanguage]) {
						k.addText(j);
						return;
					}
					e = v(O.subLanguage, j, !0, ne[O.subLanguage]), ne[O.subLanguage] = e._top;
				} else e = ee(j, O.subLanguage.length ? O.subLanguage : null);
				O.relevance > 0 && (re += e.relevance), k.__addSublanguage(e._emitter, e.language);
			}
			function p() {
				O.subLanguage == null ? d() : f(), j = "";
			}
			function m(e, t) {
				e !== "" && (k.startScope(t), k.addText(e), k.endScope());
			}
			function h(e, t) {
				let n = 1, r = t.length - 1;
				for (; n <= r;) {
					if (!e._emit[n]) {
						n++;
						continue;
					}
					let r = T.classNameAliases[e[n]] || e[n], i = t[n];
					r ? m(i, r) : (j = i, d(), j = ""), n++;
				}
			}
			function g(e, t) {
				return e.scope && typeof e.scope == "string" && k.openNode(T.classNameAliases[e.scope] || e.scope), e.beginScope && (e.beginScope._wrap ? (m(j, T.classNameAliases[e.beginScope._wrap] || e.beginScope._wrap), j = "") : e.beginScope._multi && (h(e.beginScope, t), j = "")), O = Object.create(e, { parent: { value: O } }), O;
			}
			function _(e, t, n) {
				let i = x(e.endRe, n);
				if (i) {
					if (e["on:end"]) {
						let n = new r(e);
						e["on:end"](t, n), n.isMatchIgnored && (i = !1);
					}
					if (i) {
						for (; e.endsParent && e.parent;) e = e.parent;
						return e;
					}
				}
				if (e.endsWithParent) return _(e.parent, t, n);
			}
			function y(e) {
				return O.matcher.regexIndex === 0 ? (j += e[0], 1) : (N = !0, 0);
			}
			function b(e) {
				let t = e[0], n = e.rule, i = new r(n), a = [n.__beforeBegin, n["on:begin"]];
				for (let n of a) if (n && (n(e, i), i.isMatchIgnored)) return y(t);
				return n.skip ? j += t : (n.excludeBegin && (j += t), p(), !n.returnBegin && !n.excludeBegin && (j = t)), g(n, e), n.returnBegin ? 0 : t.length;
			}
			function S(e) {
				let t = e[0], r = n.substring(e.index), i = _(O, e, r);
				if (!i) return ke;
				let a = O;
				O.endScope && O.endScope._wrap ? (p(), m(t, O.endScope._wrap)) : O.endScope && O.endScope._multi ? (p(), h(O.endScope, e)) : a.skip ? j += t : (a.returnEnd || a.excludeEnd || (j += t), p(), a.excludeEnd && (j = t));
				do
					O.scope && k.closeNode(), !O.skip && !O.subLanguage && (re += O.relevance), O = O.parent;
				while (O !== i.parent);
				return i.starts && g(i.starts, e), a.returnEnd ? 0 : t.length;
			}
			function C() {
				let e = [];
				for (let t = O; t !== T; t = t.parent) t.scope && e.unshift(t.scope);
				e.forEach((e) => k.openNode(e));
			}
			let w = {};
			function te(t, r) {
				let a = r && r[0];
				if (j += t, a == null) return p(), 0;
				if (w.type === "begin" && r.type === "end" && w.index === r.index && a === "") {
					if (j += n.slice(r.index, r.index + 1), !o) {
						let t = /* @__PURE__ */ Error(`0 width match regex (${e})`);
						throw t.languageName = e, t.badRule = w.rule, t;
					}
					return 1;
				}
				if (w = r, r.type === "begin") return b(r);
				if (r.type === "illegal" && !i) {
					let e = /* @__PURE__ */ Error("Illegal lexeme \"" + a + "\" for mode \"" + (O.scope || "<unnamed>") + "\"");
					throw e.mode = O, e;
				}
				if (r.type === "end") {
					let e = S(r);
					if (e !== ke) return e;
				}
				if (r.type === "illegal" && a === "") return r.index === n.length || (j += "\n"), 1;
				if (ie > 1e5 && ie > r.index * 3) throw /* @__PURE__ */ Error("potential infinite loop, way more iterations than matches");
				return j += a, a.length;
			}
			let T = A(e);
			if (!T) throw R(s.replace("{}", e)), Error("Unknown language: \"" + e + "\"");
			let E = Se(T), D = "", O = a || E, ne = {}, k = new l.__emitter(l);
			C();
			let j = "", re = 0, M = 0, ie = 0, N = !1;
			try {
				if (T.__emitTokens) T.__emitTokens(n, k);
				else {
					for (O.matcher.considerAll();;) {
						ie++, N ? N = !1 : O.matcher.considerAll(), O.matcher.lastIndex = M;
						let e = O.matcher.exec(n);
						if (!e) break;
						let t = te(n.substring(M, e.index), e);
						M = e.index + t;
					}
					te(n.substring(M));
				}
				return k.finalize(), D = k.toHTML(), {
					language: e,
					value: D,
					relevance: re,
					illegal: !1,
					_emitter: k,
					_top: O
				};
			} catch (t) {
				if (t.message && t.message.includes("Illegal")) return {
					language: e,
					value: De(n),
					illegal: !0,
					relevance: 0,
					_illegalBy: {
						message: t.message,
						index: M,
						context: n.slice(M - 100, M + 100),
						mode: t.mode,
						resultSoFar: D
					},
					_emitter: k
				};
				if (o) return {
					language: e,
					value: De(n),
					illegal: !1,
					relevance: 0,
					errorRaised: t,
					_emitter: k,
					_top: O
				};
				throw t;
			}
		}
		function b(e) {
			let t = {
				value: De(e),
				illegal: !1,
				relevance: 0,
				_top: c,
				_emitter: new l.__emitter(l)
			};
			return t._emitter.addText(e), t;
		}
		function ee(e, n) {
			n = n || l.languages || Object.keys(t);
			let r = b(e), i = n.filter(A).filter(re).map((t) => v(t, e, !1));
			i.unshift(r);
			let [a, o] = i.sort((e, t) => {
				if (e.relevance !== t.relevance) return t.relevance - e.relevance;
				if (e.language && t.language) {
					if (A(e.language).supersetOf === t.language) return 1;
					if (A(t.language).supersetOf === e.language) return -1;
				}
				return 0;
			}), s = a;
			return s.secondBest = o, s;
		}
		function S(e, t, n) {
			let r = t && i[t] || n;
			e.classList.add("hljs"), e.classList.add(`language-${r}`);
		}
		function C(e) {
			let t = null, n = d(e);
			if (u(n)) return;
			if (P("before:highlightElement", {
				el: e,
				language: n
			}), e.dataset.highlighted) {
				console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", e);
				return;
			}
			if (e.children.length > 0 && (l.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(e)), l.throwUnescapedHTML)) throw new Ee("One of your code blocks includes unescaped HTML.", e.innerHTML);
			t = e;
			let r = t.textContent, i = n ? p(r, {
				language: n,
				ignoreIllegals: !0
			}) : ee(r);
			e.innerHTML = i.value, e.dataset.highlighted = "yes", S(e, n, i.language), e.result = {
				language: i.language,
				re: i.relevance,
				relevance: i.relevance
			}, i.secondBest && (e.secondBest = {
				language: i.secondBest.language,
				relevance: i.secondBest.relevance
			}), P("after:highlightElement", {
				el: e,
				result: i,
				text: r
			});
		}
		function w(e) {
			l = Oe(l, e);
		}
		let te = () => {
			D(), z("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
		};
		function T() {
			D(), z("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
		}
		let E = !1;
		function D() {
			function e() {
				D();
			}
			if (document.readyState === "loading") {
				E || window.addEventListener("DOMContentLoaded", e, !1), E = !0;
				return;
			}
			document.querySelectorAll(l.cssSelector).forEach(C);
		}
		function O(n, r) {
			let i = null;
			try {
				i = r(e);
			} catch (e) {
				if (R("Language definition for '{}' could not be registered.".replace("{}", n)), o) R(e);
				else throw e;
				i = c;
			}
			i.name || (i.name = n), t[n] = i, i.rawDefinition = r.bind(null, e), i.aliases && j(i.aliases, { languageName: n });
		}
		function ne(e) {
			delete t[e];
			for (let t of Object.keys(i)) i[t] === e && delete i[t];
		}
		function k() {
			return Object.keys(t);
		}
		function A(e) {
			return e = (e || "").toLowerCase(), t[e] || t[i[e]];
		}
		function j(e, { languageName: t }) {
			typeof e == "string" && (e = [e]), e.forEach((e) => {
				i[e.toLowerCase()] = t;
			});
		}
		function re(e) {
			let t = A(e);
			return t && !t.disableAutodetect;
		}
		function M(e) {
			e["before:highlightBlock"] && !e["before:highlightElement"] && (e["before:highlightElement"] = (t) => {
				e["before:highlightBlock"](Object.assign({ block: t.el }, t));
			}), e["after:highlightBlock"] && !e["after:highlightElement"] && (e["after:highlightElement"] = (t) => {
				e["after:highlightBlock"](Object.assign({ block: t.el }, t));
			});
		}
		function ie(e) {
			M(e), a.push(e);
		}
		function N(e) {
			let t = a.indexOf(e);
			t !== -1 && a.splice(t, 1);
		}
		function P(e, t) {
			let n = e;
			a.forEach(function(e) {
				e[n] && e[n](t);
			});
		}
		function oe(e) {
			return z("10.7.0", "highlightBlock will be removed entirely in v12.0"), z("10.7.0", "Please use highlightElement now."), C(e);
		}
		Object.assign(e, {
			highlight: p,
			highlightAuto: ee,
			highlightAll: D,
			highlightElement: C,
			highlightBlock: oe,
			configure: w,
			initHighlighting: te,
			initHighlightingOnLoad: T,
			registerLanguage: O,
			unregisterLanguage: ne,
			listLanguages: k,
			getLanguage: A,
			registerAliases: j,
			autoDetection: re,
			inherit: Oe,
			addPlugin: ie,
			removePlugin: N
		}), e.debugMode = function() {
			o = !1;
		}, e.safeMode = function() {
			o = !0;
		}, e.versionString = Te, e.regex = {
			concat: _,
			lookahead: m,
			either: y,
			optional: g,
			anyNumberOfTimes: h
		};
		for (let e in ae) typeof ae[e] == "object" && n(ae[e]);
		return Object.assign(e, ae), e;
	}, Me = je({});
	Me.newInstance = () => je({}), t.exports = Me, Me.HighlightJS = Me, Me.default = Me;
})))())).default, Bi = {
	scope: "number",
	match: "([-+]?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)|NaN|[-+]?Infinity",
	relevance: 0
};
function Vi(e) {
	let t = {
		className: "attr",
		begin: /(("(\\.|[^\\"\r\n])*")|('(\\.|[^\\'\r\n])*'))(?=\s*:)/,
		relevance: 1.01
	}, n = {
		match: /[{}[\],:]/,
		className: "punctuation",
		relevance: 0
	}, r = [
		"true",
		"false",
		"null"
	], i = {
		scope: "literal",
		beginKeywords: r.join(" ")
	};
	return {
		name: "JSON",
		aliases: ["jsonc", "json5"],
		keywords: { literal: r },
		contains: [
			t,
			n,
			e.APOS_STRING_MODE,
			e.QUOTE_STRING_MODE,
			i,
			Bi,
			e.C_LINE_COMMENT_MODE,
			e.C_BLOCK_COMMENT_MODE
		],
		illegal: "\\S"
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/yaml.js
function Hi(e) {
	let t = "true false yes no null", n = "[\\w#;/?:@&=+$,.~*'()[\\]]+", r = {
		className: "attr",
		variants: [
			{ begin: /[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/ },
			{ begin: /"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/ },
			{ begin: /'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/ }
		]
	}, i = {
		className: "template-variable",
		variants: [{
			begin: /\{\{/,
			end: /\}\}/
		}, {
			begin: /%\{/,
			end: /\}/
		}]
	}, a = {
		className: "string",
		relevance: 0,
		begin: /'/,
		end: /'/,
		contains: [{
			match: /''/,
			scope: "char.escape",
			relevance: 0
		}]
	}, o = {
		className: "string",
		relevance: 0,
		variants: [{
			begin: /"/,
			end: /"/
		}, { begin: /\S+/ }],
		contains: [e.BACKSLASH_ESCAPE, i]
	}, s = e.inherit(o, { variants: [
		{
			begin: /'/,
			end: /'/,
			contains: [{
				begin: /''/,
				relevance: 0
			}]
		},
		{
			begin: /"/,
			end: /"/
		},
		{ begin: /[^\s,{}[\]]+/ }
	] }), c = {
		className: "number",
		begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
	}, l = {
		end: ",",
		endsWithParent: !0,
		excludeEnd: !0,
		keywords: t,
		relevance: 0
	}, u = {
		begin: /\{/,
		end: /\}/,
		contains: [l],
		illegal: "\\n",
		relevance: 0
	}, d = {
		begin: "\\[",
		end: "\\]",
		contains: [l],
		illegal: "\\n",
		relevance: 0
	}, f = [
		r,
		{
			className: "meta",
			begin: "^---\\s*$",
			relevance: 10
		},
		{
			className: "string",
			begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
		},
		{
			begin: "<%[%=-]?",
			end: "[%-]?%>",
			subLanguage: "ruby",
			excludeBegin: !0,
			excludeEnd: !0,
			relevance: 0
		},
		{
			className: "type",
			begin: "!\\w+!" + n
		},
		{
			className: "type",
			begin: "!<" + n + ">"
		},
		{
			className: "type",
			begin: "!" + n
		},
		{
			className: "type",
			begin: "!!" + n
		},
		{
			className: "meta",
			begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
		},
		{
			className: "meta",
			begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
		},
		{
			className: "bullet",
			begin: "-(?=[ ]|$)",
			relevance: 0
		},
		e.HASH_COMMENT_MODE,
		{
			beginKeywords: t,
			keywords: { literal: t }
		},
		c,
		{
			className: "number",
			begin: e.C_NUMBER_RE + "\\b",
			relevance: 0
		},
		u,
		d,
		a,
		o
	], p = [...f];
	return p.pop(), p.push(s), l.contains = p, {
		name: "YAML",
		case_insensitive: !0,
		aliases: ["yml"],
		contains: f
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/javascript.js
var Ui = "[A-Za-z$_][0-9A-Za-z$_]*", Wi = /* @__PURE__ */ "as.in.of.if.for.while.finally.var.new.function.do.return.void.else.break.catch.instanceof.with.throw.case.default.try.switch.continue.typeof.delete.let.yield.const.class.debugger.async.await.static.import.from.export.extends.using".split("."), Gi = [
	"true",
	"false",
	"null",
	"undefined",
	"NaN",
	"Infinity"
], Ki = /* @__PURE__ */ "Object.Function.Boolean.Symbol.Math.Date.Number.BigInt.String.RegExp.Array.Float32Array.Float64Array.Int8Array.Uint8Array.Uint8ClampedArray.Int16Array.Int32Array.Uint16Array.Uint32Array.BigInt64Array.BigUint64Array.Set.Map.WeakSet.WeakMap.ArrayBuffer.SharedArrayBuffer.Atomics.DataView.JSON.Promise.Generator.GeneratorFunction.AsyncFunction.Reflect.Proxy.Intl.WebAssembly".split("."), qi = [
	"Error",
	"EvalError",
	"InternalError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError"
], Ji = [
	"setInterval",
	"setTimeout",
	"clearInterval",
	"clearTimeout",
	"require",
	"exports",
	"eval",
	"isFinite",
	"isNaN",
	"parseFloat",
	"parseInt",
	"decodeURI",
	"decodeURIComponent",
	"encodeURI",
	"encodeURIComponent",
	"escape",
	"unescape"
], Yi = [
	"arguments",
	"this",
	"super",
	"console",
	"window",
	"document",
	"localStorage",
	"sessionStorage",
	"module",
	"self",
	"global"
], Xi = [].concat(Ji, Ki, qi);
function Zi(e) {
	let t = e.regex, n = (e, { after: t }) => {
		let n = "</" + e[0].slice(1);
		return e.input.indexOf(n, t) !== -1;
	}, r = Ui, i = {
		begin: "<>",
		end: "</>"
	}, a = /<[A-Za-z0-9\\._:-]+\s*\/>/, o = {
		begin: /<[A-Za-z0-9\\._:-]+/,
		end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
		isTrulyOpeningTag: (e, t) => {
			let r = e[0].length + e.index, i = e.input[r];
			if (i === "<" || i === ",") {
				t.ignoreMatch();
				return;
			}
			i === ">" && (n(e, { after: r }) || t.ignoreMatch());
			let a, o = e.input.substring(r);
			if (a = o.match(/^\s*=/)) {
				t.ignoreMatch();
				return;
			}
			if ((a = o.match(/^\s+extends\s+/)) && a.index === 0) {
				t.ignoreMatch();
				return;
			}
		}
	}, s = {
		$pattern: Ui,
		keyword: Wi,
		literal: Gi,
		built_in: Xi,
		"variable.language": Yi
	}, c = "[0-9](_?[0-9])*", l = `\\.(${c})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", d = {
		className: "number",
		variants: [
			{ begin: `(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b` },
			{ begin: `\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b` },
			{ begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
			{ begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
			{ begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
			{ begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
			{ begin: "\\b0[0-7]+n?\\b" }
		],
		relevance: 0
	}, f = {
		className: "subst",
		begin: "\\$\\{",
		end: "\\}",
		keywords: s,
		contains: []
	}, p = {
		begin: ".?html`",
		end: "",
		starts: {
			end: "`",
			returnEnd: !1,
			contains: [e.BACKSLASH_ESCAPE, f],
			subLanguage: "xml"
		}
	}, m = {
		begin: ".?css`",
		end: "",
		starts: {
			end: "`",
			returnEnd: !1,
			contains: [e.BACKSLASH_ESCAPE, f],
			subLanguage: "css"
		}
	}, h = {
		begin: ".?gql`",
		end: "",
		starts: {
			end: "`",
			returnEnd: !1,
			contains: [e.BACKSLASH_ESCAPE, f],
			subLanguage: "graphql"
		}
	}, g = {
		className: "string",
		begin: "`",
		end: "`",
		contains: [e.BACKSLASH_ESCAPE, f]
	}, _ = {
		className: "comment",
		variants: [
			e.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
				relevance: 0,
				contains: [{
					begin: "(?=@[A-Za-z]+)",
					relevance: 0,
					contains: [
						{
							className: "doctag",
							begin: "@[A-Za-z]+"
						},
						{
							className: "type",
							begin: "\\{",
							end: "\\}",
							excludeEnd: !0,
							excludeBegin: !0,
							relevance: 0
						},
						{
							className: "variable",
							begin: r + "(?=\\s*(-)|$)",
							endsParent: !0,
							relevance: 0
						},
						{
							begin: /(?=[^\n])\s/,
							relevance: 0
						}
					]
				}]
			}),
			e.C_BLOCK_COMMENT_MODE,
			e.C_LINE_COMMENT_MODE
		]
	}, v = [
		e.APOS_STRING_MODE,
		e.QUOTE_STRING_MODE,
		p,
		m,
		h,
		g,
		{ match: /\$\d+/ },
		d
	];
	f.contains = v.concat({
		begin: /\{/,
		end: /\}/,
		keywords: s,
		contains: ["self"].concat(v)
	});
	let y = [].concat(_, f.contains), b = y.concat([{
		begin: /(\s*)\(/,
		end: /\)/,
		keywords: s,
		contains: ["self"].concat(y)
	}]), x = {
		className: "params",
		begin: /(\s*)\(/,
		end: /\)/,
		excludeBegin: !0,
		excludeEnd: !0,
		keywords: s,
		contains: b
	}, ee = { variants: [{
		match: [
			/class/,
			/\s+/,
			r,
			/\s+/,
			/extends/,
			/\s+/,
			t.concat(r, "(", t.concat(/\./, r), ")*")
		],
		scope: {
			1: "keyword",
			3: "title.class",
			5: "keyword",
			7: "title.class.inherited"
		}
	}, {
		match: [
			/class/,
			/\s+/,
			r
		],
		scope: {
			1: "keyword",
			3: "title.class"
		}
	}] }, S = {
		relevance: 0,
		match: t.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
		className: "title.class",
		keywords: { _: [...Ki, ...qi] }
	}, C = {
		label: "use_strict",
		className: "meta",
		relevance: 10,
		begin: /^\s*['"]use (strict|asm)['"]/
	}, w = {
		variants: [{ match: [
			/function/,
			/\s+/,
			r,
			/(?=\s*\()/
		] }, { match: [/function/, /\s*(?=\()/] }],
		className: {
			1: "keyword",
			3: "title.function"
		},
		label: "func.def",
		contains: [x],
		illegal: /%/
	}, te = {
		relevance: 0,
		match: /\b[A-Z][A-Z_0-9]+\b/,
		className: "variable.constant"
	};
	function T(e) {
		return t.concat("(?!", e.join("|"), ")");
	}
	let E = {
		match: t.concat(/\b/, T([
			...Ji,
			"super",
			"import",
			"await"
		].map((e) => `${e}\\s*\\(`)), r, t.lookahead(/\s*\(/)),
		className: "title.function",
		relevance: 0
	}, D = {
		begin: t.concat(/\./, t.lookahead(t.concat(r, /(?![0-9A-Za-z$_(])/))),
		end: r,
		excludeBegin: !0,
		keywords: "prototype",
		className: "property",
		relevance: 0
	}, O = {
		match: [
			/get|set/,
			/\s+/,
			r,
			/(?=\()/
		],
		className: {
			1: "keyword",
			3: "title.function"
		},
		contains: [{ begin: /\(\)/ }, x]
	}, ne = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", k = {
		match: [
			/const|var|let/,
			/\s+/,
			r,
			/\s*/,
			/=\s*/,
			/(async\s*)?/,
			t.lookahead(ne)
		],
		keywords: "async",
		className: {
			1: "keyword",
			3: "title.function"
		},
		contains: [x]
	};
	return {
		name: "JavaScript",
		aliases: [
			"js",
			"jsx",
			"mjs",
			"cjs"
		],
		keywords: s,
		exports: {
			PARAMS_CONTAINS: b,
			CLASS_REFERENCE: S
		},
		illegal: /#(?![$_A-Za-z])/,
		contains: [
			e.SHEBANG({
				label: "shebang",
				binary: "node",
				relevance: 5
			}),
			C,
			e.APOS_STRING_MODE,
			e.QUOTE_STRING_MODE,
			p,
			m,
			h,
			g,
			_,
			{ match: /\$\d+/ },
			d,
			S,
			{
				scope: "attr",
				match: r + t.lookahead(":"),
				relevance: 0
			},
			k,
			{
				begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
				keywords: "return throw case",
				relevance: 0,
				contains: [
					_,
					e.REGEXP_MODE,
					{
						className: "function",
						begin: ne,
						returnBegin: !0,
						end: "\\s*=>",
						contains: [{
							className: "params",
							variants: [
								{
									begin: e.UNDERSCORE_IDENT_RE,
									relevance: 0
								},
								{
									className: null,
									begin: /\(\s*\)/,
									skip: !0
								},
								{
									begin: /(\s*)\(/,
									end: /\)/,
									excludeBegin: !0,
									excludeEnd: !0,
									keywords: s,
									contains: b
								}
							]
						}]
					},
					{
						begin: /,/,
						relevance: 0
					},
					{
						match: /\s+/,
						relevance: 0
					},
					{
						variants: [
							{
								begin: i.begin,
								end: i.end
							},
							{ match: a },
							{
								begin: o.begin,
								"on:begin": o.isTrulyOpeningTag,
								end: o.end
							}
						],
						subLanguage: "xml",
						contains: [{
							begin: o.begin,
							end: o.end,
							skip: !0,
							contains: ["self"]
						}]
					}
				]
			},
			w,
			{ beginKeywords: "while if switch catch for" },
			{
				begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
				returnBegin: !0,
				label: "func.def",
				contains: [x, e.inherit(e.TITLE_MODE, {
					begin: r,
					className: "title.function"
				})]
			},
			{
				match: /\.\.\./,
				relevance: 0
			},
			D,
			{
				match: "\\$" + r,
				relevance: 0
			},
			{
				match: [/\bconstructor(?=\s*\()/],
				className: { 1: "title.function" },
				contains: [x]
			},
			E,
			te,
			ee,
			O,
			{ match: /\$[(.]/ }
		]
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/typescript.js
var Qi = "[A-Za-z$_][0-9A-Za-z$_]*", $i = /* @__PURE__ */ "as.in.of.if.for.while.finally.var.new.function.do.return.void.else.break.catch.instanceof.with.throw.case.default.try.switch.continue.typeof.delete.let.yield.const.class.debugger.async.await.static.import.from.export.extends.using".split("."), ea = [
	"true",
	"false",
	"null",
	"undefined",
	"NaN",
	"Infinity"
], ta = /* @__PURE__ */ "Object.Function.Boolean.Symbol.Math.Date.Number.BigInt.String.RegExp.Array.Float32Array.Float64Array.Int8Array.Uint8Array.Uint8ClampedArray.Int16Array.Int32Array.Uint16Array.Uint32Array.BigInt64Array.BigUint64Array.Set.Map.WeakSet.WeakMap.ArrayBuffer.SharedArrayBuffer.Atomics.DataView.JSON.Promise.Generator.GeneratorFunction.AsyncFunction.Reflect.Proxy.Intl.WebAssembly".split("."), na = [
	"Error",
	"EvalError",
	"InternalError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError"
], ra = [
	"setInterval",
	"setTimeout",
	"clearInterval",
	"clearTimeout",
	"require",
	"exports",
	"eval",
	"isFinite",
	"isNaN",
	"parseFloat",
	"parseInt",
	"decodeURI",
	"decodeURIComponent",
	"encodeURI",
	"encodeURIComponent",
	"escape",
	"unescape"
], ia = [
	"arguments",
	"this",
	"super",
	"console",
	"window",
	"document",
	"localStorage",
	"sessionStorage",
	"module",
	"self",
	"global"
], aa = [].concat(ra, ta, na);
function oa(e) {
	let t = e.regex, n = (e, { after: t }) => {
		let n = "</" + e[0].slice(1);
		return e.input.indexOf(n, t) !== -1;
	}, r = Qi, i = {
		begin: "<>",
		end: "</>"
	}, a = /<[A-Za-z0-9\\._:-]+\s*\/>/, o = {
		begin: /<[A-Za-z0-9\\._:-]+/,
		end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
		isTrulyOpeningTag: (e, t) => {
			let r = e[0].length + e.index, i = e.input[r];
			if (i === "<" || i === ",") {
				t.ignoreMatch();
				return;
			}
			i === ">" && (n(e, { after: r }) || t.ignoreMatch());
			let a, o = e.input.substring(r);
			if (a = o.match(/^\s*=/)) {
				t.ignoreMatch();
				return;
			}
			if ((a = o.match(/^\s+extends\s+/)) && a.index === 0) {
				t.ignoreMatch();
				return;
			}
		}
	}, s = {
		$pattern: Qi,
		keyword: $i,
		literal: ea,
		built_in: aa,
		"variable.language": ia
	}, c = "[0-9](_?[0-9])*", l = `\\.(${c})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", d = {
		className: "number",
		variants: [
			{ begin: `(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b` },
			{ begin: `\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b` },
			{ begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
			{ begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
			{ begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
			{ begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
			{ begin: "\\b0[0-7]+n?\\b" }
		],
		relevance: 0
	}, f = {
		className: "subst",
		begin: "\\$\\{",
		end: "\\}",
		keywords: s,
		contains: []
	}, p = {
		begin: ".?html`",
		end: "",
		starts: {
			end: "`",
			returnEnd: !1,
			contains: [e.BACKSLASH_ESCAPE, f],
			subLanguage: "xml"
		}
	}, m = {
		begin: ".?css`",
		end: "",
		starts: {
			end: "`",
			returnEnd: !1,
			contains: [e.BACKSLASH_ESCAPE, f],
			subLanguage: "css"
		}
	}, h = {
		begin: ".?gql`",
		end: "",
		starts: {
			end: "`",
			returnEnd: !1,
			contains: [e.BACKSLASH_ESCAPE, f],
			subLanguage: "graphql"
		}
	}, g = {
		className: "string",
		begin: "`",
		end: "`",
		contains: [e.BACKSLASH_ESCAPE, f]
	}, _ = {
		className: "comment",
		variants: [
			e.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
				relevance: 0,
				contains: [{
					begin: "(?=@[A-Za-z]+)",
					relevance: 0,
					contains: [
						{
							className: "doctag",
							begin: "@[A-Za-z]+"
						},
						{
							className: "type",
							begin: "\\{",
							end: "\\}",
							excludeEnd: !0,
							excludeBegin: !0,
							relevance: 0
						},
						{
							className: "variable",
							begin: r + "(?=\\s*(-)|$)",
							endsParent: !0,
							relevance: 0
						},
						{
							begin: /(?=[^\n])\s/,
							relevance: 0
						}
					]
				}]
			}),
			e.C_BLOCK_COMMENT_MODE,
			e.C_LINE_COMMENT_MODE
		]
	}, v = [
		e.APOS_STRING_MODE,
		e.QUOTE_STRING_MODE,
		p,
		m,
		h,
		g,
		{ match: /\$\d+/ },
		d
	];
	f.contains = v.concat({
		begin: /\{/,
		end: /\}/,
		keywords: s,
		contains: ["self"].concat(v)
	});
	let y = [].concat(_, f.contains), b = y.concat([{
		begin: /(\s*)\(/,
		end: /\)/,
		keywords: s,
		contains: ["self"].concat(y)
	}]), x = {
		className: "params",
		begin: /(\s*)\(/,
		end: /\)/,
		excludeBegin: !0,
		excludeEnd: !0,
		keywords: s,
		contains: b
	}, ee = { variants: [{
		match: [
			/class/,
			/\s+/,
			r,
			/\s+/,
			/extends/,
			/\s+/,
			t.concat(r, "(", t.concat(/\./, r), ")*")
		],
		scope: {
			1: "keyword",
			3: "title.class",
			5: "keyword",
			7: "title.class.inherited"
		}
	}, {
		match: [
			/class/,
			/\s+/,
			r
		],
		scope: {
			1: "keyword",
			3: "title.class"
		}
	}] }, S = {
		relevance: 0,
		match: t.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
		className: "title.class",
		keywords: { _: [...ta, ...na] }
	}, C = {
		label: "use_strict",
		className: "meta",
		relevance: 10,
		begin: /^\s*['"]use (strict|asm)['"]/
	}, w = {
		variants: [{ match: [
			/function/,
			/\s+/,
			r,
			/(?=\s*\()/
		] }, { match: [/function/, /\s*(?=\()/] }],
		className: {
			1: "keyword",
			3: "title.function"
		},
		label: "func.def",
		contains: [x],
		illegal: /%/
	}, te = {
		relevance: 0,
		match: /\b[A-Z][A-Z_0-9]+\b/,
		className: "variable.constant"
	};
	function T(e) {
		return t.concat("(?!", e.join("|"), ")");
	}
	let E = {
		match: t.concat(/\b/, T([
			...ra,
			"super",
			"import",
			"await"
		].map((e) => `${e}\\s*\\(`)), r, t.lookahead(/\s*\(/)),
		className: "title.function",
		relevance: 0
	}, D = {
		begin: t.concat(/\./, t.lookahead(t.concat(r, /(?![0-9A-Za-z$_(])/))),
		end: r,
		excludeBegin: !0,
		keywords: "prototype",
		className: "property",
		relevance: 0
	}, O = {
		match: [
			/get|set/,
			/\s+/,
			r,
			/(?=\()/
		],
		className: {
			1: "keyword",
			3: "title.function"
		},
		contains: [{ begin: /\(\)/ }, x]
	}, ne = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", k = {
		match: [
			/const|var|let/,
			/\s+/,
			r,
			/\s*/,
			/=\s*/,
			/(async\s*)?/,
			t.lookahead(ne)
		],
		keywords: "async",
		className: {
			1: "keyword",
			3: "title.function"
		},
		contains: [x]
	};
	return {
		name: "JavaScript",
		aliases: [
			"js",
			"jsx",
			"mjs",
			"cjs"
		],
		keywords: s,
		exports: {
			PARAMS_CONTAINS: b,
			CLASS_REFERENCE: S
		},
		illegal: /#(?![$_A-Za-z])/,
		contains: [
			e.SHEBANG({
				label: "shebang",
				binary: "node",
				relevance: 5
			}),
			C,
			e.APOS_STRING_MODE,
			e.QUOTE_STRING_MODE,
			p,
			m,
			h,
			g,
			_,
			{ match: /\$\d+/ },
			d,
			S,
			{
				scope: "attr",
				match: r + t.lookahead(":"),
				relevance: 0
			},
			k,
			{
				begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
				keywords: "return throw case",
				relevance: 0,
				contains: [
					_,
					e.REGEXP_MODE,
					{
						className: "function",
						begin: ne,
						returnBegin: !0,
						end: "\\s*=>",
						contains: [{
							className: "params",
							variants: [
								{
									begin: e.UNDERSCORE_IDENT_RE,
									relevance: 0
								},
								{
									className: null,
									begin: /\(\s*\)/,
									skip: !0
								},
								{
									begin: /(\s*)\(/,
									end: /\)/,
									excludeBegin: !0,
									excludeEnd: !0,
									keywords: s,
									contains: b
								}
							]
						}]
					},
					{
						begin: /,/,
						relevance: 0
					},
					{
						match: /\s+/,
						relevance: 0
					},
					{
						variants: [
							{
								begin: i.begin,
								end: i.end
							},
							{ match: a },
							{
								begin: o.begin,
								"on:begin": o.isTrulyOpeningTag,
								end: o.end
							}
						],
						subLanguage: "xml",
						contains: [{
							begin: o.begin,
							end: o.end,
							skip: !0,
							contains: ["self"]
						}]
					}
				]
			},
			w,
			{ beginKeywords: "while if switch catch for" },
			{
				begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
				returnBegin: !0,
				label: "func.def",
				contains: [x, e.inherit(e.TITLE_MODE, {
					begin: r,
					className: "title.function"
				})]
			},
			{
				match: /\.\.\./,
				relevance: 0
			},
			D,
			{
				match: "\\$" + r,
				relevance: 0
			},
			{
				match: [/\bconstructor(?=\s*\()/],
				className: { 1: "title.function" },
				contains: [x]
			},
			E,
			te,
			ee,
			O,
			{ match: /\$[(.]/ }
		]
	};
}
function sa(e) {
	let t = e.regex, n = oa(e), r = Qi, i = [
		"any",
		"void",
		"number",
		"boolean",
		"string",
		"object",
		"never",
		"symbol",
		"bigint",
		"unknown"
	], a = {
		begin: [
			/namespace/,
			/\s+/,
			e.IDENT_RE
		],
		beginScope: {
			1: "keyword",
			3: "title.class"
		}
	}, o = {
		beginKeywords: "interface",
		end: /\{/,
		excludeEnd: !0,
		keywords: {
			keyword: "interface extends",
			built_in: i
		},
		contains: [n.exports.CLASS_REFERENCE]
	}, s = {
		className: "meta",
		relevance: 10,
		begin: /^\s*['"]use strict['"]/
	}, c = {
		$pattern: Qi,
		keyword: $i.concat([
			"type",
			"interface",
			"public",
			"private",
			"protected",
			"implements",
			"declare",
			"abstract",
			"readonly",
			"enum",
			"override",
			"satisfies"
		]),
		literal: ea,
		built_in: aa.concat(i),
		"variable.language": ia
	}, l = {
		className: "meta",
		begin: "@" + r
	}, u = (e, t, n) => {
		let r = e.contains.findIndex((e) => e.label === t);
		if (r === -1) throw Error("can not find mode to replace");
		e.contains.splice(r, 1, n);
	};
	Object.assign(n.keywords, c), n.exports.PARAMS_CONTAINS.push(l);
	let d = n.contains.find((e) => e.scope === "attr"), f = Object.assign({}, d, { match: t.concat(r, t.lookahead(/\s*\?:/)) });
	n.exports.PARAMS_CONTAINS.push([
		n.exports.CLASS_REFERENCE,
		d,
		f
	]), n.contains = n.contains.concat([
		l,
		a,
		o,
		f
	]), u(n, "shebang", e.SHEBANG()), u(n, "use_strict", s);
	let p = n.contains.find((e) => e.label === "func.def");
	return p.relevance = 0, Object.assign(n, {
		name: "TypeScript",
		aliases: [
			"ts",
			"tsx",
			"mts",
			"cts"
		]
	}), n;
}
//#endregion
//#region node_modules/highlight.js/es/languages/python.js
function ca(e) {
	let t = e.regex, n = /[\p{XID_Start}_]\p{XID_Continue}*/u, r = /* @__PURE__ */ "and.as.assert.async.await.break.case.class.continue.def.del.elif.else.except.finally.for.from.global.if.import.in.is.lambda.lazy.match.nonlocal|10.not.or.pass.raise.return.try.while.with.yield".split("."), i = {
		$pattern: /[A-Za-z]\w+|__\w+__/,
		keyword: r,
		built_in: /* @__PURE__ */ "__import__.abs.aiter.all.anext.any.ascii.bin.bool.breakpoint.bytearray.bytes.callable.chr.classmethod.compile.complex.delattr.dict.dir.divmod.enumerate.eval.exec.filter.float.format.frozendict.frozenset.getattr.globals.hasattr.hash.help.hex.id.input.int.isinstance.issubclass.iter.len.list.locals.map.max.memoryview.min.next.object.oct.open.ord.pow.print.property.range.repr.reversed.round.sentinel.set.setattr.slice.sorted.staticmethod.str.sum.super.tuple.type.vars.zip".split("."),
		literal: [
			"__debug__",
			"Ellipsis",
			"False",
			"None",
			"NotImplemented",
			"True"
		],
		type: [
			"Any",
			"Callable",
			"Coroutine",
			"Dict",
			"List",
			"Literal",
			"Generic",
			"Optional",
			"Sequence",
			"Set",
			"Tuple",
			"Type",
			"Union"
		]
	}, a = {
		className: "meta",
		begin: /^(>>>|\.\.\.) /
	}, o = {
		className: "subst",
		begin: /\{/,
		end: /\}/,
		keywords: i,
		illegal: /#/
	}, s = {
		begin: /\{\{/,
		relevance: 0
	}, c = {
		className: "string",
		contains: [e.BACKSLASH_ESCAPE],
		variants: [
			{
				begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
				end: /'''/,
				contains: [e.BACKSLASH_ESCAPE, a],
				relevance: 10
			},
			{
				begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
				end: /"""/,
				contains: [e.BACKSLASH_ESCAPE, a],
				relevance: 10
			},
			{
				begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])'''/,
				end: /'''/,
				contains: [
					e.BACKSLASH_ESCAPE,
					a,
					s,
					o
				]
			},
			{
				begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])"""/,
				end: /"""/,
				contains: [
					e.BACKSLASH_ESCAPE,
					a,
					s,
					o
				]
			},
			{
				begin: /([uU]|[rR])'/,
				end: /'/,
				relevance: 10
			},
			{
				begin: /([uU]|[rR])"/,
				end: /"/,
				relevance: 10
			},
			{
				begin: /([bB]|[bB][rR]|[rR][bB])'/,
				end: /'/
			},
			{
				begin: /([bB]|[bB][rR]|[rR][bB])"/,
				end: /"/
			},
			{
				begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])'/,
				end: /'/,
				contains: [
					e.BACKSLASH_ESCAPE,
					s,
					o
				]
			},
			{
				begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])"/,
				end: /"/,
				contains: [
					e.BACKSLASH_ESCAPE,
					s,
					o
				]
			},
			e.APOS_STRING_MODE,
			e.QUOTE_STRING_MODE
		]
	}, l = "[0-9](_?[0-9])*", u = `(\\b(${l}))?\\.(${l})|\\b(${l})\\.`, d = `\\b|${r.join("|")}`, f = {
		className: "number",
		relevance: 0,
		variants: [
			{ begin: `(\\b(${l})|(${u}))[eE][+-]?(${l})[jJ]?(?=${d})` },
			{ begin: `(${u})[jJ]?` },
			{ begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${d})` },
			{ begin: `\\b0[bB](_?[01])+[lL]?(?=${d})` },
			{ begin: `\\b0[oO](_?[0-7])+[lL]?(?=${d})` },
			{ begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${d})` },
			{ begin: `\\b(${l})[jJ](?=${d})` }
		]
	}, p = {
		className: "comment",
		begin: t.lookahead(/# type:/),
		end: /$/,
		keywords: i,
		contains: [{ begin: /# type:/ }, {
			begin: /#/,
			end: /\b\B/,
			endsWithParent: !0
		}]
	}, m = {
		className: "params",
		variants: [{
			className: "",
			begin: /\(\s*\)/,
			skip: !0
		}, {
			begin: /\(/,
			end: /\)/,
			excludeBegin: !0,
			excludeEnd: !0,
			keywords: i,
			contains: [
				"self",
				a,
				f,
				c,
				e.HASH_COMMENT_MODE
			]
		}]
	};
	return o.contains = [
		c,
		f,
		a
	], {
		name: "Python",
		aliases: [
			"py",
			"gyp",
			"ipython"
		],
		unicodeRegex: !0,
		keywords: i,
		illegal: /(<\/|\?)|=>/,
		contains: [
			a,
			f,
			{
				scope: "variable.language",
				match: /\bself\b/
			},
			{
				beginKeywords: "if",
				relevance: 0
			},
			{
				match: /\bor\b/,
				scope: "keyword"
			},
			c,
			p,
			e.HASH_COMMENT_MODE,
			{
				match: [
					/\bdef/,
					/\s+/,
					n
				],
				scope: {
					1: "keyword",
					3: "title.function"
				},
				contains: [m]
			},
			{
				variants: [{ match: [
					/\bclass/,
					/\s+/,
					n,
					/\s*/,
					/\(\s*/,
					n,
					/\s*\)/
				] }, { match: [
					/\bclass/,
					/\s+/,
					n
				] }],
				scope: {
					1: "keyword",
					3: "title.class",
					6: "title.class.inherited"
				}
			},
			{
				className: "meta",
				begin: /^[\t ]*@/,
				end: /(?=#)|$/,
				contains: [
					f,
					m,
					c
				]
			}
		]
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/bash.js
function la(e) {
	let t = e.regex, n = {}, r = {
		begin: /\$\{/,
		end: /\}/,
		contains: ["self", {
			begin: /:-/,
			contains: [n]
		}]
	};
	Object.assign(n, {
		className: "variable",
		variants: [{ begin: t.concat(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])") }, r]
	});
	let i = {
		className: "subst",
		begin: /\$\(/,
		end: /\)/,
		contains: [e.BACKSLASH_ESCAPE]
	}, a = e.inherit(e.COMMENT(), {
		match: [/(^|\s)/, /#.*$/],
		scope: { 2: "comment" }
	}), o = {
		begin: /<<-?\s*(?=\w+)/,
		starts: { contains: [e.END_SAME_AS_BEGIN({
			begin: /(\w+)/,
			end: /(\w+)/,
			className: "string"
		})] }
	}, s = {
		className: "string",
		begin: /"/,
		end: /"/,
		contains: [
			e.BACKSLASH_ESCAPE,
			n,
			i
		]
	};
	i.contains.push(s);
	let c = { match: /\\"/ }, l = {
		className: "string",
		begin: /'/,
		end: /'/
	}, u = { match: /\\'/ }, d = {
		begin: /\$?\(\(/,
		end: /\)\)/,
		contains: [
			{
				begin: /\d+#[0-9a-f]+/,
				className: "number"
			},
			e.NUMBER_MODE,
			n
		]
	}, f = e.SHEBANG({
		binary: `(${[
			"fish",
			"bash",
			"zsh",
			"sh",
			"csh",
			"ksh",
			"tcsh",
			"dash",
			"scsh"
		].join("|")})`,
		relevance: 10
	}), p = {
		className: "function",
		begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
		returnBegin: !0,
		contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
		relevance: 0
	}, m = [
		"if",
		"then",
		"else",
		"elif",
		"fi",
		"time",
		"for",
		"while",
		"until",
		"in",
		"do",
		"done",
		"case",
		"esac",
		"coproc",
		"function",
		"select"
	], h = ["true", "false"], g = { match: /(\/[a-z._-]+)+/ }, _ = [
		"break",
		"cd",
		"continue",
		"eval",
		"exec",
		"exit",
		"export",
		"getopts",
		"hash",
		"pwd",
		"readonly",
		"return",
		"shift",
		"test",
		"times",
		"trap",
		"umask",
		"unset"
	], v = [
		"alias",
		"bind",
		"builtin",
		"caller",
		"command",
		"declare",
		"echo",
		"enable",
		"help",
		"let",
		"local",
		"logout",
		"mapfile",
		"printf",
		"read",
		"readarray",
		"source",
		"sudo",
		"type",
		"typeset",
		"ulimit",
		"unalias"
	], y = /* @__PURE__ */ "autoload.bg.bindkey.bye.cap.chdir.clone.comparguments.compcall.compctl.compdescribe.compfiles.compgroups.compquote.comptags.comptry.compvalues.dirs.disable.disown.echotc.echoti.emulate.fc.fg.float.functions.getcap.getln.history.integer.jobs.kill.limit.log.noglob.popd.print.pushd.pushln.rehash.sched.setcap.setopt.stat.suspend.ttyctl.unfunction.unhash.unlimit.unsetopt.vared.wait.whence.where.which.zcompile.zformat.zftp.zle.zmodload.zparseopts.zprof.zpty.zregexparse.zsocket.zstyle.ztcp".split("."), b = /* @__PURE__ */ "chcon.chgrp.chown.chmod.cp.dd.df.dir.dircolors.ln.ls.mkdir.mkfifo.mknod.mktemp.mv.realpath.rm.rmdir.shred.sync.touch.truncate.vdir.b2sum.base32.base64.cat.cksum.comm.csplit.cut.expand.fmt.fold.head.join.md5sum.nl.numfmt.od.paste.ptx.pr.sha1sum.sha224sum.sha256sum.sha384sum.sha512sum.shuf.sort.split.sum.tac.tail.tr.tsort.unexpand.uniq.wc.arch.basename.chroot.date.dirname.du.echo.env.expr.factor.groups.hostid.id.link.logname.nice.nohup.nproc.pathchk.pinky.printenv.printf.pwd.readlink.runcon.seq.sleep.stat.stdbuf.stty.tee.test.timeout.tty.uname.unlink.uptime.users.who.whoami.yes".split(".");
	return {
		name: "Bash",
		aliases: ["sh", "zsh"],
		keywords: {
			$pattern: /\b[a-z][a-z0-9._-]+\b/,
			keyword: m,
			literal: h,
			built_in: [
				..._,
				...v,
				"set",
				"shopt",
				...y,
				...b
			]
		},
		contains: [
			f,
			e.SHEBANG(),
			p,
			d,
			a,
			o,
			g,
			s,
			c,
			l,
			u,
			n
		]
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/sql.js
function ua(e) {
	let t = e.regex, n = e.COMMENT("--", "$"), r = {
		scope: "string",
		variants: [{
			begin: /'/,
			end: /'/,
			contains: [{ match: /''/ }]
		}]
	}, i = {
		begin: /"/,
		end: /"/,
		contains: [{ match: /""/ }]
	}, a = [
		"true",
		"false",
		"unknown"
	], o = [
		"double precision",
		"large object",
		"with timezone",
		"without timezone"
	], s = /* @__PURE__ */ "bigint.binary.blob.boolean.char.character.clob.date.dec.decfloat.decimal.float.int.integer.interval.nchar.nclob.national.numeric.real.row.smallint.time.timestamp.varchar.varying.varbinary".split("."), c = [
		"add",
		"asc",
		"collation",
		"desc",
		"final",
		"first",
		"last",
		"view"
	], l = /* @__PURE__ */ "abs.acos.all.allocate.alter.and.any.are.array.array_agg.array_max_cardinality.as.asensitive.asin.asymmetric.at.atan.atomic.authorization.avg.begin.begin_frame.begin_partition.between.bigint.binary.blob.boolean.both.by.call.called.cardinality.cascaded.case.cast.ceil.ceiling.char.char_length.character.character_length.check.classifier.clob.close.coalesce.collate.collect.column.commit.condition.connect.constraint.contains.convert.copy.corr.corresponding.cos.cosh.count.covar_pop.covar_samp.create.cross.cube.cume_dist.current.current_catalog.current_date.current_default_transform_group.current_path.current_role.current_row.current_schema.current_time.current_timestamp.current_path.current_role.current_transform_group_for_type.current_user.cursor.cycle.date.day.deallocate.dec.decimal.decfloat.declare.default.define.delete.dense_rank.deref.describe.deterministic.disconnect.distinct.double.drop.dynamic.each.element.else.empty.end.end_frame.end_partition.end-exec.equals.escape.every.except.exec.execute.exists.exp.external.extract.false.fetch.filter.first_value.float.floor.for.foreign.frame_row.free.from.full.function.fusion.get.global.grant.group.grouping.groups.having.hold.hour.identity.in.indicator.initial.inner.inout.insensitive.insert.int.integer.intersect.intersection.interval.into.is.join.json_array.json_arrayagg.json_exists.json_object.json_objectagg.json_query.json_table.json_table_primitive.json_value.lag.language.large.last_value.lateral.lead.leading.left.like.like_regex.listagg.ln.local.localtime.localtimestamp.log.log10.lower.match.match_number.match_recognize.matches.max.member.merge.method.min.minute.mod.modifies.module.month.multiset.national.natural.nchar.nclob.new.no.none.normalize.not.nth_value.ntile.null.nullif.numeric.octet_length.occurrences_regex.of.offset.old.omit.on.one.only.open.or.order.out.outer.over.overlaps.overlay.parameter.partition.pattern.per.percent.percent_rank.percentile_cont.percentile_disc.period.portion.position.position_regex.power.precedes.precision.prepare.primary.procedure.ptf.range.rank.reads.real.recursive.ref.references.referencing.regr_avgx.regr_avgy.regr_count.regr_intercept.regr_r2.regr_slope.regr_sxx.regr_sxy.regr_syy.release.result.return.returns.revoke.right.rollback.rollup.row.row_number.rows.running.savepoint.scope.scroll.search.second.seek.select.sensitive.session_user.set.show.similar.sin.sinh.skip.smallint.some.specific.specifictype.sql.sqlexception.sqlstate.sqlwarning.sqrt.start.static.stddev_pop.stddev_samp.submultiset.subset.substring.substring_regex.succeeds.sum.symmetric.system.system_time.system_user.table.tablesample.tan.tanh.then.time.timestamp.timezone_hour.timezone_minute.to.trailing.translate.translate_regex.translation.treat.trigger.trim.trim_array.true.truncate.uescape.union.unique.unknown.unnest.update.upper.user.using.value.values.value_of.var_pop.var_samp.varbinary.varchar.varying.versioning.when.whenever.where.width_bucket.window.with.within.without.year".split("."), u = /* @__PURE__ */ "abs.acos.array_agg.asin.atan.avg.cast.ceil.ceiling.coalesce.corr.cos.cosh.count.covar_pop.covar_samp.cume_dist.dense_rank.deref.element.exp.extract.first_value.floor.json_array.json_arrayagg.json_exists.json_object.json_objectagg.json_query.json_table.json_table_primitive.json_value.lag.last_value.lead.listagg.ln.log.log10.lower.max.min.mod.nth_value.ntile.nullif.percent_rank.percentile_cont.percentile_disc.position.position_regex.power.rank.regr_avgx.regr_avgy.regr_count.regr_intercept.regr_r2.regr_slope.regr_sxx.regr_sxy.regr_syy.row_number.sin.sinh.sqrt.stddev_pop.stddev_samp.substring.substring_regex.sum.tan.tanh.translate.translate_regex.treat.trim.trim_array.unnest.upper.value_of.var_pop.var_samp.width_bucket".split("."), d = [
		"current_catalog",
		"current_date",
		"current_default_transform_group",
		"current_path",
		"current_role",
		"current_schema",
		"current_transform_group_for_type",
		"current_user",
		"session_user",
		"system_time",
		"system_user",
		"current_time",
		"localtime",
		"current_timestamp",
		"localtimestamp"
	], f = [
		"create table",
		"insert into",
		"primary key",
		"foreign key",
		"not null",
		"alter table",
		"add constraint",
		"grouping sets",
		"on overflow",
		"character set",
		"respect nulls",
		"ignore nulls",
		"nulls first",
		"nulls last",
		"depth first",
		"breadth first"
	], p = u, m = [...l, ...c].filter((e) => !u.includes(e)), h = {
		scope: "variable",
		match: /@[a-z0-9][a-z0-9_]*/
	}, g = {
		scope: "operator",
		match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
		relevance: 0
	}, _ = {
		match: t.concat(/\b/, t.either(...p), /\s*\(/),
		relevance: 0,
		keywords: { built_in: p }
	};
	function v(e) {
		return t.concat(/\b/, t.either(...e.map((e) => e.replace(/\s+/, "\\s+"))), /\b/);
	}
	let y = {
		scope: "keyword",
		match: v(f),
		relevance: 0
	};
	function b(e, { exceptions: t, when: n } = {}) {
		let r = n;
		return t ||= [], e.map((e) => e.match(/\|\d+$/) || t.includes(e) ? e : r(e) ? `${e}|0` : e);
	}
	return {
		name: "SQL",
		case_insensitive: !0,
		illegal: /[{}]|<\//,
		keywords: {
			$pattern: /\b[\w\.]+/,
			keyword: b(m, { when: (e) => e.length < 3 }),
			literal: a,
			type: s,
			built_in: d
		},
		contains: [
			{
				scope: "type",
				match: v(o)
			},
			y,
			_,
			h,
			r,
			i,
			e.C_NUMBER_MODE,
			e.C_BLOCK_COMMENT_MODE,
			n,
			g
		]
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/css.js
var da = (e) => ({
	IMPORTANT: {
		scope: "meta",
		begin: "!important"
	},
	BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
	HEXCOLOR: {
		scope: "number",
		begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
	},
	UNICODE_RANGE: {
		scope: "number",
		begin: /\b[Uu]\+[0-9A-Fa-f][0-9A-Fa-f?]{0,5}(-[0-9A-Fa-f][0-9A-Fa-f]{0,5})?/
	},
	FUNCTION_DISPATCH: {
		className: "built_in",
		begin: /[\w-]+(?=\()/
	},
	ATTRIBUTE_SELECTOR_MODE: {
		scope: "selector-attr",
		begin: /\[/,
		end: /\]/,
		illegal: "$",
		contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
	},
	CSS_NUMBER_MODE: {
		scope: "number",
		begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
		relevance: 0
	},
	CSS_VARIABLE: {
		className: "attr",
		begin: /--[A-Za-z_][A-Za-z0-9_-]*/
	}
}), fa = /* @__PURE__ */ "a.abbr.address.article.aside.audio.b.blockquote.body.button.canvas.caption.cite.code.dd.del.details.dfn.div.dl.dt.em.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.html.i.iframe.img.input.ins.kbd.label.legend.li.main.mark.menu.nav.object.ol.optgroup.option.p.picture.q.quote.samp.section.select.source.span.strong.summary.sup.table.tbody.td.textarea.tfoot.th.thead.time.tr.ul.var.video".split("."), pa = /* @__PURE__ */ "defs.g.marker.mask.pattern.svg.switch.symbol.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feFlood.feGaussianBlur.feImage.feMerge.feMorphology.feOffset.feSpecularLighting.feTile.feTurbulence.linearGradient.radialGradient.stop.circle.ellipse.image.line.path.polygon.polyline.rect.text.use.textPath.tspan.foreignObject.clipPath".split("."), ma = [...fa, ...pa], ha = (/* @__PURE__ */ "any-hover.any-pointer.aspect-ratio.color.color-gamut.color-index.device-aspect-ratio.device-height.device-width.display-mode.forced-colors.grid.height.hover.inverted-colors.monochrome.orientation.overflow-block.overflow-inline.pointer.prefers-color-scheme.prefers-contrast.prefers-reduced-motion.prefers-reduced-transparency.resolution.scan.scripting.update.width.min-width.max-width.min-height.max-height".split(".")).sort().reverse(), ga = (/* @__PURE__ */ "active.any-link.blank.checked.current.default.defined.dir.disabled.drop.empty.enabled.first.first-child.first-of-type.fullscreen.future.focus.focus-visible.focus-within.has.host.host-context.hover.indeterminate.in-range.invalid.is.lang.last-child.last-of-type.left.link.local-link.not.nth-child.nth-col.nth-last-child.nth-last-col.nth-last-of-type.nth-of-type.only-child.only-of-type.optional.out-of-range.past.placeholder-shown.read-only.read-write.required.right.root.scope.target.target-within.user-invalid.valid.visited.where".split(".")).sort().reverse(), _a = [
	"after",
	"backdrop",
	"before",
	"cue",
	"cue-region",
	"first-letter",
	"first-line",
	"grammar-error",
	"marker",
	"part",
	"placeholder",
	"selection",
	"slotted",
	"spelling-error"
].sort().reverse(), va = (/* @__PURE__ */ "accent-color.align-content.align-items.align-self.alignment-baseline.all.anchor-name.animation.animation-composition.animation-delay.animation-direction.animation-duration.animation-fill-mode.animation-iteration-count.animation-name.animation-play-state.animation-range.animation-range-end.animation-range-start.animation-timeline.animation-timing-function.appearance.aspect-ratio.backdrop-filter.backface-visibility.background.background-attachment.background-blend-mode.background-clip.background-color.background-image.background-origin.background-position.background-position-x.background-position-y.background-repeat.background-size.baseline-shift.block-size.border.border-block.border-block-color.border-block-end.border-block-end-color.border-block-end-style.border-block-end-width.border-block-start.border-block-start-color.border-block-start-style.border-block-start-width.border-block-style.border-block-width.border-bottom.border-bottom-color.border-bottom-left-radius.border-bottom-right-radius.border-bottom-style.border-bottom-width.border-collapse.border-color.border-end-end-radius.border-end-start-radius.border-image.border-image-outset.border-image-repeat.border-image-slice.border-image-source.border-image-width.border-inline.border-inline-color.border-inline-end.border-inline-end-color.border-inline-end-style.border-inline-end-width.border-inline-start.border-inline-start-color.border-inline-start-style.border-inline-start-width.border-inline-style.border-inline-width.border-left.border-left-color.border-left-style.border-left-width.border-radius.border-right.border-right-color.border-right-style.border-right-width.border-spacing.border-start-end-radius.border-start-start-radius.border-style.border-top.border-top-color.border-top-left-radius.border-top-right-radius.border-top-style.border-top-width.border-width.bottom.box-align.box-decoration-break.box-direction.box-flex.box-flex-group.box-lines.box-ordinal-group.box-orient.box-pack.box-shadow.box-sizing.break-after.break-before.break-inside.caption-side.caret-color.clear.clip.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.color-scheme.column-count.column-fill.column-gap.column-rule.column-rule-color.column-rule-style.column-rule-width.column-span.column-width.columns.contain.contain-intrinsic-block-size.contain-intrinsic-height.contain-intrinsic-inline-size.contain-intrinsic-size.contain-intrinsic-width.container.container-name.container-type.content.content-visibility.corner-bottom-left-shape.corner-bottom-right-shape.corner-shape.corner-top-left-shape.corner-top-right-shape.counter-increment.counter-reset.counter-set.cue.cue-after.cue-before.cursor.cx.cy.direction.display.dominant-baseline.empty-cells.enable-background.field-sizing.fill.fill-opacity.fill-rule.filter.flex.flex-basis.flex-direction.flex-flow.flex-grow.flex-shrink.flex-wrap.float.flood-color.flood-opacity.flow.font.font-display.font-family.font-feature-settings.font-kerning.font-language-override.font-optical-sizing.font-palette.font-size.font-size-adjust.font-smooth.font-smoothing.font-stretch.font-style.font-synthesis.font-synthesis-position.font-synthesis-small-caps.font-synthesis-style.font-synthesis-weight.font-variant.font-variant-alternates.font-variant-caps.font-variant-east-asian.font-variant-emoji.font-variant-ligatures.font-variant-numeric.font-variant-position.font-variation-settings.font-weight.forced-color-adjust.gap.glyph-orientation-horizontal.glyph-orientation-vertical.grid.grid-area.grid-auto-columns.grid-auto-flow.grid-auto-rows.grid-column.grid-column-end.grid-column-start.grid-gap.grid-row.grid-row-end.grid-row-start.grid-template.grid-template-areas.grid-template-columns.grid-template-rows.hanging-punctuation.height.hyphenate-character.hyphenate-limit-chars.hyphens.icon.image-orientation.image-rendering.image-resolution.ime-mode.initial-letter.initial-letter-align.inline-size.inset.inset-area.inset-block.inset-block-end.inset-block-start.inset-inline.inset-inline-end.inset-inline-start.isolation.justify-content.justify-items.justify-self.kerning.left.letter-spacing.lighting-color.line-break.line-height.line-height-step.list-style.list-style-image.list-style-position.list-style-type.margin.margin-block.margin-block-end.margin-block-start.margin-bottom.margin-inline.margin-inline-end.margin-inline-start.margin-left.margin-right.margin-top.margin-trim.marker.marker-end.marker-mid.marker-start.marks.mask.mask-border.mask-border-mode.mask-border-outset.mask-border-repeat.mask-border-slice.mask-border-source.mask-border-width.mask-clip.mask-composite.mask-image.mask-mode.mask-origin.mask-position.mask-repeat.mask-size.mask-type.masonry-auto-flow.math-depth.math-shift.math-style.max-block-size.max-height.max-inline-size.max-width.min-block-size.min-height.min-inline-size.min-width.mix-blend-mode.nav-down.nav-index.nav-left.nav-right.nav-up.none.normal.object-fit.object-position.offset.offset-anchor.offset-distance.offset-path.offset-position.offset-rotate.opacity.order.orphans.outline.outline-color.outline-offset.outline-style.outline-width.overflow.overflow-anchor.overflow-block.overflow-clip-margin.overflow-inline.overflow-wrap.overflow-x.overflow-y.overlay.overscroll-behavior.overscroll-behavior-block.overscroll-behavior-inline.overscroll-behavior-x.overscroll-behavior-y.padding.padding-block.padding-block-end.padding-block-start.padding-bottom.padding-inline.padding-inline-end.padding-inline-start.padding-left.padding-right.padding-top.page.page-break-after.page-break-before.page-break-inside.paint-order.pause.pause-after.pause-before.perspective.perspective-origin.place-content.place-items.place-self.pointer-events.position.position-anchor.position-visibility.print-color-adjust.quotes.r.resize.rest.rest-after.rest-before.right.rotate.row-gap.ruby-align.ruby-position.scale.scroll-behavior.scroll-margin.scroll-margin-block.scroll-margin-block-end.scroll-margin-block-start.scroll-margin-bottom.scroll-margin-inline.scroll-margin-inline-end.scroll-margin-inline-start.scroll-margin-left.scroll-margin-right.scroll-margin-top.scroll-padding.scroll-padding-block.scroll-padding-block-end.scroll-padding-block-start.scroll-padding-bottom.scroll-padding-inline.scroll-padding-inline-end.scroll-padding-inline-start.scroll-padding-left.scroll-padding-right.scroll-padding-top.scroll-snap-align.scroll-snap-stop.scroll-snap-type.scroll-timeline.scroll-timeline-axis.scroll-timeline-name.scrollbar-color.scrollbar-gutter.scrollbar-width.shape-image-threshold.shape-margin.shape-outside.shape-rendering.speak.speak-as.src.stop-color.stop-opacity.stroke.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke-width.tab-size.table-layout.text-align.text-align-all.text-align-last.text-anchor.text-combine-upright.text-decoration.text-decoration-color.text-decoration-line.text-decoration-skip.text-decoration-skip-ink.text-decoration-style.text-decoration-thickness.text-emphasis.text-emphasis-color.text-emphasis-position.text-emphasis-style.text-indent.text-justify.text-orientation.text-overflow.text-rendering.text-shadow.text-size-adjust.text-transform.text-underline-offset.text-underline-position.text-wrap.text-wrap-mode.text-wrap-style.timeline-scope.top.touch-action.transform.transform-box.transform-origin.transform-style.transition.transition-behavior.transition-delay.transition-duration.transition-property.transition-timing-function.translate.unicode-bidi.unicode-range.user-modify.user-select.vector-effect.vertical-align.view-timeline.view-timeline-axis.view-timeline-inset.view-timeline-name.view-transition-name.visibility.voice-balance.voice-duration.voice-family.voice-pitch.voice-range.voice-rate.voice-stress.voice-volume.white-space.white-space-collapse.widows.width.will-change.word-break.word-spacing.word-wrap.writing-mode.x.y.z-index.zoom".split(".")).sort().reverse();
function ya(e) {
	let t = e.regex, n = da(e), r = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, i = /@-?\w[\w]*(-\w+)*/, a = [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE];
	return {
		name: "CSS",
		case_insensitive: !0,
		illegal: /[=|'\$]/,
		keywords: { keyframePosition: "from to" },
		classNameAliases: { keyframePosition: "selector-tag" },
		contains: [
			n.BLOCK_COMMENT,
			r,
			n.CSS_NUMBER_MODE,
			{
				className: "selector-id",
				begin: /#[A-Za-z0-9_-]+/,
				relevance: 0
			},
			{
				className: "selector-class",
				begin: "\\.[a-zA-Z-][a-zA-Z0-9_-]*",
				relevance: 0
			},
			n.ATTRIBUTE_SELECTOR_MODE,
			{
				className: "selector-pseudo",
				variants: [{ begin: ":(" + ga.join("|") + ")" }, { begin: ":(:)?(" + _a.join("|") + ")" }]
			},
			n.CSS_VARIABLE,
			{
				className: "attribute",
				begin: "\\b(" + va.join("|") + ")\\b"
			},
			{
				begin: /:/,
				end: /[;}{]/,
				contains: [
					n.BLOCK_COMMENT,
					n.HEXCOLOR,
					n.IMPORTANT,
					n.CSS_NUMBER_MODE,
					n.UNICODE_RANGE,
					...a,
					{
						begin: /(url|data-uri)\(/,
						end: /\)/,
						relevance: 0,
						keywords: { built_in: "url data-uri" },
						contains: [...a, {
							className: "string",
							begin: /[^)]/,
							endsWithParent: !0,
							excludeEnd: !0
						}]
					},
					n.FUNCTION_DISPATCH
				]
			},
			{
				begin: t.lookahead(/@/),
				end: "[{;]",
				relevance: 0,
				illegal: /:/,
				contains: [{
					className: "keyword",
					begin: i
				}, {
					begin: /\s/,
					endsWithParent: !0,
					excludeEnd: !0,
					relevance: 0,
					keywords: {
						$pattern: /[a-z-]+/,
						keyword: "and or not only",
						attribute: ha.join(" ")
					},
					contains: [
						{
							begin: /[a-z-]+(?=:)/,
							className: "attribute"
						},
						...a,
						n.CSS_NUMBER_MODE
					]
				}]
			},
			{
				className: "selector-tag",
				begin: "\\b(" + ma.join("|") + ")\\b"
			}
		]
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/xml.js
function ba(e) {
	let t = e.regex, n = t.concat(/[\p{L}_]/u, t.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), r = /[\p{L}0-9._:-]+/u, i = {
		className: "symbol",
		begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
	}, a = {
		begin: /\s/,
		contains: [{
			className: "keyword",
			begin: /#?[a-z_][a-z1-9_-]+/,
			illegal: /\n/
		}]
	}, o = e.inherit(a, {
		begin: /\(/,
		end: /\)/
	}), s = e.inherit(e.APOS_STRING_MODE, { className: "string" }), c = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), l = {
		endsWithParent: !0,
		illegal: /</,
		relevance: 0,
		contains: [{
			className: "attr",
			begin: r,
			relevance: 0
		}, {
			begin: /=\s*/,
			relevance: 0,
			contains: [{
				className: "string",
				endsParent: !0,
				variants: [
					{
						begin: /"/,
						end: /"/,
						contains: [i]
					},
					{
						begin: /'/,
						end: /'/,
						contains: [i]
					},
					{ begin: /[^\s"'=<>`]+/ }
				]
			}]
		}]
	};
	return {
		name: "HTML, XML",
		aliases: [
			"html",
			"xhtml",
			"rss",
			"atom",
			"xjb",
			"xsd",
			"xsl",
			"plist",
			"wsf",
			"svg"
		],
		case_insensitive: !0,
		unicodeRegex: !0,
		contains: [
			{
				className: "meta",
				begin: /<![a-z]/,
				end: />/,
				relevance: 10,
				contains: [
					a,
					c,
					s,
					o,
					{
						begin: /\[/,
						end: /\]/,
						contains: [{
							className: "meta",
							begin: /<![a-z]/,
							end: />/,
							contains: [
								a,
								o,
								c,
								s
							]
						}]
					}
				]
			},
			e.COMMENT(/<!--/, /-->/, { relevance: 10 }),
			{
				begin: /<!\[CDATA\[/,
				end: /\]\]>/,
				relevance: 10
			},
			i,
			{
				className: "meta",
				end: /\?>/,
				variants: [{
					begin: /<\?xml/,
					relevance: 10,
					contains: [c]
				}, { begin: /<\?[a-z][a-z0-9]+/ }]
			},
			{
				className: "tag",
				begin: /<style(?=\s|>)/,
				end: />/,
				keywords: { name: "style" },
				contains: [l],
				starts: {
					end: /<\/style>/,
					returnEnd: !0,
					subLanguage: "css"
				}
			},
			{
				className: "tag",
				begin: /<script(?=\s|>)/,
				end: />/,
				keywords: { name: "script" },
				contains: [l],
				starts: {
					end: /<\/script>/,
					returnEnd: !0,
					subLanguage: "javascript"
				}
			},
			{
				className: "tag",
				begin: /<>|<\/>/
			},
			{
				className: "tag",
				begin: t.concat(/</, t.lookahead(t.concat(n, t.either(/\/>/, />/, /\s/)))),
				end: /\/?>/,
				contains: [{
					className: "name",
					begin: n,
					relevance: 0,
					starts: l
				}]
			},
			{
				className: "tag",
				begin: t.concat(/<\//, t.lookahead(t.concat(n, />/))),
				contains: [{
					className: "name",
					begin: n,
					relevance: 0
				}, {
					begin: />/,
					relevance: 0,
					endsParent: !0
				}]
			}
		]
	};
}
//#endregion
//#region src/utils/markdown.ts
var xa = () => typeof window > "u" ? void 0 : er(window);
for (let [e, t] of Object.entries({
	json: Vi,
	yaml: Hi,
	javascript: Zi,
	typescript: sa,
	python: ca,
	bash: la,
	shell: la,
	sql: ua,
	css: ya,
	xml: ba,
	html: ba
})) zi.registerLanguage(e, t);
Q.use({
	gfm: !0,
	breaks: !0,
	renderer: {
		html() {
			return "";
		},
		link({ href: e, title: t, text: n }) {
			return `<a href="${e}"${t ? ` title="${t}"` : ""} target="_blank" rel="noopener noreferrer">${n}</a>`;
		},
		code({ text: e, lang: t }) {
			let n = t?.toLowerCase(), r = n && zi.getLanguage(n) ? zi.highlight(e, { language: n }).value : e;
			return `<pre><code class="hljs language-${n ?? "plaintext"}">${r}</code></pre>`;
		}
	}
});
function Sa(e) {
	try {
		let t = xa();
		return t ? Ri(t.sanitize(Q.parse(e, { async: !1 }), {
			USE_PROFILES: { html: !0 },
			FORBID_TAGS: [
				"style",
				"iframe",
				"object",
				"embed",
				"form"
			],
			FORBID_ATTR: ["style"]
		})) : e;
	} catch {
		return e;
	}
}
var Ca = {
	detachedFromBottom: !1,
	hasUnread: !1
}, wa = {
	detachedFromBottom: !0,
	hasUnread: !1
};
function Ta(e) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= 96;
}
function Ea(e) {
	return e.detachedFromBottom ? e : {
		detachedFromBottom: !0,
		hasUnread: e.hasUnread
	};
}
function Da(e, t) {
	return Ta(e) ? Ca : t.detachedFromBottom ? t : wa;
}
function Oa(e) {
	return !e.detachedFromBottom || e.hasUnread ? e : {
		...e,
		hasUnread: !0
	};
}
//#endregion
//#region src/utils/visual-turns.ts
function ka(e) {
	return e.role === "assistant" && !e.visible_content && !!e.tool_executions?.length;
}
function Aa(e) {
	let t = [];
	for (let n of e) {
		let e = t.at(-1);
		if (n.role === "user") {
			t.push({
				id: `user:${n.id}`,
				kind: "user",
				message: n
			});
			continue;
		}
		!e || e.kind === "user" ? t.push({
			id: `assistant:${n.id}`,
			kind: "assistant",
			segments: [n],
			parts: []
		}) : e.segments.push(n);
		let r = t.at(-1);
		if (!r || r.kind !== "assistant") continue;
		let i = r.parts.at(-1);
		ka(n) && i?.kind === "tool-cluster" ? i.steps.push({
			message: n,
			tools: n.tool_executions ?? []
		}) : ka(n) ? r.parts.push({
			kind: "tool-cluster",
			id: `tool-cluster:${n.id}`,
			steps: [{
				message: n,
				tools: n.tool_executions ?? []
			}]
		}) : r.parts.push({
			kind: "content",
			message: n
		});
	}
	return t;
}
function ja(e) {
	return e.steps.flatMap((e) => e.tools);
}
function Ma(e) {
	let t = ja(e), n = t.flatMap((e) => [e.started_at, e.finished_at]).filter((e) => !!e);
	if (n.length === t.length * 2) {
		let e = n.map((e) => Date.parse(e));
		if (e.every(Number.isFinite)) return Math.max(...e) - Math.min(...e);
	}
	let r = e.steps.map((e) => {
		let t = e.tools.map((e) => e.duration_ms).filter((e) => e != null && e >= 0);
		return t.length ? Math.max(...t) : void 0;
	});
	return r.every((e) => e !== void 0) ? r.reduce((e, t) => e + t, 0) : void 0;
}
//#endregion
//#region src/components/tool-summary.ts
var Na = class extends V {
	static properties = {
		tools: { attribute: !1 },
		expanded: { type: Boolean },
		steps: { attribute: !1 }
	};
	render() {
		let e = this.steps ?? (this.tools ? [{
			message: {},
			tools: this.tools
		}] : []), t = e.flatMap((e) => e.tools);
		if (!t.length) return z;
		let n = this.steps ? Ma({
			kind: "tool-cluster",
			id: "summary",
			steps: e
		}) : void 0, r = t.slice(0, 3), i = t.length - r.length, a = (e) => `${At(e).qualified}: ${e.status ?? "running"}`;
		return R`<section class="tool-group">
      <button
        class="tool-summary"
        @click=${() => this.dispatchEvent(new Event("tools-toggled", {
			bubbles: !0,
			composed: !0
		}))}
        aria-expanded=${this.expanded}
      >
        <span class="chips"
          >${Je(r, (e) => e.id, (e) => R`<span
                class="chip ${e.status ?? "running"}"
                title=${a(e)}
                aria-label=${a(e)}
                >${e.status === "completed" ? "✓" : e.status === "failed" ? "!" : e.status === "cancelled" ? "×" : "•"}</span
              >`)}${i ? R`<span class="more">+${i}</span>` : z}</span
        >
        ${t.length} tool${t.length === 1 ? "" : "s"} · ${e.length}
        step${e.length === 1 ? "" : "s"}${n === void 0 ? "" : ` · ${(n / 1e3).toFixed(1)} s`}</button
      >${this.expanded ? R`<div class="tool-list">
              ${Je(e, (e, t) => `step:${t}`, (e, t) => R`<div class="step">
                    <strong>Step ${t + 1}</strong>${Je(e.tools, (e) => e.id, (t) => R`<button
                          class="tool-row"
                          @click=${() => this.dispatchEvent(new CustomEvent("tool-selected", {
			detail: this.steps ? {
				messageId: e.message.id,
				tool: t
			} : t,
			bubbles: !0,
			composed: !0
		}))}
                        >
                          ${At(t).qualified}<span
                            >${t.status ?? "running"}</span
                          >
                        </button>`)}
                  </div>`)}
            </div>` : z}
    </section>`;
	}
	static styles = h`
    :host {
      display: block;
      min-width: 0;
      margin-top: 8px;
    }
    .tool-summary,
    .tool-row {
      border: 0;
      color: var(--secondary-text-color);
      background: transparent;
    }
    .tool-summary {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 0;
      cursor: pointer;
    }
    .chips {
      display: inline-flex;
      gap: 4px;
    }
    .chip {
      display: grid;
      width: 18px;
      height: 18px;
      place-items: center;
      border-radius: 50%;
      color: var(--primary-text-color);
      background: var(--secondary-text-color);
      font-size: 0.72rem;
      font-weight: 700;
    }
    .chip.running {
      background: var(--primary-color);
      animation: tool-pulse 1.4s infinite;
    }
    .chip.completed {
      background: var(--success-color, #2e7d32);
    }
    .chip.failed {
      background: var(--error-color);
    }
    .chip.cancelled {
      background: var(--secondary-text-color);
    }
    @keyframes tool-pulse {
      50% {
        opacity: 0.55;
        transform: scale(0.9);
      }
    }
    .tool-row {
      display: flex;
      min-width: 0;
      width: 100%;
      gap: 8px;
      justify-content: space-between;
      padding: 6px;
      text-align: left;
      overflow-wrap: anywhere;
    }
    .tool-row span {
      flex: 0 0 auto;
    }
    .step {
      display: grid;
      gap: 2px;
      margin-top: 6px;
    }
    .step strong {
      padding: 4px 6px;
      font-size: 0.78rem;
      color: var(--secondary-text-color);
    }
    @media (prefers-reduced-motion: reduce) {
      .chip.running {
        animation: none;
      }
    }
  `;
};
customElements.get("assist-workspace-tool-summary") || customElements.define("assist-workspace-tool-summary", Na);
//#endregion
//#region src/components/message-list.ts
var Pa = class extends V {
	static properties = {
		conversation: { attribute: !1 },
		timelineRevision: { type: Number },
		expandedIds: { attribute: !1 },
		turn: { attribute: !1 },
		turnNotice: { attribute: !1 },
		loading: { type: Boolean },
		loadError: { type: Boolean },
		items: { attribute: !1 },
		showToolActivity: { type: Boolean }
	};
	jumpRaf;
	jumpActive = !1;
	followState = Ca;
	conversationId;
	contentRevision = 0;
	lastScrollTop = 0;
	copyStates = /* @__PURE__ */ new Map();
	copyResetTimers = /* @__PURE__ */ new Map();
	timeline() {
		return this.renderRoot.querySelector(".messages");
	}
	onScroll = (e) => {
		let t = e.currentTarget, n = t.scrollTop < this.lastScrollTop;
		this.lastScrollTop = t.scrollTop, this.setFollowState(n ? Ea(this.followState) : Da(t, this.followState));
	};
	setFollowState(e) {
		(e.detachedFromBottom !== this.followState.detachedFromBottom || e.hasUnread !== this.followState.hasUnread) && (this.followState = e, this.requestUpdate());
	}
	stopFollow = (e) => {
		(e instanceof WheelEvent && e.deltaY < 0 || e instanceof KeyboardEvent && [
			"PageUp",
			"Home",
			"ArrowUp"
		].includes(e.key)) && (this.cancelJump(), this.setFollowState(Ea(this.followState)));
	};
	onPointerDown = (e) => {
		e.pointerType === "touch" && (this.touchStartY = e.clientY);
	};
	touchStartY;
	onPointerMove = (e) => {
		e.pointerType === "touch" && this.touchStartY !== void 0 && e.clientY - this.touchStartY > 8 && (this.cancelJump(), this.setFollowState(Ea(this.followState)), this.touchStartY = void 0);
	};
	onPointerUp = () => {
		this.touchStartY = void 0;
	};
	willUpdate(e) {
		if (e.has("conversation") && this.conversationId !== this.conversation?.id) this.cancelJump(), this.conversationId = this.conversation?.id, this.contentRevision = this.timelineRevision ?? 0, this.followState = Ca;
		else if (e.has("timelineRevision")) {
			let e = this.timelineRevision ?? 0;
			e !== this.contentRevision && this.followState.detachedFromBottom && (this.followState = Oa(this.followState)), this.contentRevision = e;
		}
	}
	updated() {
		let e = this.timeline();
		!this.jumpActive && !this.followState.detachedFromBottom && e && (e.scrollTop = e.scrollHeight, this.lastScrollTop = e.scrollTop);
	}
	scrollToLatest = () => {
		let e = this.timeline();
		if (this.followState = Ca, this.requestUpdate(), !e) return;
		if (this.cancelJump(), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			e.scrollTop = e.scrollHeight, this.lastScrollTop = e.scrollTop;
			return;
		}
		let t = performance.now(), n = e.scrollTop;
		this.jumpActive = !0;
		let r = (i) => {
			let a = Math.min(1, (i - t) / 180), o = 1 - (1 - a) ** 3, s = Math.max(0, e.scrollHeight - e.clientHeight);
			e.scrollTop = n + (s - n) * o, this.lastScrollTop = e.scrollTop, a < 1 ? this.jumpRaf = requestAnimationFrame(r) : (e.scrollTop = e.scrollHeight, this.lastScrollTop = e.scrollTop, this.jumpActive = !1, this.jumpRaf = void 0);
		};
		this.jumpRaf = requestAnimationFrame(r);
	};
	cancelJump() {
		this.jumpRaf !== void 0 && cancelAnimationFrame(this.jumpRaf), this.jumpRaf = void 0, this.jumpActive = !1;
	}
	disconnectedCallback() {
		this.cancelJump();
		for (let e of this.copyResetTimers.values()) window.clearTimeout(e);
		super.disconnectedCallback();
	}
	renderTools(e, t) {
		return !this.showToolActivity || !t.tool_executions?.length ? z : R`<assist-workspace-tool-summary
      .tools=${t.tool_executions}
      .expanded=${this.expandedIds?.has(`${e.id}:${t.id}`)}
      @tools-toggled=${(e) => {
			e.stopPropagation(), this.dispatchEvent(new CustomEvent("tools-toggled", {
				detail: t.id,
				bubbles: !0,
				composed: !0
			}));
		}}
      @tool-selected=${(e) => {
			e.stopPropagation(), this.dispatchEvent(new CustomEvent("tool-selected", {
				detail: {
					messageId: t.id,
					tool: e.detail
				},
				bubbles: !0,
				composed: !0
			}));
		}}
    ></assist-workspace-tool-summary>`;
	}
	renderPart(e, t) {
		if (t.kind === "content") {
			let n = t.message;
			return R`${n.visible_content ? R`<div class="content">${Sa(n.visible_content)}</div>` : z}${this.renderTools(e, n)}`;
		}
		if (!this.showToolActivity) return z;
		let n = `${e.id}:${t.id}`;
		return R`<assist-workspace-tool-summary
      .steps=${t.steps}
      .expanded=${this.expandedIds?.has(n)}
      @tools-toggled=${(e) => {
			e.stopPropagation(), this.dispatchEvent(new CustomEvent("tools-toggled", {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		}}
      @tool-selected=${(e) => {
			e.stopPropagation(), this.dispatchEvent(new CustomEvent("tool-selected", {
				detail: e.detail,
				bubbles: !0,
				composed: !0
			}));
		}}
    ></assist-workspace-tool-summary>`;
	}
	copyButton(e, t) {
		let n = this.copyStates.get(e) ?? "idle", r = Tt(n);
		return R`<button
      class="copy"
      aria-label=${n === "idle" ? "Copy message" : r}
      @click=${() => void this.copyMessage(e, t)}
    >
      ${r}
    </button>`;
	}
	async copyMessage(e, t) {
		let n = await Et(t);
		this.copyStates.set(e, n ? "copy-success" : "copy-failure"), window.clearTimeout(this.copyResetTimers.get(e)), this.copyResetTimers.set(e, window.setTimeout(() => {
			this.copyStates.delete(e), this.copyResetTimers.delete(e), this.requestUpdate();
		}, 1800)), this.requestUpdate();
	}
	render() {
		let e = this.conversation;
		return !e && this.loading ? R`<div class="messages">
        <div class="empty" role="status">Loading conversation…</div>
      </div>` : !e && this.loadError ? R`<div class="messages">
        <div class="empty" role="alert">
          <h2>Couldn’t load this conversation.</h2>
          <button
            @click=${() => this.dispatchEvent(new Event("retry-load", {
			bubbles: !0,
			composed: !0
		}))}
          >
            Retry
          </button>
        </div>
      </div>` : e ? R`<div
        class="messages"
        role="log"
        tabindex="0"
        @scroll=${this.onScroll}
        @wheel=${this.stopFollow}
        @keydown=${this.stopFollow}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
      >
        ${Je(this.items ?? [], (e) => e.id, (t) => t.kind === "user" ? R`<article class="message user" data-timeline-id=${t.id}>
                  <div class="user-stack">
                    <div class="content user-bubble">
                      ${t.message.visible_content}
                    </div>
                    <div class="message-actions user-actions">
                      ${this.copyButton(`user:${t.message.id}`, t.message.visible_content)}
                    </div>
                  </div>
                </article>` : R`<article
                  class="message assistant"
                  data-timeline-id=${t.id}
                >
                  ${t.parts.map((t) => this.renderPart(e, t))}
                  ${t.segments.some((e) => e.visible_content) ? R`<div class="message-actions assistant-actions">
                          ${this.copyButton(`assistant:${t.segments.map((e) => e.id).join(":")}`, t.segments.map((e) => e.visible_content).filter(Boolean).join("\n\n"))}
                        </div>` : z}
                </article>`)}
        ${this.turn && !this.turn.visibleTextStarted && !this.turn.terminal ? R`<div class="thinking" role="status" aria-live="polite">${this.turn.toolsRunning > 0 ? "Using tools" : "Working"} <i></i><i></i><i></i></div>` : z}
        ${this.turnNotice ? R`<div class="turn-outcome ${this.turnNotice.kind}" role="status">${this.turnNotice.kind === "failed" ? "Request failed" : "Stopped"}</div>` : z}
      </div>
      ${this.followState.detachedFromBottom ? R`<button
              class="jump-to-latest"
              aria-label="Jump to latest"
              @click=${this.scrollToLatest}
            >
              ${this.followState.hasUnread ? "↓ New messages" : "↓"}
            </button>` : z}` : R`<div class="messages">
        <div class="empty">
          <h2>Assist Workspace</h2>
          <p>What do you need to look at?</p>
        </div>
      </div>`;
	}
	static styles = h`
    :host {
      min-height: 0;
      min-width: 0;
      height: 100%;
      display: block;
      position: relative;
    }
    .messages {
      position: relative;
      height: 100%;
      overflow: auto;
      box-sizing: border-box;
      padding: 28px clamp(16px, 4vw, 44px);
    }
    .message {
      line-height: 1.58;
    }
    .assistant {
      min-width: 0;
      max-width: 920px;
      margin: 0 0 20px;
    }
    .user {
      width: fit-content;
      max-width: var(--aw-user-max, min(72%, 720px));
      margin: 0 0 20px auto;
    }
    .user .content {
      min-width: 0;
      padding: 10px 14px;
      border-radius: 14px;
      background: var(--primary-color);
      color: var(--text-primary-color, white);
      overflow-wrap: anywhere;
    }
    .user-stack {
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      max-width: 100%;
    }
    .user-bubble {
      width: fit-content;
      max-width: 100%;
      box-sizing: border-box;
      margin-bottom: 0;
    }
    .message-actions {
      display: flex;
      color: var(--secondary-text-color);
      font-size: 0.78rem;
    }
    .user-actions {
      justify-content: flex-end;
      margin-top: 4px;
    }
    .assistant-actions {
      display: flex;
      margin: 4px 0 12px;
    }
    .copy {
      width: 88px;
      flex: 0 0 88px;
      min-height: 24px;
      padding: 2px 5px;
      border: 0;
      color: inherit;
      background: transparent;
      cursor: pointer;
      font: inherit;
      font-weight: 400;
    }
    .assistant-actions .copy {
      text-align: left;
    }
    .user-actions .copy {
      text-align: right;
    }
    .content {
      min-width: 0;
      margin: 0 0 10px;
      overflow-wrap: anywhere;
    }
    .assistant .content {
      margin-bottom: 0;
    }
    .content p {
      margin: 0 0 12px;
      white-space: pre-wrap;
    }
    .content > :last-child {
      margin-bottom: 0;
    }
    .content :is(h1, h2, h3) {
      margin: 20px 0 10px;
      line-height: 1.25;
    }
    .content blockquote {
      margin: 12px 0;
      padding-left: 12px;
      border-left: 3px solid var(--primary-color);
      color: var(--secondary-text-color);
    }
    .content code {
      padding: 1px 4px;
      background: var(--secondary-background-color);
      border-radius: 4px;
    }
    .content pre {
      width: 100%;
      max-height: 360px;
      box-sizing: border-box;
      overflow: auto;
      padding: 12px;
      border-radius: 8px;
      background: var(--secondary-background-color);
    }
    .content table {
      display: block;
      max-width: 100%;
      overflow: auto;
      border-collapse: collapse;
    }
    .content img {
      max-width: 100%;
      height: auto;
    }
    .content a {
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    .content th,
    .content td {
      padding: 7px 9px;
      border: 1px solid var(--divider-color);
    }
    .thinking {
      display: flex;
      gap: 5px;
      align-items: center;
      color: var(--secondary-text-color);
      font-size: 0.85rem;
    }
    .turn-outcome {
      margin: 8px 0;
      color: var(--secondary-text-color);
      font-size: 0.85rem;
    }
    .turn-outcome.failed {
      color: var(--error-color, #b3261e);
    }
    .thinking i {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
      animation: dots 1.1s infinite ease-in-out;
    }
    .thinking i:nth-of-type(2) {
      animation-delay: 0.15s;
    }
    .thinking i:nth-of-type(3) {
      animation-delay: 0.3s;
    }
    @keyframes dots {
      50% {
        transform: translateY(-3px);
        opacity: 0.45;
      }
    }
    .jump-to-latest {
      position: absolute;
      right: 16px;
      bottom: 16px;
      z-index: 2;
      min-width: var(--aw-touch-size, 32px);
      min-height: var(--aw-touch-size, 32px);
      border: 0;
      border-radius: 16px;
      padding: 7px 11px;
      color: var(--text-primary-color, white);
      background: var(--primary-color);
    }
    @media (prefers-reduced-motion: reduce) {
      .thinking i {
        animation: none;
      }
    }
  `;
};
customElements.get("assist-workspace-message-list") || customElements.define("assist-workspace-message-list", Pa);
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Fa = Math.min, Ia = Math.max, La = Math.round, Ra = Math.floor, za = (e) => ({
	x: e,
	y: e
}), Ba = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Va(e, t, n) {
	return Ia(e, Fa(t, n));
}
function Ha(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Ua(e) {
	return e.split("-")[0];
}
function Wa(e) {
	return e.split("-")[1];
}
function Ga(e) {
	return e === "x" ? "y" : "x";
}
function Ka(e) {
	return e === "y" ? "height" : "width";
}
function qa(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Ja(e) {
	return Ga(qa(e));
}
function Ya(e, t, n) {
	n === void 0 && (n = !1);
	let r = Wa(e), i = Ja(e), a = Ka(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = io(o)), [o, io(o)];
}
function Xa(e) {
	let t = io(e);
	return [
		Za(e),
		t,
		Za(t)
	];
}
function Za(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Qa = ["left", "right"], $a = ["right", "left"], eo = ["top", "bottom"], to = ["bottom", "top"];
function no(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? $a : Qa : t ? Qa : $a;
		case "left":
		case "right": return t ? eo : to;
		default: return [];
	}
}
function ro(e, t, n, r) {
	let i = Wa(e), a = no(Ua(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Za)))), a;
}
function io(e) {
	let t = Ua(e);
	return Ba[t] + e.slice(t.length);
}
function ao(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function oo(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : ao(e);
}
function so(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function co(e, t, n) {
	let { reference: r, floating: i } = e, a = qa(t), o = Ja(t), s = Ka(o), c = Ua(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = Wa(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function lo(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Ha(t, e), p = oo(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = so(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = so(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var uo = 50, fo = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: lo
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = co(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < uo && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = co(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, po = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Ha(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Ua(r), _ = qa(o), v = Ua(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [io(o)] : Xa(o)), x = p !== "none";
			!d && x && b.push(...ro(o, m, p, y));
			let ee = [o, ...b], S = await s.detectOverflow(t, h), C = [], w = i.flip?.overflows || [];
			if (l && C.push(S[g]), u) {
				let e = Ya(r, a, y);
				C.push(S[e[0]], S[e[1]]);
			}
			if (w = [...w, {
				placement: r,
				overflows: C
			}], !C.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = ee[e];
				if (t && (u !== "alignment" || _ === qa(t) || w.every((e) => qa(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: w
					},
					reset: { placement: t }
				};
				let n = w.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = w.filter((e) => {
							if (x) {
								let t = qa(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
}, mo = /*#__PURE__*/ new Set(["left", "top"]);
async function ho(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Ua(n), s = Wa(n), c = qa(n) === "y", l = mo.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Ha(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var go = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await ho(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, _o = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = Ha(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = qa(i), p = Ga(f), m = u[p], h = u[f], g = (e, t) => Va(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function vo() {
	return typeof window < "u";
}
function yo(e) {
	return xo(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function $(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function bo(e) {
	return ((xo(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function xo(e) {
	return vo() ? e instanceof Node || e instanceof $(e).Node : !1;
}
function So(e) {
	return vo() ? e instanceof Element || e instanceof $(e).Element : !1;
}
function Co(e) {
	return vo() ? e instanceof HTMLElement || e instanceof $(e).HTMLElement : !1;
}
function wo(e) {
	return !vo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof $(e).ShadowRoot;
}
function To(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Io(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Eo(e) {
	return /^(table|td|th)$/.test(yo(e));
}
function Do(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Oo = /transform|translate|scale|rotate|perspective|filter/, ko = /paint|layout|strict|content/, Ao = (e) => !!e && e !== "none", jo;
function Mo(e) {
	let t = So(e) ? Io(e) : e;
	return Ao(t.transform) || Ao(t.translate) || Ao(t.scale) || Ao(t.rotate) || Ao(t.perspective) || !Po() && (Ao(t.backdropFilter) || Ao(t.filter)) || Oo.test(t.willChange || "") || ko.test(t.contain || "");
}
function No(e) {
	let t = Ro(e);
	for (; Co(t) && !Fo(t);) {
		if (Mo(t)) return t;
		if (Do(t)) return null;
		t = Ro(t);
	}
	return null;
}
function Po() {
	return jo ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), jo;
}
function Fo(e) {
	return /^(html|body|#document)$/.test(yo(e));
}
function Io(e) {
	return $(e).getComputedStyle(e);
}
function Lo(e) {
	return So(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Ro(e) {
	if (yo(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || wo(e) && e.host || bo(e);
	return wo(t) ? t.host : t;
}
function zo(e) {
	let t = Ro(e);
	return Fo(t) ? (e.ownerDocument || e).body : Co(t) && To(t) ? t : zo(t);
}
function Bo(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = zo(e), i = r === e.ownerDocument?.body, a = $(r);
	if (i) {
		let e = Vo(a);
		return t.concat(a, a.visualViewport || [], To(r) ? r : [], e && n ? Bo(e) : []);
	}
	return t.concat(r, Bo(r, [], n));
}
function Vo(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Ho(e) {
	let t = Io(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Co(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = La(n) !== a || La(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Uo(e) {
	return So(e) ? e : e.contextElement;
}
function Wo(e) {
	let t = Uo(e);
	if (!Co(t)) return za(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Ho(t), o = (a ? La(n.width) : n.width) / r, s = (a ? La(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Go = /*#__PURE__*/ za(0);
function Ko(e) {
	let t = $(e);
	return !Po() || !t.visualViewport ? Go : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function qo(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === $(e);
}
function Jo(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Uo(e), o = za(1);
	t && (r ? So(r) && (o = Wo(r)) : o = Wo(e));
	let s = qo(a, n, r) ? Ko(a) : za(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = $(a), t = So(r) ? $(r) : r, n = e, i = Vo(n);
		for (; i && t !== n;) {
			let e = Wo(i), t = i.getBoundingClientRect(), r = Io(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = $(i), i = Vo(n);
		}
	}
	return so({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Yo(e, t) {
	let n = Lo(e).scrollLeft;
	return t ? t.left + n : Jo(bo(e)).left + n;
}
function Xo(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Yo(e, n),
		y: n.top + t.scrollTop
	};
}
function Zo(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = bo(r), s = t ? Do(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = za(1), u = za(0), d = Co(r);
	if ((d || !a) && ((yo(r) !== "body" || To(o)) && (c = Lo(r)), d)) {
		let e = Jo(r);
		l = Wo(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Xo(o, c) : za(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Qo(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function $o(e) {
	let t = Lo(e), n = e.ownerDocument.body, r = Ia(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Ia(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Yo(e), o = -t.scrollTop;
	return Io(n).direction === "rtl" && (a += Ia(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var es = 25;
function ts(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = $(e), a = bo(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Po() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Yo(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= es && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function ns(e, t) {
	let n = Jo(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Wo(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function rs(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = ts(e, n, t);
	else if (t === "document") r = $o(bo(e));
	else if (So(t)) r = ns(t, n);
	else {
		let n = Ko(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return so(r);
}
function is(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Bo(e, [], !1).filter((e) => So(e) && yo(e) !== "body"), i = null, a = Io(e).position === "fixed", o = a ? Ro(e) : e;
	for (; So(o) && !Fo(o);) {
		let e = Io(o), t = Mo(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Ro(o);
	}
	return t.set(e, r), r;
}
function as(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Do(t) ? [] : is(t, this._c) : [].concat(n), r], o = rs(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = rs(t, a[e], i);
		s = Ia(n.top, s), c = Fa(n.right, c), l = Fa(n.bottom, l), u = Ia(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function os(e) {
	let { width: t, height: n } = Ho(e);
	return {
		width: t,
		height: n
	};
}
function ss(e, t, n) {
	let r = Co(t), i = bo(t), a = n === "fixed", o = Jo(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = za(0);
	if ((r || !a) && ((yo(t) !== "body" || To(i)) && (s = Lo(t)), r)) {
		let e = Jo(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Yo(i));
	let l = i && !r && !a ? Xo(i, s) : za(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function cs(e) {
	return Io(e).position === "static";
}
function ls(e, t) {
	if (!Co(e) || Io(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return bo(e) === n && (n = n.ownerDocument.body), n;
}
function us(e, t) {
	let n = $(e);
	if (Do(e)) return n;
	if (!Co(e)) {
		let t = Ro(e);
		for (; t && !Fo(t);) {
			if (So(t) && !cs(t)) return t;
			t = Ro(t);
		}
		return n;
	}
	let r = ls(e, t);
	for (; r && Eo(r) && cs(r);) r = ls(r, t);
	return r && Fo(r) && cs(r) && !Mo(r) ? n : r || No(e) || n;
}
var ds = async function(e) {
	let t = this.getOffsetParent || us, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: ss(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function fs(e) {
	return Io(e).direction === "rtl";
}
var ps = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Zo,
	getDocumentElement: bo,
	getClippingRect: as,
	getOffsetParent: us,
	getElementRects: ds,
	getClientRects: Qo,
	getDimensions: os,
	getScale: Wo,
	isElement: So,
	isRTL: fs
};
function ms(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function hs(e, t, n) {
	let r = null, i, a = bo(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Ra(d), h = Ra(a.clientWidth - (u + f)), g = Ra(a.clientHeight - (d + p)), _ = Ra(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Ia(0, Fa(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!ms(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = $(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function gs(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Uo(e), u = i || a ? [...l ? Bo(l) : [], ...t ? Bo(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? hs(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Jo(e) : null;
	c && g();
	function g() {
		let t = Jo(e);
		h && !ms(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var _s = go, vs = _o, ys = po, bs = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...ps,
		...i.platform,
		_c: r
	};
	return fo(e, t, {
		...i,
		platform: a
	});
}, xs = class extends V {
	static properties = {
		open: { type: Boolean },
		anchor: { attribute: !1 }
	};
	cleanup;
	close = () => this.dispatchEvent(new Event("menu-closed", {
		bubbles: !0,
		composed: !0
	}));
	onDocumentPointerDown = (e) => {
		let t = this.renderRoot.querySelector(".conversation-menu");
		this.open && t && !e.composedPath().includes(t) && this.close();
	};
	connectedCallback() {
		super.connectedCallback(), window.addEventListener("pointerdown", this.onDocumentPointerDown);
	}
	updated() {
		this.cleanup?.();
		let e = this.renderRoot.querySelector(".conversation-menu");
		if (!this.open || !e || !this.anchor) return;
		let t = this.anchor.getBoundingClientRect();
		if (!this.anchor.isConnected || !Number.isFinite(t.x) || !Number.isFinite(t.y) || !Number.isFinite(t.width) || !Number.isFinite(t.height)) {
			this.dispatchEvent(new Event("menu-anchor-invalid", {
				bubbles: !0,
				composed: !0
			}));
			return;
		}
		let n = () => bs(this.anchor, e, {
			strategy: "fixed",
			placement: "bottom-end",
			middleware: [
				_s(4),
				ys(),
				vs({ padding: 8 })
			]
		}).then(({ x: t, y: n }) => Object.assign(e.style, {
			left: `${t}px`,
			top: `${n}px`
		}));
		n(), this.cleanup = gs(this.anchor, e, n);
	}
	disconnectedCallback() {
		this.cleanup?.(), window.removeEventListener("pointerdown", this.onDocumentPointerDown), super.disconnectedCallback();
	}
	render() {
		return this.open ? R`<div class="conversation-menu" role="menu">
          <button
            @click=${() => this.dispatchEvent(new Event("rename-requested", {
			bubbles: !0,
			composed: !0
		}))}
          >
            Rename</button
          ><button
            @click=${() => this.dispatchEvent(new Event("delete-requested", {
			bubbles: !0,
			composed: !0
		}))}
          >
            Delete
          </button>
        </div>` : z;
	}
	static styles = h`
    :host {
      position: fixed;
      z-index: 5;
      inset: 0;
      pointer-events: none;
    }
    .conversation-menu {
      position: fixed;
      pointer-events: auto;
      display: grid;
      min-width: 136px;
      padding: 4px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      box-shadow: 0 8px 22px #0003;
    }
    button {
      border: 0;
      padding: 8px;
      color: inherit;
      background: transparent;
      text-align: left;
    }
    button:hover {
      background: var(--secondary-background-color);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
  `;
};
customElements.get("assist-workspace-conversation-menu") || customElements.define("assist-workspace-conversation-menu", xs);
//#endregion
//#region src/api/workspace-api.ts
var Ss = class {
	hass;
	constructor(e) {
		this.hass = e;
	}
	updateHass(e) {
		this.hass = e;
	}
	async listConversations() {
		return (await this.hass.callWS({ type: "assist_workspace/conversation/list" })).conversations ?? [];
	}
	async getConversation(e) {
		return this.hass.callWS({
			type: "assist_workspace/conversation/get",
			conversation_id: e
		});
	}
	async searchConversations(e) {
		return (await this.hass.callWS({
			type: "assist_workspace/conversation/search",
			query: e
		})).hits ?? [];
	}
	createConversation(e) {
		return this.hass.callWS({
			type: "assist_workspace/conversation/create",
			agent_id: e
		});
	}
	renameConversation(e, t) {
		return this.hass.callWS({
			type: "assist_workspace/conversation/rename",
			conversation_id: e,
			title: t
		});
	}
	async deleteConversation(e) {
		await this.hass.callWS({
			type: "assist_workspace/conversation/delete",
			conversation_id: e
		});
	}
	async listAgents() {
		return (await this.hass.callWS({ type: "conversation/agent/list" })).agents ?? [];
	}
	runTurn(e, t, n, r) {
		return this.hass.connection.subscribeMessage(r, {
			type: "assist_workspace/turn/run",
			conversation_id: e,
			turn_id: t,
			text: n
		});
	}
	async cancelTurn(e, t) {
		await this.hass.callWS({
			type: "assist_workspace/turn/cancel",
			conversation_id: e,
			turn_id: t
		});
	}
};
//#endregion
//#region src/utils/turn-id.ts
function Cs() {
	if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
	let e = /* @__PURE__ */ new Uint32Array(2);
	return globalThis.crypto?.getRandomValues ? globalThis.crypto.getRandomValues(e) : (e[0] = Math.floor(Math.random() * 4294967295), e[1] = Math.floor(Math.random() * 4294967295)), `turn-${Date.now().toString(36)}-${e[0].toString(36)}${e[1].toString(36)}`;
}
//#endregion
//#region src/state/conversation-cache.ts
function ws(e) {
	let { messages: t, ...n } = e;
	return {
		...n,
		message_count: t.length
	};
}
function Ts(e, t) {
	if (Object.is(e, t)) return !0;
	if (typeof e != typeof t || e === null || t === null) return !1;
	if (Array.isArray(e) && Array.isArray(t)) return e.length === t.length && e.every((e, n) => Ts(e, t[n]));
	if (typeof e == "object") {
		let n = e, r = t, i = Object.keys(n);
		return i.length === Object.keys(r).length && i.every((e) => Ts(n[e], r[e]));
	}
	return !1;
}
function Es(e, t) {
	return t ? e.updated_at && t.updated_at ? e.updated_at > t.updated_at : !!(e.updated_at && !t.updated_at) : !0;
}
function Ds(e, t) {
	return !!(e && Ts(e.messages, t.messages));
}
var Os = class {
	summariesById = /* @__PURE__ */ new Map();
	detailsById = /* @__PURE__ */ new Map();
	revisionsById = /* @__PURE__ */ new Map();
	orderedIds = [];
	activeId;
	get summaries() {
		return this.orderedIds.map((e) => this.summariesById.get(e)).filter((e) => !!e);
	}
	get activeDetail() {
		return this.activeId ? this.detailsById.get(this.activeId) : void 0;
	}
	getDetail(e) {
		return this.detailsById.get(e);
	}
	getSummary(e) {
		return this.summariesById.get(e);
	}
	getRevision(e) {
		return e ? this.revisionsById.get(e) ?? 0 : 0;
	}
	replaceSummaries(e, t = /* @__PURE__ */ new Set()) {
		let n = new Set(e.map((e) => e.id)), r = /* @__PURE__ */ new Map();
		for (let t of e) {
			let e = this.summariesById.get(t.id);
			r.set(t.id, Es(t, e) ? t : e);
		}
		for (let e of t) {
			let t = this.detailsById.get(e), n = this.summariesById.get(e);
			t && n && !r.has(e) && r.set(e, n);
		}
		this.summariesById = r, this.orderedIds = [.../* @__PURE__ */ new Set([...e.map((e) => e.id), ...t])].filter((e) => this.summariesById.has(e));
		for (let e of this.detailsById.keys()) !n.has(e) && !t.has(e) && this.detailsById.delete(e);
		this.sort();
	}
	replaceDetails(e) {
		this.replaceSummaries(e.map(ws));
		for (let t of e) this.setDetail(t);
	}
	setDetail(e) {
		let t = this.detailsById.get(e.id), n = this.summariesById.get(e.id), r = ws(e), i = n ? Object.fromEntries(Object.entries({
			...n,
			...r
		}).map(([e, t]) => [e, t === void 0 ? n[e] : t])) : r, a = !!(n?.updated_at && e.updated_at && n.updated_at > e.updated_at), o = a ? n : i, s = n ? {
			...e,
			...o,
			messages: e.messages
		} : e;
		this.detailsById.set(e.id, s), this.summariesById.set(e.id, a ? n : i), this.orderedIds.includes(e.id) || this.orderedIds.push(e.id), t && !Ds(t, s) && this.bump(e.id), this.sort();
	}
	applyTimeline(e, t) {
		let n = this.summariesById.get(e.id), r = n ? {
			...e,
			...n,
			messages: e.messages
		} : e;
		this.detailsById.set(e.id, r), this.summariesById.has(e.id) || (this.summariesById.set(e.id, ws(e)), this.orderedIds.includes(e.id) || this.orderedIds.push(e.id), this.sort()), t && this.bump(e.id);
	}
	applySummary(e) {
		if (!Es(e, this.summariesById.get(e.id))) return;
		this.summariesById.set(e.id, e), this.orderedIds.includes(e.id) || this.orderedIds.push(e.id);
		let t = this.detailsById.get(e.id);
		t && this.detailsById.set(e.id, {
			...t,
			...e,
			messages: t.messages
		}), this.sort();
	}
	touch(e, t) {
		let n = this.summariesById.get(e);
		if (!n) return;
		this.summariesById.set(e, {
			...n,
			updated_at: t
		});
		let r = this.detailsById.get(e);
		r && this.detailsById.set(e, {
			...r,
			updated_at: t
		}), this.sort();
	}
	rename(e) {
		this.summariesById.set(e.id, e);
		let t = this.detailsById.get(e.id);
		t && this.detailsById.set(e.id, {
			...t,
			...e,
			messages: t.messages
		}), this.orderedIds.includes(e.id) || this.orderedIds.push(e.id), this.sort();
	}
	delete(e) {
		this.summariesById.delete(e), this.detailsById.delete(e), this.revisionsById.delete(e), this.orderedIds = this.orderedIds.filter((t) => t !== e), this.activeId === e && (this.activeId = this.orderedIds[0] ?? null);
	}
	resolveTool(e, t, n) {
		return this.detailsById.get(e)?.messages.find((e) => e.id === t)?.tool_executions?.find((e) => e.id === n);
	}
	bump(e) {
		this.revisionsById.set(e, this.getRevision(e) + 1);
	}
	sort() {
		this.orderedIds.sort((e, t) => (this.summariesById.get(t)?.updated_at ?? "").localeCompare(this.summariesById.get(e)?.updated_at ?? ""));
	}
};
//#endregion
//#region src/state/conversation-reducer.ts
function ks(e, t, n) {
	if (n !== void 0 && e[n]?.id === t) return n;
	let r = e.length - 1;
	return r >= 0 && e[r]?.id === t ? r : e.findIndex((e) => e.id === t);
}
function As(e, t) {
	if (!t?.length) return {
		messages: e,
		changed: !1
	};
	let n = e.slice();
	for (let e of t) {
		let t = n.findIndex((t) => t.id === e.id), r = t >= 0 ? n[t] : void 0, i = {
			...e,
			visible_content: e.visible_content || r?.visible_content || e.visible_content
		};
		t >= 0 ? n[t] = i : n.push(i);
	}
	return {
		messages: n,
		changed: !0
	};
}
function js(e, t, n) {
	if (!t || !n) return {
		messages: e,
		changed: !1
	};
	let r = e.findIndex((e) => e.id === t);
	if (r < 0) return {
		changed: !0,
		messages: [...e, {
			id: t,
			role: "assistant",
			visible_content: "",
			status: "running",
			tool_executions: [n]
		}]
	};
	let i = e[r], a = i.tool_executions ?? [], o = a.findIndex((e) => e.id === n.id), s = o < 0 ? [...a, n] : a.map((e, t) => t === o ? {
		...e,
		...n
	} : e);
	return {
		changed: !0,
		messages: e.map((e, t) => t === r ? {
			...i,
			tool_executions: s
		} : e)
	};
}
function Ms(e, t, n) {
	let r = e.messages, i = { ...t }, a = !1, o = !1, s;
	switch (n.event) {
		case "turn_started": {
			i = {
				...i,
				thinking: !0
			};
			let e = n.user_message ?? `user-${t.id}`;
			r.some((t) => t.id === e) || (r = [...r, {
				id: e,
				role: "user",
				visible_content: n.text ?? "",
				status: "completed"
			}], a = !0), o = !0;
			break;
		}
		case "assistant_thinking":
			i = {
				...i,
				thinking: !0
			};
			break;
		case "assistant_delta": {
			i = {
				...i,
				thinking: !1,
				visibleTextStarted: !0
			};
			let e = n.delta ?? "";
			if (!e) break;
			let o = n.message_id ?? `assistant-${t.id}`, s = ks(r, o, i.activeAssistantMessageId === o ? i.activeAssistantMessageIndex : void 0);
			r = s < 0 ? [...r, {
				id: o,
				role: "assistant",
				visible_content: e,
				status: "running"
			}] : (() => {
				let t = r.slice(), n = t[s];
				return t[s] = {
					...n,
					visible_content: n.visible_content + e
				}, t;
			})(), i = {
				...i,
				activeAssistantMessageId: o,
				activeAssistantMessageIndex: s < 0 ? r.length - 1 : s
			}, a = !0;
			break;
		}
		case "tool_started":
		case "tool_finished": {
			i = {
				...i,
				thinking: !1,
				toolsRunning: Math.max(0, i.toolsRunning + (n.event === "tool_started" ? 1 : -1))
			};
			let e = js(r, n.message_id, n.tool);
			r = e.messages, a = e.changed;
			break;
		}
		case "turn_completed": {
			let e = As(r, n.messages);
			r = e.messages, a = e.changed, i = {
				...i,
				thinking: !1,
				toolsRunning: 0
			}, s = "completed";
			break;
		}
		case "turn_failed": {
			let e = As(r, n.messages);
			r = e.messages, a = e.changed, i = {
				...i,
				thinking: !1,
				toolsRunning: 0
			}, s = { kind: "failed" };
			break;
		}
		case "turn_stopped": {
			let e = As(r, n.messages);
			r = e.messages, a = e.changed, i = {
				...i,
				thinking: !1,
				toolsRunning: 0
			}, s = { kind: "stopped" };
			break;
		}
	}
	return {
		conversation: r === e.messages ? e : {
			...e,
			messages: r
		},
		turn: i,
		timelineChanged: a,
		summaryChanged: o,
		terminalOutcome: s
	};
}
//#endregion
//#region src/state/draft-store.ts
var Ns = class {
	storage;
	key;
	preferences;
	persistDrafts;
	delay;
	drafts;
	timer;
	constructor(e, t, n, r = !0, i = 200) {
		this.storage = e, this.key = t, this.preferences = n, this.persistDrafts = r, this.delay = i, this.drafts = r ? this.read().drafts ?? {} : {}, r || this.flush();
	}
	setPersistence(e) {
		this.persistDrafts = e, this.flush();
	}
	get(e) {
		return this.drafts[e] ?? "";
	}
	set(e, t) {
		this.drafts = {
			...this.drafts,
			[e]: t
		}, this.schedule();
	}
	clear(e, t = !1) {
		let n = { ...this.drafts };
		delete n[e], this.drafts = n, t ? this.flush() : this.schedule();
	}
	rekey(e, t, n = !1) {
		if (e === t) return;
		let r = { ...this.drafts };
		r[e] !== void 0 && (r[t] = r[e], delete r[e]), this.drafts = r, n ? this.flush() : this.schedule();
	}
	schedule() {
		window.clearTimeout(this.timer), this.timer = window.setTimeout(() => this.flush(), this.delay);
	}
	flush() {
		window.clearTimeout(this.timer), this.timer = void 0, this.storage.setItem(this.key, JSON.stringify({
			...this.preferences(),
			...this.persistDrafts ? { drafts: this.drafts } : {}
		}));
	}
	cancel() {
		window.clearTimeout(this.timer), this.timer = void 0;
	}
	read() {
		try {
			return JSON.parse(this.storage.getItem(this.key) ?? "{}");
		} catch {
			return {};
		}
	}
}, Ps = class {
	changed;
	delay;
	generation = 0;
	timer;
	state = {
		query: "",
		results: [],
		pending: !1,
		error: !1
	};
	constructor(e, t = 200) {
		this.changed = e, this.delay = t;
	}
	update(e, t) {
		window.clearTimeout(this.timer);
		let n = ++this.generation;
		this.state.query = e;
		let r = e.trim();
		if (!r) {
			this.state.results = [], this.state.pending = !1, this.state.error = !1, this.changed();
			return;
		}
		this.state.results = [], this.state.pending = !0, this.state.error = !1, this.timer = window.setTimeout(() => void this.run(r, n, t), this.delay), this.changed();
	}
	clear() {
		this.update("", async () => []);
	}
	cancel() {
		++this.generation, window.clearTimeout(this.timer), this.timer = void 0;
	}
	async run(e, t, n) {
		try {
			let r = await n(e);
			if (t !== this.generation || !this.state.query.trim()) return;
			this.state.results = r, this.state.pending = !1, this.changed();
		} catch {
			if (t !== this.generation || !this.state.query.trim()) return;
			this.state.results = [], this.state.pending = !1, this.state.error = !0, this.changed();
		}
	}
}, Fs = class {
	turns = /* @__PURE__ */ new Map();
	get(e) {
		return e ? this.turns.get(e) : void 0;
	}
	start(e) {
		this.turns.set(e.conversationId, e);
	}
	isCurrent(e) {
		return this.turns.get(e.conversationId) === e;
	}
	finish(e) {
		return this.isCurrent(e) ? (e.terminal = !0, e.unsubscribe?.(), this.turns.delete(e.conversationId), !0) : !1;
	}
	clear() {
		this.turns.forEach((e) => e.unsubscribe?.()), this.turns.clear();
	}
	has(e) {
		return this.get(e) !== void 0;
	}
	get size() {
		return this.turns.size;
	}
	get conversationIds() {
		return [...this.turns.keys()];
	}
}, Is = h`
  :host {
    display: block;
    height: 100%;
    min-height: 0;
    min-width: 0;
  }
  .workspace {
    --aw-control-height: 40px;
    --aw-touch-target: 32px;
    --aw-touch-size: var(--aw-touch-target);
    --aw-radius-sm: 8px;
    --aw-radius-md: 12px;
    --aw-spacing-xs: 4px;
    --aw-spacing-sm: 8px;
    --aw-spacing-md: 12px;
    --aw-chat-max-width: 1080px;
    --aw-sidebar-width: 280px;
    --aw-motion-fast: 140ms;
    --aw-motion-panel-open: 160ms;
    --aw-motion-panel-close: 120ms;
    --aw-ease-panel: cubic-bezier(0.2, 0.8, 0.2, 1);
    --aw-json-key: #027c9b;
    --aw-json-string: #2e7d32;
    --aw-json-number: #b26a00;
    --aw-json-boolean: #7c4dff;
    --aw-json-null: #6b7280;
    position: relative;
    height: 100%;
    min-height: 360px;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    overflow: hidden;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    border-radius: var(--ha-card-border-radius, 12px);
  }
  .workspace-header {
    display: flex;
    gap: 8px;
    padding: 12px;
    border-bottom: 1px solid var(--divider-color);
    align-items: center;
    min-width: 0;
  }
  .workspace-header button {
    flex: 0 0 auto;
    min-width: var(--aw-touch-size, 32px);
    min-height: var(--aw-touch-size, 32px);
  }
  .workspace-header strong {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .agent {
    min-width: 0;
    margin-left: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--secondary-text-color);
  }
  .layout {
    min-height: 0;
    min-width: 0;
    display: grid;
    grid-template-columns: var(--aw-sidebar-width) minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    position: relative;
    overflow: hidden;
  }
  .layout-ready .layout {
    transition: grid-template-columns var(--aw-motion-panel-close)
      var(--aw-ease-panel);
  }
  .layout-ready .layout:has(assist-workspace-tool-inspector[open]) {
    transition-duration: var(--aw-motion-panel-open);
  }
  .sidebar-collapsed .layout {
    grid-template-columns: 0 minmax(0, 1fr);
  }
  .sidebar {
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    border-right: 1px solid var(--divider-color);
    opacity: 1;
    transform: translateX(0);
    transition:
      opacity 120ms ease,
      transform 140ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .sidebar-collapsed .sidebar {
    border-right-color: transparent;
    opacity: 0;
    transform: translateX(-8px);
  }
  main {
    min-height: 0;
    min-width: 0;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
  }
  .fullscreen {
    position: fixed;
    z-index: 1000;
    inset: 12px;
    height: auto;
    box-shadow: 0 12px 40px #0005;
  }
  .fullscreen main {
    grid-template-columns: minmax(0, var(--aw-chat-max-width));
    justify-content: center;
  }
  .wide .layout:has(assist-workspace-tool-inspector[open]) {
    grid-template-columns:
      var(--aw-sidebar-width) minmax(0, 1fr)
      35%;
  }
  .wide .layout {
    grid-template-columns: var(--aw-sidebar-width) minmax(0, 1fr) 0px;
  }
  .wide assist-workspace-tool-inspector[open] {
    position: static;
  }
  .wide.sidebar-collapsed .layout {
    grid-template-columns: 0 minmax(0, 1fr) 0px;
  }
  .wide.sidebar-collapsed .layout:has(assist-workspace-tool-inspector[open]) {
    grid-template-columns: 0 minmax(0, 1fr) 35%;
  }
  .medium assist-workspace-tool-inspector,
  .compact assist-workspace-tool-inspector {
    position: absolute;
    z-index: 3;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(440px, 92%);
    max-width: 100%;
  }
  .wide assist-workspace-tool-inspector:not([open]) {
    position: absolute;
    z-index: 3;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(440px, 92%);
  }
  .compact {
    --aw-touch-target: 42px;
    --aw-user-max: 90%;
  }
  .compact .agent {
    display: none;
  }
  .compact .layout {
    grid-template-columns: minmax(0, 1fr);
  }
  .compact .sidebar {
    position: absolute;
    z-index: 2;
    width: min(320px, 88%);
    height: 100%;
    background: var(--card-background-color);
    transform: translateX(-110%);
    opacity: 1;
    transition: transform 140ms cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: 10px 0 28px #0003;
  }
  .compact.sidebar-open .sidebar,
  .compact.sidebar-open.sidebar-collapsed .sidebar {
    transform: translateX(0);
  }
  .compact.sidebar-collapsed .sidebar {
    border-right-color: var(--divider-color);
    transform: translateX(-110%);
  }
  @media (prefers-reduced-motion: reduce) {
    .sidebar,
    .compact .sidebar,
    .layout,
    .layout-ready .layout {
      transition: none;
    }
  }
`, Ls = {
	open_last_conversation: !0,
	enter_sends: !0,
	confirm_delete: !0,
	keep_drafts: !0,
	default_sidebar_state: "expanded",
	show_assistant_name: !0,
	show_tool_activity: !0
};
function Rs(e, t) {
	return e?.[t] ?? Ls[t];
}
//#endregion
//#region src/assist-workspace-card.ts
var zs = "assist-workspace:ui", Bs = (e) => e < 700 ? "compact" : e < 1100 ? "medium" : "wide", Vs = class extends V {
	static properties = {
		hass: { attribute: !1 },
		config: { attribute: !1 }
	};
	cache = new Os();
	agents = [];
	turns = new Fs();
	search = new Ps(() => this.requestUpdate());
	sidebarCollapsed = !1;
	sidebarPreferenceExplicit = !1;
	sidebarOpen = !1;
	fullscreen = !1;
	draftStore;
	expandedToolGroups = /* @__PURE__ */ new Set();
	openConversationMenu = null;
	conversationMenuAnchor = null;
	renameDialogConversationId = null;
	renameDraft = "";
	deleteDialogConversationId = null;
	toolInspectorSelection = null;
	toolInspectorOpen = !1;
	inspectorRaf;
	toolInspectorTab = "request";
	turnNotices = /* @__PURE__ */ new Map();
	refreshGeneration = 0;
	selectionGeneration = 0;
	detailRequestGeneration = /* @__PURE__ */ new Map();
	detailLoadState = { kind: "idle" };
	initialLoadError = !1;
	initialLoadStarted = !1;
	knownConnection;
	layoutMode = "compact";
	layoutReady = !1;
	layoutObserver;
	api;
	static getConfigElement() {
		return document.createElement("assist-workspace-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:assist-workspace-card",
			agent_id: ""
		};
	}
	setConfig(e) {
		this.config = e, this.draftStore && this.draftStore.setPersistence(Rs(e, "keep_drafts")), Rs(e, "show_tool_activity") || this.closeToolInspector();
	}
	getGridOptions() {
		return {
			rows: 8,
			columns: 12,
			min_rows: 5,
			min_columns: 4
		};
	}
	connectedCallback() {
		let e = this.getBoundingClientRect().width;
		e > 0 && (this.layoutMode = Bs(e)), super.connectedCallback(), this.restoreLocalUi(), this.draftStore ??= new Ns(localStorage, zs, () => this.sidebarPreferenceExplicit ? { sidebarCollapsed: this.sidebarCollapsed } : {}, Rs(this.config, "keep_drafts")), this.addEventListener("keydown", this.onKeyDown), window.addEventListener("keydown", this.onKeyDown), typeof ResizeObserver < "u" && (this.layoutObserver = new ResizeObserver(([e]) => {
			let t = Bs(e.contentRect.width), n = t !== this.layoutMode;
			this.layoutMode = t, n && (this.openConversationMenu = null, this.conversationMenuAnchor = null), (!this.layoutReady || n) && (this.layoutReady = !0, this.requestUpdate());
		}), this.layoutObserver.observe(this)), this.ensureInitialLoad();
	}
	disconnectedCallback() {
		this.inspectorRaf !== void 0 && cancelAnimationFrame(this.inspectorRaf), this.turns.clear(), this.draftStore?.flush(), this.search.cancel(), this.layoutObserver?.disconnect(), this.removeEventListener("keydown", this.onKeyDown), window.removeEventListener("keydown", this.onKeyDown), super.disconnectedCallback();
	}
	onKeyDown = (e) => {
		if (e.key === "Escape") {
			if (this.renameDialogConversationId) this.renameDialogConversationId = null;
			else if (this.deleteDialogConversationId) this.deleteDialogConversationId = null;
			else if (this.openConversationMenu) this.openConversationMenu = null, this.conversationMenuAnchor = null;
			else if (this.toolInspectorSelection) this.closeToolInspector();
			else if (this.sidebarOpen) this.sidebarOpen = !1;
			else if (this.fullscreen) this.fullscreen = !1;
			else return;
			e.stopPropagation(), this.requestUpdate();
		}
	};
	closeConversationMenu = () => {
		this.openConversationMenu = null, this.conversationMenuAnchor = null, this.requestUpdate();
	};
	updated(e) {
		if (!(!e.has("hass") || !this.hass)) {
			if (this.api?.updateHass(this.hass), !this.initialLoadStarted) this.ensureInitialLoad();
			else if (this.knownConnection !== this.hass.connection) {
				let e = this.turns.conversationIds;
				this.turns.clear(), this.knownConnection = this.hass.connection, this.refreshServerData();
				for (let t of e) this.loadConversationDetail(t);
			}
		}
	}
	ensureInitialLoad() {
		!this.hass || this.initialLoadStarted || (this.initialLoadStarted = !0, this.knownConnection = this.hass.connection, this.api = new Ss(this.hass), this.refreshServerData());
	}
	get activeConversation() {
		return this.cache.activeDetail;
	}
	get draftKey() {
		return this.cache.activeId ?? "__new__";
	}
	get draft() {
		return this.draftStore?.get(this.draftKey) ?? "";
	}
	get agentId() {
		return this.activeConversation?.agent_id ?? this.config?.agent_id ?? "";
	}
	get runningForActiveConversation() {
		return this.cache.activeId ? this.turns.has(this.cache.activeId) : !1;
	}
	get effectiveLayoutMode() {
		return this.fullscreen ? Bs(document.documentElement.clientWidth - 24) : this.layoutMode;
	}
	get selectedTool() {
		let e = this.toolInspectorSelection;
		if (e) return this.cache.resolveTool(e.conversationId, e.messageId, e.toolId);
	}
	get timelineItems() {
		return this.activeConversation ? Aa(this.activeConversation.messages) : [];
	}
	restoreLocalUi() {
		try {
			let e = JSON.parse(localStorage.getItem(zs) ?? "{}");
			Object.prototype.hasOwnProperty.call(e, "sidebarCollapsed") ? (this.sidebarCollapsed = !!e.sidebarCollapsed, this.sidebarPreferenceExplicit = !0) : this.sidebarCollapsed = Rs(this.config, "default_sidebar_state") === "collapsed";
		} catch {}
	}
	async refreshServerData() {
		if (!this.api) return;
		let e = ++this.refreshGeneration, [t, n] = await Promise.allSettled([this.api.listConversations(), this.api.listAgents()]);
		if (e === this.refreshGeneration) {
			if (t.status === "fulfilled") {
				this.initialLoadError = !1;
				let e = t.value;
				this.cache.replaceSummaries(e, new Set(this.turns.conversationIds)), this.cache.activeId === void 0 && (this.cache.activeId = Rs(this.config, "open_last_conversation") ? this.cache.summaries[0]?.id ?? null : null), this.cache.activeId && !this.cache.activeDetail && this.loadConversationDetail(this.cache.activeId);
			} else this.cache.activeId === void 0 && (this.initialLoadError = !0);
			n.status === "fulfilled" && (this.agents = n.value), this.toolInspectorSelection && !this.selectedTool && this.closeToolInspector(), this.requestUpdate();
		}
	}
	agentName() {
		return this.agents.find((e) => e.id === this.agentId)?.name ?? (this.agentId || "Assist");
	}
	selectConversation = async (e) => {
		if (!this.api || e === this.cache.activeId) return;
		let t = this.cache.activeId;
		t && !this.cache.getDetail(t) && this.detailRequestGeneration.set(t, (this.detailRequestGeneration.get(t) ?? 0) + 1);
		let n = this.search.state.results.find((t) => t.conversation.id === e);
		n && !this.cache.getSummary(e) && this.cache.rename(n.conversation), ++this.selectionGeneration, this.initialLoadError = !1, this.detailLoadState = { kind: "idle" }, this.cache.activeId = e, this.sidebarOpen = !1, this.closeTransientUi(), this.requestUpdate(), this.cache.getDetail(e) || await this.loadConversationDetail(e);
	};
	async loadConversationDetail(e) {
		if (!this.api) return;
		let t = (this.detailRequestGeneration.get(e) ?? 0) + 1;
		this.detailRequestGeneration.set(e, t);
		let n = () => this.cache.activeId === e;
		n() && (this.detailLoadState = {
			kind: "loading",
			conversationId: e
		}, this.requestUpdate());
		try {
			let r = await this.api.getConversation(e);
			if (t !== this.detailRequestGeneration.get(e)) return;
			this.cache.setDetail(r), n() && (this.detailLoadState = { kind: "idle" });
		} catch {
			t === this.detailRequestGeneration.get(e) && n() && (this.detailLoadState = {
				kind: "error",
				conversationId: e
			});
		} finally {
			this.requestUpdate();
		}
	}
	retryDetail = () => {
		if (this.initialLoadError) {
			this.refreshServerData();
			return;
		}
		let e = this.cache.activeId;
		e && this.loadConversationDetail(e);
	};
	enterNewChat = () => {
		++this.selectionGeneration, this.cache.activeId && !this.cache.getDetail(this.cache.activeId) && this.detailRequestGeneration.set(this.cache.activeId, (this.detailRequestGeneration.get(this.cache.activeId) ?? 0) + 1), this.detailLoadState = { kind: "idle" }, this.initialLoadError = !1, this.cache.activeId = null, this.sidebarOpen = !1, this.closeTransientUi(), this.requestUpdate();
	};
	updateDraft = (e) => {
		this.draftStore?.set(this.draftKey, e.detail), this.requestUpdate();
	};
	updateSearch = (e) => {
		this.search.update(e.detail, (e) => this.api ? this.api.searchConversations(e) : Promise.resolve([]));
	};
	toggleSidebar = () => {
		this.closeConversationMenu(), this.sidebarCollapsed = !this.sidebarCollapsed, this.sidebarPreferenceExplicit = !0, this.draftStore?.flush(), this.requestUpdate();
	};
	openHistory = () => {
		if (this.closeConversationMenu(), this.effectiveLayoutMode === "compact") {
			this.sidebarOpen = !this.sidebarOpen, this.requestUpdate();
			return;
		}
		this.toggleSidebar();
	};
	toggleFullscreen = () => {
		this.closeConversationMenu(), this.fullscreen = !this.fullscreen, this.requestUpdate();
	};
	closeTransientUi() {
		this.openConversationMenu = null, this.conversationMenuAnchor = null, this.closeToolInspector(), this.renameDialogConversationId = null, this.deleteDialogConversationId = null;
	}
	reducedMotion() {
		return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	}
	openToolInspector(e) {
		this.inspectorRaf !== void 0 && cancelAnimationFrame(this.inspectorRaf);
		let t = this.toolInspectorOpen;
		if (this.toolInspectorSelection = e, t) {
			this.requestUpdate();
			return;
		}
		this.toolInspectorOpen = !1, this.requestUpdate(), this.updateComplete.then(() => {
			this.inspectorRaf = requestAnimationFrame(() => {
				this.inspectorRaf = void 0, this.toolInspectorSelection && (this.toolInspectorOpen = !0, this.requestUpdate());
			});
		});
	}
	closeToolInspector() {
		this.toolInspectorSelection && (this.inspectorRaf !== void 0 && cancelAnimationFrame(this.inspectorRaf), this.inspectorRaf = void 0, this.toolInspectorOpen = !1, this.reducedMotion() && (this.toolInspectorSelection = null), this.requestUpdate());
	}
	finalizeToolInspectorClose = () => {
		this.toolInspectorOpen || (this.toolInspectorSelection = null, this.requestUpdate());
	};
	groupKey(e, t) {
		return t.startsWith(`${e}:`) ? t : `${e}:${t}`;
	}
	toggleTools(e, t) {
		let n = this.groupKey(e, t), r = new Set(this.expandedToolGroups);
		r.has(n) ? r.delete(n) : r.add(n), this.expandedToolGroups = r, this.requestUpdate();
	}
	async send() {
		let e = this.draftKey, t = this.draft.trim();
		if (!this.api || !t || this.runningForActiveConversation || !this.agentId || this.cache.activeId !== null && (this.cache.activeId === void 0 || !this.activeConversation)) return;
		let n = this.activeConversation;
		if (!n) {
			let t = await this.api.createConversation(this.agentId);
			n = t, this.cache.setDetail(t), this.cache.activeId = t.id, this.draftStore?.rekey(e, t.id, !0);
		}
		let r = {
			id: Cs(),
			conversationId: n.id,
			terminal: !1,
			thinking: !1,
			visibleTextStarted: !1,
			toolsRunning: 0,
			submittedDraftKey: n.id
		};
		this.turns.start(r), this.turnNotices.delete(r.conversationId), this.requestUpdate();
		try {
			let e = await this.api.runTurn(r.conversationId, r.id, t, (e) => this.onTurnEvent(r, e));
			this.turns.isCurrent(r) && !r.terminal ? r.unsubscribe = e : e();
		} catch {
			this.turnNotices.set(r.conversationId, { kind: "failed" }), this.finishTurn(r);
		}
	}
	stop = () => {
		let e = this.cache.activeId ? this.turns.get(this.cache.activeId) : void 0;
		e && this.api?.cancelTurn(e.conversationId, e.id).catch(() => this.finishTurn(e));
	};
	finishTurn(e) {
		this.turns.finish(e) && this.requestUpdate();
	}
	onTurnEvent(e, t) {
		if (!t || e.terminal || t.turn_id !== e.id || t.conversation_id !== e.conversationId) return;
		let n = this.cache.getDetail(e.conversationId);
		if (!n) return;
		let r = Ms(n, e, t);
		Object.assign(e, r.turn), this.cache.applyTimeline(r.conversation, r.timelineChanged);
		let i = "summary" in t ? t.summary : void 0;
		i && this.cache.applySummary(i), (t.event === "turn_started" || t.event === "turn_completed" || t.event === "turn_failed" || t.event === "turn_stopped") && this.draftStore?.clear(e.submittedDraftKey ?? this.draftKey, !0), this.toolInspectorSelection && !this.selectedTool && this.closeToolInspector(), r.terminalOutcome === "completed" ? this.turnNotices.delete(e.conversationId) : r.terminalOutcome && this.turnNotices.set(e.conversationId, r.terminalOutcome), r.terminalOutcome ? this.finishTurn(e) : this.requestUpdate();
	}
	openRename(e) {
		this.renameDialogConversationId = e, this.renameDraft = this.cache.getSummary(e)?.title ?? "", this.openConversationMenu = null, this.requestUpdate();
	}
	async saveRename(e) {
		e.preventDefault();
		let t = this.renameDialogConversationId, n = this.renameDraft.trim();
		if (!this.api || !t || !n) return;
		let r = await this.api.renameConversation(t, n);
		this.cache.rename(r), this.renameDialogConversationId = null, this.requestUpdate();
	}
	async deleteConversation() {
		let e = this.deleteDialogConversationId;
		if (!this.api || !e) return;
		let t = this.cache.activeId === e;
		await this.api.deleteConversation(e), this.cache.delete(e), this.search.state.results = this.search.state.results.filter((t) => t.conversation.id !== e), this.turnNotices.delete(e);
		let n = this.turns.get(e);
		n && this.turns.finish(n), this.expandedToolGroups = new Set([...this.expandedToolGroups].filter((t) => !t.startsWith(`${e}:`))), this.draftStore?.clear(e, !0), this.toolInspectorSelection?.conversationId === e && this.closeToolInspector(), this.deleteDialogConversationId = null, this.detailRequestGeneration.set(e, (this.detailRequestGeneration.get(e) ?? 0) + 1), t && (this.detailLoadState = { kind: "idle" }, this.initialLoadError = !1), this.requestUpdate(), this.cache.activeId && !this.cache.activeDetail && this.loadConversationDetail(this.cache.activeId);
	}
	requestDelete(e) {
		e && (this.openConversationMenu = null, Rs(this.config, "confirm_delete") ? (this.deleteDialogConversationId = e, this.requestUpdate()) : (this.deleteDialogConversationId = e, this.deleteConversation()));
	}
	render() {
		let e = this.activeConversation, t = this.runningForActiveConversation, n = this.cache.activeId !== null && (this.cache.activeId === void 0 || !e);
		return R`<section
      class="workspace ${this.effectiveLayoutMode} ${this.layoutReady ? "layout-ready" : ""} ${this.sidebarCollapsed ? "sidebar-collapsed" : ""} ${this.fullscreen ? "fullscreen" : ""} ${this.sidebarOpen ? "sidebar-open" : ""}"
    >
      <header class="workspace-header">
        <button @click=${this.openHistory} aria-label="History">☰</button
        ><strong>Assist Workspace</strong>
        ${Rs(this.config, "show_assistant_name") ? R`<span class="agent" title=${this.agentId}
                >${this.agentName()}</span
              >` : z}
        <button
          @click=${this.toggleFullscreen}
          aria-label=${this.fullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          ${this.fullscreen ? "×" : "⛶"}
        </button>
      </header>
      <div class="layout">
        <aside class="sidebar">
          <assist-workspace-history
            .conversations=${this.cache.summaries}
            .searchHits=${this.search.state.results}
            .activeId=${this.cache.activeId ?? null}
            .query=${this.search.state.query}
            .searchPending=${this.search.state.pending}
            .searchError=${this.search.state.error}
            .runningIds=${new Set(this.cache.summaries.filter((e) => this.turns.has(e.id)).map((e) => e.id))}
            @new-chat=${this.enterNewChat}
            @search-changed=${this.updateSearch}
            @select-conversation=${(e) => void this.selectConversation(e.detail)}
            @menu-conversation=${(e) => {
			this.openConversationMenu = e.detail.id, this.conversationMenuAnchor = e.detail.anchor, this.requestUpdate();
		}}
          ></assist-workspace-history>
        </aside>
        <main>
          <assist-workspace-message-list
            .conversation=${e}
            .items=${this.timelineItems}
            .showToolActivity=${Rs(this.config, "show_tool_activity")}
            .loading=${this.cache.activeId != null && this.detailLoadState.kind === "loading" && this.detailLoadState.conversationId === this.cache.activeId}
            .loadError=${this.initialLoadError || this.cache.activeId != null && this.detailLoadState.kind === "error" && this.detailLoadState.conversationId === this.cache.activeId}
            @retry-load=${this.retryDetail}
            .expandedIds=${this.expandedToolGroups}
            .timelineRevision=${this.cache.getRevision(this.cache.activeId)}
            .turn=${this.cache.activeId ? this.turns.get(this.cache.activeId) : void 0}
            .turnNotice=${this.cache.activeId ? this.turnNotices.get(this.cache.activeId) : void 0}
            @tools-toggled=${(t) => e && this.toggleTools(e.id, t.detail)}
            @tool-selected=${(t) => {
			e && (this.openToolInspector({
				conversationId: e.id,
				messageId: t.detail.messageId,
				toolId: t.detail.tool.id
			}), this.toolInspectorTab = "request", this.requestUpdate());
		}}
          ></assist-workspace-message-list>
          <footer>
            <assist-workspace-composer
              .draft=${this.draft}
              .running=${t}
              .textareaDisabled=${!this.agentId || n}
              .canSend=${!!(this.draft.trim() && this.agentId && !t && !n)}
              .enterSends=${Rs(this.config, "enter_sends")}
              @draft-changed=${this.updateDraft}
              @send-requested=${() => void this.send()}
              @stop-requested=${this.stop}
            ></assist-workspace-composer>
          </footer>
        </main>
        ${this.toolInspectorSelection && this.selectedTool ? R`<assist-workspace-tool-inspector
                ?open=${this.toolInspectorOpen}
                .selection=${this.toolInspectorSelection}
                .tool=${this.selectedTool}
                .tab=${this.toolInspectorTab}
                @inspector-closed=${() => {
			this.closeToolInspector();
		}}
                @inspector-transition-ended=${this.finalizeToolInspectorClose}
                @inspector-tab=${(e) => {
			this.toolInspectorTab = e.detail, this.requestUpdate();
		}}
              ></assist-workspace-tool-inspector>` : z}
      </div>
      <assist-workspace-conversation-menu
        .open=${!!this.openConversationMenu}
        .anchor=${this.conversationMenuAnchor}
        @menu-closed=${this.closeConversationMenu}
        @menu-anchor-invalid=${this.closeConversationMenu}
        @rename-requested=${() => this.openConversationMenu && this.openRename(this.openConversationMenu)}
        @delete-requested=${() => this.requestDelete(this.openConversationMenu)}
      ></assist-workspace-conversation-menu>
      <assist-workspace-dialogs
        .renameOpen=${!!this.renameDialogConversationId}
        .deleteOpen=${!!this.deleteDialogConversationId}
        .title=${this.deleteDialogConversationId ? this.cache.getSummary(this.deleteDialogConversationId)?.title ?? "" : ""}
        .draft=${this.renameDraft}
        @rename-draft=${(e) => {
			this.renameDraft = e.detail, this.requestUpdate();
		}}
        @rename-confirmed=${() => void this.saveRename(new SubmitEvent("submit"))}
        @delete-confirmed=${() => void this.deleteConversation()}
        @dialogs-closed=${() => {
			this.renameDialogConversationId = null, this.deleteDialogConversationId = null, this.requestUpdate();
		}}
      ></assist-workspace-dialogs>
    </section>`;
	}
	static styles = Is;
};
customElements.get("assist-workspace-card") || customElements.define("assist-workspace-card", Vs), window.customCards = window.customCards || [], window.customCards.push({
	type: "assist-workspace-card",
	name: "Assist Workspace",
	description: "Durable chat workspace"
});
//#endregion
export { Vs as AssistWorkspaceCard };
