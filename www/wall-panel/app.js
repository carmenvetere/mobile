// Root component: hass plumbing, view switching, optimistic state, idle /
// screensaver timers, and the overlay stack. Views and components reach
// everything through the injected `panel` object — no view touches `hass`
// directly except through panel.st()/panel.call().
import { reactive, computed, watch } from './vendor/vue.esm-browser.prod.js';
import { CONFIG } from './config.js?v=1';
import { Header } from './components/header.js?v=1';
import { FooterNav } from './components/footer-nav.js?v=1';
import { OutageBanner } from './components/outage-banner.js?v=1';
import { HomeView } from './views/home.js?v=1';
import { ShadesView } from './views/shades.js?v=1';
import { LightsView } from './views/lights.js?v=1';
import { ClimateView } from './views/climate.js?v=1';
import { MusicView } from './views/music.js?v=1';
import { SettingsView } from './views/settings.js?v=1';
import { AlarmView } from './views/alarm.js?v=1';
import { Screensaver } from './overlays/screensaver.js?v=1';
import { NotificationCenter } from './overlays/notifications.js?v=1';
import { SpeakerGrouping } from './overlays/speaker-grouping.js?v=1';

const VIEWS = {
  home: HomeView,
  shades: ShadesView,
  lights: LightsView,
  climate: ClimateView,
  music: MusicView,
  settings: SettingsView,
  alarm: AlarmView,
};

