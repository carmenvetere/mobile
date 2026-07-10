# Climate Overhaul — Live Verification Plan (issue #150)

Runnable checklist for the 2026-07-03 climate overhaul, to be executed against the
**running** Home Assistant instance via the HA MCP. Source: `climate-overhaul-notes.md`
→ "Needs live verification / manual steps", item 10.

## How to run (MCP tools)
- **Read state:** `ha_get_entity` / states read for the exact `entity_id`s below.
- **Write helpers:** `input_boolean.turn_on|turn_off`, `input_select.select_option`,
  `input_number.set_value`.
- **Exercise automations:** `automation.trigger` (pass `skip_condition: true` to force the
  action block; `false` to respect conditions). Use this to simulate physical-sensor flows
  you can't safely spoof.
- **Restart:** `homeassistant.restart`.
- After each write, **wait 10–30 s** (schedules use settle delays) before asserting.

## ⚠️ Safety
- These tests actuate **real HVAC** (compressors, emergency-heat switches), toggle **Away**,
  and simulate **grid outages**. Run in a window where the household tolerates HVAC changing
  state. Avoid triggering emergency-heat sequences repeatedly.
- **Capture a baseline first** (T0) and **restore every entity you change** at the end of each
  test. Holds and `last_hvac_mode` selects have **no `initial:`** — do not assume defaults.
- Physical sensors — `binary_sensor.bayberry_grid_status`, `binary_sensor.first_floor_exterior_doors`
  and its member door sensors, PM2.5/temperature sensors — **cannot be reliably set via MCP**
  (device-backed; a set-state override is overwritten on the next device update). For those,
  either physically actuate, or use `automation.trigger` on the named automation as noted.

## Zone reference

| Zone | Local (HomeKit) | Cloud (Lyric) | Hold boolean | last-mode select | Schedule automation | Fan owner |
|---|---|---|---|---|---|---|
| Living Room | `climate.living_room_thermostat_homekit` | `climate.living_room_thermostat` | `input_boolean.climate_hold_living_room` | `input_select.living_thermostat_last_hvac_mode` | `Living Room HVAC Schedule V3` | `input_select.living_room_fan_owner` |
| Basement | `climate.basement_thermostat_homekit` | `climate.basement_thermostat` | `input_boolean.climate_hold_basement` | `input_select.basement_thermostat_last_hvac_mode` | `Basement HVAC Schedule` | `input_select.basement_fan_owner` |
| Office | `climate.office_thermostat_homekit` | `climate.office_thermostat` | `input_boolean.climate_hold_office` | `input_select.office_thermostat_last_hvac_mode` | `Office Thermostat Schedule V2` | `input_select.office_fan_owner` |
| Bedroom | `climate.bedroom_thermostat` (setpoints/mode) | `climate.master_bedroom_thermostat` (fan/preset) | `input_boolean.climate_hold_bedroom` | `input_select.bedroom_thermostat_last_hvac_mode` | `Bedroom HVAC Schedule` | `input_select.bedroom_fan_owner` |

Shared: `input_boolean.away_mode` · `binary_sensor.bayberry_grid_status` (on=grid up) ·
`binary_sensor.first_floor_exterior_doors` (on=any FF door open) ·
`sensor.fresh_air_damper_on_24_h` · `Climate Hold Watchdog` automation.
`*_last_hvac_mode` options MUST be exactly `Cool` / `Off` / `Heat`.

---

## T0 — Pre-flight (read-only, non-disruptive)
Do this first; it catches config drift before any destructive test.
1. Every entity in the table above **exists** and is not `unavailable`.
2. Each `*_last_hvac_mode` select's options == exactly `["Cool","Off","Heat"]` (issue #149).
3. Each `*_fan_owner` select's options include `none/schedule/economizer/air_filter/air_quality`
   and current state is a valid option.
4. All four schedule automations + `Climate Hold Watchdog` + `Fresh Air Ventilation` +
   `Away Mode Turns On/Off` + `Power Outage V2` + `Power Returns V2` are **enabled** (state `on`).
5. Record baseline: the 4 holds, 4 last-mode selects, 4 fan owners, `away_mode`,
   `grid_status`, and each zone's `climate.*` `state` + `temperature` + `fan_mode`.

**Pass:** all present, options exact, automations enabled. Save the baseline for restores.

---

## T1 — Restart torture (holds + last-mode survive restart)
Verifies the "no `initial:`" persistence and that schedules don't stomp a live mode on boot.
1. Set `input_boolean.climate_hold_office` = **on**;
   `input_select.office_thermostat_last_hvac_mode` = **Cool**.
2. Set `climate.office_thermostat_homekit` hvac_mode = **off** (simulates a held-off zone).
3. `homeassistant.restart`. Wait for HA to come back + ~90 s (schedule start trigger has a 60 s settle).
4. **Assert:** `climate_hold_office` still **on**; `office_thermostat_last_hvac_mode` still **Cool**;
   office zone still **off** (the boot schedule + watchdog must NOT have turned it back on while held).
5. **Restore:** clear the hold (T5 shows the clean way), set the select and zone back to baseline.

**Pass:** hold + stored mode retained across restart; held zone not overridden on boot.

---

## T2 — Away Mode on / off
1. Baseline: `away_mode` off, note each zone's mode + setpoint.
2. `input_boolean.away_mode` → **on**. Wait ~20 s.
3. **Assert:** all four `climate_hold_*` = **on**; the four **cloud** entities show preset
   `PermanentHold`; setpoints written to the mirrors ≈ `input_number.away_heat_setpoint` (62) in
   heating season or `away_cool_setpoint` (78) otherwise (bedroom writes its own target).
