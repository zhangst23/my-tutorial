rails new movie_review
***
git init  
git add .  
git commit -am"Initial Commit"  
***  
rails g scaffold Movie title:string description:text movie_length:string director:string rating:string  
// 向 movies/new 中 new.html.haml 创建数据  
***
// 向 Gemfile 中添加 gem 'devise'  
bundle install  
rails g devise:install     

// config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }  
// root to: "movie#index"  
<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>
// config.assets.initialize_on_precompile = false   
  
rails g devise:views  
rails g devise User  
rake db:migrate
***  
rails g migration add_user_id_to_movies user_id:integer  
rake db:migrate  
rails c  
@movie = Movie.first   
// 更改 movies_controller.rb 中 Movie.new 为 current_user.movies.build  
// 添加 movies_controller.rb 中 before_action :authenticate_user!, except: [:index, :show]
  
// 添加 models/movie.rb 中 belongs_to :user  
// 添加 models/user.rb 中 has_many :movies 
*** 
// 向 movies/new 中创建 数据  
rails c  
@movie = Movie.first  
@movie = Movie.last  
@movie.each do |movie|  
* movie.user_id = 1  
movie.save  
end  
@user = User.first  
@movie = Movie.find(1)  
@movie.user = @user  
@movie  
@movie.user_id = @user  
@movie  
@movie.user_id = 1  
@movie.save  
@movie  
@movie = Movie.first  
@movie.user_id = 1  
@movie.save  
@movie  
***
git status  
git add .  
git commit -am"Add movie scaffold and users"
***
// 向 Gemfile 中添加 gem 'paperclip'  
bundle install  
// 向 movie.rb 中 添加 has_attached_file :image, styles: { medium: "400x600#" }  
validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/  
***
rails g paperclip movie image  
rake db:migrate  
***
// 更改 _form.html.haml 内容： @movie, html: { multipart: true } + 图片上传field  
// 更改 show.html.haml 内容：头部添加 image_tag  
// 向 movies_controller.rb 中 def movie_params 中 params.require(:movie).permit 添加 :image  
// 向 app/views/movies/index.html.erb 中添加 image_tag
***
git s  
git add .  
git commit -m"Add paperclip for image upload"  
git s 
***
命令行输入 sublime .gitignore  ，然后.gitignore中添加 /public/systems/movies/images  
***
// 向 Gemfile 中添加 gem 'bootstrap.sass'  
bundle install  
// 向 app/assets/stylesheets/application.css.scss 添加 @import "bootstrap-sprockets";
@import "bootstrap";  以及写些CSS代码
// 向 app/assets/javascripts/application.js 中添加 //= require bootstrap-sprockets  
// 创建 _head.html.haml show.html.haml  
// 更改 app/views/movies/index.html.erb , 添加 <% if !user_signed_in? %>横幅大页面 和 <% @movies.each do |movie| %>循环

***
git s  
git add .  
git commit -m"Added bootstrap and styled"  
git s 
***
rails g scaffold Review rating:integer comment:text  
rake db:migrate    
// 给 reviews_controller.rb 中的  def create 添加 @review = Review.new(review_params) 和 if 判断  
rails g migration add_user_id_to_reviews user_id:integer  
rake db:migrate  
rails c  
@review = Review.first  
// 给 app/models/review.rb 添加 belongs_to :user  
// 给 app/models/user.rb 添加 has_many :movies
  has_many :reviews, dependent: :destroy  
// 给 reviews_controller.rb 中的  def create 添加 @review.user_id = current_user.id 
*** 
// 向 reviews/new  添加 数据  
rails c    
@review = Review.first  
@movie = Movie.last  
@movie    
// 向 show.html.haml 添加 页面模块  
// 完善 其他 views  

***
git s  
git add .  
git commit -m"Review scaffold"  
git s 
***
rails g migration add_movie_id_to_reviews movie_id:integer  
rails c  
@review = Review.last  
// 向 app/models/movie.rb 添加 has_many :reviews  
// 向 app/models/review.rb 添加 belongs_to :movie  
// 向 routes.rb 添加 resources :movies do  
rake routes  
***
// 给 reviews_controller.rb 添加 def set_movie , 修改 def create 中的if判断条件 并添加 @review.movie_id = @movie.id ， 头部添加 before_action :set_movie  
rails c  
@movie = Movie.find(2)  
@review = Review.last  
// 完善 show.html.haml 和 edit.html.haml 和 new.html.haml页面
// star-rating.js  应用 到 _form.html.haml  
// 完善 reviews_controller.rb 中的 def show
***
git s  
git add .  
git commit -m"Convert review ratings to stars"  
git s 
***


// 添加一个gem ，对 Gemfile ， movies_controller.rb ， movie.rb ， _header.html.erb ， search.html.erb ， routes.rb 做的修改



***
git s  
git add .  
git commit -m"Add searchkick gem and implement search functionality"  
git s 
***

// 修改 一下 README

***
git s  
git add .  
git commit -m"Update README"  
git s 
***




