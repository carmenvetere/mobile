// Lights: full-width 132px rows. Tap toggles, horizontal drag sets
// brightness (6px threshold). The row content renders twice — a white
// layer and a dark layer clipped to the brightness fill — so contrast is
// per-pixel correct even mid-drag (the two-layer trick from the handoff).
import { SectionHeader } from '../components/section-header.js?v=1';

const LightRow = {
  inject: ['panel'],
  props: { light: { type: Object, required: true } },
  data() {
    return { dragPct: null }; // live drag value, wins over entity state
  },
  computed: {
    pct() { return this.dragPct !== null ? this.dragPct : this.panel.lightPct(this.light); },
    stateText() {
      if (this.light.switch) return this.panel.lightIsOn(this.light) ? 'On' : 'Off';
      return this.pct > 0 ? this.pct + '%' : 'Off';
    },
    clipDark() { return 'inset(0 ' + (100 - this.pct) + '% 0 0)'; },
  },
  methods: {
    onPointerDown(e) {
      const panel = this.panel;
      const light = this.light;
      if (light.switch) {
        // no brightness: whole row is a plain toggle
        const up = () => { window.removeEventListener('pointerup', up); panel.toggleLight(light); };
        window.addEventListener('pointerup', up);
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      const startX = e.clientX;
      let moved = false;
      let lastSent = -1;
      const apply = (ev) => {
        const pct = Math.max(0, Math.min(100, Math.round(((ev.clientX - rect.left) / rect.width) * 100)));
        this.dragPct = pct;
        if (pct !== lastSent) { lastSent = pct; panel.setLightPct(light, pct); }
      };
      const move = (ev) => {
        if (moved || Math.abs(ev.clientX - startX) > panel.CONFIG.lights.dragThresholdPx) {
          moved = true;
          apply(ev);
        }
      };
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', up);
        this.dragPct = null;
        if (!moved) panel.toggleLight(light);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    },
  },
  template: `
    <div class="wp-light-row" @pointerdown="onPointerDown">
      <div class="wp-light-fill" :style="{ width: pct + '%' }"></div>
      <div class="wp-light-layer">
        <span class="mdi" :class="light.icon"></span>
        <div class="wp-light-name">{{ light.name }}</div>
        <div class="wp-light-state">{{ stateText }}</div>
      </div>
      <div class="wp-light-layer dark" :style="{ clipPath: clipDark }">
        <span class="mdi" :class="light.icon"></span>
        <div class="wp-light-name">{{ light.name }}</div>
        <div class="wp-light-state">{{ stateText }}</div>
      </div>
    </div>`,
};

export const LightsView = {
  components: { SectionHeader, LightRow },
  inject: ['panel'],
  computed: {
    cfg() { return this.panel.CONFIG.lights; },
    basementLabel() { return this.countLabel(this.cfg.basement); },
    outdoorLabel() { return this.countLabel(this.cfg.outdoor); },
  },
  methods: {
    countLabel(list) {
      const n = list.filter((l) => this.panel.lightIsOn(l)).length;
      return n ? n + ' on' : 'All Off';
    },
  },
  template: `
    <div>
      <SectionHeader icon="mdi-home-floor-b" title="Basement" :value="basementLabel" value-color="var(--slate)"/>
      <div class="wp-card-col">
        <LightRow v-for="l in cfg.basement" :key="l.entity" :light="l"/>
      </div>
      <SectionHeader icon="mdi-home-floor-0" title="Outdoor" later :value="outdoorLabel" value-color="var(--slate)"/>
      <div class="wp-card-col">
        <LightRow v-for="l in cfg.outdoor" :key="l.entity" :light="l"/>
      </div>
      <div class="wp-lights-hint">Tap to toggle · drag to dim</div>
    </div>`,
};
