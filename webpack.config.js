const {resolve} = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {

  entry: resolve(__dirname, "lib", "index.ts"),

  output: {
    path: resolve(__dirname, "dist"),
    filename: "tvs-flow-tools.js",
    library: 'tvsFlowTools',
    libraryTarget: "umd"
  },

  module: {
    rules: [{
      test: /\.(j|t)s$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        compilerOptions: {
          "outDir": "",
        }
      }
    }]
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [
      'node_modules',
      resolve(__dirname, "lib")
    ]
  },

  plugins: [
    new UglifyJsPlugin({
      beautify: true
    })
  ]
}
