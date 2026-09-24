// Constants — palette mirrors the dark variant from the React mockup.
// Exposed as CSS custom properties on the card root so themes can override.

export const CARD_VERSION = "0.3.0";
export const CARD_TAG = "wall-panel-sonos-card";
export const EDITOR_TAG = "wall-panel-sonos-card-editor";

export const THEME_DARK = {
  text: "#ffffff",
  textDim: "rgba(255,255,255,0.62)",
  bg: "#1a1c1f",
  bg2: "#2a2d31",
  card: "#3a3d42",
  card2: "#4a4d52",
  accent: "#8EB1BF",
  accent2: "#8BA680",
  warning: "#EA4D3D",
  alert: "#FF8C00",
  radius: "28px",
  radiusPill: "999px",
};

// Pretty banner in the dev console
/* eslint-disable no-console */
console.info(
  `%c WALL-PANEL-SONOS-CARD %c v${CARD_VERSION} `,
  "color:#1a1c1f;background:#8EB1BF;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px",
  "color:#fff;background:#3a3d42;padding:2px 6px;border-radius:0 4px 4px 0",
);
