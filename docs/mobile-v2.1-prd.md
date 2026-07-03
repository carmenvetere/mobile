# PRD: Mobile Dashboard V2.1

**Status:** Active · **Branch:** `v2.1` · **Owner:** Carmen · **Last updated:** 2026-07-02

## Background

The v1 mobile dashboard (`dashboards/mobile/`, url `/mobile-dash`) has been fully
revamped view-by-view onto the Dune Mist pattern and is now the production
dashboard — effectively "v2". The separate `dashboards/mobile-v2/` tree that
served as the design source has been deleted (along with its `mobile-dash-v2`
registration in `configuration.yaml`) to avoid maintaining two copies.

V2.1 is a refinement pass on the production dashboard. All V2.1 work happens on
the **`v2.1` branch**; requirements accumulate in this document and are checked
off as they land.

## Conventions (carried forward, non-negotiable)

- Theme **Dune Mist**; view background `var(--primary-background-color)`.
- Standard view skeleton: `grid-layout` → sticky bottom-nav include → one
  `custom:button-card` with `header` + `main` custom fields; 90px bottom
  clearance so the last row clears the nav.
- Headers: icon tile + name + live label (14px); no back buttons — the bottom
  nav owns navigation.
- Flat, editable YAML — no jinja macros or YAML anchors in view files; the only
  include is the shared one-line bottom nav (plus deliberately shared modules).
