var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/',
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  module: {
    loaders: [
      {
        query: {
          presets: ['es2015', 'react', 'stage-1']
        },
        test: /\.js$/,
        loader: [
          'react-hot',
          'babel-loader'
        ],
        exclude: /node_modules/,
      }
    ]
  },
  devServer: {
    devtool: 'eval',
    hot: true,
    historyApiFallback: true,
    contentBase: './',
    outputPath: './',
    proxy: {
      "*": "http://localhost:3000"
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    // Allows for sync with browser while developing (like BorwserSync)
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warninggs but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
  ]
};
