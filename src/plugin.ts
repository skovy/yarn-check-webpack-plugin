import * as webpack from "webpack";

import { run, PluginOptions } from "./yarn-check";

class YarnCheck implements webpack.Plugin {
  private options: PluginOptions;

  constructor(options: PluginOptions = {}) {
    this.options = options;
  }

  public apply = (compiler: webpack.Compiler) => {
    compiler.hooks.run.tapAsync("YarnCheck", this.perform);
    compiler.hooks.watchRun.tapAsync("YarnCheck", this.perform);
  };

  private perform = async (
    _compiler: webpack.Compiler,
    callback: () => void
  ) => {
    await run(this.options);
    callback();
  };
}

export { YarnCheck };
