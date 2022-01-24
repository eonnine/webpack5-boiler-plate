const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const { DIST, PUBLIC, ENV } = require('./pathMap');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    host: 'localhost',
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '(Dev) webpack5-boiler-plate',
      template: path.resolve(PUBLIC, 'index.html'),
      filename: path.resolve(DIST, 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': path.resolve(ENV, 'dev.js'),
    }),
  ],
});
