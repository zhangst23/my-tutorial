實戰聖經-網站效能.rb


1.0   ActiveRecord和SQL

# ActiveRecord抽象化了SQL操作，是頭號第一大效能盲點所在，你很容易沉浸在他帶來的開發高效率上，
# 忽略了他的效能盲點直到上線爆炸。存取資料庫是一種相對很慢的I/O的操作：每一條SQL query都得
# 耗上時間、執行回傳的結果也會被轉成ActiveRecord物件全部放進記憶體，會不會佔用太多？因此
# 你得對會產生出怎樣的SQL queries有基本概念。

1.1    N+1 queries

N+1 queries是資料庫效能頭號殺手。ActiveRecord的Association功能很方便，所以很容易就
寫出以下的程式：

# model
class User < ActieRecord::Base
  has_one :car
end

class Car < ActiveRecord::Base
  belongs_to :user
end

# your controller
def index
  @users = User.page(params[:page])
end

# view
<% @users.each do |user| %>
 <%= user.car.name %>
<% end %> >


# 我們在View中讀取user.car.name的值。但是這樣的程式導致了N+1 queries問題，假設User有10筆，這程式會產生出11筆Queries，一筆是查User，另外10筆是一筆一筆去查Car，嚴重拖慢效能。

# SELECT * FROM `users` LIMIT 10 OFFSET 0
# SELECT * FROM `cars` WHERE (`cars`.`user_id` = 1)
# SELECT * FROM `cars` WHERE (`cars`.`user_id` = 2)
# SELECT * FROM `cars` WHERE (`cars`.`user_id` = 3)
# ...
# ...
# ...
# SELECT * FROM `cars` WHERE (`cars`.`user_id` = 10)

解決方法，加上includes：

# your controller
def index
	@users = User.includes(:car).page(params[:page])
end

# 如此SQL query就只有兩個，只用一個就撈出所有Cars資料。

# SELECT * FROM `users` LIMIT 10 OFFSET 0
# SELECT * FROM `cars` WHERE (`cars`.`user_id` IN('1','2','3','4','5','6','7','8','9','10'))

如果user還有parts零件的關聯資料想要一起撈出來，includes也支援hash寫法：@users = User.includes(:car => :parts ).page(params[:page])

# Bullet是一個外掛可以在開發時偵測N+1 queries問題。



1.2   索引(Indexes)

沒有幫資料表加上索引也是常見的效能殺手，作為搜尋條件的資料欄位如果沒有加索引，SQL查詢的時候就會一筆筆檢查資料表中的所有資料，當資料一多的時候相差的效能就十分巨大。一般來說，以下的欄位都必須記得加上索引：

	# 外部鍵(Foreign key)
	# 會被排序的欄位(被放在order方法中)
	# 會被查詢的欄位(被放在where方法中)
	# 會被group的欄位(被放在group方法中)

如何幫資料庫加上索引請參考Migrations一章。

lol_dba提供了Rake任務可以幫忙找忘記加的索引。


1.3  使用select

# ActiveRecord預設的SQL會把所有欄位的資料都讀取出來，如果其中有text或binary欄位資料量很大，就會每次都佔用很多不必要的記憶體拖慢效能。使用select可以只讀取出你需要的資料：

Event.select(:id, :name, :description).limit(10)

# 進一步我們可以利用scope先設定好select範圍：

class User < ActiveRecord::Base
	scope :short, -> { select(:id, :name, :description) }
end

User.short.limit(10)



1.4   計數快取 Counter Cache

如果需要常計算has_many的Model有多少筆資料，例如顯示文章列表時，也要顯示每篇有多少留言回覆。

<% @topics.each do |topic| %> >
	主题: <%= topic.subject %> >
	回复数: <%= topic.posts.size %> >
<% end %> >

# 這時候Rails會產生一筆筆的SQL count查詢：

# SELECT * FROM `posts` LIMIT 5 OFFSET 0
# SELECT count(*) AS count_all FROM `posts` WHERE (`posts`.topic_id = 1 )
# SELECT count(*) AS count_all FROM `posts` WHERE (`posts`.topic_id = 2 )
# SELECT count(*) AS count_all FROM `posts` WHERE (`posts`.topic_id = 3 )
# SELECT count(*) AS count_all FROM `posts` WHERE (`posts`.topic_id = 4 )
# SELECT count(*) AS count_all FROM `posts` WHERE (`posts`.topic_id = 5 )

# Counter cache功能可以把這個數字存進資料庫，不再需要一筆筆的SQL count查詢，並且會在Post數量有更新的時候，自動更新這個值。

# 首先，你必須要在Topic Model新增一個欄位叫做posts_count，依照慣例是_count結尾，型別是integer，有預設值0

rails g migration add_posts_count_to_topic

# 編輯Migration：

