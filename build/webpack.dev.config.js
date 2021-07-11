const utils = require("./utils");
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const config = require("./config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.config.js");


const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  devServer: {
    port: 8000,
    hot: true,
    quiet: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve("./dist/index.html"), // html模板的生成路径
      template: resolve("./public/index.html"), //html模板
      favicon: resolve("./public/favicon.ico"),
      inject: true, // true：默认值，script标签位于html文件的 body 底部
      hash: true, // 在打包的资源插入html会加上hash
    }),
  ],
});

module.exports = devWebpackConfig;
