Rails & Ruby 知识点.rb


1.0 default_scope is Evil
class Post
	default_scope where(published: true).order("created_at desc")
end


2.0 erb,实现 <h3> <%= article.title %> </h3>

<%=h3= link_to article.title, article % >   
或者
<h3><%= link_to article.title, article %></h3>


3.0  attr_accessible 什么意思
attr_accessible is not available for Rails version 4+. 
You would have to go with strong parameters.


4.0  as: :date 什么意思


5.0  acts_as_taggable_on tag_cloud throws undefined method 'empty?' for nil:NilClass
#

# I had the same issue and this worked for me, I hope it will work for you too.

# Add a before filter in your post_controller like this.

class PostsController < ApplicationController
...
  before_action :tag_cloud
...
  def tag_cloud
    @tags = Post.tag_counts_on(:tags).order('count desc').limit(20)
  end
...
end
# After doing this I had also a routes error in this line:

link_to tag.name, { :action => :tag, :id => tag.name }, :class => css_class
# I had to change the line like this:

<%= link_to tag.name, tag_path(tag.name), :class => css_class % >

# Now everything it is working on my app. I hope this will help you. 

5.1
@tags = ActsAsTaggableOn::Tag.all(:order=>'name')

<% if @tags.count > 0 %>
  <ul>
    <% @tags.each do |tag| %>
      <li><%= link_to tag.name, tagged_url(:tag => tag.name) %></li>
    <% end %>
  </ul>
<% else %>
  <p>There are no tags on the system.</p>
<% end % >


6.0 --skip-stylesheet

略过 stylesheet 文件


7.0  
<td><%= link_to '删除', @post, method: :delete, data: { confirm: 'Are you sure?' } %></td>



8.0  
用       <% @heros.each do |hero| % >
		<% end % >
方法时，要把循环方法放在 block 外面，这样才是循环block，而不会出现block 连在一起分不开的情况


9  Add style/image to button_to
<%= link_to image_tag("rails.png"), {:controller => 'foo', :action => "bar" } % >

10. 配置 carrierwave 时错误
ExecJS::RuntimeError in Heros#show
Showing /Users/zhangxiaodong/projects/heroWiki01/app/views/layouts/application.html.erb where line #5 raised:
SyntaxError: [stdin]:7:32: reserved word 'function'

上面错误代码原因是 js 代码的问题，注释掉application.coffee 里面的代码后，就可以正常运行了。


11 
	def tag_list
		tags.map(&:name).join(", ")
	end


12.  layouts 布局

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

	<% render 'layouts/shim' %>
</head>
<body>
	<%= render 'layouts/header' %>
	
	<div class="container-fluid">
		<div class="row">
			<%= yield :sidebar %>
			<%= yield %>
		</div>
	</div>

	<%= render 'layouts/footer' %>
	<% debug(params) if Rails.env.development? %>
</body>
</html>


###
<footer class="footer navbar-fixed-bottom">
	<div class="container">
		<nav>
			<ul>
				<li><%= link_to "Contact Us", "#" %></li>
				<li><%= link_to "Contact Us", "#" %></li>
				<li><%= link_to "Contact Us", "#" %></li>
				<li><%= link_to "Contact Us", "#" %></li>
				<li><%= link_to "Contact Us", "#" %></li>
			</ul>
		</nav>
	</div>
</footer>


13. 顶部导航和登陆注册按钮和 devise 结合。

	<nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-3" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Home</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-3">
          
          <% if user_signed_in? %>
            <%= link_to destroy_user_session_path, method: :delete do %>
              <button type="button" class="btn btn-default navbar-btn">Log Out</button>
            <% end %>

              <div class="navbar-right navbar-brand">Hello, <%= current_user.email %></div>
          <% else %>
              <%= link_to new_user_session_path do %>
                <button type="button" class="btn btn-default navbar-btn">Log In</button>
              <% end %>
          <% end %>

        </div>
      </div>
    </nav>

13.1 example2
	<% if user_signed_in? %>
		Welcome, <%= current_user.email %>
		<%= link_to "Log out", destroy_user_session_path, method: :delete %>
	<% else %>
		<%= link_to "Sign In", new_user_session_path %>
	<% end %>

14  文字居中
<h2 style="text-align:center"><%= movie.title %></h3>


15 input 输入框底下提示话语
<p class="help-block">一句话简单描述.</p>


16  在 rails c 中指定 user 为 admin

rails c
Question.first
Question.first.destroy
Question.count
u = User.first
u.admin
u.admin = true
u.save


17  kaminari   error
 def index
    if params[:tag]
      @lists = List.tagged_with(params[:tag])
    else
      @lists = List.all
    end
    @lists = @lists.order(created_at: :desc).page(params[:page]).per(9)
  end

















