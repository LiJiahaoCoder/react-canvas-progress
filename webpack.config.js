const path = require('path');

const prdWebpackConfig = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.join(__dirname, './lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'react'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ]
  },
  plugins: []
};

module.exports = prdWebpackConfig;
