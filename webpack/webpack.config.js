var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		page1: path.join(__dirname, 'src/js/entry_1.js'),
		page2: path.join(__dirname, 'src/js/entry_2.js')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: './dist/'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel'},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
			{test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192'},
			{test: /\.scss$/, loader: 'style!css!sass'}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new ExtractTextPlugin('style.css', {allChunks: true})
	]
};