Flask-token-RESTful API.py


1.0 创建用户数据库

# 这个例子比较接近真实的项目，将会使用Flask-SQLAlchemy （ORM）的模块去管理用户数据库。

# user model 非常简单。每个用户只有 username 和 password_hash 两个属性。

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(32), index = True)
    password_hash = db.Column(db.String(128))
# 因为安全的原因，明文密码不可以直接存储，必需经过hash后方可存入数据库。如果数据库被脱了，也是比较难破解的。

# 密码永远不要明文存在数据库中。

2.0  Password Hashing

# 这里使用PassLib库对密码进行hash。

# PassLib提供几种hash算法。custom_app_context模块是基于sha256_crypt加密算法，使用十分简单。

# 对User model增加密码hash和验证有两办法

from passlib.apps import custom cuctom_app_context as pwd_context
class User(db.Model):
	#...
	def hash_password(self,password):
		self.password_hash = pwd_context.encrypt(password)

	def verify_password(self,password):
		return pwd_context.verify(password,self.password_hash)



# 当一个新的用户注册，或者更改密码时，就会调用hash_password()函数，将原始密码作为参数传入hash_password()函数。

#  当验证用户密码时就会调用verify_password()函数,如果密码正确，就返回True，如果不正确就返回False。

# hash算法是单向的，意味着它只能hash密码，但是无法还原密码。但是这些算法是绝对可靠的，输入相同的内容，那么hash后的内容也会是一样的。通常注册或者验证时，对比的是hash后的结果。

用户注册

# 在这个例子里，客户端通过发送 POST 请求到 /api/users 上，并且请求的body部份必需是JSON格式，并且包含 username 和 password 字段。

# Flask 实现的代码：

@app.route('/api/users',methods = ['POST'])
def new_user():
	username = request.json.get('username')
	password = request.json.get('password')
	if username is None or password id None:
		abort(400) # missing arguments
	if User.query.filter_by(username = username).first() is not None:
		abort(400)  # existing user
	user = User(username = username)
	user.hash_password(password)
	db.session.add(user)
	db.session.commit()
	return jsonify({'username':user.username}),201,{'Location':url_for('get_user',id = user.id,_external = True)}



# 这个函数真是简单极了。只是用请求的JSON里面拿到 username 和 password 两个参数。

# 如果参数验证通过，一个User实例被创建，密码hash后，用户资料就存到数据库里面了。

#  请求响应返回的是一个JSON格式的对象，状态码为201，并且在http header里面定义了Location指向刚刚创建的用户的URI。

# 注意：get_user函数没有在这里实现，具体查以查看github。

# 试试使用curl发送一个注册请求：

复制代码
$ curl -i -X POST -H "Content-Type: application/json" -d '{"username":"ok","password":"python"}' http://127.0.0.1:5000/api/users
HTTP/1.0 201 CREATED
Content-Type: application/json
Content-Length: 27
Location: http://127.0.0.1:5000/api/users/1
Server: Werkzeug/0.9.4 Python/2.7.3
Date: Thu, 28 Nov 2013 19:56:39 GMT

{
  "username": "ok"
}
# 通常在正式的服务器里面，最好还是使用https通讯。这样的登录方式，明文通讯是很容易被截取的。

3.0   基于简单密码的认证

# 现在我们假设有一个API只向已经注册好的用户开放。接入点是/api/resource。

# 这里使用HTTP BASIC Authentication的方法来进行验证，我计划使用Flask-HTTPAuth这个扩展来实现这个功能。

# 导入Flask-HTTPAuth扩展模块后，为对应的函数添加login_required装饰器：


from flask.ext.httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

@app.route('/api/resource')
@auth.login_required
def get_resource():
	return jsonify({'data':'Hello',%s! % g.user.username})


# 那么Flask-HTTPAuth（login_required装饰器）需要知道如何验证用户信息，这就需要具体去实现安全验证的方法了。

# 有一种办法是十分灵活的，通过实现verify_password回调函数去验证用户名和密码，验证通过返回True，否则返回False。然后Flask-HTTPAuth再调用这个回调函数，这样就可以轻松自定义验证方法了。（注：Python修饰器的函数式编程）

# 具体实现代码如下：






http://www.cnblogs.com/vovlie/p/4182814.html






































































