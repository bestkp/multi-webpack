var webpack = require('webpack'); //访问内置的插件
var path = require('path');
var eslintFormatter = require('eslint-friendly-formatter');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var baseConfig = {
	entry: {
		one: './src/pages/one/index.js',
		two: './src/pages/two/index.js'
	},
	module: {
		rules: [
			{
				test: /\.css/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader']
				})
			}, {
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'less-loader']
				})
			}, /*{
			 test: /\.js$/,
			 enforce: 'pre',
			 loader: 'eslint-loader',
			 include: path.resolve(__dirname, 'src'),
			 options: {
			 formatter: eslintFormatter,
			 fix: true,
			 }
			 },*/ {
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'src')
			}, {
				test: /\.html$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'html-loader',
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
				include: path.resolve(__dirname, 'src'),
				loader: 'file-loader',
				options: {
					name: 'static/fonts/[name].[hash].[ext]',
				},
			}, {
				test: /\.(csv|tsv)$/,
				use: [
					'csv-loader'
				]
			}, {
				test: /\.xml$/,
				use: [
					'xml-loader'
				]
			}
		]
	},
	resolve: {
		alias: {
			jq: '../../static/lib/jquery-1.11.3.min.js'
		},
		moduleExtensions: ['js, jsx']
	},
	plugins: [
		//清理dist文件
		new CleanWebpackPlugin(['dist']),
		/* 抽取出所有通用的部分 */
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',      // 需要注意的是，chunk的name不能相同！！！
			filename: 'commons/common.[chunkhash].js',
		}),
		/* 抽取出webpack的runtime代码()，避免稍微修改一下入口文件就会改动commonChunk，导致原本有效的浏览器缓存失效 */
		new webpack.optimize.CommonsChunkPlugin({
			name: 'webpack-runtime',
			filename: 'commons/webpack-runtime.[hash].js',
		}),
		/* 抽取出chunk的css */
		new ExtractTextPlugin('[name].[contenthash:7].css'),
	]
};
module.exports = baseConfig;