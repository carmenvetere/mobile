// Fixed 100px footer nav, icons only. Alarm is deliberately absent —
// it is reached from the header shield (6 items is the max at this width).
const NAV = [
  { id: 'home', icon: 'mdi-home', label: 'Home' },
  { id: 'shades', icon: 'mdi-roller-shade', label: 'Shades' },
  { id: 'lights', icon: 'mdi-lightbulb', label: 'Lights' },
  { id: 'climate', icon: 'mdi-fan', label: 'Climate' },
  { id: 'music', icon: 'mdi-music', label: 'Music' },
  { id: 'settings', icon: 'mdi-cog', label: 'Settings' },
];

export const FooterNav = {
  inject: ['panel'],
  data() { return { nav: NAV }; },
  template: `
    <div class="wp-footer">
      <div v-for="n in nav" :key="n.id" class="wp-nav-item"
           :class="{ active: panel.ui.view === n.id }" @click="panel.go(n.id)">
        <div class="wp-nav-pill"><span class="mdi" :class="n.icon"></span></div>
        <div v-if="panel.CONFIG.footerLabels" class="wp-nav-label">{{ n.label }}</div>
      </div>
    </div>`,
};
