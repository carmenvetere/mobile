// Section header: 26px icon · 28px/700 title · rule · optional 20px/700
// value. `later` adds the 28px top margin every group after the first gets.
// The default slot renders after the rule (e.g. the speaker-group button).
export const SectionHeader = {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    later: { type: Boolean, default: false },
    value: { type: String, default: '' },
    valueColor: { type: String, default: 'var(--slate-light)' },
  },
  template: `
    <div class="wp-section" :class="{ later }">
      <span class="mdi" :class="icon"></span>
      <div class="wp-section-title">{{ title }}</div>
      <div class="wp-section-rule"></div>
      <div v-if="value" class="wp-section-value" :style="{ color: valueColor }">{{ value }}</div>
      <slot></slot>
    </div>`,
};
