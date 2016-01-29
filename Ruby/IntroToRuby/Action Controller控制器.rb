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

class LoginsController < ApplicationController
	def destroy
		session[:current_user_id] = nil
		flash[:notice] = "You have successfully logged out."
		redirect_to root_url
	end
end

# Flash 消息还可以直接在转向中设置。可以指定 :notice、:alert 或者常规的 :flash：

redirect_to root_url, notice: "You have successfully logged out."
redirect_to root_url, alert: "You're stuck here!"
redirect_to root_url, flash: { referral_code:1234 }

<html>
  <!-- <head/> -->
  <body>
    <% flash.each do |name, msg| -%>
      <%= content_tag :div, msg, class: name %>
    <% end -%>
 
    <!-- more content -->
  </body>
</html>
如此一來，如果动作中设置了警告或提醒消息，就会出现在布局中


# Flash 不局限于警告和提醒，可以设置任何可在会话中存储的内容：

# <% if flash[:just_signed_up] %>
#   <p class="welcome">Welcome to our site!</p>
# <% end %>

# 如果希望 Flash 消息保留到其他请求，可以使用 keep 方法：

class MainController < ApplicationController
	def index
		flash.keep
		redirect_to users_url
	end
end


5.2.1 flash.now

# 默认情况下，Flash 中的内容只在下一次请求中可用，但有时希望在同一个请求中使用。例如，create 动作没有成功保存资源时，
# 会直接渲染 new 模板，这并不是一个新请求，但却希望希望显示一个 Flash 消息。针对这种情况，可以使用 flash.now，
# 用法和 flash 一样：

class ClientsController < ApplicationController
	def create
		@client = Client.new(params[:client])
		if @client.save
			#...
		else
			flash.now[:error] = "Could not save client"
			render action: "new"
		end
	end
end








6 Cookies
程序可以在客户端存储少量数据（称为 cookie），在多次请求中使用，甚至可以用作会话。在 Rails 中可以使用 cookies 方法轻松获取 cookies，用法和 session 差不多，就像一个 Hash：

class CommentsController < ApplicationController
	def new
		@comment = Comment.new(author: cookies[:commenter_name])
	end

	def create
		@comment = Comment.new(params[:comment])
		if @comment.save
			flash[:notice] = "Thanks for your comment!"
			if params[:remember_name]
				cookies[:commenter_name] = @comment.author
			else
				cookies.delete(:commenter_name)
			end
			redirect_to @comment.article
		else
			render action: "new"
		end
	end
end





7 渲染 XML 和 JSON 数据
在 ActionController 中渲染 XML 和 JSON 数据非常简单。使用脚手架生成的控制器如下所示：

class UsersController < ApplicationController
  def index
    @users = User.all
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render xml: @users}
      format.json { render json: @users}
    end
  end
end


8 过滤器

class ApplicationController < ActionController::Base
  before_action :require_login
 
  private
 
  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to new_login_url # halts request cycle
    end
  end
end

# 如果用户没有登录，这个方法会在 Flash 中存储一个错误消息，然后转向登录表单页面。如果前置过滤器渲染了页面或者做了转向，动作就不会运行。如果动作上还有后置过滤器，也不会运行。

# 在上面的例子中，过滤器在 ApplicationController 中定义，所以程序中的所有控制器都会继承。程序中的所有页面都要求用户登录后才能访问。很显然（这样用户根本无法登录），并不是所有控制器或动作都要做这种限制。如果想跳过某个动作，可以使用 skip_before_action：

class LoginsController < ApplicationController
  skip_before_action :require_login, only: [:new, :create]
end


8.1 后置过滤器和环绕过滤器

# 后置过滤器类似于前置过滤器，不过因为动作已经运行了，所以可以获取即将发送给客户端的响应数据。显然，后置过滤器无法阻止运行动作。

# 环绕过滤器会把动作拉入（yield）过滤器中，工作方式类似 Rack 中间件。

# 例如，网站的改动需要经过管理员预览，然后批准。可以把这些操作定义在一个事务中：

class ChangesController < ApplicationController
	around_action :wrap_in_transaction, only: :show

	private

	def wrap_in_transaction
		ActiveRecord::Base.transaction do
			begin
				yield
			ensure
				rails ActiveRecord::Rollback
			end
		end
	end
end

# 注意，环绕过滤器还包含了渲染操作。在上面的例子中，视图本身是从数据库中读取出来的（例如，通过作用域（scope）），读取视图的操作在事务中完成，然后提供预览数据。



8.2 过滤器的其他用法
# 一般情况下，过滤器的使用方法是定义私有方法，然后调用相应的 *_action 方法添加过滤器。不过过滤器还有其他两种用法。

# 第一种，直接在 *_action 方法中使用代码块。代码块接收控制器作为参数。使用这种方法，前面的 require_login 过滤器可以改写成：

class ApplicationController < ApplicationController::Base
	before_action do |controller|
		unless controller.send(:logged_in?)
			flash[:error] = "You must be logged in to access this section"
			redirect_to new_login_url
		end
	end
end


# 注意，此时在过滤器中使用的是 send 方法，因为 logged_in? 是私有方法，而且过滤器和控制器不在同一作用域内。定义 require_login 过滤器不推荐使用这种方法，但比较简单的过滤器可以这么用。

# 第二种，在类（其实任何能响应正确方法的对象都可以）中定义过滤器。这种方法用来实现复杂的过滤器，使用前面的两种方法无法保证代码可读性和重用性。例如，可以在一个类中定义前面的 require_login 过滤器：

