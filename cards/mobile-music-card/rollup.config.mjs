// Builds one self-contained ES module straight into the Home Assistant
// www/ folder, which HA serves at /local/. The built file is committed, so
// a git pull on the HA host is the whole deploy (no HACS, no build there).
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { readFileSync } from "node:fs";

const dev = process.env.ROLLUP_WATCH;
const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url)));

export default {
  input: "src/mobile-music-card.ts",
  output: {
    file: "../../www/mobile-music-card/mobile-music-card.js",
    format: "es",
    sourcemap: dev ? "inline" : false,
    inlineDynamicImports: true,
    banner: `/*! mobile-music-card v${version} | built from cards/mobile-music-card */`,
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json" }),
    !dev && terser({ format: { comments: /^!/ } }),
  ],
};
