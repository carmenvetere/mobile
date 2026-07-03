# Climate Automation Overhaul — Implementation Notes (2026-07-03)

All five phases of the climate overhaul plan were written into this repo's YAML
(`automations.yaml` + `configuration.yaml`) in one pass, since this session works
against the git config rather than the live HA Config API. Everything below the
"Needs live verification" line must be checked against the running instance
before/at deploy.

## What changed

### Phase 1 — Hold layer (fixes the live P0)
- New helpers (`configuration.yaml`): `input_boolean.climate_hold_living_room /
  _basement / _office / _bedroom` (no `initial:` — holds survive restarts) and
  `binary_sensor.first_floor_exterior_doors` (group of LR + kitchen french
  doors; `on` if ANY door open).
- All four zone schedules now carry a `climate_hold_<zone> == off` condition.
- **First Floor Doors Left Open** / **Mudroom Door Left Open** rewritten in
  place (same ids): trigger on the group/door for 5 min, store last mode
  (idempotency-guarded), set the hold, turn the zone off on the **HomeKit
  mirror** (fixes the old wrong-target native write), 65-min reminder. No
  `wait_for_trigger` anymore — that pattern died on HA restarts and left the LR
  schedule disabled since 2026-07-01.
- New **First Floor Doors Closed / Mudroom Door Closed - Restore Climate**:
  restore only when ALL doors closed, hold on, away off, grid up; then trigger
  the schedule with `skip_condition: false`.
- New **Climate Hold Watchdog**: HA start + every 30 min; clears a hold only
  when every cause is absent (door closed ≥2 min where applicable, away off,
  grid up), restores stored mode only if the zone is currently `off` (so a
  stale stored mode never stomps a live one), triggers the schedule.

### Phase 2 — Zone schedules
- 21 setpoint `input_number.*` helpers created; every literal was re-extracted
  from the live config and matches the entity-reference table exactly (zero
  drift).
- All four schedules: grid-return triggers removed (DC1 — Power Returns V2 is
  the single owner), `20:02` post-demand-response resync added (DC2 near-term),
  `homeassistant: start` trigger with a 60 s settle delay added.
- LR + basement: new `for: 5 min` temperature triggers above the day/night cool
  band edges (`above: input_number.<x>` entity thresholds — the running
  2024.10+ style config supports this) for prompt fan-only → mechanical-cool
  hand-back.
- Basement: the stray `climate.basement_thermostat` (native) hvac-off write in
  the overnight fresh-air branch normalized to the `_homekit` mirror.
  Emergency-heat switch sequencing (1-min delays, weekday/weekend differences)
  preserved verbatim.
- Bedroom + office rewritten variables-first (office is ~83 % smaller). A
  simulated sweep of every 6-minute time step × weekday/weekend × guest mode
  confirmed zero setpoint/priority drift vs the original branch tables,
  including the intentional weekend 07:00–08:00 bedroom "write nothing" gap.
- DC4 (office/basement 20:00 vs 21:00 evening boundary) left exactly as it was
  — still an open decision.

### Phase 3 — Ventilation
- 6 threshold helpers created (850/700/32/80/5/30), wired into the economizer's
  `variables:` block (with the old literals as `float()` fallbacks).
- Path C (minimum ventilation) added: `minvent_want` opens damper + LR blower
  only, any hour, when intake is OK and `sensor.fresh_air_damper_on_24_h` shows
  < 30 min in the trailing 24 h; below/above-floor triggers added. Stateless and
  self-limiting; deliberately does NOT set `co2_vent_active`, so the Safety
  Shutoff 73 °F backstop can close it on hot afternoons.
- **Safety Shutoff untouched** (README rule 9). Its 65/73/80 literals were NOT
  wired to helpers: the 73 °F backstop and 65 °F dew thresholds have no matching
  helper and re-pointing them would change the safety envelope — left fully
  hardcoded per the "if anything is ambiguous" instruction.
- Legacy **Periodic Fresh-Air Ventilation** deleted. No dashboard/script
  references to it or `input_boolean.periodic_ventilation_active` remain in the
  repo; the helper itself is UI-created and must be deleted in the UI.
