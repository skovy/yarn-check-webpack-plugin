# yarn-check-webpack-plugin

[![npm version](https://badge.fury.io/js/yarn-check-webpack-plugin.svg)](https://badge.fury.io/js/yarn-check-webpack-plugin)
[![Build Status](https://travis-ci.org/skovy/yarn-check-webpack-plugin.svg?branch=master)](https://travis-ci.org/skovy/yarn-check-webpack-plugin)

When working in a large codebase it's likely someone else will add a new package or upgrade an existing package. This often leads to a convoluted webpack error or runtime error as a result of a missing or outdated package.

The intent of this plugin is to be run in development with webpack so as you checkout different branches or recent changes in version control this plugin can remind you when there are missing or outdated packages.

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
new YarnCheck({ rootDirectory: "./another/directory", exclude: /underscore/ });
```

### `rootDirectory`

**Type**: String

**Description**: The root directory to run the commands. This should be the directory that contains `package.json`, `yarn.lock` and `node_modules`. By default, it will run in the current directory. This option only needs to be set if this plugin is being run in a different directory.

### `exclude`

**Type**: RegExp

**Description**: Ignore warnings for any missing or wrong version packages that match this regex expression.
