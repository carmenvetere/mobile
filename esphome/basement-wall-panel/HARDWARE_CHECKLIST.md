# Basement Wall Panel — hardware bring-up checklist

Everything here can only be checked on the real Waveshare ESP32-P4-WIFI6-Touch-LCD-4C
with the panel connected to your Home Assistant. Work top to bottom; each step
assumes the ones above it passed. Log lines are what `esphome logs
basement-wall-panel.yaml` shows.

## 1. First flash

- [ ] `esphome run basement-wall-panel.yaml` builds without errors. The first
      build downloads the fonts, the MDI icon font, the JPEG decoder and the
      "Okay Nabu" wake-word model.
- [ ] Flash over USB the first time (the OTA path needs Wi-Fi first). The log
      shows `Wi-Fi connected` and an IP on your LAN.
- [ ] Home Assistant discovers the panel, or you add it under Settings → Devices
      & services → ESPHome with the address the log printed. Choose *Overwrite*
      if HA already knew a device with this name, then paste the key from
      `secrets.yaml` (`api_key_basement_wall_panel`).
- [ ] In the device's options, turn on **Allow the device to perform Home
      Assistant actions**. Without it every tap is silently dropped by HA.

## 2. Display and touch

- [ ] The screen lights up on the Scenes page with the clock running. If it is
      dark, check the backlight GPIO marked `VERIFY` in `basement-wall-panel.yaml`.
- [ ] Nothing is mirrored, rotated or offset; the tab bar sits along the
      bottom edge and the status bar along the top.
- [ ] Tap each of the seven tabs. The right page appears and the indicator
      follows. If taps land on the wrong widget, touch and display axes differ:
      adjust `transform` (swap_xy / mirror_x / mirror_y) on the touchscreen.
- [ ] Swipe left and right between pages; a drag on a scene row or a slider
      does not also flip the page.
- [ ] Every button in the Alarm keypad, the shade arrows, the pool ± and the
      transport row is comfortably hittable with a finger; nothing needs a
      precise tap.
- [ ] Brightness in Settings → Panel & Voice changes the backlight over its
      whole range and the level survives a reboot.

## 3. Live data

- [ ] Status bar: temperature, alarm state and the bell count match Home
      Assistant. `sensor.notification_center` drives the bell.
- [ ] Energy: solar, grid, home and battery flows agree with the Powerwall
      app within a refresh; the reserve marker matches
      `number.bayberry_backup_reserve`.
- [ ] Shades: positions and the ADAPTIVE / MANUAL badges reflect the covers and
      `input_boolean.shades_manual_*` helpers.
- [ ] Music: the playing Sonos speaker, its title, artist and album art appear
      within a couple of seconds of a track change.
- [ ] Pool: setpoint, water temperature, heater state, pump state and speed
      match the OmniLogic app.
- [ ] Weather sheet: today's conditions and the hourly / daily rows are not all
      the same value (if they are, the weather integration's forecast needs
      attention, not the panel).

## 4. Actions (each one really happens in the house)

- [ ] Scenes: tap a row; the row lights, and within a second HA shows the scene
      applied. Outdoor toggles: lit → runs *Outdoor Off*, plain → *Outdoor On*.
- [ ] Alarm: Home / Away arm; a wrong code shows the hint, the right code
      disarms. Trip an entry sensor with the alarm armed: the panel jumps to
      Alarm and counts down the entry delay.
- [ ] Shades: First Floor ▲ ■ ▼ and Whole House move the right covers.
- [ ] Pool: ± changes the heater setpoint; the pill toggles the heater; the
      presets change pump speed.
- [ ] Music: play/pause, next, volume, join and leave a speaker, pick Pool and
      play a playlist from Library on it while the Media Room keeps playing.
- [ ] Notifications: dismissing one removes it from the Notification Center;
      Clear all empties it.
- [ ] Settings tiles: Guests, Cleaners, Dinner and Vacation toggle their helpers;
      Off Grid asks first and then flips the Powerwall switch.
- [ ] Cleaners lock: turn Cleaners on from HA; the lock screen appears; the
      wrong PIN flashes red; the right PIN unlocks and turns Cleaners off.

## 5. Automatic behaviour

- [ ] Leave the panel on Settings for the "Return to default" time with no
      touch: it returns to Home, or to Music if a basement speaker is playing.
- [ ] Disconnect the grid feed (or set `binary_sensor.bayberry_grid_status` off
      in Developer Tools): the panel jumps to Energy in outage layout with the
      Powerwall ring and hours remaining; the red pill shows in the status bar.
- [ ] Restore the grid: the outage layout clears; the page changes only at the
      next idle tick, not immediately.

## 6. Voice (on-device only)

- [ ] Say "Okay Nabu" from across the room: the voice overlay opens, the log
      shows the wake word detected and Assist starts listening.
- [ ] Ask something simple ("what time is it"); the transcript and the reply
      appear in the overlay and the reply plays through the panel speaker at
      the Voice volume set in Panel & Voice.
- [ ] Turning the Wake word switch off in Panel & Voice stops detections; the
      mic button still opens a session.
- [ ] If the wake word never triggers or audio is silent, the I²S and ES8311
      pins marked `VERIFY` are the first suspects, then the microphone gain.

## 7. Reliability

- [ ] Reboot HA while the panel runs: the panel shows placeholders, then
      recovers all data within a minute of HA coming back, without a reboot.
- [ ] Power-cycle the panel: it reconnects, restores brightness and settings,
      and the clock is right within a few seconds.
- [ ] Run it for a day. `esphome logs` should show no repeated errors; the
      album art and library fetches stay well under the 10 s HTTP timeout.
- [ ] OTA: a second `esphome run` updates it over Wi-Fi without USB.
