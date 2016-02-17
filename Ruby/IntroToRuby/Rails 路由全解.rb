Rails路由.rb

1 Rails 路由的作用
# Rails 路由能识别 URL，将其分发给控制器的动作进行处理，还能生成路径和 URL，无需直接在视图中硬编码字符串。

1.1 把 URL 和代码连接起来

get '/patients/:id', to: 'patients#show'
# 那么这个请求就交给 patients 控制器的 show 动作处理，并把 { id: '17' } 传入 params。

1.2 生成路径和 URL
get '/patients/:id', to: 'patients#show', as: 'patient'

# 在控制器中有如下代码：
@patient = Patient.find(17)
# 在相应的视图中有如下代码：

# <%= link_to 'Patient Record', patient_path(@patient) %>

# 那么路由就会生成路径 /patients/17。这么做代码易于维护、理解。注意，在路由帮助方法中无需指定 ID。



2 资源路径：Rails 的默认值
# 使用资源路径可以快速声明资源式控制器所有的常规路由，无需分别为 index、show、new、edit、create、update 和 destroy 动作分别声明路由，只需一行代码就能搞定。
2.1 网络中的资源

# 如果 Rails 程序收到如下请求：

DELETE /photos/17
# 会查询路由将其映射到一个控制器的路由上。如果首个匹配的路由是：

resources :photos
# 那么这个请求就交给 photos 控制器的 destroy 方法处理，并把 { id: '17' } 传入 params。

2.2 CRUD，HTTP 方法和动作

# 在 Rails 中，资源式路由把 HTTP 方法和 URL 映射到控制器的动作上。而且根据约定，还映射到数据库的 CRUD 操作上。路由文件中如下的单行声明：

resources :photos
# 会创建七个不同的路由，全部映射到 Photos 控制器上：

HTTP方法	路径					控制器#动作		作用
GET		/photos				photos#index	显示所有图片
GET		/photos/new			photos#new		显示新建图片的表单
POST	/photos				photos#create	新建图片
GET		/photos/:id			photos#show		显示指定的图片
GET		/photos/:id/edit	photos#edit		显示编辑图片的表单
PATCH	/PUT	/photos/:id	photos#update	更新指定的图片
DELETE	/photos/:id			photos#destroy	删除指定的图片


2.3 路径和 URL 帮助方法

# 声明资源式路由后，会自动创建一些帮助方法。以 resources :photos 为例：

photos_path 			返回 /photos
new_photo_path 			返回 /photos/new
edit_photo_path(:id) 	返回 /photos/:id/edit，例如 edit_photo_path(10) 返回 /photos/10/edit
photo_path(:id) 		返回 /photos/:id，例如 photo_path(10) 返回 /photos/10


2.4 一次声明多个资源路由

resources :photos, :books, :videos

# 这种方式等价于：

resources :photos
resources :books
resources :videos


2.5 单数资源


2.6 控制器命名空间和路由

# 你可能想把一系列控制器放在一个命名空间内，最常见的是把管理相关的控制器放在 Admin:: 命名空间内。你需要把这些控制器存在 app/controllers/admin 文件夹中，然后在路由中做如下声明：

namespace :admin do
  resources :articles, :comments
end

HTTP 方法	路径	控制器#动作	具名帮助方法
GET	/admin/articles	admin/articles#index	admin_articles_path
GET	/admin/articles/new	admin/articles#new	new_admin_article_path
POST	/admin/articles	admin/articles#create	admin_articles_path
GET	/admin/articles/:id	admin/articles#show	admin_article_path(:id)
GET	/admin/articles/:id/edit	admin/articles#edit	edit_admin_article_path(:id)
PATCH/PUT	/admin/articles/:id	admin/articles#update	admin_article_path(:id)
DELETE	/admin/articles/:id	admin/articles#destroy	admin_article_path(:id)



# 如果想把 /articles（前面没有 /admin）映射到 Admin::ArticlesController 控制器上，可以这么声明：
scope module: 'admin' do
  resources :articles, :comments
end

# 如果只有一个资源，还可以这么声明：
resources :articles, module: 'admin'

# 如果想把 /admin/articles 映射到 ArticlesController 控制器（不在 Admin:: 命名空间内），可以这么声明：
scope '/admin' do
  resources :articles, :comments
end

# 如果只有一个资源，还可以这么声明：
resources :articles, path: '/admin/articles'

# 在上述两种用法中，具名路由没有变化，跟不用 scope 时一样。在后一种用法中，映射到 ArticlesController 控制器上的路径如下：




