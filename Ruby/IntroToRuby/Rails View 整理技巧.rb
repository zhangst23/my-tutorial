Rails View 整理技巧.rb
http://blog.xdite.net/posts/2013/10/31/maintainable-rails-view-1





1. Move logic to Helper

# <% if current_user && current_user == post.user %>
# 	<%= link_to("Edit", edit_post_path(post)) %>
# <% end %>

# 如果只有一個條件，如 if current_user，則不用進行整理
# 如果在第一次撰寫時，就發現會有兩個條件，則在最初撰寫時，就使用一個簡易的 helper 整理。
# 例：

# <% if editable?(post) %>
#   <%= link_to("Edit", edit_post_path(post))%>
# <% end %>

2. Pre-decorate with Helper (常用欄位預先使用 Helper 整理)


在設計 Application 時，常常會遇到某些欄位，其實在初期設計時，就會不斷因為規格擴充，一直加上 helper 裝飾。比如 Topic 的 content ：

    # <%= @topic.content %>

在幾次的擴充之下，很快就會變成這樣：

    # <%= auto_link(truncate(simple_format(topic.content), :lenth => 100)) %>

而這樣的內容，整個 Application 可能有 10 個地方。每經過一次規格擴充，developer 就要改十次，還可能改漏掉。

針對這樣的情形，我們是建議在第一次在進行 Application 設計時，就針對這種「可能馬上就會被大幅擴充」的欄位進行 Helper 包裝。而不是「稍候再整理」

    # <%= render_topic_content(@topic) %>

常見的情形如：

render_post_author
render_post_published_date
render_post_title
render_post_content



3. Use Ruby in Helper ALL THE TIME ( 全程在 Helper 裡面使用 Ruby )


嚴格禁止在 Ruby Helper 裡面穿插任何 HTML 標記。請使用任何可以生成 HTML 的 Ruby Helper 取代。

 def post_tags_tag(post, opts = {})
  tags = post.tags
  raw tags.collect { |tag| link_to(tag,posts_path(:tag => tag)) }.join(", ")
end



4. mix Helper & Partial （混合使用 Helper 與 Partial )

只要遇到需要穿插稍微複雜 HTML 的場景，請不吝惜使用 Helper 與 Partial 穿插的技巧實作。如修改成以下的程式碼：

def render_post_title(post)
  render :partial => "posts/title_for_helper", :locals => { :title => post.title }
end

常見的設計情境如：

category in list
post title in breadcrumb
user name with glyphicons



5. Tell, Don not ask

有些時候，開發者會在 New Relic 發現某個 view 的 Performance 低落，但是卻抓不出來實際的問題在哪裡。這是因為是慢在 helper 裡面。

這是一個相當經典的範例：

# def render_post_taglist(post, opts = {})
#   tags = post.tags
#   tags.collect { |tag| link_to(tag,posts_path(:tag => tag)) }.join(", ")
# end

# <% @posts.each do |post| %>
#   <%= render_post_taglist(post) %>
# <% end %>

這是因為在 View / Helper 裡面被 query 的資料是不會 cache 起來的。在 helper 裡面才 撈 tags 出來，這樣的設計容易造成 N+1 問題，也會造成 template rendering 的效率低落。

改進方法：盡量先在外部查詢，再傳入 Helper 裡面「裝飾」

# def render_post_taglist(tags, opts = {})
#   tags.collect { |tag| link_to(tag,posts_path(:tag => tag)) }.join(", ")
# end

# <% @posts.each do |post| %>
#   <%= render_post_taglist(post.tags) %>
# <% end %>

# def index
#     @posts = Post.recent.includes(:tags)
# end




6. Wrap into a method ( 包裝成一個 model method )

有時候，我們會寫出這種 Helper code :

# def render_comment_author(comment)
#   if comment.user.present?
#     comment.user.name
#   else
#     comment.custom_name
#   end
# end

這段程式碼有兩個問題：

Ask, Not Tell
問 name 的責任其實不應放在 Helper 裡面
可以作以下整理，搬到 Model 裡面，這樣 author_name 也容易實作 cache ：

# def render_comment_author(comment)
#   comment.author_name
# end


# class Comment < ActiveRecord::Base
#   def author_name
#     if user.present?
#       user.name
#     else
#       custom_name
#     end
#   end
# end



7. Move code to Partial
什麼時候應該將把程式碼搬到 Partial 呢？

# long template | code 超過兩頁請注意
# highly duplicated | 內容高度重複
# indepdenent blocks | 可獨立作為功能區塊

常見情境：

# nav/user_info
# nav/admin_menu
# vendor_js/google_analytics
# vendor_js/disqus_js
# global/footer


