# Flask-SQLAlchemy 学习.py
# Flask-SQLALchemy 是一个给你的应用添加 SQLALchemy 支持的 Flask 扩展。SQLALchemy 是Python语言的SQL工具包及对象关系映射（ORM）工具，使用MIT许可证发行，提供能兼容众多数据库（如 SQLite、MySQL、Postgres、Oracle、MS-SQL、SQLServer 和 Firebird）的企业级持久性模型。

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


















