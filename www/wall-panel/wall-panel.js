// The custom element panel_custom instantiates (inside an iframe —
// embed_iframe: true — so the panel owns the whole viewport, which the
// screensaver and kiosk behavior rely on). HA re-assigns `hass` on every
// state change; a shallow-reactive store hands it to Vue without proxying
// thousands of entities. Inside the iframe there is no <ha-icon>, which is
// why the MDI webfont is bundled and icons are plain <span class="mdi">.
import { createApp, shallowReactive } from './vendor/vue.esm-browser.prod.js';
import { App } from './app.js?v=1';

class WallPanel extends HTMLElement {
  constructor() {
    super();
    this._store = shallowReactive({ hass: null });
    this._mounted = false;
  }

  set hass(h) { this._store.hass = h; }
  get hass() { return this._store.hass; }
  set narrow(_) {}
  set route(_) {}
  set panel(_) {}

  connectedCallback() {
    // The loader imports this module asynchronously, so HA may have
    // assigned hass before the class existed. Re-apply through the setter.
    for (const p of ['hass', 'narrow', 'route', 'panel']) {
      if (Object.hasOwn(this, p)) {
        const v = this[p];
        delete this[p];
        this[p] = v;
      }
    }

    if (this._mounted) return;
    this._mounted = true;

    for (const [id, href] of [
      ['wall-panel-mdi', '/local/wall-panel/vendor/mdi/css/materialdesignicons.min.css'],
      ['wall-panel-css', '/local/wall-panel/style.css?v=1'],
    ]) {
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    }

    const mount = document.createElement('div');
    this.appendChild(mount);
    const app = createApp(App);
    app.provide('store', this._store);
    app.mount(mount);
  }
}

customElements.define('wall-panel', WallPanel);
