Active Record 关联.rb

http://guides.ruby-china.org/association_basics.html

1.0


class Customer < ActiveRecord::Base
end
 
class Order < ActiveRecord::Base
end


# 假如我们要为一个顾客添加一个订单，得这么做
@order = Order.create(order_date: Time.now,customer_id:@customer.id)

# 或者说要删除一个顾客，确保他的所有订单都会被删除，得这么做：
@orders = Order.where(customer_id: @customer.id)
@orders.each do |order|
	order.destroy
end
@customer.destroy


# 使用 Active Record 关联，告诉 Rails 这两个模型是有一定联系的，就可以把这些操作连在一起。下面使用关联重新定义顾客和订单模型：
class Customer < ActiveRecord::Base
	has_many :order, dependent: :destroy
end
 
class Order < ActiveRecord::Base
	belongs_to :customer
end


# 这么修改之后，为某个顾客添加新订单就变得简单了：
@order = @customer.orders.create(order_date: Time.now)
# 删除顾客及其所有订单更容易：
@customer.destroy



2 关联的类型
在 Rails 中，关联是两个 Active Record 模型之间的关系。关联使用宏的方式实现，用声明的形式为模型添加功能。例如，声明一个模型属于（belongs_to）另一个模型后，Rails 会维护两个模型之间的“主键-外键”关系，而且还向模型中添加了很多实用的方法。Rails 支持六种关联：

belongs_to
has_one
has_many
has_many :through
has_one :through
has_and_belongs_to_many




2.1 belongs_to 关联
# belongs_to 关联创建两个模型之间一对一的关系，声明所在的模型实例属于另一个模型的实例。例如，如果程序中有顾客和订单两个模型，每个订单只能指定给一个顾客，就要这么声明订单模型：

class Order < ActiveRecord::Base
  belongs_to :customer
end


# 相应的迁移如下：

class CreateOrders < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :name
      t.timestamps
    end
 
    create_table :orders do |t|
      t.belongs_to :customer
      t.datetime :order_date
      t.timestamps
    end
  end
end






3 小技巧和注意事项
# 在 Rails 程序中高效地使用 Active Record 关联，要了解以下几个知识：

缓存控制
避免命名冲突
更新模式
控制关联的作用域
Bi-directional associations





4 关联详解
下面几节详细说明各种关联，包括添加的方法和声明关联时可以使用的选项。

4.1 belongs_to 关联详解
belongs_to 关联创建一个模型与另一个模型之间的一对一关系。用数据库的行话来说，就是这个类中包含了外键。如果外键在另一个类中，就应该使用 has_one 关联。

4.1.1 belongs_to 关联添加的方法

声明  belongs_to 关联后，所在的类自动获得了五个和关联相关的方法：

association(force_reload = false)
association=(associate)
build_association(attributes = {})
create_association(attributes = {})
create_association!(attributes = {})
这五个方法中的 association 要替换成传入 belongs_to 方法的第一个参数。例如，如下的声明：


4.1.2 belongs_to 方法的选项

Rails 的默认设置足够智能，能满足常见需求。但有时还是需要定制 belongs_to 关联的行为。定制的方法很简单，声明关联时传入选项或者使用代码块即可。例如，下面的关联使用了两个选项：

class Order < ActiveRecord::Base
  belongs_to :customer, dependent: :destroy,
    counter_cache: true
end


belongs_to 关联支持以下选项：

:autosave
:class_name
:counter_cache
:dependent
:foreign_key
:inverse_of
:polymorphic
:touch
:validate






4.1.3 belongs_to 的作用域

有时可能需要定制 belongs_to 关联使用的查询方式，定制的查询可在作用域代码块中指定。例如：

class Order < ActiveRecord::Base
  belongs_to :customer, -> { where active: true },
                        dependent: :destroy
end
在作用域代码块中可以使用任何一个标准的查询方法。下面分别介绍这几个方法：

where
includes
readonly
select






4.2 has_one 关联详解
has_one 关联建立两个模型之间的一对一关系。用数据库的行话说，这种关联的意思是外键在另一个类中。如果外键在这个类中，应该使用 belongs_to 关联。

4.2.1 has_one 关联添加的方法

声明 has_one 关联后，声明所在的类自动获得了五个关联相关的方法：

association(force_reload = false)
association=(associate)
build_association(attributes = {})
create_association(attributes = {})
create_association!(attributes = {})
这五个方法中的 association 要替换成传入 has_one 方法的第一个参数。例如，如下的声明：








4.3 has_many 关联详解
has_many 关联建立两个模型之间的一对多关系。用数据库的行话说，这种关联的意思是外键在另一个类中，指向这个类的实例。

4.3.1 has_many 关联添加的方法

声明 has_many 关联后，声明所在的类自动获得了 16 个关联相关的方法：

collection(force_reload = false)
collection<<(object, ...)
collection.delete(object, ...)
collection.destroy(object, ...)
collection=objects
collection_singular_ids
collection_singular_ids=ids
collection.clear
collection.empty?
collection.size
collection.find(...)
collection.where(...)
collection.exists?(...)
collection.build(attributes = {}, ...)
collection.create(attributes = {})
collection.create!(attributes = {})
这些个方法中的 collection 要替换成传入 has_many 方法的第一个参数。collection_singular 要替换成第一个参数的单数形式。例如，如下的声明：

class Customer < ActiveRecord::Base
  has_many :orders
end








4.4 has_and_belongs_to_many 关联详解
has_and_belongs_to_many 关联建立两个模型之间的多对多关系。用数据库的行话说，这种关联的意思是有个连接数据表包含指向这两个类的外键。













































































































