1.0  安装配置

首先确保安装：

## Platform
gem 'rails', '4.2.0'

## RESTful API Engine
gem 'grape'
gem 'grape-entity'

gem 'grape-swagger'
gem 'grape-swagger-rails'


2.0  组织架构

目录结构

api
├── api.rb
└── v1
    ├── base.rb
    ├── entities
    │   ├── base.rb
    │   └── user_basic.rb
    ├── helpers
    │   ├── page_helper.rb
    │   └── user_helper.rb
    ├── base_api.rb
    └── users_api.rb

base.rb 中定义着API的版本、输出格式，及挂载更多API。
users_api.rb 就像controller，对每个resources都进行分开写，然后在base.rb中进行mount
entities 使用grape-entity，控制输出中的对象及格式。
helper 放置常用的helper，像分页，用户验证。



module V1
  module Entities
    class UserBasic < Entities::Base
      format_with(:iso8601) { |dt| dt.iso8601 }

      expose :id
      expose :name
      # 如果需要输出层级对象，可以按这种方式
      # expose :company, using: Entities::Company

      # 日期、时间一律使用ISO 8601
      expose :created_at, format_with: :iso8601

      # with_options(format_with: :iso8601) do
      #   expose :created_at
      # end
    end
  end
end

module V1
  class Base < Grape::API
    version      'v1'
    format       :json

    # Mount the APIs
    mount UsersApi
  end
end

2.2 挂载 /routes.rb

mount V1::API => '/'

2.3 测试
http://localhost:3000/v1/users


3.0  Best Practices

↑↑↑ Best Practices for Designing a Pragmatic RESTful API | Vinay Sahni
A RESTful Tutorial
非常推荐 Vinay Sahni的实践，说明的非常清晰，而 RESTful Tutorial 也是推荐，但Wrapper一节不作推荐。

4.1 Doc with Swagger UI

4.1.1 grape-swagger

gem 'grape-swagger'

add_swagger_documentation

GrapeSwaggerRails.options.url      = '/swagger_doc.json'
GrapeSwaggerRails.options.app_url  = 'http://swagger.wordnik.com'

# http://localhost:3000/swagger_doc.json

4.1.2 GrapeSwaggerRails

gem 'grape-swagger-rails'
mount GrapeSwaggerRails::Engine +> '/docs'




4.2  JSend
http://labs.omniti.com/labs/jsend
RESTful Tutorial 中推荐过JSend，而之前项目中也使用了类似的格式，就是在数据源外包一层，并加上其它的一些信息，像code, status, message。

这些信息主要是应用于JSONP。建议用该方式：，或者是一些无法获取或处理HTTP Header的JS类库。

4.3 Partial Response
Grape中实现参见该文：Crafting Ruby Grape APIs: Partial Response

4.4 Error 处理
REF::
HTTP 接口设计指北


4.5 分页

# 类库有will_paginate和 Kaminari，示例中选后者。
# 和Grape结合部分，使用 api-pagination。

# With Grape, paginate is used to declare that your endpoint takes a :page and :per_page param. You can also directly specify a :max_per_page that users aren't allowed to go over. Then, inside your API endpoint, it simply takes your collection:

class MoviesAPI < Grape::API
  format :json

  desc 'Return a paginated set of movies'
  paginate
  get do
    # This method must take an ActiveRecord::Relation
    # or some equivalent pageable set.
    paginate Movie.all
  end

  route_param :id do
    desc "Return one movie's cast, paginated"
    # Override how many Actors get returned. If unspecified,
    # params[:per_page] (which defaults to 25) will be used.
    # There is no default for `max_per_page`.
    paginate per_page: 10, max_per_page: 200
    get :cast do
      paginate Movie.find(params[:id]).actors
    end
  end
end



5.0  用 Grape 和 Doorkeeper 构建 RESTful API
http://blog.lanvige.com/2014/12/08/build-rest-api-with-grape-and-doorkeeper/

5.1 如何构建一套适合Mobile应用的API。

# Grape是一个基于Rack的非常轻量级的框架，用于快速的开发API。一般来说，Rails对于单独的API来说，太过于重量级；
# 而Sinatra虽然足够小巧，但是又没有为开发API提供足够的默认支持。
# Doorkeeper 作为 OAuth Provider，为OAuth 认证提供很方便的Rails集成。在系统中对用户的管理，
# 依然使用Devise，Doorkeeper也很方便和Devise进行集成。
# Doorkeeper本身为Rails提供认证服务，对Grape不是原生支持，需要WineBouncer来帮忙。
# Swagger都不陌生，其新版也支持了OAuth。可以很方便查看和测试API。

5.2 Init in Rails

# 在Rails项目的Gemfile中添加如下，然后运行bundle即完成配置。
gem 'grape'
gem 'doorkeeper'
gem 'devise'
gem 'wine_bouncer'
# 在Controller下建新的api目录，然后新建api.rb文件，先预填如下内容，具体详解：
module Twitter
  class API < Grape::API
    version "v1", :using => :path
    format :json

    desc "Test api."
    get "hello" do
      { hello: "worldsssss" }
    end
  end
end

5.3 Mount
# 将Grape挂载到根下：
mount Twitter::API => '/'
# 这样就可以在浏览器中进行测试了：http://localhost:3000/v1/hello


6.0  对API进行测试
通过Web测试API有非常多的方式，比如通过浏览器的插件(POSTMan)，RSpec，但是我最喜欢，也是最轻便的方式是通过命令行工具curl：

curl http://localhost:9292/visitors/8a9d82b13b9786e1013b978766150001
或者：
curl -H "Content-Type: application/json" -X POST -d "{"email":"jtqiu@tw.com", "site":"mysys"}" http://localhost:9292/visitors/
命令行的程序curl是一个非常灵活，强大的工具，可以定制HTTP头信息，User Agent，支持所有的HTTP动词，最重要的是，在命令行很容易将工具们组合在一起，并完成自动化。



