Rails & Ruby 知识点.rb


1.0 default_scope is Evil
class Post
	default_scope where(published: true).order("created_at desc")
end


2.0 erb,实现 <h3> <%= article.title %> </h3>

<%=h3= link_to article.title, article % >   
或者
<h3><%= link_to article.title, article %></h3>


3.0  attr_accessible 什么意思
attr_accessible is not available for Rails version 4+. 
You would have to go with strong parameters.


4.0  as: :date 什么意思


5.0  acts_as_taggable_on tag_cloud throws undefined method 'empty?' for nil:NilClass
#

# I had the same issue and this worked for me, I hope it will work for you too.

# Add a before filter in your post_controller like this.

class PostsController < ApplicationController
...
  before_action :tag_cloud
...
  def tag_cloud
    @tags = Post.tag_counts_on(:tags).order('count desc').limit(20)
  end
...
end
# After doing this I had also a routes error in this line:

link_to tag.name, { :action => :tag, :id => tag.name }, :class => css_class
# I had to change the line like this:

<%= link_to tag.name, tag_path(tag.name), :class => css_class % >

# Now everything it is working on my app. I hope this will help you. 

5.1
@tags = ActsAsTaggableOn::Tag.all(:order=>'name')

<% if @tags.count > 0 %>
  <ul>
    <% @tags.each do |tag| %>
      <li><%= link_to tag.name, tagged_url(:tag => tag.name) %></li>
    <% end %>
  </ul>
<% else %>
  <p>There are no tags on the system.</p>
<% end % >


6.0 --skip-stylesheet

略过 stylesheet 文件


7.0  
<td><%= link_to '删除', @post, method: :delete, data: { confirm: 'Are you sure?' } %></td>



8.0  
用       <% @heros.each do |hero| % >
		<% end % >
方法时，要把循环方法放在 block 外面，这样才是循环block，而不会出现block 连在一起分不开的情况


9  Add style/image to button_to
<%= link_to image_tag("rails.png"), {:controller => 'foo', :action => "bar" } % >

10. 配置 carrierwave 时错误
ExecJS::RuntimeError in Heros#show
Showing /Users/zhangxiaodong/projects/heroWiki01/app/views/layouts/application.html.erb where line #5 raised:
SyntaxError: [stdin]:7:32: reserved word 'function'

上面错误代码原因是 js 代码的问题，注释掉application.coffee 里面的代码后，就可以正常运行了。


11 
	def tag_list
		tags.map(&:name).join(", ")
	end


12.  layouts 布局

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

	<% render 'layouts/shim' %>
</head>
<body>
	<%= render 'layouts/header' %>
	
	<div class="container-fluid">
		<div class="row">
			<%= yield :sidebar %>
			<%= yield %>
		</div>
	</div>

	<%= render 'layouts/footer' %>
	<% debug(params) if Rails.env.development? %>
</body>
</html>


###
<footer class="footer navbar-fixed-bottom">
	<div class="container">
		<nav>
			<ul>
				<li><%= link_to "Contact Us", "#" %></li>
				<li><%= link_to "Contact Us", "#" %></li>
				<li><%= link_to "Contact Us", "#" %></li>
				<li><%= link_to "Contact Us", "#" %></li>
				<li><%= link_to "Contact Us", "#" %></li>
			</ul>
		</nav>
	</div>
</footer>


13. 顶部导航和登陆注册按钮和 devise 结合。

	<nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-3" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Home</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-3">
          
          <% if user_signed_in? %>
            <%= link_to destroy_user_session_path, method: :delete do %>
              <button type="button" class="btn btn-default navbar-btn">Log Out</button>
            <% end %>

              <div class="navbar-right navbar-brand">Hello, <%= current_user.email %></div>
          <% else %>
              <%= link_to new_user_session_path do %>
                <button type="button" class="btn btn-default navbar-btn">Log In</button>
              <% end %>
          <% end %>

        </div>
      </div>
    </nav>

13.1 example2
	<% if user_signed_in? %>
		Welcome, <%= current_user.email %>
		<%= link_to "Log out", destroy_user_session_path, method: :delete %>
	<% else %>
		<%= link_to "Sign In", new_user_session_path %>
	<% end %>

14  文字居中
<h2 style="text-align:center"><%= movie.title %></h3>


15 input 输入框底下提示话语
<p class="help-block">一句话简单描述.</p>


16  在 rails c 中指定 user 为 admin

rails c
Question.first
Question.first.destroy
Question.count
u = User.first
u.admin
u.admin = true
u.save


17  kaminari   error
 def index
    if params[:tag]
      @lists = List.tagged_with(params[:tag])
    else
      @lists = List.all
    end
    @lists = @lists.order(created_at: :desc).page(params[:page]).per(9)
  end




