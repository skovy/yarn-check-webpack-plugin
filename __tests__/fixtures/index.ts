import { resolve } from "path";

export const fixtures = {
  missingAndWrongPackage: resolve(__dirname, "missing-and-wrong-package"),
  upToDateProject: resolve(__dirname, "up-to-date-project")
};
