# 使用蓝图的模块化应用

# 为了在一个或多个应用中，使应用模块化并且支持常用方案， Flask 引入了 蓝图 概念。蓝图可以极大地简化大型应用并为扩展提供集中的注册入口。 Blueprint 对象与 Flask 应用对象的工作方式类似，但不是一个真正 的应用。它更像一个用于构建和扩展应用的 蓝图 。

# 为什么使用蓝图？
# Flask 中蓝图有以下用途：

# 把一个应用分解为一套蓝图。这是针对大型应用的理想方案：一个项目可以实例化一个 应用，初始化多个扩展，并注册许多蓝图。
# 在一个应用的 URL 前缀和（或）子域上注册一个蓝图。 URL 前缀和（或）子域的参数 成为蓝图中所有视图的通用视图参数（缺省情况下）。
# 使用不同的 URL 规则在应用中多次注册蓝图。
# 通过蓝图提供模板过滤器、静态文件、模板和其他工具。蓝图不必执行应用或视图 函数。
# 当初始化一个 Flask 扩展时，为以上任意一种用途注册一个蓝图。
# Flask 中的蓝图不是一个可插拨的应用，因为它不是一个真正的应用，而是一套可以注册 在应用中的操作，并且可以注册多次。那么为什么不使用多个应用对象呢？可以使用多个 应用对象（参见 应用调度 ），但是这样会导致每个应用都使用自己独立的 配置，且只能在 WSGI 层中管理应用。

# 而如果使用蓝图，那么应用会在 Flask 层中进行管理，共享配置，通过注册按需改变应用 对象。蓝图的缺点是一旦应用被创建后，只有销毁整个应用对象才能注销蓝图。

# 蓝图的概念
# 蓝图的基本概念是：在蓝图被注册到应用之后，所要执行的操作的集合。当分配请求时， Flask 会把蓝图和视图函数关联起来，并生成两个端点之前的 URL 。

# 第一个蓝图
# 以下是一个最基本的蓝图示例。在这里，我们将使用蓝图来简单地渲染静态模板:

from flask import Blueprint,render_template,abort
from jinja2 import TemplateNotFound

simple_page = Blueprint('simple_page',__name__,
	template_folder='templates')

@simple_page.route('/',defaults={'page':'index'})
@simple_page.route('/<page>')
def show(page):
	try:
		return render_template('pages/%s.html' % page)
	except TemplateNotFound:
		abort(404)

# 当你使用 @simple_page.route 装饰器绑定一个函数时，蓝图会记录下所登记的 show 函数。当以后在应用中注册蓝图时，这个函数会被注册到应用中。另外，它会把 构建 Blueprint 时所使用的名称（在本例为 simple_page ）作为函数端点 的前缀。

注册蓝图
# 可以这样注册蓝图:
from flask import Flask
from yourapplication.simple_page import simple_page

app = Flask(__name__)
app.register_blueprint(simple_page)

# 蓝图还可以挂接到不同的位置:
app.register_blueprint(simple_page,url_prefix='/pages')

静态文件¶
# 蓝图的第三个参数是 static_folder 。这个参数用以指定蓝图的静态文件所在的 文件夹，它可以是一个绝对路径也可以是相对路径。:
admin = Blueprint('admin',__name__,static_folder='static')

# 缺省情况下，路径最右端的部分是在 URL 中暴露的部分。上例中的文件夹为 static ，那么 URL 应该是蓝图加上 /static 。蓝图注册为 /admin ，那么 静态文件夹就是 /admin/static 。

# 端点的名称是 blueprint_name.static ，因此你可以使用和应用中的文件夹一样的方法 来生成其 URL:
url_for('admin.static',filename='style.css')


模板
# 如果你想使用蓝图来暴露模板，那么可以使用 Blueprint 的 template_folder 参数:

admin = Blueprint('admin', __name__, template_folder='templates')

创建 URL
如果要创建页面链接，可以和通常一样使用 url_for() 函数，只是要把蓝图名称作为端点的前缀，并且用一个点（ . ）来 分隔:

url_for('admin.index')
另外，如果在一个蓝图的视图函数或者被渲染的模板中需要链接同一个蓝图中的其他 端点，那么使用相对重定向，只使用一个点使用为前缀:

