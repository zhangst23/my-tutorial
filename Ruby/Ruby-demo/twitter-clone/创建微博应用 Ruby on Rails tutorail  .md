#创建微博应用 Ruby on Rails tutorail  
##第 3 章 基本静态的页面
rails _4.2.2_ new sample-app-copy-onebyone  
cd sample-app-copy-onebyone  
bundle install --without production  
bundle update  
***
git init  
git add -A  
git commit -m "Initialize repository"   
git mv README.rdoc README.md  
修改README文件  
git commit -am "Improve the README" 
***
在github上创建一个仓库，仓库名为：sample-app-copy-onebyone  
git remote add origin git@github.com:zhangst23/sample-app-copy-onebyone.git  
git push -u origin --all
***
git checkout master  
git checkout -b static-pages  
（第一个命令的作用是确保我们现在处于主分支中，这样才能基于 master 分支创建 static-pages 分支。如果你当前就在主分支中，可以不执行这个命令。）  

***
rails generate controller StaticPages home help    
$ git status  
$ git add -A  
$ git commit -m "Add a Static Pages controller"  
$ git push -u origin static-pages  
(以后再推送时，可以省略后面的参数，简写成： git push)
***
rails server  
修改“首页”的 HTML : app/views/static_pages/home.html.erb  
修改“帮助”页面的 HTML : app/views/static_pages/help.html.erb
***
bundle exec rake test  
添加测试 test "should get about" do  
rake test  
在路由文件中 routes.rb  添加 about 路由
在静态页面控制器中 static_pages_controller.rb 添加 about 动作  
rake test  
“关于”页面的内容  app/views/static_pages/about.html.erb   
rake test
***
添加测试title  ： assert_select "title", "Home | Ruby on Rails Tutorial Sample App"
修改布局文件的title：在 application.html.erb 中添加 %= yield(:title) %>，在home/help/about 页面 添加 <% provide(:title, "Help") %>
***
把根路由指向首页 root 'static_pages#home'  
$ git add -A  
$ git commit -m "Finish static pages"  
$ git checkout master  
$ git merge static-pages  
$ git push  
rake test
***
### 读完本章学到了什么
- 我们第三次介绍从零开始创建一个新 Rails 应用的完整过程，包括安装所需的 gem，把应用推送到远程仓库，以及部署到生产环境中；
- 执行 rails generate controller ControllerName <optional action names> 命令会生成一个新控制器；
- 在 config/routes.rb 文件中定义了新路由；
- Rails 的视图中可以包含静态 HTML 及嵌入式 Ruby 代码（ERb）；
- 测试组件能驱动我们开发新功能，给我们重构的自信，以及捕获回归；
- 测试驱动开发使用“遇红-变绿-重构”循环；
- Rails 的布局定义页面共用的结构，可以去除重复。

### 练习  
在单独的主题分支中做练习：  
$ git checkout static-pages  
$ git checkout -b static-pages-exercises
***
（为了继续后面的开发，最后一步只切换到主分支，但不合并，以免和正文产生冲突。）在后面的章节中，使用的分支和提交消息有所不同，但基本思想是一致的。

1. 你可能注意到了，静态页面控制的测试（代码清单 3.22）中有些重复，每个标题测试中都有“Ruby on Rails Tutorial Sample App”。我们要使用特殊的函数 setup 去除重复。这个函数在每个测试运行之前执行。请你确认代码清单 3.38 中的测试仍能通过。（代码清单 3.38 中使用了一个实例变量，2.2.2 节简单介绍过，4.4.5 节会进一步介绍。这段代码中还使用了字符串插值操作，4.2.2 节会做介绍。）

2. 为这个演示应用添加一个“联系”页面。[14]参照代码清单 3.13，先编写一个测试，检查页面的标题是否为 “Contact | Ruby on Rails Tutorial Sample App”，从而确定 /static_pages/contact 对应的页面是否存在。把代码清单 3.39 中的内容写入“联系”页面的视图，让测试通过。注意，这个练习是独立的，所以代码清单 3.39 中的代码不会影响代码清单 3.38 中的测试。
***
使用了通用标题的静态页面控制器测试 GREEN  def setup
    @base_title = "Ruby on Rails Tutorial Sample App"
  end  
  “联系”页面的内容
app/views/static_pages/contact.html.erb  
git checkout master  


### 高级测试技术
#### MiniTest 报告程序  
配置测试，显示红色和绿色. test/test_helper.rb 中添加 require "minitest/reporters"
Minitest::Reporters.use!
####  调用跟踪静默程序
添加调用跟踪静默程序，过滤 RVM 相关的内容
config/initializers/backtrace_silencers.rb 添加 Rails.backtrace_cleaner.add_silencer { |line| line =~ /rvm/ }  
添加静默程序后要重启本地服务器。
#### 使用 Guard 自动测试
bundle exec guard init  
修改 Guardfile 添加 guard :minitest, spring: true, all_on_start: false do  (会让 Guard 使用 Rails 提供的 Spring 服务器减少加载时间，而且启动时不运行整个测试组件。)  

$ guard
# 第 5 章 完善布局
> 本章我们要使用一个 CSS 框架，以及自己编写的样式，填充样式表。[1]我们还要完善布局，添加指向各个页面的链接（例如首页和“关于”页面，5.1 节）。在这个过程中，我们会学习局部视图、Rails 路由和 Asset Pipeline，还会介绍 Sass（5.2 节）。最后，我们还要向前迈出很重要的一步：允许用户在我们的网站中注册（5.4 节）。

> 本章大部改动是添加和修改应用的布局，这些操作一般不由测试驱动，或者完全不用测试。所以大部分时间都花在文本编辑器和浏览器中，只用 TDD 添加“联系”页面（5.3.1 节）。不过，我们要编写一种重要的测试，集成测试，检查最终完成的布局中有所需的链接（5.3.4 节）

$ git checkout master  
$ git checkout -b filling-in-layout  
***
添加一些结构后的网站布局文件 app/views/layouts/application.html.erb  
“首页”视图，包含一个到注册页面的链接
app/views/static_pages/home.html.erb  
***
gem 'bootstrap-sass',       '3.2.0.0'  
$ bundle install  
> rails generate 命令会自动为控制器生成一个单独的 CSS 文件，但很难使用正确的顺序引入这些样式，所以简单起见，本书会把所有 CSS 都放在一个文件夹中。为此，我们要先新建这个 CSS 文件  

$ touch app/assets/stylesheets/custom.css.scss   
添加全站使用的 CSS  custom.css.scss   
添加一些精美的文字排版样式  custom.css.scss  
添加网站 LOGO 的样式  custom.css.scss  
***
从 app/views/layouts/application.html.erb 中 抽离出 _shim.html.erb 和 _header.html.erb 页面,并用 <%= render 'layouts/shim' %> 和 <%= render 'layouts/header' %> 引入  
添加底部局部视图后的网站布局  _footer.html.erb  和 css
***
#### Asset Pipeline
使用嵌套和变量改写 SCSS 文件
### “联系”页面
“联系”页面的测试 RED  
更新路由，然后在静态页面控制器中添加一个 contact 动作，最后创建“联系”页面的视图  
***
> 本书遵守一个约定，只有重定向使用 _url 形式，其余都使用 _path 形式。（因为 HTTP 标准严格要求重定向的 URL 必须完整。不过在大多数浏览器中，两种形式都可以正常使用。）  

