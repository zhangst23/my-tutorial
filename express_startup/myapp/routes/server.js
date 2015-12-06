var express = require('express');
var path = require("path");

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');



// //加入验证器
// app.use("/user",require("./validat"));

//加入路由
app.use("/user",require("./router/user"));

app.listen(3000);