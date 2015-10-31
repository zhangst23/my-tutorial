// SeaJS学习笔记.js
// SeaJS是一个遵循CommonJS规范的JavaScript模块加载框架，可以实现JavaScript的模块化开发及加载机制。
// 与jQuery等JavaScript框架不同，SeaJS不会扩展封装语言特性，而只是实现JavaScript的模块化及按模块加载。
// SeaJS的主要目的是令JavaScript开发模块化并可以轻松愉悦进行加载，将前端工程师从繁重的JavaScript文件及
// 对象依赖处理中解放出来，可以专注于代码本身的逻辑。SeaJS可以与jQuery这类框架完美集成。
// 使用SeaJS可以提高JavaScript代码的可读性和清晰度，解决目前JavaScript编程中普遍存在的依赖关系混乱和代码纠缠等问题，
// 方便代码的编写和维护。


//1.0 传统开发  各个js文件代码如下

//module1.js
var module1 = {
	run:function(){
		return $.merge(['module1'],$.merge(module2.run(),module3.run()));
	}
}
//module2.js
var module2 = {
	run:function(){
		return ['module2'];
	}
}
//module3.js
var module3 = {
	run:function(){
		return $.merge(['module3'],module4.run());
	}
}
//module4.js
var module4 = {
	run:function(){
		return ['module4'];
	}
}

//此时index.html需要引用module1.js及其所有下层依赖（注意顺序）
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8"/>
	<title>TinyApp</title>
	<script src="./jquery-min.js"></script>
	<script src="./module4.js"></script>
	<script src="./module3.js"></script>
	<script src="./module2.js"></script>
	<script src="./module1.js"></script>
</head>
<body>
	<p className="content"></p>
	<script>
		$('.content').html(module1.run());
	</script>
</body>
</html>

// 随着项目的进行，js文件会越来越多，依赖关系也会越来越复杂，使得js代码和html里的script列表往往变得难以维护。
// 下面看看如何使用SeaJS实现相同的功能。

// 首先是index.html：
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8"/>
	<title>TinyApp</title>
</head>
<body>
	<p className="content"></p>
	<script src="./sea.js"></script>
	<script>
		seajs.use('./init',function(init){
			init.initPage();
		});
	</script>
</body>
</html>


// 可以看到html页面不再需要引入所有依赖的js文件，而只是引入一个sea.js，sea.js会处理所有依赖，
// 加载相应的js文件，加载策略可以选择在渲染页面时一次性加载所有js文件，也可以按需加载（用到时才加载响应js），
// 具体加载策略使用方法下文讨论。

// index.html加载了init模块，并使用此模块的initPage方法初始化页面数据，这里先不讨论代码细节。

// 下面看一下模块化后JavaScript的写法：

//jquery.js
define(function(require,exports,module) = {
	//原jquery.js代码
	module.exports = $.noConflict(true);
});

//init.js
define(function(require,exports,module) = {
	var $ = require('jquery');
	var m1 = require('module1');

	exports.initPage = function(){
		$('.content').html(m1.run());
	}
});

//module1.js
define(function(require,exports,module) = {
	var $ = require('jquery');
	var m2 = require('module2');
	var m3 = require('module3');

	exports.run = function(){
		return $.merge(['module1'],$.merge(m2,run(),m3.run()));
	}
});

//module2.js
define(function(require,exports,module) = {
	exports.run = function(){
		return ['module2'];
	}
})

//module3.js
define(function(require,exports,module) = {
	var $ = require('jquery');
	var m4 = require('module4')

	exports.run = function(){
		return $.merge(['module3'],m4.run());
	}
});

//module4.js
define(function(require,exports,module) = {
	exports.run = function(){
		return ['module4'];
	}
})


// 乍看之下代码似乎变多变复杂了，这是因为这个例子太简单，如果是大型项目，SeaJS代码的优势就会显现出来。不过从这里我们还是能窥探到一些SeaJS的特性：

// 一是html页面不用再维护冗长的script标签列表，只要引入一个sea.js即可。

// 二是js代码以模块进行组织，各个模块通过require引入自己依赖的模块，代码清晰明了。

