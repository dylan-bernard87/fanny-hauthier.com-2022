const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  watch: true,
  mode: "production",
  entry: {
		app: './entries/app.js',
		mention: './entries/mention.js'
	},
  output: {
    path: path.resolve(__dirname, 'assets'),
		filename: '[name].js',
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
  optimization: {
    concatenateModules: true,
    removeAvailableModules: true,
  }
}
