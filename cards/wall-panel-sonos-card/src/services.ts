// Service-call wrappers — keeps the card body declarative.
// Every interactive surface in the card calls one of these.

import type { HomeAssistant } from "custom-card-helpers";
import type { BrowseMediaNode } from "./types";

export const playPause = (hass: HomeAssistant, entity_id: string) =>
  hass.callService("media_player", "media_play_pause", { entity_id });

export const next = (hass: HomeAssistant, entity_id: string) =>
  hass.callService("media_player", "media_next_track", { entity_id });

export const prev = (hass: HomeAssistant, entity_id: string) =>
  hass.callService("media_player", "media_previous_track", { entity_id });

export const setVolume = (
  hass: HomeAssistant,
  entity_id: string,
  pct: number,
) =>
  hass.callService("media_player", "volume_set", {
    entity_id,
    volume_level: Math.max(0, Math.min(1, pct / 100)),
  });

export const muteToggle = (
  hass: HomeAssistant,
  entity_id: string,
  is_muted: boolean,
) =>
  hass.callService("media_player", "volume_mute", {
    entity_id,
    is_volume_muted: !is_muted,
  });

// Sonos grouping uses join/unjoin. The "primary" is the entity_id you call
// join on; group_members is the list of others to add.
export const joinGroup = (
  hass: HomeAssistant,
  primary: string,
  members: string[],
) =>
  hass.callService("media_player", "join", {
    entity_id: primary,
    group_members: members,
  });

export const unjoin = (hass: HomeAssistant, entity_id: string) =>
  hass.callService("media_player", "unjoin", { entity_id });

export const playMedia = (
  hass: HomeAssistant,
  entity_id: string,
  media_content_id: string,
  media_content_type: string,
) =>
  hass.callService("media_player", "play_media", {
    entity_id,
    media_content_id,
    media_content_type,
  });

export const fireScript = (
  hass: HomeAssistant,
  script_entity: string,
  vars: Record<string, unknown> = {},
) => {
  const name = script_entity.startsWith("script.")
    ? script_entity.slice("script.".length)
    : script_entity;
  return hass.callService("script", name, vars);
};

// ── Music Assistant ─────────────────────────────────────────────────

// Browse a media_player's media tree over the WebSocket API. Fallback
// path for enumerating the MA library on MA versions that don't have
// the get_library action yet.
export const browseMedia = (
  hass: HomeAssistant,
  entity_id: string,
  media_content_id?: string,
  media_content_type?: string,
): Promise<BrowseMediaNode> =>
  hass.callWS({
    type: "media_player/browse_media",
    entity_id,
    ...(media_content_id ? { media_content_id } : {}),
    ...(media_content_type ? { media_content_type } : {}),
  });

// The Music Assistant config entry id, required by MA's actions.
export const maConfigEntryId = async (hass: HomeAssistant): Promise<string> => {
  const entries = await hass.callWS<{ entry_id: string; domain: string }[]>({
    type: "config_entries/get",
    domain: "music_assistant",
  });
  const entry = entries?.[0];
  if (!entry) throw new Error("Music Assistant integration not found");
  return entry.entry_id;
};

// One library item from music_assistant.get_library. The shape has
// varied across MA releases, so every field the card reads is optional
// and extracted defensively.
export interface MaLibraryItem {
  name?: string;
  uri?: string;
  media_type?: string;
  image?: unknown;
  favorite?: boolean;
  provider?: string;
  provider_mappings?: { provider_domain?: string; provider_instance?: string }[];
}

// music_assistant.get_library — returns library items of one media
// type. `favorite: true` narrows to hearted items, which is exactly
// the MA notion of a favorite.
export const maGetLibrary = async (
  hass: HomeAssistant,
  config_entry_id: string,
  media_type: string,
  favorite = true,
  limit = 500,
): Promise<MaLibraryItem[]> => {
  const raw = await hass.callWS<Record<string, unknown>>({
    type: "call_service",
    domain: "music_assistant",
    service: "get_library",
    service_data: { config_entry_id, media_type, favorite, limit, order_by: "name" },
    return_response: true,
  });
  const resp = ((raw as { response?: unknown })?.response ?? raw) as Record<string, unknown>;
  // {items: [...]} is the documented shape; be lenient about a bare
  // array or a {<media_type>: [...]} keyed variant.
  if (Array.isArray(resp)) return resp as MaLibraryItem[];
  if (Array.isArray(resp?.items)) return resp.items as MaLibraryItem[];
  for (const v of Object.values(resp ?? {})) {
    if (Array.isArray(v)) return v as MaLibraryItem[];
  }
  return [];
};
