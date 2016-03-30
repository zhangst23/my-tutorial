cancan 角色权限设计最佳实践.rb
http://blog.xdite.net/posts/2012/07/30/cancan-rule-engine-authorization-based-library-1/

1.0  多種角色的權限設計難題

# 當只有 user 和 admin 的情況下，你可以在 view 裡面單純的做出這樣的設計
<% if user.is_admin ? %>
	<%= link_to("Admin Pannel", admin_panel_path) %>
<% end %> >

# 並且在 controller 裡面加上權限判斷
class Admin::ArticleController < ApplicationController
	before_filter :require_is_admin
end

但一段時間之後，User Story 被加進了這樣的需求:

	# 使用者可以被設定為「editor」
	# 擁有「editor」角色的使用者，可以進入 admin 後台發表、編輯文章
	# 擁有「edtior」角色的使用者，進入 admin 後台內的活動範圍僅限縮在文章後台內
	# 擁有「edtior」角色的使用者，進入 admin 後台內，不可以看到其他後台選項。

身為開發者的你，要如何在現有後台內加入這樣的設計？

「針對多種條件執行多種動作」，此類的使用者需求，無論是使用 if/else，甚至是 case when，架構還是不免會一團混亂。與其承襲舊思路，不如啟用新想法「Rule Engine」實作：預先設計撰寫一套邏輯規則引擎，而後程式針對預設的規則進行邏輯判斷後執行。

而「角色權限」的設計需求上，正特別適合用 Rule Engine 這樣的觀念去建構。Rails 界知名的 authorization library cancan 正是以此作為基礎。 

1.1  Cancan 可以做到的：介面單純化
# cancan 希望做到的是，把權限判定的處理部分從 Helper / Controller / View 裡面，全部移到 app/models/ability.rb 進行判定。也因此可以做到
# View 只需要判斷是否可以執行動作，而不必問是否有權限
<% if can? :update, @article %>
	<%= link_to "Edit", edit_article_path(@article) %>
<% end %> >

# Controller 不需要手動判斷是否具有權限
class ArticlesController < ApplicationController
	authorize_resource

	def show
		# @article is already authorized
	end
end

# 但驚人的是 ** view 的權限會是與 controller 的權限判定規則 ** 卻是一致的。（以往「自刻」權限判定，往往加了 view 卻會忘記 controller, 加了 controller 卻會忘記 view ）


1.2   Cancan 希望做到的：權限中心化管理
# 而是否有權限存取，則全交給 app/models/ability.rb 去判斷處理
class Ability
	include CanCan::Ability

	def initialize(user)

		if user.blank?
			# not logged in

			cannot :manage, :all
			basic_read_only
		elsif user.has_role?(:admin)
			# admin

			can :manage, :all
		elsif user.has_role?(:member)

			can :create, Topic
			can :update, Topic do |topic|
				(topic.user_id == user.id)
			end

			can :destroy, Topic do |topic|
				(topic.user_id == user.id)
			end

			basic_read_only
		else
			# banned or unknown situation

			cannot :manage, :all
			basic_read_only
		end
	end

	protected

	def basic_read_only
		can :read, Topic
		can :list, Topic
		can :search, Topic
	end
end

# cancan 是一套相當 powerful 的權限管理系統，但是它的文件卻相當不好讀，第一次想使用 cacan的 developer 很難從文件上找到自己想要的範例以及 api，或者了解其原理構造。如果沒有先給一些基礎範例，往往會是寸步難行。

# 下一篇我會深入頗析 Cancan 更深的設計原理，讓大家更看得懂 cancan 的 API 到底想幹什麼....。




2.0  使用Cancan 的限制：RESTful controller （resource）

# 一般新進開發者會被 cancan 這兩個 API 搞得七葷八素：load_and_authorize_resource、authorize_resource。
# 這是因為 cancan 並沒有明顯的在 README 上做出說明：cancan 在使用上是有架構的限制：

* 必須為 RESTful resource
# （cancan 直接假設了你一定使用 RESTful，畢竟這年頭誰還在寫 non-RESTful …?）

* resource 必須與 Controller 同名
# （@article 與 ArticlesController）

2.1  load_and_authorize_resource
# load_and_authorized_resource 做了兩件事：
def load_and_authorize_resource
	load_resource
	authorize_resource
end

# load_resource 作什麼呢？: loard_resource => load_resource_instance
def load_resource_instance
	if !parent? && new_actions.include?(@params[:action].to_sym)
		build_resource
	elsif id_param || @options[:singleton]
		find_resource
	end
