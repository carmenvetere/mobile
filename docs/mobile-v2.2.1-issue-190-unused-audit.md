# Issue #190 — Unused Sensors / Helpers, Scripts & Automations Audit

**Repo:** `/home/user/mobile` (Home Assistant config)
**Date:** 2026-07-15
**Type:** Read-only static analysis (evidence for a later deprecation pass). Nothing was modified, disabled, or deleted.

---

## Summary

Static reference map of candidate **unused** entities — template/helper sensors, `input_*` helpers,
utility meters, groups, scripts, and automations whose object name / `entity_id` has **zero references**
anywhere else in the repository.

**Totals scanned:** 157 definitions
- Sensors / helpers: **134** (2 `input_datetime`, 36 `input_number`, 17 `input_boolean`, 7 `input_select`,
  2 `input_text`, 1 `group`, 3 `utility_meter`, 1 `binary_sensor` group, 22 `configuration.yaml` filter/integration
  sensors, 44 `sensors2.yaml` template sensors)
- Scripts (`scripts.yaml` top-level keys): **23**
- Automations (`automations.yaml`): **141**

**Headline candidates (zero repo references):** 17 sensors/helpers + 15 scripts. Automations are top-level
actors (not "referenced" entities), so they are assessed via the disabled / superseded lens instead — see the
Automations section.

### Method
1. Derived each definition's `entity_id` (script key `foo` → `script.foo`; `input_boolean` key `baz` →
   `input_boolean.baz`; template sensor `name:`/`unique_id:` → `sensor.<slug(name)>` / `binary_sensor.<slug(name)>`,
   searching both the name-slug **and** the `unique_id` token because HA derives the `entity_id` from the *name*, not
   the `unique_id`).
2. `ripgrep`-ed the **whole repo** (all top-level `*.yaml`, `dashboards/`, `bubble_card/`, `blueprints/`, `esphome/`,
   `config/`, `climate-overhaul/`, `themes/`, `docs/`) for each token.
3. Counted references **other than the definition's own file**. Zero other-file references ⇒ *candidate-unused*.
   1–2 references ⇒ noted where, for judgement.

### Caveat — "zero repo refs" is NOT proof of dead
Entities can be referenced in places this repo does **not** contain:
- **`.storage` / UI-created dashboards** (the two YAML dashboards here are not the only surfaces; Lovelace UI configs,
  badges, and the built-in **Energy** dashboard live in `.storage`).
- **The entity/device/automation registries** and **person / zone / presence** config.
- **Custom-card JavaScript** (e.g. bubble-card modules, the custom Sonos card) that read entities by name at runtime.
- **Automation traces** reference automations by `id`, not by `entity_id`.
- Template sensors may be read by **another template body** — those *were* checked (in-file references are reported).

Everything below is therefore a **candidate** to confirm against the live instance before removal. Note also that
`climate-overhaul/backups/*.pre-185.yaml` is a **git backup folder — NOT loaded by HA** (no `!include`), so references
that appear *only* there do not count as live usage.

---

## Table 1 — Sensors / Helpers

Only the **candidate-unused** and **needs-live-check** rows are listed individually; the ~117 clearly-referenced
helpers/sensors are summarised at the end of the table.

