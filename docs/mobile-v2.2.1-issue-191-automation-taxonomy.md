# Issue #191 — Automation label taxonomy & tagging target list

**Status:** Taxonomy + target list (analysis only). **No labels are applied by
this doc.**

⚠ **Labels live in the entity registry / `.storage`, not in `automations.yaml`.**
This repo can hold the taxonomy and the target mapping; the actual tagging is a
**registry task** performed on the live instance (UI or config/registry bridge,
same mechanism as #148). This doc is the plan to execute there.

Aligned with #148's category + Area/Floor scheme. Each automation should get:
- **one primary category label** (below), plus
- optional secondary labels where it genuinely spans two domains
  (e.g. a washer Live Activity is both `laundry` and `notifications`), plus
- an **Area/Floor label** per #148 where the automation is room-scoped.

## Category labels

`climate` · `lighting` · `shades` · `security` · `energy` · `pool` ·
`irrigation` · `vacuum` · `laundry` · `ventilation` · `media` ·
`notifications` · `scenes-control` · `system`

(`ventilation` = exhaust fans + HVAC-fan/economizer/fresh-air; kept distinct
from `climate` because it's a separate subsystem with its own owner arbitration.
`pool` is broken out from `energy`/`system` because it's a large coherent group.
`scenes-control` = Pico remotes + scene-button surfacing automations.)

## Target mapping (all 141 automations)

### climate (14)
- Aux/Emergency Heat Activated · Aux/Emergency Heat Deactivated
- Office Thermostat Schedule V2 · Bedroom HVAC Schedule · Basement HVAC Schedule
  · Living Room HVAC Schedule V3
- Basement HVAC Fresh Air Availability (also `ventilation`)
- First Floor Doors Left Open - Climate Off · Mudroom Door Left Open - Climate Off
  · First Floor Doors Closed - Restore Climate · Mudroom Door Closed - Restore Climate
- Climate Hold Watchdog
- Utility Room High Temp · Utility Room Low Temp · Attic Low Temp · Attic Temp High
  (freeze/overheat guards — `climate` + `system`)

### ventilation (9)
- Exhaust Fan Economizer - Safety Shutoff · Fresh Air Ventilation
- HVAC Fan - Living Room Air Filter · HVAC Fan - Bedroom Air Filter
- Basement Bathroom Exhaust Fan Turns Off after 45 min · Primary Bathroom Exhaust
  Fan Turns Off after 45 min · Powder Room Exhaust Fan Turns Off after 20 min
- Daily Lower Floors HVAC Filter Update · Daily Upper Floor HVAC Filter Update
  (also `system`)

### lighting (13)
- Outdoor Motion after 11pm, before sunrise · Sunset Outdoor On · 11:59PM Outdoor Off
  · 11:00 PM - Turn Off Landscape Spotlights (S-Th)
- Motion: Bathroom (Day) · Motion: Bathroom Lights (Night)
- Gym Motion Sensor - Day · Gym Motion - After Sunset
- Morning Lights Off (Lux over 5000 or 9am) · Evening Lights On (Lux)
- Laundry Room Lights on When Door Opens After Dark
- Sunrise · 11:00 PM Good Night (also `scenes-control`)

### shades (20)
- 800am Bedroom Hallway Shades Weekdays · 900am Bedroom Shades Open Weekends
- 7:30 AM First Floor Shading (Weekdays) · 8:00 AM First Floor Shades Weekends
  · 1:00 PM West Facing Shades · 3:00 PM Living Room Side Shades · 10:30 AM East
  Facing Shades · Sunset +30 or 8:00 PM Close Shades
- Bedroom - Close Shades at Sunset +30min or 8:00PM
- Back Guest Bedroom - Close Shades -30 min before sunset or 8PM · 8AM Back Guest
  Bedroom Shades Weekdays · 9AM Back Guest Bedroom Shades Weekends · Back Guest
  Bedroom Pico - Open/Close Shades
- 8:00 AM Front Guest Bedroom Shades Weekdays · Front Guest Bedroom Shades +30 min
  from Sunset or 8pm · 9:00 AM Front Guest Bedroom Shades Weekends · Front Guest
  Bedroom Pico - Open/Close Shades
- First Floor / Primary Bedroom / Back Guest Bedroom / Front Guest Bedroom / Office
  Shades – Schedule & Adaptive · Shade Scheduler – Whole House

### security (11)
- Alarm - Disarm at 7AM or Good Morning Scene Activate · Alarm - Arm Home Mode if
  Someone is Home on Good Night or 11pm · Alarm - Disarm Upon Arriving Home · Alarm
  - Arm Away When Everyone Leaves · Alarm - Triggered · Alarm Pending Chime · Alarm
  Arming Chime
- Camera Object Detections While Armed
- Garage Door - 9:30pm
- Away Mode Turns On · Away Mode Turns Off (also `system`/`climate`)

### pool (11)
- Pool Cover Status · Pool Cover Pump · Pool Heater - Turn off daily at 6pm · Pool
  Water Level Check · Rain Check · Pool Light 30 min before sunset · 9AM Daily - Pool
  Filter On · 6PM Daily - Pool Filter Off · Pool: Raise Pump Speed When Heating ·
  Pool: Lower Pump Speed When Heating Complete · Pool Timelapse (also `system`)

### energy (5)
- Powerwall - 30% · Powerwall - 20% · Powerwall - 12%
- Power Outage V2 · Power Returns V2

### irrigation (1)
- Sprinkler Surge above 90 (see also #143 to expand this subsystem)

### vacuum (7)
- 12:00AM Roborock S8 Vacuum Basement · Reload Roborock before to cleaning
- Vacuum - All Basement Rooms Selected · Vacuum - All Basement Rooms Deselected ·
  Vacuum - Evaluate All Button State · Vacuum - Sync Suction Mode to Vacuum · Vacuum
  - Sync Suction Mode from Vacuum

### scenes-control (14)
- Living Room Pico Audio: Button 1–5 (also `media`) · Pico Remotes: Living Room w/
  Long Press · Upstairs Hallway w/ Long Press · Pico Remotes: Basement Remotes w/
  Long Press · Master Bedroom Pico w/ Long Press · Office Pico Remote
- Bedside Pico Remote - Button 1–5
- 5AM Scene Buttons · 1 Hour Before Sunset Scene Buttons · 10PM Scene Buttons
- Guest Mode Activated · Dinner Party Mode · Cleaners Mode Turns On · Cleaners Mode
  Turns Off · Detect Cleaners Arriving

### media (1 primary; + Pico Audio cross-listed)
- (Living Room Pico Audio buttons are primary `scenes-control`, secondary `media`)

### notifications (9)
- Storm Watch Announcement
- Wall Panels - Show Critical and Warning Messages as Priority · Wall Panel Start
  URL when Notification goes from Warning to Info
- Washing Machine Live Activity — Update/Complete (also `laundry`)
- Dryer Live Activity — Update/Complete (also `laundry`)
- Power Outage Live Activity — Update/Restored (also `energy`)
- Sprinklers Live Activity (also `irrigation`) · Car Charging Live Activity
  (also `energy`)

### laundry (0 primary; cross-listed)
- The washer/dryer Live Activities are primary `notifications`, secondary `laundry`.

### system (10)
- Daily Restart · Trash Day · Power cycle outlet when driveway_zone_2_2 unavailable
- Bedroom Air Quality
- Driveway Timelapse · Blueberry Timelapse
- Basement Work Mode - On · Basement Work Mode - Off (v2.2.1 #188 — also `lighting`)
- (Attic/Utility temp guards cross-listed from `climate`; daily HVAC filter updates
  cross-listed from `ventilation`)

## Notes / execution

- Counts above are indicative primary buckets; several automations carry a
  secondary label (noted inline). Total distinct automations = 141.
- Apply the labels on the live instance via the registry (UI **Settings →
  Automations → label**, or the config/registry bridge) — **do not** try to add
  `labels:` to `automations.yaml`; HA does not read labels from there.
- Reuse the **Area/Floor** labels from #148 for room-scoped automations so
  automation and entity labeling share one scheme.
- After tagging, verify the Automations list is filterable by each category and
  that none remain untagged.
