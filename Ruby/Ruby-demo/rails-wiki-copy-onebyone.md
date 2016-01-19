rails new wiki  
// add some gems  
bundle install  

***
git init   
git status  
git add -A  
git commit -m"Initialize repository"  
git mv README.rdoc README.md  
git commit -am "Improve the README"  
***
rails g model Article title:string content:text  
rails g controller Articles  
// 往articles_controller.rb添加index页面  
// 往route.rb里添加resources :articles 和 root 'articles#index'   
 rake db:migrate  
***  
// 创建index.html.haml文件  
// 往articles_controller.rb添加new create private(article_params)页面  
// 创建 _form.html.haml new.html.haml create.html.haml 等views文件  
***
git status  
git add .  
git commit -am"Add articles model, controller, views"  
***
rails g simple_form:install --bootstrap  
rails s  
// 向articles_controller.rb添加private(find_article) 和 def(show) 和 before_action :find_article, only: [:show]  
// 填充 show.html.haml 内容，添加路由链接：= link_to "Back", root_path  
// 向 index.html.haml添加路由链接：= link_to "New Article", new_article_path 
***
rake routes  
***
git status  
git add .  
git commit -am"Installed simple_form and created article show pages"  
***
// 给index.html.haml添加文章日期  
// 给articles_controller.rb添加def(index)内容：@articles = Article.all.order("created_at DESC")  
// 给index.html.haml添加@articles.each do |article|并且truncate及它的参数
***
git status  
git add .  
git commit -am"Loop articles on index"  
***
rails g devise:install  
// config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }  
// root to: "home#index"  
<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>  
// config.assets.initialize_on_precompile = false  
***
rails g devise User  
rake db:migrate
***
rails c  
User.connection  
User.count  
User.first  
***
git status  
git add .  
git commit -am"Add Devise and Generate User Model"  
***
// 向modles/article.rb添加 belongs_to :user   
// 向modles/user.rb添加 has_many :articles  
rails g migration add_user_id_to_articles user_id:integer:index  
rake db:migrate  
// 更改 articles_controller.rb 中def new 和 def create 中的 Article.new 为 current_user.articles.build  
rails c  
@article = Article.last  
// 在new.html 创建wiki数据  
@article = Article.last  
 @article = Article.first  
 @article.user_id = 1  
 @article.save  
  @article = Article.find(2)  
 @article.save  
***
git status  
git add .  
git commit -am"Add association between user and article"  
***
// 向articles_controller.rb添加 	before_action :authenticate_user!, except: [:index, :show]  
// 向 index.html.haml 中 路由链接 添加 if 语句的条件判断：是否登录。
***
git status  
git add .  
git commit -am"Add user authentication"  
***
rails g model Category name:string  
rake db:migrate  
rails g migration add_category_id_to_articles category_id:integer  
rake db:migrate   
***
// 向 models/article.rb 添加 ：belongs_to :category  
// 向 models/category.rb 添加 ：has_many :articles
***
rails c  
Category  
Category.connection  
Category   
Category.create(name:"Art")  
Category.create(name:"Technology")   
Category.create(name:"Politics")  
Category.count  
@article = Article.last  
// 向 _form.html.haml 添加 = f.collection_select :category_id, Category.all, :id, :name, { promt: "Choose a Category" }  
// 向 articles_controller.rb 添加 def（article_params）参数 :category_id  
// 在 new.html.haml 网页中 创建 数据  并 在 rails c 中 验证：@article = Article.last    
控制器中  Article.all  
Article.count  
@article = Article.first  
@article.category_id = 1  
@article  
@article = Article.find(2)  
@article.category_id = 3  
@article = Article.find(3)  
@article.category_id = 1  
@article  
***
// 向 articles_controller.rb 中 def index  添加 if params[:category].blank?  判断
  
  ***
git status  
git add .  
git commit -am"Add Categories to Articles"  
***
// 向 articles_controller.rb 中 before_action :find_article, only 添加： :edit, :update, :destroy  
// 向 articles_controller.rb 添加 def edit， def update， def destroy  
// 向 def update  添加 判断：if @article.update(article_params)  
// 撰写 app/views/articles/edit.html.haml 和 show.html.haml



  ***
git status  
git add .  
git commit -am"Edit & Destroy Articles"  
***

// 向 app/assets/javascripts/application.js 添加 //= require bootstrap-sprockets  
// 向 app/assets/stylesheets/application.css.scss 添加 @import "bootstrap-sprockets";
@import "bootstrap";  
// 对 views 进行 bootstrap 标签化  




  ***
git status  
git add .  
git commit -am"Add basic styles"  
***



// 修改 README ,上传




  ***
git status  
git add .  
git commit -am"Update README"  
***
  
  
