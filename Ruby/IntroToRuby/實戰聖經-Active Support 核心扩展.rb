Active Support 核心扩展.rb
https://ihower.tw/rails4/activesupport.html


1.0 加载核心扩展


1.1.3 加载全部核心扩展

# 你可能更倾向于加载全部核心扩展，有一个文件能办到：

require 'active_support'
require 'active_support/core_ext'
1.1.4 加载全部 Active Support

# 最后，如果你想要 Active Support 的全部内容，只需：

require 'active_support/all'
# 这样做并不会把整个 Active Support 预加载到内存里，鉴于autoload的机制，其只有在真正用到时才会加载。




2.0

blank? 和 present?

在Rails中下面幾種情況被定義是blank:

	# nil或是false
	# 只由空白組成的字串
	# 空陣列或是空Hash
	# 任何物件當使用empty?方法呼叫時回應為true時


# 舉例來說在ActionDispatch::Session::AbstractStore中就使用了blank?方法來確定session key是否存在:

def ensure_session_key!
  if @key.blank?
    raise ArgumentError, 'A key is required...'
  end
end

# present?方法就是blank?方法的相反，判斷是否存在，因此present?方法與!blank?方法兩者表達的意思是一樣的。


3.0  try

try是一個相當實用的功能，當我們去呼叫一個物件的方法，而該物件當時卻是nil的時候，Rails會拋出method_missing的例外，最常見的例子像是我們想判斷某些動作只有管理員可以進行操作，因此我們通常會這樣寫:

if current_user.is_admin?
    # do something
end

但這樣的寫法當使用者其實是未登入時我們的current_user便會回傳nil，而再去呼叫is_admin?方法時便會發生錯誤拋出例外，try方法便是運用在這樣的情況，剛剛的例子我們可以改寫成

if current_user.try(:is_admin?)
    # do something
end

這樣子當使用者並未登入的時候會直接回傳nil而不會再去呼叫後面的is_admin?方法



4.0  to_param


# 定义于 active_support/core_ext/object/to_param.rb.
所有 Rails 对象都可以响应to_param方法，它会把对象的值转换为查询字符串，或者 URL 片段，并返回该值。

# 默认情况下，to_param仅仅调用了to_s：
7.to_param # => "7"

# Rails 里的许多类重写了这个方法。
# 例如nil、true和false会返回其自身。Array#to_param会对数组元素调用to_param并把结果用"/"连接成字符串：
[0, true, String].to_param # => "0/true/String"


# 需要注意的是， Rails 的路由系统会在模型上调用to_param并把结果作为:id占位符。ActiveRecord::Base#to_param会返回模型的id，但是你也可以在自己模型里重新定义它。例如：
class User
  def to_param
    "#{id}-#{name.parameterize}"
  end
end
# 会得到：
user_path(@user) # => "/users/357-john-smith"




5.0  to_query

to_query會幫我們去呼叫物件的to_param方法，並且幫我們整理成查詢的格式並輸出，例如我們去改寫User Model的to_param方法:

class User
  def to_param
    "#{id}-#{name.parameterize}"
  end
end

current_user.to_query('user') # => user=357-john-smith
to_query會將輸出的符號都以逸出程式碼(escape)取代，無論是鍵或是值，因此更方便去處理:

account.to_query('company[name]')
# => "company%5Bname%5D=Johnson+%26+Johnson"
當呼叫陣列的to_query方法時會呼叫陣列中所有元素的to_query方法，並且使用"[]"做為鍵值，並在每個元素與元素間插入"&"做為區隔:

[3.4, -45.6].to_query('sample')
# => "sample%5B%5D=3.4&sample%5B%5D=-45.6"
呼叫Hash的to_query方法時，當沒有給予query的字串時預設會以Hash本身的鍵值做為query字串輸出(to_query(key)):

{:c => 3, :b => 2, :a => 1}.to_query # => "a=1&b=2&c=3"
換句話說你也可以自己指定做為query的字串，這個字串會變為Hash本身鍵值的namespace:

