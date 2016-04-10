1.0 適合使用 Cells 使用的場景
例如在設計 User Profile 頁面的時候，我們會遇到規格裡面希望有這樣的設計：

顯示這個使用者最近的文章五篇
顯示這個使用者喜歡過的文章五篇
顯示這個使用者近期的五篇留言
設計上點擊時「不切換分頁」，也「不 Ajax」，點下去馬上要能看到。


在 controller 裡的 code 會是這樣的


# app/controllers/users_controller.rb
class UsersController < ApplicationController
	def show
		@user = User.find(params[:id])
		@recent_posts = @user.recent_posts.limit(5)
		@favorite_posts = @user.favorite_posts.limit(5)
		@recent_comments = @user.comments.limit(5)
	end
end


而在 View 裡面的 code 會是這樣的

# app/views/users/show.html.erb

 # <%= render :partial => "users/recent_post", :collection => @recent_posts %>
 # <%= render :partial => "users/favorite_post", :collection => @favorite_posts %>
 # <%= render :partial => "users/recent_comment", :collection => @recent_comments %>




2.0 衍生的問題
實作這個頁面時，開發者會遇到一些衍生的 issue。這個頁面一次要撈太多資料了，所以需要上 Cache。那麼 Cache 的標準
是依照什麼呢？是針對 User 的 Update At 嗎？

好像不太有效率。假如我希望 Recent Post 與 Recent Comments 被 Cache 的時間長短不同呢？

......

光用想像的，你應該可以想像這個 action 和 view 的程式碼馬上就會被污染到不堪入目...


3.0 用 Cells 改寫
如果用 Cells 改寫，那麼程式碼會是這樣的。

# app/controllers/users_controller.rb

class UsersController < ApplicationController
	def show
		@user = User.find(params[:id])
	end
end

# app/cells/user_cell.rb
class UserCell < Cell::Rails
	def recent_post(args)
		@user = args[:user]
		@recent_posts = @user.recent_posts.limit(5)
		render
	end

	def favorite_posts(args)
		@user = args[:user]
		@favorite_posts = @user.favorite_posts.limit(5)
		render
	end

	def recent_comments(args)
		@user = args[:user]
		@recent_comments = @user.comments.limit(5)
		render
	end
end



原先的 View 改成

# app/views/users/show.html.erb

# <%= render_cell :user, :rencent_posts, :user => :user %>
# <%= render_cell :user, :favorite_posts, :user => :user %>
# <%= render_cell :user, :recent_comments, :user => :user %>



4.0 看起來好像沒什麼差別？ well，你可以這麼做：

# app/cells/user_cell.rb

class UserCell < Cell::Rails

 cache :recent_posts, :expires_in => 1.hours
 cache :favorite_posts, :expires_in => 3.hours
 cache :recent_comments, :expires_in => 5.hours
 
  def recent_posts(args)
    ...
  end
  def favorite_posts(args) 
    ...
  end
  def recent_comments(args)
    ...
  end
  
end

馬上就可以把 Cache 和邏輯封裝做的非常漂亮。


补充：

http://blog.xdite.net/posts/2013/09/01/cells-partial-cache-3






