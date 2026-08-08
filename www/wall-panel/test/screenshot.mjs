// Screenshots of every view, overlay and screensaver mode against the
// offline harness, at the panel's native 720×1280. Exits nonzero on any
// console error — cheap regression coverage for a geometry-sensitive
// design. Usage:
//   npx serve www -l 8899 &        (any static server on www/)
//   node www/wall-panel/test/screenshot.mjs
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:8899/wall-panel/test/test.html';
const OUT = process.env.OUT || join(dirname(fileURLToPath(import.meta.url)), 'shots');
await mkdir(OUT, { recursive: true });

const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const errors = [];
const pg = await b.newPage({ viewport: { width: 720, height: 1280 } });
pg.on('pageerror', (e) => errors.push(String(e)));
pg.on('console', (m) => {
  if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text());
});

await pg.goto(BASE);
await pg.waitForFunction('window.__READY === true');
await pg.waitForTimeout(800);

const shot = async (name) => {
  await pg.waitForTimeout(350);
  await pg.screenshot({ path: join(OUT, name + '.png') });
  console.log('shot', name);
};
const nav = async (n) => { await pg.click(`.wp-footer .wp-nav-item:nth-child(${n})`); };
const set = async (id, state, attrs) => {
  await pg.evaluate(([i, s, a]) => window.__test.set(i, s, a), [id, state, attrs || null]);
};

// 1. the six footer views
await shot('home');
await nav(2); await shot('shades');
await nav(3); await shot('lights');
await nav(4); await shot('climate');
await pg.click('.wp-select-trigger'); await shot('climate-mode-menu');
await pg.click('.wp-select-trigger'); // close
await nav(5); await shot('music');
await nav(6); await shot('settings');

// 2. alarm via the header shield
await pg.click('.wp-shield'); await shot('alarm-disarmed');

// 3. arming: exit-delay countdown + progress bar
await set('alarm_control_panel.alarmo', 'arming', { arm_mode: 'armed_away', delay: 60 });
await shot('alarm-arming');

// 4. refused command: Alarmo's failed-to-arm event names the open sensors
await set('alarm_control_panel.alarmo', 'disarmed', { arm_mode: null });
await pg.evaluate(() => window.__test.fireEvent('alarmo_failed_to_arm', {
  reason: 'open_sensors', sensors: ['binary_sensor.front_door', 'binary_sensor.mudroom_garage_door'],
}));
await shot('alarm-failed');

// 5. open-door heads-up, read live from the door sensors (one door, then two)
await pg.reload(); await pg.waitForFunction('window.__READY === true'); await pg.waitForTimeout(600);
await pg.click('.wp-shield');
await set('binary_sensor.kitchen_french_doors', 'on');
await shot('alarm-door-open');
await set('binary_sensor.front_door', 'on');
await shot('alarm-doors-open');
await set('binary_sensor.kitchen_french_doors', 'off');
await set('binary_sensor.front_door', 'off');

// 5b. Alarmo itself unavailable — the one case that dims the segments
await set('alarm_control_panel.alarmo', 'unavailable');
await shot('alarm-unavailable');

// 5c. triggered — the one state the segments can't show, so the state line
// comes back for it
await set('alarm_control_panel.alarmo', 'triggered', { arm_mode: 'armed_away' });
await shot('alarm-triggered');
await set('alarm_control_panel.alarmo', 'disarmed', {});

// 6. armed: home shows the disarm keypad and sheds two scenes
await set('alarm_control_panel.alarmo', 'armed_home', { arm_mode: 'armed_home' });
await shot('alarm-armed');
await nav(1); await shot('home-armed');
await set('alarm_control_panel.alarmo', 'disarmed', {});

// 6b. outage: banner on home + two scenes shed
await set('binary_sensor.bayberry_grid_status', 'off');
await shot('home-outage');

// 7. overlays
await pg.click('.wp-notif-ind'); await shot('overlay-notifications');
await pg.click('.wp-overlay.notif', { position: { x: 10, y: 10 } }); // scrim closes
await pg.click('.wp-speaker-label'); await shot('overlay-speakers');
await pg.click('.wp-overlay.speakers', { position: { x: 10, y: 10 } });

// 8. screensaver — music mode (still playing), then clock mode + outage alert
await nav(6);
await pg.click('.wp-settings-row.tappable'); await shot('screensaver-music');
await pg.click('.wp-ss'); // wake — must land on Home, not the view we left
await shot('wake-lands-home');
const woke = await pg.evaluate(() => !!document.querySelector('.wp-footer .wp-nav-item:first-child')?.classList.contains('active'));
if (!woke) errors.push('wake did not return to Home');
await set('media_player.media_room', 'paused', {});
await nav(6);
await pg.click('.wp-settings-row.tappable'); await shot('screensaver-clock');
await pg.click('.wp-ss');
await set('binary_sensor.bayberry_grid_status', 'on');

console.log('ERRORS:', JSON.stringify(errors));
await b.close();
process.exit(errors.length ? 1 : 0);
