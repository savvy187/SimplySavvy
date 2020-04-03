const path = require('path');
const webpack = require('webpack');
const HtmlWeboackPlugin = require('html-webpack-plugin');
const ManifestWeboackPlugin = require('webpack-manifest-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const PATHS = {
    DIST: path.resolve(__dirname, 'dist/client'),
    CLIENT: path.resolve(__dirname, 'src/client'),
    COMPONENTS: path.resolve(__dirname, 'src/client/components'),
    CONTAINERS: path.resolve(__dirname, 'src/client/containers'),
    HOOKS: path.resolve(__dirname, 'src/client//hooks'),
    TEST: path.resolve(__dirname, 'test'),
    JEST: path.resolve(__dirname, 'jest')
};

const commonPlugins = [
    new CleanWebpackPlugin(),
    new HtmlWeboackPlugin({
        template: 'src/client/index.template.html',
        filename: 'index.html',
        cache: true,
        inject: true
    }),
    new ManifestWeboackPlugin({
        filter: (fileDescriptor) => !/(license|map)/ig.test(fileDescriptor)
    })
];

const devPlugins = [
    new webpack.WatchIgnorePlugin([
        /webpack\.config\.js/,
        /webpack\.server\.config\.js/
    ])
];

const devOptions = {
    devtool: 'eval-source-map',
    devServer: {
        port: 9999,
        hot: true,
        open: true,
        historyApiFallback: {
            index: '/'
        },
        clientLogLevel: 'debug',
        proxy: {
            '/api': 'http://localhost:9998'
        },
        watchOptions: {
            poll: 1000
        }
    },
    optimization: {
        minimize: false
    }
};

const webPackConfig = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        simplySavvy: `${PATHS.CLIENT}/index.js`
    },
    output: {
        path: PATHS.DIST,
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                },
                include: [PATHS.CLIENT]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: isDevelopment ? commonPlugins.concat(devPlugins) : commonPlugins,
    resolve: {
        modules: ['node_modules'],
        alias: {
            components: PATHS.COMPONENTS,
            containers: PATHS.CONTAINERS,
            hooks: PATHS.HOOKS
        }
    },
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                test: /\.js$/,
                parallel: true,
                sourceMap: true,
                extractComments: true
            })
        ]
    }
};

module.exports = isDevelopment ? { ...webPackConfig, ...devOptions } : webPackConfig;
