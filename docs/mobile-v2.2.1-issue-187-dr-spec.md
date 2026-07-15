# Issue #187 — Lyric demand-response: shades + notifications (spec)

**Status:** DRAFT — awaiting approval before implementation (v2.2.1).
Nothing in this doc is wired yet. Items marked **⚠ CONFIRM** need a value from
the live registry (I can't read it from the repo) before the automations go in.

## What the integration gives us

`ha-lyric-custom` now creates one **Demand Response** binary sensor per Lyric
thermostat (`LyricDemandResponseSensor`). It is `on` while a utility DR event
is in progress for that device.

- **Entity pattern:** `binary_sensor.<device>_dr_event_active`.
  This repo has these thermostats, so the expected sensors are:
  - `binary_sensor.living_room_thermostat_dr_event_active`
  - `binary_sensor.basement_thermostat_dr_event_active`
  - `binary_sensor.master_bedroom_thermostat_dr_event_active` (device is
    `master_bedroom_thermostat`; also seen as `bedroom_thermostat`)
  - `binary_sensor.office_thermostat_dr_event_active`

  **⚠ CONFIRM** exact entity_ids — names derive from *device* names, not the
  `climate.*` entity_ids, so they may differ (e.g. `_2` suffixes, "master" vs
  "primary"). All four fire for the same utility event in practice.
- **Attributes** (all thermostats report the same event): `event_id`,
  `start_time`, `end_time` (**naive ISO in UTC** — attach UTC, then convert to
  local for display/compare), `cool_setpoint_limit_min`, `opt_outable`,
  `active_sequence_number`, `current_phase_end_time`, `intervals`.

### Proposed "any DR active" helper

Rather than pick one canonical sensor, react to *any* thermostat reporting an
active event. Add a template binary sensor (in `sensors2.yaml`):

```yaml
- name: "Demand Response Active"
  unique_id: demand_response_active
  device_class: running
  state: >
    {{ states.binary_sensor
       | selectattr('entity_id','search','_dr_event_active$')
       | selectattr('state','eq','on') | list | count > 0 }}
  attributes:
    # Surface the canonical event window from the LR thermostat for display.
    start_time: "{{ state_attr('binary_sensor.living_room_thermostat_dr_event_active','start_time') }}"
    end_time: "{{ state_attr('binary_sensor.living_room_thermostat_dr_event_active','end_time') }}"
    cool_setpoint_limit_min: "{{ state_attr('binary_sensor.living_room_thermostat_dr_event_active','cool_setpoint_limit_min') }}"
```

The automations below then trigger on `binary_sensor.demand_response_active`
`off→on` / `on→off`. (If you'd rather trigger on the LR sensor directly, that's
a one-line change.)

## Part 1 — Shades

**Goal:** when a DR event is active (utility peak; cooling capped), lower the
sun-facing shades to cut solar gain / cooling load; restore on event end.

**Sun-facing set (default — ⚠ CONFIRM):** afternoon DR events (typically ~3–7 PM)
load the **west / south-west** glass, so the default target set is:

- `cover.living_room_side_shades`
- `cover.bedroom_left`
- `cover.first_floor_front`
- `cover.back_guest_bedroom_side`
- `cover.front_guest_bedroom_side`

East-facing covers (`cover.dining_room_side`, `cover.bedroom_right`,
`cover.hallway_1/2`) are **excluded** — they don't take afternoon sun.

**DR start (`off→on`):** set the sun-facing covers to a low/closed position.
Default **position: 15** (near-closed but not fully, to keep some daylight);
guarded so we only act on covers currently *above* that position (don't fight a
shade already lower), and skipped for any room whose Pico/manual override is
active if such a flag exists.

**DR end (`on→off`):** **hand back to the schedules** rather than hardcoding
open. Re-trigger the owning per-room `… – Schedule & Adaptive` automations (and
`Shade Scheduler – Whole House`) so each cover returns to its scheduled baseline
for the current time of day. No capture-and-restore needed because the
whole-house scheduler is authoritative.

**Guards:**
- Only act inside the event window (trigger-driven, so inherently bounded).
- Don't run if `input_boolean.guest_mode` is on for guest-room covers (matches
  existing `1:00 PM West Facing Shades` behavior).
- `mode: single` (or `restart`) — a second DR sensor flipping on shouldn't
  re-command covers already positioned.

## Part 2 — Notifications

Audience default (**⚠ CONFIRM**): both phones —
`notify.mobile_app_carmens_iphone` + `notify.mobile_app_brians_iphone_15_pro`
(matches the `scripts.yaml` pattern). `notify.notify` also works if you want
"all devices."

- **DR start:** push, e.g.
  `Utility demand-response event 3:00–7:00 PM · cooling limited to 78°`
  (convert `start_time`/`end_time` from UTC to local; interpolate
  `cool_setpoint_limit_min`).
- **DR end:** `Demand-response event ended — climate back to normal.`
- **Opt-out (optional — ⚠ CONFIRM):** if `opt_outable` is true, add an
  actionable notification with an "Opt out" action. **Needs a Lyric opt-out
  service** — confirm one exists in the integration's `services.yaml` before
  wiring the action; otherwise ship notify-only.

## Out of scope / follow-ups (track separately)

- **Replace the hardcoded 20:02 resync** in the zone schedules
  (`living_room_hvac_schedule_v3`, `basement_hvac_schedule`, office, bedroom)
  with a trigger on the DR sensor going `off`. Cleaner than a fixed time, but
  touches the schedule automations again — I'd do it as its own change after the
  shade/notify work soaks. Not in this issue's default scope.
- Live Activity for DR (elapsed / `current_phase_end_time` countdown) rides
  the #178 Live Activities suite once shipped.

## Open decisions for approval

1. Trigger source: **any-active template sensor** (default) vs one canonical LR
   sensor.
2. Sun-facing cover set + closed **position** (default: the 5 west/SW covers,
   position 15).
3. Restore strategy: **hand back to schedules** (default) vs capture-and-restore.
4. Notification audience (default: both iPhones) + whether to add the **opt-out
   action** (depends on a Lyric opt-out service existing).
5. Include the **20:02 → DR-off** schedule cleanup now, or defer.
