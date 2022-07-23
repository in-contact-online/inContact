const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        app: ['@babel/polyfill', './lib/index.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                type: 'javascript/auto',
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
                        plugins: [
                            ['@babel/plugin-proposal-class-properties'],
                            ['@babel/plugin-transform-modules-commonjs'],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            { test: /\.html$/, loader: 'html-loader' },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.mjs', '.tsx', '.ts'],
    },
    devServer: {
        hot: true,
        port: 8086,
        host: '127.0.0.1',
        server: 'http',
        headers: { 'Access-Control-Allow-Origin': '*' },
    },
    output: {
        globalObject: 'this',
        path: path.resolve(__dirname, 'build'),
        filename: 'client.min.js',
        publicPath: '/',
        chunkFilename: '[name].chunk.js',
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    externals: [
        {
            xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}',
        },
    ],
    plugins: [
        new Dotenv({
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: true,
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'public/favicon.ico', to: 'favicon.ico' },
                { from: 'public/images', to: 'images' },
            ],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
        }),
    ],
};
