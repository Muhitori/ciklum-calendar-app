const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		index: "./src/js/index.js",
		event: "./src/js/create-event.js"
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./dist",
		historyApiFallback: true,
		open: true,
	},
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/html/index.html",
			chunks: ['index'],
		}),
		new HtmlWebpackPlugin({
			filename: "create-event.html",
			template: "src/html/create-event.html",
			chunks: ['event'],
		}),
	],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "./",
	},
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
		],
	},
};
