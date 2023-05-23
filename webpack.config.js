const path = require('path');

module.exports = {
  // Otras configuraciones de Webpack...
  
  resolve: {
    fallback: {
        stream: false, 
        http: false,
        https: false,
    },
    alias: {
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
    }
  }
};
