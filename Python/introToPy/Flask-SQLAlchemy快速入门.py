Flask-SQLAlchemy快速入门.py

1.0  

一个最小应用¶
常见情况下对于只有一个 Flask 应用，所有您需要做的事情就是创建 Flask 应用，选择加载配置接着创建 SQLAlchemy 对象时候把 Flask 应用传递给它作为参数。

一旦创建，这个对象就包含 sqlalchemy 和 sqlalchemy.orm 中的所有函数和助手。此外它还提供一个名为 Model 的类，用于作为声明模型时的 delarative 基类:
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:////tmp/test.db'
db = SQLAlchemy(app)

class User(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	username = db.Column(db.String(80),unique=True)
	email = db.Column(db.String(120),unique=True)

	def __init__(self,username,email):
		self.username = username
		self.email = email
	def __repr__(self):
		return '<User %r>' % self.username

# 为了创建初始数据库，只需要从交互式 Python shell 中导入 db 对象并且调用 SQLAlchemy.create_all() 方法来创建表和数据库:
>>> from yourapplication import db
>>> db.create_all()

# Boom, 您的数据库已经生成。现在来创建一些用户:
>>> db.session.add(admin)
>>> db.session.add(guest)
>>> db.session.commit()

# 访问数据库中的数据也是十分简单的:
>>> users = User.query.all()
[<User u'admin'>,<User u'guest'>]
>>> admin = User.query.filter_by(username='admin').first()
<User u'admin'>



简单的关系¶
# SQLAlchemy 连接到关系型数据库，关系型数据最擅长的东西就是关系。因此，我们将创建一个使用两张相互关联的表的应用作为例子:
from datetime import datetime

class Post(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	title = db.Column(db.String(80))
	body = db.Column(db.Text)
	pub_date = db.Column(db.DateTime)

	category_id = db.Column(db.Integer,db.ForeignKey('category.id'))
	category = db.relationship('category',
		backref = db.backref('posts',lazy='dynamic'))

	def __init__(self,title,body,category,pub_date=None):
		self.title = title
		self.body = body
		if pub_date is None:
			pub_date = datetime.utcnow()
		self.pub_date = pub_date
		self.category = category

	def __repr__(self):
		return '<Post %r>' % self.title

class Category(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String(50))

	def __init__(self,name):
		self.name = name

	def __repr__(self):
		return '<Category %r>' % self.name

# 首先让我们创建一些对象:
>>> py = Category('Python')
>>> p = Post('Hello Python!','Python is pretty cool',py)
>>> db.session.add(py)
>>> db.session.add(p)


# 现在因为我们在 backref 中声明了 posts 作为动态关系，查询显示为:
>>> py.posts
<sqlalchemy.orm.dynamic.AppenderBaseQuery object at 0x1027d37d0>

# 它的行为像一个普通的查询对象，因此我们可以查询与我们测试的 “Python” 分类相关的所有文章(posts):
>>> py.posts.all()
[<Post 'Hello Python!'>]



2.0  


# 声明模型¶
# 通常下，Flask-SQLAlchemy 的行为就像一个来自 declarative 扩展配置正确的 declarative 基类。因此，我们强烈建议您阅读 SQLAlchemy 文档以获取一个全面的参考。尽管如此，我们这里还是给出了最常用的示例。

# 需要牢记的事情:

# 您的所有模型的基类叫做 db.Model。它存储在您必须创建的 SQLAlchemy 实例上。 细节请参阅 快速入门。
# 有一些部分在 SQLAlchemy 上是必选的，但是在 Flask-SQLAlchemy 上是可选的。 比如表名是自动地为您设置好的，除非您想要覆盖它。它是从转成小写的类名派生出来的，即 “CamelCase” 转换为 “camel_case”。
# 简单示例
# 一个非常简单的例子:
class User(db.Model):
	id = db.Column（db.Integer,primary_key=True)
	username = db.Column(db.String(80),unique=True)
	email = db.Column(db.String(120),unique=True)

	def __init__(self,username,email):
		self.username = username
		self.email = email

	def __repr__(self):
		return '<User %r>' % self.username


# 用 Column 来定义一列。列名就是您赋值给那个变量的名称。如果您想要在表中使用不同的名称，您可以提供一个想要的列名的字符串作为可选第一个参数。主键用 primary_key=True 标记。可以把多个键标记为主键，此时它们作为复合主键。

# 列的类型是 Column 的第一个参数。您可以直接提供它们或进一步规定（比如提供一个长度）。下面的类型是最常用的:

# Integer	一个整数
# String (size)	有长度限制的字符串
# Text	一些较长的 unicode 文本
# DateTime	表示为 Python datetime 对象的 时间和日期
# Float	存储浮点值
# Boolean	存储布尔值
# PickleType	存储为一个持久化的 Python 对象
# LargeBinary	存储一个任意大的二进制数据

2.1
一对多(one-to-many)关系
# 最为常见的关系就是一对多的关系。因为关系在它们建立之前就已经声明，您可以使用 字符串来指代还没有创建的类(例如如果 Person 定义了一个到 Article 的关系，而 Article 在文件的后面才会声明)。

# 关系使用 relationship() 函数表示。然而外键必须用类 sqlalchemy.schema.ForeignKey 来单独声明:
class Person(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String(50))
	addresses = db.relationship('Address',backref='person',lazy='dynamic')

class Address(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	email = db.Column(db.String(50))
	person_id = db.Column(db.Integer,db.ForeignKey('person.id'))


db.relationship() 做了什么？这个函数返回一个可以做许多事情的新属性。在本案例中，我们让它指向 Address 类并加载多个地址。它如何知道会返回不止一个地址？因为 SQLALchemy 从您的声明中猜测了一个有用的默认值。 如果您想要一对一关系，您可以把 uselist=False 传给 relationship() 。

那么 backref 和 lazy 意味着什么了？backref 是一个在 Address 类上声明新属性的简单方法。您也可以使用 my_address.person 来获取使用该地址(address)的人(person)。lazy 决定了 SQLAlchemy 什么时候从数据库中加载数据:

'select' (默认值) 就是说 SQLAlchemy 会使用一个标准的 select 语句必要时一次加载数据。
'joined' 告诉 SQLAlchemy 使用 JOIN 语句作为父级在同一查询中来加载关系。
'subquery' 类似 'joined' ，但是 SQLAlchemy 会使用子查询。
'dynamic' 在有多条数据的时候是特别有用的。不是直接加载这些数据，SQLAlchemy 会返回一个查询对象，在加载数据前您可以过滤（提取）它们。
您如何为反向引用（backrefs）定义惰性（lazy）状态？使用 backref() 函数:

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    addresses = db.relationship('Address',
        backref=db.backref('person', lazy='joined'), lazy='dynamic')


2.2
多对多(many-to-many)关系¶
如果您想要用多对多关系，您需要定义一个用于关系的辅助表。对于这个辅助表， 强烈建议 不 使用模型，而是采用一个实际的表:

tags = db.Table('tags',
	db.Column('tag_id',db.Integer,db.ForeignKey('tag.id')),
	db.Column('page_id',db.Integer,db.ForeignKey('page.id'))
)

class Page(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	tags = db.relationship('Tag',secondary=tags,
		backref=db.backref('pages',lazy='dynamic'))

class Tag(db.Model):
	id = db.Column(db.Integer,primary_key=True)




3.0   

# 绑定多个数据库
# 从 0.12 开始，Flask-SQLAlchemy 可以容易地连接到多个数据库。为了实现这个功能，预配置了 SQLAlchemy 来支持多个 “binds”。

# 什么是绑定(binds)? 在 SQLAlchemy 中一个绑定(bind)是能执行 SQL 语句并且通常是一个连接或者引擎类的东东。在 Flask-SQLAlchemy 中，绑定(bind)总是背后自动为您创建好的引擎。这些引擎中的每个之后都会关联一个短键（bind key）。这个键会在模型声明时使用来把一个模型关联到一个特定引擎。

# 如果模型没有关联一个特定的引擎的话，就会使用默认的连接(SQLALCHEMY_DATABASE_URI 配置值)。

# 示例配置
# 下面的配置声明了三个数据库连接。特殊的默认值和另外两个分别名为 users`（用于用户）和 `appmeta 连接到一个提供只读访问应用内部数据的 sqlite 数据库）:
SQLALCHEMY_DATABASE_URI = 'postgres://localhost/main'
SQLALCHMY_BINDS = {
	'users':'mysqldb://localhost/users',
	'appmeta':'sqlite:////path/to/appmeta.db'
}

# 创建和删除表¶
# create_all() 和 drop_all() 方法默认作用于所有声明的绑定(bind)，包括默认的。这个行为可以通过提供 bind 参数来定制。它可以是单个绑定(bind)名, '__all__' 指向所有绑定(binds)或一个绑定(bind)名的列表。默认的绑定(bind)(SQLALCHEMY_DATABASE_URI) 名为 None:
>>> db.create_all()
>>> db.create_all(bind=['users'])
>>> db.create_all(bind='appmeta')
>>> db.drop_all(bind=None)

# 引用绑定(Binds)
# 当您声明模型时，您可以用 __bind_key__ 属性指定绑定(bind):
class User(db.Model):
	__bind_key__='users'
	id = db.Column(db.Integer,primary_key=True)
	username = db.Column(db.String(80),unique=True)


# bind key 存储在表中的 info 字典中作为 'bind_key' 键值。了解这个很重要，因为当您想要直接创建一个表对象时，您会需要把它放在那:
user_favorites = db.Table('user_favorites',
	db.Column('user_id',db.Integer,db.ForeignKey('user.id')),
	db.Column('message_id',db.Integer,db.ForeignKey('message.id')),
	info = {'bind_key':'users'}
)


# 如果您在模型上指定了 __bind_key__ ，您可以用它们准确地做您想要的。模型会自行连 接到指定的数据库连接。





























