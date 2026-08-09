// Music — full-screen Sonos. Room chips switch which player the panel shows
// and controls (grouping lives in the Speaker Grouping sheet).
import { SectionHeader } from '../components/section-header.js?v=6';

export const MusicView = {
  components: { SectionHeader },
  inject: ['panel'],
  computed: {
    cfg() { return this.panel.CONFIG.sonos; },
    status() {
      return (this.panel.sonosPlaying ? 'Playing · ' : 'Paused · ') + this.panel.groupLabel;
    },
    artStyle() {
      const art = this.panel.sonosArt;
      return art ? { backgroundImage: 'url(' + art + ')' } : {};
    },
    volumePct() { return this.panel.sonosVolumePct; },
  },
  watch: {
    // The row scrolls, so the selected room can start off-screen (the panel
    // follows whatever is playing, which may be the eighth chip).
    'panel.activeRoom': { handler() { this.$nextTick(() => this.revealActiveChip()); }, immediate: true },
  },
  mounted() { this.revealActiveChip(); },
  methods: {
    revealActiveChip() {
      const el = this.$el?.querySelector?.('.wp-room-chip.active');
      el?.scrollIntoView({ block: 'nearest', inline: 'center' });
    },
    // The chip you're listening to is filled; rooms that are playing but
    // not selected get a dot, so you can see where sound is coming from.
    chipActive(r) { return r.entity === this.panel.activeRoom; },
    chipPlaying(r) { return this.panel.roomIsPlaying(r.entity) && !this.chipActive(r); },
    chipGrouped(r) { return this.panel.groupMembers.includes(r.entity) && !this.chipActive(r); },
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
  },
  template: `
    <div class="wp-music">
      <div class="wp-room-chips wp-hscroll">
        <div v-for="r in cfg.rooms" :key="r.entity" class="wp-room-chip"
             :data-room="r.entity"
             :class="{ active: chipActive(r), grouped: chipGrouped(r) }"
             @click="panel.pinRoom(r.entity)">
          <span v-if="chipPlaying(r)" class="wp-room-chip-dot"></span>{{ r.name }}
        </div>
      </div>
      <div class="wp-music-body">
        <div class="wp-art-panel" :style="artStyle">
          <div class="wp-art-meta">
            <div class="wp-art-status">{{ status }}</div>
            <div class="wp-art-track">{{ panel.sonosTrack }}</div>
            <div class="wp-art-artist">{{ panel.sonosArtist }}</div>
          </div>
        </div>
        <div class="wp-transport-card">
          <div class="wp-transport">
            <div class="wp-circle c99" @click="panel.sonosPrev()"><span class="mdi mdi-skip-previous"></span></div>
            <div class="wp-circle c120 play" @click="panel.sonosToggle()">
              <span class="mdi" :class="panel.sonosPlaying ? 'mdi-pause' : 'mdi-play'"></span>
            </div>
            <div class="wp-circle c99" @click="panel.sonosNext()"><span class="mdi mdi-skip-next"></span></div>
          </div>
          <div class="wp-vol-row big">
            <span class="mdi mdi-volume-high"></span>
            <div class="wp-vol-track" @pointerdown="volDrag">
              <div class="wp-vol-fill" :style="{ width: volumePct + '%' }"></div>
            </div>
            <div class="wp-vol-pct big">{{ volumePct }}%</div>
          </div>
        </div>
        <div>
          <SectionHeader icon="mdi-star" title="Favorites"/>
          <div class="wp-fav-grid">
            <div v-for="f in cfg.favorites" :key="f.id" class="wp-fav" @click="panel.playFavorite(f)">
              <div class="wp-fav-art" :style="{ background: f.art }"></div>
              <div class="wp-fav-name">{{ f.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
};
