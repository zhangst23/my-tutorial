# Flask蓝图中使用动态URL前缀.py
from flask import Blueprint,render_template

profile = Blueprint('profile',__name__)

@profile.route('/<user_url_slug>')
def timeline(user_url_slug):
	return render_template('profile/timeline.html')

@profile.route('/<user_url_slug>/photos.html')
def photos(user_url_slug):
	return render_template('profile/photos.html')

@profile.route('/<user_url_slug>/about')
def about(user_url_slug):
	return render_template('profile/about.html')



上面我们可以看出，所有的路由都是以user_url_slug开头的，若这样写代码的话，会增加代码的复杂性、降低可维护性。为了解决这个问题，我们可以在蓝图中定义动态的URL前缀。让我们把蓝图定义改成这样：

profile = Blueprint('profile', __name__, url_prefix='/<user_url_slug>')
或者在注册到app时指定：

app.register_blueprint(profile, url_prefix='/<user_url_slug>')

#
@profile.url_value_preprocessor
def pull_user_url_slug(endpoint, values):
    g.user_url_slug = values.pop('user_url_slug')
    query = User.query.filter_by(url_slug=g.user_url_slug)
    g.profile_owner = query.first_or_404()

@profile.route('/')
def timeline():
    return render_template('profile/timeline.html')

@profile.route('/photos')
def photos():
    return render_template('profile/photos.html')

@profile.route('/about')
def about():
    return render_template('profile/about.html')
#

url_value_preprocessor装饰器用于把user_url_slug值弹出，并保存到g变量中，这样就不会传递给路由函数。

实际应用中，我们会发现，若使用url_for来生成URL，会出现参数不足的错误，这是为什么呢？这是因为我们把user_url_slug弹出了，url_for工作时需要使用这个值，但是这个时候这个值找不到了，因此我们要把user_url_slug值重新压入：

@profile.url_defaults
def add_user_url_slug(endpoint, values):
    values.setdefault('user_url_slug', g.user_url_slug)



完整例子：

from flask import Blueprint,render_template

profile = Blueprint('profile',__name__,url_prefix='/<user_url_slug>')

@profile.url_defaults
def add_user_url_slug(endpoint,values):
	values.setdefault('user_url_slug',g.user_url_slug)

@profile.url_value_preprocessor
def pull_user_url_slug(endpoint,values):
	g.user_url_slug = values.pop('user_url_slug')
	query = User.query.filter_by(url_slug=g.user_url_slug)
	g.profile_owner = query.first_or_404()

@profile.route('/')
def timeline():
	return render_template('profile/timeline.html')

@profile.route('/photos')
def photos():
    return render_template('profile/photos.html')

@profile.route('/about')
def about():
    return render_template('profile/about.html')























































































