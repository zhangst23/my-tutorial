代码清单：ruby on rails tutorials.rb

1.0 
# 代码清单 11.36：用户信息侧边栏局部视图
# app/views/shared/_user_info.html.erb

<%= link_to gravatar_for(current_user, size: 50), current_user %>
<h1><%= current_user.name %></h1>
<span><%= link_to "view my profile", current_user %></span>
<span><%= pluralize(current_user.microposts.count, "micropost") %></span>


2.0
# 代码清单 11.37：微博创建表单局部视图
# app/views/shared/_micropost_form.html.erb

<%= form_for(@micropost) do |f| %>
  <%= render 'shared/error_messages', object: f.object %>
  <div class="field">
    <%= f.text_area :content, placeholder: "Compose new micropost..." %>
  </div>
  <%= f.submit "Post", class: "btn btn-primary" %>
<% end %>


3.0  动态流原型  feed
class User < ActiveRecord::Base
  .
  .
  .
  # 实现动态流原型
  # 完整的实现参见第 12 章
  def feed
    Micropost.where("user_id = ?", id)
  end

    private
    .
    .
    .
end

Micropost.where("user_id = ?", id) 中的问号确保 id 的值在传入底层的 SQL 查询语句之前做了适当的转义，避免“SQL 注入”（SQL injection）这种严重的安全隐患。这里用到的 id 属性是个整数，没什么危险，不过在 SQL 语句中引入变量之前做转义是个好习惯。

细心的读者可能已经注意到了，代码清单 11.44 中的代码和下面的代码是等效的：

def feed
  microposts
end



4.0  在微博局部视图中添加删除链接
# app/views/microposts/_micropost.html.erb
<li id="<%= micropost.id %>">
  <%= link_to gravatar_for(micropost.user, size: 50), micropost.user %>
  <span class="user"><%= link_to micropost.user.name, micropost.user %></span>
  <span class="content"><%= micropost.content %></span>
  <span class="timestamp">
    Posted <%= time_ago_in_words(micropost.created_at) %> ago.
    <% if current_user?(micropost.user) %>
      <%= link_to "delete", micropost, method: :delete,
                                       data: { confirm: "You sure?" } %>
    <% end %>
  </span>
</li>


5.0 
# 显示数量统计的局部视图
# app/views/shared/_stats.html.erb
<% @user ||= current_user %>
<div class="stats">
  <a href="<%= following_user_path(@user) %>">
    <strong id="following" class="stat">
      <%= @user.following.count %>
    </strong>
    following
  </a>
  <a href="<%= followers_user_path(@user) %>">
    <strong id="followers" class="stat">
      <%= @user.followers.count %>
    </strong>
    followers
  </a>
</div>



6
# 代码清单 12.21：关注用户的表单
# app/views/users/_follow.html.erb
<%= form_for(current_user.active_relationships.build) do |f| %>
  <div><%= hidden_field_tag :followed_id, @user.id %></div>
  <%= f.submit "Follow", class: "btn btn-primary" %>
<% end %>
# 代码清单 12.22：取消关注用户的表单
# app/views/users/_unfollow.html.erb
<%= form_for(current_user.active_relationships.find_by(followed_id: @user.id),
             html: { method: :delete }) do |f| %>
  <%= f.submit "Unfollow", class: "btn" %>
<% end % >

这两个表单都使用 form_for 处理“关系”模型对象，二者之间主要的不同点是，代码清单 12.21 用来构建一个新“关系”，而代码清单 12.22 查找现有的“关系”。很显然，第一个表单会向 RelationshipsController 发送 POST 请求，创建“关系”（create 动作）；而第二个表单发送的是 DELETE 请求，销毁“关系”（destroy 动作）。（这两个动作在 12.2.4 节编写。）你可能还注意到了，关注用户的表单中除了按钮之外什么内容也没有，但是仍然要把 followed_id 发送给控制器。在代码清单 12.21 中，我们使用 hidden_field_tag 方法把 followed_id 添加到表单中，生成的 HTML 如下：

<input id="followed_id" name="followed_id" type="hidden" value="3" />


7
实现动态流原型时，我们使用 Active Record 中的 where 方法完成上面这种查询（代码清单 11.44）。那时所需的查询很简单，只是通过当前用户的 ID 取出他发布的微博：

Micropost.where("user_id = ?", id)
而现在，我们遇到的情况复杂得多，要使用类似下面的代码实现：

Micropost.where("user_id IN (?) OR user_id = ?", following_ids, id)
从上面的查询条件可以看出，我们需要生成一个数组，其元素是关注的用户的 ID。生成这个数组的方法之一是，使用 Ruby 中的 map 方法，这个方法可以在任意“可枚举”（enumerable）的对象上调用，[9]例如由一组元素组成的集合（数组或哈希）。



8     followers   followed

rails generate model Relationship follower_id:integer followed_id:integer
在 relationships 表中添加索引   db/migrate/[timestamp]_create_relationships.rb
rake db:migrate
*** 用户和“关系”模型之间的关联
has_many  belongs_to
***
数据验证
class Relationship < ActiveRecord::Base
	validates :follower_id, presence: true
  validates :followed_id, presence: true
end
***
has_many :following, through: :active_relationships, source: :followed




















