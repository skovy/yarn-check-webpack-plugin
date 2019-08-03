import { resolve } from "path";

import { run } from "../src/index";

it("simple", async () => {
  await run({ rootDirectory: resolve(__dirname, "simple") });
});
