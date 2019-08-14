# yarn-check-webpack-plugin

When working in a large codebase it's likely someone else will add a new package
or upgrade an existing package. This often leads to a convoluted webpack error
or runtime error as a result of a missing or outdated package.

The intent of this plugin is to run be run in development with webpack so as
you possibly checkout different branches or recent changes in version control 
this plugin can remind you when there are missing or outdated packages.