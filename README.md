# yarn-check-webpack-plugin

[![npm version](https://badge.fury.io/js/yarn-check-webpack-plugin.svg)](https://badge.fury.io/js/yarn-check-webpack-plugin)
[![Build Status](https://travis-ci.org/skovy/yarn-check-webpack-plugin.svg?branch=master)](https://travis-ci.org/skovy/yarn-check-webpack-plugin)

When working in a large codebase it's likely someone else will add a new package or upgrade an existing package. This often leads to a convoluted webpack error or runtime error as a result of a missing or outdated package.

The intent of this plugin is to be run in development with webpack so as you checkout different branches or recent changes in version control this plugin can remind you when there are missing or outdated packages.

For example, say a webpack watch process is running and started on the `master` branch. In the process of working or reviewing code the branch `add-underscore` is checked out (`git checkout add-underscore`). In this case, the branch name gives it away but sometimes it's not immediately obvious that a package was added or changed. This plugin will list the differences between the installed versus expected packages. In this specific example, the `forceKill` option is enabled so the webpack process also exits.

![Demo of yarn-check-webpack-plugin](./docs/yarn-check-webpack-plugin.gif)

## Getting Started

Install the package:

```bash
yarn add -D yarn-check-webpack-plugin
npm install --save-dev yarn-check-webpack-plugin
```

And add the plugin to `webpack.config.js`:

```javascript
const { YarnCheck } = require("yarn-check-webpack-plugin");

module.exports = {
  // Additional configuration...
  plugins: [new YarnCheck()]
};
```

Or, to `webpack.config.ts`:

```typescript
import * as webpack from "webpack";
import { YarnCheck } from "yarn-check-webpack-plugin";

const config: webpack.Configuration = {
  // Additional configuration...
  plugins: [new YarnCheck()]
};

module.exports = config;
```

Then, run `webpack` as normal.

### How do I verify it's working?

Find a random `node_module` (eg: `ls node_modules`) and remove it (eg: `rm -rf node_modules/lodash`) and trigger a rebuild _(by changing a file if in watch mode)_ or by running webpack again.

The output should include something that looks like:

```
Missing packages:
  - lodash
Please run `yarn install --check-files` to update.
```

## Configuration

All configuration is optional. Pass a configuration object when initializing to change any of the options.

For example:

```typescript
new YarnCheck({
  rootDirectory: "./another/directory",
  exclude: /underscore/,
  forceKill: true
});
```

### `rootDirectory`

**Type**: String

**Description**: The root directory to run the commands. This should be the directory that contains `package.json`, `yarn.lock` and `node_modules`. By default, it will run in the current directory. This option only needs to be set if this plugin is being run in a different directory.

### `exclude`

**Type**: RegExp

**Description**: Ignore warnings for any missing or wrong version packages that match this regex expression.

### `forceKill`

**Type**: Boolean

**Description**: Force the webpack process to exit if there is an error. This is desirable if you want to ensure the proper packages are installed before continuing.
