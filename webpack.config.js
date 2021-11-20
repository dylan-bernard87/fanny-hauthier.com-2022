
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  watch: true,
  entry: './entries/app.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'app.js',
  },
  plugins: [ new MiniCssExtractPlugin() ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader", "sass-loader",
        ],
      },
    ],
  },
}