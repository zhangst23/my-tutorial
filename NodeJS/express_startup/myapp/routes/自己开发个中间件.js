// 自己开发个中间件middleware.js
var express = require('express');
var app = express();

//中间件01
function middle01(req,res,next){
	req.siteName = "jsera.net - 开辟Javascript新纪元的网络平台";
	next();
}


//中间件02
function middle02(){
	var accessNum = 0;
	return function(req,res,next){
		accessNum += 1;
		req.accessNum = accessNum;
		next();
	}
}

app.use(middle01);
app.use(middle02);

app.get("/",function(req,res){
	res.send(req.siteName + "\n" + "网站访问人数：" + req.accessNum);
})

app.listen(3000);





