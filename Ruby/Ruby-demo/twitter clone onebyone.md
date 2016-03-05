# twitter clone

rails new flutter  
cd workspace  
cd flutter    
git init  

git status    
git commit -m"Initial commit, rails app created."  
git init
git add -A  
git commit -m "first commit"  
git remote add origin https://github.com/zhangst23/flutter.git  
git push -u origin master  
***
rails g controller Pages index home profiile explore  
gst  
git add -A  
git commit -m"Created Pages controller. Added Explore, home, index and profile pages. Changed root URL to index page."  
git push origin master  
***
gem 'bootstrap-sass', '~> 3.3.5'  
bundle  
修改application.css 为 .scss  
添加 bootstrap 内容 到 application.js  
创建 app/views/layouts/_nav.html.erb  并  <%= render '/layouts/nav' %>   到 app/views/layouts/application.html.erb
***
gst  
git add -A  
git commit -m"Added Twitter Bootstrap via SASS gem. Also implemented global navigation bar!"  
git push
***
在 app/views/layouts/application.html.erb 中 把 <%= yield %> 添加进 <div class="container"> 中  
利用 Bootstrap 制作  app/views/pages/home.html.erb  和 profile.html.erb  
完善 app/views/layouts/_nav.html.erb 中的 /home 和 /profile 链接
***
gst  
git add -A  
git commit -m"Added grid system, created container for holding grid. Organized home and profile pages."  
git push
***
gem 'devise'  
bundle  
rails g devise:install  
在其他文件中添加 devise 的相关 代码  
rails g devise:views  
rails g devise User  
rake db:migrate
rails s  
进入 localhost:3000/users/sign_in
rails c  
@u = User.find_by_id(1)  
***
设置 guest 和 user 显示的不同首页  
设置 guest 和 user 显示的不同 下拉菜单页面
***
gst  
git add -A  
git commit -m"Modified navigation bar. Navigation bar split into to erb partials, one for users, one for guests."  
git push
***
rails c  
@testUser = User.find_by_id(1)  
exit  
rails g migration AddUsernameToUsers   
编写 AddUsernameToUser 中 的 内容
rake db:migrate  
完善 app/controllers/pages_controller.rb 中   def profile  
修改 layouts/_nav_user.html.erb 中 <%= current_user.username %>  
修改 views/pages/profile.html.erb 中 <%= @username %>   
修改 routes 中 get '/user/:id' => 'pages#profile'  
***
gst  
git add -A  
git commit -m"Added username column, user profile pages, and username sign-up form."  
git push
***
rails g model Post content:text user:references  
在 db 文件中 def change ? end 中 编写 add_index :posts, [:user_id, :created_at]   
rake db:migrate  
***
在 app/models/post.rb  中 添加 validates :user_id 和 :content  和 default_scope  
在 app/models/user.rb  中 添加 has_many :posts
***
编写设计 views/pages/4个页面 
编写 components/_post_form.html.erb 页面  
rails g controller Posts  
编写
***
## 补充关系模型
rails generate model Relationship follower_id:integer followed_id:integer  
db/migrate/[timestamp]_create_relationships.rb 中 添加索引  
rake db:migrate  
***
app/models/user.rb 中 实现“主动关系”中的 has_many 关联  has_many :active_relationships
app/models/relationship.rb 中 在“关系”模型中添加 belongs_to 2 个 关联  
***
app/models/relationship.rb 在“关系”模型中添加验证 validates  
***
app/models/user.rb 在用户模型中添加 following 关联  has_many :following + 参数
app/models/user.rb  定义关注用户相关的几个辅助方法 GREEN
app/models/user.rb  使用“被动关系”实现 user.followers has_many :followers + 参数  
***
db/seeds.rb  在种子数据中添加“关系”相关的数据  
rake db:migrate:reset  
rake db:seed
***
config/routes.rb  在用户控制器中添加 following 和 followers 两个动作  
在首页显示数量统计  
scss  
config/routes.rb  添加“关系”资源的路由设置  
在用户资料页面加入关注表单和数量统计  
***
app/controllers/users_controller.rb  中 following 和 followers 动作 的  before_action  
views
***
rails generate controller Relationships  
relationships_controller.rb  的访问限制   before_action :logged_in_user  
RelationshipsController 的代码  def create  和  def destroy  
***
使用 Ajax 处理关注用户的表单   app/views/users/_follow.html.erb  
使用 Ajax 处理取消关注用户的表单  app/views/users/_unfollow.html.erb  
在 RelationshipsController 中响应 Ajax 请求  app/controllers/relationships_controller.rb  
***
初步实现的动态流 GREEN  app/models/user.rb  中   def feed  ??  end  
在获取动态流的 where 方法中使用键值对 GREEN   app/models/user.rb  
home 动作中分页显示的动态流








# 精缩版

rails new flutter   
rails g controller Pages index home profile explore  
gem 'bootstrap-sass', '~> 3.3.5'   
bundle 
***
gem 'devise'  
bundle  
rails g devise:install  
rails g devise:views   
rails g devise User
***
rails g migration AddUsernameToUsers   
rake db:migrate  
***
rails g model Post content:text user:references   
rake db:migrate  
rails g controller Posts   
***
rails generate model Relationship follower_id:integer followed_id:integer 
rake db:migrate    
***
rake db:migrate:reset
rake db:seed
***
rails generate controller Relationships









