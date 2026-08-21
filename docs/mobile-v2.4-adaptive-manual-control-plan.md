# v2.4 — Adaptive Shades: Per-Room Manual Control Latch

**Status:** implemented (decisions D1–D5 resolved; see §4)
**Branch:** `v2.4`
**Goal:** when a room's shades are moved by hand, mark that room as "manual",
skip it on every subsequent adaptive tick that day, and reset automatically the
next morning.

---

## 1. What exists today

### Single owner
`automations.yaml` → **`Shade Scheduler – Whole House`** (id `1782073941880`-era
block, alias `Shade Scheduler – Whole House`) is the only live shade automation.
All five per-room `… Shades – Schedule & Adaptive` automations and all four
legacy `Close Shades …` automations carry `initial_state: false` and are
superseded. The Lutron Pico shade automations (Back Guest Bedroom open/close)
and the dashboard **Close All** button are the only other writers.

### How it works
A `rooms` table in `variables:` drives three phases:

| Phase | Trigger ids | Behavior |
|---|---|---|
| Morning open | `morning_early`, `morning_early_wknd`, `morning`, `morning_wknd` | positions the room's facades to the adaptive target |
| Adaptive tick | `adaptive` (`time_pattern` `/30`) | same per-facade formula, sun above horizon, before 19:55, after the room's own open time |
| Evening close | `sunset_close`, `evening_close` | `close_cover` on the room's close set, verify-and-retry ×4 |

Per facade the target is:

```
target = 100                              if effw == 0 or indoor <= comfort
target = clamp(100 - excess*effw/20, 0..100)   otherwise
target = 0                                if demand_response_window is on and effw > 0
```

### The only manual-control handling that exists
Inside the adaptive branch:

```jinja
privacy_locked: is_adaptive and now().hour >= 17 and <every privacy cover <= 5%>
```

That is the whole story. It is:

* **time-boxed** — only after 17:00;
* **direction-boxed** — only detects a *close*, never a manual *open* or a
  partial position;
* **stateless** — the moment someone nudges one shade back above 5% the room is
  adaptive again.

So "I opened the living room shades at 11:00 to see the yard" is undone at
11:30, and "I set the office to 40% because of glare" is undone at the next
:00/:30. That is the gap v2.4 closes.

### Pauses that already exist
`pause: input_boolean.dinner_party` (First Floor) and
`pause: input_boolean.guest_mode` (both guest rooms) skip a room entirely —
morning open, adaptive, **and** evening close. The new manual latch is
deliberately *not* modelled on `pause`, because manual control should stop
adaptive but must not stop the evening close (see §4, decision D2).

---

## 2. Design

One latch per room. Everything reads and writes that latch; nothing else holds
state.

```
input_boolean.shades_manual_first_floor
input_boolean.shades_manual_primary_bedroom
input_boolean.shades_manual_back_guest_bedroom
input_boolean.shades_manual_front_guest_bedroom
input_boolean.shades_manual_office
```

No `initial:` — state restores across HA restarts, matching
`climate_hold_*` / `basement_motion_suspended`.

```
        ┌──────────────────────────────┐
manual  │ Detector                     │      ┌───────────────────────┐
move ──▶│ cover state change +         │─────▶│ input_boolean         │
        │ context/quiet-window filter  │      │ .shades_manual_<room> │
        └──────────────────────────────┘      └───────────┬───────────┘
Pico ───────── explicit turn_on ─────────────────────────▶│
UI toggle ──── explicit turn_on/off ─────────────────────▶│
                                                          │
                          ┌───────────────────────────────┴───────────┐
                          ▼                                           ▼
              ┌────────────────────────┐                 ┌─────────────────────┐
              │ Scheduler adaptive     │  skips room     │ Daily reset 03:00   │
              │ + morning-open branch  │◀────────────────│ turn_off all latches│
              └────────────────────────┘                 └─────────────────────┘
```

### 2.1 Detection

New automation **`Shade Scheduler – Manual Control Detector`**.

Watch the 16 facade entities the scheduler itself commands — not the ~27
physical covers. They are the entities in the `rooms[].facades[].covers` lists
plus `winter_north`, so the cover→room mapping is already authored once and
cannot drift:

| Room | Watched entities |
|---|---|
| First Floor | `cover.first_floor_front`, `cover.dining_room_side`, `cover.living_room_side_shades` |
| Primary Bedroom | `cover.bedroom_left`, `cover.bedroom_right`, `cover.hallway_1`, `cover.hallway_2`, `cover.bedroom_back` |
| Back Guest Bedroom | `cover.back_guest_bedroom_back_left`, `cover.back_guest_bedroom_back_right`, `cover.back_guest_bedroom_side` |
| Front Guest Bedroom | `cover.front_guest_bedroom_front_left`, `cover.front_guest_bedroom_front_right`, `cover.front_guest_bedroom_side` |
| Office | `cover.office_office_right`, `cover.office_office_left` |

Trigger on the `current_position` attribute. Three filters, all needed:

