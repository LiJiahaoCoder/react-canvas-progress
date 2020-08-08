const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const Chalk = require('chalk');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const port = 1997;
const host = '0.0.0.0';
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './example/index.tsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.[hash:6].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'tslint-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, './example/index.html'),
    }),
    new ProgressBarPlugin({
      complete: Chalk.blue('■'),
      incomplete: Chalk.gray('□'),
      format: '  :bar ' + Chalk.green.bold(':percent') + ' :msg',
      clear: false
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        notes: [`滴滴滴: ${Chalk.green(`http://${host}:${port} 🏎`)}`],
      },
      onErrors: undefined
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    port,
    contentBase: './dist',
    historyApiFallback: true,
    host,
    inline: true,
    hot: true,
    open: true,
    stats: 'errors-only',
    quiet: true
  },
};
