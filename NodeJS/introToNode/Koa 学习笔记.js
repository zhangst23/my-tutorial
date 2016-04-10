

1.0 应用
// 简单的 Hello World 应用程序：
var koa = require('koa');
var app = koa();

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);

// 如果使用Koa 2的话：
var Koa = require('koa');
var app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);


2.0 级联代码（Cascading）
// Koa 的做法不是简单的将控制权依次移交给一个又一个的中间件直到程序结束，Koa 执行代码的方式有点像回形针，用户请求通过中间件，遇到 yield next 关键字时，会被传递到下一个符合请求的路由（downstream），在 yield next 捕获不到下一个中间件时，逆序返回继续执行代码（upstream）
var koa = require('koa');
var app = koa();

app.use(function *(next){
	var start = new Date;
	yield next;

	var ms = new Date - start;
	this.set('X-Response-Time', ms + 'ms');
})

app.use(function *(next){
	var start = new Date;
	yield next;

	var ms = new Date - start;
	console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *(){
	this.body = 'Hello World';
});

app.listen(3000);



3. 应用配置（Settings）

// 应用的配置是 app 实例的属性。目前来说，Koa 的配置项如下：

// app.name 应用名称
// app.env 执行环境，默认是 NODE_ENV 或者 "development" 字符串
// app.proxy 决定了哪些 proxy header 参数会被加到信任列表中
// app.subdomainOffset 被忽略的 .subdomains 列表，详见下方 api


4 中间件

koa-router
trie-router
route
basic-auth
etag
compose
static
static-cache
session
compress
csrf
logger
mount
send
error


5 常用方法

app.listen(...)
app.callback()
app.use(function)
将给定的 function 当做中间件加载到应用中，详见 中间件 章节



6 应用上下文（Context）
// 每一个请求都会创建一段上下文。在控制业务逻辑的中间件中，上下文被寄存在 this 对象中：
app.use(function *(){
  this; // 上下文对象
  this.request; // Request 对象
  this.response; // Response 对象
});





























































































