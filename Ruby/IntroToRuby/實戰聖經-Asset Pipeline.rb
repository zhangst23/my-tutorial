實戰聖經-Asset Pipeline.rb



1.0   
讓我們看看View，在Layout檔案中：

<%= stylesheet_link_tag    "application" %>
<%= javascript_include_tag "application" %>
因為最後輸出都壓縮成一個檔案了，所以這裡只需要載入application.css和application.js。

除了require_tree之外，還有其他的用法，你都可以使用絕對或是相對路徑來指定檔案位置，副檔名可有可無：

require [路徑]:載入某支特定檔案，如果這支檔案被載入多次，Sprockets 也會很聰明的只幫你載入一次。
include [路徑]:與require一樣，差別在即使是被載入過的檔案也會再被載入。
require_directory [路徑] : 將路徑下不包含子目錄的檔案按照字母順序依次載入。
require_tree [路徑] : 會將路徑下包含子目錄的檔案全部載入。
require_self [路徑] : 告訴 Sprockets 再載入其他的檔案前，先將自己的內容插入。
depend_on [路徑] : 宣告依賴於某支 js，在需要通知某支快取的 assets 過期時非常實用。
stub [路徑] : 將路徑中的 assets 加入黑名單，所有其他的 require 都不會將他載入。




2.0  
在Rails中的assets目錄其實有三個：

app/assets(通常放置我們自己為了自己的程式所寫的 js、css 或是 images)
lib/assets(通常是我們所使用的套件中去用到的 assets)
vendor/assets(通常是放一些我們從別的地方借用的 assets，例如說一些 jQuery 的套件)




3.0   如何處理圖片

在一般的View中，可以使用image_tag這個Helper：

<%= image_tag("rails.png") %> >
3.1  如果在CSS裡的話，有兩種辦法：一是將檔案命名為erb結尾，例如app/assets/stylesheets/main.css.erb，然後使用asset_path這個Helper：

h1 {
  background-image: url('<%= asset_path("rails.png") %>');
}

3.2  另一種方法是使用Sass或SCSS語法。其中SCSS相容於CSS。例如命名為app/assets/stylesheets/main.scss，然後使用image-url這個Sass提供的方法：

h1 {
    background-image: image-url("rails.png")
}
如果是js檔案中想要拿圖片的位置，就只能用js.erb的格式，然後內嵌asset_path Helper方法了。



4.0  其他 Helper





5.0   編譯出最後結果

# 開發的時候，Rails會自動將Asset的壓縮結果快取在tmp下，所以開發者不需要特別處理。但是實際正式上線時，最後壓縮的檔案還是必須放在public目錄下由網頁伺服器直接提供(或是由CDN)效能較好，以下的rake指令可以產生出來：

rake assets:precompile
# 產生出來的檔案在public/assets/下。

rake assets:clobber
# 這樣會刪除。

注意，如果在開發模式下執行了rake assets:precompile，那麼因為放在public/assets/下的靜態檔案會優先丟給瀏覽器，所以這時候再修改app/assets下的原始碼會沒有作用。所以，開發時請記得要刪除這個目錄。

不過，如果你有很多靜態檔案的話，開發模式下每次都要重新編譯太辛苦了。你可以先compile一次，然後把public/assets/下目前正在開發的檔案砍掉即可。




6.0   如何拆成數個壓縮檔

上述的application.js或application.css中，預設會壓縮所有app/assets目錄下的檔案，如果你需要拆開，只需要修改其中的內容把require_tree那行移除，那麼就只會壓縮你所指定的目錄或檔案。

例如，要新增新的Manifest檔案的話，假設叫做app/assets/javascripts/search.js，內容如：

//= require ./foobar
這樣就會將assets/javascripts/foobar這個目錄下的檔案通通壓縮成search.js，而在View中：

<%= javascript_include_tag "application" %>
<%= javascript_include_tag "search" %>
就會載入。注意到如果啟用了assets功能，javascript_include_tag只能接受一個參數，即Manifest檔案的名稱。

為了讓rake assets:precompile也能產生新的壓縮檔案，你還需要編輯config/initializers/assets.rb加入：

Rails.application.config.assets.precompile += %w( search.js )