| entity_id | definition (file:line) | repo references (count + where) | verdict |
|---|---|---|---|
| `group.smartphones` | configuration.yaml:25 | none (members referenced individually only) | needs-live-check (presence/person config likely in .storage) |
| `sensor.daily_well_pump` | configuration.yaml:521 (utility_meter) | none | needs-live-check (HA Energy dashboard / .storage) |
| `sensor.daily_ev_charger` | configuration.yaml:524 (utility_meter) | none | needs-live-check (HA Energy dashboard / .storage) |
| `sensor.bedroom_humidity_5min` | configuration.yaml:691 (filter) | none | candidate-unused (throttle twin; siblings CO2/PM2.5 are plotted, this is not) |
| `sensor.bedroom_temperature_5min` | configuration.yaml:703 (filter) | none | candidate-unused |
| `sensor.first_floor_humidity_5min` | configuration.yaml:715 (filter) | none | candidate-unused |
| `sensor.first_floor_temperature_5min` | configuration.yaml:727 (filter) | none | candidate-unused |
| `sensor.battery_power_5min` | configuration.yaml:733 (filter) | none | candidate-unused (site/solar/load 5min twins are used) |
| `sensor.grid_power_5min` | configuration.yaml:739 (filter) | none | candidate-unused |
| `sensor.tempest_irradiance_5min` | configuration.yaml:777 (filter) | none | candidate-unused (other tempest 5min twins used in weather-view) |
| `sensor.bubble_card_modules` | sensors2.yaml:365 | none | needs-live-check (likely consumed by bubble-card JS module loader at runtime) |
| `sensor.precip_next_hour` | sensors2.yaml:843 | none | needs-live-check (may feed a UI weather/rain card in .storage) |
| `sensor.first_floor_lights_on_count` | sensors2.yaml:970 | none (only aggregate `sensor.lights_on_count` is used in dashboards) | candidate-unused |
| `sensor.basement_lights_on_count` | sensors2.yaml:981 | none | candidate-unused |
| `sensor.second_floor_lights_on_count` | sensors2.yaml:991 | none | candidate-unused |
| `sensor.outdoor_lights_on_count` | sensors2.yaml:1002 | none | candidate-unused |
| `input_select.office_fan_owner` | configuration.yaml:483 | 1 — `docs/climate-v2.1-verification-plan.md` only (NOT in any automation, unlike the LR/basement/bedroom fan-owner selects) | candidate-unused |
| `input_boolean.sonos_group_select_living_room` … `_media_room` (10 helpers) | configuration.yaml:340–367 | 1 each — `scripts.yaml` only, read by `script.sonos_apply_group`, which is **itself unreferenced** | needs-live-check (orphaned Sonos-grouping cluster — see shortlist) |
| `input_select.sonos_group_coordinator` | configuration.yaml:434 | 3 — `scripts.yaml` only (inside the orphaned Sonos scripts) | needs-live-check (orphaned Sonos-grouping cluster) |

**Referenced (kept) — not unused.** Everything else resolved to real references, including notable internal-only
uses: `binary_sensor.upper_hvac_compressor_running` / `lower_hvac_compressor_running` (sensors2.yaml:887/895) are
consumed **inside** `sensor.upper/lower_hvac_estimated_power` template bodies (sensors2.yaml:910/941) — **used, not
dead**. The climate `input_number` setpoints, `climate_hold_*`, `*_fan_owner` (except office), `minvent_*`, `co2_*`,
`away_*` helpers are all referenced by `automations.yaml` and/or `dashboards/mobile/settings-view.yaml`. The
`sun_hitting_*`, `washer/dryer_cycle_progress`, `scene_*` binary sensors, `menu_*_status`, power/energy and remaining
`*_5min` sensors are all referenced by automations and/or dashboard modules.

---

## Table 2 — Scripts

| entity_id | definition (scripts.yaml:line) | repo references | verdict |
|---|---|---|---|
| `script.clean_mudroom` | scripts.yaml:1 | none | candidate-unused — vacuum-view now calls UI `script.1750692869441` + per-room `input_boolean.vacuum_*` |
| `script.clean_bedroom` | scripts.yaml:138 | none | candidate-unused (same supersession) |
| `script.clean_second_floor` | scripts.yaml:154 | none | candidate-unused (same) |
| `script.clean_kitchen` | scripts.yaml:253 | none | candidate-unused (same) |
| `script.mop_mudroom` | scripts.yaml:188 | none | candidate-unused (same) |
| `script.pool_music` | scripts.yaml:175 | none | candidate-unused |
| `script.power_outage_cooling` | scripts.yaml:46 | none | candidate-unused — superseded by automation `Power Outage V2` (id 1749486825499) |
| `script.power_outage_heating` | scripts.yaml:85 | none | candidate-unused — superseded by `Power Outage V2` |
| `script.power_returns` | scripts.yaml:268 | none | candidate-unused — superseded by automation `Power Returns V2` (id 1749504893942) |
| `script.reset_hot_water_last_flushed_date` | scripts.yaml:309 | none | candidate-unused |
| `script.reset_dryer_vent_last_cleaned_date` | scripts.yaml:319 | none | candidate-unused (settings-view writes `input_datetime.dryer_vent_last_cleaned` directly, not via this script) |
| `script.toggle_water_heater_away_mode` | scripts.yaml:441 | none | candidate-unused |
| `script.sonos_set_main_speaker` | scripts.yaml:452 | none | candidate-unused (orphaned Sonos-grouping cluster) |
| `script.sonos_apply_group` | scripts.yaml:466 | none | candidate-unused (orphaned Sonos-grouping cluster) |
| `script.alarm_keypad_disarm` | scripts.yaml:517 | none | candidate-unused — nspanel security-view uses `script.nspanel_keypad_digit` instead |
| `script.clean_basement` | scripts.yaml:17 | 1 — automations.yaml:896 (`12:00AM Roborock S8 Vacuum Basement`) | referenced |
| `script.reset_vacuum_timer` | scripts.yaml:36 | 2 — dashboards/modules/notifications.yaml | referenced |
| `script.reset_lower_floors_filter_runtime` | scripts.yaml:223 | 2 — dashboards/modules/notifications.yaml | referenced |
| `script.reset_upper_floors_filter_runtime` | scripts.yaml:238 | 2 — dashboards/modules/notifications.yaml | referenced |
| `script.push_live_activity` | scripts.yaml:329 | 9 — automations.yaml (live-activity automations) | referenced |
| `script.clear_live_activity` | scripts.yaml:372 | 5 — automations.yaml | referenced |
| `script.nspanel_keypad_digit` | scripts.yaml:531 | 10 — dashboards/nspanel/security-view.yaml | referenced |
| `script.nspanel_all_off` | scripts.yaml:579 | 1 — dashboards/nspanel/scenes-view.yaml | referenced |

