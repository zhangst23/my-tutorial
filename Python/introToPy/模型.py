# 模型.py
# 在当代 Web 应用中，主观逻辑经常牵涉到与数据库的交互。 数据库驱动网站 在后台连接数据库服务器，从中取出一些数据，然后在 Web 页面用漂亮的格式展示这些数据。 这个网站也可能会向访问者提供修改数据库数据的方法。
# 许多复杂的网站都提供了以上两个功能的某种结合。 例如 Amazon.com 就是一个数据库驱动站点的良好范例。 本质上，每个产品页面都是数据库中数据以 HTML格式进行的展现，而当你发表客户评论时，该评论被插入评论数据库中。
# 由于先天具备 Python 简单而强大的数据库查询执行方法，Django 非常适合开发数据库驱动网站。 本章深入介绍了该功能： Django 数据库层。

# 在本例的视图中，我们使用了 MySQLdb 类库（可以从 http://www.djangoproject.com/r/python-mysql/ 获得）来连接 MySQL 数据库，取回一些记录，将它们提供给模板以显示一个网页：
from django.shortcuts import render_to_response
import MySQLdb

def book_list(request):
    db = MySQLdb.connect(user='me', db='mydb', passwd='secret', host='localhost')
    cursor = db.cursor()
    cursor.execute('SELECT name FROM books ORDER BY name')
    names = [row[0] for row in cursor.fetchall()]
    db.close()
    return render_to_response('book_list.html', {'names': names})
# 这个方法可用，但很快一些问题将出现在你面前：

# 正如你所期待的，Django数据库层正是致力于解决这些问题。 以下提前揭示了如何使用 Django 数据库 API 重写之前那个视图。

from django.shortcuts import render_to_response
from mysite.books.models import Book

def book_list(request):
    books = Book.objects.order_by('name')
    return render_to_response('book_list.html', {'books': books})




2.0     第一个应用程序
你现在已经确认数据库连接正常工作了，让我们来创建一个 Django app-一个包含模型，视图和Django代码，并且形式为独立Python包的完整Django应用。

在这里要先解释一些术语，初学者可能会混淆它们。 在第二章我们已经创建了 project , 那么 project 和 app 之间到底有什么不同呢？它们的区别就是一个是配置另一个是 代码：


一个project包含很多个Django app以及对它们的配置。

技术上，project的作用是提供配置文件，比方说哪里定义数据库连接信息, 安装的app列表， TEMPLATE_DIRS ，等等。

一个app是一套Django功能的集合，通常包括模型和视图，按Python的包结构的方式存在。

例如，Django本身内建有一些app，例如注释系统和自动管理界面。 app的一个关键点是它们是很容易移植到其他project和被多个project复用。

对于如何架构Django代码并没有快速成套的规则。 如果你只是建造一个简单的Web站点，那么可能你只需要一个app就可以了； 但如果是一个包含许多不相关的模块的复杂的网站，例如电子商务和社区之类的站点，那么你可能需要把这些模块划分成不同的app，以便以后复用。


不错，你可以不用创建app，这一点应经被我们之前编写的视图函数的例子证明了 。 在那些例子中，我们只是简单的创建了一个称为views.py的文件，编写了一些函数并在URLconf中设置了各个函数的映射。 这些情况都不需要使用apps。

但是，系统对app有一个约定： 如果你使用了Django的数据库层（模型），你 必须创建一个Django app。 模型必须存放在apps中。 因此，为了开始建造 我们的模型，我们必须创建一个新的app。


3.0   第一个模型
# 第一步是用Python代码来描述它们。 打开由`` startapp`` 命令创建的models.py 并输入下面的内容：

from django.db import models

class Publisher(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=60)
    state_province = models.CharField(max_length=30)
    country = models.CharField(max_length=50)
    website = models.URLField()

class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    email = models.EmailField()

class Book(models.Model):
    title = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher)
    publication_date = models.DateField()



# 让我们来快速讲解一下这些代码的含义。 首先要注意的事是每个数据模型都是 django.db.models.Model 的子类。它的父类 Model 包含了所有必要的和数据库交互的方法，并提供了一个简洁漂亮的定义数据库字段的语法。 信不信由你，这些就是我们需要编写的通过Django存取基本数据的所有代码。

# 每个模型相当于单个数据库表，每个属性也是这个表中的一个字段。 属性名就是字段名，它的类型（例如 CharField ）相当于数据库的字段类型 （例如 varchar ）。例如， Publisher 模块等同于下面这张表（用PostgreSQL的 CREATE TABLE 语法描述）：

CREATE TABLE "books_publisher" (
    "id" serial NOT NULL PRIMARY KEY,
    "name" varchar(30) NOT NULL,
    "address" varchar(50) NOT NULL,
    "city" varchar(60) NOT NULL,
    "state_province" varchar(30) NOT NULL,
    "country" varchar(50) NOT NULL,
    "website" varchar(200) NOT NULL
);
# 事实上，正如过一会儿我们所要展示的，Django 可以自动生成这些 CREATE TABLE 语句。


4.0    模型安装

5.0   基本数据访问

6.0    插入和更新数据






















