18 . rails c 新建一个用户
# 创建用户对象
rails console --sandbox
User.new
user = User.new(name: "Mick", email: "mick@example.com")
user.valid?
user.save
user
user.name
user.email
user.updated_at
***
User.create(name: "A Nother", email: "another@example.org")
foo = User.create(name: "Foo", email: "foo@bar.com")
foo.destroy
foo
***
# 查找用户对象
User.find(1)
User.find(3)
User.find_by(email: "mhartl@example.com")
User.first
User.all
***
# 更新用户对象
user
user.email = "mhartl@example.net"
user.save

user.email
user.email = "foo@bar.com"
user.reload.email
user.update_attributes(name: "The Dude", email: "dude@abides.org")
user.name
user.email

user.update_attribute(:name, "The Dude")
user.name
***


19 

class User < ActiveRecord::Base
  validates :name, presence: true
end

name 属性的存在性验证使用 validates 方法，而且其参数为 presence: true，如代码清单 6.9 所示。
presence: true 是只有一个元素的可选哈希参数，4.3.4 节说过，如果方法的最后一个参数是哈希，可以省略花括号。

20  $ rails generate model Micropost content:text user:references
前者使用了 references 类型。references 会自动添加 user_id 列（以及索引），把用户和微博关联起来。

class CreateMicroposts < ActiveRecord::Migration
  def change
    create_table :microposts do |t|
      t.text :content
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
    add_index :microposts, [:user_id, :created_at]
  end
end

add_index :microposts, [:user_id, :created_at]
我们把 user_id 和 created_at 放在一个数组中，告诉 Rails 我们要创建的是“多键索引”（multiple key index），因此 Active Record 会同时使用这两个键。


21
在 SQL 中，DESC 表示“降序”，即新发布的微博在前面。

order(created_at: :desc)


22
class User < ActiveRecord::Base
  has_many :microposts, dependent: :destroy

end
dependent: :destroy 的作用是在用户被删除的时候，把这个用户发布的微博也删除。
这么一来，如果管理员删除了用户，数据库中就不会出现无主的微博了。

23  头像写法，post.user.name, time_ago_in_words(post.created_at)

<li id="micropost-<%= micropost.id %>">
  <%= link_to gravatar_for(micropost.user, size: 50), micropost.user %>
  <span class="user"><%= link_to micropost.user.name, micropost.user %></span>
  <span class="content"><%= micropost.content %></span>
  <span class="timestamp">
    Posted <%= time_ago_in_words(micropost.created_at) %> ago.
  </span>
</li>



24  ruby   语法  数组和值域

24.1
 join(', ')    
>> a
=> [42, 8, 17, 7, "foo", "bar"]
>> a.join                       # 没有连接符
=> "428177foobar"
>> a.join(', ')                 # 连接符是一个逗号和空格
=> "42, 8, 17, 7, foo, bar"


24.2 和数组有点类似的是值域（range），使用 to_a 方法把它转换成数组或许更好理解：

>> 0..9
=> 0..9
>> 0..9.to_a              # 错了，to_a 在 9 上调用了
NoMethodError: undefined method 'to_a' for 9:Fixnum
>> (0..9).to_a            # 调用 to_a 要用括号包住值域
=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]



24.3     %w

>> a = %w[foo bar baz quux]         # %w 创建一个元素为字符串的数组
=> ["foo", "bar", "baz", "quux"]
>> a[0..2]
=> ["foo", "bar", "baz"]



24.4    有个特别有用的技巧：值域的结束值使用 -1 时，不用知道数组的长度就能从起始值开始一直获取到最后一个元素：

>> a = (0..9).to_a
=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
>> a[2..(a.length-1)]               # 显式使用数组的长度
=> [2, 3, 4, 5, 6, 7, 8, 9]
>> a[2..-1]                         # 小技巧，索引使用 -1
=> [2, 3, 4, 5, 6, 7, 8, 9]



25  块
>> 3.times { puts "Betelgeuse!" }   # 3.times 后跟的块没有变量
"Betelgeuse!"
"Betelgeuse!"
"Betelgeuse!"
=> 3
>> (1..5).map { |i| i**2 }          # ** 表示幂运算
=> [1, 4, 9, 16, 25]
>> %w[a b c]                        # 再说一下，%w 用来创建元素为字符串的数组
=> ["a", "b", "c"]
>> %w[a b c].map { |char| char.upcase }
=> ["A", "B", "C"]
>> %w[A B C].map { |char| char.downcase }
=> ["a", "b", "c"]

