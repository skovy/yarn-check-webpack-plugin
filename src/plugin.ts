import * as webpack from "webpack";

import { run, PluginOptions } from "./yarn-check";

class YarnCheck implements webpack.Plugin {
  private options: PluginOptions;

  constructor(options: PluginOptions = {}) {
    this.options = options;
  }

  public apply = (compiler: webpack.Compiler) => {
    compiler.hooks.run.tap("YarnCheck", this.perform);
    compiler.hooks.watchRun.tap("YarnCheck", this.perform);
  };

  private perform = async () => {
    await run(this.options);
  };
}

export { YarnCheck };
