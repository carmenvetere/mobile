// Notification Center overlay — centered modal over a scrim (z 45).
// Items come from the Notification Center sensor's attributes; dismiss /
// Clear all render only when the integration's services are configured
// in config.js (read-only center otherwise).
export const NotificationCenter = {
  inject: ['panel'],
  computed: {
    items() { return this.panel.notifItems; },
    cfg() { return this.panel.CONFIG.notifications; },
    canDismiss() { return !!this.cfg.dismissService; },
    canClear() { return !!this.cfg.clearAllService; },
  },
  methods: {
    close() { this.panel.ui.overlays.notifications = false; },
    dismiss(n) {
      const svc = this.cfg.dismissService;
      if (!svc) return;
      this.panel.call(svc.domain, svc.service, { [svc.idField || 'id']: n.id });
    },
    clearAll() {
      const svc = this.cfg.clearAllService;
      if (!svc) return;
      this.panel.call(svc.domain, svc.service, {});
    },
  },
  template: `
    <div class="wp-overlay notif" @click="close">
      <div class="wp-modal" @click.stop>
        <div class="wp-modal-head">
          <span class="mdi mdi-bell" style="color: var(--slate-deep)"></span>
          <div class="wp-modal-title">Notification Center</div>
          <div class="wp-modal-close" @click="close"><span class="mdi mdi-close"></span></div>
        </div>
        <div v-if="items.length" class="wp-notif-list">
          <div v-for="n in items" :key="n.id" class="wp-notif-row">
            <span class="mdi" :class="n.icon" :style="{ color: n.color }"></span>
            <div class="wp-notif-meta">
              <div class="wp-notif-title">{{ n.title }}</div>
              <div v-if="n.detail" class="wp-notif-detail">{{ n.detail }}</div>
            </div>
            <div v-if="canDismiss" class="wp-notif-dismiss" @click.stop="dismiss(n)">
              <span class="mdi mdi-close"></span>
            </div>
          </div>
        </div>
        <div v-else class="wp-notif-empty">
          <span class="mdi mdi-bell-off-outline"></span>
          <div>All clear</div>
        </div>
        <div v-if="items.length && canClear" class="wp-notif-clear" @click="clearAll">
          <span class="mdi mdi-check-all"></span>
          Clear all
        </div>
      </div>
    </div>`,
};
