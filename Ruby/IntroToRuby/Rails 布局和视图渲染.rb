Rails 布局和视图渲染.rb

1 概览：各组件之间的协作
# 本文关注 MVC 架构中控制器和视图之间的交互。你可能已经知道，控制器的作用是处理请求，但经常会把繁重的操作交给模型完成。返回响应时，控制器会把一些操作交给视图完成。本文要说明的就是控制器交给视图的操作是怎么完成的。

# 总的来说，这个过程涉及到响应中要发送什么内容，以及调用哪个方法创建响应。如果响应是个完整的视图，Rails 还要做些额外工作，把视图套入布局，有时还要渲染局部视图。后文会详细介绍整个过程。

2 创建响应
# 从控制器的角度来看，创建 HTTP 响应有三种方法：

# 调用 render 方法，向浏览器发送一个完整的响应；
# 调用 redirect_to 方法，向浏览器发送一个 HTTP 重定向状态码；
# 调用 head 方法，向浏览器发送只含报头的响应；

2.1 渲染视图
# 你可能已经听说过 Rails 的开发原则之一是“多约定，少配置”。默认渲染视图的处理就是这一原则的完美体现。

2.2 使用 render 方法
2.2.1 什么都不渲染
render nothing: true
2.2.2 渲染动作的视图
# 如果想渲染同个控制器中的其他模板，可以把视图的名字传递给 render 方法：
def update 
	@book = Book.find(params[:id])
	if @book.update(book_params)
		redirect_to(@book)
	else
		render "edit"
	end
end

# 如果不想用字符串，还可使用 Symbol 指定要渲染的动作：
render :edit

2.2.3 渲染其他控制器中的动作模板

render "products/show"

# 因为参数中有个斜线，所以 Rails 知道这个视图属于另一个控制器。如果想让代码的意图更明显，可以使用 :template 选项
render template: "products/show"

2.2.4 渲染任意文件
# render 方法还可渲染程序之外的视图（或许多个程序共用一套视图）：
render "/u/apps/warehouse_app/current/app/views/products/show"


2.2.5 小结

# 上述三种渲染方式的作用其实是一样的。在 BooksController 控制器的 update 动作中，如果更新失败后想渲染 views/books 文件夹中的 edit.html.erb 模板，下面这些用法都能达到这个目的：

render :edit
render action: :edit
render "edit"
render "edit.html.erb"
render action: "edit"
render action: "edit.html.erb"
render "books/edit"
render "books/edit.html.erb"
render template: "books/edit"
render template: "books/edit.html.erb"
render "/path/to/rails/app/views/books/edit"
render "/path/to/rails/app/views/books/edit.html.erb"
render file: "/path/to/rails/app/views/books/edit"
render file: "/path/to/rails/app/views/books/edit.html.erb"


2.2.6 使用 render 方法的 :inline 选项
# 如果使用 :inline 选项指定了 ERB 代码，render 方法就不会渲染视图。如下所示的用法完全可行：
render inline: "<% products.each do |p| %><p><%= p.name %></p><% end %>"
# 但是很少这么做。在控制器中混用 ERB 代码违反了 MVC 架构原则，也让程序的其他开发者难以理解程序的逻辑思路。请使用单独的 ERB 视图。

2.2.7 渲染文本
# 调用 render 方法时指定 :plain 选项，可以把没有标记语言的纯文本发给浏览器：
render plain: "OK"

# 渲染纯文本主要用于 Ajax 或无需使用 HTML 的网络服务。
# 默认情况下，使用 :plain 选项渲染纯文本，不会套用程序的布局。如果想使用布局，可以指定 layout: true 选项。


2.2.9 渲染 JSON

# JSON 是一种 JavaScript 数据格式，很多 Ajax 库都用这种格式。Rails 内建支持把对象转换成 JSON，经渲染后再发送给浏览器。

render json: @product
# 在需要渲染的对象上无需调用 to_json 方法，如果使用了 :json 选项，render 方法会自动调用 to_json。

2.2.11 渲染普通的 JavaScript

# Rails 能渲染普通的 JavaScript：

render js: "alert('Hello Rails');"
# 这种方法会把 MIME 设为 text/javascript，再把指定的字符串发给浏览器。


2.2.13 render 方法的选项

# render 方法一般可接受四个选项：
:content_type
:layout
:location
:status

2.2.13.1 :content_type 选项
# 默认情况下，Rails 渲染得到的结果内容类型为 text/html；如果使用 :json 选项，内容类型为 application/json；如果使用 :xml 选项，内容类型为 application/xml。如果需要修改内容类型，可使用 :content_type 选项
render file: filename, content_type: "application/rss"