2.7 嵌套资源

# 开发程序时经常会遇到一个资源是其他资源的子资源这种情况。假设程序中有如下的模型：
class Magazine < ActiveRecord::Base
  has_many :ads
end
 
class Ad < ActiveRecord::Base
  belongs_to :magazine
end

# 在路由中可以使用“嵌套路由”反应这种关系。针对这个例子，可以声明如下路由：
resources :magazines do
	resources :ads
end


# 除了创建 MagazinesController 的路由之外，上述声明还会创建 AdsController 的路由。广告的 URL 要用到杂志资源：

# 上述路由还会生成 magazine_ads_url 和 edit_magazine_ad_path 等路由帮助方法。这些帮助方法的第一个参数是 Magazine 实例，例如 magazine_ads_url(@magazine)。

2.7.1 嵌套限制

# 嵌套路由可以放在其他嵌套路由中，例如：
resources :publishers do
  resources :magazines do
    resources :photos
  end
end


# 嵌套资源不可超过一层。

2.7.2 浅层嵌套

# 避免深层嵌套的方法之一，是把控制器集合动作放在父级资源中，表明层级关系，但不嵌套成员动作。也就是说，用最少的信息表明资源的路由关系，如下所示：
resources :articles do
	resources :comments, only: [:index, :new, :create]
end
resources :comments, only: [:show, :edit, :update, :destroy]

# 这种做法在描述路由和深层嵌套之间做了适当的平衡。上述代码还有简写形式，即使用 :shallow 选项：
resources :articles do
  resources :comments, shallow: true
end

# 这种形式生成的路由和前面一样。:shallow 选项还可以在父级资源中使用，此时所有嵌套其中的资源都是浅层嵌套：
resources :articles, shallow: true do
  resources :comments
  resources :quotes
  resources :drafts
end

# shallow 方法可以创建一个作用域，其中所有嵌套都是浅层嵌套。如下代码生成的路由和前面一样：
shallow do
  resources :articles do
    resources :comments
    resources :quotes
    resources :drafts
  end
end

# scope 方法有两个选项可以定制浅层嵌套路由。:shallow_path 选项在成员路径前加上指定的前缀：
scope shallow_path: "sekret" do
  resources :articles do
    resources :comments, shallow: true
  end
end


HTTP 方法	路径	控制器#动作	具名帮助方法
GET	/articles/:article_id/comments(.:format)	comments#index	article_comments_path
POST	/articles/:article_id/comments(.:format)	comments#create	article_comments_path
GET	/articles/:article_id/comments/new(.:format)	comments#new	new_article_comment_path
GET	/sekret/comments/:id/edit(.:format)	comments#edit	edit_comment_path
GET	/sekret/comments/:id(.:format)	comments#show	comment_path
PATCH/PUT	/sekret/comments/:id(.:format)	comments#update	comment_path
DELETE	/sekret/comments/:id(.:format)	comments#destroy	comment_path


:shallow_prefix 选项在具名帮助方法前加上指定的前缀：

scope shallow_prefix: "sekret" do
  resources :articles do
    resources :comments, shallow: true
  end
end


GET	/articles/:article_id/comments(.:format)	comments#index	article_comments_path
POST	/articles/:article_id/comments(.:format)	comments#create	article_comments_path
GET	/articles/:article_id/comments/new(.:format)	comments#new	new_article_comment_path
GET	/comments/:id/edit(.:format)	comments#edit	edit_sekret_comment_path
GET	/comments/:id(.:format)	comments#show	sekret_comment_path
PATCH/PUT	/comments/:id(.:format)	comments#update	sekret_comment_path
DELETE	/comments/:id(.:format)	comments#destroy	sekret_comment_path



2.8 Routing Concerns
Routing Concerns 用来声明通用路由，可在其他资源和路由中重复使用。

concerns :commentable do
	resources :comments
end

concern :image_attachable do
	resources :image, only: :index
end

# Concerns 可在资源中重复使用，避免代码重复：

resources :messages, concerns: :commentable
 
resources :articles, concerns: [:commentable, :image_attachable]

# Concerns 在路由的任何地方都能使用，例如，在作用域或命名空间中：

namespace :articles do
  concerns :commentable
end



2.9 由对象创建路径和 URL


除了使用路由帮助方法之外，Rails 还能从参数数组中创建路径和 URL。例如，假设有如下路由：

resources :magazines do
  resources :ads
end
使用 magazine_ad_path 时，可以不传入数字 ID，传入 Magazine 和 Ad 实例即可：