export function createPanel(store) {
  const ui = reactive({
    view: 'home',
    activeScene: null,       // transient scene pulse (1.6 s)
    overlays: { notifications: false, speakers: false },
    climateMenus: { mode: false, fan: false },
    pendingDisarm: false,
    code: '',
    codeError: false,
    armingLeft: 0,
    activeRoom: CONFIG.sonos.primary,
    ss: { active: false, viewBefore: 'home', enteredAt: 0 },
    lastTouch: Date.now(),
    now: Date.now(),         // 30 s clock tick
  });

  const optimistic = reactive({});
  const optTimers = {};
  const lastBrightness = {}; // entity -> last non-zero brightness pct

  const hass = () => store.hass;

  // Optimistic-merged view of an entity: local patch wins until the
  // WebSocket echoes the real state or the patch expires (~3 s).
  const st = (id) => {
    const real = hass()?.states?.[id];
    const o = optimistic[id];
    if (!o) return real;
    if (!real) return { entity_id: id, state: o.state, attributes: o.attributes || {} };
    return {
      entity_id: id,
      state: o.state !== undefined ? o.state : real.state,
      attributes: { ...real.attributes, ...(o.attributes || {}) },
    };
  };
  const state = (id) => st(id)?.state;
  const attr = (id, name) => st(id)?.attributes?.[name];
  const num = (id) => {
    const v = parseFloat(state(id));
    return Number.isNaN(v) ? null : v;
  };

  const patchOptimistic = (id, patch) => {
    const prev = optimistic[id];
    optimistic[id] = {
      state: patch.state !== undefined ? patch.state : prev?.state,
      attributes: { ...(prev?.attributes || {}), ...(patch.attributes || {}) },
    };
    clearTimeout(optTimers[id]);
    optTimers[id] = setTimeout(() => { delete optimistic[id]; }, CONFIG.optimistic.expireMs);
  };

  // Fire a service; `patches` is { entityId: {state, attributes} } applied
  // optimistically before the call so the tap feels instant. NEVER used
  // for the alarm — arming/disarming shows only what Alarmo reports.
  const call = (domain, service, data, patches) => {
    if (patches) for (const [id, patch] of Object.entries(patches)) patchOptimistic(id, patch);
    return Promise.resolve(hass()?.callService(domain, service, data));
  };

  const closeMenus = () => {
    ui.overlays.notifications = false;
    ui.overlays.speakers = false;
    ui.climateMenus.mode = false;
    ui.climateMenus.fan = false;
  };

  const go = (view) => {
    ui.view = view;
    closeMenus();
  };

  // ---- alarm ---------------------------------------------------------------
  const alarmState = () => hass()?.states?.[CONFIG.alarm.entity]?.state || 'unknown';
  const armed = () => !['disarmed', 'unknown', 'unavailable'].includes(alarmState());

  const arm = (target) => {
    if (alarmState() === target) return;
    ui.pendingDisarm = false;
    const service = target === 'armed_away' ? 'alarm_arm_away' : 'alarm_arm_home';
    call('alarm_control_panel', service, { entity_id: CONFIG.alarm.entity });
  };

  const tapDisarm = () => {
    if (alarmState() === 'disarmed') return;
    ui.pendingDisarm = true;
    ui.code = '';
    ui.codeError = false;
  };

  let codeTimer = null;
  const keyTap = (k) => {
    if (k === 'C') { ui.code = ''; ui.codeError = false; return; }
    if (k === 'back') { ui.code = ui.code.slice(0, -1); ui.codeError = false; return; }
    if (ui.code.length >= CONFIG.alarm.codeLength) return;
    ui.code += k;
    ui.codeError = false;
    if (ui.code.length === CONFIG.alarm.codeLength) {
      const code = ui.code;
      clearTimeout(codeTimer);
      codeTimer = setTimeout(() => {
        // Alarmo is the authority on the code: a rejected disarm throws and
        // shows the red dots. No optimistic patch here on purpose.
        call('alarm_control_panel', 'alarm_disarm', { entity_id: CONFIG.alarm.entity, code })
          .then(() => { ui.code = ''; ui.pendingDisarm = false; })
          .catch(() => { ui.codeError = true; ui.code = ''; });
      }, 250);
    }
  };

  const alarmStateText = computed(() => {
    const s = alarmState();
    if (s === 'arming' || s === 'pending') return 'Arming… ' + ui.armingLeft + 's';
    return { disarmed: 'Disarmed', armed_home: 'Armed Home', armed_away: 'Armed Away', armed_night: 'Armed Night', triggered: 'Triggered' }[s] || s;
  });
  const alarmStateColor = computed(() => {
    const s = alarmState();
    if (s === 'disarmed') return 'var(--sage)';
    if (s === 'arming' || s === 'pending') return 'var(--amber)';
    if (s === 'triggered') return 'var(--err)';
    return 'var(--gold)';
  });
  const alarmShieldIcon = computed(() => {
    const s = alarmState();
    return s === 'disarmed' ? 'mdi-shield-off-outline' : s === 'triggered' ? 'mdi-shield-alert' : 'mdi-shield-lock';
  });

  // Arming countdown: seconds from Alarmo's delay attribute when it reports
  // one, else the configured exit delay; ticked locally.
  let armTicker = null;
  let lastAlarm = null;
  const watchAlarm = () => {
    const s = alarmState();
    if (s === lastAlarm) return;
    lastAlarm = s;
    clearInterval(armTicker);
    if (s === 'arming' || s === 'pending') {
      const delay = parseInt(attr(CONFIG.alarm.entity, 'delay'), 10);
      ui.armingLeft = Number.isInteger(delay) && delay > 0 ? delay : CONFIG.alarm.exitDelaySeconds;
      armTicker = setInterval(() => { if (ui.armingLeft > 0) ui.armingLeft -= 1; }, 1000);
    } else {
      ui.armingLeft = 0;
      if (s === 'disarmed') ui.pendingDisarm = false;
    }
  };

  // ---- power / outage ------------------------------------------------------
  const outage = computed(() => state(CONFIG.power.gridStatus) === CONFIG.power.gridDownState);
  const powerwallPct = computed(() => {
    const v = num(CONFIG.power.powerwallCharge);
    return v === null ? 0 : Math.max(0, Math.min(100, Math.round(v)));
  });

  // ---- scenes --------------------------------------------------------------
  let sceneTimer = null;
  const tapScene = (sc) => {
    clearTimeout(sceneTimer);
    ui.activeScene = sc.id;
    sceneTimer = setTimeout(() => { ui.activeScene = null; }, CONFIG.scenes.pulseMs);
    call('scene', 'turn_on', { entity_id: sc.scene });
  };
  const sceneRoster = computed(() => CONFIG.scenes.roster.map((sc) => {
    if (sc.dinnerVariant && state(CONFIG.scenes.dinnerParty) === 'on') return { ...sc, ...sc.dinnerVariant };
    if (sc.outdoorOffVariant && state(CONFIG.scenes.outdoorLightsOn) === 'on') return { ...sc, ...sc.outdoorOffVariant };
    return sc;
  }));
  const homeScenes = computed(() => {
    const dropN = (armed() ? CONFIG.scenes.shedWhenArmed : 0) + (outage.value ? CONFIG.scenes.shedWhenOutage : 0);
    const dropped = CONFIG.scenes.shedOrder.slice(0, dropN);
    return sceneRoster.value.filter((sc) => !dropped.includes(sc.id));
  });

  // ---- lights --------------------------------------------------------------
  const allLights = () => [...CONFIG.lights.basement, ...CONFIG.lights.outdoor];
  const lightIsOn = (l) => state(l.entity) === 'on';
  const lightPct = (l) => {
    if (!lightIsOn(l)) return 0;
    if (l.switch) return 100;
    const b = attr(l.entity, 'brightness');
    return b === undefined || b === null ? 100 : Math.round((b / 255) * 100);
  };
  const lightsOnCount = computed(() => allLights().filter(lightIsOn).length);

  const setLightPct = (l, pct) => {
    if (l.switch) return; // switches have no brightness
    if (pct <= 0) {
      call('light', 'turn_off', { entity_id: l.entity }, { [l.entity]: { state: 'off' } });
    } else {
      lastBrightness[l.entity] = pct;
      call('light', 'turn_on', { entity_id: l.entity, brightness_pct: pct },
        { [l.entity]: { state: 'on', attributes: { brightness: Math.round((pct / 100) * 255) } } });
    }
  };
  const toggleLight = (l) => {
    const domain = l.switch ? 'switch' : 'light';
    if (lightIsOn(l)) {
      const pct = lightPct(l);
      if (pct > 0) lastBrightness[l.entity] = pct;
      call(domain, 'turn_off', { entity_id: l.entity }, { [l.entity]: { state: 'off' } });
    } else if (l.switch) {
      call(domain, 'turn_on', { entity_id: l.entity }, { [l.entity]: { state: 'on' } });
    } else {
      const pct = lastBrightness[l.entity] || CONFIG.lights.defaultBrightnessPct;
      call('light', 'turn_on', { entity_id: l.entity, brightness_pct: pct },
        { [l.entity]: { state: 'on', attributes: { brightness: Math.round((pct / 100) * 255) } } });
    }
  };

  // ---- sonos ---------------------------------------------------------------
  const roomName = (entity) => CONFIG.sonos.rooms.find((r) => r.entity === entity)?.name || entity;
  const groupMembers = computed(() => {
    const members = attr(ui.activeRoom, 'group_members');
    const known = CONFIG.sonos.rooms.map((r) => r.entity);
    const list = Array.isArray(members) && members.length ? members.filter((m) => known.includes(m)) : [ui.activeRoom];
    return list.length ? list : [ui.activeRoom];
  });
  const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
  // The label rule Carmen asked for — one pure function used everywhere the
  // group is named (Home header, Music status, screensaver).
  const groupLabel = computed(() => {
    const members = groupMembers.value;
    const match = CONFIG.sonos.groups.find((g) => sameSet(g.players, members));
    if (match) return match.name;
    if (members.length === 1) return roomName(members[0]);
    return members.length + ' Speakers';
  });
  const sonosPlaying = computed(() => state(ui.activeRoom) === 'playing');
  const sonosTrack = computed(() => attr(ui.activeRoom, 'media_title') || 'Nothing playing');
  const sonosArtist = computed(() => attr(ui.activeRoom, 'media_artist') || '');
  const sonosArt = computed(() => attr(ui.activeRoom, 'entity_picture') || null);
  const sonosVolumePct = computed(() => {
    const v = attr(ui.activeRoom, 'volume_level');
    return v === undefined || v === null ? 0 : Math.round(v * 100);
  });

  const sonosToggle = () => {
    const svc = sonosPlaying.value ? 'media_pause' : 'media_play';
    call('media_player', svc, { entity_id: ui.activeRoom },
      { [ui.activeRoom]: { state: sonosPlaying.value ? 'paused' : 'playing' } });
  };
  const sonosNext = () => call('media_player', 'media_next_track', { entity_id: ui.activeRoom });
  const sonosPrev = () => call('media_player', 'media_previous_track', { entity_id: ui.activeRoom });
  const sonosSetVolume = (pct) => {
    const capped = Math.min(pct, CONFIG.sonos.maxVolume);
    const level = capped / 100;
    for (const m of groupMembers.value) {
      call('media_player', 'volume_set', { entity_id: m, volume_level: level },
        { [m]: { attributes: { volume_level: level } } });
    }
  };
  // Solo a room: it becomes the active player and leaves any group.
  const soloRoom = (entity) => {
    ui.activeRoom = entity;
    const members = attr(entity, 'group_members');
    if (Array.isArray(members) && members.length > 1) {
      call('media_player', 'unjoin', { entity_id: entity });
    }
  };
  // Diff target vs actual group membership (never tear down and rebuild).
  const setGroup = (targets) => {
    if (!targets.length) return;
    const current = groupMembers.value;
    const leader = targets.includes(ui.activeRoom) ? ui.activeRoom : targets[0];
    ui.activeRoom = leader;
    const toAdd = targets.filter((t) => !current.includes(t) && t !== leader);
    const toRemove = current.filter((c) => !targets.includes(c));
    if (toAdd.length) call('media_player', 'join', { entity_id: leader, group_members: toAdd });
    for (const r of toRemove) call('media_player', 'unjoin', { entity_id: r });
  };
  const toggleGroupMember = (entity) => {
    const members = groupMembers.value;
    if (members.includes(entity)) {
      if (members.length === 1) return; // the last speaker cannot be removed
      setGroup(members.filter((m) => m !== entity));
    } else {
      setGroup([...members, entity]);
    }
  };
  const playFavorite = (fav) => {
    call('media_player', 'play_media', {
      entity_id: ui.activeRoom,
      media_content_id: fav.contentId,
      media_content_type: fav.type,
    }, { [ui.activeRoom]: { state: 'playing' } });
  };

  // ---- notifications -------------------------------------------------------
  const notifCount = computed(() => {
    const v = num(CONFIG.notifications.countSensor);
    return v === null ? 0 : Math.round(v);
  });
  const notifItems = computed(() => {
    const attrs = hass()?.states?.[CONFIG.notifications.countSensor]?.attributes || {};
    for (const key of CONFIG.notifications.itemAttrCandidates) {
      if (Array.isArray(attrs[key])) {
        return attrs[key].map((n, i) => ({
          id: n.id ?? n.dedup_tag ?? String(i),
          icon: (n.icon || 'mdi:bell').replace(/^mdi:/, 'mdi-'),
          color: n.color || 'var(--slate-deep)',
          title: n.title || n.name || 'Notification',
          detail: n.detail || n.message || '',
        }));
      }
    }
    return [];
  });

  // ---- screensaver / idle --------------------------------------------------
  const setBacklight = (pct) => {
    const entity = CONFIG.display.backlightEntity;
    if (!entity) return;
    const domain = entity.split('.')[0];
    if (domain === 'light') {
      if (pct <= 0) call('light', 'turn_off', { entity_id: entity });
      else call('light', 'turn_on', { entity_id: entity, brightness_pct: pct });
    } else if (domain === 'number' || domain === 'input_number') {
      call(domain, 'set_value', { entity_id: entity, value: pct });
    }
  };

  const enterScreensaver = () => {
    if (ui.ss.active) return;
    ui.ss.viewBefore = ui.view;
    ui.ss.enteredAt = Date.now();
    ui.ss.active = true;
    closeMenus();
    setBacklight(CONFIG.display.dimPct);
  };
  let deepIdle = false;
  const wake = () => {
    if (!ui.ss.active) return;
    // Total idle = time on the screensaver + the idle that triggered it
    // (lastTouch is already reset by the waking touch itself).
    const idleFor = (Date.now() - ui.ss.enteredAt) / 1000 + CONFIG.display.idleAfterSeconds;
    ui.ss.active = false;
    ui.view = idleFor >= CONFIG.display.deepIdleAfterSeconds ? 'home' : ui.ss.viewBefore;
    deepIdle = false;
    setBacklight(100);
  };
  const touch = () => { ui.lastTouch = Date.now(); };
  let idleTicker = null;
  const startIdleLoop = () => {
    idleTicker = setInterval(() => {
      const idleFor = (Date.now() - ui.lastTouch) / 1000;
      if (!ui.ss.active && idleFor >= CONFIG.display.idleAfterSeconds) enterScreensaver();
      if (ui.ss.active && !deepIdle && idleFor >= CONFIG.display.deepIdleAfterSeconds) {
        deepIdle = true;
        setBacklight(CONFIG.display.minPct);
      }
    }, 5000);
  };

  // ---- clock ---------------------------------------------------------------
  let clockTicker = null;
  const startClock = () => {
    clockTicker = setInterval(() => { ui.now = Date.now(); }, CONFIG.display.clockTickSeconds * 1000);
  };
  const timeStr = computed(() => new Date(ui.now).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));

  // React to Alarmo transitions (arming countdown, pendingDisarm reset).
  const stopAlarmWatch = watch(() => hass()?.states?.[CONFIG.alarm.entity]?.state, watchAlarm, { immediate: true });

  const destroy = () => {
    clearInterval(clockTicker);
    clearInterval(idleTicker);
    clearInterval(armTicker);
    clearTimeout(sceneTimer);
    clearTimeout(codeTimer);
    stopAlarmWatch();
    for (const t of Object.values(optTimers)) clearTimeout(t);
  };

  // reactive() so computed refs auto-unwrap in templates: views can write
  // `panel.outage`, `panel.homeScenes` etc. with no `.value` noise.
  return reactive({
    CONFIG, ui, st, state, attr, num, call, go, closeMenus,
    alarmState, armed, arm, tapDisarm, keyTap,
    alarmStateText, alarmStateColor, alarmShieldIcon,
    outage, powerwallPct,
    tapScene, sceneRoster, homeScenes,
    lightIsOn, lightPct, lightsOnCount, setLightPct, toggleLight,
    roomName, groupMembers, groupLabel, sonosPlaying, sonosTrack, sonosArtist, sonosArt,
    sonosVolumePct, sonosToggle, sonosNext, sonosPrev, sonosSetVolume,
    soloRoom, setGroup, toggleGroupMember, playFavorite,
    notifCount, notifItems,
    enterScreensaver, wake, touch, startIdleLoop, startClock, timeStr, destroy,
  });
}

