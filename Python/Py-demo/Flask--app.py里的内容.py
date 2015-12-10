__author__ = 'zhangxiaodong'


from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World 张晓东!'


if __name__ == '__main__':
    app.debug = True
    app.run()  #或者run(debug=True)


# @app.route('/login',method=['GET','POST'])
# def login():
#     if request.method == 'POST':
#         do_the_login()
#     else:
#         show_the_login_form()


# 请求对象
#  @app.route('/login',method=['GET','POST'])
#  def login():
#      error = None
#      if request.method == 'POST':
#          if valid_login(request.form['username'],
#                         request.form['password']):
#              return log_the_user_in(request.form['username'])
#          else:
#              error = 'Invalid username/password'
#      return render_template('login.html',error=error)
#



#
# 文件上传
# @app.route('/upload',methods=['GET','POST'])
# def upload_file():
#     if request.method == 'POST':
#         f = request.files['the_file']
#         f.save('/var/www/uploads/uploaded_file.txt')
#
#


# Cookies
# 读取 cookies:
# @app.route('/')
# def index():
#     username = request.cookies.get('username')
#
# 存储 cookies:
# @app.route('/')
# def index():
#     resp = make_response(render_template(...))
#     resp.set_cookie('username','the username')
#     return resp




# 重定向和错误
# 你可以用 redirect() 函数把用户重定向到其它地方。放弃请求并返回错误代码，用 abort() 函数。这里是一个它们如何使用的例子:
# @app.route('/')
# def index():
#     return redirect(url_for('login'))
#
# @app.route('login')
# def login():
#     about(401)
#     this_is_never_executed()
#
# 默认情况下，错误代码会显示一个黑白的错误页面。如果你要定制错误页面， 可以使用 errorhandler() 装饰器:
# @app.errorhandler(404)
# def page_not_found(error):
#     return render_template('page_not_found.html'),404



# 消息闪现





































