静态页面的路由更改为：root             'static_pages#home'  
get 'help'    => 'static_pages#help'  
使用具名路由 <%= link_to "About", about_path %>,更改 _header.html.erb 和 _footer.html.erb 中的 # 占位符

***
布局中链接的测试  
$ rails generate integration_test site_layout   
测试布局中的链接 GREEN
test/integration/site_layout_test.rb 填写内容 
$ bundle exec rake test:integration  
$ bundle exec rake test


## 用户注册：第一步
rails g controller User new  
添加  “注册”页面的路由  
添加  使用按钮链接到“注册”页面 app/views/static_pages/home.html.erb
***
$ bundle exec rake test  
$ git add -A  
$ git commit -m "Finish layout and routes"  
$ git checkout master  
$ git merge filling-in-layout  
$ git push
***
#### 读完本章学到了什么
- 使用 HTML5 可以定义一个包括 LOGO、头部、底部和主体内容的网站布局；
- 为了用起来方便，可以使用 Rails 局部视图把部分结构放到单独的文件中；
- 在 CSS 中可以使用类和 ID 编写样式；
- Bootstrap 框架能快速实现设计精美的网站；
- 使用 Sass 和 Asset Pipeline 能去除 CSS 中的重复，还能打包静态文件，提高在生产环境中的使用效率；
- 在 Rails 中可以自己定义路由规则，得到具名路由；
- 集成测试能高效模拟浏览器中的点击操作。  

***  
$ git checkout master   
$ git checkout -b modeling-users
***
$ rails generate model User name:string email:string（注意，控制器名是复数，模型名是单数：控制器是 Users，而模型是 User。）  
$ bundle exec rake db:migrate
***
## 用户数据验证
### 有效性测试
> TDD 并不适用所有情况，但是模型验证是使用 TDD 的绝佳时机。如果不先编写失败测试，再想办法让它通过，我们很难确定验证是否实现了我们希望实现的功能。

> 我们采用的方法是，先得到一个有效的模型对象，然后把属性改为无效值，以此确认这个对象是无效的。以防万一，我们先编写一个测试，确认模型对象一开始是有效的。这样，如果验证测试失败了，我们才知道的确事出有因（而不是因为一开始对象是无效的）。

测试用户对象一开始是有效的 GREEN test/models/user_test.rb  的编写  
$ bundle exec rake test:models
### 存在性验证
> 存在性验证算是最基本的验证了，只是检查指定的属性是否存在。本节我们会确保用户存入数据库之前，name 和 email 字段都有值。

> 我们要先在代码清单 6.5 的基础上再编写一个测试，检查 name 属性是否存在。如代码清单 6.7 所示，我们只需把 @user 的 name 属性设为空字符串（包含几个空格的字符串），然后使用 assert_not 方法确认得到的用户对象是无效的。

测试 name 属性的验证措施 RED
test/models/user_test.rb  
$ bundle exec rake test:models   
> 模型测试失败，因为name 属性的存在性验证使用 validates 方法，而且其参数为 presence: true，如代码清单 6.9 所示。presence: true 是只有一个元素的可选哈希参数，4.3.4 节说过，如果方法的最后一个参数是哈希，可以省略花括号。（5.1.1 节说过，Rails 经常使用哈希做参数。）

添加 name 属性存在性验证 GREEN
app/models/user.rb  
测试 email 属性的验证措施 RED
test/models/user_test.rb  
添加 email 属性存在性验证 GREEN
app/models/user.rb
### 长度验证
测试 name 属性的长度验证 RED
test/models/user_test.rb  

### 电子邮件地址的格式验证
测试有效的电子邮件地址格式 GREEN
test/models/user_test.rb  
测试电子邮件地址格式验证 RED
test/models/user_test.rb

### 确保电子邮件地址的唯一性验证
> 确保电子邮件地址的唯一性（这样才能作为用户名），要使用 validates 方法的 :unique 参数。提前说明，实现的过程中有一个很大的陷阱，所以不要轻易跳过本节，要认真阅读。

> 我们要先编写一些简短的测试。之前的模型测试，只是使用 User.new 在内存中创建一个 Ruby 对象，但是测试唯一性时要把数据存入数据库。[13]对重复电子邮件地址的测试如代码清单 6.23 所示。

拒绝重复电子邮件地址的测试 RED
test/models/user_test.rb  
电子邮件地址唯一性验证 GREEN
app/models/user.rb  
测试电子邮件地址的唯一性验证不区分大小写 RED
test/models/user_test.rb  
rake test  
***
$ rails generate migration add_index_to_users_email  
添加电子邮件唯一性约束的迁移
db/migrate/[timestamp]_add_index_to_users_email.rb  
$ bundle exec rake db:migrate  
删除 test/fixtures/users.yml  的内容  
把 email 属性的值转换为小写形式，确保电子邮件地址的唯一性 GREEN
app/models/user.rb
## 添加安全密码
> 每个用户都要设置一个密码（还要二次确认），数据库中则存储经过哈希加密后的密码。认证用户的方法是，获取用户提交的密码，哈希加密，再和数据库中存储的密码哈希值对比，如果二者一致，用户提交的就是正确的密码，用户的身份也就通过认证了。我们要对比的是密码哈希值，而不是原始密码，所以不用在数据库中存储用户的密码。因此，就算被脱库了，用户的密码仍然安全。

### 计算密码哈希值
在app/models/user.rb 中 添加 has_secure_password 安全密码机制  
$ rails generate migration add_password_digest_to_users password_digest:string  
$ bundle exec rake db:migrate
gem 'bcrypt'  
$ bundle install  
### 密码的最短长度
测试密码的最短长度 RED
test/models/user_test.rb  
实现安全密码的全部代码 GREEN
app/models/user.rb  
$ bundle exec rake test:models
### 创建并认证用户
$ rails console  
balabalabala
***
$ bundle exec rake test  
$ git add -A  
$ git commit -m "Make a basic User model (including secure passwords)"  
然后合并到主分支，再推送到远程仓库中：

$ git checkout master  
$ git merge modeling-users  
$ git push

###  读完本章学到了什么
- 使用迁移可以修改应用的数据模型；
- Active Record 提供了很多创建和处理数据模型的方法；
- 使用 Active Record 验证可以在模型的数据上添加约束条件；
- 常见的验证有存在性、长度和格式；
- 正则表达式晦涩难懂，但功能强大；
- 数据库索引可以提升查询效率，而且能在数据库层实现唯一性约束；
- 可以使用内置的 has_secure_password 方法在模型中添加一个安全的密码。