可以看出，map 方法返回的是在数组或值域中每个元素上执行块中代码后得到的结果。
在最后两个命令中，map 后面的块在块变量上调用一个方法，这种操作经常使用简写形式：

>> %w[A B C].map { |char| char.downcase }
=> ["a", "b", "c"]
>> %w[A B C].map(&:downcase)
=> ["a", "b", "c"]

25.2   
>> ('a'..'z').to_a                     # 由全部英文字母组成的数组
=> ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
"p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
>> ('a'..'z').to_a.shuffle             # 打乱数组
=> ["c", "g", "l", "k", "h", "z", "s", "i", "n", "d", "y", "u", "t", "j", "q",
"b", "r", "o", "f", "e", "w", "v", "m", "a", "x", "p"]
>> ('a'..'z').to_a.shuffle[0..7]       # 取出前 8 个元素
=> ["f", "w", "i", "a", "h", "p", "c", "x"]
>> ('a'..'z').to_a.shuffle[0..7].join  # 把取出的元素合并成字符串
=> "mznpybuj"



26  Ruby 类
26.1  类的继承
BasicObject -> Object -> String -> Word

26.2  静态页面控制器的类继承关系
BasicObject -> Object -> AbstractController::Base -> ActionController::Metal 
-> ActionController::Base -> ApplicationController -> StaticPagesController



27  索引是对数据库表中一个或多个列（例如，employee 表的姓名 (name) 列）的值进行排序的结构。如果想按特定职员的姓来查找他或她，则与在表中搜索所有的行相比，索引有助于更快地获取信息。
例如这样一个查询：select * from table1 where id=10000。如果没有索引，必须遍历整个表，直到ID等于10000的这一行被找到为止；有了索引之后(必须是在ID这一列上建立的索引)，即可在索引中查找。由于索引是经过某种算法优化过的，因而查找次数要少的多。可见，索引是用来定位的。

28 

if @topic.update_attributes(topic_params)


private

def topic_params
	if current_user && current_user.admin?
		params.require(:topic).permit(:name, :sticky)
	else
		params.require(:topic).permit(:name)
	end
end



28  更改 model 属性的名字
rails g migration rename_articles_content_to_body 
#
class RenameArticlesContentToBody < ActiveRecord::Migration
	def change
		rename_column :articles, :content, :body
	end
end

#

rails g mogration add_content_to_articles content:text
rails g mogration copy_article_content
#
~
git push 
#
cap deploy:migrations
cap nginx:setup
cap deploy:web:enable



29
修改表单后，我们要让 RelationshipsController 响应 Ajax 请求。为此，我们要使用 respond_to 方法，根据请求的类型生成合适的响应。例如：

respond_to do |format|
  format.html { redirect_to user }
  format.js
end
这种写法可能会让人困惑，其实只有一行代码会执行。（respond_to 块中的代码更像是 if-else 语句，而不是代码序列。）


30  Sass::SyntaxError: File to import not found or unreadable: bootstrap-sprockets
(1)After making changes to Gemfile, do not forget to restart the server with rails s
(2)gem 'bootstrap-sass', '3.2.0.2'
(3) I solved it in following steps:
copying the "bootstrap.css" in my "app/assets/stylesheets/" (it was missing)
gem install autoprefixer-rails (also modify Gemfile)
gem install sprockets (also modify Gemfile)
bundle install
RESTART server (not just refreshing page)




32   gem 'public_activity'  失败
http://stackoverflow.com/questions/17043117/public-activity-and-rails-4
看了sof上，说的是rails 4 版本问题。
办法一：gem 'public_activity', github: 'pokonski/public_activity'
办法二：gem 'protected_attributes'     to your Gemfile.

自己实践后，还是需要 添加 gem 'protected_attributes'， 才能走通下一步



33 to_s
小数点十位数整数
BigDecimal.new(5.00, 6).to_s  # => "5.0"

34   JSON 支持
相较于 json gem 为 Ruby 对象提供的to_json方法，Active Support 给出了一个更好的实现。因为有许多类，诸如Hash、OrderedHash和Process::Status，都需要做特殊处理才能到适合的 JSON 替换。

定义于 active_support/core_ext/object/json.rb.



34  如何使用 Ajax
34.1  先在 views 中 添加  :remote => true
34.2  然后在 controller  中 的  def create end  中 if ? save 添加  format.js
34.3  最后 在 另一关系model 的 views 里 添加 create.js.erb



35
rails g scaffold myModel --no-stylesheets



35  编辑器文本输入框大小
* {
  font-family: "Delicious";
 }

textarea {
  height:500px;
}


36  rails c
Post.first
Post.first.tags << Tag.first
Post.first.tags








