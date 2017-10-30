const webpack = require('webpack'); //访问内置的插件
const path = require('path');
const eslintFormatter = require('eslint-friendly-formatter');
const dirConfig = require('./config/dir.config');
require('./scripts/rmdist');
const baseConfig = {
	entry: {
		home: './src/pages/home/home.js',
		two	: './src/pages/pageTwo/index.js',
		three: './src/pages/pageThree/index.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'}
				]
			}, {
				test: /\.js$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				include: dirConfig.srcRootDir,
				options: {
					formatter: eslintFormatter,
					fix: true,
				}
			}, {
				test: /\.js$/,
				loader: 'babel-loader',
				include: dirConfig.srcRootDir
			}, {
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: './static/img/[hash:7].[ext]',
				}
			}, {
				// 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
				test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
				include: dirConfig.srcRootDir,
				loader: 'file-loader',
				options: {
					name: 'static/fonts/[name].[hash].[ext]',
				},
			},
		]
	},
	resolve: {
		alias: {
			jq: '../../static/lib/jquery-1.11.3.min.js'
		},
		moduleExtensions: ['js, jsx']
	}
};
module.exports = baseConfig;