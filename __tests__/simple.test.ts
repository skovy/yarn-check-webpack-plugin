import { resolve } from "path";

import { run } from "../src/index";
import { log } from "../src/log";

describe("simple", () => {
  const rootDirectory = resolve(__dirname, "simple");

  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(log, "warn").mockImplementation();
    errorSpy = jest.spyOn(log, "error").mockImplementation();
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it("lists missing packages, wrong versions and a prompt to install", async () => {
    await run({ rootDirectory });

    expect(warnSpy.mock.calls.join("\n")).toMatchSnapshot();
    expect(errorSpy.mock.calls.join("\n")).toMatchSnapshot();
  });
});
