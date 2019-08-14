import { fixtures } from "./fixtures";

import { run } from "../src/yarn-check";
import { log } from "../src/log";

describe("yarn-check", () => {
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(log, "warn").mockImplementation();
    errorSpy = jest.spyOn(log, "error").mockImplementation();
  });

  afterEach(() => {
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  describe("project with a missing package and wrong package", () => {
    it("lists missing packages, wrong versions and a prompt to install", async () => {
      await run({ rootDirectory: fixtures.missingAndWrongPackage });

      expect(warnSpy.mock.calls.join("\n")).toMatchSnapshot();
      expect(errorSpy.mock.calls.join("\n")).toMatchSnapshot();
    });
  });
});
