# Basement Wall Panel — ESPHome / LVGL (v2.6)

A 720×720 wall-mounted Home Assistant control panel for the basement, built
from the Claude Design handoff (`Basement Wall Panel v2`) for the Waveshare
**ESP32-P4-WIFI6-Touch-LCD-4C** (4″ IPS, GT911 touch, ES8311 codec with the
on-board mic and speaker). Seven pages — Scenes (home), Alarm, Energy,
Shades, Music, Pool, Settings — reached from the bottom tab bar or by swiping,
plus the voice overlay, the Cleaners lock screen and every full-screen sheet
from the design.

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
    ├── overlays/                   # status bar, tab bar, lock screen, voice, sheets
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

> **Run the simulator on your laptop, not in the ESPHome add-on.** The add-on's
> container has no display and no SDL2, so it fails with "Unable to run
> sdl2-config". The `/config/esphome` copy is only for flashing the real panel
> later.

### 1. One-time setup on your Mac (or Linux box)

```bash
brew install sdl2 python@3.12        # macOS   (Linux: apt install libsdl2-dev build-essential)
python3 -m venv ~/esphome-venv && source ~/esphome-venv/bin/activate
pip install esphome                  # 2026.6 or newer
```

Copy `esphome/secrets.yaml.example` to `esphome/secrets.yaml` and fill in
`api_key_basement_wall_panel` (`openssl rand -base64 32`). The simulator only
needs that one key; the Wi-Fi/OTA values can stay as placeholders.