{:id => 89, :name => "John Smith"}.to_query('user')
# => "user%5Bid%5D=89&user%5Bname%5D=John+Smith"





6.0   擴充 Class

Class Attributes

class_attribute這個方法可以宣告一個或多個類別變數，且此類別變數是可以被繼承的類別所覆寫的：

class A
  class_attribute :x
end

class B < A; end

class C < B; end

A.x = :a
B.x # => :a
C.x # => :a

B.x = :b
A.x # => :a
C.x # => :b

C.x = :c
A.x # => :a
B.x # => :b

# class_attribute同時也幫你定義了查詢的方法，你可以在變數名稱後面加上問號來看此變數是否已經被定義，以上面的例子來說就是x?，結果會回傳true或false


6.1  cattr_reader、cattr_writer與cattr_accessor

cattr_reader、cattr_writer與cattr_accessor這三個方法就像是attr_*的類別變數版本，透過這三個方法可以建立相對應的類別變數及存取方法：

class MysqlAdapter < AbstractAdapter
  # Generates class methods to access @@emulate_booleans.
  cattr_accessor :emulate_booleans
  self.emulate_booleans = true
end
同時也會幫我們建立實例變數的方法，讓我們可以在實例變數層級來存取：

module ActionView
  class Base
	cattr_accessor :field_error_proc
	@@field_error_proc = Proc.new{ ... }
  end
end




7.0  擴充 String
# Output Safety
# remove
# squish
# truncate
# inquiry
# starts_with? and ends_with?
# strip_heredoc
# indent
# Access
# Inflections
# Conversions


7.1 安全輸出

當輸出HTML格式的資料時需要格外注意，例如當你文章的標題存成Flanagan & Matz rules!時，在沒有格式化的情況下&會被逸出碼所取代成&amp;，另一方面是安全性上的問題，因為使用者可能就會在欄位中寫入攻擊性的script造成安全性問題，因此在處理字串輸出時我們都會對輸出進行處理:

我們可以使用html_safe?方法來判斷字串是否是html安全格式，一般字串預設是false:

7.2  truncated

truncate方法會將字串截斷為指定的長度:

"Oh dear! Oh dear! I shall be late!".truncate(20)
# => "Oh dear! Oh dear!..."
你可以使用omission參數將擷取後的字串的後面取代為指定的文字:

"Oh dear! Oh dear! I shall be late!".truncate(20, :omission => '&hellip;')
# => "Oh dear! Oh &hellip;"
你必須注意truncate後的字串不是html_safe的，因此在你沒有使用raw來作處理的時候會將html格式直接輸出:

"<p>Oh dear! Oh dear! I shall be late!</p>".truncate(20, :omission => "(blah)")
=> "<p>Oh dear! Oh(blah)"
為了避免擷取的部分會將單字直接從中擷取，你可以用:separator參數來取代被擷取的單字部分:

"Oh dear! Oh dear! I shall be late!".truncate(18)
# => "Oh dear! Oh dea..."
"Oh dear! Oh dear! I shall be late!".truncate(18, :separator => ' ')
# => "Oh dear! Oh..."
:separator無法使用正規表示法



7.3  inquiry

inquiry方法會將字串轉型為StringInquirer物件，可以讓我們像用一般方法的方式來比對字串是否符合，最常見的例子就是判斷Rails正在使用的版本:

Rails.env.production? # 等同於 Rails.env == "production"
因此你可以用inquiry將一般字串轉型後來達到一樣的效果:

"production".inquiry.production? # => true
"active".inquiry.inactive?       # => false



7.4   Key-based Interpolation

Ruby1.9以後的版本支援使用%符號做為字串中的變數鍵值:

"I say %{foo}" % {:foo => "wadus"}          # => "I say wadus"
"I say %{woo}" % {:foo => "wadus"}          # => KeyError


7.5  字串轉換相關

to_date、to_time與to_datetime三個方法是與轉換時間相關的方法，可以幫我們將字串轉型為時間物件:

"2010-07-27".to_date              # => Tue, 27 Jul 2010
"2010-07-27 23:37:00".to_time     # => Tue Jul 27 23:37:00 UTC 2010
"2010-07-27 23:37:00".to_datetime # => Tue, 27 Jul 2010 23:37:00 +0000
to_time另外還接受:utc或是:local的參數用來指定時區，預設為:utc:

"2010-07-27 23:42:00".to_time(:utc)   # => Tue Jul 27 23:42:00 UTC 2010
"2010-07-27 23:42:00".to_time(:local) # => Tue Jul 27 23:42:00 +0200 2010


7.6    其他實用的方法

pluralize方法可以幫我們將名詞字串轉為複數的名詞:

"table".pluralize     # => "tables"
"ruby".pluralize      # => "rubies"
"equipment".pluralize # => "equipment"
而singularize方法則是可以幫我們轉為單數:

"tables".singularize    # => "table"
"rubies".singularize    # => "ruby"
"equipment".singularize # => "equipment"
camelize可以幫我們將字串轉為駝峰式的字串:

"product".camelize    # => "Product"
"admin_user".camelize # => "AdminUser"
在Rails中也會將路徑中”/”符號轉為Class及Module中的命名空間符號::

"backoffice/session".camelize # => "Backoffice::Session"
而underscore則是將原先駝峰式的字串轉為路徑式的字串:

"Product".underscore   # => "product"
"AdminUser".underscore # => "admin_user"
"Backoffice::Session".underscore # => "backoffice/session"
titleize方法可以將字串標題化，將單字的開頭皆轉為大寫:

"alice in wonderland".titleize # => "Alice In Wonderland"
"fermat's enigma".titleize     # => "Fermat's Enigma"
dasherize可以將字串中的底線轉為橫線:

"name".dasherize         # => "name"
"contact_data".dasherize # => "contact-data"
demodulize可以將整串的namespace去除僅留下最後的Class name或是Module name:

"Backoffice::UsersController".demodulize    # => "UsersController"
"Admin::Hotel::ReservationUtils".demodulize # => "ReservationUtils"
deconstantize則是相反的作用，將上層的部分全部找出來:

"Backoffice::UsersController".deconstantize    # => "Backoffice"
"Admin::Hotel::ReservationUtils".deconstantize # => "Admin::Hotel"
必須注意的是這是處理字串，因此若直接僅給予Class name或是Module name是無法找出上層參照的

"Product".deconstantize  # => ""
parameterize可以將字串轉為適合url的方式:

"John Smith".parameterize # => "john-smith"
"Kurt Gödel".parameterize # => "kurt-godel"
tableize除了會將單數名詞轉為複數之外，還會將駝峰式的名詞改為底線:

"InvoiceLine".tableize # => "invoice_lines"
tableize的作用其實在於幫助你找出Model的資料表名稱
classify則是tableize的相反，能夠幫你從資料表的名稱轉為Model:

"people".classify        # => "Person"
"invoices".classify      # => "Invoice"
"invoice_lines".classify # => "InvoiceLine"
humanize可以幫你將Model的屬性轉為較容易閱讀的形式:

"name".humanize           # => "Name"
"author_id".humanize      # => "Author"
"comments_count".humanize # => "Comments count"







8.0   擴充 Enumerable

8.1   group_by

group_by可以將列舉依照指定的欄位分組出來，例如將記錄依照日期排序出來:

latest_transcripts.group_by(&:day).each do |day, transcripts|
  p "#{day} -> #{transcripts.map(&:class).join(', ')}"
end

"2006-03-01 -> Transcript"
"2006-02-28 -> Transcript"
"2006-02-27 -> Transcript, Transcript"
"2006-02-26 -> Transcript, Transcript"
"2006-02-25 -> Transcript"
"2006-02-24 -> Transcript, Transcript"
"2006-02-23 -> Transcript"



8.2   sum

sum可以算出集合的加總:

[1, 2, 3].sum # => 6
(1..100).sum  # => 5050
sum的作用其實就是幫你將元素彼此用+方法連結起來:

[[1, 2], [2, 3], [3, 4]].sum    # => [1, 2, 2, 3, 3, 4]
%w(foo bar baz).sum             # => "foobarbaz"
{:a => 1, :b => 2, :c => 3}.sum # => [:b, 2, :c, 3, :a, 1]
對空集合呼叫sum預設回傳0，但你也可以改寫:

[].sum    # => 0
[].sum(1) # => 1
如果給予一個block，那麼會迭代執行集合中的元素運算後再將結果加總起來:

(1..5).sum {|n| n * 2 } # => 30
[2, 4, 6, 8, 10].sum    # => 30
空集合的元素也可以這樣被改寫:

[].sum(1) {|n| n**3} # => 1




8.3   each_with_object

inject方法可以為集合中的元素迭代的給予指定的元素並運算:

[2, 3, 4].inject(1) {|product, i| product*i } # => 24
如果給予inject的參數為一個空區塊，那麼inject會將結果整理成Hash，但需注意在運算的結尾必須回傳運算結果:

%w{foo bar blah}.inject({}) do |hash, string|
  hash[string] = "something"
  hash # 需要回傳運算結果
end
 => {"foo"=>"something" "bar"=>"something" "blah"=>"something"}
each_with_object這個方法也可以達到一樣的效果，差別在於你不用回傳運算結果:

%w{foo bar blah}.each_with_object({}){|string, hash| hash[string] = "something"}
=> {"foo"=>"something", "bar"=>"something", "blah"=>"something"}




8.4   index_by

index_by可以幫我們將集合元素以指定的欄位做為鍵值整理成Hash:

invoices.index_by(&:number)
# => {'2009-032' => <Invoice ...>, '2009-008' => <Invoice ...>, ...}
鍵值通常必須是唯一的，若不是唯一的話將會以最後出現的元素做為判斷值。



8.5   
many?

many?是可個好用的方法可以幫助我們快速的判斷集合的數量是否大於1:

# <% if pages.many? %>
#   <%= pagination_links %>
# <% end %>

如果對many?傳入區塊運算時，many?僅會回傳運算結果是true的結果:

@see_more = videos.many? {|video| video.category == params[:category]}







9.0    擴充 Array

9.1    隨機挑選

shape_type = ["Circle", "Square", "Triangle"].sample
# => Square, for example

shape_types = ["Circle", "Square", "Triangle"].sample(2)
# => ["Triangle", "Circle"], for example



9.2    增加元素

prepend會將新元素插入在整個陣列的最前方(index為0的位置)

%w(a b c d).prepend('e')  # => %w(e a b c d)
[].prepend(10)            # => [10]
append會將元素插入在陣列的最後方:

%w(a b c d).append('e')  # => %w(a b c d e)
[].append([1,2])         # => [[1,2]]



9.3    options_extractions!

在Rails中我們常常會看到一個方法可以傳入不定數量的參數，例如:

my_method :arg1
my_method :arg1, :arg2, :argN
my_method :arg1, :foo => 1, :bar => 2
一個方法能夠接收不定數量的多個參數主要仰賴的是extract_options!這個方法會幫我們將傳入的集合參數展開，若沒有傳入參數時這個方法便會回傳空Hash

def my_method(*args)
  options = args.extract_options!
  puts "參數:  #{args.inspect}"
  puts "選項:    #{options.inspect}"
end

my_method(1, 2)
# 參數:  [1, 2]
# 選項:    {}

my_method(1, 2, :a => :b)
# 參數:  [1, 2]
# 選項:    {:a=>:b}
因此extract_options!這個方法可以很方便的幫你展開一個陣列中選項元素，最主要的作用就是展開傳入方法的參數。



9.4     Grouping

in_groups_of方法可以將陣列依照我們指定的數量做分組:

[1, 2, 3].in_groups_of(2) # => [[1, 2], [3, nil]]
如果給予一個block的話可以將分組的元素做yield:

<% sample.in_groups_of(3) do |a, b, c| %>
  <tr>
    <td><%=h a %></td>
    <td><%=h b %></td>
    <td><%=h c %></td>
  </tr>
