const path = require('path');

module.exports = {
  // ...other webpack configuration options...

resolve: {
  fallback: {
    'fs': false,
    'os': require.resolve('os-browserify/browser'),
    'path': require.resolve('path-browserify'),
    // Add similar entries for other core modules as needed.
  },
},
};