2.2.13.2 :layout 选项
# render 方法的大多数选项渲染得到的结果都会作为当前布局的一部分显示。后文会详细介绍布局。
# :layout 选项告知 Rails，在当前动作中使用指定的文件作为布局：
render layout: "special_layout"
# 也可以告知 Rails 不使用布局：
render layout: false

2.2.13.3 :location 选项
# :location 选项可以设置 HTTP Location 报头：
render xml: photo, location: photo_url(photo)

2.2.13.4 :status 选项
# Rails 会自动为生成的响应附加正确的 HTTP 状态码（大多数情况下是 200 OK）。使用 :status 选项可以修改状态码：
render status: 500
render status: :forbidden

2.2.14 查找布局
2.2.14.1 指定控制器所用布局
# 在控制器中使用 layout 方法，可以改写默认使用的布局约定。例如：
class ProductsController < ApplicationController
  layout "inventory"
  #...
end
# 这么声明之后，ProductsController 渲染的所有视图都将使用 app/views/layouts/inventory.html.erb 文件作为布局。
# 要想指定整个程序使用的布局，可以在 ApplicationController 类中使用 layout 方法：

class ApplicationController < ActionController::Base
  layout "main"
  #...
end

# 这么声明之后，整个程序的视图都会使用 app/views/layouts/main.html.erb 文件作为布局。

2.2.14.2 运行时选择布局
# 可以使用一个 Symbol，在处理请求时选择布局：
class ProductsController < ApplicationController
	layout :products_layout

	def show
		@product = Product.find(params[:id])
	end

	private
		def products_layout
			@current_user.special? ? "special" : "products"
		end
end

2.2.14.3 条件布局

# 在控制器中指定布局时可以使用 :only 和 :except 选项。这两个选项的值可以是一个方法名或者一个方法名数组，这些方法都是控制器中的动作：

class ProductsController < ApplicationController
  layout "product", except: [:index, :rss]
end

# 这么声明后，除了 rss 和 index 动作之外，其他动作都使用 product 布局渲染视图。

2.2.14.4 布局继承

# 布局声明按层级顺序向下顺延，专用布局比通用布局优先级高。例如：

2.2.15 避免双重渲染错误

大多数 Rails 开发者迟早都会看到一个错误消息：Can only render or redirect once per action（动作只能渲染或重定向一次）。这个提示很烦人，也很容易修正。出现这个错误的原因是，没有理解 render 的工作原理。

例如，下面的代码会导致这个错误：

def show
  @book = Book.find(params[:id])
  if @book.special?
    render action: "special_show"
  end
  render action: "regular_show"
end
如果 @book.special? 的结果是 true，Rails 开始渲染，把 @book 变量导入 special_show 视图中。但是，show 动作并不会就此停止运行，当 Rails 运行到动作的末尾时，会渲染 regular_show 视图，导致错误出现。解决的办法很简单，确保在一次代码运行路线中只调用一次 render 或 redirect_to 方法。有一个语句可以提供帮助，那就是 and return。下面的代码对上述代码做了修改：

def show
  @book = Book.find(params[:id])
  if @book.special?
    render action: "special_show" and return
  end
  render action: "regular_show"
end
千万别用 && return 代替 and return，因为 Ruby 语言操作符优先级的关系，&& return 根本不起作用。

注意，ActionController 能检测到是否显式调用了 render 方法，所以下面这段代码不会出错：

def show
  @book = Book.find(params[:id])
  if @book.special?
    render action: "special_show"
  end
end
# 如果 @book.special? 的结果是 true，会渲染 special_show 视图，否则就渲染默认的 show 模板。


2.3 使用 redirect_to 方法
# 响应 HTTP 请求的另一种方法是使用 redirect_to。如前所述，

render 告诉 Rails 构建响应时使用哪个视图（以及其他静态资源）。
redirect_to 做的事情则完全不同：告诉浏览器向另一个地址发起新请求。

# 例如，在程序中的任何地方使用下面的代码都可以重定向到 photos 控制器的 index 动作：

redirect_to photos_url

# redirect_to 方法的参数与 link_to 和 url_for 一样。有个特殊的重定向，返回到前一个页面：

redirect_to :back

2.3.1 设置不同的重定向状态码
# 调用 redirect_to 方法时，Rails 会把 HTTP 状态码设为 302，即临时重定向。如果想使用其他的状态码，例如 301（永久重定向），可以设置 :status 选项：
redirect_to photos_path, status: 301