<% end %>
在元素數量不夠分組的時候預設在不足的元素部分補nil，像第一個例子中最後一個元素是nil，你也可以在呼叫in_groups_of方法的同時傳入第二個參數做為不足元素的填充值:

[1, 2, 3].in_groups_of(2, 0) # => [[1, 2], [3, 0]]
你也可以傳入false指定當元素不足的時候就不要以nil做為填充值，也由於這層關係你無法指定false來做為一個填充值:

[1, 2, 3].in_groups_of(2, false) # => [[1, 2], [3]]
in_groups_of這個方法最常拿來使用在當你頁面每一列想要有n個元素來呈現的時候，例如假設我們有一個待辦清單的網站，我們希望頁面上每一列可以有四筆清單，我們可以這樣寫:

<% @tasks.in_groups_of(4) do |tasks| %>
  <ul>
    <% tasks.each do |task| %>
      <li><%= task.name %></li>
    <% end %>
  </ul>
<% end %>
split這個方法會依照你給的條件來判斷陣列內的元素做分割:

[1, 2, 3, 4, 5].split(3)                # => [[1, 2], [4, 5]] 如果陣列內元素是3的話做分割
(1..10).to_a.split { |i| i % 3 == 0 }   # => [[1, 2], [4, 5], [7, 8], [10]] 如果陣內元素是3的倍數就做分割






10.0   擴充 Hash

10.1    Merging 合併

Ruby本身有Hash#merge方法來合併兩個Hash

{:a => 1, :b => 1}.merge(:a => 0, :c => 2)
# => {:a => 0, :b => 1, :c => 2}
reverse_merge與reverse_merge!

在合併Hash時可能會遇到有一樣的key造成需要判斷以哪個key值做為依據的情況:

a = {:a => 1, :b => 2}
b = {:a => 3, :c => 4}

a.merge(b) # Ruby 本身的 merge 不會改變原先呼叫的 hash，並且以後面的 hash 為優先產生一個新的 hash
=> {:a=>3, :b=>2, :c=>4}
a # => {:a=>1, :b=>2}
b # => {:a=>3, :c=>4}

a.reverse_merge(b) # reverse_merge 不會改變原先呼叫的 hash，以前面呼叫的 hash 為優先產生一個新的 hash
=> {:a=>1, :c=>4, :b=>2}
a # => {:a=>1, :b=>2}
b # => {:a=>3, :c=>4}

a.reverse_merge!(b) # reverse_merge! 會以前面呼叫的 hash 優先並直接改變原先呼叫的 hash，不會產生新的 hash
=> {:a=>1, :b=>2, :c=>4}
a # => {:a=>1, :b=>2, :c=>4}
b # {:a=>3, :c=>4}
因此reverse_merge這個方法常用在指定hash的預設值:

options = options.reverse_merge(:length => 30, :omission => "...")
deep_merge與deep_merge!

在兩個hash的鍵值相同，而值也是個hash的情況下，我們可以使用deep_merge將兩個hash組合:

{:a => {:b => 1}}.deep_merge(:a => {:c => 2})
# => {:a => {:b => 1, :c => 2}}
deep_merge!的版本則是會直接更改呼叫的hash值




10.2    Key 鍵值

10.2.1   except與except!

except方法可以將指定的鍵值從hash中移除:

{:a => 1, :b => 2}.except(:a) # => {:b => 2}
except通常用在我們更新資料時對一些不想被更改的資料欄位做保護的動作:

params[:account] = params[:account].except(:plan_id) unless admin?
@account.update(params[:account])
except!會直接更改原本呼叫的hash而不是產生一個新的hash



10.2.2    stringify_keys 與 stringify_keys!

stringify_keys可以將hash中的鍵值改為字串:

{nil => nil, 1 => 1, :a => :a}.stringify_keys
# => {"" => nil, "a" => :a, "1" => 1}
如果hash中有衝突發生，則以後者優先:

{"a" => 1, :a => 2}.stringify_keys
=> {"a"=>2}
這方法方便我們將傳入的hash做一致性的處理，而不用去考慮使用者傳入的hash是用symbol或是字串

stringify_keys!的版本會直接更改呼叫的hash值

