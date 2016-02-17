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


2.0   
rails console (可以簡寫成 rails c)
透过 console，我们可以轻易的练习操作 ActiveRecord。





 
A:   基础操作

3.0 
3.1    如何新增

ActiveRecord提供了四种API，分别是save、save!、create和create!：

a = Category.new( :name => 'Ruby', :position => 1 )
a.save
 
b = Category.new( :name => 'Perl', :position => 2 )
b.save!
        
Category.create( :name => 'Python', :position => 3 )
c = Category.create!( :name => 'PHP', :position => 4 )

其中create和create!就等于new完就save和save!，有无惊叹号的差别在于validate数据验证不正确的动作，无惊叹号版本会回传布尔值(true或false)，有惊叹号版本则是验证错误会丢出例外。




3.2   如何查询

ActiveRecord 使用了 Arel 技术来实现查询功能，你可以自由组合 where、limit、select、order 等条件。

# Arel 是relational algebra” library。但根据 2.0 实现者 tenderlove 的说法，也可以说是一种 SQL compiler。http://engineering.attinteractive.com/2010/12/architecture-of-arel-2-0/

3.2.1    first, last 和 all

这三个方法可以分别拿出数据库中的第一笔、最后一笔及全部的数据：

c1 = Category.first
c2 = Category.last
categories = Category.all # 這會是一個陣列
如果数据量较多，请不要在正式上线环境中执行.all 把所有数据拿出来，这样会耗费非常多的内存。请用分页或缩小查询范围。

3.2.2     find

已知数据的主键 ID 的值的话，可以使用 find 方法：

c3 = Category.find(1)
c4 = Category.find(2)
find 也可以接受数组参数，这样就会一次找寻多个并回传数组：

arr = Category.find([1,2])
# 或是
arr = Category.find(1,2)
如果找不到数据的话，会丢 ActiveRecord::RecordNotFound 例外。如果是 find_by_id 就不会丢出例外，而是回传 nil。

3.2.3      find_by_sql

如果需要手动撰写 SQL，可以使用 find_by_sql，例如：

c8 = Category.find_by_sql("select * from categories")
不过在绝大多数的情况，是不需要手动写 SQL 的。

3.2.4      where 查询条件

where 可以非常弹性的组合出 SQL 查询，例如：

c9 = Category.where( :name => 'Ruby', :position => 1 )
c10 = Category.where( [ "name = ? or position = ?", 'Ruby', 2] )
其中参数有两种写法，一种是 Hash，另一种是 Array。前者的写法虽然比较简洁，但是就没办法写出 or 的查询。注意到不要使用字符串写法，例如

Category.where("name = #{params[:name]}") # 請不要這樣寫
这是因为字符串写法会有 SQL injection 的安全性问题，请改用数组写法。

另外，where 是 lazy loading，也就是直到真的需要取值的时候，才会跟数据库拿数据。如果需要立即触发，可以接着使用 .all, .first, .last，例如

c11 = Category.where( :name => 'Ruby', :position => 1 ).all

3.2.5       limit

limit 可以限制笔数

c = Category.limit(5).all
c.size # 5
order

3.2.6        order 可以设定排序条件

Category.order("position")
Category.order("position DESC")
Category.order("position DESC, name ASC")
如果要消去order条件，可以用reorder：

Category.order("position").reorder("name") # 改用 name 排序
Category.order("position").reorder(nil) # 取消所有排序



3.2.7           offset

offset 可以设定忽略前几笔不取出，通常用于数据分页：

c = Category.limit(2)
c.first.id # 1
c = Category.limit(2).offset(3)
c.first.id # 4


3.2.8          select

默认的 SQL 查询会取出数据的所有字段，有时候你可能不需要所有数据，为了性能我们可以只取出其中特定字段：

Category.select("id, name")
例如欄位中有 Binary 資料時，你不會希望每次都讀取出龐大的 Binary 資料佔用記憶體，而只希望在使用者要下載的時候才讀取出來。

3.2.9          readonly

c = Category.readonly.first
如此查詢出來的c就無法修改或刪除，不然會丟出ActiveRecord::ReadOnlyRecord例外。

3.2.10              group 和 having

group運用了資料庫的group_by功能，讓我們可以將計算後的結果依照某一個欄位分組後回傳，例如說今天我有一批訂單，裡面有分店的銷售金額，我希望能這些金額全部加總起來變成的各分店銷售總金額，這時候我就可以這麼做：

Order.select("store_name, sum(sales)").group("store")
這樣會執行類似這樣的SQL:

