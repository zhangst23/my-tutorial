配置管理config.py

# 应用总是需要一定的配置的。根据应用环境不同，会需要不同的配置。比如开关调试 模式、设置密钥以及其他依赖于环境的东西。

# Flask 的设计思路是在应用开始时载入配置。你可以在代码中直接硬编码写入配置，对于 许多小应用来说这不一定是一件坏事，但是还有更好的方法。

# 不管你使用何种方式载入配置，都可以使用 Flask 的 config 属性来操作配置的值。 Flask 本身就使用这个对象来保存 一些配置，扩展也可以使用这个对象保存配置。同时这也是你保存配置的地方。

# 配置入门
# config 实质上是一个字典的子类，可以像字典一样操作:
app = Flask(__name__)
app.config['DEBUG'] = True
# 某些配置值还转移到了 Flask 对象中，可以直接通过 Flask 来操作:
app.debug = True
# 一次更新多个配置值可以使用 dict.update() 方法:
app.config.update(
	DEBUG = True,
	SECRET_KEY='...'
)


DEBUG	开关调试模式
TESTING	开关测试模式
PROPAGATE_EXCEPTIONS	显式开关异常的传播。当 TESTING 或 DEBUG 为真时，总是开启的。
PRESERVE_CONTEXT_ON_EXCEPTION	缺省情况下，如果应用在调试模式下运行， 那么请求环境在发生异常时不会被弹出，以 方便调试器内省数据。可以通过这个配置来 禁止这样做。还可以使用这个配置强制不执行 调试，这样可能有助于调试生产应用（风险 大）。
SECRET_KEY	密钥
SESSION_COOKIE_NAME	会话 cookie 的名称
SESSION_COOKIE_DOMAIN	会话 cookie 的域。如果没有配置，那么 SERVER_NAME 的所有子域都可以使用 这个 cookie 。
SESSION_COOKIE_PATH	会话 cookie 的路径。如果没有配置，那么 所有 APPLICATION_ROOT 都可以使用 cookie 。如果没有设置 APPLICATION_ROOT ，那么 '/' 可以 使用 cookie 。
SESSION_COOKIE_HTTPONLY	设置 cookie 的 httponly 标志，缺省为 True 。
SESSION_COOKIE_SECURE	设置 cookie 的安全标志，缺省为 False 。
PERMANENT_SESSION_LIFETIME	常驻会话的存活期，其值是一个 datetime.timedelta 对象。 自 Flask 0.8 开始，其值可以是一个整数， 表示秒数。
USE_X_SENDFILE	开关 x-sendfile
LOGGER_NAME	日志记录器的名称
SERVER_NAME	服务器的名称和端口号，用于支持子域（如： 'myapp.dev:5000' ）。注意设置为 “ localhost ”没有用，因为 localhost 不 支持子域。设置了 SERVER_NAME 后，在 缺省情况下会启用使用应用环境而不使用请求 环境的 URL 生成。
APPLICATION_ROOT	如果应用不占用整个域或子域，那么可以用 这个配置来设定应用的路径。这个配置还用作 会话 cookie 的路径。如果使用了整个域， 那么这个配置的值应当为 None 。
MAX_CONTENT_LENGTH	这个配置的值单位为字节，如果设置了，那么 Flask 会拒绝超过设定长度的请求，返回一个 413 状态码。
SEND_FILE_MAX_AGE_DEFAULT	send_static_file() （ 缺省静态文件处理器）和 send_file() 使用的缺省缓存 最大存活期控制，以秒为单位。把 get_send_file_max_age() 分别挂勾到 Flask 或 Blueprint 上，可以重载每个 文件的值。缺省值为 43200 （ 12 小时）。
TRAP_HTTP_EXCEPTIONS	如果设置为 True ，那么 Flask 将不 执行 HTTP 异常的错误处理，而是把它像其它 异常同样对待并把它压入异常堆栈。当你在 必须查找出一个 HTTP 异常来自哪里的情况下 这个 配置比较有用。
TRAP_BAD_REQUEST_ERRORS	Werkzeug 用于处理请求特殊数据的内部数据 结构会引发坏请求异常。同样，许多操作为了 一致性会使用一个坏请求隐藏操作失败。在 这种情况下，这个配置可以在调试时辨别到底 为什么会失败。如果这个配置设为 True ，那么就只能得到一个普通的反馈。
PREFERRED_URL_SCHEME	在没有可用的模式的情况下， URL 生成所 使用的 URL 模式。缺省值为 http 。
JSON_AS_ASCII	缺省情况下 Flask 把对象序列化为 ascii-encoded JSON 。如果这个参数值为 False ，那么 Flask 就不会把对象编码 为 ASCII ，只会原样输出返回 unicode 字符 串。 jsonfiy 会自动把对象编码 utf-8 字符用于传输。
JSON_SORT_KEYS	缺省情况下 Flask 会按键值排序 JSON 对象， 这是为了确保字典的哈希种子的唯一性，返回 值会保持一致，不会破坏外部 HTTP 缓存。 改变这个参数的值就可以重载缺省的行为， 重载后可能会提高缓存的性能，但是不推荐 这样做。
JSONIFY_PRETTYPRINT_REGULAR	如果这个参数设置为 True （缺省值）， 并且如果 jsonify 响应不是被一个 XMLHttpRequest 对象请求的（由 X-Requested-With 头部控制），那么 就会被完美打印。



