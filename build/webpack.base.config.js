const { resolve } = require('path');
const config = require('./config.js');
const utils = require('./utils.js');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// common function to get style loaders
const getStyleLoaders = (isModule, preProcessor) => {
    const loaders = [
        config.ENV === 'dev' ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
        {
            loader: require.resolve('css-loader'),
            options: isModule ? {
                modules: {
                    localIdentName: '[local]_[hash:base64:5]',
                }
            } : {}
        },
        preProcessor && require.resolve(preProcessor)
    ].filter(Boolean);
    return loaders;
};

module.exports = {
    entry: {
        app: resolve('/src/index.tsx'),
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config[config.ENV].publicPath,
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                include: [
                    resolve('src'),
                    resolve('node_modules/webpack-dev-server/client'),
                ],
            },
            {
                test: cssRegex,
                exclude: cssModuleRegex,
                use: getStyleLoaders()
            },
            {
                test: cssModuleRegex,
                use: getStyleLoaders(true)
            },
            {
                test: sassRegex,
                exclude: sassModuleRegex,
                use: getStyleLoaders(false, 'sass-loader')
            },
            {
                test: sassModuleRegex,
                use: getStyleLoaders(true, 'sass-loader')
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    },
                },
                generator: {
                    filename: utils.assetsPath('img/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    },
                },
                generator: {
                    filename: utils.assetsPath('media/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    },
                },
                generator: {
                    filename: utils.assetsPath('font/[name].[hash:7].[ext]'),
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', 'jsx', '.json', '...'], // The option will override the default array, use ... to access the default extensions
        alias: {
            '@': resolve('src'),
            public: resolve('public'),
            '~': resolve('node_modules'),
        },
    },
    plugins: [new WebpackBar(),
        new ESLintPlugin({
            // Plugin options
            extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
            // formatter: require.resolve('react-dev-utils/eslintFormatter'),
            eslintPath: require.resolve('eslint'),
            // failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
            context: resolve('src'),
            cache: true,
            // cacheLocation: path.resolve(
            //   paths.appNodeModules,
            //   '.cache/.eslintcache'
            // ),
            // ESLint class options
            // cwd: paths.appPath,
            resolvePluginsRelativeTo: __dirname,
            baseConfig: {
                // extends: [require.resolve('eslint-config-react-app/base')],
                // rules: {
                //   ...(!hasJsxRuntime && {
                //     'react/react-in-jsx-scope': 'error',
                //   }),
                // },
            },
        }), ],
};
