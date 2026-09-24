// Type definitions for the Wall Panel Sonos Card.
// Trimmed shape of the bits of HomeAssistant we actually use.

import type { LovelaceCardConfig } from "custom-card-helpers";

export interface WallPanelSonosCardConfig extends LovelaceCardConfig {
  type: string;
  // List of media_player entity IDs to expose as rooms.
  entities: string[];
  // Optional friendly name override per entity (id -> label).
  names?: Record<string, string>;
  // Optional list of pre-built groups shown in the room dropdown and
  // as quick-select pills in the Speakers view.
  groups?: { id: string; label: string; entities: string[] }[];
  // Optional list of favorites shown in the Favorites view when
  // favorites_source is "config" (the default).
  favorites?: FavoriteConfig[];
  // Where the Favorites view gets its list. "config" (default) uses
  // the `favorites` list above; "music_assistant" live-reads the MA
  // library — heart something in MA's UI and it shows up here,
  // organized by music service and type.
  favorites_source?: "config" | "music_assistant";
  // Optional. Each native Sonos entity plays MA items through the
  // music_assistant media_player with the same friendly name (the match
  // the basement wall panel uses). List a room here only to override that
  // (media_player.living_room -> media_player.living_room_2 etc.).
  // MA favorites must play through the MA entity; it outputs to the
  // same physical speaker, while the native entity keeps providing
  // room state (TV/line-in display, grouping, volume).
  ma_entities?: Record<string, string>;
  // Default view when card mounts. 'player' | 'favorites' | 'grouping'
  default_view?: "player" | "favorites" | "grouping";
  // Visual tweaks
  track_scale?: number; // 0.9 - 1.6
  vol_bar_scale?: number; // 1 - 2.5
  // Cap the slider's effective range. With max_volume: 40, the slider
  // travels 0..40 instead of 0..100, giving 2.5× more resolution at
  // the low end. The +/- buttons step proportionally.
  max_volume?: number; // 1 - 100, default 100
  // 'wall' or 'mobile' — affects density / hides on-screen keyboard input.
  layout?: "wall" | "mobile";
  // Map a media_content_id substring to a custom cover image and label.
  // HA's Sonos integration exposes no art/title for many streaming
  // sources (TuneIn, SiriusXM, Sonos Radio); this lets you supply both
  // per station. First matching entry wins.
  station_art?: StationArt[];
}

export interface StationArt {
  // Case-insensitive substring matched against media_content_id.
  // Pick something stable like "stationId=s297990" or "msnbc".
  match: string;
  // Cover image URL. Falls back to the default gradient if omitted.
  image?: string;
  // Title shown when the source doesn't expose media_title. Optional —
  // omit to keep the card's normal fallback ("Playing", app_name, etc.).
  name?: string;
}

export interface FavoriteConfig {
  id: string;
  name: string;
  type: "playlist" | "station" | "album";
  // Either a media_content_id usable with media_player.play_media
  // or a script entity id to fire.
  media_content_id?: string;
  media_content_type?: string;
  script?: string;
  // Optional cover override (URL or CSS gradient)
  art?: string;
}

export type ViewName = "player" | "favorites" | "grouping";

// A node returned by the media_player/browse_media WebSocket command.
// Used by the browse fallback for MA versions without get_library.
export interface BrowseMediaNode {
  title: string;
  media_class?: string;
  media_content_id?: string;
  media_content_type?: string;
  can_play?: boolean;
  can_expand?: boolean;
  thumbnail?: string;
  children?: BrowseMediaNode[];
}

// A Music Assistant library item shown in the Favorites view.
export interface MaFavorite {
  title: string;
  media_content_id: string;
  media_content_type?: string;
  thumbnail?: string;
  // Which type tab it files under.
  category: "playlist" | "station" | "album";
  // Display name of the providing music service ("Spotify", "TuneIn",
  // "Local Library", …) — the grouping key for the service sections.
  service: string;
}

// HA media_player entity state shape (subset)
export interface MediaPlayerState {
  entity_id: string;
  state: string; // 'playing' | 'paused' | 'idle' | 'off' | ...
  attributes: {
    friendly_name?: string;
    volume_level?: number; // 0..1
    is_volume_muted?: boolean;
    media_title?: string;
    media_artist?: string;
    media_album_name?: string;
    media_duration?: number;
    media_position?: number;
    media_position_updated_at?: string;
    entity_picture?: string;
    group_members?: string[];
    source?: string;
    app_name?: string;
    media_content_id?: string;
  };
}
