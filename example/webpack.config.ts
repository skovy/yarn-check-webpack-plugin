import webpack from "webpack";

import { YarnCheck } from "../src";

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.ts",
  plugins: [new YarnCheck()]
};

export default config;
