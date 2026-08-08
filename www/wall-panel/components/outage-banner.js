// Power Outage banner: full-bleed under the header while the house runs on
// Powerwall backup. One color (#E0695B) throughout — reviewed decision.
// Tapping navigates to Settings. Its presence sheds two Home scenes.
export const OutageBanner = {
  inject: ['panel'],
  template: `
    <div class="wp-outage" @click="panel.go('settings')">
      <span class="mdi mdi-alert"></span>
      <div class="wp-outage-title">Power Outage</div>
      <div class="wp-outage-spacer"></div>
      <span class="mdi mdi-battery-60"></span>
      <div class="wp-outage-bar"><div :style="{ width: panel.powerwallPct + '%' }"></div></div>
      <div class="wp-outage-pct">{{ panel.powerwallPct }}%</div>
    </div>`,
};
