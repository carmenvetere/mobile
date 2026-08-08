// Settings: Quick Toggles, Display (Sleep now), Sections, Maintenance,
// Release Notes. The Sections rows mirror the mobile settings groups but
// are inert until the panel grows its own sub-views (the mobile pop-ups
// can't open inside the panel).
import { SectionHeader } from '../components/section-header.js?v=4';
import { ToggleRow } from '../components/toggle-row.js?v=4';

export const SettingsView = {
  components: { SectionHeader, ToggleRow },
  inject: ['panel'],
  computed: {
    cfg() { return this.panel.CONFIG.settings; },
    sleepHint() {
      return this.panel.sonosPlaying ? 'Now playing — shows album art' : 'Nothing playing — shows the clock';
    },
    maintenance() {
      const p = this.panel;
      const m = this.cfg.maintenance;
      const num = (id) => p.num(id);
      const days = (id) => {
        const st = p.state(id);
        if (!st) return null;
        const t = new Date(st).getTime();
        if (Number.isNaN(t)) return null;
        return Math.max(0, Math.floor((Date.now() - t) / 86400000));
      };
      const fmt = (v, suffix) => (v === null ? '—' : Math.round(v).toLocaleString('en-US') + suffix);
      const reserve = num(m.powerwallReserve);
      const upper = num(m.upperFilterHours);
      const lower = num(m.lowerFilterHours);
      const water = days(m.waterHeaterFlushed);
      const dryer = days(m.dryerVentCleaned);
      const healthy = 'var(--sage)';
      const attention = 'var(--gold)';
      return [
        {
          icon: 'mdi-battery-charging-high', name: 'Powerwall Reserve', value: fmt(reserve, '%'),
          color: reserve === null ? 'var(--text-sec)' : reserve < 20 ? 'var(--err)' : reserve <= 30 ? attention : healthy,
        },
        {
          icon: 'mdi-air-filter', name: 'Upper HVAC Filter', value: fmt(upper, ' h'),
          color: upper !== null && upper > m.filterAttentionHours ? attention : healthy,
        },
        {
          icon: 'mdi-air-filter', name: 'Lower HVAC Filter', value: fmt(lower, ' h'),
          color: lower !== null && lower > m.filterAttentionHours ? attention : healthy,
        },
        {
          icon: 'mdi-water-boiler', name: 'Water Heater Flushed', value: fmt(water, ' d'),
          color: water !== null && water > m.maintenanceAttentionDays ? attention : healthy,
        },
        {
          icon: 'mdi-tumble-dryer', name: 'Dryer Vent Cleaned', value: fmt(dryer, ' d'),
          color: dryer !== null && dryer > m.maintenanceAttentionDays ? attention : healthy,
        },
      ];
    },
  },
  template: `
    <div>
      <SectionHeader icon="mdi-toggle-switch-outline" title="Quick Toggles"/>
      <div class="wp-toggle-col">
        <ToggleRow v-for="t in cfg.toggles" :key="t.entity"
                   :entity="t.entity" :name="t.name" :icon="t.icon"/>
      </div>

      <SectionHeader icon="mdi-monitor-dashboard" title="Display" later/>
      <div class="wp-settings-row tappable" @click="panel.enterScreensaver()">
        <span class="mdi mdi-sleep accent"></span>
        <div class="wp-settings-name">
          <div>Sleep now</div>
          <div class="wp-settings-sub">{{ sleepHint }}</div>
        </div>
        <span class="mdi mdi-chevron-right chevron"></span>
      </div>

      <SectionHeader icon="mdi-view-grid-outline" title="Sections" later/>
      <div class="wp-toggle-col">
        <div v-for="sec in cfg.sections" :key="sec.name" class="wp-settings-row nav">
          <span class="mdi" :class="sec.icon"></span>
          <div class="wp-settings-name">{{ sec.name }}</div>
          <span class="mdi mdi-chevron-right chevron"></span>
        </div>
      </div>

      <SectionHeader icon="mdi-gauge" title="Maintenance" later/>
      <div class="wp-toggle-col">
        <div v-for="v in maintenance" :key="v.name" class="wp-settings-row">
          <span class="mdi accent" :class="v.icon"></span>
          <div class="wp-settings-name">{{ v.name }}</div>
          <div class="wp-settings-value" :style="{ color: v.color }">{{ v.value }}</div>
        </div>
      </div>

      <SectionHeader icon="mdi-note-text-outline" title="Release Notes" later/>
      <div class="wp-release-card">
        <div class="wp-release-head">
          <span class="mdi mdi-tablet-dashboard"></span>
          <div class="wp-release-version">{{ cfg.releaseVersion }}</div>
        </div>
        <div class="wp-release-notes">
          <div v-for="note in cfg.releaseNotes" :key="note" class="wp-release-note">
            <div class="wp-release-dot"></div>
            <div class="wp-release-text">{{ note }}</div>
          </div>
        </div>
      </div>
    </div>`,
};
