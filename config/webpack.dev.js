const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const commonConf = require('./webpack.common.js');

const config = merge(commonConf, {
  devtool: 'cheap-module-source-map',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../.dev'),
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, '../.dev'),
    port: 4200,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
});

module.exports = config;

