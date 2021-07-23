const { merge } = require("webpack-merge");
const { resolve } = require("path");
const config = require("./config.js");
const portfinder = require("portfinder");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const webpackDevServer = require("webpack-dev-server");
const baseWebpackConfig = require("./webpack.base.config.js");

let PORT = Number(process.env.PORT) || config.dev.port;

portfinder.getPort({port: PORT}, (err, port) => {
  if (err) throw err;
  // publish the new Port, necessary for e2e tests
  PORT = process.env.PORT = port;
  const devWebpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,
    plugins: [
      new HtmlWebpackPlugin({
        filename: resolve("./dist/index.html"), // html模板的生成路径
        template: resolve("./public/index.html"), //html模板
        favicon: resolve("./public/favicon.ico"),
        inject: true, // true：默认值，script标签位于html文件的 body 底部
        hash: true, // 在打包的资源插入html会加上hash
      }),
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `Your application is running here: http://localhost:${PORT}`,
          ],
        },
      }),
    ],
  });
  const server = new webpackDevServer(webpack(devWebpackConfig), {
    publicPath: '/',
    compress: true,
    hot: true,
    quiet: true,
    proxy: config.dev.proxy,
  });
  server.listen(PORT)
});
