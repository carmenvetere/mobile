// Service-call wrappers. Every interactive surface calls one of these.

import type { HomeAssistant } from "./types";

export const playPause = (hass: HomeAssistant, entity_id: string) =>
  hass.callService("media_player", "media_play_pause", { entity_id });

export const next = (hass: HomeAssistant, entity_id: string) =>
  hass.callService("media_player", "media_next_track", { entity_id });

export const prev = (hass: HomeAssistant, entity_id: string) =>
  hass.callService("media_player", "media_previous_track", { entity_id });

export const setVolume = (hass: HomeAssistant, entity_id: string, pct: number) =>
  hass.callService("media_player", "volume_set", {
    entity_id,
    volume_level: Math.max(0, Math.min(1, Math.round(pct) / 100)),
  });

export const setMuted = (hass: HomeAssistant, entity_id: string[], muted: boolean) =>
  hass.callService("media_player", "volume_mute", {
    entity_id,
    is_volume_muted: muted,
  });

export const selectOption = (hass: HomeAssistant, entity_id: string, option: string) =>
  hass.callService("input_select", "select_option", { entity_id, option });

export const runScript = (
  hass: HomeAssistant,
  script: string,
  vars: Record<string, unknown> = {},
) =>
  hass.callService("script", script.replace(/^script\./, ""), vars);

// ── Music Assistant ─────────────────────────────────────────────────

export interface BrowseNode {
  title: string;
  media_class?: string;
  media_content_id?: string;
  media_content_type?: string;
  can_play?: boolean;
  can_expand?: boolean;
  thumbnail?: string;
  children?: BrowseNode[];
}

export const browseMedia = (
  hass: HomeAssistant,
  entity_id: string,
  media_content_id?: string,
  media_content_type?: string,
): Promise<BrowseNode> =>
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

// One item from music_assistant.get_library. The shape has varied across
// MA releases, so every field is optional and read defensively.
export interface MaLibraryItem {
  name?: string;
  uri?: string;
  media_type?: string;
  image?: unknown;
  favorite?: boolean;
  provider?: string;
  provider_mappings?: { provider_domain?: string; provider_instance?: string }[];
}

export const maGetLibrary = async (
  hass: HomeAssistant,
  config_entry_id: string,
  media_type: string,
  // true = hearted only. Leave undefined for the whole library: MA reads
  // favorite: false as "only items that are NOT hearted".
  favorite?: boolean,
  limit = 500,
): Promise<MaLibraryItem[]> => {
  const raw = await hass.callWS<Record<string, unknown>>({
    type: "call_service",
    domain: "music_assistant",
    service: "get_library",
    service_data: {
      config_entry_id, media_type, limit,
      ...(favorite === undefined ? {} : { favorite }),
    },
    return_response: true,
  });
  const resp = ((raw as { response?: unknown })?.response ?? raw) as Record<string, unknown>;
  // {items: [...]} is the documented shape; accept a bare array or a
  // {<media_type>: [...]} keyed variant too.
  if (Array.isArray(resp)) return resp as MaLibraryItem[];
  if (Array.isArray(resp?.items)) return resp.items as MaLibraryItem[];
  for (const v of Object.values(resp ?? {})) {
    if (Array.isArray(v)) return v as MaLibraryItem[];
  }
  return [];
};
