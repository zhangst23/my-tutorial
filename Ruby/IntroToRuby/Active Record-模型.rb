Active Record-模型.rb

1 Active Record 是什么？
# Active Record 是 MVC 中的 M（模型），处理数据和业务逻辑。Active Record 负责创建和使用需要持久存入数据库中的数据。
# Active Record 实现了 Active Record 模式，是一种对象关系映射系统。

1.3 Active Record 用作 ORM 框架
# Active Record 提供了很多功能，其中最重要的几个如下：

表示模型和其中的数据；
表示模型之间的关系；
通过相关联的模型表示继承关系；
持久存入数据库之前，验证模型；
以面向对象的方式处理数据库操作；


2 Active Record 中的“多约定少配置”原则
2.1 命名约定
# 数据表名：复数，下划线分隔单词（例如 book_clubs）
# 模型类名：单数，每个单词的首字母大写（例如 BookClub）

2.2 模式约定
# 根据字段的作用不同，Active Record 对数据表中的字段命名也做了相应的约定：

# 外键 - 使用 singularized_table_name_id 形式命名，例如 item_id，order_id。创建模型关联后，Active Record 会查找这个字段；
# 主键 - 默认情况下，Active Record 使用整数字段 id 作为表的主键。使用 Active Record 迁移创建数据表时，会自动创建这个字段；

3 创建 Active Record 模型
# 创建 Active Record 模型的过程很简单，只要继承 ActiveRecord::Base 类就行了：

class Product < ActiveRecord::Base
end


4 不用默认的命名约定
# 如果想使用其他的命名约定，或者在 Rails 程序中使用即有的数据库可以吗？没问题，不用默认的命名约定也很简单。

# 使用 ActiveRecord::Base.table_name= 方法可以指定数据表的名字：

class Product < ActiveRecord::Base
  self.table_name = "PRODUCT"
end

5 CRUD：读写数据
# CURD 是四种数据操作的简称：C 表示创建，R 表示读取，U 表示更新，D 表示删除。Active Record 自动创建了处理数据表中数据的方法。

5.1 创建
user = User.create(name: "David",occupation:"Code Artist")

# 
user = User.new
user.name = "David"
user.occupation = "Code Artist"
# 调用user.save可以吧记录存入数据库

# 
# create 和 new 方法从结果来看，都实现了下面代码的功能：

user = User.new do |u|
  u.name = "David"
  u.occupation = "Code Artist"
end

5.2 读取
users = User.all
user = User.first
davie = User.find_by(name: 'David')
users = User.where(name: 'David',occupation: 'Code Artist').order('create_at DESC')


5.3 更新
user = User.find_by(name: 'David')
user.name = 'Dave'
user.save

# 
user = User.find_by(name: 'David')
user.update(name: 'Dave')

# 
User.update_all "max_login_attempts = 3,must_change_password = 'true'"


5.4 删除
user = User.find_by(name: 'David')
user.destroy

6 数据验证
create!
save!
update!

8 迁移
rake db:migrate


8.1   下面是一个迁移示例：
class CreateProducts < ActiveRecord::Migration
	def change
		create_table :products do |t|
			t.string :name
			t.text :description

			t.timestamps
		end
	end
end

如果想在迁移中执行 Active Record 不知如何撤销的操作，可以使用 reversible 方法：



或者不用 change 方法，分别使用 up 和 down 方法：




8.2 创建迁移
8.2.1 单独创建迁移
$ rails generate migration AddPartNumberToProducts

# 这个命令生成一个空的迁移，但名字已经起好了：

class AddPartNumberToProducts < ActiveRecord::Migration
  def change
  end
end

# 
rails generate migration AddPartNumberToProducts part_number:string


# 
rails generate migration AddPartNumberToProducts part_number:string:index

# 
rails generate migration RemovePartNumberFormProducts part_number:string

# 
rails generate migration AddDetailsToProducts part_number:string price:decimal

# 
rails generate migration CreateProducts name:string part_number:string

# 
rails generate migration AddUserRefToProducts user:references

# 
rails g migration CreateJoinTableCustomerProduct customer product



8.2.2 模型生成器
模型生成器和脚手架生成器会生成合适的迁移，创建模型。迁移中会包含创建所需数据表的代码。如果在生成器中指定了字段，还会生成创建字段的代码。例如，运行下面的命令：

