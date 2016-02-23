# Dribbble app in Rails
rails new muse-clone   
git init  
git s     
git add -A  
git commit -m"First commit"
***
rails s  
rails g model post title:string link:string description:text  
rake db:migrate  
***
rails g controller Posts  
在 routes.rb 中添加：resources 和 root  
在 PostsController.rb 中添加 def index  
***
git s     
git add -A  
git commit -m"Add Post model, controller, routes"
***
gem 'devise'  
gem 'simple_form'  
gem 'paperclip'  
views/ 填充内容 ，controllers/ 填充内容 ，并进行关联
***
rails g devise User  
rake db:migrate  
rails g migration add_user_id_to_post user_id:integer  
rake db:migrate  
Post 和 User 表的 关联：belongs_to , has_many  
PostsController 修改 Post.new 为 current_user.posts.build  
***
rails s  
rails c  
单元测试post 和 user  
***
git add .  
git commit -m"Add associations between post & user"
***
git add .  
git commit -m"Setup paperclip gem for image uploads"
***
rails g model comment content:text post:references user:references  
Comment 和 User 表的 关联：belongs_to , has\_many   
/routes.rb 添加 resources comments  
rails g controller comments  
CommentsController 中 创建 def create  
/views  内容填充
***
git add .  
git commit -m"Add comments to posts"
***
gem 'acts\_as\_votable'  
bundle  
rails g acts\_as\_votable:migration  
rake db:migrate  
***
添加内容 ：Votable Models ， Like/Dislike Yes/No Up/Down ，
***
git add .  
git commit -m"Add and setup voting"
***
用 haml 改写 erb 页面
***
git add .  
git commit -m"Convert application layout to haml and added header"
***
scss 来 设计 页面  
***
Remove turbolinks 从 gem 中
bundle  
views/posts/show  页面设计
***
git add .  
git commit -m"add random post to post show"  
git push
***














 
