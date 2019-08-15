import typescript from "rollup-plugin-typescript2";
import builtins from 'builtin-modules'

import pkg from "./package.json";

// All dependencies and node built ins are considered external dependencies.
const EXTERNALS = [...Object.keys(pkg.dependencies), ...builtins]

const config = {
  input: "src/index.ts",
  output: {
    file: pkg.main,
    format: "cjs"
  },
  external: EXTERNALS,
  // Necessary to avoid "(!) `this` has been rewritten to `undefined`"
  context: null,
  plugins: [
    typescript({
      // Use the current version of TypeScript installed.
      typescript: require("typescript")
    })
  ]
};

export default config;
