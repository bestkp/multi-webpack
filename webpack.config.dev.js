var HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
var webpack = require('webpack'); //访问内置的插件
var path = require('path');
var merge = require('webpack-merge');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var autoprefixer = require('autoprefixer');
var baseConfig = require('./webpack.config');
var htmlPlugin = require('./config/htmlPlugin.config');

module.exports = merge(baseConfig, {
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[hash:7].js',
		chunkFilename: '[id].[chunkhash:7].js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': '"development"'
		}),
		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, './src/pages/index.html'),
			inject: true,
			title: 'by-kp'
		}), // 單頁配置
		//htmlPlugin, // 多頁配置
		new FriendlyErrorsPlugin()
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist/',
		host: 'localhost',
		port: 8081, // 默认8080
		inline: true, // 可以监控js变化
		hot: true, // 热启动
		open: true,
		compress: true,
		watchContentBase: false,
		//clientLogLevel: "info" //在开发工具(DevTools)的控制台(console)将显示消息none, error, warning 或者 info（默认值）。
	}
});