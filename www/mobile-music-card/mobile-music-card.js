/*! mobile-music-card v1.0.0 | built from cards/mobile-music-card */
function t(t,e,i,s){var r,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(o=(a<3?r(o):a>3?r(e,i,o):r(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:n,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,m=globalThis,u=m.trustedTypes,_=u?u.emptyScript:"",g=m.reactiveElementPolyfillSupport,v=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!n(t,e),y={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);r?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const a=r.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const a=this.constructor;if(!1===s&&(r=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,g?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,w=t=>t,A=x.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+E,C=`<${P}>`,M=document,L=()=>M.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,O="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,V=/>/g,N=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,H=/"/g,D=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),G=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),F=new WeakMap,W=M.createTreeWalker(M,129);function q(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,s=[];let r,a=2===e?"<svg>":3===e?"<math>":"",o=U;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===U?"!--"===l[1]?o=j:void 0!==l[1]?o=V:void 0!==l[2]?(D.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=N):void 0!==l[3]&&(o=N):o===N?">"===l[0]?(o=r??U,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?N:'"'===l[3]?H:R):o===H||o===R?o=N:o===j||o===V?o=U:(o=N,r=void 0);const d=o===N&&t[e+1].startsWith("/>")?" ":"";a+=o===U?i+C:c>=0?(s.push(n),i.slice(0,c)+S+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[q(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const o=t.length-1,n=this.parts,[l,c]=Q(t,e);if(this.el=K.createElement(l,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[a++],i=s.getAttribute(t).split(E),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:X}),s.removeAttribute(t)}else t.startsWith(E)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],L()),W.nextNode(),n.push({type:2,index:++r});s.append(t[e],L())}}}else if(8===s.nodeType)if(s.data===P)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)n.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===G)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const a=T(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);W.currentNode=s;let r=W.nextNode(),a=0,o=0,n=i[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new Z(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new st(r,this,t)),this._$AV.push(e),n=i[++o]}a!==n?.index&&(r=W.nextNode(),a++)}return W.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),T(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new K(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Z(this.O(L()),this.O(L()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(void 0===r)t=J(this,t,e,0),a=!T(t)||t!==this._$AH&&t!==G,a&&(this._$AH=t);else{const s=t;let o,n;for(t=r[0],o=0;o<r.length-1;o++)n=J(this,s[i+o],e,o),n===G&&(n=this._$AH[o]),a||=!T(n)||n!==this._$AH[o],n===B?t=B:t!==B&&(t+=(n??"")+r[o+1]),this._$AH[o]=n}a&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends X{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??B)===G)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(K,Z),(x.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;let ot=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Z(e.insertBefore(L(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};ot._$litElement$=!0,ot.finalized=!0,at.litElementHydrateSupport?.({LitElement:ot});const nt=at.litElementPolyfillSupport;nt?.({LitElement:ot}),(at.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:b},ct=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function dt(t){return ht({...t,state:!0,attribute:!1})}const pt=1,mt=t=>(...e)=>({_$litDirective$:t,values:e});let ut=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const _t=mt(class extends ut{constructor(t){if(super(t),t.type!==pt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return G}}),gt="important",vt=" !"+gt,ft=mt(class extends ut{constructor(t){if(super(t),t.type!==pt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(vt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?gt:""):i[t]=s}}return G}}),bt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)})`
  :host {
    --mm-bg: var(--primary-background-color, #41454b);
    --mm-sheet: var(--secondary-background-color, #3a3e44);
    --mm-s2: var(--background-color-2, #5b616a);
    --mm-s3: var(--background-color-3, #676d77);
    --mm-text: var(--primary-text-color, #ffffff);
    --mm-dim: var(--secondary-text-color, #c3c7cc);
    --mm-on-accent: var(--text-primary-color, #16202a);
    --mm-slate: var(--slate-color, #8eb1bf);
    --mm-slate-bright: var(--slate-bright, #b6d2dc);
    --mm-sage: var(--sage-color, #8ba680);
    --mm-slate-18: var(--slate-alpha-18, rgba(142, 177, 191, 0.18));
    --mm-sage-18: var(--sage-alpha-18, rgba(139, 166, 128, 0.18));
    --mm-radius: 15px;
    --mm-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    --mm-art-max: 320px;
    display: block;
    min-width: 0;
    max-width: 100%;
    color: var(--mm-text);
    font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, inherit));
    -webkit-tap-highlight-color: transparent;
  }
  * { box-sizing: border-box; }
  button {
    font: inherit;
    color: inherit;
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  ha-icon { display: flex; }
  .root {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }

  /* ── Player surface: art, title + speaker chip, transport, volume ── */
  .player {
    margin: 2px 5px;
    padding: 14px;
    border-radius: var(--mm-radius);
    background: var(--mm-s2);
    box-shadow: var(--mm-shadow);
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
  }
  .art {
    width: 100%;
    max-width: var(--mm-art-max);
    margin: 0 auto;
    aspect-ratio: 1 / 1;
    border-radius: 11px;
    background: var(--mm-s3);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mm-dim);
    --mdc-icon-size: 72px;
  }
  .art img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .title-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: 12px;
    align-items: center;
  }
  .track {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .sub {
    margin-top: 2px;
    font-size: 14px;
    color: var(--mm-dim);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chip {
    height: 36px;
    border-radius: 18px;
    padding: 0 10px 0 10px;
    background: var(--mm-s3);
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    max-width: 52vw;
  }
  .chip .ic { color: var(--mm-slate-bright); --mdc-icon-size: 18px; }
  .chip .chev { color: var(--mm-dim); --mdc-icon-size: 18px; }
  .chip .lbl { overflow: hidden; text-overflow: ellipsis; }

  .progress {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: var(--mm-dim);
    font-variant-numeric: tabular-nums;
    margin-top: -4px;
  }
  .progress .bar {
    height: 4px;
    border-radius: 999px;
    background: var(--mm-s3);
    overflow: hidden;
  }
  .progress .bar > span {
    display: block;
    height: 100%;
    background: var(--mm-slate);
  }

  .transport {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 22px;
  }
  .t-btn {
    width: 60px;
    height: 60px;
    border-radius: 999px;
    background: var(--mm-s3);
    display: flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 30px;
  }
  .t-btn.play {
    width: 68px;
    height: 68px;
    background: var(--mm-slate);
    color: var(--mm-on-accent);
    --mdc-icon-size: 36px;
  }
  .t-btn:active { transform: scale(0.96); }

  .vol-row {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr) 44px;
    gap: 10px;
    align-items: center;
  }
  .sq-btn {
    width: 44px;
    height: 44px;
    border-radius: var(--mm-radius);
    background: var(--mm-s3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mm-slate-bright);
    --mdc-icon-size: 22px;
  }
  .sq-btn.on { background: var(--mm-slate); color: var(--mm-on-accent); }

  /* ── Slider: slate fill over a track; the label is drawn twice, light on
     the track and dark on the fill, so it reads at any level. ── */
  .slider {
    position: relative;
    height: 44px;
    border-radius: var(--mm-radius);
    background: var(--mm-s3);
    overflow: hidden;
    touch-action: none;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }
  .slider.flat { background: var(--mm-s2); }
  .slider .fill {
    position: absolute;
    inset: 0;
    background: var(--mm-slate);
  }
  .slider .lbl {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    font-size: 16px;
    pointer-events: none;
    --mdc-icon-size: 22px;
  }
  .slider .lbl .name { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .slider .lbl .val { font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; }
  .slider .lbl.dark { color: var(--mm-on-accent); }
  .slider.muted .fill { opacity: 0.35; }
  .slider:focus-visible { outline: 2px solid var(--mm-slate-bright); outline-offset: 2px; }

  /* ── 2-up tiles ── */
  .tiles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin: 0 5px;
  }
  .tile {
    padding: 14px;
    border-radius: var(--mm-radius);
    background: var(--mm-s2);
    box-shadow: var(--mm-shadow);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    text-align: left;
    min-width: 0;
  }
  .tile .ic {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 20px;
  }
  .tile .ic.slate { background: var(--mm-slate-18); color: var(--mm-slate-bright); }
  .tile .ic.sage { background: var(--mm-sage-18); color: var(--mm-sage); }
  .tile .big { font-size: 22px; font-weight: 700; }
  .tile .small { font-size: 14px; color: var(--mm-dim); max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* ── Section header (matches the mobile_separator module) ── */
  .sep {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 10px 0 12px;
    min-height: 40px;
  }
  .sep .ic { --mdc-icon-size: 22px; }
  .sep .name { font-size: 20px; font-weight: 700; white-space: nowrap; }
  .sep.small .name { font-size: 16px; }
  .sep.small .ic { --mdc-icon-size: 20px; }
  .sep .line { flex: 1; height: 1px; background: var(--mm-text); opacity: 0.1; }
  .sep .act {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 20px;
  }
  .sep .act.spin ha-icon { animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Favorites strip ── */
  .strip {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 2px 5px 6px;
    scrollbar-width: none;
    overscroll-behavior-x: contain;
  }
  .strip::-webkit-scrollbar { display: none; }
  .fav {
    position: relative;
    flex: 0 0 104px;
    width: 104px;
    height: 104px;
    border-radius: var(--mm-radius);
    overflow: hidden;
    box-shadow: var(--mm-shadow);
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    text-align: left;
    background: linear-gradient(135deg, #00b3a4 0%, #f4d35e 100%);
  }
  .fav.radio { background: linear-gradient(135deg, #c8102e 0%, #1a1c1f 100%); }
  .fav.album { background: linear-gradient(135deg, #2a3540 0%, #6a4ec8 100%); }
  .fav img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .fav::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0) 60%);
  }
  .fav .n, .fav .s { position: relative; z-index: 1; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8); max-width: 100%; }
  .fav .n {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .fav .s { font-size: 12px; opacity: 0.85; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .empty {
    margin: 0 5px;
    padding: 16px;
    border-radius: var(--mm-radius);
    background: var(--mm-s2);
    color: var(--mm-dim);
    font-size: 14px;
    text-align: center;
  }
  .empty.error { color: var(--error-color, #db4437); }

  /* ── Sheets: a native <dialog> in the browser top layer, so no parent
     card's overflow or transform can clip it. Drops from the top like the
     hamburger nav sheet. ── */
  dialog {
    border: 0;
    padding: 0;
    margin: 0 auto;
    inset: 0 0 auto 0;
    width: min(100vw, 600px);
    max-width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-height: 100dvh;
    border-radius: var(--mm-radius) var(--mm-radius) 0 0;
    background: var(--mm-sheet);
    color: var(--mm-text);
    box-shadow: 0 16px 44px rgba(0, 0, 0, 0.55);
    overflow: hidden;
  }
  dialog[open] { display: flex; flex-direction: column; animation: drop 0.25s ease-out; }
  dialog::backdrop { background: rgba(0, 0, 0, 0.45); }
  @keyframes drop {
    from { transform: translateY(-28px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .sheet-hdr {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 12px 8px 16px;
    padding-top: max(12px, env(safe-area-inset-top));
    flex-shrink: 0;
    --mdc-icon-size: 24px;
  }
  .sheet-hdr .name { flex: 1; font-size: 18px; font-weight: 700; }
  .close {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: var(--mm-s2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sheet-body {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0 5px calc(24px + env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  /* Children keep their height; the body scrolls instead of squashing them. */
  .sheet-body > * { flex-shrink: 0; }

  /* Rows used in every sheet */
  .row {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr) 40px;
    align-items: center;
    column-gap: 10px;
    min-height: 56px;
    padding: 8px 12px;
    margin: 0 5px;
    border-radius: var(--mm-radius);
    background: var(--mm-s2);
    box-shadow: var(--mm-shadow);
    text-align: left;
    width: calc(100% - 10px);
  }
  .row .ic {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    --mdc-icon-size: 22px;
  }
  .row .ic.tile { background: var(--mm-s3); color: var(--mm-slate-bright); }
  .row .ic img { width: 100%; height: 100%; object-fit: cover; }
  .row .txt { min-width: 0; }
  .row .n { font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .row .l { font-size: 14px; color: var(--mm-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .row .l.bold { font-weight: 700; }
  .row .l.playing { color: var(--mm-slate-bright); }
  .row .act {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: var(--mm-s3);
    color: var(--mm-slate-bright);
    display: flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 22px;
  }
  .row.on { background: var(--mm-slate); color: var(--mm-on-accent); }
  .row.on .l { color: var(--mm-on-accent); }
  .row.on .act { background: transparent; color: var(--mm-on-accent); --mdc-icon-size: 24px; }
  .row.pending { animation: pulse 1s ease-in-out infinite; }
  @keyframes pulse { 50% { opacity: 0.6; } }
  .row[disabled] { opacity: 0.5; cursor: default; }
  .note { font-size: 14px; color: var(--mm-dim); padding: 2px 17px 6px; }

  .vol-item { margin: 0 5px; }

  /* Library filters */
  .search {
    margin: 2px 5px 4px;
    height: 44px;
    border-radius: var(--mm-radius);
    background: var(--mm-s2);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    color: var(--mm-dim);
    --mdc-icon-size: 20px;
  }
  .search input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--mm-text);
    font: inherit;
    font-size: 16px;
  }
  .pills {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding: 2px 5px 4px;
    scrollbar-width: none;
    flex-shrink: 0;
  }
  .pills::-webkit-scrollbar { display: none; }
  .pill {
    flex-shrink: 0;
    height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    background: var(--mm-s2);
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
  }
  .pill.on { background: var(--mm-slate); color: var(--mm-on-accent); }
  .svc-head {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--mm-dim);
    padding: 10px 17px 2px;
  }

  /* Error toast */
  .toast {
    position: sticky;
    top: 4px;
    z-index: 2;
    margin: 0 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: var(--mm-radius);
    background: var(--error-color, #db4437);
    color: #fff;
    font-size: 14px;
  }
  .toast .msg { flex: 1; min-width: 0; }
  .toast button { font-size: 20px; line-height: 1; opacity: 0.8; }

  button:focus-visible { outline: 2px solid var(--mm-slate-bright); outline-offset: 2px; }
`,yt=(t,e,i)=>t.callService("media_player","volume_set",{entity_id:e,volume_level:Math.max(0,Math.min(1,Math.round(i)/100))}),$t=(t,e,i={})=>t.callService("script",e.replace(/^script\./,""),i),xt=(t,e,i,s)=>t.callWS({type:"media_player/browse_media",entity_id:e,...i?{media_content_id:i}:{},...s?{media_content_type:s}:{}}),wt="1.0.0",At="mobile-music-card",kt={controller:"sensor.music_controlled_player",selector:"input_select.music_player",favorites:"sensor.music_favorites",recent:"sensor.music_recent",play_script:"script.music_play_item",group_script:"script.music_toggle_group",refresh_script:"script.music_refresh_library",max_volume:40,art_max:320},St={spotify:"Spotify",tidal:"Tidal",qobuz:"Qobuz",deezer:"Deezer",apple_music:"Apple Music",ytmusic:"YouTube Music",soundcloud:"SoundCloud",tunein:"TuneIn",radiobrowser:"Radio",plex:"Plex",jellyfin:"Jellyfin",subsonic:"Subsonic",filesystem_local:"Local Library",filesystem_smb:"Local Library",builtin:"Local Library",library:"Library"},Et=t=>St[t]??t.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()),Pt=[["playlist","playlist"],["radio","station"],["album","album"],["artist","artist"]],Ct=["All","Favorites","Playlists","Stations","Albums","Artists"],Mt={Playlists:"playlist",Stations:"station",Albums:"album",Artists:"artist"},Lt={playlist:"Playlist",station:"Station",album:"Album",artist:"Artist"},Tt={playlist:"mdi:playlist-music",station:"mdi:radio",album:"mdi:album",artist:"mdi:account-music"},zt=t=>{(!isFinite(t)||t<0)&&(t=0);return`${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,"0")}`},Ot=t=>t.replace(/^media_player\./,"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()),Ut=t=>(t??"").replace(/%7C/gi,"|").replace(/%3B/gi,";");let jt=class extends ot{constructor(){super(...arguments),this._rooms=[],this._roomIds=[],this._watch=[],this._sheet=null,this._pushedHistory=!1,this._optPlaying=null,this._optMuted=null,this._pendingGroup={},this._pendingSelect=null,this._dragVol={},this._loadingName=null,this._skipping=!1,this._refreshing=!1,this._timers={},this._toast=null,this._lib=null,this._libLoading=!1,this._libError=null,this._libTab="All",this._libSvc="All",this._libQ="",this._libFetchedAt=0,this._now=Date.now(),this._onPopState=()=>{!this._sheet||history.state&&history.state.mmSheet||(this._pushedHistory=!1,this._sheet=null)}}setConfig(t){if(!t?.rooms||!Array.isArray(t.rooms)||0===t.rooms.length)throw new Error("mobile-music-card: 'rooms' must list the Sonos media_player entities.");this._config={...t},this._rooms=t.rooms.map(t=>{const e="string"==typeof t?{entity:t}:t;if(!e.entity)throw new Error("mobile-music-card: every room needs an 'entity'.");return{entity:e.entity,name:e.name??Ot(e.entity),icon:e.icon??"mdi:speaker"}}),this._roomIds=this._rooms.map(t=>t.entity),this._watch=[this._c("controller"),this._c("selector"),this._c("favorites"),this._c("recent"),...this._roomIds],this.style.setProperty("--mm-art-max",`${this._c("art_max")}px`)}getCardSize(){return 12}connectedCallback(){super.connectedCallback(),window.addEventListener("popstate",this._onPopState),this._tick=setInterval(()=>{if("visible"!==document.visibilityState||this._sheet)return;const t=this.hass?.states[this._ctrl()];"playing"===t?.state&&this._meta(t).media_duration&&(this._now=Date.now())},1e3)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._onPopState),this._tick&&clearInterval(this._tick);for(const t of Object.values(this._timers))clearTimeout(t);this._timers={},this._sheet&&this._closeSheet()}shouldUpdate(t){if(t.size>1||!t.has("hass")||!this._config)return!0;const e=t.get("hass");return!e||this._watch.some(t=>e.states[t]!==this.hass.states[t])}willUpdate(t){if(!t.has("hass")||!this._config||!this.hass)return;const e=this._ctrl(),i=this.hass.states[e];if(null!==this._optPlaying&&"playing"===i?.state===this._optPlaying&&this._clearLatch("play"),null!==this._optMuted&&!!i?.attributes.is_volume_muted===this._optMuted&&this._clearLatch("mute"),null!==this._pendingSelect){const t=this.hass.states[this._c("selector")]?.state,e=this._rooms.find(t=>t.name===this._pendingSelect),i=!e||this.hass.states[this._c("controller")]?.state===e.entity;t===this._pendingSelect&&i&&this._clearLatch("select")}if(Object.keys(this._pendingGroup).length){const t=this._members(e);for(const[e,i]of Object.entries(this._pendingGroup))t.includes(e)===i&&this._clearLatch(`group:${e}`)}const s=i?this._meta(i).media_title:void 0;(null!==this._loadingName||this._skipping)&&s&&s!==this._prevTitle&&(this._clearLatch("loading"),this._clearLatch("skip"));for(const t of Object.keys(this._dragVol)){if(!this._timers[`vol:${t}`])continue;const i="group"===t?this._groupVol(this._members(e)):this._vol(t);Math.abs(i-this._dragVol[t])<=1&&this._clearLatch(`vol:${t}`)}if(this._refreshing&&t.get("hass")){const e=t.get("hass").states[this._c("favorites")];e&&e!==this.hass.states[this._c("favorites")]&&this._clearLatch("refresh")}}updated(){const t=this._dialog;if(t)if(this._sheet&&!t.open)try{t.showModal()}catch{t.setAttribute("open","")}else!this._sheet&&t.open&&t.close()}_c(t){return this._config?.[t]??kt[t]}_maxVol(){return Math.max(1,Math.min(100,Math.round(this._c("max_volume"))))}_ctrl(){if(this._pendingSelect&&"Auto"!==this._pendingSelect){const t=this._rooms.find(t=>t.name===this._pendingSelect);if(t)return t.entity}const t=this.hass?.states[this._c("controller")]?.state;return t&&t.startsWith("media_player.")?t:this._roomIds[0]}_isAuto(){return"Auto"===(this._pendingSelect??this.hass.states[this._c("selector")]?.state)}_members(t){const e=this.hass.states[t]?.attributes.group_members,i=(e??[]).filter(t=>this._roomIds.includes(t));return i.length?i:[t]}_room(t){return this._rooms.find(e=>e.entity===t)}_label(t){return this._room(t)?.name??this.hass.states[t]?.attributes.friendly_name??Ot(t)}_vol(t){return Math.round(100*(this.hass.states[t]?.attributes.volume_level??0))}_groupVol(t){return t.length<=1?this._vol(t[0]):Math.round(t.reduce((t,e)=>t+this._vol(e),0)/t.length)}_meta(t){const e=t.attributes;if(e.media_title||e.entity_picture)return e;for(const i of e.group_members??[]){if(i===t.entity_id)continue;const e=this.hass.states[i]?.attributes;if(e&&(e.media_title||e.entity_picture))return e}return e}_stationArt(t){const e=this._config.station_art??[];if(!t||!e.length)return;const i=t.toLowerCase();return e.find(t=>t.match&&i.includes(t.match.toLowerCase()))}_rows(t){const e=this.hass.states[t]?.attributes.items;return e?String(e).split(";").filter(t=>t.trim()).map(t=>{const e=t.split("|");return{name:e[0]??"",sub:e[1]??"",type:e[2]??"playlist",uri:Ut(e[3]),expandable:"1"===e[4],image:Ut(e[5])}}).filter(t=>t.name&&t.uri):[]}_latch(t,e,i){this._timers[t]&&clearTimeout(this._timers[t]),this._timers[t]=setTimeout(()=>{delete this._timers[t],i()},e)}_clearLatch(t){if(this._timers[t]&&(clearTimeout(this._timers[t]),delete this._timers[t]),"play"===t)this._optPlaying=null;else if("mute"===t)this._optMuted=null;else if("select"===t)this._pendingSelect=null;else if("loading"===t)this._loadingName=null;else if("skip"===t)this._skipping=!1;else if("refresh"===t)this._refreshing=!1;else if("toast"===t)this._toast=null;else if(t.startsWith("group:")){const e=t.slice(6);if(e in this._pendingGroup){const t={...this._pendingGroup};delete t[e],this._pendingGroup=t}}else if(t.startsWith("vol:")){const e=t.slice(4);if(e in this._dragVol){const t={...this._dragVol};delete t[e],this._dragVol=t}}}_svc(t,e){return t.catch(t=>{const i=t instanceof Error?t.message:t?.message??String(t);this._toast=`${e}: ${i}`,this._latch("toast",5e3,()=>{this._toast=null})})}_instant(t){return e=>{const i=e.currentTarget;if("pointerdown"===e.type){const s=e;if("mouse"===s.pointerType&&0!==s.button)return;i._mmPressed=!0,setTimeout(()=>{i._mmPressed=!1},400),t()}else i._mmPressed?i._mmPressed=!1:t()}}_openSheet(t){const e=!!this._sheet;if(this._sheet=t,"library"===t&&this._maybeFetchLib(),!e)try{history.pushState({...history.state??{},mmSheet:t},"",`${location.pathname}${location.search}#music-${t}`),this._pushedHistory=!0}catch{}}_closeSheet(){this._sheet&&(this._sheet=null,this._pushedHistory&&(this._pushedHistory=!1,history.back()))}_onPlayPause(t){const e=this._ctrl();var i,s;this._optPlaying=!t,this._latch("play",5e3,()=>{this._optPlaying=null}),this._svc((i=this.hass,s=e,i.callService("media_player","media_play_pause",{entity_id:s})),`Couldn't ${t?"pause":"play"} ${this._label(e)}`)}_onSkip(t){const e=this._ctrl(),i=this.hass.states[e];var s,r;this._prevTitle=i?this._meta(i).media_title:void 0,this._skipping=!0,this._latch("skip",5e3,()=>{this._skipping=!1}),this._svc("next"===t?(s=this.hass,r=e,s.callService("media_player","media_next_track",{entity_id:r})):((t,e)=>t.callService("media_player","media_previous_track",{entity_id:e}))(this.hass,e),"Couldn't skip "+("next"===t?"forward":"back"))}_onMute(t){const e=this._members(this._ctrl());this._optMuted=!t,this._latch("mute",5e3,()=>{this._optMuted=null}),this._svc(((t,e,i)=>t.callService("media_player","volume_mute",{entity_id:e,is_volume_muted:i}))(this.hass,e,!t),"Couldn't "+(t?"unmute":"mute"))}_select(t){for(const t of Object.keys(this._pendingGroup))this._clearLatch(`group:${t}`);this._pendingSelect=t,this._latch("select",5e3,()=>{this._pendingSelect=null}),this._svc(((t,e,i)=>t.callService("input_select","select_option",{entity_id:e,option:i}))(this.hass,this._c("selector"),t),`Couldn't switch to ${t}`)}_toggleGroup(t){const e=this._ctrl();if(t===e)return;const i=!(this._pendingGroup[t]??this._members(e).includes(t));this._pendingGroup={...this._pendingGroup,[t]:i},this._latch(`group:${t}`,6e3,()=>this._clearLatch(`group:${t}`)),this._svc($t(this.hass,this._c("group_script"),{entity:t}),`Couldn't ${i?"add":"remove"} ${this._label(t)}`)}_play(t,e,i){const s=this.hass.states[this._ctrl()];this._prevTitle=s?this._meta(s).media_title:void 0,this._loadingName=i,this._latch("loading",8e3,()=>{this._loadingName=null}),this._svc($t(this.hass,this._c("play_script"),{media_content_id:t,media_content_type:e,source:"library",expandable:!1}),`Couldn't play "${i}"`),this._closeSheet()}_refresh(){this._refreshing=!0,this._latch("refresh",15e3,()=>{this._refreshing=!1}),this._svc($t(this.hass,this._c("refresh_script")),"Couldn't refresh the library"),"library"===this._sheet?this._maybeFetchLib(!0):this._libFetchedAt=0}_setGroupVolume(t){const e=this._members(this._ctrl()),i=this._maxVol();if(e.length<=1)return void this._svc(yt(this.hass,e[0],t),"Couldn't set the volume");const s=t-this._groupVol(e);if(0!==s)for(const t of e){const e=this._vol(t),r=s>0?Math.max(e,Math.min(i,e+s)):Math.max(0,e+s);r!==e&&this._svc(yt(this.hass,t,r),`Couldn't set ${this._label(t)} volume`)}}_holdVol(t,e){this._dragVol={...this._dragVol,[t]:e},this._latch(`vol:${t}`,2500,()=>this._clearLatch(`vol:${t}`))}_slide(t,e,i,s){const r=t.currentTarget;this._timers[`vol:${e}`]&&(clearTimeout(this._timers[`vol:${e}`]),delete this._timers[`vol:${e}`]);let a=0,o=null,n=null;const l=t=>{a=Date.now(),o=null,n&&(clearTimeout(n),n=null),s(t)},c=t=>{const s=r.getBoundingClientRect(),c=Math.round(Math.max(0,Math.min(1,(t.clientX-s.left)/s.width))*i);this._dragVol={...this._dragVol,[e]:c};const h=Date.now()-a;h>=120?l(c):(o=c,n||(n=setTimeout(()=>{n=null,null!==o&&l(o)},120-h)))};try{r.setPointerCapture(t.pointerId)}catch{}c(t);const h=t=>c(t),d=()=>{r.removeEventListener("pointermove",h),r.removeEventListener("pointerup",d),r.removeEventListener("pointercancel",d);try{r.releasePointerCapture(t.pointerId)}catch{}n&&(clearTimeout(n),n=null),null!==o&&l(o),this._holdVol(e,this._dragVol[e])};r.addEventListener("pointermove",h),r.addEventListener("pointerup",d),r.addEventListener("pointercancel",d)}_sliderKey(t,e,i,s,r){const a=Math.max(1,Math.round(s/20));let o=null;"ArrowRight"===t.key||"ArrowUp"===t.key?o=Math.min(s,i+a):"ArrowLeft"===t.key||"ArrowDown"===t.key?o=Math.max(0,i-a):"Home"===t.key?o=0:"End"===t.key&&(o=s),null!==o&&(t.preventDefault(),o!==i&&(this._holdVol(e,o),r(o)))}_maybeFetchLib(t=!1){if(this._libLoading)return;const e=Date.now()-this._libFetchedAt<3e5;!t&&e&&(this._lib||this._libError)||this._fetchLib()}async _fetchLib(){this._libLoading=!0,this._libError=null;try{let t;try{t=await this._fetchLibViaGetLibrary()}catch{t=await this._fetchLibViaBrowse()}const e={playlist:0,station:1,album:2,artist:3};t.sort((t,i)=>t.service.localeCompare(i.service)||e[t.category]-e[i.category]||t.title.localeCompare(i.title)),this._lib=t,"All"===this._libSvc||t.some(t=>t.service===this._libSvc)||(this._libSvc="All")}catch(t){this._libError=`Couldn't load the Music Assistant library: ${t instanceof Error?t.message:t}`}finally{this._libFetchedAt=Date.now(),this._libLoading=!1}}async _fetchLibViaGetLibrary(){const t=await(async t=>{const e=await t.callWS({type:"config_entries/get",domain:"music_assistant"}),i=e?.[0];if(!i)throw new Error("Music Assistant integration not found");return i.entry_id})(this.hass),e=[],i=await Promise.all(Pt.map(([e])=>(async(t,e,i,s,r=500)=>{const a=await t.callWS({type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:e,media_type:i,limit:r},return_response:!0}),o=a?.response??a;if(Array.isArray(o))return o;if(Array.isArray(o?.items))return o.items;for(const t of Object.values(o??{}))if(Array.isArray(t))return t;return[]})(this.hass,t,e).catch(()=>[])));if(i.forEach((t,i)=>{for(const s of t){const t=this._toLibItem(s,Pt[i][1],Pt[i][0]);t&&e.push(t)}}),!e.length&&i.every(t=>0===t.length))throw new Error("empty library response");return e}_toLibItem(t,e,i){if("string"!=typeof t.uri||"string"!=typeof t.name)return null;const s=(r=t.uri,r?.match(/^([a-z0-9_]+):\/\//i)?.[1]?.toLowerCase());var r;const a=(s&&"library"!==s?s:void 0)??(t.provider&&"library"!==t.provider?t.provider:void 0)??t.provider_mappings?.find(t=>t.provider_domain)?.provider_domain??"library",o="string"==typeof t.image?t.image:"string"==typeof t.image?.path?t.image.path:void 0;return{title:t.name,uri:t.uri,media_type:t.media_type??i,image:o&&/^https?:\/\//i.test(o)?o:void 0,category:e,service:Et(a),favorite:!!t.favorite}}_maPlayer(t){const e=this.hass.states[t]?.attributes.friendly_name,i=this.hass.entities??{};if(e)for(const[s,r]of Object.entries(i))if("music_assistant"===r.platform&&s.startsWith("media_player.")&&s!==t&&this.hass.states[s]?.attributes.friendly_name===e)return s;return this.hass.states[this._c("favorites")]?.attributes.player||void 0}async _fetchLibViaBrowse(){const t=this._maPlayer(this._ctrl());if(!t)throw new Error("no Music Assistant player found");const e=await xt(this.hass,t),i=[[/playlist/i,"playlist"],[/radio|station/i,"station"],[/album/i,"album"],[/artist/i,"artist"]],s=[];for(const r of e.children??[]){const e=i.find(([t])=>t.test(r.title)||t.test(r.media_content_id??""));if(!e||!r.can_expand)continue;const a=await xt(this.hass,t,r.media_content_id,r.media_content_type);for(const t of a.children??[])t.can_play&&t.media_content_id&&s.push({title:t.title,uri:t.media_content_id,media_type:t.media_content_type??e[1],image:t.thumbnail,category:e[1],service:"Library",favorite:!1})}return s}render(){if(!this._config||!this.hass)return B;const t=this._ctrl(),e=this.hass.states[t],i=this._members(t);return I`
      <div class="root">
        ${this._toast?I`
          <div class="toast" role="alert">
            <span class="msg">${this._toast}</span>
            <button aria-label="Dismiss" @click=${()=>this._clearLatch("toast")}>×</button>
          </div>`:B}
        ${this._renderPlayer(t,e,i)}
        ${this._renderTiles(i)}
        ${this._renderFavorites()}
      </div>
      <dialog aria-label=${this._sheetTitle()}
        @cancel=${t=>{t.preventDefault(),this._closeSheet()}}
        @click=${t=>{t.target===t.currentTarget&&this._closeSheet()}}>
        ${this._sheet?this._renderSheet(t,i):B}
      </dialog>
    `}_renderPlayer(t,e,i){if(!e)return I`<div class="player"><div class="empty">${t} is unavailable.</div></div>`;const s=e.attributes,r=this._meta(e),a="playing"===e.state,o=this._optPlaying??a,n=this._optMuted??!!s.is_volume_muted,l=r.media_content_id??s.media_content_id,c=this._stationArt(l),h=c?.image??r.entity_picture,d=this._loadingName??r.media_title??c?.name??(a?r.app_name??s.app_name??"Playing":"Nothing playing"),p=r.media_artist??"",m=r.media_album_name??"",u=this._loadingName||this._skipping?"Loading…":(p&&m?`${p} · ${m}`:p||m)||r.media_channel||r.media_playlist||s.source||"",_=Number(r.media_duration)||0,g=r.media_position_updated_at?new Date(r.media_position_updated_at).getTime():0,v=a&&g?Math.max(0,(this._now-g)/1e3):0,f=Math.min(_,(Number(r.media_position)||0)+v),b=this._maxVol(),y="group"in this._dragVol?this._dragVol.group:this._groupVol(i),$=`${this._label(t)}${i.length>1?" +"+(i.length-1):""}`,x=this._instant(()=>this._onSkip("prev")),w=this._instant(()=>this._onPlayPause(o)),A=this._instant(()=>this._onSkip("next")),k=this._instant(()=>this._onMute(n));return I`
      <div class="player">
        <div class="art">
          ${h?I`<img src=${h} alt="" @error=${t=>t.target.style.display="none"}>`:I`<ha-icon icon="mdi:album"></ha-icon>`}
        </div>
        <div class="title-row">
          <div style="min-width:0">
            <div class="track">${d}</div>
            <div class="sub">${u}</div>
          </div>
          <button class="chip" aria-label="Choose speaker" @click=${()=>this._openSheet("speakers")}>
            <ha-icon class="ic" icon="mdi:speaker-multiple"></ha-icon>
            <span class="lbl">${$}</span>
            <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
          </button>
        </div>
        ${_>0?I`
          <div class="progress">
            <span>${zt(f)}</span>
            <div class="bar"><span style=${ft({width:f/_*100+"%"})}></span></div>
            <span>${zt(_)}</span>
          </div>`:B}
        <div class="transport">
          <button class="t-btn" aria-label="Previous track" @pointerdown=${x} @click=${x}>
            <ha-icon icon="mdi:skip-previous"></ha-icon></button>
          <button class="t-btn play" aria-label=${o?"Pause":"Play"} @pointerdown=${w} @click=${w}>
            <ha-icon icon=${o?"mdi:pause":"mdi:play"}></ha-icon></button>
          <button class="t-btn" aria-label="Next track" @pointerdown=${A} @click=${A}>
            <ha-icon icon="mdi:skip-next"></ha-icon></button>
        </div>
        <div class="vol-row">
          <button class=${_t({"sq-btn":!0,on:n})} aria-label=${n?"Unmute":"Mute"}
            aria-pressed=${n} @pointerdown=${k} @click=${k}>
            <ha-icon icon=${n?"mdi:volume-off":"mdi:volume-medium"}></ha-icon>
          </button>
          ${this._slider("group",y,b,t=>this._setGroupVolume(t),i.length>1?"Group volume":"Volume",void 0,!1,n)}
          <button class="sq-btn" aria-label="Speaker volumes" @click=${()=>this._openSheet("volumes")}>
            <ha-icon icon="mdi:tune-vertical-variant"></ha-icon>
          </button>
        </div>
      </div>
    `}_slider(t,e,i,s,r,a,o=!1,n=!1){const l=t in this._dragVol?this._dragVol[t]:e,c=i>0?Math.max(0,Math.min(100,l/i*100)):0,h=ft({clipPath:`inset(0 ${100-c}% 0 0)`}),d=t=>I`
      <div class=${_t({lbl:!0,dark:t})} style=${t?h:B}>
        ${a?I`<ha-icon icon=${a}></ha-icon>`:B}
        <span class="name">${r}</span>
        <span class="val">${l}</span>
      </div>`;return I`
      <div class=${_t({slider:!0,flat:o,muted:n})} role="slider" tabindex="0"
        aria-label=${r} aria-valuemin="0" aria-valuemax=${i} aria-valuenow=${l}
        @pointerdown=${e=>this._slide(e,t,i,s)}
        @keydown=${e=>this._sliderKey(e,t,l,i,s)}>
        <div class="fill" style=${h}></div>
        ${d(!1)}
        ${d(!0)}
      </div>
    `}_renderTiles(t){const e=t.length;return I`
      <div class="tiles">
        <button class="tile" @click=${()=>this._openSheet("speakers")}>
          <span class="ic slate"><ha-icon icon="mdi:speaker-multiple"></ha-icon></span>
          <span class="big">${e} ${1===e?"room":"rooms"}</span>
          <span class="small">Speakers</span>
        </button>
        <button class="tile" @click=${()=>this._openSheet("library")}>
          <span class="ic sage"><ha-icon icon="mdi:music-box-multiple"></ha-icon></span>
          <span class="big">Library</span>
          <span class="small">Playlists · Stations</span>
        </button>
      </div>
    `}_sep(t,e,i=!1,s){return I`
      <div class=${_t({sep:!0,small:i})}>
        <ha-icon class="ic" icon=${e}></ha-icon>
        <span class="name">${t}</span>
        <span class="line"></span>
        ${s??B}
      </div>`}_refreshBtn(){return I`
      <button class=${_t({act:!0,spin:this._refreshing||this._libLoading})}
        aria-label="Refresh from Music Assistant" @click=${()=>this._refresh()}>
        <ha-icon icon="mdi:refresh"></ha-icon>
      </button>`}_renderFavorites(){const t=this.hass.states[this._c("favorites")],e=this._rows(this._c("favorites")),i=t?.attributes.status??"";let s;if(e.length)s=I`
        <div class="strip">
          ${e.map(t=>I`
            <button class=${_t({fav:!0,radio:"radio"===t.type,album:"album"===t.type})}
              @click=${()=>this._play(t.uri,t.type,t.name)}>
              ${t.image?I`<img src=${t.image} alt="" loading="lazy"
                @error=${t=>t.target.style.display="none"}>`:B}
              <span class="n">${t.name}</span>
              <span class="s">${t.sub}</span>
            </button>`)}
        </div>`;else{const e=t?i&&"ok"!==i?i:"Loading favourites from Music Assistant…":`${this._c("favorites")} not found`;s=I`<div class=${_t({empty:!0,error:!!t&&!!i&&"ok"!==i&&!/no favourites/i.test(i)})}>${e}</div>`}return I`${this._sep("Favorites","mdi:heart",!1,this._refreshBtn())}${s}`}_sheetTitle(){return"speakers"===this._sheet?"Speakers":"volumes"===this._sheet?"Speaker volumes":"library"===this._sheet?"Library":""}_renderSheet(t,e){const i="speakers"===this._sheet?"mdi:speaker-multiple":"volumes"===this._sheet?"mdi:tune-vertical-variant":"mdi:music-box-multiple",s="speakers"===this._sheet?this._renderSpeakers(t,e):"volumes"===this._sheet?this._renderVolumes(t,e):this._renderLibrary();return I`
      <div class="sheet-hdr">
        <ha-icon icon=${i}></ha-icon>
        <span class="name">${this._sheetTitle()}</span>
        <button class="close" aria-label="Close" @click=${()=>this._closeSheet()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
      <div class="sheet-body">${s}</div>
    `}_renderSpeakers(t,e){const i=this._isAuto(),s=t=>this._pendingGroup[t]??e.includes(t),r=t=>e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),t())};return I`
      <div class=${_t({row:!0,on:i})} role="button" tabindex="0"
        @click=${()=>this._select("Auto")} @keydown=${r(()=>this._select("Auto"))}>
        <span class="ic"><ha-icon icon="mdi:autorenew"></ha-icon></span>
        <span class="txt">
          <div class="n">Auto</div>
          <div class="l bold">Follows playback${i?` · ${this._label(t)}`:""}</div>
        </span>
        <span class="act" style="background:transparent">
          <ha-icon icon=${i?"mdi:check-circle":"mdi:chevron-right"}></ha-icon>
        </span>
      </div>
      ${this._rooms.map(e=>{const i=this.hass.states[e.entity],a=e.entity===t,o=s(e.entity),n=e.entity in this._pendingGroup,l=i?.attributes.group_members??[],c=i&&"unavailable"!==i.state?"playing"===i.state?"Playing":"paused"===i.state?"Paused":"Idle":"Unavailable",h=l.length>1&&i?l[0]===e.entity?`${c} · leading ${l.length-1}`:`${c} · with ${this._label(l[0])}`:c,d=()=>this._select(e.name);return I`
          <div class=${_t({row:!0,on:a,pending:n})} role="button" tabindex="0"
            aria-label="${e.name}, ${h}" @click=${d} @keydown=${r(d)}>
            <span class="ic"><ha-icon icon=${e.icon}></ha-icon></span>
            <span class="txt">
              <div class="n">${e.name}</div>
              <div class=${_t({l:!0,bold:!0,playing:"playing"===i?.state})}>${h}</div>
            </span>
            ${a?I`<span class="act"><ha-icon icon="mdi:check-circle"></ha-icon></span>`:I`<button class="act" aria-label=${o?`Remove ${e.name} from group`:`Add ${e.name} to group`}
                  @click=${t=>{t.stopPropagation(),this._toggleGroup(e.entity)}}>
                  <ha-icon icon=${o?"mdi:minus":"mdi:plus"}></ha-icon>
                </button>`}
          </div>`})}
    `}_renderVolumes(t,e){const i=this._maxVol(),s="group"in this._dragVol?this._dragVol.group:this._groupVol(e),r=e.length>1;return I`
      ${r?I`
        <div class="vol-item">
          ${this._slider("group",s,i,t=>this._setGroupVolume(t),"Group","mdi:speaker-multiple",!0)}
        </div>
        <div class="note">${e.map(t=>this._label(t)).join(" + ")}</div>
        ${this._sep("Individual","mdi:tune-vertical-variant",!0)}`:B}
      ${e.map(t=>I`
        <div class="vol-item">
          ${this._slider(t,this._vol(t),i,e=>{this._svc(yt(this.hass,t,e),`Couldn't set ${this._label(t)} volume`)},this._label(t),this._room(t)?.icon,!0)}
        </div>`)}
      ${r?B:I`
        <div class="note">Group rooms from the Speakers sheet to balance them here.</div>`}
    `}_renderLibrary(){const t=this._rows(this._c("recent")).slice(0,10),e=this._lib??[],i=[...new Set(e.map(t=>t.service))].sort(),s=Mt[this._libTab],r=this._libQ.trim().toLowerCase(),a=e.filter(t=>(!s||t.category===s)&&("Favorites"!==this._libTab||t.favorite)&&("All"===this._libSvc||t.service===this._libSvc)&&(!r||t.title.toLowerCase().includes(r))),o=a.slice(0,150),n=[];for(const t of o){const e=n[n.length-1];e&&e[0]===t.service?e[1].push(t):n.push([t.service,[t]])}const l="All"===this._libSvc&&n.length>1;return I`
      ${t.length?I`
        ${this._sep("Recently played","mdi:history",!0)}
        ${t.map(t=>this._itemRow(t.name,t.sub,t.image,(t=>t.includes("radio")?"mdi:radio":"album"===t?"mdi:album":"artist"===t?"mdi:account-music":"track"===t?"mdi:music-note":"mdi:playlist-music")(t.type),()=>this._play(t.uri,t.type,t.name)))}
      `:B}
      ${this._sep("Library","mdi:music-box-multiple",!0,this._refreshBtn())}
      <label class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input type="search" placeholder="Search the library" .value=${this._libQ}
          @input=${t=>this._libQ=t.target.value}>
      </label>
      <div class="pills" role="tablist" aria-label="Type">
        ${Ct.map(t=>I`
          <button class=${_t({pill:!0,on:this._libTab===t})} role="tab"
            aria-selected=${this._libTab===t} @click=${()=>this._libTab=t}>${t}</button>`)}
      </div>
      ${i.length>1?I`
        <div class="pills" aria-label="Service">
          ${["All",...i].map(t=>I`
            <button class=${_t({pill:!0,on:this._libSvc===t})}
              @click=${()=>this._libSvc=t}>${"All"===t?"All services":t}</button>`)}
        </div>`:B}
      ${this._libError?I`<div class="empty error">${this._libError}</div>`:this._lib?a.length?n.map(([t,e])=>I`
                ${l?I`<div class="svc-head">${t}</div>`:B}
                ${e.map(t=>this._itemRow(t.title,`${Lt[t.category]}${t.favorite?" · ♥":""}${"All"!==this._libSvc||l?"":` · ${t.service}`}`,t.image,Tt[t.category],()=>this._play(t.uri,t.media_type,t.title)))}
              `):I`<div class="empty">${r?`Nothing matches “${this._libQ}”.`:"Nothing here yet."}</div>`:I`<div class="empty">Loading the Music Assistant library…</div>`}
      ${a.length>150?I`
        <div class="note">Showing ${150} of ${a.length}. Search or filter to narrow it down.</div>`:B}
    `}_itemRow(t,e,i,s,r){return I`
      <button class="row" @click=${r}>
        <span class="ic tile">
          ${i?I`<img src=${i} alt="" loading="lazy"
                @error=${t=>t.target.replaceWith(Object.assign(document.createElement("ha-icon"),{icon:s}))}>`:I`<ha-icon icon=${s}></ha-icon>`}
        </span>
        <span class="txt">
          <div class="n">${t}</div>
          <div class="l">${e}</div>
        </span>
        <span class="act"><ha-icon icon="mdi:play"></ha-icon></span>
      </button>`}};jt.styles=bt,t([ht({attribute:!1})],jt.prototype,"hass",void 0),t([dt()],jt.prototype,"_config",void 0),t([function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}("dialog")],jt.prototype,"_dialog",void 0),t([dt()],jt.prototype,"_sheet",void 0),t([dt()],jt.prototype,"_optPlaying",void 0),t([dt()],jt.prototype,"_optMuted",void 0),t([dt()],jt.prototype,"_pendingGroup",void 0),t([dt()],jt.prototype,"_pendingSelect",void 0),t([dt()],jt.prototype,"_dragVol",void 0),t([dt()],jt.prototype,"_loadingName",void 0),t([dt()],jt.prototype,"_skipping",void 0),t([dt()],jt.prototype,"_refreshing",void 0),t([dt()],jt.prototype,"_toast",void 0),t([dt()],jt.prototype,"_lib",void 0),t([dt()],jt.prototype,"_libLoading",void 0),t([dt()],jt.prototype,"_libError",void 0),t([dt()],jt.prototype,"_libTab",void 0),t([dt()],jt.prototype,"_libSvc",void 0),t([dt()],jt.prototype,"_libQ",void 0),t([dt()],jt.prototype,"_now",void 0),jt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})(At)],jt),window.customCards=window.customCards||[],window.customCards.push({type:At,name:"Mobile Music Card",description:"Dune Mist music player for the mobile dashboard: Sonos rooms, grouping, volumes and the Music Assistant library.",preview:!1}),console.info(`%c MOBILE-MUSIC-CARD %c v${wt} `,"color:#16202a;background:#8EB1BF;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px","color:#fff;background:#5b616a;padding:2px 6px;border-radius:0 4px 4px 0");export{wt as CARD_VERSION,jt as MobileMusicCard};
