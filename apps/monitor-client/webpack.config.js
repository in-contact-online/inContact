const debug = process.env.NODE_ENV !== 'production'
const path = require('path')
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: debug ? 'inline-sourcemap' : '',
  entry: {
    app: ['@babel/polyfill', './lib/index.jsx'],
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
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-class-properties"]
            ]
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        ],
      },
      {test: /\.html$/, loader: 'html-loader'},
    ],
  },
  node: {
    crypto: 'empty',
    net: 'empty',
    dns: 'empty',
    fs: 'empty',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.mjs'],
    alias: {
      "@util-validation": path.resolve(__dirname, '../../packages/util-validation'),
      "@util-web-api-client": path.resolve(__dirname, '../../packages/util-web-api-client')
    }
  },
  devServer: {
    publicPath: 'http://127.0.0.1:8086/',
    contentBase: './',
    hot: true,
    inline: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    historyApiFallback: true,
    // TODO: Investigate security risk behind 'disableHostCheck'
    disableHostCheck: true,
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
      chunks: 'initial',
    },
  },
  externals: [
    {
      xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}',
    },
  ],
  plugins: [
    new Dotenv({
      defaults: true
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    })
  ]
}
