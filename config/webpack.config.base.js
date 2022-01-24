const path = require('path');

const { DIST, SRC, PUBLIC_PATH } = require('./pathMap');

module.exports = {
  entry: path.resolve(SRC, 'index.js'),
  output: {
    path: DIST,
    filename: '[name].[contenthash].js',
    publicPath: PUBLIC_PATH,
  },
  resolve: {
    modules: [SRC, 'node_modules'],
    alias: {
      '@': SRC,
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [],
};
