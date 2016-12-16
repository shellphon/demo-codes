var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: {
		index:'./src/index.jsx',
		demo:'./src/demo.jsx'
	},
	module:{
		loaders: [{
			test:/\.css$/,
			//loader:'style!css'
			loader:ExtractTextPlugin.extract("style-loader","css-loader")
		},
		{
			test:/\.jsx?$/,
			loader:'babel',
			query:{
				presets:['es2015','react']
			}
		}
		]
	},
	output: {
		filename:'build/[name].js'
	},
	plugins:[
		//new webpack.optimize.CommonsChunkPlugin('build/common.js'),
		new ExtractTextPlugin("build/[name].css")
	]
};