# <%= link_to 'Ad details', magazine_ad_path(@magazine, @ad) %>
而且还可使用 url_for 方法，指定一组对象，Rails 会自动决定使用哪个路由：

# <%= link_to 'Ad details', url_for([@magazine, @ad]) %>
此时，Rails 知道 @magazine 是 Magazine 的实例，@ad 是 Ad 的实例，所以会调用 magazine_ad_path 帮助方法。使用 link_to 等方法时，无需使用完整的 url_for 方法，直接指定对象即可：

# <%= link_to 'Ad details', [@magazine, @ad] %>
如果想链接到一本杂志，可以这么做：

# <%= link_to 'Magazine details', @magazine %>
要想链接到其他动作，把数组的第一个元素设为所需动作名即可：

# <%= link_to 'Edit Ad', [:edit, @magazine, @ad] %>
在这种用法中，会把模型实例转换成对应的 URL，这是资源式路由带来的主要好处之一。





2.10 添加更多的 REST 架构动作
# 可用的路由并不局限于 REST 路由默认创建的那七个，还可以添加额外的集合路由或成员路由。

2.10.1 添加成员路由

# 要添加成员路由，在 resource 代码块中使用 member 块即可

resources :photos do
	member do
		get 'preview'
	end
end

# 这段路由能识别 /photos/1/preview 是个 GET 请求，映射到 PhotosController 的 preview 动作上，资源的 ID 传入 params[:id]。同时还生成了 preview_photo_url 和 preview_photo_path 两个帮助方法。

# 在 member 代码块中，每个路由都要指定使用的 HTTP 方法。可以使用 get，patch，put，post 或 delete。如果成员路由不多，可以不使用代码块形式，直接在路由上使用 :on 选项：
resources :photos do
	get 'preview', on: :member
end

2.10.2 添加集合路由

# 添加集合路由的方式如下
resources :photos do
	collection do
		get 'search'
	end
end


2.10.3 添加额外新建动作的路由

要添加额外的新建动作，可以使用 :on 选项：

resources :comments do
  get 'preview', on: :new
end



3 非资源式路由
# 除了资源路由之外，Rails 还提供了强大功能，把任意 URL 映射到动作上。此时，不会得到资源式路由自动生成的一系列路由，而是分别声明各个路由

# 简单的路由特别适合把传统的 URL 映射到 Rails 动作上。

3.1 绑定参数
# 声明常规路由时，可以提供一系列 Symbol，做为 HTTP 请求的一部分，传入 Rails 程序。其中两个 Symbol 有特殊作用：:controller 映射程序的控制器名，:action 映射控制器中的动作名。例如，有下面的路由：
get ':controller(/:action(/:id))'





3.6 命名路由
使用 :as 选项可以为路由起个名字：

get 'exit', to: 'sessions#destroy', as: :logout

这段路由会生成 logout_path 和 logout_url 这两个具名路由帮助方法。调用 logout_path 方法会返回 /exit。

使用 :as 选项还能重设资源的路径方法，例如：

get ':username', to: 'users#show', as: :user








3.12 重定向
在路由中可以使用 redirect 帮助方法把一个路径重定向到另一个路径：

get '/stories', to: redirect('/articles')
重定向时还可使用匹配的动态路径片段：

get '/stories/:name', to: redirect('/articles/%{name}')
redirect 还可使用代码块形式，传入路径参数和 request 对象作为参数：

get '/stories/:name', to: redirect {|path_params, req| "/articles/#{path_params[:name].pluralize}" }
get '/stories', to: redirect {|path_params, req| "/articles/#{req.subdomain}" }













4 定制资源式路由
虽然 resources :articles 默认生成的路由和帮助方法都满足大多数需求，但有时还是想做些定制。Rails 允许对资源式帮助方法做几乎任何形式的定制。

4.1 指定使用的控制器
:controller 选项用来指定资源使用的控制器。例如：

resources :photos, controller: 'images'

















5 路由审查和测试
Rails 提供有路由审查和测试功能。

5.1 列出现有路由
要想查看程序完整的路由列表，可以在开发环境中使用浏览器打开 http://localhost:3000/rails/info/routes。也可以在终端执行 rake routes 任务查看，结果是一样的。

这两种方法都能列出所有路由，和在 routes.rb 中的定义顺序一致。你会看到每个路由的以下信息：

路由名（如果有的话）
使用的 HTTP 方法（如果不响应所有方法）
匹配的 URL 模式
路由的参数
例如，下面是执行 rake routes 命令后看到的一个 REST 路由片段：




























































































































































































































































