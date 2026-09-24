// Dune Mist styling. Every theme token carries its literal fallback so the
// card renders correctly before a theme reload picks up new tokens.
import { css } from "lit";

export const cardStyles = css`
  :host {
    --mm-bg: var(--primary-background-color, #41454b);
    --mm-sheet: var(--secondary-background-color, #3a3e44);
    --mm-s2: var(--background-color-2, #5b616a);
    --mm-s3: var(--background-color-3, #676d77);
    --mm-text: var(--primary-text-color, #ffffff);
    --mm-dim: var(--secondary-text-color, #c3c7cc);
    --mm-on-accent: var(--text-primary-color, #16202a);
    --mm-slate: var(--slate-color, #8eb1bf);
    --mm-slate-bright: var(--slate-bright, #b6d2dc);
    --mm-sage: var(--sage-color, #8ba680);
    --mm-slate-18: var(--slate-alpha-18, rgba(142, 177, 191, 0.18));
    --mm-sage-18: var(--sage-alpha-18, rgba(139, 166, 128, 0.18));
    --mm-radius: 15px;
    --mm-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    --mm-art-max: 320px;
    display: block;
    min-width: 0;
    max-width: 100%;
    color: var(--mm-text);
    font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, inherit));
    -webkit-tap-highlight-color: transparent;
  }
  * { box-sizing: border-box; }
  button {
    font: inherit;
    color: inherit;
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  ha-icon { display: flex; }
  .root {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }

  /* ── Player surface: art, title + speaker chip, transport, volume ── */
  .player {
    margin: 2px 5px;
    padding: 14px;
    border-radius: var(--mm-radius);
    background: var(--mm-s2);
    box-shadow: var(--mm-shadow);
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
  }
  .art {
    width: 100%;
    max-width: var(--mm-art-max);
    margin: 0 auto;
    aspect-ratio: 1 / 1;
    border-radius: 11px;
    background: var(--mm-s3);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mm-dim);
    --mdc-icon-size: 72px;
  }
  .art img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .title-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: 12px;
    align-items: center;
  }
  .track {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .sub {
    margin-top: 2px;
    font-size: 14px;
    color: var(--mm-dim);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chip {
    height: 36px;
    border-radius: 18px;
    padding: 0 10px 0 10px;
    background: var(--mm-s3);
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    max-width: 52vw;
  }
  .chip .ic { color: var(--mm-slate-bright); --mdc-icon-size: 18px; }
  .chip .chev { color: var(--mm-dim); --mdc-icon-size: 18px; }
  .chip .lbl { overflow: hidden; text-overflow: ellipsis; }

  .progress {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: var(--mm-dim);
    font-variant-numeric: tabular-nums;
    margin-top: -4px;
  }
  .progress .bar {
    height: 4px;
    border-radius: 999px;
    background: var(--mm-s3);
    overflow: hidden;
  }
  .progress .bar > span {
    display: block;
    height: 100%;
    background: var(--mm-slate);
  }

  .transport {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 22px;
  }
  .t-btn {
    width: 60px;
    height: 60px;
    border-radius: 999px;
    background: var(--mm-s3);
    display: flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 30px;
  }
  .t-btn.play {
    width: 68px;
    height: 68px;
    background: var(--mm-slate);
    color: var(--mm-on-accent);
    --mdc-icon-size: 36px;
  }
  .t-btn:active { transform: scale(0.96); }

  .vol-row {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr) 44px;
    gap: 10px;
    align-items: center;
  }
  .sq-btn {
    width: 44px;
    height: 44px;
    border-radius: var(--mm-radius);
    background: var(--mm-s3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mm-slate-bright);
    --mdc-icon-size: 22px;
  }
  .sq-btn.on { background: var(--mm-slate); color: var(--mm-on-accent); }

  /* ── Slider: slate fill over a track; the label is drawn twice, light on
     the track and dark on the fill, so it reads at any level. ── */
  .slider {
    position: relative;
    height: 44px;
    border-radius: var(--mm-radius);
    background: var(--mm-s3);
    overflow: hidden;
    touch-action: none;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }
  .slider.flat { background: var(--mm-s2); }
  .slider .fill {
    position: absolute;
    inset: 0;
    background: var(--mm-slate);
  }
  .slider .lbl {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    font-size: 16px;
    pointer-events: none;
    --mdc-icon-size: 22px;
  }
  .slider .lbl .name { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .slider .lbl .val { font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; }
  .slider .lbl.dark { color: var(--mm-on-accent); }
  .slider.muted .fill { opacity: 0.35; }
  .slider:focus-visible { outline: 2px solid var(--mm-slate-bright); outline-offset: 2px; }

  /* ── 2-up tiles ── */
  .tiles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin: 0 5px;
  }
  .tile {
    padding: 14px;
    border-radius: var(--mm-radius);
    background: var(--mm-s2);
    box-shadow: var(--mm-shadow);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    text-align: left;
    min-width: 0;
  }
  .tile .ic {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 20px;
  }
  .tile .ic.slate { background: var(--mm-slate-18); color: var(--mm-slate-bright); }
  .tile .ic.sage { background: var(--mm-sage-18); color: var(--mm-sage); }
  .tile .big { font-size: 22px; font-weight: 700; }
  .tile .small { font-size: 14px; color: var(--mm-dim); max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* ── Section header (matches the mobile_separator module) ── */
  .sep {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 10px 0 12px;
    min-height: 40px;
  }
  .sep .ic { --mdc-icon-size: 22px; }
  .sep .name { font-size: 20px; font-weight: 700; white-space: nowrap; }
  .sep.small .name { font-size: 16px; }
  .sep.small .ic { --mdc-icon-size: 20px; }
  .sep .line { flex: 1; height: 1px; background: var(--mm-text); opacity: 0.1; }
  .sep .act {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 20px;
  }
  .sep .act.spin ha-icon { animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Favorites strip ── */
  .strip {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 2px 5px 6px;
    scrollbar-width: none;
    overscroll-behavior-x: contain;
  }
  .strip::-webkit-scrollbar { display: none; }
  .fav {
    position: relative;
    flex: 0 0 104px;
    width: 104px;
    height: 104px;
    border-radius: var(--mm-radius);
    overflow: hidden;
    box-shadow: var(--mm-shadow);
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    text-align: left;
    background: linear-gradient(135deg, #00b3a4 0%, #f4d35e 100%);
  }
  .fav.radio { background: linear-gradient(135deg, #c8102e 0%, #1a1c1f 100%); }
  .fav.album { background: linear-gradient(135deg, #2a3540 0%, #6a4ec8 100%); }
  .fav img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .fav::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0) 60%);
  }
  .fav .n, .fav .s { position: relative; z-index: 1; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8); max-width: 100%; }
  .fav .n {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .fav .s { font-size: 12px; opacity: 0.85; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .empty {
    margin: 0 5px;
    padding: 16px;
    border-radius: var(--mm-radius);
    background: var(--mm-s2);
    color: var(--mm-dim);
    font-size: 14px;
    text-align: center;
  }
  .empty.error { color: var(--error-color, #db4437); }

  /* ── Sheets: a native <dialog> in the browser top layer, so no parent
     card's overflow or transform can clip it. Drops from the top like the
     hamburger nav sheet. ── */
  dialog {
    border: 0;
    padding: 0;
    margin: 0 auto;
    inset: 0 0 auto 0;
    width: min(100vw, 600px);
    max-width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-height: 100dvh;
    border-radius: var(--mm-radius) var(--mm-radius) 0 0;
    background: var(--mm-sheet);
    color: var(--mm-text);
    box-shadow: 0 16px 44px rgba(0, 0, 0, 0.55);
    overflow: hidden;
  }
  dialog[open] { display: flex; flex-direction: column; animation: drop 0.25s ease-out; }
  dialog::backdrop { background: rgba(0, 0, 0, 0.45); }
  @keyframes drop {
    from { transform: translateY(-28px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .sheet-hdr {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 12px 8px 16px;
    padding-top: max(12px, env(safe-area-inset-top));
    flex-shrink: 0;
    --mdc-icon-size: 24px;
  }
  .sheet-hdr .name { flex: 1; font-size: 18px; font-weight: 700; }
  .close {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: var(--mm-s2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sheet-body {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0 5px calc(24px + env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  /* Children keep their height; the body scrolls instead of squashing them. */
  .sheet-body > * { flex-shrink: 0; }

  /* Rows used in every sheet */
  .row {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr) 40px;
    align-items: center;
    column-gap: 10px;
    min-height: 56px;
    padding: 8px 12px;
    margin: 0 5px;
    border-radius: var(--mm-radius);
    background: var(--mm-s2);
    box-shadow: var(--mm-shadow);
    text-align: left;
    width: calc(100% - 10px);
  }
  .row .ic {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    --mdc-icon-size: 22px;
  }
  .row .ic.tile { background: var(--mm-s3); color: var(--mm-slate-bright); }
  .row .ic img { width: 100%; height: 100%; object-fit: cover; }
  .row .txt { min-width: 0; }
  .row .n { font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .row .l { font-size: 14px; color: var(--mm-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .row .l.bold { font-weight: 700; }
  .row .l.playing { color: var(--mm-slate-bright); }
  .row .act {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: var(--mm-s3);
    color: var(--mm-slate-bright);
    display: flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 22px;
  }
  .row.on { background: var(--mm-slate); color: var(--mm-on-accent); }
  .row.on .l { color: var(--mm-on-accent); }
  .row.on .act { background: transparent; color: var(--mm-on-accent); --mdc-icon-size: 24px; }
  .row.pending { animation: pulse 1s ease-in-out infinite; }
  @keyframes pulse { 50% { opacity: 0.6; } }
  .row[disabled] { opacity: 0.5; cursor: default; }
  .note { font-size: 14px; color: var(--mm-dim); padding: 2px 17px 6px; }

  .vol-item { margin: 0 5px; }

  /* Library filters */
  .search {
    margin: 2px 5px 4px;
    height: 44px;
    border-radius: var(--mm-radius);
    background: var(--mm-s2);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    color: var(--mm-dim);
    --mdc-icon-size: 20px;
  }
  .search input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--mm-text);
    font: inherit;
    font-size: 16px;
  }
  .pills {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding: 2px 5px 4px;
    scrollbar-width: none;
    flex-shrink: 0;
  }
  .pills::-webkit-scrollbar { display: none; }
  .pill {
    flex-shrink: 0;
    height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    background: var(--mm-s2);
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
  }
  .pill.on { background: var(--mm-slate); color: var(--mm-on-accent); }
  .svc-head {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--mm-dim);
    padding: 10px 17px 2px;
  }

  /* Error toast */
  .toast {
    position: sticky;
    top: 4px;
    z-index: 2;
    margin: 0 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: var(--mm-radius);
    background: var(--error-color, #db4437);
    color: #fff;
    font-size: 14px;
  }
  .toast .msg { flex: 1; min-width: 0; }
  .toast button { font-size: 20px; line-height: 1; opacity: 0.8; }

  button:focus-visible { outline: 2px solid var(--mm-slate-bright); outline-offset: 2px; }
`;
