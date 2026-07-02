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

## Process

- Work lands on the `v2.1` branch in small commits; this PRD is updated in the
  same commits (check off ⬜ → ✅ with a short note).
- Validation before every push: lovelace_gen render + YAML parse of every
  touched view.
- Merge `v2.1` → `main` at stable checkpoints (user-approved), then
  `git fetch origin && git reset --hard origin/main` on the HA box.
