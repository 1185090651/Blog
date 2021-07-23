const { resolve, posix } = require('path');


module.exports = {
    // 当前环境
    ENV: process.env.NODE_ENV === 'production' ? 'build' : 'dev',
    publicDir: 'public',
    assetsPath: function (_path) {
        return posix.join(this.publicDir, _path);
    },
    dev: {
        publicPath: '/',
        // Various Dev Server settings
        host: '127.0.0.1', // can be overwritten by process.env.HOST
        port: 3000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        proxy: {
            '/api': {
                target: 'http://localhost:9527',
                pathRewrite: {
                    '/api': '/'
                },
                changeOrigin: true
            }
        },

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
     * Source Maps
     */
        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true,
    },
    build: {
    // Paths
        assetsRoot: resolve('dist'),
        publicPath: '/',

        /**
     * Source Maps
     */
        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

    // View the bundle analyzer report after build finishes:
    // Set to `true` or `false` to always turn it on or off
    // bundleAnalyzerReport: true,
    }
};