url_for('.index')
如果当前请求被分配到 admin 蓝图端点时，上例会链接到 admin.index 。




2.0  
什么是蓝图？

一个蓝图定义了视图，模板，静态文件以及可以用于应用程序的其它元素的集合。例如，让我们假设下我们有一个管理面板的蓝图。这个蓝图会定义一些包含像 /admin/login 和 /admin/dashboard 路由的视图。它也可能包含服务于这些路由的模板以及静态文件。接着我们可以使用这个蓝图添加一个管理面板到我们的应用程序中，不论我们的应用程序是什么类型的。

为什么要使用蓝图？
蓝图“杀手级”使用场景就是把我们的应用程序组织成不同的组件。对于一个类似 Twitter 的微型博客，我们可能有一个针对网站页面的蓝图，例如，index.html 和 about.html。接着我们还有另外一个带有登录面板的蓝图，在那里我们显示了所有最新的文章，然后我们还有一个用于后台管理的面板的蓝图。网站的每一个不同的区域也能够被分成不同区域的代码来实现。这能够让我们用几个小的 “apps” 构建我们的应用程序，每一个 apps 都在做一件事情。



分区
对于分区结构了，你可以基于它们有助于应用程序的哪一部分来组织应用程序的结构。管理面板所有的模板，视图以及静态文件都在一个文件夹中，用户控制的所有的模板，视图和静态文件在另一个文件夹中。

yourapp/
    __init__.py
    admin/
        __init__.py
        views.py
        static/
        templates/
    home/
        __init__.py
        views.py
        static/
        templates/
    control_panel/
        __init__.py
        views.py
        static/
        templates/
    models.py
像上面列出的应用程序的分区结构，在 yourapp/ 中每一个文件夹都是一个单独的蓝图。所有的这些蓝图都会应用到顶层 __init__.py 中的 Flask() 对象中。


哪一个是最好的？
你选择的组织结构很大程度上是一种个人决定。唯一的区别是层次结构的表示方式，因此你可以自由地决策要使用的组织结构，你可以选择一个对自己有意义的。

如果你的应用程序大部分是独立的结构，仅仅共享着像模型和配置，分区结构就是合适的选择方式。一个例子就是让用户建立网站的 SaaS 应用程序。你可能就有蓝图分别针对主页，控制面板，用户网站，以及管理面板。这些组件可能有完全不同的静态文件和布局。如果考虑负责这个应用程序或者分拆/重构这个应用程序的话，分区结构会更加适用一些。

另一方面，如果你的应用程序联系地更加紧密一些的话，它可能用一个功能结构呈现更加合适。一个示例就是 Facebook。如果 Facebook 使用 Flask 的话，它可能就有静态页（例如，登录-注销页，注册，关于等等），控制面板（例如，新闻源），个人主页（/robert/about 以及 /robert/photos），设置（/settings/security 和 /settings/privacy）等等一些蓝图。这些组件共享一个通用的布局和样式，但是每一个也会有自己的布局。下面的列表中展示了一个进行大量删减版的 Facebook 的样子，如果它是使用 Flask 构建的话。

facebook/
    __init__.py
    templates/
        layout.html
        home/
            layout.html
            index.html
            about.html
            signup.html
            login.html
        dashboard/
            layout.html
            news_feed.html
            welcome.html
            find_friends.html
        profile/
            layout.html
            timeline.html
            about.html
            photos.html
            friends.html
            edit.html
        settings/
            layout.html
            privacy.html
            security.html
            general.html
    views/
        __init__.py
        home.py
        dashboard.py
        profile.py
        settings.py
    static/
        style.css
        logo.png
    models.py
在 facebook/views/ 中的蓝图仅仅是视图的集合而不是完全独立的组件。同一的静态文件将会被大多数的蓝图的视图使用。大多数模板都会扩展一个主模板。功能结构是组织这个项目的一种好的方式。

你如何使用它们？
基本用法
让我们看看 Facebook 示例中的其中一个蓝图的代码。

#facebook/views/profile.py
from flask import Blueprint,render_template

profile = Blueprint('profile',__name__)

