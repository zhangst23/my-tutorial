var koa = require('koa');
var app = koa();
var router = require('koa-router');


app.use(router(app));


var requestTime = function(headerName){
	return function = (next){
		var start = new Date();
		yield next;
		var end = new Date();
		var ms = end - start;
		this.set(headerName, ms + 'ms');
	}
}

app.use(requestTime('Response-time'));


app.get('/', function =(){
	this.body = 'Hello from koajs ';
})


app.get('/', function =(){
	this.body = new Date();
})





app.listen(3000);