class ApplicationController < ActionController::Base
  before_action LoginFilter
end
 
class LoginFilter
  def self.before(controller)
    unless controller.send(:logged_in?)
      controller.flash[:error] = "You must be logged in to access this section"
      controller.redirect_to controller.new_login_url
    end
  end
end



9 防止请求伪造
跨站请求伪造（CSRF）是一种工具方式

# 安全指南一文更深入的介绍了请求伪造防范措施，还有一些开发网页程序需要知道的安全隐患。



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

# 有时不想渲染 HTML 页面，而要把文件发送给用户。在所有的控制器中都可以使用 send_data 和 send_file 方法。这两个方法都会以数据流的方式发送数据。send_file 方法很方便，只要提供硬盘中文件的名字，就会用数据流发送文件内容。

require "prawn"
class ClientsController < ApplicationController
	def download_pdf
		client = Client.find(params[:id])
		send_data generate_pdf(client),
				  filename: "#{client.name}.pdf",
				  type: "application/pdf"
	end

	private
		def generate_pdf(client)
			Prawn::Document.new do
				text client.name, align: :center
				text "Address: #{client.address}"
				text "Email: #{client.email}"
			end.render
		end
end

# download_pdf 动作调用私有方法 generate_pdf。generate_pdf 才是真正生成 PDF 的方法，返回值字符串形式的文件内容。返回的字符串会以数据流的形式发送给客户端，并为用户推荐一个文件名。有时发送文件流时，并不希望用户下载这个文件，比如嵌在 HTML 页面中的图片。告诉浏览器文件不是用来下载的，可以把 :disposition 选项设为 "inline"。这个选项的另外一个值，也是默认值，是 "attachment"

12.1 发送文件
如果想发送硬盘上已经存在的文件，可以使用 send_file 方法。

class ClientsController < ApplicationController
  # Stream a file that has already been generated and stored on disk.
  def download_pdf
    client = Client.find(params[:id])
    send_file("#{Rails.root}/files/clients/#{client.id}.pdf",
              filename: "#{client.name}.pdf",
              type: "application/pdf")
  end
end

# send_file 一次只发送 4kB，而不是一次把整个文件都写入内存。如果不想使用数据流方式，可以把 :stream 选项设为 false。如果想调整数据块大小，可以设置 :buffer_size 选项。

# 如果没有指定 :type 选项，Rails 会根据 :filename 中的文件扩展名猜测。如果没有注册扩展名对应的文件类型，则使用 application/octet-stream。


12.2 使用 REST 的方式下载文件

class ClientsController < ApplicationController
  # The user can request to receive this resource as HTML or PDF.
  def show
    @client = Client.find(params[:id])
 
    respond_to do |format|
      format.html
      format.pdf { render pdf: generate_pdf(@client) }
    end
  end
end

12.3 任意数据的实时流


# 在 Rails 中，不仅文件可以使用数据流的方式处理，在响应对象中，任何数据都可以视作数据流。ActionController::Live 模块可以和浏览器建立持久连接，随时随地把数据传送给浏览器。

12.3.1 使用实时流

把 ActionController::Live 模块引入控制器中后，所有的动作都可以处理数据流。

class MyController < ActionController::Base
  include ActionController::Live
 
  def stream
    response.headers['Content-Type'] = 'text/event-stream'
    100.times {
      response.stream.write "hello world\n"
      sleep 1
    }
  ensure
    response.stream.close
  end
end
# 上面的代码会和浏览器建立持久连接，每秒一次，共发送 100 次 "hello world\n"。

# 关于这段代码有一些注意事项。必须关闭响应数据流。如果忘记关闭，套接字就会一直处于打开状态。发送数据流之前，还要把内容类型设为 text/event-stream。因为响应发送后（response.committed 返回真值后）就无法设置报头了。

12.3.2 使用举例

# 架设你在制作一个卡拉 OK 机，用户想查看某首歌的歌词。每首歌（Song）都有很多行歌词，每一行歌词都要花一些时间（num_beats）才能唱完。

# 如果按照卡拉 OK 机的工作方式，等上一句唱完才显示下一行，就要使用 ActionController::Live：

class LyricsController < ActionController::Base
  include ActionController::Live
 
  def show
    response.headers['Content-Type'] = 'text/event-stream'
    song = Song.find(params[:id])
 
    song.each do |line|
      response.stream.write line.lyrics
      sleep line.num_beats
    end
  ensure
    response.stream.close
  end
end
# 在这段代码中，只有上一句唱完才会发送下一句歌词。

12.3.3 使用数据流时的注意事项

# 以数据流的方式发送任意数据是个强大的功能，如前面几个例子所示，你可以选择何时发送什么数据。不过，在使用时，要注意以下事项：

# 每次以数据流形式发送响应时都会新建一个线程，然后把原线程中的本地变量复制过来。线程中包含太多的本地变量会降低性能。而且，线程太多也会影响性能。
# 忘记关闭响应流会导致套接字一直处于打开状态。使用响应流时一定要记得调用 close 方法。
# WEBrick 会缓冲所有响应，因此引入 ActionController::Live 也不会有任何效果。你应该使用不自动缓冲响应的服务器







13 过滤日志
13.1 过滤参数
13.2 过滤转向


14 异常处理
14.1 默认的 500 和 404 模板
14.2 rescue_from


15 强制使用 HTTPS 协议