export const App = {
  components: {
    WpHeader: Header,
    FooterNav,
    OutageBanner,
    Screensaver,
    NotificationCenter,
    SpeakerGrouping,
  },
  inject: ['store'],
  data() {
    return { panel: null };
  },
  provide() {
    // provide() runs before created(): build the panel here.
    this.panel = createPanel(this.store);
    return { panel: this.panel };
  },
  computed: {
    viewComponent() { return VIEWS[this.panel.ui.view] || VIEWS.home; },
    fillView() { return ['home', 'music', 'alarm'].includes(this.panel.ui.view); },
  },
  mounted() {
    this.panel.startClock();
    this.panel.startIdleLoop();
    this._touch = () => this.panel.touch();
    this.$el.addEventListener('pointerdown', this._touch, true);
  },
  beforeUnmount() {
    this.$el.removeEventListener('pointerdown', this._touch, true);
    this.panel.destroy();
  },
  template: `
    <div class="wp-root" v-if="store.hass">
      <WpHeader/>
      <OutageBanner v-if="panel.outage"/>
      <div class="wp-content" :class="{ fill: fillView }">
        <component :is="viewComponent"/>
      </div>
      <FooterNav/>
      <NotificationCenter v-if="panel.ui.overlays.notifications"/>
      <SpeakerGrouping v-if="panel.ui.overlays.speakers"/>
      <Screensaver v-if="panel.ui.ss.active"/>
    </div>`,
};
