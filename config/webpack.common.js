const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || process.env.ENV;
const FILE = (env === 'production') ? '[name].[hash].[ext]' : '[name].[ext]';

const config = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    'vendor': './vendor.js',
    'app': './app.js',
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: './static/images/' + FILE,
          },
        }],
      },

      {
        test: /\.(mp3|wav|mp4)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: './static/sounds/' + FILE,
          },
        }],
      },

      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: './static/fonts/' + FILE,
          },
        }],
      },

      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', {modules: false}],
            ],
          },
        }],
      },

    ],
  },

  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),

    new HtmlWebpackPlugin({
      name: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
    }),

  ],
};

module.exports = config;

