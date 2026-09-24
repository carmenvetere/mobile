// Styles — mirrors the React mockup. CSS custom props let HA themes override.
import { css } from "lit";

export const cardStyles = css`
  :host {
    --wp-text: var(--primary-text-color, #ffffff);
    --wp-text-dim: var(--secondary-text-color, rgba(255, 255, 255, 0.62));
    --wp-bg: var(--background-color, var(--primary-background-color, #1a1c1f));
    --wp-card: var(--background-color, var(--primary-background-color, var(--ha-card-background, var(--card-background-color, #3a3d42))));
    --wp-card-2: var(--secondary-background-color, #4a4d52);
    --wp-accent: var(--primary-color, #8eb1bf);
    --wp-accent-2: var(--accent-color, #8ba680);
    /* Translucent fills derived from the palette. Overrideable so a
       theme can re-tint pills/banners without touching the base colors. */
    --wp-overlay-soft: rgba(0, 0, 0, 0.18);
    --wp-overlay: rgba(0, 0, 0, 0.22);
    --wp-overlay-strong: rgba(0, 0, 0, 0.28);
    --wp-scrim: rgba(0, 0, 0, 0.45);
    --wp-divider: rgba(255, 255, 255, 0.18);
    --wp-on-accent-soft: rgba(255, 255, 255, 0.6);
    --wp-pill-on-active: rgba(255, 255, 255, 0.12);
    /* color-mix lets the "grouped" row tint follow --wp-accent. Falls
       back via the second declaration for the rare browser without it. */
    --wp-accent-soft: rgba(142, 177, 191, 0.45);
    --wp-accent-soft: color-mix(in srgb, var(--wp-accent) 45%, transparent);
    /* Shadows. Card + cover fall back to the HA theme's --ha-card-box-shadow
       so a theme with a distinctive elevation shows through; the pixel
       defaults keep the current look when no theme sets it. */
    --wp-shadow-card: var(--ha-card-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.18));
    --wp-shadow-cover: var(--ha-card-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.35));
    --wp-shadow-play: 0 4px 16px rgba(0, 0, 0, 0.25);
    --wp-shadow-menu: 0 16px 40px rgba(0, 0, 0, 0.5);
    /* Radii. Outer card follows the HA theme's --ha-card-border-radius;
       interior tiles derive from two smaller stops. Themes wanting a
       consistent rounded-rectangle language can override any of these
       independently. Pill (999px) and round (50%) shapes stay hard-coded
       — those are structural, not decorative. */
    --wp-radius: var(--ha-card-border-radius, 28px);
    --wp-radius-tile: 18px;
    --wp-radius-tile-sm: 12px;
    --wp-radius-pill: 999px;
    --wp-track-scale: 1.15;
    --wp-vol-scale: 1.4;
    /* Force the host to fill its container. Without this Lovelace
       parents that use min-content sizing (some grid/stack layouts)
       will let intrinsic content widths drive the card's width — so
       a wider favorites row makes the whole card grow, and switching
       back to the player view shrinks it again. */
    display: block;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
  ha-card {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  .root {
    background: var(--wp-card);
    color: var(--wp-text);
    border-radius: var(--wp-radius);
    font-family: var(--ha-card-header-font-family, sans-serif);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    box-shadow: var(--wp-shadow-card);
    height: 100%;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    min-height: 600px;
  }

  /* HEADER
     Grid with 1fr/auto/1fr guarantees the title stays dead-centered
     regardless of how many buttons sit on either side. With plain flex
     + space-between the title floated toward whichever side had fewer
     buttons — visible whenever the sides hold different button counts. */
  .hdr {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 10px;
    padding: 14px 18px 12px;
    flex-shrink: 0;
  }
  .hdr-side {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hdr-side.right { justify-content: flex-end; }
  .hdr-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--wp-overlay-soft);
    color: var(--wp-text);
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
  }
  .hdr-btn.active {
    background: var(--wp-accent);
    color: var(--wp-bg);
  }
  .hdr-title {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: 0;
    cursor: pointer;
    color: var(--wp-text);
    font-size: 23px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: var(--wp-radius-tile-sm);
    transition: background 0.15s;
  }
  .hdr-title.menu-open {
    background: var(--wp-overlay-strong);
  }
  .group-pill {
    font-size: 13px;
    opacity: 0.75;
    padding: 3px 10px;
    border-radius: 999px;
    background: var(--wp-overlay);
  }
  .chev {
    transition: transform 0.2s;
  }
  .chev.up {
    transform: rotate(180deg);
  }

  /* TOAST — service-call failure banner. Auto-clears after 5s.
     Kept inline in the .root flex flow so it pushes the view down
     rather than covering the header. */
  .toast {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 22px 8px;
    padding: 10px 14px;
    background: var(--error-color, #cf6679);
    color: var(--wp-bg);
    border-radius: var(--wp-radius-tile-sm);
    font-size: 13px;
    animation: toast-in 0.15s ease-out;
  }
  .toast-msg { flex: 1; min-width: 0; }
  .toast-x {
    background: none;
    border: 0;
    color: inherit;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    padding: 0 4px;
    opacity: 0.75;
  }
  .toast-x:hover { opacity: 1; }
  @keyframes toast-in {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* PLAYER */
  .pv {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 22px 18px;
    min-height: 0;
    /* Allow children to shrink below their intrinsic content width so
       long titles inside .fav-item ellipsize instead of pushing the
       whole row off the right edge on narrow viewports. */
    min-width: 0;
  }
  .src {
    text-align: center;
    margin-bottom: 8px;
    font-size: 13px;
    color: var(--wp-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .src-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--wp-accent-2);
    margin-right: 6px;
    vertical-align: middle;
  }
  .cover-wrap {
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    min-height: 0;
    overflow: hidden;
    padding: 4px 0;
  }
  .cover {
    aspect-ratio: 1;
    /* Drive size from height so the available vertical space is the cap.
       max-width keeps the square from overflowing on narrow cards. */
    height: clamp(140px, 36vh, 240px);
    max-height: 100%;
    max-width: 100%;
    border-radius: var(--wp-radius-tile);
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: var(--wp-shadow-cover);
  }
  .meta {
    text-align: center;
    margin-top: 12px;
  }
  .meta .track {
    font-size: calc(22px * var(--wp-track-scale));
    font-weight: 700;
    color: var(--wp-text);
  }
  .meta .sub {
    font-size: calc(13px * var(--wp-track-scale));
    color: var(--wp-text-dim);
    margin-top: 2px;
  }
  .progress {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--wp-text-dim);
    font-variant-numeric: tabular-nums;
    margin: 10px 4px 8px;
  }
  .progress .bar {
    flex: 1;
    height: 4px;
    background: var(--wp-divider);
    border-radius: 999px;
    overflow: hidden;
  }
  .progress .bar > span {
    display: block;
    height: 100%;
    background: var(--wp-text);
  }
  .transport {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    margin: 4px 0 10px;
  }
  .t-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: none;
    border: 0;
    color: var(--wp-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .play-btn {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: var(--wp-text);
    color: var(--wp-bg);
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--wp-shadow-play);
  }
  .vol-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 2px 4px;
  }
  .vol-icon {
    display: flex;
    flex-shrink: 0;
  }
  /* The volume icon doubles as the mute toggle. */
  .mute-btn {
    background: none;
    border: 0;
    color: var(--wp-text);
    cursor: pointer;
    padding: 6px;
    margin: -6px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
  }
  /* Dim the whole volume row while muted so the state is readable at
     a glance from across the room. */
  .vol-row.muted .slider,
  .vol-row.muted .vol-num {
    opacity: 0.35;
  }
  .vol-row.muted .mute-btn {
    color: var(--wp-accent);
  }
  .vol-num {
    flex-shrink: 0;
    min-width: 28px;
    text-align: right;
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    color: var(--wp-text-dim);
  }

  /* SLIDER */
  .slider {
    flex: 1;
    height: calc(22px * var(--wp-vol-scale));
    background: var(--wp-divider);
    border-radius: 999px;
    position: relative;
    cursor: pointer;
    touch-action: none;
  }
  .slider .fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: var(--wp-accent);
    border-radius: 999px;
  }
  .slider .knob {
    position: absolute;
    top: 50%;
    width: 6px;
    height: calc(30px * var(--wp-vol-scale));
    background: var(--wp-text);
    border-radius: 3px;
    transform: translate(-50%, -50%);
  }

  /* FAVORITES */
  .fav-target {
    font-size: 14px;
    color: var(--wp-text-dim);
    padding: 2px 4px 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .fav-refresh {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.08);
    border: 0;
    color: var(--wp-text);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fav-notice {
    font-size: 13px;
    color: var(--wp-text-dim);
    background: rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 10px 12px;
    margin-bottom: 10px;
  }
  .fav-notice b { color: var(--wp-accent); }
  .fav-notice code { font-size: 12px; }
  .fav-empty {
    text-align: center;
    color: var(--wp-text-dim);
    padding: 40px 20px;
    font-size: 15px;
  }
  .fav-empty.error { color: var(--error-color, #cf6679); }
  .fav-svc-head {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--wp-text-dim);
    padding: 12px 4px 4px;
  }
  .fav-svc-head:first-child { padding-top: 0; }
  .fav-text {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  .fav-text .fav-label { flex: none; width: 100%; text-align: left; }
  .fav-sub {
    font-size: 12px;
    color: var(--wp-text-dim);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  .fav-item[disabled] { opacity: 0.5; cursor: default; }
  .fav-target b {
    color: var(--wp-accent);
    font-weight: 600;
  }
  .tabs {
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  .tab {
    background: var(--wp-overlay-soft);
    color: var(--wp-text);
    border: 0;
    cursor: pointer;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
  }
  .tab.active {
    background: var(--wp-accent);
    color: var(--wp-bg);
  }
  .fav-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    flex: 1;
    padding-right: 4px;
    min-width: 0;
    /* Keep rows pinned to the top — without this, a short list would
       distribute the cards across the full available height. */
    align-content: flex-start;
  }
  .fav-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 20px 10px 10px;
    background: var(--wp-card-2);
    border: 0;
    border-radius: var(--wp-radius-pill);
    cursor: pointer;
    color: var(--wp-text);
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    /* Contain long titles. Without min-width:0 on a flex container,
       the inner text's intrinsic width forces the button wider than
       its parent, so the row escapes to the right. */
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    box-sizing: border-box;
  }
  .fav-label {
    flex: 1 1 0;
    min-width: 0;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  .fav-art {
    width: 44px;
    height: 44px;
    border-radius: var(--wp-radius-tile-sm);
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--wp-text);
  }

  /* GROUPING */
  .grp-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    background: var(--wp-overlay);
    border-radius: var(--wp-radius-tile-sm);
    margin-bottom: 12px;
    gap: 14px;
  }
  .grp-banner .lbl {
    font-size: 11px;
    color: var(--wp-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .grp-banner .rooms {
    font-size: 15px;
    font-weight: 600;
    margin-top: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .grp-banner .hint {
    font-size: 13px;
    color: var(--wp-text-dim);
    text-align: right;
  }
  .grp-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    padding-right: 4px;
  }
  .grp-row {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 22px;
    background: var(--wp-card-2);
    color: var(--wp-text);
    border: 2px solid transparent;
    border-radius: var(--wp-radius-pill);
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }
  .grp-row.grouped {
    background: var(--wp-accent-soft);
    color: var(--wp-bg);
  }
  /* Optimistic state: tap registered, join/unjoin still in flight.
     Gentle pulse tells the user the change is being applied. */
  .grp-row.pending {
    animation: grp-pending 1s ease-in-out infinite;
  }
  @keyframes grp-pending {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  .grp-row.primary {
    background: var(--wp-accent);
    color: var(--wp-bg);
    border-color: var(--wp-text);
    font-weight: 700;
  }
  .grp-row .badge {
    font-size: 10px;
    font-weight: 700;
    padding: 4px 9px;
    background: var(--wp-overlay-soft);
    color: var(--wp-bg);
    border-radius: 999px;
    letter-spacing: 0.1em;
  }
  .grp-volumes {
    margin-top: 14px;
    padding: 14px 16px;
    background: var(--wp-overlay);
    border-radius: var(--wp-radius-tile);
  }
  .grp-volumes-title {
    font-size: 11px;
    color: var(--wp-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }
  .grp-vol-row {
    display: grid;
    grid-template-columns: 110px 1fr 32px;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  .grp-vol-row .name {
    font-size: 15px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .grp-vol-row .val {
    font-size: 14px;
    color: var(--wp-text-dim);
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  /* DROPDOWN */
  .menu-overlay {
    position: absolute;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: var(--wp-scrim);
    padding-top: 64px;
  }
  .menu-card {
    width: min(92%, 380px);
    background: var(--wp-card-2);
    border-radius: var(--wp-radius-tile);
    padding: 8px;
    box-shadow: var(--wp-shadow-menu);
    max-height: 80%;
    overflow-y: auto;
  }
  .menu-section {
    padding: 8px 12px 4px;
    font-size: 11px;
    color: var(--wp-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    text-align: left;
    padding: 12px 14px;
    background: transparent;
    color: var(--wp-text);
    border: 0;
    cursor: pointer;
    border-radius: var(--wp-radius-tile-sm);
    font-size: 15px;
    font-weight: 500;
  }
  .menu-item.active {
    background: var(--wp-accent);
    color: var(--wp-bg);
    font-weight: 700;
  }
  .menu-item .now-pill {
    font-size: 10px;
    font-weight: 700;
    padding: 3px 7px;
    background: var(--wp-overlay-soft);
    color: var(--wp-bg);
    border-radius: 999px;
    letter-spacing: 0.1em;
  }
  .menu-item .group-pill {
    font-size: 10px;
    padding: 3px 8px;
    background: var(--wp-pill-on-active);
    border-radius: 999px;
    letter-spacing: 0.06em;
  }

  /* MOBILE / NARROW */
  /* Fill the dashboard panel if Lovelace gives the card bounded height
     (panel-mode dashboards do), otherwise fall back to the default
     min-height so we don't overshoot the viewport in a regular
     non-panel dashboard. We deliberately do *not* force 100dvh on the
     host — that would push the card behind the HA app header. We also
     keep the rounded corners in narrow mode; users who want a true
     edge-to-edge wall-tablet feel can override --wp-radius via theme
     or card-mod. */
  :host([narrow]) ha-card,
  :host([narrow]) .root {
    height: 100%;
  }
  :host([narrow]) .hdr-title {
    font-size: 19px;
  }
  :host([narrow]) .grp-vol-row {
    grid-template-columns: 90px 1fr 30px;
  }
  /* In narrow mode, let the favorites/grouping bodies scroll the
     whole view instead of just the inner list, so the bottom of long
     content remains reachable on a phone-sized viewport. */
  :host([narrow]) .pv-scroll {
    overflow-y: auto;
  }

  /* ACCESSIBILITY — keyboard focus. :focus-visible only fires for
     keyboard/switch navigation, so touch and mouse users never see the
     ring. Applies to every interactive surface including the custom
     sliders (which are focusable via tabindex). */
  button:focus-visible,
  .slider:focus-visible {
    outline: 2px solid var(--wp-accent);
    outline-offset: 2px;
  }
`;
