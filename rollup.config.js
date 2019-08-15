import typescript from "rollup-plugin-typescript2";
import builtins from 'builtin-modules'

import pkg from "./package.json";

// All dependencies and peer dependencies are considered external dependencies.
// This means that the consuming application must explicitly have the necessary
// peer dependencies defined. The dependencies of this package are defined as
// part of this package and will be installed when this package is installed.
// This is done to avoid including these as part of this bundle to keep this
// bundle slim and allow the consuming application to deduplicate packages if
// possible.
const EXTERNALS = [...Object.keys(pkg.dependencies), ...builtins]

const config = {
  input: "src/index.ts",
  output: {
    file: pkg.main,
    format: "es"
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