# 使用配置文件¶
# 如果把配置放在一个单独的文件中会更有用。理想情况下配置文件应当放在应用包的 外面。这样可以在修改配置文件时不影响应用的打包与分发（ 使用 Distribute 部署 ）。

# 因此，常见用法如下:
app = Flask(__name__)
app.config.from_object('yourapplication.default_settings')
app.config.from_envvar('YOURAPPLICATION_SETTINGS')


开发/生产
# 大多数应用需要一个以上的配置。最起码需要一个配置用于生产服务器，另一个配置用于 开发。应对这种情况的最简单的方法总是载入一个缺省配置，并把这个缺省配置作为版本 控制的一部分。然后，把需要重载的配置，如前文所述，放在一个独立的文件中:

app = Flask(__name__)
app.config.from_object('yourapplication.default_settings')
app.config.from_envvar('YOURAPPLICATION_SETTINGS')
# 然后你只要增加一个独立的 config.py 文件并导出 YOURAPPLICATION_SETTINGS=/path/to/config.py 就可了。当然还有其他方法可选， 例如可以使用导入或子类。

# 在 Django 应用中，通常的做法是在文件的开关增加 from yourapplication.default_settings import * 进行显式地导入，然后手工重载 配置。你还可以通过检查一个 YOURAPPLICATION_MODE 之类的环境变量（变量值设置 为 production 或 development 等等）来导入不同的配置文件。

# 一个有趣的方案是使用类和类的继承来配置:
class Config(object):
	DEBUG = False
	TESTING = False
	DATABASE_URI = 'sqlite://:memory:'

class ProductionConfig(Config):
	DATABASE_URI = 'mysql://user@localhost/foo'

class DevelopmentConfig(Config):
	DEBUG = True

class TestingConfig(Config):
	TESTING = True

# 如果要使用这样的方案，那么必须使用 from_object():
app.config.from_object('configmodule.ProductionConfig')




实例文件夹
# Flask 0.8 引入了实例文件夹。 Flask 花了很长时间才能够直接使用应用文件夹的路径（ 通过 Flask.root_path ）。这也是许多开发者载入应用文件夹外的配置的方法。 不幸的是这种方法只能用于应用不是一个包的情况下，即根路径指向包的内容的情况。

# Flask 0.8 引入了一个新的属性： Flask.instance_path 。它指向一个新名词： “实例文件夹”。实例文件夹应当处于版本控制中并进行特殊部署。这个文件夹特别适合 存放需要在应用运行中改变的东西或者配置文件。

# 可以要么在创建 Flask 应用时显式地提供实例文件夹的路径，要么让 Flask 自动探测 实例文件夹。显式定义使用 instance_path 参数:

app = Flask(__name__, instance_path='/path/to/instance/folder')
# 请记住，这里提供的路径 必须 是绝对路径。

# 如果 instance_path 参数没有提供，那么会使用以下缺省位置：

# 未安装的模块:

/myapp.py
/instance
未安装的包:

/myapp
    /__init__.py
/instance
已安装的模块或包:

$PREFIX/lib/python2.X/site-packages/myapp
$PREFIX/var/myapp-instance
$PREFIX 是你的 Python 安装的前缀。可能是 /usr 或你的 virtualenv 的 路径。可以通过打印 sys.prefix 的值来查看当前的前缀的值。

# 既然可以通过使用配置对象来根据关联文件名从文件中载入配置，那么就可以通过改变与 实例路径相关联的文件名来按需要载入不同配置。
# 在配置文件中的关联路径的行为可以在 “关联到应用的根路径”（缺省的）和 “关联到实例文件夹”之间变换，
# 具体通过应用 构建函数中的 instance_relative_config 来实现:

app = Flask(__name__, instance_relative_config=True)

# 以下是一个完整的配置 Flask 的例子，从一个模块预先载入配置，然后从配置文件夹中的 一个配置文件（如果这个文件存在的话）载入要重载的配置:

app = Flask(__name__, instance_relative_config=True)
app.config.from_object('yourapplication.default_settings')
app.config.from_pyfile('application.cfg', silent=True)

# 通过 Flask.instance_path 可以找到实例文件夹的路径。 Flask 还提供一个打开实例文件夹中的文件的快捷方法： Flask.open_instance_resource() 。

# 举例说明:

filename = os.path.join(app.instance_path, 'application.cfg')
with open(filename) as f:
    config = f.read()

# 或者通过使用 open_instance_resource:
with app.open_instance_resource('application.cfg') as f:
    config = f.read()





