# 第 6 章 注册
$ git checkout master  
$ git checkout -b sign-up
### 调试信息和 Rails 环境
在网站布局中添加一些调试信息
app/views/layouts/application.html.erb <%= debug(params) if Rails.env.development? %>  
$ rails server --environment production  
$ bundle exec rake db:migrate RAILS_ENV=production
***  
添加美化调试信息的样式，使用了一个 Sass 混入
app/assets/stylesheets/custom.css.scss

###  用户资源
在路由文件中添加用户资源的规则
config/routes.rb  resources :users  
用户资料页面的临时视图
app/views/users/show.html.erb  
含有 show 动作的用户控制器
app/controllers/users_controller.rb

### 调试器
在用户控制器中使用调试器
app/controllers/users_controller.rb    
###Gravatar 头像和侧边栏
显示用户名字和 Gravatar 头像的用户资料页面视图
app/views/users/show.html.erb  
定义 gravatar_for 辅助方法
app/helpers/users_helper.rb

调用 update_attributes 方法（6.1.5 节）更新一下数据库中的用户记录，然后就可以显示用户真正的头像了：  
在 show 动作的视图中添加侧边栏
app/views/users/show.html.erb  
用户资料页面的样式，包括侧边栏的样式
app/assets/stylesheets/custom.css.scss

## 注册表单
$ bundle exec rake db:migrate:reset 
> 因为我们要实现通过网页创建用户的功能，那么就把 6.3.4 节在控制台中创建的用户删除吧。最简单的方法是使用 

db:migrate:reset 命令：
###使用 form_for
在 new 动作中添加 @user 变量
app/controllers/users_controller.rb  
用户注册表单
app/views/users/new.html.erb  
注册表单的样式
app/assets/stylesheets/custom.css.scss
## 注册失败
添加 能处理注册失败的 create 动作
app/controllers/users_controller.rb
### 健壮参数
在 create 动作中使用健壮参数
app/controller/users_controller.rb
###注册失败错误消息
在注册表单中显示错误消息
app/views/users/new.html.erb  
$ mkdir app/views/shared  
添加 显示表单错误消息的局部视图 app/views/shared/_error_messages.html.erb   
错误消息的样式
app/assets/stylesheets/custom.css.scss

### 注册失败的测试
$ rails generate integration_test users_signup
> 为用户注册功能生成一个集成测试文件，这个文件名为 users_signup（沿用使用复数命名资源名的约定）：

注册失败的测试 GREEN
test/integration/users_signup_test.rb
## 注册成功
create 动作的代码，处理保存和重定向操作
app/controllers/users_controller.rb
### 闪现消息
用户注册成功后显示一个闪现消息
app/controllers/users_controller.rb
在网站的布局中添加闪现消息
app/views/layouts/application.html.erb
###  首次注册
> 现在我们可以注册一个用户，看看到目前为止所实现的功能。用户的名字使用“Rails Tutorial”，电子邮件地址使用“example@railstutorial.org”，如图 7.21 所示。注册成功后，页面中显示了一个友好的欢迎消息，如图 7.22 所示。消息的样式是由 5.1.2 节集成的 Bootstrap 框架提供的 .success 类实现。（如果无法注册，提示电子邮件地址已经使用，确保按照 7.2 节的说明，执行了 db:migrate:reset Rake 任务，而且重启了开发服务器。）刷新用户资料页面后，闪现消息会消失，如图 7.23 所示

### 注册成功的测试
注册成功的测试 GREEN
test/integration/users_signup_test.rb

## 专业部署方案

$ git add -A  
$ git commit -m "Finish user signup"  
$ git checkout master  
$ git merge sign-up
### 在生产环境中使用 SSL
在生产环境的配置文件 production.rb 中去掉一行代码的注释即可 使用 SSL
config/environments/production.rb
### 生产环境中的 Web 服务器
gem 'puma',           '2.11.1'    
$ bundle install  
创建文件 config/puma.rb,复制好配置文件  
创建 Puma 需要的 Procfile 文件
./Procfile
***
$ bundle exec rake test  
$ git add -A  
$ git commit -m "Use SSL and the Puma webserver in production"  
$ git push  
$ git push heroku  
$ heroku run rake db:migrate
### 小结
实现注册功能对演示应用来说是个重要的里程碑。 虽然现在还没实现真正有用的功能，不过却为后续功能的开发奠定了坚实的基础。第 8 章会实现用户登录、退出功能，完成整个认证功能。第 9 章，我们会实现更新用户个人信息的功能，还会实现管理员删除用户的功能，这样才算完全实现了表 7.1 中列出的用户资源相关的 REST 动作。

### 读完本章学到了什么
- Rails 通过 debug 方法显示一些有用的调试信息；
- Sass 混入定义一组 CSS 规则，可以多次使用；
- Rails 默认提供了三个标准环境：development，test 和 production；
- 可以通过一组标准的 REST URL 和用户资源交互；
- Gravatar 提供了一种简便的方法显示代表用户的图片；
- form_for 辅助方法用于创建与 Active Record 对象交互的表单；
- 注册失败后显示注册页面，而且会显示由 Active Record 自动生成的错误消息；
- Rails 提供了 flash 作为显示临时消息的标准方式；
- 注册成功后会在数据库中创建一个用户记录，而且会重定向到用户资料页面，并显示一个欢迎消息；
- 我们可以使用集成测试检查表单提交的表现，并能捕获回归；
- 我们可以配置应用在生生产环境中使用 SSL 加密通信，还可以使用 Puma 提升性能。



# 第 8 章 登录和退出
> 我们要通过网络中三种常见的方式实现登录退出功能，分别为：浏览器关闭后“忘记”用户的登录状态（8.1 节和 8.2 节），自动记住用户的登录状态（8.4 节），勾选“记住我”选项时才记住用户的登录状态

## 会话
> HTTP 协议没有状态，每个请求都是独立的事务，无法使用之前请求中的信息。所以，在 HTTP 协议中无法在两个页面之间记住用户的身份。需要用户登录的应用都要使用“会话”（session）。会话是两台电脑之间的半永久性连接，例如运行 Web 浏览器的客户端电脑和运行 Rails 的服务器。

> 在 Rails 中实现会话最常见的方式是使用 cookie。cookie 是存储在用户浏览器中的少量文本。访问其他页面时，cookie 中存储的信息仍在，所以可以在 cookie 中存储一些信息，例如用户的 ID，让应用从数据库中取回已登录的用户。这一节和 8.2 节会使用 Rails 提供的 session 方法实现临时会话，浏览器关闭后会话自动失效。[2]8.4 节会使用 Rails 提供的 cookies 方法让会话持续的时间久一些。