4. `input_boolean.away_mode` → **off**. Wait ~20 s.
5. **Assert:** cloud presets = `NoHold`; each `climate_hold_*` cleared **only if** its zone's doors
   are closed and grid is up; the four schedules re-ran (zones back on their current-period setpoint).

**Pass:** away sets holds + PermanentHold + away setpoints; return clears (gated) + NoHold + reschedules.

---

## T3 — Outage / return (simulated)
`binary_sensor.bayberry_grid_status` is device-backed; drive the actions with `automation.trigger`.
1. Note each zone's current mode. `automation.trigger` **Power Outage V2** with `skip_condition: true`.
2. **Assert:** all four `climate_hold_*` = **on**; each `*_last_hvac_mode` captured the zone's
   pre-outage mode as `Cool`/`Off`/`Heat` (exact casing); shed actions ran (pool filter / dryer /
   washer / Rachio standby off/on per #144 — assert those switch states if present).
3. `automation.trigger` **Power Returns V2** with `skip_condition: true`.
4. **Assert:** each zone's mode **restored** from its `*_last_hvac_mode` (all three of Cool/Off/Heat
   branches must work — this was the lowercase-compare bug); per-zone hold released **only if** doors
   closed + away off; schedules re-triggered.
5. If safe, also do the **real** path once: physically drop/restore grid (or the inverter's grid
   sensor) and confirm the 5-minute `for:` debounce on return before Power Returns V2 fires.

**Pass:** outage sets holds + captures modes; return restores all three modes + releases holds (gated).

---

## T4 — Hold precedence (power_outage > away > door_open)
1. Stack causes: `away_mode` **on**, then `automation.trigger` **Power Outage V2** (`skip_condition:true`),
   and leave a first-floor door open (or `automation.trigger` **First Floor Doors Left Open - Climate Off**).
2. Remove the **lowest** cause only: close doors / clear the door hold cause. `automation.trigger`
   **Climate Hold Watchdog** (`skip_condition:true`).
3. **Assert:** holds remain **on** (higher causes — outage, away — still present).
4. Clear causes top-down (return grid via Power Returns V2, then `away_mode` off), triggering the
   watchdog after each. **Assert** holds clear only once **every** cause is gone.

**Pass:** no cause clears a hold while a higher-precedence cause is active.

---

## T5 — Watchdog orphan-hold clear
1. Set `input_boolean.climate_hold_basement` = **on** with **no** real cause (doors closed, away off,
   grid up), and set `climate.basement_thermostat_homekit` mode = **off**,
   `input_select.basement_thermostat_last_hvac_mode` = **Cool**.
2. `automation.trigger` **Climate Hold Watchdog** (`skip_condition:true`), or wait for the 30-min pattern.
3. **Assert:** `climate_hold_basement` → **off**; because the zone was `off`, the stored mode **Cool**
   is restored and the basement schedule re-ran. (If the zone had been left in a live mode, the
   watchdog must NOT overwrite it — optionally verify that variant.)

**Pass:** watchdog clears a causeless hold and restores stored mode only when the zone was off.

---

## T6 — Fan-owner arbitration incl. PM2.5-during-free-cool
1. Set `input_select.living_room_fan_owner` = **economizer** and note `climate.living_room_thermostat`
   `fan_mode`.
2. `automation.trigger` **HVAC Fan - Living Room Air Filter** (`skip_condition:true`) to simulate a
   PM2.5 spike wanting the fan.
3. **Assert:** the air filter did **not** change `fan_mode` and did **not** take ownership — owner stays
   `economizer` (economizer outranks the air filter).
4. Reset owner to `none`; trigger the air filter again. **Assert:** it now claims (`owner=air_filter`)
   and sets the fan.
5. Bedroom 22:00 rule (optional, time-sensitive): confirm the quiet-hours force-to-auto resets
   `bedroom_fan_owner` to `none` and forces fan `auto` regardless of owner.
6. **Restore** all fan owners + fan modes to baseline.

**Pass:** economizer is never preempted by the air filter; air filter claims only when free; quiet-hours override is absolute.

---

## T7 — Door open / close hold + restore
Physical doors preferred; otherwise drive the two automations directly.
1. Open a first-floor exterior door (or `automation.trigger` **First Floor Doors Left Open - Climate Off**,
   `skip_condition:true`) and wait past the 5-min `for:` if doing it physically.
2. **Assert:** `climate_hold_living_room` = **on**; the zone turned **off on the HomeKit mirror**
   (`climate.living_room_thermostat_homekit`), not the native entity; `living_thermostat_last_hvac_mode`
   captured the prior mode; a 65-min reminder is scheduled.
3. Close all doors (or `automation.trigger` **First Floor Doors Closed - Restore Climate**).
4. **Assert:** hold clears (all doors closed, hold on, away off, grid up) and the schedule re-ran
   with the restored mode. Repeat for the **Mudroom Door** pair.

**Pass:** door-open holds off the mirror + stores mode; all-closed restores; mudroom behaves the same.

---

## T8 — Soaks (passive)
- **24 h:** log each zone's mode/setpoint, holds, fan owners, and `sensor.fresh_air_damper_on_24_h`
  hourly. Confirm: schedules hit each period boundary; Path C min-vent opens the damper when the
  trailing-24 h damper runtime is < `input_number.minvent_floor_minutes` (30) and intake is OK;
  no fan-owner deadlocks (owner never stuck with the fan off, or stuck `economizer` after the window).
- **48 h:** additionally confirm at least one real overnight free-cool cycle and one economizer
  claim/release round-trip, and that no hold is orphaned overnight (watchdog clears within 30 min).

**Pass:** a full day of boundaries/vent cycles with no stuck holds or fan owners.

---

## Results template
For each test record: `PASS/FAIL`, the asserted entity states (before → after), and any deviation.
File failures back to issue #150 with the entity, expected vs actual, and the step number.
