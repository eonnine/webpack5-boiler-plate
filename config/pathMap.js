const path = require('path');

module.exports = {
  PUBLIC_PATH: '/',
  DIST: path.resolve(__dirname, '../dist'),
  PUBLIC: path.resolve(__dirname, '../public'),
  SRC: path.resolve(__dirname, '../src'),
  ENV: path.resolve(__dirname, '../env'),
};
