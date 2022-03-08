const webpack = require('webpack');

module.exports = function override (config, env) {
  console.log('override')
  config.resolve.fallback = {
    "crypto": require.resolve("crypto-browserify"),
    "assert": require.resolve("assert/"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer"),
    "zlib": require.resolve("browserify-zlib") ,
  }

  config.plugins.push(
    new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
    }),
  );
  
  return config
}
