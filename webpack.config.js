const path = require('path');

module.exports = {
  entry: './js/main.js', // where it starts
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' // what output does it create
  },
  module: { // how does it bundle
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    }]
  }
}