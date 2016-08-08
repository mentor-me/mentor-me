// const path = require('path')
// const webpack = require('webpack')
//
// module.exports = {
//   devtool: 'source-map',
//
//   entry: [
//       './client/index.js'
//   ],
//
//   output: {
//     path: path.join(__dirname, 'client'),
//     filename: 'bundle.js',
//     publicPath: './'
//   },
//
//   plugins: [
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.UglifyJsPlugin({
//       minimize: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify('production')
//       }
//     })
//   ],
//
//   module: {
//     loaders: [
//       { test: /\.js?$/,
//         loader: 'babel',
//         include: path.join(__dirname, 'client') },
//       { test: /\.scss?$/,
//         loader: 'style!css!sass',
//         include: path.join(__dirname, 'client', 'assets', 'sass') },
//       { test: /\.png$/,
//         loader: 'file' },
//       { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
//         loader: 'file'}
//     ]
//   }
// }