1. **Magnitude** — `|to - from| >= 5`. Kills reporting jitter. On the
   multi-shade groups (`cover.living_room_side_shades` has six members) the
   group position is the member average, so one shade moved full travel is
   ~17% — comfortably over the threshold, while a 1-shade nudge of a few
   percent is correctly ignored.
2. **Scheduler-quiet** — ignore anything while the scheduler has a running
   instance, plus a 120 s tail:

   ```jinja
   {% set a = 'automation.shade_scheduler_whole_house' %}
   {% set lt = state_attr(a, 'last_triggered') %}
   {{ (state_attr(a, 'current') | int(0)) == 0
      and (lt is none or (now() - lt).total_seconds() > 120) }}
   ```

   This is the important one. Lutron and Matter push position updates
   asynchronously from the bridge, so the intermediate travel ticks of a
   *scheduler-commanded* move arrive with a **fresh context** (no `user_id`,
   no `parent_id`) and are otherwise indistinguishable from a physical remote
   press. The running-instance check covers the evening close (4 retries × 30 s
   per room, rooms serialized), the 120 s tail covers travel that lands after
   the run finishes.
3. **Context** — `{{ ctx.user_id is not none or ctx.parent_id is none }}`.
   * `user_id` set → HA app, dashboard, HomeKit-through-HA, voice → manual.
   * `parent_id` set → another automation drove it → not manual by itself
     (Pico automations opt in explicitly instead, §2.4).
   * both `none` + quiet window → physical Serena/Lutron remote → manual.

   The repo already uses this exact `context.parent_id` / `context.user_id`
   idiom for the bathroom exhaust fans (`automations.yaml`, "turned off only if
   HA started them (context check)"), so it is a proven pattern on this install.

Bounded to `after: 03:00:00` / `before: 20:01:00` — outside the scheduler's own
active window a latch would only be cleared at 03:00 without ever having done
anything.

`mode: queued`, `max: 25` (a group move fans out to several member events).

Action: resolve the entity to its latch from a small inline map, no-op if the
latch is already on, otherwise `input_boolean.turn_on` + a `system_log.write`
line matching the scheduler's existing log format.

### 2.2 Scheduler changes

Three small edits to `Shade Scheduler – Whole House`:

1. Add one key per room in the `rooms` table:
   ```yaml
   manual: input_boolean.shades_manual_first_floor
   ```
2. Add one variable in the adaptive/morning `repeat` sequence, alongside
   `paused` / `privacy_locked`:
   ```yaml
   manual_locked: '{{ repeat.item.manual != '''' and is_state(repeat.item.manual, ''on'') }}'
   ```
3. Extend the existing gate:
   ```yaml
   value_template: '{{ not paused and not manual_locked and in_window
                       and not (privacy_locked | bool(false)) }}'
   ```

`privacy_locked` stays. It is cheap, it is a belt-and-braces path for a manual
close that happened while the detector or HA was down, and it does not conflict.

The evening-close branch is **not** gated on `manual_locked` — see D2.

### 2.3 Reset

New automation **`Shade Scheduler – Manual Control Daily Reset`**: a single
`time` trigger at `03:00:00`, `input_boolean.turn_off` on all five latches,
`mode: single`.

03:00 rather than the morning open, because:

* it is one automation instead of a per-room clear inside a `repeat`;
* it still resets a room that was `pause`d yesterday (dinner party / guest mode)
  and therefore never reached its morning-open branch;
* nothing adaptive runs between 03:00 and the first morning open (07:30), and
  the adaptive tick's own `in_window` check already blocks pre-open ticks, so
  there is no behavioral difference from clearing at open time.

### 2.4 Pico remotes

`Back Guest Bedroom Pico - Open Shades` and `… Close Shades` drive
`cover.back_guest_bedroom_shades` from an automation, so their resulting cover
events carry `parent_id` and the detector deliberately ignores them. Add an
explicit `input_boolean.turn_on` of
`input_boolean.shades_manual_back_guest_bedroom` to both action blocks.

`Office Pico Remote` (blueprint `gregtakacs/lutron_pico_5_button_actions`) only
touches lights and climate — checked, no change needed.

### 2.5 Surfacing it

* **Shades view** (`dashboards/mobile/shades-view.yaml`) — a small "Manual"
  chip on each room's separator/expander header, visible only while the latch is
  on, `tap_action` → `input_boolean.turn_off` so one tap hands the room back to
  adaptive at the next tick. This is the primary control; it is where the user
  already is when they have just moved a shade.
* **Settings → Shades pop-up** (`dashboards/mobile/settings-view.yaml`, `#set-shades`)
  — five toggle rows in the existing row style, so a room can be put into manual
  *deliberately*, before touching a shade.
* **`sensors2.yaml`** — optional `sensor.shades_manual_rooms`: count as state,
  comma-joined room names as an attribute, for the Shades header subtitle
  ("2 rooms manual today") and the NSPanel.
* **Release notes** — add a v2.4 block to the notes section in
  `settings-view.yaml` (currently topped by v2.2.2).

---

## 3. Files touched

| File | Change |
|---|---|
| `configuration.yaml` | 5 × `input_boolean.shades_manual_*` under the existing `input_boolean:` block, with a comment header in the house style |
| `automations.yaml` | new: Manual Control Detector; new: Manual Control Daily Reset; edit: `Shade Scheduler – Whole House` (rooms table `manual:` key, `manual_locked` variable, gate); edit: 2 × Back Guest Bedroom Pico automations |
| `dashboards/mobile/shades-view.yaml` | per-room Manual chip + tap-to-clear |
| `dashboards/mobile/settings-view.yaml` | 5 toggle rows in `#set-shades`; v2.4 release-notes block |
| `sensors2.yaml` | optional `sensor.shades_manual_rooms` |
| `docs/mobile-v2.4-adaptive-manual-control-plan.md` | this document |

Deliberately **not** touched: the five disabled per-room `Schedule & Adaptive`
automations and the four disabled legacy close automations. They are dead code
that a future release should delete, but mixing that cleanup into v2.4 makes the
diff unreviewable.

---

## 4. Decisions (confirmed 2026-08-16)

**D1 — "at the next hour" = rest of day. CONFIRMED.** The latch takes effect
from the next adaptive tick and holds until the 03:00 next-day reset.

**D2 — Evening close still runs on a manual room. CONFIRMED (default).** The
latch stops *adaptive* only; sunset+30 / 8pm close still fires, so a manual
room still ends up closed and secure overnight. The existing `room_hand_closed`
check inside the close branch already prevents the non-winter `bedroom_back`
sunset-open from reopening a hand-closed room.

**D3 — Manual wins over Demand Response. CONFIRMED.** A manual room ignores a
DR event entirely. This is also the simpler implementation: the `manual_locked`
gate skips the room before `dr_override` is ever evaluated, so no change to the
DR logic was needed. (The alternative — DR outranks manual — was declined.)

**D4 — "Close All" latches every room. CONFIRMED.** The dashboard Close All
button carries a `user_id`, so it marks all five rooms manual — accepted as a
deliberate whole-house action. Fallback if it proves annoying in practice:
exempt a close-to-0 before 17:00 in the detector.

**D5 — No notification on latch (default).** `system_log.write` only, plus the
dashboard chip, which is the visible signal.

---

## 5. Verification plan

Following the shape of `docs/climate-v2.1-verification-plan.md`.

1. **YAML loads** — `Developer Tools → YAML → Check configuration`, then reload
   automations and helpers. Confirm the five new `input_boolean`s exist and the
   two new automations show `on`.
2. **No false positive from the scheduler.** Watch a full adaptive tick at a
   :00/:30 with sun up. Every latch must stay `off`. *This is the test that
   matters* — if the quiet-window filter is wrong, the scheduler latches itself
   out on the first tick and adaptive is dead until 03:00. Verify against the
   evening close too, which is the slowest run (retries).
3. **App move latches.** Drag `cover.office_office_left` to 40% from the Shades
   view at ~11:00 → `input_boolean.shades_manual_office` turns `on`, log line
   written, chip appears.
4. **Adaptive skips.** Wait for the next :00/:30 → the Office holds 40%; the
   other four rooms reposition. Confirm via the `system_log` lines (Office
   absent, others present).
5. **Physical remote latches.** Press a Serena remote in the Primary Bedroom
   between ticks → latch on. Confirms the `parent_id is none` path.
6. **Pico latches.** Back Guest Bedroom Pico open → latch on via the explicit
   `turn_on`, not the detector.
7. **Manual clear.** Tap the chip → latch off → the room rejoins at the next
   tick.
8. **Evening close unaffected.** With Office latched, confirm it still closes at
   sunset+30 / 20:00 (D2).
9. **Overnight reset.** Confirm all five latches are `off` after 03:00 and that
   the morning open positions every room normally.
10. **Restart survival.** Latch a room, restart HA, confirm the latch is still
    on (no `initial:`).

---

## 6. Risks

| Risk | Mitigation |
|---|---|
| Async position updates from Lutron/Matter latch a room against a scheduler-driven move | Running-instance check + 120 s tail, applied **only** to the no-context (physical remote) path — an event carrying a `user_id` is a human in the app and latches regardless of timing, so a correction made in the two minutes after a tick is no longer discarded (post-review fix) |
| Group `current_position` is a member average, so one shade in a multi-member group barely moves the group | Threshold scales as `max(5 / member_count, 1)` using the group's own `entity_id` attribute — one shade of a 5-member group moving 20 % clears it, while member jitter of 1–2 % does not; non-group covers keep the flat 5 % (post-review fix) |
| A Pico automation moves shades without latching (its events carry `parent_id`, so the detector ignores them) | All six shade-moving Pico automations set the latch explicitly: Back/Front Guest open+close, the Master Bedroom blueprint's three cover branches, and the Living Room blueprint's two hold branches (post-review fix — only the Back Guest pair was covered initially) |
| Latch stuck on after a missed 03:00 reset (HA down) | Reset is idempotent; add the same `turn_off` to the morning-open branch as a backstop if it ever bites |
| Cover→room map in the detector drifts from the scheduler's `rooms` table | Map keys are exactly the scheduler's `facades[].covers` entries; cross-reference comment in both blocks, checked as part of any future room-table edit |
| Manual room silently ignores a Demand Response event | D3 |
