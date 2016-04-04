// Webpack教程.config.js

1.0 基本用法
//webpack.config.js
module.exports = {
	context: __dirname + '/src',
	entry: { //打包成2个文件index.js, about.js
		index: ['./a.js', './a.css', './b.js', './b.css'],
		about: ['./a.js', './a.css', './c.js', './c.css'],
	},
	output: {
		path: './build',
		publicPath: 'build/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader' }
		]
	},
};



2. 模块化开发

//a.js
function show() { //私有的
	console.log('a.js', 'show');
};
module.exports = { // CommentJS方式
	show: function(){ // 外部接口
		show();
	}
}

//b.js
var a = require('./a');
a.show(); //调用 a 提供的接口



3.0  模块加载
// sync 加载2种方式
var a = require('./a.js'); // CommonJS（推荐）
// a.show();

define(['./b.js', './c.js'], function(dep1, dep2){ //AND
	dep2.show();
})


// async 按需加载2种方式
require(['./a.js'], function(module){ // AMD(推荐)
	module.show();
	var c = require('./c.js').show(); // c.js 会和 a.js 打包到一起
})

require.ensure([], function(require){ // CommonJS
	require('./b.js').show();  // c.js会和b.js打包到一起
	var c = require('./c.js').show();
})


4.0 scss/less/css的使用

// 方式1: 直接js内require:
require('./a.scss'); // 推荐, 模块依赖清晰


// 图片的处理, webpack.config.js的loaders内设定:
{test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}, // <=8k的图片使用base64内联, 其他的继续用图片
{test: /\.(png|jpg|gif)$/, loader: 'file-loader'}, // 图片独立(兼容<IE8的browser)
// 图片还可以再优化: github.com/tcoopman/image-webpack-loader 
// * Webpack里一切都可作为模块加载


5.0  样式优化

//_base.css
@mixin border-radius($radius: 5px) {
    -webkit-border-radius: $radius;-moz-border-radius: $radius;-khtml-border-radius: $radius;border-radius: $radius;
}
//main.scss
.test{@include border-radius(3px);} // 使用@include 简化开发

// border-radius已经支持的很好, 不再需要写-webkit-border-radius/-moz-border-radius了

// 使用autoprefixer可大量减少mixin的使用, webpack.config.js的module.loaders内设定:

{test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?{cascade:false,browsers:["last 3 version", "> 1%", "ie > 7"]}'},
{test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')}
{test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')}
这样code只需要写: border-radius: 3px; // 只需要写标准的就好 



6.0  搭配 gulp + css-sprite

搭配gulp/grunt:
github.com/webpack/webpack-with-common-libs
适合: 复杂的项目, 有多个task, 或有多个 webpack build等 

// 搭配css-sprite: github.com/aslansky/css-sprite, 比Ruby的Compass Css Sprite性能好太多了~

~ 支持retina(ratios:1,2)
~ 图片可选base64输出
~ 支持less/scss/stylus

// 使用方式:
@import 'scss/_icons';
.icon-home {@include sprite($header-home);} //header-home是图片名称


########################################
########################################
########################################
########################################
########################################


1.0 撸啊撸

var someModule = require("someModule");
var anotherModule = require("anotherModule");

someModule.doTehAwesome();
anotherModule.doMoarAwesome();

exports.asplode = function (){
	someModule.doTehAwesome();
	anotherModule.doMoarAwesome();
}


2.0 配置

// 每个项目下都必须配置有一个 webpack.config.js ，它的作用如同常规的 gulpfile.js/Gruntfile.js ，就是一个配置项，告诉 webpack 它需要做什么。
// 我们看看下方的示例：

var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
	//插件项
	plugins: [commonsPlugin],
	// 页面入口文件配置
	entry: {
		index: './src/js/page/index.js'
	},
	// 入口文件输出配置
	output: {
		path: 'dist/js/page',
		filename: '[name].js'
	},
	module: {
		// 加载器配置
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.js$/, loader: 'jsx-loader?harmony' },
			{ test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
		]
	},
	// 其他解决方案配置
	resolve: {
		root: 'E:/github/flux-example/src', //绝对路径
		extensions: ['', '/js', '.json', '.scss'],
		alias: {
			AppStore: 'js/stores/AppStores.js',
			ActionType: 'js/actions/ActionType.js',
			AppAction: 'js/actions/AppAction.js'
		}
	}
};




// ⑴ plugins 是插件项，这里我们使用了一个 CommonsChunkPlugin 的插件，它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。

// ⑵ entry 是页面入口文件配置，output 是对应输出项配置（即入口文件最终要生成什么名字的文件、存放到哪里），其语法大致为：

{
    entry: {
        page1: "./page1",
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: ["./entry1", "./entry2"]
    },
    output: {
        path: "dist/js/page",
        filename: "[name].bundle.js"
    }
}

// 该段代码最终会生成一个 page1.bundle.js 和 page2.bundle.js，并存放到 ./dist/js/page 文件夹下。

// ⑶ module.loaders 是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理：


    module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }

// 如上，"-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。

// 注意所有的加载器都需要通过 npm 来加载，并建议查阅它们对应的 readme 来看看如何使用。

// 拿最后一个 url-loader 来说，它会将样式中引用到的图片转为模块来处理，使用该加载器需要先进行安装：

npm install url-loader -save-dev

// 配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）。

// 你可以点这里查阅全部的 loader 列表。

// ⑷ 最后是 resolve 配置，这块很好理解，直接写注释了：


    resolve: {
        //查找module的话从这里开始查找
        root: 'E:/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }



