// 通过这个例子朋友们应该对SeaJS有了一个直观的印象，下面本文具体讨论SeaJS的使用

//下载完成后放到项目的相应位置，然后在页面中通过<script>标签引入，你就可以使用SeaJS了。

// SeaJS基本开发原则

// 使用SeaJS开发JavaScript的基本原则就是：一切皆为模块。引入SeaJS后，编写JavaScript代码就变成了编写一个又一个模块，SeaJS中模块的概念有点类似于面向对象中的类——模块可以拥有数据和方法，数据和方法可以定义为公共或私有，公共数据和方法可以供别的模块调用。

// 另外，每个模块应该都定义在一个单独js文件中，即一个对应一个模块。

// 模块定义函数define

// SeaJS中使用“define”函数定义一个模块

// 工厂函数factory解析

// 工厂函数是模块的主体和重点。在只传递一个参数给define时（推荐写法），这个参数就是工厂函数，此时工厂函数的三个参数分别是：

// require——模块加载函数，用于记载依赖模块。
// exports——接口点，将数据或方法定义在其上则将其暴露给外部调用。
// module——模块的元数据。
// 这三个参数可以根据需要选择是否需要显示指定。

// 下面说一下module。module是一个对象，存储了模块的元信息，具体如下：

// module.id——模块的ID。
// module.dependencies——一个数组，存储了此模块依赖的所有模块的ID列表。
// module.exports——与exports指向同一个对象。
// 三种编写模块的模式

// 第一种定义模块的模式是基于exports的模式：
define(function(require,exports,module){
	var a = require('a');  //引入a模块
	var b = require('b');  //引入b模块

	var data1 = 1;  //私有数据

	var func1 = function(){   //私有方法
		return a.run(data1);

	}
	exports.data2 = 2;  //公共数据

	exports.func2 = function(){  //公共方法
		return 'hello';

	}
});

// 上面是一种比较“正宗”的模块定义模式。除了将公共数据和方法附加在exports上，也可以直接返回一个对象表示模块，如下面的代码与上面的代码功能相同：

define(function(require){
	var a = require('a');
	var b = require('b');

	var data1 = 1;

	var func1 = function(){
		return a.run(data1);
	}

	return{
		data2:2,
		func2:function(){
			return 'hello';
		}
	}
})

// 如果模块定义没有其它代码，只返回一个对象，还可以有如下简化写法：
define({
	data:1,
	func:function(){
		return 'hello';
	}
})

// 第三种方法对于定义纯JSON数据的模块非常合适。

// 模块的载入和引用

// 模块的寻址算法
// 绝对地址——给出js文件的绝对路径
require("http://example/js/a");
// 就代表载入 http://example/js/a.js 。

// 相对地址——用相对调用载入函数所在js文件的相对地址寻找模块。

// 例如在 http://example/js/b.js 中载入
require("./c");
// 则载入 http://example/js/c.js 。


// 根据应用场景的不同，SeaJS提供了三个载入模块的API，分别是seajs.use，require和require.async，下面分别介绍。

// seajs.use

// seajs.use主要用于载入入口模块。入口模块相当于C程序的main函数，同时也是整个模块依赖树的根。上面在TinyApp小例子中，init就是入口模块。seajs.use用法如下：

//单一模式
seajs.use('./a');

//回调模式
seajs.use('./a',function(a){
	a.run();
});

//多模块模式
seajs.use(['./a','./b'],function(a,b){
	a.run();
	b.run();
});

// 一般seajs.use只用在页面载入入口模块，SeaJS会顺着入口模块解析所有依赖模块并将它们加载。
// 如果入口模块只有一个，也可以通过给引入sea.js的script标签加入”data-main”属性来省略seajs.use，
// 例如，上面TinyApp的index.html也可以改为如下写法：

<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8"/>
	<title>TinyApp</title>
</head>
<body>
	<p className="content"></p>
	<script src="./sea.js" data-main="./init"></script>
</body>
</html>

// 这种写法会令html更加简洁。

// require

