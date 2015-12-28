# Flask-SQLAlchemy 学习.py
# Flask-SQLALchemy 是一个给你的应用添加 SQLALchemy 支持的 Flask 扩展。SQLALchemy 是Python语言的SQL工具包及对象关系映射（ORM）工具，使用MIT许可证发行，提供能兼容众多数据库（如 SQLite、MySQL、Postgres、Oracle、MS-SQL、SQLServer 和 Firebird）的企业级持久性模型。
1.0



一、为你的Flask应用加载Flask-SqlAlchemy扩展
from flask import Flask
from flask.ext.sqlalchemy import SQLALchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)    #这个就是你以后操作数据库的对象实例了


SQLALCHEMY_DATABASE_URI格式实例：

postgresql://scott:tiger@localhost/mydatabase
mysql://scott:tiger@localhost/mydatabase
oracle://scott:tiger@127.0.0.1:1521/sidname
sqlite:////absolute/path/to/foo.db #注意：有3个斜杠+路径


二、建立数据库模型和初始化数据库
# 建立数据库模型：
import hashlib
from app import db  #在数据库模型文件中导入上面建立的db对象

calss User(db.Model):
	id = db.Column(db.Integer,primary_key=True)   #id
	username = db.Column(db.String(80),unique=True)
	email = db.Column(db.String(320),unique=True)
	password = db.Column(db.String(32),nullable=False)

	def __init__(self,username,email,password):
		self.username = username
		self.email = email
		self.password = hashlib.md5(password)    #呵呵，这样在插入数据自动给密码哈希了！

	def __repr__(self):
		return "<User '{:s}'>".format(self.username)


# 初始化数据库也特别简单，只需要调用 db.create_all() 函数就可以了。
if __name__=='__main__':
	db.create_all




三、插入数据
u = User(username='peter',email='test@example.com',password='123456')
db.session.add(u)  #插入数据
db.session.commit()   #只有提交事务了，才可以获取(u.id)数据的ID值。


四、查询数据
# 用主键获取数据
User.query.get(1)
<User u'admin'>
# 通过一个精确参数进行反查：
peter = User.query.filter_by(username='peter').first()     #注意：精确查询函数query.filter_by()，是通过传递参数进行查询；其他增强型查询函数是query.filter()，通过传递表达式进行查询
print(peter.id)     #如果数据不存在则返回None

#模糊查询
User.query.filter(User.email.endswith('@example.com')).all()
<User u'admin'>,<User u'guest'>

#逻辑非1
peter = User.query.filter(User.username != 'peter').first()
print(peter.id)

#逻辑非2
from sqlalchemy import not
peter = User.query.filter(not_(User.username=='peter')).first()
print(peter.id)


# 逻辑与：
from sqlalchemy import and_
peter = User.query.filter(and_(User.username=='peter', User.email.endswith('@example.com'))).first()
print(peter.id)

# 逻辑或：
from sqlalchemy import or_
peter = User.query.filter(or_(User.username != 'peter', User.email.endswith('@example.com'))).first()
print(peter.id)


六、查询数据加工
# 排序和限制函数可以跟在query或filter后面。
# 排序：
User.query.order_by(User.username)  #嘿嘿，你用哪个字段作为排序参考呢？
[<User u'admin'>, <User u'guest'>, <User u'peter'>]

# 限制返回的数目：
User.query.limit(1).all()
[<User u'admin'>]


六、查询数据返回
# 返回查询到的第一个对象：
r = User.query.first()
print(r)

# 返回所有查询到的对象：
r = User.query.all()
print(r)

# 七、删除数据
u = User.query.first()
db.session.delete(u)  #删除数据和插入数据一样简单，但必须是通过查询返回的对象。
db.session.commit()

# 八、更新数据
u = User.query.first()
u.username = 'guest'  #更新数据和变量赋值那么简单，但必须是通过查询返回的对象。
db.session.commit()



2.0


廖雪峰的python教材：

第一步，导入SQLAlchemy，并初始化DBSession：
#导入：
from sqlalchemy import Column,String,create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

#创建对象的基类
Base = declarative_base()

#定义User对象
class User(Base):
	#表的名字：
	__tablename__ = 'user'

	#表的结构
	id = Cloumn(String(20),primary_key=True)
	name = Column(String(20))

#初始化数据库连接
engine = create_engine('mysql+mysqlconnector://root:password@localhost:3306/test')
#创建DBSession类型
DBSession = sessionmaker(bind=engine)

# 以上代码完成SQLAlchemy的初始化和具体每个表的class定义。如果有多个表，就继续定义其他class，例如School：
class School(Base):
	__tablename__ = 'school'
	id = ...
	name = ...

# create_engine()用来初始化数据库连接。SQLAlchemy用一个字符串表示连接信息：
'数据库类型+数据库驱动名称://用户名:口令@机器地址:端口号/数据库名'

# 由于有了ORM，我们向数据库表中添加一行记录，可以视为添加一个User对象：

# 创建session对象:
session = DBSession()
# 创建新User对象:
new_user = User(id='5', name='Bob')
# 添加到session:
session.add(new_user)
# 提交即保存到数据库:
session.commit()
# 关闭session:
session.close()


# 可见，关键是获取session，然后把对象添加到session，最后提交并关闭。Session对象可视为当前数据库连接。

# 如何从数据库表中查询数据呢？有了ORM，查询出来的可以不再是tuple，而是User对象。SQLAlchemy提供的查询接口如下：
session = DBSession()

user = session.query(User).filter(User.id=='5').one()

print 'type:',type(user)
print 'name:',user.name

session.close()

