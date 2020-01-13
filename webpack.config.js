const path = require('path');

/** @typedef {import('webpack').Configuration} Configuration */
/** @type Configuration */
module.exports = {
  name: 'modern',
  mode: 'development',
  entry: {
    'common/js/main': path.resolve('src', 'js', 'entry_points', 'main.ts'),
  },
  output: {
    path: path.resolve('public', 'common', 'js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: path.join('common', 'js', 'shared', 'main'),
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
};
