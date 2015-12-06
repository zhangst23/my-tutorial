

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require(“method-override”);

var routes = require('./routes/index');
var users = require('./routes/users');
//创建应用程序
var app = express();

//设置动态页目录 view engine setup   
app.set('views', path.join(__dirname, 'views'));
//设置动态页模板引擎 这里用的是jade引擎
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//中间件加载 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
//指定静态页目录
app.use(express.static(path.join(__dirname, 'public')));
//加载路由处理器
app.use('/', routes);
app.use('/users', users);
app.use('/user',require("./userRouter"));  //加入路由

//如果有任何错误都会设置成404错误 catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
//如果环境设置成 开发模式，那么会打印出详细的错误信息
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
//生产模式下，不会泄露error
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
