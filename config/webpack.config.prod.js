const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.config.base.js');
const { SRC, DIST, PUBLIC, ENV } = require('./pathMap');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        exclude: /node_modules/,
        extractComments: true,
        terserOptions: {
          compress: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack5-boiler-plate',
      template: path.resolve(PUBLIC, 'index.html'),
      filename: path.resolve(DIST, 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(SRC, 'assets'),
          to: path.resolve(DIST, 'assets'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env': path.resolve(ENV, 'prod.js'),
    }),
  ],
});
