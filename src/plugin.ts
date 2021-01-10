import * as webpack from "webpack";

import { run, PluginOptions } from "./yarn-check";

class YarnCheck implements webpack.WebpackPluginInstance {
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
    callback: (error?: any) => void
  ) => {
    const successful = await run(this.options);

    if (!successful && this.options.forceKill) {
      callback("Restart webpack after resolving the above issues.");
    } else {
      callback();
    }
  };
}

export { YarnCheck };
