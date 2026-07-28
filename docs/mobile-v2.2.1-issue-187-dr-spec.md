# Issue #187 — Lyric demand-response: shades + notifications (as built)

**Status:** IMPLEMENTED in v2.2.1. This documents what shipped.

## DR sensors (confirmed from the live registry)

One `_active` + one `_scheduled_today` binary sensor per Lyric thermostat.
**Canonical = Living Room** (per decision):

- `binary_sensor.living_room_living_room_thermostat_living_room_dr_event_active`
- `binary_sensor.living_room_living_room_thermostat_living_room_dr_event_scheduled_today`
- (also present: `basement_thermostat_basement_*`, `master_bedroom_thermostat_master_bedroom_*`,
  `office_thermostat_office_*`)

Attributes used: `start_time`, `end_time`, `cool_setpoint_limit_min`.
DR times are **naive ISO in UTC** — pinned to UTC (`~ '+00:00' | as_datetime`)
before comparing to `now()` / converting with `as_local`.

## Part 1 — Shades (sun-aware, integrated into the whole-house scheduler)

Behavior (per decision): **2 hours before** the event through its end, any
**facade the sun is actively hitting** is driven **fully closed (position 0)**.
Every 30 min it re-evaluates: a facade the sun has left returns to the normal
adaptive formula (reopens); if the sun moves to a different side, that side
closes. When the event ends, the next tick restores adaptive positions.

Implementation — **no separate automation** (a second automation would fight the
scheduler every 30 min). Instead:

- New helper `binary_sensor.demand_response_window` (`sensors2.yaml`) — `on` from
  `start_time − 2h` through the active event end (active OR pre-cool window).
- `Shade Scheduler – Whole House` (`automations.yaml`) gains a `dr_override`
  variable (= that sensor) and one clause in its per-facade `target` formula:
  `{% if dr_override and effw > 0 %}0{% elif … normal adaptive … %}`.
  - `effw` is the facade's `sensor.sun_hitting_<dir>` value (0 = sun not on that
    facade), so "close the side the sun is on / reopen the side it left / follow
    the sun to a new side" all fall straight out of the existing per-facade loop.
  - Runs on the scheduler's existing **30-min adaptive tick** — matches the
    "evaluate every 30 min" requirement (so pre-close begins within ≤30 min of
    the 2-hour mark, and restore within ≤30 min of event end).
  - Existing guards still apply: `dinner_party` skips First Floor; `guest_mode`
    skips guest rooms; the after-17:00 manual-privacy lock still holds.

Covers per facade come straight from the scheduler's room table
(`sun_hitting_south` → front covers, `_east` → dining/right, `_west` → living /
bedroom-left / guest sides, `_north` → back).

## Part 2 — Notifications (Notification Center card)

Per decision: surfaced on the **bell + notifications card** via the installed
**Notification Center** integration, which renders HA `persistent_notification`
entities (`/hacsfiles/notifications/notification-center-card.js`). **Not** a
mobile push, and **not** the `notification_alert_counter` bell-counter.

New automation **Demand Response Notification** (`id 1768500000003`):

- **Start** (canonical LR `_active` `off→on`): `persistent_notification.create`
  with `notification_id: demand_response`, message =
  `Utility demand-response event 3:00 PM–7:00 PM · cooling limited to 78°. Sun-facing shades are lowering to cut cooling load.`
  (times converted UTC→local, cooling limit from `cool_setpoint_limit_min`).
- **End** (`on→off`): `persistent_notification.dismiss` (`notification_id: demand_response`),
  which clears it from the bell + card.

## Part 3 — 20:02 resync cleanup (folded in, per decision)

The hardcoded `20:02` post-DR resync trigger was removed from all four zone
schedules (`Office Thermostat Schedule V2`, `Bedroom HVAC Schedule`,
`Basement HVAC Schedule`, `Living Room HVAC Schedule V3`) and replaced with a
state trigger on the canonical LR `_active` sensor going **`off`** — so
setpoints return to schedule the moment the event actually clears instead of at
a fixed guess.

## Assumptions to verify on the live instance

- `start_time` is readable from the `_active` sensor at event start and from the
  `_scheduled_today` sensor during the pre-cool window (the window sensor reads
  `_active` first, then falls back to `_scheduled_today`).
- The Notification Center card renders `persistent_notification` entities (same
  path as the existing `bedroom_co2_high` notification).
- 30-min evaluation granularity is acceptable for pre-close start / restore (no
  separate DR state trigger was added to the scheduler to keep it single-owner;
  easy to add if you want sub-30-min response).
