// Types for the mobile Music card. The HomeAssistant shape is trimmed to
// the few members the card uses, so the build needs no helper package.

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  // Entity registry display entries; `platform` names the integration.
  entities?: Record<string, { entity_id?: string; platform?: string }>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
  ): Promise<unknown>;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
}

// One Sonos room. `name` must match the room's option in the selector
// input_select (that is how a room gets pinned).
export interface RoomConfig {
  entity: string;
  name?: string;
  icon?: string;
}

export interface MobileMusicCardConfig {
  type: string;
  rooms: (RoomConfig | string)[];
  // Backend entities. Defaults match this config (sensors2.yaml,
  // configuration.yaml helpers, scripts.yaml).
  controller?: string; // sensor.music_controlled_player
  selector?: string; // input_select.music_player
  favorites?: string; // sensor.music_favorites
  recent?: string; // sensor.music_recent
  play_script?: string; // script.music_play_item
  group_script?: string; // script.music_toggle_group
  refresh_script?: string; // script.music_refresh_library
  // Volume cap in percent. Sliders travel 0..max_volume.
  max_volume?: number; // default 40
  // Album art cap in px on wide screens (full width on a phone).
  art_max?: number; // default 320
  // Cover and title for streams that expose no metadata (TuneIn etc.).
  station_art?: StationArt[];
}

export interface StationArt {
  // Case-insensitive substring of media_content_id.
  match: string;
  image?: string;
  name?: string;
}

// A row of the favorites / recent sensors: name|sub|type|uri|expandable|image
export interface ListRow {
  name: string;
  sub: string;
  type: string;
  uri: string;
  expandable: boolean;
  image: string;
}

export type LibCategory = "playlist" | "station" | "album" | "artist";

// A Music Assistant library item shown in the Library sheet.
export interface LibItem {
  title: string;
  uri: string;
  media_type: string;
  image?: string;
  category: LibCategory;
  service: string;
  favorite: boolean;
}

export type SheetName = "speakers" | "volumes" | "library";
