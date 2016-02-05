
在 Rails 中使用 JavaScript

1 Ajax 简介

$.ajax(url: "/test").done (html) ->
  $("#{results}").append html

2 非侵入式 JavaScript

<a href="#" onclick="this.style.backgroundColor='#990000'">Paint it red</a>

# 点击链接后，链接的背景会变成红色。这种用法的问题是，如果点击链接后想执行大量代码怎么办？

<a href="#" onclick="this.style.backgroundColor='#009900';this.style.color='#FFFFFF';">Paint it green</a>

# 太别扭了，不是吗？我们可以把处理点击的代码定义成一个函数，用 CoffeeScript 编写如下：

paintIt = (element, backgroundColor, textColor) ->
  element.style.backgroundColor = backgroundColor
  if textColor?
    element.style.color = textColor

# 然后在页面中这么做：

<a href="#" onclick="paintIt(this, '#990000')">Paint it red</a>

# 这种方法好点儿，但是如果很多链接需要同样的效果该怎么办呢？

<a href="#" onclick="paintIt(this, '#990000')">Paint it red</a>
<a href="#" onclick="paintIt(this, '#009900', '#FFFFFF')">Paint it green</a>
<a href="#" onclick="paintIt(this, '#000099', '#FFFFFF')">Paint it blue</a>

# 非常不符合 DRY 原则。为了解决这个问题，我们可以使用“事件”。在链接上添加一个 data-* 属性，然后把处理程序绑定到拥有这个属性的点击事件上：

paintIt = (element, backgroundColor, textColor) ->
  element.style.backgroundColor = backgroundColor
  if textColor?
    element.style.color = textColor

$ ->
  $("a[data-background-color]").click ->
    backgroundColor = $(this).data("background-color")
    textColor = $(this).data("text-color")
    paintIt(this, backgroundColor, textColor)


#
<a href="#" data-background-color="#990000">Paint it red</a>
<a href="#" data-background-color="#009900" data-text-color="#FFFFFF">Paint it green</a>
<a href="#" data-background-color="#000099" data-text-color="#FFFFFF">Paint it blue</a>   

# 我们把这种方法称为“非侵入式 JavaScript”，因为 JavaScript 代码不再和 HTML 混用。我们把两中代码完全分开，这么做易于修改功能。我们可以轻易地把这种效果应用到其他链接上，只要添加相应的 data 属性就行。所有 JavaScript 代码都可以放在一个文件中，进行压缩，每个页面都使用这个 JavaScript 文件，因此只在第一次请求时加载，后续请求会直接从缓存中读取。“非侵入式 JavaScript”带来的好处太多了。

# Rails 团队极力推荐使用这种方式编写 CoffeeScript 和 JavaScript，而且你会发现很多代码库都沿用了这种方式。


3 内建的帮助方法
3.1 form_for

# form_for 方法协助编写表单，可指定 :remote 选项，用法如下：

<%= form_for(@post, remote: true) do |f| %>
  ...
<% end %>

# 注意 data-remote="true" 属性，现在这个表单不会通过常规的提交按钮方式提交，而是通过 Ajax 提交。

$(document).ready ->
  $("#new_post").on("ajax:success", (e, data, status, xhr) ->
    $("#new_post").append xhr.responseText
  ).on "ajax:error", (e, xhr, status, error) ->
    $("#new_post").append "<p>ERROR</p>"

3.2 form_tag
# form_tag 方法的功能和 form_for 类似，也可指定 :remote 选项，如下所示：

<%= form_tag('/posts', remote: true) do %>
  ...
<% end %>
# 生成的 HTML 如下：

<form accept-charset="UTF-8" action="/posts" data-remote="true" method="post">
  ...
</form>
# 其他用法都和 form_for 一样。详细介绍参见文档。

3.3 link_to
# link_to 方法用来生成链接，可以指定 :remote，用法如下：

<%= link_to "a post", @post, remote: true %>
生成的 HTML 如下：

<a href="/posts/1" data-remote="true">a post</a>
# 绑定的 Ajax 事件和 form_for 方法一样。下面举个例子。加入有一个文章列表，我们想只点击一个链接就删除所有文章，视图代码如下：

# <%= link_to "Delete post", @post, remote: true, method: :delete %>

# CoffeeScript 代码如下
$ ->
  $("a[data-remote]").on "ajax:success", (e, data, status, xhr) ->
    alert "The post was deleted."


3.4 button_to
# button_to 方法用来生成按钮，可以指定 :remote 选项，用法如下：

<%= button_to "A post", @post, remote: true %>

# 生成的 HTML 如下：

<form action="/posts/1" class="button_to" data-remote="true" method="post">
  <div><input type="submit" value="A post"></div>
</form>


4 服务器端处理
# Ajax 不仅需要编写客户端代码，服务器端也要做处理。Ajax 请求一般不返回 HTML，而是 JSON。下面详细介绍处理过程。

4.1 一个简单的例子
# 假设在网页中要显示一系列用户，还有一个新建用户的表单，控制器的 index 动作如下所示：
class UsersController < ApplicationController
  def index
    @users = User.all
    @user = User.new
  end
  # ...

