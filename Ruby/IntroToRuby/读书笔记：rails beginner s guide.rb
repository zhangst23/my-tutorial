读书笔记：rails beginner s guide.rb

1.0  Active Record 数据库操作

1.0 Relation


Locking
Scoping
Relation
Querying
Persistence
Counter Cache
Attribute Assignment
Attribute Methods

1.1  Relation 
运用中间状态，也就是 Relation.

1.2 Query Methods

1.2.1 where(opts = :chain, *rest)
- 传递字符串
- 传递数组
- 传递哈希
Comment.where(created_at: @the_date.beginning_of_day..@the_date.end_of_day)
- 配合 joins
User.joins(:posts).where({ "posts.published" => true })
User.joins(:posts).where({ posts: { published: true } })

1.2.2 select(*fields) 默认 find
- 传递 block, 返回数组
- 传递属性名，结果仅包含这些项

1.2.3 group(*args) 根据所传递的属性，对结果进行分组。

1.2.4 having(opts, *rest) having 是筛选条件,group 是分组
# Rails 里 having 不能脱离 group 单独使用
Order.having('SUM(price) > 30').group('user_id')

1.2.5 order(*args)
属性和规则
1.2.6 limit(value) 和 offset(value)  
# 指定最多获取多少条数据
User.limit(10)
User.limit(10).limit(20)

1.2.7 joins(*args)
Category.joins(:posts)
Post.joins(:category, :comments)
product = Product.first
product.catalogs.joins(:catalogs_products).where('catalogs_products.is_default = ?', true)

1.2.8 includes(*args)   
Post.includes(:comments).where("comments.visible" => true)

1.2.9 distinct(value = true)
explain()
none 返回一个空的 Relation， 对后续操作很有用。可以充分利用 Relation 链式调用、延迟加载等特性
not 

1.2.10  references  
# 使用 includes 可以预加载多个关联表，如果后续还有根据关联表进行查询的，需要用 references 指明用哪张关联表。 
# 否则，查询会出错。但如果后续的查询是以 hash 的形式提供的话，则不必使用 references 也可以。

1.2.11 order 排序

1.3  Finder Methods -> Calculations
# 按条件对数据进行统计
count 总数
average 平均值
maximum 最大值
minimum 最小值
sum 值的总和

pluck 获取所有指定的属性
ids 获取所有的 id 属性

calculate 


2.0  Attribute Methods

2.1 Query ?
<% unless @user.login? %>
	<%= link_to 'login', new_session_path %>
<% end %>

<% if @user.login? %>
	<%= @user.login %>
<% end %>



3.0  Locking   
3.1 Pessimistic  悲观锁  (数据库级别的锁)
# 强烈的独占和排他
# 处理数据的过程中处于锁定状态，其他外部系统则不能修改数据
# select * from account where name="Erica" for update;
# 这条 sql 语句锁定了 account 表中所有符合检索条件(name="Eric")的记录。本次事务提交之前，外界无法修改这些记录

相关方法： lock   lock!   with_lock
Account.lock.find(1)
Account.transaction do
	shugo = Account.where("name = 'shugo'").lock(true).first
	yuko = Account.where("name = 'yuko'").lock(true).first
	shugo.balance -= 100
	shugo.save!
	yuko.balance += 100
	yuko.save!
end



1.3.2 Optimistic 乐观锁
# 基于数据版本(Version)记录机制实现
使用：
add_column :products, :lock_version, :integer, :default => 0, :null => false


1.4.0  Scoping
scope   -命名scope
default_scope    -设置默认 scope
unscoped       -跳过之前设置的 scope
all         -all 方法，默认已经 scope


1.4.1  scope
# 相当于类方法，可检索，查询对象
# 如： 
where(color: :red).select('shirts.*').includes(:washing_instructions)

class Shirt < ActiveRecord::Base
	scope :red, -> { where(color: 'red') }
	scope :dry_clean_only, -> { joins(:washing_instructions)
								.where('washing_instructions.dry_clean_only = ?', true) }
end

# 功能上和下面代码一样
class Shirt < ActiveRecord::Base
	def self.red
		where(color: 'red')
	end
end

#  链式调用
Shirt.red.dry_clean_only


1.4.1.2  scope 是一步步走下去的
class Person < ActiveRecord::Base
	has_many :shirts
end

1.4.1.3 scope 后可直接根 extensions
# 和 has_many 类似的
class Shirt < ActiveRecord::Base
	scope :red, -> { where(color: 'red') } do
		def dom_id
			'red_shirts'
		end
	end
end

1.4.1.4 scope 后可直接跟 creating/building 等方法
用于创建record

class Acticle < ActiveRecord::Base
	scope :published, -> { where(published: true) }
end

Article.published.new.published 
Article.published.create.published

1.4.1.5 scope 后可直接跟类方法
class Article < ActiveRecord::Base
	scope :published, -> { where(published: true) }
	scope :featured, -> { where(featured: true) }

	def self.latest_article
		order('published_at desc').first
	end

	def self.titles
		pluck(:title)
	end
end


1.4.2  default_scope
一个参数，需要以 proc 的形式定义：
class Article < ActiveRecord::Base
	default_scope { where(published: true) }
end





2. Action Controller
2.1 Metal 增强模块
Params Wrapper 对请求过来的 params 进行预处理。通过 API 发送请求的话，使用它，方便。
类方法： wrap_parameters




3.  Routing

3.0 match


3.1   scope
scope module: "admin" do
	resources :posts
end
# 或
resources :posts, module: "admin"


scope "/admin" do
	resources :posts
end
# 或
resources :posts: "/admin/posts"

3.2 namespace

namespace :admin do
	resources :posts
end


3.3 Concerns  
重复使用已经定义的路由，避免 config/routes.rb 里出现重复代码， 和生成路由规则没有直接联系

3.4 Redirection
get "/stories" => redirect("/posts")

get 'docs/:article', to: redirect('/wiki/%{article}')








































































































































































































