> 把会话看成符合 REST 架构的资源便于操作，访问登录页面时渲染一个表单用于新建会话，登录时创建一个会话，退出时再把会话销毁。不过会话和用户资源不同，用户资源（通过用户模型）使用数据库存储数据，而会话资源要使用 cookie。所以，登录功能的大部分工作是实现基于会话的认证机制。这一节和下一节要为登录功能做些准备工作，包括创建会话控制器，登录表单和相关的控制器动作。然后在 8.2 节添加所需的会话处理代码，完成登录功能。

$ git checkout master  
$ git checkout -b log-in-log-out
***
$ rails generate controller Sessions new  
在 config/routes.rb 中 添加会话控制器的路由  
登录表单的代码
app/views/sessions/new.html.erb
### 查找并认证用户
> 我们要为会话控制器编写一个最简单的 create 动作，以及空的 new 动作和 destroy 动作，

在 app/controllers/sessions_controller.rb 中 def create 中 查找并认证用户  
尝试处理登录失败（有个小小的错误）
app/controllers/sessions_controller.rb
### 测试闪现消息
$ rails generate integration_test users_login   
捕获继续显示闪现消息的测试 RED
test/integration/users_login_test.rb
$ bundle exec rake test TEST=test/integration/users_login_test.rb  
处理登录失败正确的代码 GREEN
app/controllers/sessions_controller.rb  
$ bundle exec rake test TEST=test/integration/users_login_test.rb  
$ bundle exec rake test
## 登录
在 ApplicationController 中引入会话辅助方法模块
app/controllers/application_controller.rb
### log_in 方法
log_in 方法
app/helpers/sessions_helper.rb  
登入用户
app/controllers/sessions_controller.rb  
### 当前用户
> 把用户 ID 安全地存储在临时会话中之后，在后续的请求中可以将其读取出来。我们要定义一个名为 current_user 的方法，从数据库中取出用户 ID 对应的用户。current_user 方法的作用是编写类似下面的代码：<%= current_user.name %>或是：redirect_to current_user

在会话中查找当前用户
app/helpers/sessions_helper.rb
### 修改布局中的链接
app/helpers/sessions_helper.rb  logged_in? 辅助方法
修改布局 app/views/layouts/_header.html.erb 中的链接  
在 application.js 中引入 Bootstrap JavaScript 库
### 测试布局中的变化
在 app/models/user.rb 中 定义固件中要使用的 digest 方法  
在 test/fixtures/users.yml 中 测试用户登录所需的固件  
在 test/integration/users_login_test.rb  中 测试使用有效信息登录的情况 GREEN    
$ bundle exec rake test TEST=test/integration/users_login_test.rb \                       TESTOPTS="--name test_login_with_valid_information"  

### 注册后直接登录
app/controllers/users_controller.rb 注册后登入用户  
test/test_helper.rb 在测试中定义检查登录状态的方法，返回布尔值  
test/integration/users_signup_test.rb 测试注册后有没有登入用户 GREEN  
$ bundle exec rake test
## 退出
app/helpers/sessions_helper.rb   log_out 方法  
app/controllers/sessions_controller.rb  销毁会话（退出用户）  
***
test/integration/users_login_test.rb  测试用户退出功能 GREEN  
$ bundle exec rake test
##  记住我
### 记忆令牌和摘要
> 经过上述分析，我们计划按照下面的方式实现持久会话：  
1. 生成随机字符串，当做记忆令牌；  
2. 把这个令牌存入浏览器的 cookie 中，并把过期时间设为未来的某个日期；  
3. 在数据库中存储令牌的摘要；  
4. 在浏览器的 cookie 中存储加密后的用户 ID；  
5. 如果 cookie 中有用户的 ID，就用这个 ID 在数据库中查找用户，并且检查 cookie 中的记忆令牌和数据库中的哈希摘要是否匹配。  
6. 注意，最后一步和登入用户很相似：使用电子邮件地址取回用户，然后（使用 authenticate 方法）验证提交的密码和密码摘要是否匹配（代码清单 8.5）。所以，我们的实现方式和 has_secure_password 差不多。
  
  
> 首先，我们把所需的 remember_digest 属性加入用户模型  

$ rails generate migration add_remember_digest_to_users remember_digest:string  
$ bundle exec rake db:migrate  
***
app/models/user.rb 添加生成令牌的方法  
app/models/user.rb  在用户模型中添加 remember 方法 GREEN
### 登录时记住登录状态
在 app/helpers/sessions_helper.rb 中 更新 current_user 方法，支持持久会话 RED  
$ bundle exec rake test
### 忘记用户
在 app/models/user.rb 中 给用户模型中添加 forget 方法  
在 app/helpers/sessions_helper.rb 中 ，定义 forget 辅助方法，忘记持久会话，然后在 log_out 辅助方法中调用 forget   
### 两个小问题
多个浏览器窗口  
不同的浏览器  

测试用户退出 RED
test/integration/users_login_test.rb  
$ bundle exec rake test  
只有登录后才能退出 GREEN
app/controllers/sessions_controller.rb  
测试没有摘要时 authenticated? 方法的表现 RED
test/models/user_test.rb  
$ bundle exec rake test  
更新 authenticated?，处理没有记忆摘要的情况 GREEN
app/models/user.rb
###  “记住我”复选框
在登录表单中添加“记住我”复选框
app/views/sessions/new.html.erb  
“记住我”复选框的 CSS 规则
app/assets/stylesheets/custom.css.scss  
处理提交的“记住我”复选框
app/controllers/sessions_controller.rb
### 记住登录状态功能的测试
添加 log_in_as 辅助方法
test/test_helper.rb  
测试“记住我”复选框 GREEN
test/integration/users_login_test.rb  
$ bundle exec rake test  
***
在未测试的分支中抛出异常 GREEN
app/helpers/sessions_helper.rb  
$ bundle exec rake test  
测试持久会话
test/helpers/sessions_helper_test.rb

$ bundle exec rake test TEST=test/helpers/sessions_helper_test.rb  
删除抛出异常的代码 GREEN
app/helpers/sessions_helper.rb  
rake test
  ***
$ bundle exec rake test  
$ git add -A  
$ git commit -m "Finish log in/log out"  
$ git checkout master  
$ git merge log-in-log-out
  ***
$ bundle exec rake test
$ git push
$ git push heroku
$ heroku run rake db:migrate
***
$ heroku maintenance:on
$ git push heroku
$ heroku run rake db:migrate
$ heroku maintenance:off
### 读完本章学到了什么
- Rails 可以使用临时 cookie 和持久 cookie 维护页面之间的状态；
- 登录表单的目的是创建新会话，登入用户；
- flash.now 方法用于在重新渲染的页面中显示闪现消息；
- 在测试中重现问题时可以使用测试驱动开发；
- 使用 session 方法可以安全地在浏览器中存储用户 ID，创建临时会话；
- 可以根据登录状态修改功能，例如布局中显示的链接；
- 集成测试可以检查路由、数据库更新和对布局的修改；
- 为了实现持久会话，我们为每个用户生成了记忆令牌和对应的记忆摘要；
- 使用 cookies 方法可以在浏览器的 cookie 中存储一个永久记忆令牌，实现持久会话；
- 登录状态取决于有没有当前用户，而当前用户通过临时会话中的用户 ID 或持久会话中唯一的记忆令牌获取；
- 退出功能通过删除会话中的用户 ID 和浏览器中的持久 cookie 实现；
- 三元操作符是编写简单 if-else 语句的简洁方式。