// require是SeaJS主要的模块加载方法，当在一个模块中需要用到其它模块时一般用require加载：
var m = require('/path/to/module/file');
// 这里简要介绍一下SeaJS的自动加载机制。上文说过，使用SeaJS后html只要包含sea.js即可，那么其它js文件是如何加载进来的呢？
// SeaJS会首先下载入口模块，然后顺着入口模块使用正则表达式匹配代码中所有的require，再根据require中的文件路径标识下载相应的js文件，
// 对下载来的js文件再迭代进行类似操作。整个过程类似图的遍历操作（因为可能存在交叉循环依赖所以整个依赖数据结构是一个图而不是树）。

// 明白了上面这一点，下面的规则就很好理解了：

// 传给require的路径标识必须是字符串字面量，不能是表达式，如下面使用require的方法是错误的：

require('module' + '1');
 
require('Module'.toLowerCase());
// 这都会造成SeaJS无法进行正确的正则匹配以下载相应的js文件。

// require.async

// 上文说过SeaJS会在html页面打开时通过静态分析一次性记载所有需要的js文件，
// 如果想要某个js文件在用到时才下载，可以使用require.async：
require.async('/path/to/module/file',function(m){
	//code of callback...
})
// 这样只有在用到这个模块时，对应的js文件才会被下载，也就实现了JavaScript代码的按需加载。

// SeaJS的全局配置

// SeaJS提供了一个seajs.config方法可以设置全局配置，接收一个表示全局配置的配置对象。具体使用方法如下：
seajs.config({
	base:'path/to/jslib/',
	alias:{
		'app':'path/to/app'
	},
	charset:'utf-8',
	timeout:20000,
	debug:false
});

// SeaJS如何与现有JS库配合使用

// 要将现有JS库如jQuery与SeaJS一起使用，只需根据SeaJS的的模块定义规则对现有库进行一个封装。例如，下面是对jQuery的封装方法：
define(function(){
	//{{ jQuery 原有代码开始 
		/*!  
 * jQuery JavaScript Library v1.6.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu May 12 15:04:36 2011 -0400
 */
//...
//}}}jQuery原有代码结束
 
	return $.noConflict();

})


// SeaJS项目的打包部署

// SeaJS本来集成了一个打包部署工具spm，后来作者为了更KISS一点，将spm拆出了SeaJS而成为了一个单独的项目。
// spm的核心思想是将所有模块的代码都合并压缩后并入入口模块，由于SeaJS本身的特性，html不需要做任何改动就可以
// 很方便的在开发环境和生产环境间切换。但是由于spm目前并没有发布正式版本，所以本文不打算详细介绍，有兴趣的朋友可以
// 参看其github项目主页 https://github.com/seajs/spm/。

// 其实，由于每个项目所用的JS合并和压缩工具不尽相同，所以spm可能并不是完全适合每个项目。在了解了SeaJS原理后，
// 完全可以自己写一个符合自己项目特征的合并打包脚本


// 一个完整的例子

// 上文说了那么多，知识点比较分散，所以最后我打算用一个完整的SeaJS例子把这些知识点串起来，方便朋友们归纳回顾。这个例子包含如下文件：

index.html----主页面
sea.js-----SeaJS脚本
init.js----init模块，入口模块，依赖data、jquery、style三个模块，有主页面载入
data.js-----data模块，纯json数据模块，由init载入
jquery.js-----jquery模块，对jQuery库的模块化封装，由init载入
style.css----CSS样式表，作为style模块由init载入

sea.js和jquery.js的代码属于库代码。


//######################## html:
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<div id="content">
    <p class="author"></p>
    <p class="blog"><a href="#">Blog</a></p>
</div>
 
<script src="./sea.js" data-main="./init"></script>
</body>
</html>


//######################## javascript:

//init.js
define(function(require,exports,module){
	var $ = require('./jquery');
	var data = require('./data');
	var css = require('./style.css');

	$('.author').html(data.author);
	$('.blog').attr('href',data.blog);
});

//data.js
define({
	author:'ZhangYang',
	blog:'http://blog.codinglabs.org'
});

//########################  css
.author{color:red;font-size:10pt;}
.blog{font-size:10pt;}



























































