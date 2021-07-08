const { resolve } = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
module.exports = {
    plugins: [
        new ProgressBarPlugin()
    ]
}