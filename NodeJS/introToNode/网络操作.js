// 网络操作.js
url:    http://nqdeng.github.io/7-days-nodejs/#3

// 不了解网络编程的程序员不是好前端，而NodeJS恰好提供了一扇了解网络编程的窗口。通过NodeJS，除了可以编写一些服务端程序来协助前端开发和测试外，还能够学习一些HTTP协议与Socket协议的相关知识，这些知识在优化前端性能和排查前端故障时说不定能派上用场。本章将介绍与之相关的NodeJS内置模块。

1.0  开门红

// NodeJS本来的用途是编写高性能Web服务器。我们首先在这里重复一下官方文档里的例子，使用NodeJS内置的http模块简单实现一个HTTP服务器。
var http = require('http');

http.createServer(function(request,response){
	response.writeHead(200,{ 'Content-Type':'text-plain' });
	response.end('Hello World\n');
}).listen(8124);

// 以上程序创建了一个HTTP服务器并监听8124端口，打开浏览器访问该端口http://127.0.0.1:8124/就能够看到效果。

// 豆知识： 在Linux系统下，监听1024以下端口需要root权限。因此，如果想监听80或443端口的话，需要使用sudo命令启动程序。

2.0  API走马观花

// 我们先大致看看NodeJS提供了哪些和网络操作有关的API。这里并不逐一介绍每个API的使用方法，官方文档已经做得很好了。

2.1  HTTP

// 'http'模块提供两种使用方式：

// 			~作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应。

// 			~作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应。

// 首先我们来看看服务端模式下如何工作。如开门红中的例子所示，首先需要使用.createServer方法创建一个服务器，然后调用.listen方法监听端口。之后，每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。可以看出，这是一种事件机制。

// HTTP请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。例如以下是一个完整的HTTP请求数据内容。

POST / HTTP/1.1
User-Agent: curl/7.26.0
Host: localhost
Accept: 
Content-Length: 11
Content-Type: application/x-www-form-urlencoded

Hello World

// 可以看到，空行之上是请求头，之下是请求体。HTTP请求在发送给服务器时，可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的。而http模块创建的HTTP服务器在接收到完整的请求头后，就会调用回调函数。在回调函数中，除了可以使用request对象访问请求头数据外，还能把request对象当作一个只读数据流来访问请求体数据。以下是一个例子。

http.createServer(function(request,response){
	var body = [];

	console.log(request.method);
	console.log(request.headers);

	request.on('data',function(chunk){
		body.push(chunk);
	});

	request.on('end',function(){
		body = Buffer.concat(body);
		console.log(body.toString());
	});
}).listen(80);

------------------------------------
POST
{ 'user-agent': 'curl/7.26.0',
  host: 'localhost',
  accept: '*/*',
  'content-length': '11',
  'content-type': 'application/x-www-form-urlencoded' }
Hello World


// HTTP响应本质上也是一个数据流，同样由响应头（headers）和响应体（body）组成。例如以下是一个完整的HTTP请求数据内容。

HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 11
Date: Tue, 05 Nov 2013 05:31:38 GMT
Connection: keep-alive

Hello World

// 在回调函数中，除了可以使用response对象来写入响应头数据外，还能把response对象当作一个只写数据流来写入响应体数据。例如在以下例子中，服务端原样将客户端请求的请求体数据返回给客户端。

http.createServer(function(request,response){
	response.writeHead(200,{ 'Content-Type':'text/plain' });
	request.on('data',function(chunk){
		response.write(chunk);
	});
	request.on('end',function(){
		response.end();
	});
}).listen(80);

// 接下来我们看看客户端模式下如何工作。为了发起一个客户端HTTP请求，我们需要指定目标服务器的位置并发送请求头和请求体，以下示例演示了具体做法。

var options = {
	hostname:'www.example.com',
	port:80,
	path:'/upload',
	method:'POST',
	headers:{
		'Content-Type':'application/x-www-form-urlencoded'
	}
};

var request = http.request(options,function(response){});

request.write('Hello World');
request.end();

// 可以看到，.request方法创建了一个客户端，并指定请求目标和请求头数据。之后，就可以把request对象当作一个只写数据流来写入请求体数据和结束请求。另外，由于HTTP请求中GET请求是最常见的一种，并且不需要请求体，因此http模块也提供了以下便捷API。

http.get('http://www.example.com/', function (response) {});

// 当客户端发送请求并接收到完整的服务端响应头时，就会调用回调函数。在回调函数中，除了可以使用response对象访问响应头数据外，还能把response对象当作一个只读数据流来访问响应体数据。以下是一个例子。

http.get('http://www.example.com/', function (response) {
    var body = [];

    console.log(response.statusCode);
    console.log(response.headers);

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
});

------------------------------------
200
{ 'content-type': 'text/html',
  server: 'Apache',
  'content-length': '801',
  date: 'Tue, 05 Nov 2013 06:08:41 GMT',
  connection: 'keep-alive' }
