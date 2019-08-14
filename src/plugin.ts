import webpack from "webpack";

import { run, PluginOptions } from "./yarn-check";

class YarnCheck implements webpack.Plugin {
  private options: PluginOptions;

  constructor(options: PluginOptions = {}) {
    this.options = options;
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.afterCompile.tapAsync("YarnCheck", async (_, callback) => {
      await run(this.options);
      callback();
    });
  }
}

export { YarnCheck };