**15 candidate-unused scripts, 8 referenced.**

---

## Table 3 — Automations

141 automations scanned. Automations are top-level actors, **not** entities other configs "reference", so
absence-of-reference is not a dead signal here. Several *are* referenced/toggled by other automations
(`Away Mode`, `Cleaners Mode`) and shown on `dashboards/mobile/settings-view.yaml`. The meaningful signals are
**disabled** state and **superseded/versioned** naming.

**Disabled / deprecated markers found:**
- `enabled: false` at automation level: **none**.
- `zz_deprecated` / `DEPRECATED` / `legacy` / `OLD` in any alias: **none**.
- `initial_state: false` (does not auto-start on HA boot — can still be toggled on; often seasonal): **20 automations** (listed below).
- Version-suffixed aliases: `Power Outage V2`, `Office Thermostat Schedule V2`, `Power Returns V2`,
  `Living Room HVAC Schedule V3`. **No leftover V1 automation duplicates remain** in `automations.yaml` — the
  superseded predecessors are the **scripts** in Table 2 (`power_outage_*`, `power_returns`), not old automations.

| id | alias | line | note |
|---|---|---|---|
| 1719944318488 | 800am Bedroom Hallway Shades Weekdays | 1 | `initial_state: false` — older per-window shade automation |
| 1720361385868 | 900am Bedroom Shades Open Weekends | 95 | `initial_state: false` |
| 1720885648555 | 7:30 AM First Floor Shading (Weekdays) | 381 | `initial_state: false` |
| 1720886238193 | 8:00 AM First Floor Shades Weekends | 428 | `initial_state: false` |
| 1720886464526 | 1:00 PM West Facing Shades | 472 | `initial_state: false` |
| 1720886619614 | 3:00 PM Living Room Side Shades | 526 | `initial_state: false` |
| 1720897912038 | Sunset +30 or 8:00 PM Close Shades | 568 | `initial_state: false` |
| 1727728973670 | Daily Restart | 623 | `initial_state: false` (intentionally off) |
| 1743103086408 | Bedroom - Close Shades at Sunset +30min or 8:00PM | 2190 | `initial_state: false` |
| 1759004981297 | Back Guest Bedroom - Close Shades -30 min before sunset or 8PM | 4369 | `initial_state: false` |
| 1759005370529 | 8AM Back Guest Bedroom Shades Weekdays | 4391 | `initial_state: false` |
| 1759005430175 | 9AM Back Guest Bedroom Shades Weekends | 4417 | `initial_state: false` |
| 1762979130880 | 8:00 AM Front Guest Bedroom Shades Weekdays | 4981 | `initial_state: false` |
| 1762979427130 | Front Guest Bedroom Shades +30 min from Sunset or 8pm | 5029 | `initial_state: false` |
| 1762979742769 | 9:00 AM Front Guest Bedroom Shades Weekends | 5051 | `initial_state: false` |
| 1776980419853 | First Floor Shades – Schedule & Adaptive | 5649 | `initial_state: false` — newer scheduler |
| 1777328807450 | Primary Bedroom Shades – Schedule & Adaptive | 6371 | `initial_state: false` — newer scheduler |
| 1777329382086 | Back Guest Bedroom Shades – Schedule & Adaptive | 6498 | `initial_state: false` — newer scheduler |
| 1777329849707 | Front Guest Bedroom Shades – Schedule & Adaptive | 6608 | `initial_state: false` — newer scheduler |
| 1782073941879 | Office Shades – Schedule & Adaptive | 7049 | `initial_state: false` — newer scheduler |

