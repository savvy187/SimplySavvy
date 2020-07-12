const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isDevelopment = process.env.NODE_ENV === 'development';

const PATHS = {
    ROOT: path.resolve(__dirname),
    DIST: path.resolve(__dirname, 'dist/server'),
    CLIENT_DIST: path.resolve(__dirname, 'dist/client'),
    ASSETS: path.resolve(__dirname, 'assets'),
    SERVER: path.resolve(__dirname, 'src/server'),
    JEST: path.resolve(__dirname, 'jest'),
    NODE_MODULES: path.resolve(__dirname, 'node_modules')
};

const commonPlugins = [
    new CleanWebpackPlugin(),
    new CopyPlugin([
        { from: `${PATHS.SERVER}/favicon.ico`, context: 'src' },
        { from: `${PATHS.ASSETS}`, to: 'assets', toType: 'dir', ignore: ['.gitkeep'] },
        { from: `${PATHS.CLIENT_DIST}`, to: 'assets', toType: 'dir', ignore: ['.gitkeep'] }
    ], { debug: 'warning' })
];

const devPlugins = [
    new webpack.WatchIgnorePlugin([
        /webpack\.config\.js$/,
        /webpack\.server\.config\.js$/
    ]),
    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
    }),
    new webpack.HotModuleReplacementPlugin()
];

const plugins = isDevelopment
    ? commonPlugins.concat(devPlugins)
    : commonPlugins;

const devOptions = {
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    }
};

const config = {
    context: PATHS.ROOT,
    entry: `${PATHS.SERVER}/index.js`,
    target: 'node',
    mode: isDevelopment ? 'development' : 'production',
    node: {
        /* 
         * These entries are then ignored by webpack...
        */
        __dirname: false,
        __filename: false,
        process: false,
        console: false
    },
    output: {
        path: PATHS.DIST,
        filename: 'simplySavvy-server.js',
        library: 'simplySavvy-server',
        libraryTarget: 'umd',
        pathinfo: true,
        globalObject: 'this'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['@babel/preset-env'],
                        configFile: path.resolve(PATHS.ROOT, 'babel.server.config.json')
                    }
                },
                include: [PATHS.SERVER]
            }
        ]
    },
    plugins,
    resolve: {
        modules: ['node_modules'],
        alias: {
            server: PATHS.SERVER
        }
    }
};

module.exports = isDevelopment ? { ...config, ...devOptions } : config;