class AddPostsCountToTopic < ActiveRecord::Migration
  def change  
    add_column :topics, :posts_count, :integer, :default => 0
    
    Topic.pluck(:id).each do |i|
      Topic.reset_counters(i, :posts) # 全部重算一次
    end
  end
end

# 編輯Models，加入:counter_cache => true：

class Topic < ActiveRecord::Base
  has_many :posts
end

class Posts < ActiveRecord::Base
  belongs_to :topic, :counter_cache => true
end

# 這樣同樣的@topic.posts.size程式，就會自動變成使用@topic.posts_count，而不會用SQL count查詢一次。



1.5   Batch finding

# 如果需要撈出全部的資料做處理，強烈建議最好不要用all方法，因為這樣會把全部的資料一次放進
# 記憶體中，如果資料有成千上萬筆的話，效能就墜毀了。解決方法是分次撈，每次幾撈幾百或幾千筆。
# 雖然自己寫就可以了，但是Rails提供了Batch finding方法可以很簡單的使用：

Article.find_each do |a|
	# iterate over all articles, in chunks of 1000 (the default)
end

Article.find_each( :batch_size => 100 ) do |a|
	# iterate over published articles in chunks of 100
end


或是

Article.find_in_batches do |articles|
	articles.each do |a|
		# articles is array of size 1000
	end
end

Article.find_in_batches( :batch_size => 100 ) do |articles| 
  articles.each do |a| 
    # iterate over all articles in chunks of 100
  end
end


1.6   Transaction for group operations

# 在Transaction交易範圍內的SQL效能會加快，因為最後只需要COMMIT一次即可：
my_collection.each do |q|
	Quote.create({:phrase => q})
end

# Add transaction
Quote.transaction do
	my_collection.each do |q|
		Quote.create({:phrase => q})
	end
end



2.0   全文搜尋Full-text search engine

如果需要搜尋text欄位，因為資料庫沒辦法加索引，所以會造成table scan把資料表所有資料都掃描一次，效能會非常低落。這時候可以使用外部的全文搜尋伺服器來做索引，目前常見有以下選擇：

	Elasticsearch全文搜尋引擎和elasticsearch-rails gem
	Apache Solr(Lucenel)全文搜尋引擎和Sunspot gem
	PostgreSQL內建有全文搜尋功能，可以搭配 texticle gem或 pg_search gem
	Sphinx全文搜尋引擎和thinking_sphinx gem


3.0  SQL 效能分析

QueryReviewer這個套件透過SQL EXPLAIN分析SQL query的效率


4.0  逆正規化(de-normalization)

一般在設計關聯式資料庫的table時，思考的都是正規化的設計。透過正規化的設計，可以將資料不重複的儲存，省空間，更新也不易出錯。但是這對於複雜的查詢有時候就力有未逮。因此必要時可以採用逆正規化的設計。犧牲空間，增加修改的麻煩，但是讓讀取這事件變得更快更簡單。

上述章節的Counter Cache，其實就是一種逆正規化的應用，只是Rails幫你包裝好了。如果你要自己實作的話，可以善用Callback或Observer來作更新。以下是一個應用的範例，Event的總金額，是透過Invoice#amount的總和得知。另外，我們也想知道該活動最後一筆Invoice的時間：

class Event < ActiveRecord::Base
	has_many :invoices
	def amount
		self.invoices.sum(:amount)
	end
	def last_invoice_time
		self.invoices.last.created_at
	end
end

class Invoice < ActiveRecord::Base
	belongs_to :event
end

如果有一頁是列出所有活動的總金額和最後Invoice時間，那麼這一頁就會產生2N+1筆SQL查詢(N是活動數量)。為了改善這一頁的讀取效能，我們可以在events資料表上新增兩個欄位amount和last_invoice_time。首先，我們新增一個Migration:

add_column :events, :amount, :integer, :default => 0
add_column :events, :last_invoice_time, :datetime

# Data migration current data
Event.find_each do |e|
	e.amount = e.invoices.sum(:amount)
	e.last_invoice_time = e.invoices.last.try(:created_at) # e.invoices.last 可能是 nil
	e.save(:validate => false)
end

接著程式就可以改成:

class Event < ActiveRecord::Base
	has_many :invoices
	
	def update_invoice_cache
		self.amount_cache = self.invoices.sum(:amount)
		self.last_invoice_time = self.invoices.last.try(:created_at)
		self.save(:validate => false)
	end
end

class Invoice < ActiveRecord::Base
	belongs_to :event
	
	after_save :update_event_cache_data
	
	protected
	
	def update_event_cache_data
		self.event.update_invoice_cache
	end		
end

如此就可以將成本轉嫁到寫入，而最佳化了讀取時間



5.0   最佳化效能

關於程式效能最佳化，Donald Knuth大師曾開示「We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil”」，在效能還沒有造成問題前，就為了優化效能而修改程式和架構，只會讓程式更混亂不好維護。