symbolize_keys與symbolize_keys!

symbolize_keys則是會把hash中的鍵值都呼叫to_sym方法將之改為symbol:

{nil => nil, 1 => 1, "a" => "a"}.symbolize_keys
# => {1 => 1, nil => nil, :a => "a"}
如果hash中有衝突發生，以後面的優先:

{"a" => 1, :a => 2}.symbolize_keys
=> {:a=>2}
symbolize_keys!版本會直接更改呼叫的hash值



10.2.3        to_options與to_options!

to_options與to_options!方法作用與symbolize_keys方法是一樣的




10.2.4     assert_valid_keys

assert_valid_keys是用來指定hash鍵值的白名單，沒有在白名單裡的鍵值出現在hash中都會拋出例外:

{:a => 1}.assert_valid_keys(:a) # => {:a=>1}
{:a => 1}.assert_valid_keys("a") # ArgumentError: Unknown key: a




10.3   分割 Hash

slice方法可以幫我們從hash中切出指定的值:

{:a => 1, :b => 2, :c => 3}.slice(:a, :c)
# => {:c => 3, :a => 1}

{:a => 1, :b => 2, :c => 3}.slice(:b, :X)
# => {:b => 2} # 不存在的值會被忽略
這方法也常用來做為檢驗hash的白名單使用，將核可的值從hash中抽出
slice!的版本會直接更改呼叫的hash值




10.4     抽取

extract!方法會將hash中指定的值取出變為一個新的hash，並將原先的hash中減去我們抽取出來的部分:

hash = {:a => 1, :b => 2}
rest = hash.extract!(:a) # => {:a => 1}
hash                     # => {:b => 2}









11.0  擴充 DateTime


# DateTime本身已經寫好很多實用的方法可以方便我們計算時間:

# yesterday
# tomorrow
# beginning_of_week (at_beginning_of_week)
# end_of_week (at_end_of_week)
# monday
# sunday
# weeks_ago
# prev_week
# next_week
# months_ago
# months_since
# beginning_of_month (at_beginning_of_month)
# end_of_month (at_end_of_month)
# prev_month
# next_month
# beginning_of_quarter (at_beginning_of_quarter)
# end_of_quarter (at_end_of_quarter)
# beginning_of_year (at_beginning_of_year)
# end_of_year (at_end_of_year)
# years_ago
# years_since
# prev_year
# next_year


# DateTime並不支援日光節約時間
DateTime.current類似於 Time.now.to_datetime，但他的結果會依使用者本身的時區而定，如果在時區有設定的情況下，還會有些其他好用的方法像是DateTime.yesterday、DateTime.tomorrow，也可以使用像是past?及future?來與DateTime.current做判斷

seconds_since_midnight會回傳從午夜00:00:00到指定時間所經過的秒數:

now = DateTime.current     # => Mon, 07 Jun 2010 20:26:36 +0000
now.seconds_since_midnight # => 73596
utc可以把時間轉為UTC格式

now = DateTime.current # => Mon, 07 Jun 2010 19:27:52 -0400
now.utc                # => Mon, 07 Jun 2010 23:27:52 +0000
utc?可以判斷是否為UTC格式

now = DateTime.now # => Mon, 07 Jun 2010 19:30:47 -0400
now.utc?           # => false
now.utc.utc?       # => true
advance是個非常好用的方法，當我們想要找出相對於一個時間加加減減後的另一個時間非常好用:

d = DateTime.current
# => Thu, 05 Aug 2010 11:33:31 +0000
d.advance(:years => 1, :months => 1, :days => 1, :hours => 1, :minutes => 1, :seconds => 1)
# => Tue, 06 Sep 2011 12:34:32 +0000
要注意的是你如果呼叫多次advance去做計算，其結果可能與呼叫一次是有差異的，你可以參考下面的例子:

d = DateTime.new(2010, 2, 28, 23, 59, 59)
# => Sun, 28 Feb 2010 23:59:59 +0000
d.advance(:months => 1, :seconds => 1)
# => Mon, 29 Mar 2010 00:00:00 +0000
d.advance(:seconds => 1).advance(:months => 1)
# => Thu, 01 Apr 2010 00:00:00 +0000
change可以傳入參數給指定的時間將它改為我們想要的時間:

