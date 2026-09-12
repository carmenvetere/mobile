# Mobile Dashboard Design Audit (v2.7)

**Status:** Findings + recommendations, nothing implemented yet · **Branch:** `v2.7` ·
**Scope:** `dashboards/mobile/*`, the `dashboards/modules/*` they include,
`bubble_card/modules/mobile_*`, `themes/dune-mist.yaml` · **Date:** 2026-09-12

This is a static audit of the YAML/CSS, not on-device screenshots. Every item
carries a `file:line` so it can be checked against the rendered dashboard
before it is acted on. Items are grouped by category; the **Cleanup plan** at
the end orders them into a v2.7 sequence.

---

## 1. Headline findings

1. **Side margins differ view to view and row to row.** The root card's
   left/right padding is 5/5 on Home and Music, 5/10 on eight other views, and
   5/0 on Security. Inside a view, bubble rows are inset 5/5 (scenes), 10/20
   (lights), or 0/0 (shades) depending on which module styles them. This is
   the single biggest source of "things don't line up".
2. **The card colour ladder is inverted in places.** In Dune Mist,
   `--card-background-color` (#4f545b) is *darker* than `--background-color-2`
   (#5b616a); the "one step lighter" token is `--background-color-3`
   (#676d77). The PRD's ladder text and several cards use the darker token
   where a lighter one was intended, and shade rows inside expanders use the
   *same* colour as the expander, so they disappear against it.
3. **The theme default radius is 20px while the dashboard standard is 15px.**
   Every card that does not explicitly override inherits 20px. Changing the
   theme token would remove most residual mismatches for free.
4. **Section headers come in two visual languages.** Most views use a 20px
   bold separator; Settings and Pool use a 14px uppercase muted label.
   Shades and Climate additionally use 16px for room-level separators.
5. **One separator style block is copy-pasted 54 times.** The shared bubble
   module that should provide it (`mobile_separator`) is never referenced
   because its key and filename are swapped with `my_module`.
6. **`settings-view.yaml` is 3,902 lines, about 84 % of which is four row
   templates repeated 60 times.** The repetition is where most of the
   per-row drift (padding, font size, icon colour) has crept in.
7. **The PRD conventions block is stale.** It still mandates a sticky bottom
   nav, no back buttons, and 90 px bottom clearance; the dashboard has moved
   to a hamburger sheet + back header with 24 px clearance everywhere.
8. **Known v2.1 vacuum-view defects are still unfixed** (`theme: Bubble`,
   undefined `--ha-card-background-2`, three CSS rules dropped by a missing
   semicolon, and a capital-M `Modules:` key that makes five module
   references inert).

---

## 2. Spacing and margins

### 2a. Root view card padding (the page gutters)

| View | left | right | row-gap | max-width | Ref |
|---|---|---|---|---|---|
| home | 5px | 5px | 0 | — | `home-view.yaml:13-16, :27` |
| music | 5px | 5px | 0 | 100 % / 99 % | `music-view.yaml:13-16, :19, :33` |
| lights | 5px | 10px | 0 | — | `lights-view.yaml:14-17, :29` |
| shades | 5px | 10px | 0 | — | `shades-view.yaml:13-16` |
| climate | 5px | 10px | 10px | 98 % | `climate-view.yaml:14, :17, :28` |
| pool | 5px | 10px | 0 | — | `pool-view.yaml:13-16, :26` |
| settings | 5px | 10px | 0 | — | `settings-view.yaml:13-16` |
| weather | 5px | 10px | 2px | — | `weather-view.yaml:13-16, :31` |
| energy | 5px | 10px | 5px | calc(100vw − 10px) | `energy-view.yaml:19-22, :30, :41` |
| vacuum | 5px | 10px | 0 | 98 % | `vacuum-view.yaml:13-16, :20` |
| security | 5px | **none** | 5px | — | `security-view.yaml:12-15, :27` |

Also: the outer card radius is `0` on Home (`home-view.yaml:11`) but `15px` on
Lights/Shades/Settings (`lights-view.yaml:13`, `shades-view.yaml:12`,
`settings-view.yaml:12`) — a full-bleed page card should be 0.

**Recommendation:** one skeleton for all 11 views: `padding: 2px 5px 24px 5px`,
`margin: 0`, `border-radius: 0`, `row-gap: 0`, `max-width: 100%` +
`min-width: 0` + `box-sizing: border-box`, `grid-template-columns: minmax(0, 1fr)`.
Views that need a row gap (Climate, Security) should add it on the section,
not the root grid.

### 2b. Bubble row side insets (module level)

| Module | `.bubble-button-card-container` margin | Ref |
|---|---|---|
| `mobile_lights` | `2px 20px 2px 10px` (asymmetric) | `bubble_card/modules/mobile_lights.yaml:9` |
| `mobile_lights_scenes` | `2px 5px 2px 5px` | `mobile_lights_scenes.yaml:14,19` |
| `mobile_settings_module` | `2px 5px` | `mobile_settings_module.yaml` |
| `mobile_settings_slider` | `2px 5px` | `mobile_settings_slider.yaml` |
| `mobile_shades_module` | none (0) | `mobile_shades_module.yaml:63-76` |
| `mobile_climate` | none (no container rules at all) | `mobile_climate.yaml` |
| `notifications_module` | `2px 10px` | `notifications_module.yaml` |

The 10/20 asymmetry on `mobile_lights` is also the residual cause of the
"two-colour left edge" (R6-c): the `ha-card` background shows at the wider
right margin.

**Recommendation:** standardise on `margin: 2px 5px` in every mobile module
and delete per-card margin overrides.

### 2c. Double `vertical-stack` nesting

The lights/shades individual modules are already a `vertical-stack`
(`first-floor-lights-individual.yaml:2` etc.). `lights-view.yaml:199-200`
(First Floor) and `:236-237` (Basement) wrap them in a second stack; Second
Floor `:272` and Outdoor `:307` do not. HA's built-in 4 px stack margins
therefore apply twice on two of four sections. Same vestigial double wrap at
`home-view.yaml:333-336` and `shades-view.yaml:148-151`.

### 2d. Separator inner padding

`padding-top: 7px` (home `:351`, lights `:126`, shades `:171`, pool, vacuum) vs
`10px` + `padding-left: 10px` (energy `:133-135` ×6, security `:275, :372`) vs
`padding: 4px 6px 10px` (climate `:144, :212, :287, :378`) vs 3/7/10/10px
within one file (weather `:128, :148, :209, :263`). Energy/Security/Weather
separators sit 10 px further right than their sibling cards.

### 2e. Row padding inside Settings

Page rows use `padding: 13px 4px` inside a wrapper with `padding: 0 12px`;
pop-up toggle rows use `11px 2px` with no wrapper padding. Identical-looking
rows sit 16 px vs 2 px from the edge (`settings-view.yaml:102-107` vs
`:1285-1294`). "Guests in Basement" alone is indented
`11px 2px 11px 18px` (`:201`).

### 2f. Header chrome

Back icon 28 px (`mobile-header-back.yaml:28`) vs hamburger 26 px
(`mobile-header-hamburger.yaml:29`), both in 40 px tiles. Vacuum's header
is a different component with `padding-bottom: 5px; padding-top: 0`
(`vacuum-view.yaml:42-43`) while every other view uses `4px 2px 6px`.

### 2g. Stack-in-card (unequal insets, PRD R2/R8-e)

Still present at `security-view.yaml:348`, `energy-view.yaml:108, :231`,
`weather-view.yaml:234`, `vacuum-view.yaml:169`. Replace with
`vertical-stack`.

---

## 3. Border radius

Standard is 15 px. Currently in play on card-level surfaces: 0, 5, 10, 11,
12, 13, 15, 16, 18, 20, 22, 30 px.

- **Theme default 20 px** — `themes/dune-mist.yaml:30` `ha-card-border-radius: "20px"`. Cards without an explicit override (e.g. outdoor light rows, `outdoor-lights-individual.yaml:24-46`) inherit it. **Set the token to 15px.**
- 20 px: stack-in-card wrappers (`security-view.yaml:354`, `energy-view.yaml:114, :237`, `weather-view.yaml:243`), `pop-up-module.yaml:22`.
- 18 px: all seven weather tiles (`weather-view.yaml:223, 279, 290, 301, 312, 337, 358`), `sprinkler-pause-pop-up.yaml:74`.
- 16 px: pool stat tiles (`pool-view.yaml:118, :159`), camera tiles (`security-view.yaml:294`).
- 12 px: alarm segment buttons (`security-view.yaml:175, 209, 239`).
- 11 px vs 13 px for the same 44 px icon-tile idiom (`settings-view.yaml:498…` ×12, `pool-view.yaml:131, :172` vs `sprinkler-pause-pop-up.yaml:107`).
- 10 px: `notifications_module.yaml:19`, `vacuum-view.yaml:334, 372, 414`.
- 8 px: climate +/- buttons (`mobile_climate.yaml:85, :104`); 999 px pills on the same card (`:139`).
- 5 px: `security-view.yaml:383` (LLM Vision card) — almost certainly unintended.
- 22 px: nav sheet top corners (`mobile-nav-sheet.yaml:37-38`) — deliberate, but matches nothing else; consider 15 or 20.

Deliberate and fine: 999 px pills/chips, 50 % circles, 2 px scrollbar thumbs.

**Recommendation:** theme token → 15 px; small inner tiles → one value
(suggest 11 px); pills stay 999 px; delete every other explicit radius.

---

## 4. Typography

### 4a. Below the 14 px floor

- `security-view.yaml:302` — 9 px "● LIVE" camera badge (known nit).
- `shades-view.yaml:196, 234, 272, 310, 348` — 13 px "Manual" sub-buttons.
- `power-flow-card.yaml:12, 19, 32, 37` — `ha-card * { font-size: 12px !important }` overrides the 14 px set on line 7 for every descendant of the live energy chart.
- `sprinkler-pause-pop-up.yaml:103` (12 px), `:216` (13 px), `:271` (12 px).
- `sonos-favorites-pop-up.yaml:84…230` (13 px ×5), `sonos-grouping-pop-up.yaml:63, :106, :484` (11 px) — both files are orphaned (see §8).

### 4b. Section separators, three sizes

- 20 px bold: home, lights, climate, shades (section level), security, energy, weather, vacuum — 30 instances.
- 14 px uppercase `rgba(255,255,255,0.6)` letter-spaced: all 11 in Settings, all 3 in Pool.
- 16 px: room-level separators in Shades (`shades-view.yaml:200, 238, 276, 314, 352, 371`, `first-floor-shades-individuals.yaml:8, :391`) and separator sub-buttons in Climate (`climate-view.yaml:132-134, 200, 275, 366`) where Lights/Shades use 20 px sub-buttons (`lights-view.yaml:119, :187`, `shades-view.yaml:164, :416`).

**Recommendation:** pick one primary style (20 px bold) and one secondary
(16 px, for room sub-sections), define both in a module, and use the
secondary consistently for the Shades rooms and Climate sub-buttons. Retire
the 14 px uppercase variant or adopt it everywhere; not both.

### 4c. Bubble row text

| Module | name | sub-button | state |
|---|---|---|---|
| standard | 16 | 14 | 14 |
| `mobile_lights` | 16 | **16** (`:28`) | **16** (`:34`) |
| `mobile_climate` | — | **16** | — |
| Settings value rows | 16 | — | **15** (`settings-view.yaml:844, 901, 958, 1015, 1073`) |
| "Guests in Basement" | **15** (`:220`) | | |

### 4d. Headers and pop-up titles

- Home header is 26 px name/temp with no 14 px label (`home-view.yaml:224, :244`); every sub-view is 22 px + 14 px. Vacuum has no label line at all (`vacuum-view.yaml:80`).
- Pop-up titles: Settings 26 px; nav sheet and sprinkler 18 px (`mobile-nav-sheet.yaml:49`, `sprinkler-pause-pop-up.yaml:48`); notifications and weather 24 px. PRD says 26 px.
- Header live-label formats: leading `· ` (security `:63`), infix ` · ` (energy `:59`, pool `:44`), none (music `:51`). Header state accent gold on Lights (`:82`) vs slate-bright on Shades (`:82`); Climate has none.

### 4e. Chart text

ApexCharts titles use `fontSize: '18px'` (24-hour, 7-day ×2) but
`solar-forecast-today.yaml:11-12` uses `font-size`/`font-weight` — wrong key
names for ApexCharts, so that title style is silently ignored.
`12-month-solar-history.yaml:52` x-axis 16 px vs 14 px elsewhere.

---

## 5. Colour and theme tokens

### 5a. Ladder correction

Theme values (`themes/dune-mist.yaml:10-12, 28-29`):

| Token | Value | Role per theme comment |
|---|---|---|
| `--background-color` / `--card-background-color` / `--ha-card-background` | #4f545b | primary surface |
| `--background-color-2` | #5b616a | raised rows / expander shells |
| `--background-color-3` | #676d77 | cards inside expanders |

Wrong today:

- `mobile_shades_module.yaml:65, 99, 127, 137` uses `--background-color-2` — same as the expander shell (`shades-view.yaml:389, 437, 485, 533, 581`).
- Lights individual modules override `ha-card` back to `--background-color-2` in first-floor/basement/second-floor (`first-floor-lights-individual.yaml:42, 69, 96…`) but `--background-color-3` in outdoor (`outdoor-lights-individual.yaml:62…`) and one second-floor row (`:228`) — two colours in one list.
- `shades-view.yaml:127-128` (Close All) uses `--card-background-color` (darker).
- Weather tiles put `--card-background-color` cards on a `-2` surface (`weather-view.yaml:221-222, 278…358`).
- PRD R6-b / R8-c text names `--card-background-color` as the lighter step; it is the darker one.

**Recommendation:** expander shell = `-2`, cards inside = `-3`, top-level rows = `-2` on the `--primary-background-color` page. Fix the PRD text.

### 5b. Undefined variables under Dune Mist

- `--ha-card-background-2` (defined only in dark-dune/wall themes): `vacuum-view.yaml:143, 154, 165, 174`, `notifications_module.yaml:18, 26`, `chips.yaml:183, 195`, `notifications-pop-up.yaml:41`. Line 174 is the vacuum card's whole background → transparent.
- `--accent-color-2` / `--energy-solar-color`: `power-flow-card-wall.yaml:50, :52` (orphan).
- `--background-color-3` exists only in Dune Mist; `mobile_lights` breaks under any other theme (acceptable if Dune Mist is the only mobile theme, but worth a comment).

### 5c. Hardcoded values duplicating tokens

- `rgba(142,177,191,…)` = `--slate-color` #8EB1BF: 48× in `settings-view.yaml`, `sprinkler-pause-pop-up.yaml:75-76, :107`, `mobile-climate-toggle.yaml`, `pool-view.yaml:132`.
- `rgba(226,193,104,0.45)` = `--gold-color`: `security-view.yaml:172, :206`.
- `rgba(224,105,91,…)` = `--error-color`: `security-view.yaml:303`, `settings-view.yaml:447`, `sprinkler-pause-pop-up.yaml:237-238`.
- `rgba(139,166,128,0.18)` = `--sage-color`: `pool-view.yaml:173`.
- `#3a3e44` = `--secondary-background-color`: `mobile-nav-sheet.yaml:33-34`, `sprinkler-pause-pop-up.yaml`.
- `#f2f3f5` ≈ `--primary-text-color`: `mobile_climate.yaml:55, 87, 106, 117, 140` (+ `rgba(242,243,245,0.78)` at `:69`).
- `#7295B2` (×4) and `#9aa0a8` in `home-view.yaml:68, 87, 93, 121, 146` — the four header chips mix two hexes with two tokens.
- `rgba(255,255,255,0.06)` ×52 in Settings as a divider; the theme's `--divider-color` is `rgba(255,255,255,0.10)`, so the two never match.
- `rgba(255,255,255,0.6)` ×14 as a "muted label" colour with no token.
- `notifications.yaml` hardcodes `#F6CE46` ×39, `#EF8C00` ×6, `#EA4D3D` ×3, `#4ebcff` ×3 — none match `--gold/--amber/--error` (orphan file, see §8).

**Recommendation:** add three or four tokens to the theme (`--slate-alpha-55`,
`--slate-alpha-18`, `--muted-label-color`, `--row-divider-color`) or use
`color-mix(in srgb, var(--slate-color) 55%, transparent)` and replace every
literal.

### 5d. Icon and sub-button colour vs PRD R4

- Sub-button at rest should be `--secondary-text-color`; only `mobile_lights_scenes.yaml:41` and `mobile_settings_module.yaml:59` comply. `mobile_lights.yaml:30`, `mobile_shades_module.yaml:112` (documented exception), `mobile_settings_slider.yaml:77`, `mobile_climate.yaml:140` do not.
- **Contrast bug:** `mobile_settings_slider.yaml:54, 60, 69` paint name/state/icon `--primary-background-color` (#41454b) unconditionally over a `-2` (#5b616a) track — near-black on dark grey wherever the fill hasn't reached. `mobile_settings_module` does this only in the on state (`:41, 47, 64`); the slider should match.
- Icons should be plain `--primary-text-color`: `mobile_lights.yaml:63` and `mobile_lights_scenes.yaml:45` flip to `--primary-background-color` when on; `mobile_shades_module.yaml:144-150` uses slate by position; `pool-view.yaml:135, :176` use slate-bright/sage; Settings "Guests in Basement" `:216` uses secondary.
- No mobile view sets `.bubble-icon` colour on non-module bubble cards, so those fall back to HA domain colours (the class of bug R8-b fixed for shades).

### 5e. Wrong theme on sub-cards

`weather-pop-up.yaml:4`, `sonos-favorites-pop-up.yaml:6`,
`sonos-grouping-pop-up.yaml:6` set `theme: Wall Panel` (all orphans).
`vacuum-view.yaml:3` is `theme: Bubble`; `:21` sets the page background to
`--background-color-2` instead of `--primary-background-color`.

---

## 6. Structure and duplication

- **Separator block copy-pasted 54×** across the views (shades 12, settings 11, energy 6, lights 6, climate 4, vacuum 4, pool 3, security 3, weather 3, home 2). Climate's 55-line variant is pasted 4× (`climate-view.yaml:120-156, 188-224, 263-299, 354-390`). The module exists but `bubble_card/modules/my_module.yaml:1` declares key `mobile_separator` while `mobile_separator.yaml:1` declares key `my_module` — same body, names crossed, neither referenced.
- **Settings view row templates** (`settings-view.yaml`): 37 toggle rows × 67 lines (2,479 lines), 7 nav rows × 44, 5 value rows × 57, 11 slider rows × 19, plus 14 per-slider overrides that only repeat what the module already sets. A `lovelace_gen` `settings-toggle-row.yaml` (entity, name, icon, labels) and a nav/value row include would bring the file from ~3,900 to roughly 700 lines and make the per-row drift in §2e/§4c impossible.
- **Nav menu**: the same 10-line active-highlight block is repeated 9× in `mobile-nav-menu.yaml:101-111 … 522-532`, plus a 46-line commented-out Vacuum row (`:442-487`).
- **Two read-only row styles for the same data**: Energy pop-up uses bubble rows for Well/Pool/EV energy (`settings-view.yaml:3061-3129`); the Values section uses button-card rows (`:799-1085`). Powerwall Reserve appears both as a value row (`:799`) and a slider (`:3034`).
- **Shades pop-up** (`settings-view.yaml:3148-3817`) has 8 rows and zero separators; the Energy pop-up opens with a slider before its first separator (`:3031` vs `:3050`).
- **Grid declarations**: `weather-view.yaml:24-30` declares 4 areas but 3 rows; `vacuum-view.yaml:23-28` 3 areas but 4 rows. Single-row grids missing `grid-template-rows: 1fr`: `home-view.yaml:77-81, :237`, `shades-view.yaml:134-138`, `settings-view.yaml:1114-1150`, `sprinkler-pause-pop-up.yaml:81, 142, 179, 243`.
- **Dead style keys**: `lights-view.yaml:32-34` styles a `first` custom field that doesn't exist; `vacuum-view.yaml:50` `main:` is null; `mobile-climate-row.yaml:46` empty `styles:`; `mobile-climate-row.yaml:30` hardcodes `rows: 2.5` so the `rows:` variable passed at `climate-view.yaml:163` is ignored.
- **Commented-out blocks**: `home-view.yaml:267-330` (64 lines), `security-view.yaml:389-429` (41), `mobile-nav-menu.yaml:442-487` (46), `notifications.yaml:1203-1227`.
- `# lovelace_gen` marker present on home/lights/climate but missing on shades, security, energy, weather, pool, music, vacuum (harmless, `mobile.yaml:1` covers the tree; make it consistent either way).
- `lights-view.yaml:51` hardcodes `"36 fixtures ·"`; shades computes the equivalent from an attribute (`shades-view.yaml:50`).
- `first-floor-shades-groups.yaml` omits `card_layout: large` that the four sibling group modules set.
- `entity.state` (unguarded) at `24-hour-power-flow.yaml:109`.

---

## 7. CSS bugs (rules silently dropped)

- `vacuum-view.yaml:333, 371, 413` — `background: var(--background-color-2)` with no `;`; it and the following `border-radius` are both discarded.
- `vacuum-view.yaml:212, 232, 252, 272, 296` — `Modules:` (capital M); Bubble Card reads `modules:`, so these five module references are inert.
- `bubble_card/modules/pop-up-module.yaml:26-28` — `transition-delay: 0` (unitless time) and `background-color: null` are invalid and dropped; the `transition:` shorthand on the next line overrides the delay anyway.
- `solar-forecast-today.yaml:50` and `:54` — duplicate `stroke_width` in one series; the YAML loader keeps the last.
- `weather-view.yaml:20, :22` — `box-shadow: none` declared twice.
- `mobile-climate-toggle.yaml:27` — trailing `;` inside a button-card style list item emits `!important;;`.
- `climate-view.yaml:148-156, 216-224, 291-299, 382-390` — `@media` rules hide `.bubble-sub-button-2/-3/-4`, but Basement declares 2 sub-buttons and Office 1, and the breakpoints are non-monotonic (≤600 hides #4, ≤500 hides #2, ≤420 hides #3), so at 420 px only #1 survives.
- `power-flow-card.yaml:27` `.label` 16 px never reaches the shadow DOM (card_mod `style:` without `$`), while `:12` `ha-card *` 12 px does.
- `mobile_shades_module.yaml:126-140` styles `.bubble-range-*` on rows the module's own comment says never render a range; `:69-74` sets six `--bubble-*` custom properties that `:84-94` overrides with `!important`.
- `mobile_lights.yaml:14-18` sets a background colour on `.bubble-button-background` and then `opacity: 0`.
- `!important` on every declaration in all seven mobile modules except `font-weight: bold` (`mobile_lights.yaml:29`, `mobile_lights_scenes.yaml:39`, `mobile_settings_module.yaml:56`, `mobile_settings_slider.yaml:74`, `mobile_shades_module.yaml:111`) — those are the only declarations a per-card `styles:` block can override, which is accidental.
- `font-size: 0px` used to hide `.bubble-range-value` (`mobile_lights.yaml:53`, `mobile_shades_module.yaml:133`, `mobile_settings_slider.yaml:48`) — `display: none` is the honest form.

---

## 8. Dead and orphaned files

Included by no view or module (grep across `dashboards/`, `esphome/`):

| File | Lines | Note |
|---|---|---|
| `dashboards/modules/sonos-favorites-pop-up.yaml` | 855 | superseded by inline `favorites:` in `music-view.yaml:114-195` |
| `dashboards/modules/sonos-grouping-pop-up.yaml` | 557 | |
| `dashboards/modules/basement-climate.yaml` | 712 | 690 px wall-panel layout |
| `dashboards/modules/chips.yaml` | 523 | |
| `dashboards/modules/notifications-pop-up.yaml` | — | reachable only via `chips.yaml` |
| `dashboards/modules/weather-pop-up.yaml` | 96 | superseded by weather-view |
| `dashboards/modules/custom-favorites.yaml` | — | 10 entries vs 13 in music-view; different URI scheme |
| `dashboards/modules/power-flow-card-wall.yaml`, `-wall2.yaml` | 95–106 | |
| `dashboards/modules/mobile-priority-row.yaml` | — | its header comment describes ternaries the file no longer has |
| `bubble_card/modules/mobile_separator.yaml`, `my_module.yaml` | — | key-swapped twins, unused |
| `bubble_card/modules/subbutton_below.yaml`, `timer_progress.yaml` | — | unreferenced from `dashboards/` |

`dashboards/modules/notifications.yaml` (1,253 lines) is referenced only from
`esphome/basement-wall-panel/ui.yaml` and the two orphans above; the mobile
path is `custom:notification-center-card` (`home-view.yaml:406`). Confirm
whether the wall panel still needs it before deleting.

Stale content:

- Release-notes title card shows `v2.4.0` (`settings-view.yaml:1122`) while the newest entry is `v2.4.1` (`:1154`). Nothing for v2.6 has been added.
- Toggle rows referencing `automation.gym_motion_sensor` (`settings-view.yaml:2534…`), `automation.sunset_outdoor_off` (`:2813…`, labelled "Outdoor Lights **On** at Sunset"), `automation.outdoor_off_at_11pm` (`:2880…`, labelled "Off at **Midnight**"). No alias in `automations.yaml` produces those ids today (`:170`, `:367`, `:5169`); verify in Developer Tools → States whether the ids survived an alias rename or the rows are dead.
- PRD "Backlog" items (`mobile-toggle-row.yaml`, `mobile-nav-row.yaml`, `mobile_lights_scenes` stray `t;`, missing `--` prefixes, identical ternaries) are all done or the files no longer exist; the "⚠ Open" vacuum items are not.

---

## 9. PRD conventions that no longer match the dashboard

`docs/mobile-v2.1-prd.md` "Conventions" should be rewritten to say:

- Navigation: hamburger header (`mobile-header-hamburger.yaml`) + nav sheet (`mobile-nav-sheet.yaml`) + back header on sub-views. There is no bottom nav; R3 and R5 are historical.
- Bottom clearance is 24 px (all 11 views), not 90 px.
- Colour ladder: page `--primary-background-color` → rows/expanders `--background-color-2` → cards inside expanders `--background-color-3`. `--card-background-color` is the *darker* base surface.
- Theme `ha-card-border-radius` = 15 px (once §3 is applied).

---

## 10. Cleanup plan (suggested v2.7 order)

Each step is independently shippable and testable on-device.

1. **Tokens first (theme only).** Set `ha-card-border-radius: 15px`; add the four alpha/muted tokens from §5c. Screenshot every view before/after — this step alone changes the most pixels.
2. **One view skeleton.** Apply the §2a padding/gap/width block to all 11 views; outer radius 0; fix Security's missing right padding; swap the five `stack-in-card`s for `vertical-stack`; remove the double stacks (§2c); fix the two grid area/row mismatches.
3. **Separator module.** Fix the key swap, give `mobile_separator` the primary (20 px) style and a `secondary` variant (16 px), reference it from all 54 separators, delete the inline blocks. Decide Settings/Pool: adopt the module or make the 14 px uppercase style the module's third variant.
4. **Module hygiene.** `mobile_lights`: margin → `2px 5px`, sub/state → 14 px, rest colour → secondary. `mobile_shades_module`: container → `--background-color-3`, add `margin: 2px 5px`. `mobile_settings_slider`: text colour only in the on state. `mobile_climate`: replace `#f2f3f5`, drop the 8 px/999 px mixed radii. Fix the lights individual modules' `-2`/`-3` split. Remove the `!important`-less stragglers and dead range rules.
5. **Vacuum view.** Apply the four known fixes (§5b, §5e, §7) — or, since the PRD deferred it, rebuild it on the standard skeleton in the same pass.
6. **Settings view de-duplication.** Extract toggle/nav/value/slider row includes; while doing so normalise the row padding (§2e), 15 px → 14/16 px fonts, "Guests in Basement" and "Go Off Grid" deviations, and add separators to the Shades pop-up. Bump the release-notes card to the current version.
7. **Colour literal sweep.** Replace the §5c literals with tokens; unify the Home header chip colours; pick one header live-label format and state accent.
8. **Delete orphans** (§8) after confirming the wall panel does not need `notifications.yaml`; remove the four commented-out blocks; fix the PRD conventions (§9).
9. **Small fonts.** Raise the 13 px Manual sub-buttons and the power-flow 12 px override to 14 px; decide whether the 9 px LIVE badge is a deliberate exception and document it.
