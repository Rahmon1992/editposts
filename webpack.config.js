const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname,
    filename: "build/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    stats: {
      assets: false,
      cached: false,
      children: false,
      chunks: false,
      colors: true,
      depth: false,
      errorDetails: true,
      hash: false,
      maxModules: 0,
      modules: false,
      performance: false,
      version: false
    }
  }
}