- `switch.primary_bathroom_exhaust_fan` is no longer referenced by any
  ventilation automation (Safety Shutoff's defensive turn-off remains).

### Phase 4 — Arbitration, Away, Power
- `input_select.<zone>_fan_owner` ×4 created (options
  none/schedule/economizer/air_filter/air_quality; no `initial:` so first
  option `none` is the default and state restores).
- Owner rules implemented in all five fan writers: schedules (lowest priority —
  only touch when owner is none/schedule), economizer (highest — always claims,
  releases only if owner), both PM2.5 air filters (claim unless economizer
  owns; release only if owner), bedroom air quality (claims only if neither
  economizer nor air filter owns; release only if owner; **22:00 quiet-hours
  force-to-auto stays absolute** and resets owner to none).
- **Away Mode Turns On**: holds instead of disabling schedules; PermanentHold
  preset via `entity_id` on the four **native** Lyric entities (replaces the
  device-action blocks); season-aware setpoint from
  `away_heat_setpoint`/`away_cool_setpoint` (62/78) written to the mirrors
  (bedroom: native, its existing target). `evening_lights_on_lux` disable kept
  (lights, not climate).
- **Away Mode Turns Off**: NoHold via entity_id; per-zone hold clear gated on
  doors-closed + grid-up; triggers schedules with `skip_condition: false`;
  water-heater restore and lights re-enable kept.
- **Power Outage V2**: schedule `automation.turn_off` replaced with the four
  holds; mode-capture/shed logic kept verbatim (it already wrote
  Cool/Off/Heat).
- **Power Returns V2**: mode-restore compare strings fixed to `Cool`/`Off`/
  `Heat` (previously lowercase `cool`/`off` never matched the select's options,
  so two of three restore branches were dead); per-zone hold release gated on
  doors-closed + away-off, then per-zone schedule trigger with
  `skip_condition: false` (replaces blanket turn_on + skip_condition trigger).
- Hold precedence `power_outage > away > door_open` enforced at clear time and
  documented in every relevant description.
- **Powerwall - 20%**: discharge-time countdown now parsed with
  `as_timedelta()` and omitted when the sensor is unavailable/malformed
  (the old double `split(':')` crashed the notification); heat advice kept.

### Phase 5 — Hygiene (repo-scoped parts)
- Every touched automation has a full description (triggers, writes, holds/
  owners respected, precedence).
- device_id → entity_id migration done for all thermostat blocks (Away on/off).

## Needs live verification / manual steps (cannot be done from the repo)

1. **Re-enable `automation.living_room_hvac_schedule_v3`** in the UI after
   deploy (disabled since 2026-07-01; Phase 1 cutover step), then trigger it
   once and confirm the current-period setpoint.
2. **`sensor.fresh_air_damper_on_24_h`** is not defined in this repo (UI/
   history_stats). Confirm it exists, tracks
   `switch.utility_room_ventilation_damper` `on` over a sliding 24 h window,
   and reports **hours**. Path C assumes hours (`* 60` conversion, trigger
   thresholds `0.5`). If it reports minutes, change `runtime_24h_min` to drop
   the `* 60` and the two triggers to `30`.
3. **Bedroom thermostat naming (Phase 5 Part B)**: still mixed by design —
   schedule + Returns write `climate.bedroom_thermostat`; air filter/quality,
   outage shed, and the new preset writes use `climate.master_bedroom_thermostat`
   (chosen as canonical native because the Lyric-created switch is
   `switch.master_bedroom_thermostat_...`). Audit with `ha_get_entity` which of
   the two is live before consolidating; each automation kept its existing
   target per the entity reference.
4. **Power Outage V2 tail blocks**: the four load-shed device-action blocks
   (device_ids `6deb26f7…` turn_on, `0aabb641…` pool-filter turn_off,
   `df745980…` dryer-device turn_off, `0e62e753…` button press) could not be
   resolved to entity_ids from the repo — resolve via `ha_get_device` and
   migrate; they were left byte-identical. Same for the `enabled: false` block
   in Power Returns V2.
5. **Delete `input_boolean.periodic_ventilation_active`** in the UI (Phase 3
   step 4; it is UI-created, not in this repo).
6. **`initial:` on the new input_numbers**: values reset to the documented
   defaults on every HA restart (there is a daily restart automation), so
   dashboard tweaks are temporary. If you want dashboard changes to persist,
   delete the `initial:` lines after the first successful boot — do NOT remove
   them before first boot or the helpers would start at their minimum (55 °F).
7. **Verify the door group** reads `on` with one door open and `off` with both
   closed before relying on Phase 1.
8. **Labels (Phase 5 Part D)** live in the entity registry, not YAML — apply
   the category + Area/Floor scheme to the new helpers/automations via the UI
   or bridge.
9. **Input_select options**: the four `*_thermostat_last_hvac_mode` selects are
   UI helpers; confirm their options are exactly `Cool` / `Off` / `Heat` — the
   fixed Power Returns V2 compare strings and the door/watchdog stores now rely
   on that exact casing.
10. Run the phase verification checklists (restart torture, away/outage
    simulations, PM2.5-during-free-cool, 48 h/24 h soaks) from the phase docs
    against the live system.

## Shade audit (Phase 5 Part E — noted, not changed)
The five per-room shade automations and the whole-house scheduler were not
modified (governed by the shade PRD). They do not reference the climate hold
layer. Several still use device_id triggers for Pico remotes — those are
blueprint/remote bindings, out of the climate set's device_id acceptance scope.