end

# okay，這段的作用等於如果你在 Controller 裡面下了 load_resource，cancan 會自作聰明的幫你 自動 在每一個 action 塞一個 instance 下去
lass ArticlesController < ApplicationController
	load_resource

	def new
	end

	def show
		# @article is already loaded
	end
end

# 如果是 new 這個 action，效果會等於
def new
	@article = Article.new
end
# 如果是 show 這個 action，效果會等於
def show
	@article = Article.find(params[:id])
end

# 有好處也有壞處，好處是…你不需要自己打一行 code，壞處就是不熟 cancan 的人，找不到 @article 在哪裡會驚慌失措…
# load_resource 還有一些其他進階用法，在 controller_additions.rb 裡面有不少說明...

2.2   authorize_resource
# authorize_resource 就是對 resource 判斷權限（根據 CanCan::Ability 裡的權限表）。
# 而這個 resource 必定是與同名的 instance。
# 如果是 ArticlesController 對應的必然是 @article。
# 但是你會想說這樣慘了？萬一我在 ArticlesController 裡面要用 @post 怎麼辦呢？
# 你可以在 controller 裡面指定 resource instance 的 name 要用什麼名字: authorize_resource :post
lass ArticlesController < ApplicationController
  authorize_resource :post
  
  def new
    @post = Article.new
  end
  
  def show
    @post = Article.find(params[:id])
  end
end
# Ability 裡面要這樣下

  can :read, Post
  can :create, Post
  can :update, Post


2.3    resource 規則小結
# 所以 cancan 裡面的 resource 第一個會去吃 controller 的名稱當成 resource name，如果是 ArticlesController，instance 就會是 @article，而在 ability 裡面就會是 can :read, Article。這是在假設你已經使用同名設計 resource & controller 的情況下。
# 如果非同名。你可以做出指定：authorize_resource :post，雖然是 ArticlesController，但是這一組的 resource 名稱為 post，所以 instance 就會是 @post，而在 ability 裡面就會是 can :read, Post。

一般開發者常會誤會的是

	# ability 會綁到 model，實際上不是
	# controller 名稱要與 @instance 名稱相同，實際上不一定
	# @instance 要與 model 同名，實際上不用
	# ability 吃的應該是 controller name，實際上不一定（吃的是 resource name，且可以被指定）。

Cancan 吃的是 resource，而且自作聰明的假設了大家「應該」都同名，而且 README example 也是使用「同名」，才會造成了這麼多的誤解…

如果你有更多疑問，可以直接看 source code 裡面的 這一支controller_resource.rb，相信會讓你對整個架構更加的清楚...

2.4   小結
這一節解釋了開發者認為最難懂的 load_and_authorize_resource、authorize_resource。下一節我們要來講 ability 要如何設計



3.0   角色判斷 current_ability
# 這是一段普通的 ability.rb 權限範例 code。
class Ability
	include CanCan::Ability

	def initialize(user)

		if user.blank(user)
			# not logged in
			cannot :manage, :all
			basic_read_only
		elsif user.has_role?(:admin)
			# admin
			can :manage, :all
		end
	end

	protected

	def basic_read_only
		can :read,	Topic
		can :list,	Topic
		can :search,	Tipic
	end
end

# 一般開發者最有疑問的是 def initialize(user) 這一段程式碼中的 user 到底是怎麼來的？怎麼會沒頭沒尾的天外飛來一個 user，然後對這個 user 進行角色判斷就可以動了？

# 這一段要追溯到...lib/controller_additions.rb 中的這一段 current_ability。

# cancan 裡面去判斷是否有權限的一直是 current_abibilty，而 current_abibilty initialize 的方式就是塞 current_user 進去。
def current_ability
	@current_ability ||= ::Ability.new(current_user)
end

# 所以 initialize(user) 裡的 if user.blank? 其實就等於 if current_user.blank?（若沒登入）。
# 這樣去解讀程式碼，看起來就好理解很多了…



4.0  權限類別解說 :manage, :all, ..etc.
# cancan 裡面用了一堆自定義縮寫，如 :manage、:read、:update、:all，讓人不是很了解在做什麼。

	# :manage: 是指這個 controller 內所有的 action
	# :read : 指 :index 和 :show
	# :update: 指 :edit 和 :update
	# :destroy: 指 :destroy
	# :create: 指 :new 和 :crate

