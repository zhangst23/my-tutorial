rails new twitter-clone   
rails g controller Pages home explore about
gem 'bootstrap-sass'
gem 'simple_form'  
bundle 
***
gem 'devise'  
bundle  
rails g devise:install     
rails g devise User
rails g devise:views
*** 
rails g migration AddUsernameToUsers username:string
rake db:migrate  
***
rails g scaffold Post title:string content:text user:references   
rake db:migrate   
***
rails generate model Relationship follower_id:integer followed_id:integer 
add index * 3
rake db:migrate    
***