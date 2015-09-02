var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(__dirname);

module.exports = {
	entry: {
		page1: path.join(__dirname, 'src/js/entry_1.js'),  //入口文件
		page2: path.join(__dirname, 'src/js/entry_2.js')
	},
	output: {
		path: path.join(__dirname, 'out'),  //打包输出的路径
		filename: '[name].js',  //打包后的文件名
		publicPath: './out/'  //html引用的资源，打包后的前缀路径
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel'},
			{test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192'},
			{test: /\.css$/, loader: 'style!css'}, 
			//{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},  //以css为后缀的文件，用ExtractTextPlugin插件提取出来,不能简写
			//{test: /\.scss$/, loader: 'style!css!sass'}
			{test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass')}  //以scss为后缀的文件，用ExtractTextPlugin插件提取出来
			
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new ExtractTextPlugin('ceshi.css', {allChunks: true})  //不自动向页面插入link
	]
};