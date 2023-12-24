var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: __dirname + "/app/js/production_main.js",
	output: {
		path: __dirname + "/../js",
		filename: "main.js",
		sourceMapFilename: "[name].js.map"
	},
	
	module: {
		loaders: [{
			test: /\.json$/,
			exclude: /node_modules/,
			loader: "json"
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.jsx$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			loader: 'style!css!sass'
		},
			// SASS
			{
				test: /\.scss$/,
				// loader: 'style!css!sass!postcss-loader'
				loaders: ["style", "css?sourceMap", "sass?sourceMap"]
			}
		],
		sassLoader: {
			// precision: 10,
			functions: '>= v3.0.0'
		}
	},
	// postcss: [
	//   require('autoprefixer')
	// ],
	resolve: {
		// you can now require('file') instead of require('file.coffee')
		extensions: ['', '.js', '.json', '.jsx']
	},
	plugins: [
		new webpack.BannerPlugin("Copyright InfoStyle"),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	},
		// 	comments: false
		// })
	]
}
