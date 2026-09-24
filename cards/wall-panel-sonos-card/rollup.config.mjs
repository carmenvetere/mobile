import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const dev = process.env.ROLLUP_WATCH;

export default {
  input: "src/wall-panel-sonos-card.ts",
  output: {
    // Built straight into Home Assistant's www/ folder (served at /local/).
    // The built file is committed, so a git pull on the HA host deploys it.
    file: "../../www/wall-panel-sonos-card/wall-panel-sonos-card.js",
    format: "es",
    sourcemap: dev ? "inline" : false,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    !dev && terser({ format: { comments: false } }),
  ],
};
