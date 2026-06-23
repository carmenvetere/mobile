function t(t,e,i,s){var r,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(o<3?r(a):o>3?r(e,i,a):r(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,v=g.trustedTypes,m=v?v.emptyScript:"",_=g.reactiveElementPolyfillSupport,f=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[f("elementProperties")]=new Map,y[f("finalized")]=new Map,_?.({ReactiveElement:y}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,A=$.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+E,T=`<${M}>`,P=document,R=()=>P.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,V=Array.isArray,O="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,U=/>/g,j=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,B=/"/g,I=/^(?:script|style|textarea|title)$/i,D=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=D(1),Z=D(2),F=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,Q=P.createTreeWalker(P,129);function K(t,e){if(!V(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=L;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===L?"!--"===l[1]?a=z:void 0!==l[1]?a=U:void 0!==l[2]?(I.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=j):void 0!==l[3]&&(a=j):a===j?">"===l[0]?(a=r??L,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?j:'"'===l[3]?B:N):a===B||a===N?a=j:a===z||a===U?a=L:(a=j,r=void 0);const h=a===j&&t[e+1].startsWith("/>")?" ":"";o+=a===L?i+T:c>=0?(s.push(n),i.slice(0,c)+S+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,n=this.parts,[l,c]=Y(t,e);if(this.el=J.createElement(l,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[o++],i=s.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?st:"?"===a[1]?rt:"@"===a[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(E)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],R()),Q.nextNode(),n.push({type:2,index:++r});s.append(t[e],R())}}}else if(8===s.nodeType)if(s.data===M)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)n.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===F)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=H(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);Q.currentNode=s;let r=Q.nextNode(),o=0,a=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new et(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new at(r,this,t)),this._$AV.push(e),n=i[++a]}o!==n?.index&&(r=Q.nextNode(),o++)}return Q.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),H(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>V(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new J(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new et(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=X(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=X(this,s[i+a],e,a),n===F&&(n=this._$AH[a]),o||=!H(n)||n!==this._$AH[a],n===q?t=q:t!==q&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class ot extends it{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===F)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(J,et),($.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;let ct=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new et(e.insertBefore(R(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b},ut=(t=pt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function gt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function vt(t){return gt({...t,state:!0,attribute:!1})}const mt=1,_t=t=>(...e)=>({_$litDirective$:t,values:e});let ft=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const wt=_t(class extends ft{constructor(t){if(super(t),t.type!==mt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return F}}),bt="important",xt=" !"+bt,yt=_t(class extends ft{constructor(t){if(super(t),t.type!==mt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(xt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?bt:""):i[t]=s}}return F}}),$t="0.2.0",kt="wall-panel-sonos-card",At="wall-panel-sonos-card-editor";console.info(`%c WALL-PANEL-SONOS-CARD %c v${$t} `,"color:#1a1c1f;background:#8EB1BF;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px","color:#fff;background:#3a3d42;padding:2px 6px;border-radius:0 4px 4px 0");const Ct=a`
  :host {
    --wp-text: var(--primary-text-color, #ffffff);
    --wp-text-dim: var(--secondary-text-color, rgba(255, 255, 255, 0.62));
    --wp-bg: var(--background-color, var(--primary-background-color, #1a1c1f));
    --wp-card: var(--background-color, var(--primary-background-color, var(--ha-card-background, var(--card-background-color, #3a3d42))));
    --wp-card-2: var(--secondary-background-color, #4a4d52);
    --wp-accent: var(--primary-color, #8eb1bf);
    --wp-accent-2: var(--accent-color, #8ba680);
    /* Translucent fills derived from the palette. Overrideable so a
       theme can re-tint pills/banners without touching the base colors. */
    --wp-overlay-soft: rgba(0, 0, 0, 0.18);
    --wp-overlay: rgba(0, 0, 0, 0.22);
    --wp-overlay-strong: rgba(0, 0, 0, 0.28);
    --wp-scrim: rgba(0, 0, 0, 0.45);
    --wp-divider: rgba(255, 255, 255, 0.18);
    --wp-on-accent-soft: rgba(255, 255, 255, 0.6);
    --wp-pill-on-active: rgba(255, 255, 255, 0.12);
    /* color-mix lets the "grouped" row tint follow --wp-accent. Falls
       back via the second declaration for the rare browser without it. */
    --wp-accent-soft: rgba(142, 177, 191, 0.45);
    --wp-accent-soft: color-mix(in srgb, var(--wp-accent) 45%, transparent);
    /* Shadows */
    --wp-shadow-card: 0 8px 32px rgba(0, 0, 0, 0.18);
    --wp-shadow-cover: 0 8px 32px rgba(0, 0, 0, 0.35);
    --wp-shadow-play: 0 4px 16px rgba(0, 0, 0, 0.25);
    --wp-shadow-menu: 0 16px 40px rgba(0, 0, 0, 0.5);
    --wp-radius: 28px;
    --wp-radius-pill: 999px;
    --wp-track-scale: 1.15;
    --wp-vol-scale: 1.4;
    /* Force the host to fill its container. Without this Lovelace
       parents that use min-content sizing (some grid/stack layouts)
       will let intrinsic content widths drive the card's width — so
       a wider favorites row makes the whole card grow, and switching
       back to the player view shrinks it again. */
    display: block;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
  ha-card {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  .root {
    background: var(--wp-card);
    color: var(--wp-text);
    border-radius: var(--wp-radius);
    font-family: var(--ha-card-header-font-family, sans-serif);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    box-shadow: var(--wp-shadow-card);
    height: 100%;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    min-height: 600px;
  }

  /* HEADER */
  .hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 14px 18px 12px;
    flex-shrink: 0;
  }
  .hdr-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--wp-overlay-soft);
    color: var(--wp-text);
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
  }
  .hdr-btn.active {
    background: var(--wp-accent);
    color: var(--wp-bg);
  }
  .hdr-title {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: 0;
    cursor: pointer;
    color: var(--wp-text);
    font-size: 23px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 14px;
    transition: background 0.15s;
  }
  .hdr-title.menu-open {
    background: var(--wp-overlay-strong);
  }
  .group-pill {
    font-size: 13px;
    opacity: 0.75;
    padding: 3px 10px;
    border-radius: 999px;
    background: var(--wp-overlay);
  }
  .chev {
    transition: transform 0.2s;
  }
  .chev.up {
    transform: rotate(180deg);
  }

  /* PLAYER */
  .pv {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 22px 18px;
    min-height: 0;
    /* Allow children to shrink below their intrinsic content width so
       long titles inside .fav-item ellipsize instead of pushing the
       whole row off the right edge on narrow viewports. */
    min-width: 0;
  }
  .src {
    text-align: center;
    margin-bottom: 8px;
    font-size: 13px;
    color: var(--wp-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .src-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--wp-accent-2);
    margin-right: 6px;
    vertical-align: middle;
  }
  .cover-wrap {
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    min-height: 0;
    overflow: hidden;
    padding: 4px 0;
  }
  .cover {
    aspect-ratio: 1;
    /* Drive size from height so the available vertical space is the cap.
       max-width keeps the square from overflowing on narrow cards. */
    height: clamp(140px, 36vh, 240px);
    max-height: 100%;
    max-width: 100%;
    border-radius: 18px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: var(--wp-shadow-cover);
  }
  .meta {
    text-align: center;
    margin-top: 12px;
  }
  .meta .track {
    font-size: calc(22px * var(--wp-track-scale));
    font-weight: 700;
    color: var(--wp-text);
  }
  .meta .sub {
    font-size: calc(13px * var(--wp-track-scale));
    color: var(--wp-text-dim);
    margin-top: 2px;
  }
  .progress {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--wp-text-dim);
    font-variant-numeric: tabular-nums;
    margin: 10px 4px 8px;
  }
  .progress .bar {
    flex: 1;
    height: 4px;
    background: var(--wp-divider);
    border-radius: 999px;
    overflow: hidden;
  }
  .progress .bar > span {
    display: block;
    height: 100%;
    background: var(--wp-text);
  }
  .transport {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    margin: 4px 0 10px;
  }
  .t-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: none;
    border: 0;
    color: var(--wp-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .play-btn {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: var(--wp-text);
    color: var(--wp-bg);
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--wp-shadow-play);
  }
  .vol-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 2px 4px;
  }
  .vol-icon {
    display: flex;
    flex-shrink: 0;
  }
  .vol-num {
    flex-shrink: 0;
    min-width: 28px;
    text-align: right;
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    color: var(--wp-text-dim);
  }

  /* SLIDER */
  .slider {
    flex: 1;
    height: calc(22px * var(--wp-vol-scale));
    background: var(--wp-divider);
    border-radius: 999px;
    position: relative;
    cursor: pointer;
    touch-action: none;
  }
  .slider .fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: var(--wp-accent);
    border-radius: 999px;
  }
  .slider .knob {
    position: absolute;
    top: 50%;
    width: 6px;
    height: calc(30px * var(--wp-vol-scale));
    background: var(--wp-text);
    border-radius: 3px;
    transform: translate(-50%, -50%);
  }

  /* FAVORITES */
  .fav-target {
    font-size: 14px;
    color: var(--wp-text-dim);
    padding: 2px 4px 10px;
  }
  .fav-target b {
    color: var(--wp-accent);
    font-weight: 600;
  }
  .tabs {
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  .tab {
    background: var(--wp-overlay-soft);
    color: var(--wp-text);
    border: 0;
    cursor: pointer;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
  }
  .tab.active {
    background: var(--wp-accent);
    color: var(--wp-bg);
  }
  .fav-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    flex: 1;
    padding-right: 4px;
    min-width: 0;
    /* Keep rows pinned to the top — without this, a short list would
       distribute the cards across the full available height. */
    align-content: flex-start;
  }
  .fav-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 20px 10px 10px;
    background: var(--wp-card-2);
    border: 0;
    border-radius: var(--wp-radius-pill);
    cursor: pointer;
    color: var(--wp-text);
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    /* Contain long titles. Without min-width:0 on a flex container,
       the inner text's intrinsic width forces the button wider than
       its parent, so the row escapes to the right. */
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    box-sizing: border-box;
  }
  .fav-label {
    flex: 1 1 0;
    min-width: 0;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  .fav-art {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--wp-text);
  }

  /* GROUPING */
  .grp-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    background: var(--wp-overlay);
    border-radius: 14px;
    margin-bottom: 12px;
    gap: 14px;
  }
  .grp-banner .lbl {
    font-size: 11px;
    color: var(--wp-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .grp-banner .rooms {
    font-size: 15px;
    font-weight: 600;
    margin-top: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .grp-banner .hint {
    font-size: 13px;
    color: var(--wp-text-dim);
    text-align: right;
  }
  .grp-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    padding-right: 4px;
  }
  .grp-row {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 22px;
    background: var(--wp-card-2);
    color: var(--wp-text);
    border: 2px solid transparent;
    border-radius: var(--wp-radius-pill);
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }
  .grp-row.grouped {
    background: var(--wp-accent-soft);
    color: var(--wp-bg);
  }
  .grp-row.primary {
    background: var(--wp-accent);
    color: var(--wp-bg);
    border-color: var(--wp-text);
    font-weight: 700;
  }
  .grp-row .badge {
    font-size: 10px;
    font-weight: 700;
    padding: 4px 9px;
    background: var(--wp-overlay-soft);
    color: var(--wp-bg);
    border-radius: 999px;
    letter-spacing: 0.1em;
  }
  .grp-volumes {
    margin-top: 14px;
    padding: 14px 16px;
    background: var(--wp-overlay);
    border-radius: 16px;
  }
  .grp-volumes-title {
    font-size: 11px;
    color: var(--wp-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }
  .grp-vol-row {
    display: grid;
    grid-template-columns: 110px 1fr 32px;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  .grp-vol-row .name {
    font-size: 15px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .grp-vol-row .val {
    font-size: 14px;
    color: var(--wp-text-dim);
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  /* DROPDOWN */
  .menu-overlay {
    position: absolute;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: var(--wp-scrim);
    padding-top: 64px;
  }
  .menu-card {
    width: min(92%, 380px);
    background: var(--wp-card-2);
    border-radius: 18px;
    padding: 8px;
    box-shadow: var(--wp-shadow-menu);
    max-height: 80%;
    overflow-y: auto;
  }
  .menu-section {
    padding: 8px 12px 4px;
    font-size: 11px;
    color: var(--wp-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    text-align: left;
    padding: 12px 14px;
    background: transparent;
    color: var(--wp-text);
    border: 0;
    cursor: pointer;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
  }
  .menu-item.active {
    background: var(--wp-accent);
    color: var(--wp-bg);
    font-weight: 700;
  }
  .menu-item .now-pill {
    font-size: 10px;
    font-weight: 700;
    padding: 3px 7px;
    background: var(--wp-overlay-soft);
    color: var(--wp-bg);
    border-radius: 999px;
    letter-spacing: 0.1em;
  }
  .menu-item .group-pill {
    font-size: 10px;
    padding: 3px 8px;
    background: var(--wp-pill-on-active);
    border-radius: 999px;
    letter-spacing: 0.06em;
  }

  /* MOBILE / NARROW */
  /* Fill the dashboard panel if Lovelace gives the card bounded height
     (panel-mode dashboards do), otherwise fall back to the default
     min-height so we don't overshoot the viewport in a regular
     non-panel dashboard. We deliberately do *not* force 100dvh on the
     host — that would push the card behind the HA app header. We also
     keep the rounded corners in narrow mode; users who want a true
     edge-to-edge wall-tablet feel can override --wp-radius via theme
     or card-mod. */
  :host([narrow]) ha-card,
  :host([narrow]) .root {
    height: 100%;
  }
  :host([narrow]) .hdr-title {
    font-size: 19px;
  }
  :host([narrow]) .grp-vol-row {
    grid-template-columns: 90px 1fr 30px;
  }
  /* In narrow mode, let the favorites/grouping bodies scroll the
     whole view instead of just the inner list, so the bottom of long
     content remains reachable on a phone-sized viewport. */
  :host([narrow]) .pv-scroll {
    overflow-y: auto;
  }
`,St=(t,e)=>t.callService("media_player","media_play_pause",{entity_id:e}),Et=(t,e)=>t.callService("media_player","media_next_track",{entity_id:e}),Mt=(t,e,i)=>t.callService("media_player","volume_set",{entity_id:e,volume_level:Math.max(0,Math.min(1,i/100))}),Tt=(t,e,i)=>t.callService("media_player","join",{entity_id:e,group_members:i}),Pt=(t,e)=>t.callService("media_player","unjoin",{entity_id:e}),Rt=Z`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L14.6 8.6 L22 9.3 L16.5 14.2 L18.2 21.5 L12 17.8 L5.8 21.5 L7.5 14.2 L2 9.3 L9.4 8.6 Z"/></svg>`,Ht=Z`<svg width="20" height="22" viewBox="0 0 22 26" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="2" width="16" height="22" rx="3"/><circle cx="11" cy="16" r="4"/><circle cx="11" cy="7" r="1.3" fill="currentColor"/></svg>`,Vt=Z`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9 L12 15 L18 9"/></svg>`,Ot=Z`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9V15H7L12 20V4L7 9H3M14 10.5H23V13.5H14V10.5Z"/></svg>`,Lt=Z`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9V15H7L12 20V4L7 9H3M14 13.5V10.5H17V7.5H20V10.5H23V13.5H20V16.5H17V13.5H14Z"/></svg>`,zt=Z`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3 9H7L12 4V20L7 15H3V9Z"/></svg>`,Ut=Z`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5 H8 V19 H6 Z M9 12 L20 5 V19 Z"/></svg>`,jt=Z`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5 H18 V19 H16 Z M4 19 L15 12 L4 5 Z"/></svg>`,Nt=Z`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5 V19 L19 12 Z"/></svg>`,Bt=Z`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>`,It=Z`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7 H21 V19 H3 Z M3 7 L17 3 V5"/><circle cx="17" cy="13" r="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,Dt=Z`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.2"/></svg>`,Wt=Z`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6 H15 V8 H3 Z M3 11 H15 V13 H3 Z M3 16 H11 V18 H3 Z M17 11 V20 L21 17 V8 L17 11 Z"/></svg>`,Zt=Z`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17 H7 A4 4 0 0 1 7 9 H9 M15 9 H17 A4 4 0 0 1 17 17 H15 M9 13 H15"/></svg>`,Ft=Z`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 L10 18 L20 6"/></svg>`,qt=Z`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 18 H4 V20 H2 Z M7 14 H9 V20 H7 Z M12 10 H14 V20 H12 Z M17 6 H19 V20 H17 Z"/></svg>`,Gt="wall-panel-sonos-mini-card";let Qt=class extends ct{setConfig(t){if(!t.entities?.length)throw new Error("wall-panel-sonos-mini-card: 'entities' is required.");this._config=t}getCardSize(){return 2}shouldUpdate(t){if(t.size>1||!t.has("hass"))return!0;if(!this._config)return!0;const e=t.get("hass");if(!e)return!0;for(const t of this._config.entities)if(e.states[t]!==this.hass.states[t])return!0;return!1}_state(t){return this.hass?.states[t]}_label(t){return this._config.names?.[t]??this._state(t)?.attributes.friendly_name??t.replace("media_player.","").replace(/_/g," ")}_activeEntity(){return this._config.entities.find(t=>"playing"===this._state(t)?.state)??this._config.entities.find(t=>["paused","buffering"].includes(this._state(t)?.state??""))}_coordinatorMeta(t,e){if(e)for(const i of e){if(i===t)continue;const e=this._state(i)?.attributes;if(e&&(e.media_title||e.entity_picture))return e}}_stationArt(t){if(!t||!this._config.station_art?.length)return;const e=t.toLowerCase();return this._config.station_art.find(t=>t.match&&e.includes(t.match.toLowerCase()))}_sourceFromContentId(t){if(!t)return;const e=t.match(/[?&]source=([^&]+)/i);return e?decodeURIComponent(e[1]):void 0}_navigate(){const t=this._config.navigation_path;t&&(history.pushState(null,"",t),this.dispatchEvent(new Event("location-changed",{composed:!0})))}render(){if(!this.hass||!this._config)return W``;const t=this._activeEntity();if(!t)return W``;const e=this._state(t),i=e.attributes,s=i.media_title||i.entity_picture?i:this._coordinatorMeta(t,i.group_members)??i,r=s.media_content_id??i.media_content_id,o=this._stationArt(r),a="playing"===e.state,n=Math.round(100*(i.volume_level??0)),l=this._config.volume_step??5,c=o?.image?`url("${o.image}")`:s.entity_picture?`url("${s.entity_picture}")`:"linear-gradient(135deg, #6a4ec8 0%, #1e3a6e 60%, #0a1428 100%)",d=s.media_title??o?.name??s.app_name??i.app_name??this._sourceFromContentId(r)??(a?"Playing":"—"),h=i.group_members?.length??1,p=`${this._label(t)}${h>1?" +"+(h-1):""}`;return W`
      <ha-card>
        <div class="root">
          <div class="hdr">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18 V5 L20 3 V16 M9 18 A2.5 2.5 0 1 1 6.5 15.5 A2.5 2.5 0 0 1 9 18 M20 16 A2.5 2.5 0 1 1 17.5 13.5 A2.5 2.5 0 0 1 20 16"/></svg>
            <div class="hdr-title">Now Playing</div>
            <div class="hdr-rule"></div>
            <button class="room" @click=${this._navigate}>
              ${p}${Vt}
            </button>
          </div>
          <div class="body">
            <button class="nav" @click=${this._navigate}>
              <div class="art" style=${yt({background:c})}></div>
              <div class="meta">
                <div class="title">${d}</div>
                <div class="artist">${s.media_artist??""}</div>
              </div>
            </button>
            <div class="ctrls">
              <button class="btn" @click=${()=>Mt(this.hass,t,Math.max(0,n-l))}>${Ot}</button>
              <button class="btn primary" @click=${()=>St(this.hass,t)}>
                ${a?Bt:Nt}
              </button>
              <button class="btn" @click=${()=>Mt(this.hass,t,Math.min(100,n+l))}>${Lt}</button>
              <button class="btn" @click=${()=>Et(this.hass,t)}>${jt}</button>
            </div>
          </div>
        </div>
      </ha-card>
    `}};Qt.styles=a`
    :host {
      --wp-text: #ffffff;
      --wp-text-dim: rgba(255, 255, 255, 0.65);
      --wp-bg: #1a1c1f;
      --wp-card: #3a3d42;
      --wp-divider: rgba(255, 255, 255, 0.1);
      --wp-btn-bg: rgba(255, 255, 255, 0.08);
      --wp-radius: 28px;
      display: block;
    }
    .root {
      background: var(--wp-card);
      color: var(--wp-text);
      border-radius: var(--wp-radius);
      padding: 14px;
      font-family: var(--ha-card-header-font-family, sans-serif);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    }
    .hdr {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 2px 4px 12px;
    }
    .hdr-title {
      font-size: 18px;
      font-weight: 700;
    }
    .hdr-rule {
      flex: 1;
      height: 1px;
      background: var(--wp-divider);
      margin-left: 8px;
    }
    .room {
      background: none;
      border: 0;
      color: var(--wp-text-dim);
      display: flex;
      align-items: center;
      gap: 2px;
      cursor: pointer;
      padding: 0;
      font-size: 12px;
      font: inherit;
    }
    .body {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
      background: none;
      border: 0;
      padding: 0;
      color: inherit;
      cursor: pointer;
      text-align: left;
      font: inherit;
    }
    .art {
      width: 52px;
      height: 52px;
      border-radius: 10px;
      flex-shrink: 0;
      background-size: cover;
      background-position: center;
    }
    .meta {
      flex: 1;
      min-width: 0;
    }
    .title {
      font-size: 15px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .artist {
      font-size: 13px;
      opacity: 0.65;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ctrls {
      display: flex;
      gap: 4px;
    }
    .btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--wp-btn-bg);
      border: 0;
      color: var(--wp-text);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
    }
    .btn.primary {
      width: 44px;
      height: 44px;
      background: var(--wp-text);
      color: var(--wp-bg);
    }
  `,t([gt({attribute:!1})],Qt.prototype,"hass",void 0),t([vt()],Qt.prototype,"_config",void 0),Qt=t([ht(Gt)],Qt),window.customCards=window.customCards||[],window.customCards.push({type:Gt,name:"Wall Panel Sonos Mini Card",description:"Compact now-playing tile — pairs with wall-panel-sonos-card.",preview:!1});const Kt=t=>{(!isFinite(t)||t<0)&&(t=0);return`${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,"0")}`};let Yt=class extends ct{constructor(){super(...arguments),this._view="player",this._activeRoom="",this._userPickedRoom=!1,this._menuOpen=!1,this._favTab="All",this._favQ="",this._dragVol={},this._optimisticPlaying=null,this._loadingName=null,this._skipping=!1,this._now=Date.now(),this._dragTimers={}}static getStubConfig(){return{type:`custom:${kt}`,entities:[],default_view:"player",layout:"wall"}}static async getConfigElement(){return await Promise.resolve().then(function(){return Xt}),document.createElement(At)}setConfig(t){if(!t.entities||!Array.isArray(t.entities)||0===t.entities.length)throw new Error("wall-panel-sonos-card: 'entities' is required and must be a non-empty list of media_player entity IDs.");const e=!this._config;this._config=t,this._activeRoom&&t.entities.includes(this._activeRoom)||(this._activeRoom=t.entities[0]),e&&t.default_view&&(this._view=t.default_view);const i=Math.max(.9,Math.min(1.6,t.track_scale??1.15)),s=Math.max(1,Math.min(2.5,t.vol_bar_scale??1.4));this.style.setProperty("--wp-track-scale",String(i)),this.style.setProperty("--wp-vol-scale",String(s)),"mobile"===t.layout?this.setAttribute("narrow",""):this.removeAttribute("narrow")}getCardSize(){return 8}connectedCallback(){super.connectedCallback(),this._tickHandle=setInterval(()=>{if("visible"!==document.visibilityState)return;if("player"!==this._view)return;const t=this._state(this._activeRoom);"playing"===t?.state&&(this._now=Date.now())},500)}disconnectedCallback(){super.disconnectedCallback(),this._tickHandle&&clearInterval(this._tickHandle),this._loadingTimer&&clearTimeout(this._loadingTimer),this._skipTimer&&clearTimeout(this._skipTimer);for(const t of Object.values(this._dragTimers))clearTimeout(t);this._dragTimers={}}shouldUpdate(t){if(t.size>1||!t.has("hass"))return!0;if(!this._config)return!0;const e=t.get("hass");if(!e)return!0;for(const t of this._config.entities)if(e.states[t]!==this.hass.states[t])return!0;return!1}willUpdate(t){if(!t.has("hass")||!this._config)return;if(!this._userPickedRoom){const t=this._pickActivePlayer();t&&t!==this._activeRoom&&(this._activeRoom=t),this._userPickedRoom=!0}if(null!==this._optimisticPlaying){"playing"===this._state(this._activeRoom)?.state===this._optimisticPlaying&&(this._optimisticPlaying=null)}if(null!==this._loadingName){const t=this._state(this._activeRoom)?.attributes.media_title;t&&t!==this._prevTitle&&(this._loadingName=null,this._loadingTimer&&(clearTimeout(this._loadingTimer),this._loadingTimer=void 0))}if(this._skipping){const t=this._state(this._activeRoom)?.attributes.media_title;t&&t!==this._prevTitle&&(this._skipping=!1,this._skipTimer&&(clearTimeout(this._skipTimer),this._skipTimer=void 0))}let e=null;for(const t of Object.keys(this._dragVol)){if(!this._dragTimers[t])continue;const i=Math.round(100*(this._state(t)?.attributes.volume_level??0));Math.abs(i-this._dragVol[t])<=2&&(e||(e={...this._dragVol}),delete e[t],clearTimeout(this._dragTimers[t]),delete this._dragTimers[t])}e&&(this._dragVol=e)}_state(t){return this.hass?.states[t]}_label(t){return this._config?.names?.[t]??this._state(t)?.attributes.friendly_name??t.replace("media_player.","").replace(/_/g," ")}_groupMembers(){const t=this._state(this._activeRoom);return(t?.attributes.group_members??[this._activeRoom]).filter(t=>this._config.entities.includes(t))}_coordinatorMeta(t){if(t)for(const e of t){if(e===this._activeRoom)continue;const t=this._state(e)?.attributes;if(t&&(t.media_title||t.entity_picture))return t}}_stationArt(t){if(!t||!this._config?.station_art?.length)return;const e=t.toLowerCase();return this._config.station_art.find(t=>t.match&&e.includes(t.match.toLowerCase()))}_sourceFromContentId(t){if(!t)return;const e=t.match(/[?&]source=([^&]+)/i);return e?decodeURIComponent(e[1]):void 0}_pickActivePlayer(){const t=this._config.entities;let e=null;for(let i=0;i<t.length;i++){const s=t[i],r=this._state(s);if("playing"!==r?.state)continue;const o=(r.attributes.group_members??[s]).filter(e=>t.includes(e)).length;(!e||o>e.size||o===e.size&&i<e.idx)&&(e={id:s,size:o,idx:i})}return e?.id??null}_setView(t){this._view=this._view===t&&"player"!==t?"player":t,this._menuOpen=!1}_onTitleClick(){"player"!==this._view?this._view="player":this._menuOpen=!this._menuOpen}_pickRoom(t){const e=this._groupMembers();this._activeRoom=t,this._userPickedRoom=!0,this._menuOpen=!1,e.includes(t)||Pt(this.hass,t)}_pickGroup(t){if(0===t.length)return;const e=t[0];this._activeRoom=e,this._userPickedRoom=!0,this._menuOpen=!1,Tt(this.hass,e,t.slice(1))}_onPlayPause(t){this._optimisticPlaying=!t,St(this.hass,this._activeRoom)}_onSkip(t){var e,i;this._prevTitle=this._state(this._activeRoom)?.attributes.media_title,this._skipping=!0,this._skipTimer&&clearTimeout(this._skipTimer),this._skipTimer=setTimeout(()=>{this._skipping=!1},5e3),"next"===t?Et(this.hass,this._activeRoom):(e=this.hass,i=this._activeRoom,e.callService("media_player","media_previous_track",{entity_id:i}))}_toggleInGroup(t){if(t===this._activeRoom)return;const e=this._groupMembers();e.includes(t)?Pt(this.hass,t):Tt(this.hass,this._activeRoom,[...e.filter(t=>t!==this._activeRoom),t])}_slide(t,e,i,s){const r=t.currentTarget;s&&this._dragTimers[s]&&(clearTimeout(this._dragTimers[s]),delete this._dragTimers[s]);let o=0,a=null,n=null;const l=t=>{o=Date.now(),a=null,n&&(clearTimeout(n),n=null),i(t)},c=t=>{const i=r.getBoundingClientRect(),c=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width)),d=Math.round(c*e);s&&(this._dragVol={...this._dragVol,[s]:d});const h=Date.now()-o;h>=120?l(d):(a=d,n||(n=setTimeout(()=>{n=null,null!==a&&l(a)},120-h)))};try{r.setPointerCapture(t.pointerId)}catch{}c(t);const d=t=>c(t),h=()=>{r.removeEventListener("pointermove",d),r.removeEventListener("pointerup",h),r.removeEventListener("pointercancel",h);try{r.releasePointerCapture(t.pointerId)}catch{}null!==a&&l(a),n&&(clearTimeout(n),n=null),s&&(this._dragTimers[s]=setTimeout(()=>{if(delete this._dragTimers[s],s in this._dragVol){const t={...this._dragVol};delete t[s],this._dragVol=t}},2e3))};r.addEventListener("pointermove",d),r.addEventListener("pointerup",h),r.addEventListener("pointercancel",h)}render(){if(!this._config||!this.hass)return W``;const t=this._state(this._activeRoom);if(!t)return W`<ha-card><div style="padding:24px;color:var(--wp-text-dim)">Entity ${this._activeRoom} not found.</div></ha-card>`;const e=this._groupMembers(),i=e.length,s="favorites"===this._view?"Favorites":"grouping"===this._view?"Speakers":this._label(this._activeRoom);return W`
      <ha-card>
        <div class="root">
          ${this._renderHeader(s,i)}
          ${"player"===this._view?this._renderPlayer(t):q}
          ${"favorites"===this._view?this._renderFavorites():q}
          ${"grouping"===this._view?this._renderGrouping(e):q}
          ${this._menuOpen?this._renderMenu(e):q}
        </div>
      </ha-card>
    `}_renderHeader(t,e){return W`
      <div class="hdr">
        <button class=${wt({"hdr-btn":!0,active:"favorites"===this._view})}
                @click=${()=>this._setView("favorites")} aria-label="Favorites">
          ${Rt}
        </button>
        <button class=${wt({"hdr-title":!0,"menu-open":this._menuOpen})}
                @click=${this._onTitleClick}>
          <span>${t}</span>
          ${"player"===this._view&&e>1?W`<span class="group-pill">+${e-1}</span>`:q}
          ${"player"===this._view?W`<span class=${wt({chev:!0,up:this._menuOpen})}>${Vt}</span>`:q}
        </button>
        <button class=${wt({"hdr-btn":!0,active:"grouping"===this._view})}
                @click=${()=>this._setView("grouping")} aria-label="Speakers">
          ${Ht}
        </button>
      </div>
    `}_renderPlayer(t){const e=t.attributes,i=e.media_title||e.entity_picture?e:this._coordinatorMeta(e.group_members)??e,s=i.media_duration??0,r=this._optimisticPlaying??"playing"===t.state,o=Math.round(100*(e.volume_level??0)),a=this._activeRoom,n=this._maxVol(),l=this._volStep(n),c=a in this._dragVol?this._dragVol[a]:o,d=i.media_position_updated_at?new Date(i.media_position_updated_at).getTime():0,h="playing"===t.state&&d?Math.max(0,(this._now-d)/1e3):0,p=(i.media_position??0)+h,u=s>0?Math.min(s,p):p,g=i.media_content_id??e.media_content_id,v=this._stationArt(g),m=v?.image?`url("${v.image}")`:i.entity_picture?`url("${i.entity_picture}")`:"linear-gradient(135deg, var(--wp-accent) 0%, var(--wp-card-2) 60%, var(--wp-bg) 100%)",_="playing"===t.state,f=this._loadingName??i.media_title??v?.name??(_?i.app_name??e.app_name??"Playing":"Nothing playing"),w=this._loadingName||this._skipping?"Loading…":`${i.media_artist??""}${i.media_album_name?` · ${i.media_album_name}`:""}`,b=e.source??this._sourceFromContentId(g);return W`
      <div class="pv">
        <div class="src">
          ${b?W`<span class="src-dot"></span>${b}`:q}
        </div>
        <div class="cover-wrap">
          <div class="cover" style=${yt({backgroundImage:m})}></div>
        </div>
        <div class="meta">
          <div class="track">${f}</div>
          <div class="sub">${w}</div>
        </div>
        <div class="progress">
          <span>${Kt(u)}</span>
          <div class="bar"><span style=${yt({width:(s>0?u/s*100:0)+"%"})}></span></div>
          <span>${Kt(s)}</span>
        </div>
        <div class="transport">
          <button class="t-btn" @click=${()=>this._stepVol(-l,n)}>${Ot}</button>
          <button class="t-btn" @click=${()=>this._onSkip("prev")}>${Ut}</button>
          <button class="play-btn" @click=${()=>this._onPlayPause(r)}>
            ${r?Bt:Nt}
          </button>
          <button class="t-btn" @click=${()=>this._onSkip("next")}>${jt}</button>
          <button class="t-btn" @click=${()=>this._stepVol(l,n)}>${Lt}</button>
        </div>
        <div class="vol-row">
          <span class="vol-icon">${zt}</span>
          ${this._slider(c,n,t=>Mt(this.hass,this._activeRoom,t),this._activeRoom)}
          <span class="vol-num">${c}</span>
        </div>
      </div>
    `}_maxVol(){const t=this._config?.max_volume??100;return Math.max(1,Math.min(100,Math.round(t)))}_volStep(t){return Math.max(1,Math.round(t/20))}_stepVol(t,e){const i=this._activeRoom,s=i in this._dragVol?this._dragVol[i]:Math.round(100*(this._state(i)?.attributes.volume_level??0)),r=Math.max(0,Math.min(e,s+t));r!==s&&(this._dragVol={...this._dragVol,[i]:r},this._dragTimers[i]&&clearTimeout(this._dragTimers[i]),this._dragTimers[i]=setTimeout(()=>{if(delete this._dragTimers[i],i in this._dragVol){const t={...this._dragVol};delete t[i],this._dragVol=t}},2e3),Mt(this.hass,i,r))}_slider(t,e,i,s){const r=s&&s in this._dragVol?this._dragVol[s]:t,o=e>0?Math.max(0,Math.min(100,r/e*100)):0;return W`
      <div class="slider" @pointerdown=${t=>this._slide(t,e,i,s)}>
        <div class="fill" style=${yt({width:`${o}%`})}></div>
        <div class="knob" style=${yt({left:`${o}%`})}></div>
      </div>
    `}_renderFavorites(){const t=(this._config.favorites??[]).filter(t=>("Playlists"!==this._favTab||"playlist"===t.type)&&(("Stations"!==this._favTab||"station"===t.type)&&(("Albums"!==this._favTab||"album"===t.type)&&!(this._favQ&&!t.name.toLowerCase().includes(this._favQ.toLowerCase()))))),e=this._groupMembers().length;return W`
      <div class="pv pv-scroll">
        <div class="fav-target">
          Play to <b>${this._label(this._activeRoom)}${e>1?" +"+(e-1):""}</b>
        </div>
        <div class="tabs">
          ${["All","Playlists","Stations","Albums"].map(t=>W`
            <button class=${wt({tab:!0,active:this._favTab===t})}
                    @click=${()=>this._favTab=t}>${t}</button>
          `)}
        </div>
        <div class="fav-list">
          ${0===t.length?W`<div style="text-align:center;color:var(--wp-text-dim);padding:40px;font-size:15px">No favorites configured</div>`:t.map(t=>W`
              <button class="fav-item" @click=${()=>this._playFavorite(t)}>
                <span class="fav-art" style=${yt({background:t.art??"linear-gradient(135deg,#4a5d72,#2a3540)"})}>
                  ${"station"===t.type?It:"album"===t.type?Dt:Wt}
                </span>
                <span class="fav-label">${t.name}</span>
              </button>
            `)}
        </div>
      </div>
    `}_playFavorite(t){var e,i,s,r;t.script?((t,e,i={})=>{const s=e.startsWith("script.")?e.slice(7):e;t.callService("script",s,i)})(this.hass,t.script,{entity_id:this._activeRoom,group_members:this._groupMembers()}):t.media_content_id&&t.media_content_type&&(e=this.hass,i=this._activeRoom,s=t.media_content_id,r=t.media_content_type,e.callService("media_player","play_media",{entity_id:i,media_content_id:s,media_content_type:r})),this._prevTitle=this._state(this._activeRoom)?.attributes.media_title,this._loadingName=t.name,this._loadingTimer&&clearTimeout(this._loadingTimer),this._loadingTimer=setTimeout(()=>{this._loadingName=null},8e3),this._view="player"}_renderGrouping(t){const e=this._config.entities;return W`
      <div class="pv pv-scroll">
        <div class="grp-banner">
          <div style="min-width:0">
            <div class="lbl">Currently grouped</div>
            <div class="rooms">${t.map(t=>this._label(t)).join(" + ")||"—"}</div>
          </div>
          <div class="hint">Tap to toggle</div>
        </div>
        <div class="grp-grid">
          ${e.map(e=>{const i=e===this._activeRoom,s=(e=>t.includes(e))(e);return W`
              <button class=${wt({"grp-row":!0,primary:i,grouped:s&&!i})}
                      @click=${()=>this._toggleInGroup(e)}>
                <span style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">
                  ${i?W`<span style="display:flex">${qt}</span>`:q}
                  <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${this._label(e)}</span>
                </span>
                ${i?W`<span class="badge">PRIMARY</span>`:s?W`<span style="width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,0.6);display:flex;align-items:center;justify-content:center;color:var(--wp-bg)">${Ft}</span>`:q}
              </button>
            `})}
        </div>
        ${t.length>1?W`
          <div class="grp-volumes">
            <div class="grp-volumes-title">Group Volumes</div>
            ${t.map(t=>{const e=Math.round(100*(this._state(t)?.attributes.volume_level??0));return W`
                <div class="grp-vol-row">
                  <span class="name">${this._label(t)}${t===this._activeRoom?W`<span style="color:var(--wp-accent)"> ·</span>`:q}</span>
                  ${this._slider(e,100,e=>Mt(this.hass,t,e),t)}
                  <span class="val">${e}</span>
                </div>
              `})}
          </div>
        `:q}
      </div>
    `}_renderMenu(t){const e=this._config.groups??[],i=[...t].sort().join(",");return W`
      <div class="menu-overlay" @click=${()=>this._menuOpen=!1}>
        <div class="menu-card" @click=${t=>t.stopPropagation()}>
          ${t.length>1||e.length>0?W`<div class="menu-section">Groups</div>`:q}
          ${t.length>1?W`
            <button class="menu-item active">
              <span style="display:flex">${Zt}</span>
              <span style="flex:1">${t.map(t=>this._label(t)).join(" + ")}</span>
              <span class="now-pill">NOW</span>
            </button>
          `:q}
          ${e.filter(t=>{const e=t.entities.filter(t=>this._config.entities.includes(t));return[...e].sort().join(",")!==i}).map(t=>W`
              <button class="menu-item" @click=${()=>this._pickGroup(t.entities)}>
                <span style="display:flex">${Zt}</span>
                <span style="flex:1">${t.label}</span>
              </button>
            `)}
          <div class="menu-section">Rooms</div>
          ${this._config.entities.map(e=>{const i=e===this._activeRoom&&1===t.length,s=t.includes(e)&&t.length>1;return W`
              <button class=${wt({"menu-item":!0,active:i})}
                      @click=${()=>this._pickRoom(e)}>
                <span style="display:flex">${Ht}</span>
                <span style="flex:1">${this._label(e)}</span>
                ${s?W`<span class="group-pill">IN GROUP</span>`:q}
              </button>
            `})}
        </div>
      </div>
    `}};Yt.styles=Ct,t([gt({attribute:!1})],Yt.prototype,"hass",void 0),t([vt()],Yt.prototype,"_config",void 0),t([vt()],Yt.prototype,"_view",void 0),t([vt()],Yt.prototype,"_activeRoom",void 0),t([vt()],Yt.prototype,"_menuOpen",void 0),t([vt()],Yt.prototype,"_favTab",void 0),t([vt()],Yt.prototype,"_favQ",void 0),t([vt()],Yt.prototype,"_dragVol",void 0),t([vt()],Yt.prototype,"_optimisticPlaying",void 0),t([vt()],Yt.prototype,"_loadingName",void 0),t([vt()],Yt.prototype,"_skipping",void 0),t([vt()],Yt.prototype,"_now",void 0),Yt=t([ht(kt)],Yt),window.customCards=window.customCards||[],window.customCards.push({type:kt,name:"Wall Panel Sonos Card",description:"Sonos multi-room control designed for wall-mounted tablets.",preview:!1,documentationURL:"https://github.com/your-org/wall-panel-sonos-card"});let Jt=class extends ct{setConfig(t){this._config=t}_val(t,e){this._config={...this._config,[t]:e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}render(){if(!this._config)return W``;const t=this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("media_player.")):[];return W`
      <div class="row">
        <label>Media player entities (one per room)</label>
        <textarea rows="6" @change=${t=>{const e=t.target.value.split("\n").map(t=>t.trim()).filter(Boolean);0!==e.length&&this._val("entities",e)}}>${(this._config.entities??[]).join("\n")}</textarea>
        <div class="help">Available: ${t.slice(0,5).join(", ")}${t.length>5?"…":""}</div>
      </div>
      <div class="row">
        <label>Default view</label>
        <select @change=${t=>this._val("default_view",t.target.value)}>
          ${["player","favorites","grouping"].map(t=>W`
            <option value=${t} ?selected=${this._config.default_view===t}>${t}</option>
          `)}
        </select>
      </div>
      <div class="row">
        <label>Layout</label>
        <select @change=${t=>this._val("layout",t.target.value)}>
          <option value="wall" ?selected=${"wall"===(this._config.layout??"wall")}>wall</option>
          <option value="mobile" ?selected=${"mobile"===this._config.layout}>mobile</option>
        </select>
      </div>
      <div class="row">
        <label>Track text scale (0.9–1.6)</label>
        <input type="number" min="0.9" max="1.6" step="0.05"
          .value=${String(this._config.track_scale??1.15)}
          @change=${t=>this._val("track_scale",parseFloat(t.target.value))}/>
      </div>
      <div class="row">
        <label>Volume bar scale (1.0–2.5)</label>
        <input type="number" min="1" max="2.5" step="0.1"
          .value=${String(this._config.vol_bar_scale??1.4)}
          @change=${t=>this._val("vol_bar_scale",parseFloat(t.target.value))}/>
      </div>
      <div class="row">
        <div class="help">Configure <code>favorites:</code> and <code>groups:</code> in YAML for now — visual editing for those is on the roadmap.</div>
      </div>
    `}};Jt.styles=a`
    .row { display: flex; flex-direction: column; gap: 6px; padding: 8px 0; }
    label { font-size: 12px; color: var(--secondary-text-color); }
    input, select { padding: 8px; border-radius: 6px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); font: inherit; }
    .help { font-size: 11px; color: var(--secondary-text-color); margin-top: 2px; }
  `,t([gt({attribute:!1})],Jt.prototype,"hass",void 0),t([vt()],Jt.prototype,"_config",void 0),Jt=t([ht(At)],Jt);var Xt=Object.freeze({__proto__:null,get WallPanelSonosCardEditor(){return Jt}});export{$t as CARD_VERSION,Yt as WallPanelSonosCard};
