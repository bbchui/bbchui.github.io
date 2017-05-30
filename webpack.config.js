var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./lib/game.js",
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", "*"]
  }
};