Set `ha_base_url` at the top of `basement-wall-panel-sim.yaml` to Home
Assistant's IP address, e.g. `http://192.168.1.20:8123`. It is only used to
fetch album art, but the host build's HTTP client cannot rely on
`homeassistant.local` resolving on every machine, and a failed fetch stalls
the simulator for the 10 s connection timeout ("HTTP Request failed … error
code: 2" in the log).

### 2. Load the HA side and restart Home Assistant

`configuration.yaml` now includes `packages/basement_wall_panel.yaml`, which
adds the six summary sensors the panel reads
(`sensor.basement_panel_weather`, `sensor.basement_panel_music`,
`sensor.basement_panel_music_browse`, `sensor.basement_panel_music_recent`,
`sensor.basement_panel_notifications`, `sensor.basement_panel_alarm_delay`)
and two notification scripts. Check the
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

**Then allow it to act.** By default Home Assistant only lets an ESPHome device
*read* states. Open the device (Settings → Devices & services → ESPHome →
Basement Wall Panel (simulator) → the gear / Configure) and turn on **Allow
the device to perform Home Assistant actions**. Without it every tap is
silently dropped on the HA side, and the Library sheet stays empty because
its browse request is an event the device fires.

As soon as HA connects, the window fills with live state: clock, weather chip,
alarm chip, notification count, scene rows, energy flow, shades, music,
pool, and the Settings hub counts. Everything you tap sends the real service
call (scene.turn_on, alarmo.arm, cover.open_cover, media_player.*, …) — treat
it as a live control surface, not a mock.

### What to try

| Gesture / tap | Expected |
|---|---|
| Bottom tab bar | jumps to the page; the active tab is slate with a 3 px indicator; swiping left/right also works and the bar follows |
| Weather chip · bell chip · alarm chip | weather sheet · notifications sheet · Alarm page |
| Mode icons in the top bar | Guests (bed), Dinner (silverware) and Cleaners (broom) show as icons while active; tapping one opens Settings |
| Mic button | voice overlay with a scripted demo (see below) |
| Alarm: type 4 digits, tap ✓ or Disarm | `alarmo.disarm`; short code flashes the amber hint for 1.8 s |
| Alarm: Home / Away | `alarmo.arm`; button fills #625a43 while Alarmo reports *arming* |
| Alarm: readiness row | Not-ready sheet with the six sensors (Open amber / Closed slate) |
| Alarm: entry delay | while Alarmo is `pending` the panel jumps to the Alarm page and the hint counts down "Enter code to disarm · NNs" in amber |
| Energy: tap the bar | sets `number.bayberry_backup_reserve` in 5 % steps; amber marker moves |
| Energy: grid outage | the flow diagram is replaced by the Powerwall ring (charge %, ≈ time remaining) and the Home / Solar / From battery columns; the panel jumps there when the grid drops |
| Scenes: tap a row | `scene.turn_on`; row lights up 1.6 s, then follows `binary_sensor.scene_*` |
| Scenes: Outdoor | a toggle: lit while `binary_sensor.outdoor_lights_on` is on; tap runs `scene.outdoor_off` then, `scene.outdoor_on` otherwise |
| Shades: ▲ ■ ▼ | `cover.*` on `cover.first_floor_all`, or all six covers at once for Whole House; Media Room is disabled |
| Shades: ADAPTIVE / MANUAL badge | follows the `input_boolean.shades_manual_*` helpers (Whole House is MANUAL if any group is); switch them in the Shades sheet |
| Music: speaker chip (name + ⌄ under the title) | Speakers sheet: tap a row to make that speaker the one the page controls; it sticks through pause and stop until you pick another, it drops off the list, or the idle return clears it. With no pick the page follows Media Room, then whatever is playing |
| Music: Speakers sheet + / − | joins a speaker to, or removes it from, the controlled speaker's group; the controlled speaker leads |
| Music: transport, volume | on the controlled speaker's group; library / speaker / per-speaker volume sheets |
| Music: album art | fetched from the playing entity's `entity_picture` (through HA's media proxy) as JPEG, retried as PNG if it isn't one; the disc icon shows when there is none |
| Pool: − / + | `water_heater.set_temperature` 70–90 on the OmniLogic heater; pill toggles the heater |
| Pool: pump toggle, slider, Low / Med / High | `switch`, `number` and the three OmniLogic speed buttons |
| Settings: tiles | Guests / Cleaners / Dinner / Vacation toggle immediately; Off Grid asks first |
| Settings: Vacation | `input_boolean.away_mode`; while on, the top bar shows the amber "Vacation" pill |
| Settings: Cleaners | `input_boolean.cleaners_mode`; while on, the panel is covered by the lock screen — enter the PIN (`cleaners_pin` in `common.yaml`) to end Cleaners mode; a wrong PIN flashes the dots red |
| Settings: rows | each opens its sheet; Maintenance → RESET calls the repo's reset scripts |

To simulate the critical states from the prototype's Tweaks panel, use HA's
Developer Tools → States: set `alarm_control_panel.alarmo` to `triggered` or
`pending`, `binary_sensor.bayberry_grid_status` to `off` (outage layout plus the
red pill), `input_boolean.away_mode` to `on` (Vacation pill) or
`input_boolean.cleaners_mode` to `on` (lock screen).

### Idle return

After the "Return to default" time in Panel & Voice (30–600 s, default 2 min,
also exposed to HA as a number) with no touch, the panel closes any sheet, the
Off Grid confirm and a finished voice overlay, forgets a manual speaker pick,
and goes to the page the house state calls for, highest priority first:

1. Alarm `pending` or `triggered` → **Alarm**
2. Grid outage → **Energy**
3. A basement-floor speaker playing (`idle_music_players` in `common.yaml`:
   Media Room, Mud Room, Pool, Gym, Shop) → **Music**
4. Otherwise → **Home**

Only the idle timer and the existing urgent transitions (alarm becoming
pending/triggered, grid dropping) move the page by themselves; music starting
somewhere never interrupts what someone is doing, it just changes where the
panel goes when they walk away. When a higher condition clears the panel waits
for the next idle tick rather than jumping. You can always navigate anywhere;
every touch restarts the clock.

### What the simulator can't do

