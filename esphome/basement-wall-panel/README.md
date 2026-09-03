# Basement Wall Panel — ESPHome / LVGL (v2.6)

A 720×720 wall-mounted Home Assistant control panel for the basement, built
from the Claude Design handoff (`Basement Wall Panel v2`) for the Waveshare
**ESP32-P4-WIFI6-Touch-LCD-4C** (4″ IPS, GT911 touch, ES8311 codec with the
on-board mic and speaker). Seven horizontally-swiped pages — Alarm, Energy,
Scenes (home), Shades, Music, Pool, Settings — plus the swipe-down menu, the
voice overlay and every full-screen sheet from the design.

```
esphome/
├── basement-wall-panel.yaml        # the panel: ESP32-P4 hardware build
├── basement-wall-panel-sim.yaml    # desktop simulator: same UI in an SDL window
└── basement-wall-panel/
    ├── common.yaml                 # API, time, album art, Panel & Voice settings
    ├── icons.yaml                  # design tokens (colors) + MDI glyph substitutions
    ├── fonts.yaml                  # Barlow 300–700 at design sizes, MDI icon fonts
    ├── entities.yaml               # every Home Assistant entity the panel subscribes to
    ├── ui.yaml                     # LVGL screen tree (theme, styles, tileview, overlays)
    ├── logic.yaml                  # panel state + the scripts that render and act
    ├── panel_helpers.h             # small C++ helpers used by the lambdas
    ├── pages/                      # one file per page (tileview tiles)
    ├── overlays/                   # status bar, handle, dots, menu, voice, sheets
    └── widgets/                    # include-with-vars templates (rows, buttons, chips)
packages/basement_wall_panel.yaml   # HA side: summary sensors, cover group, scripts
```

## Testing without the hardware (the simulator)

ESPHome's LVGL UI cannot run inside a browser tab — there is no web target for
ESPHome firmware. What you *can* do is run the **exact same configuration** as a
native desktop app: ESPHome's `host` platform draws the LVGL screen in a 720×720
SDL window and talks to your real Home Assistant over the native API, so every
page, sheet, toggle and service call is the real thing. The only differences
from the panel are the stubs listed under "What the simulator can't do".

### 1. One-time setup on your Mac (or Linux box)

```bash
brew install sdl2 python@3.12        # macOS   (Linux: apt install libsdl2-dev build-essential)
python3 -m venv ~/esphome-venv && source ~/esphome-venv/bin/activate
pip install esphome                  # 2026.6 or newer
```

Copy `esphome/secrets.yaml.example` to `esphome/secrets.yaml` and fill in
`api_key_basement_wall_panel` (`openssl rand -base64 32`). The simulator only
needs that one key; the Wi-Fi/OTA values can stay as placeholders.

If Home Assistant is not reachable as `homeassistant.local:8123`, change
`ha_base_url` at the top of `basement-wall-panel-sim.yaml` (it is only used to
fetch album art).

### 2. Load the HA side and restart Home Assistant

`configuration.yaml` now includes `packages/basement_wall_panel.yaml`, which
adds the five summary sensors the panel reads
(`sensor.basement_panel_weather`, `sensor.basement_panel_music`,
`sensor.basement_panel_music_browse`, `sensor.basement_panel_music_recent`,
`sensor.basement_panel_notifications`) and two notification scripts. Check the
config and restart HA so those exist before the panel connects.

### 3. Run the simulator

```bash
cd mobile/esphome
esphome run basement-wall-panel-sim.yaml
```

The first build downloads Barlow from Google Fonts and the Material Design
Icons font from GitHub, then compiles for a minute or two. A 720×720 window
opens on the Scenes page with placeholder values.

### 4. Connect it to Home Assistant

The simulator advertises itself over the API like any ESPHome device but does
not do mDNS on the host, so add it by hand once:

**Settings → Devices & services → Add integration → ESPHome → Host** =
your Mac's LAN IP, **Port** = `6053`, **Encryption key** = the
`api_key_basement_wall_panel` value.

As soon as HA connects, the window fills with live state: clock, weather chip,
alarm chip, notification count, scene rows, energy flow, shades, music,
pool, and the Settings hub counts. Everything you tap sends the real service
call (scene.turn_on, alarmo.arm, cover.open_cover, media_player.*, …) — treat
it as a live control surface, not a mock.

### What to try

| Gesture / tap | Expected |
|---|---|
| Drag left/right anywhere on a page | strip slides between the 7 pages; dots follow |
| Drag down > 70 px, or tap the top bar | menu grid; current page filled slate; drag up or tap footer to close |
| Weather chip · bell chip · alarm chip | weather sheet · notifications sheet · Alarm page |
| Mic button (or menu → Voice) | voice overlay with a scripted demo (see below) |
| Alarm: type 4 digits, tap ✓ or Disarm | `alarmo.disarm`; short code flashes the amber hint for 1.8 s |
| Alarm: Home / Away | `alarmo.arm`; button fills #625a43 while Alarmo reports *arming* |
| Alarm: readiness row | Not-ready sheet with the six sensors (Open amber / Closed slate) |
| Energy: tap the bar | sets `number.bayberry_backup_reserve` in 5 % steps; amber marker moves |
| Scenes: tap a row | `scene.turn_on`; row lights up 1.6 s, then follows `binary_sensor.scene_*` |
| Shades: ▲ ■ ▼ | `cover.*` on `cover.first_floor_all`, or all six covers at once for Whole House; Media Room is disabled |
| Music: transport, volume | on the focused group; library / speaker group / per-speaker volume sheets |
| Pool: − / + | `water_heater.set_temperature` 70–90 on the OmniLogic heater; pill toggles the heater |
| Pool: pump toggle, slider, Low / Med / High | `switch`, `number` and the three OmniLogic speed buttons |
| Settings: tiles | Guests / Cleaners / Dinner toggle immediately; Off Grid asks first |
| Settings: rows | each opens its sheet; Maintenance → RESET calls the repo's reset scripts |

