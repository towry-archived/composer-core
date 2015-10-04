'use strict';

var path = require('path');
var webpack = require('webpack');

var webpackConfig = {
  devtool: 'eval',
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders:
      [
        {
          test: /\.js$/, loader: 'babel', include: [path.resolve('./src'), path.resolve('./test'), path.resolve('./lib')],
        },
      ],
  },
  stats: {
    colors: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
};

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/babel-core/browser-polyfill.js',
      'test/index.js',
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true,
      },
    },
    eslint: {
      stopOnError: false,
      stopOnWarning: true
    },
    exclude: [],
    preprocessors: {
      'test/index.js': ['webpack']
    },
    reporters: ['progress'],
    captureTimeout: 90000,
    browserNoActivityTimeout: 60000,
    port: 6789,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
  });
};
