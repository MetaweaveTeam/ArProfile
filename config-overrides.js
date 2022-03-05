const webpack = require('webpack');

module.exports = function override (config, env) {
  console.log('override')
  config.resolve.fallback = {
    "assert": false,
    "buffer": require.resolve("buffer"),
    "stream": require.resolve("stream-browserify"),
    "zlib": require.resolve("browserify-zlib") ,
    "crypto": require.resolve("crypto-browserify")
  }

  config.plugins.push(
    new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
    }),
  );
  
  return config
}
