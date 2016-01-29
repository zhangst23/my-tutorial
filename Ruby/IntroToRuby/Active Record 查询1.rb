Active Record 查询.rb

# 如果习惯使用 SQL 查询数据库，会发现在 Rails 中执行相同的查询有更好的方式。
# 大多数情况下，在 Active Record 中无需直接使用 SQL。

# 文中的实例代码会用到下面一个或多个模型：

# 下面所有的模型除非有特别说明之外，都使用 id 做主键。

class Client < ActiveRecord::Base
  has_one :address
  has_many :orders
  has_and_belongs_to_many :roles
end

class Address < ActiveRecord::Base
  belongs_to :client
end

class Order < ActiveRecord::Base
  belongs_to :client, counter_cache: true
end

class Role < ActiveRecord::Base
  has_and_belongs_to_many :clients
end

# Active Record 会代你执行数据库查询，可以兼容大多数数据库（MySQL，PostgreSQL 和 SQLite 等）。
# 不管使用哪种数据库，所用的 Active Record 方法都是一样的。

1 从数据库中获取对象

# Active Record 提供了很多查询方法，用来从数据库中获取对象。每个查询方法都接可接受参数，
# 不用直接写 SQL 就能在数据库中执行指定的查询。

这些方法是：

find
create_with
distinct
eager_load
extending
from
group
having
includes
joins
limit
lock
none
offset
order
preload
readonly
references
reorder
reverse_order
select
uniq
where

上述所有方法都返回一个 ActiveRecord::Relation 实例。

Model.find(options) 方法执行的主要操作概括如下：

把指定的选项转换成等价的 SQL 查询语句；
执行 SQL 查询，从数据库中获取结果；
为每个查询结果实例化一个对应的模型对象；
如果有 after_find 回调，再执行 after_find 回调；







































































































































































































