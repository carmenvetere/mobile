// Root component: hass plumbing, view switching, optimistic state, idle /
// screensaver timers, and the overlay stack. Views and components reach
// everything through the injected `panel` object — no view touches `hass`
// directly except through panel.st()/panel.call().
import { reactive, computed, watch } from './vendor/vue.esm-browser.prod.js';
import { CONFIG } from './config.js?v=6';
import { Header } from './components/header.js?v=6';
import { FooterNav } from './components/footer-nav.js?v=6';
import { OutageBanner } from './components/outage-banner.js?v=6';
import { HomeView } from './views/home.js?v=6';
import { ShadesView } from './views/shades.js?v=6';
import { LightsView } from './views/lights.js?v=6';
import { ClimateView } from './views/climate.js?v=6';
import { MusicView } from './views/music.js?v=6';
import { SettingsView } from './views/settings.js?v=6';
import { AlarmView } from './views/alarm.js?v=6';
import { Screensaver } from './overlays/screensaver.js?v=6';
import { NotificationCenter } from './overlays/notifications.js?v=6';
import { SpeakerGrouping } from './overlays/speaker-grouping.js?v=6';

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
    armingTotal: 0,
    armFailure: null,   // { reason, sensors: [names] } — cleared on the next arm attempt or state change
    pinnedRoom: null,   // explicit room pick; null = follow whatever is playing
    ss: { active: false, enteredAt: 0 },
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

  // Friendly names for a list/dict of sensor entity_ids (Alarmo reports
  // blockers as an `open_sensors` dict or an event `sensors` array).
  const sensorNames = (raw) => {
    const ids = Array.isArray(raw) ? raw : raw && typeof raw === 'object' ? Object.keys(raw) : [];
    return ids.map((id) => hass()?.states?.[id]?.attributes?.friendly_name || id);
  };

  // Join names the way a person would say them: "A", "A and B",
  // "A, B and C".
  const listNames = (names) => {
    if (names.length <= 1) return names[0] || '';
    return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
  };
  // Agreement helper: several doors are plural, and so is a single door
  // whose own name is ("Kitchen French Doors are open", not "is open").
  const agree = (names) => {
    const plural = names.length > 1 || /s$/i.test(names[0] || '');
    return { plural, is: plural ? 'are' : 'is', it: plural ? 'them' : 'it', itIs: plural ? 'they are' : 'it is' };
  };
  const isOpen = (id) => ['on', 'open'].includes(state(id));

  // Doors that are open right now, read from the door sensors themselves.
  // NOT from Alarmo's `open_sensors` attribute: that is a record of the
  // LAST failed arm or trigger and lingers afterwards, so using it as a
  // live list makes the panel claim doors are blocking when they aren't.
  const openDoors = computed(() => CONFIG.alarm.doorSensors
    .filter((d) => isOpen(d.entity))
    .map((d) => attr(d.entity, 'friendly_name') || d.name));

  // A heads-up, not a verdict: whether an open door actually blocks arming
  // depends on the mode (a door in the Home-mode bypass list won't), so
  // this states what is open and what it might mean, and never disables
  // the arm buttons.
  const doorNotice = computed(() => {
    if (alarmState() !== 'disarmed') return null;
    const open = openDoors.value;
    if (!open.length) return null;
    const g = agree(open);
    return {
      tone: 'warn',
      icon: 'mdi-door-open',
      title: listNames(open) + ' ' + g.is + ' open',
      detail: 'Arming away may fail until ' + g.itIs + ' closed.',
    };
  });

  const unavailableNotice = computed(() => {
    const s = alarmState();
    if (s !== 'unavailable' && s !== 'unknown') return null;
    return { tone: 'fault', icon: 'mdi-shield-off', title: 'Alarm unavailable', detail: 'Alarmo isn’t responding.' };
  });

  const REASON_TEXT = {
    invalid_code: 'The code wasn’t accepted.',
    not_allowed: 'Alarmo wouldn’t accept that command right now.',
  };
  // Alarmo fires alarmo_failed_to_arm when a command is refused; the state
  // never leaves disarmed, so without this the tap looks like it did
  // nothing. Here `sensors` IS authoritative — it is the set that actually
  // blocked this specific attempt.
  let failureTimer = null;
  const onFailedToArm = (ev) => {
    const d = ev?.data || {};
    const names = sensorNames(d.sensors);
    const g = agree(names);
    ui.armFailure = {
      icon: 'mdi-shield-alert-outline',
      title: 'Arming stopped',
      detail: names.length
        ? listNames(names) + ' ' + g.is + ' open — close ' + g.it + ' and try again.'
        : REASON_TEXT[d.reason] || 'Alarmo refused the command.',
    };
    clearTimeout(failureTimer);
    failureTimer = setTimeout(() => { ui.armFailure = null; }, CONFIG.alarm.failureNoticeSeconds * 1000);
  };

  // What the Alarm view shows under the state line, most specific first.
  const alarmNotice = computed(() => {
    if (unavailableNotice.value) return unavailableNotice.value;
    if (ui.armFailure) return { tone: 'warn', ...ui.armFailure };
    return doorNotice.value;
  });

  let unsubFailed = null;
  const subscribeAlarmEvents = () => {
    const conn = hass()?.connection;
    if (!conn?.subscribeEvents || unsubFailed) return;
    Promise.resolve(conn.subscribeEvents(onFailedToArm, 'alarmo_failed_to_arm'))
      .then((unsub) => { unsubFailed = unsub; })
      .catch(() => {});
  };

  const arm = (target) => {
    if (alarmState() === target) return;
    ui.pendingDisarm = false;
    ui.armFailure = null;
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
    subscribeAlarmEvents();
    if (s === 'arming' || s === 'pending') {
      const delay = parseInt(attr(CONFIG.alarm.entity, 'delay'), 10);
      const total = Number.isInteger(delay) && delay > 0 ? delay : CONFIG.alarm.exitDelaySeconds;
      ui.armingTotal = total;
      ui.armingLeft = total;
      ui.armFailure = null;
      armTicker = setInterval(() => { if (ui.armingLeft > 0) ui.armingLeft -= 1; }, 1000);
    } else {
      ui.armingLeft = 0;
      ui.armingTotal = 0;
      // Reaching an armed state means the last failure is stale.
      if (s !== 'disarmed') ui.armFailure = null;
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
  const roomIsPlaying = (entity) => state(entity) === 'playing';

  // The player the panel shows and controls. It FOLLOWS whatever is actually
  // playing — if the pool is playing and the media room is paused, the panel
  // shows the pool — unless the person picked a room themselves (a Music
  // room chip), which wins until the pin is cleared. The screensaver reads
  // the same value, so the two always agree.
  const activeRoom = computed(() => {
    if (ui.pinnedRoom) return ui.pinnedRoom;
    const playing = CONFIG.sonos.rooms.map((r) => r.entity).filter(roomIsPlaying);
    if (playing.length) return playing.includes(CONFIG.sonos.primary) ? CONFIG.sonos.primary : playing[0];
    return CONFIG.sonos.primary;
  });
  // Explicit pick from a room chip; cleared when the panel goes idle so the
  // wall returns to following the house.
  const pinRoom = (entity) => { ui.pinnedRoom = ui.pinnedRoom === entity ? null : entity; };

  const groupMembers = computed(() => {
    const room = activeRoom.value;
    const members = attr(room, 'group_members');
    const known = CONFIG.sonos.rooms.map((r) => r.entity);
    const list = Array.isArray(members) && members.length ? members.filter((m) => known.includes(m)) : [room];
    return list.length ? list : [room];
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
  const sonosPlaying = computed(() => roomIsPlaying(activeRoom.value));
  const sonosTrack = computed(() => attr(activeRoom.value, 'media_title') || 'Nothing playing');
  const sonosArtist = computed(() => attr(activeRoom.value, 'media_artist') || '');
  const sonosArt = computed(() => attr(activeRoom.value, 'entity_picture') || null);
  const sonosVolumePct = computed(() => {
    const v = attr(activeRoom.value, 'volume_level');
    return v === undefined || v === null ? 0 : Math.round(v * 100);
  });

  const sonosToggle = () => {
    const room = activeRoom.value;
    const svc = sonosPlaying.value ? 'media_pause' : 'media_play';
    call('media_player', svc, { entity_id: room },
      { [room]: { state: sonosPlaying.value ? 'paused' : 'playing' } });
  };
  const sonosNext = () => call('media_player', 'media_next_track', { entity_id: activeRoom.value });
  const sonosPrev = () => call('media_player', 'media_previous_track', { entity_id: activeRoom.value });
  const sonosSetVolume = (pct) => {
    const capped = Math.min(pct, CONFIG.sonos.maxVolume);
    const level = capped / 100;
    for (const m of groupMembers.value) {
      call('media_player', 'volume_set', { entity_id: m, volume_level: level },
        { [m]: { attributes: { volume_level: level } } });
    }
  };
  // Diff target vs actual group membership (never tear down and rebuild).
  const setGroup = (targets) => {
    if (!targets.length) return;
    const current = groupMembers.value;
    const leader = targets.includes(activeRoom.value) ? activeRoom.value : targets[0];
    ui.pinnedRoom = leader;
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
    const room = activeRoom.value;
    call('media_player', 'play_media', {
      entity_id: room,
      media_content_id: fav.contentId,
      media_content_type: fav.type,
    }, { [room]: { state: 'playing' } });
  };

  // ---- notifications -------------------------------------------------------
  // The Notification Center integration renders HA persistent notifications,
  // which do NOT appear in hass.states — the sensor only carries the count.
  // The list comes from the same WebSocket subscription HA's own notification
  // drawer uses.
  const notifStore = reactive({ subscribed: false, byId: {} });
  let unsubNotif = null;
  const applyNotifMsg = (msg) => {
    const incoming = msg?.notifications || {};
    if (msg?.type === 'removed') {
      for (const id of Object.keys(incoming)) delete notifStore.byId[id];
    } else {
      // 'current' | 'added' | 'updated'
      if (msg?.type === 'current') notifStore.byId = {};
      for (const [id, n] of Object.entries(incoming)) notifStore.byId[id] = n;
    }
    notifStore.subscribed = true;
  };
  const subscribeNotifications = () => {
    const conn = hass()?.connection;
    if (!conn?.subscribeMessage || unsubNotif) return;
    Promise.resolve(conn.subscribeMessage(applyNotifMsg, { type: 'persistent_notification/subscribe' }))
      .then((unsub) => { unsubNotif = unsub; })
      .catch(() => {});
  };

  const priorityColor = () => attr(CONFIG.notifications.prioritySensor, 'color') || 'var(--slate-deep)';
  const priorityIcon = () => (attr(CONFIG.notifications.prioritySensor, 'icon') || 'mdi:bell').replace(/^mdi:/, 'mdi-');

  const notifItems = computed(() => {
    if (notifStore.subscribed) {
      return Object.entries(notifStore.byId)
        .map(([id, n]) => ({
          id: n.notification_id || id,
          icon: 'mdi-bell-outline',
          color: 'var(--slate-deep)',
          title: n.title || 'Notification',
          detail: n.message || '',
          createdAt: n.created_at || '',
        }))
        .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    }
    // Fallback: some builds expose the list on the sensor instead. Take the
    // first attribute that is an array of objects.
    const attrs = hass()?.states?.[CONFIG.notifications.countSensor]?.attributes || {};
    for (const v of Object.values(attrs)) {
      if (Array.isArray(v) && v.length && typeof v[0] === 'object') {
        return v.map((n, i) => ({
          id: n.id ?? n.notification_id ?? n.dedup_tag ?? String(i),
          icon: (n.icon || 'mdi:bell').replace(/^mdi:/, 'mdi-'),
          color: n.color || 'var(--slate-deep)',
          title: n.title || n.name || 'Notification',
          detail: n.detail || n.message || '',
        }));
      }
    }
    return [];
  });

  // The bell shows what the drawer will show, once we have the real list.
  const notifCount = computed(() => {
    if (notifStore.subscribed) return notifItems.value.length;
    const v = num(CONFIG.notifications.countSensor);
    return v === null ? 0 : Math.round(v);
  });

  const dismissNotification = (n) =>
    call('persistent_notification', 'dismiss', { notification_id: n.id });
  const clearAllNotifications = () => {
    for (const n of notifItems.value) dismissNotification(n);
  };

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
    ui.ss.enteredAt = Date.now();
    ui.ss.active = true;
    // Drop the manual room pick, so the wall goes back to showing whatever
    // the house is actually playing.
    ui.pinnedRoom = null;
    closeMenus();
    setBacklight(CONFIG.display.dimPct);
  };
  let deepIdle = false;
  // Waking ALWAYS lands on Home — whoever walks up to the panel next is not
  // necessarily whoever left it on the Climate view.
  const wake = () => {
    if (!ui.ss.active) return;
    ui.ss.active = false;
    ui.view = 'home';
    closeMenus();
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

  // HA assigns `hass` after the element connects (the loader imports the
  // panel asynchronously), so the WebSocket subscriptions have to wait for
  // the connection to appear rather than being fired once at mount.
  const stopConnWatch = watch(() => !!hass()?.connection, (ready) => {
    if (!ready) return;
    subscribeNotifications();
    subscribeAlarmEvents();
  }, { immediate: true });

  const destroy = () => {
    clearInterval(clockTicker);
    clearInterval(idleTicker);
    clearInterval(armTicker);
    clearTimeout(sceneTimer);
    clearTimeout(codeTimer);
    stopAlarmWatch();
    stopConnWatch();
    clearTimeout(failureTimer);
    if (unsubFailed) { unsubFailed(); unsubFailed = null; }
    if (unsubNotif) { unsubNotif(); unsubNotif = null; }
    for (const t of Object.values(optTimers)) clearTimeout(t);
  };

  // reactive() so computed refs auto-unwrap in templates: views can write
  // `panel.outage`, `panel.homeScenes` etc. with no `.value` noise.
  return reactive({
    CONFIG, ui, st, state, attr, num, call, go, closeMenus,
    alarmState, armed, arm, tapDisarm, keyTap,
    alarmStateText, alarmStateColor, alarmShieldIcon,
    alarmNotice, openDoors,
    outage, powerwallPct,
    tapScene, sceneRoster, homeScenes,
    lightIsOn, lightPct, lightsOnCount, setLightPct, toggleLight,
    roomName, groupMembers, groupLabel, sonosPlaying, sonosTrack, sonosArtist, sonosArt,
    sonosVolumePct, sonosToggle, sonosNext, sonosPrev, sonosSetVolume,
    activeRoom, roomIsPlaying, pinRoom, setGroup, toggleGroupMember, playFavorite,
    notifCount, notifItems,
    dismissNotification, clearAllNotifications, subscribeNotifications,
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
