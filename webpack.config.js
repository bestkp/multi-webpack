const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
	entry: {
		home: './pages/home/home.js',
		two: './pages/pageTwo/index.js',
		three: './pages/pageThree/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash:7].js',
		chunkFilename: "[name].[id].js",
		pathinfo: true,
		publicPath: "/assets/"
	},
	module: {
        noParse: '/jquery1/',
        rules: [
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {

						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({template: './pages/home/index.html'})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'eval'

};
module.exports = config;