To simulate the critical states from the prototype's Tweaks panel, use HA's
Developer Tools → States to set `alarm_control_panel.alarmo` to `triggered`
or `binary_sensor.bayberry_grid_status` to `off`: the three chips collapse into
the red pill.

### What the simulator can't do

* **Voice** — there is no microphone on the host build. The mic button opens
  the overlay and plays a scripted transcript/response so the layout and
  animation can be reviewed; on the panel it runs the on-device
  "Okay Nabu" wake word and Home Assistant Assist.
* **Brightness / voice volume / wake-word toggle** — logged, not applied.
* **Wi-Fi row** — shows "Simulator".

## Building the real panel

```bash
esphome run esphome/basement-wall-panel.yaml
```

Before the first flash, confirm the GPIOs marked `VERIFY` in
`basement-wall-panel.yaml` against the
[Waveshare wiki](https://www.waveshare.com/wiki/ESP32-P4-WIFI6-Touch-LCD-4C):
the SDIO pins to the ESP32-C6, I²C for touch/codec, backlight PWM, and the
I²S pins. The display itself (`WAVESHARE-ESP32-P4-WIFI6-TOUCH-LCD-4C`) is a
built-in ESPHome model, so no init sequence or timing is needed.

## Design fidelity notes

* Colors, sizes, weights, radii, hit zones and spacing follow the handoff's
  design tokens; every icon is the MDI glyph named in the spec.
* Scene rows per period follow the prototype (Morning: Morning · Working ·
  Cleaning · Outdoor · All Off; Day: same with the sunny icon; Evening: Welcome ·
  Basement Evening · Entertaining · Movie · Outdoor · All Off; Night: Emergency ·
  Basement Evening · Movie · Nightlight · Outdoor · All Off). The period is
  picked with the repo's time and sun-elevation rules (night 22:00–05:00,
  morning until noon, evening once the sun is below 15° or after 17:00).
* Two things LVGL can't do exactly as the prototype: letter-spacing tighter
  than 0 (clock/setpoint tracking) and the 1.6 s CSS pulse (replaced by a
  150 ms tick that drives the same bar heights and ring opacity).

## Decisions made on the handoff's open items

1. **Whole House shades** — no new entity. The three buttons send one
   multi-target call to the six covers (`whole_house_covers` substitution) and
   the state line shows the min–max of their positions.
2. **Music** — Sonos entities drive transport, grouping and volume so the
   panel and the mobile dashboard agree. Library browsing and playback go to
   the "library player", which is the same Sonos entity until you set
   `music_library_suffix` (e.g. `"_2"`) to the Music Assistant players. See
   "Music Assistant" below.
3. **Super Chlorinate** — removed.
4. **Well pump energy** — `sensor.well_pump_energy2`.
5. **Pool setpoint** — ± calls `water_heater.set_temperature` on
   `water_heater.omnilogic_pool_heater`; the dial reads the heater's own
   `temperature` attribute back.
6. **Scenes** — the prototype's sets per period (see Design fidelity notes).

Still open: the Notification Center service/attribute names (marked VERIFY in
`packages/basement_wall_panel.yaml`), Media Room shades (no entity yet), and
the audio GPIOs on the hardware build.

## Music Assistant

Keep the Home Assistant Sonos integration; add the speakers to Music Assistant
as well. MA's Sonos provider talks to the speakers directly, so the two
coexist, and the panel splits the work:

* **Sonos entities** (`media_player.media_room` …) — play/pause, next, volume,
  join/unjoin, now-playing metadata. Everything the mobile dashboard,
  `script.apply_sonos_group`, the announcement TTS targets and the automations
  already depend on keeps working untouched.
* **MA entities** (`media_player.media_room_2` … — HA appends `_2` because the
  names collide) — only `browse_media` and `play_media` from the Library sheet,
  which is where MA earns its keep: playlists, radio, albums, artists and
  favorites across providers, exactly the tree in the design. Sonos'
  own browse only exposes favorites and a local library.

To switch the Library sheet over: add the players in MA, confirm the entity
ids HA created, set `music_library_suffix: "_2"` in
`basement-wall-panel/common.yaml`, and change the `media_player.*` list in the
"recently played" trigger of `packages/basement_wall_panel.yaml` to the MA
entities so recents carry MA content ids. Do not remove the Sonos integration:
MA does not provide TTS announcement targets or the Sonos-specific attributes
the existing dashboard cards read.