rails generate model Product name:string description:text


8.2.3 支持的类型修饰符
在字段类型后面，可以在花括号中添加选项。可用的修饰符如下：

limit：设置 string/text/binary/integer 类型字段的最大值；
precision：设置 decimal 类型字段的精度，即数字的位数；
scale：设置 decimal 类型字段小数点后的数字位数；
polymorphic：为 belongs_to 关联添加 type 字段；
null：是否允许该字段的值为 NULL；

# 

rails generate migration AddDetailsToProducts 'price:decimal{5,2}' supplier:references{polymorphic}

生成的迁移如下：

class AddDetailsToProducts < ActiveRecord::Migration
  def change
    add_column :products, :price, :decimal, precision: 5, scale: 2
    add_reference :products, :supplier, polymorphic: true, index: true
  end
end




3 编写迁移
使用前面介绍的生成器生成迁移后，就可以开始写代码了。

3.1 创建数据表
# create_table 方法最常用，大多数时候都会由模型或脚手架生成器生成。典型的用例如下：



3.2 创建联合数据表

create_join_table :products, :categories

# 
crate_join_table :products, :categories, column_option: {null: true}

# 
create_join_table :products, table_name: :categorization

# 
create_join_table :products, :categories do |t|
	t.index :product_id
	t.index :category_id
end


3.3 修改数据表



3.4 如果帮助方法不够用
如果 Active Record 提供的帮助方法不够用，可以使用 execute 方法，执行任意的 SQL 语句：




3.5 使用 change 方法
change 是迁移中最常用的方法，大多数情况下都能完成指定的操作，而且 Active Record 知道如何撤这些操作。目前，在 change 方法中只能使用下面的方法：

add_column
add_index
add_reference
add_timestamps
create_table
create_join_table
drop_table（必须提供代码块）
drop_join_table（必须提供代码块）
remove_timestamps
rename_column
rename_index
remove_reference
rename_table
只要在块中不使用 change、change_default 或 remove 方法，change_table 中的操作也是可逆的。

如果要使用任何其他方法，可以使用 reversible 方法，或者不定义 change 方法，而分别定义 up 和 down 方法。


3.6 使用 reversible 方法
Active Record 可能不知如何撤销复杂的迁移操作，这时可以使用 reversible 方法指定运行迁移和撤销迁移时怎么操作。例如：



3.7 使用 up 和 down 方法
在迁移中可以不用 change 方法，而用 up 和 down 方法。up 方法定义要对数据库模式做哪些操作，down 方法用来撤销这些操作。
也就是说，如果执行 up 后立即执行 down，数据库的模式应该没有任何变化。例如，在 up 中创建了数据表，在 down 方法中就要将其删除。
撤销时最好按照添加的相反顺序进行。前一节中的 reversible 用法示例代码可以改成：


3.8 撤销之前的迁移
Active Record 提供了撤销迁移的功能，通过 revert 方法实现：

require_relative '2012121212_example_migration'
 
class FixupExampleMigration < ActiveRecord::Migration
  def change
    revert ExampleMigration
 
    create_table(:apples) do |t|
      t.string :variety
    end
  end
end




4.1 回滚
还有一个常用的操作时回滚到之前的迁移。例如，迁移代码写错了，想纠正。我们无须查找迁移的版本号，直接执行下面的命令即可：

$ rake db:rollback

rake db:rollback STEP=3


rake db:migrate:redo STEP=3


4.2 搭建数据库
rake db:setup 任务会创建数据库，加载模式，并填充种子数据。

4.3 重建数据库
rake db:reset 任务会删除数据库，然后重建，等价于 rake db:drop db:setup。


4.4 运行指定的迁移
如果想执行指定迁移，或者撤销指定迁移，可以使用 db:migrate:up 和 db:migrate:down 任务，指定相应的版本号，就会根据需求调用 change、up 或 down 方法。例如：



4.5 在不同的环境中运行迁移
默认情况下，rake db:migrate 任务在 development 环境中执行。要在其他环境中运行迁移，执行命令时可以使用环境变量 RAILS_ENV 指定环境。例如，要在 test 环境中运行迁移，可以执行下面的命令：

$ rake db:migrate RAILS_ENV=test


# #################################################################













































































































































































































































































































































































































































