SELECT store_name, sum(sales) FROM orders GROUP BY store_name
having則是讓group可以再增加條件，例如我們想為上面的查詢增加條件是找出業績銷售超過10000的分店，那麼我可以這麼下：

Order.select("store_name, sum(sales)").group("store").having("sum(sales) > ?", 10000)
所執行的SQL便會是:

SELECT store_name, sum(sales) FROM orders GROUP BY store_name HAVING sum(sales) > 10000



3.2.11       串接寫法

以上的 where, order , limit,offset, joins, select 等等，都可以自由串接起來組合出最終的 SQL 條件：

c12 = Category.where( :name => 'Ruby' ).order("id desc").limit(3)




3.2.12       find_each 批次處理

如果資料量很大，但是又需要全部拿出來處理，可以使用find_each 批次處理

Category.where("position > 1").find_each do |category|
    category.do_some_thing
end
預設會批次撈 1000 筆，如果需要設定可以加上 :batch_size 參數。

3.2.13           重新載入

如果已經讀取的 AR 資料，需要重新載入，可以用 reload 方法：

p = Category.first
p.reload






4.0          如何刪除

一種是先抓到該物件，然後刪除：

c12 = Category.first
c12.destroy
另一種是直接對類別呼叫刪除，傳入 ID 或條件：

Category.delete(2)
Category.delete_all(conditions = nil)
Category.destroy_all(conditions = nil) 
delete 不會有 callback 回呼，destroy有 callback 回呼。什麼是回呼詳見下一章。

5.0           統計方法

Category.count
Category.average(:position)
Category.maximum(:position)
Category.sum(:position)
其中我們可以利用上述的 where 條件縮小範圍，例如：

Category.where( :name => "Ruby").count




6.0      如何更新

c13 = Category.first
c13.update_attributes(attributes)
c13.update_attributes!(attributes)
c13.update_attribute(attribute_name, value)
注意update_attribute 會略過 validation 資料驗證 注意 mass assign 安全性問題，可以透過 attr_protected 或 attr_accessor 設定，詳見安全性一章。






B:    Scopes 作用域

Model Scopes是一項非常酷的功能，它可以將常用的查詢條件宣告起來，讓程式變得乾淨易讀，更厲害的是可以串接使用。例如，我們編輯app/models/event.rb，加上兩個Scopes：

class Event < ActiveRecord::Base
	scope :public, where( :is_public => true)
	scope :recent_three_days, where(["created_at > ?", Time.now - 3.days ])
end

Event.create( :name => "public event", :is_public => true )
Event.create( :name => "private event", :is_public => false )
Event.create( :name => "private event", :is_public => true )

Event.public
Event.public.recent_three_days

串接的順序沒有影響

接著，我們可以設定一個預設的Scope，通常會拿來設定排序：

class Event < ActiveRecord::Base    
    default_scope order('id DESC')        
end

unscoped方法可以暫時取消預設的default_scope：

Event.unscoped do
    Event.all
    # SELECT * FROM events
end

最後，Scope也可以接受參數，例如：

class Event < ActiveRecord::Base
    scope :recent, lambda{ |date| where(["created_at > ? ", date ]) } 
    # 或 scope :recent, Proc.new{ |t| where(["created_at > ? ", t ]) }
end
 
Event.recent( Time.now - 7.days )

不過，筆者會推薦上述這種帶有參數的Scope，改成如下的類別方法，可以比較明確看清楚參數是什麼，特別是你想給預設值的時候：

class Event < ActiveRecord::Base
    def self.recent(t=Time.now)
        where(["created_at > ? ", t ])
    end
end
 
Event.recent( Time.now - 7.days )

這樣的效果是一樣的，也是一樣可以和其他Scope做串接。

scoped方法可以將Model轉成可以串接的形式，方便依照參數組合出不同查詢，例如

fruits = Fruit.scoped
fruits = fruits.where(:colour => 'red') if options[:red_only]
fruits = fruits.limit(10) if limited?

可以呼叫to_sql方法觀察實際ORM轉出來的SQL，例如Event.public.recent_three_days.to_sql





C:    虚拟属性(VirtualAttribute)

有时候窗体里操作的属性数据，不一定和数据库的字段完全对应。例如数据表分成first_name和last_name两个字段好了，但是窗体输入和显示的时候，只需要一个属性叫做full_name，这时候你就可以在model里面定义这样的方法：

def full_name
    "#{self.first_name} #{self.last_name}"
end
 
def full_name=(value)
    self.first_name, self.last_name = value.to_s.split(" ", 2)  
end


















































































































































