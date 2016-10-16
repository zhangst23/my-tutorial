var express = require('express');
//创建一个路由器
var router = express.Router();

/* GET home page. */
//为路由器添加路由处理器，也就是为'/'请求路由加入处理器
//当有人访问时会执行这个函数
//req 是请求对象，res 是响应对象
router.get('/', function(req, res, next) {
	//调用响应对象的render返回给客户端一个响应结果
	//这个响应结果是由动态页面 views/index.jade 生成的。
  res.render('index', { title: 'ExpressJS' });
});

module.exports = router;


