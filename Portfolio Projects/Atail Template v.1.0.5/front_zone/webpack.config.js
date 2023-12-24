// webpack.config.js
// var autoprefixer = require( 'autoprefixer' );
var webpack = require( 'webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var path;

module.exports = [ {
	devtool: 'eval-source-map',
	debug: true,
	name: 'js',
	entry: __dirname + "/app/js/main.js",
	output: {
		path: __dirname + "/../assets/js",
		filename: "main.js",
    sourceMapFilename: "[name].js.map"
	},
	module: {
		loaders: [ {
				test: /\.json$/,
				exclude: /node_modules/,
				loader: "json"
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			// {
			//    test: /\.html$/,
			//    loader: "raw-loader"
			// },
			{
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
	// postcss: function () {
	// 	return [ autoprefixer ];
	// },
	plugins: [
		new webpack.BannerPlugin( "Copyright Mestafor" ),
		new HtmlWebpackPlugin( {
			template: __dirname + "/app/index.tmpl.html",
			devServer: 8080
		} ),
		new HtmlWebpackPlugin( {
			filename: "test.html",
			template: __dirname + "/app/test.tmpl.html",
			devServer: 8080
		} ),
		new HtmlWebpackPlugin( {
			filename: "typography.html",
			template: __dirname + "/app/typography.tmpl.html",
			devServer: 8080
		} ),
		new HtmlWebpackPlugin( {
			filename: "contact.html",
			template: __dirname + "/app/contact.tmpl.html",
			devServer: 8080
		} ),
		new webpack.optimize.OccurenceOrderPlugin(),
		// new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin( "[name]-[hash].css" ),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		colors: true,
		historyApiFallback: false,
		inline: true,
		hot: true
	},
	resolve: {
			// you can now require('file') instead of require('file.coffee')
			extensions: ['', '.js', '.json', '.jsx']
	}
} ];
