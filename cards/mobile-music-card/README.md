# mobile-music-card

The Music view of the mobile dashboard as one Lit card. It started as the
wall-panel-sonos-card (github.com/carmenvetere/custom-media-card) and was
folded into this repo, restyled to Dune Mist, and wired to this config's
music backend.

## Deploy

The built file is committed at `www/mobile-music-card/mobile-music-card.js`.
Home Assistant serves `www/` at `/local/`, and `configuration.yaml` loads it:

```yaml
lovelace:
  resources:
    - url: /local/mobile-music-card/mobile-music-card.js?v=1.0.0
      type: module
```

A git pull on the HA host is the whole update. There is no HACS step and no
build on the host. After a pull, bump `?v=` if the phone still shows the old
card, then reload the browser or app.

## Build (only when changing the source)

```bash
cd cards/mobile-music-card
npm install
npm run build      # writes ../../www/mobile-music-card/mobile-music-card.js
npm run typecheck
```

Bump `version` in `package.json`, `CARD_VERSION` in the source, and the `?v=`
in `configuration.yaml` together, then commit the source and the built file.

## Backend it uses

| Entity | Role |
| --- | --- |
| `sensor.music_controlled_player` | Room the card controls (Auto or pinned) |
| `input_select.music_player` | Auto or a pinned room; options match the room names |
| `sensor.music_favorites` | Favorites strip, same Music Assistant query as the wall panel |
| `sensor.music_recent` | Recently played in the Library sheet |
| `script.music_play_item` | Plays on the room's Music Assistant player |
| `script.music_toggle_group` | Joins or removes a room from the controlled group |
| `script.music_refresh_library` | Re-pulls favorites and recents |

The Library sheet reads the whole Music Assistant library directly with
`music_assistant.get_library`, grouped by service.

## Config

```yaml
type: custom:mobile-music-card
max_volume: 40        # slider cap in percent
art_max: 320          # album art cap in px on wide screens
rooms:
  - entity: media_player.living_room
    name: Living Room  # must match the input_select option
    icon: mdi:sofa-outline
station_art:           # optional, for streams without metadata
  - match: "s297990"
    image: /local/station-art/msnbc.png
    name: MSNBC
```

The entity overrides `controller`, `selector`, `favorites`, `recent`,
`play_script`, `group_script` and `refresh_script` default to the entities
in the table above.
