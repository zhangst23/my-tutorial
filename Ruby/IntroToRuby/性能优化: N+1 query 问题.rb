性能优化: N+1 query 问题.rb


1.0  使用 include 和 join 避免 N+1 query

# post
has_many :comments

# comment
belongs_to :post

# helper
Comment.each do |comment|
	comment.post.title
end

# 為了避免在幾千筆資料查詢時大量消耗不必要的記憶體，Rails提供joins和include方法可以在第一次查詢時將所有我們需要的資料一次查完。
# 記住，只要從model把資料抓到controller之後，剩下的我們就可以自行處理。越少的find和where指令越好。
# 例如剛才的情況，可以用includes的方式解決：

comments = Comment.includes(:post)
Comment.each do |comment|
	comment.post.title
end
# 使用這個include方法，會在載入comments時，就先把各項內容載入，解決剛剛N+1的狀況。include這種查詢方法稱為eager loading，先將需要的資料一次查好，避免未來其他


1.1  join和include的區別
# 雖然join和include的字義相像，在model中的用法也相像，但主要差別在於： 1. join主要用於過濾model之間的關係，但對查詢筆數來說並無太大幫助 2. include主要用於將大量資料在同一筆查詢內一次查好
# 以剛剛的post和comment為例：

comments = Comment.joins(:post)
# 回傳所有comment內含有post_id的項目
# 並不會同時查詢關連資料，所以剛剛的comment.post.title會產生新的查詢指令

comments = Comment.includes(:post)
# 回傳所有comment
# 會查詢關連資料，因此查詢comment.post.title並不會產生新的查詢指令

以上是join用在belongsto的用法，如果用在hasmany，會有不同的狀況：

posts = Post.joins(:comments)
# 查詢全部含有post_id的comment，並回傳該comment所屬的post
# 如果有很多筆comment屬於同一個post，那會回傳大量相同的post，可用.uniq來刪除重複的項目

posts = Post.includes(:comments)
# 回傳所有post
# post和comment內容皆已在本次查詢，之後不產生額外的查詢筆數


不管是joins還是include，都可以搭配where來查詢符合條件的項目：
comments = Comment.joins(:post).where("title like ? ", "my_title")
# 在1筆query內查詢所有post的title是"my_title"的項目
# 回傳符合的post所擁有的comment


有些時候也會遇上有趣的狀況：
posts = Post.includes(:comments).where(:comments => {:content => "hello" } )
# 只要有comment的content為"hello"，就回傳該post

posts.first.comments
# 只會回傳content是"hello"的comment
# 兩個指令只產生一筆查詢

posts = Post.joins(:comments).where(:comments => {:content => "hello"})
# 同上

posts.first.comments
# 回傳該post的所有comments，不管content為何
# 兩個指令產生兩筆查詢
以上狀況，可看出include比較能達到我們要的效果。記得每次寫code時都要注意是否會有N+1查詢次數的問題，利用join和include能夠節省許多記憶體的資源，達到更快的效率。



2.0   用巢狀include和查表方式來避免 n+1 query

2.1  巢狀 include (nested include)
# 如果我們遇到非常複雜的table結構，關連得非常遙遠，例如：
class Post < ActiveRecord::Base
  has_many :comments
  belongs_to :user
end

class Comment < ActiveRecord::Base
  has_many :replies
  belongs_to :user
end

class Reply < ActiveRecord::Base
  belongs_to :user
end

class User < ActiveRecord::Base
  has_many :posts
  has_many :comments
  has_many :replies
end

# 這邊有兩種關連
Post > Comment > Reply (就像是Facebook可以針對回覆還可以進行回覆的結構)
User 擁有所有model

# 假如在某個畫面中，我們需要所有資料欄位，那include的方式可能較為複雜，會寫成巢狀結構。
# 不包含user
Post.includes(:comments => [:replies])

# 包含user
Post.includes(:user, :comments= > [:user, {:replies => [:user]}])

# 以上的寫法中，要注意三個地方
1. 分開include
像User這樣的model與三個其他model都有關連，就必須分開include。

Post.includes(:user, :comments)
# 錯誤，只有Post有include User，而Comment沒有include User

Post.includes(:user, :comments => [:user])
# 正確，皆include User資料
這樣例如分開來查Comment.first.user和Post.first.user才會真正利用到eager_load的機制。

2. Hash和Array寫法
如果巢狀只有一層關連，則使用Array來撰寫，例如

Post.includes(:comments => [:replies])
但如果底下還包含了其他model，則就要用Hash來撰寫，例如

Post.includes(:comments => {:replies => [:user]})
3. 順序
包含其他model的巢狀結構要寫在最後方，例如以下寫法就會顯示錯誤。

Post.includes(:comments => [:replies], :user)
# => SyntaxError
這樣一來，查詢時就會將所有相關資料都include進去，避免實際使用時還到資料庫查詢。

用查表方式減少query
這種方式並非Rails建議查詢table的方法，但總是在退無可退的時候相當好用。例如我們在mysql的某個table中有一千萬筆資料，而且是用複合key的方式進行關連。

Post
 ID | user_id |     date     |   content
  1 |    2    |  2015-01-01  |     ...
  2 |    3    |  2015-02-05  |     ...
  3 |    4    |  2015-03-07  |     ...
  4 |    5    |  2015-08-10  |     ...
假如我們需要知道每一個user在特定時間所寫的內容為何，這樣會產生需要用複合key來查詢的狀況。我必須組合user_id和date為key，用來查詢特定user在特定date的所寫內容。

由於是針對每一個user來進行查詢，所以不管是用includes和joins都會產生不斷查詢資料庫的情況。因此，如果我們將所有的資料先抓出來，塞入一個hash當中，再用key來查詢，這樣的速度會比n+1的情況快上許多。

# 先將Post所有內容塞入hash這個物件當中，當做查詢總表
hash = Post.all.inject({}) do |result, post|
  key = (user_id.to_s + date.to_s).to_sym
  result.merge({ key => content })
end

# 針對特定user和date查詢
current_key = (current_user.id + current_date.to_s).to_sym
current_content = hash[current_key]
用這樣的查詢方式等於我們將資料庫的table整個搬到code裡面來，在第一步產生整包hash，接下來再查詢。剛開始從資料庫抓資料時會花一點時間，但接下來用hash來查詢的速度就會非常快。

注意，這樣的用法會造成與rails convention稍有不同，畢竟都提供這麼健全的table關連方法了，還硬要用查表的，維護上會稍微需要費一點心思。建議過渡期過後，還是將資料結構修改為與rails相符的結構。
這些都是敝人測試經驗，如有更好的寫法歡迎提供，謝謝！




















































