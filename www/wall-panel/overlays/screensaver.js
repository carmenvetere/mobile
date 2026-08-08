// Screensaver (z 60): music mode when Sonos is playing, clock mode when
// not. Any touch wakes and is swallowed — except the music transport,
// which acts without waking. Both layouts drift ±14/±10px on a 240s
// keyframe for burn-in. The critical outage alert is shown in full, not
// as a count: it must be readable from across the room.
export const Screensaver = {
  inject: ['panel'],
  computed: {
    musicMode() { return this.panel.sonosPlaying; },
    clockTime() {
      return new Date(this.panel.ui.now)
        .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        .replace(/\s?(AM|PM)$/i, '');
    },
    dateStr() {
      return new Date(this.panel.ui.now).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    },
    artStyle() {
      const art = this.panel.sonosArt;
      return art ? { backgroundImage: 'url(' + art + ')' } : {};
    },
    outdoorTemp() {
      const v = this.panel.num(this.panel.CONFIG.header.outdoorTemp);
      return v === null ? '—' : Math.round(v) + '°';
    },
    statusRows() {
      const p = this.panel;
      const dim = 'rgba(255,255,255,0.62)';
      const lightsOn = p.lightsOnCount;
      const alarm = p.alarmState();
      const rows = [
        { icon: 'mdi-thermometer', color: dim, text: this.outdoorTemp + ' outside' },
        {
          icon: 'mdi-lightbulb-on', color: lightsOn ? 'var(--gold)' : dim,
          text: lightsOn + (lightsOn === 1 ? ' light on' : ' lights on'),
        },
        {
          icon: p.alarmShieldIcon, color: alarm === 'disarmed' ? dim : 'var(--amber)',
          text: alarm === 'disarmed' ? 'Alarm disarmed'
            : alarm === 'armed_home' ? 'Alarm armed home'
            : alarm === 'armed_away' ? 'Alarm armed away'
            : 'Alarm ' + alarm,
        },
      ];
      const n = p.notifCount;
      if (n > 0) {
        rows.push({
          icon: 'mdi-bell', color: 'var(--slate-deep)',
          text: n + (n === 1 ? ' notification' : ' notifications'),
        });
      }
      return rows;
    },
  },
  methods: {
    // The first touch wakes only — it must not reach the control beneath.
    wake(e) {
      e.stopPropagation();
      this.panel.wake();
    },
    transport(e, fn) {
      e.stopPropagation(); // acts on Sonos without waking
      fn();
    },
  },
  template: `
    <div class="wp-ss" @pointerdown="panel.touch()" @click="wake">
      <template v-if="musicMode">
        <div class="wp-ss-art-bg" :style="artStyle"></div>
        <div class="wp-ss-scrim"></div>
        <div class="wp-ss-center">
          <div class="wp-ss-art" :style="artStyle"></div>
          <div class="wp-ss-meta">
            <div class="wp-ss-track">{{ panel.sonosTrack }}</div>
            <div class="wp-ss-artist">{{ panel.sonosArtist }}</div>
            <div class="wp-ss-group">
              <span class="mdi mdi-speaker-multiple"></span>
              <div>{{ panel.groupLabel }}</div>
            </div>
          </div>
          <div class="wp-ss-transport">
            <div class="wp-circle c99" @click="transport($event, panel.sonosPrev)"><span class="mdi mdi-skip-previous"></span></div>
            <div class="wp-circle c120 play" @click="transport($event, panel.sonosToggle)">
              <span class="mdi" :class="panel.sonosPlaying ? 'mdi-pause' : 'mdi-play'"></span>
            </div>
            <div class="wp-circle c99" @click="transport($event, panel.sonosNext)"><span class="mdi mdi-skip-next"></span></div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="wp-ss-center">
          <div class="wp-ss-time">{{ clockTime }}</div>
          <div class="wp-ss-date">{{ dateStr }}</div>
          <div v-if="panel.outage" class="wp-ss-alert">
            <div class="wp-ss-alert-head">
              <span class="mdi mdi-alert"></span>
              <div class="wp-ss-alert-title">Power Outage</div>
            </div>
            <div class="wp-ss-alert-detail">Running on Powerwall backup</div>
            <div class="wp-ss-alert-bar-row">
              <div class="wp-ss-alert-bar"><div :style="{ width: panel.powerwallPct + '%' }"></div></div>
              <div class="wp-ss-alert-pct">{{ panel.powerwallPct }}%</div>
            </div>
          </div>
          <div class="wp-ss-status">
            <div v-for="(r, i) in statusRows" :key="i" class="wp-ss-status-row" :style="{ color: r.color }">
              <span class="mdi" :class="r.icon"></span>
              <div>{{ r.text }}</div>
            </div>
          </div>
        </div>
      </template>
      <div class="wp-ss-hint">Touch to wake</div>
    </div>`,
};
