// Speaker Grouping — a bottom sheet (z 40), not a dropdown: eight 92px
// rows could never hit the 83px touch minimum in a dropdown. Group tiles
// set the exact selection; speaker rows toggle membership; the last
// remaining speaker cannot be removed. Grouping diffs join/unjoin against
// the live group_members rather than tearing the group down.
export const SpeakerGrouping = {
  inject: ['panel'],
  computed: {
    cfg() { return this.panel.CONFIG.sonos; },
    members() { return this.panel.groupMembers; },
    groups() {
      return this.cfg.groups.map((g) => ({
        ...g,
        selected: g.players.length === this.members.length && g.players.every((p) => this.members.includes(p)),
      }));
    },
    speakers() {
      return this.cfg.rooms.map((r) => ({ ...r, selected: this.members.includes(r.entity) }));
    },
  },
  methods: {
    close() { this.panel.ui.overlays.speakers = false; },
  },
  template: `
    <div class="wp-overlay speakers" @click="close">
      <div class="wp-sheet" @click.stop>
        <div class="wp-modal-head">
          <span class="mdi mdi-speaker-multiple" style="color: var(--slate-light)"></span>
          <div class="wp-modal-title">Speaker Grouping</div>
          <div class="wp-modal-close" @click="close"><span class="mdi mdi-close"></span></div>
        </div>
        <div class="wp-sheet-label-row">
          <div class="wp-sheet-label">Groups</div>
          <div class="wp-section-rule"></div>
        </div>
        <div class="wp-tile-grid groups">
          <div v-for="g in groups" :key="g.name" class="wp-speaker-tile group"
               :class="{ selected: g.selected }" @click="panel.setGroup(g.players.slice())">
            <span class="mdi mdi-speaker-multiple"></span>
            {{ g.name }}
          </div>
        </div>
        <div class="wp-sheet-label-row">
          <div class="wp-sheet-label">Speakers</div>
          <div class="wp-section-rule"></div>
        </div>
        <div class="wp-tile-grid">
          <div v-for="s in speakers" :key="s.entity" class="wp-speaker-tile"
               :class="{ selected: s.selected }" @click="panel.toggleGroupMember(s.entity)">
            <span class="mdi check" :class="s.selected ? 'mdi-check-circle' : 'mdi-checkbox-blank-circle-outline'"></span>
            <div class="name">{{ s.name }}</div>
          </div>
        </div>
        <div class="wp-sheet-hint">Tap to add or remove speakers from the group</div>
      </div>
    </div>`,
};
