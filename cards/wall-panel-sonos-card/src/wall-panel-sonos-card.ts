// Main card element. Lit port of ThemedSonosCard from the React mockup.
//
// Reads `hass` + `config` (set by Lovelace), derives display state from
// the active media_player entity + its group_members, and dispatches HA
// service calls for every interactive surface.

import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";

import { CARD_TAG, EDITOR_TAG, CARD_VERSION } from "./const";
import { cardStyles } from "./styles";
import * as Svc from "./services";
import { cssUrl } from "./util";
import {
  iconStar, iconSpeaker, iconChev, iconVol, iconVolUp, iconVolDown,
  iconPrev, iconNext, iconPlay, iconPause,
  iconStation, iconAlbum, iconPlaylist,
  iconLink, iconCheck, iconEq, iconVolMuted,
} from "./icons";
import type {
  WallPanelSonosCardConfig,
  ViewName,
  MediaPlayerState,
  FavoriteConfig,
  StationArt,
  MaFavorite,
} from "./types";
import type { MaLibraryItem } from "./services";

// Display names for Music Assistant provider domains. Unknown domains
// fall back to a prettified version of the raw domain string.
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
  MA_SERVICE_NAMES[raw]
  ?? raw.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
// Provider domain of an MA uri, e.g. "spotify://playlist/x" → spotify.
const maUriScheme = (uri: string | undefined): string | undefined =>
  uri?.match(/^([a-z0-9_]+):\/\//i)?.[1]?.toLowerCase();

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

@customElement(CARD_TAG)
export class WallPanelSonosCard extends LitElement implements LovelaceCard {
  static styles = cardStyles;

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: WallPanelSonosCardConfig;
  @state() private _view: ViewName = "player";
  @state() private _activeRoom: string = "";
  // Becomes true once the user manually picks a room (dropdown or
  // Speakers view) — suppresses the one-shot auto-pick that lands on
  // whatever's already playing when the card first sees hass.
  private _userPickedRoom = false;
  @state() private _menuOpen = false;
  @state() private _favTab: "All" | "Playlists" | "Stations" | "Albums" = "All";
  @state() private _favQ = "";
  // Music Assistant favorites (favorites_source: music_assistant).
  // Snapshot of the MA library, cached for a few minutes; the service
  // pill row filters by provider ("All" = grouped sections per service).
  @state() private _maFavs: MaFavorite[] | null = null;
  @state() private _maFavsLoading = false;
  @state() private _maFavsError: string | null = null;
  @state() private _maSvc: string = "All";
  private _maFavsFetchedAt = 0;
  private static readonly MA_FAVS_TTL_MS = 5 * 60 * 1000;
  // Per-entity slider value held while the user drags AND briefly after
  // release, so the knob tracks the finger and doesn't snap back to the
  // stale hass value before the volume_set service round-trips.
  @state() private _dragVol: Record<string, number> = {};
  // Optimistic play/playing state — flips immediately on click, cleared
  // when hass state catches up. Avoids the perceived "lag" on the play
  // button while the media_player.media_play_pause call is in flight.
  @state() private _optimisticPlaying: boolean | null = null;
  private _optimisticPlayingTimer?: ReturnType<typeof setTimeout>;
  // Optimistic mute state for the active room — same pattern as
  // _optimisticPlaying: flip on tap, clear when hass catches up or the
  // safety timer fires. Reset on room switch since it's room-scoped.
  @state() private _optimisticMuted: boolean | null = null;
  private _optimisticMutedTimer?: ReturnType<typeof setTimeout>;
  // Optimistic group membership (entity_id → desired grouped state).
  // The Speakers view reflects a tap instantly instead of waiting the
  // ~1-2s Sonos takes to re-form the group and push new group_members.
  @state() private _pendingGroup: Record<string, boolean> = {};
  private _pendingGroupTimers: Record<string, ReturnType<typeof setTimeout>> = {};
  // When the user picks a favorite, show its name in the player view as
  // "Loading…" until hass reports a track change. Without this the
  // player view appears frozen on the previous track for a beat.
  @state() private _loadingName: string | null = null;
  private _loadingTimer?: ReturnType<typeof setTimeout>;
  private _prevTitle: string | undefined;
  // Same idea for the next/prev transport buttons — flip a flag the moment
  // the user taps so the sub-line shows "Loading…" instead of staying on
  // the stale artist/album until Sonos pushes the new track.
  @state() private _skipping: boolean = false;
  private _skipTimer?: ReturnType<typeof setTimeout>;
  // Transient error message shown across the top of the card when a
  // service call fails (bad content_id, offline speaker, unknown script,
  // etc.). Auto-clears after 5s or on user dismiss.
  @state() private _toast: { message: string; kind: "error" } | null = null;
  private _toastTimer?: ReturnType<typeof setTimeout>;
  // Wall-clock used to interpolate media_position between hass updates.
  // Bumped every 500ms while a track is playing.
  @state() private _now = Date.now();
  private _dragTimers: Record<string, ReturnType<typeof setTimeout>> = {};
  private _tickHandle?: ReturnType<typeof setInterval>;

  // Lovelace lifecycle
  static getStubConfig(): Partial<WallPanelSonosCardConfig> {
    return {
      type: `custom:${CARD_TAG}`,
      entities: [],
      default_view: "player",
      layout: "wall",
    };
  }
  static async getConfigElement() {
    await import("./editor");
    return document.createElement(EDITOR_TAG);
  }

  setConfig(config: WallPanelSonosCardConfig) {
    if (!config.entities || !Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error("wall-panel-sonos-card: 'entities' is required and must be a non-empty list of media_player entity IDs.");
    }
    const firstInit = !this._config;
    this._config = config;
    if (!this._activeRoom || !config.entities.includes(this._activeRoom)) {
      this._activeRoom = config.entities[0];
    }
    // Only honor default_view on the initial setConfig — re-renders from
    // dashboard edits / theme swaps shouldn't yank the user back from
    // whatever view they navigated to.
    if (firstInit && config.default_view) this._view = config.default_view;
    const trackScale = Math.max(0.9, Math.min(1.6, config.track_scale ?? 1.15));
    const volScale = Math.max(1, Math.min(2.5, config.vol_bar_scale ?? 1.4));
    this.style.setProperty("--wp-track-scale", String(trackScale));
    this.style.setProperty("--wp-vol-scale", String(volScale));
    if (config.layout === "mobile") this.setAttribute("narrow", "");
    else this.removeAttribute("narrow");
  }

  getCardSize() { return 8; }

  connectedCallback() {
    super.connectedCallback();
    this._tickHandle = setInterval(() => {
      // Only re-render the progress bar when there's something to advance
      // *and* the tab is actually visible. Wall-mounted tablets often sit
      // on a different dashboard tab for hours — rendering twice per
      // second behind the scenes wastes CPU and battery.
      if (document.visibilityState !== "visible") return;
      if (this._view !== "player") return;
      const s = this._state(this._activeRoom);
      if (s?.state !== "playing") return;
      this._now = Date.now();
    }, 500);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._tickHandle) clearInterval(this._tickHandle);
    if (this._loadingTimer) clearTimeout(this._loadingTimer);
    if (this._skipTimer) clearTimeout(this._skipTimer);
    if (this._optimisticPlayingTimer) clearTimeout(this._optimisticPlayingTimer);
    if (this._toastTimer) clearTimeout(this._toastTimer);
    if (this._optimisticMutedTimer) clearTimeout(this._optimisticMutedTimer);
    for (const t of Object.values(this._pendingGroupTimers)) clearTimeout(t);
    this._pendingGroupTimers = {};
    for (const t of Object.values(this._dragTimers)) clearTimeout(t);
    this._dragTimers = {};
  }

  // Run an action on pointerdown instead of waiting for the full
  // press-release cycle — on a touch panel that's typically 80-150ms of
  // perceived latency saved per tap. The subsequent synthetic click is
  // suppressed via a short-lived flag on the element; keyboard
  // activation (Enter/Space) produces a click with no preceding
  // pointerdown, so it still works. Only use this for fixed controls —
  // buttons inside scrollable lists must stay on click, otherwise
  // starting a scroll would trigger them.
  private _instant(fn: () => void) {
    return (e: Event) => {
      const el = e.currentTarget as HTMLElement & { _wpPressed?: boolean };
      if (e.type === "pointerdown") {
        const pe = e as PointerEvent;
        if (pe.pointerType === "mouse" && pe.button !== 0) return;
        el._wpPressed = true;
        setTimeout(() => { el._wpPressed = false; }, 400);
        fn();
      } else if (el._wpPressed) {
        el._wpPressed = false;
      } else {
        fn();
      }
    };
  }

  // Small wrapper around Svc.* promises so a failing service call
  // surfaces to the user as a banner instead of being swallowed by the
  // console. Context describes what the user was trying to do so the
  // message reads naturally ("Couldn't play Foo — …").
  private _svc<T>(promise: Promise<T>, context: string): Promise<T | void> {
    return promise.catch((err: unknown) => {
      const detail = err instanceof Error ? err.message : String(err);
      this._showToast(`${context} — ${detail}`);
    });
  }
  private _showToast(message: string) {
    this._toast = { message, kind: "error" };
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { this._toast = null; }, 5000);
  }

  // Lit re-renders whenever any tracked property changes. `hass` updates
  // every time *any* HA entity changes — dozens of times per second on a
  // busy install. Skip the render when none of the entities we actually
  // care about (the configured Sonos players) have a new state object.
  shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size > 1 || !changed.has("hass")) return true;
    if (!this._config) return true;
    const prev = changed.get("hass") as HomeAssistant | undefined;
    if (!prev) return true;
    for (const id of this._config.entities) {
      // HA hands out a new state object whenever an entity changes, so
      // reference inequality is enough — no deep compare needed.
      if (prev.states[id] !== this.hass.states[id]) return true;
    }
    return false;
  }

  willUpdate(changed: PropertyValues) {
    if (!changed.has("hass") || !this._config) return;
    // One-shot: when hass first arrives *and* something is actually
    // playing, switch the active room to that player. Only latch the
    // flag once we've truly picked — otherwise loading the dashboard
    // while everything is idle would freeze the default room forever
    // and later playback wouldn't auto-focus.
    if (!this._userPickedRoom) {
      const best = this._pickActivePlayer();
      if (best) {
        if (best !== this._activeRoom) this._activeRoom = best;
        this._userPickedRoom = true;
      }
    }
    // Clear the optimistic play state once hass reflects what we sent.
    if (this._optimisticPlaying !== null) {
      const real = this._state(this._activeRoom)?.state === "playing";
      if (real === this._optimisticPlaying) {
        this._optimisticPlaying = null;
        if (this._optimisticPlayingTimer) {
          clearTimeout(this._optimisticPlayingTimer);
          this._optimisticPlayingTimer = undefined;
        }
      }
    }
    // Same for optimistic mute.
    if (this._optimisticMuted !== null) {
      const real = !!this._state(this._activeRoom)?.attributes.is_volume_muted;
      if (real === this._optimisticMuted) {
        this._optimisticMuted = null;
        if (this._optimisticMutedTimer) {
          clearTimeout(this._optimisticMutedTimer);
          this._optimisticMutedTimer = undefined;
        }
      }
    }
    // Clear pending group toggles that hass now reflects.
    if (Object.keys(this._pendingGroup).length) {
      const members = this._state(this._activeRoom)?.attributes.group_members ?? [this._activeRoom];
      let nextPending: Record<string, boolean> | null = null;
      for (const [id, desired] of Object.entries(this._pendingGroup)) {
        if (members.includes(id) === desired) {
          if (!nextPending) nextPending = { ...this._pendingGroup };
          delete nextPending[id];
          if (this._pendingGroupTimers[id]) {
            clearTimeout(this._pendingGroupTimers[id]);
            delete this._pendingGroupTimers[id];
          }
        }
      }
      if (nextPending) this._pendingGroup = nextPending;
    }
    // Clear the favorite "Loading…" overlay as soon as the track title
    // changes (Sonos has actually switched). Falls back to the 8s timer
    // we set in _playFavorite if the title never changes.
    if (this._loadingName !== null) {
      const cur = this._state(this._activeRoom)?.attributes.media_title;
      if (cur && cur !== this._prevTitle) {
        this._loadingName = null;
        if (this._loadingTimer) { clearTimeout(this._loadingTimer); this._loadingTimer = undefined; }
      }
    }
    // Same for the next/prev skip indicator.
    if (this._skipping) {
      const cur = this._state(this._activeRoom)?.attributes.media_title;
      if (cur && cur !== this._prevTitle) {
        this._skipping = false;
        if (this._skipTimer) { clearTimeout(this._skipTimer); this._skipTimer = undefined; }
      }
    }
    // Clear post-release volume latches whose hass value has caught up.
    // Active drags don't have a timer entry yet, so they're left alone.
    // The active room's latch holds the *group average* (that's what
    // the main slider shows), so compare it against the average too.
    let nextDrag: Record<string, number> | null = null;
    for (const key of Object.keys(this._dragVol)) {
      if (!this._dragTimers[key]) continue;
      const real = key === this._activeRoom
        ? this._groupAvgVol()
        : Math.round((this._state(key)?.attributes.volume_level ?? 0) * 100);
      if (Math.abs(real - this._dragVol[key]) <= 2) {
        if (!nextDrag) nextDrag = { ...this._dragVol };
        delete nextDrag[key];
        clearTimeout(this._dragTimers[key]);
        delete this._dragTimers[key];
      }
    }
    if (nextDrag) this._dragVol = nextDrag;
    // Covers default_view: favorites (no _setView call ever fires) —
    // the guards inside make this a cheap no-op on every other update.
    if (this._view === "favorites") this._maybeFetchMaFavorites();
  }

  // ── Derived state from hass ───────────────────────────────────────
  private _state(id: string): MediaPlayerState | undefined {
    return this.hass?.states[id] as unknown as MediaPlayerState;
  }
  private _label(id: string) {
    return this._config?.names?.[id]
      ?? this._state(id)?.attributes.friendly_name
      ?? id.replace("media_player.", "").replace(/_/g, " ");
  }
  private _groupMembers(): string[] {
    const s = this._state(this._activeRoom);
    const m = s?.attributes.group_members ?? [this._activeRoom];
    // Filter to only entities the card was configured with
    return m.filter(x => this._config.entities.includes(x));
  }
  // Find a group member whose attributes carry the actual playing track
  // metadata (HA's Sonos integration only populates these on the
  // coordinator). Returns undefined if no member has metadata.
  private _coordinatorMeta(
    members: string[] | undefined,
  ): MediaPlayerState["attributes"] | undefined {
    if (!members) return undefined;
    for (const id of members) {
      if (id === this._activeRoom) continue;
      const att = this._state(id)?.attributes;
      if (att && (att.media_title || att.entity_picture)) return att;
    }
    return undefined;
  }
  // Look up a station_art entry by substring match against
  // media_content_id. Used to surface art/labels for streaming
  // sources HA doesn't populate metadata for (TuneIn, SiriusXM, etc.).
  private _stationArt(contentId: string | undefined): StationArt | undefined {
    const entries = this._config.station_art ?? [];
    if (!contentId || !entries.length) return undefined;
    const cid = contentId.toLowerCase();
    return entries.find(e => e.match && cid.includes(e.match.toLowerCase()));
  }
  // Sonos buries the streaming service in the media_content_id query
  // string when no `source` attribute is exposed (TuneIn radio, etc.).
  private _sourceFromContentId(contentId: string | undefined): string | undefined {
    if (!contentId) return undefined;
    const m = contentId.match(/[?&]source=([^&]+)/i);
    return m ? decodeURIComponent(m[1]) : undefined;
  }
  // Pick the entity that should be the default "active room" on first
  // load: prefer the playing entity in the largest configured group;
  // tiebreak by position in `entities`. Returns null when nothing is
  // playing — caller falls back to the existing default.
  private _pickActivePlayer(): string | null {
    const ents = this._config.entities;
    let best: { id: string; size: number; idx: number } | null = null;
    for (let i = 0; i < ents.length; i++) {
      const id = ents[i];
      const st = this._state(id);
      if (st?.state !== "playing") continue;
      const members = st.attributes.group_members ?? [id];
      const size = members.filter(m => ents.includes(m)).length;
      if (!best || size > best.size || (size === best.size && i < best.idx)) {
        best = { id, size, idx: i };
      }
    }
    return best?.id ?? null;
  }

  // ── Handlers ──────────────────────────────────────────────────────
  private _setView(v: ViewName) {
    this._view = (this._view === v && v !== "player") ? "player" : v;
    this._menuOpen = false;
    if (this._view === "favorites") this._maybeFetchMaFavorites();
  }
  private _onTitleClick() {
    if (this._view !== "player") this._view = "player";
    else this._menuOpen = !this._menuOpen;
  }
  private _pickRoom(id: string) {
    const cur = this._groupMembers();
    this._activeRoom = id;
    this._userPickedRoom = true;
    this._menuOpen = false;
    // Optimistic latches are scoped to the previously-active room.
    this._optimisticMuted = null;
    this._optimisticPlaying = null;
    // If the picked room is already grouped with the previously-active
    // room, just switch the view — don't tear the group apart. Otherwise
    // solo it (matches the dropdown's "pick a standalone room" intent).
    if (!cur.includes(id)) this._svc(Svc.unjoin(this.hass, id), `Couldn't ungroup ${this._label(id)}`);
  }
  private _pickGroup(entities: string[]) {
    if (entities.length === 0) return;
    const primary = entities[0];
    this._activeRoom = primary;
    this._userPickedRoom = true;
    this._menuOpen = false;
    this._optimisticMuted = null;
    this._optimisticPlaying = null;
    this._svc(Svc.joinGroup(this.hass, primary, entities.slice(1)),
      `Couldn't create group "${this._label(primary)}"`);
  }
  private _onPlayPause(currentlyPlaying: boolean) {
    // Flip the icon immediately so the press feels responsive — willUpdate
    // clears this once hass reports the actual new state. Safety timeout
    // covers the case where the service call fails or Sonos never
    // reports the transition, so the icon can't get stuck lying.
    this._optimisticPlaying = !currentlyPlaying;
    if (this._optimisticPlayingTimer) clearTimeout(this._optimisticPlayingTimer);
    this._optimisticPlayingTimer = setTimeout(() => { this._optimisticPlaying = null; }, 5000);
    this._svc(Svc.playPause(this.hass, this._activeRoom),
      `Couldn't ${currentlyPlaying ? "pause" : "resume"} ${this._label(this._activeRoom)}`);
  }
  private _onSkip(dir: "next" | "prev") {
    // Snapshot the current title so willUpdate can detect when Sonos
    // pushes the new track and clear the indicator. Bound the wait so a
    // stalled service call doesn't leave "Loading…" stuck forever.
    this._prevTitle = this._state(this._activeRoom)?.attributes.media_title;
    this._skipping = true;
    if (this._skipTimer) clearTimeout(this._skipTimer);
    this._skipTimer = setTimeout(() => { this._skipping = false; }, 5000);
    const call = dir === "next"
      ? Svc.next(this.hass, this._activeRoom)
      : Svc.prev(this.hass, this._activeRoom);
    this._svc(call, `Couldn't skip ${dir === "next" ? "forward" : "back"}`);
  }
  private _toggleInGroup(id: string) {
    if (id === this._activeRoom) return;
    const cur = this._groupMembers();
    const joining = !cur.includes(id);
    // Reflect the tap instantly — Sonos takes ~1-2s to re-form the group
    // and push new group_members. willUpdate clears the latch when hass
    // catches up; the timer is the failure fallback.
    this._pendingGroup = { ...this._pendingGroup, [id]: joining };
    if (this._pendingGroupTimers[id]) clearTimeout(this._pendingGroupTimers[id]);
    this._pendingGroupTimers[id] = setTimeout(() => {
      delete this._pendingGroupTimers[id];
      if (id in this._pendingGroup) {
        const next = { ...this._pendingGroup };
        delete next[id];
        this._pendingGroup = next;
      }
    }, 6000);
    if (joining) {
      this._svc(
        Svc.joinGroup(this.hass, this._activeRoom, [...cur.filter(x => x !== this._activeRoom), id]),
        `Couldn't add ${this._label(id)} to the group`,
      );
    } else {
      this._svc(Svc.unjoin(this.hass, id), `Couldn't remove ${this._label(id)} from the group`);
    }
  }
  private _onMuteToggle() {
    const cur = this._optimisticMuted
      ?? !!this._state(this._activeRoom)?.attributes.is_volume_muted;
    this._optimisticMuted = !cur;
    if (this._optimisticMutedTimer) clearTimeout(this._optimisticMutedTimer);
    this._optimisticMutedTimer = setTimeout(() => { this._optimisticMuted = null; }, 5000);
    this._svc(
      Svc.muteToggle(this.hass, this._activeRoom, cur),
      `Couldn't ${cur ? "unmute" : "mute"} ${this._label(this._activeRoom)}`,
    );
  }
  private _slide(e: PointerEvent, max: number, onChange: (v: number) => void, key?: string) {
    const el = e.currentTarget as HTMLElement;
    // Cancel any post-release latch from a prior drag of the same slider.
    if (key && this._dragTimers[key]) {
      clearTimeout(this._dragTimers[key]);
      delete this._dragTimers[key];
    }
    // Throttle service calls during drag. pointermove fires ~60×/s on most
    // hardware; without this we'd flood HA → Sonos with volume_set calls
    // and the queue would lag behind the user's finger.
    const SEND_INTERVAL_MS = 120;
    let lastSent = 0;
    let pending: number | null = null;
    let pendingTimer: ReturnType<typeof setTimeout> | null = null;
    const sendNow = (v: number) => {
      lastSent = Date.now();
      pending = null;
      if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
      onChange(v);
    };
    const update = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width));
      const v = Math.round(ratio * max);
      if (key) this._dragVol = { ...this._dragVol, [key]: v };
      const since = Date.now() - lastSent;
      if (since >= SEND_INTERVAL_MS) {
        sendNow(v);
      } else {
        pending = v;
        if (!pendingTimer) {
          pendingTimer = setTimeout(() => {
            pendingTimer = null;
            if (pending !== null) sendNow(pending);
          }, SEND_INTERVAL_MS - since);
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
      // Always commit the final value so the actual volume matches where
      // the user released the knob, regardless of throttling.
      if (pending !== null) sendNow(pending);
      if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
      // Hold the optimistic value while volume_set round-trips; willUpdate
      // clears it as soon as hass reports back, otherwise the timer expires
      // and we fall back to the live hass value.
      if (key) {
        this._dragTimers[key] = setTimeout(() => {
          delete this._dragTimers[key];
          if (key in this._dragVol) {
            const next = { ...this._dragVol };
            delete next[key];
            this._dragVol = next;
          }
        }, 2000);
      }
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  }

  // ── Render ────────────────────────────────────────────────────────
  render() {
    if (!this._config || !this.hass) return html``;
    const s = this._state(this._activeRoom);
    if (!s) return html`<ha-card><div style="padding:24px;color:var(--wp-text-dim)">Entity ${this._activeRoom} not found.</div></ha-card>`;

    const groupMembers = this._groupMembers();
    const groupSize = groupMembers.length;
    const titleText = this._view === "favorites" ? "Favorites"
      : this._view === "grouping" ? "Speakers"
      : this._label(this._activeRoom);

    return html`
      <ha-card>
        <div class="root">
          ${this._renderHeader(titleText, groupSize)}
          ${this._toast ? html`
            <div class="toast ${this._toast.kind}" role="alert">
              <span class="toast-msg">${this._toast.message}</span>
              <button class="toast-x" aria-label="Dismiss"
                @click=${() => { this._toast = null; if (this._toastTimer) clearTimeout(this._toastTimer); }}>×</button>
            </div>
          ` : nothing}
          ${this._view === "player" ? this._renderPlayer(s) : nothing}
          ${this._view === "favorites" ? this._renderFavorites() : nothing}
          ${this._view === "grouping" ? this._renderGrouping(groupMembers) : nothing}
          ${this._menuOpen ? this._renderMenu(groupMembers) : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderHeader(titleText: string, groupSize: number) {
    return html`
      <div class="hdr">
        <div class="hdr-side left">
          <button class=${classMap({ "hdr-btn": true, active: this._view === "favorites" })}
                  @click=${() => this._setView("favorites")}
                  aria-label="Favorites" aria-pressed=${this._view === "favorites"}>
            ${iconStar}
          </button>
        </div>
        <button class=${classMap({ "hdr-title": true, "menu-open": this._menuOpen })}
                @click=${this._onTitleClick}>
          <span>${titleText}</span>
          ${this._view === "player" && groupSize > 1
            ? html`<span class="group-pill">+${groupSize - 1}</span>` : nothing}
          ${this._view === "player"
            ? html`<span class=${classMap({ chev: true, up: this._menuOpen })}>${iconChev}</span>` : nothing}
        </button>
        <div class="hdr-side right">
          <button class=${classMap({ "hdr-btn": true, active: this._view === "grouping" })}
                  @click=${() => this._setView("grouping")}
                  aria-label="Speakers" aria-pressed=${this._view === "grouping"}>
            ${iconSpeaker}
          </button>
        </div>
      </div>
    `;
  }

  private _renderPlayer(s: MediaPlayerState) {
    const a = s.attributes;
    // HA's Sonos integration only populates media_title, entity_picture,
    // artist/album, and position on the group coordinator — slaves report
    // state="playing" with all metadata fields empty. Borrow the metadata
    // from whichever group member actually has it.
    const meta = (a.media_title || a.entity_picture)
      ? a
      : this._coordinatorMeta(a.group_members) ?? a;
    const dur = meta.media_duration ?? 0;
    const playing = this._optimisticPlaying ?? (s.state === "playing");
    const muted = this._optimisticMuted ?? !!a.is_volume_muted;
    // When the room is grouped, the main slider is a *group* volume:
    // it shows the members' average and moves everyone by the same
    // delta (per-room offsets set in the Speakers view are preserved).
    const realVol = this._groupAvgVol();
    const room = this._activeRoom;
    const maxVol = this._maxVol();
    const step = this._volStep(maxVol);
    // While a drag/step is latched, show the optimistic value instead
    // of waiting for hass to round-trip — feels much more responsive.
    const vol = room in this._dragVol ? this._dragVol[room] : realVol;
    // Interpolate position from the last hass snapshot. Sonos only pushes
    // media_position on state change, so without this the bar would freeze.
    const updatedAt = meta.media_position_updated_at
      ? new Date(meta.media_position_updated_at).getTime()
      : 0;
    const elapsed = s.state === "playing" && updatedAt
      ? Math.max(0, (this._now - updatedAt) / 1000)
      : 0;
    const rawPos = (meta.media_position ?? 0) + elapsed;
    const pos = dur > 0 ? Math.min(dur, rawPos) : rawPos;
    const contentId = meta.media_content_id ?? a.media_content_id;
    const station = this._stationArt(contentId);
    const coverImage = station?.image
      ? cssUrl(station.image)
      : meta.entity_picture
        ? cssUrl(meta.entity_picture)
        : "linear-gradient(135deg, var(--wp-accent) 0%, var(--wp-card-2) 60%, var(--wp-bg) 100%)";
    // Sonos reports state="playing" with no media_title for TV, line-in,
    // and many streaming sources, plus the brief window between tracks.
    // Don't lie with "Nothing playing" while audio is coming out — fall
    // back to whatever identifying info we can scrape together.
    const isPlaying = s.state === "playing";
    const trackTitle = this._loadingName
      ?? meta.media_title
      ?? station?.name
      ?? (isPlaying ? (meta.app_name ?? a.app_name ?? "Playing") : "Nothing playing");
    const trackSub = (this._loadingName || this._skipping)
      ? "Loading…"
      : `${meta.media_artist ?? ""}${meta.media_album_name ? ` · ${meta.media_album_name}` : ""}`;
    // Surface the streaming service in the source line above the cover
    // even when HA doesn't populate the `source` attribute (TuneIn etc.).
    const sourceLabel = a.source ?? this._sourceFromContentId(contentId);

    return html`
      <div class="pv">
        <div class="src">
          ${sourceLabel ? html`<span class="src-dot"></span>${sourceLabel}` : nothing}
        </div>
        <div class="cover-wrap">
          <div class="cover" style=${styleMap({ backgroundImage: coverImage })}></div>
        </div>
        <div class="meta">
          <div class="track">${trackTitle}</div>
          <div class="sub">${trackSub}</div>
        </div>
        <div class="progress">
          <span>${fmt(pos)}</span>
          <div class="bar"><span style=${styleMap({ width: `${dur > 0 ? (pos / dur) * 100 : 0}%` })}></span></div>
          <span>${fmt(dur)}</span>
        </div>
        <div class="transport">
          ${(() => {
            // Fixed controls fire on pointerdown for instant response.
            // Each handler is created once per render and shared between
            // the pointerdown and click bindings — the double-fire guard
            // lives on the element, so this is safe across re-renders.
            const volDn = this._instant(() => this._stepVol(-step, maxVol));
            const prev = this._instant(() => this._onSkip("prev"));
            const play = this._instant(() => this._onPlayPause(playing));
            const next = this._instant(() => this._onSkip("next"));
            const volUp = this._instant(() => this._stepVol(step, maxVol));
            return html`
              <button class="t-btn" aria-label="Volume down"
                @pointerdown=${volDn} @click=${volDn}>${iconVolDown}</button>
              <button class="t-btn" aria-label="Previous track"
                @pointerdown=${prev} @click=${prev}>${iconPrev}</button>
              <button class="play-btn" aria-label=${playing ? "Pause" : "Play"}
                @pointerdown=${play} @click=${play}>
                ${playing ? iconPause : iconPlay}
              </button>
              <button class="t-btn" aria-label="Next track"
                @pointerdown=${next} @click=${next}>${iconNext}</button>
              <button class="t-btn" aria-label="Volume up"
                @pointerdown=${volUp} @click=${volUp}>${iconVolUp}</button>
            `;
          })()}
        </div>
        <div class=${classMap({ "vol-row": true, muted })}>
          ${(() => {
            const mute = this._instant(() => this._onMuteToggle());
            return html`
              <button class="vol-icon mute-btn"
                aria-label=${muted ? "Unmute" : "Mute"} aria-pressed=${muted}
                @pointerdown=${mute} @click=${mute}>
                ${muted ? iconVolMuted : iconVol}
              </button>
            `;
          })()}
          ${this._slider(vol, maxVol, v => this._setGroupVolume(v), this._activeRoom,
            `Volume for ${this._label(this._activeRoom)}`)}
          <span class="vol-num">${vol}</span>
        </div>
      </div>
    `;
  }

  private _maxVol(): number {
    const m = this._config?.max_volume ?? 100;
    return Math.max(1, Math.min(100, Math.round(m)));
  }
  private _volStep(max: number): number {
    // Keep the +/- step proportional so the buttons are useful at any
    // max_volume — about 5% of the range, never less than 1.
    return Math.max(1, Math.round(max / 20));
  }
  // Average member volume — what the main slider shows for a group.
  // Falls back to the active room's own volume when it's solo.
  private _groupAvgVol(): number {
    const members = this._groupMembers();
    if (members.length <= 1) {
      return Math.round((this._state(this._activeRoom)?.attributes.volume_level ?? 0) * 100);
    }
    const sum = members.reduce(
      (acc, id) => acc + (this._state(id)?.attributes.volume_level ?? 0), 0);
    return Math.round((sum / members.length) * 100);
  }
  // Set the group volume to `target`: every member moves by the same
  // delta (target − current average), preserving the per-room offsets
  // set in the Speakers view. Solo rooms behave exactly as before.
  // During a drag, hass member volumes are effectively a stable
  // snapshot, so each throttled tick recomputes absolute member values
  // from that base — deltas can't compound.
  private _setGroupVolume(target: number) {
    const members = this._groupMembers();
    if (members.length <= 1) {
      this._svc(Svc.setVolume(this.hass, this._activeRoom, target),
        `Couldn't set volume for ${this._label(this._activeRoom)}`);
      return;
    }
    const delta = target - this._groupAvgVol();
    if (delta === 0) return;
    for (const id of members) {
      const mv = Math.round((this._state(id)?.attributes.volume_level ?? 0) * 100);
      this._svc(Svc.setVolume(this.hass, id, Math.max(0, Math.min(100, mv + delta))),
        `Couldn't set volume for ${this._label(id)}`);
    }
  }
  private _stepVol(delta: number, max: number) {
    const room = this._activeRoom;
    const cur = room in this._dragVol ? this._dragVol[room] : this._groupAvgVol();
    const next = Math.max(0, Math.min(max, cur + delta));
    if (next === cur) return;
    // Optimistic latch so repeated taps feel instant + remain coherent
    // even before hass round-trips the volume_set call(s).
    this._dragVol = { ...this._dragVol, [room]: next };
    if (this._dragTimers[room]) clearTimeout(this._dragTimers[room]);
    this._dragTimers[room] = setTimeout(() => {
      delete this._dragTimers[room];
      if (room in this._dragVol) {
        const nextDrag = { ...this._dragVol };
        delete nextDrag[room];
        this._dragVol = nextDrag;
      }
    }, 2000);
    this._setGroupVolume(next);
  }

  private _slider(value: number, max: number, onChange: (v: number) => void, key?: string, label = "Volume") {
    const display = key && key in this._dragVol ? this._dragVol[key] : value;
    const pct = max > 0 ? Math.max(0, Math.min(100, (display / max) * 100)) : 0;
    return html`
      <div class="slider" role="slider" tabindex="0"
        aria-label=${label}
        aria-valuemin="0" aria-valuemax=${max} aria-valuenow=${display}
        @pointerdown=${(e: PointerEvent) => this._slide(e, max, onChange, key)}
        @keydown=${(e: KeyboardEvent) => this._sliderKeydown(e, display, max, onChange, key)}>
        <div class="fill" style=${styleMap({ width: `${pct}%` })}></div>
        <div class="knob" style=${styleMap({ left: `${pct}%` })}></div>
      </div>
    `;
  }
  private _sliderKeydown(
    e: KeyboardEvent,
    current: number,
    max: number,
    onChange: (v: number) => void,
    key?: string,
  ) {
    const step = this._volStep(max);
    let next: number | null = null;
    switch (e.key) {
      case "ArrowRight": case "ArrowUp": next = Math.min(max, current + step); break;
      case "ArrowLeft": case "ArrowDown": next = Math.max(0, current - step); break;
      case "Home": next = 0; break;
      case "End": next = max; break;
      default: return;
    }
    e.preventDefault();
    if (next === current) return;
    // Latch the optimistic value the same way pointer drags do, so the
    // knob doesn't snap back while volume_set round-trips.
    if (key) {
      this._dragVol = { ...this._dragVol, [key]: next };
      if (this._dragTimers[key]) clearTimeout(this._dragTimers[key]);
      this._dragTimers[key] = setTimeout(() => {
        delete this._dragTimers[key];
        if (key in this._dragVol) {
          const nextDrag = { ...this._dragVol };
          delete nextDrag[key];
          this._dragVol = nextDrag;
        }
      }, 2000);
    }
    onChange(next);
  }

  private _renderFavorites() {
    if (this._config.favorites_source === "music_assistant") {
      return this._renderMaFavorites();
    }
    const cfg = this._config.favorites ?? [];
    const tabs: Array<typeof this._favTab> = ["All", "Playlists", "Stations", "Albums"];
    const groupSize = this._groupMembers().length;
    const tabType = this._favTab === "Playlists" ? "playlist"
      : this._favTab === "Stations" ? "station"
      : this._favTab === "Albums" ? "album"
      : null;
    const filtered = (this._config.favorites ?? []).filter(f => {
      if (tabType && f.type !== tabType) return false;
      if (this._favQ && !f.name.toLowerCase().includes(this._favQ.toLowerCase())) return false;
      return true;
    });

    return html`
      <div class="pv pv-scroll">
        <div class="fav-target">
          Play to <b>${this._label(this._activeRoom)}${groupSize > 1 ? ` +${groupSize - 1}` : ""}</b>
        </div>
        <div class="tabs" role="tablist" aria-label="Favorite categories">
          ${tabs.map(tb => html`
            <button class=${classMap({ tab: true, active: this._favTab === tb })}
                    role="tab" aria-selected=${this._favTab === tb}
                    @click=${() => this._favTab = tb}>${tb}</button>
          `)}
        </div>
        <div class="fav-list">
          ${filtered.length === 0
            ? html`<div class="fav-empty">No favorites configured</div>`
            : filtered.map(f => html`
              <button class="fav-item" @click=${() => this._playFavorite(f)}>
                <span class="fav-art" style=${styleMap({ background: f.art ?? "linear-gradient(135deg,#4a5d72,#2a3540)" })}>
                  ${f.type === "station" ? iconStation : f.type === "album" ? iconAlbum : iconPlaylist}
                </span>
                <span class="fav-label">${f.name}</span>
              </button>
            `)}
        </div>
      </div>
    `;
  }

  // ── Music Assistant favorites ─────────────────────────────────────
  // The MA twin of a native Sonos entity. MA items must play through
  // the MA entity; it outputs to the same physical speaker while the
  // native entity keeps providing room state.
  //
  // Resolved the same way as the basement wall panel
  // (packages/basement_wall_panel.yaml): the music_assistant media_player
  // whose friendly name equals the Sonos entity's. An explicit
  // `ma_entities` entry still wins when one is configured.
  private _maEntity(roomId: string): string | undefined {
    const mapped = this._config.ma_entities?.[roomId];
    if (mapped) return mapped;
    const want = this._state(roomId)?.attributes.friendly_name;
    if (!want) return undefined;
    const reg = (this.hass as unknown as {
      entities?: Record<string, { platform?: string }>;
    }).entities ?? {};
    for (const [id, e] of Object.entries(reg)) {
      if (e.platform !== "music_assistant" || !id.startsWith("media_player.") || id === roomId) continue;
      if (this._state(id)?.attributes.friendly_name === want) return id;
    }
    return undefined;
  }
  private _anyMaEntity(): string | undefined {
    return this._maEntity(this._activeRoom)
      ?? this._config.entities.map(id => this._maEntity(id)).find(Boolean);
  }
  private _maybeFetchMaFavorites(force = false) {
    if (this._config?.favorites_source !== "music_assistant") return;
    if (this._maFavsLoading) return;
    const fresh = Date.now() - this._maFavsFetchedAt < WallPanelSonosCard.MA_FAVS_TTL_MS;
    // Errors are cached too so a failing backend isn't hammered on
    // every hass update while the view is open.
    if (!force && fresh && (this._maFavs || this._maFavsError)) return;
    void this._fetchMaFavorites();
  }
  private async _fetchMaFavorites() {
    this._maFavsLoading = true;
    this._maFavsError = null;
    try {
      let items: MaFavorite[];
      try {
        items = await this._fetchMaViaLibrary();
      } catch {
        // Older MA without the get_library action (or a response shape
        // we couldn't read) — browse the media tree instead. No
        // provider info there, so everything files under "Library".
        items = await this._fetchMaViaBrowse();
      }
      // Stable order: service A→Z, then playlists / albums / stations
      // (the wall panel's order), then title.
      const catOrder = { playlist: 0, album: 1, station: 2 };
      items.sort((a, b) =>
        a.service.localeCompare(b.service)
        || catOrder[a.category] - catOrder[b.category]
        || a.title.localeCompare(b.title));
      this._maFavs = items;
      // Drop a service filter that no longer exists after a refresh.
      if (this._maSvc !== "All" && !items.some(i => i.service === this._maSvc)) {
        this._maSvc = "All";
      }
    } catch (err) {
      this._maFavsError = `Couldn't load the Music Assistant library: ${err instanceof Error ? err.message : err}`;
    } finally {
      this._maFavsFetchedAt = Date.now();
      this._maFavsLoading = false;
    }
  }
  // Primary path: music_assistant.get_library, which carries per-item
  // provider info — the basis for the service grouping. Same query as the
  // basement wall panel's Favorites: hearted playlists, then albums, then
  // radio, each by name.
  private async _fetchMaViaLibrary(): Promise<MaFavorite[]> {
    const entry = await Svc.maConfigEntryId(this.hass);
    const TYPES: [string, MaFavorite["category"]][] = [
      ["playlist", "playlist"],
      ["album", "album"],
      ["radio", "station"],
    ];
    const out: MaFavorite[] = [];
    for (const [mediaType, category] of TYPES) {
      const items = await Svc.maGetLibrary(this.hass, entry, mediaType, true);
      for (const it of items) {
        const fav = this._maLibraryItemToFavorite(it, category);
        if (fav) out.push(fav);
      }
    }
    return out;
  }
  private _maLibraryItemToFavorite(
    it: MaLibraryItem,
    category: MaFavorite["category"],
  ): MaFavorite | null {
    if (typeof it.uri !== "string" || typeof it.name !== "string") return null;
    // Provider precedence: a provider-specific uri scheme beats the
    // `provider` field (which is often just "library"), which beats
    // the first provider mapping.
    const scheme = maUriScheme(it.uri);
    const raw = (scheme && scheme !== "library" ? scheme : undefined)
      ?? (it.provider && it.provider !== "library" ? it.provider : undefined)
      ?? it.provider_mappings?.find(m => m.provider_domain)?.provider_domain
      ?? "library";
    // Image is a plain URL in some MA releases, {path: ...} in others.
    const img = typeof it.image === "string"
      ? it.image
      : typeof (it.image as { path?: unknown } | undefined)?.path === "string"
        ? (it.image as { path: string }).path
        : undefined;
    return {
      title: it.name,
      media_content_id: it.uri,
      media_content_type: it.media_type ?? category,
      // Only http(s) images render from the card; provider-internal
      // paths fall back to the category icon.
      thumbnail: img && /^https?:\/\//i.test(img) ? img : undefined,
      category,
      service: maServiceLabel(raw),
    };
  }
  // Fallback: browse the MA entity's media tree (playlists / radio /
  // albums sections under the root).
  private async _fetchMaViaBrowse(): Promise<MaFavorite[]> {
    const ma = this._anyMaEntity();
    if (!ma) throw new Error("no Music Assistant player found");
    const root = await Svc.browseMedia(this.hass, ma);
    const sections: [RegExp, MaFavorite["category"]][] = [
      [/playlist/i, "playlist"],
      [/radio|station/i, "station"],
      [/album/i, "album"],
    ];
    const items: MaFavorite[] = [];
    for (const child of root.children ?? []) {
      const section = sections.find(([re]) =>
        re.test(child.title) || re.test(child.media_content_id ?? ""));
      if (!section || !child.can_expand) continue;
      const node = await Svc.browseMedia(
        this.hass, ma, child.media_content_id, child.media_content_type);
      for (const it of node.children ?? []) {
        if (!it.can_play || !it.media_content_id) continue;
        items.push({
          title: it.title,
          media_content_id: it.media_content_id,
          media_content_type: it.media_content_type,
          thumbnail: it.thumbnail,
          category: section[1],
          service: "Library",
        });
      }
    }
    return items;
  }
  private _playMaFavorite(f: MaFavorite) {
    // Never fall back to another room's MA entity — that would start
    // audio in the wrong room. The view shows a mapping hint instead.
    const target = this._maEntity(this._activeRoom);
    if (!target) return;
    Svc.playMedia(this.hass, target, f.media_content_id, f.media_content_type ?? "music");
    this._prevTitle = this._state(this._activeRoom)?.attributes.media_title;
    this._loadingName = f.title;
    if (this._loadingTimer) clearTimeout(this._loadingTimer);
    this._loadingTimer = setTimeout(() => { this._loadingName = null; }, 8000);
    this._view = "player";
  }
  private _renderMaFavorites() {
    const groupSize = this._groupMembers().length;
    const unmapped = !this._maEntity(this._activeRoom);
    const items = this._maFavs ?? [];
    const services = [...new Set(items.map(i => i.service))].sort();
    const tabs: Array<typeof this._favTab> = ["All", "Playlists", "Stations", "Albums"];
    const tabType = this._favTab === "Playlists" ? "playlist"
      : this._favTab === "Stations" ? "station"
      : this._favTab === "Albums" ? "album"
      : null;
    const filtered = items.filter(f =>
      (!tabType || f.category === tabType)
      && (this._maSvc === "All" || f.service === this._maSvc));
    // Grouped sections per service when no service filter is active
    // (items are already sorted service → type → title).
    const sections: [string, MaFavorite[]][] = [];
    for (const f of filtered) {
      const last = sections[sections.length - 1];
      if (last && last[0] === f.service) last[1].push(f);
      else sections.push([f.service, [f]]);
    }
    const showHeads = this._maSvc === "All" && sections.length > 1;

    return html`
      <div class="pv pv-scroll">
        <div class="fav-target">
          <span>Play to <b>${this._label(this._activeRoom)}${groupSize > 1 ? ` +${groupSize - 1}` : ""}</b></span>
          <button class="fav-refresh" aria-label="Refresh from Music Assistant"
            @click=${() => this._maybeFetchMaFavorites(true)}>↻</button>
        </div>
        ${unmapped ? html`
          <div class="fav-notice">No Music Assistant player is named
            <b>${this._state(this._activeRoom)?.attributes.friendly_name ?? this._label(this._activeRoom)}</b>
            — rename it in Music Assistant to match, or map it under
            <code>ma_entities</code>.</div>
        ` : nothing}
        ${services.length > 1 ? html`
          <div class="tabs svc">
            ${["All", ...services].map(sv => html`
              <button class=${classMap({ tab: true, active: this._maSvc === sv })}
                      @click=${() => this._maSvc = sv}>${sv}</button>
            `)}
          </div>
        ` : nothing}
        <div class="tabs">
          ${tabs.map(tb => html`
            <button class=${classMap({ tab: true, active: this._favTab === tb })}
                    @click=${() => this._favTab = tb}>${tb}</button>
          `)}
        </div>
        <div class="fav-list">
          ${this._maFavsError
            ? html`<div class="fav-empty error">${this._maFavsError}</div>`
            : !this._maFavs
              ? html`<div class="fav-empty">Loading Music Assistant library…</div>`
              : filtered.length === 0
                ? html`<div class="fav-empty">Nothing here yet — heart playlists, stations, or albums in Music Assistant and they'll appear.</div>`
                : sections.map(([service, list]) => html`
                  ${showHeads ? html`<div class="fav-svc-head">${service}</div>` : nothing}
                  ${list.map(f => html`
                    <button class="fav-item" ?disabled=${unmapped}
                            @click=${() => this._playMaFavorite(f)}>
                      <span class="fav-art" style=${styleMap({
                        background: f.thumbnail
                          ? `center / cover no-repeat url("${f.thumbnail}")`
                          : "linear-gradient(135deg,#4a5d72,#2a3540)" })}>
                        ${f.thumbnail ? nothing
                          : f.category === "station" ? iconStation
                          : f.category === "album" ? iconAlbum
                          : iconPlaylist}
                      </span>
                      <span class="fav-text">
                        <span class="fav-label">${f.title}</span>
                        <span class="fav-sub">${f.category === "station" ? "Station"
                          : f.category === "album" ? "Album" : "Playlist"}${this._maSvc === "All" && !showHeads ? ` · ${f.service}` : ""}</span>
                      </span>
                    </button>
                  `)}
                `)}
        </div>
      </div>
    `;
  }

  private _playFavorite(f: FavoriteConfig) {
    if (f.script) {
      this._svc(Svc.fireScript(this.hass, f.script, {
        // Pass the active room (and its current group) so the script can
        // target whichever speaker the user is looking at, instead of
        // hard-coding an entity per script.
        entity_id: this._activeRoom,
        group_members: this._groupMembers(),
      }), `Couldn't run ${f.script} for "${f.name}"`);
    } else if (f.media_content_id && f.media_content_type) {
      this._svc(
        Svc.playMedia(this.hass, this._activeRoom, f.media_content_id, f.media_content_type),
        `Couldn't play "${f.name}"`,
      );
    }
    // Capture the title that's playing right now so willUpdate can detect
    // when Sonos has actually switched to the new track and clear the
    // "Loading…" overlay. Safety-net timer also clears it after 8s.
    this._prevTitle = this._state(this._activeRoom)?.attributes.media_title;
    this._loadingName = f.name;
    if (this._loadingTimer) clearTimeout(this._loadingTimer);
    this._loadingTimer = setTimeout(() => { this._loadingName = null; }, 8000);
    this._view = "player";
  }


  private _renderGrouping(groupMembers: string[]) {
    const allEntities = this._config.entities;
    // Overlay pending toggles on the hass-reported membership so a tap
    // reflects instantly — Sonos takes ~1-2s to push new group_members.
    const inGroup = (id: string) => this._pendingGroup[id] ?? groupMembers.includes(id);
    const effectiveMembers = allEntities.filter(id => id === this._activeRoom || inGroup(id));
    const savedGroups = this._config.groups ?? [];
    const currentSig = [...effectiveMembers].sort().join(",");
    return html`
      <div class="pv pv-scroll">
        ${savedGroups.length ? html`
          <div class="tabs" role="group" aria-label="Saved groups">
            ${savedGroups.map(g => {
              // Only consider rooms this card actually knows about, so a
              // group referencing an unconfigured entity still works.
              const rooms = g.entities.filter(e => allEntities.includes(e));
              const active = rooms.length > 0
                && [...rooms].sort().join(",") === currentSig;
              return html`
                <button class=${classMap({ tab: true, active })}
                        aria-pressed=${active}
                        @click=${() => this._pickGroup(rooms)}>${g.label}</button>
              `;
            })}
          </div>
        ` : nothing}
        <div class="grp-banner">
          <div style="min-width:0">
            <div class="lbl">Currently grouped</div>
            <div class="rooms">${effectiveMembers.map(id => this._label(id)).join(" + ") || "—"}</div>
          </div>
          <div class="hint">Tap to toggle</div>
        </div>
        <div class="grp-grid">
          ${allEntities.map(id => {
            const active = id === this._activeRoom;
            const grouped = inGroup(id);
            const pending = id in this._pendingGroup;
            return html`
              <button class=${classMap({ "grp-row": true, primary: active, grouped: grouped && !active, pending })}
                      aria-pressed=${grouped}
                      aria-label="${this._label(id)}${active ? ", primary speaker" : grouped ? ", in group" : ", not in group"}"
                      @click=${() => this._toggleInGroup(id)}>
                <span style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">
                  ${active ? html`<span style="display:flex">${iconEq}</span>` : nothing}
                  <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${this._label(id)}</span>
                </span>
                ${active ? html`<span class="badge">PRIMARY</span>`
                  : grouped ? html`<span style="width:20px;height:20px;border-radius:50%;background:var(--wp-on-accent-soft);display:flex;align-items:center;justify-content:center;color:var(--wp-bg)">${iconCheck}</span>`
                  : nothing}
              </button>
            `;
          })}
        </div>
        ${effectiveMembers.length > 1 ? html`
          <div class="grp-volumes">
            <div class="grp-volumes-title">Group Volumes</div>
            ${effectiveMembers.map(id => {
              const v = Math.round((this._state(id)?.attributes.volume_level ?? 0) * 100);
              return html`
                <div class="grp-vol-row">
                  <span class="name">${this._label(id)}${id === this._activeRoom ? html`<span style="color:var(--wp-accent)"> ·</span>` : nothing}</span>
                  ${this._slider(v, 100, vv => Svc.setVolume(this.hass, id, vv), id, `Volume for ${this._label(id)}`)}
                  <span class="val">${v}</span>
                </div>
              `;
            })}
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderMenu(groupMembers: string[]) {
    const savedGroups = this._config.groups ?? [];
    const currentSig = [...groupMembers].sort().join(",");
    return html`
      <div class="menu-overlay" @click=${() => this._menuOpen = false}
           @keydown=${(e: KeyboardEvent) => { if (e.key === "Escape") this._menuOpen = false; }}>
        <div class="menu-card" role="dialog" aria-label="Rooms and groups"
             @click=${(e: Event) => e.stopPropagation()}>
          ${groupMembers.length > 1 || savedGroups.length > 0 ? html`<div class="menu-section">Groups</div>` : nothing}
          ${groupMembers.length > 1 ? html`
            <button class="menu-item active">
              <span style="display:flex">${iconLink}</span>
              <span style="flex:1">${groupMembers.map(id => this._label(id)).join(" + ")}</span>
              <span class="now-pill">NOW</span>
            </button>
          ` : nothing}
          ${savedGroups
            .filter(g => {
              const inConfig = g.entities.filter(e => this._config.entities.includes(e));
              return [...inConfig].sort().join(",") !== currentSig;
            })
            .map(g => html`
              <button class="menu-item" @click=${() => this._pickGroup(g.entities)}>
                <span style="display:flex">${iconLink}</span>
                <span style="flex:1">${g.label}</span>
              </button>
            `)}
          <div class="menu-section">Rooms</div>
          ${this._config.entities.map(id => {
            const isActive = id === this._activeRoom && groupMembers.length === 1;
            const inGrp = groupMembers.includes(id) && groupMembers.length > 1;
            return html`
              <button class=${classMap({ "menu-item": true, active: isActive })}
                      @click=${() => this._pickRoom(id)}>
                <span style="display:flex">${iconSpeaker}</span>
                <span style="flex:1">${this._label(id)}</span>
                ${inGrp ? html`<span class="group-pill">IN GROUP</span>` : nothing}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
}

// Register with the HA card picker
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_TAG,
  name: "Wall Panel Sonos Card",
  description: "Sonos multi-room control designed for wall-mounted tablets.",
  preview: false,
  documentationURL: "https://github.com/your-org/wall-panel-sonos-card",
});

// Side-effect import: registers the mini card in the same bundle so a
// single resource entry in Lovelace gives users both
// `custom:wall-panel-sonos-card` and `custom:wall-panel-sonos-mini-card`.
import "./mini-card";

export { CARD_VERSION };
