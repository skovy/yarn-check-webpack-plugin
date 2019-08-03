import { compile } from "./helpers/compile";
import { YarnCheck } from "../src/plugin";

describe("plugin", () => {
  it("runs", async () => {
    await compile({ plugins: [new YarnCheck()] });
  });
});
