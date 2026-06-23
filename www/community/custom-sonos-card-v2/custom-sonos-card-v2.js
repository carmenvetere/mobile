/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, Z = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, B = Symbol(), K = /* @__PURE__ */ new WeakMap();
let _e = class {
  constructor(e, s, i) {
    if (this._$cssResult$ = !0, i !== B) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (Z && e === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (e = K.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && K.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const xe = (t) => new _e(typeof t == "string" ? t : t + "", void 0, B), fe = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((i, r, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[a + 1], t[0]);
  return new _e(s, t, B);
}, $e = (t, e) => {
  if (Z) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const i = document.createElement("style"), r = R.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = s.cssText, t.appendChild(i);
  }
}, X = Z ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const i of e.cssRules) s += i.cssText;
  return xe(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: we, defineProperty: Se, getOwnPropertyDescriptor: ke, getOwnPropertyNames: Ae, getOwnPropertySymbols: Ee, getPrototypeOf: Ce } = Object, b = globalThis, ee = b.trustedTypes, Pe = ee ? ee.emptyScript : "", D = b.reactiveElementPolyfillSupport, L = (t, e) => t, z = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Pe : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, Q = (t, e) => !we(t, e), te = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), b.litPropertyMetadata ?? (b.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = te) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, s);
      r !== void 0 && Se(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, s, i) {
    const { get: r, set: a } = ke(this.prototype, e) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: r, set(o) {
      const n = r == null ? void 0 : r.call(this);
      a == null || a.call(this, o), this.requestUpdate(e, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? te;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const e = Ce(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const s = this.properties, i = [...Ae(s), ...Ee(s)];
      for (const r of i) this.createProperty(r, s[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [i, r] of s) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const r = this._$Eu(s, i);
      r !== void 0 && this._$Eh.set(r, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) s.unshift(X(r));
    } else e !== void 0 && s.push(X(e));
    return s;
  }
  static _$Eu(e, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((s) => s(this));
  }
  addController(e) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var s;
    (s = this._$EO) == null || s.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $e(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostDisconnected) == null ? void 0 : i.call(s);
    });
  }
  attributeChangedCallback(e, s, i) {
    this._$AK(e, i);
  }
  _$ET(e, s) {
    var a;
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : z).toAttribute(s, i.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var a, o;
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), c = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((a = n.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? n.converter : z;
      this._$Em = r;
      const d = c.fromAttribute(s, n.type);
      this[r] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, s, i, r = !1, a) {
    var o;
    if (e !== void 0) {
      const n = this.constructor;
      if (r === !1 && (a = this[e]), i ?? (i = n.getPropertyOptions(e)), !((i.hasChanged ?? Q)(a, s) || i.useDefault && i.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: i, reflect: r, wrapped: a }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? s ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (s = void 0), this._$AL.set(e, s)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [a, o] of r) {
        const { wrapped: n } = o, c = this[a];
        n !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, o, c);
      }
    }
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((r) => {
        var a;
        return (a = r.hostUpdate) == null ? void 0 : a.call(r);
      }), this.update(s)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[L("elementProperties")] = /* @__PURE__ */ new Map(), k[L("finalized")] = /* @__PURE__ */ new Map(), D == null || D({ ReactiveElement: k }), (b.reactiveElementVersions ?? (b.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, se = (t) => t, j = M.trustedTypes, ie = j ? j.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ve = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, ge = "?" + m, Le = `<${ge}>`, S = document, O = () => S.createComment(""), V = (t) => t === null || typeof t != "object" && typeof t != "function", q = Array.isArray, Me = (t) => q(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, re = /-->/g, ae = />/g, x = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, ne = /"/g, ye = /^(?:script|style|textarea|title)$/i, Oe = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), l = Oe(1), E = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ce = /* @__PURE__ */ new WeakMap(), $ = S.createTreeWalker(S, 129);
function me(t, e) {
  if (!q(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ie !== void 0 ? ie.createHTML(e) : e;
}
const Ve = (t, e) => {
  const s = t.length - 1, i = [];
  let r, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = P;
  for (let n = 0; n < s; n++) {
    const c = t[n];
    let d, u, p = -1, g = 0;
    for (; g < c.length && (o.lastIndex = g, u = o.exec(c), u !== null); ) g = o.lastIndex, o === P ? u[1] === "!--" ? o = re : u[1] !== void 0 ? o = ae : u[2] !== void 0 ? (ye.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = x) : u[3] !== void 0 && (o = x) : o === x ? u[0] === ">" ? (o = r ?? P, p = -1) : u[1] === void 0 ? p = -2 : (p = o.lastIndex - u[2].length, d = u[1], o = u[3] === void 0 ? x : u[3] === '"' ? ne : oe) : o === ne || o === oe ? o = x : o === re || o === ae ? o = P : (o = x, r = void 0);
    const y = o === x && t[n + 1].startsWith("/>") ? " " : "";
    a += o === P ? c + Le : p >= 0 ? (i.push(d), c.slice(0, p) + ve + c.slice(p) + m + y) : c + m + (p === -2 ? n : y);
  }
  return [me(t, a + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class H {
  constructor({ strings: e, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let a = 0, o = 0;
    const n = e.length - 1, c = this.parts, [d, u] = Ve(e, s);
    if (this.el = H.createElement(d, i), $.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = $.nextNode()) !== null && c.length < n; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(ve)) {
          const g = u[o++], y = r.getAttribute(p).split(m), U = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: a, name: U[2], strings: y, ctor: U[1] === "." ? Te : U[1] === "?" ? Ne : U[1] === "@" ? Ue : I }), r.removeAttribute(p);
        } else p.startsWith(m) && (c.push({ type: 6, index: a }), r.removeAttribute(p));
        if (ye.test(r.tagName)) {
          const p = r.textContent.split(m), g = p.length - 1;
          if (g > 0) {
            r.textContent = j ? j.emptyScript : "";
            for (let y = 0; y < g; y++) r.append(p[y], O()), $.nextNode(), c.push({ type: 2, index: ++a });
            r.append(p[g], O());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ge) c.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(m, p + 1)) !== -1; ) c.push({ type: 7, index: a }), p += m.length - 1;
      }
      a++;
    }
  }
  static createElement(e, s) {
    const i = S.createElement("template");
    return i.innerHTML = e, i;
  }
}
function C(t, e, s = t, i) {
  var o, n;
  if (e === E) return e;
  let r = i !== void 0 ? (o = s._$Co) == null ? void 0 : o[i] : s._$Cl;
  const a = V(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== a && ((n = r == null ? void 0 : r._$AO) == null || n.call(r, !1), a === void 0 ? r = void 0 : (r = new a(t), r._$AT(t, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = r : s._$Cl = r), r !== void 0 && (e = C(t, r._$AS(t, e.values), r, i)), e;
}
class He {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: i } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? S).importNode(s, !0);
    $.currentNode = r;
    let a = $.nextNode(), o = 0, n = 0, c = i[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let d;
        c.type === 2 ? d = new N(a, a.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (d = new Re(a, this, e)), this._$AV.push(d), c = i[++n];
      }
      o !== (c == null ? void 0 : c.index) && (a = $.nextNode(), o++);
    }
    return $.currentNode = S, r;
  }
  p(e) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, s), s += i.strings.length - 2) : i._$AI(e[s])), s++;
  }
}
class N {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, s, i, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = C(this, e, s), V(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Me(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && V(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: s, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = H.createElement(me(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === r) this._$AH.p(s);
    else {
      const o = new He(r, this), n = o.u(this.options);
      o.p(s), this.T(n), this._$AH = o;
    }
  }
  _$AC(e) {
    let s = ce.get(e.strings);
    return s === void 0 && ce.set(e.strings, s = new H(e)), s;
  }
  k(e) {
    q(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const a of e) r === s.length ? s.push(i = new N(this.O(O()), this.O(O()), this, this.options)) : i = s[r], i._$AI(a), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); e !== this._$AB; ) {
      const r = se(e).nextSibling;
      se(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var s;
    this._$AM === void 0 && (this._$Cv = e, (s = this._$AP) == null || s.call(this, e));
  }
}
class I {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, i, r, a) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = s, this._$AM = r, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(e, s = this, i, r) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = C(this, e, s, 0), o = !V(e) || e !== this._$AH && e !== E, o && (this._$AH = e);
    else {
      const n = e;
      let c, d;
      for (e = a[0], c = 0; c < a.length - 1; c++) d = C(this, n[i + c], s, c), d === E && (d = this._$AH[c]), o || (o = !V(d) || d !== this._$AH[c]), d === h ? e = h : e !== h && (e += (d ?? "") + a[c + 1]), this._$AH[c] = d;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Te extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class Ne extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class Ue extends I {
  constructor(e, s, i, r, a) {
    super(e, s, i, r, a), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = C(this, e, s, 0) ?? h) === E) return;
    const i = this._$AH, r = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== h && (i === h || r);
    r && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Re {
  constructor(e, s, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    C(this, e);
  }
}
const F = M.litHtmlPolyfillSupport;
F == null || F(H, N), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
const ze = (t, e, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const a = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = r = new N(e.insertBefore(O(), a), a, void 0, s ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class A extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const e = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = e.firstChild), e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ze(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return E;
  }
}
var ue;
A._$litElement$ = !0, A.finalized = !0, (ue = w.litElementHydrateSupport) == null || ue.call(w, { LitElement: A });
const W = w.litElementPolyfillSupport;
W == null || W({ LitElement: A });
(w.litElementVersions ?? (w.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: Q }, Ie = (t = je, e, s) => {
  const { kind: i, metadata: r } = s;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(s.name, t), i === "accessor") {
    const { name: o } = s;
    return { set(n) {
      const c = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(o, c, t, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, t, n), n;
    } };
  }
  if (i === "setter") {
    const { name: o } = s;
    return function(n) {
      const c = this[o];
      e.call(this, n), this.requestUpdate(o, c, t, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Y(t) {
  return (e, s) => typeof s == "object" ? Ie(t, e, s) : ((i, r, a) => {
    const o = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function v(t) {
  return Y({ ...t, state: !0, attribute: !1 });
}
const De = fe`
  :host {
    /* Default dark theme - all overridable via card config */
    --csc-bg: var(--card-background-color, #1c1c1e);
    --csc-text: var(--primary-text-color, #e5e5ea);
    --csc-text-secondary: var(--secondary-text-color, #8e8e93);
    --csc-accent: var(--csc-accent-color, #5856d6);
    --csc-surface: var(--csc-surface-color, rgba(255, 255, 255, 0.08));
    --csc-surface-hover: var(--csc-surface-hover-color, rgba(255, 255, 255, 0.14));
    --csc-surface-active: var(--csc-surface-active-color, rgba(255, 255, 255, 0.18));
    --csc-border: var(--csc-border-color, rgba(255, 255, 255, 0.1));
    --csc-radius: var(--ha-card-border-radius, 12px);
    --csc-btn-radius: var(--csc-button-border-radius, 8px);
    --csc-font: var(--csc-font-family, inherit);
    --csc-header-bg: var(--csc-header-color, rgba(255, 255, 255, 0.05));
    --csc-slider-bg: rgba(255, 255, 255, 0.2);
    --csc-slider-fill: var(--csc-accent);
    --csc-btn-size: 44px;

    display: block;
    font-family: var(--csc-font);
    color: var(--csc-text);
    background: var(--csc-bg);
    border-radius: var(--csc-radius);
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 400px;
  }

  /* === HEADER / SPEAKER SELECTOR === */
  .speaker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: var(--csc-header-bg);
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    border-bottom: 1px solid var(--csc-border);
    min-height: 48px;
    box-sizing: border-box;
  }

  .speaker-header:active {
    background: var(--csc-surface-active);
  }

  .speaker-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;
  }

  .speaker-header-name {
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .speaker-header-meta {
    font-size: 12px;
    color: var(--csc-text-secondary);
  }

  .chevron-icon {
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .chevron-icon.open {
    transform: rotate(180deg);
  }

  /* === DROPDOWN === */
  .speaker-dropdown {
    background: var(--csc-header-bg);
    border-bottom: 1px solid var(--csc-border);
    max-height: 0;
    overflow-y: auto;
    transition: max-height 0.3s ease;
  }

  .speaker-dropdown.open {
    max-height: 60vh;
  }

  .dropdown-section-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--csc-text-secondary);
    padding: 12px 16px 4px;
  }

  .group-row,
  .speaker-row {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    gap: 12px;
  }

  .group-row:active,
  .speaker-row:active {
    background: var(--csc-surface-active);
  }

  .group-row.selected,
  .speaker-row.selected {
    background: var(--csc-surface);
  }

  .group-row-info,
  .speaker-row-info {
    flex: 1;
    min-width: 0;
  }

  .group-row-name,
  .speaker-row-name {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .group-row-meta {
    font-size: 12px;
    color: var(--csc-text-secondary);
  }

  .radio-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--csc-text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .radio-dot.selected {
    border-color: var(--csc-accent);
  }

  .radio-dot.selected::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--csc-accent);
  }

  /* Speaker volume in dropdown */
  .speaker-volume-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 16px 12px 48px;
  }

  /* === PLAYER === */
  .player-section {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .album-art {
    width: 100%;
    max-width: 200px;
    aspect-ratio: 1;
    border-radius: var(--csc-btn-radius);
    background: var(--csc-surface);
    object-fit: cover;
    display: block;
  }

  .album-art-placeholder {
    width: 100%;
    max-width: 200px;
    aspect-ratio: 1;
    border-radius: var(--csc-btn-radius);
    background: var(--csc-surface);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .track-info {
    text-align: center;
    width: 100%;
  }

  .track-title {
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .track-artist {
    font-size: 13px;
    color: var(--csc-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2px;
  }

  /* Transport controls */
  .transport-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .transport-btn {
    width: var(--csc-btn-size);
    height: var(--csc-btn-size);
    border: none;
    background: none;
    color: var(--csc-text);
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
    padding: 0;
    transition: background 0.15s ease;
  }

  .transport-btn:active {
    background: var(--csc-surface-active);
  }

  .transport-btn.play-pause {
    width: 56px;
    height: 56px;
    background: var(--csc-accent);
    color: #fff;
  }

  .transport-btn.play-pause:active {
    opacity: 0.8;
  }

  .secondary-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .secondary-btn {
    width: 36px;
    height: 36px;
    border: none;
    background: none;
    color: var(--csc-text-secondary);
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
    padding: 0;
  }

  .secondary-btn.active {
    color: var(--csc-accent);
  }

  .secondary-btn:active {
    background: var(--csc-surface-active);
  }

  /* Volume row */
  .volume-row {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    max-width: 320px;
  }

  .vol-btn {
    width: var(--csc-btn-size);
    height: var(--csc-btn-size);
    min-width: var(--csc-btn-size);
    border: none;
    background: var(--csc-surface);
    color: var(--csc-text);
    cursor: pointer;
    border-radius: var(--csc-btn-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
    padding: 0;
    font-size: 20px;
    transition: background 0.1s ease;
  }

  .vol-btn:active {
    background: var(--csc-surface-active);
  }

  .volume-slider-container {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
    height: 36px;
  }

  .volume-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: var(--csc-slider-bg);
    outline: none;
    cursor: pointer;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--csc-accent);
    cursor: pointer;
    border: 2px solid var(--csc-bg);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .volume-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--csc-accent);
    cursor: pointer;
    border: 2px solid var(--csc-bg);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .volume-label {
    font-size: 12px;
    color: var(--csc-text-secondary);
    min-width: 28px;
    text-align: center;
  }

  /* === TABS === */
  .tab-bar {
    display: flex;
    border-bottom: 1px solid var(--csc-border);
    border-top: 1px solid var(--csc-border);
  }

  .tab-btn {
    flex: 1;
    padding: 10px 16px;
    border: none;
    background: none;
    color: var(--csc-text-secondary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    border-bottom: 2px solid transparent;
    font-family: var(--csc-font);
    transition: color 0.15s, border-color 0.15s;
  }

  .tab-btn.active {
    color: var(--csc-accent);
    border-bottom-color: var(--csc-accent);
  }

  .tab-btn:active {
    background: var(--csc-surface-active);
  }

  /* === CONTENT AREA === */
  .tab-content {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* === FAVORITES === */
  .favorites-section {
    padding: 8px 0;
  }

  .category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  .category-header:active {
    background: var(--csc-surface-active);
  }

  .category-title {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--csc-text-secondary);
  }

  .category-items {
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .category-items.collapsed {
    max-height: 0 !important;
  }

  .favorite-btn {
    display: flex;
    align-items: center;
    width: calc(100% - 24px);
    margin: 4px 12px;
    padding: 14px 16px;
    border: none;
    background: var(--csc-surface);
    color: var(--csc-text);
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    border-radius: var(--csc-btn-radius);
    -webkit-tap-highlight-color: transparent;
    text-align: left;
    font-family: var(--csc-font);
    transition: background 0.1s ease;
    gap: 12px;
    min-height: 52px;
    box-sizing: border-box;
  }

  .favorite-btn:active {
    background: var(--csc-surface-active);
  }

  .favorite-btn-thumb {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    object-fit: cover;
    flex-shrink: 0;
    background: var(--csc-surface);
  }

  .favorite-btn-text {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* === SEARCH === */
  .search-section {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    box-sizing: border-box;
  }

  .search-input-row {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--csc-surface);
    border-radius: var(--csc-btn-radius);
    padding: 0 12px;
  }

  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--csc-text);
    font-size: 15px;
    padding: 12px 0;
    outline: none;
    font-family: var(--csc-font);
  }

  .search-input::placeholder {
    color: var(--csc-text-secondary);
  }

  .search-clear-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: none;
    color: var(--csc-text-secondary);
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .filter-chips {
    display: flex;
    gap: 8px;
  }

  .filter-chip {
    padding: 6px 14px;
    border: 1px solid var(--csc-border);
    background: transparent;
    color: var(--csc-text-secondary);
    font-size: 13px;
    font-weight: 500;
    border-radius: 16px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--csc-font);
    transition: all 0.15s ease;
  }

  .filter-chip.active {
    background: var(--csc-accent);
    border-color: var(--csc-accent);
    color: #fff;
  }

  .filter-chip:active {
    background: var(--csc-surface-active);
  }

  .search-results {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .search-result-btn {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    border: none;
    background: var(--csc-surface);
    color: var(--csc-text);
    cursor: pointer;
    border-radius: var(--csc-btn-radius);
    -webkit-tap-highlight-color: transparent;
    text-align: left;
    font-family: var(--csc-font);
    gap: 12px;
    margin-bottom: 6px;
    min-height: 52px;
    box-sizing: border-box;
    transition: background 0.1s ease;
  }

  .search-result-btn:active {
    background: var(--csc-surface-active);
  }

  .search-result-thumb {
    width: 44px;
    height: 44px;
    border-radius: 4px;
    object-fit: cover;
    flex-shrink: 0;
    background: var(--csc-surface-hover);
  }

  .search-result-info {
    flex: 1;
    min-width: 0;
  }

  .search-result-title {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .search-result-subtitle {
    font-size: 12px;
    color: var(--csc-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2px;
  }

  .search-empty {
    text-align: center;
    color: var(--csc-text-secondary);
    font-size: 14px;
    padding: 40px 16px;
  }

  .search-loading {
    text-align: center;
    color: var(--csc-text-secondary);
    font-size: 14px;
    padding: 40px 16px;
  }

  /* === SVG ICONS === */
  svg {
    display: block;
  }

  /* === LANDSCAPE / WIDE LAYOUT === */
  @media (min-width: 600px) {
    .card-container.wide-layout {
      flex-direction: column;
    }

    .card-container.wide-layout .main-content {
      display: flex;
      flex-direction: row;
      flex: 1;
      overflow: hidden;
    }

    .card-container.wide-layout .player-section {
      flex: 0 0 40%;
      max-width: 360px;
      border-right: 1px solid var(--csc-border);
      justify-content: center;
    }

    .card-container.wide-layout .right-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .card-container.wide-layout .tab-content {
      flex: 1;
      overflow-y: auto;
    }
  }

  /* === IDLE STATE === */
  .idle-message {
    text-align: center;
    color: var(--csc-text-secondary);
    padding: 24px 16px;
    font-size: 14px;
  }

  /* Grouping controls */
  .grouping-controls {
    padding: 8px 16px 12px;
    display: flex;
    gap: 8px;
  }

  .grouping-btn {
    padding: 6px 14px;
    border: 1px solid var(--csc-border);
    background: transparent;
    color: var(--csc-text-secondary);
    font-size: 12px;
    font-weight: 500;
    border-radius: 16px;
    cursor: pointer;
    font-family: var(--csc-font);
    -webkit-tap-highlight-color: transparent;
  }

  .grouping-btn:active {
    background: var(--csc-surface-active);
  }

  .grouping-btn.primary {
    background: var(--csc-accent);
    border-color: var(--csc-accent);
    color: #fff;
  }

  .speaker-checkbox {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid var(--csc-text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .speaker-checkbox.checked {
    border-color: var(--csc-accent);
    background: var(--csc-accent);
  }

  .speaker-checkbox.checked::after {
    content: '';
    width: 6px;
    height: 10px;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
    margin-top: -2px;
  }
`;
class Ge {
  constructor(e) {
    this.hass = e;
  }
  async play(e) {
    await this.hass.callService("media_player", "media_play", {
      entity_id: e
    });
  }
  async pause(e) {
    await this.hass.callService("media_player", "media_pause", {
      entity_id: e
    });
  }
  async playPause(e) {
    await this.hass.callService("media_player", "media_play_pause", {
      entity_id: e
    });
  }
  async nextTrack(e) {
    await this.hass.callService("media_player", "media_next_track", {
      entity_id: e
    });
  }
  async prevTrack(e) {
    await this.hass.callService("media_player", "media_previous_track", {
      entity_id: e
    });
  }
  async setVolume(e, s) {
    const i = Math.max(0, Math.min(1, s));
    await this.hass.callService("media_player", "volume_set", {
      entity_id: e,
      volume_level: i
    });
  }
  async volumeUp(e, s) {
    const i = this.hass.states[e];
    if (!i) return;
    const r = i.attributes.volume_level ?? 0;
    await this.setVolume(e, r + s / 100);
  }
  async volumeDown(e, s) {
    const i = this.hass.states[e];
    if (!i) return;
    const r = i.attributes.volume_level ?? 0;
    await this.setVolume(e, r - s / 100);
  }
  async mute(e, s) {
    await this.hass.callService("media_player", "volume_mute", {
      entity_id: e,
      is_volume_muted: s
    });
  }
  async setShuffle(e, s) {
    await this.hass.callService("media_player", "shuffle_set", {
      entity_id: e,
      shuffle: s
    });
  }
  async setRepeat(e, s) {
    await this.hass.callService("media_player", "repeat_set", {
      entity_id: e,
      repeat: s
    });
  }
  async playMedia(e, s, i = "music") {
    await this.hass.callService("media_player", "play_media", {
      entity_id: e,
      media_content_id: s,
      media_content_type: i
    });
  }
  async joinGroup(e, s) {
    await this.hass.callService("media_player", "join", {
      entity_id: e,
      group_members: s
    });
  }
  async unjoinGroup(e) {
    await this.hass.callService("media_player", "unjoin", {
      entity_id: e
    });
  }
  async unjoinAll(e) {
    for (const s of e)
      await this.hass.callService("media_player", "unjoin", {
        entity_id: s
      });
  }
}
class Fe {
  constructor(e, s) {
    this.hass = e, this.spotifyEntityId = s;
  }
  async search(e, s = "track") {
    if (!e.trim()) return [];
    try {
      const i = await this.hass.callWS({
        type: "media_player/browse_media",
        entity_id: this.spotifyEntityId,
        media_content_type: "spotify://library/tracks",
        media_content_id: ""
      });
      return await this._searchCategory(e, s);
    } catch {
      return console.warn("Spotify browse_media search failed, trying alternative method"), await this._searchViaService(e, s);
    }
  }
  async _searchCategory(e, s) {
    const i = {
      track: "spotify://current_user_recently_played",
      album: "spotify://new_releases",
      playlist: "spotify://featured_playlists"
    };
    try {
      const r = await this.hass.callWS({
        type: "media_player/browse_media",
        entity_id: this.spotifyEntityId,
        media_content_type: i[s] || "spotify://current_user_recently_played",
        media_content_id: ""
      });
      if (r != null && r.children) {
        const a = r.children, o = e.toLowerCase();
        return a.filter(
          (n) => {
            var c, d;
            return ((c = n.title) == null ? void 0 : c.toLowerCase().includes(o)) || ((d = n.media_content_id) == null ? void 0 : d.toLowerCase().includes(o));
          }
        ).map((n) => ({
          title: n.title || "Unknown",
          subtitle: n.media_content_type || s,
          thumbnail: n.thumbnail,
          media_content_id: n.media_content_id,
          media_content_type: n.media_content_type,
          can_play: n.can_play ?? !0
        }));
      }
    } catch {
    }
    return [];
  }
  async _searchViaService(e, s) {
    try {
      const i = await this.hass.callWS({
        type: "execute_script",
        sequence: [
          {
            service: "spotifyplus.search_tracks",
            data: {
              entity_id: this.spotifyEntityId,
              criteria: e,
              limit: 20
            }
          }
        ]
      });
      if (i != null && i.result)
        return i.result.map((r) => {
          var a, o, n, c;
          return {
            title: r.name || "Unknown",
            subtitle: ((a = r.artists) == null ? void 0 : a.map((d) => d.name).join(", ")) || "",
            thumbnail: (c = (n = (o = r.album) == null ? void 0 : o.images) == null ? void 0 : n[0]) == null ? void 0 : c.url,
            media_content_id: r.uri,
            media_content_type: "music",
            can_play: !0
          };
        });
    } catch {
    }
    return [];
  }
  async browse(e, s = "") {
    try {
      const i = await this.hass.callWS({
        type: "media_player/browse_media",
        entity_id: this.spotifyEntityId,
        media_content_type: e,
        media_content_id: s
      });
      if (i != null && i.children)
        return i.children.map((r) => ({
          title: r.title || "Unknown",
          subtitle: r.media_content_type || "",
          thumbnail: r.thumbnail,
          media_content_id: r.media_content_id,
          media_content_type: r.media_content_type,
          can_play: r.can_play ?? !0,
          children_media_class: r.children_media_class
        }));
    } catch (i) {
      console.warn("Spotify browse failed:", i);
    }
    return [];
  }
}
const We = "M8,5.14V19.14L19,12.14L8,5.14Z", Ze = "M14,19H18V5H14M6,19H10V5H6V19Z", Be = "M16,18H18V6H16M6,18L14.5,12L6,6V18Z", Qe = "M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z", le = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z", de = "M19,13H5V11H19V13Z", qe = "M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z", Ye = "M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z", Je = "M13,15V9H12L10,10V11H11.5V15M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z", he = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z", Ke = "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z", pe = "M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z", Xe = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", et = "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z", tt = "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z", st = 5;
var it = Object.defineProperty, rt = Object.getOwnPropertyDescriptor, f = (t, e, s, i) => {
  for (var r = i > 1 ? void 0 : i ? rt(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (r = (i ? o(e, s, r) : o(r)) || r);
  return i && r && it(e, s, r), r;
};
let _ = class extends A {
  constructor() {
    super(...arguments), this._dropdownOpen = !1, this._activeTab = "favorites", this._selectedEntity = "", this._collapsedCategories = /* @__PURE__ */ new Set(), this._searchQuery = "", this._searchFilter = "track", this._searchResults = [], this._searchLoading = !1, this._groupingMode = !1, this._groupingSelection = /* @__PURE__ */ new Set();
  }
  setConfig(t) {
    if (!t.entity)
      throw new Error("Please define an entity");
    this._config = t, this._selectedEntity = t.entity, t.background_color && this.style.setProperty("--csc-bg", t.background_color), t.accent_color && this.style.setProperty("--csc-accent-color", t.accent_color), t.text_color && this.style.setProperty("--csc-text", t.text_color), t.button_color && this.style.setProperty("--csc-surface-color", t.button_color), t.button_text_color && this.style.setProperty("--csc-text", t.button_text_color), t.button_border_radius && this.style.setProperty("--csc-button-border-radius", t.button_border_radius), t.card_border_radius && this.style.setProperty("--ha-card-border-radius", t.card_border_radius), t.header_color && this.style.setProperty("--csc-header-color", t.header_color), t.font_family && this.style.setProperty("--csc-font-family", t.font_family);
  }
  getCardSize() {
    return 8;
  }
  updated(t) {
    var e;
    super.updated(t), t.has("hass") && this.hass && (this._mediaService = new Ge(this.hass), (e = this._config) != null && e.spotify_entity && (this._spotifyService = new Fe(this.hass, this._config.spotify_entity)));
  }
  // --- Helpers ---
  get _activeEntity() {
    var t;
    return this._selectedEntity || ((t = this._config) == null ? void 0 : t.entity) || "";
  }
  get _playerState() {
    var t;
    return (t = this.hass) == null ? void 0 : t.states[this._activeEntity];
  }
  get _isPlaying() {
    var t;
    return ((t = this._playerState) == null ? void 0 : t.state) === "playing";
  }
  get _isPaused() {
    var t;
    return ((t = this._playerState) == null ? void 0 : t.state) === "paused";
  }
  get _isIdle() {
    var e;
    const t = (e = this._playerState) == null ? void 0 : e.state;
    return !t || t === "idle" || t === "off" || t === "unavailable";
  }
  get _volumePercent() {
    var t;
    return Math.round((((t = this._playerState) == null ? void 0 : t.attributes.volume_level) ?? 0) * 100);
  }
  get _volumeStep() {
    var t;
    return ((t = this._config) == null ? void 0 : t.volume_step) ?? st;
  }
  _speakerName(t) {
    var i, r, a;
    const e = (r = (i = this._config) == null ? void 0 : i.speakers) == null ? void 0 : r.find((o) => o.entity === t);
    if (e) return e.name;
    const s = (a = this.hass) == null ? void 0 : a.states[t];
    return (s == null ? void 0 : s.attributes.friendly_name) || t.split(".").pop() || t;
  }
  _selectedDisplayName() {
    const t = this._findActiveGroup();
    return t ? t.name : this._speakerName(this._activeEntity);
  }
  _findActiveGroup() {
    var e, s;
    if (!((e = this._config) != null && e.groups)) return;
    const t = (s = this._playerState) == null ? void 0 : s.attributes.group_members;
    if (!(!t || t.length <= 1))
      return this._config.groups.find((i) => i.entities.length !== t.length ? !1 : i.entities.every((r) => t.includes(r)));
  }
  _allSpeakerEntities() {
    var t, e;
    return (t = this._config) != null && t.speakers ? this._config.speakers.map((s) => s.entity) : Object.keys(((e = this.hass) == null ? void 0 : e.states) || {}).filter(
      (s) => {
        var i;
        return s.startsWith("media_player.") && (((i = this.hass.states[s].attributes.friendly_name) == null ? void 0 : i.toLowerCase().includes("sonos")) || s.includes("sonos"));
      }
    );
  }
  // --- SVG helper ---
  _svgIcon(t, e = 24) {
    return l`<svg viewBox="0 0 24 24" width="${e}" height="${e}">
      <path fill="currentColor" d="${t}" />
    </svg>`;
  }
  // --- Event handlers ---
  _toggleDropdown() {
    this._dropdownOpen = !this._dropdownOpen, this._dropdownOpen || (this._groupingMode = !1);
  }
  _selectSpeaker(t) {
    this._selectedEntity = t, this._dropdownOpen = !1, this._groupingMode = !1;
  }
  async _selectGroup(t) {
    const e = t.entities[0];
    e && (this._selectedEntity = e, await this._mediaService.unjoinAll(t.entities), await new Promise((s) => setTimeout(s, 300)), await this._mediaService.joinGroup(e, t.entities), this._dropdownOpen = !1);
  }
  async _handlePlayPause() {
    await this._mediaService.playPause(this._activeEntity);
  }
  async _handleNext() {
    await this._mediaService.nextTrack(this._activeEntity);
  }
  async _handlePrev() {
    await this._mediaService.prevTrack(this._activeEntity);
  }
  async _handleVolumeUp(t) {
    await this._mediaService.volumeUp(t || this._activeEntity, this._volumeStep);
  }
  async _handleVolumeDown(t) {
    await this._mediaService.volumeDown(t || this._activeEntity, this._volumeStep);
  }
  async _handleVolumeChange(t, e) {
    const s = parseFloat(t.target.value);
    await this._mediaService.setVolume(e || this._activeEntity, s / 100);
  }
  async _handleMuteToggle(t) {
    const e = t || this._activeEntity, s = this.hass.states[e], i = (s == null ? void 0 : s.attributes.is_volume_muted) ?? !1;
    await this._mediaService.mute(e, !i);
  }
  async _handleShuffle() {
    var e;
    const t = ((e = this._playerState) == null ? void 0 : e.attributes.shuffle) ?? !1;
    await this._mediaService.setShuffle(this._activeEntity, !t);
  }
  async _handleRepeat() {
    var s;
    const t = ((s = this._playerState) == null ? void 0 : s.attributes.repeat) ?? "off", e = t === "off" ? "all" : t === "all" ? "one" : "off";
    await this._mediaService.setRepeat(this._activeEntity, e);
  }
  async _handleFavoritePlay(t, e) {
    await this._mediaService.playMedia(
      this._activeEntity,
      t,
      e || "music"
    );
  }
  _toggleCategory(t) {
    const e = new Set(this._collapsedCategories);
    e.has(t) ? e.delete(t) : e.add(t), this._collapsedCategories = e;
  }
  _setTab(t) {
    this._activeTab = t;
  }
  _handleSearchInput(t) {
    this._searchQuery = t.target.value, this._searchTimeout && clearTimeout(this._searchTimeout), this._searchTimeout = setTimeout(() => this._doSearch(), 400);
  }
  _clearSearch() {
    this._searchQuery = "", this._searchResults = [];
  }
  _setSearchFilter(t) {
    this._searchFilter = t, this._searchQuery && this._doSearch();
  }
  async _doSearch() {
    if (!this._spotifyService || !this._searchQuery.trim()) {
      this._searchResults = [];
      return;
    }
    this._searchLoading = !0;
    try {
      this._searchResults = await this._spotifyService.search(
        this._searchQuery,
        this._searchFilter
      );
    } catch (t) {
      console.error("Search failed:", t), this._searchResults = [];
    }
    this._searchLoading = !1;
  }
  async _handleSearchResultPlay(t) {
    await this._mediaService.playMedia(
      this._activeEntity,
      t.media_content_id,
      t.media_content_type
    );
  }
  _toggleGroupingMode() {
    var t;
    if (this._groupingMode = !this._groupingMode, this._groupingMode) {
      const e = ((t = this._playerState) == null ? void 0 : t.attributes.group_members) || [this._activeEntity];
      this._groupingSelection = new Set(e);
    } else
      this._groupingSelection = /* @__PURE__ */ new Set();
  }
  _toggleGroupingSpeaker(t) {
    const e = new Set(this._groupingSelection);
    e.has(t) ? e.size > 1 && e.delete(t) : e.add(t), this._groupingSelection = e;
  }
  async _applyGrouping() {
    const t = Array.from(this._groupingSelection);
    if (t.length === 0) return;
    const e = t[0], s = this._allSpeakerEntities();
    await this._mediaService.unjoinAll(s), await new Promise((i) => setTimeout(i, 300)), t.length > 1 && await this._mediaService.joinGroup(e, t), this._selectedEntity = e, this._groupingMode = !1, this._dropdownOpen = !1;
  }
  // --- Render ---
  render() {
    if (!this._config || !this.hass)
      return l`<div>Loading...</div>`;
    const t = (this.offsetWidth || 600) >= 600;
    return l`
      <div class="card-container ${t ? "wide-layout" : ""}">
        ${this._renderHeader()}
        ${this._renderDropdown()}
        <div class="main-content">
          ${this._renderPlayer()}
          <div class="right-panel">
            ${this._renderTabs()}
            <div class="tab-content">
              ${this._activeTab === "favorites" ? this._renderFavorites() : this._renderSearch()}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  _renderHeader() {
    var i;
    const t = (i = this._playerState) == null ? void 0 : i.attributes.group_members, e = (t == null ? void 0 : t.length) || 1, s = this._selectedDisplayName();
    return l`
      <div class="speaker-header" @click=${this._toggleDropdown}>
        <div class="speaker-header-left">
          <span class="speaker-header-name">${s}</span>
          ${e > 1 ? l`<span class="speaker-header-meta">${e} speakers</span>` : h}
        </div>
        <span class="chevron-icon ${this._dropdownOpen ? "open" : ""}">
          ${this._svgIcon(he, 20)}
        </span>
      </div>
    `;
  }
  _renderDropdown() {
    var t;
    return l`
      <div class="speaker-dropdown ${this._dropdownOpen ? "open" : ""}">
        ${(t = this._config.groups) != null && t.length ? l`
              <div class="dropdown-section-title">Groups</div>
              ${this._config.groups.map((e) => this._renderGroupRow(e))}
            ` : h}

        <div class="dropdown-section-title">Speakers</div>
        ${this._groupingMode ? this._renderGroupingControls() : h}
        ${this._allSpeakerEntities().map((e) => this._renderSpeakerRow(e))}

        ${this._groupingMode ? h : l`
              <div class="grouping-controls">
                <button class="grouping-btn" @click=${this._toggleGroupingMode}>
                  Group speakers...
                </button>
              </div>
            `}
      </div>
    `;
  }
  _renderGroupRow(t) {
    const e = this._findActiveGroup(), s = (e == null ? void 0 : e.name) === t.name;
    return l`
      <div
        class="group-row ${s ? "selected" : ""}"
        @click=${() => this._selectGroup(t)}
      >
        <div class="radio-dot ${s ? "selected" : ""}"></div>
        <div class="group-row-info">
          <div class="group-row-name">${t.name}</div>
          <div class="group-row-meta">${t.entities.length} speakers</div>
        </div>
      </div>
    `;
  }
  _renderSpeakerRow(t) {
    const e = this._activeEntity === t, s = this.hass.states[t], i = Math.round(((s == null ? void 0 : s.attributes.volume_level) ?? 0) * 100);
    if (this._groupingMode) {
      const r = this._groupingSelection.has(t);
      return l`
        <div
          class="speaker-row"
          @click=${() => this._toggleGroupingSpeaker(t)}
        >
          <div class="speaker-checkbox ${r ? "checked" : ""}"></div>
          <div class="speaker-row-info">
            <div class="speaker-row-name">${this._speakerName(t)}</div>
          </div>
        </div>
      `;
    }
    return l`
      <div
        class="speaker-row ${e ? "selected" : ""}"
        @click=${() => this._selectSpeaker(t)}
      >
        <div class="radio-dot ${e ? "selected" : ""}"></div>
        <div class="speaker-row-info">
          <div class="speaker-row-name">${this._speakerName(t)}</div>
        </div>
      </div>
      <div class="speaker-volume-row">
        <button class="vol-btn" @click=${(r) => {
      r.stopPropagation(), this._handleVolumeDown(t);
    }}>
          ${this._svgIcon(de, 18)}
        </button>
        <div class="volume-slider-container">
          <input
            type="range"
            class="volume-slider"
            min="0"
            max="100"
            .value=${String(i)}
            @change=${(r) => this._handleVolumeChange(r, t)}
            @click=${(r) => r.stopPropagation()}
          />
        </div>
        <span class="volume-label">${i}</span>
        <button class="vol-btn" @click=${(r) => {
      r.stopPropagation(), this._handleVolumeUp(t);
    }}>
          ${this._svgIcon(le, 18)}
        </button>
      </div>
    `;
  }
  _renderGroupingControls() {
    return l`
      <div class="grouping-controls">
        <button class="grouping-btn primary" @click=${this._applyGrouping}>
          Apply Group (${this._groupingSelection.size})
        </button>
        <button class="grouping-btn" @click=${this._toggleGroupingMode}>Cancel</button>
      </div>
    `;
  }
  _renderPlayer() {
    var d;
    const t = (d = this._playerState) == null ? void 0 : d.attributes, e = t != null && t.entity_picture ? t.entity_picture : void 0, s = (t == null ? void 0 : t.media_title) || "", i = (t == null ? void 0 : t.media_artist) || "", r = (t == null ? void 0 : t.media_album_name) || "", a = r && i ? `${i} - ${r}` : i || r || "", o = (t == null ? void 0 : t.shuffle) ?? !1, n = (t == null ? void 0 : t.repeat) ?? "off", c = (t == null ? void 0 : t.is_volume_muted) ?? !1;
    return l`
      <div class="player-section">
        ${e ? l`<img class="album-art" src="${e}" alt="Album art" />` : l`<div class="album-art-placeholder">${this._svgIcon(pe, 48)}</div>`}

        <div class="track-info">
          <div class="track-title">${s || (this._isIdle ? "Not Playing" : "Unknown")}</div>
          ${a ? l`<div class="track-artist">${a}</div>` : h}
        </div>

        <div class="transport-controls">
          <button class="transport-btn" @click=${this._handlePrev}>
            ${this._svgIcon(Qe, 28)}
          </button>
          <button class="transport-btn play-pause" @click=${this._handlePlayPause}>
            ${this._svgIcon(this._isPlaying ? Ze : We, 32)}
          </button>
          <button class="transport-btn" @click=${this._handleNext}>
            ${this._svgIcon(Be, 28)}
          </button>
        </div>

        <div class="secondary-controls">
          <button class="secondary-btn ${o ? "active" : ""}" @click=${this._handleShuffle}>
            ${this._svgIcon(qe, 20)}
          </button>
          <button class="secondary-btn ${n !== "off" ? "active" : ""}" @click=${this._handleRepeat}>
            ${this._svgIcon(n === "one" ? Je : Ye, 20)}
          </button>
          <button class="secondary-btn ${c ? "active" : ""}" @click=${() => this._handleMuteToggle()}>
            ${this._svgIcon(c ? et : tt, 20)}
          </button>
        </div>

        <div class="volume-row">
          <button class="vol-btn" @click=${() => this._handleVolumeDown()}>
            ${this._svgIcon(de, 20)}
          </button>
          <div class="volume-slider-container">
            <input
              type="range"
              class="volume-slider"
              min="0"
              max="100"
              .value=${String(this._volumePercent)}
              @change=${(u) => this._handleVolumeChange(u)}
            />
          </div>
          <span class="volume-label">${this._volumePercent}</span>
          <button class="vol-btn" @click=${() => this._handleVolumeUp()}>
            ${this._svgIcon(le, 20)}
          </button>
        </div>
      </div>
    `;
  }
  _renderTabs() {
    return l`
      <div class="tab-bar">
        <button
          class="tab-btn ${this._activeTab === "favorites" ? "active" : ""}"
          @click=${() => this._setTab("favorites")}
        >
          Favorites
        </button>
        ${this._config.spotify_entity ? l`
              <button
                class="tab-btn ${this._activeTab === "search" ? "active" : ""}"
                @click=${() => this._setTab("search")}
              >
                Search
              </button>
            ` : h}
      </div>
    `;
  }
  _renderFavorites() {
    const t = this._config.favorites;
    return t != null && t.length ? l`
      <div class="favorites-section">
        ${t.map((e) => {
      const s = this._collapsedCategories.has(e.name);
      return l`
            <div class="category-header" @click=${() => this._toggleCategory(e.name)}>
              <span class="category-title">${e.name}</span>
              <span class="chevron-icon ${s ? "" : "open"}">
                ${this._svgIcon(he, 18)}
              </span>
            </div>
            <div
              class="category-items ${s ? "collapsed" : ""}"
              style="max-height: ${s ? "0" : e.items.length * 64 + "px"}"
            >
              ${e.items.map(
        (i) => l`
                  <button
                    class="favorite-btn"
                    @click=${() => this._handleFavoritePlay(i.uri, i.media_content_type)}
                  >
                    ${i.thumbnail ? l`<img
                          class="favorite-btn-thumb"
                          src="${i.thumbnail}"
                          alt=""
                        />` : h}
                    <span class="favorite-btn-text">${i.name}</span>
                  </button>
                `
      )}
            </div>
          `;
    })}
      </div>
    ` : l`<div class="idle-message">No favorites configured. Add them in card YAML config.</div>`;
  }
  _renderSearch() {
    return l`
      <div class="search-section">
        <div class="search-input-row">
          ${this._svgIcon(Ke, 20)}
          <input
            class="search-input"
            type="text"
            placeholder="Search Spotify..."
            .value=${this._searchQuery}
            @input=${this._handleSearchInput}
          />
          ${this._searchQuery ? l`
                <button class="search-clear-btn" @click=${this._clearSearch}>
                  ${this._svgIcon(Xe, 18)}
                </button>
              ` : h}
        </div>

        <div class="filter-chips">
          <button
            class="filter-chip ${this._searchFilter === "track" ? "active" : ""}"
            @click=${() => this._setSearchFilter("track")}
          >
            Songs
          </button>
          <button
            class="filter-chip ${this._searchFilter === "album" ? "active" : ""}"
            @click=${() => this._setSearchFilter("album")}
          >
            Albums
          </button>
          <button
            class="filter-chip ${this._searchFilter === "playlist" ? "active" : ""}"
            @click=${() => this._setSearchFilter("playlist")}
          >
            Playlists
          </button>
        </div>

        <div class="search-results">
          ${this._searchLoading ? l`<div class="search-loading">Searching...</div>` : this._searchResults.length === 0 && this._searchQuery ? l`<div class="search-empty">No results found</div>` : this._searchResults.length === 0 ? l`<div class="search-empty">Search for songs, albums, or playlists</div>` : this._searchResults.map(
      (t) => l`
                      <button
                        class="search-result-btn"
                        @click=${() => this._handleSearchResultPlay(t)}
                      >
                        ${t.thumbnail ? l`<img
                              class="search-result-thumb"
                              src="${t.thumbnail}"
                              alt=""
                            />` : l`<div class="search-result-thumb"
                              style="display:flex;align-items:center;justify-content:center">
                              ${this._svgIcon(pe, 20)}
                            </div>`}
                        <div class="search-result-info">
                          <div class="search-result-title">${t.title}</div>
                          <div class="search-result-subtitle">${t.subtitle}</div>
                        </div>
                      </button>
                    `
    )}
        </div>
      </div>
    `;
  }
  // --- Editor stub ---
  static getConfigElement() {
    return document.createElement("custom-sonos-card-editor");
  }
  static getStubConfig() {
    return {
      entity: "media_player.living_room",
      volume_step: 5,
      favorites: [
        {
          name: "Playlists",
          items: [
            { name: "My Playlist", uri: "spotify:playlist:xxxxx" }
          ]
        }
      ]
    };
  }
};
_.styles = De;
f([
  Y({ attribute: !1 })
], _.prototype, "hass", 2);
f([
  v()
], _.prototype, "_config", 2);
f([
  v()
], _.prototype, "_dropdownOpen", 2);
f([
  v()
], _.prototype, "_activeTab", 2);
f([
  v()
], _.prototype, "_selectedEntity", 2);
f([
  v()
], _.prototype, "_collapsedCategories", 2);
f([
  v()
], _.prototype, "_searchQuery", 2);
f([
  v()
], _.prototype, "_searchFilter", 2);
f([
  v()
], _.prototype, "_searchResults", 2);
f([
  v()
], _.prototype, "_searchLoading", 2);
f([
  v()
], _.prototype, "_groupingMode", 2);
f([
  v()
], _.prototype, "_groupingSelection", 2);
_ = f([
  be("custom-sonos-card")
], _);
var at = Object.defineProperty, ot = Object.getOwnPropertyDescriptor, J = (t, e, s, i) => {
  for (var r = i > 1 ? void 0 : i ? ot(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (r = (i ? o(e, s, r) : o(r)) || r);
  return i && r && at(e, s, r), r;
};
let T = class extends A {
  setConfig(t) {
    this._config = t;
  }
  render() {
    return this._config ? l`
      <div class="row">
        <label>Entity (required)</label>
        <input
          type="text"
          .value=${this._config.entity || ""}
          @input=${(t) => this._updateConfig("entity", t.target.value)}
          placeholder="media_player.living_room"
        />
      </div>
      <div class="row">
        <label>Spotify Entity</label>
        <input
          type="text"
          .value=${this._config.spotify_entity || ""}
          @input=${(t) => this._updateConfig("spotify_entity", t.target.value)}
          placeholder="media_player.spotify_user"
        />
      </div>
      <div class="row">
        <label>Volume Step (%)</label>
        <input
          type="number"
          min="1"
          max="20"
          .value=${String(this._config.volume_step ?? 5)}
          @input=${(t) => this._updateConfig("volume_step", parseInt(t.target.value) || 5)}
        />
      </div>
      <div class="row">
        <label>Full YAML Config</label>
        <textarea
          .value=${JSON.stringify(this._config, null, 2)}
          @change=${this._handleYamlChange}
        ></textarea>
        <div class="hint">Edit the full config as JSON. See documentation for speakers, groups, and favorites config.</div>
      </div>
    ` : l``;
  }
  _updateConfig(t, e) {
    const s = { ...this._config, [t]: e };
    this._config = s, this._fireConfigChanged(s);
  }
  _handleYamlChange(t) {
    try {
      const e = JSON.parse(t.target.value);
      this._config = e, this._fireConfigChanged(e);
    } catch {
    }
  }
  _fireConfigChanged(t) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
T.styles = fe`
    :host {
      display: block;
      padding: 16px;
    }
    .row {
      margin-bottom: 12px;
    }
    label {
      display: block;
      font-weight: 500;
      margin-bottom: 4px;
      font-size: 14px;
    }
    input,
    textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #333);
      font-size: 14px;
      box-sizing: border-box;
    }
    textarea {
      min-height: 200px;
      font-family: monospace;
      font-size: 12px;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color, #888);
      margin-top: 4px;
    }
  `;
J([
  Y({ attribute: !1 })
], T.prototype, "hass", 2);
J([
  v()
], T.prototype, "_config", 2);
T = J([
  be("custom-sonos-card-editor")
], T);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "custom-sonos-card",
  name: "Custom Sonos Card",
  description: "A custom music controller for Sonos speakers with favorites, search, and speaker grouping.",
  preview: !0,
  documentationURL: "https://github.com/carmenvetere/ptowntoday/tree/main/custom-sonos-card"
});
console.info(
  "%c CUSTOM-SONOS-CARD %c v1.0.0 ",
  "color: white; background: #5856d6; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;",
  "color: #5856d6; background: #e8e8ed; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;"
);
