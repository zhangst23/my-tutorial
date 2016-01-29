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
















  










