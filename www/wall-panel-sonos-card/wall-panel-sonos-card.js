function t(t,e,i,s){var a,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(o=(r<3?a(o):r>3?a(e,i,o):a(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,v=globalThis,m=v.trustedTypes,_=m?m.emptyScript:"",g=v.reactiveElementPolyfillSupport,f=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const r=a.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const r=this.constructor;if(!1===s&&(a=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??w)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[f("elementProperties")]=new Map,x[f("finalized")]=new Map,g?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,A=$.trustedTypes,T=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,M="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,E=`<${C}>`,R=document,P=()=>R.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,V=Array.isArray,O="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,F=/>/g,I=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,U=/"/g,N=/^(?:script|style|textarea|title)$/i,G=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),D=G(1),B=G(2),W=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),q=new WeakMap,Y=R.createTreeWalker(R,129);function K(t,e){if(!V(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,s=[];let a,r=2===e?"<svg>":3===e?"<math>":"",o=H;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===H?"!--"===l[1]?o=z:void 0!==l[1]?o=F:void 0!==l[2]?(N.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=I):void 0!==l[3]&&(o=I):o===I?">"===l[0]?(o=a??H,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?I:'"'===l[3]?U:j):o===U||o===j?o=I:o===z||o===F?o=H:(o=I,a=void 0);const p=o===I&&t[e+1].startsWith("/>")?" ":"";r+=o===H?i+E:c>=0?(s.push(n),i.slice(0,c)+M+i.slice(c)+S+p):i+S+(-2===c?e:p)}return[K(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0;const o=t.length-1,n=this.parts,[l,c]=Q(t,e);if(this.el=J.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(M)){const e=c[r++],i=s.getAttribute(t).split(S),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?st:"?"===o[1]?at:"@"===o[1]?rt:it}),s.removeAttribute(t)}else t.startsWith(S)&&(n.push({type:6,index:a}),s.removeAttribute(t));if(N.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),Y.nextNode(),n.push({type:2,index:++a});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===C)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)n.push({type:7,index:a}),t+=S.length-1}a++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===W)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=L(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);Y.currentNode=s;let a=Y.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new et(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new ot(a,this,t)),this._$AV.push(e),n=i[++o]}r!==n?.index&&(a=Y.nextNode(),r++)}return Y.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),L(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>V(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new et(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,s){const a=this.strings;let r=!1;if(void 0===a)t=X(this,t,e,0),r=!L(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const s=t;let o,n;for(t=a[0],o=0;o<a.length-1;o++)n=X(this,s[i+o],e,o),n===W&&(n=this._$AH[o]),r||=!L(n)||n!==this._$AH[o],n===Z?t=Z:t!==Z&&(t+=(n??"")+a[o+1]),this._$AH[o]=n}r&&!s&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class rt extends it{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??Z)===W)return;const i=this._$AH,s=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==Z&&(i===Z||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(J,et),($.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;let ct=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new et(e.insertBefore(P(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},ut=(t=ht,e,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function vt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function mt(t){return vt({...t,state:!0,attribute:!1})}const _t=1,gt=t=>(...e)=>({_$litDirective$:t,values:e});let ft=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const bt=gt(class extends ft{constructor(t){if(super(t),t.type!==_t||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return W}}),wt="important",yt=" !"+wt,xt=gt(class extends ft{constructor(t){if(super(t),t.type!==_t||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(yt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?wt:""):i[t]=s}}return W}}),$t="0.3.0",kt="wall-panel-sonos-card",At="wall-panel-sonos-card-editor";console.info(`%c WALL-PANEL-SONOS-CARD %c v${$t} `,"color:#1a1c1f;background:#8EB1BF;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px","color:#fff;background:#3a3d42;padding:2px 6px;border-radius:0 4px 4px 0");const Tt=o`
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
    /* Shadows. Card + cover fall back to the HA theme's --ha-card-box-shadow
       so a theme with a distinctive elevation shows through; the pixel
       defaults keep the current look when no theme sets it. */
    --wp-shadow-card: var(--ha-card-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.18));
    --wp-shadow-cover: var(--ha-card-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.35));
    --wp-shadow-play: 0 4px 16px rgba(0, 0, 0, 0.25);
    --wp-shadow-menu: 0 16px 40px rgba(0, 0, 0, 0.5);
    /* Radii. Outer card follows the HA theme's --ha-card-border-radius;
       interior tiles derive from two smaller stops. Themes wanting a
       consistent rounded-rectangle language can override any of these
       independently. Pill (999px) and round (50%) shapes stay hard-coded
       — those are structural, not decorative. */
    --wp-radius: var(--ha-card-border-radius, 28px);
    --wp-radius-tile: 18px;
    --wp-radius-tile-sm: 12px;
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

  /* HEADER
     Grid with 1fr/auto/1fr guarantees the title stays dead-centered
     regardless of how many buttons sit on either side. With plain flex
     + space-between the title floated toward whichever side had fewer
     buttons — visible whenever the sides hold different button counts. */
  .hdr {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 10px;
    padding: 14px 18px 12px;
    flex-shrink: 0;
  }
  .hdr-side {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hdr-side.right { justify-content: flex-end; }
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
    border-radius: var(--wp-radius-tile-sm);
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

  /* TOAST — service-call failure banner. Auto-clears after 5s.
     Kept inline in the .root flex flow so it pushes the view down
     rather than covering the header. */
  .toast {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 22px 8px;
    padding: 10px 14px;
    background: var(--error-color, #cf6679);
    color: var(--wp-bg);
    border-radius: var(--wp-radius-tile-sm);
    font-size: 13px;
    animation: toast-in 0.15s ease-out;
  }
  .toast-msg { flex: 1; min-width: 0; }
  .toast-x {
    background: none;
    border: 0;
    color: inherit;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    padding: 0 4px;
    opacity: 0.75;
  }
  .toast-x:hover { opacity: 1; }
  @keyframes toast-in {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
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
    border-radius: var(--wp-radius-tile);
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
  /* The volume icon doubles as the mute toggle. */
  .mute-btn {
    background: none;
    border: 0;
    color: var(--wp-text);
    cursor: pointer;
    padding: 6px;
    margin: -6px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
  }
  /* Dim the whole volume row while muted so the state is readable at
     a glance from across the room. */
  .vol-row.muted .slider,
  .vol-row.muted .vol-num {
    opacity: 0.35;
  }
  .vol-row.muted .mute-btn {
    color: var(--wp-accent);
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
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .fav-refresh {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.08);
    border: 0;
    color: var(--wp-text);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fav-notice {
    font-size: 13px;
    color: var(--wp-text-dim);
    background: rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 10px 12px;
    margin-bottom: 10px;
  }
  .fav-notice b { color: var(--wp-accent); }
  .fav-notice code { font-size: 12px; }
  .fav-empty {
    text-align: center;
    color: var(--wp-text-dim);
    padding: 40px 20px;
    font-size: 15px;
  }
  .fav-empty.error { color: var(--error-color, #cf6679); }
  .fav-svc-head {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--wp-text-dim);
    padding: 12px 4px 4px;
  }
  .fav-svc-head:first-child { padding-top: 0; }
  .fav-text {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  .fav-text .fav-label { flex: none; width: 100%; text-align: left; }
  .fav-sub {
    font-size: 12px;
    color: var(--wp-text-dim);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  .fav-item[disabled] { opacity: 0.5; cursor: default; }
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
    border-radius: var(--wp-radius-tile-sm);
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
    border-radius: var(--wp-radius-tile-sm);
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
  /* Optimistic state: tap registered, join/unjoin still in flight.
     Gentle pulse tells the user the change is being applied. */
  .grp-row.pending {
    animation: grp-pending 1s ease-in-out infinite;
  }
  @keyframes grp-pending {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
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
    border-radius: var(--wp-radius-tile);
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
    border-radius: var(--wp-radius-tile);
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
    border-radius: var(--wp-radius-tile-sm);
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

  /* ACCESSIBILITY — keyboard focus. :focus-visible only fires for
     keyboard/switch navigation, so touch and mouse users never see the
     ring. Applies to every interactive surface including the custom
     sliders (which are focusable via tabindex). */
  button:focus-visible,
  .slider:focus-visible {
    outline: 2px solid var(--wp-accent);
    outline-offset: 2px;
  }
`,Mt=(t,e)=>t.callService("media_player","media_play_pause",{entity_id:e}),St=(t,e)=>t.callService("media_player","media_next_track",{entity_id:e}),Ct=(t,e,i)=>t.callService("media_player","volume_set",{entity_id:e,volume_level:Math.max(0,Math.min(1,i/100))}),Et=(t,e,i)=>t.callService("media_player","join",{entity_id:e,group_members:i}),Rt=(t,e)=>t.callService("media_player","unjoin",{entity_id:e}),Pt=(t,e,i,s)=>t.callService("media_player","play_media",{entity_id:e,media_content_id:i,media_content_type:s}),Lt=(t,e,i,s)=>t.callWS({type:"media_player/browse_media",entity_id:e,...i?{media_content_id:i}:{},...s?{media_content_type:s}:{}}),Vt=async(t,e,i,s=!0,a=500)=>{const r=await t.callWS({type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:e,media_type:i,favorite:s,limit:a,order_by:"name"},return_response:!0}),o=r?.response??r;if(Array.isArray(o))return o;if(Array.isArray(o?.items))return o.items;for(const t of Object.values(o??{}))if(Array.isArray(t))return t;return[]},Ot=t=>`url("${t.replace(/[\r\n"\\]/g,t=>encodeURIComponent(t))}")`,Ht=B`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L14.6 8.6 L22 9.3 L16.5 14.2 L18.2 21.5 L12 17.8 L5.8 21.5 L7.5 14.2 L2 9.3 L9.4 8.6 Z"/></svg>`,zt=B`<svg width="20" height="22" viewBox="0 0 22 26" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="2" width="16" height="22" rx="3"/><circle cx="11" cy="16" r="4"/><circle cx="11" cy="7" r="1.3" fill="currentColor"/></svg>`,Ft=B`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9 L12 15 L18 9"/></svg>`,It=B`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9V15H7L12 20V4L7 9H3M14 10.5H23V13.5H14V10.5Z"/></svg>`,jt=B`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9V15H7L12 20V4L7 9H3M14 13.5V10.5H17V7.5H20V10.5H23V13.5H20V16.5H17V13.5H14Z"/></svg>`,Ut=B`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3 9H7L12 4V20L7 15H3V9Z"/></svg>`,Nt=B`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5 H8 V19 H6 Z M9 12 L20 5 V19 Z"/></svg>`,Gt=B`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5 H18 V19 H16 Z M4 19 L15 12 L4 5 Z"/></svg>`,Dt=B`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5 V19 L19 12 Z"/></svg>`,Bt=B`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>`,Wt=B`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7 H21 V19 H3 Z M3 7 L17 3 V5"/><circle cx="17" cy="13" r="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,Zt=B`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.2"/></svg>`,qt=B`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6 H15 V8 H3 Z M3 11 H15 V13 H3 Z M3 16 H11 V18 H3 Z M17 11 V20 L21 17 V8 L17 11 Z"/></svg>`,Yt=B`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17 H7 A4 4 0 0 1 7 9 H9 M15 9 H17 A4 4 0 0 1 17 17 H15 M9 13 H15"/></svg>`,Kt=B`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 L10 18 L20 6"/></svg>`,Qt=B`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 18 H4 V20 H2 Z M7 14 H9 V20 H7 Z M12 10 H14 V20 H12 Z M17 6 H19 V20 H17 Z"/></svg>`,Jt=B`<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M3 9V15H7L12 20V4L7 9H3"/><path stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none" d="M15.5 9.5 L21 15 M21 9.5 L15.5 15"/></svg>`,Xt="wall-panel-sonos-mini-card";let te=class extends ct{setConfig(t){if(!t.entities?.length)throw new Error("wall-panel-sonos-mini-card: 'entities' is required.");this._config=t}getCardSize(){return 2}shouldUpdate(t){if(t.size>1||!t.has("hass"))return!0;if(!this._config)return!0;const e=t.get("hass");if(!e)return!0;for(const t of this._config.entities)if(e.states[t]!==this.hass.states[t])return!0;return!1}_state(t){return this.hass?.states[t]}_label(t){return this._config.names?.[t]??this._state(t)?.attributes.friendly_name??t.replace("media_player.","").replace(/_/g," ")}_activeEntity(){return this._config.entities.find(t=>"playing"===this._state(t)?.state)??this._config.entities.find(t=>["paused","buffering"].includes(this._state(t)?.state??""))}_coordinatorMeta(t,e){if(e)for(const i of e){if(i===t)continue;const e=this._state(i)?.attributes;if(e&&(e.media_title||e.entity_picture))return e}}_stationArt(t){if(!t||!this._config.station_art?.length)return;const e=t.toLowerCase();return this._config.station_art.find(t=>t.match&&e.includes(t.match.toLowerCase()))}_sourceFromContentId(t){if(!t)return;const e=t.match(/[?&]source=([^&]+)/i);return e?decodeURIComponent(e[1]):void 0}_navigate(){const t=this._config.navigation_path;t&&(history.pushState(null,"",t),this.dispatchEvent(new Event("location-changed",{composed:!0})))}render(){if(!this.hass||!this._config)return D``;const t=this._activeEntity();if(!t)return D``;const e=this._state(t),i=e.attributes,s=i.media_title||i.entity_picture?i:this._coordinatorMeta(t,i.group_members)??i,a=s.media_content_id??i.media_content_id,r=this._stationArt(a),o="playing"===e.state,n=Math.round(100*(i.volume_level??0)),l=this._config.volume_step??5,c=r?.image?Ot(r.image):s.entity_picture?Ot(s.entity_picture):"linear-gradient(135deg, #6a4ec8 0%, #1e3a6e 60%, #0a1428 100%)",d=s.media_title??r?.name??s.app_name??i.app_name??this._sourceFromContentId(a)??(o?"Playing":"—"),p=i.group_members?.length??1,h=`${this._label(t)}${p>1?" +"+(p-1):""}`;return D`
      <ha-card>
        <div class="root">
          <div class="hdr">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18 V5 L20 3 V16 M9 18 A2.5 2.5 0 1 1 6.5 15.5 A2.5 2.5 0 0 1 9 18 M20 16 A2.5 2.5 0 1 1 17.5 13.5 A2.5 2.5 0 0 1 20 16"/></svg>
            <div class="hdr-title">Now Playing</div>
            <div class="hdr-rule"></div>
            <button class="room" @click=${this._navigate} aria-label="Open full player for ${h}">
              ${h}${Ft}
            </button>
          </div>
          <div class="body">
            <button class="nav" @click=${this._navigate} aria-label="Open full player">
              <div class="art" style=${xt({background:c})}></div>
              <div class="meta">
                <div class="title">${d}</div>
                <div class="artist">${s.media_artist??""}</div>
              </div>
            </button>
            <div class="ctrls">
              <button class="btn" aria-label="Volume down"
                @click=${()=>Ct(this.hass,t,Math.max(0,n-l))}>${It}</button>
              <button class="btn primary" aria-label=${o?"Pause":"Play"}
                @click=${()=>Mt(this.hass,t)}>
                ${o?Bt:Dt}
              </button>
              <button class="btn" aria-label="Volume up"
                @click=${()=>Ct(this.hass,t,Math.min(100,n+l))}>${jt}</button>
              <button class="btn" aria-label="Next track"
                @click=${()=>St(this.hass,t)}>${Gt}</button>
            </div>
          </div>
        </div>
      </ha-card>
    `}};var ee;te.styles=o`
    :host {
      --wp-text: #ffffff;
      --wp-text-dim: rgba(255, 255, 255, 0.65);
      --wp-bg: #1a1c1f;
      --wp-card: #3a3d42;
      --wp-divider: rgba(255, 255, 255, 0.1);
      --wp-btn-bg: rgba(255, 255, 255, 0.08);
      /* Match the full card's theme hooks: outer radius + shadow follow
         HA theme vars, with the previous pixel values as fallback. */
      --wp-radius: var(--ha-card-border-radius, 28px);
      --wp-radius-tile-sm: 10px;
      --wp-shadow: var(--ha-card-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.18));
      display: block;
    }
    .root {
      background: var(--wp-card);
      color: var(--wp-text);
      border-radius: var(--wp-radius);
      padding: 14px;
      font-family: var(--ha-card-header-font-family, sans-serif);
      box-shadow: var(--wp-shadow);
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
      border-radius: var(--wp-radius-tile-sm);
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
    button:focus-visible {
      outline: 2px solid var(--primary-color, #8eb1bf);
      outline-offset: 2px;
    }
  `,t([vt({attribute:!1})],te.prototype,"hass",void 0),t([mt()],te.prototype,"_config",void 0),te=t([pt(Xt)],te),window.customCards=window.customCards||[],window.customCards.push({type:Xt,name:"Wall Panel Sonos Mini Card",description:"Compact now-playing tile — pairs with wall-panel-sonos-card.",preview:!1});const ie={spotify:"Spotify",tidal:"Tidal",qobuz:"Qobuz",deezer:"Deezer",apple_music:"Apple Music",ytmusic:"YouTube Music",soundcloud:"SoundCloud",tunein:"TuneIn",radiobrowser:"Radio",plex:"Plex",jellyfin:"Jellyfin",subsonic:"Subsonic",filesystem_local:"Local Library",filesystem_smb:"Local Library",builtin:"Local Library",library:"Library"},se=t=>ie[t]??t.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()),ae=t=>{(!isFinite(t)||t<0)&&(t=0);return`${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,"0")}`};let re=ee=class extends ct{constructor(){super(...arguments),this._view="player",this._activeRoom="",this._userPickedRoom=!1,this._menuOpen=!1,this._favTab="All",this._favQ="",this._maFavs=null,this._maFavsLoading=!1,this._maFavsError=null,this._maSvc="All",this._maFavsFetchedAt=0,this._dragVol={},this._optimisticPlaying=null,this._optimisticMuted=null,this._pendingGroup={},this._pendingGroupTimers={},this._loadingName=null,this._skipping=!1,this._toast=null,this._now=Date.now(),this._dragTimers={}}static getStubConfig(){return{type:`custom:${kt}`,entities:[],default_view:"player",layout:"wall"}}static async getConfigElement(){return await Promise.resolve().then(function(){return ne}),document.createElement(At)}setConfig(t){if(!t.entities||!Array.isArray(t.entities)||0===t.entities.length)throw new Error("wall-panel-sonos-card: 'entities' is required and must be a non-empty list of media_player entity IDs.");const e=!this._config;this._config=t,this._activeRoom&&t.entities.includes(this._activeRoom)||(this._activeRoom=t.entities[0]),e&&t.default_view&&(this._view=t.default_view);const i=Math.max(.9,Math.min(1.6,t.track_scale??1.15)),s=Math.max(1,Math.min(2.5,t.vol_bar_scale??1.4));this.style.setProperty("--wp-track-scale",String(i)),this.style.setProperty("--wp-vol-scale",String(s)),"mobile"===t.layout?this.setAttribute("narrow",""):this.removeAttribute("narrow")}getCardSize(){return 8}connectedCallback(){super.connectedCallback(),this._tickHandle=setInterval(()=>{if("visible"!==document.visibilityState)return;if("player"!==this._view)return;const t=this._state(this._activeRoom);"playing"===t?.state&&(this._now=Date.now())},500)}disconnectedCallback(){super.disconnectedCallback(),this._tickHandle&&clearInterval(this._tickHandle),this._loadingTimer&&clearTimeout(this._loadingTimer),this._skipTimer&&clearTimeout(this._skipTimer),this._optimisticPlayingTimer&&clearTimeout(this._optimisticPlayingTimer),this._toastTimer&&clearTimeout(this._toastTimer),this._optimisticMutedTimer&&clearTimeout(this._optimisticMutedTimer);for(const t of Object.values(this._pendingGroupTimers))clearTimeout(t);this._pendingGroupTimers={};for(const t of Object.values(this._dragTimers))clearTimeout(t);this._dragTimers={}}_instant(t){return e=>{const i=e.currentTarget;if("pointerdown"===e.type){const s=e;if("mouse"===s.pointerType&&0!==s.button)return;i._wpPressed=!0,setTimeout(()=>{i._wpPressed=!1},400),t()}else i._wpPressed?i._wpPressed=!1:t()}}_svc(t,e){return t.catch(t=>{const i=t instanceof Error?t.message:String(t);this._showToast(`${e} — ${i}`)})}_showToast(t){this._toast={message:t,kind:"error"},this._toastTimer&&clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>{this._toast=null},5e3)}shouldUpdate(t){if(t.size>1||!t.has("hass"))return!0;if(!this._config)return!0;const e=t.get("hass");if(!e)return!0;for(const t of this._config.entities)if(e.states[t]!==this.hass.states[t])return!0;return!1}willUpdate(t){if(!t.has("hass")||!this._config)return;if(!this._userPickedRoom){const t=this._pickActivePlayer();t&&(t!==this._activeRoom&&(this._activeRoom=t),this._userPickedRoom=!0)}if(null!==this._optimisticPlaying){"playing"===this._state(this._activeRoom)?.state===this._optimisticPlaying&&(this._optimisticPlaying=null,this._optimisticPlayingTimer&&(clearTimeout(this._optimisticPlayingTimer),this._optimisticPlayingTimer=void 0))}if(null!==this._optimisticMuted){!!this._state(this._activeRoom)?.attributes.is_volume_muted===this._optimisticMuted&&(this._optimisticMuted=null,this._optimisticMutedTimer&&(clearTimeout(this._optimisticMutedTimer),this._optimisticMutedTimer=void 0))}if(Object.keys(this._pendingGroup).length){const t=this._state(this._activeRoom)?.attributes.group_members??[this._activeRoom];let e=null;for(const[i,s]of Object.entries(this._pendingGroup))t.includes(i)===s&&(e||(e={...this._pendingGroup}),delete e[i],this._pendingGroupTimers[i]&&(clearTimeout(this._pendingGroupTimers[i]),delete this._pendingGroupTimers[i]));e&&(this._pendingGroup=e)}if(null!==this._loadingName){const t=this._state(this._activeRoom)?.attributes.media_title;t&&t!==this._prevTitle&&(this._loadingName=null,this._loadingTimer&&(clearTimeout(this._loadingTimer),this._loadingTimer=void 0))}if(this._skipping){const t=this._state(this._activeRoom)?.attributes.media_title;t&&t!==this._prevTitle&&(this._skipping=!1,this._skipTimer&&(clearTimeout(this._skipTimer),this._skipTimer=void 0))}let e=null;for(const t of Object.keys(this._dragVol)){if(!this._dragTimers[t])continue;const i=t===this._activeRoom?this._groupAvgVol():Math.round(100*(this._state(t)?.attributes.volume_level??0));Math.abs(i-this._dragVol[t])<=2&&(e||(e={...this._dragVol}),delete e[t],clearTimeout(this._dragTimers[t]),delete this._dragTimers[t])}e&&(this._dragVol=e),"favorites"===this._view&&this._maybeFetchMaFavorites()}_state(t){return this.hass?.states[t]}_label(t){return this._config?.names?.[t]??this._state(t)?.attributes.friendly_name??t.replace("media_player.","").replace(/_/g," ")}_groupMembers(){const t=this._state(this._activeRoom);return(t?.attributes.group_members??[this._activeRoom]).filter(t=>this._config.entities.includes(t))}_coordinatorMeta(t){if(t)for(const e of t){if(e===this._activeRoom)continue;const t=this._state(e)?.attributes;if(t&&(t.media_title||t.entity_picture))return t}}_stationArt(t){const e=this._config.station_art??[];if(!t||!e.length)return;const i=t.toLowerCase();return e.find(t=>t.match&&i.includes(t.match.toLowerCase()))}_sourceFromContentId(t){if(!t)return;const e=t.match(/[?&]source=([^&]+)/i);return e?decodeURIComponent(e[1]):void 0}_pickActivePlayer(){const t=this._config.entities;let e=null;for(let i=0;i<t.length;i++){const s=t[i],a=this._state(s);if("playing"!==a?.state)continue;const r=(a.attributes.group_members??[s]).filter(e=>t.includes(e)).length;(!e||r>e.size||r===e.size&&i<e.idx)&&(e={id:s,size:r,idx:i})}return e?.id??null}_setView(t){this._view=this._view===t&&"player"!==t?"player":t,this._menuOpen=!1,"favorites"===this._view&&this._maybeFetchMaFavorites()}_onTitleClick(){"player"!==this._view?this._view="player":this._menuOpen=!this._menuOpen}_pickRoom(t){const e=this._groupMembers();this._activeRoom=t,this._userPickedRoom=!0,this._menuOpen=!1,this._optimisticMuted=null,this._optimisticPlaying=null,e.includes(t)||this._svc(Rt(this.hass,t),`Couldn't ungroup ${this._label(t)}`)}_pickGroup(t){if(0===t.length)return;const e=t[0];this._activeRoom=e,this._userPickedRoom=!0,this._menuOpen=!1,this._optimisticMuted=null,this._optimisticPlaying=null,this._svc(Et(this.hass,e,t.slice(1)),`Couldn't create group "${this._label(e)}"`)}_onPlayPause(t){this._optimisticPlaying=!t,this._optimisticPlayingTimer&&clearTimeout(this._optimisticPlayingTimer),this._optimisticPlayingTimer=setTimeout(()=>{this._optimisticPlaying=null},5e3),this._svc(Mt(this.hass,this._activeRoom),`Couldn't ${t?"pause":"resume"} ${this._label(this._activeRoom)}`)}_onSkip(t){this._prevTitle=this._state(this._activeRoom)?.attributes.media_title,this._skipping=!0,this._skipTimer&&clearTimeout(this._skipTimer),this._skipTimer=setTimeout(()=>{this._skipping=!1},5e3);const e="next"===t?St(this.hass,this._activeRoom):(i=this.hass,s=this._activeRoom,i.callService("media_player","media_previous_track",{entity_id:s}));var i,s;this._svc(e,"Couldn't skip "+("next"===t?"forward":"back"))}_toggleInGroup(t){if(t===this._activeRoom)return;const e=this._groupMembers(),i=!e.includes(t);this._pendingGroup={...this._pendingGroup,[t]:i},this._pendingGroupTimers[t]&&clearTimeout(this._pendingGroupTimers[t]),this._pendingGroupTimers[t]=setTimeout(()=>{if(delete this._pendingGroupTimers[t],t in this._pendingGroup){const e={...this._pendingGroup};delete e[t],this._pendingGroup=e}},6e3),i?this._svc(Et(this.hass,this._activeRoom,[...e.filter(t=>t!==this._activeRoom),t]),`Couldn't add ${this._label(t)} to the group`):this._svc(Rt(this.hass,t),`Couldn't remove ${this._label(t)} from the group`)}_onMuteToggle(){const t=this._optimisticMuted??!!this._state(this._activeRoom)?.attributes.is_volume_muted;var e,i,s;this._optimisticMuted=!t,this._optimisticMutedTimer&&clearTimeout(this._optimisticMutedTimer),this._optimisticMutedTimer=setTimeout(()=>{this._optimisticMuted=null},5e3),this._svc((e=this.hass,i=this._activeRoom,s=t,e.callService("media_player","volume_mute",{entity_id:i,is_volume_muted:!s})),`Couldn't ${t?"unmute":"mute"} ${this._label(this._activeRoom)}`)}_slide(t,e,i,s){const a=t.currentTarget;s&&this._dragTimers[s]&&(clearTimeout(this._dragTimers[s]),delete this._dragTimers[s]);let r=0,o=null,n=null;const l=t=>{r=Date.now(),o=null,n&&(clearTimeout(n),n=null),i(t)},c=t=>{const i=a.getBoundingClientRect(),c=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width)),d=Math.round(c*e);s&&(this._dragVol={...this._dragVol,[s]:d});const p=Date.now()-r;p>=120?l(d):(o=d,n||(n=setTimeout(()=>{n=null,null!==o&&l(o)},120-p)))};try{a.setPointerCapture(t.pointerId)}catch{}c(t);const d=t=>c(t),p=()=>{a.removeEventListener("pointermove",d),a.removeEventListener("pointerup",p),a.removeEventListener("pointercancel",p);try{a.releasePointerCapture(t.pointerId)}catch{}null!==o&&l(o),n&&(clearTimeout(n),n=null),s&&(this._dragTimers[s]=setTimeout(()=>{if(delete this._dragTimers[s],s in this._dragVol){const t={...this._dragVol};delete t[s],this._dragVol=t}},2e3))};a.addEventListener("pointermove",d),a.addEventListener("pointerup",p),a.addEventListener("pointercancel",p)}render(){if(!this._config||!this.hass)return D``;const t=this._state(this._activeRoom);if(!t)return D`<ha-card><div style="padding:24px;color:var(--wp-text-dim)">Entity ${this._activeRoom} not found.</div></ha-card>`;const e=this._groupMembers(),i=e.length,s="favorites"===this._view?"Favorites":"grouping"===this._view?"Speakers":this._label(this._activeRoom);return D`
      <ha-card>
        <div class="root">
          ${this._renderHeader(s,i)}
          ${this._toast?D`
            <div class="toast ${this._toast.kind}" role="alert">
              <span class="toast-msg">${this._toast.message}</span>
              <button class="toast-x" aria-label="Dismiss"
                @click=${()=>{this._toast=null,this._toastTimer&&clearTimeout(this._toastTimer)}}>×</button>
            </div>
          `:Z}
          ${"player"===this._view?this._renderPlayer(t):Z}
          ${"favorites"===this._view?this._renderFavorites():Z}
          ${"grouping"===this._view?this._renderGrouping(e):Z}
          ${this._menuOpen?this._renderMenu(e):Z}
        </div>
      </ha-card>
    `}_renderHeader(t,e){return D`
      <div class="hdr">
        <div class="hdr-side left">
          <button class=${bt({"hdr-btn":!0,active:"favorites"===this._view})}
                  @click=${()=>this._setView("favorites")}
                  aria-label="Favorites" aria-pressed=${"favorites"===this._view}>
            ${Ht}
          </button>
        </div>
        <button class=${bt({"hdr-title":!0,"menu-open":this._menuOpen})}
                @click=${this._onTitleClick}>
          <span>${t}</span>
          ${"player"===this._view&&e>1?D`<span class="group-pill">+${e-1}</span>`:Z}
          ${"player"===this._view?D`<span class=${bt({chev:!0,up:this._menuOpen})}>${Ft}</span>`:Z}
        </button>
        <div class="hdr-side right">
          <button class=${bt({"hdr-btn":!0,active:"grouping"===this._view})}
                  @click=${()=>this._setView("grouping")}
                  aria-label="Speakers" aria-pressed=${"grouping"===this._view}>
            ${zt}
          </button>
        </div>
      </div>
    `}_renderPlayer(t){const e=t.attributes,i=e.media_title||e.entity_picture?e:this._coordinatorMeta(e.group_members)??e,s=i.media_duration??0,a=this._optimisticPlaying??"playing"===t.state,r=this._optimisticMuted??!!e.is_volume_muted,o=this._groupAvgVol(),n=this._activeRoom,l=this._maxVol(),c=this._volStep(l),d=n in this._dragVol?this._dragVol[n]:o,p=i.media_position_updated_at?new Date(i.media_position_updated_at).getTime():0,h="playing"===t.state&&p?Math.max(0,(this._now-p)/1e3):0,u=(i.media_position??0)+h,v=s>0?Math.min(s,u):u,m=i.media_content_id??e.media_content_id,_=this._stationArt(m),g=_?.image?Ot(_.image):i.entity_picture?Ot(i.entity_picture):"linear-gradient(135deg, var(--wp-accent) 0%, var(--wp-card-2) 60%, var(--wp-bg) 100%)",f="playing"===t.state,b=this._loadingName??i.media_title??_?.name??(f?i.app_name??e.app_name??"Playing":"Nothing playing"),w=this._loadingName||this._skipping?"Loading…":`${i.media_artist??""}${i.media_album_name?` · ${i.media_album_name}`:""}`,y=e.source??this._sourceFromContentId(m);return D`
      <div class="pv">
        <div class="src">
          ${y?D`<span class="src-dot"></span>${y}`:Z}
        </div>
        <div class="cover-wrap">
          <div class="cover" style=${xt({backgroundImage:g})}></div>
        </div>
        <div class="meta">
          <div class="track">${b}</div>
          <div class="sub">${w}</div>
        </div>
        <div class="progress">
          <span>${ae(v)}</span>
          <div class="bar"><span style=${xt({width:(s>0?v/s*100:0)+"%"})}></span></div>
          <span>${ae(s)}</span>
        </div>
        <div class="transport">
          ${(()=>{const t=this._instant(()=>this._stepVol(-c,l)),e=this._instant(()=>this._onSkip("prev")),i=this._instant(()=>this._onPlayPause(a)),s=this._instant(()=>this._onSkip("next")),r=this._instant(()=>this._stepVol(c,l));return D`
              <button class="t-btn" aria-label="Volume down"
                @pointerdown=${t} @click=${t}>${It}</button>
              <button class="t-btn" aria-label="Previous track"
                @pointerdown=${e} @click=${e}>${Nt}</button>
              <button class="play-btn" aria-label=${a?"Pause":"Play"}
                @pointerdown=${i} @click=${i}>
                ${a?Bt:Dt}
              </button>
              <button class="t-btn" aria-label="Next track"
                @pointerdown=${s} @click=${s}>${Gt}</button>
              <button class="t-btn" aria-label="Volume up"
                @pointerdown=${r} @click=${r}>${jt}</button>
            `})()}
        </div>
        <div class=${bt({"vol-row":!0,muted:r})}>
          ${(()=>{const t=this._instant(()=>this._onMuteToggle());return D`
              <button class="vol-icon mute-btn"
                aria-label=${r?"Unmute":"Mute"} aria-pressed=${r}
                @pointerdown=${t} @click=${t}>
                ${r?Jt:Ut}
              </button>
            `})()}
          ${this._slider(d,l,t=>this._setGroupVolume(t),this._activeRoom,`Volume for ${this._label(this._activeRoom)}`)}
          <span class="vol-num">${d}</span>
        </div>
      </div>
    `}_maxVol(){const t=this._config?.max_volume??100;return Math.max(1,Math.min(100,Math.round(t)))}_volStep(t){return Math.max(1,Math.round(t/20))}_groupAvgVol(){const t=this._groupMembers();if(t.length<=1)return Math.round(100*(this._state(this._activeRoom)?.attributes.volume_level??0));const e=t.reduce((t,e)=>t+(this._state(e)?.attributes.volume_level??0),0);return Math.round(e/t.length*100)}_setGroupVolume(t){const e=this._groupMembers();if(e.length<=1)return void this._svc(Ct(this.hass,this._activeRoom,t),`Couldn't set volume for ${this._label(this._activeRoom)}`);const i=t-this._groupAvgVol();if(0!==i)for(const t of e){const e=Math.round(100*(this._state(t)?.attributes.volume_level??0));this._svc(Ct(this.hass,t,Math.max(0,Math.min(100,e+i))),`Couldn't set volume for ${this._label(t)}`)}}_stepVol(t,e){const i=this._activeRoom,s=i in this._dragVol?this._dragVol[i]:this._groupAvgVol(),a=Math.max(0,Math.min(e,s+t));a!==s&&(this._dragVol={...this._dragVol,[i]:a},this._dragTimers[i]&&clearTimeout(this._dragTimers[i]),this._dragTimers[i]=setTimeout(()=>{if(delete this._dragTimers[i],i in this._dragVol){const t={...this._dragVol};delete t[i],this._dragVol=t}},2e3),this._setGroupVolume(a))}_slider(t,e,i,s,a="Volume"){const r=s&&s in this._dragVol?this._dragVol[s]:t,o=e>0?Math.max(0,Math.min(100,r/e*100)):0;return D`
      <div class="slider" role="slider" tabindex="0"
        aria-label=${a}
        aria-valuemin="0" aria-valuemax=${e} aria-valuenow=${r}
        @pointerdown=${t=>this._slide(t,e,i,s)}
        @keydown=${t=>this._sliderKeydown(t,r,e,i,s)}>
        <div class="fill" style=${xt({width:`${o}%`})}></div>
        <div class="knob" style=${xt({left:`${o}%`})}></div>
      </div>
    `}_sliderKeydown(t,e,i,s,a){const r=this._volStep(i);let o=null;switch(t.key){case"ArrowRight":case"ArrowUp":o=Math.min(i,e+r);break;case"ArrowLeft":case"ArrowDown":o=Math.max(0,e-r);break;case"Home":o=0;break;case"End":o=i;break;default:return}t.preventDefault(),o!==e&&(a&&(this._dragVol={...this._dragVol,[a]:o},this._dragTimers[a]&&clearTimeout(this._dragTimers[a]),this._dragTimers[a]=setTimeout(()=>{if(delete this._dragTimers[a],a in this._dragVol){const t={...this._dragVol};delete t[a],this._dragVol=t}},2e3)),s(o))}_renderFavorites(){if("music_assistant"===this._config.favorites_source)return this._renderMaFavorites();this._config.favorites;const t=this._groupMembers().length,e="Playlists"===this._favTab?"playlist":"Stations"===this._favTab?"station":"Albums"===this._favTab?"album":null,i=(this._config.favorites??[]).filter(t=>(!e||t.type===e)&&!(this._favQ&&!t.name.toLowerCase().includes(this._favQ.toLowerCase())));return D`
      <div class="pv pv-scroll">
        <div class="fav-target">
          Play to <b>${this._label(this._activeRoom)}${t>1?" +"+(t-1):""}</b>
        </div>
        <div class="tabs" role="tablist" aria-label="Favorite categories">
          ${["All","Playlists","Stations","Albums"].map(t=>D`
            <button class=${bt({tab:!0,active:this._favTab===t})}
                    role="tab" aria-selected=${this._favTab===t}
                    @click=${()=>this._favTab=t}>${t}</button>
          `)}
        </div>
        <div class="fav-list">
          ${0===i.length?D`<div class="fav-empty">No favorites configured</div>`:i.map(t=>D`
              <button class="fav-item" @click=${()=>this._playFavorite(t)}>
                <span class="fav-art" style=${xt({background:t.art??"linear-gradient(135deg,#4a5d72,#2a3540)"})}>
                  ${"station"===t.type?Wt:"album"===t.type?Zt:qt}
                </span>
                <span class="fav-label">${t.name}</span>
              </button>
            `)}
        </div>
      </div>
    `}_maEntity(t){const e=this._config.ma_entities?.[t];if(e)return e;const i=this._state(t)?.attributes.friendly_name;if(!i)return;const s=this.hass.entities??{};for(const[e,a]of Object.entries(s))if("music_assistant"===a.platform&&e.startsWith("media_player.")&&e!==t&&this._state(e)?.attributes.friendly_name===i)return e}_anyMaEntity(){return this._maEntity(this._activeRoom)??this._config.entities.map(t=>this._maEntity(t)).find(Boolean)}_maybeFetchMaFavorites(t=!1){if("music_assistant"!==this._config?.favorites_source)return;if(this._maFavsLoading)return;const e=Date.now()-this._maFavsFetchedAt<ee.MA_FAVS_TTL_MS;!t&&e&&(this._maFavs||this._maFavsError)||this._fetchMaFavorites()}async _fetchMaFavorites(){this._maFavsLoading=!0,this._maFavsError=null;try{let t;try{t=await this._fetchMaViaLibrary()}catch{t=await this._fetchMaViaBrowse()}const e={playlist:0,album:1,station:2};t.sort((t,i)=>t.service.localeCompare(i.service)||e[t.category]-e[i.category]||t.title.localeCompare(i.title)),this._maFavs=t,"All"===this._maSvc||t.some(t=>t.service===this._maSvc)||(this._maSvc="All")}catch(t){this._maFavsError=`Couldn't load the Music Assistant library: ${t instanceof Error?t.message:t}`}finally{this._maFavsFetchedAt=Date.now(),this._maFavsLoading=!1}}async _fetchMaViaLibrary(){const t=await(async t=>{const e=await t.callWS({type:"config_entries/get",domain:"music_assistant"}),i=e?.[0];if(!i)throw new Error("Music Assistant integration not found");return i.entry_id})(this.hass),e=[["playlist","playlist"],["album","album"],["radio","station"]],i=[];for(const[s,a]of e){const e=await Vt(this.hass,t,s,!0);for(const t of e){const e=this._maLibraryItemToFavorite(t,a);e&&i.push(e)}}return i}_maLibraryItemToFavorite(t,e){if("string"!=typeof t.uri||"string"!=typeof t.name)return null;const i=(s=t.uri,s?.match(/^([a-z0-9_]+):\/\//i)?.[1]?.toLowerCase());var s;const a=(i&&"library"!==i?i:void 0)??(t.provider&&"library"!==t.provider?t.provider:void 0)??t.provider_mappings?.find(t=>t.provider_domain)?.provider_domain??"library",r="string"==typeof t.image?t.image:"string"==typeof t.image?.path?t.image.path:void 0;return{title:t.name,media_content_id:t.uri,media_content_type:t.media_type??e,thumbnail:r&&/^https?:\/\//i.test(r)?r:void 0,category:e,service:se(a)}}async _fetchMaViaBrowse(){const t=this._anyMaEntity();if(!t)throw new Error("no Music Assistant player found");const e=await Lt(this.hass,t),i=[[/playlist/i,"playlist"],[/radio|station/i,"station"],[/album/i,"album"]],s=[];for(const a of e.children??[]){const e=i.find(([t])=>t.test(a.title)||t.test(a.media_content_id??""));if(!e||!a.can_expand)continue;const r=await Lt(this.hass,t,a.media_content_id,a.media_content_type);for(const t of r.children??[])t.can_play&&t.media_content_id&&s.push({title:t.title,media_content_id:t.media_content_id,media_content_type:t.media_content_type,thumbnail:t.thumbnail,category:e[1],service:"Library"})}return s}_playMaFavorite(t){const e=this._maEntity(this._activeRoom);e&&(Pt(this.hass,e,t.media_content_id,t.media_content_type??"music"),this._prevTitle=this._state(this._activeRoom)?.attributes.media_title,this._loadingName=t.title,this._loadingTimer&&clearTimeout(this._loadingTimer),this._loadingTimer=setTimeout(()=>{this._loadingName=null},8e3),this._view="player")}_renderMaFavorites(){const t=this._groupMembers().length,e=!this._maEntity(this._activeRoom),i=this._maFavs??[],s=[...new Set(i.map(t=>t.service))].sort(),a="Playlists"===this._favTab?"playlist":"Stations"===this._favTab?"station":"Albums"===this._favTab?"album":null,r=i.filter(t=>!(a&&t.category!==a||"All"!==this._maSvc&&t.service!==this._maSvc)),o=[];for(const t of r){const e=o[o.length-1];e&&e[0]===t.service?e[1].push(t):o.push([t.service,[t]])}const n="All"===this._maSvc&&o.length>1;return D`
      <div class="pv pv-scroll">
        <div class="fav-target">
          <span>Play to <b>${this._label(this._activeRoom)}${t>1?" +"+(t-1):""}</b></span>
          <button class="fav-refresh" aria-label="Refresh from Music Assistant"
            @click=${()=>this._maybeFetchMaFavorites(!0)}>↻</button>
        </div>
        ${e?D`
          <div class="fav-notice">No Music Assistant player is named
            <b>${this._state(this._activeRoom)?.attributes.friendly_name??this._label(this._activeRoom)}</b>
            — rename it in Music Assistant to match, or map it under
            <code>ma_entities</code>.</div>
        `:Z}
        ${s.length>1?D`
          <div class="tabs svc">
            ${["All",...s].map(t=>D`
              <button class=${bt({tab:!0,active:this._maSvc===t})}
                      @click=${()=>this._maSvc=t}>${t}</button>
            `)}
          </div>
        `:Z}
        <div class="tabs">
          ${["All","Playlists","Stations","Albums"].map(t=>D`
            <button class=${bt({tab:!0,active:this._favTab===t})}
                    @click=${()=>this._favTab=t}>${t}</button>
          `)}
        </div>
        <div class="fav-list">
          ${this._maFavsError?D`<div class="fav-empty error">${this._maFavsError}</div>`:this._maFavs?0===r.length?D`<div class="fav-empty">Nothing here yet — heart playlists, stations, or albums in Music Assistant and they'll appear.</div>`:o.map(([t,i])=>D`
                  ${n?D`<div class="fav-svc-head">${t}</div>`:Z}
                  ${i.map(t=>D`
                    <button class="fav-item" ?disabled=${e}
                            @click=${()=>this._playMaFavorite(t)}>
                      <span class="fav-art" style=${xt({background:t.thumbnail?`center / cover no-repeat url("${t.thumbnail}")`:"linear-gradient(135deg,#4a5d72,#2a3540)"})}>
                        ${t.thumbnail?Z:"station"===t.category?Wt:"album"===t.category?Zt:qt}
                      </span>
                      <span class="fav-text">
                        <span class="fav-label">${t.title}</span>
                        <span class="fav-sub">${"station"===t.category?"Station":"album"===t.category?"Album":"Playlist"}${"All"!==this._maSvc||n?"":` · ${t.service}`}</span>
                      </span>
                    </button>
                  `)}
                `):D`<div class="fav-empty">Loading Music Assistant library…</div>`}
        </div>
      </div>
    `}_playFavorite(t){t.script?this._svc(((t,e,i={})=>{const s=e.startsWith("script.")?e.slice(7):e;return t.callService("script",s,i)})(this.hass,t.script,{entity_id:this._activeRoom,group_members:this._groupMembers()}),`Couldn't run ${t.script} for "${t.name}"`):t.media_content_id&&t.media_content_type&&this._svc(Pt(this.hass,this._activeRoom,t.media_content_id,t.media_content_type),`Couldn't play "${t.name}"`),this._prevTitle=this._state(this._activeRoom)?.attributes.media_title,this._loadingName=t.name,this._loadingTimer&&clearTimeout(this._loadingTimer),this._loadingTimer=setTimeout(()=>{this._loadingName=null},8e3),this._view="player"}_renderGrouping(t){const e=this._config.entities,i=e=>this._pendingGroup[e]??t.includes(e),s=e.filter(t=>t===this._activeRoom||i(t)),a=this._config.groups??[],r=[...s].sort().join(",");return D`
      <div class="pv pv-scroll">
        ${a.length?D`
          <div class="tabs" role="group" aria-label="Saved groups">
            ${a.map(t=>{const i=t.entities.filter(t=>e.includes(t)),s=i.length>0&&[...i].sort().join(",")===r;return D`
                <button class=${bt({tab:!0,active:s})}
                        aria-pressed=${s}
                        @click=${()=>this._pickGroup(i)}>${t.label}</button>
              `})}
          </div>
        `:Z}
        <div class="grp-banner">
          <div style="min-width:0">
            <div class="lbl">Currently grouped</div>
            <div class="rooms">${s.map(t=>this._label(t)).join(" + ")||"—"}</div>
          </div>
          <div class="hint">Tap to toggle</div>
        </div>
        <div class="grp-grid">
          ${e.map(t=>{const e=t===this._activeRoom,s=i(t),a=t in this._pendingGroup;return D`
              <button class=${bt({"grp-row":!0,primary:e,grouped:s&&!e,pending:a})}
                      aria-pressed=${s}
                      aria-label="${this._label(t)}${e?", primary speaker":s?", in group":", not in group"}"
                      @click=${()=>this._toggleInGroup(t)}>
                <span style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">
                  ${e?D`<span style="display:flex">${Qt}</span>`:Z}
                  <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${this._label(t)}</span>
                </span>
                ${e?D`<span class="badge">PRIMARY</span>`:s?D`<span style="width:20px;height:20px;border-radius:50%;background:var(--wp-on-accent-soft);display:flex;align-items:center;justify-content:center;color:var(--wp-bg)">${Kt}</span>`:Z}
              </button>
            `})}
        </div>
        ${s.length>1?D`
          <div class="grp-volumes">
            <div class="grp-volumes-title">Group Volumes</div>
            ${s.map(t=>{const e=Math.round(100*(this._state(t)?.attributes.volume_level??0));return D`
                <div class="grp-vol-row">
                  <span class="name">${this._label(t)}${t===this._activeRoom?D`<span style="color:var(--wp-accent)"> ·</span>`:Z}</span>
                  ${this._slider(e,100,e=>Ct(this.hass,t,e),t,`Volume for ${this._label(t)}`)}
                  <span class="val">${e}</span>
                </div>
              `})}
          </div>
        `:Z}
      </div>
    `}_renderMenu(t){const e=this._config.groups??[],i=[...t].sort().join(",");return D`
      <div class="menu-overlay" @click=${()=>this._menuOpen=!1}
           @keydown=${t=>{"Escape"===t.key&&(this._menuOpen=!1)}}>
        <div class="menu-card" role="dialog" aria-label="Rooms and groups"
             @click=${t=>t.stopPropagation()}>
          ${t.length>1||e.length>0?D`<div class="menu-section">Groups</div>`:Z}
          ${t.length>1?D`
            <button class="menu-item active">
              <span style="display:flex">${Yt}</span>
              <span style="flex:1">${t.map(t=>this._label(t)).join(" + ")}</span>
              <span class="now-pill">NOW</span>
            </button>
          `:Z}
          ${e.filter(t=>{const e=t.entities.filter(t=>this._config.entities.includes(t));return[...e].sort().join(",")!==i}).map(t=>D`
              <button class="menu-item" @click=${()=>this._pickGroup(t.entities)}>
                <span style="display:flex">${Yt}</span>
                <span style="flex:1">${t.label}</span>
              </button>
            `)}
          <div class="menu-section">Rooms</div>
          ${this._config.entities.map(e=>{const i=e===this._activeRoom&&1===t.length,s=t.includes(e)&&t.length>1;return D`
              <button class=${bt({"menu-item":!0,active:i})}
                      @click=${()=>this._pickRoom(e)}>
                <span style="display:flex">${zt}</span>
                <span style="flex:1">${this._label(e)}</span>
                ${s?D`<span class="group-pill">IN GROUP</span>`:Z}
              </button>
            `})}
        </div>
      </div>
    `}};re.styles=Tt,re.MA_FAVS_TTL_MS=3e5,t([vt({attribute:!1})],re.prototype,"hass",void 0),t([mt()],re.prototype,"_config",void 0),t([mt()],re.prototype,"_view",void 0),t([mt()],re.prototype,"_activeRoom",void 0),t([mt()],re.prototype,"_menuOpen",void 0),t([mt()],re.prototype,"_favTab",void 0),t([mt()],re.prototype,"_favQ",void 0),t([mt()],re.prototype,"_maFavs",void 0),t([mt()],re.prototype,"_maFavsLoading",void 0),t([mt()],re.prototype,"_maFavsError",void 0),t([mt()],re.prototype,"_maSvc",void 0),t([mt()],re.prototype,"_dragVol",void 0),t([mt()],re.prototype,"_optimisticPlaying",void 0),t([mt()],re.prototype,"_optimisticMuted",void 0),t([mt()],re.prototype,"_pendingGroup",void 0),t([mt()],re.prototype,"_loadingName",void 0),t([mt()],re.prototype,"_skipping",void 0),t([mt()],re.prototype,"_toast",void 0),t([mt()],re.prototype,"_now",void 0),re=ee=t([pt(kt)],re),window.customCards=window.customCards||[],window.customCards.push({type:kt,name:"Wall Panel Sonos Card",description:"Sonos multi-room control designed for wall-mounted tablets.",preview:!1,documentationURL:"https://github.com/your-org/wall-panel-sonos-card"});let oe=class extends ct{constructor(){super(...arguments),this._open="rooms",this._openItem={},this._renderRooms=()=>{const t=this._config.entities??[],e=this._config.names??{},i=this._entityOptions().filter(e=>!t.includes(e));return D`
      ${t.map((i,s)=>D`
        <div class="item">
          <div class="item-head">
            <span class="name">${e[i]??i}</span>
            <div class="actions">
              <button class="btn btn-mini" ?disabled=${0===s}
                @click=${()=>this._setList("entities",this._moveItem(t,s,-1))}>↑</button>
              <button class="btn btn-mini" ?disabled=${s===t.length-1}
                @click=${()=>this._setList("entities",this._moveItem(t,s,1))}>↓</button>
              <button class="btn btn-mini danger"
                @click=${()=>{const a=t.filter((t,e)=>e!==s),r={...e};delete r[i];const o={...this._config,entities:a,names:Object.keys(r).length?r:void 0};this._emit(o)}}>Remove</button>
            </div>
          </div>
          <div class="item-body">
            <div class="row">
              <label>Entity</label>
              <input type="text" .value=${i}
                @change=${a=>{const r=a.target.value.trim();if(!r||t.includes(r))return;const o=t.map((t,e)=>e===s?r:t),n={...e};e[i]&&(n[r]=e[i],delete n[i]),this._emit({...this._config,entities:o,names:Object.keys(n).length?n:void 0})}}/>
            </div>
            <div class="row">
              <label>Display name (optional)</label>
              <input type="text" .value=${e[i]??""}
                placeholder=${i}
                @change=${t=>{const s=t.target.value.trim(),a={...e};s?a[i]=s:delete a[i],this._emit({...this._config,names:Object.keys(a).length?a:void 0})}}/>
            </div>
          </div>
        </div>
      `)}
      <div class="adder">
        <select @change=${e=>{const i=e.target.value;i&&(this._setList("entities",[...t,i]),e.target.value="")}}>
          <option value="">+ Add media_player entity…</option>
          ${i.map(t=>D`<option value=${t}>${t}</option>`)}
        </select>
      </div>
    `},this._renderOptions=()=>D`
    <div class="row">
      <label>Default view</label>
      <select @change=${t=>this._val("default_view",t.target.value)}>
        ${["player","favorites","grouping"].map(t=>D`
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
      <label>Max volume cap (1–100)</label>
      <input type="number" min="1" max="100" step="1"
        .value=${String(this._config.max_volume??100)}
        @change=${t=>this._val("max_volume",parseInt(t.target.value,10))}/>
      <div class="help">Set below 100 to give the slider finer resolution at low volumes.</div>
    </div>
    <div class="row">
      <label>Favorites source</label>
      <select @change=${t=>this._val("favorites_source",t.target.value)}>
        <option value="config" ?selected=${"config"===(this._config.favorites_source??"config")}>config (the favorites list below/in YAML)</option>
        <option value="music_assistant" ?selected=${"music_assistant"===this._config.favorites_source}>music_assistant (live library, grouped by service &amp; type)</option>
      </select>
      <div class="help">With <code>music_assistant</code>, the Favorites view shows whatever is hearted in Music Assistant, organized by music service and type. Plays through the Music Assistant player with the same name as the room, or the mapping below.</div>
    </div>
    <div class="row">
      <label>Music Assistant entities, optional overrides (native = MA player, one per line)</label>
      <textarea rows="4" @change=${t=>{const e={};for(const i of t.target.value.split("\n")){const[t,s]=i.split("=").map(t=>t.trim());t&&s&&(e[t]=s)}this._val("ma_entities",Object.keys(e).length?e:void 0)}}>${Object.entries(this._config.ma_entities??{}).map(([t,e])=>`${t} = ${e}`).join("\n")}</textarea>
      <div class="help">e.g. <code>media_player.living_room = media_player.living_room_2</code>. MA favorites play through the MA twin of the active room (same physical speaker).</div>
    </div>
  `,this._renderFavorites=()=>{const t=this._config.favorites??[],e=this._scriptOptions();return D`
      ${t.map((i,s)=>{const a=`fav:${s}`,r=!!this._openItem[a],o=i.script?"script":"media";return D`
          <div class="item">
            <div class="item-head" @click=${()=>this._toggleItem(a)}>
              <span>${r?"▾":"▸"}</span>
              <span class="name">${i.name||i.id||"(untitled)"}</span>
              <span class="count">${i.type??""}</span>
              <div class="actions" @click=${t=>t.stopPropagation()}>
                <button class="btn btn-mini" ?disabled=${0===s}
                  @click=${()=>this._setList("favorites",this._moveItem(t,s,-1))}>↑</button>
                <button class="btn btn-mini" ?disabled=${s===t.length-1}
                  @click=${()=>this._setList("favorites",this._moveItem(t,s,1))}>↓</button>
                <button class="btn btn-mini danger"
                  @click=${()=>this._setList("favorites",t.filter((t,e)=>e!==s))}>Remove</button>
              </div>
            </div>
            ${r?D`
              <div class="item-body">
                <div class="row-inline">
                  <div>
                    <label>ID</label>
                    <input type="text" .value=${i.id??""}
                      @change=${t=>this._updateFav(s,{id:t.target.value.trim()})}/>
                  </div>
                  <div>
                    <label>Name</label>
                    <input type="text" .value=${i.name??""}
                      @change=${t=>this._updateFav(s,{name:t.target.value})}/>
                  </div>
                </div>
                <div class="row">
                  <label>Type</label>
                  <div class="chip-list">
                    ${["playlist","station","album"].map(t=>D`
                      <span class="chip ${i.type===t?"on":""}"
                        @click=${()=>this._updateFav(s,{type:t})}>${t}</span>
                    `)}
                  </div>
                </div>
                <div class="row">
                  <label>Source</label>
                  <div class="chip-list">
                    <span class="chip ${"media"===o?"on":""}"
                      @click=${()=>this._updateFav(s,{script:void 0})}>media_content_id</span>
                    <span class="chip ${"script"===o?"on":""}"
                      @click=${()=>this._updateFav(s,{media_content_id:void 0,media_content_type:void 0})}>script</span>
                  </div>
                </div>
                ${"media"===o?D`
                  <div class="row">
                    <label>media_content_id</label>
                    <textarea rows="2"
                      @change=${t=>this._updateFav(s,{media_content_id:t.target.value.trim()||void 0})}
                      >${i.media_content_id??""}</textarea>
                    <div class="help">Get one via Developer Tools → Services → <code>media_player.play_media</code> → Choose media. Sonos favorite URIs and Sonos Radio stream URIs both work.</div>
                  </div>
                  <div class="row">
                    <label>media_content_type</label>
                    <input type="text" .value=${i.media_content_type??""}
                      placeholder="music"
                      @change=${t=>this._updateFav(s,{media_content_type:t.target.value.trim()||void 0})}/>
                  </div>
                `:D`
                  <div class="row">
                    <label>Script</label>
                    <select
                      @change=${t=>this._updateFav(s,{script:t.target.value||void 0})}>
                      <option value="">— pick a script.* —</option>
                      ${e.map(t=>D`<option value=${t} ?selected=${i.script===t}>${t}</option>`)}
                    </select>
                    <div class="help">The script receives <code>entity_id</code> (active room) and <code>group_members</code> as service fields.</div>
                  </div>
                `}
                <div class="row">
                  <label>Art (URL or CSS gradient, optional)</label>
                  <textarea rows="2"
                    placeholder="linear-gradient(135deg, #1a1a1a 0%, #6a4a2c 100%)"
                    @change=${t=>this._updateFav(s,{art:t.target.value.trim()||void 0})}
                    >${i.art??""}</textarea>
                </div>
              </div>
            `:Z}
          </div>
        `})}
      <div class="adder">
        <button class="btn primary" @click=${()=>{const e={id:`favorite_${t.length+1}`,name:"New favorite",type:"playlist"};this._setList("favorites",[...t,e]),this._openItem={...this._openItem,[`fav:${t.length}`]:!0}}}>+ Add favorite</button>
      </div>
    `},this._renderGroups=()=>{const t=this._config.groups??[],e=this._config.entities??[];return D`
      ${t.map((i,s)=>{const a=`grp:${s}`,r=!!this._openItem[a];return D`
          <div class="item">
            <div class="item-head" @click=${()=>this._toggleItem(a)}>
              <span>${r?"▾":"▸"}</span>
              <span class="name">${i.label||i.id}</span>
              <span class="count">${i.entities?.length??0} rooms</span>
              <div class="actions" @click=${t=>t.stopPropagation()}>
                <button class="btn btn-mini" ?disabled=${0===s}
                  @click=${()=>this._setList("groups",this._moveItem(t,s,-1))}>↑</button>
                <button class="btn btn-mini" ?disabled=${s===t.length-1}
                  @click=${()=>this._setList("groups",this._moveItem(t,s,1))}>↓</button>
                <button class="btn btn-mini danger"
                  @click=${()=>this._setList("groups",t.filter((t,e)=>e!==s))}>Remove</button>
              </div>
            </div>
            ${r?D`
              <div class="item-body">
                <div class="row-inline">
                  <div>
                    <label>ID</label>
                    <input type="text" .value=${i.id??""}
                      @change=${t=>this._updateGroup(s,{id:t.target.value.trim()})}/>
                  </div>
                  <div>
                    <label>Label</label>
                    <input type="text" .value=${i.label??""}
                      @change=${t=>this._updateGroup(s,{label:t.target.value})}/>
                  </div>
                </div>
                <div class="row">
                  <label>Rooms</label>
                  <div class="chip-list">
                    ${0===e.length?D`<div class="help">Add rooms in the Rooms section first.</div>`:e.map(t=>{const e=(i.entities??[]).includes(t);return D`
                            <span class="chip ${e?"on":""}"
                              @click=${()=>{const a=e?(i.entities??[]).filter(e=>e!==t):[...i.entities??[],t];this._updateGroup(s,{entities:a})}}>${(this._config.names??{})[t]??t}</span>
                          `})}
                  </div>
                </div>
              </div>
            `:Z}
          </div>
        `})}
      <div class="adder">
        <button class="btn primary" @click=${()=>{const e={id:`group_${t.length+1}`,label:"New group",entities:[]};this._setList("groups",[...t,e]),this._openItem={...this._openItem,[`grp:${t.length}`]:!0}}}>+ Add group</button>
      </div>
    `},this._renderStationArt=()=>{const t=this._config.station_art??[];return D`
      ${t.map((e,i)=>{const s=`art:${i}`,a=!!this._openItem[s];return D`
          <div class="item">
            <div class="item-head" @click=${()=>this._toggleItem(s)}>
              <span>${a?"▾":"▸"}</span>
              <span class="name">${e.name||e.match||"(unmatched)"}</span>
              <div class="actions" @click=${t=>t.stopPropagation()}>
                <button class="btn btn-mini" ?disabled=${0===i}
                  @click=${()=>this._setList("station_art",this._moveItem(t,i,-1))}>↑</button>
                <button class="btn btn-mini" ?disabled=${i===t.length-1}
                  @click=${()=>this._setList("station_art",this._moveItem(t,i,1))}>↓</button>
                <button class="btn btn-mini danger"
                  @click=${()=>this._setList("station_art",t.filter((t,e)=>e!==i))}>Remove</button>
              </div>
            </div>
            ${a?D`
              <div class="item-body">
                <div class="row">
                  <label>Match (case-insensitive substring of media_content_id)</label>
                  <input type="text" .value=${e.match??""}
                    placeholder="stationId=s297990"
                    @change=${t=>this._updateStationArt(i,{match:t.target.value})}/>
                  <div class="help">Find one via Developer Tools → States while the station is playing and copy a stable substring out of <code>media_content_id</code>.</div>
                </div>
                <div class="row">
                  <label>Label (shown as title when media_title is missing)</label>
                  <input type="text" .value=${e.name??""}
                    @change=${t=>this._updateStationArt(i,{name:t.target.value||void 0})}/>
                </div>
                <div class="row">
                  <label>Image URL</label>
                  <input type="text" .value=${e.image??""}
                    placeholder="https://example.com/logo.png"
                    @change=${t=>this._updateStationArt(i,{image:t.target.value.trim()||void 0})}/>
                </div>
              </div>
            `:Z}
          </div>
        `})}
      <div class="adder">
        <button class="btn primary" @click=${()=>{this._setList("station_art",[...t,{match:""}]),this._openItem={...this._openItem,[`art:${t.length}`]:!0}}}>+ Add mapping</button>
      </div>
    `}}setConfig(t){this._config=t}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_val(t,e){this._emit({...this._config,[t]:e})}_setList(t,e){const i={...this._config};Array.isArray(e)&&0===e.length?delete i[t]:i[t]=e,this._emit(i)}_entityOptions(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("media_player.")).sort():[]}_scriptOptions(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("script.")).sort():[]}_toggleSection(t){this._open=this._open===t?null:t}_toggleItem(t){this._openItem={...this._openItem,[t]:!this._openItem[t]}}_moveItem(t,e,i){const s=e+i;if(s<0||s>=t.length)return t;const a=t.slice();return[a[e],a[s]]=[a[s],a[e]],a}render(){return this._config?D`
      ${this._renderSection("rooms","Rooms",(this._config.entities?.length??0)+" configured",this._renderRooms)}
      ${this._renderSection("options","Options","",this._renderOptions)}
      ${this._renderSection("favorites","Favorites",(this._config.favorites?.length??0)+" items",this._renderFavorites)}
      ${this._renderSection("groups","Groups",(this._config.groups?.length??0)+" items",this._renderGroups)}
      ${this._renderSection("station_art","Station art",(this._config.station_art?.length??0)+" mappings",this._renderStationArt)}
    `:D``}_renderSection(t,e,i,s){const a=this._open===t;return D`
      <div class="sec">
        <div class="sec-head" @click=${()=>this._toggleSection(t)}>
          <span>${a?"▾":"▸"} ${e}</span>
          <span class="count">${i}</span>
        </div>
        ${a?D`<div class="sec-body">${s.call(this)}</div>`:Z}
      </div>
    `}_updateFav(t,e){const i=(this._config.favorites??[]).map((i,s)=>s===t?{...i,...e}:i);this._setList("favorites",i)}_updateGroup(t,e){const i=(this._config.groups??[]).map((i,s)=>s===t?{...i,...e}:i);this._setList("groups",i)}_updateStationArt(t,e){const i=(this._config.station_art??[]).map((i,s)=>s===t?{...i,...e}:i);this._setList("station_art",i)}};oe.styles=o`
    :host { display: block; }
    .sec {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      margin: 8px 0;
      overflow: hidden;
    }
    .sec-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      background: var(--secondary-background-color);
      cursor: pointer;
      user-select: none;
      font-weight: 600;
    }
    .sec-head .count {
      margin-left: auto;
      font-size: 12px;
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    .sec-body { padding: 12px 14px; }
    .row { display: flex; flex-direction: column; gap: 6px; padding: 6px 0; }
    .row-inline {
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 6px 0;
    }
    .row-inline > * { flex: 1; min-width: 0; }
    label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    input, select, textarea {
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font: inherit;
      box-sizing: border-box;
      width: 100%;
    }
    textarea { resize: vertical; }
    .help {
      font-size: 11px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .item {
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      margin: 6px 0;
      background: var(--card-background-color);
    }
    .item-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      cursor: pointer;
      user-select: none;
    }
    .item-head .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .item-body { padding: 6px 10px 10px; border-top: 1px solid var(--divider-color); }
    .btn {
      background: none;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 4px 8px;
      cursor: pointer;
      color: var(--primary-text-color);
      font: inherit;
    }
    .btn.danger { color: var(--error-color, #cf6679); border-color: var(--error-color, #cf6679); }
    .btn.primary { background: var(--primary-color); color: white; border-color: var(--primary-color); }
    .btn-mini { padding: 2px 6px; font-size: 12px; }
    .actions { display: flex; gap: 6px; }
    .adder {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }
    .adder select { flex: 1; }
    .chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 6px 0;
    }
    .chip {
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      cursor: pointer;
      font-size: 13px;
      user-select: none;
    }
    .chip.on {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
  `,t([vt({attribute:!1})],oe.prototype,"hass",void 0),t([mt()],oe.prototype,"_config",void 0),t([mt()],oe.prototype,"_open",void 0),t([mt()],oe.prototype,"_openItem",void 0),oe=t([pt(At)],oe);var ne=Object.freeze({__proto__:null,get WallPanelSonosCardEditor(){return oe}});export{$t as CARD_VERSION,re as WallPanelSonosCard};
