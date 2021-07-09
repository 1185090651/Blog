const { resolve } = require('path')
const config = require('./config.js')
const WebpackBar = require('webpackbar')

module.exports = {
    entry: {
        app: resolve('/src/index.ts')
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config[config.ENV].publicPath
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': resolve('src'),
          'public': resolve('public'),
        }
    },
    plugins: [
        new WebpackBar()
    ]
}