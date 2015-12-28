Flask-Mail.py

1.0
from flask import Flask
from flask_mail import Mail

app = Flask(__name__)
mail = Mail(app)

2.0
mail = Mail()

app = Flask(__name__)
mail.init_app(app)


3.0  发送邮件
from flask_mail import Message

@app.route("/")
def index():
	msg = Message("Hello",
					send="from@example.com",
					recipients=["to@example.com"])

# 你能够设置一个或者多个收件人:
msg.recipients = ["you@example.com"]
msg.add_recipient("somebodyelse@example.com")

mail.send(msg)


with mail,connect() as conn:
	for user in users:
		message = '...'
		subject = "hello,%s" % user,name
		msg = Message(recipients=[user.email],
					  body=message,
					  subject=subject)
		conn.send(msg)


# 附件
# 在邮件中添加附件同样非常简单:
with app.open_resource("image.png") as fp:
	msg.attach("image.png","image/png",fp.read())
























































