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
adds the `cover.whole_house` group, the four summary sensors the panel reads
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
| Shades: ▲ ■ ▼ | `cover.*` on `cover.first_floor_all` / `cover.whole_house`; Media Room is disabled |
| Music: transport, volume | on the focused group; library / speaker group / per-speaker volume sheets |
| Pool: − / + | `input_number.pool_heater_setpoint` 70–90; pill toggles the heater |
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
* Scene visibility follows the repo rules in `dynamic-scenes.yaml`
  (Morning/Day · Evening with Basement Evening ⇄ Entertaining on
  `input_boolean.dinner_party` · Night), not the prototype's divergent sets.
* Two things LVGL can't do exactly as the prototype: letter-spacing tighter
  than 0 (clock/setpoint tracking) and the 1.6 s CSS pulse (replaced by a
  150 ms tick that drives the same bar heights and ring opacity).

## Open questions from the handoff (please confirm)

1. **Whole House shades** — I created `cover.whole_house` as a cover group of
   the six covers the mobile Shades view targets. OK, or would you rather the
   panel multi-target them without a new entity?
2. **Music provider** — the handoff says Music Assistant, but the repo is all
   Sonos (custom Sonos cards, `script.apply_sonos_group`). The panel uses the
   generic `media_player.*` services and `browse_media`, which work for both;
   the "Recently played" list is derived from what the speakers actually
   play. Is Music Assistant installed, or should this stay Sonos-native?
3. **Super Chlorinate** — no OmniLogic entity in the repo. The row points at
   `switch.omnilogic_pool_super_chlorinate` (substitution
   `pool_super_chlorinate_entity`); change it or tell me to drop the row.
4. **Well pump energy** — Settings shows `sensor.well_pump_energy`; the 7-day
   history uses `sensor.well_pump_energy2`. Which is today's kWh?
5. **Pool setpoint** — the ± buttons write `input_number.pool_heater_setpoint`
   (so the existing automations follow). Should they also call
   `water_heater.set_temperature` directly?
6. **Notification Center** — the dismiss/clear scripts call
   `notification_center.dismiss` / `dismiss_all` and read the
   `notifications` attribute; the integration's real service and attribute
   names need checking (they aren't in this repo).
7. **Media Room shades** — stays "Coming soon" until there's an entity.
8. **Voice hardware pins** — the ES8311/I²S GPIOs are the ESP32-P4 EV-board
   defaults; confirm against the 4C wiki before flashing.