now = DateTime.current
# => Tue, 08 Jun 2010 01:56:22 +0000
now.change(:year => 2011, :offset => Rational(-6, 24))
# => Wed, 08 Jun 2011 01:56:22 -0600 將年份跟時區指定為我們傳入的參數
如果你傳入的參數只有hour的時候並且為0的時候，分鐘及秒數都會被設為0:

now.change(:hour => 0)
# => Tue, 08 Jun 2010 00:00:00 +0000
同樣的，如果傳入的參數只有min並且值為0的時候，秒數就會被設為0:

now.change(:min => 0)
# => Tue, 08 Jun 2010 01:00:00 +0000
DateTime也可以方便得用時間間隔來做加減:

now = DateTime.current
# => Mon, 09 Aug 2010 23:15:17 +0000
now + 1.year
# => Tue, 09 Aug 2011 23:15:17 +0000
now - 1.week
# => Mon, 02 Aug 2010 23:15:17 +0000








12.0    擴充 Time

Time繼承從DateTime來很多好用的方法:

# past?
# today?
# future?
# yesterday
# tomorrow
# seconds_since_midnight
# change
# advance
# ago
# since (in)
# beginning_of_day (midnight, at_midnight, at_beginning_of_day)
# end_of_day
# beginning_of_week (at_beginning_of_week)
# end_of_week (at_end_of_week)
# monday
# sunday
# weeks_ago
# prev_week
# next_week
# months_ago
# months_since
# beginning_of_month (at_beginning_of_month)
# end_of_month (at_end_of_month)
# prev_month
# next_month
# beginning_of_quarter (at_beginning_of_quarter)
# end_of_quarter (at_end_of_quarter)
# beginning_of_year (at_beginning_of_year)
# end_of_year (at_end_of_year)
# years_ago
# years_since
# prev_year
# next_year


Time的change方法接受一個額外的參數:usec
Time不同於DateTime，是能正確計算出時區間的差異，DateTime是不支援時光節約時間的
Time.zone_default
# => #<ActiveSupport::TimeZone:0x7f73654d4f38 @utc_offset=nil, @name="Madrid", ...>

# In Barcelona, 2010/03/28 02:00 +0100 becomes 2010/03/28 03:00 +0200 due to DST.
t = Time.local_time(2010, 3, 28, 1, 59, 59)
# => Sun Mar 28 01:59:59 +0100 2010
t.advance(:seconds => 1)
# => Sun Mar 28 03:00:00 +0200 2010
使用since或是ago時，如果得到的時間無法用Time來呈現時，會自動轉型為DateTime



12.1    Time.current

Time.current類似於Time.now會回傳現在時間，唯一的差別在於Time.current會依照使用者的時區來回傳，在有定義時區的情況下你也可以使用像是Time.yesterday、Time.tomorrow的方法，以及像是past?、today?、future?等用來與Time.current比較的方法

也因為如此，當我們在做時間的處理時盡量使用像是Time.current而少用Time.now，不然很有可能會出現時區問題所造成的錯誤計算





12.2     all_day、all_week、all_month、all_quarter 與 all_year

上面所列的all_*方法會回傳與指定時間相較的一個區間:

now = Time.current
# => Mon, 09 Aug 2010 23:20:05 UTC +00:00
now.all_day
# => Mon, 09 Aug 2010 00:00:00 UTC +00:00..Mon, 09 Aug 2010 23:59:59 UTC +00:00
now.all_week
# => Mon, 09 Aug 2010 00:00:00 UTC +00:00..Sun, 15 Aug 2010 23:59:59 UTC +00:00
now.all_month
# => Sat, 01 Aug 2010 00:00:00 UTC +00:00..Tue, 31 Aug 2010 23:59:59 UTC +00:00
now.all_quarter
# => Thu, 01 Jul 2010 00:00:00 UTC +00:00..Thu, 30 Sep 2010 23:59:59 UTC +00:00
now.all_year
# => Fri, 01 Jan 2010 00:00:00 UTC +00:00..Fri, 31 Dec 2010 23:59:59 UTC +00:00






