
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    javascript: './app.js',
    html: './index.html'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000,
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          { loader: "file-loader" }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};