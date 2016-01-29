Active Record 数据库迁移.rb


1.0  迁移示例：
class CreateProducts < ActiveRecord::Migration
	def change
		create_table :products do |t|
			t.string :name
			t.text :description

			t.timestamps
		end
	end
end

# 这个迁移创建了一个名为 products 的表，
# 然后在表中创建字符串字段 name 和 文本字段 description。
# 名为 id 的主键字段会被自动创建。id 字段是所有 Active Record 模型的默认主键。
# timestamps 方法创建两个字段： created_at 和 updated_at 。

2.0  
# 如果想在迁移中执行 Active Record 不知如何撤销的操作，可以使用 reversible 方法：

class ChangeProductsPrice < ActiveRecord::Migration
	def change
		reversible do |dir|
			change_table :products do |t|
				dir.up { t.change :price, :string }
				dir.down { t.change :price, :integer }
			end
		end
	end
end

# 或者不用 change 方法，分别使用 up 和 down 方法：
class ChangeProductsPrice < ActiveRecord::Migration
  def up
    change_table :products do |t|
      t.change :price, :string
    end
  end
 
  def down
    change_table :products do |t|
      t.change :price, :integer
    end
  end



3.0  创建迁移
3.1 单独创建迁移

rails g migration AddPartNumberToProducts
# 这个命令生成一个空的迁移，但名字已经起好了：
class AddPartNumberToProducts < ActiveRecord::Migration
	def change
	end
end


# 后面跟着一个字段名和类型列表，那么迁移中会生成合适的 add_column 或 remove_column 语句
rails g migration AddPartNumberToProducts part_number:string

class AddPartNumberToProducts < ActiveRecord::Migration
	def change
		add_column :products, :part_number, :string
	end
end


# 如果想为新建的字段创建添加索引，可以这么做：
rails generate migration AddPartNumberToProducts part_number:string:index

class AddPartNumberToProducts < ActiveRecord::Migration
  def change
    add_column :products, :part_number, :string
    add_index :products, :part_number
  end
end


# 如果迁移名是“CreateXXX”形式，后面跟着一串字段名和类型声明，迁移就会创建名为“XXX”的表，以及相应的字段。例如：
rails generate migration CreateProducts name:string part_number:string

class CreateProducts < ActiveRecord::Migration
	def change
		create_table :products do |t|
			t.string :name
			t.string :part_number
		end
	end
end



# 在生成器中还可把字段类型设为 references（还可使用 belongs_to）。例如：
rails generate migration AddUserRefToProducts user:references

class AddUserRefToProducts < ActiveRecord::Migration
  def change
    add_reference :products, :user, index: true
  end
end


# 如果迁移名中包含 JoinTable，生成器还会创建联合数据表：
rails g migration CreateJoinTableCustomerProduct customer product

class CreateJoinTableCustomerProduct < ActiveRecord::Migration
  def change
    create_join_table :customers, :products do |t|
      # t.index [:customer_id, :product_id]
      # t.index [:product_id, :customer_id]
    end
  end
end



3.2 模型生成器

$ rails generate model Product name:string description:text
会生成如下的迁移：
class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
 
      t.timestamps
    end
  end
end


4.2 创建联合数据表
create_join_table 方法用来创建 HABTM 联合数据表。典型的用例如下：

create_join_table :products, :categories

create_join_table :products, :categories do |t|
  t.index :product_id
  t.index :category_id
end



4.3 修改数据表
有一个和 create_table 类似地方法，名为 change_table，用来修改现有的数据表。其用法和 create_table 类似，不过传入块的参数知道更多技巧。例如：

change_table :products do |t|
  t.remove :description, :name
  t.string :part_number
  t.index :part_number
  t.rename :upccode, :upc_code
end






3.5 使用 change 方法
# change 是迁移中最常用的方法，大多数情况下都能完成指定的操作，而且 Active Record 知道如何撤这些操作。
# 目前，在 change 方法中只能使用下面的方法：

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

# 在迁移中可以不用 change 方法，而用 up 和 down 方法。
up 方法定义要对数据库模式做哪些操作，down 方法用来撤销这些操作。
也就是说，如果执行 up 后立即执行 down，数据库的模式应该没有任何变化。
例如，在 up 中创建了数据表，在 down 方法中就要将其删除。
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

如果想执行指定迁移，或者撤销指定迁移，可以使用 db:migrate:up 和 db:migrate:down 任务，
指定相应的版本号，就会根据需求调用 change、up 或 down 方法。例如：



4.5 在不同的环境中运行迁移
默认情况下，rake db:migrate 任务在 development 环境中执行。要在其他环境中运行迁移，执行命令时可以使用环境变量 RAILS_ENV 指定环境。例如，要在 test 环境中运行迁移，可以执行下面的命令：

$ rake db:migrate RAILS_ENV=test




8 迁移和种子数据

class AddInitialProducts < ActiveRecord::Migration
	def up
		5.times do |i|
			Product.create(name: "Product #{i}", description: "A product.")
		end
	end

	def down
		Product.delete_all
	end
end


rake db:seed




















