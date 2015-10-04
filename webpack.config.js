var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:' + pkg.port,
    'webpack/hot/only-dev-server',
    './sandbox/index.js'
  ],
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, './sandbox'),
    inline: true
  },
  output: {
    path: path.join(__dirname, './sandbox'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loader: "react-hot!babel-loader"
    }, {
      test: /\.css$/, loader: 'style!css'
    }],
    preLoaders: [
      {test: /components\/*.js$/, loader: 'eslit', exclude: /build|bower_components|node_modules/}
    ]
  },
  eslint: {configFile: '.eslintrc'}
}
