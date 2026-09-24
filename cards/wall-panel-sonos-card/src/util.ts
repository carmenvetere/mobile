// Small shared utilities.

// Percent-encode characters that would break out of a CSS `url("...")`
// string. HA-supplied entity_picture URLs are already safe, but user-
// supplied station_art.image / favorite art values pass through the same
// interpolation, so we defensively encode quotes, backslashes, and any
// stray newlines before handing the string to the browser.
export const cssUrl = (u: string): string =>
  `url("${u.replace(/[\r\n"\\]/g, c => encodeURIComponent(c))}")`;
