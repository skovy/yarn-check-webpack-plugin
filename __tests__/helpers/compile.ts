import path from "path";
import webpack, { Configuration } from "webpack";
import MemoryFS from "memory-fs";

export const compile = ({ plugins = [] }: Partial<Configuration> = {}) => {
  const config: Configuration = {
    mode: "development",
    devtool: false,
    context: path.resolve(__dirname, "..", "simple"),
    entry: `./index.ts`,
    output: {
      path: path.resolve(__dirname, `../outputs/`),
      filename: "[name].bundle.js"
    },
    module: {
      rules: []
    },
    plugins: plugins
  };

  const compiler = webpack(config);

  compiler.outputFileSystem = new MemoryFS();

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      return resolve(stats);
    })
  );
};
