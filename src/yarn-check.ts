import { spawn } from "child_process";
import chalk from "chalk";

import { log } from "./log";

const PACKAGE_NOT_INSTALLED = /\"(.*)\" not installed/;
const PACKAGE_WRONG_VERSION = /\"(.*)\" is wrong version: expected \"(.*)\", got \"(.*)\"/;

export interface PluginOptions {
  /**
   * The root directory to run the commands. This should be the directory that
   * contains `package.json`, `yarn.lock` and `node_modules`. By default, it will
   * run in the current directory. This option only needs to be set if this
   * plugin is being run in a different directory.
   */
  rootDirectory?: string;

  /**
   * Ignore any missing or wrong version packages from this plugins warnings.
   * This argument
   */
  exclude?: RegExp;
}

interface Package {
  name: string;
  version?: {
    expected: string;
    got: string;
  };
}

const shouldPreventWarning = (
  pkg: string,
  exclude: RegExp | undefined
): boolean => {
  if (!exclude) {
    return false;
  }

  return exclude.test(pkg);
};

const runCheckVerifyTree = async ({
  rootDirectory,
  exclude
}: PluginOptions): Promise<{
  packagesNotInstalled: Package[];
  packagesWrongVersion: Package[];
}> => {
  return new Promise(resolve => {
    const packagesNotInstalled: Package[] = [];
    const packagesWrongVersion: Package[] = [];

    const yarnCheckVerifyTree = spawn(`yarn`, [`check`, `--verify-tree`], {
      cwd: rootDirectory,
      env: process.env
    });

    yarnCheckVerifyTree.stderr.on("data", data => {
      const err = data.toString();

      const packageNotInstalled = err.match(PACKAGE_NOT_INSTALLED);
      if (packageNotInstalled) {
        const name = packageNotInstalled[1];

        if (shouldPreventWarning(name, exclude)) return;

        packagesNotInstalled.push({ name });
      }

      const packageWrongVersion = err.match(PACKAGE_WRONG_VERSION);
      if (packageWrongVersion) {
        const [, name, expected, got] = packageWrongVersion;

        if (shouldPreventWarning(name, exclude)) return;

        packagesWrongVersion.push({ name, version: { expected, got } });
      }
    });

    yarnCheckVerifyTree.on("exit", () => {
      resolve({ packagesNotInstalled, packagesWrongVersion });
    });
  });
};

/**
 * Run the yarn check command, parse any missing or incorrect packages, log
 * the issues and any other helpful prompts.
 * 
 * @param options an object to configure how the yarn check is ran
 * 
 * @returns a promise that resolves to a boolean. `true` if the method ran 
 * successfully with no issues. `false` if there was one more missing or 
 * incorrect packages.
 */
export const run = async (options: PluginOptions = {}): Promise<boolean> => {
  const {
    packagesNotInstalled,
    packagesWrongVersion
  } = await runCheckVerifyTree(options);

  if (!packagesNotInstalled.length && !packagesWrongVersion.length) {
    log.success(`All packages installed and up to date.`);
    return true;
  }

  if (packagesNotInstalled.length) {
    log.warn(`Missing packages:`);
    packagesNotInstalled.map(pkg => log.warn(`  - ${pkg.name}`));
  }

  if (packagesWrongVersion.length) {
    log.warn(`Wrong packages:`);
    packagesWrongVersion.map(pkg =>
      log.warn(
        `  - ${pkg.name} (expected ${pkg.version!.expected} but got ${
          pkg.version!.got
        })`
      )
    );
  }

  log.error(
    `Please run ${chalk.bold(`\`yarn install --check-files\``)} to update.`
  );

  return false;
};
