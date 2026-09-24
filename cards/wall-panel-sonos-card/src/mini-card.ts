// Companion "mini" card — compact now-playing tile sized for a home
// dashboard alongside weather / scene cards. Auto-hides when no
// configured entity is playing or paused. Tapping the art / text /
// room label navigates to the full Sonos card view.
//
// Pulls metadata using the same fallback chain as the full card so it
// looks right for grouped slaves and metadata-less streaming sources
// (TuneIn, SiriusXM, Sonos Radio).

import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";
import * as Svc from "./services";
import { cssUrl } from "./util";
import {
  iconPlay, iconPause, iconNext, iconVolUp, iconVolDown, iconChev,
} from "./icons";
import type { MediaPlayerState, StationArt } from "./types";

export const MINI_TAG = "wall-panel-sonos-mini-card";

interface MiniConfig {
  type: string;
  // One or more media_player entity IDs to watch. The card picks the
  // first one that's playing (then paused/buffering); if none, it
  // hides entirely.
  entities: string[];
  // Friendly-name overrides
  names?: Record<string, string>;
  // Optional navigation target — fired as a 'navigate' action when the
  // art / text is tapped. Examples: '/lovelace/music' or '#music'.
  navigation_path?: string;
  // Step (percent) for the volume up/down buttons. Defaults to 5.
  volume_step?: number;
  // Same shape as the full card — overrides cover/title when HA exposes
  // no metadata (TuneIn, SiriusXM, etc.). See README.
  station_art?: StationArt[];
}

@customElement(MINI_TAG)
export class WallPanelSonosMiniCard extends LitElement implements LovelaceCard {
  static styles = css`
    :host {
      --wp-text: #ffffff;
      --wp-text-dim: rgba(255, 255, 255, 0.65);
      --wp-bg: #1a1c1f;
      --wp-card: #3a3d42;
      --wp-divider: rgba(255, 255, 255, 0.1);
      --wp-btn-bg: rgba(255, 255, 255, 0.08);
      /* Match the full card's theme hooks: outer radius + shadow follow
         HA theme vars, with the previous pixel values as fallback. */
      --wp-radius: var(--ha-card-border-radius, 28px);
      --wp-radius-tile-sm: 10px;
      --wp-shadow: var(--ha-card-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.18));
      display: block;
    }
    .root {
      background: var(--wp-card);
      color: var(--wp-text);
      border-radius: var(--wp-radius);
      padding: 14px;
      font-family: var(--ha-card-header-font-family, sans-serif);
      box-shadow: var(--wp-shadow);
    }
    .hdr {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 2px 4px 12px;
    }
    .hdr-title {
      font-size: 18px;
      font-weight: 700;
    }
    .hdr-rule {
      flex: 1;
      height: 1px;
      background: var(--wp-divider);
      margin-left: 8px;
    }
    .room {
      background: none;
      border: 0;
      color: var(--wp-text-dim);
      display: flex;
      align-items: center;
      gap: 2px;
      cursor: pointer;
      padding: 0;
      font-size: 12px;
      font: inherit;
    }
    .body {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
      background: none;
      border: 0;
      padding: 0;
      color: inherit;
      cursor: pointer;
      text-align: left;
      font: inherit;
    }
    .art {
      width: 52px;
      height: 52px;
      border-radius: var(--wp-radius-tile-sm);
      flex-shrink: 0;
      background-size: cover;
      background-position: center;
    }
    .meta {
      flex: 1;
      min-width: 0;
    }
    .title {
      font-size: 15px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .artist {
      font-size: 13px;
      opacity: 0.65;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ctrls {
      display: flex;
      gap: 4px;
    }
    .btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--wp-btn-bg);
      border: 0;
      color: var(--wp-text);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
    }
    .btn.primary {
      width: 44px;
      height: 44px;
      background: var(--wp-text);
      color: var(--wp-bg);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color, #8eb1bf);
      outline-offset: 2px;
    }
  `;

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: MiniConfig;

  setConfig(config: MiniConfig) {
    if (!config.entities?.length)
      throw new Error("wall-panel-sonos-mini-card: 'entities' is required.");
    this._config = config;
  }
  getCardSize() { return 2; }

