http://railstutorial-china.org/book/chapter12.html#following-users


# 1.0
> 传统是3张表 users following  followers -> 抽象过后是2张表 users relationships  

### 1.1 User 关注 User
>user through active_relationship has_many user   

user : id | name | email
active_relationship : follower_id(主键) | followed_id
user: id | name | email

### 1.2
主动(我关注)： user.following = user.followeds
被动(关注我)： user.followers

### 1.3   外键：follower_id
因为 microposts 表中有识别用户的 user_id 列。这种连接两个表的列，我们称之为“外键”（foreign key）。当指向用户模型的外键为 user_id 时，Rails 会自动获知关联，因为默认情况下，Rails 会寻找名为 <class>_id 的外键，其中 <class> 是模型类名的小写形式。现在，尽管我们处理的还是用户，但识别用户使用的外键是 follower_id。这是从被关注者角度出发(是被动关系主键)，` foreign_key: "follower_id"`,而不用 `followed_id`.

#### 1.3.1 foreign_key

按照约定，用来存储外键的字段名是关联名后加 _id。:foreign_key 选项可以设置要使用的外键名：
`
class Order < ActiveRecord::Base
  belongs_to :customer, class_name: "Patron",
                        foreign_key: "patron_id"
end
`

不管怎样，Rails 都不会自动创建外键字段，你要自己在迁移中创建。

# 2.0
> rails g model Relationship follower_id:integer followed_id:integer

```
class CreateRelationships < ActiveRecord::Migration   
  def change 
    create_table :relationships do |t| 
      t.integer :follower_id 
      t.integer :followed_id 

      t.timestamps null: false 
    end 
    add_index :relationships, :follower_id 
    add_index :relationships, :followed_id 
    add_index :relationships, [:follower_id, :followed_id], unique: true 
  end
end
```
`add_index` 因为我们会通过 follower_id 和 followed_id 查找关系，所以还要为这两个列建立索引，提高查询的效率。 设置了一个“多键索引”，确保 (follower_id, followed_id) 组合是唯一的，避免多次关注同一个用户。添加索引后，如果用户试图创建重复的关系（例如使用 curl 这样的命令行工具），应用会抛出异常。

# 3.0  model/user.rb
 `has_many :active_relationships, class_name: "Relationship",   
                                foreign_key: "follower_id",   
                                dependent: :destroy`


# 4.0 model/relationship.rb
`  belongs_to :follower, class_name: "User"   
 belongs_to :followed, class_name: "User"`

# 5.0 model/user.rb
`has_many :following, through: :active_relationships, source: :followed`


# 6.0
```
class User < ActiveRecord::Base

  def feed

  end

  #关注另一个用户
  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  #取消关注另一个用户
  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  #如果当前用户关注了指定的用户，返回 true
  def following?(other_user)
    following.include?(other_user)
  end

  private

end
```

### 7.0 关注我的人

> active_relationships 换成 passive_relationships 即可

### 8.0 routes.rb
```
  resources :users do
    member do
      get :following, :followers
    end
  end 
```
### 9.0  HTML
数量统计和关注表单/
9.1 显示数量统计的局部视图
```
app/views/shared/_stats.html.erb
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
```
9.2  在首页显示数量统计
```
app/views/static_pages/home.html.erb
<% if logged_in? %>
  <div class="row">
    <aside class="col-md-4">
      <section class="user_info">
        <%= render 'shared/user_info' %>
      </section>
      <section class="stats">
        <%= render 'shared/stats' %>
      </section>
      <section class="micropost_form">
        <%= render 'shared/micropost_form' %>
      </section>
    </aside>
    <div class="col-md-8">
      <h3>Micropost Feed</h3>
      <%= render 'shared/feed' %>
    </div>
  </div>
<% else %>
  .
  .
  .
<% end %>
```

9.3 显示关注或取消关注表单的局部视图
app/views/users/_follow_form.html.erb
```
<% unless current_user?(@user) %>
  <div id="follow_form">
  <% if current_user.following?(@user) %>
    <%= render 'unfollow' %>
  <% else %>
    <%= render 'follow' %>
  <% end %>
  </div>
<% end %>
```

9.4  添加“关系”资源的路由设置
config/routes.rb
resources :relationships,       only: [:create, :destroy]

```
9.5  关注用户的表单
app/views/users/_follow.html.erb
<%= form_for(current_user.active_relationships.build) do |f| %>
  <div><%= hidden_field_tag :followed_id, @user.id %></div>
  <%= f.submit "Follow", class: "btn btn-primary" %>
<% end %>
```
9.6  取消关注用户的表单
app/views/users/_unfollow.html.erb
```
<%= form_for(current_user.active_relationships.find_by(followed_id: @user.id),
             html: { method: :delete }) do |f| %>
  <%= f.submit "Unfollow", class: "btn" %>
<% end %>
```

```
9.7   在用户资料页面加入关注表单和数量统计
app/views/users/show.html.erb
<% provide(:title, @user.name) %>
<div class="row">
  <aside class="col-md-4">
    <section>
      <h1>
        <%= gravatar_for @user %>
        <%= @user.name %>
      </h1>
    </section>
    <section class="stats">
      <%= render 'shared/stats' %>
    </section>
  </aside>
  <div class="col-md-8">
    <%= render 'follow_form' if logged_in? %>
    <% if @user.microposts.any? %>
      <h3>Microposts (<%= @user.microposts.count %>)</h3>
      <ol class="microposts">
        <%= render @microposts %>
      </ol>
      <%= will_paginate @microposts %>
    <% end %>
  </div>
</div>
```