2.3.2 render 和 redirect_to 的区别
def index
	@books = Book.al
end

def show
	@book = Book.find_by(id: params[:id])
	if @book.nil?
		render action: "index"
	end
end

# 在这段代码中，如果 @book 变量的值为 nil 很可能会出问题。
# 记住，render :action 不会执行目标动作中的任何代码，因此不会创建 index 视图所需的 @books 变量。
# 修正方法之一是不渲染，使用重定向：
redirect_to action: :index
# 这样修改之后，浏览器会向 index 动作发起新请求，执行 index 方法中的代码，一切都能正常运行。


2.4 使用 head 构建只返回报头的响应
head :bad_request
head :created, location: photo_path(@photo)





3 布局结构
# Rails 渲染响应的视图时，会把视图和当前模板结合起来。查找当前模板的方法前文已经介绍过。
# 在布局中可以使用三种工具把各部分合在一起组成完整的响应：

- 静态资源标签
- yield 和 content_for
- 局部视图


3.1 静态资源标签帮助方法
# 静态资源帮助方法用来生成链接到 Feed、JavaScript、样式表、图片、视频和音频的 HTML 代码。
# Rails 提供了六个静态资源标签帮助方法：

auto_discovery_link_tag
javascript_include_tag
stylesheet_link_tag
image_tag
video_tag
audio_tag

# 这六个帮助方法可以在布局或视图中使用，不过 auto_discovery_link_tag、javascript_include_tag 
# 和 stylesheet_link_tag 最常出现在布局的 <head> 中。

3.1.1 使用 auto_discovery_link_tag 链接到 Feed
# <%= auto_discovery_link_tag(:rss, {action: "feed"},
# 	{title: "RSS Feed"}) %>

# auto_discovery_link_tag 的标签选项有三个：

:rel：指定链接 rel 属性的值，默认值为 "alternate"；
:type：指定 MIME 类型，不过 Rails 会自动生成正确的 MIME 类型；
:title：指定链接的标题，默认值是 :type 参数值的全大写形式，例如 "ATOM" 或 "RSS"；


3.1.2 使用 javascript_include_tag 链接 JavaScript 文件
# javascript_include_tag 帮助方法为指定的每个资源生成 HTML script 标签。
# 如果启用了 Asset Pipeline，这个帮助方法生成的链接指向 /assets/javascripts/
# Rails 程序或引擎中的 JavaScript 文件可存放在三个位置：app/assets，lib/assets 或 vendor/assets。详细说明参见 Asset Pipeline 中的“静态资源的组织方式”一节。
# 文件的地址可使用相对文档根目录的完整路径，或者是 URL。例如，如果想链接到 app/assets、lib/assets 或 vendor/assets 文件夹中名为 javascripts 的子文件夹中的文件，可以这么做：

# <%= javascript_include_tag "main" %>

# Rails 生成的 script 标签如下：
<script src='/assets/main.js'></script>

# 同时引入 app/assets/javascripts/main.js 和 app/assets/javascripts/columns.js 可以这么做：
# <%= javascript_include_tag "main", "columns" %>

# 引入 app/assets/javascripts/main.js 和 app/assets/javascripts/photos/columns.js：
# <%= javascript_include_tag "main", "/photos/columns" %>

# 引入 http://example.com/main.js：
# <%= javascript_include_tag "http://example.com/main.js" %>

3.1.3 使用 stylesheet_link_tag 链接 CSS 文件

3.1.4 使用 image_tag 链接图片
# <%= image_tag "header.png" %>
# <%= image_tag "icons/delete.gif" %>
# <%= image_tag "icons/delete.gif", {height: 45} %>
# <%= image_tag "home.gif" %>
# <%= image_tag "home.gif", alt: "Home" %>
# <%= image_tag "home.gif", size: "50x20" %>
# <%= image_tag "home.gif", alt: "Go Home",
#                           id: "HomeImage",
#                           class: "nav_bar" %>


3.1.5 使用 video_tag 链接视频
# video_tag 帮助方法为指定的文件生成 HTML5 <video> 标签。默认情况下，视频文件存放在 public/videos 文件夹中。
# <%= video_tag "movie.ogg" %>
# 生成的代码如下：
# <video src="/videos/movie.ogg" />

