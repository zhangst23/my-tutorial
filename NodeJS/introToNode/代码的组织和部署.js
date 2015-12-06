



1.0  工程目录
// 了解了以上知识后，现在我们可以来完整地规划一个工程目录了。以编写一个命令行程序为例，一般我们会同时提供
// 命令行模式和API模式两种使用方式，并且我们会借助三方包来编写代码。除了代码外，一个完整的程序也应该有自己
// 的文档和测试用例。因此，一个标准的工程目录都看起来像下边这样。
- node-echo			#工程目录
  -bin/				#存放命令行相关代码
    node-echo
  +doc/				#存放文档
  -lib/				#存放API相关代码
    echo.js
  -node_modules/	#存放第三方包
    +argv/
  +tests/			#存放测试用例
  package.json		#元数据文件
  README.md  		#说明文件



// 其中部分文件内容如下：

/* bin/node-echo */
var argv = require('argv'),
    echo = require('../lib/echo');
console.log(echo(argv.join(' ')));

/* lib/echo.js */
module.exports = function (message) {
    return message;
};

/* package.json */
{
    "name": "node-echo",
    "main": "./lib/echo.js"
}




