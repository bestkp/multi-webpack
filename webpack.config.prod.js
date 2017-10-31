var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack'); //访问内置的插件
var path = require('path');
var merge = require('webpack-merge')
var baseConfig = require('./webpack.config')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var env = '"production"';


var webpackConfig = merge(baseConfig, {
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'js/[name].[chunkhash].js',
		chunkFilename: 'chunk/[id].[chunkhash].js'
	},
	plugins: [
		// http://vuejs.github.io/vue-loader/en/workflow/production.html
		new webpack.DefinePlugin({
			'process.env': env
		}),
		//清理dist文件
		new CleanWebpackPlugin(['dist']),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}),
		// Compress extracted CSS. We are using this plugin so that possible
		// duplicated CSS from different components can be deduped.
		new OptimizeCSSPlugin(),
		// generate dist index.html with correct asset hash for caching.
		// you can customize output by editing /index.html
		// see https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, './src/pages/index.html'),
			inject: 'body',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		})
	]
})
var productionGzip = false;
var productionGzipExtensions = ['js', 'css'];
if (productionGzip) {
	var CompressionWebpackPlugin = require('compression-webpack-plugin');

	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' +
				productionGzipExtensions.join('|') +
				')$'
			),
			threshold: 10240,
			minRatio: 0.8
		})
	)
}
module.exports = webpackConfig;