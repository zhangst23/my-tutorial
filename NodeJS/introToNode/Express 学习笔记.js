Express 学习笔记.js

1.0

node Express安装和使用
1：在cmd命令行下执行npm install -g express,安装全局的express

2：进入需要创建项目的目录下执行express nodeExpressProject,创建express项目

3：cd nodeExpresProject> npm install express

4: npm install jade,这里使用了jade渲染模型

5：修改app.js的启动端口，

6：node app.js

7：在浏览器中输入http://localhost:xxxx/  测试是否成功

8：到此node的express安装测试完成   


2.0 
2.1 安装MongoDB
下载 MongoDB 压缩包。解压重命名为 mongodb，在 mongodb 文件夹里新建 blog 文件夹作为我们博客内容的存储目录。进入到 bin 目录下：运行：
./mongod --dbpath ../blog/

// 以上命令的意思是:设置 blog 文件夹作为我们工程的存储目录并启动数据库。
2.2 连接MongoDB
// 数据库虽然安装并启动成功了，但我们需要连接数据库后才能使用数据库。怎么才能在 Node.js 中使用 MongoDB 呢？我们使用
// 官方提供的 node-mongodb-native 驱动模块，打开 package.json，在 dependencies 中添加一行：

"mongodb": "1.4.15"

npm install 
// 更新依赖的模块，稍等片刻后 mongodb 模块就下载并安装完成了。


// 新建 models 文件夹，并在 models 文件夹下新建 db.js ，添加如下代码：
models/db.js
    var settings = require('../settings'),
        Db = require('mongodb').Db,
        Connection = require('mongodb').Connection,
        Server = require('mongodb').Server;
    module.exports = new Db(settings.db, new Server(settings.host, settings.port),
 {safe: true});
// 其中通过 new Db(settings.db, new Server(settings.host, settings.port), {safe: true}); 设置数据库名、数据库地址和数据库端口创建了一个数据库连接实例，并通过 module.exports 导出该实例。这样，我们就可以通过 require 这个文件来对数据库进行读写了。

// 打开 app.js，在 var routes = require('./routes/index'); 下添加：
var settings = require('./settings');

npm start