# 而 :all 是指所有 object (resource)
# 當然，不只是 CRUD 的 method 才可以被列上去，如果你有其他非 RESTful 的 method 如 :search，也是可以寫上去..，只是要一條一條列上去，有點麻煩就是了。



4.1   組合技：alias_action
# cancan 還提供了組合技，要是嫌原先的 :update, :read 這種組合包不夠用。還可以用 alias_action 自己另外再組。例如把 :update 和 :destroy 組成 :modify。
alias_action :update, :destroy, :to => :modify
can :modify, Comment

4.2   組合技: 自訂 method
# 要是你嫌每個角色都要一條一條把權限列上去，超麻煩。可以把一些共通的權限包成 method。用疊加 method 上去的方式列舉。比如把基礎權限都包成 basic_read_only、account_manager_only, etc…

   def basic_read_only
    can :read,    Topic
    can :list,    Topic
    can :search,  Topic
  end

4.3  針對物件狀態控管
# 在 User story 中，使用者固然 can :update, Topic，但還是讓人覺得覺得哪裡有點怪怪的？
# 是的。使用者應該只能編輯和修改屬於自己的文章，can :update, Topic 只有說使用者可以「修改文章」啊（等於可以修改所有文章） XD
# 所以 ability.rb 就要這樣設計了
can :update, Topic do |topic|
	(topic.user_id == user.id)
end

can :destroy, Topic do |topic|
	(topic.user_id == user.id)
end

# 可以玩的更加进阶
can :publish, Post do |post|
	( post.draft? || post.submitted? ) && !post.published?
end




###################### 以下是ruby-china的ability.rb文件 #######################
class Ability
	include CanCan::Ability

	def initialize(user)
		if user.blank?
			#not logged in
			cannot :manage, :all
			basic_read_only

		elsif user.has_role?(:admin)
			#admin
			can :manage, :all
		elsif user.has_role?(:member)
			# Topic
			unless user.newbie?
				can :create, Topic
			end
			can :favorite, Topic
			can :unfavorite, Topic
			can :follow, Topic
			can :unfollow, Topic
			can :update, Topic do |topic|
				(topic.user_id == user.id)
			end
			can :change_node, Topic do |topic|
				topic.lock_node == false || user.admin?
			end
			can :destroy, Topic do |topic|
				(topic.user_id == user.id) && (topic.replies_count == 0)
			end

			# Reply
			# 新手用户晚上禁止回帖，防 spam，可在面板设置是否打开
			unless user.newbie? &&
				(SiteConfig.reject_newbie_reply_in_the_evening == 'true') &&
				(Time.zone.now.hour < 9 || Time.zone.now.hour > 22)
			  can :create, Reply
			end
			can :update, Reply do |reply|
				reply.user_id == user.id
			end
			can :destroy, Reply do |reply|
				reply.user_id == user.id
			end

			# Note
			can :create, Note
			can :update, Note do |note|
				note.user_id == user.id
			end
			can :destroy, Note do |note|
				note.user_id == user.id
			end
			can :read, Note do |note|
				note.user_id == user.id				
			end
			can :read, Note do |note|
				note.user_id == user.id
			end
			can :read, Note do |note|
				note.publish == true
			end

			#wiki
			if user.has_role?(:wiki_editor)
				can :create, Page
				can :edit, Page do |page|
					page.locked == false
				end
				can :update, Page do |page|
					page.locked == false
				end
			end

			# Photo
			can :tiny_new, Photo
			can :create, Photo
			can :update, Photo do |photo|
				photo.user_id == photo.id
			end
			can :destroy, Photo do |photo|
				photo.user_id == photo.id
			end

			# Comment
			can :create, Comment
			can :update, Comment do |comment|
				comment.user_id == comment.id
			end
			can :destroy, Comment do |comment|
				comment.user_id == comment.id
			end

			# Site
			if user.has_role?(:site_editor)
				can :create, Site
			end

			basic_read_only
		else
			# banned or unknown situation
			cannot :manage, :all
			basic_read_only
		end
	end

	protected

	def basic_read_only
		can :read, Topic
		can :feed, Topic
		can :node, Topic

		can :read, Reply

		can :read, Page
		can :recent, Page
		can :preview, Page
		can :comments, Page

		can :preview, Note

		can :read, Photo
		can :read, Site
		can :read, Section
		can :read, Node
		can :read, Note do |note|
			note.publish == true
		end
		can :read, Comment
	end
end







