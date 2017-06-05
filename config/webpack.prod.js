const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const commonConf = require('./webpack.common.js');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';


const config = merge(commonConf, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('style.[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV),
      },
    }),
  ],
});


module.exports = config;

