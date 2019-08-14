import { fixtures } from "./fixtures";

import { run } from "../src/yarn-check";
import { log } from "../src/log";

describe("yarn-check", () => {
  let successSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    successSpy = jest.spyOn(log, "success").mockImplementation();
    warnSpy = jest.spyOn(log, "warn").mockImplementation();
    errorSpy = jest.spyOn(log, "error").mockImplementation();
  });

  afterEach(() => {
    successSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  describe("a project that is up to date", () => {
    it("lists missing packages, wrong versions and a prompt to install", async () => {
      await run({ rootDirectory: fixtures.upToDateProject });

      expect(successSpy.mock.calls.join("\n")).toMatchSnapshot();
      expect(warnSpy.mock.calls.join("\n")).toMatchSnapshot();
      expect(errorSpy.mock.calls.join("\n")).toMatchSnapshot();
    });
  });

  describe("a project with a missing package and wrong package", () => {
    it("lists missing packages, wrong versions and a prompt to install", async () => {
      await run({ rootDirectory: fixtures.missingAndWrongPackage });

      expect(successSpy.mock.calls.join("\n")).toMatchSnapshot();
      expect(warnSpy.mock.calls.join("\n")).toMatchSnapshot();
      expect(errorSpy.mock.calls.join("\n")).toMatchSnapshot();
    });
  });
});