# 第 9 章 更新，显示和删除用户
## 更新用户
> 编辑用户信息的方法和创建新用户差不多（参见第 7 章），创建新用户的页面在 new 动作中处理，而编辑用户的页面在 edit 动作中处理；创建用户的过程在 create 动作中处理 POST 请求，编辑用户要在 update 动作中处理 PATCH 请求（旁注 3.2）。二者之间最大的区别是，任何人都可以注册，但只有当前用户才能更新自己的信息。我们可以使用第 8 章实现的认证机制，通过“事前过滤器”（before filter）实现访问限制。

$ git checkout master  
$ git checkout -b updating-users
### 编辑表单
用户控制器的 edit 动作
app/controllers/users_controller.rb  
用户编辑页面的视图
app/views/users/edit.html.erb  
在网站布局中设置“Settings”链接的地址
app/views/layouts/_header.html.erb
### 编辑失败
update 动作初始版本
app/controllers/users_controller.rb
### 编辑失败的测试
$ rails generate integration_test users_edit  
编辑失败的测试 GREEN
test/integration/users_edit_test.rb  
$ bundle exec rake test
### 编辑成功（使用 TDD）
编辑成功的测试 RED
test/integration/users_edit_test.rb  
用户控制器的 update 动作 RED
app/controllers/users_controller.rb  
更新时允许密码为空 GREEN
app/models/user.rb  
$ bundle exec rake test  
## 权限系统
### 必须先登录
> 为了实现要求用户先登录的限制，我们要定义一个名为 logged_in_user 的方法，然后使用 before_action :logged_in_user 调用这个方法，如代码清单 9.12 所示。

添加 logged_in_user 事前过滤器 RED
app/controllers/users_controller.rb  
$ bundle exec rake test  
登入测试用户 GREEN
test/integration/users_edit_test.rb  
$ bundle exec rake test  
注释掉事前过滤器，测试安全防护措施 GREEN
app/controllers/users_controller.rb  
测试 edit 和 update 动作是受保护的 RED
test/controllers/users_controller_test.rb  
去掉事前过滤器的注释 GREEN
app/controllers/users_controller.rb  
$ bundle exec rake test
### 用户只能编辑自己的资料
在固件文件中添加第二个用户
test/fixtures/users.yml  
尝试编辑其他用户资料的测试 RED
test/controllers/users_controller_test.rb  
保护 edit 和 update 动作的 correct_user 事前过滤器 GREEN
app/controllers/users_controller.rb  
$ bundle exec rake test   
current_user? 方法
app/helpers/sessions_helper.rb
correct_user 的最终版本 GREEN
app/controllers/users_controller.rb
### 友好的转向
测试友好的转向 RED
test/integration/users_edit_test.rb   
把 store_location 添加到 logged_in_user 事前过滤器中
app/controllers/users_controller.rb  
加入友好转向后的 create 动作
app/controllers/sessions_controller.rb  
$ bundle exec rake test
## 列出所有用户
### 用户列表
测试 index 动作的重定向 RED
test/controllers/users_controller_test.rb  
访问 index 动作要先登录 GREEN
app/controllers/users_controller.rb
用户控制器的 index 动作
app/controllers/users_controller.rb  
index 视图
app/views/users/index.html.erb  
用户列表页面的 CSS
app/assets/stylesheets/custom.css.scss  
添加用户列表页面的链接地址
app/views/layouts/_header.html.erb  
$ bundle exec rake test
### 示例用户
gem 'faker',                '1.4.2'
$ bundle install  
向数据库中添加示例用户的 Rake 任务
db/seeds.rb    
$ bundle exec rake db:migrate:reset  
$ bundle exec rake db:seed

### 分页
gem 'will_paginate',           '3.0.7'  
gem 'bootstrap-will_paginate', '0.0.10'  
$ bundle install   
在 index 视图中加入分页
app/views/users/index.html.erb  
在 index 动作中分页取回用户
app/controllers/users_controller.rb  
### 用户列表页面的测试
在固件中再创建 30 个用户
test/fixtures/users.yml  
$ rails generate integration_test users_index  
用户列表及分页的测试 GREEN
test/integration/users_index_test.rb  
$ bundle exec rake test  
### 使用局部视图重构
重构用户列表视图的第一步
app/views/users/index.html.erb  
完全重构后的用户列表视图 GREEN
app/views/users/index.html.erb  
$ bundle exec rake test  
## 删除用户
### 管理员
$ rails generate migration add_admin_to_users admin:boolean  
向用户模型中添加 admin 属性的迁移
db/migrate/[timestamp]_add_admin_to_users.rb  
$ bundle exec rake db:migrate  
在生成示例用户的代码中把第一个用户设为管理员
db/seeds.rb  
$ bundle exec rake db:migrate:reset
$ bundle exec rake db:seed
#### “健壮参数”再探
### destroy 动作
删除用户的链接（只有管理员能看到）
app/views/users/_user.html.erb  
添加 destroy 动作
app/controllers/users_controller.rb  
限制只有管理员才能访问 destroy 动作的事前过滤器
app/controllers/users_controller.rb
### 删除用户的测试
把一个用户固件设为管理员
test/fixtures/users.yml  
测试只有管理员能访问的动作 GREEN
test/controllers/users_controller_test.rb  
删除链接和删除用户操作的集成测试 GREEN
test/integration/users_index_test.rb
$ bundle exec rake test
***
$ git add -A  
$ git commit -m "Finish user edit, update, index, and destroy actions"  
$ git checkout master  
$ git merge updating-users  
$ git push
***
$ bundle exec rake test  
$ git push heroku  
$ heroku pg:reset DATABASE  
$ heroku run rake db:migrate  
$ heroku run rake db:seed  
$ heroku restart

***
### 读完本章学到了什么
- 可以使用编辑表单修改用户的资料，这个表单向 update 动作发送 PATCH 请求；
- 为了提升通过 Web 修改信息的安全性，必须使用“健壮参数”；
- 事前过滤器是在控制器动作前执行方法的标准方式；
- 我们使用事前过滤器实现了权限系统；
- 针对权限系统的测试既使用了低层命令直接向控制器动作发送适当的 HTTP 请求，也使用了高层的集成测试；
- 友好转向会在用户登录后重定向到之前想访问的页面；
- 用户列表页面列出了所有用户，而且一页只显示一部分用户；
- Rails 使用标准的文件 db/seeds.rb 向数据库中添加示例数据，这个操作使用 rake db:seed 任务完成；
- render @users 会自动调用 _user.html.erb 局部视图，渲染集合中的各个用户；
- 在用户模型中添加 admin 布尔值属性后，会自动创建 user.admin? 布尔值方法；
- 管理员点击删除链接可以删除用户，点击删除链接后会向用户控制器的 destroy 动作发起 DELETE 请求；
- 在固件中可以使用嵌入式 Ruby 创建大量测试用户。