* **Voice** — there is no microphone on the host build. The mic button opens
  the overlay and plays a scripted transcript/response so the layout and
  animation can be reviewed; on the panel it runs the on-device
  "Okay Nabu" wake word and Home Assistant Assist.
* **Brightness / voice volume / wake-word toggle** — logged, not applied.
* **Wi-Fi row** — shows "Simulator".
* **Album art colours** — the JPEG library's desktop SIMD paths (Intel and
  Apple silicon alike) hand back blue and red the other way round from the
  scalar path the ESP32-P4 uses, so the host build swaps them back after each
  download (`#ifdef USE_HOST` in `common.yaml`). The panel itself needs no
  correction.

## Screenshots

`screenshots/` holds a capture of every page and sheet, rendered by the
headless test build (`basement-wall-panel-test.yaml`) with the prototype's
demo data. That build is the simulator plus `basement-wall-panel/test/mock.yaml`:
it feeds demo values into every import, walks the UI, writes a PPM per screen
into `$SNAP_DIR`, and exits. Handy for checking a layout change without Home
Assistant:

```bash
python3 -m http.server 8123 -d esphome/basement-wall-panel/test/www &   # serves the demo album art
SNAP_DIR=/tmp/panel-shots esphome run esphome/basement-wall-panel-test.yaml
```

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
   the Music Assistant player with the same name, resolved on the HA side.
   See "Music Assistant" below.
3. **Super Chlorinate** — removed.
4. **Well pump energy** — `sensor.well_pump_energy2`.
5. **Pool setpoint** — ± calls `water_heater.set_temperature` on
   `water_heater.omnilogic_pool_heater`; the dial reads the heater's own
   `temperature` attribute back.
6. **Scenes** — the prototype's sets per period (see Design fidelity notes).

7. **Cleaners lock** — the design's lock screen needs a PIN the panel can
   check on-device. It is the `cleaners_pin` substitution in
   `basement-wall-panel/common.yaml` (default `1234` — change it). A correct
   PIN turns `input_boolean.cleaners_mode` off, which is what unlocks the panel,
   so switching Cleaners off from Home Assistant unlocks it too.
8. **Notifications** — wired to the Notification Center integration
   (`carmenvetere/notifications`): rows come from `sensor.notification_center`'s
   `alerts` list, the ✕ calls `notification_center.dismiss` with the alert's
   tag and only shows for alerts whose rule allows dismissal, and Clear all
   dismisses every dismissable alert.

Still open: Media Room shades (no entity yet), the audio GPIOs on the
hardware build, and whether the Cleaners PIN should instead come from an HA
helper (`input_text`) so it can be changed without reflashing.

## Music Assistant

The Home Assistant Sonos integration stays in charge of the speakers; Music
Assistant is only used for the library. The two sides split like this:

* **Sonos entities** (`media_player.media_room` …) — play/pause, next, volume,
  join/unjoin, now-playing metadata and the "recently played" list. Everything
  the mobile dashboard, `script.apply_sonos_group`, the announcement TTS
  targets and the automations already depend on keeps working untouched.
* **Music Assistant** — the Library sheet. Its root is Playlists · Radio ·
  Albums · Artists · Favorites; opening one calls `music_assistant.get_library`
  for that media type (favorites = favourite playlists, albums and radio) on
  the MA config entry that owns the MA player with the same friendly name as
  the panel's Sonos entity (HA gives those ids like `media_player.media_room_2`).
  The panel always sends its Sonos entity id; the lookup happens in the HA
  package, and `sensor.basement_panel_music_browse` shows the chosen player in
  its `player` attribute.

Playback is routed by `automation.basement_panel_play` in the package:
library picks carry MA uris and go through `music_assistant.play_media` on the
MA player, recents carry Sonos ids and go through `media_player.play_media`
on the Sonos entity. Do not remove the Sonos integration: MA does not provide
TTS announcement targets or the Sonos-specific attributes the existing
dashboard cards read.