  // Skip renders when no configured Sonos entity actually changed —
  // `hass` is mutated for every entity update across HA.
  shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size > 1 || !changed.has("hass")) return true;
    if (!this._config) return true;
    const prev = changed.get("hass") as HomeAssistant | undefined;
    if (!prev) return true;
    for (const id of this._config.entities) {
      if (prev.states[id] !== this.hass.states[id]) return true;
    }
    return false;
  }

  private _state(id: string): MediaPlayerState | undefined {
    return this.hass?.states[id] as unknown as MediaPlayerState;
  }
  private _label(id: string) {
    return this._config.names?.[id]
      ?? this._state(id)?.attributes.friendly_name
      ?? id.replace("media_player.", "").replace(/_/g, " ");
  }
  private _activeEntity(): string | undefined {
    return this._config.entities.find(id => this._state(id)?.state === "playing")
      ?? this._config.entities.find(id => ["paused", "buffering"].includes(this._state(id)?.state ?? ""));
  }
  // Mirror the full card's metadata fallback chain.
  private _coordinatorMeta(activeId: string, members: string[] | undefined) {
    if (!members) return undefined;
    for (const id of members) {
      if (id === activeId) continue;
      const att = this._state(id)?.attributes;
      if (att && (att.media_title || att.entity_picture)) return att;
    }
    return undefined;
  }
  private _stationArt(contentId: string | undefined): StationArt | undefined {
    if (!contentId || !this._config.station_art?.length) return undefined;
    const cid = contentId.toLowerCase();
    return this._config.station_art.find(
      e => e.match && cid.includes(e.match.toLowerCase()),
    );
  }
  private _sourceFromContentId(contentId: string | undefined): string | undefined {
    if (!contentId) return undefined;
    const m = contentId.match(/[?&]source=([^&]+)/i);
    return m ? decodeURIComponent(m[1]) : undefined;
  }
  private _navigate() {
    const path = this._config.navigation_path;
    if (!path) return;
    history.pushState(null, "", path);
    this.dispatchEvent(new Event("location-changed", { composed: true }));
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const id = this._activeEntity();
    if (!id) return html``; // hide when nothing is playing/paused
    const s = this._state(id)!;
    const a = s.attributes;
    // HA's Sonos integration only populates media metadata on the group
    // coordinator. If the picked entity is a slave, borrow from a
    // member that actually has metadata.
    const meta = (a.media_title || a.entity_picture)
      ? a
      : this._coordinatorMeta(id, a.group_members) ?? a;
    const contentId = meta.media_content_id ?? a.media_content_id;
    const station = this._stationArt(contentId);
    const playing = s.state === "playing";
    const vol = Math.round((a.volume_level ?? 0) * 100);
    const step = this._config.volume_step ?? 5;
    const cover = station?.image
      ? cssUrl(station.image)
      : meta.entity_picture
        ? cssUrl(meta.entity_picture)
        : "linear-gradient(135deg, #6a4ec8 0%, #1e3a6e 60%, #0a1428 100%)";
    const title = meta.media_title
      ?? station?.name
      ?? meta.app_name
      ?? a.app_name
      ?? this._sourceFromContentId(contentId)
      ?? (playing ? "Playing" : "—");
    const groupSize = (a.group_members?.length ?? 1);
    const roomLabel = `${this._label(id)}${groupSize > 1 ? ` +${groupSize - 1}` : ""}`;

    return html`
      <ha-card>
        <div class="root">
          <div class="hdr">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18 V5 L20 3 V16 M9 18 A2.5 2.5 0 1 1 6.5 15.5 A2.5 2.5 0 0 1 9 18 M20 16 A2.5 2.5 0 1 1 17.5 13.5 A2.5 2.5 0 0 1 20 16"/></svg>
            <div class="hdr-title">Now Playing</div>
            <div class="hdr-rule"></div>
            <button class="room" @click=${this._navigate} aria-label="Open full player for ${roomLabel}">
              ${roomLabel}${iconChev}
            </button>
          </div>
          <div class="body">
            <button class="nav" @click=${this._navigate} aria-label="Open full player">
              <div class="art" style=${styleMap({ background: cover })}></div>
              <div class="meta">
                <div class="title">${title}</div>
                <div class="artist">${meta.media_artist ?? ""}</div>
              </div>
            </button>
            <div class="ctrls">
              <button class="btn" aria-label="Volume down"
                @click=${() => Svc.setVolume(this.hass, id, Math.max(0, vol - step))}>${iconVolDown}</button>
              <button class="btn primary" aria-label=${playing ? "Pause" : "Play"}
                @click=${() => Svc.playPause(this.hass, id)}>
                ${playing ? iconPause : iconPlay}
              </button>
              <button class="btn" aria-label="Volume up"
                @click=${() => Svc.setVolume(this.hass, id, Math.min(100, vol + step))}>${iconVolUp}</button>
              <button class="btn" aria-label="Next track"
                @click=${() => Svc.next(this.hass, id)}>${iconNext}</button>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: MINI_TAG,
  name: "Wall Panel Sonos Mini Card",
  description: "Compact now-playing tile — pairs with wall-panel-sonos-card.",
  preview: false,
});
