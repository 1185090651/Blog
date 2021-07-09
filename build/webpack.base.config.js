const { resolve } = require('path')
const config = require('./config.js')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
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
        new ProgressBarPlugin()
    ]
}