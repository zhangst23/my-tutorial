Flask-Mail扩展的基本使用.py

安装

pip install flask-mail

使用步骤

配置一些发送邮件的参数例如邮件发送服务器的地址，端口，是否加密等。
初始化flask-mail插件。
创建Message实例，设置发送的内容，地址和主题等信息
使用Mail实例针对Message的实例来发送


和绝大多数的Flask插件一样，要使用Flask插件的时候需要对插件进行初始化，大都 数插件的初始化方式经过Flask封装后变的统一了，大部分情况下都是想如下方式来 进行初始化。其中app是Flask应用的实例。

from flask.ext.mail import Mail
mail = Mail(app)

发送邮件

初始化好Mail插件后就生成了一个mail的实例，接下来就需要创建一个 Message的实例这里面包含了要发送的邮件的所有信息，例如邮件发送的地址，邮 件的主题，邮件的内容，邮件的html模板等。
from flask.ext.mail import Message

def send_email():
	msg = Message("邮件的subject",sender="xxx@xxx.com",recipients=["xxx@xxx.com"])
	msg.body = "邮件的主题内容"
	msg.html = "<h1>邮件的html模板</h1> body"
	#发送邮件
	mail.send(msg)


异步发送邮件

这里通过线程的方式来实现邮件发送，主进程继续完成页面的输出的。从而达到异步的效果。
from threading import Thread

def send_async_email(app,msg):
	with app.app_context():
		mail.send(msg)

def send_email():
	msg = Message("邮件的subject", sender="xxx@xxx.com",
                  recipients=["xxx@xxx.com"])
    msg.body = "邮件的主题内容"
    msg.html = "<h1>邮件的html模板<h1> body"

    # 发送邮件
    thr = Thread(target=send_async_email,args=[app,msg])
    thr.start()
    return "OK"

许多Flask的扩展都是假定自己运行在一个活动的应用和请求上下文中，Flask-Mail 的send函数使用到current_app这个上下文了，所以当mail.send()函数在一个 线程中执行的时候需要人为的创建一个上下文，所有在send_async_email中使用了 app.app_context()来创建一个上下文。

完整实例

下面是一个完整的简单异步发送邮件的实例:
from flask import Flask
from flask import current_app
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(__name__)
db = SQLAlchemy(app)

from flask.ext.mail import Mail
from flask.txt.mail import Message
from threading import Thread

mail = Mail(app)

app.config['MAIL_SERVER']='localhost'
app.config['MAIL_PORT']=25

def send_async_email(app,msg):
	with app.app_context():
		mail.send(msg)

@app.route("/mail")
def SendMail():
	msg = Message('test',sender='zyfforlinux@163.com',recipients=['2243@qq.com'])
	msg.body = "text body"
	msg.html = "<b>HTML</b>body"
	thr = Thread(target=send_async_email,args=[app,msg])
	thr.start()
	return "OK"























