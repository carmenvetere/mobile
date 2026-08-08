// Climate: Nest-style 410px dial (conic setpoint arc from 205°, 310°
// sweep, 50° gap at the bottom), 100px ± circles, and upward-opening
// Mode / Fan dropdown selects — dropdowns, not cycling buttons (review
// decision). Toggle rows below on the climate surface token.
import { SectionHeader } from '../components/section-header.js?v=3';
import { ToggleRow } from '../components/toggle-row.js?v=3';

const MODES = [
  { value: 'heat', label: 'Heat', icon: 'mdi-fire', color: 'var(--amber)' },
  { value: 'cool', label: 'Cool', icon: 'mdi-snowflake', color: 'var(--slate)' },
  { value: 'off', label: 'Off', icon: 'mdi-power', color: 'var(--text-sec)' },
];

export const ClimateView = {
  components: { SectionHeader, ToggleRow },
  inject: ['panel'],
  data() { return { modes: MODES }; },
  computed: {
    cfg() { return this.panel.CONFIG.climate; },
    mode() {
      const s = this.panel.state(this.cfg.entity);
      return MODES.find((m) => m.value === s) || MODES[2];
    },
    isOff() { return this.mode.value === 'off'; },
    setTemp() {
      const t = this.panel.attr(this.cfg.entity, 'temperature');
      return t === undefined || t === null ? null : Math.round(t);
    },
    current() { return this.panel.num(this.cfg.currentTemp); },
    humidity() { return this.panel.num(this.cfg.humidity); },
    headerLabel() { return this.current === null ? '' : 'Average ' + Math.round(this.current) + '°'; },
    ring() {
      const t = this.setTemp === null ? this.cfg.min : Math.max(this.cfg.min, Math.min(this.cfg.max, this.setTemp));
      const deg = Math.round(((t - this.cfg.min) / (this.cfg.max - this.cfg.min)) * 310);
      const color = this.isOff ? 'rgba(255,255,255,0.10)' : this.mode.color;
      return 'conic-gradient(from 205deg, ' + color + ' 0deg ' + deg + 'deg, rgba(255,255,255,0.10) ' + deg + 'deg 310deg, transparent 310deg 360deg)';
    },
    fan() {
      const v = this.panel.attr(this.cfg.entity, 'fan_mode');
      return this.cfg.fanModes.find((f) => f.value === v) || this.cfg.fanModes[0];
    },
    menus() { return this.panel.ui.climateMenus; },
  },
  methods: {
    bump(delta) {
      if (this.isOff || this.setTemp === null) return;
      const t = Math.max(this.cfg.min, Math.min(this.cfg.max, this.setTemp + delta));
      this.panel.call('climate', 'set_temperature', { entity_id: this.cfg.entity, temperature: t },
        { [this.cfg.entity]: { attributes: { temperature: t } } });
    },
    setMode(m) {
      this.panel.call('climate', 'set_hvac_mode', { entity_id: this.cfg.entity, hvac_mode: m.value },
        { [this.cfg.entity]: { state: m.value } });
      this.menus.mode = false;
    },
    setFan(f) {
      this.panel.call('climate', 'set_fan_mode', { entity_id: this.cfg.entity, fan_mode: f.value },
        { [this.cfg.entity]: { attributes: { fan_mode: f.value } } });
      this.menus.fan = false;
    },
    toggleMenu(which) {
      const other = which === 'mode' ? 'fan' : 'mode';
      this.menus[which] = !this.menus[which];
      this.menus[other] = false;
    },
  },
  template: `
    <div>
      <SectionHeader icon="mdi-fan" title="Basement" :value="headerLabel"/>

      <div class="wp-dial-row">
        <div class="wp-dial-btn" v-show="!isOff" @click="bump(-1)"><span class="mdi mdi-minus"></span></div>
        <div class="wp-dial" :style="{ background: ring }">
          <div class="wp-dial-face">
            <div class="wp-dial-mode" :style="{ color: mode.color }">{{ mode.label }}</div>
            <div class="wp-dial-temp" :style="{ color: isOff ? 'rgba(242,243,245,0.78)' : '#ffffff' }">
              {{ isOff || setTemp === null ? 'Off' : setTemp + '°' }}
            </div>
            <div class="wp-dial-current" v-if="current !== null">Currently {{ Math.round(current) }}°</div>
            <div class="wp-dial-humidity" v-if="humidity !== null">{{ Math.round(humidity) }}% humidity</div>
          </div>
        </div>
        <div class="wp-dial-btn" v-show="!isOff" @click="bump(1)"><span class="mdi mdi-plus"></span></div>
      </div>

      <div class="wp-select-row">
        <div class="wp-select">
          <div class="wp-select-trigger" @click="toggleMenu('mode')">
            <span class="mdi" :class="mode.icon" :style="{ color: mode.color }"></span>
            {{ mode.label }}
            <span class="mdi chevron" :class="menus.mode ? 'mdi-chevron-down' : 'mdi-chevron-up'"></span>
          </div>
          <div v-if="menus.mode" class="wp-select-menu">
            <div v-for="m in modes" :key="m.value" class="wp-select-option"
                 :class="{ selected: m.value === mode.value }" @click="setMode(m)">
              <span class="mdi" :class="m.icon" :style="m.value === mode.value ? {} : { color: m.color }"></span>
              <div class="label">{{ m.label }}</div>
              <span class="mdi check" :class="m.value === mode.value ? 'mdi-check' : ''"></span>
            </div>
          </div>
        </div>
        <div class="wp-select">
          <div class="wp-select-trigger" @click="toggleMenu('fan')">
            <span class="mdi mdi-fan" style="color: var(--text-sec)"></span>
            Fan · {{ fan.label }}
            <span class="mdi chevron" :class="menus.fan ? 'mdi-chevron-down' : 'mdi-chevron-up'"></span>
          </div>
          <div v-if="menus.fan" class="wp-select-menu">
            <div v-for="f in cfg.fanModes" :key="f.value" class="wp-select-option"
                 :class="{ selected: f.value === fan.value }" @click="setFan(f)">
              <span class="mdi" :class="f.icon" :style="f.value === fan.value ? {} : { color: 'var(--text-sec)' }"></span>
              <div class="label">{{ f.label }}</div>
              <span class="mdi check" :class="f.value === fan.value ? 'mdi-check' : ''"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="wp-toggle-col later">
        <ToggleRow v-for="t in cfg.toggles" :key="t.entity" climate
                   :entity="t.entity" :name="t.name" :icon="t.icon"
                   :chip-temp="t.chipTemp" :chip-humidity="t.chipHumidity"/>
      </div>
    </div>`,
};
