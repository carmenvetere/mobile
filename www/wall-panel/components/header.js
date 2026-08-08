// Shared 110px header. The clock is the panel's universal escape hatch:
// tapping it returns Home and closes any open overlay.
export const Header = {
  inject: ['panel'],
  computed: {
    cfg() { return this.panel.CONFIG.header; },
    guestsOn() { return this.panel.state(this.cfg.guests) === 'on'; },
    dinnerOn() { return this.panel.state(this.cfg.dinnerParty) === 'on'; },
    outdoorTemp() {
      const v = this.panel.num(this.cfg.outdoorTemp);
      return v === null ? '—' : Math.round(v) + '°';
    },
    shieldStyle() { return { color: this.panel.alarmState() === 'disarmed' ? '#9aa0a8' : 'var(--amber)' }; },
  },
  methods: {
    goHome() { this.panel.go('home'); },
    openNotifications() { this.panel.ui.overlays.notifications = true; },
    goAlarm() { this.panel.go('alarm'); },
  },
  template: `
    <div class="wp-header">
      <div class="wp-clock" @click="goHome">{{ panel.timeStr }}</div>
      <span v-if="guestsOn" class="mdi mdi-bed wp-header-mode guests"></span>
      <span v-if="dinnerOn" class="mdi mdi-party-popper wp-header-mode dinner"></span>
      <div v-if="panel.notifCount > 0" class="wp-notif-ind" @click="openNotifications">
        <span class="mdi mdi-bell"></span>
        <span>{{ panel.notifCount }}</span>
      </div>
      <span class="mdi wp-shield" :class="panel.alarmShieldIcon" :style="shieldStyle" @click="goAlarm"></span>
      <div class="wp-outdoor-temp">{{ outdoorTemp }}</div>
    </div>`,
};
