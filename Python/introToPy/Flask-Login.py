Flask-Login.py

1.0  配置你的应用
# 对一个使用 Flask-Login 的应用最重要的一部分就是 LoginManager 类。你应该在你的代码的某处为应用创建一个，像这样:

login_manager = LoginManager()
# 登录管理(login manager)包含了让你的应用和 Flask-Login 协同工作的代码，比如怎样从一个 ID 加载用户，当用户需要登录的时候跳转到哪里等等。

# 一旦实际的应用对象创建后，你能够这样配置它来实现登录:

login_manager.init_app(app)


2.0  它是如何工作
# 你必须提供一个 user_loader 回调。这个回调用于从会话中存储的用户 ID 重新加载用户对象。它应该接受一个用户的 unicode ID 作为参数，并且返回相应的用户对象。比如:
@login_manager.user_loader
def load_user(userid):
	return User.get(userid)

# 如果 ID 无效的话，它应该返回 None (而不是抛出异常)。(在这种情况下，ID 会被手动从会话中移除且处理会继续)


3.0
is_authenticated
is_active
is_anonymous
get_id



4.0  Login示例
# 一旦用户通过验证，你可以使用 login_user 函数让用户登录。例如:

@app.route('/login',methods=['GET','POST'])
def login():
	form = LoginForm()
	if form.validate_on_submit():
		login_user(user)

		flask.flash('Logged in successfully.')

		next = flask.request.args.get('next')

		if not next_is_valid(next):
			return flask.abort(400)

		return flask.redirect(next or flask.url_for('index'))
	return flask.render_template('login.html',form=form)

# 警告: 你必须验证 next 参数的值。如果不验证的话，你的应用将会受到重定向的攻击。

# 就这么简单。你可用使用 current_user 代理来访问登录的用户，在每一个模板中都可以使用 current_user:

{% if current_user.is_authenticated() %}
	Hi {{ current_user.name }}
{% endif %}

# 需要用户登入 的视图可以用 login_required 装饰器来装饰:

@app.route("/settings")
@login_required
def setting():
	pass

# 当用户要登出时:
@app.route("/logout")
@login_required
def logout():
	logout_user()
	return redirect(showwhere)
# 他们会被登出，且他们会话产生的任何 cookie 都会被清理干净。



5.0   定制登入过程
# 默认情况下，当未登录的用户尝试访问一个 login_required 装饰的视图，Flask-Login 会闪现一条消息并且重定向到登录视图。(如果未设置登录视图，它将会以 401 错误退出。)

# 登录视图的名称可以设置成 LoginManager.login_view。例如:
login_manager.login_view = "users.login"

# 默认的闪现消息是 Please log in to access this page.。要自定义该信息，请设置 LoginManager.login_message:
login_manager.login_message = u"请登录。。。"

# 要自定义消息分类的话，请设置 LoginManager.login_message_category:
login_manager.login_message_category = "info"

# 当重定向到登入视图，它的请求字符串中会有一个 next 变量，其值为用户之前访问的页面。
# 如果你想要进一步自定义登入过程，请使用 LoginManager.unauthorized_handler 装饰函数:
@login_manager.unauthorized_handler
def unauthorized():
	# do stuff
	return a_response

6.0   使用 Request Loader 定制登录¶
# 有时你想要不使用 cookies 情况下登录用户，比如使用 HTTP 头或者一个作为查询参数的 api 密钥。这种情况下，你应该使用 request_loader 回调。这个回调和 user_loader 回调作用一样，但是 user_loader 回调只接受 Flask 请求而不是一个 user_id。

# 例如，为了同时支持一个 url 参数和使用 Authorization 头的基本用户认证的登录:
@login_manager.request_loader
def load_user_from_request(request):
	# first,try to login using the api_key url arg
	api_key = request.args.get('api_key')
	if api_key:
		user = User.query.filter_by(api_key=api_key).first()
		if user:
			return user

	# next,try to login using Basic Auth
	api_key = request.headers.get('Authorization')
	if api_key:
		api_key = api_key.replace('Basic','',1)
		try:
			api_key = base64.b64decode(api_key)
		except TypeError:
			pass
		user = User.query.filter_by(api_key=api_key).first()
		if user:
			return user
	# finally ,return None if both methods did not login the user
	return None




7.0   记住我
# “记住我”的功能很难实现。但是，Flask-Login 几乎透明地实现它 - 只要把 remember=True 传递给 login_user。
# 一个 cookie 将会存储在用户计算机中，如果用户会话中没有用户 ID 的话，Flask-Login 会自动地从 cookie 中恢复用户 ID。
# cookie 是防纂改的，因此如果用户纂改过它(比如，使用其它的一些东西来代替用户的 ID)，它就会被拒绝，就像不存在。

# 该层功能是被自动实现的。但你能（且应该，如果你的应用处理任何敏感的数据）提供 额外基础工作来增强你记住的 cookie 
# 的安全性。










































































