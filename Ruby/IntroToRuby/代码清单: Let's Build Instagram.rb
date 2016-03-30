代码清单: Let is Build Instagram.rb

1.0
# Protecting Personal Posts
# Did you have a win? Here’s how I implemented this feature:

    # - if @post.user.id == current_user.id
    #   .text-center.edit-links
    #     = link_to "Cancel", posts_path
    #     |
    #     = link_to "Edit Post", edit_post_path(@post)
    # - else
    #   .text-center.edit-links
    #     =link_to "Cancel", posts_path



# Here’s how I solved this problem. First, I created a private method in the posts controller below the other two private methods. It looks like this:
# controllers/posts_controller.rb
def owned_post  
  unless current_user == @post.user
    flash[:alert] = "That post doesn't belong to you!"
    redirect_to root_path
  end
end  
# Then I inserted a before_action at the top of the controller, specifying the owned_post method for the edit, update and destroy actions only.

before_action :owned_post, only: [:edit, :update, :destroy]  

# So unless you meet the requirements set by the owned_post method, you’ll be redirected back to the root route with a nice little message before any of the actions in the controller are called.



2.0  Magic Commenting, aka AJAX

= form_for([post, post.comments.build], remote: true) do |f|



respond_to do |format|  
  format.html { redirect_to root_path }
  format.js
end  


3.0   首页 加载更多

# Finally, I'd like to show you a new file called index.js.erb.

# This file is very similar in nature to the create.js.erb and destroy.js.erb files that we created for the sake of our comments in the last article. It contains jQuery for the sake of manipulating the DOM once the 'LOAD MORE' link is clicked and we've been given some data to use in our view.

# The following will live in app/views/posts/index.js.erb.

$('#posts').append("<%= escape_javascript(render 'posts')%>");
$('#paginator').html("<%= escape_javascript(link_to_next_page(@posts, 'LOAD MORE', remote: true, id: 'load_more'))%>");
if (!$('#load_more').length) { $('#paginator').remove(); }  
	
# What's happening here? In the first line, we append the #posts div with the new _posts.html.haml partial, ie. we add it on the bottom.

# In the second line, we select the #paginator div and set it's contents to our link_to_next_page kaminari helper method. This will 'refresh' our link, meaning it will take us continually onto the next page as we keep clicking, rather than constantly giving us a link for page 2 and will also reset it's position.

# In the third line, we remove the #paginator div if the #load_more element (our link) doesn't exist. This is purely to remediate some styling quirks that I was seeing once I'd run out of posts to paginate. Feel free to remove that line and experiment for yourself.





































