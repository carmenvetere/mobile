// Mobile dashboard Music card.
//
// Lit port of the wall-panel-sonos-card (github.com/carmenvetere/custom-media-card),
// restyled to Dune Mist and wired to this config's music backend:
//   sensor.music_controlled_player  which room the card controls (Auto or pinned)
//   input_select.music_player       Auto / pinned room
//   sensor.music_favorites / _recent Music Assistant favourites and recents
//   script.music_play_item          plays through the room's Music Assistant twin
//   script.music_toggle_group       join / leave the controlled group
//   script.music_refresh_library    re-pulls favourites and recents
//
// Kept from the wall-panel card: optimistic play / mute / grouping / volume,
// throttled slider drags, group volume that preserves per-room offsets,
// coordinator metadata fallback, station art, the Music Assistant library
// grouped by service, and the error toast.

import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

import { cardStyles } from "./styles";
import * as Svc from "./services";
import type {
  HomeAssistant,
  HassEntity,
  MobileMusicCardConfig,
  RoomConfig,
  ListRow,
  LibItem,
  LibCategory,
  SheetName,
  StationArt,
} from "./types";
import type { MaLibraryItem } from "./services";

export const CARD_VERSION = "1.0.0";
const CARD_TAG = "mobile-music-card";

const DEFAULTS = {
  controller: "sensor.music_controlled_player",
  selector: "input_select.music_player",
  favorites: "sensor.music_favorites",
  recent: "sensor.music_recent",
  play_script: "script.music_play_item",
  group_script: "script.music_toggle_group",
  refresh_script: "script.music_refresh_library",
  max_volume: 40,
  art_max: 320,
};