# 第 10 章 账户激活和密码重设
## 账户激活
> 我们要采取的实现步骤与注册用户（8.2 节）和记住用户（8.4 节）差不多，如下所示：  
1. 用户一开始处于“未激活”状态；  
2. 用户注册后，生成一个激活令牌和对应的激活摘要；  
3. 把激活摘要存储在数据库中，然后给用户发送一封电子邮件，提供一个包含激活令牌和用户电子邮件地址的链接；[2]  
4. 用户点击这个链接后，使用电子邮件地址查找用户，并且对比令牌和摘要；  
5. 如果令牌和摘要匹配，就把状态由“未激活”改为“已激活”。


$ git checkout master  
$ git checkout -b account-activation-password-resets

### 资源
添加账户激活所需的资源路由
config/routes.rb  
$ rails generate migration add_activation_to_users activation_digest:string activated:boolean activated_at:datetime  
$ bundle exec rake db:migrate
***
在用户模型中添加账户激活相关的代码 GREEN
app/models/user.rb  
激活种子数据中的用户
db/seeds.rb  
激活固件中的用户
test/fixtures/users.yml  
$ bundle exec rake db:migrate:reset  
$ bundle exec rake db:seed
  ### 邮件程序
$ rails generate mailer UserMailer account_activation password_reset  
生成的账户激活邮件视图，纯文本格式
app/views/user_mailer/account_activation.text.erb   
设定测试环境的主机地址
config/environments/test.rb

$ bundle exec rake test:mailers  
在注册过程中添加账户激活 RED
app/controllers/users_controller.rb  
临时注释掉失败的测试 GREEN
test/integration/users_signup_test.rb  
在 current_user 中使用修改后的 authenticated? 方法 GREEN
app/helpers/sessions_helper.rb  
在 UserTest 中使用修改后的 authenticated? 方法 GREEN
test/models/user_test.rb  
$ bundle exec rake test  
***
禁止未激活的用户登录
app/controllers/sessions_controller.rb  

### 测试和重构
在用户注册的测试文件中添加账户激活的测试 GREEN
test/integration/users_signup_test.rb  
$ bundle exec rake test  
在用户模型中添加账户激活相关的方法
app/models/user.rb  
通过用户模型对象发送邮件
app/controllers/users_controller.rb
通过用户模型对象激活账户
app/controllers/account_activations_controller.rb  
$ bundle exec rake test  
***
$ git add -A  
$ git commit -m "Add account activations"

## 密码重设
$ rails generate controller PasswordResets new edit --no-test-framework  
添加“密码重设”资源的路由
config/routes.rb  
添加打开忘记密码表单的链接
app/views/sessions/new.html.erb  
$ rails generate migration add_reset_to_users reset_digest:string reset_sent_at:datetime  
$ bundle exec rake db:migrate
### 控制器和表单
登录表单的代码
app/views/sessions/new.html.erb   
请求重设密码页面的视图
app/views/password_resets/new.html.erb
PasswordResetsController 的 create 动作
app/controllers/password_resets_controller.rb
在用户模型中添加重设密码所需的方法
app/models/user.rb  
### 邮件程序
发送密码重设链接
app/mailers/user_mailer.rb  
密码重设邮件的纯文本视图
app/views/user_mailer/password_reset.text.erb  
密码重设邮件的 HTML 视图
app/views/user_mailer/password_reset.html.erb  
预览密码重设邮件所需的方法
test/mailers/previews/user_mailer_preview.rb  
添加密码重设邮件程序的测试 GREEN
test/mailers/user_mailer_test.rb  
$ bundle exec rake test
### 重设密码
重设密码的表单
app/views/password_resets/edit.html.erb  
重设密码的 edit 动作
app/controllers/password_resets_controller.rb    
重设密码的 update 动作
app/controllers/password_resets_controller.rb  
在用户模型中定义 password_reset_expired? 方法
app/models/user.rb
### 测试
$ rails generate integration_test password_resets  
密码重设的集成测试
test/integration/password_resets_test.rb  
$ bundle exec rake test
## 在生产环境中发送邮件
$ heroku addons:create sendgrid:starter  
配置应用在生产环境中使用 SendGrid
config/environments/production.rb  
$ heroku config:get SENDGRID_USERNAME
$ heroku config:get SENDGRID_PASSWORD  
***
$ bundle exec rake test
$ git add -A
$ git commit -m "Add password resets & email configuration"
$ git checkout master
$ git merge account-activation-password-reset
***
$ bundle exec rake test
$ git push
$ git push heroku master
$ heroku run rake db:migrate
### 读完本章学到了什么
1. 和会话一样，账户激活虽然没有对应的 Active Record 对象，但也可以看做一个“资源”；
2. Rails 可以生成 Action Mailer 动作和视图，用于发送邮件；
3. Action Mailer 支持纯文本邮件和 HTML 邮件；
4. 与普通的动作和视图一样，在邮件程序的视图中也可以使用邮件程序动作中的实例变量；
5. 与会话和账户激活一样，密码重设虽然没有对应的 Active Record 对象，但也可以看做一个“资源”；
6. 账户激活和密码重设都使用生成的令牌创建唯一的 URL，分别用于激活账户和重设密码；
7. 邮件程序的测试和集成测试对确认邮件程序的表现都有用；
8. 在生产环境可以使用 SendGrid 发送电子邮件。


# 第 11 章 用户的微博
$ git checkout master  
$ git checkout -b user-microposts  
### 基本模型
$ rails generate model Micropost content:text user:references  
$ bundle exec rake db:migrate
### 微博模型的数据验证
测试微博是否有效 RED
test/models/micropost_test.rb  
$ bundle exec rake test:models  
微博模型 user_id 属性的验证 GREEN
app/models/micropost.rb   
$ bundle exec rake test  
***
测试微博模型的验证 RED
test/models/micropost_test.rb  
微博模型的验证 GREEN
app/models/micropost.rb  
$ bundle exec rake test  

### 用户和微博之间的关联

一篇微博属于（belongs_to）一个用户 GREEN
app/models/micropost.rb  
一个用户有多篇（has_many）微博 GREEN
app/models/user.rb  
使用正确的方式创建微博对象 GREEN
test/models/micropost_test.rb  
$ bundle exec rake test

### 改进微博模型

> 默认作用域

> 默认情况下，user.microposts 不能确保微博的顺序，但是按照博客和 Twitter 的习惯，我们希望微博按照创建时间倒序排列，也就是最新发布的微博在前面。[1]为此，我们要使用“默认作用域”（default scope）。

