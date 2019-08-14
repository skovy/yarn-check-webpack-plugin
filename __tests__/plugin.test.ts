import { compile } from "./helpers/compile";
import { YarnCheck } from "../src/plugin";
import { resolve } from "path";

describe("plugin", () => {
  it("runs", async () => {
    await compile({
      plugins: [
        new YarnCheck({
          rootDirectory: resolve(
            __dirname,
            "fixtures",
            "missing-and-wrong-package"
          )
        })
      ]
    });
  });
});
