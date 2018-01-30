const path = require('path');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'Counter Storybook Build',
      warningSound: true,
      failureSound: true,
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
            },
          },
          { loader: 'source-map-loader' },
        ],
      },
    ],
  },
};
