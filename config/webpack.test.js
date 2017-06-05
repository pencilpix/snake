
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
            ],
          },
        }],
      },

      {
        test: /\.js$/,
        exclude: /\.spec\.js$/,
        use: [{
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true,
          },
        }],
      },

      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.(jpg|png|ttf|eot|woff|woff2|svg)$/,
        use: [{
          loader: 'file-loader',
        }],
      },

    ],
  },
};