- All button-card JS templates use the guarded `states['<id>']` pattern — never
  `entity.state` (nested custom_fields cards don't populate `entity`).
- Single-row button-card grids declare `grid-template-rows: 1fr` (button-card's
  `no-icon` default rows otherwise pin content to the top).
- No fonts below 14px. Bubble rows: name 16px, sub-buttons/state 14px.
- `vertical-stack`, not `custom:stack-in-card`, for stacked content (stack-in-card
  causes unequal insets).
- Bubble cards use repo-managed modules (`bubble_card/modules/*`), not
  `.storage`-only ones.

## Requirements

### R1 — Home header: reorder status icons ⬜

The status icons to the left of the outside temperature should read, from the
temperature outward (right → left): **Alarm** (always present, directly left of
temp) → **Notifications** → **Dinner Party** → **Overnight Guests**.

Visual order left → right: `[Overnight Guests] [Dinner Party] [Notifications] [Alarm] [Temp]`.

### R2 — Home view: equal margins on Scenes / Lights ⬜

The left and right margins on the scenes and lights sections are unequal —
caused by the `custom:stack-in-card` wrapper. Replace it with a plain
`vertical-stack` (same fix already applied to the Lights view in v1) so insets
are consistent with the rest of the view.

### R3 — Bottom nav overlays the HA sidebar ⬜

The fixed bottom nav renders across the full viewport width, covering the
bottom of the Home Assistant sidebar — the last two sidebar items are
unreachable. Fix so the nav only spans the dashboard panel:

- Offset the nav by the sidebar width when the sidebar is visible (e.g.
  `left: var(--mdc-drawer-width, 0px)` or an equivalent media-query approach),
  and/or lower its z-index below the sidebar layer.
- Must remain full-width and unaffected in the mobile app / narrow viewports
  where the sidebar is hidden.

### R4 — Consistent sub-button colors on menu bubble cards ⬜

In the nominal (inactive) state, all bubble-card sub-buttons should render
`var(--secondary-text-color)`; some currently show `var(--primary-text-color)`.
Audit the repo bubble modules (`mobile_settings_module`, `mobile_lights`,
`mobile_lights_scenes`, `mobile_shades_module`, separators) and per-card
`styles:` overrides, and normalize:

- Nominal sub-button text/icon: `var(--secondary-text-color)`.
- Active/on sub-button text/icon: unchanged (state color / primary).

### R5 — Bottom nav highlight fixes ⬜

Two defects in the active-pill highlight:

1. The highlight pill still extends past the nav bar's edge on mobile —
   constrain the pill within the bar (size/overflow fix).
2. Views reached through the **More** pop-up (Weather, Shades, Music, Pool,
   Vacuum, Settings…) show no highlight at all. When `active: more` — i.e. the
   current view is one of the More destinations — the **More** nav item should
   carry the active highlight, and (stretch) the matching row inside the More
   pop-up should render in its active style.

### R6 — Lights view refinements ⬜

Color hierarchy and polish on the Lights view (see 2026-07-02 screenshots).

- **a. Expander color = scene-card color.** The floor expander cards should use
  the same background color as the bubble scene cards' container
  (`var(--background-color-2)`, per the `mobile_lights_scenes` module).
- **b. Inner cards one step lighter.** The individual light cards inside an
  expander should use the theme color one step lighter than the expander
  background (next rung on the Dune Mist ladder, e.g.
  `var(--ha-card-background)` / `var(--card-background-color)` — confirm
  against the theme).
- **c. Fix the two-color left edge.** Individual light bubble cards show two
  colors at the left edge (screenshot 1): the `mobile_lights` module's
  `.bubble-button-card-container` background peeks out from behind the
  `.bubble-button-background` / slider overlay (radius/margin mismatch).
  Align the layers so the edge is a single color.
- **d. No hover color on expanders.** Remove the expander cards' hover state
  color (card_mod override on the expander's hover overlay).
- **e. Slider fill colors.** For a light that is on, the filled (left) side of
  the slider should be `var(--slate-color)`; the unfilled (right) side stays
  the card's gray background (screenshot 2 currently shows the blue-gray fill
  with mismatched track).
- **f. Expander border radius.** The expanders' 20px radius looks off — align
  with the dashboard standard (15px, see R7-b radius audit).

### R7 — Climate view refinements ⬜

- **a. Header average temp broken.** The label reads `avg –°` because it uses
  the bare `entity` variable, which is not populated in nested custom_fields
  button-cards (the known `ButtonCardJSTemplateError` pattern — this header
  slipped through the earlier sweep). `sensor.climate_zones_avg_temp` itself
  exists and works. Fix: guarded `states['sensor.climate_zones_avg_temp']`.
- **b. Thermostat cards: drop the glow, fix radius.** Remove the heat/cool
  glowing border (`box-shadow` ring) from the `mobile_climate` bubble module.
  Its 25px card radius should also come down to the dashboard standard (15px);
  audit the same for the lights expanders (R6-f) — radii should be consistent
  (15px unless a deliberate exception).
- **c. Priority/fan/vent toggle rows: readability.** In
  `mobile-climate-toggle.yaml`:
  - The per-room temp/humidity chips (secondary text on
    `rgba(255,255,255,0.06)`) are hard to read — restyle for contrast (e.g.
    primary text, or drop the chip background).
  - The switches' off state (name/state in `#9aa0a8`) is also low-contrast —
    improve.
  - Row icons should be plain `var(--primary-text-color)` in all states,
    matching the scene and light cards (currently slate-bright when on,
    `#9aa0a8` when off).

### R8 — Shades view refinements ⬜

(See 2026-07-02 Dining Room screenshot.)

- **a. Card border radius.** The shade bubble cards look wrong because
  `mobile_shades_module` sets no `border-radius`, so cards keep Bubble's ~32px
  default. Standardize to 15px (the dashboard standard, per R7-b audit).
- **b. Icon color.** Cover icons render HA's blue domain state color because
  the module sets no `.bubble-icon` color. Set them to
  `var(--primary-text-color)` — static, no state dependence (the card
  background doesn't change with state here).
- **c. Color hierarchy.** Expander card background = the group cards' color
  above (`var(--background-color-2)`); cards inside the expander one theme
  step lighter — same ladder as the lights view (R6 a/b).
- **d. Expander border radius.** Audit/standardize alongside R6-f (15px).
- **e. Unequal left/right margins.** The shade groups and expander sections
  have unequal side margins — the groups section is another
  `custom:stack-in-card` (shades-view line ~137). Replace with
  `vertical-stack`, same as R2 / the lights view fix.
- **f. Battery icon alignment.** In the individual cards, the battery
  icon + percentage pair shifts horizontally depending on the text width
  ("100%" vs "55%"), so the icons don't form a column. Give the battery
  sub-button a fixed width / right-aligned percent so icons line up across
  cards.

### R9 — Security view refinements ⬜

- **a. Header not clickable.** The header currently opens the Alarmo
  more-info dialog (`tap_action: more-info`, security-view line ~38). Change
  to `action: none`, matching the other view headers.
- **b. Segmented alarm control under the header.** New full-width
  `custom:button-card` styled as a 3-position slider/segmented control,
  driven by `alarm_control_panel.alarmo`:
  - Left: **Armed Away** — gold when active, grey otherwise.
  - Center: **Armed Home** — gold when active, grey otherwise.
  - Right: **Disarmed** — green (theme sage) when active, grey otherwise.
  - Tapping a segment calls the matching Alarmo service
    (`alarm_arm_away` / `alarm_arm_home` / `alarm_disarm`).
  - Transitional states (`arming`, `pending`) render on the target segment in
    a reduced/pulsing style so the control never looks stuck.
  - Guarded `states[]` JS throughout (nested custom_fields context).
- **c. Remove camera name overlays.** The `picture-entity` name footer is too
  tall on mobile and the views are self-explanatory — set
  `show_name: false` (and no state footer) on all camera cards so only the
  image renders; `tap_action: more-info` stays.

### R10 — Energy view refinements ⬜

- **a. 12-month solar history formatting + yearly total.**
  (`dashboards/modules/12-month-solar-history.yaml`, apexcharts)
  - Y-axis labels get thousands separators (`1,000` not `1000`) via a
    `yaxis.labels.formatter` (`toLocaleString`).
  - The chart header shows the **total MWh over the last 12 months** (e.g.
    "12.4 MWh last 12 months") instead of the current-state readout — via the
    apexcharts header/series total if it can sum the statistics, otherwise a
    small template sensor.
- **b. Hide the wide charts on narrow screens.** The 12 Month Solar History
  and Last 24 Hours Power Flow sections are too wide to be useful on mobile.
  Wrap each (separator + chart) in a conditional card with a `screen`
  condition (media query, e.g. `(min-width: 768px)`) so they render on
  tablet/desktop only. The remaining sections keep their current order and
  spacing on mobile with no gaps where the charts were.

### R11 — Weather view refinements ⬜

- **a. Alerts → forecast spacing.** Add a clear gap between the Active
  Weather Alerts card and the forecast card below it (the view grid currently
  runs `row-gap: 2px`, so when the conditional alerts card is visible the two
  cards nearly touch). Margin on the forecast block or a larger row gap —
  whichever keeps the no-alerts layout unchanged.
- **b. Forecast separator label.** Give the forecast card a bubble separator
  label above it (e.g. "Forecast", matching the "Live Weather" section below)
  so the view's section structure is consistent with the other views.

## Backlog / future candidates

- Retire or fold in the now-orphaned v2-only modules (`mobile-toggle-row.yaml`,
  `mobile-nav-row.yaml` — still referenced only by `mobile-settings-module.yaml`,
  itself no longer included by any view).
- Bubble module hygiene: fix `mobile_lights_scenes` (stray `t;`, missing `--`
  prefixes, identical on/off ternaries) and the same missing `--` prefix in
  `mobile_settings_module`.

## Acceptance criteria (per requirement)

1. Home header icons in the specified order; alarm always adjacent to temp.
2. Scenes/lights sections align flush with the other home sections at both edges.
3. All sidebar items clickable with the dashboard open on desktop/tablet; nav
   unchanged in the companion app.
4. Every menu bubble card's sub-button is secondary-text-color at rest.
5. Active pill fully contained in the nav bar; More gets the highlight on all
   More-destination views.
6. Lights view: expanders match the scene-card color; inner cards one step
   lighter; single-color left edge on light cards; no hover tint on expanders;
   on-state slider fill is slate over the card-gray track; radii standardized.
7. Climate view: header shows the real average temp; thermostat cards have no
   glow and standard radius; toggle-row temps/humidity/off-state readable and
   icons primary-text-color.
8. Shades view: 15px card and expander radii; primary-text icons; expander
   color hierarchy matches groups; equal side margins; battery icons aligned
   in a column.
9. Security view: header inert; segmented Away/Home/Disarm control works with
   correct active colors (gold/gold/green) and transitional states; cameras
   render image-only.
10. Energy view: y-axis shows comma-separated values; chart header shows the
    12-month MWh total; the two wide charts hidden on phones but present on
    wide screens with no layout gaps.
11. Weather view: visible gap between alerts and forecast when alerts are
    active; forecast section carries a separator label.

## Process

- Work lands on the `v2.1` branch in small commits; this PRD is updated in the
  same commits (check off ⬜ → ✅ with a short note).
- Validation before every push: lovelace_gen render + YAML parse of every
  touched view.
- Merge `v2.1` → `main` at stable checkpoints (user-approved), then
  `git fetch origin && git reset --hard origin/main` on the HA box.