> 这样的功能很容易让测试意外通过（就算应用代码不对，测试也能通过），所以我们要使用测试驱动开发技术，确保实现的方式是正确的。首先，我们编写一个测试，检查数据库中的第一篇微博和微博固件中名为 most_recent 的微博相同，如代码清单 11.13 所示。

测试微博的排序 RED
test/models/micropost_test.rb  
微博固件
test/fixtures/microposts.yml  
$ bundle exec rake test TEST=test/models/micropost_test.rb TESTOPTS="--name test_order_should_be_most_recent_first"   
使用 default_scope 排序微博 GREEN
app/models/micropost.rb  
$ bundle exec rake test
***
依属关系：destroy  
测试 dependent: :destroy GREEN
test/models/user_test.rb  
$ bundle exec rake test
## 显示微博
$ rails generate controller Microposts  
渲染单篇微博的局部视图
app/views/microposts/_micropost.html.erb  
在用户控制器的 show 动作中定义 @microposts 变量
app/controllers/users_controller.rb  
在用户资料页面中加入微博
app/views/users/show.html.erb
### 示例微博
添加示例微博
db/seeds.rb  

$ bundle exec rake db:migrate:reset  
$ bundle exec rake db:seed  
微博的样式（包含本章要使用的所有 CSS）
app/assets/stylesheets/custom.css.scss
### 资料页面中微博的测试
$ rails generate integration_test users_profile  
添加关联用户后的微博固件
test/fixtures/microposts.yml  
用户资料页面的测试 GREEN
test/integration/users_profile_test.rb  
$ bundle exec rake test
## 微博相关的操作
微博资源的路由设置
config/routes.rb
### 访问限制
微博控制器的访问限制测试 RED
test/controllers/microposts_controller_test.rb  
把 logged_in_user 方法移到 ApplicationController 中 app/controllers/application_controller.rb  
限制访问微博控制器的动作 GREEN
app/controllers/microposts_controller.rb  
$ bundle exec rake test  
### 创建微博
微博控制器的 create 动作
app/controllers/microposts_controller.rb  
用户信息侧边栏局部视图
app/views/shared/_user_info.html.erb  
微博创建表单局部视图
app/views/shared/_micropost_form.html.erb  
在 home 动作中定义 @micropost 实例变量
app/controllers/static_pages_controller.rb  
能使用其他对象的错误消息局部视图 RED
app/views/shared/_error_messages.html.erb  
$ bundle exec rake test  
***
修改用户注册表单中渲染错误消息局部视图的方式
app/views/users/new.html.erb  
修改编辑用户表单中渲染错误消息局部视图的方式
app/views/users/edit.html.erb  
修改密码重设表单中渲染错误消息局部视图的方式
app/views/password_resets/edit.html.erb  
$ bundle exec rake test
  
### 动态流原型
微博动态流的初步实现
app/models/user.rb  
在 home 动作中定义一个实例变量，获取动态流
app/controllers/static_pages_controller.rb  
动态流局部视图
app/views/shared/_feed.html.erb  
在首页加入动态流
app/views/static_pages/home.html.erb  
在 create 动作中定义 @feed_items 实例变量，值为空数组
app/controllers/microposts_controller.rb  

###  删除微博

在微博局部视图中添加删除链接
app/views/microposts/_micropost.html.erb  
MicropostsController 的 destroy 动作
app/controllers/microposts_controller.rb  

### 微博的测试

> 微博模型和相关的界面完成了。我们还要编写简短的微博控制器测试，检查权限限制，以及一个集成测试，检查整个操作流程。


添加几个由不同用户发布的微博
test/fixtures/microposts.yml  
测试用户不能删除其他用户的微博 GREEN
test/controllers/microposts_controller_test.rb  
$ rails generate integration_test microposts_interface  
$ bundle exec rake test

## 微博中的图片

###  基本的图片上传功能
gem 'carrierwave',             '0.10.0'  
gem 'mini_magick',             '3.8.0'  
gem 'fog',                     '1.26.0'  
gem "net-ssh", "~> 2.5.1"  

$ bundle install  
$ rails generate uploader Picture  
$ rails generate migration add_picture_to_microposts picture:string  
$ bundle exec rake db:migrate  
***
在微博模型中添加图片上传程序
app/models/micropost.rb  
在发布微博的表单中添加图片上传按钮
app/views/shared/_micropost_form.html.erb  
把 picture 添加到允许修改的属性列表中
app/controllers/microposts_controller.rb  
在微博中显示图片
app/views/microposts/_micropost.html.erb  

### 验证图片
限制可上传图片的类型
app/uploaders/picture_uploader.rb  
添加图片大小验证
app/models/micropost.rb  
使用 jQuery 检查文件的大小
app/views/shared/_micropost_form.html.erb  

### 调整图片的尺寸

$ sudo apt-get update  
$ sudo apt-get install imagemagick --fix-missing  

配置图片上传程序，调整图片的尺寸
app/uploaders/picture_uploader.rb

配置生产环境使用的图片上传程序
app/uploaders/picture_uploader.rb  
配置 CarrierWave 使用 S3
config/initializers/carrier_wave.rb  

$ heroku config:set S3_ACCESS_KEY=<access key>  
$ heroku config:set S3_SECRET_KEY=<secret key>  
$ heroku config:set S3_BUCKET=<bucket name>
***
$ bundle exec rake test  
$ git add -A   
$ git commit -m "Add user microposts"  
$ git checkout master  
$ git merge user-microposts  
$ git push
***
$ git push heroku  
$ heroku pg:reset DATABASE  
$ heroku run rake db:migrate  
$ heroku run rake db:seed

### 读完本章学到了什么
1. 和用户一样，微博也是一种“资源”，而且有对应的 Active Record 模型；
2. Rails 支持多键索引；
3. 我们可以分别在用户和微博模型中使用 has_many 和 belongs_to 方法实现一个用户拥有多篇微博的模型；
4. has_many/belongs_to 会创建很多方法，通过关联创建对象；
5. user.microposts.build(…​) 创建一个微博对象，并自动把这个微博和用户关联起来；
6. Rails 支持使用 default_scope 指定默认排序方式；
7. 作用域方法的参数是匿名函数；
8. 加入 dependent: :destroy 参数后，删除对象时也会把关联的对象删除；
9. 分页和数量统计都可以通过关联调用，这样写出的代码很简洁；
10. 在固件中可以创建关联；
11. 可以向 Rails 局部视图中传入变量；
12. 查询 Active Record 模型时可以使用 where 方法；
13. 通过关联创建和销毁对象有安全保障；
14. 可以使用 CarrierWave 上传图片及调整图片的尺寸。

# 第 12 章 关注用户
##  “关系”模型

$ git checkout master  
$ git checkout -b following-users  

$ rails generate model Relationship follower_id:integer followed_id:integer  
在 relationships 表中添加索引
db/migrate/[timestamp]_create_relationships.rb  
$ bundle exec rake db:migrate

### 用户和“关系”模型之间的关联

实现“主动关系”中的 has_many 关联
app/models/user.rb  

