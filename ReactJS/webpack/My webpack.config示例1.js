// My webpack.config.js
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require("path");
require("babel-polyfill");

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: ["babel-polyfill", "./" + path.join("js", "scripts.js")],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, "src"),
    filename: "scripts.min.js"
  },
  plugins: debug ? [] : [
   new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  externals: {
    'Config': JSON.stringify(process.env.NODE_ENV ? require('./config.prod.json') : require('./config.dev.json')),
  }
};
view rawwebpack.cofig.js hosted with ❤ by GitHub