测试Flask-Testing.py


1.0   
pip install Flask-Testing

# 或者
# git clone https://github.com/jarus/flask-testing.git
# cd flask-testing
# python setup.py develop



2.0  编写测试用例
# 简单地继承 TestCase 的 MyTest:
from flask.ext.testing import TestCase

class MyTest(TestCase):
	pass


# 你必须定义 create_app 方法，该方法返回一个 Flask 实例:
from flask import Flask
from flask.ext.testing import TestCase

class MyTest(TestCase):
	def create_app(self):
		app = Flask(__name__)
		app.config['TESTING'] = True
		return app


# 如果不定义 create_app，NotImplementedError 异常将会抛出。

3.0  使用 LiveServer 测试
# 如果你想要你的测试通过 Selenium 或者 无头浏览器(无头浏览器的意思就是无外设的意思，可以在命令行下运行的浏览器)运行，你可以使用 LiveServerTestCase:
import urllib2
from flask import Flask
from flask.ext.testing import LiveServerTestCase

class MyTest(LiveServerTestCase):

	def create_app(self):
		app = Flask(__name__)
		app.config['TESTING'] = True
		app.config['LIVESERVER_PORT'] = 8943
		return app

	def rest_server_is_up_and_running(self):
		response = urllib2.urlopen(self.get_server_url())
		self.assertEqual(response.code,200)

# 在这个例子中 get_server_url 方法将会返回 http://localhost:8943。

4.0  测试 JSON 响应
# 如果你正在测试一个返回 JSON 的视图函数的话，你可以使用 Response 对象的特殊的属性 json 来测试输出:
@app.route("/ajax/")
def some_json():
	return jsonify(success=True)

class TestViews(TestCase):
	def test_some_json(self):
		response = self.client.get("/ajax/")
		self.assertEquals(response.json,dict(success=True))





未完
http://www.pythondoc.com/flask-testing/index.html






































































































