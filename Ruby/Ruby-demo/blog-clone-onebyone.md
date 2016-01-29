# blog-clone-onebyone.md 


rails new blog-clone3  
rails s  
rails generate controller welcome index  
***
rails g controller articles  
控制器中 def create  ?  end
rails generate model Article title:string text:text  
rake db:migrate  
***
设计 views   
***
/models/article.rb  添加 validates  
/controllers  添加 edit show index destroy update  
完善 相关 views
***
rails generate model Comment commenter:string body:text
CreateComments  中添加 t.references :article, index: true
rake db:migrate  
***
article.rb 中 has_mang :comments  
routes.rb  中 resources :comments
***
rails generate controller Comments   




























