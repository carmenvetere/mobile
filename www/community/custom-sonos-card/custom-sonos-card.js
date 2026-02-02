const t$6 = globalThis, e$6 = t$6.ShadowRoot && (void 0 === t$6.ShadyCSS || t$6.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$5 = Symbol(), o$6 = /* @__PURE__ */ new WeakMap();
let n$7 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$5) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$6 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$6.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$6.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$8 = (t2) => new n$7("string" == typeof t2 ? t2 : t2 + "", void 0, s$5), i$7 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$7(o2, t2, s$5);
}, S$1 = (s2, o2) => {
  if (e$6) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$6.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$5 = e$6 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$8(e2);
})(t2) : t2;
const { is: i$6, defineProperty: e$5, getOwnPropertyDescriptor: h$3, getOwnPropertyNames: r$7, getOwnPropertySymbols: o$5, getPrototypeOf: n$6 } = Object, a$1 = globalThis, c$4 = a$1.trustedTypes, l$1 = c$4 ? c$4.emptyScript : "", p$2 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$3 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i5 = t2;
  switch (s2) {
    case Boolean:
      i5 = null !== t2;
      break;
    case Number:
      i5 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t2);
      } catch (t3) {
        i5 = null;
      }
  }
  return i5;
} }, f$3 = (t2, s2) => !i$6(t2, s2), b = { attribute: true, type: String, converter: u$3, reflect: false, useDefault: false, hasChanged: f$3 };
Symbol.metadata ??= Symbol("metadata"), a$1.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ??= []).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i5 = Symbol(), h2 = this.getPropertyDescriptor(t2, i5, s2);
      void 0 !== h2 && e$5(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i5) {
    const { get: e2, set: r2 } = h$3(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2?.call(this);
      r2?.call(this, s3), this.requestUpdate(t2, h2, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$6(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$7(t3), ...o$5(t3)];
      for (const i5 of s2) this.createProperty(i5, t3[i5]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i5] of s2) this.elementProperties.set(t3, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i5 = this._$Eu(t3, s2);
      void 0 !== i5 && this._$Eh.set(i5, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i5 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i5.unshift(c$5(s3));
    } else void 0 !== s2 && i5.push(c$5(s2));
    return i5;
  }
  static _$Eu(t2, s2) {
    const i5 = s2.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
  }
  addController(t2) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
  }
  removeController(t2) {
    this._$EO?.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i5 of s2.keys()) this.hasOwnProperty(i5) && (t2.set(i5, this[i5]), delete this[i5]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.());
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t2) => t2.hostDisconnected?.());
  }
  attributeChangedCallback(t2, s2, i5) {
    this._$AK(t2, i5);
  }
  _$ET(t2, s2) {
    const i5 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i5);
    if (void 0 !== e2 && true === i5.reflect) {
      const h2 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u$3).toAttribute(s2, i5.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    const i5 = this.constructor, e2 = i5._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i5.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : u$3;
      this._$Em = e2, this[e2] = h2.fromAttribute(s2, t3.type) ?? this._$Ej?.get(e2) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i5) {
    if (void 0 !== t2) {
      const e2 = this.constructor, h2 = this[t2];
      if (i5 ??= e2.getPropertyOptions(t2), !((i5.hasChanged ?? f$3)(h2, s2) || i5.useDefault && i5.reflect && h2 === this._$Ej?.get(t2) && !this.hasAttribute(e2._$Eu(t2, i5)))) return;
      this.C(t2, s2, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i5, reflect: e2, wrapped: h2 }, r2) {
    i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i5 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i5] of t3) {
        const { wrapped: t4 } = i5, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i5, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq &&= this._$Eq.forEach((t3) => this._$ET(t3, this[t3])), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$2?.({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ??= []).push("2.1.0");
const t$5 = globalThis, i$5 = t$5.trustedTypes, s$4 = i$5 ? i$5.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$4 = "$lit$", h$2 = `lit$${Math.random().toFixed(9).slice(2)}$`, o$4 = "?" + h$2, n$5 = `<${o$4}>`, r$6 = document, l = () => r$6.createComment(""), c$3 = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u$2 = (t2) => a(t2) || "function" == typeof t2?.[Symbol.iterator], d = "[ 	\n\f\r]", f$2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$1 = /-->/g, _ = />/g, m$2 = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p$1 = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y2 = (t2) => (i5, ...s2) => ({ _$litType$: t2, strings: i5, values: s2 }), x = y2(1), T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), C = r$6.createTreeWalker(r$6, 129);
function P(t2, i5) {
  if (!a(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s$4 ? s$4.createHTML(i5) : i5;
}
const V = (t2, i5) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c3 = f$2;
  for (let i6 = 0; i6 < s2; i6++) {
    const s3 = t2[i6];
    let a2, u2, d2 = -1, y3 = 0;
    for (; y3 < s3.length && (c3.lastIndex = y3, u2 = c3.exec(s3), null !== u2); ) y3 = c3.lastIndex, c3 === f$2 ? "!--" === u2[1] ? c3 = v$1 : void 0 !== u2[1] ? c3 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c3 = m$2) : void 0 !== u2[3] && (c3 = m$2) : c3 === m$2 ? ">" === u2[0] ? (c3 = r2 ?? f$2, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c3.lastIndex - u2[2].length, a2 = u2[1], c3 = void 0 === u2[3] ? m$2 : '"' === u2[3] ? g : p$1) : c3 === g || c3 === p$1 ? c3 = m$2 : c3 === v$1 || c3 === _ ? c3 = f$2 : (c3 = m$2, r2 = void 0);
    const x2 = c3 === m$2 && t2[i6 + 1].startsWith("/>") ? " " : "";
    l2 += c3 === f$2 ? s3 + n$5 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e$4 + s3.slice(d2) + h$2 + x2) : s3 + h$2 + (-2 === d2 ? i6 : x2);
  }
  return [P(t2, l2 + (t2[s2] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), o2];
};
class N {
  constructor({ strings: t2, _$litType$: s2 }, n3) {
    let r2;
    this.parts = [];
    let c3 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = V(t2, s2);
    if (this.el = N.createElement(f2, n3), C.currentNode = this.el.content, 2 === s2 || 3 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = C.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(e$4)) {
          const i5 = v2[a2++], s3 = r2.getAttribute(t3).split(h$2), e2 = /([.?@])?(.*)/.exec(i5);
          d2.push({ type: 1, index: c3, name: e2[2], strings: s3, ctor: "." === e2[1] ? H : "?" === e2[1] ? I : "@" === e2[1] ? L : k }), r2.removeAttribute(t3);
        } else t3.startsWith(h$2) && (d2.push({ type: 6, index: c3 }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h$2), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i$5 ? i$5.emptyScript : "";
            for (let i5 = 0; i5 < s3; i5++) r2.append(t3[i5], l()), C.nextNode(), d2.push({ type: 2, index: ++c3 });
            r2.append(t3[s3], l());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === o$4) d2.push({ type: 2, index: c3 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(h$2, t3 + 1)); ) d2.push({ type: 7, index: c3 }), t3 += h$2.length - 1;
      }
      c3++;
    }
  }
  static createElement(t2, i5) {
    const s2 = r$6.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function S(t2, i5, s2 = t2, e2) {
  if (i5 === T) return i5;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = c$3(i5) ? void 0 : i5._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i5 = S(t2, h2._$AS(t2, i5.values), h2, e2)), i5;
}
let M$1 = class M {
  constructor(t2, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i5 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? r$6).importNode(i5, true);
    C.currentNode = e2;
    let h2 = C.nextNode(), o2 = 0, n3 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i6;
        2 === l2.type ? i6 = new R(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i6 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i6 = new z(h2, this, t2)), this._$AV.push(i6), l2 = s2[++n3];
      }
      o2 !== l2?.index && (h2 = C.nextNode(), o2++);
    }
    return C.currentNode = r$6, e2;
  }
  p(t2) {
    let i5 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i5), i5 += s2.strings.length - 2) : s2._$AI(t2[i5])), i5++;
  }
};
class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i5, s2, e2) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t2, this._$AB = i5, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t2?.nodeType && (t2 = i5.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i5 = this) {
    t2 = S(this, t2, i5), c$3(t2) ? t2 === E || null == t2 || "" === t2 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t2 !== this._$AH && t2 !== T && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u$2(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== E && c$3(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$6.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i5, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = N.createElement(P(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2) this._$AH.p(i5);
    else {
      const t3 = new M$1(e2, this), s3 = t3.u(this.options);
      t3.p(i5), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i5 = A.get(t2.strings);
    return void 0 === i5 && A.set(t2.strings, i5 = new N(t2)), i5;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i5.length ? i5.push(s2 = new R(this.O(l()), this.O(l()), this, this.options)) : s2 = i5[e2], s2._$AI(h2), e2++;
    e2 < i5.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i5.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i5) {
    for (this._$AP?.(false, true, i5); t2 && t2 !== this._$AB; ) {
      const i6 = t2.nextSibling;
      t2.remove(), t2 = i6;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
}
class k {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i5, s2, e2, h2) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t2, this.name = i5, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = E;
  }
  _$AI(t2, i5 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = S(this, t2, i5, 0), o2 = !c$3(t2) || t2 !== this._$AH && t2 !== T, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = S(this, e3[s2 + n3], i5, n3), r2 === T && (r2 = this._$AH[n3]), o2 ||= !c$3(r2) || r2 !== this._$AH[n3], r2 === E ? t2 = E : t2 !== E && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class H extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === E ? void 0 : t2;
  }
}
class I extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== E);
  }
}
class L extends k {
  constructor(t2, i5, s2, e2, h2) {
    super(t2, i5, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i5 = this) {
    if ((t2 = S(this, t2, i5, 0) ?? E) === T) return;
    const s2 = this._$AH, e2 = t2 === E && s2 !== E || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== E && (s2 === E || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class z {
  constructor(t2, i5, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    S(this, t2);
  }
}
const Z = { I: R }, j = t$5.litHtmlPolyfillSupport;
j?.(N, R), (t$5.litHtmlVersions ??= []).push("3.3.0");
const B = (t2, i5, s2) => {
  const e2 = s2?.renderBefore ?? i5;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new R(i5.insertBefore(l(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
const s$3 = globalThis;
let i$4 = class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t2 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t2.firstChild, t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = B(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return T;
  }
};
i$4._$litElement$ = true, i$4["finalized"] = true, s$3.litElementHydrateSupport?.({ LitElement: i$4 });
const o$3 = s$3.litElementPolyfillSupport;
o$3?.({ LitElement: i$4 });
(s$3.litElementVersions ??= []).push("4.2.0");
const t$4 = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
const o$2 = { attribute: true, type: String, converter: u$3, reflect: false, hasChanged: f$3 }, r$5 = (t2 = o$2, e2, r2) => {
  const { kind: n3, metadata: i5 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i5);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i5, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$4(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$5(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
function r$4(r2) {
  return n$4({ ...r2, state: true, attribute: false });
}
function t$3(t2) {
  return (n3, o2) => {
    const c3 = "function" == typeof n3 ? n3 : n3[o2];
    Object.assign(c3, t2);
  };
}
const e$3 = (e2, t2, c3) => (c3.configurable = true, c3.enumerable = true, Reflect.decorate && "object" != typeof t2 && Object.defineProperty(e2, t2, c3), c3);
function e$2(e2, r2) {
  return (n3, s2, i5) => {
    const o2 = (t2) => t2.renderRoot?.querySelector(e2) ?? null;
    return e$3(n3, s2, { get() {
      return o2(this);
    } });
  };
}
var mdiAccountMusic = "M11,14C12,14 13.05,14.16 14.2,14.44C13.39,15.31 13,16.33 13,17.5C13,18.39 13.25,19.23 13.78,20H3V18C3,16.81 3.91,15.85 5.74,15.12C7.57,14.38 9.33,14 11,14M11,12C9.92,12 9,11.61 8.18,10.83C7.38,10.05 7,9.11 7,8C7,6.92 7.38,6 8.18,5.18C9,4.38 9.92,4 11,4C12.11,4 13.05,4.38 13.83,5.18C14.61,6 15,6.92 15,8C15,9.11 14.61,10.05 13.83,10.83C13.05,11.61 12.11,12 11,12M18.5,10H20L22,10V12H20V17.5A2.5,2.5 0 0,1 17.5,20A2.5,2.5 0 0,1 15,17.5A2.5,2.5 0 0,1 17.5,15C17.86,15 18.19,15.07 18.5,15.21V10Z";
var mdiAccountMusicOutline = "M11,4A4,4 0 0,1 15,8A4,4 0 0,1 11,12A4,4 0 0,1 7,8A4,4 0 0,1 11,4M11,6A2,2 0 0,0 9,8A2,2 0 0,0 11,10A2,2 0 0,0 13,8A2,2 0 0,0 11,6M11,13C12.1,13 13.66,13.23 15.11,13.69C14.5,14.07 14,14.6 13.61,15.23C12.79,15.03 11.89,14.9 11,14.9C8.03,14.9 4.9,16.36 4.9,17V18.1H13.04C13.13,18.8 13.38,19.44 13.76,20H3V17C3,14.34 8.33,13 11,13M18.5,10H20L22,10V12H20V17.5A2.5,2.5 0 0,1 17.5,20A2.5,2.5 0 0,1 15,17.5A2.5,2.5 0 0,1 17.5,15C17.86,15 18.19,15.07 18.5,15.21V10Z";
var mdiAlarm = "M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z";
var mdiAlbum = "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12,16.5C9.5,16.5 7.5,14.5 7.5,12C7.5,9.5 9.5,7.5 12,7.5C14.5,7.5 16.5,9.5 16.5,12C16.5,14.5 14.5,16.5 12,16.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
var mdiAlphaABoxOutline = "M3,5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5M5,5V19H19V5H5M11,7H13A2,2 0 0,1 15,9V17H13V13H11V17H9V9A2,2 0 0,1 11,7M11,9V11H13V9H11Z";
var mdiApplication = "M21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V4C23 2.9 22.1 2 21 2M21 7H3V4H21V7Z";
var mdiArrowLeft = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";
var mdiArrowUpRight = "M21.5 9.5L20.09 10.92L17 7.83V13.5C17 17.09 14.09 20 10.5 20H4V18H10.5C13 18 15 16 15 13.5V7.83L11.91 10.91L10.5 9.5L16 4L21.5 9.5Z";
var mdiBookmark = "M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z";
var mdiCheck = "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";
var mdiCheckAll = "M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z";
var mdiCheckCircle = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";
var mdiChevronDown = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
var mdiChevronLeft = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";
var mdiChevronRight = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
var mdiChevronUp = "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";
var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
var mdiCloseBoxMultipleOutline = "M20 2H8C6.9 2 6 2.9 6 4V16C6 17.11 6.9 18 8 18H20C21.11 18 22 17.11 22 16V4C22 2.9 21.11 2 20 2M20 16H8V4H20V16M4 6V20H18V22H4C2.9 22 2 21.11 2 20V6H4M9.77 12.84L12.6 10L9.77 7.15L11.17 5.75L14 8.6L16.84 5.77L18.24 7.17L15.4 10L18.23 12.84L16.83 14.24L14 11.4L11.17 14.24L9.77 12.84Z";
var mdiCloseCircle = "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z";
var mdiCog = "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
var mdiDelete = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
var mdiDotsVertical = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
var mdiDramaMasks = "M8.11,19.45C5.94,18.65 4.22,16.78 3.71,14.35L2.05,6.54C1.81,5.46 2.5,4.4 3.58,4.17L13.35,2.1L13.38,2.09C14.45,1.88 15.5,2.57 15.72,3.63L16.07,5.3L20.42,6.23H20.45C21.5,6.47 22.18,7.53 21.96,8.59L20.3,16.41C19.5,20.18 15.78,22.6 12,21.79C10.42,21.46 9.08,20.61 8.11,19.45V19.45M20,8.18L10.23,6.1L8.57,13.92V13.95C8,16.63 9.73,19.27 12.42,19.84C15.11,20.41 17.77,18.69 18.34,16L20,8.18M16,16.5C15.37,17.57 14.11,18.16 12.83,17.89C11.56,17.62 10.65,16.57 10.5,15.34L16,16.5M8.47,5.17L4,6.13L5.66,13.94L5.67,13.97C5.82,14.68 6.12,15.32 6.53,15.87C6.43,15.1 6.45,14.3 6.62,13.5L7.05,11.5C6.6,11.42 6.21,11.17 6,10.81C6.06,10.2 6.56,9.66 7.25,9.5C7.33,9.5 7.4,9.5 7.5,9.5L8.28,5.69C8.32,5.5 8.38,5.33 8.47,5.17M15.03,12.23C15.35,11.7 16.03,11.42 16.72,11.57C17.41,11.71 17.91,12.24 18,12.86C17.67,13.38 17,13.66 16.3,13.5C15.61,13.37 15.11,12.84 15.03,12.23M10.15,11.19C10.47,10.66 11.14,10.38 11.83,10.53C12.5,10.67 13.03,11.21 13.11,11.82C12.78,12.34 12.11,12.63 11.42,12.5C10.73,12.33 10.23,11.8 10.15,11.19M11.97,4.43L13.93,4.85L13.77,4.05L11.97,4.43Z";
var mdiFastForward = "M13,6V18L21.5,12M4,18L12.5,12L4,6V18Z";
var mdiFileMusic = "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13,13H11V18A2,2 0 0,1 9,20A2,2 0 0,1 7,18A2,2 0 0,1 9,16C9.4,16 9.7,16.1 10,16.3V11H13V13M13,9V3.5L18.5,9H13Z";
var mdiFolder = "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z";
var mdiFolderStar = "M20,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8A2,2 0 0,0 20,6M17.94,17L15,15.28L12.06,17L12.84,13.67L10.25,11.43L13.66,11.14L15,8L16.34,11.14L19.75,11.43L17.16,13.67L17.94,17Z";
var mdiFolderStarOutline = "M10.78 12.05L13.81 11.79L15 9L16.19 11.79L19.22 12.05L16.92 14.04L17.61 17L15 15.47L12.39 17L13.08 14.04L10.78 12.05M22 8V18C22 19.11 21.11 20 20 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.9 4 4 4H10L12 6H20C21.11 6 22 6.9 22 8M20 8H4V18H20V8Z";
var mdiGamepadVariant = "M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z";
var mdiGrid = "M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z";
var mdiImage = "M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z";
var mdiKeyboard = "M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z";
var mdiListBoxOutline = "M11 15H17V17H11V15M9 7H7V9H9V7M11 13H17V11H11V13M11 9H17V7H11V9M9 11H7V13H9V11M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5M19 5H5V19H19V5M9 15H7V17H9V15Z";
var mdiMagnify = "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";
var mdiMovie = "M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V4H18Z";
var mdiMusic = "M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z";
var mdiPauseCircle = "M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
var mdiPen = "M20.71,7.04C20.37,7.38 20.04,7.71 20.03,8.04C20,8.36 20.34,8.69 20.66,9C21.14,9.5 21.61,9.95 21.59,10.44C21.57,10.93 21.06,11.44 20.55,11.94L16.42,16.08L15,14.66L19.25,10.42L18.29,9.46L16.87,10.87L13.12,7.12L16.96,3.29C17.35,2.9 18,2.9 18.37,3.29L20.71,5.63C21.1,6 21.1,6.65 20.71,7.04M3,17.25L12.56,7.68L16.31,11.43L6.75,21H3V17.25Z";
var mdiPlay = "M8,5.14V19.14L19,12.14L8,5.14Z";
var mdiPlayBoxMultiple = "M4,6H2V20A2,2 0 0,0 4,22H18V20H4V6M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M12,14.5V5.5L18,10L12,14.5Z";
var mdiPlayCircle = "M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
var mdiPlaylistMusic = "M15,6H3V8H15V6M15,10H3V12H15V10M3,16H11V14H3V16M17,6V14.18C16.69,14.07 16.35,14 16,14A3,3 0 0,0 13,17A3,3 0 0,0 16,20A3,3 0 0,0 19,17V8H22V6H17Z";
var mdiPlaylistRemove = "M14 10H3V12H14V10M14 6H3V8H14V6M3 16H10V14H3V16M14.4 22L17 19.4L19.6 22L21 20.6L18.4 18L21 15.4L19.6 14L17 16.6L14.4 14L13 15.4L15.6 18L13 20.6L14.4 22Z";
var mdiPlus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
var mdiPodcast = "M17,18.25V21.5H7V18.25C7,16.87 9.24,15.75 12,15.75C14.76,15.75 17,16.87 17,18.25M12,5.5A6.5,6.5 0 0,1 18.5,12C18.5,13.25 18.15,14.42 17.54,15.41L16,14.04C16.32,13.43 16.5,12.73 16.5,12C16.5,9.5 14.5,7.5 12,7.5C9.5,7.5 7.5,9.5 7.5,12C7.5,12.73 7.68,13.43 8,14.04L6.46,15.41C5.85,14.42 5.5,13.25 5.5,12A6.5,6.5 0 0,1 12,5.5M12,1.5A10.5,10.5 0 0,1 22.5,12C22.5,14.28 21.77,16.39 20.54,18.11L19.04,16.76C19.96,15.4 20.5,13.76 20.5,12A8.5,8.5 0 0,0 12,3.5A8.5,8.5 0 0,0 3.5,12C3.5,13.76 4.04,15.4 4.96,16.76L3.46,18.11C2.23,16.39 1.5,14.28 1.5,12A10.5,10.5 0 0,1 12,1.5M12,9.5A2.5,2.5 0 0,1 14.5,12A2.5,2.5 0 0,1 12,14.5A2.5,2.5 0 0,1 9.5,12A2.5,2.5 0 0,1 12,9.5Z";
var mdiPower = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";
var mdiRepeat = "M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z";
var mdiRepeatOff = "M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V22L3,18L7,14V17H13.73L7,10.27V11H5V8.27L2,5.27M17,13H19V17.18L17,15.18V13M17,5V2L21,6L17,10V7H8.82L6.82,5H17Z";
var mdiRepeatOnce = "M13,15V9H12L10,10V11H11.5V15M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z";
var mdiRewind = "M11.5,12L20,18V6M11,18V6L2.5,12L11,18Z";
var mdiSelectInverse = "M5,3H7V5H9V3H11V5H13V3H15V5H17V3H19V5H21V7H19V9H21V11H19V13H21V15H19V17H21V19H19V21H17V19H15V21H13V19H11V21H9V19H7V21H5V19H3V17H5V15H3V13H5V11H3V9H5V7H3V5H5V3Z";
var mdiShuffle = "M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z";
var mdiShuffleDisabled = "M16,4.5V7H5V9H16V11.5L19.5,8M16,12.5V15H5V17H16V19.5L19.5,16";
var mdiSkipNext = "M16,18H18V6H16M6,18L14.5,12L6,6V18Z";
var mdiSkipPrevious = "M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z";
var mdiStar = "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z";
var mdiStopCircle = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M9,9H15V15H9";
var mdiTelevisionClassic = "M8.16,3L6.75,4.41L9.34,7H4C2.89,7 2,7.89 2,9V19C2,20.11 2.89,21 4,21H20C21.11,21 22,20.11 22,19V9C22,7.89 21.11,7 20,7H14.66L17.25,4.41L15.84,3L12,6.84L8.16,3M4,9H17V19H4V9M19.5,9A1,1 0 0,1 20.5,10A1,1 0 0,1 19.5,11A1,1 0 0,1 18.5,10A1,1 0 0,1 19.5,9M19.5,12A1,1 0 0,1 20.5,13A1,1 0 0,1 19.5,14A1,1 0 0,1 18.5,13A1,1 0 0,1 19.5,12Z";
var mdiTrashCanOutline = "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z";
var mdiVideo = "M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z";
var mdiVolumeHigh = "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z";
var mdiVolumeMinus = "M3,9H7L12,4V20L7,15H3V9M14,11H22V13H14V11Z";
var mdiVolumeMute = "M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z";
var mdiVolumePlus = "M3,9H7L12,4V20L7,15H3V9M14,11H17V8H19V11H22V13H19V16H17V13H14V11Z";
var mdiWeb = "M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
var Section = /* @__PURE__ */ ((Section2) => {
  Section2["GROUPS"] = "groups";
  Section2["MEDIA_BROWSER"] = "media browser";
  Section2["PLAYER"] = "player";
  Section2["GROUPING"] = "grouping";
  Section2["VOLUMES"] = "volumes";
  Section2["QUEUE"] = "queue";
  return Section2;
})(Section || {});
const isUnavailableState = (state) => {
  return state === "unavailable" || state === "unknown" || !state;
};
const isTTSMediaSource = (mediaContentId) => {
  return mediaContentId?.startsWith("media-source://tts/") ?? false;
};
var MediaPlayerEntityFeature = /* @__PURE__ */ ((MediaPlayerEntityFeature2) => {
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["PAUSE"] = 1] = "PAUSE";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["SEEK"] = 2] = "SEEK";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["VOLUME_SET"] = 4] = "VOLUME_SET";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["VOLUME_MUTE"] = 8] = "VOLUME_MUTE";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["PREVIOUS_TRACK"] = 16] = "PREVIOUS_TRACK";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["NEXT_TRACK"] = 32] = "NEXT_TRACK";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["TURN_ON"] = 128] = "TURN_ON";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["TURN_OFF"] = 256] = "TURN_OFF";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["PLAY_MEDIA"] = 512] = "PLAY_MEDIA";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["VOLUME_STEP"] = 1024] = "VOLUME_STEP";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["SELECT_SOURCE"] = 2048] = "SELECT_SOURCE";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["STOP"] = 4096] = "STOP";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["CLEAR_PLAYLIST"] = 8192] = "CLEAR_PLAYLIST";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["PLAY"] = 16384] = "PLAY";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["SHUFFLE_SET"] = 32768] = "SHUFFLE_SET";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["SELECT_SOUND_MODE"] = 65536] = "SELECT_SOUND_MODE";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["BROWSE_MEDIA"] = 131072] = "BROWSE_MEDIA";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["REPEAT_SET"] = 262144] = "REPEAT_SET";
  MediaPlayerEntityFeature2[MediaPlayerEntityFeature2["GROUPING"] = 524288] = "GROUPING";
  return MediaPlayerEntityFeature2;
})(MediaPlayerEntityFeature || {});
const BROWSER_PLAYER = "browser";
const MediaClassBrowserSettings = {
  album: { icon: mdiAlbum, layout: "grid" },
  app: { icon: mdiApplication, layout: "grid", show_list_images: true },
  artist: { icon: mdiAccountMusic, layout: "grid", show_list_images: true },
  channel: {
    icon: mdiTelevisionClassic,
    thumbnail_ratio: "portrait",
    layout: "grid",
    show_list_images: true
  },
  composer: {
    icon: mdiAccountMusicOutline,
    layout: "grid",
    show_list_images: true
  },
  contributing_artist: {
    icon: mdiAccountMusic,
    layout: "grid",
    show_list_images: true
  },
  directory: { icon: mdiFolder, layout: "grid", show_list_images: true },
  episode: {
    icon: mdiTelevisionClassic,
    layout: "grid",
    thumbnail_ratio: "portrait",
    show_list_images: true
  },
  game: {
    icon: mdiGamepadVariant,
    layout: "grid",
    thumbnail_ratio: "portrait"
  },
  genre: { icon: mdiDramaMasks, layout: "grid", show_list_images: true },
  image: { icon: mdiImage, layout: "grid", show_list_images: true },
  movie: {
    icon: mdiMovie,
    thumbnail_ratio: "portrait",
    layout: "grid",
    show_list_images: true
  },
  music: { icon: mdiMusic, show_list_images: true },
  playlist: { icon: mdiPlaylistMusic, layout: "grid", show_list_images: true },
  podcast: { icon: mdiPodcast, layout: "grid" },
  season: {
    icon: mdiTelevisionClassic,
    layout: "grid",
    thumbnail_ratio: "portrait",
    show_list_images: true
  },
  track: { icon: mdiFileMusic },
  tv_show: {
    icon: mdiTelevisionClassic,
    layout: "grid",
    thumbnail_ratio: "portrait"
  },
  url: { icon: mdiWeb },
  video: { icon: mdiVideo, layout: "grid", show_list_images: true }
};
const browseMediaPlayer = (hass, entityId, mediaContentId, mediaContentType) => hass.callWS({
  type: "media_player/browse_media",
  entity_id: entityId,
  media_content_id: mediaContentId,
  media_content_type: mediaContentType
});
const dispatchPrefix = "sonos-card-dispatch-event-";
const ACTIVE_PLAYER_EVENT_INTERNAL = "active-player";
const ACTIVE_PLAYER_EVENT = dispatchPrefix + ACTIVE_PLAYER_EVENT_INTERNAL;
const SHOW_SECTION = "show-section";
const CALL_MEDIA_STARTED = `${dispatchPrefix}call-media-started`;
const CALL_MEDIA_DONE = `${dispatchPrefix}call-media-done`;
const MEDIA_ITEM_SELECTED = "item-selected";
const SESSION_STORAGE_PLAYER_ID = "sonos-card-player-id";
const HASS_MORE_INFO = "hass-more-info";
const TV_BASE64_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAAJZlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgExAAIAAAARAAAAWodpAAQAAAABAAAAbAAAAAAAAABiAAAAAQAAAGIAAAABd3d3Lmlua3NjYXBlLm9yZwAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAgCgAwAEAAAAAQAAAgAAAAAA+uiskAAAAAlwSFlzAAAPEgAADxIBIZvyMwAAAi1pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+d3d3Lmlua3NjYXBlLm9yZzwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj45ODwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+OTg8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgrH52sKAAA/4klEQVR4Ae3dCZAc13nY8dfHzOwNYAHiJAACIMAD4iFRlE3JsSSrSrLiWLEdQ7FNy5KllBLHRcV27NiupFKoVBLfsUNVJVVWJNqMFCuCY7ssu2jZkgWVbFG2RJGmSIgkTuIGcew1uztHH/m+Hiw0A+wxs9Mz093zb2mJObpfv/frmXlfv379njEsCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkAgBKxG5IBMI9JnA29520L3zzbn1VjW3xbeDET8IQjNgT7rF0oWP//bBCeEIM0ZifehnD67zRga22BWzRn54bCewi2GueuHYV6pXDx8+6GWsvBQHgcQLEAAk/hCRwawJ/MQv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AQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBGIQ+P9v6JX0ZgeS/gAAAABJRU5ErkJggg==";
const MUSIC_NOTES_BASE64_IMAGE = "data:image/png;base64,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AQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAIEGFvj/AdpNbG+v3HHWAAAAAElFTkSuQmCC";
const listStyle = i$7`
  .list {
    --mdc-theme-primary: var(--accent-color);
    --mdc-list-vertical-padding: 0px;
    overflow: hidden;
  }
`;
const mediaItemTitleStyle = i$7`
  .title {
    color: var(--secondary-text-color);
    font-weight: bold;
    padding: 0 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
function getSpeakerList(mainPlayer, predefinedGroups = []) {
  const playerIds = mainPlayer.members.map((member) => member.id).sort();
  if (predefinedGroups?.length) {
    const found = predefinedGroups.find(
      (pg) => pg.entities.map((p2) => p2.player.id).sort().toString() === playerIds.toString()
    );
    if (found) {
      return found.name;
    }
  }
  const otherMembers = mainPlayer.members.filter((member) => member.id !== mainPlayer.id);
  return [mainPlayer.name, ...otherMembers.map((member) => member.name)].join(" + ");
}
function dispatchActivePlayerId(playerId, config, element) {
  if (cardDoesNotContainAllSections(config)) {
    dispatch(ACTIVE_PLAYER_EVENT, { entityId: playerId });
  } else {
    element.dispatchEvent(customEvent(ACTIVE_PLAYER_EVENT_INTERNAL, { entityId: playerId }));
  }
}
function cardDoesNotContainAllSections(config) {
  return config.sections && config.sections.length < Object.keys(Section).length;
}
function customEvent(type, detail) {
  return new CustomEvent(type, {
    bubbles: true,
    composed: true,
    detail
  });
}
function dispatch(type, detail) {
  const event = customEvent(type, detail);
  window.dispatchEvent(event);
}
const HEIGHT_AND_WIDTH = 40;
function getWidthOrHeight(confValue) {
  if (confValue) {
    return confValue / 100 * HEIGHT_AND_WIDTH;
  }
  return HEIGHT_AND_WIDTH;
}
function getHeight(config) {
  return getWidthOrHeight(config.heightPercentage);
}
function getWidth(config) {
  return getWidthOrHeight(config.widthPercentage);
}
function getGroupPlayerIds(hassEntity) {
  let groupMembers = hassEntity.attributes.group_members;
  groupMembers = groupMembers?.filter((id) => id !== null && id !== void 0);
  return groupMembers?.length ? groupMembers : [hassEntity.entity_id];
}
function supportsTurnOn(player) {
  return ((player.attributes.supported_features || 0) & MediaPlayerEntityFeature.TURN_ON) === MediaPlayerEntityFeature.TURN_ON;
}
function getGroupingChanges(groupingItems, joinedPlayers, activePlayerId) {
  const isSelected = groupingItems.filter((item) => item.isSelected);
  const unJoin = groupingItems.filter((item) => !item.isSelected && joinedPlayers.includes(item.player.id)).map((item) => item.player.id);
  const join = groupingItems.filter((item) => item.isSelected && !joinedPlayers.includes(item.player.id)).map((item) => item.player.id);
  let newMainPlayer = activePlayerId;
  if (unJoin.includes(activePlayerId)) {
    newMainPlayer = isSelected[0].player.id;
  }
  return { unJoin, join, newMainPlayer };
}
function entityMatchSonos(config, entity, hassWithEntities) {
  const entityId = entity.entity_id;
  const configEntities = [...new Set(config.entities)];
  let includeEntity = true;
  if (configEntities.length) {
    const includesEntity = configEntities.includes(entityId);
    includeEntity = !!config.excludeItemsInEntitiesList !== includesEntity;
  }
  let matchesPlatform = true;
  entity.attributes.platform = hassWithEntities.entities?.[entityId]?.platform;
  if (config.entityPlatform) {
    matchesPlatform = entity.attributes.platform === config.entityPlatform;
  }
  return includeEntity && matchesPlatform;
}
function entityMatchMxmp(config, entity, hassWithEntities) {
  const entityId = entity.entity_id;
  const configEntities = [...new Set(config.entities)];
  let matchesPlatform = false;
  entity.attributes.platform = hassWithEntities.entities?.[entityId]?.platform;
  if (config.entityPlatform) {
    matchesPlatform = entity.attributes.platform === config.entityPlatform;
  }
  let includeEntity = false;
  if (configEntities.length) {
    const includesEntity = configEntities.includes(entityId);
    includeEntity = !!config.excludeItemsInEntitiesList !== includesEntity;
  }
  if (config.entityPlatform && configEntities.length) {
    return matchesPlatform && includeEntity;
  }
  return matchesPlatform || includeEntity;
}
function isSonosCard(config) {
  return config.type.indexOf("sonos") > -1;
}
function sortEntities(config, filtered) {
  if (config.entities) {
    return filtered.sort((a2, b2) => {
      const aIndex = config.entities?.indexOf(a2.entity_id) ?? -1;
      const bIndex = config.entities?.indexOf(b2.entity_id) ?? -1;
      return aIndex - bIndex;
    });
  } else {
    return filtered.sort((a2, b2) => a2.entity_id.localeCompare(b2.entity_id));
  }
}
function findPlayer(mediaPlayers, playerId) {
  return mediaPlayers.find((member) => member.id === playerId);
}
var __defProp$w = Object.defineProperty;
var __decorateClass$w = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$w(target, key, result);
  return result;
};
class PlayerControls extends i$4 {
  constructor() {
    super(...arguments);
    this.prev = async () => await this.mediaControlService.prev(this.activePlayer);
    this.play = async () => await this.mediaControlService.play(this.activePlayer);
    this.pauseOrStop = async () => {
      return this.playerConfig.stopInsteadOfPause ? await this.mediaControlService.stop(this.activePlayer) : await this.mediaControlService.pause(this.activePlayer);
    };
    this.next = async () => await this.mediaControlService.next(this.activePlayer);
    this.browseMedia = async () => this.mediaBrowseService.showBrowseMedia(this.activePlayer, this);
    this.togglePower = async () => await this.mediaControlService.togglePower(this.activePlayer);
    this.volDown = async () => await this.mediaControlService.volumeDown(this.volumePlayer, this.updateMemberVolumes);
    this.volUp = async () => await this.mediaControlService.volumeUp(this.volumePlayer, this.updateMemberVolumes);
    this.rewind = async () => await this.mediaControlService.seek(
      this.activePlayer,
      this.activePlayer.attributes.media_position - (this.playerConfig.fastForwardAndRewindStepSizeSeconds || 15)
    );
    this.fastForward = async () => await this.mediaControlService.seek(
      this.activePlayer,
      this.activePlayer.attributes.media_position + (this.playerConfig.fastForwardAndRewindStepSizeSeconds || 15)
    );
  }
  render() {
    this.config = this.store.config;
    this.playerConfig = this.config.player ?? {};
    this.activePlayer = this.store.activePlayer;
    this.mediaControlService = this.store.mediaControlService;
    this.mediaBrowseService = this.store.mediaBrowseService;
    const noUpDown = !!this.playerConfig.showVolumeUpAndDownButtons && E;
    const noFastForwardAndRewind = !!this.playerConfig.showFastForwardAndRewindButtons && E;
    const noShuffle = !this.playerConfig.hideControlShuffleButton && E;
    const noPrev = !this.playerConfig.hideControlPrevTrackButton && E;
    const noNext = !this.playerConfig.hideControlNextTrackButton && E;
    const noRepeat = !this.playerConfig.hideControlRepeatButton && E;
    const noBrowse = !!this.playerConfig.showBrowseMediaButton && E;
    this.volumePlayer = this.getVolumePlayer();
    this.updateMemberVolumes = !this.playerConfig.volumeEntityId;
    const pauseOrStop = this.playerConfig.stopInsteadOfPause ? mdiStopCircle : mdiPauseCircle;
    const playing = this.activePlayer.isPlaying();
    return x`
      <style>
        .icons * {
          ${this.playerConfig.controlsColor ? `color: ${this.playerConfig.controlsColor};` : ""}
        }
      </style>
      <div class="main" id="mediaControls">
        <div class="icons ${this.playerConfig.controlsLargeIcons ? "large-icons" : ""}">
          <div class="flex-1"></div>
          <ha-icon-button hide=${noUpDown} @click=${this.volDown} .path=${mdiVolumeMinus}></ha-icon-button>
          <sonos-shuffle hide=${noShuffle} .store=${this.store}></sonos-shuffle>
          <ha-icon-button hide=${noPrev} @click=${this.prev} .path=${mdiSkipPrevious}></ha-icon-button>
          <ha-icon-button hide=${noFastForwardAndRewind} @click=${this.rewind} .path=${mdiRewind}></ha-icon-button>
          <ha-icon-button @click=${playing ? this.pauseOrStop : this.play}
                          .path=${playing ? pauseOrStop : mdiPlayCircle} class="big-icon"></ha-icon-button>
          <ha-icon-button hide=${noFastForwardAndRewind} @click=${this.fastForward}
                          .path=${mdiFastForward}></ha-icon-button>
          <ha-icon-button hide=${noNext} @click=${this.next} .path=${mdiSkipNext}></ha-icon-button>
          <sonos-repeat hide=${noRepeat} .store=${this.store}></sonos-repeat>

          <ha-icon-button hide=${noUpDown} @click=${this.volUp} .path=${mdiVolumePlus}></ha-icon-button>
          <div class="flex-1">
            <ha-icon-button class="browse-button" hide=${noBrowse} @click=${this.browseMedia} .path=${mdiPlayBoxMultiple}></ha-icon-button>
          </div>
        </div>
        <sonos-volume .store=${this.store} .player=${this.volumePlayer}
                      .updateMembers=${this.updateMemberVolumes} .isPlayer=${true}
                      hide=${this.playerConfig.hideVolume || E}></sonos-volume>
        <div class="icons">
          <ha-icon-button hide=${this.store.hidePower(true)} @click=${this.togglePower}></ha-icon-button>
        </div">
      </div>
    `;
  }
  getVolumePlayer() {
    let result;
    if (this.playerConfig.volumeEntityId) {
      if (this.config.allowPlayerVolumeEntityOutsideOfGroup) {
        result = findPlayer(this.store.allMediaPlayers, this.playerConfig.volumeEntityId);
      } else {
        result = this.activePlayer.getMember(this.playerConfig.volumeEntityId);
      }
    }
    return result ?? this.activePlayer;
  }
  static get styles() {
    return i$7`
      .main {
        overflow: hidden auto;
      }
      .icons {
        justify-content: center;
        display: flex;
        align-items: center;
      }
      *[hide] {
        display: none;
      }
      .big-icon {
        --mdc-icon-button-size: 5rem;
        --mdc-icon-size: 5rem;
      }

      .large-icons ha-icon-button {
        --mdc-icon-size: 3rem;
        --mdc-icon-button-size: 4rem;
      }

      .large-icons .big-icon {
        --mdc-icon-size: 5rem;
        --mdc-icon-button-size: 5rem;
      }
      .flex-1 {
        flex: 1;
      }
      .browse-button {
        float: right;
      }

      .large-icons {
        margin-bottom: 2rem;
      }
    `;
  }
}
__decorateClass$w([
  n$4({ attribute: false })
], PlayerControls.prototype, "store");
customElements.define("sonos-player-controls", PlayerControls);
const { I: t$2 } = Z, i$3 = (o2) => null === o2 || "object" != typeof o2 && "function" != typeof o2, f$1 = (o2) => void 0 === o2.strings, s$2 = () => document.createComment(""), r$3 = (o2, i5, n3) => {
  const e2 = o2._$AA.parentNode, l2 = void 0 === i5 ? o2._$AB : i5._$AA;
  if (void 0 === n3) {
    const i6 = e2.insertBefore(s$2(), l2), c3 = e2.insertBefore(s$2(), l2);
    n3 = new t$2(i6, c3, o2, o2.options);
  } else {
    const t2 = n3._$AB.nextSibling, i6 = n3._$AM, c3 = i6 !== o2;
    if (c3) {
      let t3;
      n3._$AQ?.(o2), n3._$AM = o2, void 0 !== n3._$AP && (t3 = o2._$AU) !== i6._$AU && n3._$AP(t3);
    }
    if (t2 !== l2 || c3) {
      let o3 = n3._$AA;
      for (; o3 !== t2; ) {
        const t3 = o3.nextSibling;
        e2.insertBefore(o3, l2), o3 = t3;
      }
    }
  }
  return n3;
}, v = (o2, t2, i5 = o2) => (o2._$AI(t2, i5), o2), u$1 = {}, m$1 = (o2, t2 = u$1) => o2._$AH = t2, p = (o2) => o2._$AH, M2 = (o2) => {
  o2._$AP?.(false, true);
  let t2 = o2._$AA;
  const i5 = o2._$AB.nextSibling;
  for (; t2 !== i5; ) {
    const o3 = t2.nextSibling;
    t2.remove(), t2 = o3;
  }
};
const t$1 = { ATTRIBUTE: 1, CHILD: 2 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
let i$2 = class i2 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i5) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i5;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
const s$1 = (i5, t2) => {
  const e2 = i5._$AN;
  if (void 0 === e2) return false;
  for (const i6 of e2) i6._$AO?.(t2, false), s$1(i6, t2);
  return true;
}, o$1 = (i5) => {
  let t2, e2;
  do {
    if (void 0 === (t2 = i5._$AM)) break;
    e2 = t2._$AN, e2.delete(i5), i5 = t2;
  } while (0 === e2?.size);
}, r$2 = (i5) => {
  for (let t2; t2 = i5._$AM; i5 = t2) {
    let e2 = t2._$AN;
    if (void 0 === e2) t2._$AN = e2 = /* @__PURE__ */ new Set();
    else if (e2.has(i5)) break;
    e2.add(i5), c$2(t2);
  }
};
function h$1(i5) {
  void 0 !== this._$AN ? (o$1(this), this._$AM = i5, r$2(this)) : this._$AM = i5;
}
function n$3(i5, t2 = false, e2 = 0) {
  const r2 = this._$AH, h2 = this._$AN;
  if (void 0 !== h2 && 0 !== h2.size) if (t2) if (Array.isArray(r2)) for (let i6 = e2; i6 < r2.length; i6++) s$1(r2[i6], false), o$1(r2[i6]);
  else null != r2 && (s$1(r2, false), o$1(r2));
  else s$1(this, i5);
}
const c$2 = (i5) => {
  i5.type == t$1.CHILD && (i5._$AP ??= n$3, i5._$AQ ??= h$1);
};
class f extends i$2 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i5, t2, e2) {
    super._$AT(i5, t2, e2), r$2(this), this.isConnected = i5._$AU;
  }
  _$AO(i5, t2 = true) {
    i5 !== this.isConnected && (this.isConnected = i5, i5 ? this.reconnected?.() : this.disconnected?.()), t2 && (s$1(this, i5), o$1(this));
  }
  setValue(t2) {
    if (f$1(this._$Ct)) this._$Ct._$AI(t2, this);
    else {
      const i5 = [...this._$Ct._$AH];
      i5[this._$Ci] = t2, this._$Ct._$AI(i5, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
class s {
  constructor(t2) {
    this.G = t2;
  }
  disconnect() {
    this.G = void 0;
  }
  reconnect(t2) {
    this.G = t2;
  }
  deref() {
    return this.G;
  }
}
let i$1 = class i3 {
  constructor() {
    this.Y = void 0, this.Z = void 0;
  }
  get() {
    return this.Y;
  }
  pause() {
    this.Y ??= new Promise((t2) => this.Z = t2);
  }
  resume() {
    this.Z?.(), this.Y = this.Z = void 0;
  }
};
const n$2 = (t2) => !i$3(t2) && "function" == typeof t2.then, h = 1073741823;
let c$1 = class c extends f {
  constructor() {
    super(...arguments), this._$Cwt = h, this._$Cbt = [], this._$CK = new s(this), this._$CX = new i$1();
  }
  render(...s2) {
    return s2.find((t2) => !n$2(t2)) ?? T;
  }
  update(s2, i5) {
    const e2 = this._$Cbt;
    let r2 = e2.length;
    this._$Cbt = i5;
    const o2 = this._$CK, c3 = this._$CX;
    this.isConnected || this.disconnected();
    for (let t2 = 0; t2 < i5.length && !(t2 > this._$Cwt); t2++) {
      const s3 = i5[t2];
      if (!n$2(s3)) return this._$Cwt = t2, s3;
      t2 < r2 && s3 === e2[t2] || (this._$Cwt = h, r2 = 0, Promise.resolve(s3).then(async (t3) => {
        for (; c3.get(); ) await c3.get();
        const i6 = o2.deref();
        if (void 0 !== i6) {
          const e3 = i6._$Cbt.indexOf(s3);
          e3 > -1 && e3 < i6._$Cwt && (i6._$Cwt = e3, i6.setValue(t3));
        }
      }));
    }
    return T;
  }
  disconnected() {
    this._$CK.disconnect(), this._$CX.pause();
  }
  reconnected() {
    this._$CK.reconnect(this), this._$CX.resume();
  }
};
const m = e$1(c$1);
function n$1(n3, r2, t2) {
  return n3 ? r2(n3) : t2?.(n3);
}
const n2 = "important", i4 = " !" + n2, o = e$1(class extends i$2 {
  constructor(t2) {
    if (super(t2), t2.type !== t$1.ATTRIBUTE || "style" !== t2.name || t2.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r2) => {
      const s2 = t2[r2];
      return null == s2 ? e2 : e2 + `${r2 = r2.includes("-") ? r2 : r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s2};`;
    }, "");
  }
  update(e2, [r2]) {
    const { style: s2 } = e2.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r2)), this.render(r2);
    for (const t2 of this.ft) null == r2[t2] && (this.ft.delete(t2), t2.includes("-") ? s2.removeProperty(t2) : s2[t2] = null);
    for (const t2 in r2) {
      const e3 = r2[t2];
      if (null != e3) {
        this.ft.add(t2);
        const r3 = "string" == typeof e3 && e3.endsWith(i4);
        t2.includes("-") || r3 ? s2.setProperty(t2, r3 ? e3.slice(0, -11) : e3, r3 ? n2 : "") : s2[t2] = e3;
      }
    }
    return T;
  }
});
var __defProp$v = Object.defineProperty;
var __decorateClass$v = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$v(target, key, result);
  return result;
};
class PlayerHeader extends i$4 {
  render() {
    this.config = this.store.config.player ?? {};
    this.activePlayer = this.store.activePlayer;
    const entityStyle = this.config.headerEntityFontSize ? { fontSize: `${this.config.headerEntityFontSize}rem` } : {};
    const songStyle = this.config.headerSongFontSize ? { fontSize: `${this.config.headerSongFontSize}rem` } : {};
    return x` <div class="info">
      <div class="entity" style=${o(entityStyle)} hide=${this.config.hideEntityName || E}>
        ${getSpeakerList(this.activePlayer, this.store.predefinedGroups)}
      </div>
      <div class="song" style=${o(songStyle)}>${this.getSong()}</div>
      <div class="artist-album" hide=${this.config.hideArtistAlbum || E}>
        ${this.getAlbum()} ${n$1(this.config.showAudioInputFormat, () => m(this.getAudioInputFormat()))}
      </div>
      <sonos-progress .store=${this.store}></sonos-progress>
    </div>`;
  }
  getSong() {
    let song = this.activePlayer.getCurrentTrack();
    song = song || this.config.labelWhenNoMediaIsSelected || "No media selected";
    if (this.config.showSource && this.activePlayer.attributes.source) {
      song = `${song} (${this.activePlayer.attributes.source})`;
    }
    return song;
  }
  getAlbum() {
    let album = this.activePlayer.attributes.media_album_name;
    if (this.config.showChannel && this.activePlayer.attributes.media_channel) {
      album = this.activePlayer.attributes.media_channel;
    } else if (!this.config.hidePlaylist && this.activePlayer.attributes.media_playlist) {
      album = `${this.activePlayer.attributes.media_playlist} - ${album}`;
    }
    return album;
  }
  async getAudioInputFormat() {
    const sensors = await this.store.hassService.getRelatedEntities(this.activePlayer, "sensor");
    const audioInputFormat = sensors.find((sensor) => sensor.entity_id.includes("audio_input_format"));
    return audioInputFormat && audioInputFormat.state && audioInputFormat.state !== "No audio" ? x`<span class="audio-input-format">${audioInputFormat.state}</span>` : "";
  }
  static get styles() {
    return i$7`
      .info {
        text-align: center;
      }

      .entity {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--sonos-font-size, 1rem);
        font-weight: 500;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }

      .song {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: calc(var(--sonos-font-size, 1rem) * 1.15);
        font-weight: 400;
        color: var(--accent-color);
      }

      .artist-album {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--sonos-font-size, 1rem);
        font-weight: 300;
        color: var(--secondary-text-color);
      }

      .audio-input-format {
        color: var(--card-background-color);
        background: var(--disabled-text-color);
        white-space: nowrap;
        font-size: smaller;
        line-height: normal;
        padding: 3px;
        margin-left: 8px;
      }

      *[hide] {
        display: none;
      }
    `;
  }
}
__decorateClass$v([
  n$4({ attribute: false })
], PlayerHeader.prototype, "store");
customElements.define("sonos-player-header", PlayerHeader);
var __defProp$u = Object.defineProperty;
var __decorateClass$u = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$u(target, key, result);
  return result;
};
class Progress extends i$4 {
  constructor() {
    super(...arguments);
    this.mediaDuration = 0;
  }
  disconnectedCallback() {
    if (this.tracker) {
      clearInterval(this.tracker);
      this.tracker = void 0;
    }
    super.disconnectedCallback();
  }
  render() {
    this.activePlayer = this.store.activePlayer;
    this.mediaDuration = this.activePlayer?.attributes.media_duration || 0;
    const showProgress = this.mediaDuration > 0;
    if (showProgress) {
      this.trackProgress();
      return x`
        <div class="progress">
          <span>${convertProgress(this.playingProgress)}</span>
          <div class="bar" @click=${this.handleSeek}>
            <div class="progress-bar" style=${this.progressBarStyle(this.mediaDuration)}></div>
          </div>
          <span> -${convertProgress(this.mediaDuration - this.playingProgress)}</span>
        </div>
      `;
    }
    return x``;
  }
  async handleSeek(e2) {
    const progressWidth = this.progressBar.offsetWidth;
    const percent = e2.offsetX / progressWidth;
    const position = this.mediaDuration * percent;
    await this.store.mediaControlService.seek(this.activePlayer, position);
  }
  progressBarStyle(mediaDuration) {
    return o({ width: `${this.playingProgress / mediaDuration * 100}%` });
  }
  trackProgress() {
    const position = this.activePlayer?.attributes.media_position || 0;
    const playing = this.activePlayer?.isPlaying();
    const updatedAt = this.activePlayer?.attributes.media_position_updated_at || 0;
    if (playing) {
      this.playingProgress = position + (Date.now() - new Date(updatedAt).getTime()) / 1e3;
    } else {
      this.playingProgress = position;
    }
    if (!this.tracker) {
      this.tracker = setInterval(() => this.trackProgress(), 1e3);
    }
    if (!playing) {
      clearInterval(this.tracker);
      this.tracker = void 0;
    }
  }
  static get styles() {
    return i$7`
      .progress {
        width: 100%;
        font-size: x-small;
        display: flex;
        --paper-progress-active-color: lightgray;
      }

      .bar {
        display: flex;
        flex-grow: 1;
        align-items: center;
        padding: 5px;
        cursor: pointer;
      }

      .progress-bar {
        background-color: var(--accent-color);
        height: 50%;
        transition: width 0.1s linear;
      }
    `;
  }
}
__decorateClass$u([
  n$4({ attribute: false })
], Progress.prototype, "store");
__decorateClass$u([
  r$4()
], Progress.prototype, "playingProgress");
__decorateClass$u([
  e$2(".bar")
], Progress.prototype, "progressBar");
const convertProgress = (duration) => {
  const date = new Date(duration * 1e3).toISOString().substring(11, 19);
  return date.startsWith("00:") ? date.substring(3) : date;
};
customElements.define("sonos-progress", Progress);
var __defProp$t = Object.defineProperty;
var __decorateClass$t = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$t(target, key, result);
  return result;
};
class Volume extends i$4 {
  constructor() {
    super(...arguments);
    this.updateMembers = true;
    this.slim = false;
    this.isPlayer = false;
    this.sliderMoving = false;
    this.startVolumeSliderMoving = 0;
    this.togglePower = async () => await this.mediaControlService.togglePower(this.player);
  }
  render() {
    this.config = this.store.config;
    this.playerConfig = this.config.player ?? {};
    this.mediaControlService = this.store.mediaControlService;
    const volume = this.player.getVolume();
    const max = this.getMax();
    const isMuted = this.updateMembers ? this.player.isGroupMuted() : this.player.isMemberMuted();
    const muteIcon = isMuted ? mdiVolumeMute : mdiVolumeHigh;
    const disabled = this.player.ignoreVolume;
    const sliderHeight = this.isPlayer && this.playerConfig.volumeSliderHeight;
    const muteButtonSize = this.isPlayer && this.playerConfig.volumeMuteButtonSize;
    return x`
      <style>
        :host {
          ${sliderHeight ? `--control-slider-thickness: ${sliderHeight}rem;` : ""}
          ${muteButtonSize ? `--mdc-icon-button-size: ${muteButtonSize}rem; --mdc-icon-size: ${muteButtonSize * 0.75}rem;` : ""}
        }
      </style>
      <div class="volume" slim=${this.slim || E}>
        <ha-icon-button
          .disabled=${disabled}
          @click=${this.mute}
          .path=${muteIcon}
          hide=${this.isPlayer && this.playerConfig.hideVolumeMuteButton || E}
        >
        </ha-icon-button>
        <div class="volume-slider">
          <ha-control-slider
            .value=${volume}
            max=${max}
            @value-changed=${this.volumeChanged}
            @slider-moved=${this.sliderMoved}
            .disabled=${disabled}
            class=${this.config.dynamicVolumeSlider && max === 100 ? "over-threshold" : ""}
          ></ha-control-slider>
          <div class="volume-level" hide=${this.isPlayer && this.playerConfig.hideVolumePercentage || E}>
            <div style="flex: ${volume}">${volume > 0 ? "0%" : ""}</div>
            <div class="percentage">${volume}%</div>
            <div style="flex: ${max - volume};text-align: right">${volume < max ? `${max}%` : ""}</div>
          </div>
        </div>
        <div class="percentage-slim" hide=${this.slim && E}>${volume}%</div>
        <ha-icon-button hide=${this.store.hidePower()} @click=${this.togglePower} .path=${mdiPower}></ha-icon-button>
      </div>
    `;
  }
  getMax() {
    const volume = this.sliderMoving ? this.startVolumeSliderMoving : this.player.getVolume();
    const dynamicThreshold = Math.max(0, Math.min(this.config.dynamicVolumeSliderThreshold ?? 20, 100));
    const dynamicMax = Math.max(0, Math.min(this.config.dynamicVolumeSliderMax ?? 30, 100));
    return volume < dynamicThreshold && this.config.dynamicVolumeSlider ? dynamicMax : 100;
  }
  async sliderMoved(e2) {
    if (this.config.changeVolumeOnSlide) {
      console.log("slider moved", this.config.changeVolumeOnSlide);
      if (!this.sliderMoving) {
        this.startVolumeSliderMoving = this.player.getVolume();
      }
      this.sliderMoving = true;
      return await this.setVolume(e2);
    }
  }
  async volumeChanged(e2) {
    this.sliderMoving = false;
    return await this.setVolume(e2);
  }
  async setVolume(e2) {
    const newVolume = numberFromEvent(e2);
    return await this.mediaControlService.volumeSet(this.player, newVolume, this.updateMembers);
  }
  async mute() {
    return await this.mediaControlService.toggleMute(this.player, this.updateMembers);
  }
  static get styles() {
    return i$7`
      ha-control-slider {
        --control-slider-color: var(--accent-color);
      }

      ha-control-slider.over-threshold {
        --control-slider-color: var(--primary-text-color);
      }

      ha-control-slider[disabled] {
        --control-slider-color: var(--disabled-text-color);
      }

      *[slim] * {
        --control-slider-thickness: 10px;
        --mdc-icon-button-size: 30px;
        --mdc-icon-size: 20px;
      }

      *[slim] .volume-level {
        display: none;
      }

      .volume {
        display: flex;
        flex: 1;
      }

      .volume-slider {
        flex: 1;
        padding-right: 0.6rem;
      }

      *[slim] .volume-slider {
        display: flex;
        align-items: center;
      }

      .volume-level {
        font-size: calc(var(--sonos-font-size, 1rem) * 0.75);
        display: flex;
      }

      .percentage {
        flex: 2;
      }

      .percentage,
      .percentage-slim {
        font-weight: bold;
        align-self: center;
      }

      *[hide] {
        display: none;
      }
    `;
  }
}
__decorateClass$t([
  n$4({ attribute: false })
], Volume.prototype, "store");
__decorateClass$t([
  n$4({ attribute: false })
], Volume.prototype, "player");
__decorateClass$t([
  n$4({ type: Boolean })
], Volume.prototype, "updateMembers");
__decorateClass$t([
  n$4()
], Volume.prototype, "volumeClicked");
__decorateClass$t([
  n$4()
], Volume.prototype, "slim");
__decorateClass$t([
  n$4()
], Volume.prototype, "isPlayer");
__decorateClass$t([
  r$4()
], Volume.prototype, "sliderMoving");
__decorateClass$t([
  r$4()
], Volume.prototype, "startVolumeSliderMoving");
function numberFromEvent(e2) {
  return Number.parseInt(e2?.target?.value);
}
customElements.define("sonos-volume", Volume);
var __defProp$s = Object.defineProperty;
var __decorateClass$s = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$s(target, key, result);
  return result;
};
class Player extends i$4 {
  constructor() {
    super(...arguments);
    this.imageLoaded = false;
  }
  render() {
    this.config = this.store.config;
    this.playerConfig = this.config.player ?? {};
    this.activePlayer = this.store.activePlayer;
    this.resolveTemplateImageUrlIfNeeded();
    this.preloadImageIfNeeded();
    const blurAmount = this.playerConfig.artworkAsBackgroundBlur ?? 0;
    const artworkAsBackground = this.playerConfig.artworkAsBackground || blurAmount > 0;
    const backgroundOpacity = this.playerConfig.controlsAndHeaderBackgroundOpacity ?? 0.9;
    const backgroundOverlayColor = this.playerConfig.backgroundOverlayColor;
    const containerStyle = artworkAsBackground ? blurAmount > 0 ? `--blur-background-image: ${this.getBackgroundImageUrl()}; --blur-amount: ${blurAmount}px; --background-opacity: ${backgroundOpacity}${backgroundOverlayColor ? `; --background-overlay-color: ${backgroundOverlayColor}` : ""}` : `${this.getBackgroundImage()}; --background-opacity: ${backgroundOpacity}${backgroundOverlayColor ? `; --background-overlay-color: ${backgroundOverlayColor}` : ""}` : "";
    return x`
      <div class="container ${blurAmount > 0 ? "blurred-background" : ""}" style=${containerStyle || E}>
        <sonos-player-header
          class="header"
          background=${artworkAsBackground || E}
          .store=${this.store}
          hide=${this.playerConfig.hideHeader || E}
        ></sonos-player-header>
        <div
          class="artwork"
          hide=${artworkAsBackground && !blurAmount || this.playerConfig.hideArtwork || E}
          style=${this.artworkStyle()}
        ></div>
        <sonos-player-controls
          class="controls"
          background=${artworkAsBackground || E}
          .store=${this.store}
          hide=${this.playerConfig.hideControls || E}
          style=${this.playerConfig.controlsMargin ? `margin: ${this.playerConfig.controlsMargin}` : E}
        ></sonos-player-controls>
      </div>
    `;
  }
  artworkStyle() {
    const minHeight = this.playerConfig.artworkMinHeight ?? 5;
    const borderRadius = this.playerConfig.artworkBorderRadius ?? 0;
    if (borderRadius > 0) {
      return `${this.getBackgroundImage()}; border-radius: ${borderRadius}px; background-size: cover; aspect-ratio: 1; height: 100%; max-height: 50vh; width: auto; margin: 0 auto;`;
    }
    return `${this.getBackgroundImage()}; min-height: ${minHeight}rem`;
  }
  getBackgroundImageUrl() {
    const image = this.getArtworkImage();
    if (image?.entityImage && this.imageLoaded) {
      return `url(${image.entityImage})`;
    }
    return `url(${this.getFallbackImage()})`;
  }
  getFallbackImage() {
    return this.playerConfig.fallbackArtwork ?? (this.activePlayer.attributes.media_title === "TV" ? TV_BASE64_IMAGE : MUSIC_NOTES_BASE64_IMAGE);
  }
  getBackgroundImage() {
    const image = this.getArtworkImage();
    if (image?.entityImage && this.imageLoaded) {
      return `background-image: url(${image.entityImage})${image.sizePercentage ? `; background-size: ${image.sizePercentage}%` : ""}`;
    }
    return `background-image: url(${this.getFallbackImage()})`;
  }
  preloadImageIfNeeded() {
    const image = this.getArtworkImage();
    const imageUrl = image?.entityImage;
    if (imageUrl === this.lastCheckedImageUrl) {
      return;
    }
    this.lastCheckedImageUrl = imageUrl;
    if (!imageUrl) {
      this.imageLoaded = false;
      return;
    }
    const img = new Image();
    img.onload = () => {
      if (this.lastCheckedImageUrl === imageUrl) {
        this.imageLoaded = true;
      }
    };
    img.onerror = () => {
      if (this.lastCheckedImageUrl === imageUrl) {
        this.imageLoaded = false;
      }
    };
    img.src = imageUrl;
  }
  matchesString(value, expected) {
    return !!value && value === expected;
  }
  matchesRegexp(value, pattern) {
    if (!value || !pattern) {
      return false;
    }
    try {
      return new RegExp(pattern).test(value);
    } catch {
      return false;
    }
  }
  getMatchingOverride(entityImage) {
    const overrides = this.playerConfig.mediaArtworkOverrides;
    if (!overrides) {
      return void 0;
    }
    const { media_title, media_artist, media_album_name, media_content_id, media_channel } = this.activePlayer.attributes;
    let override = overrides.find(
      (value) => this.matchesString(media_title, value.mediaTitleEquals) || this.matchesString(media_artist, value.mediaArtistEquals) || this.matchesString(media_album_name, value.mediaAlbumNameEquals) || this.matchesString(media_channel, value.mediaChannelEquals) || this.matchesString(media_content_id, value.mediaContentIdEquals) || this.matchesRegexp(media_title, value.mediaTitleRegexp) || this.matchesRegexp(media_artist, value.mediaArtistRegexp) || this.matchesRegexp(media_album_name, value.mediaAlbumNameRegexp) || this.matchesRegexp(media_channel, value.mediaChannelRegexp) || this.matchesRegexp(media_content_id, value.mediaContentIdRegexp)
    );
    if (!override) {
      override = overrides.find((value) => !entityImage && value.ifMissing);
    }
    return override;
  }
  getArtworkImage() {
    const prefix = this.playerConfig.artworkHostname || "";
    const { entity_picture, entity_picture_local, app_id } = this.activePlayer.attributes;
    let entityImage = entity_picture ? prefix + entity_picture : entity_picture;
    if (app_id === "music_assistant") {
      entityImage = entity_picture_local ? prefix + entity_picture_local : entity_picture;
    }
    let sizePercentage = void 0;
    const override = this.getMatchingOverride(entityImage);
    if (override?.imageUrl) {
      if (override.imageUrl.includes("{{")) {
        entityImage = this.resolvedImageUrl ?? "";
      } else {
        entityImage = override.imageUrl;
      }
      sizePercentage = override?.sizePercentage ?? sizePercentage;
    }
    return { entityImage, sizePercentage };
  }
  resolveTemplateImageUrlIfNeeded() {
    const override = this.getMatchingOverride(this.activePlayer.attributes.entity_picture);
    const templateUrl = override?.imageUrl?.includes("{{") ? override.imageUrl : void 0;
    if (templateUrl && this.lastTemplateUrl !== templateUrl) {
      this.lastTemplateUrl = templateUrl;
      this.store.hassService.renderTemplate(templateUrl, "").then((result) => {
        this.resolvedImageUrl = result;
      });
    } else if (!templateUrl) {
      this.lastTemplateUrl = void 0;
      this.resolvedImageUrl = void 0;
    }
  }
  static get styles() {
    return i$7`
      .hoverable:focus,
      .hoverable:hover {
        color: var(--accent-color);
      }

      .hoverable:active {
        color: var(--primary-color);
      }

      .container {
        position: relative;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: min-content auto min-content;
        grid-template-areas:
          'header'
          'artwork'
          'controls';
        min-height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .container.blurred-background {
        background: none;
        isolation: isolate;
        overflow: hidden;
      }

      .container.blurred-background::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: var(--blur-background-image);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(var(--blur-amount));
        transform: scale(1.1);
        z-index: -1;
      }

      .header {
        grid-area: header;
        margin: 0.75rem 1.25rem;
        padding: 0.5rem;
        position: relative;
      }

      .controls {
        grid-area: controls;
        overflow-y: auto;
        margin: 0.25rem;
        padding: 0.5rem;
        position: relative;
      }

      .artwork {
        grid-area: artwork;
        align-self: center;
        flex-grow: 1;
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        min-height: 5rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        position: relative;
      }

      *[hide] {
        display: none;
      }

      *[background] {
        background-color: var(
          --background-overlay-color,
          rgba(var(--rgb-card-background-color), var(--background-opacity, 0.9))
        );
        border-radius: 10px;
      }
    `;
  }
}
__decorateClass$s([
  n$4({ attribute: false })
], Player.prototype, "store");
__decorateClass$s([
  r$4()
], Player.prototype, "resolvedImageUrl");
__decorateClass$s([
  r$4()
], Player.prototype, "imageLoaded");
const r$1 = (r2, o2, t2) => {
  for (const t3 of o2) if (t3[0] === r2) return (0, t3[1])();
  return t2?.();
};
class HassService {
  constructor(hass, section, card) {
    this.hass = hass;
    this.currentSection = section;
    this.card = card;
  }
  async callMediaService(service, inOptions) {
    this.card.dispatchEvent(customEvent(CALL_MEDIA_STARTED, { section: this.currentSection }));
    try {
      await this.hass.callService("media_player", service, inOptions);
    } finally {
      this.card.dispatchEvent(customEvent(CALL_MEDIA_DONE));
    }
  }
  async renderTemplate(template, defaultValue) {
    return new Promise((resolve) => {
      const subscribeMessage = {
        type: "render_template",
        template
      };
      try {
        this.hass.connection.subscribeMessage((response) => {
          try {
            resolve(response.result);
          } catch {
            resolve(defaultValue);
          }
        }, subscribeMessage).then((unsub) => unsub());
      } catch {
        resolve(defaultValue);
      }
    });
  }
  async getRelatedEntities(player, ...entityTypes) {
    const template = `{{ device_entities(device_id('${player.id}')) }}`;
    const result = await this.renderTemplate(template, []);
    return result.filter((item) => entityTypes.some((type) => item.includes(type))).map((item) => this.hass.states[item]);
  }
  async getQueue(mediaPlayer) {
    try {
      const ret = await this.hass.callWS({
        type: "call_service",
        domain: "sonos",
        service: "get_queue",
        target: {
          entity_id: mediaPlayer.id
        },
        return_response: true
      });
      const queueItems = ret.response[mediaPlayer.id];
      return queueItems.map((item) => {
        return {
          title: `${item.media_artist} - ${item.media_title}`
        };
      });
    } catch (e2) {
      console.error("Error getting queue", e2);
      return [];
    }
  }
  async playQueue(mediaPlayer, queuePosition) {
    this.card.dispatchEvent(customEvent(CALL_MEDIA_STARTED, { section: this.currentSection }));
    try {
      await this.hass.callService("sonos", "play_queue", {
        entity_id: mediaPlayer.id,
        queue_position: queuePosition
      });
    } finally {
      this.card.dispatchEvent(customEvent(CALL_MEDIA_DONE));
    }
  }
  async removeFromQueue(mediaPlayer, queuePosition) {
    await this.hass.callService("sonos", "remove_from_queue", {
      entity_id: mediaPlayer.id,
      queue_position: queuePosition
    });
  }
  async clearQueue(mediaPlayer) {
    await this.hass.callService("media_player", "clear_playlist", { entity_id: mediaPlayer.id });
  }
  async setSleepTimer(mediaPlayer, sleepTimer) {
    await this.hass.callService("sonos", "set_sleep_timer", {
      entity_id: mediaPlayer.id,
      sleep_time: sleepTimer
    });
  }
  async cancelSleepTimer(player) {
    await this.hass.callService("sonos", "clear_sleep_timer", {
      entity_id: player.id
    });
  }
  async setSwitch(entityId, state) {
    await this.hass.callService("switch", state ? "turn_on" : "turn_off", {
      entity_id: entityId
    });
  }
  async setNumber(entityId, value) {
    await this.hass.callService("number", "set_value", {
      entity_id: entityId,
      value
    });
  }
  async setRelatedEntityValue(player, name, value) {
    if (value === void 0) {
      return;
    }
    const type = typeof value === "number" ? "number" : "switch";
    const entityId = await this.getRelatedEntityId(player, type, name);
    if (!entityId) {
      return;
    }
    if (typeof value === "number") {
      await this.setNumber(entityId, value);
    } else {
      await this.setSwitch(entityId, value);
    }
  }
  async getRelatedEntityId(player, entityType, namePart) {
    const entities = await this.getRelatedEntities(player, entityType);
    return entities.find((e2) => e2?.entity_id?.toLowerCase().includes(namePart.toLowerCase()))?.entity_id;
  }
}
const DEFAULT_MEDIA_THUMBNAIL = "data:image/png;base64,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";
function hasItemsWithImage(items) {
  return items.some((item) => item.thumbnail);
}
function getValueFromKeyIgnoreSpecialChars(customFavoriteThumbnails, currentTitle) {
  for (const title in customFavoriteThumbnails) {
    if (removeSpecialChars(title) === removeSpecialChars(currentTitle)) {
      return customFavoriteThumbnails[title];
    }
  }
  return void 0;
}
function getThumbnail(mediaItem, config, itemsWithImage) {
  const favoritesConfig = config.mediaBrowser?.favorites ?? {};
  let thumbnail = getValueFromKeyIgnoreSpecialChars(favoritesConfig.customThumbnails, mediaItem.title) ?? mediaItem.thumbnail;
  if (!thumbnail) {
    thumbnail = getValueFromKeyIgnoreSpecialChars(favoritesConfig.customThumbnailsIfMissing, mediaItem.title);
    if (itemsWithImage && !thumbnail) {
      thumbnail = favoritesConfig.customThumbnailsIfMissing?.["default"] || DEFAULT_MEDIA_THUMBNAIL;
    }
  } else if (thumbnail?.match(/https:\/\/brands\.home-assistant\.io\/.+\/logo.png/)) {
    thumbnail = thumbnail?.replace("logo.png", "icon.png");
  }
  return thumbnail || "";
}
function removeSpecialChars(str) {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
}
function indexOfWithoutSpecialChars(array, str) {
  let result = -1;
  array.forEach((value, index) => {
    if (removeSpecialChars(value) === removeSpecialChars(str)) {
      result = index;
    }
  });
  return result;
}
function stringContainsAnyItemInArray(array, str) {
  return !!array.find((value) => str.includes(value));
}
const IGNORED_MEDIA_SOURCES = [
  "media-source://tts",
  "media-source://camera",
  "media-source://image",
  "media-source://image_upload"
];
function filterOutIgnoredMediaSources(items) {
  return items.filter((item) => !IGNORED_MEDIA_SOURCES.some((src) => item.media_content_id?.startsWith(src)));
}
function getGridItemSize(_itemsPerRow, isPortrait) {
  return { width: "100px", height: isPortrait ? "180px" : "150px" };
}
function itemsWithFallbacks(mediaPlayerItems, config) {
  const itemsWithImage = hasItemsWithImage(mediaPlayerItems);
  return mediaPlayerItems.map((item) => {
    const thumbnail = getThumbnail(item, config, itemsWithImage);
    return {
      ...item,
      thumbnail
    };
  });
}
function renderFavoritesItem(item, showTitle = true, titleColor, titleBgColor) {
  const titleStyle = o({
    color: titleColor ?? "",
    backgroundColor: titleBgColor ?? ""
  });
  return x`
    <div class="thumbnail" ?hidden=${!item.thumbnail} style="background-image: url(${item.thumbnail})"></div>
    <div class="title" ?hidden=${!showTitle} style=${titleStyle}>${item.title}</div>
  `;
}
class MediaBrowseService {
  constructor(hass, config) {
    this.hass = hass;
    this.config = config;
  }
  async getFavorites(player) {
    if (!player) {
      return [];
    }
    const favoritesConfig = this.config.mediaBrowser?.favorites;
    const hideSonosFavorites = favoritesConfig?.hideSonosFavorites ?? false;
    let favorites = [];
    if (!hideSonosFavorites) {
      favorites = await this.getFavoritesForPlayer(player);
      favorites = favorites.flatMap((f2) => f2);
      favorites = this.removeDuplicates(favorites);
      favorites = favorites.length ? favorites : this.getFavoritesFromStates(player);
    }
    const exclude = favoritesConfig?.exclude ?? [];
    return favorites.filter((item) => {
      const titleNotIgnored = !stringContainsAnyItemInArray(exclude, item.title);
      const contentIdNotIgnored = !stringContainsAnyItemInArray(exclude, item.media_content_id ?? "");
      return titleNotIgnored && contentIdNotIgnored;
    });
  }
  removeDuplicates(items) {
    const seen2 = /* @__PURE__ */ new Set();
    return items.filter((item) => {
      const key = item.media_content_id || item.title;
      if (!key || seen2.has(key)) {
        return false;
      }
      seen2.add(key);
      return true;
    });
  }
  async getFavoritesForPlayer(player) {
    const mediaRoot = await browseMediaPlayer(this.hass, player.id);
    const favoritesStr = "favorites";
    const favoritesDir = mediaRoot.children?.find(
      (child) => child.media_content_type?.toLowerCase() === favoritesStr || child.media_content_id?.toLowerCase() === favoritesStr || child.title.toLowerCase() === favoritesStr
    );
    if (!favoritesDir) {
      return [];
    }
    const favorites = [];
    await this.browseDir(player, favoritesDir, favorites);
    return favorites;
  }
  async browseDir(player, favoritesDir, favorites) {
    const dir = await browseMediaPlayer(
      this.hass,
      player.id,
      favoritesDir.media_content_id,
      favoritesDir.media_content_type
    );
    for (const child of dir.children ?? []) {
      if (child.can_play) {
        favorites.push({ ...child, favoriteType: dir.title });
      } else if (child.can_expand) {
        await this.browseDir(player, child, favorites);
      }
    }
  }
  getFavoritesFromStates(mediaPlayer) {
    const titles = mediaPlayer.attributes.source_list ?? [];
    return titles.map((title) => ({ title }));
  }
  showBrowseMedia(activePlayer, element) {
    const detail = {
      entityId: activePlayer.id,
      view: "info"
    };
    element.dispatchEvent(customEvent(HASS_MORE_INFO, detail));
  }
}
class MediaControlService {
  constructor(hassService, config) {
    this.hassService = hassService;
    this.config = config;
  }
  async join(main, memberIds) {
    await this.hassService.callMediaService("join", {
      entity_id: main,
      group_members: memberIds
    });
  }
  async unJoin(playerIds) {
    await this.hassService.callMediaService("unjoin", {
      entity_id: playerIds
    });
  }
  async activatePredefinedGroup(pg) {
    for (const pgp of pg.entities) {
      const volume = pgp.volume ?? pg.volume;
      if (volume) {
        await this.volumeSetSinglePlayer(pgp.player, volume);
      }
      if (pg.unmuteWhenGrouped) {
        await this.setVolumeMute(pgp.player, false, false);
      }
      await this.applyPredefinedGroupSettings(pgp.player, pg);
    }
    if (pg.media) {
      await this.setSource(pg.entities[0].player, pg.media);
    }
  }
  async applyPredefinedGroupSettings(player, pg) {
    await this.hassService.setRelatedEntityValue(player, "bass", pg.bass);
    await this.hassService.setRelatedEntityValue(player, "treble", pg.treble);
    await this.hassService.setRelatedEntityValue(player, "loudness", pg.loudness);
    await this.hassService.setRelatedEntityValue(player, "night_sound", pg.nightSound);
    await this.hassService.setRelatedEntityValue(player, "speech_enhancement", pg.speechEnhancement);
    await this.hassService.setRelatedEntityValue(player, "crossfade", pg.crossfade);
    await this.hassService.setRelatedEntityValue(player, "touch_controls", pg.touchControls);
    await this.hassService.setRelatedEntityValue(player, "status_light", pg.statusLight);
  }
  async stop(mediaPlayer) {
    await this.hassService.callMediaService("media_stop", { entity_id: mediaPlayer.id });
  }
  async pause(mediaPlayer) {
    await this.hassService.callMediaService("media_pause", { entity_id: mediaPlayer.id });
  }
  async prev(mediaPlayer) {
    await this.hassService.callMediaService("media_previous_track", {
      entity_id: mediaPlayer.id
    });
  }
  async next(mediaPlayer) {
    await this.hassService.callMediaService("media_next_track", { entity_id: mediaPlayer.id });
  }
  async play(mediaPlayer) {
    await this.hassService.callMediaService("media_play", { entity_id: mediaPlayer.id });
  }
  async shuffle(mediaPlayer) {
    await this.hassService.callMediaService("shuffle_set", {
      entity_id: mediaPlayer.id,
      shuffle: !mediaPlayer.attributes.shuffle
    });
  }
  async repeat(mediaPlayer) {
    const currentState = mediaPlayer.attributes.repeat;
    const repeat = currentState === "all" ? "one" : currentState === "one" ? "off" : "all";
    await this.hassService.callMediaService("repeat_set", { entity_id: mediaPlayer.id, repeat });
  }
  async volumeDown(mainPlayer, updateMembers = true) {
    await this.volumeStep(mainPlayer, updateMembers, this.getStepDownVolume, "volume_down");
  }
  async volumeUp(mainPlayer, updateMembers = true) {
    await this.volumeStep(mainPlayer, updateMembers, this.getStepUpVolume, "volume_up");
  }
  async volumeStep(mainPlayer, updateMembers, calculateVolume, stepDirection) {
    if (this.config.volumeStepSize) {
      await this.volumeWithStepSize(mainPlayer, updateMembers, this.config.volumeStepSize, calculateVolume);
    } else {
      await this.volumeDefaultStep(mainPlayer, updateMembers, stepDirection);
    }
  }
  async volumeWithStepSize(mainPlayer, updateMembers, volumeStepSize, calculateVolume) {
    for (const member of mainPlayer.members) {
      if (mainPlayer.id === member.id || updateMembers) {
        const newVolume = calculateVolume(member, volumeStepSize);
        await this.volumeSetSinglePlayer(member, newVolume);
      }
    }
  }
  getStepDownVolume(member, volumeStepSize) {
    return Math.max(0, member.getVolume() - volumeStepSize);
  }
  getStepUpVolume(member, stepSize) {
    return Math.min(100, member.getVolume() + stepSize);
  }
  async volumeDefaultStep(mainPlayer, updateMembers, stepDirection) {
    for (const member of mainPlayer.members) {
      if (mainPlayer.id === member.id || updateMembers) {
        if (!member.ignoreVolume) {
          await this.hassService.callMediaService(stepDirection, { entity_id: member.id });
        }
      }
    }
  }
  async volumeSet(player, volume, updateMembers) {
    if (updateMembers) {
      return await this.volumeSetGroup(player, volume);
    } else {
      return await this.volumeSetSinglePlayer(player, volume);
    }
  }
  async volumeSetGroup(player, volumePercent) {
    const allZero = player.members.every((member) => member.getVolume() === 0);
    if (allZero) {
      await Promise.all(
        player.members.map((member) => {
          return this.volumeSetSinglePlayer(member, volumePercent);
        })
      );
    } else {
      let relativeVolumeChange;
      if (this.config.adjustVolumeRelativeToMainPlayer) {
        relativeVolumeChange = player.getVolume() < 1 ? 1 : volumePercent / player.getVolume();
      }
      await Promise.all(
        player.members.map((member) => {
          let memberVolume = volumePercent;
          if (relativeVolumeChange !== void 0) {
            if (this.config.adjustVolumeRelativeToMainPlayer) {
              memberVolume = member.getVolume() * relativeVolumeChange;
              memberVolume = Math.min(100, Math.max(0, memberVolume));
            }
          }
          return this.volumeSetSinglePlayer(member, memberVolume);
        })
      );
    }
  }
  async volumeSetSinglePlayer(player, volumePercent) {
    if (!player.ignoreVolume) {
      const volume = volumePercent / 100;
      await this.hassService.callMediaService("volume_set", { entity_id: player.id, volume_level: volume });
    }
  }
  async toggleMute(mediaPlayer, updateMembers = true) {
    const isMuted = updateMembers ? mediaPlayer.isGroupMuted() : mediaPlayer.isMemberMuted();
    const muteVolume = !isMuted;
    await this.setVolumeMute(mediaPlayer, muteVolume, updateMembers);
  }
  async setVolumeMute(mediaPlayer, muteVolume, updateMembers = true) {
    for (const member of mediaPlayer.members) {
      if (mediaPlayer.id === member.id || updateMembers) {
        await this.hassService.callMediaService("volume_mute", { entity_id: member.id, is_volume_muted: muteVolume });
      }
    }
  }
  async setSource(mediaPlayer, source) {
    await this.hassService.callMediaService("select_source", { source, entity_id: mediaPlayer.id });
  }
  async playMedia(mediaPlayer, item) {
    await this.hassService.callMediaService("play_media", {
      entity_id: mediaPlayer.id,
      media_content_id: item.media_content_id,
      media_content_type: item.media_content_type
    });
  }
  async seek(mediaPlayer, position) {
    await this.hassService.callMediaService("media_seek", {
      entity_id: mediaPlayer.id,
      seek_position: position
    });
  }
  async togglePower(mediaPlayer) {
    const service = mediaPlayer.isOn() ? "turn_off" : "turn_on";
    await this.hassService.callMediaService(service, { entity_id: mediaPlayer.id });
  }
}
class MediaPlayer {
  constructor(hassEntity, config, mediaPlayerHassEntities) {
    this.id = hassEntity.entity_id;
    this.config = config;
    this.name = this.getEntityName(hassEntity);
    this.state = hassEntity.state;
    this.attributes = hassEntity.attributes;
    this.members = mediaPlayerHassEntities ? this.createGroupMembers(hassEntity, mediaPlayerHassEntities) : [this];
    this.volumePlayer = this.determineVolumePlayer();
    this.ignoreVolume = !!this.config.entitiesToIgnoreVolumeLevelFor?.includes(this.volumePlayer.id);
  }
  getMember(playerId) {
    return findPlayer(this.members, playerId);
  }
  hasMember(playerId) {
    return this.getMember(playerId) !== void 0;
  }
  isPlaying() {
    return this.state === "playing";
  }
  isMemberMuted() {
    return this.attributes.is_volume_muted;
  }
  isGroupMuted() {
    if (this.config.inverseGroupMuteState) {
      return this.members.some((member) => member.isMemberMuted());
    }
    return this.members.every((member) => member.isMemberMuted());
  }
  getCurrentTrack() {
    let track = `${this.attributes.media_artist || ""} - ${this.attributes.media_title || ""}`;
    track = track.replace(/^ - | - $/g, "");
    if (!track) {
      track = this.attributes.media_content_id?.replace(/.*:\/\//g, "") ?? "";
    }
    if (this.config.mediaTitleRegexToReplace) {
      track = track.replace(
        new RegExp(this.config.mediaTitleRegexToReplace, "g"),
        this.config.mediaTitleReplacement || ""
      );
    }
    return track;
  }
  getEntityName(hassEntity) {
    const name = hassEntity.attributes.friendly_name || "";
    if (this.config.entityNameRegexToReplace) {
      return name.replace(
        new RegExp(this.config.entityNameRegexToReplace, "g"),
        this.config.entityNameReplacement || ""
      );
    }
    return name;
  }
  createGroupMembers(mainHassEntity, mediaPlayerHassEntities) {
    const groupPlayerIds = getGroupPlayerIds(mainHassEntity);
    return mediaPlayerHassEntities.reduce((players, hassEntity) => {
      if (groupPlayerIds.includes(hassEntity.entity_id)) {
        return [...players, new MediaPlayer(hassEntity, this.config)];
      }
      return players;
    }, []);
  }
  determineVolumePlayer() {
    let find;
    if (this.members.length > 1 && this.config.entitiesToIgnoreVolumeLevelFor) {
      find = this.members.find((p2) => {
        return !this.config.entitiesToIgnoreVolumeLevelFor?.includes(p2.id);
      });
    }
    return find ?? this;
  }
  getVolume() {
    let volume;
    if (this.members.length > 1 && this.config.adjustVolumeRelativeToMainPlayer) {
      volume = this.getAverageVolume();
    } else {
      volume = 100 * (this.volumePlayer.attributes.volume_level || 0);
    }
    return Math.round(volume);
  }
  getAverageVolume() {
    const volumes = this.members.filter((m2) => !this.config.entitiesToIgnoreVolumeLevelFor?.includes(m2.id)).map((m2) => m2.attributes.volume_level || 0);
    return 100 * volumes.reduce((a2, b2) => a2 + b2, 0) / volumes.length;
  }
  isOn() {
    return this.state !== "off" && this.state !== "unavailable";
  }
}
class Store {
  constructor(hass, config, currentSection, card, activePlayerId) {
    this.hass = hass;
    this.config = config;
    const mediaPlayerHassEntities = this.getMediaPlayerHassEntities(this.hass);
    this.allGroups = this.createPlayerGroups(mediaPlayerHassEntities);
    this.allMediaPlayers = this.allGroups.reduce(
      (previousValue, currentValue) => [...previousValue, ...currentValue.members],
      []
    );
    this.activePlayer = this.determineActivePlayer(activePlayerId);
    this.hassService = new HassService(this.hass, currentSection, card);
    this.mediaControlService = new MediaControlService(this.hassService, config);
    this.mediaBrowseService = new MediaBrowseService(this.hass, config);
    this.predefinedGroups = this.createPredefinedGroups();
  }
  createPredefinedGroups() {
    const result = [];
    if (this.config.predefinedGroups) {
      for (const cpg of this.config.predefinedGroups) {
        const pg = this.createPredefinedGroup(cpg);
        if (pg) {
          result.push(pg);
        }
      }
    }
    return result;
  }
  createPredefinedGroup(configItem) {
    let result = void 0;
    const entities = [];
    let configEntities = configItem.entities;
    if (configItem.excludeItemsInEntitiesList) {
      configEntities = this.convertExclusionsInPredefinedGroupsToInclusions(configEntities);
    }
    for (const item of configEntities) {
      const predefinedGroupPlayer = this.createPredefinedGroupPlayer(item);
      if (predefinedGroupPlayer) {
        entities.push(predefinedGroupPlayer);
      }
    }
    if (entities.length) {
      result = {
        ...configItem,
        entities
      };
    }
    return result;
  }
  convertExclusionsInPredefinedGroupsToInclusions(configEntities) {
    return this.allMediaPlayers.filter(
      (mp) => !configEntities.find((player) => {
        return (typeof player === "string" ? player : player.player) === mp.id;
      })
    ).map((mp) => mp.id);
  }
  createPredefinedGroupPlayer(configItem) {
    let pgEntityId;
    let volume;
    if (typeof configItem === "string") {
      pgEntityId = configItem;
    } else {
      volume = configItem.volume;
      pgEntityId = configItem.player;
    }
    let result = void 0;
    if (this.hass.states[pgEntityId]?.state !== "unavailable") {
      const player = this.allMediaPlayers.find((p2) => p2.id === pgEntityId);
      if (player) {
        result = { player, volume };
      }
    } else {
      console.warn(`Player ${pgEntityId} is unavailable`);
    }
    return result;
  }
  getMediaPlayerHassEntities(hass) {
    const hassWithEntities = hass;
    const filtered = Object.values(hass.states).filter((hassEntity) => {
      if (hassEntity.entity_id.includes("media_player")) {
        if (isSonosCard(this.config)) {
          return entityMatchSonos(this.config, hassEntity, hassWithEntities);
        } else {
          return entityMatchMxmp(this.config, hassEntity, hassWithEntities);
        }
      }
      return false;
    });
    return sortEntities(this.config, filtered);
  }
  createPlayerGroups(mediaPlayerHassEntities) {
    return mediaPlayerHassEntities.filter((hassEntity) => this.isMainPlayer(hassEntity, mediaPlayerHassEntities)).map((hassEntity) => this.createPlayerGroup(hassEntity, mediaPlayerHassEntities)).filter((grp) => grp !== void 0);
  }
  isMainPlayer(hassEntity, mediaPlayerHassEntities) {
    try {
      const groupIds = getGroupPlayerIds(hassEntity).filter(
        (playerId) => mediaPlayerHassEntities.some((value) => value.entity_id === playerId)
      );
      const isGrouped = groupIds?.length > 1;
      const isMainInGroup = isGrouped && groupIds && groupIds[0] === hassEntity.entity_id;
      const available = this.hass.states[hassEntity.entity_id]?.state !== "unavailable";
      return (!isGrouped || isMainInGroup) && available;
    } catch (e2) {
      console.error("Failed to determine main player", JSON.stringify(hassEntity), e2);
      return false;
    }
  }
  createPlayerGroup(hassEntity, mediaPlayerHassEntities) {
    try {
      return new MediaPlayer(hassEntity, this.config, mediaPlayerHassEntities);
    } catch (e2) {
      console.error("Failed to create group", JSON.stringify(hassEntity), e2);
      return void 0;
    }
  }
  determineActivePlayer(activePlayerId) {
    const playerId = activePlayerId || this.getActivePlayer() || this.config.entityId;
    return this.allGroups.find((group) => group.id === playerId) || this.allGroups.find((group) => group.getMember(playerId) !== void 0) || this.allGroups.find((group) => group.isPlaying()) || this.allGroups[0];
  }
  getActivePlayer() {
    if (this.config.doNotRememberSelectedPlayer) {
      return "";
    }
    if (this.config.storePlayerInSessionStorage) {
      return this.getActivePlayerFromStorage();
    }
    return this.getActivePlayerFromUrl();
  }
  getActivePlayerFromUrl() {
    return window.location.href.includes("#") ? window.location.href.replace(/.*#/g, "") : "";
  }
  getActivePlayerFromStorage() {
    return window.sessionStorage.getItem(SESSION_STORAGE_PLAYER_ID) || "";
  }
  hidePower(hideIfOn = false) {
    if (this.config.player?.hideControlPowerButton) {
      return true;
    } else if (!supportsTurnOn(this.activePlayer)) {
      return true;
    } else if (hideIfOn && this.activePlayer.isOn()) {
      return true;
    } else {
      return E;
    }
  }
}
var __defProp$r = Object.defineProperty;
var __decorateClass$r = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$r(target, key, result);
  return result;
};
class SectionButton extends i$4 {
  render() {
    const size = this.config.sectionButtonIconSize;
    const styles = size ? {
      "--mdc-icon-button-size": `${size}rem`,
      "--mdc-icon-size": `${size * 0.6}rem`
    } : {};
    return x`<ha-icon-button
      @click=${() => this.dispatchSection()}
      selected=${this.selectedSection === this.section || E}
      style=${o(styles)}
    >
      <ha-icon .icon=${this.icon}></ha-icon>
    </ha-icon-button>`;
  }
  dispatchSection() {
    this.dispatchEvent(customEvent(SHOW_SECTION, this.section));
  }
  static get styles() {
    return i$7`
      :host > *[selected] {
        color: var(--accent-color);
      }
    `;
  }
}
__decorateClass$r([
  n$4({ attribute: false })
], SectionButton.prototype, "config");
__decorateClass$r([
  n$4()
], SectionButton.prototype, "icon");
__decorateClass$r([
  n$4()
], SectionButton.prototype, "section");
__decorateClass$r([
  n$4()
], SectionButton.prototype, "selectedSection");
customElements.define("sonos-section-button", SectionButton);
var __defProp$q = Object.defineProperty;
var __decorateClass$q = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$q(target, key, result);
  return result;
};
const { GROUPING: GROUPING$1, GROUPS: GROUPS$1, MEDIA_BROWSER: MEDIA_BROWSER$1, PLAYER: PLAYER$1, VOLUMES: VOLUMES$1, QUEUE: QUEUE$1 } = Section;
class Footer extends i$4 {
  render() {
    const icons = this.config.sectionButtonIcons;
    let sections = [
      [PLAYER$1, icons?.player ?? "mdi:home"],
      [MEDIA_BROWSER$1, icons?.mediaBrowser ?? "mdi:star-outline"],
      [GROUPS$1, icons?.groups ?? "mdi:speaker-multiple"],
      [GROUPING$1, icons?.grouping ?? "mdi:checkbox-multiple-marked-circle-outline"],
      [QUEUE$1, icons?.queue ?? "mdi:queue-first-in-last-out"],
      [VOLUMES$1, icons?.volumes ?? "mdi:tune"]
    ];
    if (!isSonosCard(this.config)) {
      sections = sections.filter(([section]) => section !== QUEUE$1);
    }
    sections = sections.filter(([section]) => !this.config.sections || this.config.sections?.includes(section));
    return x`
      ${sections.map(
      ([section, icon]) => x`
          <sonos-section-button
            .config=${this.config}
            .icon=${icon}
            .selectedSection=${this.section}
            .section=${section}
          ></sonos-section-button>
        `
    )}
    `;
  }
  static get styles() {
    return i$7`
      :host {
        display: flex;
        justify-content: space-between;
      }
      :host > * {
        align-content: center;
      }
    `;
  }
}
__decorateClass$q([
  n$4({ attribute: false })
], Footer.prototype, "config");
__decorateClass$q([
  n$4()
], Footer.prototype, "section");
customElements.define("sonos-footer", Footer);
var t, r;
!function(e2) {
  e2.language = "language", e2.system = "system", e2.comma_decimal = "comma_decimal", e2.decimal_comma = "decimal_comma", e2.space_comma = "space_comma", e2.none = "none";
}(t || (t = {})), function(e2) {
  e2.language = "language", e2.system = "system", e2.am_pm = "12", e2.twenty_four = "24";
}(r || (r = {}));
var ne = function(e2, t2, r2, n3) {
  n3 = n3 || {}, r2 = null == r2 ? {} : r2;
  var i5 = new Event(t2, { bubbles: void 0 === n3.bubbles || n3.bubbles, cancelable: Boolean(n3.cancelable), composed: void 0 === n3.composed || n3.composed });
  return i5.detail = r2, e2.dispatchEvent(i5), i5;
}, ue = function(e2, t2, r2) {
  var n3;
  return function() {
    var i5 = [].slice.call(arguments), a2 = this, o2 = function() {
      n3 = null, e2.apply(a2, i5);
    };
    clearTimeout(n3), n3 = setTimeout(o2, t2);
  };
};
var __defProp$p = Object.defineProperty;
var __decorateClass$p = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$p(target, key, result);
  return result;
};
class BaseEditor extends i$4 {
  setConfig(config) {
    this.config = JSON.parse(JSON.stringify(config));
  }
  static get styles() {
    return i$7`
      ha-svg-icon {
        margin: 5px;
      }
      ha-control-button {
        white-space: nowrap;
      }
      ha-control-button-group {
        margin: 5px;
      }
      div {
        margin-top: 20px;
      }
    `;
  }
  configChanged() {
    ne(this, "config-changed", { config: this.config });
    this.requestUpdate();
  }
  dispatchClose() {
    return this.dispatchEvent(new CustomEvent("closed"));
  }
}
__decorateClass$p([
  n$4({ attribute: false })
], BaseEditor.prototype, "config");
__decorateClass$p([
  n$4({ attribute: false })
], BaseEditor.prototype, "hass");
const GROUPS_SCHEMA = [
  {
    name: "title",
    type: "string"
  },
  {
    name: "backgroundColor",
    type: "string",
    help: "Background color for group buttons"
  },
  {
    name: "buttonWidth",
    type: "integer",
    help: "Width of group buttons (rem)",
    valueMin: 1
  },
  {
    name: "compact",
    selector: { boolean: {} }
  },
  {
    name: "hideCurrentTrack",
    selector: { boolean: {} }
  },
  {
    name: "itemMargin",
    type: "string",
    help: "Margin around groups list items (e.g., 5px, 0.5rem)"
  },
  {
    name: "speakersFontSize",
    type: "float",
    help: "Font size for speakers name (rem)",
    valueMin: 0.1
  },
  {
    name: "titleFontSize",
    type: "float",
    help: "Font size for track title (rem)",
    valueMin: 0.1
  }
];
const GROUPING_SCHEMA = [
  {
    name: "title",
    type: "string"
  },
  {
    name: "buttonColor",
    type: "string",
    help: "Background color for grouping buttons"
  },
  {
    name: "buttonFontSize",
    type: "float",
    help: "Font size for grouping buttons (rem)",
    valueMin: 0.1
  },
  {
    name: "compact",
    selector: { boolean: {} }
  },
  {
    name: "disableMainSpeakers",
    selector: { boolean: {} }
  },
  {
    name: "dontSortMembersOnTop",
    selector: { boolean: {} }
  },
  {
    name: "dontSwitchPlayer",
    selector: { boolean: {} }
  },
  {
    name: "hideUngroupAllButtons",
    selector: { boolean: {} }
  },
  {
    name: "hideVolumes",
    selector: { boolean: {} }
  },
  {
    name: "skipApplyButton",
    selector: { boolean: {} }
  }
];
const VOLUMES_SCHEMA = [
  {
    name: "title",
    type: "string"
  },
  {
    name: "additionalControlsFontSize",
    selector: { number: {} }
  },
  {
    name: "hideCogwheel",
    selector: { boolean: {} }
  },
  {
    name: "labelForAllSlider",
    type: "string"
  }
];
const QUEUE_SCHEMA = [
  {
    name: "title",
    type: "string",
    cardType: "sonos"
  },
  {
    name: "itemBackgroundColor",
    type: "string",
    cardType: "sonos"
  },
  {
    name: "itemTextColor",
    type: "string",
    cardType: "sonos"
  },
  {
    name: "selectedItemBackgroundColor",
    type: "string",
    cardType: "sonos"
  },
  {
    name: "selectedItemTextColor",
    type: "string",
    cardType: "sonos"
  }
];
const options = {
  player: "Player",
  "media browser": "Media Browser",
  groups: "Groups",
  grouping: "Grouping",
  volumes: "Volumes",
  queue: "Queue"
};
const COMMON_SCHEMA = [
  {
    type: "multi_select",
    options,
    name: "sections"
  },
  {
    type: "select",
    options: Object.entries(options).map((entry) => entry),
    name: "startSection"
  },
  {
    type: "string",
    name: "title"
  },
  {
    name: "adjustVolumeRelativeToMainPlayer",
    selector: { boolean: {} }
  },
  {
    name: "allowPlayerVolumeEntityOutsideOfGroup",
    selector: { boolean: {} }
  },
  {
    name: "baseFontSize",
    type: "float",
    help: "Base font size for the entire card (rem)",
    valueMin: 0.1
  },
  {
    name: "changeVolumeOnSlide",
    selector: { boolean: {} }
  },
  {
    name: "doNotRememberSelectedPlayer",
    selector: { boolean: {} }
  },
  {
    name: "dynamicVolumeSlider",
    selector: { boolean: {} }
  },
  {
    name: "dynamicVolumeSliderMax",
    type: "integer",
    default: 30,
    required: true,
    valueMin: 1,
    valueMax: 100
  },
  {
    name: "dynamicVolumeSliderThreshold",
    type: "integer",
    default: 20,
    required: true,
    valueMin: 1,
    valueMax: 100
  },
  {
    name: "entitiesToIgnoreVolumeLevelFor",
    help: "If you want to ignore volume level for certain players in the player section",
    selector: { entity: { multiple: true, filter: { domain: "media_player" } } }
  },
  {
    name: "fontFamily",
    type: "string",
    help: "Font family for the entire card (e.g., Arial, Roboto)"
  },
  {
    name: "footerHeight",
    type: "integer",
    valueMin: 0
  },
  {
    name: "heightPercentage",
    type: "integer",
    default: 100,
    required: true
  },
  {
    name: "inverseGroupMuteState",
    selector: { boolean: {} }
  },
  {
    name: "mediaTitleRegexToReplace",
    type: "string"
  },
  {
    name: "mediaTitleReplacement",
    type: "string"
  },
  {
    name: "minWidth",
    type: "integer",
    help: "Minimum width of the card (rem)",
    valueMin: 1
  },
  {
    name: "sectionButtonIconSize",
    type: "float",
    help: "Size of section button icons (rem)",
    valueMin: 0.1
  },
  {
    name: "storePlayerInSessionStorage",
    selector: { boolean: {} }
  },
  {
    name: "volumeStepSize",
    type: "integer",
    valueMin: 1
  },
  {
    name: "widthPercentage",
    type: "integer",
    default: 100,
    required: true
  }
];
const ENTITIES_SCHEMA = [
  {
    name: "entityId",
    help: "Not needed, but forces this player to be the selected one on loading the card (overrides url param etc)",
    selector: { entity: { multiple: false, filter: { domain: "media_player" } } }
  },
  {
    name: "entities",
    help: "Required, unless you have specified entity platform",
    cardType: "maxi",
    selector: { entity: { multiple: true, filter: { domain: "media_player" } } }
  },
  {
    name: "entities",
    help: "Not needed, unless you don't want to include all of them",
    cardType: "sonos",
    selector: { entity: { multiple: true, filter: { domain: "media_player" } } }
  },
  {
    name: "showNonSonosPlayers",
    help: "Show all media players, including those that are not on the Sonos platform",
    cardType: "sonos",
    selector: { boolean: {} }
  },
  {
    name: "entityPlatform",
    help: "Show all media players for the selected platform",
    type: "string"
  },
  {
    name: "entityNameRegexToReplace",
    type: "string"
  },
  {
    name: "entityNameReplacement",
    type: "string"
  },
  {
    name: "excludeItemsInEntitiesList",
    selector: { boolean: {} }
  }
];
const PREDEFINED_GROUP_SCHEMA = [
  { type: "string", name: "name", required: true },
  { type: "string", name: "media" },
  { type: "boolean", name: "excludeItemsInEntitiesList" },
  {
    name: "entities",
    selector: { entity: { multiple: true, filter: { domain: "media_player" } } }
  }
];
var __defProp$o = Object.defineProperty;
var __decorateClass$o = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$o(target, key, result);
  return result;
};
class PredefinedGroupEditor extends BaseEditor {
  constructor() {
    super(...arguments);
    this.groupChanged = (ev) => {
      const changed = ev.detail.value;
      const entities = changed.entities.map((id) => {
        const existing = this.predefinedGroup?.entities.find(({ player }) => player === id);
        return existing ?? { player: id };
      });
      this.predefinedGroup = { ...changed, entities };
    };
    this.volumeChanged = (ev, playerId) => {
      if (!this.predefinedGroup) {
        return;
      }
      const volume = ev.detail.value.volume;
      const entities = this.predefinedGroup.entities.map((e2) => e2.player === playerId ? { ...e2, volume } : e2);
      this.predefinedGroup = { ...this.predefinedGroup, entities };
    };
    this.save = () => {
      let groups = this.config.predefinedGroups ?? [];
      if (groups[this.index]) {
        groups[this.index] = this.predefinedGroup;
      } else {
        groups = [...groups, this.predefinedGroup];
      }
      this.config = { ...this.config, predefinedGroups: groups };
      this.configChanged();
      this.dispatchClose();
    };
    this.delete = () => {
      const groups = this.config.predefinedGroups?.filter((_2, i5) => i5 !== this.index);
      this.config = { ...this.config, predefinedGroups: groups };
      this.configChanged();
      this.dispatchClose();
    };
  }
  render() {
    if (!this.predefinedGroup) {
      this.initPredefinedGroup();
    }
    if (!this.predefinedGroup) {
      return x``;
    }
    const pgWithoutVolumes = {
      ...this.predefinedGroup,
      entities: this.predefinedGroup.entities.map((e2) => e2.player)
    };
    return x`
      <h3>Add/Edit Predefined Group</h3>
      <sonos-card-editor-form
        .data=${pgWithoutVolumes}
        .schema=${PREDEFINED_GROUP_SCHEMA}
        .config=${this.config}
        .hass=${this.hass}
        .changed=${this.groupChanged}
      ></sonos-card-editor-form>
      <h4>Volumes - will be set when players are grouped</h4>
      ${this.predefinedGroup.entities.map(({ player, volume }) => this.renderVolumeField(player, volume))}
      <ha-control-button-group>
        <ha-control-button @click=${this.save}>OK<ha-svg-icon .path=${mdiCheck}></ha-svg-icon></ha-control-button>
        <ha-control-button @click=${this.delete}
          >Delete<ha-svg-icon .path=${mdiDelete}></ha-svg-icon
        ></ha-control-button>
      </ha-control-button-group>
    `;
  }
  initPredefinedGroup() {
    const configPg = this.config.predefinedGroups?.[this.index];
    if (configPg) {
      const entities = configPg.entities.map((e2) => typeof e2 === "string" ? { player: e2 } : e2);
      this.predefinedGroup = { ...configPg, entities };
    } else {
      this.predefinedGroup = { name: "", media: "", entities: [] };
    }
  }
  renderVolumeField(player, volume) {
    const label = `${this.hass.states[player]?.attributes.friendly_name ?? player}${volume !== void 0 ? `: ${volume}` : ""}`;
    const schema = [{ type: "integer", name: "volume", label, valueMin: 0, valueMax: 100 }];
    return x`
      <sonos-card-editor-form
        .data=${{ volume }}
        .schema=${schema}
        .config=${this.config}
        .hass=${this.hass}
        .changed=${(ev) => this.volumeChanged(ev, player)}
      ></sonos-card-editor-form>
    `;
  }
}
__decorateClass$o([
  n$4({ type: Number })
], PredefinedGroupEditor.prototype, "index");
__decorateClass$o([
  r$4()
], PredefinedGroupEditor.prototype, "predefinedGroup");
customElements.define("sonos-card-predefined-group-editor", PredefinedGroupEditor);
var __defProp$n = Object.defineProperty;
var __decorateClass$n = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$n(target, key, result);
  return result;
};
class CommonTab extends BaseEditor {
  constructor() {
    super(...arguments);
    this.editPredefinedGroup = -1;
    this.simpleChanged = (ev) => {
      this.config = { ...this.config, ...ev.detail.value };
      this.configChanged();
    };
  }
  render() {
    if (this.editPredefinedGroup > -1) {
      return x`
        <sonos-card-predefined-group-editor
          .index=${this.editPredefinedGroup}
          .config=${this.config}
          .hass=${this.hass}
          @closed=${() => this.editPredefinedGroup = -1}
        ></sonos-card-predefined-group-editor>
      `;
    }
    return x`
      <h3>Entities</h3>
      ${this.renderForm(ENTITIES_SCHEMA)}
      <h3>Predefined Groups</h3>
      ${this.renderPredefinedGroupsList()}
      <h3>Other</h3>
      ${this.renderForm(COMMON_SCHEMA)}
    `;
  }
  renderForm(schema) {
    return x`
      <sonos-card-editor-form
        .schema=${schema}
        .config=${this.config}
        .hass=${this.hass}
        .data=${this.config}
        .changed=${this.simpleChanged}
      ></sonos-card-editor-form>
    `;
  }
  renderPredefinedGroupsList() {
    const groups = this.config.predefinedGroups;
    return x`
      <ha-control-button-group>
        ${groups?.map(
      (pg, index) => x`
            <ha-control-button @click=${() => this.editPredefinedGroup = index}>
              ${pg.name}<ha-svg-icon .path=${mdiPen} label="Edit"></ha-svg-icon>
            </ha-control-button>
          `
    )}
        <ha-control-button @click=${() => this.editPredefinedGroup = groups?.length ?? 0}>
          Add<ha-svg-icon .path=${mdiPlus} label="Add"></ha-svg-icon>
        </ha-control-button>
      </ha-control-button-group>
    `;
  }
}
__decorateClass$n([
  r$4()
], CommonTab.prototype, "editPredefinedGroup");
customElements.define("sonos-card-common-tab", CommonTab);
const PLAYER_SCHEMA = [
  {
    name: "artworkAsBackground",
    selector: { boolean: {} }
  },
  {
    name: "artworkAsBackgroundBlur",
    selector: { number: { min: 0, max: 100, step: 1 } }
  },
  {
    name: "artworkBorderRadius",
    selector: { number: { min: 0, max: 100, step: 1 } },
    help: "Border radius in pixels for player artwork"
  },
  {
    name: "artworkHostname",
    type: "string"
  },
  {
    name: "artworkMinHeight",
    type: "integer",
    help: "Minimum height of the artwork in rem",
    default: 5,
    required: true,
    valueMin: 0
  },
  {
    name: "backgroundOverlayColor",
    type: "string",
    help: "Background overlay color when artworkAsBackground is true (e.g., rgba(0,0,0, 0.3))"
  },
  {
    name: "controlsAndHeaderBackgroundOpacity",
    selector: { number: { min: 0, max: 1, step: 0.1 } }
  },
  {
    name: "controlsColor",
    type: "string",
    help: "Color for player control icons (e.g., pink, #ff69b4)"
  },
  {
    name: "controlsLargeIcons",
    selector: { boolean: {} }
  },
  {
    name: "controlsMargin",
    type: "string",
    help: "Margin around player controls (e.g., 0 3rem)"
  },
  {
    name: "fallbackArtwork",
    type: "string",
    help: "Override default fallback artwork image if artwork is missing for the currently selected media"
  },
  {
    name: "fastForwardAndRewindStepSizeSeconds",
    type: "integer",
    default: 15,
    valueMin: 1
  },
  {
    name: "headerEntityFontSize",
    type: "float",
    help: "Font size for entity name in player header (rem)",
    valueMin: 0.1
  },
  {
    name: "headerSongFontSize",
    type: "float",
    help: "Font size for song title in player header (rem)",
    valueMin: 0.1
  },
  {
    name: "hideArtistAlbum",
    selector: { boolean: {} }
  },
  {
    name: "hideArtwork",
    selector: { boolean: {} }
  },
  {
    name: "hideControls",
    selector: { boolean: {} }
  },
  {
    name: "hideControlNextTrackButton",
    selector: { boolean: {} }
  },
  {
    name: "hideControlPowerButton",
    selector: { boolean: {} }
  },
  {
    name: "hideControlPrevTrackButton",
    selector: { boolean: {} }
  },
  {
    name: "hideControlRepeatButton",
    selector: { boolean: {} }
  },
  {
    name: "hideControlShuffleButton",
    selector: { boolean: {} }
  },
  {
    name: "hideEntityName",
    selector: { boolean: {} }
  },
  {
    name: "hideHeader",
    selector: { boolean: {} }
  },
  {
    name: "hidePlaylist",
    selector: { boolean: {} }
  },
  {
    name: "hideVolume",
    selector: { boolean: {} }
  },
  {
    name: "hideVolumeMuteButton",
    selector: { boolean: {} }
  },
  {
    name: "hideVolumePercentage",
    selector: { boolean: {} }
  },
  {
    name: "labelWhenNoMediaIsSelected",
    type: "string"
  },
  {
    name: "showAudioInputFormat",
    selector: { boolean: {} }
  },
  {
    name: "showBrowseMediaButton",
    selector: { boolean: {} }
  },
  {
    name: "showChannel",
    selector: { boolean: {} }
  },
  {
    name: "showFastForwardAndRewindButtons",
    selector: { boolean: {} }
  },
  {
    name: "showSource",
    selector: { boolean: {} }
  },
  {
    name: "showVolumeUpAndDownButtons",
    selector: { boolean: {} }
  },
  {
    name: "stopInsteadOfPause",
    selector: { boolean: {} }
  },
  {
    name: "volumeEntityId",
    selector: { entity: { multiple: false, filter: { domain: "media_player" } } }
  },
  {
    name: "volumeMuteButtonSize",
    type: "float",
    help: "Size of mute button in player (rem)",
    valueMin: 0.1
  },
  {
    name: "volumeSliderHeight",
    type: "float",
    help: "Height of volume slider in player (rem)",
    valueMin: 0.1
  }
];
var __defProp$m = Object.defineProperty;
var __decorateClass$m = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$m(target, key, result);
  return result;
};
const ARTWORK_OVERRIDE_SCHEMA = [
  { name: "ifMissing", selector: { boolean: {} } },
  { name: "mediaTitleEquals", type: "string" },
  { name: "mediaArtistEquals", type: "string" },
  { name: "mediaAlbumNameEquals", type: "string" },
  { name: "mediaContentIdEquals", type: "string" },
  { name: "mediaChannelEquals", type: "string" },
  { name: "mediaTitleRegexp", type: "string" },
  { name: "mediaArtistRegexp", type: "string" },
  { name: "mediaAlbumNameRegexp", type: "string" },
  { name: "mediaContentIdRegexp", type: "string" },
  { name: "mediaChannelRegexp", type: "string" },
  { name: "imageUrl", type: "string" },
  { type: "integer", name: "sizePercentage", default: 100, required: true, valueMin: 1, valueMax: 100 }
];
class ArtworkOverrideEditor extends BaseEditor {
  constructor() {
    super(...arguments);
    this.changed = (ev) => {
      const changed = ev.detail.value;
      const player = this.config.player ?? {};
      let overrides = player.mediaArtworkOverrides ?? [];
      if (overrides[this.index]) {
        overrides[this.index] = changed;
      } else {
        overrides = [...overrides, changed];
      }
      this.config = { ...this.config, player: { ...player, mediaArtworkOverrides: overrides } };
      this.configChanged();
    };
    this.delete = () => {
      const player = this.config.player ?? {};
      const overrides = player.mediaArtworkOverrides?.filter((_2, i5) => i5 !== this.index);
      this.config = { ...this.config, player: { ...player, mediaArtworkOverrides: overrides } };
      this.configChanged();
      this.dispatchClose();
    };
  }
  render() {
    const playerConfig = this.config.player ?? {};
    const override = playerConfig.mediaArtworkOverrides?.[this.index] ?? { ifMissing: false };
    const isExisting = !!playerConfig.mediaArtworkOverrides?.[this.index];
    return x`
      <h3>Add/Edit Artwork Override</h3>
      <sonos-card-editor-form
        .data=${override}
        .schema=${ARTWORK_OVERRIDE_SCHEMA}
        .config=${this.config}
        .hass=${this.hass}
        .changed=${this.changed}
      ></sonos-card-editor-form>
      <ha-control-button-group>
        <ha-control-button @click=${this.dispatchClose}
          >OK<ha-svg-icon .path=${mdiCheck}></ha-svg-icon
        ></ha-control-button>
        ${isExisting ? x`<ha-control-button @click=${this.delete}
              >Delete<ha-svg-icon .path=${mdiDelete}></ha-svg-icon
            ></ha-control-button>` : E}
      </ha-control-button-group>
    `;
  }
}
__decorateClass$m([
  n$4({ type: Number })
], ArtworkOverrideEditor.prototype, "index");
customElements.define("sonos-card-artwork-override-editor", ArtworkOverrideEditor);
var __defProp$l = Object.defineProperty;
var __decorateClass$l = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$l(target, key, result);
  return result;
};
class PlayerTab extends BaseEditor {
  constructor() {
    super(...arguments);
    this.editArtworkOverride = -1;
    this.sectionChanged = (ev) => {
      const changed = ev.detail.value;
      this.config = { ...this.config, player: { ...this.config.player ?? {}, ...changed } };
      this.configChanged();
    };
  }
  render() {
    if (this.editArtworkOverride > -1) {
      return x`
        <sonos-card-artwork-override-editor
          .index=${this.editArtworkOverride}
          .config=${this.config}
          .hass=${this.hass}
          @closed=${() => this.editArtworkOverride = -1}
        ></sonos-card-artwork-override-editor>
      `;
    }
    return x`
      <sonos-card-editor-form
        .schema=${PLAYER_SCHEMA}
        .config=${this.config}
        .hass=${this.hass}
        .section=${"player"}
        .changed=${this.sectionChanged}
      ></sonos-card-editor-form>
      <h3>Artwork Overrides</h3>
      ${this.renderArtworkOverridesList()}
    `;
  }
  renderArtworkOverridesList() {
    const items = this.config.player?.mediaArtworkOverrides;
    return x`
      <ha-control-button-group>
        ${items?.map(
      (item, index) => x`
            <ha-control-button @click=${() => this.editArtworkOverride = index}>
              ${this.getOverrideName(item, index)}<ha-svg-icon .path=${mdiPen} label="Edit"></ha-svg-icon>
            </ha-control-button>
          `
    )}
        <ha-control-button @click=${() => this.editArtworkOverride = items?.length ?? 0}>
          Add<ha-svg-icon .path=${mdiPlus} label="Add"></ha-svg-icon>
        </ha-control-button>
      </ha-control-button-group>
    `;
  }
  getOverrideName(item, index) {
    return item.mediaTitleEquals || item.mediaArtistEquals || item.mediaAlbumNameEquals || item.mediaContentIdEquals || item.mediaChannelEquals || item.ifMissing && "if missing" || index;
  }
}
__decorateClass$l([
  r$4()
], PlayerTab.prototype, "editArtworkOverride");
customElements.define("sonos-card-player-tab", PlayerTab);
const MEDIA_BROWSER_SCHEMA = [
  {
    name: "hideHeader",
    selector: { boolean: {} }
  },
  {
    name: "itemsPerRow",
    type: "integer",
    valueMin: 1
  },
  {
    name: "onlyFavorites",
    selector: { boolean: {} }
  }
];
const SHORTCUT_SUB_SCHEMA = [
  {
    name: "media_content_id",
    type: "string",
    help: "The content ID of the folder (use browser DevTools to find this)"
  },
  {
    name: "media_content_type",
    type: "string",
    help: "The content type (e.g., spotify://library)"
  },
  {
    name: "icon",
    type: "string",
    help: "Icon for the button (e.g., mdi:spotify). Default is bookmark icon."
  },
  {
    name: "name",
    type: "string",
    help: "Tooltip/name for the shortcut button"
  }
];
const FAVORITES_SUB_SCHEMA = [
  {
    name: "title",
    type: "string"
  },
  {
    name: "exclude",
    type: "string"
  },
  {
    name: "hideTitleForThumbnailIcons",
    selector: { boolean: {} }
  },
  {
    name: "iconBorder",
    type: "string",
    help: "Border for favorites icons (e.g., 1px solid white)"
  },
  {
    name: "iconPadding",
    type: "float",
    help: "Padding around favorites icon artwork (rem)",
    valueMin: 0
  },
  {
    name: "iconTitleBackgroundColor",
    type: "string",
    help: "Background color for favorites icon titles"
  },
  {
    name: "iconTitleColor",
    type: "string",
    help: "Color for favorites icon titles (e.g., red, #ff0000)"
  },
  {
    name: "numberToShow",
    type: "integer",
    valueMin: 1
  },
  {
    name: "sortByType",
    selector: { boolean: {} }
  },
  {
    name: "typeColor",
    type: "string",
    help: "Color for type headers when sortByType is enabled"
  },
  {
    name: "typeFontSize",
    type: "string",
    help: "Font size for type headers (e.g., 18px)"
  },
  {
    name: "typeFontWeight",
    type: "string",
    help: "Font weight for type headers (e.g., normal, bold)"
  },
  {
    name: "typeMarginBottom",
    type: "string",
    help: "Bottom margin for type headers (e.g., 6px)"
  },
  {
    name: "topItems",
    type: "string"
  }
];
class MediaBrowserTab extends BaseEditor {
  constructor() {
    super(...arguments);
    this.mediaBrowserChanged = (ev) => {
      const changed = ev.detail.value;
      this.config = {
        ...this.config,
        mediaBrowser: {
          ...this.config.mediaBrowser ?? {},
          ...changed
        }
      };
      this.configChanged();
    };
    this.shortcutChanged = (ev) => {
      const changed = ev.detail.value;
      const mediaBrowser = this.config.mediaBrowser ?? {};
      const shortcut = Object.fromEntries(
        Object.entries({
          ...mediaBrowser.shortcut ?? {},
          ...changed
        }).filter(([, v2]) => v2 !== "" && v2 !== void 0)
      );
      this.config = {
        ...this.config,
        mediaBrowser: {
          ...mediaBrowser,
          shortcut: Object.keys(shortcut).length > 0 ? shortcut : void 0
        }
      };
      this.configChanged();
    };
    this.favoritesChanged = (ev) => {
      const changed = ev.detail.value;
      const mediaBrowser = this.config.mediaBrowser ?? {};
      this.config = {
        ...this.config,
        mediaBrowser: {
          ...mediaBrowser,
          favorites: {
            ...mediaBrowser.favorites ?? {},
            ...changed,
            exclude: changed.exclude?.split(/ *, */).filter(Boolean) ?? [],
            topItems: changed.topItems?.split(/ *, */).filter(Boolean) ?? []
          }
        }
      };
      this.configChanged();
    };
  }
  render() {
    const mediaBrowserConfig = this.config.mediaBrowser ?? {};
    const favoritesConfig = mediaBrowserConfig.favorites ?? {};
    const shortcutConfig = mediaBrowserConfig.shortcut ?? {};
    const exclude = favoritesConfig.exclude ?? [];
    const topItems = favoritesConfig.topItems ?? [];
    const mediaBrowserData = { ...mediaBrowserConfig };
    const favoritesData = { ...favoritesConfig, exclude: exclude.join(", "), topItems: topItems.join(", ") };
    const shortcutData = { ...shortcutConfig };
    return x`
      <sonos-card-editor-form
        .schema=${MEDIA_BROWSER_SCHEMA}
        .config=${this.config}
        .hass=${this.hass}
        .data=${mediaBrowserData}
        .changed=${this.mediaBrowserChanged}
      ></sonos-card-editor-form>

      <h3>Shortcut</h3>
      <sonos-card-editor-form
        .schema=${SHORTCUT_SUB_SCHEMA}
        .config=${this.config}
        .hass=${this.hass}
        .data=${shortcutData}
        .changed=${this.shortcutChanged}
      ></sonos-card-editor-form>

      <h3>Favorites</h3>
      <sonos-card-editor-form
        .schema=${FAVORITES_SUB_SCHEMA}
        .config=${this.config}
        .hass=${this.hass}
        .data=${favoritesData}
        .changed=${this.favoritesChanged}
      ></sonos-card-editor-form>

      <div class="yaml-note">
        The following needs to be configured using code (YAML):
        <ul>
          <li>customFavorites</li>
          <li>customThumbnails</li>
          <li>customThumbnailsIfMissing</li>
        </ul>
      </div>
    `;
  }
  static get styles() {
    return i$7`
      h3 {
        margin: 20px 0 10px;
        font-size: 1.1em;
        border-bottom: 1px solid var(--divider-color);
        padding-bottom: 5px;
      }
      h3:first-child {
        margin-top: 0;
      }
      .yaml-note {
        margin-top: 20px;
      }
    `;
  }
}
customElements.define("sonos-card-media-browser-tab", MediaBrowserTab);
var __defProp$k = Object.defineProperty;
var __decorateClass$k = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$k(target, key, result);
  return result;
};
class SectionTab extends BaseEditor {
  constructor() {
    super(...arguments);
    this.sectionChanged = (ev) => {
      const changed = ev.detail.value;
      this.config = { ...this.config, [this.section]: { ...this.config[this.section] ?? {}, ...changed } };
      this.configChanged();
    };
  }
  render() {
    return x`
      <sonos-card-editor-form
        .schema=${this.schema}
        .config=${this.config}
        .hass=${this.hass}
        .section=${this.section}
        .changed=${this.sectionChanged}
      ></sonos-card-editor-form>
    `;
  }
}
__decorateClass$k([
  n$4({ attribute: false })
], SectionTab.prototype, "schema");
__decorateClass$k([
  n$4()
], SectionTab.prototype, "section");
customElements.define("sonos-card-section-tab", SectionTab);
var __defProp$j = Object.defineProperty;
var __decorateClass$j = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$j(target, key, result);
  return result;
};
class Form extends BaseEditor {
  constructor() {
    super(...arguments);
    this.handleValueChanged = (ev) => {
      const changed = ev.detail.value;
      if (this.section) {
        this.config = {
          ...this.config,
          [this.section]: { ...this.config[this.section] ?? {}, ...changed }
        };
      } else {
        this.config = { ...this.config, ...changed };
      }
      this.configChanged();
    };
  }
  render() {
    const schema = filterEditorSchemaOnCardType(this.schema, this.config.type);
    const data = this.section ? this.config[this.section] ?? {} : this.data || this.config;
    return x`
      <ha-form
        .data=${data}
        .schema=${schema}
        .computeLabel=${createComputeLabel()}
        .hass=${this.hass}
        @value-changed=${this.changed || this.handleValueChanged}
      ></ha-form>
    `;
  }
}
__decorateClass$j([
  n$4({ attribute: false })
], Form.prototype, "schema");
__decorateClass$j([
  n$4({ attribute: false })
], Form.prototype, "data");
__decorateClass$j([
  n$4()
], Form.prototype, "changed");
__decorateClass$j([
  n$4()
], Form.prototype, "section");
function createComputeLabel() {
  return ({ help, label, name }) => {
    if (label) {
      return label;
    }
    const unCamelCased = name.replace(/([A-Z])/g, " $1");
    const capitalized = unCamelCased.charAt(0).toUpperCase() + unCamelCased.slice(1);
    return capitalized + (help ? ` (${help})` : "");
  };
}
function filterEditorSchemaOnCardType(schema, cardType) {
  return schema.filter((schema2) => schema2.cardType === void 0 || cardType.indexOf(schema2.cardType) > -1);
}
customElements.define("sonos-card-editor-form", Form);
var __defProp$i = Object.defineProperty;
var __decorateClass$i = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$i(target, key, result);
  return result;
};
var Tab = /* @__PURE__ */ ((Tab2) => {
  Tab2["COMMON"] = "Common";
  Tab2["PLAYER"] = "Player";
  Tab2["MEDIA_BROWSER"] = "Media Browser";
  Tab2["GROUPS"] = "Groups";
  Tab2["GROUPING"] = "Grouping";
  Tab2["VOLUMES"] = "Volumes";
  Tab2["QUEUE"] = "Queue";
  return Tab2;
})(Tab || {});
class CardEditor extends BaseEditor {
  constructor() {
    super(...arguments);
    this.activeTab = "Common";
    this.navigatePrev = () => {
      const idx = this.activeTabIndex;
      if (idx > 0) {
        this.activeTab = this.tabs[idx - 1];
        this.scrollToActiveTab();
      }
    };
    this.navigateNext = () => {
      const idx = this.activeTabIndex;
      if (idx < this.tabs.length - 1) {
        this.activeTab = this.tabs[idx + 1];
        this.scrollToActiveTab();
      }
    };
  }
  get tabs() {
    return Object.values(Tab).filter((tab) => tab !== "Queue" || isSonosCard(this.config));
  }
  get activeTabIndex() {
    return this.tabs.indexOf(this.activeTab);
  }
  scrollToActiveTab() {
    requestAnimationFrame(() => {
      const container = this.shadowRoot?.querySelector(".tabs-list");
      const activeButton = this.shadowRoot?.querySelector(".tab-button.active");
      if (container && activeButton) {
        activeButton.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    });
  }
  render() {
    if (!this.config) {
      return x``;
    }
    if (!this.config.sections || this.config.sections.length === 0) {
      this.config.sections = [Section.PLAYER, Section.VOLUMES, Section.GROUPS, Section.GROUPING, Section.MEDIA_BROWSER];
      if (isSonosCard(this.config)) {
        this.config.sections.push(Section.QUEUE);
      }
    }
    const tabs = this.tabs;
    const activeIndex = this.activeTabIndex;
    const showLeftArrow = activeIndex > 0;
    const showRightArrow = activeIndex < tabs.length - 1;
    return x`
      <div class="tabs-container">
        <ha-icon-button
          class="nav-arrow ${showLeftArrow ? "" : "hidden"}"
          .path=${mdiChevronLeft}
          @click=${this.navigatePrev}
        ></ha-icon-button>
        <div class="tabs-list">
          ${tabs.map(
      (tab) => x`
              <button
                class="tab-button ${this.activeTab === tab ? "active" : ""}"
                @click=${() => this.activeTab = tab}
              >
                ${tab}
              </button>
            `
    )}
        </div>
        <ha-icon-button
          class="nav-arrow ${showRightArrow ? "" : "hidden"}"
          .path=${mdiChevronRight}
          @click=${this.navigateNext}
        ></ha-icon-button>
      </div>
      ${this.renderTabContent()}
    `;
  }
  renderTabContent() {
    const c3 = this.config, h2 = this.hass;
    const t2 = (s2, sec) => x`<sonos-card-section-tab .schema=${s2} .section=${sec} .config=${c3} .hass=${h2}></sonos-card-section-tab>`;
    return r$1(this.activeTab, [
      ["Common", () => x`<sonos-card-common-tab .config=${c3} .hass=${h2}></sonos-card-common-tab>`],
      ["Player", () => x`<sonos-card-player-tab .config=${c3} .hass=${h2}></sonos-card-player-tab>`],
      [
        "Media Browser",
        () => x`<sonos-card-media-browser-tab .config=${c3} .hass=${h2}></sonos-card-media-browser-tab>`
      ],
      ["Groups", () => t2(GROUPS_SCHEMA, "groups")],
      ["Grouping", () => t2(GROUPING_SCHEMA, "grouping")],
      ["Volumes", () => t2(VOLUMES_SCHEMA, "volumes")],
      ["Queue", () => t2(QUEUE_SCHEMA, "queue")]
    ]);
  }
  static get styles() {
    return i$7`
      :host {
        display: block;
      }
      .tabs-container {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 0 10px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .tabs-list {
        display: flex;
        gap: 4px;
        overflow-x: auto;
        flex: 1;
        scrollbar-width: none;
        padding-bottom: 2px;
      }
      .tabs-list::-webkit-scrollbar {
        display: none;
      }
      .tab-button {
        height: 32px;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        font-size: 14px;
        cursor: pointer;
        border-radius: 4px;
        position: relative;
        padding: 0 8px;
        white-space: nowrap;
      }
      .tab-button:hover {
        background: var(--secondary-background-color);
      }
      .tab-button.active {
        color: var(--primary-color);
      }
      .tab-button.active::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--primary-color);
      }
      .nav-arrow {
        --mdc-icon-button-size: 32px;
        --mdc-icon-size: 20px;
        color: var(--primary-color);
        flex-shrink: 0;
      }
      .nav-arrow.hidden {
        visibility: hidden;
      }
    `;
  }
}
__decorateClass$i([
  r$4()
], CardEditor.prototype, "activeTab");
customElements.define("sonos-card-editor", CardEditor);
var __defProp$h = Object.defineProperty;
var __decorateClass$h = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$h(target, key, result);
  return result;
};
class Shuffle extends i$4 {
  constructor() {
    super(...arguments);
    this.shuffle = async () => await this.mediaControlService.shuffle(this.activePlayer);
  }
  render() {
    this.activePlayer = this.store.activePlayer;
    this.mediaControlService = this.store.mediaControlService;
    return x`<ha-icon-button @click=${this.shuffle} .path=${this.shuffleIcon()}></ha-icon-button> `;
  }
  shuffleIcon() {
    return this.activePlayer?.attributes.shuffle ? mdiShuffle : mdiShuffleDisabled;
  }
}
__decorateClass$h([
  n$4({ attribute: false })
], Shuffle.prototype, "store");
customElements.define("sonos-shuffle", Shuffle);
var __defProp$g = Object.defineProperty;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$g(target, key, result);
  return result;
};
class Repeat extends i$4 {
  constructor() {
    super(...arguments);
    this.repeat = async () => await this.mediaControlService.repeat(this.activePlayer);
  }
  render() {
    this.activePlayer = this.store.activePlayer;
    this.mediaControlService = this.store.mediaControlService;
    return x`<ha-icon-button @click=${this.repeat} .path=${this.repeatIcon()}></ha-icon-button> `;
  }
  repeatIcon() {
    const repeatState = this.activePlayer?.attributes.repeat;
    return repeatState === "all" ? mdiRepeat : repeatState === "one" ? mdiRepeatOnce : mdiRepeatOff;
  }
}
__decorateClass$g([
  n$4({ attribute: false })
], Repeat.prototype, "store");
customElements.define("sonos-repeat", Repeat);
var __defProp$f = Object.defineProperty;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$f(target, key, result);
  return result;
};
class Source extends i$4 {
  constructor() {
    super(...arguments);
    this.setSource = async (event) => await this.mediaControlService.setSource(
      this.activePlayer,
      this.activePlayer.attributes.source_list[event.detail.index]
    );
  }
  render() {
    this.activePlayer = this.store.activePlayer;
    this.mediaControlService = this.store.mediaControlService;
    const sourceLabel = this.store.hass.localize("ui.card.media_player.source") || "Source";
    return x`
      <div>
        <span>${sourceLabel}</span>
        <ha-select
          .label=${sourceLabel}
          .value=${this.activePlayer.attributes.source}
          @selected=${this.setSource}
          naturalMenuWidth
        >
          ${this.activePlayer.attributes.source_list?.map((source) => {
      return x` <ha-list-item .value=${source}> ${source} </ha-list-item> `;
    })}
        </ha-select>
      </div>
    `;
  }
  static get styles() {
    return i$7`
      div {
        display: flex;
        color: var(--primary-text-color);
        justify-content: center;
        gap: 10px;
      }
      span {
        align-content: center;
      }
    `;
  }
}
__decorateClass$f([
  n$4({ attribute: false })
], Source.prototype, "store");
customElements.define("sonos-source", Source);
var __defProp$e = Object.defineProperty;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$e(target, key, result);
  return result;
};
const { GROUPING, GROUPS, MEDIA_BROWSER, PLAYER, VOLUMES, QUEUE } = Section;
const TITLE_HEIGHT = 2;
const FOOTER_HEIGHT = 5;
class Card extends i$4 {
  constructor() {
    super(...arguments);
    this.hashChangeListener = () => {
      this.activePlayerId = void 0;
      this.createStore();
    };
    this.showSectionListener = (event) => {
      const section = event.detail;
      if (!this.config.sections || this.config.sections.indexOf(section) > -1) {
        this.section = section;
      }
    };
    this.callMediaStartedListener = (event) => {
      if (!this.showLoader && (!this.config.sections || event.detail.section === this.section)) {
        this.cancelLoader = false;
        setTimeout(() => {
          if (!this.cancelLoader) {
            this.showLoader = true;
            this.loaderTimestamp = Date.now();
          }
        }, 300);
      }
    };
    this.callMediaDoneListener = () => {
      this.cancelLoader = true;
      const duration = Date.now() - this.loaderTimestamp;
      if (this.showLoader) {
        if (duration < 1e3) {
          setTimeout(() => this.showLoader = false, 1e3 - duration);
        } else {
          this.showLoader = false;
        }
      }
    };
    this.activePlayerListener = (event) => {
      const newEntityId = event.detail.entityId;
      if (newEntityId !== this.activePlayerId) {
        this.activePlayerId = newEntityId;
        if (this.config.sections?.includes(PLAYER)) {
          this.section = PLAYER;
        }
        this.requestUpdate();
      }
    };
    this.onMediaItemSelected = () => {
      if (this.config.sections?.includes(PLAYER)) {
        setTimeout(() => this.section = PLAYER, 1e3);
      }
    };
  }
  render() {
    this.createStore();
    let height = getHeight(this.config);
    const sections = this.config.sections;
    const showFooter = !sections || sections.length > 1;
    const footerHeight = this.config.footerHeight || FOOTER_HEIGHT;
    const contentHeight = showFooter ? height - footerHeight : height;
    const title = this.config.title;
    height = title ? height + TITLE_HEIGHT : height;
    const noPlayersText = isSonosCard(this.config) ? "No supported players found" : "No players found. Make sure you have configured entities in the card's configuration, or configured `entityPlatform`.";
    return x`
      <ha-card style=${this.haCardStyle(height)}>
        <div class="loader" ?hidden=${!this.showLoader}>
          <ha-circular-progress indeterminate></ha-circular-progress></div
        >
        </div>
        ${title ? x`<div class="title">${title}</div>` : x``}
        <div class="content" style=${this.contentStyle(contentHeight)}>
          ${this.activePlayerId ? r$1(this.section, [
      [PLAYER, () => x` <sonos-player .store=${this.store}></sonos-player>`],
      [
        GROUPS,
        () => x` <sonos-groups
                        .store=${this.store}
                        @active-player=${this.activePlayerListener}
                      ></sonos-groups>`
      ],
      [
        GROUPING,
        () => x`<sonos-grouping
                        .store=${this.store}
                        @active-player=${this.activePlayerListener}
                      ></sonos-grouping>`
      ],
      [VOLUMES, () => x` <sonos-volumes .store=${this.store}></sonos-volumes>`],
      [
        MEDIA_BROWSER,
        () => x`<sonos-media-browser
                        .store=${this.store}
                        @item-selected=${this.onMediaItemSelected}
                      ></sonos-media-browser>`
      ],
      [
        QUEUE,
        () => x`<sonos-queue .store=${this.store} @item-selected=${this.onMediaItemSelected}></sonos-queue>`
      ]
    ]) : x`<div class="no-players">${noPlayersText}</div>`}
        </div>
        ${n$1(
      showFooter,
      () => x`<sonos-footer
              style=${this.footerStyle(footerHeight)}
              .config=${this.config}
              .section=${this.section}
              @show-section=${this.showSectionListener}
            >
            </sonos-footer>`
    )}
      </ha-card>
    `;
  }
  createStore() {
    if (this.activePlayerId) {
      this.store = new Store(this.hass, this.config, this.section, this, this.activePlayerId);
    } else {
      this.store = new Store(this.hass, this.config, this.section, this);
      this.activePlayerId = this.store.activePlayer?.id;
    }
  }
  getCardSize() {
    return 3;
  }
  static getConfigElement() {
    return document.createElement("sonos-card-editor");
  }
  connectedCallback() {
    super.connectedCallback();
    if (cardDoesNotContainAllSections(this.config)) {
      window.addEventListener(ACTIVE_PLAYER_EVENT, this.activePlayerListener);
    }
    window.addEventListener(CALL_MEDIA_STARTED, this.callMediaStartedListener);
    window.addEventListener(CALL_MEDIA_DONE, this.callMediaDoneListener);
    if (!this.config.storePlayerInSessionStorage && !this.config.doNotRememberSelectedPlayer) {
      window.addEventListener("hashchange", this.hashChangeListener);
    }
  }
  disconnectedCallback() {
    window.removeEventListener(ACTIVE_PLAYER_EVENT, this.activePlayerListener);
    window.removeEventListener(CALL_MEDIA_STARTED, this.callMediaStartedListener);
    window.removeEventListener(CALL_MEDIA_DONE, this.callMediaDoneListener);
    window.removeEventListener("hashchange", this.hashChangeListener);
    super.disconnectedCallback();
  }
  haCardStyle(height) {
    const width = getWidth(this.config);
    const minWidth = this.config.minWidth ?? 20;
    return o({
      color: "var(--secondary-text-color)",
      height: `${height}rem`,
      minWidth: `${minWidth}rem`,
      maxWidth: `${width}rem`,
      overflow: "hidden",
      // only set borderRadius if this.config.style.borderRadius is set, otherwise the card looks weird with box-shadow
      ...this.config.style?.borderRadius ? { borderRadius: this.config.style.borderRadius } : {},
      ...this.config.baseFontSize ? {
        fontSize: `${this.config.baseFontSize}rem`,
        "--sonos-font-size": `${this.config.baseFontSize}rem`,
        "--ha-font-size-s": "0.75em",
        "--ha-font-size-m": "0.875em",
        "--ha-font-size-l": "1em",
        "--ha-font-size-xl": "1.125em",
        "--ha-font-size-2xl": "1.25em",
        "--ha-font-size-4xl": "1.5em"
      } : {},
      ...this.config.fontFamily ? {
        fontFamily: this.config.fontFamily,
        "--mdc-typography-font-family": this.config.fontFamily,
        "--ha-font-family-body": this.config.fontFamily
      } : {}
    });
  }
  footerStyle(height) {
    return o({
      height: `${height}rem`,
      padding: "0 1rem"
    });
  }
  contentStyle(height) {
    return o({
      overflowY: "auto",
      height: `${height}rem`
    });
  }
  setConfig(config) {
    const newConfig = JSON.parse(JSON.stringify(config));
    for (const [key, value] of Object.entries(newConfig)) {
      if (Array.isArray(value) && value.length === 0) {
        delete newConfig[key];
      }
    }
    const sections = newConfig.sections || Object.values(Section).filter((section) => isSonosCard(newConfig) || section !== QUEUE);
    if (newConfig.startSection && sections.includes(newConfig.startSection)) {
      this.section = newConfig.startSection;
    } else if (sections) {
      this.section = sections.includes(PLAYER) ? PLAYER : sections.includes(MEDIA_BROWSER) ? MEDIA_BROWSER : sections.includes(GROUPS) ? GROUPS : sections.includes(GROUPING) ? GROUPING : sections.includes(QUEUE) && isSonosCard(newConfig) ? QUEUE : VOLUMES;
    } else {
      this.section = PLAYER;
    }
    newConfig.mediaBrowser = newConfig.mediaBrowser ?? {};
    newConfig.mediaBrowser.favorites = newConfig.mediaBrowser.favorites ?? {};
    newConfig.mediaBrowser.itemsPerRow = newConfig.mediaBrowser.itemsPerRow || 4;
    if (newConfig.entities?.length && newConfig.entities[0].entity) {
      newConfig.entities = newConfig.entities.map((entity) => entity.entity);
    }
    if (isSonosCard(newConfig)) {
      newConfig.entityPlatform = "sonos";
      if (newConfig.showNonSonosPlayers) {
        newConfig.entityPlatform = void 0;
      }
    }
    this.config = newConfig;
  }
  static get styles() {
    return i$7`
      :host {
        --mdc-icon-button-size: 3rem;
        --mdc-icon-size: 2rem;
      }
      ha-circular-progress {
        --md-sys-color-primary: var(--accent-color);
      }
      .loader {
        position: absolute;
        z-index: 1000;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        --mdc-theme-primary: var(--accent-color);
      }
      .title {
        margin: 0.4rem 0;
        text-align: center;
        font-weight: bold;
        font-size: calc(var(--sonos-font-size, 1rem) * 1.2);
        color: var(--secondary-text-color);
      }
      .no-players {
        text-align: center;
        margin-top: 50%;
      }
    `;
  }
}
__decorateClass$e([
  n$4({ attribute: false })
], Card.prototype, "hass");
__decorateClass$e([
  n$4({ attribute: false })
], Card.prototype, "config");
__decorateClass$e([
  r$4()
], Card.prototype, "section");
__decorateClass$e([
  r$4()
], Card.prototype, "store");
__decorateClass$e([
  r$4()
], Card.prototype, "showLoader");
__decorateClass$e([
  r$4()
], Card.prototype, "loaderTimestamp");
__decorateClass$e([
  r$4()
], Card.prototype, "cancelLoader");
__decorateClass$e([
  r$4()
], Card.prototype, "activePlayerId");
var __defProp$d = Object.defineProperty;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$d(target, key, result);
  return result;
};
class GroupingButton extends i$4 {
  render() {
    const iconAndName = !!this.icon && !!this.name || E;
    const buttonStyle = o({
      ...this.buttonColor ? { "--control-button-background-color": this.buttonColor } : {},
      ...this.fontSize ? { fontSize: `${this.fontSize}rem` } : {}
    });
    return x`
      <ha-control-button selected=${this.selected || E} style=${buttonStyle}>
        <div>
          ${this.icon ? x` <ha-icon icon-and-name=${iconAndName} .icon=${this.icon}></ha-icon>` : ""}
          ${this.name ? x`<span>${this.name}</span>` : ""}
        </div>
      </ha-control-button>
    `;
  }
  static get styles() {
    return i$7`
      ha-control-button {
        width: fit-content;
        --control-button-background-color: var(--secondary-text-color);
        --control-button-icon-color: var(--secondary-text-color);
      }
      ha-control-button[selected] {
        --control-button-icon-color: var(--accent-color);
      }

      span {
        font-weight: bold;
      }
    `;
  }
}
__decorateClass$d([
  n$4()
], GroupingButton.prototype, "icon");
__decorateClass$d([
  n$4()
], GroupingButton.prototype, "name");
__decorateClass$d([
  n$4()
], GroupingButton.prototype, "selected");
__decorateClass$d([
  n$4()
], GroupingButton.prototype, "buttonColor");
__decorateClass$d([
  n$4()
], GroupingButton.prototype, "fontSize");
customElements.define("sonos-grouping-button", GroupingButton);
class GroupingItem {
  constructor(player, activePlayer, isModified) {
    this.isDisabled = false;
    this.isMain = player.id === activePlayer.id;
    this.isModified = isModified;
    this.currentlyJoined = this.isMain || activePlayer.hasMember(player.id);
    this.isSelected = isModified ? !this.currentlyJoined : this.currentlyJoined;
    this.player = player;
    this.name = player.name;
    this.icon = this.isSelected ? "check-circle" : "checkbox-blank-circle-outline";
  }
}
var __defProp$c = Object.defineProperty;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$c(target, key, result);
  return result;
};
class Grouping extends i$4 {
  constructor() {
    super(...arguments);
    this.modifiedItems = [];
  }
  render() {
    this.config = this.store.config;
    this.groupingConfig = this.config.grouping ?? {};
    this.activePlayer = this.store.activePlayer;
    this.mediaControlService = this.store.mediaControlService;
    this.mediaPlayerIds = this.store.allMediaPlayers.map((player) => player.id);
    this.groupingItems = this.getGroupingItems();
    this.notJoinedPlayers = this.getNotJoinedPlayers();
    this.joinedPlayers = this.getJoinedPlayers();
    if (this.groupingConfig.skipApplyButton && (this.modifiedItems.length > 0 || this.selectedPredefinedGroup)) {
      this.applyGrouping();
    }
    const buttonFontSize = this.groupingConfig.buttonFontSize;
    return x`
      <style>
        sonos-grouping-button {
          ${buttonFontSize ? `font-size: ${buttonFontSize}rem;` : ""}
        }
      </style>
      <div class="wrapper">
        <div class="predefined-groups" compact=${this.groupingConfig.compact || E}>
          ${this.groupingConfig.hideUngroupAllButtons ? E : x`${this.renderJoinAllButton()} ${this.renderUnJoinAllButton()}`}
          ${n$1(this.store.predefinedGroups, () => this.renderPredefinedGroups())}
        </div>
        <div class="list">
          ${this.groupingItems.map((item) => {
      return x`
              <div
                class="item"
                modified=${item.isModified || E}
                disabled=${item.isDisabled || E}
                compact=${this.groupingConfig.compact || E}
              >
                <ha-icon
                  class="icon"
                  selected=${item.isSelected || E}
                  .icon="mdi:${item.icon}"
                  @click=${() => this.toggleItem(item)}
                ></ha-icon>
                <div class="name-and-volume">
                  <span class="name">${item.name}</span>
                  ${this.groupingConfig.hideVolumes ? E : x`<sonos-volume
                        class="volume"
                        .store=${this.store}
                        .player=${item.player}
                        .updateMembers=${false}
                        .slim=${true}
                      ></sonos-volume>`}
                </div>
              </div>
            `;
    })}
        </div>
        <ha-control-button-group
          class="buttons"
          hide=${this.modifiedItems.length === 0 && !this.selectedPredefinedGroup || this.groupingConfig.skipApplyButton || E}
        >
          <ha-control-button class="apply" @click=${this.applyGrouping}>
            ${this.store.hass.localize("ui.common.apply") || "Apply"}
          </ha-control-button>
          <ha-control-button @click=${this.cancelGrouping}>
            ${this.store.hass.localize("ui.common.cancel") || "Cancel"}
          </ha-control-button>
        </ha-control-button-group>
      </div>
    `;
  }
  static get styles() {
    return [
      listStyle,
      i$7`
        :host {
          --mdc-icon-size: 24px;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .predefined-groups {
          margin: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          flex-shrink: 0;
        }

        .predefined-groups[compact] {
          margin: 0.3rem !important;
        }

        .item {
          color: var(--secondary-text-color);
          padding: 0.5rem;
          display: flex;
          align-items: center;
        }

        .item[compact] {
          padding-top: 0rem;
          padding-bottom: 0;
          border-bottom: 1px solid #333;
        }

        .icon {
          padding-right: 0.5rem;
          flex-shrink: 0;
        }

        .icon[selected] {
          color: var(--accent-color);
        }

        .item[modified] .name {
          font-weight: bold;
          font-style: italic;
        }

        .item[disabled] .icon {
          color: var(--disabled-text-color);
        }

        .list {
          flex: 1;
          overflow: auto;
        }

        .buttons {
          flex-shrink: 0;
          margin: 0 1rem;
          padding-top: 0.5rem;
        }

        .apply {
          --control-button-background-color: var(--accent-color);
        }

        *[hide] {
          display: none;
        }

        .name-and-volume {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .volume {
          --accent-color: var(--secondary-text-color);
        }
      `
    ];
  }
  toggleItem(item) {
    if (item.isDisabled) {
      return;
    }
    this.toggleItemWithoutDisabledCheck(item);
  }
  toggleItemWithoutDisabledCheck(item) {
    if (this.modifiedItems.includes(item.player.id)) {
      this.modifiedItems = this.modifiedItems.filter((id) => id !== item.player.id);
    } else {
      this.modifiedItems = [...this.modifiedItems, item.player.id];
    }
    this.selectedPredefinedGroup = void 0;
  }
  async applyGrouping() {
    const groupingItems = this.groupingItems;
    const joinedPlayers = this.joinedPlayers;
    const activePlayerId = this.activePlayer.id;
    const { unJoin, join, newMainPlayer } = getGroupingChanges(groupingItems, joinedPlayers, activePlayerId);
    this.modifiedItems = [];
    const selectedPredefinedGroup = this.selectedPredefinedGroup;
    this.selectedPredefinedGroup = void 0;
    if (join.length > 0) {
      await this.mediaControlService.join(newMainPlayer, join);
    }
    if (unJoin.length > 0) {
      await this.mediaControlService.unJoin(unJoin);
    }
    if (selectedPredefinedGroup) {
      await this.mediaControlService.activatePredefinedGroup(selectedPredefinedGroup);
    }
    if (newMainPlayer !== activePlayerId && !this.groupingConfig.dontSwitchPlayer) {
      dispatchActivePlayerId(newMainPlayer, this.config, this);
    }
    if (this.config.entityId && unJoin.includes(this.config.entityId) && this.groupingConfig.dontSwitchPlayer) {
      dispatchActivePlayerId(this.config.entityId, this.config, this);
    }
  }
  cancelGrouping() {
    this.modifiedItems = [];
  }
  getGroupingItems() {
    const groupingItems = this.store.allMediaPlayers.map(
      (player) => new GroupingItem(player, this.activePlayer, this.modifiedItems.includes(player.id))
    );
    const selectedItems = groupingItems.filter((item) => item.isSelected);
    if (selectedItems.length === 1) {
      selectedItems[0].isDisabled = true;
    }
    if (this.groupingConfig.disableMainSpeakers) {
      const mainSpeakerIds = this.store.allGroups.filter((player) => player.members.length > 1).map((player) => player.id);
      groupingItems.forEach((item) => {
        if (mainSpeakerIds.includes(item.player.id)) {
          item.isDisabled = true;
        }
      });
    }
    if (!this.groupingConfig.dontSortMembersOnTop) {
      groupingItems.sort((a2, b2) => {
        if (a2.isMain) {
          return -1;
        }
        if (b2.isMain) {
          return 1;
        }
        if (a2.currentlyJoined && !b2.currentlyJoined) {
          return -1;
        }
        if (b2.currentlyJoined && !a2.currentlyJoined) {
          return 1;
        }
        return 0;
      });
    }
    return groupingItems;
  }
  renderJoinAllButton() {
    const icon = this.groupingConfig.buttonIcons?.joinAll ?? "mdi:checkbox-multiple-marked-outline";
    return n$1(this.notJoinedPlayers.length, () => this.groupingButton(icon, this.selectAll));
  }
  groupingButton(icon, click) {
    return x`
      <sonos-grouping-button
        @click=${click}
        .icon=${icon}
        .buttonColor=${this.groupingConfig.buttonColor}
      ></sonos-grouping-button>
    `;
  }
  getNotJoinedPlayers() {
    return this.mediaPlayerIds.filter(
      (playerId) => playerId !== this.activePlayer.id && !this.activePlayer.hasMember(playerId)
    );
  }
  renderUnJoinAllButton() {
    const icon = this.groupingConfig.buttonIcons?.unJoinAll ?? "mdi:minus-box-multiple-outline";
    return n$1(this.joinedPlayers.length, () => this.groupingButton(icon, this.deSelectAll));
  }
  getJoinedPlayers() {
    return this.mediaPlayerIds.filter(
      (playerId) => playerId === this.activePlayer.id || this.activePlayer.hasMember(playerId)
    );
  }
  renderPredefinedGroups() {
    return this.store.predefinedGroups.map((predefinedGroup) => {
      return x`
        <sonos-grouping-button
          @click=${async () => this.selectPredefinedGroup(predefinedGroup)}
          .icon=${this.groupingConfig.buttonIcons?.predefinedGroup ?? "mdi:speaker-multiple"}
          .name=${predefinedGroup.name}
          .selected=${this.selectedPredefinedGroup?.name === predefinedGroup.name}
          .buttonColor=${this.groupingConfig.buttonColor}
        ></sonos-grouping-button>
      `;
    });
  }
  async selectPredefinedGroup(predefinedGroup) {
    let hasGroupingChanges = false;
    this.groupingItems.forEach((item) => {
      const inPG = predefinedGroup.entities.some((pgp) => pgp.player.id === item.player.id);
      if (inPG && !item.isSelected || !inPG && item.isSelected) {
        this.toggleItemWithoutDisabledCheck(item);
        hasGroupingChanges = true;
      }
    });
    this.selectedPredefinedGroup = predefinedGroup;
    if (!hasGroupingChanges && this.groupingConfig.skipApplyButton) {
      await this.mediaControlService.activatePredefinedGroup(predefinedGroup);
      this.selectedPredefinedGroup = void 0;
    }
  }
  selectAll() {
    this.groupingItems.forEach((item) => {
      if (!item.isSelected) {
        this.toggleItem(item);
      }
    });
  }
  deSelectAll() {
    this.groupingItems.forEach((item) => {
      if (!item.isMain && item.isSelected || item.isMain && !item.isSelected) {
        this.toggleItem(item);
      }
    });
  }
}
__decorateClass$c([
  n$4({ attribute: false })
], Grouping.prototype, "store");
__decorateClass$c([
  r$4()
], Grouping.prototype, "modifiedItems");
__decorateClass$c([
  r$4()
], Grouping.prototype, "selectedPredefinedGroup");
var __defProp$b = Object.defineProperty;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$b(target, key, result);
  return result;
};
class PlayingBars extends i$4 {
  constructor() {
    super(...arguments);
    this.show = false;
  }
  render() {
    if (!this.show) {
      return E;
    }
    return x`
      <div class="bars">
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
  static get styles() {
    return i$7`
      @keyframes sound {
        0% {
          opacity: 0.35;
          height: 0.15rem;
        }
        100% {
          opacity: 1;
          height: 1rem;
        }
      }

      :host {
        display: flex;
        align-items: center;
      }

      .bars {
        width: 0.55rem;
        height: 1rem;
        position: relative;
      }

      .bars > div {
        background: var(--secondary-text-color);
        bottom: 0;
        height: 0.15rem;
        position: absolute;
        width: 0.15rem;
        animation: sound 0ms -800ms linear infinite alternate;
        display: block;
      }

      .bars > div:first-child {
        left: 0.05rem;
        animation-duration: 474ms;
      }

      .bars > div:nth-child(2) {
        left: 0.25rem;
        animation-duration: 433ms;
      }

      .bars > div:last-child {
        left: 0.45rem;
        animation-duration: 407ms;
      }
    `;
  }
}
__decorateClass$b([
  n$4({ type: Boolean })
], PlayingBars.prototype, "show");
customElements.define("sonos-playing-bars", PlayingBars);
var __defProp$a = Object.defineProperty;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$a(target, key, result);
  return result;
};
class Group extends i$4 {
  constructor() {
    super(...arguments);
    this.selected = false;
    this.dispatchEntityIdEvent = () => {
      if (this.selected) {
        const entityId = this.player.id;
        dispatchActivePlayerId(entityId, this.store.config, this);
      }
    };
  }
  render() {
    const groupsConfig = this.store.config.groups ?? {};
    const currentTrack = groupsConfig.hideCurrentTrack ? "" : this.player.getCurrentTrack();
    const speakerList = getSpeakerList(this.player, this.store.predefinedGroups);
    const icons = this.player.members.map((member) => member.attributes.icon).filter((icon) => icon);
    const { itemMargin, backgroundColor, speakersFontSize, titleFontSize } = groupsConfig;
    const listItemStyle = o({
      ...itemMargin ? { margin: itemMargin } : {},
      ...backgroundColor ? { background: backgroundColor } : {}
    });
    const speakersStyle = o(speakersFontSize ? { fontSize: `${speakersFontSize}rem` } : {});
    const titleStyle = o(titleFontSize ? { fontSize: `${titleFontSize}rem` } : {});
    return x`
      <mwc-list-item
        hasMeta
        class=${groupsConfig.compact ? "compact" : ""}
        ?selected=${this.selected}
        ?activated=${this.selected}
        @click=${() => this.handleGroupClicked()}
        style=${listItemStyle}
      >
        <div class="row">
          ${this.renderIcons(icons)}
          <div class="text">
            <span class="speakers" style=${speakersStyle}>${speakerList}</span>
            <span class="song-title" style=${titleStyle}>${currentTrack}</span>
          </div>
        </div>

        <sonos-playing-bars slot="meta" .show=${this.player.isPlaying()}></sonos-playing-bars>
      </mwc-list-item>
    `;
  }
  renderIcons(icons) {
    const length = icons.length;
    const iconsToShow = icons.slice(0, 4);
    const iconClass = length > 1 ? "small" : "";
    const iconsHtml = iconsToShow.map((icon) => x` <ha-icon class=${iconClass} .icon=${icon}></ha-icon>`);
    if (length > 4) {
      iconsHtml.splice(3, 1, x`<span>+${length - 3}</span>`);
    }
    if (length > 2) {
      iconsHtml.splice(2, 0, x`<br />`);
    }
    return x` <div class="icons" ?empty=${length === 0}>${iconsHtml}</div>`;
  }
  connectedCallback() {
    super.connectedCallback();
    this.dispatchEntityIdEvent();
  }
  handleGroupClicked() {
    if (!this.selected) {
      this.selected = true;
      if (!this.store.config.doNotRememberSelectedPlayer) {
        if (this.store.config.storePlayerInSessionStorage) {
          window.sessionStorage.setItem(SESSION_STORAGE_PLAYER_ID, this.player.id);
        } else {
          const newUrl = window.location.href.replace(/#.*/g, "");
          window.location.replace(`${newUrl}#${this.player.id}`);
        }
      }
      this.dispatchEntityIdEvent();
    }
  }
  static get styles() {
    return i$7`
      mwc-list-item {
        height: fit-content;
        margin: 1rem;
        border-radius: 1rem;
        background: var(--secondary-background-color);
        padding-left: 0;
      }

      mwc-list-item.compact {
        margin: 0.3rem;
      }

      .row {
        display: flex;
        margin: 1em 0;
        align-items: center;
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .speakers {
        white-space: initial;
        font-size: calc(var(--sonos-font-size, 1rem) * 1.1);
        font-weight: bold;
        color: var(--secondary-text-color);
      }

      .song-title {
        font-size: calc(var(--sonos-font-size, 1rem) * 0.9);
        font-weight: bold;
      }

      .icons {
        text-align: center;
        margin: 0;
        min-width: 5em;
        max-width: 5em;
      }

      .icons[empty] {
        min-width: 1em;
        max-width: 1em;
      }

      ha-icon {
        --mdc-icon-size: 3em;
        margin: 1em;
      }

      ha-icon.small {
        --mdc-icon-size: 2em;
        margin: 0;
      }

      .compact ha-icon {
        --mdc-icon-size: 2em;
      }
      .compact div {
        margin: 0.1em;
      }
      sonos-playing-bars {
        margin-left: 0.5rem;
      }
    `;
  }
}
__decorateClass$a([
  n$4({ attribute: false })
], Group.prototype, "store");
__decorateClass$a([
  n$4({ attribute: false })
], Group.prototype, "player");
__decorateClass$a([
  n$4({ type: Boolean })
], Group.prototype, "selected");
customElements.define("sonos-group", Group);
var __defProp$9 = Object.defineProperty;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$9(target, key, result);
  return result;
};
class Groups extends i$4 {
  render() {
    this.activePlayer = this.store.activePlayer;
    this.groups = this.store.allGroups;
    const groupsConfig = this.store.config.groups ?? {};
    const listStyleMap = groupsConfig.buttonWidth ? o({ width: `${groupsConfig.buttonWidth}rem` }) : "";
    return x`
      <mwc-list activatable class="list" style=${listStyleMap}>
        ${this.groups.map((group) => {
      const selected = this.activePlayer.id === group.id;
      return x` <sonos-group .store=${this.store} .player=${group} .selected=${selected}></sonos-group> `;
    })}
      </mwc-list>
    `;
  }
  static get styles() {
    return [listStyle, i$7``];
  }
}
__decorateClass$9([
  n$4({ attribute: false })
], Groups.prototype, "store");
function dim1(direction) {
  return direction === "horizontal" ? "width" : "height";
}
function dim2(direction) {
  return direction === "horizontal" ? "height" : "width";
}
class BaseLayout {
  _getDefaultConfig() {
    return {
      direction: "vertical"
    };
  }
  constructor(hostSink, config) {
    this._latestCoords = { left: 0, top: 0 };
    this._direction = null;
    this._viewportSize = { width: 0, height: 0 };
    this.totalScrollSize = { width: 0, height: 0 };
    this.offsetWithinScroller = { left: 0, top: 0 };
    this._pendingReflow = false;
    this._pendingLayoutUpdate = false;
    this._pin = null;
    this._firstVisible = 0;
    this._lastVisible = 0;
    this._physicalMin = 0;
    this._physicalMax = 0;
    this._first = -1;
    this._last = -1;
    this._sizeDim = "height";
    this._secondarySizeDim = "width";
    this._positionDim = "top";
    this._secondaryPositionDim = "left";
    this._scrollPosition = 0;
    this._scrollError = 0;
    this._items = [];
    this._scrollSize = 1;
    this._overhang = 1e3;
    this._hostSink = hostSink;
    Promise.resolve().then(() => this.config = config || this._getDefaultConfig());
  }
  set config(config) {
    Object.assign(this, Object.assign({}, this._getDefaultConfig(), config));
  }
  get config() {
    return {
      direction: this.direction
    };
  }
  /**
   * Maximum index of children + 1, to help estimate total height of the scroll
   * space.
   */
  get items() {
    return this._items;
  }
  set items(items) {
    this._setItems(items);
  }
  _setItems(items) {
    if (items !== this._items) {
      this._items = items;
      this._scheduleReflow();
    }
  }
  /**
   * Primary scrolling direction.
   */
  get direction() {
    return this._direction;
  }
  set direction(dir) {
    dir = dir === "horizontal" ? dir : "vertical";
    if (dir !== this._direction) {
      this._direction = dir;
      this._sizeDim = dir === "horizontal" ? "width" : "height";
      this._secondarySizeDim = dir === "horizontal" ? "height" : "width";
      this._positionDim = dir === "horizontal" ? "left" : "top";
      this._secondaryPositionDim = dir === "horizontal" ? "top" : "left";
      this._triggerReflow();
    }
  }
  /**
   * Height and width of the viewport.
   */
  get viewportSize() {
    return this._viewportSize;
  }
  set viewportSize(dims) {
    const { _viewDim1, _viewDim2 } = this;
    Object.assign(this._viewportSize, dims);
    if (_viewDim2 !== this._viewDim2) {
      this._scheduleLayoutUpdate();
    } else if (_viewDim1 !== this._viewDim1) {
      this._checkThresholds();
    }
  }
  /**
   * Scroll offset of the viewport.
   */
  get viewportScroll() {
    return this._latestCoords;
  }
  set viewportScroll(coords) {
    Object.assign(this._latestCoords, coords);
    const oldPos = this._scrollPosition;
    this._scrollPosition = this._latestCoords[this._positionDim];
    const change = Math.abs(oldPos - this._scrollPosition);
    if (change >= 1) {
      this._checkThresholds();
    }
  }
  /**
   * Perform a reflow if one has been scheduled.
   */
  reflowIfNeeded(force = false) {
    if (force || this._pendingReflow) {
      this._pendingReflow = false;
      this._reflow();
    }
  }
  set pin(options2) {
    this._pin = options2;
    this._triggerReflow();
  }
  get pin() {
    if (this._pin !== null) {
      const { index, block } = this._pin;
      return {
        index: Math.max(0, Math.min(index, this.items.length - 1)),
        block
      };
    }
    return null;
  }
  _clampScrollPosition(val) {
    return Math.max(-this.offsetWithinScroller[this._positionDim], Math.min(val, this.totalScrollSize[dim1(this.direction)] - this._viewDim1));
  }
  unpin() {
    if (this._pin !== null) {
      this._sendUnpinnedMessage();
      this._pin = null;
    }
  }
  _updateLayout() {
  }
  // protected _viewDim2Changed(): void {
  //   this._scheduleLayoutUpdate();
  // }
  /**
   * The height or width of the viewport, whichever corresponds to the scrolling direction.
   */
  get _viewDim1() {
    return this._viewportSize[this._sizeDim];
  }
  /**
   * The height or width of the viewport, whichever does NOT correspond to the scrolling direction.
   */
  get _viewDim2() {
    return this._viewportSize[this._secondarySizeDim];
  }
  _scheduleReflow() {
    this._pendingReflow = true;
  }
  _scheduleLayoutUpdate() {
    this._pendingLayoutUpdate = true;
    this._scheduleReflow();
  }
  // For triggering a reflow based on incoming changes to
  // the layout config.
  _triggerReflow() {
    this._scheduleLayoutUpdate();
    Promise.resolve().then(() => this.reflowIfNeeded());
  }
  _reflow() {
    if (this._pendingLayoutUpdate) {
      this._updateLayout();
      this._pendingLayoutUpdate = false;
    }
    this._updateScrollSize();
    this._setPositionFromPin();
    this._getActiveItems();
    this._updateVisibleIndices();
    this._sendStateChangedMessage();
  }
  /**
   * If we are supposed to be pinned to a particular
   * item or set of coordinates, we set `_scrollPosition`
   * accordingly and adjust `_scrollError` as needed
   * so that the virtualizer can keep the scroll
   * position in the DOM in sync
   */
  _setPositionFromPin() {
    if (this.pin !== null) {
      const lastScrollPosition = this._scrollPosition;
      const { index, block } = this.pin;
      this._scrollPosition = this._calculateScrollIntoViewPosition({
        index,
        block: block || "start"
      }) - this.offsetWithinScroller[this._positionDim];
      this._scrollError = lastScrollPosition - this._scrollPosition;
    }
  }
  /**
   * Calculate the coordinates to scroll to, given
   * a request to scroll to the element at a specific
   * index.
   *
   * Supports the same positioning options (`start`,
   * `center`, `end`, `nearest`) as the standard
   * `Element.scrollIntoView()` method, but currently
   * only considers the provided value in the `block`
   * dimension, since we don't yet have any layouts
   * that support virtualization in two dimensions.
   */
  _calculateScrollIntoViewPosition(options2) {
    const { block } = options2;
    const index = Math.min(this.items.length, Math.max(0, options2.index));
    const itemStartPosition = this._getItemPosition(index)[this._positionDim];
    let scrollPosition = itemStartPosition;
    if (block !== "start") {
      const itemSize = this._getItemSize(index)[this._sizeDim];
      if (block === "center") {
        scrollPosition = itemStartPosition - 0.5 * this._viewDim1 + 0.5 * itemSize;
      } else {
        const itemEndPosition = itemStartPosition - this._viewDim1 + itemSize;
        if (block === "end") {
          scrollPosition = itemEndPosition;
        } else {
          const currentScrollPosition = this._scrollPosition;
          scrollPosition = Math.abs(currentScrollPosition - itemStartPosition) < Math.abs(currentScrollPosition - itemEndPosition) ? itemStartPosition : itemEndPosition;
        }
      }
    }
    scrollPosition += this.offsetWithinScroller[this._positionDim];
    return this._clampScrollPosition(scrollPosition);
  }
  getScrollIntoViewCoordinates(options2) {
    return {
      [this._positionDim]: this._calculateScrollIntoViewPosition(options2)
    };
  }
  _sendUnpinnedMessage() {
    this._hostSink({
      type: "unpinned"
    });
  }
  _sendVisibilityChangedMessage() {
    this._hostSink({
      type: "visibilityChanged",
      firstVisible: this._firstVisible,
      lastVisible: this._lastVisible
    });
  }
  _sendStateChangedMessage() {
    const childPositions = /* @__PURE__ */ new Map();
    if (this._first !== -1 && this._last !== -1) {
      for (let idx = this._first; idx <= this._last; idx++) {
        childPositions.set(idx, this._getItemPosition(idx));
      }
    }
    const message = {
      type: "stateChanged",
      scrollSize: {
        [this._sizeDim]: this._scrollSize,
        [this._secondarySizeDim]: null
      },
      range: {
        first: this._first,
        last: this._last,
        firstVisible: this._firstVisible,
        lastVisible: this._lastVisible
      },
      childPositions
    };
    if (this._scrollError) {
      message.scrollError = {
        [this._positionDim]: this._scrollError,
        [this._secondaryPositionDim]: 0
      };
      this._scrollError = 0;
    }
    this._hostSink(message);
  }
  /**
   * Number of items to display.
   */
  get _num() {
    if (this._first === -1 || this._last === -1) {
      return 0;
    }
    return this._last - this._first + 1;
  }
  _checkThresholds() {
    if (this._viewDim1 === 0 && this._num > 0 || this._pin !== null) {
      this._scheduleReflow();
    } else {
      const min = Math.max(0, this._scrollPosition - this._overhang);
      const max = Math.min(this._scrollSize, this._scrollPosition + this._viewDim1 + this._overhang);
      if (this._physicalMin > min || this._physicalMax < max) {
        this._scheduleReflow();
      } else {
        this._updateVisibleIndices({ emit: true });
      }
    }
  }
  /**
   * Find the indices of the first and last items to intersect the viewport.
   * Emit a visibleindiceschange event when either index changes.
   */
  _updateVisibleIndices(options2) {
    if (this._first === -1 || this._last === -1)
      return;
    let firstVisible = this._first;
    while (firstVisible < this._last && Math.round(this._getItemPosition(firstVisible)[this._positionDim] + this._getItemSize(firstVisible)[this._sizeDim]) <= Math.round(this._scrollPosition)) {
      firstVisible++;
    }
    let lastVisible = this._last;
    while (lastVisible > this._first && Math.round(this._getItemPosition(lastVisible)[this._positionDim]) >= Math.round(this._scrollPosition + this._viewDim1)) {
      lastVisible--;
    }
    if (firstVisible !== this._firstVisible || lastVisible !== this._lastVisible) {
      this._firstVisible = firstVisible;
      this._lastVisible = lastVisible;
      if (options2 && options2.emit) {
        this._sendVisibilityChangedMessage();
      }
    }
  }
}
function paddingValueToNumber(v2) {
  if (v2 === "match-gap") {
    return Infinity;
  }
  return parseInt(v2);
}
function gapValueToNumber(v2) {
  if (v2 === "auto") {
    return Infinity;
  }
  return parseInt(v2);
}
function gap1(direction) {
  return direction === "horizontal" ? "column" : "row";
}
function gap2(direction) {
  return direction === "horizontal" ? "row" : "column";
}
function padding1(direction) {
  return direction === "horizontal" ? ["left", "right"] : ["top", "bottom"];
}
function padding2(direction) {
  return direction === "horizontal" ? ["top", "bottom"] : ["left", "right"];
}
class SizeGapPaddingBaseLayout extends BaseLayout {
  constructor() {
    super(...arguments);
    this._itemSize = {};
    this._gaps = {};
    this._padding = {};
  }
  _getDefaultConfig() {
    return Object.assign({}, super._getDefaultConfig(), {
      itemSize: { width: "300px", height: "300px" },
      gap: "8px",
      padding: "match-gap"
    });
  }
  // Temp, to support current flexWrap implementation
  get _gap() {
    return this._gaps.row;
  }
  // Temp, to support current flexWrap implementation
  get _idealSize() {
    return this._itemSize[dim1(this.direction)];
  }
  get _idealSize1() {
    return this._itemSize[dim1(this.direction)];
  }
  get _idealSize2() {
    return this._itemSize[dim2(this.direction)];
  }
  get _gap1() {
    return this._gaps[gap1(this.direction)];
  }
  get _gap2() {
    return this._gaps[gap2(this.direction)];
  }
  get _padding1() {
    const padding = this._padding;
    const [start, end] = padding1(this.direction);
    return [padding[start], padding[end]];
  }
  get _padding2() {
    const padding = this._padding;
    const [start, end] = padding2(this.direction);
    return [padding[start], padding[end]];
  }
  set itemSize(dims) {
    const size = this._itemSize;
    if (typeof dims === "string") {
      dims = {
        width: dims,
        height: dims
      };
    }
    const width = parseInt(dims.width);
    const height = parseInt(dims.height);
    if (width !== size.width) {
      size.width = width;
      this._triggerReflow();
    }
    if (height !== size.height) {
      size.height = height;
      this._triggerReflow();
    }
  }
  set gap(spec) {
    this._setGap(spec);
  }
  // This setter is overridden in specific layouts to narrow the accepted types
  _setGap(spec) {
    const values = spec.split(" ").map((v2) => gapValueToNumber(v2));
    const gaps = this._gaps;
    if (values[0] !== gaps.row) {
      gaps.row = values[0];
      this._triggerReflow();
    }
    if (values[1] === void 0) {
      if (values[0] !== gaps.column) {
        gaps.column = values[0];
        this._triggerReflow();
      }
    } else {
      if (values[1] !== gaps.column) {
        gaps.column = values[1];
        this._triggerReflow();
      }
    }
  }
  set padding(spec) {
    const padding = this._padding;
    const values = spec.split(" ").map((v2) => paddingValueToNumber(v2));
    if (values.length === 1) {
      padding.top = padding.right = padding.bottom = padding.left = values[0];
      this._triggerReflow();
    } else if (values.length === 2) {
      padding.top = padding.bottom = values[0];
      padding.right = padding.left = values[1];
      this._triggerReflow();
    } else if (values.length === 3) {
      padding.top = values[0];
      padding.right = padding.left = values[1];
      padding.bottom = values[2];
      this._triggerReflow();
    } else if (values.length === 4) {
      ["top", "right", "bottom", "left"].forEach((side, idx) => padding[side] = values[idx]);
      this._triggerReflow();
    }
  }
}
class GridBaseLayout extends SizeGapPaddingBaseLayout {
  constructor() {
    super(...arguments);
    this._metrics = null;
    this.flex = null;
    this.justify = null;
  }
  _getDefaultConfig() {
    return Object.assign({}, super._getDefaultConfig(), {
      flex: false,
      justify: "start"
    });
  }
  set gap(spec) {
    super._setGap(spec);
  }
  _updateLayout() {
    const justify = this.justify;
    const [padding1Start, padding1End] = this._padding1;
    const [padding2Start, padding2End] = this._padding2;
    ["_gap1", "_gap2"].forEach((gap) => {
      const gapValue = this[gap];
      if (gapValue === Infinity && !["space-between", "space-around", "space-evenly"].includes(justify)) {
        throw new Error(`grid layout: gap can only be set to 'auto' when justify is set to 'space-between', 'space-around' or 'space-evenly'`);
      }
      if (gapValue === Infinity && gap === "_gap2") {
        throw new Error(`grid layout: ${gap2(this.direction)}-gap cannot be set to 'auto' when direction is set to ${this.direction}`);
      }
    });
    const usePaddingAndGap2 = this.flex || ["start", "center", "end"].includes(justify);
    const metrics = {
      rolumns: -1,
      itemSize1: -1,
      itemSize2: -1,
      // Infinity represents 'auto', so we set an invalid placeholder until we can calculate
      gap1: this._gap1 === Infinity ? -1 : this._gap1,
      gap2: usePaddingAndGap2 ? this._gap2 : 0,
      // Infinity represents 'match-gap', so we set padding to match gap
      padding1: {
        start: padding1Start === Infinity ? this._gap1 : padding1Start,
        end: padding1End === Infinity ? this._gap1 : padding1End
      },
      padding2: usePaddingAndGap2 ? {
        start: padding2Start === Infinity ? this._gap2 : padding2Start,
        end: padding2End === Infinity ? this._gap2 : padding2End
      } : {
        start: 0,
        end: 0
      },
      positions: []
    };
    const availableSpace = this._viewDim2 - metrics.padding2.start - metrics.padding2.end;
    if (availableSpace <= 0) {
      metrics.rolumns = 0;
    } else {
      const gapSize = usePaddingAndGap2 ? metrics.gap2 : 0;
      let rolumns = 0;
      let spaceTaken = 0;
      if (availableSpace >= this._idealSize2) {
        rolumns = Math.floor((availableSpace - this._idealSize2) / (this._idealSize2 + gapSize)) + 1;
        spaceTaken = rolumns * this._idealSize2 + (rolumns - 1) * gapSize;
      }
      if (this.flex) {
        if ((availableSpace - spaceTaken) / (this._idealSize2 + gapSize) >= 0.5) {
          rolumns = rolumns + 1;
        }
        metrics.rolumns = rolumns;
        metrics.itemSize2 = Math.round((availableSpace - gapSize * (rolumns - 1)) / rolumns);
        const preserve = this.flex === true ? "area" : this.flex.preserve;
        switch (preserve) {
          case "aspect-ratio":
            metrics.itemSize1 = Math.round(this._idealSize1 / this._idealSize2 * metrics.itemSize2);
            break;
          case dim1(this.direction):
            metrics.itemSize1 = Math.round(this._idealSize1);
            break;
          case "area":
          default:
            metrics.itemSize1 = Math.round(this._idealSize1 * this._idealSize2 / metrics.itemSize2);
        }
      } else {
        metrics.itemSize1 = this._idealSize1;
        metrics.itemSize2 = this._idealSize2;
        metrics.rolumns = rolumns;
      }
      let pos;
      if (usePaddingAndGap2) {
        const spaceTaken2 = metrics.rolumns * metrics.itemSize2 + (metrics.rolumns - 1) * metrics.gap2;
        pos = this.flex || justify === "start" ? metrics.padding2.start : justify === "end" ? this._viewDim2 - metrics.padding2.end - spaceTaken2 : Math.round(this._viewDim2 / 2 - spaceTaken2 / 2);
      } else {
        const spaceToDivide = availableSpace - metrics.rolumns * metrics.itemSize2;
        if (justify === "space-between") {
          metrics.gap2 = Math.round(spaceToDivide / (metrics.rolumns - 1));
          pos = 0;
        } else if (justify === "space-around") {
          metrics.gap2 = Math.round(spaceToDivide / metrics.rolumns);
          pos = Math.round(metrics.gap2 / 2);
        } else {
          metrics.gap2 = Math.round(spaceToDivide / (metrics.rolumns + 1));
          pos = metrics.gap2;
        }
        if (this._gap1 === Infinity) {
          metrics.gap1 = metrics.gap2;
          if (padding1Start === Infinity) {
            metrics.padding1.start = pos;
          }
          if (padding1End === Infinity) {
            metrics.padding1.end = pos;
          }
        }
      }
      for (let i5 = 0; i5 < metrics.rolumns; i5++) {
        metrics.positions.push(pos);
        pos += metrics.itemSize2 + metrics.gap2;
      }
    }
    this._metrics = metrics;
  }
}
const grid = (config) => Object.assign({
  type: GridLayout
}, config);
class GridLayout extends GridBaseLayout {
  /**
   * Returns the average size (precise or estimated) of an item in the scrolling direction,
   * including any surrounding space.
   */
  get _delta() {
    return this._metrics.itemSize1 + this._metrics.gap1;
  }
  _getItemSize(_idx) {
    return {
      [this._sizeDim]: this._metrics.itemSize1,
      [this._secondarySizeDim]: this._metrics.itemSize2
    };
  }
  _getActiveItems() {
    const metrics = this._metrics;
    const { rolumns } = metrics;
    if (rolumns === 0) {
      this._first = -1;
      this._last = -1;
      this._physicalMin = 0;
      this._physicalMax = 0;
    } else {
      const { padding1: padding12 } = metrics;
      const min = Math.max(0, this._scrollPosition - this._overhang);
      const max = Math.min(this._scrollSize, this._scrollPosition + this._viewDim1 + this._overhang);
      const firstCow = Math.max(0, Math.floor((min - padding12.start) / this._delta));
      const lastCow = Math.max(0, Math.ceil((max - padding12.start) / this._delta));
      this._first = firstCow * rolumns;
      this._last = Math.min(lastCow * rolumns - 1, this.items.length - 1);
      this._physicalMin = padding12.start + this._delta * firstCow;
      this._physicalMax = padding12.start + this._delta * lastCow;
    }
  }
  _getItemPosition(idx) {
    const { rolumns, padding1: padding12, positions, itemSize1, itemSize2 } = this._metrics;
    return {
      [this._positionDim]: padding12.start + Math.floor(idx / rolumns) * this._delta,
      [this._secondaryPositionDim]: positions[idx % rolumns],
      [dim1(this.direction)]: itemSize1,
      [dim2(this.direction)]: itemSize2
    };
  }
  _updateScrollSize() {
    const { rolumns, gap1: gap12, padding1: padding12, itemSize1 } = this._metrics;
    let size = 1;
    if (rolumns > 0) {
      const cows = Math.ceil(this.items.length / rolumns);
      size = padding12.start + cows * itemSize1 + (cows - 1) * gap12 + padding12.end;
    }
    this._scrollSize = size;
  }
}
const e = e$1(class extends i$2 {
  constructor(t2) {
    if (super(t2), t2.type !== t$1.ATTRIBUTE || "class" !== t2.name || t2.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((s2) => t2[s2]).join(" ") + " ";
  }
  update(s2, [i5]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s2.strings && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in i5) i5[t2] && !this.nt?.has(t2) && this.st.add(t2);
      return this.render(i5);
    }
    const r2 = s2.element.classList;
    for (const t2 of this.st) t2 in i5 || (r2.remove(t2), this.st.delete(t2));
    for (const t2 in i5) {
      const s3 = !!i5[t2];
      s3 === this.st.has(t2) || this.nt?.has(t2) || (s3 ? (r2.add(t2), this.st.add(t2)) : (r2.remove(t2), this.st.delete(t2)));
    }
    return T;
  }
});
const slugify = (value, delimiter = "_") => {
  const a2 = "àáâäæãåāăąабçćčđďдèéêëēėęěеёэфğǵгḧхîïíīįìıİийкłлḿмñńǹňнôöòóœøōõőоṕпŕřрßśšşșсťțтûüùúūǘůűųувẃẍÿýыžźżз·";
  const b2 = `aaaaaaaaaaabcccdddeeeeeeeeeeefggghhiiiiiiiiijkllmmnnnnnoooooooooopprrrsssssstttuuuuuuuuuuvwxyyyzzzz${delimiter}`;
  const p2 = new RegExp(a2.split("").join("|"), "g");
  const complex_cyrillic = {
    ж: "zh",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ю: "iu",
    я: "ia"
  };
  let slugified;
  if (value === "") {
    slugified = "";
  } else {
    slugified = value.toString().toLowerCase().replace(p2, (c3) => b2.charAt(a2.indexOf(c3))).replace(/[а-я]/g, (c3) => complex_cyrillic[c3] || "").replace(/(\d),(?=\d)/g, "$1").replace(/[^a-z0-9]+/g, delimiter).replace(new RegExp(`(${delimiter})\\1+`, "g"), "$1").replace(new RegExp(`^${delimiter}+`), "").replace(new RegExp(`${delimiter}+$`), "");
    if (slugified === "") {
      slugified = "unknown";
    }
  }
  return slugified;
};
const browseLocalMediaPlayer = (hass, mediaContentId) => hass.callWS({
  type: "media_source/browse_media",
  media_content_id: mediaContentId
});
const MANUAL_MEDIA_SOURCE_PREFIX = "__MANUAL_ENTRY__";
const isManualMediaSourceContentId = (mediaContentId) => mediaContentId.startsWith(MANUAL_MEDIA_SOURCE_PREFIX);
const showAlertDialog = (_element, _params) => {
};
const haStyle = i$7`
  .mdc-deprecated-list-item__graphic {
    margin-inline-end: 16px;
    margin-inline-start: 0;
  }
`;
function __decorate(decorators, target, key, desc) {
  var c3 = arguments.length, r2 = c3 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i5 = decorators.length - 1; i5 >= 0; i5--) if (d2 = decorators[i5]) r2 = (c3 < 3 ? d2(r2) : c3 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
  return c3 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e2 = new Error(message);
  return e2.name = "SuppressedError", e2.error = error, e2.suppressed = suppressed, e2;
};
const u = (e2, s2, t2) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t2; l2++) r2.set(e2[l2], l2);
  return r2;
}, c2 = e$1(class extends i$2 {
  constructor(e2) {
    if (super(e2), e2.type !== t$1.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t2) {
    let r2;
    void 0 === t2 ? t2 = s2 : void 0 !== s2 && (r2 = s2);
    const l2 = [], o2 = [];
    let i5 = 0;
    for (const s3 of e2) l2[i5] = r2 ? r2(s3, i5) : i5, o2[i5] = t2(s3, i5), i5++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t2) {
    return this.dt(e2, s2, t2).values;
  }
  update(s2, [t2, r2, c3]) {
    const d2 = p(s2), { values: p$12, keys: a2 } = this.dt(t2, r2, c3);
    if (!Array.isArray(d2)) return this.ut = a2, p$12;
    const h2 = this.ut ??= [], v$12 = [];
    let m2, y3, x2 = 0, j2 = d2.length - 1, k2 = 0, w = p$12.length - 1;
    for (; x2 <= j2 && k2 <= w; ) if (null === d2[x2]) x2++;
    else if (null === d2[j2]) j2--;
    else if (h2[x2] === a2[k2]) v$12[k2] = v(d2[x2], p$12[k2]), x2++, k2++;
    else if (h2[j2] === a2[w]) v$12[w] = v(d2[j2], p$12[w]), j2--, w--;
    else if (h2[x2] === a2[w]) v$12[w] = v(d2[x2], p$12[w]), r$3(s2, v$12[w + 1], d2[x2]), x2++, w--;
    else if (h2[j2] === a2[k2]) v$12[k2] = v(d2[j2], p$12[k2]), r$3(s2, d2[x2], d2[j2]), j2--, k2++;
    else if (void 0 === m2 && (m2 = u(a2, k2, w), y3 = u(h2, x2, j2)), m2.has(h2[x2])) if (m2.has(h2[j2])) {
      const e2 = y3.get(a2[k2]), t3 = void 0 !== e2 ? d2[e2] : null;
      if (null === t3) {
        const e3 = r$3(s2, d2[x2]);
        v(e3, p$12[k2]), v$12[k2] = e3;
      } else v$12[k2] = v(t3, p$12[k2]), r$3(s2, d2[x2], t3), d2[e2] = null;
      k2++;
    } else M2(d2[j2]), j2--;
    else M2(d2[x2]), x2++;
    for (; k2 <= w; ) {
      const e2 = r$3(s2, v$12[w + 1]);
      v(e2, p$12[k2]), v$12[k2++] = e2;
    }
    for (; x2 <= j2; ) {
      const e2 = d2[x2++];
      null !== e2 && M2(e2);
    }
    return this.ut = a2, m$1(s2, v$12), T;
  }
});
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled2 = function(promises$2) {
      return Promise.all(promises$2.map((p2) => Promise.resolve(p2).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    var allSettled = allSettled2;
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled2(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$12 = new Event("vite:preloadError", { cancelable: true });
    e$12.payload = err$2;
    window.dispatchEvent(e$12);
    if (!e$12.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
class RangeChangedEvent extends Event {
  constructor(range) {
    super(RangeChangedEvent.eventName, { bubbles: false });
    this.first = range.first;
    this.last = range.last;
  }
}
RangeChangedEvent.eventName = "rangeChanged";
class VisibilityChangedEvent extends Event {
  constructor(range) {
    super(VisibilityChangedEvent.eventName, { bubbles: false });
    this.first = range.first;
    this.last = range.last;
  }
}
VisibilityChangedEvent.eventName = "visibilityChanged";
class UnpinnedEvent extends Event {
  constructor() {
    super(UnpinnedEvent.eventName, { bubbles: false });
  }
}
UnpinnedEvent.eventName = "unpinned";
class ScrollerShim {
  constructor(element) {
    this._element = null;
    const node = element ?? window;
    this._node = node;
    if (element) {
      this._element = element;
    }
  }
  get element() {
    return this._element || document.scrollingElement || document.documentElement;
  }
  get scrollTop() {
    return this.element.scrollTop || window.scrollY;
  }
  get scrollLeft() {
    return this.element.scrollLeft || window.scrollX;
  }
  get scrollHeight() {
    return this.element.scrollHeight;
  }
  get scrollWidth() {
    return this.element.scrollWidth;
  }
  get viewportHeight() {
    return this._element ? this._element.getBoundingClientRect().height : window.innerHeight;
  }
  get viewportWidth() {
    return this._element ? this._element.getBoundingClientRect().width : window.innerWidth;
  }
  get maxScrollTop() {
    return this.scrollHeight - this.viewportHeight;
  }
  get maxScrollLeft() {
    return this.scrollWidth - this.viewportWidth;
  }
}
class ScrollerController extends ScrollerShim {
  constructor(client, element) {
    super(element);
    this._clients = /* @__PURE__ */ new Set();
    this._retarget = null;
    this._end = null;
    this.__destination = null;
    this.correctingScrollError = false;
    this._checkForArrival = this._checkForArrival.bind(this);
    this._updateManagedScrollTo = this._updateManagedScrollTo.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollBy = this.scrollBy.bind(this);
    const node = this._node;
    this._originalScrollTo = node.scrollTo;
    this._originalScrollBy = node.scrollBy;
    this._originalScroll = node.scroll;
    this._attach(client);
  }
  get _destination() {
    return this.__destination;
  }
  get scrolling() {
    return this._destination !== null;
  }
  scrollTo(p1, p2) {
    const options2 = typeof p1 === "number" && typeof p2 === "number" ? { left: p1, top: p2 } : p1;
    this._scrollTo(options2);
  }
  scrollBy(p1, p2) {
    const options2 = typeof p1 === "number" && typeof p2 === "number" ? { left: p1, top: p2 } : p1;
    if (options2.top !== void 0) {
      options2.top += this.scrollTop;
    }
    if (options2.left !== void 0) {
      options2.left += this.scrollLeft;
    }
    this._scrollTo(options2);
  }
  _nativeScrollTo(options2) {
    this._originalScrollTo.bind(this._element || window)(options2);
  }
  _scrollTo(options2, retarget = null, end = null) {
    if (this._end !== null) {
      this._end();
    }
    if (options2.behavior === "smooth") {
      this._setDestination(options2);
      this._retarget = retarget;
      this._end = end;
    } else {
      this._resetScrollState();
    }
    this._nativeScrollTo(options2);
  }
  _setDestination(options2) {
    let { top, left } = options2;
    top = top === void 0 ? void 0 : Math.max(0, Math.min(top, this.maxScrollTop));
    left = left === void 0 ? void 0 : Math.max(0, Math.min(left, this.maxScrollLeft));
    if (this._destination !== null && left === this._destination.left && top === this._destination.top) {
      return false;
    }
    this.__destination = { top, left, behavior: "smooth" };
    return true;
  }
  _resetScrollState() {
    this.__destination = null;
    this._retarget = null;
    this._end = null;
  }
  _updateManagedScrollTo(coordinates) {
    if (this._destination) {
      if (this._setDestination(coordinates)) {
        this._nativeScrollTo(this._destination);
      }
    }
  }
  managedScrollTo(options2, retarget, end) {
    this._scrollTo(options2, retarget, end);
    return this._updateManagedScrollTo;
  }
  correctScrollError(coordinates) {
    this.correctingScrollError = true;
    requestAnimationFrame(() => requestAnimationFrame(() => this.correctingScrollError = false));
    this._nativeScrollTo(coordinates);
    if (this._retarget) {
      this._setDestination(this._retarget());
    }
    if (this._destination) {
      this._nativeScrollTo(this._destination);
    }
  }
  _checkForArrival() {
    if (this._destination !== null) {
      const { scrollTop, scrollLeft } = this;
      let { top, left } = this._destination;
      top = Math.min(top || 0, this.maxScrollTop);
      left = Math.min(left || 0, this.maxScrollLeft);
      const topDiff = Math.abs(top - scrollTop);
      const leftDiff = Math.abs(left - scrollLeft);
      if (topDiff < 1 && leftDiff < 1) {
        if (this._end) {
          this._end();
        }
        this._resetScrollState();
      }
    }
  }
  detach(client) {
    this._clients.delete(client);
    if (this._clients.size === 0) {
      this._node.scrollTo = this._originalScrollTo;
      this._node.scrollBy = this._originalScrollBy;
      this._node.scroll = this._originalScroll;
      this._node.removeEventListener("scroll", this._checkForArrival);
    }
    return null;
  }
  _attach(client) {
    this._clients.add(client);
    if (this._clients.size === 1) {
      this._node.scrollTo = this.scrollTo;
      this._node.scrollBy = this.scrollBy;
      this._node.scroll = this.scrollTo;
      this._node.addEventListener("scroll", this._checkForArrival);
    }
  }
}
let _ResizeObserver = typeof window !== "undefined" ? window.ResizeObserver : void 0;
const virtualizerRef = Symbol("virtualizerRef");
const SIZER_ATTRIBUTE = "virtualizer-sizer";
let DefaultLayoutConstructor;
class Virtualizer {
  constructor(config) {
    this._benchmarkStart = null;
    this._layout = null;
    this._clippingAncestors = [];
    this._scrollSize = null;
    this._scrollError = null;
    this._childrenPos = null;
    this._childMeasurements = null;
    this._toBeMeasured = /* @__PURE__ */ new Map();
    this._rangeChanged = true;
    this._itemsChanged = true;
    this._visibilityChanged = true;
    this._scrollerController = null;
    this._isScroller = false;
    this._sizer = null;
    this._hostElementRO = null;
    this._childrenRO = null;
    this._mutationObserver = null;
    this._scrollEventListeners = [];
    this._scrollEventListenerOptions = {
      passive: true
    };
    this._loadListener = this._childLoaded.bind(this);
    this._scrollIntoViewTarget = null;
    this._updateScrollIntoViewCoordinates = null;
    this._items = [];
    this._first = -1;
    this._last = -1;
    this._firstVisible = -1;
    this._lastVisible = -1;
    this._scheduled = /* @__PURE__ */ new WeakSet();
    this._measureCallback = null;
    this._measureChildOverride = null;
    this._layoutCompletePromise = null;
    this._layoutCompleteResolver = null;
    this._layoutCompleteRejecter = null;
    this._pendingLayoutComplete = null;
    this._layoutInitialized = null;
    this._connected = false;
    if (!config) {
      throw new Error("Virtualizer constructor requires a configuration object");
    }
    if (config.hostElement) {
      this._init(config);
    } else {
      throw new Error('Virtualizer configuration requires the "hostElement" property');
    }
  }
  set items(items) {
    if (Array.isArray(items) && items !== this._items) {
      this._itemsChanged = true;
      this._items = items;
      this._schedule(this._updateLayout);
    }
  }
  _init(config) {
    this._isScroller = !!config.scroller;
    this._initHostElement(config);
    const layoutConfig = config.layout || {};
    this._layoutInitialized = this._initLayout(layoutConfig);
  }
  _initObservers() {
    this._mutationObserver = new MutationObserver(this._finishDOMUpdate.bind(this));
    this._hostElementRO = new _ResizeObserver(() => this._hostElementSizeChanged());
    this._childrenRO = new _ResizeObserver(this._childrenSizeChanged.bind(this));
  }
  _initHostElement(config) {
    const hostElement = this._hostElement = config.hostElement;
    this._applyVirtualizerStyles();
    hostElement[virtualizerRef] = this;
  }
  connected() {
    this._initObservers();
    const includeSelf = this._isScroller;
    this._clippingAncestors = getClippingAncestors(this._hostElement, includeSelf);
    this._scrollerController = new ScrollerController(this, this._clippingAncestors[0]);
    this._schedule(this._updateLayout);
    this._observeAndListen();
    this._connected = true;
  }
  _observeAndListen() {
    this._mutationObserver.observe(this._hostElement, { childList: true });
    this._hostElementRO.observe(this._hostElement);
    this._scrollEventListeners.push(window);
    window.addEventListener("scroll", this, this._scrollEventListenerOptions);
    this._clippingAncestors.forEach((ancestor) => {
      ancestor.addEventListener("scroll", this, this._scrollEventListenerOptions);
      this._scrollEventListeners.push(ancestor);
      this._hostElementRO.observe(ancestor);
    });
    this._hostElementRO.observe(this._scrollerController.element);
    this._children.forEach((child) => this._childrenRO.observe(child));
    this._scrollEventListeners.forEach((target) => target.addEventListener("scroll", this, this._scrollEventListenerOptions));
  }
  disconnected() {
    this._scrollEventListeners.forEach((target) => target.removeEventListener("scroll", this, this._scrollEventListenerOptions));
    this._scrollEventListeners = [];
    this._clippingAncestors = [];
    this._scrollerController?.detach(this);
    this._scrollerController = null;
    this._mutationObserver?.disconnect();
    this._mutationObserver = null;
    this._hostElementRO?.disconnect();
    this._hostElementRO = null;
    this._childrenRO?.disconnect();
    this._childrenRO = null;
    this._rejectLayoutCompletePromise("disconnected");
    this._connected = false;
  }
  _applyVirtualizerStyles() {
    const hostElement = this._hostElement;
    const style = hostElement.style;
    style.display = style.display || "block";
    style.position = style.position || "relative";
    style.contain = style.contain || "size layout";
    if (this._isScroller) {
      style.overflow = style.overflow || "auto";
      style.minHeight = style.minHeight || "150px";
    }
  }
  _getSizer() {
    const hostElement = this._hostElement;
    if (!this._sizer) {
      let sizer = hostElement.querySelector(`[${SIZER_ATTRIBUTE}]`);
      if (!sizer) {
        sizer = document.createElement("div");
        sizer.setAttribute(SIZER_ATTRIBUTE, "");
        hostElement.appendChild(sizer);
      }
      Object.assign(sizer.style, {
        position: "absolute",
        margin: "-2px 0 0 0",
        padding: 0,
        visibility: "hidden",
        fontSize: "2px"
      });
      sizer.textContent = "&nbsp;";
      sizer.setAttribute(SIZER_ATTRIBUTE, "");
      this._sizer = sizer;
    }
    return this._sizer;
  }
  async updateLayoutConfig(layoutConfig) {
    await this._layoutInitialized;
    const Ctor = layoutConfig.type || // The new config is compatible with the current layout,
    // so we update the config and return true to indicate
    // a successful update
    DefaultLayoutConstructor;
    if (typeof Ctor === "function" && this._layout instanceof Ctor) {
      const config = { ...layoutConfig };
      delete config.type;
      this._layout.config = config;
      return true;
    }
    return false;
  }
  async _initLayout(layoutConfig) {
    let config;
    let Ctor;
    if (typeof layoutConfig.type === "function") {
      Ctor = layoutConfig.type;
      const copy = { ...layoutConfig };
      delete copy.type;
      config = copy;
    } else {
      config = layoutConfig;
    }
    if (Ctor === void 0) {
      DefaultLayoutConstructor = Ctor = (await __vitePreload(() => Promise.resolve().then(() => flow$1), true ? void 0 : void 0)).FlowLayout;
    }
    this._layout = new Ctor((message) => this._handleLayoutMessage(message), config);
    if (this._layout.measureChildren && typeof this._layout.updateItemSizes === "function") {
      if (typeof this._layout.measureChildren === "function") {
        this._measureChildOverride = this._layout.measureChildren;
      }
      this._measureCallback = this._layout.updateItemSizes.bind(this._layout);
    }
    if (this._layout.listenForChildLoadEvents) {
      this._hostElement.addEventListener("load", this._loadListener, true);
    }
    this._schedule(this._updateLayout);
  }
  // TODO (graynorton): Rework benchmarking so that it has no API and
  // instead is always on except in production builds
  startBenchmarking() {
    if (this._benchmarkStart === null) {
      this._benchmarkStart = window.performance.now();
    }
  }
  stopBenchmarking() {
    if (this._benchmarkStart !== null) {
      const now = window.performance.now();
      const timeElapsed = now - this._benchmarkStart;
      const entries = performance.getEntriesByName("uv-virtualizing", "measure");
      const virtualizationTime = entries.filter((e2) => e2.startTime >= this._benchmarkStart && e2.startTime < now).reduce((t2, m2) => t2 + m2.duration, 0);
      this._benchmarkStart = null;
      return { timeElapsed, virtualizationTime };
    }
    return null;
  }
  _measureChildren() {
    const mm = {};
    const children = this._children;
    const fn = this._measureChildOverride || this._measureChild;
    for (let i5 = 0; i5 < children.length; i5++) {
      const child = children[i5];
      const idx = this._first + i5;
      if (this._itemsChanged || this._toBeMeasured.has(child)) {
        mm[idx] = fn.call(this, child, this._items[idx]);
      }
    }
    this._childMeasurements = mm;
    this._schedule(this._updateLayout);
    this._toBeMeasured.clear();
  }
  /**
   * Returns the width, height, and margins of the given child.
   */
  _measureChild(element) {
    const { width, height } = element.getBoundingClientRect();
    return Object.assign({ width, height }, getMargins(element));
  }
  async _schedule(method) {
    if (!this._scheduled.has(method)) {
      this._scheduled.add(method);
      await Promise.resolve();
      this._scheduled.delete(method);
      method.call(this);
    }
  }
  async _updateDOM(state) {
    this._scrollSize = state.scrollSize;
    this._adjustRange(state.range);
    this._childrenPos = state.childPositions;
    this._scrollError = state.scrollError || null;
    const { _rangeChanged, _itemsChanged } = this;
    if (this._visibilityChanged) {
      this._notifyVisibility();
      this._visibilityChanged = false;
    }
    if (_rangeChanged || _itemsChanged) {
      this._notifyRange();
      this._rangeChanged = false;
    }
    this._finishDOMUpdate();
  }
  _finishDOMUpdate() {
    if (this._connected) {
      this._children.forEach((child) => this._childrenRO.observe(child));
      this._checkScrollIntoViewTarget(this._childrenPos);
      this._positionChildren(this._childrenPos);
      this._sizeHostElement(this._scrollSize);
      this._correctScrollError();
      if (this._benchmarkStart && "mark" in window.performance) {
        window.performance.mark("uv-end");
      }
    }
  }
  _updateLayout() {
    if (this._layout && this._connected) {
      this._layout.items = this._items;
      this._updateView();
      if (this._childMeasurements !== null) {
        if (this._measureCallback) {
          this._measureCallback(this._childMeasurements);
        }
        this._childMeasurements = null;
      }
      this._layout.reflowIfNeeded();
      if (this._benchmarkStart && "mark" in window.performance) {
        window.performance.mark("uv-end");
      }
    }
  }
  _handleScrollEvent() {
    if (this._benchmarkStart && "mark" in window.performance) {
      try {
        window.performance.measure("uv-virtualizing", "uv-start", "uv-end");
      } catch (e2) {
        console.warn("Error measuring performance data: ", e2);
      }
      window.performance.mark("uv-start");
    }
    if (this._scrollerController.correctingScrollError === false) {
      this._layout?.unpin();
    }
    this._schedule(this._updateLayout);
  }
  handleEvent(event) {
    switch (event.type) {
      case "scroll":
        if (event.currentTarget === window || this._clippingAncestors.includes(event.currentTarget)) {
          this._handleScrollEvent();
        }
        break;
      default:
        console.warn("event not handled", event);
    }
  }
  _handleLayoutMessage(message) {
    if (message.type === "stateChanged") {
      this._updateDOM(message);
    } else if (message.type === "visibilityChanged") {
      this._firstVisible = message.firstVisible;
      this._lastVisible = message.lastVisible;
      this._notifyVisibility();
    } else if (message.type === "unpinned") {
      this._hostElement.dispatchEvent(new UnpinnedEvent());
    }
  }
  get _children() {
    const arr = [];
    let next = this._hostElement.firstElementChild;
    while (next) {
      if (!next.hasAttribute(SIZER_ATTRIBUTE)) {
        arr.push(next);
      }
      next = next.nextElementSibling;
    }
    return arr;
  }
  _updateView() {
    const hostElement = this._hostElement;
    const scrollingElement = this._scrollerController?.element;
    const layout = this._layout;
    if (hostElement && scrollingElement && layout) {
      let top, left, bottom, right;
      const hostElementBounds = hostElement.getBoundingClientRect();
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      const ancestorBounds = this._clippingAncestors.map((ancestor) => ancestor.getBoundingClientRect());
      ancestorBounds.unshift(hostElementBounds);
      for (const bounds of ancestorBounds) {
        top = Math.max(top, bounds.top);
        left = Math.max(left, bounds.left);
        bottom = Math.min(bottom, bounds.bottom);
        right = Math.min(right, bounds.right);
      }
      const scrollingElementBounds = scrollingElement.getBoundingClientRect();
      const offsetWithinScroller = {
        left: hostElementBounds.left - scrollingElementBounds.left,
        top: hostElementBounds.top - scrollingElementBounds.top
      };
      const totalScrollSize = {
        width: scrollingElement.scrollWidth,
        height: scrollingElement.scrollHeight
      };
      const scrollTop = top - hostElementBounds.top + hostElement.scrollTop;
      const scrollLeft = left - hostElementBounds.left + hostElement.scrollLeft;
      const height = Math.max(0, bottom - top);
      const width = Math.max(0, right - left);
      layout.viewportSize = { width, height };
      layout.viewportScroll = { top: scrollTop, left: scrollLeft };
      layout.totalScrollSize = totalScrollSize;
      layout.offsetWithinScroller = offsetWithinScroller;
    }
  }
  /**
   * Styles the host element so that its size reflects the
   * total size of all items.
   */
  _sizeHostElement(size) {
    const max = 82e5;
    const h2 = size && size.width !== null ? Math.min(max, size.width) : 0;
    const v2 = size && size.height !== null ? Math.min(max, size.height) : 0;
    if (this._isScroller) {
      this._getSizer().style.transform = `translate(${h2}px, ${v2}px)`;
    } else {
      const style = this._hostElement.style;
      style.minWidth = h2 ? `${h2}px` : "100%";
      style.minHeight = v2 ? `${v2}px` : "100%";
    }
  }
  /**
   * Sets the top and left transform style of the children from the values in
   * pos.
   */
  _positionChildren(pos) {
    if (pos) {
      pos.forEach(({ top, left, width, height, xOffset, yOffset }, index) => {
        const child = this._children[index - this._first];
        if (child) {
          child.style.position = "absolute";
          child.style.boxSizing = "border-box";
          child.style.transform = `translate(${left}px, ${top}px)`;
          if (width !== void 0) {
            child.style.width = width + "px";
          }
          if (height !== void 0) {
            child.style.height = height + "px";
          }
          child.style.left = xOffset === void 0 ? null : xOffset + "px";
          child.style.top = yOffset === void 0 ? null : yOffset + "px";
        }
      });
    }
  }
  async _adjustRange(range) {
    const { _first, _last, _firstVisible, _lastVisible } = this;
    this._first = range.first;
    this._last = range.last;
    this._firstVisible = range.firstVisible;
    this._lastVisible = range.lastVisible;
    this._rangeChanged = this._rangeChanged || this._first !== _first || this._last !== _last;
    this._visibilityChanged = this._visibilityChanged || this._firstVisible !== _firstVisible || this._lastVisible !== _lastVisible;
  }
  _correctScrollError() {
    if (this._scrollError) {
      const { scrollTop, scrollLeft } = this._scrollerController;
      const { top, left } = this._scrollError;
      this._scrollError = null;
      this._scrollerController.correctScrollError({
        top: scrollTop - top,
        left: scrollLeft - left
      });
    }
  }
  element(index) {
    if (index === Infinity) {
      index = this._items.length - 1;
    }
    return this._items?.[index] === void 0 ? void 0 : {
      scrollIntoView: (options2 = {}) => this._scrollElementIntoView({ ...options2, index })
    };
  }
  _scrollElementIntoView(options2) {
    if (options2.index >= this._first && options2.index <= this._last) {
      this._children[options2.index - this._first].scrollIntoView(options2);
    } else {
      options2.index = Math.min(options2.index, this._items.length - 1);
      if (options2.behavior === "smooth") {
        const coordinates = this._layout.getScrollIntoViewCoordinates(options2);
        const { behavior } = options2;
        this._updateScrollIntoViewCoordinates = this._scrollerController.managedScrollTo(Object.assign(coordinates, { behavior }), () => this._layout.getScrollIntoViewCoordinates(options2), () => this._scrollIntoViewTarget = null);
        this._scrollIntoViewTarget = options2;
      } else {
        this._layout.pin = options2;
      }
    }
  }
  /**
   * If we are smoothly scrolling to an element and the target element
   * is in the DOM, we update our target coordinates as needed
   */
  _checkScrollIntoViewTarget(pos) {
    const { index } = this._scrollIntoViewTarget || {};
    if (index && pos?.has(index)) {
      this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget));
    }
  }
  /**
   * Emits a rangechange event with the current first, last, firstVisible, and
   * lastVisible.
   */
  _notifyRange() {
    this._hostElement.dispatchEvent(new RangeChangedEvent({ first: this._first, last: this._last }));
  }
  _notifyVisibility() {
    this._hostElement.dispatchEvent(new VisibilityChangedEvent({
      first: this._firstVisible,
      last: this._lastVisible
    }));
  }
  get layoutComplete() {
    if (!this._layoutCompletePromise) {
      this._layoutCompletePromise = new Promise((resolve, reject) => {
        this._layoutCompleteResolver = resolve;
        this._layoutCompleteRejecter = reject;
      });
    }
    return this._layoutCompletePromise;
  }
  _rejectLayoutCompletePromise(reason) {
    if (this._layoutCompleteRejecter !== null) {
      this._layoutCompleteRejecter(reason);
    }
    this._resetLayoutCompleteState();
  }
  _scheduleLayoutComplete() {
    if (this._layoutCompletePromise && this._pendingLayoutComplete === null) {
      this._pendingLayoutComplete = requestAnimationFrame(() => requestAnimationFrame(() => this._resolveLayoutCompletePromise()));
    }
  }
  _resolveLayoutCompletePromise() {
    if (this._layoutCompleteResolver !== null) {
      this._layoutCompleteResolver();
    }
    this._resetLayoutCompleteState();
  }
  _resetLayoutCompleteState() {
    this._layoutCompletePromise = null;
    this._layoutCompleteResolver = null;
    this._layoutCompleteRejecter = null;
    this._pendingLayoutComplete = null;
  }
  /**
   * Render and update the view at the next opportunity with the given
   * hostElement size.
   */
  _hostElementSizeChanged() {
    this._schedule(this._updateLayout);
  }
  // TODO (graynorton): Rethink how this works. Probably child loading is too specific
  // to have dedicated support for; might want some more generic lifecycle hooks for
  // layouts to use. Possibly handle measurement this way, too, or maybe that remains
  // a first-class feature?
  _childLoaded() {
  }
  // This is the callback for the ResizeObserver that watches the
  // virtualizer's children. We land here at the end of every virtualizer
  // update cycle that results in changes to physical items, and we also
  // end up here if one or more children change size independently of
  // the virtualizer update cycle.
  _childrenSizeChanged(changes) {
    if (this._layout?.measureChildren) {
      for (const change of changes) {
        this._toBeMeasured.set(change.target, change.contentRect);
      }
      this._measureChildren();
    }
    this._scheduleLayoutComplete();
    this._itemsChanged = false;
    this._rangeChanged = false;
  }
}
function getMargins(el) {
  const style = window.getComputedStyle(el);
  return {
    marginTop: getMarginValue(style.marginTop),
    marginRight: getMarginValue(style.marginRight),
    marginBottom: getMarginValue(style.marginBottom),
    marginLeft: getMarginValue(style.marginLeft)
  };
}
function getMarginValue(value) {
  const float = value ? parseFloat(value) : NaN;
  return Number.isNaN(float) ? 0 : float;
}
function getParentElement(el) {
  if (el.assignedSlot !== null) {
    return el.assignedSlot;
  }
  if (el.parentElement !== null) {
    return el.parentElement;
  }
  const parentNode = el.parentNode;
  if (parentNode && parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return parentNode.host || null;
  }
  return null;
}
function getElementAncestors(el, includeSelf = false) {
  const ancestors = [];
  let parent = includeSelf ? el : getParentElement(el);
  while (parent !== null) {
    ancestors.push(parent);
    parent = getParentElement(parent);
  }
  return ancestors;
}
function getClippingAncestors(el, includeSelf = false) {
  let foundFixed = false;
  return getElementAncestors(el, includeSelf).filter((a2) => {
    if (foundFixed) {
      return false;
    }
    const style = getComputedStyle(a2);
    foundFixed = style.position === "fixed";
    return style.overflow !== "visible";
  });
}
const defaultKeyFunction = (item) => item;
const defaultRenderItem = (item, idx) => x`${idx}: ${JSON.stringify(item, null, 2)}`;
class VirtualizeDirective extends f {
  constructor(part) {
    super(part);
    this._virtualizer = null;
    this._first = 0;
    this._last = -1;
    this._renderItem = (item, idx) => defaultRenderItem(item, idx + this._first);
    this._keyFunction = (item, idx) => defaultKeyFunction(item, idx + this._first);
    this._items = [];
    if (part.type !== t$1.CHILD) {
      throw new Error("The virtualize directive can only be used in child expressions");
    }
  }
  render(config) {
    if (config) {
      this._setFunctions(config);
    }
    const itemsToRender = [];
    if (this._first >= 0 && this._last >= this._first) {
      for (let i5 = this._first; i5 <= this._last; i5++) {
        itemsToRender.push(this._items[i5]);
      }
    }
    return c2(itemsToRender, this._keyFunction, this._renderItem);
  }
  update(part, [config]) {
    this._setFunctions(config);
    const itemsChanged = this._items !== config.items;
    this._items = config.items || [];
    if (this._virtualizer) {
      this._updateVirtualizerConfig(part, config);
    } else {
      this._initialize(part, config);
    }
    return itemsChanged ? T : this.render();
  }
  async _updateVirtualizerConfig(part, config) {
    const compatible = await this._virtualizer.updateLayoutConfig(config.layout || {});
    if (!compatible) {
      const hostElement = part.parentNode;
      this._makeVirtualizer(hostElement, config);
    }
    this._virtualizer.items = this._items;
  }
  _setFunctions(config) {
    const { renderItem, keyFunction } = config;
    if (renderItem) {
      this._renderItem = (item, idx) => renderItem(item, idx + this._first);
    }
    if (keyFunction) {
      this._keyFunction = (item, idx) => keyFunction(item, idx + this._first);
    }
  }
  _makeVirtualizer(hostElement, config) {
    if (this._virtualizer) {
      this._virtualizer.disconnected();
    }
    const { layout, scroller, items } = config;
    this._virtualizer = new Virtualizer({ hostElement, layout, scroller });
    this._virtualizer.items = items;
    this._virtualizer.connected();
  }
  _initialize(part, config) {
    const hostElement = part.parentNode;
    if (hostElement && hostElement.nodeType === 1) {
      hostElement.addEventListener("rangeChanged", (e2) => {
        this._first = e2.first;
        this._last = e2.last;
        this.setValue(this.render());
      });
      this._makeVirtualizer(hostElement, config);
    }
  }
  disconnected() {
    this._virtualizer?.disconnected();
  }
  reconnected() {
    this._virtualizer?.connected();
  }
}
const virtualize = e$1(VirtualizeDirective);
class LitVirtualizer extends i$4 {
  constructor() {
    super(...arguments);
    this.items = [];
    this.renderItem = defaultRenderItem;
    this.keyFunction = defaultKeyFunction;
    this.layout = {};
    this.scroller = false;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    const { items, renderItem, keyFunction, layout, scroller } = this;
    return x`${virtualize({
      items,
      renderItem,
      keyFunction,
      layout,
      scroller
    })}`;
  }
  element(index) {
    return this[virtualizerRef]?.element(index);
  }
  get layoutComplete() {
    return this[virtualizerRef]?.layoutComplete;
  }
  /**
   * This scrollToIndex() shim is here to provide backwards compatibility with other 0.x versions of
   * lit-virtualizer. It is deprecated and will likely be removed in the 1.0.0 release.
   */
  scrollToIndex(index, position = "start") {
    this.element(index)?.scrollIntoView({ block: position });
  }
}
__decorate([
  n$4({ attribute: false })
], LitVirtualizer.prototype, "items", void 0);
__decorate([
  n$4()
], LitVirtualizer.prototype, "renderItem", void 0);
__decorate([
  n$4()
], LitVirtualizer.prototype, "keyFunction", void 0);
__decorate([
  n$4({ attribute: false })
], LitVirtualizer.prototype, "layout", void 0);
__decorate([
  n$4({ reflect: true, type: Boolean })
], LitVirtualizer.prototype, "scroller", void 0);
if (!customElements.get("lit-virtualizer")) {
  customElements.define("lit-virtualizer", LitVirtualizer);
}
const loadVirtualizer = async () => {
};
const brandsUrl = (options2) => {
  const { domain, type, useFallback = true, darkOptimized = false } = options2;
  return `https://brands.home-assistant.io/${useFallback ? "_/" : ""}${domain}/${darkOptimized ? "dark_" : ""}${type}.png`;
};
const isBrandUrl = (url) => {
  return url?.startsWith("https://brands.home-assistant.io/") ?? false;
};
const extractDomainFromBrandUrl = (url) => {
  const match = url.match(/brands\.home-assistant\.io\/[^/]+\/([^/]+)\//);
  return match?.[1] ?? "";
};
const documentationUrl = (_hass, path) => {
  return `https://www.home-assistant.io${path}`;
};
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
const MANUAL_ITEM = {
  can_expand: true,
  can_play: false,
  can_search: false,
  children_media_class: "",
  media_class: "app",
  media_content_id: MANUAL_MEDIA_SOURCE_PREFIX,
  media_content_type: "",
  iconPath: mdiKeyboard,
  title: "Manual entry"
};
let HaMediaPlayerBrowse = class extends i$4 {
  constructor() {
    super(...arguments);
    this.action = "play";
    this.preferredLayout = "auto";
    this.dialog = false;
    this.navigateIds = [];
    this.hideContentType = false;
    this.narrow = false;
    this.scrolled = false;
    this._observed = false;
    this._headerOffsetHeight = 0;
    this._renderGridItem = (child) => {
      const backgroundImage = child.thumbnail ? this._getThumbnailURLorBase64(child.thumbnail).then((value) => `url(${value})`) : "none";
      return x`
      <div class="child" .item=${child} @click=${this._childClicked}>
        <ha-card outlined>
          <div class="thumbnail">
            ${child.thumbnail ? x`
                  <div
                    class="${e({
        "centered-image": ["app", "directory"].includes(child.media_class),
        "brand-image": isBrandUrl(child.thumbnail)
      })} image"
                    style="background-image: ${m(backgroundImage, "")}"
                  ></div>
                ` : x`
                  <div class="icon-holder image">
                    <ha-svg-icon
                      class=${child.iconPath ? "icon" : "folder"}
                      .path=${child.iconPath || MediaClassBrowserSettings[child.media_class === "directory" ? child.children_media_class || child.media_class : child.media_class].icon}
                    ></ha-svg-icon>
                  </div>
                `}
            ${child.can_play ? x`
                  <ha-icon-button
                    class="play ${e({
        can_expand: child.can_expand
      })}"
                    .item=${child}
                    .label=${this.hass.localize(`ui.components.media-browser.${this.action}-media`)}
                    .path=${this.action === "play" ? mdiPlay : mdiPlus}
                    @click=${this._actionClicked}
                  ></ha-icon-button>
                ` : ""}
          </div>
          <ha-tooltip .for="grid-${slugify(child.title)}" distance="-4"> ${child.title} </ha-tooltip>
          <div .id="grid-${slugify(child.title)}" class="title">${child.title}</div>
        </ha-card>
      </div>
    `;
    };
    this._renderListItem = (child) => {
      const currentItem = this._currentItem;
      const mediaClass = MediaClassBrowserSettings[currentItem.media_class];
      const backgroundImage = mediaClass.show_list_images && child.thumbnail ? this._getThumbnailURLorBase64(child.thumbnail).then((value) => `url(${value})`) : "none";
      return x`
      <ha-list-item
        @click=${this._childClicked}
        .item=${child}
        .graphic=${mediaClass.show_list_images ? "medium" : "avatar"}
      >
        ${backgroundImage === "none" && !child.can_play ? x`<ha-svg-icon
              .path=${MediaClassBrowserSettings[child.media_class === "directory" ? child.children_media_class || child.media_class : child.media_class].icon}
              slot="graphic"
            ></ha-svg-icon>` : x`<div
              class=${e({
        graphic: true,
        thumbnail: mediaClass.show_list_images === true
      })}
              style="background-image: ${m(backgroundImage, "")}"
              slot="graphic"
            >
              ${child.can_play ? x`<ha-icon-button
                    class="play ${e({
        show: !mediaClass.show_list_images || !child.thumbnail
      })}"
                    .item=${child}
                    .label=${this.hass.localize(`ui.components.media-browser.${this.action}-media`)}
                    .path=${this.action === "play" ? mdiPlay : mdiPlus}
                    @click=${this._actionClicked}
                  ></ha-icon-button>` : E}
            </div>`}
        <span class="title">${child.title}</span>
      </ha-list-item>
    `;
    };
    this._actionClicked = (ev) => {
      ev.stopPropagation();
      const item = ev.currentTarget.item;
      this._runAction(item);
    };
    this._childClicked = async (ev) => {
      const target = ev.currentTarget;
      const item = target.item;
      if (!item) {
        return;
      }
      if (!item.can_expand) {
        this._runAction(item);
        return;
      }
      ne(this, "media-browsed", {
        ids: [...this.navigateIds, item]
      });
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => this._attachResizeObserver());
  }
  getPlayableChildren() {
    if (!this._currentItem?.children) {
      return [];
    }
    return this._currentItem.children.filter((child) => child.can_play);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }
  async refresh() {
    const currentId = this.navigateIds[this.navigateIds.length - 1];
    try {
      this._currentItem = await this._fetchData(
        this.entityId,
        currentId.media_content_id,
        currentId.media_content_type
      );
      ne(this, "media-browsed", {
        ids: this.navigateIds,
        current: this._currentItem
      });
    } catch (err) {
      this._setError(err);
    }
  }
  play() {
    if (this._currentItem?.can_play) {
      this._runAction(this._currentItem);
    }
  }
  willUpdate(changedProps) {
    super.willUpdate(changedProps);
    if (!this.hasUpdated) {
      loadVirtualizer();
    }
    if (changedProps.has("entityId")) {
      this._setError(void 0);
    } else if (!changedProps.has("navigateIds")) {
      return;
    }
    this._setError(void 0);
    const oldNavigateIds = changedProps.get("navigateIds");
    const navigateIds = this.navigateIds;
    this._content?.scrollTo(0, 0);
    this.scrolled = false;
    const oldCurrentItem = this._currentItem;
    const oldParentItem = this._parentItem;
    this._currentItem = void 0;
    this._parentItem = void 0;
    const currentId = navigateIds[navigateIds.length - 1];
    const parentId = navigateIds.length > 1 ? navigateIds[navigateIds.length - 2] : void 0;
    let currentProm;
    let parentProm;
    if (!changedProps.has("entityId")) {
      if (
        // Check if we navigated to a child
        oldNavigateIds && navigateIds.length === oldNavigateIds.length + 1 && oldNavigateIds.every((oldVal, idx) => {
          const curVal = navigateIds[idx];
          return curVal.media_content_id === oldVal.media_content_id && curVal.media_content_type === oldVal.media_content_type;
        })
      ) {
        parentProm = Promise.resolve(oldCurrentItem);
      } else if (
        // Check if we navigated to a parent
        oldNavigateIds && navigateIds.length === oldNavigateIds.length - 1 && navigateIds.every((curVal, idx) => {
          const oldVal = oldNavigateIds[idx];
          return curVal.media_content_id === oldVal.media_content_id && curVal.media_content_type === oldVal.media_content_type;
        })
      ) {
        currentProm = Promise.resolve(oldParentItem);
      }
    }
    if (currentId.media_content_id && isManualMediaSourceContentId(currentId.media_content_id)) {
      this._currentItem = MANUAL_ITEM;
      ne(this, "media-browsed", {
        ids: navigateIds,
        current: this._currentItem
      });
    } else {
      if (!currentProm) {
        currentProm = this._fetchData(this.entityId, currentId.media_content_id, currentId.media_content_type);
      }
      currentProm.then(
        (item) => {
          this._currentItem = item;
          ne(this, "media-browsed", {
            ids: navigateIds,
            current: item
          });
        },
        (err) => {
          const isNewEntityWithSamePath = oldNavigateIds && changedProps.has("entityId") && navigateIds.length === oldNavigateIds.length && oldNavigateIds.every(
            (oldItem, idx) => navigateIds[idx].media_content_id === oldItem.media_content_id && navigateIds[idx].media_content_type === oldItem.media_content_type
          );
          if (isNewEntityWithSamePath) {
            ne(this, "media-browsed", {
              ids: [{ media_content_id: void 0, media_content_type: void 0 }],
              replace: true
            });
          } else if (err.code === "entity_not_found" && this.entityId && isUnavailableState(this.hass.states[this.entityId]?.state)) {
            this._setError({
              message: this.hass.localize(`ui.components.media-browser.media_player_unavailable`),
              code: "entity_not_found"
            });
          } else {
            this._setError(err);
          }
        }
      );
    }
    if (!parentProm && parentId !== void 0) {
      parentProm = this._fetchData(this.entityId, parentId.media_content_id, parentId.media_content_type);
    }
    if (parentProm) {
      parentProm.then((parent) => {
        this._parentItem = parent;
      });
    }
  }
  shouldUpdate(changedProps) {
    if (changedProps.size > 1 || !changedProps.has("hass")) {
      return true;
    }
    const oldHass = changedProps.get("hass");
    return oldHass === void 0 || oldHass.localize !== this.hass.localize;
  }
  firstUpdated() {
    this._measureCard();
    this._attachResizeObserver();
  }
  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("_scrolled")) {
      this._animateHeaderHeight();
    } else if (changedProps.has("_currentItem")) {
      this._setHeaderHeight();
      if (this._observed) {
        return;
      }
      const virtualizer = this._virtualizer?._virtualizer;
      if (virtualizer) {
        this._observed = true;
        setTimeout(() => virtualizer._observeMutations(), 0);
      }
    }
  }
  render() {
    if (this._error) {
      return x`
        <div class="container">
          <ha-alert alert-type="error"> ${this._renderError(this._error)} </ha-alert>
        </div>
      `;
    }
    if (!this._currentItem) {
      return x`<ha-spinner></ha-spinner>`;
    }
    const currentItem = this._currentItem;
    const subtitle = this.hass.localize(`ui.components.media-browser.class.${currentItem.media_class}`);
    let children = filterOutIgnoredMediaSources(currentItem.children || []);
    const canPlayChildren = /* @__PURE__ */ new Set();
    if (this.accept && children.length > 0) {
      let checks = [];
      for (const type of this.accept) {
        if (type.endsWith("/*")) {
          const baseType = type.slice(0, -1);
          checks.push((t2) => t2.startsWith(baseType));
        } else if (type === "*") {
          checks = [() => true];
          break;
        } else {
          checks.push((t2) => t2 === type);
        }
      }
      children = children.filter((child) => {
        const contentType = child.media_content_type.toLowerCase();
        const canPlay = child.media_content_type && checks.some((check) => check(contentType));
        if (canPlay) {
          canPlayChildren.add(child.media_content_id);
        }
        return !child.media_content_type || child.can_expand || canPlay;
      });
    }
    const mediaClass = MediaClassBrowserSettings[currentItem.media_class];
    const childrenMediaClass = currentItem.children_media_class ? MediaClassBrowserSettings[currentItem.children_media_class] : MediaClassBrowserSettings.directory;
    const backgroundImage = currentItem.thumbnail ? this._getThumbnailURLorBase64(currentItem.thumbnail).then((value) => `url(${value})`) : "none";
    return x`
              ${currentItem.can_play ? x`
                      <div
                        class="header ${e({
      "no-img": !currentItem.thumbnail,
      "no-dialog": !this.dialog
    })}"
                        @transitionend=${this._setHeaderHeight}
                      >
                        <div class="header-content">
                          ${currentItem.thumbnail ? x`
                                <div class="img" style="background-image: ${m(backgroundImage, "")}">
                                  ${this.narrow && currentItem?.can_play && (!this.accept || canPlayChildren.has(currentItem.media_content_id)) ? x`
                                        <ha-fab mini .item=${currentItem} @click=${this._actionClicked}>
                                          <ha-svg-icon
                                            slot="icon"
                                            .label=${this.hass.localize(
      `ui.components.media-browser.${this.action}-media`
    )}
                                            .path=${this.action === "play" ? mdiPlay : mdiPlus}
                                          ></ha-svg-icon>
                                          ${this.hass.localize(`ui.components.media-browser.${this.action}`)}
                                        </ha-fab>
                                      ` : ""}
                                </div>
                              ` : E}
                          <div class="header-info">
                            <div class="breadcrumb">
                              <h1 class="title">${currentItem.title}</h1>
                              ${subtitle ? x` <h2 class="subtitle">${subtitle}</h2> ` : ""}
                            </div>
                            ${currentItem.can_play && (!currentItem.thumbnail || !this.narrow) ? x`
                                  <ha-button .item=${currentItem} @click=${this._actionClicked}>
                                    <ha-svg-icon
                                      .label=${this.hass.localize(`ui.components.media-browser.${this.action}-media`)}
                                      .path=${this.action === "play" ? mdiPlay : mdiPlus}
                                      slot="start"
                                    ></ha-svg-icon>
                                    ${this.hass.localize(`ui.components.media-browser.${this.action}`)}
                                  </ha-button>
                                ` : ""}
                          </div>
                        </div>
                      </div>
                    ` : ""}
          <div
            class="content"
            @scroll=${this._scroll}
            @touchmove=${this._scroll}
          >
            ${this._error ? x`
                    <div class="container">
                      <ha-alert alert-type="error"> ${this._renderError(this._error)} </ha-alert>
                    </div>
                  ` : isManualMediaSourceContentId(currentItem.media_content_id) ? x`<ha-browse-media-manual
                      .item=${{
      media_content_id: this.defaultId || "",
      media_content_type: this.defaultType || ""
    }}
                      .hass=${this.hass}
                      .hideContentType=${this.hideContentType}
                      .contentIdHelper=${this.contentIdHelper}
                      @manual-media-picked=${this._manualPicked}
                    ></ha-browse-media-manual>` : isTTSMediaSource(currentItem.media_content_id) ? x`
                        <ha-browse-media-tts
                          .item=${currentItem}
                          .hass=${this.hass}
                          .action=${this.action}
                          @tts-picked=${this._ttsPicked}
                        ></ha-browse-media-tts>
                      ` : !children.length && !currentItem.not_shown ? x`
                          <div class="container no-items">
                            ${currentItem.media_content_id === "media-source://media_source/local/." ? x`
                                  <div class="highlight-add-button">
                                    <span>
                                      <ha-svg-icon .path=${mdiArrowUpRight}></ha-svg-icon>
                                    </span>
                                    <span>
                                      ${this.hass.localize(
      "ui.components.media-browser.file_management.highlight_button"
    )}
                                    </span>
                                  </div>
                                ` : this.hass.localize("ui.components.media-browser.no_items")}
                          </div>
                        ` : this.itemsPerRow ? x`
                    <div class="children flex-grid" style="--items-per-row: ${this.itemsPerRow}">
                      ${children.map((child) => this._renderGridItem(child))}
                    </div>
                    ${currentItem.not_shown ? x`
                          <div class="grid not-shown">
                            <div class="title">
                              ${this.hass.localize("ui.components.media-browser.not_shown", {
      count: currentItem.not_shown
    })}
                            </div>
                          </div>
                        ` : ""}
                  ` : this.preferredLayout === "grid" || this.preferredLayout === "auto" && childrenMediaClass.layout === "grid" ? x`
                            <lit-virtualizer
                              scroller
                              .layout=${grid({
      itemSize: getGridItemSize(this.itemsPerRow, childrenMediaClass.thumbnail_ratio === "portrait"),
      gap: "8px",
      flex: { preserve: "aspect-ratio" },
      justify: "space-evenly",
      direction: "vertical"
    })}
                              .items=${children}
                              .renderItem=${this._renderGridItem}
                              class="children ${e({
      portrait: childrenMediaClass.thumbnail_ratio === "portrait",
      not_shown: !!currentItem.not_shown
    })}"
                            ></lit-virtualizer>
                            ${currentItem.not_shown ? x`
                                  <div class="grid not-shown">
                                    <div class="title">
                                      ${this.hass.localize("ui.components.media-browser.not_shown", {
      count: currentItem.not_shown
    })}
                                    </div>
                                  </div>
                                ` : ""}
                          ` : x`
                            <ha-list>
                              <lit-virtualizer
                                scroller
                                .items=${children}
                                style=${o({
      height: `${children.length * 72 + 26}px`
    })}
                                .renderItem=${this._renderListItem}
                              ></lit-virtualizer>
                              ${currentItem.not_shown ? x`
                                    <ha-list-item
                                      noninteractive
                                      class="not-shown"
                                      .graphic=${mediaClass.show_list_images ? "medium" : "avatar"}
                                    >
                                      <span class="title">
                                        ${this.hass.localize("ui.components.media-browser.not_shown", {
      count: currentItem.not_shown
    })}
                                      </span>
                                    </ha-list-item>
                                  ` : ""}
                            </ha-list>
                          `}
          </div>
        </div>
      </div>
    `;
  }
  async _getThumbnailURLorBase64(thumbnailUrl) {
    if (!thumbnailUrl) {
      return "";
    }
    if (thumbnailUrl.startsWith("/")) {
      return new Promise((resolve, reject) => {
        this.hass.fetchWithAuth(thumbnailUrl).then((response) => response.blob()).then((blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result;
            resolve(typeof result === "string" ? result : "");
          };
          reader.onerror = (e2) => reject(e2);
          reader.readAsDataURL(blob);
        });
      });
    }
    if (isBrandUrl(thumbnailUrl)) {
      thumbnailUrl = brandsUrl({
        domain: extractDomainFromBrandUrl(thumbnailUrl),
        type: "icon",
        useFallback: true,
        darkOptimized: this.hass.themes?.darkMode
      });
    }
    return thumbnailUrl;
  }
  _runAction(item) {
    ne(this, "media-picked", { item, navigateIds: this.navigateIds });
  }
  _ttsPicked(ev) {
    ev.stopPropagation();
    const navigateIds = this.navigateIds.slice(0, -1);
    navigateIds.push(ev.detail.item);
    ne(this, "media-picked", {
      ...ev.detail,
      navigateIds
    });
  }
  _manualPicked(ev) {
    ev.stopPropagation();
    ne(this, "media-picked", {
      item: ev.detail.item,
      navigateIds: this.navigateIds
    });
  }
  async _fetchData(entityId, mediaContentId, mediaContentType) {
    const prom = entityId && entityId !== BROWSER_PLAYER ? browseMediaPlayer(this.hass, entityId, mediaContentId, mediaContentType) : browseLocalMediaPlayer(this.hass, mediaContentId);
    return prom.then((item) => {
      if (!mediaContentId && this.action === "pick") {
        item.children = item.children || [];
        item.children.push(MANUAL_ITEM);
      }
      return item;
    });
  }
  _measureCard() {
    this.narrow = (this.dialog ? window.innerWidth : this.offsetWidth) < 450;
  }
  async _attachResizeObserver() {
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(ue(() => this._measureCard(), 250));
    }
    this._resizeObserver.observe(this);
  }
  _closeDialogAction() {
    ne(this, "close-dialog");
  }
  _setError(error) {
    if (!this.dialog) {
      this._error = error;
      return;
    }
    if (!error) {
      return;
    }
    this._closeDialogAction();
    showAlertDialog(this, {
      title: this.hass.localize("ui.components.media-browser.media_browsing_error"),
      text: this._renderError(error)
    });
  }
  _renderError(err) {
    if (err.message === "Media directory does not exist.") {
      return x`
        <h2>${this.hass.localize("ui.components.media-browser.no_local_media_found")}</h2>
        <p>
          ${this.hass.localize("ui.components.media-browser.no_media_folder")}
          <br />
          ${this.hass.localize("ui.components.media-browser.setup_local_help", {
        documentation: x`<a
              href=${documentationUrl(this.hass, "/more-info/local-media/setup-media")}
              target="_blank"
              rel="noreferrer"
              >${this.hass.localize("ui.components.media-browser.documentation")}</a
            >`
      })}
          <br />
          ${this.hass.localize("ui.components.media-browser.local_media_files")}
        </p>
      `;
    }
    return x`<span class="error">${err.message}</span>`;
  }
  async _setHeaderHeight() {
    await this.updateComplete;
    const header = this._header;
    const content = this._content;
    if (!header || !content) {
      return;
    }
    this._headerOffsetHeight = header.offsetHeight;
    content.style.marginTop = `${this._headerOffsetHeight}px`;
    content.style.maxHeight = `calc(var(--media-browser-max-height, 100%) - ${this._headerOffsetHeight}px)`;
  }
  _animateHeaderHeight() {
    let start;
    const animate = (time) => {
      if (start === void 0) {
        start = time;
      }
      const elapsed = time - start;
      this._setHeaderHeight();
      if (elapsed < 400) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }
  _scroll(ev) {
    const content = ev.currentTarget;
    if (!this.scrolled && content.scrollTop > this._headerOffsetHeight) {
      this.scrolled = true;
    } else if (this.scrolled && content.scrollTop < this._headerOffsetHeight) {
      this.scrolled = false;
    }
  }
  static get styles() {
    return [
      haStyle,
      i$7`
        :host {
          display: flex;
          flex-direction: column;
          position: relative;
          direction: ltr;
          height: 100%;
        }

        ha-spinner {
          margin: 40px auto;
        }

        .container {
          padding: 16px;
        }

        .no-items {
          padding-left: 32px;
        }

        .highlight-add-button {
          display: flex;
          flex-direction: row-reverse;
          margin-right: 48px;
          margin-inline-end: 48px;
          margin-inline-start: initial;
          direction: var(--direction);
        }

        .highlight-add-button ha-svg-icon {
          position: relative;
          top: -0.5em;
          margin-left: 8px;
          margin-inline-start: 8px;
          margin-inline-end: initial;
          transform: scaleX(var(--scale-direction));
        }

        .content {
          overflow-y: auto;
          box-sizing: border-box;
          height: 100%;
          flex: 1;
        }

        /* HEADER */

        .header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--divider-color);
          background-color: var(--card-background-color);
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          z-index: 3;
          padding: 16px;
        }
        .header_button {
          position: relative;
          right: -8px;
        }
        .header-content {
          display: flex;
          flex-wrap: wrap;
          flex-grow: 1;
          align-items: flex-start;
        }
        .header-content .img {
          height: 175px;
          width: 175px;
          margin-right: 16px;
          background-size: cover;
          border-radius: 2px;
          transition:
            width 0.4s,
            height 0.4s;
        }
        .header-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-self: stretch;
          min-width: 0;
          flex: 1;
        }
        .header-info ha-button {
          display: block;
          padding-bottom: 16px;
        }
        .breadcrumb {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          flex-grow: 1;
          padding-top: 16px;
        }
        .breadcrumb .title {
          font-size: var(--ha-font-size-4xl);
          line-height: var(--ha-line-height-condensed);
          font-weight: var(--ha-font-weight-bold);
          margin: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          padding-right: 8px;
        }
        .breadcrumb .previous-title {
          font-size: var(--ha-font-size-m);
          padding-bottom: 8px;
          color: var(--secondary-text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          --mdc-icon-size: 14px;
        }
        .breadcrumb .subtitle {
          font-size: var(--ha-font-size-l);
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0;
          transition:
            height 0.5s,
            margin 0.5s;
        }

        .not-shown {
          font-style: italic;
          color: var(--secondary-text-color);
          padding: 8px 16px 8px;
        }

        .grid.not-shown {
          display: flex;
          align-items: center;
          text-align: center;
        }

        /* ============= CHILDREN ============= */

        ha-list {
          --mdc-list-vertical-padding: 0;
          --mdc-list-item-graphic-margin: 0;
          --mdc-theme-text-icon-on-background: var(--secondary-text-color);
          margin-top: 10px;
        }

        ha-list li:last-child {
          display: none;
        }

        ha-list li[divider] {
          border-bottom-color: var(--divider-color);
        }

        ha-list-item {
          width: 100%;
        }

        div.children {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(var(--media-browse-item-size, 175px), 0.1fr));
          grid-gap: var(--ha-space-4);
          padding: 16px;
        }

        div.children.flex-grid {
          display: flex;
          flex-wrap: wrap;
          padding: 4px;
          gap: 8px;
        }

        .flex-grid .child {
          /* 8px gap between items, so subtract gap*(n-1)/n ≈ gap for simplicity */
          width: calc(100% / var(--items-per-row) - 8px);
        }

        :host([dialog]) .children {
          grid-template-columns: repeat(auto-fit, minmax(var(--media-browse-item-size, 175px), 0.33fr));
        }

        .child {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        ha-card {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        .children ha-card .thumbnail {
          width: 100%;
          position: relative;
          box-sizing: border-box;
          transition: padding-bottom 0.1s ease-out;
          padding-bottom: 100%;
        }

        .portrait ha-card .thumbnail {
          padding-bottom: 150%;
        }

        ha-card .image {
          border-radius: var(--ha-border-radius-sm) var(--ha-border-radius-sm) var(--ha-border-radius-square)
            var(--ha-border-radius-square);
        }

        .image {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        .centered-image {
          margin: 0 8px;
          background-size: contain;
        }

        .brand-image {
          background-size: 40%;
        }

        .children ha-card .icon-holder {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .child .folder {
          color: var(--secondary-text-color);
          --mdc-icon-size: calc(var(--media-browse-item-size, 175px) * 0.4);
        }

        .child .icon {
          color: #00a9f7; /* Match the png color from brands repo */
          --mdc-icon-size: calc(var(--media-browse-item-size, 175px) * 0.4);
        }

        .child .play {
          position: absolute;
          transition: color 0.5s;
          border-radius: var(--ha-border-radius-circle);
          top: calc(50% - 20px);
          right: calc(50% - 20px);
          opacity: 0;
          transition: opacity 0.1s ease-out;
        }

        .child .play:not(.can_expand) {
          --mdc-icon-button-size: 40px;
          --mdc-icon-size: 24px;
          background-color: var(--primary-color);
          color: var(--text-primary-color);
        }

        ha-card:hover .image {
          filter: brightness(70%);
          transition: filter 0.5s;
        }

        ha-card:hover .play {
          opacity: 1;
        }

        ha-card:hover .play.can_expand {
          bottom: 8px;
        }

        .child .play.can_expand {
          background-color: rgba(var(--rgb-card-background-color), 0.5);
          top: auto;
          bottom: 0px;
          right: 8px;
          transition:
            bottom 0.1s ease-out,
            opacity 0.1s ease-out;
        }

        .child .title {
          font-size: var(--ha-font-size-l);
          padding-top: 16px;
          padding-left: 2px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
        }

        .child ha-card .title {
          margin-bottom: 16px;
          padding-left: 16px;
        }

        ha-list-item .graphic {
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: var(--ha-border-radius-sm);
          display: flex;
          align-content: center;
          align-items: center;
          line-height: initial;
        }

        ha-list-item .graphic .play {
          opacity: 0;
          transition: all 0.5s;
          background-color: rgba(var(--rgb-card-background-color), 0.5);
          border-radius: var(--ha-border-radius-circle);
          --mdc-icon-button-size: 40px;
        }

        ha-list-item:hover .graphic .play {
          opacity: 1;
          color: var(--primary-text-color);
        }

        ha-list-item .graphic .play.show {
          opacity: 1;
          background-color: transparent;
        }

        ha-list-item .title {
          margin-left: 16px;
          margin-inline-start: 16px;
          margin-inline-end: initial;
        }

        /* ============= Narrow ============= */

        :host([narrow]) {
          padding: 0;
        }

        :host([narrow]) .media-source {
          padding: 0 24px;
        }

        :host([narrow]) div.children {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
        }

        :host([narrow]) .breadcrumb .title {
          font-size: var(--ha-font-size-2xl);
        }
        :host([narrow]) .header {
          padding: 0;
        }
        :host([narrow]) .header.no-dialog {
          display: block;
        }
        :host([narrow]) .header_button {
          position: absolute;
          top: 14px;
          right: 8px;
        }
        :host([narrow]) .header-content {
          flex-direction: column;
          flex-wrap: nowrap;
        }
        :host([narrow]) .header-content .img {
          height: auto;
          width: 100%;
          margin-right: 0;
          padding-bottom: 50%;
          margin-bottom: 8px;
          position: relative;
          background-position: center;
          border-radius: var(--ha-border-radius-square);
          transition:
            width 0.4s,
            height 0.4s,
            padding-bottom 0.4s;
        }
        ha-fab {
          position: absolute;
          --mdc-theme-secondary: var(--primary-color);
          bottom: -20px;
          right: 20px;
        }
        :host([narrow]) .header-info ha-button {
          margin-top: 16px;
          margin-bottom: 8px;
        }
        :host([narrow]) .header-info {
          padding: 0 16px 8px;
        }

        /* ============= Scroll ============= */
        :host([scrolled]) .breadcrumb .subtitle {
          height: 0;
          margin: 0;
        }
        :host([scrolled]) .breadcrumb .title {
          -webkit-line-clamp: 1;
        }
        :host(:not([narrow])[scrolled]) .header:not(.no-img) ha-icon-button {
          align-self: center;
        }
        :host([scrolled]) .header-info ha-button,
        .no-img .header-info ha-button {
          padding-right: 4px;
        }
        :host([scrolled][narrow]) .no-img .header-info ha-button {
          padding-right: 16px;
        }
        :host([scrolled]) .header-info {
          flex-direction: row;
        }
        :host([scrolled]) .header-info ha-button {
          align-self: center;
          margin-top: 0;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        :host([scrolled][narrow]) .no-img .header-info {
          flex-direction: row-reverse;
        }
        :host([scrolled][narrow]) .header-info {
          padding: 20px 24px 10px 24px;
          align-items: center;
        }
        :host([scrolled]) .header-content {
          align-items: flex-end;
          flex-direction: row;
        }
        :host([scrolled]) .header-content .img {
          height: 75px;
          width: 75px;
        }
        :host([scrolled]) .breadcrumb {
          padding-top: 0;
          align-self: center;
        }
        :host([scrolled][narrow]) .header-content .img {
          height: 100px;
          width: 100px;
          padding-bottom: initial;
          margin-bottom: 0;
        }
        :host([scrolled]) ha-fab {
          bottom: 0px;
          right: -24px;
          --mdc-fab-box-shadow: none;
          --mdc-theme-secondary: rgba(var(--rgb-primary-color), 0.5);
        }

        lit-virtualizer {
          display: block;
          height: 100%;
          overflow: auto !important;
        }

        lit-virtualizer.not_shown {
          height: calc(100% - 36px);
        }

        ha-browse-media-tts {
          direction: var(--direction);
        }
      `
    ];
  }
};
__decorateClass$8([
  n$4({ attribute: false })
], HaMediaPlayerBrowse.prototype, "hass", 2);
__decorateClass$8([
  n$4({ attribute: false })
], HaMediaPlayerBrowse.prototype, "entityId", 2);
__decorateClass$8([
  n$4()
], HaMediaPlayerBrowse.prototype, "action", 2);
__decorateClass$8([
  n$4({ attribute: false })
], HaMediaPlayerBrowse.prototype, "preferredLayout", 2);
__decorateClass$8([
  n$4({ type: Number })
], HaMediaPlayerBrowse.prototype, "itemsPerRow", 2);
__decorateClass$8([
  n$4({ type: Boolean })
], HaMediaPlayerBrowse.prototype, "dialog", 2);
__decorateClass$8([
  n$4({ attribute: false })
], HaMediaPlayerBrowse.prototype, "navigateIds", 2);
__decorateClass$8([
  n$4({ attribute: false })
], HaMediaPlayerBrowse.prototype, "accept", 2);
__decorateClass$8([
  n$4({ attribute: false })
], HaMediaPlayerBrowse.prototype, "defaultId", 2);
__decorateClass$8([
  n$4({ attribute: false })
], HaMediaPlayerBrowse.prototype, "defaultType", 2);
__decorateClass$8([
  n$4({ attribute: false })
], HaMediaPlayerBrowse.prototype, "hideContentType", 2);
__decorateClass$8([
  n$4({ attribute: false })
], HaMediaPlayerBrowse.prototype, "contentIdHelper", 2);
__decorateClass$8([
  n$4({ type: Boolean, reflect: true })
], HaMediaPlayerBrowse.prototype, "narrow", 2);
__decorateClass$8([
  n$4({ type: Boolean, reflect: true })
], HaMediaPlayerBrowse.prototype, "scrolled", 2);
__decorateClass$8([
  r$4()
], HaMediaPlayerBrowse.prototype, "_error", 2);
__decorateClass$8([
  r$4()
], HaMediaPlayerBrowse.prototype, "_parentItem", 2);
__decorateClass$8([
  r$4()
], HaMediaPlayerBrowse.prototype, "_currentItem", 2);
__decorateClass$8([
  e$2(".header")
], HaMediaPlayerBrowse.prototype, "_header", 2);
__decorateClass$8([
  e$2(".content")
], HaMediaPlayerBrowse.prototype, "_content", 2);
__decorateClass$8([
  e$2("lit-virtualizer")
], HaMediaPlayerBrowse.prototype, "_virtualizer", 2);
__decorateClass$8([
  t$3({ passive: true })
], HaMediaPlayerBrowse.prototype, "_scroll", 1);
HaMediaPlayerBrowse = __decorateClass$8([
  t$4("sonos-ha-media-player-browse")
], HaMediaPlayerBrowse);
var __defProp$7 = Object.defineProperty;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$7(target, key, result);
  return result;
};
class FavoritesList extends i$4 {
  render() {
    this.config = this.store.config;
    const hideThumbnails = this.config.mediaBrowser?.hideThumbnails ?? false;
    return x`
      <div class="favorites-list ${hideThumbnails ? "no-thumbnails" : ""}">
        ${itemsWithFallbacks(this.items, this.config).map((item) => {
      return x`
            <div class="favorite-item" @click=${() => this.dispatchEvent(customEvent(MEDIA_ITEM_SELECTED, item))}>
              ${!hideThumbnails && item.thumbnail ? x`<div class="thumbnail" style="background-image: url(${item.thumbnail})"></div>` : ""}
              <span class="title">${item.title}</span>
            </div>
          `;
    })}
      </div>
    `;
  }
  static get styles() {
    return [
      listStyle,
      i$7`
        .favorites-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px;
        }

        .favorite-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          min-height: 56px;
        }

        .favorite-item:hover {
          background: var(--primary-color, rgba(0, 0, 0, 0.2));
        }

        .favorite-item:active {
          transform: scale(0.98);
        }

        .thumbnail {
          width: 40px;
          height: 40px;
          min-width: 40px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 6px;
          margin-right: 16px;
        }

        .title {
          font-size: calc(var(--sonos-font-size, 1rem) * 1.2);
          font-weight: 500;
          color: var(--primary-text-color);
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .no-thumbnails .favorite-item {
          padding-left: 24px;
        }
      `
    ];
  }
}
__decorateClass$7([
  n$4({ attribute: false })
], FavoritesList.prototype, "store");
__decorateClass$7([
  n$4({ type: Array })
], FavoritesList.prototype, "items");
customElements.define("sonos-favorites-list", FavoritesList);
var __defProp$6 = Object.defineProperty;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$6(target, key, result);
  return result;
};
class FavoritesIcons extends i$4 {
  render() {
    const mediaBrowserConfig = this.store.config.mediaBrowser ?? {};
    const favoritesConfig = this.store.config.mediaBrowser?.favorites ?? {};
    const items = itemsWithFallbacks(this.items, this.store.config);
    let prevType = "";
    this.sortItemsByFavoriteTypeIfConfigured(items, favoritesConfig);
    const iconTitleColor = favoritesConfig.iconTitleColor;
    const iconTitleBgColor = favoritesConfig.iconTitleBackgroundColor;
    const border = favoritesConfig.iconBorder;
    const padding = favoritesConfig.iconPadding;
    const typeColor = favoritesConfig.typeColor;
    const typeFontSize = favoritesConfig.typeFontSize;
    const typeFontWeight = favoritesConfig.typeFontWeight;
    const typeMarginBottom = favoritesConfig.typeMarginBottom;
    return x`
      <style>
        ha-control-button {
          ${border ? `border: ${border};` : ""}
          ${padding !== void 0 ? `--control-button-padding: ${padding}rem;` : ""}
        }
        .favorite-type {
          ${typeColor ? `color: ${typeColor};` : ""}
          ${typeFontSize ? `font-size: ${typeFontSize};` : ""}
          ${typeFontWeight ? `font-weight: ${typeFontWeight};` : ""}
          ${typeMarginBottom ? `margin-bottom: ${typeMarginBottom};` : ""}
        }
      </style>
      <div class="icons">
        ${items.map((item) => {
      const showFavoriteType = favoritesConfig.sortByType && item.favoriteType !== prevType || E;
      const toRender = x`
            <div class="favorite-type" show=${showFavoriteType}>${item.favoriteType}</div>
            <ha-control-button
              style=${this.buttonStyle(mediaBrowserConfig.itemsPerRow || 4)}
              @click=${() => this.dispatchEvent(customEvent(MEDIA_ITEM_SELECTED, item))}
            >
              ${renderFavoritesItem(
        item,
        !item.thumbnail || !favoritesConfig.hideTitleForThumbnailIcons,
        iconTitleColor,
        iconTitleBgColor
      )}
            </ha-control-button>
          `;
      prevType = item.favoriteType;
      return toRender;
    })}
      </div>
    `;
  }
  sortItemsByFavoriteTypeIfConfigured(items, config) {
    if (config.sortByType) {
      items.sort((a2, b2) => {
        return a2.favoriteType?.localeCompare(b2.favoriteType ?? "") || a2.title.localeCompare(b2.title);
      });
    }
  }
  buttonStyle(favoritesItemsPerRow) {
    const margin = "1%";
    const size = `calc(100% / ${favoritesItemsPerRow} - ${margin} * 2)`;
    return o({
      width: size,
      height: size,
      margin
    });
  }
  static get styles() {
    return [
      mediaItemTitleStyle,
      i$7`
        .icons {
          display: flex;
          flex-wrap: wrap;
        }

        .thumbnail {
          width: 100%;
          padding-bottom: 100%;
          margin: 0 6%;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
        }

        .title {
          font-size: calc(var(--sonos-font-size, 1rem) * 0.8);
          position: absolute;
          width: 100%;
          line-height: 160%;
          bottom: 0;
          background-color: rgba(var(--rgb-card-background-color), 0.733);
        }

        .favorite-type {
          width: 100%;
          display: none;
          margin-top: 0.2rem;
          margin-left: 15px;
          font-weight: bold;
        }

        .favorite-type[show] {
          display: block;
        }
      `
    ];
  }
}
__decorateClass$6([
  n$4({ attribute: false })
], FavoritesIcons.prototype, "store");
__decorateClass$6([
  n$4({ attribute: false })
], FavoritesIcons.prototype, "items");
customElements.define("sonos-favorites-icons", FavoritesIcons);
var __defProp$5 = Object.defineProperty;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$5(target, key, result);
  return result;
};
const START_PATH_KEY = "sonos-card-media-browser-start";
const LAYOUT_KEY = "sonos-card-media-browser-layout";
const FAVORITES_VIEW = "favorites";
let currentPath = null;
let currentPathTitle = "";
let currentView = null;
const _MediaBrowser = class _MediaBrowser2 extends i$4 {
  constructor() {
    super(...arguments);
    this.navigateIds = [];
    this.currentTitle = "";
    this.isCurrentPathStart = false;
    this.layout = "auto";
    this.view = "favorites";
    this.playAllLoading = false;
    this.mediaLoaded = false;
    this.onShortcutClick = () => {
      const shortcut = this.store.config.mediaBrowser?.shortcut;
      if (shortcut) {
        this.view = "browser";
        this.navigateIds = [
          { media_content_id: void 0, media_content_type: void 0 },
          {
            media_content_id: shortcut.media_content_id,
            media_content_type: shortcut.media_content_type,
            title: shortcut.name
          }
        ];
        this.currentTitle = shortcut.name || "";
        this.saveCurrentState();
        this.updateIsCurrentPathStart();
      }
    };
    this.handleMenuAction = (ev) => {
      const layouts = ["auto", "grid", "list"];
      this.setLayout(layouts[ev.detail.index]);
    };
    this.toggleStartPath = () => {
      if (this.isCurrentPathStart) {
        localStorage.removeItem(START_PATH_KEY);
        this.isCurrentPathStart = false;
      } else {
        const value = this.view === "favorites" ? FAVORITES_VIEW : JSON.stringify(this.navigateIds);
        localStorage.setItem(START_PATH_KEY, value);
        this.isCurrentPathStart = true;
      }
    };
    this.goToFavorites = () => {
      this.view = "favorites";
      this.navigateIds = [];
      this.currentTitle = "";
      this.saveCurrentState();
      this.updateIsCurrentPathStart();
    };
    this.goToBrowser = () => {
      this.view = "browser";
      this.navigateIds = [{ media_content_id: void 0, media_content_type: void 0 }];
      this.currentTitle = "";
      this.saveCurrentState();
      this.updateIsCurrentPathStart();
    };
    this.onFavoriteSelected = async (event) => {
      const mediaItem = event.detail;
      await this.playFavorite(mediaItem);
      this.dispatchEvent(customEvent(MEDIA_ITEM_SELECTED, mediaItem));
    };
    this.goBack = () => {
      if (this.navigateIds.length > 1) {
        this.navigateIds = this.navigateIds.slice(0, -1);
        const lastItem = this.navigateIds[this.navigateIds.length - 1];
        this.currentTitle = lastItem?.title || "";
        this.saveCurrentState();
        this.updateIsCurrentPathStart();
      }
    };
    this.onMediaPicked = async (event) => {
      const mediaItem = event.detail.item;
      await this.store.mediaControlService.playMedia(this.store.activePlayer, mediaItem);
      this.dispatchEvent(customEvent(MEDIA_ITEM_SELECTED, mediaItem));
    };
    this.onMediaBrowsed = (event) => {
      this.navigateIds = event.detail.ids;
      const isRoot = this.navigateIds.length === 1 && !this.navigateIds[0].media_content_id;
      const lastItem = this.navigateIds[this.navigateIds.length - 1];
      this.currentTitle = isRoot ? "" : lastItem?.title || event.detail.current?.title || "";
      this.mediaLoaded = !this.mediaLoaded;
      this.saveCurrentState();
      this.updateIsCurrentPathStart();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.initializeView();
    this.loadLayout();
  }
  loadLayout() {
    const savedLayout = localStorage.getItem(LAYOUT_KEY);
    if (savedLayout && ["auto", "grid", "list"].includes(savedLayout)) {
      this.layout = savedLayout;
    }
  }
  setLayout(layout) {
    this.layout = layout;
    localStorage.setItem(LAYOUT_KEY, layout);
  }
  getStartPath() {
    return localStorage.getItem(START_PATH_KEY);
  }
  initializeView() {
    const onlyFavorites = this.store.config.mediaBrowser?.onlyFavorites ?? false;
    if (onlyFavorites) {
      this.view = "favorites";
      this.updateIsCurrentPathStart();
      return;
    }
    if (currentView !== null) {
      this.view = currentView;
      if (this.view === "browser" && currentPath) {
        this.navigateIds = currentPath;
        this.currentTitle = currentPathTitle;
      }
      this.updateIsCurrentPathStart();
      return;
    }
    const startPath = this.getStartPath();
    if (startPath === FAVORITES_VIEW) {
      this.view = "favorites";
    } else if (startPath) {
      try {
        this.navigateIds = JSON.parse(startPath);
        const lastItem = this.navigateIds[this.navigateIds.length - 1];
        this.currentTitle = lastItem?.title || "";
        this.view = "browser";
      } catch {
        this.view = "favorites";
      }
    } else {
      this.view = "favorites";
    }
    this.updateIsCurrentPathStart();
  }
  saveCurrentState() {
    currentView = this.view;
    if (this.view === "browser") {
      currentPath = this.navigateIds;
      currentPathTitle = this.currentTitle;
    }
  }
  updateIsCurrentPathStart() {
    const startPath = this.getStartPath();
    if (this.view === "favorites") {
      this.isCurrentPathStart = startPath === FAVORITES_VIEW || startPath === null;
    } else {
      this.isCurrentPathStart = startPath === JSON.stringify(this.navigateIds);
    }
  }
  render() {
    if (this.view === "favorites") {
      return this.renderFavorites();
    }
    return this.renderBrowser();
  }
  renderFavorites() {
    const mediaBrowserConfig = this.store.config.mediaBrowser ?? {};
    const favoritesConfig = mediaBrowserConfig.favorites ?? {};
    const title = favoritesConfig.title ?? "Favorites";
    const hideHeader = mediaBrowserConfig.hideHeader ?? false;
    const onlyFavorites = mediaBrowserConfig.onlyFavorites ?? false;
    const forceListLayout = mediaBrowserConfig.forceListLayout ?? false;
    const shortcut = mediaBrowserConfig.shortcut;
    return x`
      ${hideHeader ? "" : x`<div class="header">
            <div class="spacer"></div>
            <span class="title">${title}</span>
            ${onlyFavorites ? "" : this.renderShortcutButton(shortcut)}
            ${onlyFavorites ? "" : x`<ha-icon-button
                    .path=${mdiPlayBoxMultiple}
                    @click=${this.goToBrowser}
                    title="Browse Media"
                  ></ha-icon-button>
                  <ha-icon-button
                    class=${this.isCurrentPathStart ? "startpath-active" : ""}
                    .path=${this.isCurrentPathStart ? mdiFolderStar : mdiFolderStarOutline}
                    @click=${this.toggleStartPath}
                    title=${this.isCurrentPathStart ? "Unset start page" : "Set as start page"}
                  ></ha-icon-button>`}
            ${forceListLayout ? "" : this.renderLayoutMenu()}
          </div>`}
      ${this.renderFavoritesContent()}
    `;
  }
  renderShortcutButton(shortcut) {
    if (!shortcut?.media_content_id || !shortcut?.media_content_type || !shortcut?.name) {
      return E;
    }
    const icon = shortcut.icon ?? mdiBookmark;
    const isActive = this.isInShortcutFolder(shortcut);
    return x`
      <ha-icon-button
        class=${isActive ? "shortcut-active" : ""}
        @click=${this.onShortcutClick}
        title=${shortcut.name}
        .path=${icon.startsWith("mdi:") ? void 0 : icon}
      >
        ${icon.startsWith("mdi:") ? x`<ha-icon .icon=${icon}></ha-icon>` : E}
      </ha-icon-button>
    `;
  }
  isInShortcutFolder(shortcut) {
    if (this.view !== "browser" || this.navigateIds.length < 2) {
      return false;
    }
    return this.navigateIds.some((nav) => nav.media_content_id === shortcut.media_content_id);
  }
  renderLayoutMenu() {
    return x`
      <ha-button-menu fixed corner="BOTTOM_END" @action=${this.handleMenuAction}>
        <ha-icon-button slot="trigger" .path=${mdiDotsVertical}></ha-icon-button>
        <ha-list-item graphic="icon">
          Auto
          <ha-svg-icon
            class=${this.layout === "auto" ? "selected" : ""}
            slot="graphic"
            .path=${mdiAlphaABoxOutline}
          ></ha-svg-icon>
        </ha-list-item>
        <ha-list-item graphic="icon">
          Grid
          <ha-svg-icon class=${this.layout === "grid" ? "selected" : ""} slot="graphic" .path=${mdiGrid}></ha-svg-icon>
        </ha-list-item>
        <ha-list-item graphic="icon">
          List
          <ha-svg-icon
            class=${this.layout === "list" ? "selected" : ""}
            slot="graphic"
            .path=${mdiListBoxOutline}
          ></ha-svg-icon>
        </ha-list-item>
      </ha-button-menu>
    `;
  }
  renderFavoritesContent() {
    const mediaBrowserConfig = this.store.config.mediaBrowser ?? {};
    const forceList = mediaBrowserConfig.forceListLayout ?? false;
    const useGrid = !forceList && this.layout !== "list";
    return x`
      ${m(
      this.getFavorites().then((items) => {
        if (items?.length) {
          if (useGrid) {
            return x`
                  <sonos-favorites-icons
                    .items=${items}
                    .store=${this.store}
                    @item-selected=${this.onFavoriteSelected}
                  ></sonos-favorites-icons>
                `;
          } else {
            return x`
                  <sonos-favorites-list
                    .items=${items}
                    .store=${this.store}
                    @item-selected=${this.onFavoriteSelected}
                  ></sonos-favorites-list>
                `;
          }
        } else {
          return x`<div class="no-items">No favorites found</div>`;
        }
      }).catch((e2) => x`<div class="no-items">Failed to fetch favorites. ${e2.message ?? JSON.stringify(e2)}</div>`)
    )}
    `;
  }
  async getFavorites() {
    const favoritesConfig = this.store.config.mediaBrowser?.favorites ?? {};
    const player = this.store.activePlayer;
    let favorites = await this.store.mediaBrowseService.getFavorites(player);
    const topItems = favoritesConfig.topItems ?? [];
    favorites.sort((a2, b2) => this.sortFavorites(a2.title, b2.title, topItems));
    favorites = [
      ...favoritesConfig.customFavorites?.[player.id]?.map(_MediaBrowser2.createFavorite) || [],
      ...favoritesConfig.customFavorites?.all?.map(_MediaBrowser2.createFavorite) || [],
      ...favorites
    ];
    return favoritesConfig.numberToShow ? favorites.slice(0, favoritesConfig.numberToShow) : favorites;
  }
  sortFavorites(a2, b2, topItems) {
    const aIndex = indexOfWithoutSpecialChars(topItems, a2);
    const bIndex = indexOfWithoutSpecialChars(topItems, b2);
    if (aIndex > -1 && bIndex > -1) {
      return aIndex - bIndex;
    }
    let result = bIndex - aIndex;
    if (result === 0) {
      result = a2.localeCompare(b2, "en", { sensitivity: "base" });
    }
    return result;
  }
  static createFavorite(source) {
    return { ...source, can_play: true };
  }
  async playFavorite(mediaItem) {
    const player = this.store.activePlayer;
    if (mediaItem.media_content_type || mediaItem.media_content_id) {
      await this.store.mediaControlService.playMedia(player, mediaItem);
    } else {
      await this.store.mediaControlService.setSource(player, mediaItem.title);
    }
  }
  renderBrowser() {
    const mediaBrowserConfig = this.store.config.mediaBrowser ?? {};
    const activePlayer = this.store.activePlayer;
    const canGoBack = this.navigateIds.length > 1;
    const hideHeader = mediaBrowserConfig.hideHeader ?? false;
    const title = this.currentTitle || "Media Browser";
    const shortcut = mediaBrowserConfig.shortcut;
    return x`
      ${this.playAllLoading ? x`<div class="loading-overlay"><div class="loading-spinner"></div></div>` : E}
      ${hideHeader ? "" : x`<div class="header">
            ${canGoBack ? x`<ha-icon-button .path=${mdiArrowLeft} @click=${this.goBack}></ha-icon-button>` : x`<div class="spacer"></div>`}
            <span class="title">${title}</span>
            ${this.renderPlayAllButton()}${this.renderShortcutButton(shortcut)}
            <ha-icon-button .path=${mdiStar} @click=${this.goToFavorites} title="Favorites"></ha-icon-button>
            <ha-icon-button
              class=${this.isCurrentPathStart ? "startpath-active" : ""}
              .path=${this.isCurrentPathStart ? mdiFolderStar : mdiFolderStarOutline}
              @click=${this.toggleStartPath}
              title=${this.isCurrentPathStart ? "Unset start page" : "Set as start page"}
            ></ha-icon-button>
            ${this.renderLayoutMenu()}
          </div>`}
      <sonos-ha-media-player-browse
        .hass=${this.store.hass}
        .entityId=${activePlayer.id}
        .navigateIds=${this.navigateIds}
        .preferredLayout=${this.layout}
        .itemsPerRow=${mediaBrowserConfig.itemsPerRow}
        .action=${"play"}
        @media-picked=${this.onMediaPicked}
        @media-browsed=${this.onMediaBrowsed}
      ></sonos-ha-media-player-browse>
    `;
  }
  renderPlayAllButton() {
    const playableCount = this.mediaBrowser?.getPlayableChildren().length ?? 0;
    if (playableCount === 0 || this.playAllLoading) {
      return E;
    }
    return x`<ha-icon-button
      .path=${mdiPlay}
      @click=${this.playAll}
      title="Play all (${playableCount} tracks)"
    ></ha-icon-button>`;
  }
  async playAll() {
    const children = this.mediaBrowser?.getPlayableChildren() || [];
    if (children.length === 0) {
      return;
    }
    this.playAllLoading = true;
    try {
      const player = this.store.activePlayer;
      await this.store.hass.callService("media_player", "play_media", {
        entity_id: player.id,
        media_content_id: children[0].media_content_id,
        media_content_type: children[0].media_content_type,
        enqueue: "replace"
      });
      const addPromises = children.slice(1).map(
        (child) => this.store.hass.callService("media_player", "play_media", {
          entity_id: player.id,
          media_content_id: child.media_content_id,
          media_content_type: child.media_content_type,
          enqueue: "add"
        })
      );
      await Promise.all(addPromises);
      this.dispatchEvent(customEvent(MEDIA_ITEM_SELECTED, children[0]));
    } catch (e2) {
      console.error("Failed to play all:", e2);
    } finally {
      this.playAllLoading = false;
    }
  }
  static get styles() {
    return i$7`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
      }
      .header {
        display: flex;
        align-items: center;
        padding: 4px 8px;
        border-bottom: 1px solid var(--divider-color);
        background: var(--card-background-color);
      }
      .title {
        flex: 1;
        font-weight: 500;
        font-size: calc(var(--sonos-font-size, 1rem) * 1.1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      .spacer {
        width: 48px;
      }
      .no-items {
        text-align: center;
        margin-top: 50%;
      }
      ha-svg-icon.selected {
        color: var(--primary-color);
      }
      ha-icon-button.startpath-active {
        color: var(--accent-color);
      }
      ha-icon-button.shortcut-active {
        color: var(--accent-color);
      }
      .loading-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--secondary-text-color);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      sonos-ha-media-player-browse,
      sonos-favorites-icons,
      sonos-favorites-list {
        --mdc-icon-size: 24px;
        --media-browse-item-size: 100px;
        flex: 1;
        min-height: 0;
        overflow: auto;
      }
    `;
  }
};
__decorateClass$5([
  n$4({ attribute: false })
], _MediaBrowser.prototype, "store");
__decorateClass$5([
  r$4()
], _MediaBrowser.prototype, "navigateIds");
__decorateClass$5([
  r$4()
], _MediaBrowser.prototype, "currentTitle");
__decorateClass$5([
  r$4()
], _MediaBrowser.prototype, "isCurrentPathStart");
__decorateClass$5([
  r$4()
], _MediaBrowser.prototype, "layout");
__decorateClass$5([
  r$4()
], _MediaBrowser.prototype, "view");
__decorateClass$5([
  r$4()
], _MediaBrowser.prototype, "playAllLoading");
__decorateClass$5([
  r$4()
], _MediaBrowser.prototype, "mediaLoaded");
__decorateClass$5([
  e$2("sonos-ha-media-player-browse")
], _MediaBrowser.prototype, "mediaBrowser");
let MediaBrowser = _MediaBrowser;
var __defProp$4 = Object.defineProperty;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$4(target, key, result);
  return result;
};
class MediaRow extends i$4 {
  constructor() {
    super(...arguments);
    this.selected = false;
    this.playing = false;
    this.searchHighlight = false;
    this.showCheckbox = false;
    this.checked = false;
  }
  render() {
    const { itemBackgroundColor, itemTextColor, selectedItemBackgroundColor, selectedItemTextColor } = this.store?.config?.queue ?? {};
    const bgColor = this.selected ? selectedItemBackgroundColor : itemBackgroundColor;
    const textColor = this.selected ? selectedItemTextColor : itemTextColor;
    const cssVars = (bgColor ? `--secondary-background-color: ${bgColor};` : "") + (textColor ? `--secondary-text-color: ${textColor};` : "");
    return x`
      <mwc-list-item
        hasMeta
        ?selected=${this.selected}
        ?activated=${this.selected}
        class="button ${this.searchHighlight ? "search-highlight" : ""}"
        style="${cssVars}"
      >
        <div class="row">
          ${this.showCheckbox ? x`<ha-checkbox
                .checked=${this.checked}
                @change=${this.onCheckboxChange}
                @click=${(e2) => e2.stopPropagation()}
              ></ha-checkbox>` : E}
          ${renderFavoritesItem(this.item)}
        </div>
        <div class="meta-content" slot="meta">
          <sonos-playing-bars .show=${this.playing}></sonos-playing-bars>
          <slot></slot>
        </div>
      </mwc-list-item>
    `;
  }
  onCheckboxChange(e2) {
    const checkbox = e2.target;
    this.dispatchEvent(
      new CustomEvent("checkbox-change", {
        detail: { checked: checkbox.checked },
        bubbles: true,
        composed: true
      })
    );
  }
  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    await this.scrollToSelected(_changedProperties);
  }
  async updated(_changedProperties) {
    super.updated(_changedProperties);
    await this.scrollToSelected(_changedProperties);
  }
  async scrollToSelected(changedProperties) {
    await new Promise((r2) => setTimeout(r2, 0));
    const selectedChanged = changedProperties.has("selected") && this.selected;
    const highlightChanged = changedProperties.has("searchHighlight") && this.searchHighlight;
    if (selectedChanged || highlightChanged) {
      this.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  static get styles() {
    return [
      i$7`
        .mdc-deprecated-list-item__text {
          width: 100%;
        }
        .button {
          margin: 0.3rem;
          border-radius: 0.3rem;
          background: var(--secondary-background-color);
          --icon-width: 35px;
          height: 40px;
        }

        .button.search-highlight {
          outline: 2px solid var(--accent-color, #03a9f4);
          outline-offset: -2px;
        }

        .row {
          display: flex;
          flex: 1;
          align-items: center;
        }

        ha-checkbox {
          --mdc-checkbox-unchecked-color: var(--secondary-text-color);
          flex-shrink: 0;
        }

        .thumbnail {
          width: var(--icon-width);
          height: var(--icon-width);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left;
        }

        .title {
          font-size: calc(var(--sonos-font-size, 1rem) * 1.1);
          align-self: center;
          flex: 1;
        }

        .meta-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: 0.5rem;
        }
      `,
      mediaItemTitleStyle
    ];
  }
}
__decorateClass$4([
  n$4({ attribute: false })
], MediaRow.prototype, "store");
__decorateClass$4([
  n$4({ attribute: false })
], MediaRow.prototype, "item");
__decorateClass$4([
  n$4({ type: Boolean })
], MediaRow.prototype, "selected");
__decorateClass$4([
  n$4({ type: Boolean })
], MediaRow.prototype, "playing");
__decorateClass$4([
  n$4({ type: Boolean })
], MediaRow.prototype, "searchHighlight");
__decorateClass$4([
  n$4({ type: Boolean })
], MediaRow.prototype, "showCheckbox");
__decorateClass$4([
  n$4({ type: Boolean })
], MediaRow.prototype, "checked");
customElements.define("sonos-media-row", MediaRow);
const queueSearchStyles = i$7`
  :host {
    display: contents;
  }
  .search-row {
    display: flex;
    align-items: center;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background: var(--card-background-color, #1c1c1c);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    z-index: 10;
  }
  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--divider-color, #ccc);
    border-radius: 4px;
    font-size: var(--sonos-font-size, 1rem);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #000);
  }
  input:focus {
    outline: none;
    border-color: var(--accent-color, #03a9f4);
  }
  input.no-match {
    border-color: var(--error-color, red);
  }
  .match-info {
    padding: 0 0.5rem;
    font-size: calc(var(--sonos-font-size, 1rem) * 0.9);
    color: var(--secondary-text-color, #666);
    white-space: nowrap;
  }
  .search-row ha-icon-button {
    --mdc-icon-button-size: 2rem;
    --mdc-icon-size: 1.2rem;
  }
`;
var __defProp$3 = Object.defineProperty;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$3(target, key, result);
  return result;
};
class QueueSearch extends i$4 {
  constructor() {
    super(...arguments);
    this.items = [];
    this.deleteMode = false;
    this.expanded = false;
    this.searchText = "";
    this.matchIndices = [];
    this.currentMatchIndex = 0;
    this.lastHighlightedIndex = -1;
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("items") && this.searchText) {
      this.findMatches(false);
    }
  }
  render() {
    const hasNoMatch = this.searchText.length > 0 && this.matchIndices.length === 0;
    return x`
      <ha-icon-button .path=${mdiMagnify} @click=${this.toggleSearch} ?selected=${this.expanded}></ha-icon-button>
      ${this.expanded ? this.renderSearchBar(hasNoMatch) : E}
    `;
  }
  renderSearchBar(hasNoMatch) {
    return x`
      <div class="search-row">
        <input
          type="text"
          placeholder="Search queue..."
          class=${hasNoMatch ? "no-match" : ""}
          .value=${this.searchText}
          @input=${this.onSearchInput}
          @keydown=${this.onKeyDown}
        />
        ${this.matchIndices.length > 0 ? this.renderMatchInfo() : E}
        <ha-icon-button .path=${mdiClose} @click=${this.clearSearch}></ha-icon-button>
      </div>
    `;
  }
  renderMatchInfo() {
    return x`
      <span class="match-info">${this.currentMatchIndex + 1}/${this.matchIndices.length}</span>
      <ha-icon-button .path=${mdiChevronUp} @click=${this.previousMatch}></ha-icon-button>
      <ha-icon-button .path=${mdiChevronDown} @click=${this.nextMatch}></ha-icon-button>
      ${this.deleteMode ? x`<ha-icon-button
            .path=${mdiCheckAll}
            @click=${this.selectAllMatches}
            title="Select all matches"
          ></ha-icon-button>` : E}
    `;
  }
  toggleSearch() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.updateComplete.then(() => this.input?.focus());
    } else {
      this.clearSearch();
    }
    this.dispatchEvent(new CustomEvent("queue-search-expanded", { detail: { expanded: this.expanded } }));
  }
  onSearchInput(e2) {
    const newText = e2.target.value;
    const wasExtendingSearch = newText.startsWith(this.searchText) && this.searchText.length > 0;
    this.searchText = newText;
    this.findMatches(wasExtendingSearch);
  }
  findMatches(continueFromCurrent) {
    if (!this.searchText) {
      this.matchIndices = [];
      this.lastHighlightedIndex = -1;
      this.dispatchMatchEvent(-1);
      return;
    }
    const searchLower = this.searchText.toLowerCase();
    this.matchIndices = this.items.map((item, i5) => item.title?.toLowerCase().includes(searchLower) ? i5 : -1).filter((i5) => i5 !== -1);
    if (this.matchIndices.length === 0) {
      this.lastHighlightedIndex = -1;
      this.dispatchMatchEvent(-1);
      return;
    }
    if (continueFromCurrent && this.lastHighlightedIndex >= 0) {
      const nextMatchAfterLast = this.matchIndices.find((i5) => i5 >= this.lastHighlightedIndex);
      this.currentMatchIndex = nextMatchAfterLast !== void 0 ? this.matchIndices.indexOf(nextMatchAfterLast) : 0;
    } else {
      this.currentMatchIndex = 0;
    }
    this.highlightCurrentMatch();
  }
  highlightCurrentMatch() {
    if (this.matchIndices.length === 0) {
      return;
    }
    const matchIndex = this.matchIndices[this.currentMatchIndex];
    this.lastHighlightedIndex = matchIndex;
    this.dispatchMatchEvent(matchIndex);
  }
  dispatchMatchEvent(index) {
    this.dispatchEvent(
      new CustomEvent("queue-search-match", {
        detail: {
          index,
          currentMatch: this.currentMatchIndex + 1,
          totalMatches: this.matchIndices.length,
          matchIndices: this.matchIndices
        }
      })
    );
  }
  nextMatch() {
    if (this.matchIndices.length === 0) {
      return;
    }
    this.currentMatchIndex = (this.currentMatchIndex + 1) % this.matchIndices.length;
    this.highlightCurrentMatch();
  }
  previousMatch() {
    if (this.matchIndices.length === 0) {
      return;
    }
    this.currentMatchIndex = (this.currentMatchIndex - 1 + this.matchIndices.length) % this.matchIndices.length;
    this.highlightCurrentMatch();
  }
  onKeyDown(e2) {
    if (e2.key === "Enter") {
      e2.preventDefault();
      this.nextMatch();
    } else if (e2.key === "Escape") {
      this.clearSearch();
    }
  }
  clearSearch() {
    this.searchText = "";
    this.matchIndices = [];
    this.currentMatchIndex = 0;
    this.lastHighlightedIndex = -1;
    this.expanded = false;
    this.dispatchMatchEvent(-1);
  }
  selectAllMatches() {
    if (this.matchIndices.length > 0) {
      this.dispatchEvent(new CustomEvent("queue-search-select-all", { detail: { indices: this.matchIndices } }));
    }
  }
  static get styles() {
    return queueSearchStyles;
  }
}
__decorateClass$3([
  n$4({ attribute: false })
], QueueSearch.prototype, "items");
__decorateClass$3([
  n$4({ type: Boolean })
], QueueSearch.prototype, "deleteMode");
__decorateClass$3([
  r$4()
], QueueSearch.prototype, "expanded");
__decorateClass$3([
  r$4()
], QueueSearch.prototype, "searchText");
__decorateClass$3([
  r$4()
], QueueSearch.prototype, "matchIndices");
__decorateClass$3([
  r$4()
], QueueSearch.prototype, "currentMatchIndex");
__decorateClass$3([
  r$4()
], QueueSearch.prototype, "lastHighlightedIndex");
__decorateClass$3([
  e$2("input")
], QueueSearch.prototype, "input");
customElements.define("sonos-queue-search", QueueSearch);
const queueStyles = i$7`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .queue-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    outline: none;
    position: relative;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    position: relative;
  }
  .header-icons {
    white-space: nowrap;
  }
  .header-icons > * {
    display: inline-block;
  }
  .title {
    text-align: center;
    font-size: calc(var(--sonos-font-size, 1rem) * 1.2);
    font-weight: bold;
    padding: 0.5rem;
  }
  .list {
    overflow: auto;
    position: relative;
    flex: 1;
    --mdc-icon-button-size: 1.5em;
    --mdc-icon-size: 1em;
  }
  .list.search-active {
    padding-top: 3rem;
  }
  ha-icon-button[selected] {
    color: var(--accent-color);
  }
  .loading {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }
  .delete-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .delete-overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    text-align: center;
  }
  .delete-progress-text {
    font-size: 1.2rem;
    color: var(--primary-text-color, #fff);
  }
  .accent {
    --control-button-background-color: var(--accent-color);
  }
  .delete-all-btn {
    display: inline-flex;
    position: relative;
    cursor: pointer;
  }
  .delete-all-btn .all-label {
    position: absolute;
    bottom: -16px;
    left: 63%;
    font-size: 2em;
    font-weight: bold;
    color: var(--secondary-text-color);
    pointer-events: none;
    -webkit-text-stroke: 0.5px black;
    text-shadow: 0 0 2px black;
  }
`;
var __defProp$2 = Object.defineProperty;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$2(target, key, result);
  return result;
};
class Queue extends i$4 {
  constructor() {
    super(...arguments);
    this.deleteMode = false;
    this.searchExpanded = false;
    this.searchHighlightIndex = -1;
    this.searchMatchIndices = [];
    this.selectedIndices = /* @__PURE__ */ new Set();
    this.queueItems = [];
    this.loading = true;
    this.deletingProgress = null;
    this.cancelDelete = false;
    this.lastQueueHash = "";
    this.onMediaItemClick = async (index) => {
      if (!this.deleteMode) {
        await this.store.hassService.playQueue(this.activePlayer, index);
        this.dispatchEvent(customEvent(MEDIA_ITEM_SELECTED));
      }
    };
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("store")) {
      this.fetchQueue();
    }
  }
  async fetchQueue() {
    try {
      const queue = await this.store.hassService.getQueue(this.store.activePlayer);
      const queueHash = queue.map((item) => item.title).join("|");
      if (queueHash !== this.lastQueueHash) {
        this.lastQueueHash = queueHash;
        this.queueItems = queue;
      }
    } catch (e2) {
      console.warn("Error getting queue", e2);
    }
    if (this.loading) {
      this.loading = false;
    }
  }
  render() {
    this.activePlayer = this.store.activePlayer;
    const queuePosition = this.activePlayer.attributes.queue_position;
    const selected = queuePosition ? queuePosition - 1 : -1;
    return x`
      <div class="queue-container" @keydown=${this.onKeyDown} tabindex="-1">
        ${this.deletingProgress ? x`<div class="delete-overlay">
              <div class="delete-overlay-content">
                <ha-spinner></ha-spinner>
                <div class="delete-progress-text">
                  Deleting ${this.deletingProgress.current} of ${this.deletingProgress.total}
                </div>
                <ha-control-button-group>
                  <ha-control-button class="accent" @click=${this.cancelDeleteOperation}>
                    ${this.store.hass.localize("ui.common.cancel") || "Cancel"}
                  </ha-control-button>
                </ha-control-button-group>
              </div>
            </div>` : E}
        ${this.renderQueue(selected)}
      </div>
    `;
  }
  renderQueue(selected) {
    const hasSelection = this.selectedIndices.size > 0;
    return x`
      <div class="header">
        <div class="title">
          ${this.store.config.queue?.title ?? (this.activePlayer.attributes.media_playlist ?? `Play Queue`) + (this.activePlayer.attributes.media_channel ? " (not active)" : "")}
        </div>
        <div class="header-icons">
          <sonos-queue-search
            .items=${this.queueItems}
            .deleteMode=${this.deleteMode}
            @queue-search-match=${this.onSearchMatch}
            @queue-search-select-all=${this.onSelectAllMatches}
            @queue-search-expanded=${this.onSearchExpanded}
          ></sonos-queue-search>
          ${this.deleteMode ? x`
                <ha-icon-button
                  .path=${mdiSelectInverse}
                  @click=${this.invertSelection}
                  title="Invert selection"
                ></ha-icon-button>
                ${hasSelection ? x`<ha-icon-button
                      .path=${mdiCloseBoxMultipleOutline}
                      @click=${this.deleteSelected}
                      title="Delete selected"
                    ></ha-icon-button>` : E}
                <div class="delete-all-btn" @click=${this.clearQueue} title="Delete all">
                  <ha-icon-button .path=${mdiTrashCanOutline}></ha-icon-button>
                  <span class="all-label">*</span>
                </div>
              ` : x`
                <sonos-shuffle .store=${this.store}></sonos-shuffle>
                <sonos-repeat .store=${this.store}></sonos-repeat>
              `}
          <ha-icon-button
            .path=${mdiPlaylistRemove}
            @click=${this.toggleDeleteMode}
            ?selected=${this.deleteMode}
            title="Delete mode"
            ?disabled=${this.deletingProgress !== null}
          ></ha-icon-button>
        </div>
      </div>
      <div class="list ${this.searchExpanded ? "search-active" : ""}">
        ${this.loading ? x`<div class="loading"><ha-spinner></ha-spinner></div>` : x`<mwc-list multi>
              ${this.queueItems.map((item, index) => {
      const isSelected = selected >= 0 && selected === index;
      const isPlaying = isSelected && this.activePlayer.isPlaying();
      const isSearchHighlight = this.searchHighlightIndex === index;
      const isChecked = this.selectedIndices.has(index);
      return x`
                  <sonos-media-row
                    @click=${() => this.onMediaItemClick(index)}
                    .item=${item}
                    .selected=${isSelected}
                    .playing=${isPlaying}
                    .searchHighlight=${isSearchHighlight}
                    .showCheckbox=${this.deleteMode}
                    .checked=${isChecked}
                    @checkbox-change=${(e2) => this.onCheckboxChange(index, e2.detail.checked)}
                    .store=${this.store}
                  ></sonos-media-row>
                `;
    })}
            </mwc-list>`}
      </div>
    `;
  }
  onSearchMatch(e2) {
    this.searchHighlightIndex = e2.detail.index;
    this.searchMatchIndices = e2.detail.matchIndices ?? [];
  }
  onSearchExpanded(e2) {
    this.searchExpanded = e2.detail.expanded;
  }
  onSelectAllMatches() {
    this.selectedIndices = /* @__PURE__ */ new Set([...this.selectedIndices, ...this.searchMatchIndices]);
  }
  invertSelection() {
    const newSelection = /* @__PURE__ */ new Set();
    for (let i5 = 0; i5 < this.queueItems.length; i5++) {
      if (!this.selectedIndices.has(i5)) {
        newSelection.add(i5);
      }
    }
    this.selectedIndices = newSelection;
  }
  onCheckboxChange(index, checked) {
    if (checked) {
      this.selectedIndices.add(index);
    } else {
      this.selectedIndices.delete(index);
    }
    this.selectedIndices = new Set(this.selectedIndices);
  }
  onKeyDown(e2) {
    if (e2.key === "Escape" && this.deleteMode) {
      this.exitDeleteMode();
    }
  }
  toggleDeleteMode() {
    if (this.deleteMode) {
      this.exitDeleteMode();
    } else {
      this.deleteMode = true;
      this.selectedIndices = /* @__PURE__ */ new Set();
    }
  }
  exitDeleteMode() {
    this.deleteMode = false;
    this.selectedIndices = /* @__PURE__ */ new Set();
  }
  cancelDeleteOperation() {
    this.cancelDelete = true;
  }
  async clearQueue() {
    await this.store.hassService.clearQueue(this.activePlayer);
    this.exitDeleteMode();
    await this.fetchQueue();
  }
  async deleteSelected() {
    if (this.selectedIndices.size === this.queueItems.length) {
      await this.clearQueue();
      return;
    }
    const indices = [...this.selectedIndices].sort((a2, b2) => a2 - b2);
    const total = indices.length;
    this.deletingProgress = { current: 0, total };
    this.cancelDelete = false;
    try {
      let deleted = 0;
      let remaining = [...indices];
      while (remaining.length > 0 && !this.cancelDelete) {
        const batch = this.getParallelBatch(remaining);
        const results = await Promise.allSettled(
          batch.map((index) => this.store.hassService.removeFromQueue(this.activePlayer, index))
        );
        const succeededIndices = batch.filter((_2, i5) => results[i5].status === "fulfilled");
        deleted += succeededIndices.length;
        this.deletingProgress = { current: deleted, total };
        if (succeededIndices.length === 0) {
          console.error("All deletions in batch failed, aborting");
          break;
        }
        remaining = this.recalculateIndices(remaining, succeededIndices);
      }
    } finally {
      this.deletingProgress = null;
      this.cancelDelete = false;
      this.exitDeleteMode();
      await this.fetchQueue();
    }
  }
  getParallelBatch(sortedIndices) {
    const MAX_PARALLEL = 50;
    const chunk = [sortedIndices[0]];
    for (let i5 = 1; i5 < sortedIndices.length; i5++) {
      if (sortedIndices[i5] === sortedIndices[i5 - 1] + 1) {
        chunk.push(sortedIndices[i5]);
      } else {
        break;
      }
    }
    const halfSize = Math.min(MAX_PARALLEL, Math.max(1, Math.floor(chunk.length / 2)));
    return chunk.slice(0, halfSize);
  }
  recalculateIndices(remaining, deleted) {
    const deletedSet = new Set(deleted);
    const maxDeleted = Math.max(...deleted);
    const deleteCount = deleted.length;
    return remaining.filter((i5) => !deletedSet.has(i5)).map((i5) => i5 > maxDeleted ? i5 - deleteCount : i5);
  }
  static get styles() {
    return [listStyle, queueStyles];
  }
}
__decorateClass$2([
  n$4()
], Queue.prototype, "store");
__decorateClass$2([
  r$4()
], Queue.prototype, "activePlayer");
__decorateClass$2([
  r$4()
], Queue.prototype, "deleteMode");
__decorateClass$2([
  r$4()
], Queue.prototype, "searchExpanded");
__decorateClass$2([
  r$4()
], Queue.prototype, "searchHighlightIndex");
__decorateClass$2([
  r$4()
], Queue.prototype, "searchMatchIndices");
__decorateClass$2([
  r$4()
], Queue.prototype, "selectedIndices");
__decorateClass$2([
  r$4()
], Queue.prototype, "queueItems");
__decorateClass$2([
  r$4()
], Queue.prototype, "loading");
__decorateClass$2([
  r$4()
], Queue.prototype, "deletingProgress");
__decorateClass$2([
  r$4()
], Queue.prototype, "cancelDelete");
var __defProp$1 = Object.defineProperty;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp$1(target, key, result);
  return result;
};
class SleepTimer extends i$4 {
  render() {
    const hassService = this.store.hassService;
    if (this.player.attributes.platform !== "sonos") {
      return x``;
    }
    return x`
      <div id="sleepTimer">
        <ha-icon-button id="sleepTimerAlarm" .path=${mdiAlarm}></ha-icon-button>
        <label for="sleepTimer">Sleep Timer (s)</label>
        <input type="number" id="sleepTimerInput" min="0" max="7200" value="300" />
        <ha-icon-button
          id="sleepTimerSubmit"
          .path=${mdiCheckCircle}
          @click=${() => hassService.setSleepTimer(this.player, this.sleepTimer.valueAsNumber)}
        ></ha-icon-button>
        <ha-icon-button
          id="sleepTimerCancel"
          .path=${mdiCloseCircle}
          @click=${() => hassService.cancelSleepTimer(this.player)}
        ></ha-icon-button>
      </div>
    `;
  }
  static get styles() {
    return i$7`
      #sleepTimer {
        display: flex;
        color: var(--primary-text-color);
        gap: 0.5em;
      }

      #sleepTimerAlarm {
        color: var(--paper-item-icon-color);
      }

      #sleepTimerSubmit {
        color: var(--accent-color);
      }

      #sleepTimer > label {
        align-content: center;
        flex: 2;
      }
    `;
  }
}
__decorateClass$1([
  n$4({ attribute: false })
], SleepTimer.prototype, "store");
__decorateClass$1([
  n$4({ attribute: false })
], SleepTimer.prototype, "player");
__decorateClass$1([
  e$2("#sleepTimerInput")
], SleepTimer.prototype, "sleepTimer");
customElements.define("sonos-sleep-timer", SleepTimer);
var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class Volumes extends i$4 {
  constructor() {
    super(...arguments);
    this.showSwitches = {};
  }
  render() {
    this.config = this.store.config;
    this.activePlayer = this.store.activePlayer;
    this.hassService = this.store.hassService;
    this.mediaControlService = this.store.mediaControlService;
    const members = this.activePlayer.members;
    return x`
      ${n$1(members.length > 1, () => this.volumeWithName(this.activePlayer))}
      ${members.map((member) => this.volumeWithName(member, false))}
    `;
  }
  volumeWithName(player, updateMembers = true) {
    const volumesConfig = this.config.volumes ?? {};
    const playerConfig = this.config.player ?? {};
    const name = updateMembers ? volumesConfig.labelForAllSlider ?? "All" : player.name;
    const volDown = async () => await this.mediaControlService.volumeDown(player, updateMembers);
    const volUp = async () => await this.mediaControlService.volumeUp(player, updateMembers);
    const noUpDown = !!playerConfig.showVolumeUpAndDownButtons && E;
    const hideSwitches = updateMembers || !this.showSwitches[player.id];
    return x` <div class="row">
      <div class="volume-name">
        <div class="volume-name-text">${name}</div>
      </div>
      <div class="slider-row">
        <ha-icon-button
          .disabled=${player.ignoreVolume}
          hide=${noUpDown}
          @click=${volDown}
          .path=${mdiVolumeMinus}
        ></ha-icon-button>
        <sonos-volume .store=${this.store} .player=${player} .updateMembers=${updateMembers}></sonos-volume>
        <ha-icon-button
          .disabled=${player.ignoreVolume}
          hide=${noUpDown}
          @click=${volUp}
          .path=${mdiVolumePlus}
        ></ha-icon-button>
        <ha-icon-button
          hide=${updateMembers || volumesConfig.hideCogwheel || E}
          @click=${() => this.toggleShowSwitches(player)}
          .path=${mdiCog}
          show-switches=${this.showSwitches[player.id] || E}
        ></ha-icon-button>
      </div>
      <div class="switches" hide=${hideSwitches || E}>
        <sonos-source .store=${this.store}> </sonos-source>
        ${m(this.getAdditionalControls(hideSwitches, player))}
        <sonos-sleep-timer .store=${this.store} .player=${player}></sonos-sleep-timer>
      </div>
    </div>`;
  }
  toggleShowSwitches(player) {
    this.showSwitches[player.id] = !this.showSwitches[player.id];
    this.requestUpdate();
  }
  async getAdditionalControls(hide, player) {
    if (hide) {
      return [];
    }
    const relatedEntities = await this.hassService.getRelatedEntities(player, "switch", "number", "sensor");
    return relatedEntities.map((relatedEntity) => {
      relatedEntity.attributes.friendly_name = relatedEntity.attributes.friendly_name?.replaceAll(player.name, "")?.trim() ?? "";
      const fontSize = this.config.volumes?.additionalControlsFontSize ?? 0.75;
      return x`
        <div style="--ha-font-size-m: ${fontSize}rem">
          <state-card-content .stateObj=${relatedEntity} .hass=${this.store.hass}></state-card-content>
        </div>
      `;
    });
  }
  static get styles() {
    return i$7`
      .row {
        display: flex;
        flex-direction: column;
        padding-top: 0.3rem;
        padding-right: 1rem;
        padding-bottom: 0.2rem;
      }

      .row:not(:first-child) {
        border-top: solid var(--secondary-background-color);
      }

      .row:first-child {
        padding-top: 1rem;
      }

      .switches {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
      }

      .volume-name {
        flex: 1;
        overflow: hidden;
        flex-direction: column;
        text-align: center;
      }

      .volume-name-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: calc(var(--sonos-font-size, 1rem) * 1.1);
        font-weight: bold;
        min-height: 1rem;
      }

      .slider-row {
        display: flex;
      }

      sonos-volume {
        flex: 4;
      }

      *[show-switches] {
        color: var(--accent-color);
      }

      *[hide] {
        display: none;
      }
    `;
  }
}
__decorateClass([
  n$4({ attribute: false })
], Volumes.prototype, "store");
__decorateClass([
  r$4()
], Volumes.prototype, "showSwitches");
window.customCards.push({
  type: "sonos-card",
  name: "Sonos",
  description: "Media player for your Sonos speakers",
  preview: true
});
customElements.define("sonos-card", Card);
customElements.define("sonos-grouping", Grouping);
customElements.define("sonos-groups", Groups);
customElements.define("sonos-media-browser", MediaBrowser);
customElements.define("sonos-player", Player);
customElements.define("sonos-volumes", Volumes);
customElements.define("sonos-queue", Queue);
class SizeCache {
  constructor(config) {
    this._map = /* @__PURE__ */ new Map();
    this._roundAverageSize = false;
    this.totalSize = 0;
    if (config?.roundAverageSize === true) {
      this._roundAverageSize = true;
    }
  }
  set(index, value) {
    const prev = this._map.get(index) || 0;
    this._map.set(index, value);
    this.totalSize += value - prev;
  }
  get averageSize() {
    if (this._map.size > 0) {
      const average = this.totalSize / this._map.size;
      return this._roundAverageSize ? Math.round(average) : average;
    }
    return 0;
  }
  getSize(index) {
    return this._map.get(index);
  }
  clear() {
    this._map.clear();
    this.totalSize = 0;
  }
}
const flow = (config) => Object.assign({
  type: FlowLayout
}, config);
function leadingMargin(direction) {
  return direction === "horizontal" ? "marginLeft" : "marginTop";
}
function trailingMargin(direction) {
  return direction === "horizontal" ? "marginRight" : "marginBottom";
}
function offset(direction) {
  return direction === "horizontal" ? "xOffset" : "yOffset";
}
function collapseMargins(a2, b2) {
  const m2 = [a2, b2].sort();
  return m2[1] <= 0 ? Math.min(...m2) : m2[0] >= 0 ? Math.max(...m2) : m2[0] + m2[1];
}
class MetricsCache {
  constructor() {
    this._childSizeCache = new SizeCache();
    this._marginSizeCache = new SizeCache();
    this._metricsCache = /* @__PURE__ */ new Map();
  }
  update(metrics, direction) {
    const marginsToUpdate = /* @__PURE__ */ new Set();
    Object.keys(metrics).forEach((key) => {
      const k2 = Number(key);
      this._metricsCache.set(k2, metrics[k2]);
      this._childSizeCache.set(k2, metrics[k2][dim1(direction)]);
      marginsToUpdate.add(k2);
      marginsToUpdate.add(k2 + 1);
    });
    for (const k2 of marginsToUpdate) {
      const a2 = this._metricsCache.get(k2)?.[leadingMargin(direction)] || 0;
      const b2 = this._metricsCache.get(k2 - 1)?.[trailingMargin(direction)] || 0;
      this._marginSizeCache.set(k2, collapseMargins(a2, b2));
    }
  }
  get averageChildSize() {
    return this._childSizeCache.averageSize;
  }
  get totalChildSize() {
    return this._childSizeCache.totalSize;
  }
  get averageMarginSize() {
    return this._marginSizeCache.averageSize;
  }
  get totalMarginSize() {
    return this._marginSizeCache.totalSize;
  }
  getLeadingMarginValue(index, direction) {
    return this._metricsCache.get(index)?.[leadingMargin(direction)] || 0;
  }
  getChildSize(index) {
    return this._childSizeCache.getSize(index);
  }
  getMarginSize(index) {
    return this._marginSizeCache.getSize(index);
  }
  clear() {
    this._childSizeCache.clear();
    this._marginSizeCache.clear();
    this._metricsCache.clear();
  }
}
class FlowLayout extends BaseLayout {
  constructor() {
    super(...arguments);
    this._itemSize = { width: 100, height: 100 };
    this._physicalItems = /* @__PURE__ */ new Map();
    this._newPhysicalItems = /* @__PURE__ */ new Map();
    this._metricsCache = new MetricsCache();
    this._anchorIdx = null;
    this._anchorPos = null;
    this._stable = true;
    this._measureChildren = true;
    this._estimate = true;
  }
  // protected _defaultConfig: BaseLayoutConfig = Object.assign({}, super._defaultConfig, {
  // })
  // constructor(config: Layout1dConfig) {
  //   super(config);
  // }
  get measureChildren() {
    return this._measureChildren;
  }
  /**
   * Determine the average size of all children represented in the sizes
   * argument.
   */
  updateItemSizes(sizes) {
    this._metricsCache.update(sizes, this.direction);
    this._scheduleReflow();
  }
  /**
   * Set the average item size based on the total length and number of children
   * in range.
   */
  // _updateItemSize() {
  //   // Keep integer values.
  //   this._itemSize[this._sizeDim] = this._metricsCache.averageChildSize;
  // }
  _getPhysicalItem(idx) {
    return this._newPhysicalItems.get(idx) ?? this._physicalItems.get(idx);
  }
  _getSize(idx) {
    const item = this._getPhysicalItem(idx);
    return item && this._metricsCache.getChildSize(idx);
  }
  _getAverageSize() {
    return this._metricsCache.averageChildSize || this._itemSize[this._sizeDim];
  }
  _estimatePosition(idx) {
    const c3 = this._metricsCache;
    if (this._first === -1 || this._last === -1) {
      return c3.averageMarginSize + idx * (c3.averageMarginSize + this._getAverageSize());
    } else {
      if (idx < this._first) {
        const delta = this._first - idx;
        const refItem = this._getPhysicalItem(this._first);
        return refItem.pos - (c3.getMarginSize(this._first - 1) || c3.averageMarginSize) - (delta * c3.averageChildSize + (delta - 1) * c3.averageMarginSize);
      } else {
        const delta = idx - this._last;
        const refItem = this._getPhysicalItem(this._last);
        return refItem.pos + (c3.getChildSize(this._last) || c3.averageChildSize) + (c3.getMarginSize(this._last) || c3.averageMarginSize) + delta * (c3.averageChildSize + c3.averageMarginSize);
      }
    }
  }
  /**
   * Returns the position in the scrolling direction of the item at idx.
   * Estimates it if the item at idx is not in the DOM.
   */
  _getPosition(idx) {
    const item = this._getPhysicalItem(idx);
    const { averageMarginSize } = this._metricsCache;
    return idx === 0 ? this._metricsCache.getMarginSize(0) ?? averageMarginSize : item ? item.pos : this._estimatePosition(idx);
  }
  _calculateAnchor(lower, upper) {
    if (lower <= 0) {
      return 0;
    }
    if (upper > this._scrollSize - this._viewDim1) {
      return this.items.length - 1;
    }
    return Math.max(0, Math.min(this.items.length - 1, Math.floor((lower + upper) / 2 / this._delta)));
  }
  _getAnchor(lower, upper) {
    if (this._physicalItems.size === 0) {
      return this._calculateAnchor(lower, upper);
    }
    if (this._first < 0) {
      return this._calculateAnchor(lower, upper);
    }
    if (this._last < 0) {
      return this._calculateAnchor(lower, upper);
    }
    const firstItem = this._getPhysicalItem(this._first), lastItem = this._getPhysicalItem(this._last), firstMin = firstItem.pos, lastMin = lastItem.pos, lastMax = lastMin + this._metricsCache.getChildSize(this._last);
    if (lastMax < lower) {
      return this._calculateAnchor(lower, upper);
    }
    if (firstMin > upper) {
      return this._calculateAnchor(lower, upper);
    }
    let candidateIdx = this._firstVisible - 1;
    let cMax = -Infinity;
    while (cMax < lower) {
      const candidate = this._getPhysicalItem(++candidateIdx);
      cMax = candidate.pos + this._metricsCache.getChildSize(candidateIdx);
    }
    return candidateIdx;
  }
  /**
   * Updates _first and _last based on items that should be in the current
   * viewed range.
   */
  _getActiveItems() {
    if (this._viewDim1 === 0 || this.items.length === 0) {
      this._clearItems();
    } else {
      this._getItems();
    }
  }
  /**
   * Sets the range to empty.
   */
  _clearItems() {
    this._first = -1;
    this._last = -1;
    this._physicalMin = 0;
    this._physicalMax = 0;
    const items = this._newPhysicalItems;
    this._newPhysicalItems = this._physicalItems;
    this._newPhysicalItems.clear();
    this._physicalItems = items;
    this._stable = true;
  }
  /*
   * Updates _first and _last based on items that should be in the given range.
   */
  _getItems() {
    const items = this._newPhysicalItems;
    this._stable = true;
    let lower, upper;
    if (this.pin !== null) {
      const { index } = this.pin;
      this._anchorIdx = index;
      this._anchorPos = this._getPosition(index);
    }
    lower = this._scrollPosition - this._overhang;
    upper = this._scrollPosition + this._viewDim1 + this._overhang;
    if (upper < 0 || lower > this._scrollSize) {
      this._clearItems();
      return;
    }
    if (this._anchorIdx === null || this._anchorPos === null) {
      this._anchorIdx = this._getAnchor(lower, upper);
      this._anchorPos = this._getPosition(this._anchorIdx);
    }
    let anchorSize = this._getSize(this._anchorIdx);
    if (anchorSize === void 0) {
      this._stable = false;
      anchorSize = this._getAverageSize();
    }
    const anchorLeadingMargin = this._metricsCache.getMarginSize(this._anchorIdx) ?? this._metricsCache.averageMarginSize;
    const anchorTrailingMargin = this._metricsCache.getMarginSize(this._anchorIdx + 1) ?? this._metricsCache.averageMarginSize;
    if (this._anchorIdx === 0) {
      this._anchorPos = anchorLeadingMargin;
    }
    if (this._anchorIdx === this.items.length - 1) {
      this._anchorPos = this._scrollSize - anchorTrailingMargin - anchorSize;
    }
    let anchorErr = 0;
    if (this._anchorPos + anchorSize + anchorTrailingMargin < lower) {
      anchorErr = lower - (this._anchorPos + anchorSize + anchorTrailingMargin);
    }
    if (this._anchorPos - anchorLeadingMargin > upper) {
      anchorErr = upper - (this._anchorPos - anchorLeadingMargin);
    }
    if (anchorErr) {
      this._scrollPosition -= anchorErr;
      lower -= anchorErr;
      upper -= anchorErr;
      this._scrollError += anchorErr;
    }
    items.set(this._anchorIdx, { pos: this._anchorPos, size: anchorSize });
    this._first = this._last = this._anchorIdx;
    this._physicalMin = this._anchorPos - anchorLeadingMargin;
    this._physicalMax = this._anchorPos + anchorSize + anchorTrailingMargin;
    while (this._physicalMin > lower && this._first > 0) {
      let size = this._getSize(--this._first);
      if (size === void 0) {
        this._stable = false;
        size = this._getAverageSize();
      }
      let margin = this._metricsCache.getMarginSize(this._first);
      if (margin === void 0) {
        this._stable = false;
        margin = this._metricsCache.averageMarginSize;
      }
      this._physicalMin -= size;
      const pos = this._physicalMin;
      items.set(this._first, { pos, size });
      this._physicalMin -= margin;
      if (this._stable === false && this._estimate === false) {
        break;
      }
    }
    while (this._physicalMax < upper && this._last < this.items.length - 1) {
      let size = this._getSize(++this._last);
      if (size === void 0) {
        this._stable = false;
        size = this._getAverageSize();
      }
      let margin = this._metricsCache.getMarginSize(this._last);
      if (margin === void 0) {
        this._stable = false;
        margin = this._metricsCache.averageMarginSize;
      }
      const pos = this._physicalMax;
      items.set(this._last, { pos, size });
      this._physicalMax += size + margin;
      if (!this._stable && !this._estimate) {
        break;
      }
    }
    const extentErr = this._calculateError();
    if (extentErr) {
      this._physicalMin -= extentErr;
      this._physicalMax -= extentErr;
      this._anchorPos -= extentErr;
      this._scrollPosition -= extentErr;
      items.forEach((item) => item.pos -= extentErr);
      this._scrollError += extentErr;
    }
    if (this._stable) {
      this._newPhysicalItems = this._physicalItems;
      this._newPhysicalItems.clear();
      this._physicalItems = items;
    }
  }
  _calculateError() {
    if (this._first === 0) {
      return this._physicalMin;
    } else if (this._physicalMin <= 0) {
      return this._physicalMin - this._first * this._delta;
    } else if (this._last === this.items.length - 1) {
      return this._physicalMax - this._scrollSize;
    } else if (this._physicalMax >= this._scrollSize) {
      return this._physicalMax - this._scrollSize + (this.items.length - 1 - this._last) * this._delta;
    }
    return 0;
  }
  _reflow() {
    const { _first, _last } = this;
    super._reflow();
    if (this._first === -1 && this._last == -1 || this._first === _first && this._last === _last) {
      this._resetReflowState();
    }
  }
  _resetReflowState() {
    this._anchorIdx = null;
    this._anchorPos = null;
    this._stable = true;
  }
  _updateScrollSize() {
    const { averageMarginSize } = this._metricsCache;
    this._scrollSize = Math.max(1, this.items.length * (averageMarginSize + this._getAverageSize()) + averageMarginSize);
  }
  /**
   * Returns the average size (precise or estimated) of an item in the scrolling direction,
   * including any surrounding space.
   */
  get _delta() {
    const { averageMarginSize } = this._metricsCache;
    return this._getAverageSize() + averageMarginSize;
  }
  /**
   * Returns the top and left positioning of the item at idx.
   */
  _getItemPosition(idx) {
    return {
      [this._positionDim]: this._getPosition(idx),
      [this._secondaryPositionDim]: 0,
      [offset(this.direction)]: -(this._metricsCache.getLeadingMarginValue(idx, this.direction) ?? this._metricsCache.averageMarginSize)
    };
  }
  /**
   * Returns the height and width of the item at idx.
   */
  _getItemSize(idx) {
    return {
      [this._sizeDim]: this._getSize(idx) || this._getAverageSize(),
      [this._secondarySizeDim]: this._itemSize[this._secondarySizeDim]
    };
  }
  _viewDim2Changed() {
    this._metricsCache.clear();
    this._scheduleReflow();
  }
}
const flow$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FlowLayout,
  flow
}, Symbol.toStringTag, { value: "Module" }));
