// Shades: no sliders, no fill bar — the 50px icon and its color carry
// state, the three 84px circles carry control. Partial open is slate (any
// amount of open reads as open) and labeled "Open · N%", per review.
import { SectionHeader } from '../components/section-header.js?v=6';

const ShadeCard = {
  inject: ['panel'],
  props: {
    name: { type: String, required: true },
    entity: { type: String, default: null },   // single cover
    targets: { type: Array, default: null },   // multi-target (whole house)
  },
  computed: {
    pos() {
      if (this.entity) {
        const p = this.panel.attr(this.entity, 'current_position');
        if (p !== undefined && p !== null) return Math.round(p);
        return this.panel.state(this.entity) === 'open' ? 100 : 0;
      }
      // aggregate row: open when any shade in the house is open
      const n = this.panel.num(this.panel.CONFIG.shades.openCount);
      return n ? 100 : 0;
    },
    icon() {
      if (this.pos >= 98) return 'mdi-roller-shade';
      if (this.pos > 0) return 'mdi-blinds-horizontal';
      return 'mdi-roller-shade-closed';
    },
    iconColor() { return this.pos > 0 ? 'var(--slate)' : 'var(--text-sec)'; },
    stateText() {
      if (!this.entity) { // aggregate
        const n = this.panel.num(this.panel.CONFIG.shades.openCount) || 0;
        return n ? n + ' open' : 'All Closed';
      }
      if (this.pos >= 98) return 'Open';
      if (this.pos > 0) return 'Open · ' + this.pos + '%';
      return 'Closed';
    },
  },
  methods: {
    cover(service) {
      const target = this.targets || [this.entity];
      this.panel.call('cover', service, { entity_id: target });
    },
  },
  template: `
    <div class="wp-shade-card">
      <div class="wp-shade-inner">
        <span class="mdi" :class="icon" :style="{ color: iconColor }"></span>
        <div class="wp-shade-meta">
          <div class="wp-shade-name">{{ name }}</div>
          <div class="wp-shade-state">{{ stateText }}</div>
        </div>
        <div class="wp-shade-btns">
          <div class="wp-circle" @click="cover('open_cover')"><span class="mdi mdi-arrow-up"></span></div>
          <div class="wp-circle" @click="cover('stop_cover')"><span class="mdi mdi-stop"></span></div>
          <div class="wp-circle" @click="cover('close_cover')"><span class="mdi mdi-arrow-down"></span></div>
        </div>
      </div>
    </div>`,
};

export const ShadesView = {
  components: { SectionHeader, ShadeCard },
  inject: ['panel'],
  computed: {
    cfg() { return this.panel.CONFIG.shades; },
    openLabel() {
      const n = this.panel.num(this.cfg.openCount) || 0;
      return n ? n + ' open' : 'All Closed';
    },
  },
  template: `
    <div>
      <SectionHeader icon="mdi-home" title="Whole House" :value="openLabel"/>
      <div class="wp-card-col">
        <ShadeCard :name="cfg.wholeHouse.name" :targets="cfg.wholeHouse.targets"/>
      </div>
      <template v-if="cfg.mediaRoom">
        <SectionHeader icon="mdi-television" title="Media Room Shades" later/>
        <div class="wp-card-col">
          <ShadeCard :name="cfg.mediaRoom.name" :entity="cfg.mediaRoom.entity"/>
        </div>
      </template>
      <SectionHeader icon="mdi-home-floor-1" title="First Floor Shades" later/>
      <div class="wp-card-col">
        <ShadeCard v-for="sh in cfg.firstFloor" :key="sh.entity" :name="sh.name" :entity="sh.entity"/>
      </div>
    </div>`,
};
