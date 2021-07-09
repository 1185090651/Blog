const { merge } = require("webpack-merge");
const config = require("./config.js");
const utils = require("./utils.js");
const baseWebpackConfig = require("./webpack.base.config.js");

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  //   devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
    crossOriginLoading: "anonymous",
  },
});

// if (config.build.productionGzip) {
//   const CompressionWebpackPlugin = require("compression-webpack-plugin");

//   webpackConfig.plugins.push(
//     new CompressionWebpackPlugin({
//       asset: "[path].gz[query]",
//       algorithm: "gzip",
//       test: new RegExp(
//         "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
//       ),
//       threshold: 10240,
//       minRatio: 0.8,
//     })
//   );
// }

// if (config.build.bundleAnalyzerReport) {
//   const BundleAnalyzerPlugin =
//     require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
//   webpackConfig.plugins.push(new BundleAnalyzerPlugin());
// }

module.exports = webpackConfig;