# 和 image_tag 类似，视频的地址可以使用绝对路径，或者相对 public/videos 文件夹的路径。而且也可以指定 size: "#{width}x#{height}" 选项。video_tag 还可指定其他 HTML 属性，例如 id、class 等。
# video_tag 方法还可使用 HTML Hash 选项指定所有 <video> 标签的属性，包括：

poster: "image_name.png"：指定视频播放前在视频的位置显示的图片；
autoplay: true：页面加载后开始播放视频；
loop: true：视频播完后再次播放；
controls: true：为用户提供浏览器对视频的控制支持，用于和视频交互；
autobuffer: true：页面加载时预先加载视频文件；
把数组传递给 video_tag 方法可以指定多个视频：

<%= video_tag ["trailer.ogg", "movie.ogg"] %>
# 生成的代码如下：
<video><source src="trailer.ogg" /><source src="movie.ogg" /></video>


3.1.6 使用 audio_tag 链接音频

# audio_tag 帮助方法为指定的文件生成 HTML5 <audio> 标签。默认情况下，音频文件存放在 public/audio 文件夹中。

# <%= audio_tag "music.mp3" %>
# 还可指定音频文件的路径：
# <%= audio_tag "music/first_song.mp3" %>


3.2 理解 yield
# 在布局中，yield 标明一个区域，渲染的视图会插入这里。最简单的情况是只有一个 yield，此时渲染的整个视图都会插入这个区域：

<html>
  <head>
  </head>
  <body>
  <%= yield %>
  </body>
</html>

# 布局中可以标明多个区域：

<html>
  <head>
  <%= yield :head %>
  </head>
  <body>
  <%= yield %>
  </body>
</html>

# 视图的主体会插入未命名的 yield 区域。要想在具名 yield 区域插入内容，得使用 content_for 方法。

3.3 使用 content_for 方法
# content_for 方法在布局的具名 yield 区域插入内容。例如，下面的视图会在前一节的布局中插入内容：
<% content_for :head do %>
  <title>A simple page</title>
<% end %>
 
<p>Hello, Rails!</p>


3.4 使用局部视图
# 局部视图可以把渲染过程分为多个管理方便的片段，把响应的某个特殊部分移入单独的文件。

3.4.1 具名局部视图

# 在视图中渲染局部视图可以使用 render 方法：

# <%= render "menu" %>


3.4.2 使用局部视图简化视图

# 局部视图的一种用法是作为“子程序”（subroutine），把细节提取出来，以便更好地理解整个视图的作用。例如，有如下的视图：

<%= render "shared/ad_banner" %>
 
<h1>Products</h1>
 
<p>Here are a few of our fine products:</p>
...
 
# <%= render "shared/footer" %>


3.4.3 局部布局

# 和视图可以使用布局一样，局部视图也可使用自己的布局文件。例如，可以这样调用局部视图：

# <%= render partial: "link_area", layout: "graybar" %>

3.4.4 传递本地变量

# 本地变量可以传入局部视图，这么做可以把局部视图变得更强大、更灵活。例如，可以使用这种方法去除新建和编辑页面的重复代码，但仍然保有不同的内容：

<h1>New zone</h1>
# <%= render partial: "form", locals: {zone: @zone} %>


3.4.5 渲染集合

# 渲染集合时使用局部视图特别方便。通过 :collection 选项把集合传给局部视图时，会把集合中每个元素套入局部视图渲染：

<h1>Products</h1>
<%= render partial: "product", collection: @products %>
<p>Product Name: <%= product.name %></p>


3.4.6 本地变量

# 要在局部视图中自定义本地变量的名字，调用局部视图时可通过 :as 选项指定：

# <%= render partial: "product", collection: @products, as: :item %>

3.4.7 间隔模板

# <%= render partial: @products, spacer_template: "product_ruler" %>
# Rails 会在两次渲染 _product 局部视图之间渲染 _product_ruler 局部视图（不传入任何数据）。

3.4.8 集合局部视图的布局

# 渲染集合时也可使用 :layout 选项。

# <%= render partial: "product", collection: @products, layout: "special_layout" %>
# 使用局部视图渲染集合中的各元素时会套用指定的模板。和局部视图一样，当前渲染的对象以及 object_counter 变量也可在布局中使用。



3.5 使用嵌套布局

# <head>
#   <title><%= @page_title or "Page Title" %></title>
#   <%= stylesheet_link_tag "layout" %>
#   <style><%= yield :stylesheets %></style>
# </head>


# <% content_for :stylesheets do %>
#   #top_menu {display: none}
#   #right_menu {float: right; background-color: yellow; color: black}
# <% end %>






