**Important:** `initial_state: false` ≠ deleted. The older per-window shade automations (800am/900am/7:30AM/8AM/
1PM/3PM/10:30AM East/Sunset+30, etc.) *appear* superseded by the newer `… – Schedule & Adaptive` per-room automations
and `Shade Scheduler – Whole House` (id 1783036800000) — **but the new schedulers are ALSO `initial_state: false`**, so
the shade-scheduling subsystem is evidently mid-transition. Do **not** treat either set as dead without confirming the
current live enabled-state on the instance.

---

## High-confidence candidates (shortlist)

Zero repo references **and** a clear superseding replacement identified in-repo. Still confirm on the live instance
(especially for anything a UI/`.storage` surface might call) before removal.

1. **Legacy `clean_*` / `mop_*` vacuum scripts** — `script.clean_mudroom`, `clean_bedroom`, `clean_second_floor`,
   `clean_kitchen`, `mop_mudroom`. The `vacuum-view` dashboard drives cleaning through UI `script.1750692869441`
   plus `input_boolean.vacuum_*` room selectors; these named scripts are the old mechanism. (`clean_basement` is the
   exception — still called by the basement-vacuum automation.)
2. **Power-outage scripts superseded by automations** — `script.power_outage_cooling`, `script.power_outage_heating`,
   `script.power_returns`. Replaced by automations `Power Outage V2` and `Power Returns V2`.
3. **Orphaned Sonos-grouping cluster** — `script.sonos_apply_group`, `script.sonos_set_main_speaker`, and the helpers
   they read (`input_boolean.sonos_group_select_*` ×10, `input_select.sonos_group_coordinator`). The scripts have no
   caller in-repo and the grouping pop-up only writes `input_select.sonos_speaker_select`. Treat as **one unit** — and
   double-check the custom Sonos card isn't calling `script.sonos_apply_group` from UI config before removing.
4. **`script.alarm_keypad_disarm`** — superseded by `script.nspanel_keypad_digit`, which the nspanel security-view uses.
5. **Unplotted `*_5min` throttle sensors** — `sensor.bedroom_humidity_5min`, `bedroom_temperature_5min`,
   `first_floor_humidity_5min`, `first_floor_temperature_5min`, `battery_power_5min`, `grid_power_5min`,
   `tempest_irradiance_5min`. Their sibling throttle sensors are plotted; these specific ones are referenced nowhere.
6. **Per-area light-count sensors** — `sensor.first_floor_lights_on_count`, `basement_lights_on_count`,
   `second_floor_lights_on_count`, `outdoor_lights_on_count`. Dashboards use only the aggregate
   `sensor.lights_on_count`.
7. **`input_select.office_fan_owner`** — the only zone fan-owner select absent from every automation (the other three
   are heavily used); appears in a docs table only.

Lower-confidence (flag, don't auto-remove): `group.smartphones`, `sensor.daily_well_pump`, `sensor.daily_ev_charger`,
`sensor.bubble_card_modules`, `sensor.precip_next_hour`, `script.pool_music`, `script.toggle_water_heater_away_mode`,
`script.reset_hot_water_last_flushed_date`, `script.reset_dryer_vent_last_cleaned_date`. These have zero repo refs but a
plausible `.storage`/UI/Energy-dashboard/runtime consumer — **needs-live-check**.

---

## Counts recap

- Definitions scanned: **157** (134 sensors/helpers + 23 scripts) + **141** automations.
- Candidate-unused (zero repo refs): **17 sensors/helpers** + **15 scripts**.
- Automations: **0** with `enabled: false`, **20** with `initial_state: false`, **0** `zz_deprecated`-style names,
  **4** V2/V3-suffixed (no leftover V1 duplicates).
