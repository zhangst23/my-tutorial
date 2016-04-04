Depot 学习笔记.rb

1. cycle 帮助函数将每行的CSS类设置为 list_line_even 或 list_line_odd,并在两个连续行之间自动切换样式名称。

2, truncate 帮助函数
用来显示描述字段的前80个字符，但在调用 truncate 之前，需要调用函数 strip_tags 去除描述字段中的HTML标签。 

3. :presence => true
让验证器检查是否填写每个字段，如果有字段未填写内容，出错的字段会用红色高亮显示出来，并且在表单顶端看到所有错误的清单

4. :uniqueness => true
唯一性验证，检查 products 表中的没有其他商品和想要添加的新商品有相同的标题

5.  :as => 'store'   (root :to =>)
告诉Rails去创建 store_path 变量

6. default_scope :order => 'title'
方法，默认范围函数(scope)会作用该模型的所有查询

7. :dependent => :destroy
表示在线商品的存在依赖于购物车是否存在。如果我们销毁购物车，将其从数据库中删除，则会删除所有和该购物车相关联的商品

8. :remote = true

9. page.replace_html('cart', render(@cart))

10. <% unless cart.line_items.empty? % >
	#
	<% end % >
当购物车中有东西的时候才包含购物车的HTML，空的购物车不显示内容

11. 使用RJS模板，用购物车的 HTML 来更新页面

12. 认证用户
为商店管理员添加登录支持意味着什么?
~ 需要提供一个可供他们输入用户名和密码的表单
~ 一旦登陆了，需要在剩下的会话中记录下这个事实（直到注销）
~ 需要限制对应用程序的管理部分的访问，仅允许那些成功登陆管理商店的人访问

我们需要一个会话控制器来支持登陆和注销，还需要一个控制器来欢迎管理员。

rails g controller sessions new create destroy

rails g controller admin index

13.  before_filter :authorize
页面访问前的认证，写在控制器的最前面

14. created_at created_on updated_at updated_on
Rails应用程序对于日期字段使用 _on 后缀，时间字段采用 _at 后缀

lock_version 如果表存在字段 lock_version, 那么 Rails 将会跟踪并且乐观锁定行记录版本号

xxx_id
这是外键引用表的默认名称，而 xxx 是该表名称的复数形式

xxx_count
这是维护子表 xxx 的计数器缓存

15. 
借助于模型 LineItems ， 实现在模型 Order 和模型 Product 之间的关联就是这样的示例
所有这一切都离不开主键 id

16.创建、读取、更新和删除操作
16.1 创建新的行记录
# Rails 视表为类且视对象为行记录，其过程是：
# 先创建类的新对象，然后开始建立相应表的行记录。
# 例如：先调用 Order.new,创建 Order 类的新对象，该对象对应于表orders的行记录，然后输入属性值。最后，调用该对象的 save 方法，
# 将其存储到数据库中。如果不调用 save 方法，那么订单对象 an_ander 只存在于本地计算机内存在.
an_order = Order.new
an_order.name = "Dava Thomas"
an_order.email = "dava@example.com"
an_order.address = "123 Main St"
an_order.pay_type = "check"
an_order.save

#  Aetive Record 有个简便的 create 方法，在创建实例模型对象的同时，也把它存储到数据库中
an_order = Order.create(
	:name = "Dava Thomas",
	:email = "dava@example.com",
	:address = "123 Main St",
	:pay_type = "check")



16.2 读取已有行记录
an_order = Order.find(23)

# Get a list of product ids from a form, then
# sum the total price
ptoduct_list = params[:product_ids]
total = Product.find(product_list).sum(&:price)


16.3 动态查询器
order = Order.find_by_name("Dava Thomas")
orders = Order.find_all_by_name("Dava Thomas")
orders = Order.find_all_by_email("params['email")
#
find_by_name

# 上面 find_all_by_name 转换为
order = Order.where(:name => "Dava Thomas"),first

# 
find_last_by_       find_all_by_
分别由调用 all 和 last 所取代，其中函数 first 是隐式调用.

16.4 SQL语言与Active Record模块
pos = Order.where("name = 'Dave' and pay_type = 'po'")

16.5 使用 like 查询子句
User.where("name like ?", params[:name]+"%")

16.6 构造返回记录的子集
16.6.1 order 方法,允许指定查询条件，其参数是由 order by 子句的一些关键词组成。
# 例如：下面查询将返回所有 “Dave” 的订单，首先按照付款类型升序排列，然后由发货日期降序排列
orders = Order.where(:name => 'Dave').
	order("pay_type, shipped_at DESC")
16.6.2 limit 方法，可以限定返回行记录的个数。一般来说，当使用 limit 方法，很可能还需要指定排列顺序，以确保得到一致结果。
# 例如：下面返回前十个匹配的订单
orders = Order.where(:name => 'Dave').
	order("par_type, shipped_at DESC").
	limit(10)
16.6.3 offset 方法, 进一步补充了 limit 方法，它允许返回在结果集中我们指定的第一行的偏移量。
def Order.find_on_page(page_num, page_size)
	order(:id).limit(page_size).offset(page_num*page_size)
end
16.6.4 select 方法,能搞限制返回值。
list = Talk.select("title, speaker, recorded_on")

16.6.5 join 方法,允许指定一组相关联表加入到默认表。
LineItem.select('li.quantity').
	where("pr.title = 'Programming Ruby 1.9'").
	joins("as li inner join products as pr on li.product_id = pr.id")

16.6.6 readonly 方法,作用是：不能把 ActiveRecord::Resource 返回的 Active Record 对象存储到数据库中。

16.6.7 group方法
# 把 group 子句添加到由查询器所生成的 SQL 语句中：
summary = LineItem.select("sku, sum(amount) as amount").
				   group("sku")

16.6.8 lock 方法
# 例如：只有在账户上有足够的资金时，才可扣除账户款，可以编写如下代码
Account.transaction do
	ac = Account.where(:id=>id).lock("LOCK IN SHARE MODE").first
	ac.blance -= amount if ac.balance > amount
	ac.save
end

16.6.9
16.6.10
16.6.11
16.6.12
16.6.13



17.  缓存
17.1  页面缓存
# 要启用缓存，只需要给类添加两个声明
class ContentController < ApplicationController
	caches_page :public_content
	caches_action :premium_content

# 行为缓存是前后置过滤器的一个很好地例子，过滤器的前置部分检查缓存项目是否存在。如果存在，将它呈现给用户，以避免执行实际行为。
# 过滤器的后置部分用来将行为运行的结果保存在缓存中。


17.2 片段缓存
# views/app/views/blog/list.html.erb

<%= @dynamic_content % >    # Here is dynamic content -->

<% cache do % >	 # Here is the content we cache
	<ul>
	  <% for article in Article.find_recent %>
		<li> <p><%= h(article.body) %></p> </li>
	  <% end %>
	</ul>
<% end % >			# End of cached content

<%= @dynamic_content % >   # More dynamic content.




18 
<%= link_to 'Destroy Comment', [comment.article, comment],
               method: :delete,
               data: { confirm: 'Are you sure?' } %>
































































































































































