8. Use presenter to clean the view ( 使用 Presenter 解決 logic in view 問題）


9. Cache Digest


10. Cells
gem

11. content_for ( yield )


11.2  套用在 sidebar 上
這招也可以用在 sidebar 上。很多內容網站裡面常常需要放置側邊欄廣告，而這些網站通常有嚴重的 performace issue，原因是它們的 sidebar 都是這樣被設計的：

使用一個全站的 @instance_variable 控制。造成 @instance_variable 到處污染以及 logic in view

 <div class="main">
  main content
</div>

<div class="sidebar">
  <% case @ad_type %>
  <% when foo %>
    <%= render "ad/foo"%>
  <% when bar %>
    <%= render "ad/bar"%>    
  <% else %>
    <%= render "ad/default"%>  
  <% end %>
</div>

其實用 yield 就可以巧妙的避開這種問題。將 View 改成

 <div class="main">
  <%= yield %>
</div>

<div class="sidebar">
  <%= yield :sidebar %>
</div>

再把各個 view 裡面需要呼叫的 sidebar 拆開獨立呼叫即可

# main content

# <%= content_for :sidebar do %>
#   <%= render "ad/foo"%>
# <% end %>



12. Decoration in Controller




13. Decoration using I18n
大家對 Rails 的 I18n 機制的印象都是「作翻譯」，其實 I18n 也可以拿來做 "Decoration"。如：

def render_user_geneder(user)
  if user.gender == "male"
    "男 (Male)"
  else
    "女 (Female)"
  end
end
其實可以被簡化成

 def render_user_gender(user)
  I18n.t("users.gender_desc.#{user.geneder}")
end

這樣的情景其實也被可以套用在這種 yes/no ( true/false) 的場景：

 def render_book_purchase_option(book)
  if book.aviable_for_purchase?
    "Yes"
  else
    "No"
  end
end
善用 I18n，可以節省不少裝飾用的程式碼。



14. Decorate using Decorator ( don’t put everything in model )


在前面我們介紹了幾個手法，包括 將 Logic 收納到 Helper 裡面：

 def render_article_publish_status(article)
  if article.published?
    "Published at #{article.published_at.strftime('%A, %B %e')}"
  else
    "Unpublished"
  end
end
以及 將 Helper 裡面的 Logic 重新整理到 Model：

 class Article < ActiveRecord::Base
  def human_publish_status
    if published?
      "Published at #{article.published_at.strftime('%A, %B %e')}"
    else
      "Unpublished"
    end
  end
end
但是，再怎麼整理，Model 還是會肥起來：

 class Article < ActiveRecord::Base 
  def human_publish_status
  end

  def human_publish_time
  end

  def human_author_name
  end

  ........
end
最後你只好把這些 Logic 又抽出成 Module：

 class Article < ActiveRecord::Base
  include HumanArticleAttributes
end
等等...這樣好像有很大的問題？XDDDDD 這些程式碼其實大部分都是 View 裡面的 Logic，怎麼到最後都變成 Model 裡面的東西。

Drapper ( Decorators/View-Models for Rails Applications )
我們可以用 Decorators/View-Models 解決這樣的問題。因為這本來就是屬於「View 層次」的東西。

有一個還不錯的 Gem 叫 Draper 可以進行這樣的抽象整理。

其實開發者最希望 View 裡面只要有一行

   # <%= @article.publication_status %>
這樣就好了。

我們可以透過 Draper 的 DSL，做到這樣的封裝。

 class ArticleDecorator < Draper::Decorator
  delegate_all

  def publication_status
    if published?
      "Published at #{published_at}"
    else
      "Unpublished"
    end
  end

  def published_at
    object.published_at.strftime("%A, %B %e")
  end
end

然後在 Controller 裡面呼叫 decorate 就可以了

 def show
  @article = Article.find(params[:id]).decorate
end


15. Decoration using View Object


另外一種作法是把 View 裡面複雜的邏輯抽成 View Object

這是一個 event 頁面。在這個頁面裡面，如果當前 User 是 event host，則顯示 "You"，否則顯示 Host name。且參加者裡面也要剔除當前 User。

 <dl class="event-detail">
  <dt>Event Host</dt>
  <dd>
    <% if @event.host == current_user %>
      You
    <% else %>
      <%= @event.host.name %>
    <% end %>
  </dd>
  <dt>Participants</dt>
  <dd><%= @event.participants.reject { |p| p == current_user }.map(&:name).join(", ") %></dd>
</dl>
寫成 Helper 實在是有點囉唆。我們不如改用 View Object 進行整理。

 class EventDetailView
  def initialize(template, event, current_user)
    @template = template
    @event = event
    @current_user = current_user
  end

  def host
    if @event.host == @current_user
      "You"
    else
      @event.host.name
    end
  end

  def participant_names
    participants.map(&:name).join(", ")
  end


  private

  def participants
    @event.participants.reject { |p| p == @current_user }
  end
end
則 View 就可以很漂亮的被收納成以下：

 <dl class="event-detail">
  <dt>Host</dt>
  <dd><%= event_detail.host %></dd>
  <dt>Participants</dt>
  <dd><%= event_detail.participant_names %></dd>
</dl>



16. Form Builder




17. cancan



Summary
總結以上 18 個設計手法，看似複雜，其實原則不外乎：

# Always assume things need to be decorated (永遠假設東西必須要被裝飾)
# Extract logic into methods / classes ( 將邏輯封裝成 method 或者 class )
# Avoid perform query in view/helper ( 盡量避免在 view/helper 裡面進行資料查詢 )
# When things get complicated, build a new control center （當事情變得複雜，不要拘泥於舊的手段，找一個新的中心重新整理控制）

掌握這些原則，就可以儘量把 View 整理的乾乾淨淨。

reference
在撰寫以上內容時，我的參考內容有：

http://blog.xdite.net （相當多年來的經驗積累，很多技巧以前都有講過）
https://github.com/bloudermilk/maintainable_templates
http://pivotallabs.com/form-backing-objects-for-fun-and-profit/
http://saturnflyer.com/blog/jim/2013/10/21/how-to-make-your-code-imply-responsibilities/
http://objectsonrails.com/
歡迎各位留言指教。