### 数据验证

测试“关系”模型中的验证
test/models/relationship_test.rb  
在“关系”模型中添加验证
app/models/relationship.rb   
删除“关系”固件
test/fixtures/relationships.yml
$ bundle exec rake test

### 我关注的用户

在用户模型中添加 following 关联
app/models/user.rb  
测试关注用户相关的几个辅助方法 RED
test/models/user_test.rb  
定义关注用户相关的几个辅助方法 GREEN
app/models/user.rb  
$ bundle exec rake test

###  关注我的人

使用“被动关系”实现 user.followers
app/models/user.rb  
测试 followers 关联 GREEN
test/models/user_test.rb  
$ bundle exec rake test

## 关注用户的网页界面

在种子数据中添加“关系”相关的数据
db/seeds.rb  

$ bundle exec rake db:migrate:reset
$ bundle exec rake db:seed  

### 数量统计和关注表单 

在用户控制器中添加 following 和 followers 两个动作
config/routes.rb  
显示数量统计的局部视图
app/views/shared/_stats.html.erb
在首页显示数量统计
app/views/static_pages/home.html.erb  
首页侧边栏的 SCSS 样式
app/assets/stylesheets/custom.css.scss  
添加“关系”资源的路由设置
config/routes.rb   
关注用户的表单
app/views/users/_follow.html.erb  
取消关注用户的表单
app/views/users/_unfollow.html.erb  
在用户资料页面加入关注表单和数量统计
app/views/users/show.html.erb  

###  我关注的用户列表页面和关注我的用户列表页面

我关注的用户列表页面和关注我的用户列表页面的访问限制
test/controllers/users_controller_test.rb
following 和 followers 动作 RED
app/controllers/users_controller.rb  
渲染我关注的用户列表页面和关注我的用户列表页面的 show_follow 视图
app/views/users/show_follow.html.erb  
***
$ rails generate integration_test following  
“关系”固件
test/fixtures/relationships.yml  
测试我关注的用户列表页面和关注我的用户列表页面 GREEN
test/integration/following_test.rb
$ bundle exec rake test

### 关注按钮的常规实现方式

$ rails generate controller Relationships  
RelationshipsController 基本的访问限制测试 RED
test/controllers/relationships_controller_test.rb    
RelationshipsController 的访问限制 GREEN
app/controllers/relationships_controller.rb  
RelationshipsController 的代码
app/controllers/relationships_controller.rb

### 关注按钮的 Ajax 实现方式

使用 Ajax 处理关注用户的表单
app/views/users/_follow.html.erb  
使用 Ajax 处理取消关注用户的表单
app/views/users/_unfollow.html.erb  
在 RelationshipsController 中响应 Ajax 请求
app/controllers/relationships_controller.rb
添加优雅降级所需的配置
config/application.rb  
***
创建“关系”的 JS-ERb 代码
app/views/relationships/create.js.erb
***
### 关注功能的测试

测试关注和取消关注按钮 GREEN
test/integration/following_test.rb  
$ bundle exec rake test

## 动态流

### 目的和策略
> 虽然我们还不知道怎么实现动态流，但测试的方法很明确，所以我们先写测试。测试的关键是要覆盖三种情况：动态流中既要包含关注的用户发布的微博，还要有用户自己的微博，但是不能包含未关注用户的微博。根据代码清单 9.43 和代码清单 11.51 中的固件，也就是说，Michael 要能看到 Lana 和自己的微博，但不能看到 Archer 的微博。把这个需求转换成测试，如代码清单 12.41 所示。（用到了代码清单 11.44 中定义的 feed 方法。）


测试动态流 RED
test/models/user_test.rb  
$ bundle exec rake test  

### 初步实现动态流

初步实现的动态流 GREEN
app/models/user.rb  

$ bundle exec rake test

### 子查询

在获取动态流的 where 方法中使用键值对 GREEN
app/models/user.rb  
动态流的最终实现 GREEN
app/models/user.rb  
$ bundle exec rake test  
***
home 动作中分页显示的动态流
app/controllers/static_pages_controller.rb

***
$ bundle exec rake test  
$ git add -A  
$ git commit -m "Add user following"  
$ git checkout master  
$ git merge following-users
***
$ git push  
$ git push heroku  
$ heroku pg:reset DATABASE  
$ heroku run rake db:migrate  
$ heroku run rake db:seed

## 小结
实现了动态流后，本书的演示应用就开发完了。这个应用演示了 Rails 的全部重要功能，包括模型、视图、控制器、模板、局部视图、过滤器、数据验证、回调、has_many/belongs_to 关联、has_many :through 关联、安全、测试和部署。

除此之外，Rails 还有很多功能值得我们学习。下面提供了一些后续学习资源，可在以后的学习中优先使用。

### 后续的学习资源
- 商店和网上都有很多 Rails 资源，而且多得让你挑花眼。可喜的是，读完这本书后，你已经可以学习几乎所有其他的知识了。下面是建议你后续学习的资源：

- 本书配套视频：我为本书录制了内容充足的配套视频，除了覆盖本书的内容之外，还介绍了很多小技巧。当然视频还能弥补印刷书的不足，让你观看我是如何开发的。你可以在本书的网站中购买这些视频。

- RailsCasts：我建议你浏览一下 RailsCasts 的视频归档，观看你感兴趣的视频。

- Tealeaf Academy：近些年出现了很多面授开发课程，我建议你参加一个当地的培训。其中 Tealeaf Academy 是线上课程，可在任何地方学习。Tealeaf 的课程组织良好，而且能得到老师的指导。

- Thinkful：没 Tealeaf 那么高级的课程（和本书的难度差不多）。

- RailsApps：很有启发性的 Rails 示例应用。

- Code School：很多交互式编程课程。

- Ruby 和 Rails 相关的书：若想进一步学习 Ruby，我推荐阅读 Peter Cooper 写的《Beginning Ruby》，David A. Black 写的《The Well-Grounded Rubyist》，Russ Olsen 写的《Eloquent Ruby》和 Hal Fulton 写的《The Ruby Way》。若想进一步学习 Rails，我推荐阅读 Sam Ruby、Dave Thomas 和 David Heinemeier Hansson 合著的《Agile Web Development with Rails》，Obie Fernandez 写的《The Rails 4 Way》以及 Ryan Bigg 和 Yehuda Katz 合著的《Rails 4 in Action》。

### 读完本章学到了什么
- 使用 has_many :through 可以实现数据模型之间的复杂关系；
- has_many 方法有很多可选的参数，可用来指定对象的类名和外键名；
- 使用 has_many 和 has_many :through，并且指定合适的类名和外键名，可以实现“主动关系”和“被动关系”；
- Rails 支持嵌套路由；
- where 方法可以创建灵活且强大的数据库查询；
- Rails 支持使用低层 SQL 语句查询数据库；
- 把本书实现的所有功能放在一起，最终实现了一个能关注用户并且显示动态流的应用。











