#!/usr/bin/env node
// Rewrites every ?v= query in the wall-panel modules and updates
// version.txt, so the Pi's browser fetches the changed files instead of the
// month-old cached copy. Run this on EVERY deploy.
// Usage: node tools/wall-panel-bump.mjs [version]   (default: current + 1)
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const panel = join(dirname(fileURLToPath(import.meta.url)), '..', 'www', 'wall-panel');
const versionFile = join(panel, 'version.txt');

const current = await readFile(versionFile, 'utf8').then((t) => t.trim()).catch(() => '');
const bumped = Number.isInteger(Number(current)) && current !== '' ? String(Number(current) + 1) : '';
const next = process.argv[2] ?? bumped;

if (!next) {
  console.error(`version.txt holds "${current}": pass the new version explicitly.`);
  process.exit(1);
}
if (/[^\w.-]/.test(next)) {
  console.error(`"${next}" is not a valid version: use letters, digits, dot, dash or underscore.`);
  process.exit(1);
}

// panel.js is the stable loader: it reads version.txt at runtime and must
// keep its own URL unversioned, so it is exempt from rewriting.
const dirs = ['', 'components', 'views', 'overlays'];
const touched = [];
for (const d of dirs) {
  const dir = join(panel, d);
  const files = (await readdir(dir)).filter((f) => (f.endsWith('.js') || f.endsWith('.css')) && !(d === '' && f === 'panel.js'));
  for (const file of files) {
    const path = join(dir, file);
    const src = await readFile(path, 'utf8');
    const out = src.replace(/\?v=[\w.-]+/g, `?v=${next}`);
    if (out !== src) {
      await writeFile(path, out);
      touched.push(join(d, file));
    }
  }
}

await writeFile(versionFile, `${next}\n`);
console.log(`${current || '?'} → ${next}  (${touched.length} file${touched.length === 1 ? '' : 's'} rewritten)`);
