// Home — adaptive status. Scenes in a 2-column grid (shedding under the
// disarm keypad and the outage banner), then a lower half that fills the
// remaining frame: Now Playing while disarmed, the disarm keypad while
// armed or arming.
import { SectionHeader } from '../components/section-header.js?v=5';
import { Keypad, CodeDots, AlarmNotice } from './alarm.js?v=5';

export const HomeView = {
  components: { SectionHeader, Keypad, CodeDots, AlarmNotice },
  inject: ['panel'],
  computed: {
    volumePct() { return this.panel.sonosVolumePct; },
  },
  methods: {
    volDrag(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const panel = this.panel;
      const apply = (ev) => {
        const pct = Math.max(0, Math.min(100, Math.round(((ev.clientX - rect.left) / rect.width) * 100)));
        panel.sonosSetVolume(pct);
      };
      const move = (ev) => apply(ev);
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      apply(e);
    },
    openSpeakers() { this.panel.ui.overlays.speakers = true; },
  },
  template: `
    <div class="wp-view-fill">
      <SectionHeader icon="mdi-lamps" title="Scenes"/>
      <div class="wp-scene-grid">
        <div v-for="sc in panel.homeScenes" :key="sc.id" class="wp-scene"
             :class="{ active: panel.ui.activeScene === sc.id }" @click="panel.tapScene(sc)">
          <span class="mdi" :class="sc.icon"></span>
          <div class="wp-scene-name">{{ sc.name }}</div>
        </div>
      </div>

      <!-- disarmed → Now Playing -->
      <div v-if="!panel.armed()" class="wp-home-lower">
        <SectionHeader icon="mdi-music" title="Now Playing" later>
          <div class="wp-speaker-label" @click="openSpeakers">
            <div>{{ panel.groupLabel }}</div>
            <span class="mdi mdi-chevron-down"></span>
          </div>
        </SectionHeader>
        <div class="wp-now-playing">
          <div class="wp-np-row">
            <div class="wp-np-art" :style="panel.sonosArt ? { backgroundImage: 'url(' + panel.sonosArt + ')' } : {}">
              <span v-if="!panel.sonosArt" class="mdi mdi-music-note"></span>
            </div>
            <div class="wp-np-meta">
              <div class="wp-np-track">{{ panel.sonosTrack }}</div>
              <div class="wp-np-artist">{{ panel.sonosArtist }}</div>
            </div>
            <div class="wp-np-controls">
              <div class="wp-circle c84" @click="panel.sonosPrev()"><span class="mdi mdi-skip-previous" style="font-size:44px"></span></div>
              <div class="wp-circle c99 play" @click="panel.sonosToggle()">
                <span class="mdi" :class="panel.sonosPlaying ? 'mdi-pause' : 'mdi-play'" style="font-size:52px"></span>
              </div>
              <div class="wp-circle c84" @click="panel.sonosNext()"><span class="mdi mdi-skip-next" style="font-size:44px"></span></div>
            </div>
          </div>
          <div class="wp-vol-row">
            <span class="mdi mdi-volume-high"></span>
            <div class="wp-vol-track" @pointerdown="volDrag">
              <div class="wp-vol-fill" :style="{ width: volumePct + '%' }"></div>
            </div>
            <div class="wp-vol-pct">{{ volumePct }}%</div>
          </div>
        </div>
      </div>

      <!-- armed or arming → disarm keypad -->
      <div v-else class="wp-home-lower">
        <SectionHeader :icon="panel.alarmShieldIcon" :title="panel.alarmStateText" later
                       :style="{ color: panel.alarmStateColor }"/>
        <AlarmNotice compact/>
        <CodeDots home/>
        <Keypad/>
      </div>
    </div>`,
};
