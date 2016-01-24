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
编写   
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
***

