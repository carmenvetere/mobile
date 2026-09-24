// Visual editor for the card config.
//
// Structured as five sections:
//   Rooms       — media_player entities + rename map
//   Options     — top-level tunables (view, layout, scales, max_volume)
//   Favorites   — list editor with per-row fields
//   Groups      — list editor with name + room multiselect
//   Station art — list editor mapping media_content_id substrings to art
//
// Anything not exposed here stays writable via the YAML editor. Every edit
// dispatches a `config-changed` event with the whole new config.

import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import { EDITOR_TAG } from "./const";
import type {
  WallPanelSonosCardConfig,
  FavoriteConfig,
  StationArt,
} from "./types";

// A group entry in the config. Groups are shown in the room dropdown.
interface GroupConfig {
  id: string;
  label: string;
  entities: string[];
}

// Which section is currently expanded. Keeps the editor from being a
// wall of forms — user opens one section at a time.
type Section = "rooms" | "options" | "favorites" | "groups" | "station_art";

@customElement(EDITOR_TAG)
export class WallPanelSonosCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  static styles = css`
    :host { display: block; }
    .sec {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      margin: 8px 0;
      overflow: hidden;
    }
    .sec-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      background: var(--secondary-background-color);
      cursor: pointer;
      user-select: none;
      font-weight: 600;
    }
    .sec-head .count {
      margin-left: auto;
      font-size: 12px;
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    .sec-body { padding: 12px 14px; }
    .row { display: flex; flex-direction: column; gap: 6px; padding: 6px 0; }
    .row-inline {
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 6px 0;
    }
    .row-inline > * { flex: 1; min-width: 0; }
    label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    input, select, textarea {
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font: inherit;
      box-sizing: border-box;
      width: 100%;
    }
    textarea { resize: vertical; }
    .help {
      font-size: 11px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .item {
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      margin: 6px 0;
      background: var(--card-background-color);
    }
    .item-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      cursor: pointer;
      user-select: none;
    }
    .item-head .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .item-body { padding: 6px 10px 10px; border-top: 1px solid var(--divider-color); }
    .btn {
      background: none;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 4px 8px;
      cursor: pointer;
      color: var(--primary-text-color);
      font: inherit;
    }
    .btn.danger { color: var(--error-color, #cf6679); border-color: var(--error-color, #cf6679); }
    .btn.primary { background: var(--primary-color); color: white; border-color: var(--primary-color); }
    .btn-mini { padding: 2px 6px; font-size: 12px; }
    .actions { display: flex; gap: 6px; }
    .adder {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }
    .adder select { flex: 1; }
    .chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 6px 0;
    }
    .chip {
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      cursor: pointer;
      font-size: 13px;
      user-select: none;
    }
    .chip.on {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
  `;

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: WallPanelSonosCardConfig;
  @state() private _open: Section | null = "rooms";
  // Which list item is expanded. Keyed by "section:index" so opening a
  // favorite doesn't collapse an open group and vice versa.
  @state() private _openItem: Record<string, boolean> = {};

  setConfig(config: WallPanelSonosCardConfig) { this._config = config; }

  // ── config mutation helpers ────────────────────────────────────────
  private _emit(next: WallPanelSonosCardConfig) {
    this._config = next;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: next } }));
  }
  private _val<K extends keyof WallPanelSonosCardConfig>(k: K, v: WallPanelSonosCardConfig[K]) {
    this._emit({ ...this._config, [k]: v });
  }
  private _setList<K extends keyof WallPanelSonosCardConfig>(k: K, list: WallPanelSonosCardConfig[K]) {
    // Delete the key when the list is empty so the resulting YAML stays
    // tidy — no dangling `favorites: []` lines cluttering the config.
    const next = { ...this._config };
    if (Array.isArray(list) && list.length === 0) delete next[k];
    else (next as any)[k] = list;
    this._emit(next);
  }

  private _entityOptions(): string[] {
    return this.hass
      ? Object.keys(this.hass.states).filter(id => id.startsWith("media_player.")).sort()
      : [];
  }
  private _scriptOptions(): string[] {
    return this.hass
      ? Object.keys(this.hass.states).filter(id => id.startsWith("script.")).sort()
      : [];
  }
  private _toggleSection(s: Section) {
    this._open = this._open === s ? null : s;
  }
  private _toggleItem(key: string) {
    this._openItem = { ...this._openItem, [key]: !this._openItem[key] };
  }

  // ── generic list operations ────────────────────────────────────────
  private _moveItem<T>(list: T[], idx: number, dir: -1 | 1): T[] {
    const j = idx + dir;
    if (j < 0 || j >= list.length) return list;
    const next = list.slice();
    [next[idx], next[j]] = [next[j], next[idx]];
    return next;
  }

  render() {
    if (!this._config) return html``;
    return html`
      ${this._renderSection("rooms", "Rooms", (this._config.entities?.length ?? 0) + " configured", this._renderRooms)}
      ${this._renderSection("options", "Options", "", this._renderOptions)}
      ${this._renderSection("favorites", "Favorites", (this._config.favorites?.length ?? 0) + " items", this._renderFavorites)}
      ${this._renderSection("groups", "Groups", (this._config.groups?.length ?? 0) + " items", this._renderGroups)}
      ${this._renderSection("station_art", "Station art", (this._config.station_art?.length ?? 0) + " mappings", this._renderStationArt)}
    `;
  }

  private _renderSection(key: Section, title: string, count: string, body: () => unknown) {
    const open = this._open === key;
    return html`
      <div class="sec">
        <div class="sec-head" @click=${() => this._toggleSection(key)}>
          <span>${open ? "▾" : "▸"} ${title}</span>
          <span class="count">${count}</span>
        </div>
        ${open ? html`<div class="sec-body">${body.call(this)}</div>` : nothing}
      </div>
    `;
  }

  // ── Rooms ──────────────────────────────────────────────────────────
  private _renderRooms = () => {
    const entities = this._config.entities ?? [];
    const names = this._config.names ?? {};
    const available = this._entityOptions().filter(id => !entities.includes(id));
    return html`
      ${entities.map((id, i) => html`
        <div class="item">
          <div class="item-head">
            <span class="name">${names[id] ?? id}</span>
            <div class="actions">
              <button class="btn btn-mini" ?disabled=${i === 0}
                @click=${() => this._setList("entities", this._moveItem(entities, i, -1))}>↑</button>
              <button class="btn btn-mini" ?disabled=${i === entities.length - 1}
                @click=${() => this._setList("entities", this._moveItem(entities, i, 1))}>↓</button>
              <button class="btn btn-mini danger"
                @click=${() => {
                  const nextEnts = entities.filter((_, j) => j !== i);
                  const nextNames = { ...names };
                  delete nextNames[id];
                  const next = { ...this._config, entities: nextEnts, names: Object.keys(nextNames).length ? nextNames : undefined };
                  this._emit(next);
                }}>Remove</button>
            </div>
          </div>
          <div class="item-body">
            <div class="row">
              <label>Entity</label>
              <input type="text" .value=${id}
                @change=${(e: Event) => {
                  const nid = (e.target as HTMLInputElement).value.trim();
                  if (!nid || entities.includes(nid)) return;
                  const nextEnts = entities.map((x, j) => j === i ? nid : x);
                  const nextNames = { ...names };
                  if (names[id]) { nextNames[nid] = names[id]; delete nextNames[id]; }
                  this._emit({ ...this._config, entities: nextEnts, names: Object.keys(nextNames).length ? nextNames : undefined });
                }}/>
            </div>
            <div class="row">
              <label>Display name (optional)</label>
              <input type="text" .value=${names[id] ?? ""}
                placeholder=${id}
                @change=${(e: Event) => {
                  const v = (e.target as HTMLInputElement).value.trim();
                  const nextNames = { ...names };
                  if (v) nextNames[id] = v; else delete nextNames[id];
                  this._emit({ ...this._config, names: Object.keys(nextNames).length ? nextNames : undefined });
                }}/>
            </div>
          </div>
        </div>
      `)}
      <div class="adder">
        <select @change=${(e: Event) => {
          const v = (e.target as HTMLSelectElement).value;
          if (!v) return;
          this._setList("entities", [...entities, v]);
          (e.target as HTMLSelectElement).value = "";
        }}>
          <option value="">+ Add media_player entity…</option>
          ${available.map(id => html`<option value=${id}>${id}</option>`)}
        </select>
      </div>
    `;
  };

  // ── Options ────────────────────────────────────────────────────────
  private _renderOptions = () => html`
    <div class="row">
      <label>Default view</label>
      <select @change=${(e: Event) => this._val("default_view", (e.target as HTMLSelectElement).value as any)}>
        ${["player","favorites","grouping"].map(v => html`
          <option value=${v} ?selected=${this._config.default_view === v}>${v}</option>
        `)}
      </select>
    </div>
    <div class="row">
      <label>Layout</label>
      <select @change=${(e: Event) => this._val("layout", (e.target as HTMLSelectElement).value as any)}>
        <option value="wall" ?selected=${(this._config.layout ?? "wall") === "wall"}>wall</option>
        <option value="mobile" ?selected=${this._config.layout === "mobile"}>mobile</option>
      </select>
    </div>
    <div class="row">
      <label>Track text scale (0.9–1.6)</label>
      <input type="number" min="0.9" max="1.6" step="0.05"
        .value=${String(this._config.track_scale ?? 1.15)}
        @change=${(e: Event) => this._val("track_scale", parseFloat((e.target as HTMLInputElement).value))}/>
    </div>
    <div class="row">
      <label>Volume bar scale (1.0–2.5)</label>
      <input type="number" min="1" max="2.5" step="0.1"
        .value=${String(this._config.vol_bar_scale ?? 1.4)}
        @change=${(e: Event) => this._val("vol_bar_scale", parseFloat((e.target as HTMLInputElement).value))}/>
    </div>
    <div class="row">
      <label>Max volume cap (1–100)</label>
      <input type="number" min="1" max="100" step="1"
        .value=${String(this._config.max_volume ?? 100)}
        @change=${(e: Event) => this._val("max_volume", parseInt((e.target as HTMLInputElement).value, 10))}/>
      <div class="help">Set below 100 to give the slider finer resolution at low volumes.</div>
    </div>
    <div class="row">
      <label>Favorites source</label>
      <select @change=${(e: Event) => this._val("favorites_source", (e.target as HTMLSelectElement).value as any)}>
        <option value="config" ?selected=${(this._config.favorites_source ?? "config") === "config"}>config (the favorites list below/in YAML)</option>
        <option value="music_assistant" ?selected=${this._config.favorites_source === "music_assistant"}>music_assistant (live library, grouped by service &amp; type)</option>
      </select>
      <div class="help">With <code>music_assistant</code>, the Favorites view shows whatever is hearted in Music Assistant, organized by music service and type. Plays through the Music Assistant player with the same name as the room, or the mapping below.</div>
    </div>
    <div class="row">
      <label>Music Assistant entities, optional overrides (native = MA player, one per line)</label>
      <textarea rows="4" @change=${(e: Event) => {
        const map: Record<string, string> = {};
        for (const line of (e.target as HTMLTextAreaElement).value.split("\n")) {
          const [k, v] = line.split("=").map(s => s.trim());
          if (k && v) map[k] = v;
        }
        this._val("ma_entities", Object.keys(map).length ? map : undefined);
      }}>${Object.entries(this._config.ma_entities ?? {}).map(([k, v]) => `${k} = ${v}`).join("\n")}</textarea>
      <div class="help">e.g. <code>media_player.living_room = media_player.living_room_2</code>. MA favorites play through the MA twin of the active room (same physical speaker).</div>
    </div>
  `;

  // ── Favorites ──────────────────────────────────────────────────────
  private _updateFav(idx: number, patch: Partial<FavoriteConfig>) {
    const list = (this._config.favorites ?? []).map((f, j) =>
      j === idx ? { ...f, ...patch } : f);
    this._setList("favorites", list);
  }
  private _renderFavorites = () => {
    const favs = this._config.favorites ?? [];
    const scripts = this._scriptOptions();
    return html`
      ${favs.map((f, i) => {
        const key = `fav:${i}`;
        const open = !!this._openItem[key];
        const mode: "media" | "script" = f.script ? "script" : "media";
        return html`
          <div class="item">
            <div class="item-head" @click=${() => this._toggleItem(key)}>
              <span>${open ? "▾" : "▸"}</span>
              <span class="name">${f.name || f.id || "(untitled)"}</span>
              <span class="count">${f.type ?? ""}</span>
              <div class="actions" @click=${(e: Event) => e.stopPropagation()}>
                <button class="btn btn-mini" ?disabled=${i === 0}
                  @click=${() => this._setList("favorites", this._moveItem(favs, i, -1))}>↑</button>
                <button class="btn btn-mini" ?disabled=${i === favs.length - 1}
                  @click=${() => this._setList("favorites", this._moveItem(favs, i, 1))}>↓</button>
                <button class="btn btn-mini danger"
                  @click=${() => this._setList("favorites", favs.filter((_, j) => j !== i))}>Remove</button>
              </div>
            </div>
            ${open ? html`
              <div class="item-body">
                <div class="row-inline">
                  <div>
                    <label>ID</label>
                    <input type="text" .value=${f.id ?? ""}
                      @change=${(e: Event) => this._updateFav(i, { id: (e.target as HTMLInputElement).value.trim() })}/>
                  </div>
                  <div>
                    <label>Name</label>
                    <input type="text" .value=${f.name ?? ""}
                      @change=${(e: Event) => this._updateFav(i, { name: (e.target as HTMLInputElement).value })}/>
                  </div>
                </div>
                <div class="row">
                  <label>Type</label>
                  <div class="chip-list">
                    ${(["playlist","station","album"] as const).map(t => html`
                      <span class="chip ${f.type === t ? "on" : ""}"
                        @click=${() => this._updateFav(i, { type: t })}>${t}</span>
                    `)}
                  </div>
                </div>
                <div class="row">
                  <label>Source</label>
                  <div class="chip-list">
                    <span class="chip ${mode === "media" ? "on" : ""}"
                      @click=${() => this._updateFav(i, { script: undefined })}>media_content_id</span>
                    <span class="chip ${mode === "script" ? "on" : ""}"
                      @click=${() => this._updateFav(i, { media_content_id: undefined, media_content_type: undefined })}>script</span>
                  </div>
                </div>
                ${mode === "media" ? html`
                  <div class="row">
                    <label>media_content_id</label>
                    <textarea rows="2"
                      @change=${(e: Event) => this._updateFav(i, { media_content_id: (e.target as HTMLTextAreaElement).value.trim() || undefined })}
                      >${f.media_content_id ?? ""}</textarea>
                    <div class="help">Get one via Developer Tools → Services → <code>media_player.play_media</code> → Choose media. Sonos favorite URIs and Sonos Radio stream URIs both work.</div>
                  </div>
                  <div class="row">
                    <label>media_content_type</label>
                    <input type="text" .value=${f.media_content_type ?? ""}
                      placeholder="music"
                      @change=${(e: Event) => this._updateFav(i, { media_content_type: (e.target as HTMLInputElement).value.trim() || undefined })}/>
                  </div>
                ` : html`
                  <div class="row">
                    <label>Script</label>
                    <select
                      @change=${(e: Event) => this._updateFav(i, { script: (e.target as HTMLSelectElement).value || undefined })}>
                      <option value="">— pick a script.* —</option>
                      ${scripts.map(s => html`<option value=${s} ?selected=${f.script === s}>${s}</option>`)}
                    </select>
                    <div class="help">The script receives <code>entity_id</code> (active room) and <code>group_members</code> as service fields.</div>
                  </div>
                `}
                <div class="row">
                  <label>Art (URL or CSS gradient, optional)</label>
                  <textarea rows="2"
                    placeholder="linear-gradient(135deg, #1a1a1a 0%, #6a4a2c 100%)"
                    @change=${(e: Event) => this._updateFav(i, { art: (e.target as HTMLTextAreaElement).value.trim() || undefined })}
                    >${f.art ?? ""}</textarea>
                </div>
              </div>
            ` : nothing}
          </div>
        `;
      })}
      <div class="adder">
        <button class="btn primary" @click=${() => {
          const next: FavoriteConfig = {
            id: `favorite_${(favs.length + 1)}`,
            name: "New favorite",
            type: "playlist",
          };
          this._setList("favorites", [...favs, next]);
          this._openItem = { ...this._openItem, [`fav:${favs.length}`]: true };
        }}>+ Add favorite</button>
      </div>
    `;
  };

  // ── Groups ─────────────────────────────────────────────────────────
  private _updateGroup(idx: number, patch: Partial<GroupConfig>) {
    const list = (this._config.groups ?? []).map((g, j) =>
      j === idx ? { ...g, ...patch } : g);
    this._setList("groups", list);
  }
  private _renderGroups = () => {
    const groups = (this._config.groups ?? []) as GroupConfig[];
    const rooms = this._config.entities ?? [];
    return html`
      ${groups.map((g, i) => {
        const key = `grp:${i}`;
        const open = !!this._openItem[key];
        return html`
          <div class="item">
            <div class="item-head" @click=${() => this._toggleItem(key)}>
              <span>${open ? "▾" : "▸"}</span>
              <span class="name">${g.label || g.id}</span>
              <span class="count">${(g.entities?.length ?? 0)} rooms</span>
              <div class="actions" @click=${(e: Event) => e.stopPropagation()}>
                <button class="btn btn-mini" ?disabled=${i === 0}
                  @click=${() => this._setList("groups", this._moveItem(groups, i, -1))}>↑</button>
                <button class="btn btn-mini" ?disabled=${i === groups.length - 1}
                  @click=${() => this._setList("groups", this._moveItem(groups, i, 1))}>↓</button>
                <button class="btn btn-mini danger"
                  @click=${() => this._setList("groups", groups.filter((_, j) => j !== i))}>Remove</button>
              </div>
            </div>
            ${open ? html`
              <div class="item-body">
                <div class="row-inline">
                  <div>
                    <label>ID</label>
                    <input type="text" .value=${g.id ?? ""}
                      @change=${(e: Event) => this._updateGroup(i, { id: (e.target as HTMLInputElement).value.trim() })}/>
                  </div>
                  <div>
                    <label>Label</label>
                    <input type="text" .value=${g.label ?? ""}
                      @change=${(e: Event) => this._updateGroup(i, { label: (e.target as HTMLInputElement).value })}/>
                  </div>
                </div>
                <div class="row">
                  <label>Rooms</label>
                  <div class="chip-list">
                    ${rooms.length === 0
                      ? html`<div class="help">Add rooms in the Rooms section first.</div>`
                      : rooms.map(id => {
                          const on = (g.entities ?? []).includes(id);
                          return html`
                            <span class="chip ${on ? "on" : ""}"
                              @click=${() => {
                                const next = on
                                  ? (g.entities ?? []).filter(x => x !== id)
                                  : [...(g.entities ?? []), id];
                                this._updateGroup(i, { entities: next });
                              }}>${(this._config.names ?? {})[id] ?? id}</span>
                          `;
                        })}
                  </div>
                </div>
              </div>
            ` : nothing}
          </div>
        `;
      })}
      <div class="adder">
        <button class="btn primary" @click=${() => {
          const next: GroupConfig = {
            id: `group_${(groups.length + 1)}`,
            label: "New group",
            entities: [],
          };
          this._setList("groups", [...groups, next]);
          this._openItem = { ...this._openItem, [`grp:${groups.length}`]: true };
        }}>+ Add group</button>
      </div>
    `;
  };

  // ── Station art ────────────────────────────────────────────────────
  private _updateStationArt(idx: number, patch: Partial<StationArt>) {
    const list = (this._config.station_art ?? []).map((s, j) =>
      j === idx ? { ...s, ...patch } : s);
    this._setList("station_art", list);
  }
  private _renderStationArt = () => {
    const entries = this._config.station_art ?? [];
    return html`
      ${entries.map((s, i) => {
        const key = `art:${i}`;
        const open = !!this._openItem[key];
        return html`
          <div class="item">
            <div class="item-head" @click=${() => this._toggleItem(key)}>
              <span>${open ? "▾" : "▸"}</span>
              <span class="name">${s.name || s.match || "(unmatched)"}</span>
              <div class="actions" @click=${(e: Event) => e.stopPropagation()}>
                <button class="btn btn-mini" ?disabled=${i === 0}
                  @click=${() => this._setList("station_art", this._moveItem(entries, i, -1))}>↑</button>
                <button class="btn btn-mini" ?disabled=${i === entries.length - 1}
                  @click=${() => this._setList("station_art", this._moveItem(entries, i, 1))}>↓</button>
                <button class="btn btn-mini danger"
                  @click=${() => this._setList("station_art", entries.filter((_, j) => j !== i))}>Remove</button>
              </div>
            </div>
            ${open ? html`
              <div class="item-body">
                <div class="row">
                  <label>Match (case-insensitive substring of media_content_id)</label>
                  <input type="text" .value=${s.match ?? ""}
                    placeholder="stationId=s297990"
                    @change=${(e: Event) => this._updateStationArt(i, { match: (e.target as HTMLInputElement).value })}/>
                  <div class="help">Find one via Developer Tools → States while the station is playing and copy a stable substring out of <code>media_content_id</code>.</div>
                </div>
                <div class="row">
                  <label>Label (shown as title when media_title is missing)</label>
                  <input type="text" .value=${s.name ?? ""}
                    @change=${(e: Event) => this._updateStationArt(i, { name: (e.target as HTMLInputElement).value || undefined })}/>
                </div>
                <div class="row">
                  <label>Image URL</label>
                  <input type="text" .value=${s.image ?? ""}
                    placeholder="https://example.com/logo.png"
                    @change=${(e: Event) => this._updateStationArt(i, { image: (e.target as HTMLInputElement).value.trim() || undefined })}/>
                </div>
              </div>
            ` : nothing}
          </div>
        `;
      })}
      <div class="adder">
        <button class="btn primary" @click=${() => {
          const next: StationArt = { match: "" };
          this._setList("station_art", [...entries, next]);
          this._openItem = { ...this._openItem, [`art:${entries.length}`]: true };
        }}>+ Add mapping</button>
      </div>
    `;
  };
}
