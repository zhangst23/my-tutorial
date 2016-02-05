Rails 常用命令.rb

# 创建新的rails项目

rails new <app_name>

# 创建模型(模型的名字是单数，对应的数据表名是复数)

rails g model User name:string age:integer

# 添加新字段

rails g migration add_email_to_users email:string

# 添加新字段经常会遇到的问题是如何把新字段添加到合适的位置，一般默认是添加在表的结尾，但是 
# 对于某些字段来说，我们希望添加到某一列之前或之后。我们可以添加一个参数 after 来指定 新列的位置。

add_column :users, :email, :string, after: :user_name   # 把 email 添加到 user_name之后

# 同时添加多个新字段

rails g migration add_email_to_users email:string new_column:string new_column:integer ...

# 创建controller

rails g controller Users


rake命令

rake db:create 			依照目前的 RAILS_ENV 環境建立資料庫
rake db:create:all 		建立所有環境的資料庫
rake db:drop 			依照目前的 RAILS_ENV 環境刪除資料庫
rake db:drop:all 		刪除所有環境的資料庫
rake db:migrate 		執行Migration動作
rake db:rollback STEP=n 					回復上N個 Migration 動作
rake db:migrate:up VERSION=20080906120000 	執行特定版本的Migration
rake db:migrate:down VERSION=20080906120000 回復特定版本的Migration
rake db:version 		目前資料庫的Migration版本
rake db:seed 執行 db/seeds.rb 				載入種子資料
rake db:setup does db:create, db:schema:load, db:seed
rake db:reset does db:drop, db:setup
rake db:schema:load 	根据schema.rb创建数据库表




























