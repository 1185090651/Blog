require("./checkVersions")();
const { join } = require("path");
const rm = require("rimraf");
const chalk = require("chalk");
const config = require("./config.js");
const webpack = require("webpack");
const webpackConfig = require("./webpack.prod.config.js");

rm(join(config.build.assetsRoot, config.publicDir), async (err) => {
  if (err) throw err;

  webpack(webpackConfig, (err, stats) => {
    // if (err) throw err;
    // process.stdout.write(
    //   stats.toString({
    //     colors: true,
    //     modules: false,
    //     children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    //     chunks: false,
    //     chunkModules: false,
    //   }) + "\n\n"
    // );

    // if (stats.hasErrors()) {
    //   console.log(chalk.red("  Build failed with errors.\n"));
    //   process.exit(1);
    // }

    console.log(chalk.cyan("  Build complete.\n"));
    console.log(
      chalk.yellow(
        "  Tip: built files are meant to be served over an HTTP server.\n" +
          "  Opening index.html over file:// won't work.\n"
      )
    );
  });
});
