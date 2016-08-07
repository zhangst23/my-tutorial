var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var named = require('vinyl-named');

gulp.task('dev',function(){
	return gulp.src('app/scripts/app.jsx')
		.pipe(named())
		.pipe(gulpWebpack({
			watch : true,
			module: {
				loaders: [
					{
						test: /\.j(s|sx)$/,
						exclude: /node_modules/,
						loader: 'babel',
						query: {
							presets: ['es2015','react']
						},
					},
					{
						test:/\.scss$/,
						exclude: /node_modules/,
						loaders:['style','css','sass']
					},
					{

					}
				],
				noParse: /commonmark\.js$/
			},
			output : {
				filename : '[name],js',
			}
		}))
		.pipe(gulp.dest('app/build/'));
});




gulp.task('default',['dev']);