// Display names for Music Assistant provider domains.
const MA_SERVICE_NAMES: Record<string, string> = {
  spotify: "Spotify",
  tidal: "Tidal",
  qobuz: "Qobuz",
  deezer: "Deezer",
  apple_music: "Apple Music",
  ytmusic: "YouTube Music",
  soundcloud: "SoundCloud",
  tunein: "TuneIn",
  radiobrowser: "Radio",
  plex: "Plex",
  jellyfin: "Jellyfin",
  subsonic: "Subsonic",
  filesystem_local: "Local Library",
  filesystem_smb: "Local Library",
  builtin: "Local Library",
  library: "Library",
};
const maServiceLabel = (raw: string): string =>
  MA_SERVICE_NAMES[raw] ?? raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const maUriScheme = (uri: string | undefined): string | undefined =>
  uri?.match(/^([a-z0-9_]+):\/\//i)?.[1]?.toLowerCase();

const LIB_TYPES: [string, LibCategory][] = [
  ["playlist", "playlist"],
  ["radio", "station"],
  ["album", "album"],
  ["artist", "artist"],
];
const LIB_TABS = ["All", "Favorites", "Playlists", "Stations", "Albums", "Artists"] as const;
type LibTab = (typeof LIB_TABS)[number];
const TAB_CATEGORY: Partial<Record<LibTab, LibCategory>> = {
  Playlists: "playlist",
  Stations: "station",
  Albums: "album",
  Artists: "artist",
};
const CATEGORY_LABEL: Record<LibCategory, string> = {
  playlist: "Playlist",
  station: "Station",
  album: "Album",
  artist: "Artist",
};
const CATEGORY_ICON: Record<LibCategory, string> = {
  playlist: "mdi:playlist-music",
  station: "mdi:radio",
  album: "mdi:album",
  artist: "mdi:account-music",
};
const LIB_RENDER_CAP = 150;
const LIB_TTL_MS = 5 * 60 * 1000;

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
};
const prettyId = (id: string) =>
  id.replace(/^media_player\./, "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const decodeField = (v: string | undefined) =>
  (v ?? "").replace(/%7C/gi, "|").replace(/%3B/gi, ";");
const typeIcon = (t: string) =>
  t.includes("radio") ? "mdi:radio"
    : t === "album" ? "mdi:album"
      : t === "artist" ? "mdi:account-music"
        : t === "track" ? "mdi:music-note"
          : "mdi:playlist-music";

@customElement(CARD_TAG)
export class MobileMusicCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: MobileMusicCardConfig;
  private _rooms: Required<RoomConfig>[] = [];
  private _roomIds: string[] = [];
  private _watch: string[] = [];

  @query("dialog") private _dialog?: HTMLDialogElement;
  @state() private _sheet: SheetName | null = null;
  private _pushedHistory = false;

  // Optimistic UI. Each latch flips on tap and clears when hass catches up
  // or its safety timer fires, so a failed call can't leave it lying.
  @state() private _optPlaying: boolean | null = null;
  @state() private _optMuted: boolean | null = null;
  @state() private _pendingGroup: Record<string, boolean> = {};
  @state() private _pendingSelect: string | null = null;
  @state() private _dragVol: Record<string, number> = {};
  @state() private _loadingName: string | null = null;
  @state() private _skipping = false;
  @state() private _refreshing = false;
  private _prevTitle: string | undefined;
  private _timers: Record<string, ReturnType<typeof setTimeout>> = {};

  @state() private _toast: string | null = null;

  // Music Assistant library (Library sheet)
  @state() private _lib: LibItem[] | null = null;
  @state() private _libLoading = false;
  @state() private _libError: string | null = null;
  @state() private _libTab: LibTab = "All";
  @state() private _libSvc = "All";
  @state() private _libQ = "";
  private _libFetchedAt = 0;

  // Wall clock for interpolating the progress bar between hass updates.
  @state() private _now = Date.now();
  private _tick?: ReturnType<typeof setInterval>;

  // ── Lovelace lifecycle ────────────────────────────────────────────
  setConfig(config: MobileMusicCardConfig) {
    if (!config?.rooms || !Array.isArray(config.rooms) || config.rooms.length === 0) {
      throw new Error("mobile-music-card: 'rooms' must list the Sonos media_player entities.");
    }
    this._config = { ...config };
    this._rooms = config.rooms.map((r) => {
      const o: RoomConfig = typeof r === "string" ? { entity: r } : r;
      if (!o.entity) throw new Error("mobile-music-card: every room needs an 'entity'.");
      return { entity: o.entity, name: o.name ?? prettyId(o.entity), icon: o.icon ?? "mdi:speaker" };
    });
    this._roomIds = this._rooms.map((r) => r.entity);
    this._watch = [
      this._c("controller"), this._c("selector"), this._c("favorites"), this._c("recent"),
      ...this._roomIds,
    ];
    this.style.setProperty("--mm-art-max", `${this._c("art_max")}px`);
  }

  getCardSize() {
    return 12;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("popstate", this._onPopState);
    this._tick = setInterval(() => {
      // Only advance the progress bar when it can be seen and is moving.
      if (document.visibilityState !== "visible" || this._sheet) return;
      const st = this.hass?.states[this._ctrl()];
      if (st?.state === "playing" && this._meta(st).media_duration) this._now = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("popstate", this._onPopState);
    if (this._tick) clearInterval(this._tick);
    for (const t of Object.values(this._timers)) clearTimeout(t);
    this._timers = {};
    if (this._sheet) this._closeSheet();
  }

  // hass changes dozens of times a second on a busy install. Re-render only
  // when one of the entities this card reads has a new state object.
  shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size > 1 || !changed.has("hass") || !this._config) return true;
    const prev = changed.get("hass") as HomeAssistant | undefined;
    if (!prev) return true;
    return this._watch.some((id) => prev.states[id] !== this.hass.states[id]);
  }

  willUpdate(changed: PropertyValues) {
    if (!changed.has("hass") || !this._config || !this.hass) return;
    const ctrlId = this._ctrl();
    const st = this.hass.states[ctrlId];
    if (this._optPlaying !== null && (st?.state === "playing") === this._optPlaying) {
      this._clearLatch("play");
    }
    if (this._optMuted !== null && !!st?.attributes.is_volume_muted === this._optMuted) {
      this._clearLatch("mute");
    }
    if (this._pendingSelect !== null) {
      const sel = this.hass.states[this._c("selector")]?.state;
      const room = this._rooms.find((r) => r.name === this._pendingSelect);
      const sensorOk = !room || this.hass.states[this._c("controller")]?.state === room.entity;
      if (sel === this._pendingSelect && sensorOk) this._clearLatch("select");
    }
    if (Object.keys(this._pendingGroup).length) {
      const members = this._members(ctrlId);
      for (const [id, want] of Object.entries(this._pendingGroup)) {
        if (members.includes(id) === want) this._clearLatch(`group:${id}`);
      }
    }
    const title = st ? this._meta(st).media_title : undefined;
    if ((this._loadingName !== null || this._skipping) && title && title !== this._prevTitle) {
      this._clearLatch("loading");
      this._clearLatch("skip");
    }
    // Release volume latches once hass reports the value we sent.
    for (const key of Object.keys(this._dragVol)) {
      if (!this._timers[`vol:${key}`]) continue; // still dragging
      const real = key === "group" ? this._groupVol(this._members(ctrlId)) : this._vol(key);
      if (Math.abs(real - this._dragVol[key]) <= 1) this._clearLatch(`vol:${key}`);
    }
    if (this._refreshing && changed.get("hass")) {
      const prev = (changed.get("hass") as HomeAssistant).states[this._c("favorites")];
      if (prev && prev !== this.hass.states[this._c("favorites")]) this._clearLatch("refresh");
    }
  }

  updated() {
    // Keep the native dialog in step with _sheet.
    const d = this._dialog;
    if (!d) return;
    if (this._sheet && !d.open) {
      try { d.showModal(); } catch { d.setAttribute("open", ""); }
    } else if (!this._sheet && d.open) {
      d.close();
    }
  }

  // ── Config / entity helpers ───────────────────────────────────────
  private _c<K extends keyof typeof DEFAULTS>(key: K): (typeof DEFAULTS)[K] {
    return ((this._config as any)?.[key] ?? DEFAULTS[key]) as (typeof DEFAULTS)[K];
  }
  private _maxVol(): number {
    return Math.max(1, Math.min(100, Math.round(this._c("max_volume"))));
  }
  // The controlled room: a pending pick wins, then the controller sensor.
  private _ctrl(): string {
    if (this._pendingSelect && this._pendingSelect !== "Auto") {
      const r = this._rooms.find((x) => x.name === this._pendingSelect);
      if (r) return r.entity;
    }
    const s = this.hass?.states[this._c("controller")]?.state;
    return s && s.startsWith("media_player.") ? s : this._roomIds[0];
  }
  private _isAuto(): boolean {
    return (this._pendingSelect ?? this.hass.states[this._c("selector")]?.state) === "Auto";
  }
  private _members(ctrlId: string): string[] {
    const g = this.hass.states[ctrlId]?.attributes.group_members as string[] | undefined;
    const m = (g ?? []).filter((x) => this._roomIds.includes(x));
    return m.length ? m : [ctrlId];
  }
  private _room(id: string) {
    return this._rooms.find((r) => r.entity === id);
  }
  private _label(id: string): string {
    return this._room(id)?.name ?? this.hass.states[id]?.attributes.friendly_name ?? prettyId(id);
  }
  private _vol(id: string): number {
    return Math.round((this.hass.states[id]?.attributes.volume_level ?? 0) * 100);
  }
  private _groupVol(members: string[]): number {
    if (members.length <= 1) return this._vol(members[0]);
    return Math.round(members.reduce((a, id) => a + this._vol(id), 0) / members.length);
  }
  // Sonos only reports the track on the group coordinator; members say
  // "playing" with empty metadata. Borrow it from whichever member has it.
  private _meta(st: HassEntity): Record<string, any> {
    const a = st.attributes;
    if (a.media_title || a.entity_picture) return a;
    for (const id of (a.group_members as string[] | undefined) ?? []) {
      if (id === st.entity_id) continue;
      const other = this.hass.states[id]?.attributes;
      if (other && (other.media_title || other.entity_picture)) return other;
    }
    return a;
  }
  private _stationArt(contentId: string | undefined): StationArt | undefined {
    const list = this._config.station_art ?? [];
    if (!contentId || !list.length) return undefined;
    const cid = contentId.toLowerCase();
    return list.find((e) => e.match && cid.includes(e.match.toLowerCase()));
  }
  private _rows(sensor: string): ListRow[] {
    const raw = this.hass.states[sensor]?.attributes.items;
    if (!raw) return [];
    return String(raw)
      .split(";")
      .filter((r) => r.trim())
      .map((r) => {
        const f = r.split("|");
        return {
          name: f[0] ?? "",
          sub: f[1] ?? "",
          type: f[2] ?? "playlist",
          uri: decodeField(f[3]),
          expandable: f[4] === "1",
          image: decodeField(f[5]),
        };
      })
      .filter((r) => r.name && r.uri);
  }

  // ── Latches, toast, instant taps ──────────────────────────────────
  private _latch(key: string, ms: number, clear: () => void) {
    if (this._timers[key]) clearTimeout(this._timers[key]);
    this._timers[key] = setTimeout(() => {
      delete this._timers[key];
      clear();
    }, ms);
  }
  private _clearLatch(key: string) {
    if (this._timers[key]) {
      clearTimeout(this._timers[key]);
      delete this._timers[key];
    }
    if (key === "play") this._optPlaying = null;
    else if (key === "mute") this._optMuted = null;
    else if (key === "select") this._pendingSelect = null;
    else if (key === "loading") this._loadingName = null;
    else if (key === "skip") this._skipping = false;
    else if (key === "refresh") this._refreshing = false;
    else if (key === "toast") this._toast = null;
    else if (key.startsWith("group:")) {
      const id = key.slice(6);
      if (id in this._pendingGroup) {
        const n = { ...this._pendingGroup };
        delete n[id];
        this._pendingGroup = n;
      }
    } else if (key.startsWith("vol:")) {
      const k = key.slice(4);
      if (k in this._dragVol) {
        const n = { ...this._dragVol };
        delete n[k];
        this._dragVol = n;
      }
    }
  }
  private _svc<T>(p: Promise<T>, context: string) {
    return p.catch((err: unknown) => {
      const detail = err instanceof Error ? err.message : (err as { message?: string })?.message ?? String(err);
      this._toast = `${context}: ${detail}`;
      this._latch("toast", 5000, () => { this._toast = null; });
    });
  }
  // Fire on pointerdown for fixed controls (saves 80-150 ms per tap on a
  // phone); the click that follows is swallowed. Keyboard clicks still work.
  private _instant(fn: () => void) {
    return (e: Event) => {
      const el = e.currentTarget as HTMLElement & { _mmPressed?: boolean };
      if (e.type === "pointerdown") {
        const pe = e as PointerEvent;
        if (pe.pointerType === "mouse" && pe.button !== 0) return;
        el._mmPressed = true;
        setTimeout(() => { el._mmPressed = false; }, 400);
        fn();
      } else if (el._mmPressed) {
        el._mmPressed = false;
      } else {
        fn();
      }
    };
  }

  // ── Sheets (native dialog + a history entry so Back closes them) ──
  private _openSheet(s: SheetName) {
    const wasOpen = !!this._sheet;
    this._sheet = s;
    if (s === "library") this._maybeFetchLib();
    if (!wasOpen) {
      try {
        history.pushState({ ...(history.state ?? {}), mmSheet: s }, "",
          `${location.pathname}${location.search}#music-${s}`);
        this._pushedHistory = true;
      } catch { /* history unavailable */ }
    }
  }
  private _closeSheet() {
    if (!this._sheet) return;
    this._sheet = null;
    if (this._pushedHistory) {
      this._pushedHistory = false;
      history.back();
    }
  }
  private _onPopState = () => {
    if (this._sheet && !(history.state && history.state.mmSheet)) {
      this._pushedHistory = false;
      this._sheet = null;
    }
  };

  // ── Actions ───────────────────────────────────────────────────────
  private _onPlayPause(playing: boolean) {
    const id = this._ctrl();
    this._optPlaying = !playing;
    this._latch("play", 5000, () => { this._optPlaying = null; });
    this._svc(Svc.playPause(this.hass, id), `Couldn't ${playing ? "pause" : "play"} ${this._label(id)}`);
  }
  private _onSkip(dir: "next" | "prev") {
    const id = this._ctrl();
    const st = this.hass.states[id];
    this._prevTitle = st ? this._meta(st).media_title : undefined;
    this._skipping = true;
    this._latch("skip", 5000, () => { this._skipping = false; });
    this._svc(dir === "next" ? Svc.next(this.hass, id) : Svc.prev(this.hass, id),
      `Couldn't skip ${dir === "next" ? "forward" : "back"}`);
  }
  private _onMute(muted: boolean) {
    const members = this._members(this._ctrl());
    this._optMuted = !muted;
    this._latch("mute", 5000, () => { this._optMuted = null; });
    this._svc(Svc.setMuted(this.hass, members, !muted), `Couldn't ${muted ? "unmute" : "mute"}`);
  }
  private _select(option: string) {
    // Pending join/leave marks belong to the previous group; drop them.
    for (const id of Object.keys(this._pendingGroup)) this._clearLatch(`group:${id}`);
    this._pendingSelect = option;
    this._latch("select", 5000, () => { this._pendingSelect = null; });
    this._svc(Svc.selectOption(this.hass, this._c("selector"), option), `Couldn't switch to ${option}`);
  }
  private _toggleGroup(id: string) {
    const ctrlId = this._ctrl();
    if (id === ctrlId) return;
    const joining = !(this._pendingGroup[id] ?? this._members(ctrlId).includes(id));
    this._pendingGroup = { ...this._pendingGroup, [id]: joining };
    this._latch(`group:${id}`, 6000, () => this._clearLatch(`group:${id}`));
    this._svc(Svc.runScript(this.hass, this._c("group_script"), { entity: id }),
      `Couldn't ${joining ? "add" : "remove"} ${this._label(id)}`);
  }
  private _play(uri: string, type: string, title: string) {
    const st = this.hass.states[this._ctrl()];
    this._prevTitle = st ? this._meta(st).media_title : undefined;
    this._loadingName = title;
    this._latch("loading", 8000, () => { this._loadingName = null; });
    this._svc(
      Svc.runScript(this.hass, this._c("play_script"), {
        media_content_id: uri,
        media_content_type: type,
        source: "library",
        expandable: false,
      }),
      `Couldn't play "${title}"`,
    );
    this._closeSheet();
  }
  private _refresh() {
    this._refreshing = true;
    this._latch("refresh", 15000, () => { this._refreshing = false; });
    this._svc(Svc.runScript(this.hass, this._c("refresh_script")), "Couldn't refresh the library");
    if (this._sheet === "library") this._maybeFetchLib(true);
    else this._libFetchedAt = 0;
  }

  // Group volume: every member moves by the same delta, so per-room offsets
  // set in the volumes sheet survive. Raising never lifts a room past the
  // cap, and never pulls down a room that already sits above it.
  private _setGroupVolume(target: number) {
    const members = this._members(this._ctrl());
    const max = this._maxVol();
    if (members.length <= 1) {
      this._svc(Svc.setVolume(this.hass, members[0], target), "Couldn't set the volume");
      return;
    }
    const delta = target - this._groupVol(members);
    if (delta === 0) return;
    for (const id of members) {
      const cur = this._vol(id);
      const next = delta > 0 ? Math.max(cur, Math.min(max, cur + delta)) : Math.max(0, cur + delta);
      if (next !== cur) {
        this._svc(Svc.setVolume(this.hass, id, next), `Couldn't set ${this._label(id)} volume`);
      }
    }
  }
  private _holdVol(key: string, v: number) {
    this._dragVol = { ...this._dragVol, [key]: v };
    this._latch(`vol:${key}`, 2500, () => this._clearLatch(`vol:${key}`));
  }

  // Pointer drag with service calls throttled to one per 120 ms; the final
  // value is always sent on release.
  private _slide(e: PointerEvent, key: string, max: number, onChange: (v: number) => void) {
    const el = e.currentTarget as HTMLElement;
    if (this._timers[`vol:${key}`]) {
      clearTimeout(this._timers[`vol:${key}`]);
      delete this._timers[`vol:${key}`];
    }
    const SEND_MS = 120;
    let lastSent = 0;
    let pending: number | null = null;
    let pendingTimer: ReturnType<typeof setTimeout> | null = null;
    const send = (v: number) => {
      lastSent = Date.now();
      pending = null;
      if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
      onChange(v);
    };
    const update = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const v = Math.round(Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)) * max);
      this._dragVol = { ...this._dragVol, [key]: v };
      const since = Date.now() - lastSent;
      if (since >= SEND_MS) send(v);
      else {
        pending = v;
        if (!pendingTimer) {
          pendingTimer = setTimeout(() => {
            pendingTimer = null;
            if (pending !== null) send(pending);
          }, SEND_MS - since);
        }
      }
    };
    try { el.setPointerCapture(e.pointerId); } catch { /* noop */ }
    update(e);
    const move = (ev: PointerEvent) => update(ev);
    const up = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      try { el.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
      if (pending !== null) send(pending);
      this._holdVol(key, this._dragVol[key]);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  }
  private _sliderKey(e: KeyboardEvent, key: string, cur: number, max: number, onChange: (v: number) => void) {
    const step = Math.max(1, Math.round(max / 20));
    let v: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") v = Math.min(max, cur + step);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") v = Math.max(0, cur - step);
    else if (e.key === "Home") v = 0;
    else if (e.key === "End") v = max;
    if (v === null) return;
    e.preventDefault();
    if (v === cur) return;
    this._holdVol(key, v);
    onChange(v);
  }

  // ── Music Assistant library ───────────────────────────────────────
  private _maybeFetchLib(force = false) {
    if (this._libLoading) return;
    const fresh = Date.now() - this._libFetchedAt < LIB_TTL_MS;
    if (!force && fresh && (this._lib || this._libError)) return;
    void this._fetchLib();
  }
  private async _fetchLib() {
    this._libLoading = true;
    this._libError = null;
    try {
      let items: LibItem[];
      try {
        items = await this._fetchLibViaGetLibrary();
      } catch {
        items = await this._fetchLibViaBrowse();
      }
      const order: Record<LibCategory, number> = { playlist: 0, station: 1, album: 2, artist: 3 };
      items.sort((a, b) =>
        a.service.localeCompare(b.service)
        || order[a.category] - order[b.category]
        || a.title.localeCompare(b.title));
      this._lib = items;
      if (this._libSvc !== "All" && !items.some((i) => i.service === this._libSvc)) this._libSvc = "All";
    } catch (err) {
      this._libError = `Couldn't load the Music Assistant library: ${err instanceof Error ? err.message : err}`;
    } finally {
      this._libFetchedAt = Date.now();
      this._libLoading = false;
    }
  }
  private async _fetchLibViaGetLibrary(): Promise<LibItem[]> {
    const entry = await Svc.maConfigEntryId(this.hass);
    const out: LibItem[] = [];
    const results = await Promise.all(
      LIB_TYPES.map(([t]) => Svc.maGetLibrary(this.hass, entry, t).catch(() => [] as MaLibraryItem[])),
    );
    results.forEach((items, i) => {
      for (const it of items) {
        const li = this._toLibItem(it, LIB_TYPES[i][1], LIB_TYPES[i][0]);
        if (li) out.push(li);
      }
    });
    if (!out.length && results.every((r) => r.length === 0)) {
      throw new Error("empty library response");
    }
    return out;
  }
  private _toLibItem(it: MaLibraryItem, category: LibCategory, mediaType: string): LibItem | null {
    if (typeof it.uri !== "string" || typeof it.name !== "string") return null;
    const scheme = maUriScheme(it.uri);
    const raw = (scheme && scheme !== "library" ? scheme : undefined)
      ?? (it.provider && it.provider !== "library" ? it.provider : undefined)
      ?? it.provider_mappings?.find((m) => m.provider_domain)?.provider_domain
      ?? "library";
    const img = typeof it.image === "string"
      ? it.image
      : typeof (it.image as { path?: unknown } | undefined)?.path === "string"
        ? (it.image as { path: string }).path
        : undefined;
    return {
      title: it.name,
      uri: it.uri,
      media_type: it.media_type ?? mediaType,
      image: img && /^https?:\/\//i.test(img) ? img : undefined,
      category,
      service: maServiceLabel(raw),
      favorite: !!it.favorite,
    };
  }
  // The Music Assistant player for a Sonos room, matched the same way the
  // basement wall panel does it: the music_assistant media_player whose
  // friendly name equals the Sonos entity's friendly name.
  private _maPlayer(sonos: string): string | undefined {
    const want = this.hass.states[sonos]?.attributes.friendly_name;
    const reg = this.hass.entities ?? {};
    if (want) {
      for (const [id, e] of Object.entries(reg)) {
        if (e.platform !== "music_assistant" || !id.startsWith("media_player.") || id === sonos) continue;
        if (this.hass.states[id]?.attributes.friendly_name === want) return id;
      }
    }
    return this.hass.states[this._c("favorites")]?.attributes.player || undefined;
  }
  // Fallback for Music Assistant builds without get_library (or users who
  // can't read config entries): browse the room's Music Assistant twin.
  private async _fetchLibViaBrowse(): Promise<LibItem[]> {
    const ma = this._maPlayer(this._ctrl());
    if (!ma) throw new Error("no Music Assistant player found");
    const root = await Svc.browseMedia(this.hass, ma);
    const sections: [RegExp, LibCategory][] = [
      [/playlist/i, "playlist"],
      [/radio|station/i, "station"],
      [/album/i, "album"],
      [/artist/i, "artist"],
    ];
    const items: LibItem[] = [];
    for (const child of root.children ?? []) {
      const sec = sections.find(([re]) => re.test(child.title) || re.test(child.media_content_id ?? ""));
      if (!sec || !child.can_expand) continue;
      const node = await Svc.browseMedia(this.hass, ma, child.media_content_id, child.media_content_type);
      for (const it of node.children ?? []) {
        if (!it.can_play || !it.media_content_id) continue;
        items.push({
          title: it.title,
          uri: it.media_content_id,
          media_type: it.media_content_type ?? sec[1],
          image: it.thumbnail,
          category: sec[1],
          service: "Library",
          favorite: false,
        });
      }
    }
    return items;
  }

  // ── Render ────────────────────────────────────────────────────────
  render() {
    if (!this._config || !this.hass) return nothing;
    const ctrlId = this._ctrl();
    const st = this.hass.states[ctrlId];
    const members = this._members(ctrlId);
    return html`
      <div class="root">
        ${this._toast ? html`
          <div class="toast" role="alert">
            <span class="msg">${this._toast}</span>
            <button aria-label="Dismiss" @click=${() => this._clearLatch("toast")}>×</button>
          </div>` : nothing}
        ${this._renderPlayer(ctrlId, st, members)}
        ${this._renderTiles(members)}
        ${this._renderFavorites()}
      </div>
      <dialog aria-label=${this._sheetTitle()}
        @cancel=${(e: Event) => { e.preventDefault(); this._closeSheet(); }}
        @click=${(e: Event) => { if (e.target === e.currentTarget) this._closeSheet(); }}>
        ${this._sheet ? this._renderSheet(ctrlId, members) : nothing}
      </dialog>
    `;
  }

  private _renderPlayer(ctrlId: string, st: HassEntity | undefined, members: string[]) {
    if (!st) {
      return html`<div class="player"><div class="empty">${ctrlId} is unavailable.</div></div>`;
    }
    const a = st.attributes;
    const meta = this._meta(st);
    const isPlaying = st.state === "playing";
    const playing = this._optPlaying ?? isPlaying;
    const muted = this._optMuted ?? !!a.is_volume_muted;
    const contentId = meta.media_content_id ?? a.media_content_id;
    const station = this._stationArt(contentId);
    const pic: string | undefined = station?.image ?? meta.entity_picture;
    const title = this._loadingName
      ?? meta.media_title
      ?? station?.name
      ?? (isPlaying ? (meta.app_name ?? a.app_name ?? "Playing") : "Nothing playing");
    const artist = meta.media_artist ?? "";
    const album = meta.media_album_name ?? "";
    const sub = (this._loadingName || this._skipping)
      ? "Loading…"
      : (artist && album ? `${artist} · ${album}` : artist || album)
        || meta.media_channel || meta.media_playlist || a.source || "";
    const dur = Number(meta.media_duration) || 0;
    const updatedAt = meta.media_position_updated_at ? new Date(meta.media_position_updated_at).getTime() : 0;
    const elapsed = isPlaying && updatedAt ? Math.max(0, (this._now - updatedAt) / 1000) : 0;
    const pos = Math.min(dur, (Number(meta.media_position) || 0) + elapsed);
    const max = this._maxVol();
    const vol = "group" in this._dragVol ? this._dragVol.group : this._groupVol(members);
    const chip = `${this._label(ctrlId)}${members.length > 1 ? ` +${members.length - 1}` : ""}`;

    const prev = this._instant(() => this._onSkip("prev"));
    const play = this._instant(() => this._onPlayPause(playing));
    const next = this._instant(() => this._onSkip("next"));
    const mute = this._instant(() => this._onMute(muted));

    return html`
      <div class="player">
        <div class="art">
          ${pic
            ? html`<img src=${pic} alt="" @error=${(e: Event) => ((e.target as HTMLElement).style.display = "none")}>`
            : html`<ha-icon icon="mdi:album"></ha-icon>`}
        </div>
        <div class="title-row">
          <div style="min-width:0">
            <div class="track">${title}</div>
            <div class="sub">${sub}</div>
          </div>
          <button class="chip" aria-label="Choose speaker" @click=${() => this._openSheet("speakers")}>
            <ha-icon class="ic" icon="mdi:speaker-multiple"></ha-icon>
            <span class="lbl">${chip}</span>
            <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
          </button>
        </div>
        ${dur > 0 ? html`
          <div class="progress">
            <span>${fmt(pos)}</span>
            <div class="bar"><span style=${styleMap({ width: `${(pos / dur) * 100}%` })}></span></div>
            <span>${fmt(dur)}</span>
          </div>` : nothing}
        <div class="transport">
          <button class="t-btn" aria-label="Previous track" @pointerdown=${prev} @click=${prev}>
            <ha-icon icon="mdi:skip-previous"></ha-icon></button>
          <button class="t-btn play" aria-label=${playing ? "Pause" : "Play"} @pointerdown=${play} @click=${play}>
            <ha-icon icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon></button>
          <button class="t-btn" aria-label="Next track" @pointerdown=${next} @click=${next}>
            <ha-icon icon="mdi:skip-next"></ha-icon></button>
        </div>
        <div class="vol-row">
          <button class=${classMap({ "sq-btn": true, on: muted })} aria-label=${muted ? "Unmute" : "Mute"}
            aria-pressed=${muted} @pointerdown=${mute} @click=${mute}>
            <ha-icon icon=${muted ? "mdi:volume-off" : "mdi:volume-medium"}></ha-icon>
          </button>
          ${this._slider("group", vol, max, (v) => this._setGroupVolume(v),
            members.length > 1 ? "Group volume" : "Volume", undefined, false, muted)}
          <button class="sq-btn" aria-label="Speaker volumes" @click=${() => this._openSheet("volumes")}>
            <ha-icon icon="mdi:tune-vertical-variant"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }

  private _slider(
    key: string, value: number, max: number, onChange: (v: number) => void,
    name: string, icon?: string, flat = false, muted = false,
  ): TemplateResult {
    const shown = key in this._dragVol ? this._dragVol[key] : value;
    const pct = max > 0 ? Math.max(0, Math.min(100, (shown / max) * 100)) : 0;
    const clip = styleMap({ clipPath: `inset(0 ${100 - pct}% 0 0)` });
    const label = (dark: boolean) => html`
      <div class=${classMap({ lbl: true, dark })} style=${dark ? clip : nothing}>
        ${icon ? html`<ha-icon icon=${icon}></ha-icon>` : nothing}
        <span class="name">${name}</span>
        <span class="val">${shown}</span>
      </div>`;
    return html`
      <div class=${classMap({ slider: true, flat, muted })} role="slider" tabindex="0"
        aria-label=${name} aria-valuemin="0" aria-valuemax=${max} aria-valuenow=${shown}
        @pointerdown=${(e: PointerEvent) => this._slide(e, key, max, onChange)}
        @keydown=${(e: KeyboardEvent) => this._sliderKey(e, key, shown, max, onChange)}>
        <div class="fill" style=${clip}></div>
        ${label(false)}
        ${label(true)}
      </div>
    `;
  }

  private _renderTiles(members: string[]) {
    const n = members.length;
    return html`
      <div class="tiles">
        <button class="tile" @click=${() => this._openSheet("speakers")}>
          <span class="ic slate"><ha-icon icon="mdi:speaker-multiple"></ha-icon></span>
          <span class="big">${n} ${n === 1 ? "room" : "rooms"}</span>
          <span class="small">Speakers</span>
        </button>
        <button class="tile" @click=${() => this._openSheet("library")}>
          <span class="ic sage"><ha-icon icon="mdi:music-box-multiple"></ha-icon></span>
          <span class="big">Library</span>
          <span class="small">Playlists · Stations</span>
        </button>
      </div>
    `;
  }

  private _sep(name: string, icon: string, small = false, action?: TemplateResult) {
    return html`
      <div class=${classMap({ sep: true, small })}>
        <ha-icon class="ic" icon=${icon}></ha-icon>
        <span class="name">${name}</span>
        <span class="line"></span>
        ${action ?? nothing}
      </div>`;
  }
  private _refreshBtn() {
    return html`
      <button class=${classMap({ act: true, spin: this._refreshing || this._libLoading })}
        aria-label="Refresh from Music Assistant" @click=${() => this._refresh()}>
        <ha-icon icon="mdi:refresh"></ha-icon>
      </button>`;
  }

  private _renderFavorites() {
    const sensor = this.hass.states[this._c("favorites")];
    const rows = this._rows(this._c("favorites"));
    const status: string = sensor?.attributes.status ?? "";
    let body: TemplateResult;
    if (rows.length) {
      body = html`
        <div class="strip">
          ${rows.map((r) => html`
            <button class=${classMap({ fav: true, radio: r.type === "radio", album: r.type === "album" })}
              @click=${() => this._play(r.uri, r.type, r.name)}>
              ${r.image ? html`<img src=${r.image} alt="" loading="lazy"
                @error=${(e: Event) => ((e.target as HTMLElement).style.display = "none")}>` : nothing}
              <span class="n">${r.name}</span>
              <span class="s">${r.sub}</span>
            </button>`)}
        </div>`;
    } else {
      const msg = !sensor
        ? `${this._c("favorites")} not found`
        : status && status !== "ok"
          ? status
          : "Loading favourites from Music Assistant…";
      body = html`<div class=${classMap({ empty: true, error: !!sensor && !!status && status !== "ok" && !/no favourites/i.test(status) })}>${msg}</div>`;
    }
    return html`${this._sep("Favorites", "mdi:heart", false, this._refreshBtn())}${body}`;
  }

  // ── Sheets ────────────────────────────────────────────────────────
  private _sheetTitle() {
    return this._sheet === "speakers" ? "Speakers"
      : this._sheet === "volumes" ? "Speaker volumes"
        : this._sheet === "library" ? "Library" : "";
  }
  private _renderSheet(ctrlId: string, members: string[]) {
    const icon = this._sheet === "speakers" ? "mdi:speaker-multiple"
      : this._sheet === "volumes" ? "mdi:tune-vertical-variant" : "mdi:music-box-multiple";
    const body = this._sheet === "speakers" ? this._renderSpeakers(ctrlId, members)
      : this._sheet === "volumes" ? this._renderVolumes(ctrlId, members)
        : this._renderLibrary();
    return html`
      <div class="sheet-hdr">
        <ha-icon icon=${icon}></ha-icon>
        <span class="name">${this._sheetTitle()}</span>
        <button class="close" aria-label="Close" @click=${() => this._closeSheet()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
      <div class="sheet-body">${body}</div>
    `;
  }

  private _renderSpeakers(ctrlId: string, members: string[]) {
    const auto = this._isAuto();
    const inGroup = (id: string) => this._pendingGroup[id] ?? members.includes(id);
    const keyAct = (fn: () => void) => (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); }
    };
    return html`
      <div class=${classMap({ row: true, on: auto })} role="button" tabindex="0"
        @click=${() => this._select("Auto")} @keydown=${keyAct(() => this._select("Auto"))}>
        <span class="ic"><ha-icon icon="mdi:autorenew"></ha-icon></span>
        <span class="txt">
          <div class="n">Auto</div>
          <div class="l bold">Follows playback${auto ? ` · ${this._label(ctrlId)}` : ""}</div>
        </span>
        <span class="act" style="background:transparent">
          <ha-icon icon=${auto ? "mdi:check-circle" : "mdi:chevron-right"}></ha-icon>
        </span>
      </div>
      ${this._rooms.map((r) => {
        const s = this.hass.states[r.entity];
        const on = r.entity === ctrlId;
        const grouped = inGroup(r.entity);
        const pending = r.entity in this._pendingGroup;
        const g = (s?.attributes.group_members as string[] | undefined) ?? [];
        const stTxt = !s || s.state === "unavailable" ? "Unavailable"
          : s.state === "playing" ? "Playing" : s.state === "paused" ? "Paused" : "Idle";
        const label = g.length > 1 && s
          ? g[0] === r.entity ? `${stTxt} · leading ${g.length - 1}` : `${stTxt} · with ${this._label(g[0])}`
          : stTxt;
        const pick = () => this._select(r.name);
        return html`
          <div class=${classMap({ row: true, on, pending })} role="button" tabindex="0"
            aria-label="${r.name}, ${label}" @click=${pick} @keydown=${keyAct(pick)}>
            <span class="ic"><ha-icon icon=${r.icon}></ha-icon></span>
            <span class="txt">
              <div class="n">${r.name}</div>
              <div class=${classMap({ l: true, bold: true, playing: s?.state === "playing" })}>${label}</div>
            </span>
            ${on
              ? html`<span class="act"><ha-icon icon="mdi:check-circle"></ha-icon></span>`
              : html`<button class="act" aria-label=${grouped ? `Remove ${r.name} from group` : `Add ${r.name} to group`}
                  @click=${(e: Event) => { e.stopPropagation(); this._toggleGroup(r.entity); }}>
                  <ha-icon icon=${grouped ? "mdi:minus" : "mdi:plus"}></ha-icon>
                </button>`}
          </div>`;
      })}
    `;
  }

  private _renderVolumes(ctrlId: string, members: string[]) {
    const max = this._maxVol();
    const vol = "group" in this._dragVol ? this._dragVol.group : this._groupVol(members);
    const grouped = members.length > 1;
    return html`
      ${grouped ? html`
        <div class="vol-item">
          ${this._slider("group", vol, max, (v) => this._setGroupVolume(v), "Group", "mdi:speaker-multiple", true)}
        </div>
        <div class="note">${members.map((id) => this._label(id)).join(" + ")}</div>
        ${this._sep("Individual", "mdi:tune-vertical-variant", true)}` : nothing}
      ${members.map((id) => html`
        <div class="vol-item">
          ${this._slider(id, this._vol(id), max, (v) => {
            this._svc(Svc.setVolume(this.hass, id, v), `Couldn't set ${this._label(id)} volume`);
          }, this._label(id), this._room(id)?.icon, true)}
        </div>`)}
      ${grouped ? nothing : html`
        <div class="note">Group rooms from the Speakers sheet to balance them here.</div>`}
    `;
  }

  private _renderLibrary() {
    const recent = this._rows(this._c("recent")).slice(0, 10);
    const items = this._lib ?? [];
    const services = [...new Set(items.map((i) => i.service))].sort();
    const cat = TAB_CATEGORY[this._libTab];
    const q = this._libQ.trim().toLowerCase();
    const filtered = items.filter((i) =>
      (!cat || i.category === cat)
      && (this._libTab !== "Favorites" || i.favorite)
      && (this._libSvc === "All" || i.service === this._libSvc)
      && (!q || i.title.toLowerCase().includes(q)));
    const shown = filtered.slice(0, LIB_RENDER_CAP);
    const sections: [string, LibItem[]][] = [];
    for (const f of shown) {
      const last = sections[sections.length - 1];
      if (last && last[0] === f.service) last[1].push(f);
      else sections.push([f.service, [f]]);
    }
    const heads = this._libSvc === "All" && sections.length > 1;

    return html`
      ${recent.length ? html`
        ${this._sep("Recently played", "mdi:history", true)}
        ${recent.map((r) => this._itemRow(r.name, r.sub, r.image, typeIcon(r.type), () => this._play(r.uri, r.type, r.name)))}
      ` : nothing}
      ${this._sep("Library", "mdi:music-box-multiple", true, this._refreshBtn())}
      <label class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input type="search" placeholder="Search the library" .value=${this._libQ}
          @input=${(e: Event) => (this._libQ = (e.target as HTMLInputElement).value)}>
      </label>
      <div class="pills" role="tablist" aria-label="Type">
        ${LIB_TABS.map((t) => html`
          <button class=${classMap({ pill: true, on: this._libTab === t })} role="tab"
            aria-selected=${this._libTab === t} @click=${() => (this._libTab = t)}>${t}</button>`)}
      </div>
      ${services.length > 1 ? html`
        <div class="pills" aria-label="Service">
          ${["All", ...services].map((sv) => html`
            <button class=${classMap({ pill: true, on: this._libSvc === sv })}
              @click=${() => (this._libSvc = sv)}>${sv === "All" ? "All services" : sv}</button>`)}
        </div>` : nothing}
      ${this._libError
        ? html`<div class="empty error">${this._libError}</div>`
        : !this._lib
          ? html`<div class="empty">Loading the Music Assistant library…</div>`
          : !filtered.length
            ? html`<div class="empty">${q ? `Nothing matches “${this._libQ}”.` : "Nothing here yet."}</div>`
            : sections.map(([svc, list]) => html`
                ${heads ? html`<div class="svc-head">${svc}</div>` : nothing}
                ${list.map((i) => this._itemRow(
                  i.title,
                  `${CATEGORY_LABEL[i.category]}${i.favorite ? " · ♥" : ""}${this._libSvc === "All" && !heads ? ` · ${i.service}` : ""}`,
                  i.image, CATEGORY_ICON[i.category], () => this._play(i.uri, i.media_type, i.title)))}
              `)}
      ${filtered.length > LIB_RENDER_CAP ? html`
        <div class="note">Showing ${LIB_RENDER_CAP} of ${filtered.length}. Search or filter to narrow it down.</div>` : nothing}
    `;
  }

  private _itemRow(name: string, sub: string, image: string | undefined, icon: string, onTap: () => void) {
    return html`
      <button class="row" @click=${onTap}>
        <span class="ic tile">
          ${image
            ? html`<img src=${image} alt="" loading="lazy"
                @error=${(e: Event) => ((e.target as HTMLElement).replaceWith(Object.assign(document.createElement("ha-icon"), { icon })))}>`
            : html`<ha-icon icon=${icon}></ha-icon>`}
        </span>
        <span class="txt">
          <div class="n">${name}</div>
          <div class="l">${sub}</div>
        </span>
        <span class="act"><ha-icon icon="mdi:play"></ha-icon></span>
      </button>`;
  }
}

// Register with the card picker.
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_TAG,
  name: "Mobile Music Card",
  description: "Dune Mist music player for the mobile dashboard: Sonos rooms, grouping, volumes and the Music Assistant library.",
  preview: false,
});

// eslint-disable-next-line no-console
console.info(
  `%c MOBILE-MUSIC-CARD %c v${CARD_VERSION} `,
  "color:#16202a;background:#8EB1BF;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px",
  "color:#fff;background:#5b616a;padding:2px 6px;border-radius:0 4px 4px 0",
);