7.0  助手函数(Helper)
# Grape允许开发者将编解码，权限校验等等的通用的操作分离出来，放入助手函数，这些Helper可以被所有的API使用:
helpers do
    def generate_default_visitor(email, site) 
        {
            :visitor_uid => SecureRandom.hex,
            :password_expiration => (Time.now + 60 * 60 * 24),
            :last_used_timestamp => (Time.now - 60 * 60 * 24),
            :visitor_login_id => email,
            :site_name => site
        }
    end
end

# 使用上边定义的助手函数generate_default_visitor：

desc "create a visitor"
params do
    requires :email, :type => String, :desc => "Email address"
    requires :site, :type => String, :desc => "Site"
end
post do
    attr = generate_default_visitor(params[:email], params[:site])
    visitor = Visitor.new attr
    visitor.visitor_uid = attr[:visitor_uid]
    visitor.save
end





8.0 
class API < Grape::API
  format :json

  desc "text api"
  get "hello" do
    { hello: world }
  end 
end

9.0  HTTP 动词

GET 用来获取资源
POST 用来新建资源
PUT 用来更新资源
DELETE 用来删除资源



10.0  Basic Usage

module Twitter
  class API < Grape::API
    version 'v1', using: :header, vendor: 'twitter'
    format :json
    prefix :api

    helpers do
      def current_user
        @current_user ||= User.authorize!(env)
      end

      def authenticate!
        error!('401 Unauthorized', 401) unless current_user
      end
    end

    resource :statuses do
      desc 'Return a public timeline'
      get :public_timeline do
        Status.limit(20)
      end

      desc 'Return a personal timeline'
      get :home_timeline do
        authenticate!
        current_user.statues.limit(20)
      end

      desc 'Return a status.'
      params do
        require :id, type: Integer, desc: 'Status id'
      end
      route_param :id do
        get do
          Status.find(params[:id])
        end
      end

      desc 'Create a status.'
      params do
        requires :status, type: String, desc: 'Your status.'
      end
      post do
        authenticate!
        Status.create!({
          user: current_user,
          text: params[:status]
        })
      end

      desc 'Update a status.'
      params do
        requires :id, type: String, desc: 'Status ID.'
        requires :status, type: String, desc: 'Your status.'
      end
      put ':id' do
        authenticate!
        current_user.status.find(params[:id]).update({
          user: current_user,
          text: params[:status]
        })
      end

      desc 'Delete a status.'
      params do
        requires :id, type: String, desc: 'Status ID.'
      end
      delete ':id' do
        authenticate!
        current_user.statues.find(params[:id]).destroy
      end
    end
  end
end





11.0   Alongside Sinatra (or other frameworks)
# If you wish to mount Grape alongside another Rack framework such as Sinatra, you can do so easily using Rack::Cascade:

# Example config.ru
require 'sinatra'
require 'grape'

class API < Grape::API
  get :hello do
    { hello: 'world' }
  end
end

class Web < Sinatra::Base
  get '/' do
    'Hello world'
  end
end

use Rack::Session::Cookie
run Rack::Cascade.new [API, Web]



12.  API-grape-sample-blog.rb



require 'grape'

module Blog

  class API < Grape: :API

    resource :weblogs do
      get do
        Weblog.all
      end

      get ':id' do
        Weblog.find(params[:id])
      end

      get ':id/posts' do
        weblog = Weblog.find(params[:id])
        weblog.posts
      end

      post ':id/posts' do
        @weblog = Weblog.find(params[:id])
        @post = Post.new
        @post.title = params[:title] if params[:title]
        @post.body = params[:body] if params[:body]
        @weblog.posts << @post

        status 201
        @post
      end

      delete ':id/posts' do
        @weblog = Weblog.find(params[:id])
        @weblog.posts.clear
      end

      post do
        @weblog = Weblog.new
        @weblog.title = params[:title] if params[:title]
        @weblog.description = params[:description] if params[:description]
        @weblog.save

        status 201
        @weblog
      end

      put ':id' do
        @weblog = Weblog.find(params[:id])
        @weblog.title = params[:title] if params[:title]
        @weblog.description = params[:description] if params[:description]
        @weblog.save

        @weblog
      end

      delete do
        Weblog.destroy_all()
      end

      delete ':id' do
        Weblog.destroy(params[:id])
      end

      resource :posts do
        get do
          Post.all
        end

        get ':id' do
          Post.find(params[:id])
        end

        get ':id/comments' do
          @post = Post.find(params[:id])
          @post.comments
        end

        delete ':id/comments' do
          @post = Post.find(params[:id])
          @post.comments.clear
        end

        post ':id/comments' do
          @post = Post.find(params[:id])
          @comment = Comment.new
          @comment.name = params[:name] if params[:name]
          @comment.name = params[:body] if params[:body]
          @post.comments << @comment

          status 201
          @comment
        end

        delete ':id' do
          Post.destroy(params[:id])
        end

        put ':id' do
          @post = Post.find(params[:id])
          @post.title = params[:title] if params[:title]
          @post.body = params[:body] if params[:body]
          @post.save

          @post
        end

        delete do
          Post.destroy_all()
        end
      end

      resource :comments do
        get do
          Comment.all
        end

        get ':id' do
          Comment.find(params[:id])
        end

        put ':id' do
          @comment = Comment.find(params[:id])
          @comment.name = params[:name] if params[:name]
          @comment.body = params[:body] if params[:body]
          @comment
        end

        delete ':id' do
          Comment.destroy(params[:id])
        end

        delete do
          Comment.destroy_all()
        end
      end

    end

  end
end































































