const { resolve } = require('path')
const webpack = require('webpack')

const hotCodeEntry = [
  'es6-shim', 'es7-shim/browser',
  'webpack-dev-server/client?http://localhost:8081',
  'webpack/hot/only-dev-server'
]

module.exports = {
  entry: {
    'basic': [...hotCodeEntry, './basic/src/index.ts']
  },

  context: resolve(__dirname, 'examples'),

  output: {
    path: resolve(__dirname, 'examples'),
    publicPath: '/',
    filename: '[name]/main.js',
    hotUpdateChunkFilename: "[id].[hash].hot-update.js",
    hotUpdateMainFilename: "[hash].hot-update.json"
  },

  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      resolve(__dirname, 'libs'),
      resolve(__dirname, 'examples')
    ],
    extensions: ['.ts', '.js']
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'examples'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
}
