const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const { SRC, DIST, PUBLIC, ENV } = require('./pathMap');
const baseConfig = require('./webpack.config.base.js');

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
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': path.resolve(ENV, 'prod.js'),
    }),
  ],
});