12.3     Time Constructors

Active Support定義了 Time.current，等同於Time.zone.now，如果使用者已經有定義時區的話，那麼Time.now也會得到一樣的效果:

Time.zone_default
# => #<ActiveSupport::TimeZone:0x7f73654d4f38 @utc_offset=nil, @name="Madrid", ...>
Time.current
# => Fri, 06 Aug 2010 17:11:58 CEST +02:00
local_time這個class method可以幫助我們建立基於使用者時區設定的時間物件:

Time.zone_default
# => #<ActiveSupport::TimeZone:0x7f73654d4f38 @utc_offset=nil, @name="Madrid", ...>
Time.local_time(2010, 8, 15)
# => Sun Aug 15 00:00:00 +0200 2010
utc_time可以回傳UTC格式的時間物件:

Time.zone_default
# => #<ActiveSupport::TimeZone:0x7f73654d4f38 @utc_offset=nil, @name="Madrid", ...>
Time.utc_time(2010, 8, 15)
# => Sun Aug 15 00:00:00 UTC 2010
local_time與utc_time這兩個方法都接受七個時間參數:year、month、day、hour、min、sec以及usec，year是必填參數，month和day預設為1，而其他參數預設為0

時間也可以使用簡單的加減:

now = Time.current
# => Mon, 09 Aug 2010 23:20:05 UTC +00:00
now + 1.year
#  => Tue, 09 Aug 2011 23:21:11 UTC +00:00
now - 1.week
# => Mon, 02 Aug 2010 23:21:11 UTC +00:00





13   Concerns

假設我們現在有一個Module A與Module B有相依關係：

Module A
  self.included(base)
    include B
    # 當 Module A 被 include 後便 include Module B
  end
end
今天當我們想要include Module A時，由於Module A與Module B的相依關係，我們必須同時將兩個Module都include進來：

class Something
  include A, B
end
但我們其實沒有必要我想要include的Module之間的相依關係，如此便有了ActiveSupport::Concern的意義，就是讓我們只需要include我們想要使用的Module，其他的相依關係我們不需要去考慮他，你所需要作的只是在Module A中extend ActiveSupport::Concern：

Module A
  extend ActiveSupport::Concern
  included do
    include B
    # 當 Module A 被 include 後便 include Module B
  end
end
如此一來我們只需要include A就可以搞定了！






14   Benchmarks

benchmark方法可以用來測試template的執行時間並記錄起來：

# <% benchmark "Process data files" do %>
#   <%= expensive_files_operation %>
# <% end %>

這樣將會在你的log記錄中增加一筆像是“Process data files (345.2ms)”的紀錄，你便可用來測量並改善你的程式碼。

你也可以設定log的層級，預設是info：

# <% benchmark "Low-level files", :level => :debug do %>
#   <%= lowlevel_files_operation %>
# <% end %>






15    Configurable

Configurable這個模組是Rails本身用來作為AbstractController::Base的設定使用，我們可以借用這個功能來為我們的類別增加設定選項：

class Employee
  include ActiveSupport::Configurable
end

employee = Employee.new
employee.config.sex = male
employee.config.permission = :normal
employee.config.salary = 22000


# config_accessor方法可以幫助我們將這些設定轉為方法：

class Employee
  include ActiveSupport::Configurable
  config_accessor  :sex, :permission, :salary

  # 現在你可以使用 employee.sex, employee.permission, employee.salary 來取用這些設定
end


上面的範例讓每個Employee的實例變數都能有自己的設定，但其實我們也可以有類別層級的設定讓每個實例變數都能共享設定：

# 設定類別層級的設定
Employee.config.duty_hour = 8

# 新增一個employee
employee = Employee.new
employee.config.duty_hour # => 8

# 由實例變數更改設定
employee.config.duty_hour = 5

# 會更改類別層級設定
Employee.config.duty_hour # => 5

























































