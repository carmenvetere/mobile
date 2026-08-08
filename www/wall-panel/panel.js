// Stable entry point: configuration.yaml's panel_custom points here and
// this file never changes, so updating the panel never means editing
// configuration.yaml or restarting HA again. version.txt (read uncached)
// decides which build to import — bump it with tools/wall-panel-bump.mjs
// on every deploy, or the Pi's browser will happily serve week-old code.
const v = await fetch('/local/wall-panel/version.txt', { cache: 'no-store' })
  .then((r) => (r.ok ? r.text() : ''))
  .catch(() => '');

await import(`./wall-panel.js?v=${v.trim() || '1'}`);
