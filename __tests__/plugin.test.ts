import { fixtures } from "./fixtures";

import { compile } from "./helpers/compile";
import { YarnCheck } from "../src/plugin";
import { log } from "../src/log";

describe("plugin", () => {
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
    it("prints a success message", async () => {
      await compile({
        plugins: [
          new YarnCheck({
            rootDirectory: fixtures.upToDateProject
          })
        ]
      });

      expect(successSpy.mock.calls.join("\n")).toMatchSnapshot();
      expect(warnSpy.mock.calls.join("\n")).toMatchSnapshot();
      expect(errorSpy.mock.calls.join("\n")).toMatchSnapshot();
    });
  });

  describe("a project with a missing package and wrong package", () => {
    it("lists missing packages, wrong versions and a prompt to install", async () => {
      await compile({
        plugins: [
          new YarnCheck({
            rootDirectory: fixtures.missingAndWrongPackage
          })
        ]
      });

      expect(successSpy.mock.calls.join("\n")).toMatchSnapshot();
      expect(warnSpy.mock.calls.join("\n")).toMatchSnapshot();
      expect(errorSpy.mock.calls.join("\n")).toMatchSnapshot();
    });
  });

  describe("forceKill", () => {
    it("rejects the callback when enabled", async () => {
      const config = {
        plugins: [
          new YarnCheck({
            rootDirectory: fixtures.missingAndWrongPackage,
            forceKill: true
          })
        ]
      };

      await expect(compile(config)).rejects.toEqual(
        "Restart webpack after resolving the above issues."
      );
    });
  });
});
