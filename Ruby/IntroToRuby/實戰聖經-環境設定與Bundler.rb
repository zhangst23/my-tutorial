環境設定與Bundler.rb

1.0  目录结构
app/
	controllers
	models
	views
	helpers
	assets


config/

db/

doc/

lib/
	tasks

log/

public/

bin/

test/

tmp/

vendor/assets

config.ru
Gemfile
README.md
Rakefile



2.0  多重环境

Rails 應用程式預設提供了三種不同的執行模式：

# development environment 開發模式，用在你的開發的時候
# test environment 測試模式，用在執行測試程式時
# production environment 正式上線模式，用在實際的上線運作環境




3.0   Rails 指令

generate 可縮寫為 g
console 可縮寫為 c
server 可縮寫為 s
new  ： rails new my_app --database=mysql






4.0    
4.1  環境設定檔

我們在上一節”多重環境設定”曾經介紹不同環境會有不同的設定檔，讓我們來更深入看看有哪些設定值，以及這些值是如果影響 Development、Production 和 Test 環境的不同：

Development 模式


Production 模式


Test 模式




4.2   資料庫設定檔 database.yml



5.0   Bundler 與 Gemfile 設定檔

安裝及更新 Gems
bundle install

bundle update gem_name 則會更新此 gem 的版本

bundle update 則會檢查所有的 gem 更新到最新版本

一般來說你只需要在每次 Gemfile 修改後，執行 bundle install 即可。如果有套件關連性 bundle install 無法解決，它會提示你執行 bundle update。

5.1
bundle install   不會幫你升級現有的 Gem。
而 bundle update 會重新產生整個 Gemfile.lock 檔案，更新所有 Gem 到最新版本
因此會建議如果要升級，請執行 bundle update gem_name 一次升級一個套件。


5.2 
bundle outdated   這個指令就會列出有新版本可以升級的gems。

bundle open GEM_NAME   如果你想知道打開套件的原始碼，可以輸入：




6.0   打包 Gems

執行以下指令，會將所有用到的 Gems 打包進 vendor/cache 目錄。如此執行 bundle install 時就不會連線到 http://rubygems.org 下載套件。

bundle package
什麼時候需要用到這個功能呢？例如你希望佈署的時候避免外部連線，或是你有非公開的 gems 不會上傳到 http://rubygems.org 網站上






7.0    命名


7.1   Model 命名

類別名稱使用大寫、單數，沒有底線。而檔名使用小寫、單數，用底線。資料庫表格名稱用小寫且為複數。例如：

資料庫表格 line_items
檔名 app/models/line_item.rb
類別名稱 LineItem


7.2   Controller 命名

假設有一個stores controller的話：

檔名 app/controllers/stores_controller.rb
類別名稱 StoresController
如果需要將controllers檔案做分類，這時候可以使用Module，將檔案放在子目錄下，例如後台專用的controllers：

檔名 app/controllers/admin/stores_controller.rb
類別名稱 Admin::StoresController


7.3    View 命名

例如一個叫做 People 的 controller，其中的 index action：

檔名 app/views/people/index.html.erb
Helper 名稱 module PeopleHelper
檔名 app/helpers/people_helper.rb





8.0   Rails 元件導覽

Rails 包含許多個別的函式庫元件：

Action Pack
Action Controller
Action Dispatch
Action View
Action Mailer
Active Model
Active Record
Active Support
Railties
Action Pack

Action Pack 是個包含 Action Controller、Action View 和 Action Dispatch 的 gem。也就是 “MVC” 中的 “VC” 部分。

Action Controller

Action Controller 是 Rails 應用程式中，管理 Controllers 的元件。Action Controller 框架處理傳給 Rails 的 HTTP 請求，萃取出參數，然後分派給所屬的 Action。Action Controller 還提供了 session 管理、樣板演算顯示(template rendering) 和 redirect 功能。

Action View

Action View 負責 Rails 應用程式中的 Views。它預設可以產生 HTML 或 XML 輸出。Action View 負責樣板的演算顯示(template rendering)，包括嵌套(nesting)或局部(partial)樣板，甚至也內建支援一些 Ajax。

Action Dispatch

Action Dispatch 處理 HTTP 請求的路由(routing)，它把 HTTP 請求發派(dispatch)到它該去的地方，也許是你的應用程式或其他 Rack 程式。

Action Mailer

Action Mailer 是個建構 E-mail 功能的框架。你可以使用 Action Mailer 來接收來信，或是使用樣板來寄出純文字或複雜的 multipart 信件。

Active Model

Active Model 在 Action Pack gem 和 ORM gem (例如 Active Record) 之間定義了一組介面。Active Model 允許 Rails 可以依你的需求把 Active Record 換成其他 ORM 框架。

Active Record

Active Record 是 Rails 應用程式中的 Models 基礎。它不依存特定的資料庫系統，提供了 CRUD 功能、先進的查詢能力以及可以跟其他 Models 關聯的本事。

Active Support

Active Support 是 Rails 裡的工具函式庫，它也擴充了一些 Ruby 標準函式庫。除了被用在 Rails 核心程式中，你也可以在你的程式中使用。

Railties

Railties 是 Rails 的核心程式碼，用來把以上各種的框架函式庫以及 Plugin 全部組合在一起。