### 10.0   我关注的用户列表页面和关注我的用户列表页面/
#### 10.1
```
following 和 followers 动作 RED
app/controllers/users_controller.rb
class UsersController < ApplicationController
  before_action :logged_in_user, only: [:index, :edit, :update, :destroy,
                                        :following, :followers]
  .
  .
  .
  def following
    @title = "Following"
    @user  = User.find(params[:id])
    @users = @user.following.paginate(page: params[:page])
    render 'show_follow'
  end

  def followers
    @title = "Followers"
    @user  = User.find(params[:id])
    @users = @user.followers.paginate(page: params[:page])
    render 'show_follow'
  end

  private
  .
  .
  .
end
```

### 10.2  渲染我关注的用户列表页面和关注我的用户列表页面的 show_follow 视图
```
app/views/users/show_follow.html.erb
<% provide(:title, @title) %>
<div class="row">
  <aside class="col-md-4">
    <section class="user_info">
      <%= gravatar_for @user %>
      <h1><%= @user.name %></h1>
      <span><%= link_to "view my profile", @user %></span>
      <span><b>Microposts:</b> <%= @user.microposts.count %></span>
    </section>
    <section class="stats">
      <%= render 'shared/stats' %>
      <% if @users.any? %>
        <div class="user_avatars">
          <% @users.each do |user| %>
            <%= link_to gravatar_for(user, size: 30), user %>
          <% end %>
        </div>
      <% end %>
    </section>
  </aside>
  <div class="col-md-8">
    <h3><%= @title %></h3>
    <% if @users.any? %>
      <ul class="users follow">
        <%= render @users %>
      </ul>
      <%= will_paginate %>
    <% end %>
  </div>
</div>
```




### 11  关注按钮的常规实现方式

> rails generate controller Relationships

```
11.1   RelationshipsController 的代码
app/controllers/relationships_controller.rb
RelationshipsController 的访问限制

class RelationshipsController < ApplicationController
  before_action :logged_in_user

  def create
    user = User.find(params[:followed_id])
    current_user.follow(user)
    redirect_to user
  end

  def destroy
    user = Relationship.find(params[:id]).followed
    current_user.unfollow(user)
    redirect_to user
  end
end
```



### 12   关注按钮的 Ajax 实现方式
```
代码清单 12.33：使用 Ajax 处理关注用户的表单
app/views/users/_follow.html.erb
<%= form_for(current_user.active_relationships.build, remote: true) do |f| %>
  <div><%= hidden_field_tag :followed_id, @user.id %></div>
  <%= f.submit "Follow", class: "btn btn-primary" %>
<% end %>
```
```
代码清单 12.34：使用 Ajax 处理取消关注用户的表单
app/views/users/_unfollow.html.erb
<%= form_for(current_user.active_relationships.find_by(followed_id: @user.id),
             html: { method: :delete },
             remote: true) do |f| %>
  <%= f.submit "Unfollow", class: "btn" %>
<% end %>
```
```
代码清单 12.35：在 RelationshipsController 中响应 Ajax 请求
app/controllers/relationships_controller.rb
class RelationshipsController < ApplicationController
  before_action :logged_in_user

  def create
    @user = User.find(params[:followed_id])
    current_user.follow(@user)
    respond_to do |format|
      format.html { redirect_to @user }
      format.js
    end
  end

  def destroy
    @user = Relationship.find(params[:id]).followed
    current_user.unfollow(@user)
    respond_to do |format|
      format.html { redirect_to @user }
      format.js
    end
  end
end
```

13   动态流
```
代码清单 12.46：动态流的最终实现 GREEN
app/models/user.rb
class User < ActiveRecord::Base
  .
  .
  .
  # 返回用户的动态流
  def feed
    following_ids = "SELECT followed_id FROM relationships
                     WHERE  follower_id = :user_id"
    Micropost.where("user_id IN (#{following_ids}) OR user_id = :user_id", user_id: id)
  end
  .
  .
  .
end
```

```
代码清单 12.48：home 动作中分页显示的动态流
app/controllers/static_pages_controller.rb
class StaticPagesController < ApplicationController

  def home
    if logged_in?
      @micropost  = current_user.microposts.build
      @feed_items = current_user.feed.paginate(page: params[:page])
    end
  end
  .
  .
  .
end
```





***
***
***





You need two models, a Person and a Followings
```
rails generate model Person name:string
rails generate model Followings person_id:integer follower_id:integer blocked:boolean
```
and the following code in the models
```
class Person < ActiveRecord::Base
  has_many :followers, :class_name => 'Followings', :foreign_key => 'person_id'
  has_many :following, :class_name => 'Followings', :foreign_key => 'follower_id' 
end
```
and corresponding in the Followings class you write
```
class Followings < ActiveRecord::Base
  belongs_to :person
  belongs_to :follower, :class_name => 'Person'
end
```
You could make the names clearer to your liking (i especially don't like the Followings-name), but this should get you started.






