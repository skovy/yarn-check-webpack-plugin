import webpack from "webpack";

import { run } from ".";

class YarnCheck implements webpack.Plugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.afterCompile.tapAsync("YarnCheck", async (_, callback) => {
      await run();
      callback();
    });
  }
}

export { YarnCheck };