@profile.route('/<user_url)slug>')
def timeline(user_url_slug):
	# Do some stuff
	return render_template('profile/timeline.html')

@profile.route('/<user_url_slug>/photos')
def photos(user_url_slug):
	# Do some stuff
	return render_template('profile/photos.html')

@profile.route('/<user_url_slug>/about')
def about(user_url_slug):
	# Do some stuff
	return render_template('profile/about.html')


# 要创建一个蓝图对象，我们先导入 Blueprint() 类并且用参数 name 和 import_name 初始化它。通常情况下，import_name 就是 __name__，这是一个包含当前模块名称的特殊 Python 变量。

# 在这个 Facebook 示例中我们使用了一个功能结构。如果我们使用分区结构的话，我们要通知 Flask 蓝图有自己的模板和静态文件夹。此块的代码大概的样子如下所示。

profile = Blueprint('profile', __name__,
                    template_folder='templates',
                    static_folder='static')
# 现在我们已经定义我们的蓝图。是时候在我们的 Flask 应用程序中注册它。

# facebook/__init__.py
from flask import Flask
from .views.profile import profile

app = Flask(__name__)
app.register_blueprint(profile)

# 现在定义在 facebook/views/profile.py 上的路由（例如，/<user_url_slug>）在应用程序上注册并且表现得像你使用 @app.route() 定义它们一样。

# 使用动态的 URL 前缀
# 继续 Facebook 例子，注意到所有的用户资料路由都是以 <user_url_slug> 开始并且把它的值传递给视图。我们希望用户们能够通过浏览像 https://facebo-ok.com/john.doe 类似的网址访问用户资料页。我们可以通过为所有的蓝图的路由定义一个动态的前缀来停止重复工作。

# 蓝图可以让我们定义动态和静态的前缀。我们可以通知 Flask 在一个蓝图中的所有的路由都是以 /profile 为前缀的（这里的 /profile 只是一个示例），这就是一个静态的前缀。至于 Facebook 示例，前缀是基于浏览的用户资料而变化。无论他们浏览哪个用户的个人资料，我们都应该在 URL 标签中显示。这就是一个动态的前缀。

# 我们可以选择在什么时候定义我们的前缀。我们可以在两个地方中的任意一个定义前缀：当我们实例化 Blueprint() 类或者当我们用 app.register_blueprint() 注册它的时候。


2
3
4
5
6
7
# facebook/views/profile.py

from flask import Blueprint, render_template

profile = Blueprint('profile', __name__, url_prefix='/<user_url_slug>')

# [...]
1
2
3
4
5
6
7
# facebook/__init__.py

from flask import Flask
from .views.profile import profile

app = Flask(__name__)
app.register_blueprint(profile, url_prefix='/<user_url_slug>')
尽管没有任何技术因素限制任何一种方法，最好是在注册的时候统一定义可用的前缀。这使得以后修改或者调整更加容易和方便些。因为这个原因，我建议在注册的时候设置 url_prefix。

我们可以在动态前缀中使用转换器，就像在 route() 调用中一样。这个也包含了我们自定义的转换器。当使用了转换器，我们可以在把前缀交给视图之前进行预处理。在这个例子中我们要基于传入到我们用户资料蓝图的 URL 中的 user_url_slug 来获取用户对象。这里我们需要使用 url_value_preprocessor() 装饰一个函数来完成这个需求。

 
# facebook/views/profile.py

from flask import Blueprint, render_template, g

from ..models import User

# The prefix is defined on registration in facebook/__init__.py.
profile = Blueprint('profile', __name__)

@profile.url_value_preprocessor
def get_profile_owner(endpoint, values):
    query = User.query.filter_by(url_slug=values.pop('user_url_slug'))
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
我们使用 g 对象来存储用户对象并且 g 可以在 Jinja2 模板中使用。这就意味着对于实现一个极其简单的系统的话，我们现在要做的就是在视图中渲染模板。

1
2
3
4
5
6
7
{# facebook/templates/profile/photos.html #}

{% extends "profile/layout.html" %}

{% for photo in g.profile_owner.photos.all() %}
    <img src="{{ photo.source_url }}" alt="{{ photo.alt_text }}" />
{% endfor %}










































