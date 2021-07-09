const path = require('path')
const config = require('./config.js')

// 跨平台静态资源地址
exports.assetsPath = function(_path) {
    return path.posix.join(config.publicDir, _path)
}