# index 动作的视图（app/views/users/index.html.erb）如下：
# <b>Users</b>

# <ul id="users">
# <%= render @users %>
# </ul>

# <br>

# <%= form_for(@user, remote: true) do |f| %>
#   <%= f.label :name %><br>
#   <%= f.text_field :name %>
#   <%= f.submit %>
# <% end %>


# app/views/users/_user.html.erb 局部视图如下：

<li><%= user.name %></li>

# index 动作的上部显示用户，下部显示新建用户的表单。

# 下部的表单会调用 UsersController 的 create 动作。因为表单的 remote 属性为 true，所以发往 UsersController 的是 Ajax 请求，使用 JavaScript 处理。要想处理这个请求，控制器的 create 动作应该这么写：

# app/controllers/users_controller.rb
# ......
def create
  @user = User.new(params[:user])

  respond_to do |format|
    if @user.save
      format.html { redirect_to @user, notice: 'User was successfully created.' }
      format.js {}
      format.json { render json: @user, status: :created, location: @user }
    else
      format.html { render action: "new" }
      format.json { render json: @user.errors, status: :unprocessable_entity }
    end
  end
end

# 注意，在 respond_to 的代码块中使用了 format.js，这样控制器才能处理 Ajax 请求。然后还要新建 app/views/users/create.js.erb 视图文件，编写发送响应以及在客户端执行的 JavaScript 代码。

$("<%= escape_javascript(render @user) %>").appendTo("#users");


5 Turbolinks
# Rails 4 提供了 Turbolinks gem，这个 gem 可用于大多数程序，加速页面渲染。

5.1 Turbolinks 的工作原理
# Turbolinks 为页面中所有的 <a> 元素添加了一个点击事件处理程序。如果浏览器支持 PushState，Turbolinks 会发起 Ajax 请求，处理响应，然后使用响应主体替换原始页面的整个 <body> 元素。最后，使用 PushState 技术更改页面的 URL，让新页面可刷新，并且有个精美的 URL。

# 要想使用 Turbolinks，只需将其加入 Gemfile，然后在 app/assets/javascripts/application.js 中加入 //= require turbolinks 即可。

# 如果某个链接不想使用 Turbolinks，可以在链接中添加 data-no-turbolink 属性：

<a href="..." data-no-turbolink>No turbolinks here</a>.

5.2 页面内容变更事件
# 编写 CoffeeScript 代码时，经常需要在页面加载时做一些事情。在 jQuery 中，我们可以这么写：

$(document).ready ->
  alert "page has loaded!"
  
# 不过，因为 Turbolinks 改变了常规的页面加载流程，所以不会触发这个事件。如果编写了类似上面的代码，要将其修改为：

$(document).on "page:change", ->
  alert "page has loaded!"

















Working with JavaScript in Rails.rb

# 自带的 Ajax Helpers

#1. form_for
<%= form_for(@post, remote: true) do |f| %>
  ...
<% end %>

# 提交成功与失败可以透过 ajax:success 与 ajax:error 事件，来附加内容至 DOM：
$(document).ready ->
	$("#new_post").on("ajax:success",(e, data, status, xhr) ->
		$("#new_post").append xhr.responseText
		).bind "ajax:error", (e, xhr, status, error) ->
		$("#new_post").append "<p>ERROR</p>"


# 2. form_tag
<%= form_tag('/posts', remote: true) %>




# 3. link_to
<%= link_to "a post", @post, remote: true %>
会生成
<a href="/posts/1" data-remote="true">a post</a>



# 4. button_to


<%= button_to "A post", @post, remote: true %>

<% end %>

# 服务器端的考量
# 简单的例子
# 想像你有许多用户，你想给他们显示建立新用户的表单。而 Controller 的 index action：

class UsersController < ApplicationController
	def index
		@users = User.all
		@user = User.new
	end
	# ...

end

# 以及 index View (app/views/users/index.html.erb)：
<b>Users</b>

<ul id="UsersController">
	<%= render @users %>
</ul>

<br>

<%= form_for(@user, remote: true) do |f| %>
  <%= f.label :name %><br>
  <%= f.text_field :name %>
  <%= f.submit %>
<% end %>

# app/views/users/_user.html.erb Partial：
<li><%= user.name %></li>

# index 页面上半部列出用户，下半部提供新建用户的表单。




# 下面的表单会呼叫 Users Controller 的 create action。因为表单有 remote: true 这个选项，Request 会使用 Ajax Post 到 Users Controller，等待 Controller 回应 JavaScript。处理这个 Request 的 create action 会像是：
# app/controllers/users_controller.rb
  # ......
  def create
  	@user = User.new(params[:user])

  	respond_to do |format|
  		if @user.save
  			format.html { redirect_to @user, notice: 'User was successful created.' }
  			format.js {}
  			format.json { render json: @user, status: :created, location: @user }
  		else
  			format.html { render action: "new" }
  			format.json { render json: @user.errors, status: :unprocessable_entity }
  		end
  	end
  end


# 注意 respond_to 区块内的 format.js，这是 Cotroller 回应 Ajax Request 的地方。create action 对应 app/views/users/create.js.erb：

$("<%= escape_javascript(render @user) %>").appendTo("#users");
















  










