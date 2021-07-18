const { resolve } = require("path");
const config = require("./config.js");
const utils = require("./utils.js");
const WebpackBar = require("webpackbar");

module.exports = {
  entry: {
    app: resolve("/src/index.tsx"),
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath: config[config.ENV].publicPath,
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
        include: [
          resolve("src"),
          resolve("node_modules/webpack-dev-server/client"),
        ],
      },
      {
        test: /\.css$/,
        use: [
          // 创建 <style></style>
          {
            loader: "style-loader",
          },
          // 转换css
          {
            loader: "css-loader"
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader", // 编译 scss -> CSS
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]"),
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", "jsx", ".json"],
    alias: {
      "@": resolve("src"),
      public: resolve("public"),
      "~": resolve("node_modules"),
    },
  },
  plugins: [new WebpackBar()],
};