<!DOCTYPE html>
...


2.2    HTTPS

// 官方文档： http://nodejs.org/api/https.html

// https模块与http模块极为类似，区别在于https模块需要额外处理SSL证书。

// 在服务端模式下，创建一个HTTPS服务器的示例如下。

var options = {
        key: fs.readFileSync('./ssl/default.key'),
        cert: fs.readFileSync('./ssl/default.cer')
    };

var server = https.createServer(options, function (request, response) {
        // ...
    });
// 可以看到，与创建HTTP服务器相比，多了一个options对象，通过key和cert字段指定了HTTPS服务器使用的私钥和公钥。

// 另外，NodeJS支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，因此同一个HTTPS服务器可以使用多个域名提供服务。接着上例，可以使用以下方法为HTTPS服务器添加多组证书。

server.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.com.key'),
    cert: fs.readFileSync('./ssl/bar.com.cer')
});
// 在客户端模式下，发起一个HTTPS客户端请求与http模块几乎相同，示例如下。

var options = {
        hostname: 'www.example.com',
        port: 443,
        path: '/',
        method: 'GET'
    };

var request = https.request(options, function (response) {});

request.end();
// 但如果目标服务器使用的SSL证书是自制的，不是从颁发机构购买的，默认情况下https模块会拒绝连接，提示说有证书安全问题。在options里加入rejectUnauthorized: false字段可以禁用对证书有效性的检查，从而允许https模块请求开发环境下使用自制证书的HTTPS服务器。



2.3    URL

// 官方文档： http://nodejs.org/api/url.html

// 处理HTTP请求时url模块使用率超高，因为该模块允许解析URL、生成URL，以及拼接URL。首先我们来看看一个完整的URL的各组成部分
我们可以使用.parse方法来将一个URL字符串转换为URL对象
反过来，format方法允许将一个URL对象转换为URL字符串
另外，.resolve方法可以用于拼接URL



2.4    Query String

官方文档： http://nodejs.org/api/querystring.html

querystring模块用于实现URL参数字符串与参数对象的互相转换，

querystring.parse('foo=bar&baz=qux&baz=quux&corge');
/* =>
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
*/

querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
/* =>
'foo=bar&baz=qux&baz=quux&corge='
*/


2.5    Zlib

官方文档： http://nodejs.org/api/zlib.html

zlib模块提供了数据压缩和解压的功能。当我们处理HTTP请求和响应时，可能需要用到这个模块。

首先我们看一个使用zlib模块压缩HTTP响应体数据的例子。这个例子中，判断了客户端是否支持gzip，并在支持的情况下使用zlib模块返回gzip之后的响应体数据。





灵机一点

使用NodeJS操作网络，特别是操作HTTP请求和响应时会遇到一些惊喜，这里对一些常见问题做解答。

问： 为什么通过headers对象访问到的HTTP请求头或响应头字段不是驼峰的？

答： 从规范上讲，HTTP请求头和响应头字段都应该是驼峰的。但现实是残酷的，不是每个HTTP服务端或客户端程序都严格遵循规范，所以NodeJS在处理从别的客户端或服务端收到的头字段时，都统一地转换为了小写字母格式，以便开发者能使用统一的方式来访问头字段，例如headers['content-length']。

问： 为什么http模块创建的HTTP服务器返回的响应是chunked传输方式的？

答： 因为默认情况下，使用.writeHead方法写入响应头后，允许使用.write方法写入任意长度的响应体数据，并使用.end方法结束一个响应。由于响应体数据长度不确定，因此NodeJS自动在响应头里添加了Transfer-Encoding: chunked字段，并采用chunked传输方式。但是当响应体数据长度确定时，可使用.writeHead方法在响应头里加上Content-Length字段，这样做之后NodeJS就不会自动添加Transfer-Encoding字段和使用chunked传输方式。

问： 为什么使用http模块发起HTTP客户端请求时，有时候会发生socket hang up错误？

答： 发起客户端HTTP请求前需要先创建一个客户端。http模块提供了一个全局客户端http.globalAgent，可以让我们使用.request或.get方法时不用手动创建客户端。但是全局客户端默认只允许5个并发Socket连接，当某一个时刻HTTP客户端请求创建过多，超过这个数字时，就会发生socket hang up错误。解决方法也很简单，通过http.globalAgent.maxSockets属性把这个数字改大些即可。另外，https模块遇到这个问题时也一样通过https.globalAgent.maxSockets属性来处理。

小结

本章介绍了使用NodeJS操作网络时需要的API以及一些坑回避技巧，总结起来有以下几点：

http和https模块支持服务端模式和客户端模式两种使用方式。

request和response对象除了用于读写头数据外，都可以当作数据流来操作。

url.parse方法加上request.url属性是处理HTTP请求时的固定搭配。

使用zlib模块可以减少使用HTTP协议时的数据传输量。

通过net模块的Socket服务器与客户端可对HTTP协议做底层操作。

小心踩坑。
































