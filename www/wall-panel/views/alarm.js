// Alarm: state line, Alarmo segmented control, code dots, keypad. The
// keypad fills the remaining frame (~200×130px keys). Alarmo is the
// authority on the disarm code — a rejected disarm shows the red dots.
// Keypad and CodeDots are shared with the Home view's armed state.

export const CodeDots = {
  inject: ['panel'],
  props: { home: { type: Boolean, default: false } },
  computed: {
    dots() {
      const p = this.panel;
      return Array.from({ length: p.CONFIG.alarm.codeLength }, (_, i) => ({
        filled: i < p.ui.code.length,
        error: p.ui.codeError,
      }));
    },
  },
  template: `
    <div class="wp-code-dots" :class="home ? 'home' : 'full'">
      <div v-for="(d, i) in dots" :key="i" class="wp-code-dot"
           :class="{ filled: d.filled, error: d.error }"></div>
    </div>`,
};

export const Keypad = {
  inject: ['panel'],
  props: { full: { type: Boolean, default: false } },
  data() {
    return { keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'back'] };
  },
  methods: {
    label(k) { return k === 'back' ? '⌫' : k; },
  },
  template: `
    <div class="wp-keypad" :class="{ full }">
      <div v-for="k in keys" :key="k" class="wp-key" :class="{ dim: k === 'C' || k === 'back' }"
           @click="panel.keyTap(k)">
        <span :class="{ 'scale-back': k === 'back' }">{{ label(k) }}</span>
      </div>
    </div>`,
};

// Countdown + "why it won't arm" banner, shared by the Alarm view and the
// Home view's armed section.
export const AlarmNotice = {
  inject: ['panel'],
  props: { compact: { type: Boolean, default: false } },
  computed: {
    arming() {
      const s = this.panel.alarmState();
      return s === 'arming' || s === 'pending';
    },
    left() { return this.panel.ui.armingLeft; },
    progressPct() {
      const total = this.panel.ui.armingTotal;
      if (!total) return 0;
      return Math.max(0, Math.min(100, (this.left / total) * 100));
    },
    // A refused command (event) outranks the standing blocked reason, since
    // it is what the person just tried to do.
    failureText() {
      return this.panel.ui.armFailure?.text || this.panel.armBlockedReason || '';
    },
  },
  template: `
    <div v-if="arming" class="wp-alarm-countdown" :class="{ compact }">
      <div class="wp-alarm-countdown-head">
        <span class="mdi mdi-timer-outline"></span>
        <div class="wp-alarm-countdown-label">Arming — leave now</div>
        <div class="wp-alarm-countdown-secs">{{ left }}s</div>
      </div>
      <div class="wp-alarm-countdown-bar"><div :style="{ width: progressPct + '%' }"></div></div>
    </div>
    <div v-else-if="failureText" class="wp-alarm-failure" :class="{ compact }">
      <span class="mdi mdi-alert-circle-outline"></span>
      <div class="wp-alarm-failure-text">{{ failureText }}</div>
    </div>`,
};

export const AlarmView = {
  components: { CodeDots, Keypad, AlarmNotice },
  inject: ['panel'],
  computed: {
    segments() {
      const p = this.panel;
      const s = p.alarmState();
      const st = p.st(p.CONFIG.alarm.entity);
      const pendingTarget = st?.attributes?.arm_mode || st?.attributes?.next_state;
      const seg = (name, key, activeBg, activeFg, tap) => {
        const active = s === key;
        const arming = (s === 'arming' || s === 'pending') && pendingTarget === key;
        // Arm segments read as unavailable while Alarmo is blocked; the
        // reason is spelled out in the notice above.
        const blocked = key !== 'disarmed' && !active && !p.canArm;
        return {
          name,
          key,
          blocked,
          style: {
            background: active ? activeBg : arming ? 'rgba(226,193,104,0.45)' : 'transparent',
            color: active ? activeFg : 'var(--text)',
          },
          tap,
        };
      };
      return [
        seg('Armed Away', 'armed_away', 'var(--gold)', 'var(--text)', () => p.arm('armed_away')),
        seg('Armed Home', 'armed_home', 'var(--gold)', 'var(--text)', () => p.arm('armed_home')),
        seg('Disarmed', 'disarmed', 'var(--sage)', 'var(--ink-deep)', () => p.tapDisarm()),
      ];
    },
  },
  template: `
    <div class="wp-alarm">
      <div class="wp-alarm-state" :style="{ color: panel.alarmStateColor }">
        <span class="mdi" :class="panel.alarmShieldIcon"></span>
        <div class="wp-alarm-state-text">{{ panel.alarmStateText }}</div>
      </div>
      <AlarmNotice/>
      <div class="wp-segments">
        <div v-for="seg in segments" :key="seg.key" class="wp-segment"
             :class="{ blocked: seg.blocked }" :style="seg.style" @click="seg.tap">
          {{ seg.name }}
        </div>
      </div>
      <CodeDots/>
      <Keypad full/>
    </div>`,
};
