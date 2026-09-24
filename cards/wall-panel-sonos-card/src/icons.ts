// SVG icon set used by the card. Returned as Lit svg`` templates so they
// inherit currentColor and aren't escaped.
import { svg } from "lit";

export const iconStar = svg`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L14.6 8.6 L22 9.3 L16.5 14.2 L18.2 21.5 L12 17.8 L5.8 21.5 L7.5 14.2 L2 9.3 L9.4 8.6 Z"/></svg>`;

export const iconSpeaker = svg`<svg width="20" height="22" viewBox="0 0 22 26" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="2" width="16" height="22" rx="3"/><circle cx="11" cy="16" r="4"/><circle cx="11" cy="7" r="1.3" fill="currentColor"/></svg>`;

export const iconChev = svg`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9 L12 15 L18 9"/></svg>`;

// Official MDI paths — visually balanced, match the rest of the HA icon set.
export const iconVolDown = svg`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9V15H7L12 20V4L7 9H3M14 10.5H23V13.5H14V10.5Z"/></svg>`;
export const iconVolUp = svg`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9V15H7L12 20V4L7 9H3M14 13.5V10.5H17V7.5H20V10.5H23V13.5H20V16.5H17V13.5H14Z"/></svg>`;
export const iconVol = svg`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3 9H7L12 4V20L7 15H3V9Z"/></svg>`;

export const iconPrev = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5 H8 V19 H6 Z M9 12 L20 5 V19 Z"/></svg>`;
export const iconNext = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5 H18 V19 H16 Z M4 19 L15 12 L4 5 Z"/></svg>`;
export const iconPlay = svg`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5 V19 L19 12 Z"/></svg>`;
export const iconPause = svg`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>`;

export const iconStation = svg`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7 H21 V19 H3 Z M3 7 L17 3 V5"/><circle cx="17" cy="13" r="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`;
export const iconAlbum = svg`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.2"/></svg>`;
export const iconPlaylist = svg`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6 H15 V8 H3 Z M3 11 H15 V13 H3 Z M3 16 H11 V18 H3 Z M17 11 V20 L21 17 V8 L17 11 Z"/></svg>`;

export const iconLink = svg`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17 H7 A4 4 0 0 1 7 9 H9 M15 9 H17 A4 4 0 0 1 17 17 H15 M9 13 H15"/></svg>`;
export const iconCheck = svg`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 L10 18 L20 6"/></svg>`;
export const iconEq = svg`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 18 H4 V20 H2 Z M7 14 H9 V20 H7 Z M12 10 H14 V20 H12 Z M17 6 H19 V20 H17 Z"/></svg>`;
export const iconVolMuted = svg`<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M3 9V15H7L12 20V4L7 9H3"/><path stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none" d="M15.5 9.5 L21 15 M21 9.5 L15.5 15"/></svg>`;