也就是說，當效能還不會造成問題時，程式的維護性比考慮效能重要。80/20法則：會拖慢整體效能的程式，只佔全部程式的一小部分而已，所以我們只最佳化會造成問題的程式。接下來的問題就是，如何找到那一小部分的效能瓶頸，如果用猜的去找那3%造成效能問題的程式，再用感覺去比較改過之後的效能好像有比較快，這種作法一點都不科學而且浪費時間。善用分析工具找效能瓶頸，最佳化前需要測量，最佳化後也要測量比較。

把所有東西都快取起來並不是解決效能的作法，這只會讓程式有更多的一致性問題，更難維護。另外也不要跟你的框架過不去，硬是要去改Rails核心，這會導致程式有嚴重的維護性問題。最後，思考出正確的演算法總是比埋頭改程式有效，只要資料一大，不論程式怎麼改，挑選O(1)的演算法一定就是比O(n)快。


5.1   效能分析

效能分析工具可以幫助我們找到哪一部分的程式最需要效能優化，哪些部分最常被使用者執行，如果能夠優化效益最高。

rack-mini-profiler在頁面的左上角顯示花了多少時間，並且提供報表，推薦安裝
request-log-analyzer這套工具可以分析Rails log檔案
透過商業Monitor產品：Skylight、New Relic或Scout


5.2   程式量測工具

以下工具可以幫助我們量測程式的效能：

Benchmark standard library
Rails benchmark helper Rails 內建的一些 Helper
Rails Performance Testing 介紹的 rails/rails-perftest 工具
ruby-prof
evanphx/benchmark-ips
SamSaffron/memory_profiler


5.3   HTTP 量測工具

以下工具可以量測網站伺服器的連線和Requests數量：

httperf: 可以參考使用 httperf 做網站效能分析一文
wrk: Modern HTTP benchmarking tool
Apache ab: Apache HTTP server benchmarking tool



6.0  由Web伺服器提供靜態檔案

由Web伺服器提供檔案會比經過Rails應用伺服器快上十倍以上，如果是不需要權限控管的靜態檔案，可以直接放在public目錄下讓使用者下載。

如果是需要權限控管得經過Rails，你會在controller才用send_file送出檔案，這時候可以打開:x_sendfile表示你將傳檔的工作委交由Web伺服器的xsendfile模組負責。當然，Web伺服器得先安裝好x_sendfile功能：

Apache mod_xsendfile
Nginx XSendfile


7.0  由 CDN 提供靜態檔案

靜態檔案也放在CDN上讓全世界的使用者在最近的下載點讀取。CDN需要專門的CDN廠商提供服務，其中推薦AWS CloudFront和CloudFlare線上就可以完成申請和設定的。

如果要讓你的Assets例如CSS, JavaScript, Images也讓使用者透過CDN下載，只要修改config/environments/production.rb的config.action_controller.asset_host為CDN網址即可。



8.0  瀏覽器網頁載入效能 Client-side web performance

後端伺服器的Response time固然重要，但對終端使用者來說，瀏覽器完成載入網頁的Page Load time才是真正的感受。因此針對CSS、JavaScript等等靜態內容也有一些可以最佳化的工作，包括：

	打開 Gzip
	加上快取 HTTP Headers
	壓縮JavaScript和CSS
	使用CDN

更多文件和工作請參考：

	Rails Front-End 優化 早年筆者寫的文章，看看就好
	Speed Up Rails By Starting on the Front
	Yahoo! Exceptional Performance Yahoo 的教學文件
	Google Make the Web Faster Google 的教學文件
	Google PageSpeed Google 提供的工具可以分析你的網頁效能

如果有用HTTPS安全連線的話，推薦打開網站伺服器的HTTP/2(前身是SPDY)支援，最新的最佳化技巧又有了一些變化，詳見A brief introduction to SPDY – 邁向 HTTP/2.0 。


9.0   如何寫出執行速度較快的Ruby程式碼

如何寫出有效率的 Ruby Code
Writing Fast Ruby
JuanitoFatas/fast-ruby
不過有時候「執行速度較快」的程式碼不代表好維護、好除錯的程式碼，這一點需要多加注意。


10.0   使用更快的Ruby函式庫

有C Extension的Ruby函式庫總是比較快的，如果常用可以考慮安裝：

XML parser http://nokogiri.org/
JSON parser http://github.com/brianmario/yajl-ruby/ 或 https://github.com/ohler55/oj
HTTP client http://github.com/pauldix/typhoeus
escape_utils: 請參考 Escape Velocity



11   使用外部程式

Ruby不是萬能，有時候直接呼叫外部程式是最快的作法：

def thumbnail(temp, target)
  system("/usr/local/bin/convert #{escape(temp)} -resize 48x48! #{escape(target}")
end




























