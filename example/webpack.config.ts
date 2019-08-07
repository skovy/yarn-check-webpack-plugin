import * as webpack from "webpack";
import * as path from "path";

import { YarnCheck } from "../src";

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [new YarnCheck()]
};

export default config;
