gem-acts_as_follower.rb

1.0   代码片段
1.1 
# _follow_user.html.erb
<% unless user == current_user %>
  <% if current_user.following?(user) %>
  	<%= button_to('Un-Follow #{user.nickname}', user_follow_path(user.to_param, current_user.get_follow(user).id), :method => :delete, :remote => true) %>
  <% else %>
  	<%= button_to("Follow #{user.nickname}", user_follow_path(user.to_param), :remote => true) %>
  <% end %>
<% end %>

# create.js.erb
$('#follow_user').html('<%= escape_javascript(render :partial => "shared/follow_user", :locals => {:user => @user}) %>');

#jQuery


# destroy.js.erb
$('#follow_user').html('<%= escape_javascript(render :partial => "shared/follow_user", :locals => {:user => @user}) %>');



#  FollowsController.rb
class FollowsController < ApplicationController
	def create
		@user = User.find(params[:user_id])
		current_user.follow(@user)
	end

	def destroy
		@user = User.find(params[:user_id])
		current_user.stop_following(@user)
	end
end


#  routes.rb

resources :users, :only => [:index, :show] do
	resources :follows, :only => [:create, :destroy]
end

# show.html.erb

<% if user_signed_in? %>
	<div id="follow_user">
		<%= render :partial => "shared/follow_user", :locals => {:user => @user} %>
	</div>
<% end %>


#  user.rb
class User < ActiveRecord::Base
	acts_as_follower
	acts_as_followable
end


















