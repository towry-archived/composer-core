var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var pkg = require('./package.json');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  quiet: false,
  noInfo: false,
  historyApiFallback: true
}).listen(pkg.port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Magic happening at localhost:' + pkg.port);
});
