const path = require('path');

module.exports = {
  // ...other webpack configuration options...

  resolve: {
    fallback: {
      fs: false,
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
    },
  },
};