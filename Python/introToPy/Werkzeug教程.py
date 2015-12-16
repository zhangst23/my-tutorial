Werkzeug教程.py

请记住Werkzeug不是框架，而是一个可以创建你自己的框架或应用的、非常灵活的库。

# 这里我们将会创建一个仿制TinyURL的应用，将URLs存储到一个redis实例。为了这个应用，我们将会使用的库包括，用于模板的Jinja 2、用于数据库层的redis和用于WSGI层的Werkzeug。

# 你可以使用pip安装需要的库：
$ pip install Jinja2 redis

# 你还需要确保在本地机器上正在运行着一个redis服务器。如果你在使用OS X，你可以使用brew来安装它：
$ brew install redis  

# [译者：可能还需要添加redis的python支持，在终端执行sudo easy_install redis即可。]

# 数据存储方面，我们这里将会使用redis来代替关系型数据库，以保持其简洁性。这正是redis擅长的工作类型。


1.0  WSGI基础介绍
# 在没有Werkzeug帮助下，用WSGI实现的一个基本“Hello World”应用看起来是这样的：
def application(environ,start_response):
	start_response('200 OK',[('Content-Type','text/plain')])
	return ['Hello World!']

# WSGI应用是你可以调用、传递一个environ字典和一个start_response函数的东西。environ包含所有的传入信息，start_response函数可以用来指示response的开始。使用Werkzeug之后，你将不再需要直接处理被提交上来的请求（request）和应答（response）对象。

# 请求数据获取environ对象，并允许你以一种良好的方式访问environ中的数据。response对象本身也是一个WSGI应用，提供了很多友好的创建response的方法。

# 下面的代码演示了如何编写带有response对象的应用：
from werkzeug.wrappers import Response
def application(environ,start_response):
	response = Response('Hello World',mimetype='text/plain')
	return response(environ,start_response)

# 下面是一个可以查看URL中查询字符串的扩展版本（不同之处在于，它查找URL中的name参数的值，并替换单词”World”）：
from werkzeug.wrappers import Response,Request
def application(environ,start_response):
	request = Request(environ)
	text = 'Hello %s!' % request.args.get('name','world')
	response = Response(text,mimetype='text/plain')
	return response(environ,start_response)
































