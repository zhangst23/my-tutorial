Action Controller控制器.rb

1.0  控制器的作用
# 路由决定使用哪个控制器处理请求后，控制器负责解析请求，生成对应的请求。从模型中获取数据，或把数据写入模型，再通过视图生成 HTML。
# 因此，控制器可以视作模型和视图的中间人，让模型中的数据可以在视图中使用，把数据显示给用户，再把用户提交的数据保存或更新到模型中。

2.0  控制器命名约定
# Rails 控制器的命名习惯是，最后一个单词使用复数形式
# 用 ClientsController，而不是 ClientController；用 SiteAdminsController，而不是 SiteAdminController 或 SitesAdminsController。

3 方法和动作
# 控制器是一个类，继承自 ApplicationController，和其他类一样，定义了很多方法。程序接到请求时，路由决定运行哪个控制器和哪个动作，然后创建该控制器的实例，运行和动作同名的方法。

class ClientsController < ApplicationController
  def new
  end
end

# 例如，用户访问 /clients/new 新建客户，Rails 会创建一个 ClientsController 实例，运行 new 方法。注意，在上面这段代码中，即使 new 方法是空的也没关系，因为默认会渲染 new.html.erb 视图，除非指定执行其他操作。在 new 方法中，声明可在视图中使用的 @client 实例变量，创建一个新的 Client 实例：

def new
  @client = Client.new
end

4 参数
4.1 Hash 
# params Hash 不局限于只能使用一维键值对，其中可以包含数组和嵌套的 Hash。要发送数组，需要在键名后加上一对空方括号（[]）：
GET /clients?ids[]=1&ids[]=2&ids[]=3
# 
<input type="text" name="client[address][city]" value="Carrot City" />

4.2 JSON 参数
# 接收 JSON 格式的参数更容易处理。如果请求的 Content-Type 报头是 application/json，Rails 会自动将其转换成 params Hash，按照常规的方法使用：

4.3 
# params Hash 总有 :controller 和 :action 两个键，但获取这两个值应该使用 controller_name 和 action_name 方法。
# 路由中定义的参数，例如 :id，也可通过 params Hash 获取。例如，假设有个客户列表，可以列出激活和禁用的客户。我们可以定义一个路由，捕获下面这个 URL 中的 :status 参数：

get '/clients/:status' => 'clients#index', foo: 'bar'

4.4 default_url_options
# 可以设置所生成 URL 中都包含的参数。这个方法必须返回一个 Hash，其值为所需的参数值，而且键必须使用 Symbol：

class ApplicationController < ActionController::Base
  def default_url_options
    { locale: I18n.locale }
  end
end

4.5 健壮参数
# 加入健壮参数功能后，Action Controller 的参数禁止在 Avtive Model 中批量赋值，除非参数在白名单中。也就是说，你要明确选择那些属性可以批量更新，避免意外把不该暴露的属性暴露了。
4.5.1 允许使用的标量值

假如允许传入 :id：

params.permit(:id)

4.5.2 嵌套参数

也可以允许传入嵌套参数，例如：

params.permit(:name, { emails: [] },
              friends: [ :name,
                         { family: [ :name ], hobbies: [] }])


4.5.3 更多例子

你可能还想在 new 动作中限制允许传入的属性。不过此时无法再根键上调用 require 方法，因为此时根键还不存在：

# using `fetch` you can supply a default and use
# the Strong Parameters API from there.
params.fetch(:blog, {}).permit(:title, :author)

4.5.4 不用健壮参数

# 健壮参数的目的是为了解决常见问题，不是万用良药。不过，可以很方便的和自己的代码结合，解决复杂需求。


5 会话
# 程序中的每个用户都有一个会话（session），可以存储少量数据，在多次请求中永久存储。会话只能在控制器和视图中使用，可以通过以下几种存储机制实现：
ActionDispatch::Session::CookieStore：所有数据都存储在客户端
ActionDispatch::Session::CacheStore：数据存储在 Rails 缓存里
ActionDispatch::Session::ActiveRecordStore：使用 Active Record 把数据存储在数据库中（需要使用 activerecord-session_store gem）
ActionDispatch::Session::MemCacheStore：数据存储在 Memcached 集群中（这是以前的实现方式，现在请改用 CacheStore）

5.1 获取会话
# 在控制器中，可以使用实例方法 session 获取会话。
# 会话中的数据以键值对的形式存储，类似 Hash：
# 要想把数据存入会话，像 Hash 一样，给键赋值即可：
# 要从会话中删除数据，把键的值设为 nil 即可：
# 要重设整个会话，请使用 reset_session 方法。

5.2 Flash 消息
# Flash 消息的获取方式和会话差不多，类似 Hash。Flash 消息是 FlashHash 实例。
# Flash 消息还可以直接在转向中设置。可以指定 :notice、:alert 或者常规的 :flash：
# Flash 不局限于警告和提醒，可以设置任何可在会话中存储的内容：
# 如果希望 Flash 消息保留到其他请求，可以使用 keep 方法：

5.2.1 flash.now

# 默认情况下，Flash 中的内容只在下一次请求中可用，但有时希望在同一个请求中使用。例如，create 动作没有成功保存资源时，
# 会直接渲染 new 模板，这并不是一个新请求，但却希望希望显示一个 Flash 消息。针对这种情况，可以使用 flash.now，
# 用法和 flash 一样：

6 Cookies
程序可以在客户端存储少量数据（称为 cookie），在多次请求中使用，甚至可以用作会话。在 Rails 中可以使用 cookies 方法轻松获取 cookies，用法和 session 差不多，就像一个 Hash：

7 渲染 XML 和 JSON 数据
在 ActionController 中渲染 XML 和 JSON 数据非常简单。使用脚手架生成的控制器如下所示：

8 过滤器

8.1 后置过滤器和环绕过滤器
8.2 过滤器的其他用法

9 防止请求伪造
跨站请求伪造（CSRF）是一种工具方式

10 request 和 response 对象
10.1 request 对象
10.1.1 path_parameters，query_parameters 和 request_parameters
10.2 response 对象
10.2.1 设置自定义报头

11 HTTP 身份认证
Rails 内建了两种 HTTP 身份认证方式：

基本认证
摘要认证


12 数据流和文件下载
12.1 发送文件
如果想发送硬盘上已经存在的文件，可以使用 send_file 方法。
12.2 使用 REST 的方式下载文件
12.3 任意数据的实时流
12.3.1 使用实时流


13 过滤日志
13.1 过滤参数
13.2 过滤转向


14 异常处理
14.1 默认的 500 和 404 模板
14.2 rescue_from


15 强制使用 HTTPS 协议

