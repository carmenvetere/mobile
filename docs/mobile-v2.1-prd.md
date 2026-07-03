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

## Process

- Work lands on the `v2.1` branch in small commits; this PRD is updated in the
  same commits (check off ⬜ → ✅ with a short note).
- Validation before every push: lovelace_gen render + YAML parse of every
  touched view.
- Merge `v2.1` → `main` at stable checkpoints (user-approved), then
  `git fetch origin && git reset --hard origin/main` on the HA box.