# 如果一个User拥有多个Book，就可以定义一对多关系如下：
class User(Base):
	__tablename__ = 'user'

	id = Column(String(20),primary_key=True)
	name = Column(String(20))
	#一对多
	books = relationship('Book')

class Book(Base):
	__tablename__ = 'book'

	id = Column(String(20),primary_key=True)
	name = Column(String(20))
	# “多”的一方的book表是通过外键关联到user表的:
	user_id = Column(String(20),ForeignKey('user.id'))







3.0  


# 一.配置Flask-SQLAlchemy
from flask import Flask
from flask.ext.sqlalchemy import SQLALchemy

app = Flask(__name__)
#配置数据库地址
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tmp/test.db'
##该配置为True,则每次请求结束都会自动commit数据库的变动
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
db = SQLAlchemy(app)


# 二.定义模型
# Flask-SQLALchemy使用继承至db.Model的类来定义模型,如:
class User(db.Model,UserMixin):  #UserMixin是Flask-Login库中所需要的
	__tablename__ = 'users'
	#每个属性定义一个字段
	id = db.Column(db.Integer,primary_key=True)
	username = db.Column(db.String(64),unique=True)
	password = db.Column(db.String(64))

	def __repr__(self):
		return '<User %r>' % self.username


# 定义完需要在Python Shell中导入db,调用db.create_all()来创建数据库

# (1)常用字段选项:
# primary_key  设置主键
# unique  是否唯一
# index   是否创建索引
# nullable   是否允许为空
# default   设置默认值，可以传入函数的引用




三.增删查改
(1) 插入数据:


from app.models import User
from app import db

#创建一个新用户
u = User()
u.username = 'abc'
u.password = 'abc'

#将用户添加到数据库会话中
db.session.add(u)

#将数据库会话中的变动提交到数据库中,如果不Commit,数据库中是没有改动的
db.commit()

(2)查找数据:

#返回所有用户保存到list中
user_list = User.query.all()

#查找username为abc的第一个用户,返回用户实例
u = User.query.filter_by(username='abc').first()

#模糊查找用户名以c结尾的所有用户
user_list  = User.query.filter(username.endswith('c')).all()

#查找用户名不是abc的用户
u = User.query.filter(username != 'abc').first()


(3)删除数据:

user = User.query.first()
db.session.delete(user)
db.session.commit()

(4)修改数据:

u = User.query.first()
u.username = 'sb'
db.session.commit()

# 四.一对多关系
# 我的理解是:在多的一边定义外键,而relathonship()函数是用来建立关系的,可以只在一边定义,也可以两边都使用(只在一边使用时加上了backref选项等同于两边都使用)

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    #backref将在Address表中创建个名为persons的Person引用,之后可以使用address.persons访问这个地址的所有人
    addresses = db.relationship('Address', backref='persons',
                                lazy='dynamic')

class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50))
    #在多的一边使用db.ForeignKey声明外键
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))



五.多对多关系
# 多对多关系可以分解为原表和关联表之间两个多对一关系,如下代码建立了学生与所选课程之间的关系:
registrations = db.Table('registrations',
						  db.Column('student_id',db.Integer,db.ForeignKey('students.id')),
						  db.Column('class_id',db.Integer,db.ForeignKey('classes.id'))
						  )

class Student(db.Model):
	__tablename__ = 'students'
	id = db.Column(db.Integer,primary_key=True,)
	name = db.Column(db.String)
	classes = db.relationship('Class',
							   secondary = registrations,  #关联表，只需要在一个表建立关系，sqlalchemy会负责处理好另一个表
							   backref = db.backref('students',lazy='dynamic'),
							   lazy = 'dynamic')

class Class(db.Model):
	__tablename__ = 'classes'
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String)




# 多对多的使用:

#学生1增加一门选课
student1.classes.append(class1)
#学生1退选class1
student1.classes.remove(class1)
#学生1所选课程,由于指定了lazy='dynamic'所以没有直接返回列表,而需要使用.all()
student1.classes.all()





5.0



六.分页导航

# Flask-SQLALchemy的Pagination对象可以方便的进行分页,

# 对一个查询对象调用pagenate(page, per_page=20, error_out=True)函数可以得到pagination对象,第一个参数表示当前页,第二个参数代表每页显示的数量,error_out=True的情况下如果指定页没有内容将出现404错误,否则返回空的列表


#从get方法中取得页码
page = request.args.get('page',1,type = int)
#获取pagination对象
pagination = Post.query.order_by(Post.timestamp.desc()).paginate(page,per_page=10,error_out = False)
#pagination对象的items方法返回当前页的内容列表
posts = pagination.items




# pagination对象常用方法:
# has_next :是否还有下一页

# has_prev :是否还有上一页

# items : 返回当前页的所有内容

# next(error_out=False) : 返回下一页的Pagination对象

# prev(error_out=False) : 返回上一页的Pagination对象

# page : 当前页的页码(从1开始)

# pages : 总页数

# per_page : 每页显示的数量

# prev_num : 上一页页码数

# next_num :下一页页码数

# query :返回 创建这个Pagination对象的查询对象

# total :查询返回的记录总数

# iter_pages(left_edge=2, left_current=2, right_current=5, right_edge=2)


# 在模板中使用
{% macro render_pagination(pagination,endpoint) %}
	<div class=pagination>
	{%- for page in pagination.iter_pages() %}
		{% if page %}
			{% if page != pagination.page %}
				<a href="{{ url_for(endpoint,page=page) }}">{{page}}</a>
			{% else %}
				<strong>{{ page }}</strong>
			{% endif %}
		{% else %}
			<span class="ellipsis">...</span>
		{% endif %}
	{%- endfor %}
	</div>
	}
{% endmacro %}












