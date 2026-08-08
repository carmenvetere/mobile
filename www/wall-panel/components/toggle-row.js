// Toggle row (Climate + Settings): whole row is the ~84px target; 64×36
// switch, 30px knob, .2s ease. Optional temp/humidity chip before the
// switch. `climate` swaps the surface to the climate card token.
export const ToggleRow = {
  inject: ['panel'],
  props: {
    entity: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    chipTemp: { type: String, default: null },
    chipHumidity: { type: String, default: null },
    climate: { type: Boolean, default: false },
  },
  computed: {
    on() { return this.panel.state(this.entity) === 'on'; },
    chip() {
      if (!this.chipTemp) return '';
      const t = this.panel.num(this.chipTemp);
      const h = this.chipHumidity ? this.panel.num(this.chipHumidity) : null;
      const tt = t === null ? '' : Math.round(t) + '°';
      const hh = h === null ? '' : Math.round(h) + '%';
      return tt && hh ? tt + ' · ' + hh : tt + hh;
    },
  },
  methods: {
    tap() {
      const domain = this.entity.split('.')[0];
      this.panel.call(domain, 'toggle', { entity_id: this.entity },
        { [this.entity]: { state: this.on ? 'off' : 'on' } });
    },
  },
  template: `
    <div class="wp-toggle-row" :class="{ on, climate }" @click="tap">
      <span class="mdi" :class="icon"></span>
      <div class="wp-toggle-name">{{ name }}</div>
      <div v-if="chip" class="wp-toggle-chip">{{ chip }}</div>
      <div class="wp-toggle-state">{{ on ? 'On' : 'Off' }}</div>
      <div class="wp-switch"><div class="wp-switch-knob"></div></div>
    </div>`,
};
