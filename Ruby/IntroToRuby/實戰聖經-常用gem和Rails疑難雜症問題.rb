實戰聖經-常用gem.rb
# 這一章介紹一些常見的Rails疑難雜症問題，以及常用的RubyGem套件。更多熱門套件可以參考The Ruby Toolbox和awesome-ruby。
https://www.ruby-toolbox.com/
https://github.com/markets/awesome-ruby

# ruby-china  的
if ENV['USE_OFFICIAL_GEM_SOURCE']
  source 'https://rubygems.org'
else
  source 'https://ruby.taobao.org'
end

ruby '2.3.0'

gem 'rails', '5.0.0.beta2'
gem 'sprockets'
gem 'sass-rails'
gem 'coffee-rails'
gem 'uglifier'
gem 'jquery-rails'
gem 'jbuilder'
gem 'turbolinks', github: 'rails/turbolinks'
gem 'jquery-turbolinks'
gem 'dropzonejs-rails'

gem 'rails-i18n'
gem 'http_accept_language'
gem 'rails_autolink'
gem 'md_emoji'
gem 'exception_notification'

gem 'doorkeeper', github: 'doorkeeper-gem/doorkeeper'
gem 'doorkeeper-i18n'

# gem 'rails-perftest'
# gem 'ruby-prof'

# 上传组件
gem 'carrierwave'
gem 'carrierwave-upyun'
gem 'mini_magick'

gem 'rucaptcha'
gem 'letter_avatar'

gem 'pg'

# remove this after migrate MongoDB into PostgreSQL
gem 'mongo', require: false

# 用户系统
gem 'devise', '~> 4.0.0.rc1'
gem 'devise-encryptable'

# 分页
gem 'will_paginate'

# 搜索
gem 'elasticsearch-model'
gem 'elasticsearch-rails'

# 三方平台 OAuth 验证登陆
gem 'omniauth'
gem 'omniauth-github'

# permission
gem 'cancancan', '~> 1.13.1'

gem 'redis'
gem 'hiredis'
# Redis 命名空间
gem 'redis-namespace'
# 将一些数据存放入 Redis
gem 'redis-objects'

gem 'rails-settings-cached'

# Markdown 格式 & 文本处理
gem 'redcarpet', '~> 3.3.4'
gem 'rouge', '~> 1.8.0'
gem 'auto-space'
gem 'nokogiri'

# YAML 配置信息
gem 'settingslogic'

# 队列
gem 'sidekiq'
# Sidekiq Web
gem 'sinatra', github: 'sinatra/sinatra', require: nil

# 分享功能
gem 'social-share-button'

# 表单
gem 'simple_form'

# API
gem 'grape'
gem 'active_model_serializers', '0.9.2'
gem 'grape-active_model_serializers'

# Mailer
gem 'postmark'
gem 'postmark-rails'

# Dalli, kgio is for Dalli
gem 'kgio'
gem 'dalli'

gem 'puma'

gem 'parallel'

# for api 跨域
gem 'rack-cors', require: 'rack/cors'
gem 'rack-utf8_sanitizer'

# Mini profiler
gem 'rack-mini-profiler', github: 'MiniProfiler/rack-mini-profiler', require: false

gem 'oneapm_rpm'

group :development do
  gem 'capistrano', '2.9.0', require: false
  gem 'rvm-capistrano', require: false
  gem 'capistrano-sidekiq'

  gem 'derailed'

  # Better Errors
  gem 'better_errors'
  gem 'binding_of_caller'
end

group :development, :test do
  gem 'rubocop'

  gem 'rspec-rails', github: 'rspec/rspec-rails'
  gem 'rspec-mocks', github: 'rspec/rspec-mocks'
  gem 'rspec-core', github: 'rspec/rspec-core'
  gem 'rspec-support', github: 'rspec/rspec-support'
  gem 'rspec-expectations', github: 'rspec/rspec-expectations'
  gem 'rspec', github: 'rspec/rspec'

  gem 'rails-controller-testing'

  gem 'factory_girl_rails', '~> 4.5.0'
  gem 'database_cleaner'
  gem 'capybara'

  gem 'jasmine-rails', '~> 0.10.2'

  gem 'colorize'
  gem 'letter_opener'

  gem 'bundler-audit', require: false
end





1.0  Bootstrap
Bootstrap是目前最流行的前端設計框架，讓開發者也可以很輕鬆的進行網頁排版，也很有多現成的Theme可以套用。要在Rails使用Bootstrap，請安裝bootstrap-sass
如果搭配分頁套件kaminari的話，執行rails generate kaminari:views bootstrap3就會產生對應的kaminari樣板。


2.0  ActiveReord增強

2.1  列表結構(自訂排列順序)
搭配 jQuery UI Sortable 就可以做出拖拉排序，可以參考 Sortable Lists這篇文章。

ActsAsList
ranked-model



2.2  樹狀結構

ActsAsTree
ancestry
awesome_nested_set


2.3   加強搜尋

Ransack可以很快的針對ActiveRecord做出排序和複雜的條件搜尋。

2.4  Tagging 標籤

acts-as-taggable-on 製作 Tag 功能。

2.5   Soft Deletion 和版本控制，編輯和刪除後還可以留下紀錄和還原，

paper_trail 另開一個 versions table 完整紀錄
paranoia 加一個欄位標記被刪除

2.6  有限狀態機，適合用來設計比較複雜的 model 流程狀態

aasm

2.7   資料表註解，會幫你在model code上面註解加上所有資料表的欄位

annotate_models

2.8   根據ActiveRecord的關聯自動產生漂亮的Entity-Relationship Diagrams

rails-erd




3.0  處理 HTTP

請參考 HTTP client 這篇文章。推薦 httpclient 或 faraday。
https://ihower.tw/blog/archives/2941
https://github.com/nahi/httpclient
https://github.com/lostisland/faraday



4.0   PDF

Prawn 可以產生 PDF，支援 Unicode。
PDFKit 則是另一個有趣的產生方式，透過 HTML/CSS 轉 PDF。
Prince 是一套商用方案，將 HTML/CSS 轉 PDF
https://github.com/practicingruby/prawn
http://thinkrelevance.com/blog/2010/06/15/rethinking-pdf-creation-in-ruby
http://www.princexml.com/


5.0  CSV

Ruby就有內建這個函式庫了，只需要require "csv"即可使用。


6.0  JSON

Rails 內建就有 ActiveSupport JSON，用法如下：

ActiveSupport::JSON.encode( [ {:a => 1 , :b => 2 } , "c", "d" ] )
=> "[{\"a\":1,\"b\":2},\"c\",\"d\"]" 	

ActiveSupport::JSON.decode( "[{\"a\":1,\"b\":2},\"c\",\"d\"]" )
=> [{"a"=>1, "b"=>2}, "c", "d"] 
yajl-ruby 則是一套底層用C，比較快很多的 JSON parser，建議可以讓Rails底層改用這套函式庫，請在Gemfile檔案中加入

gem 'yajl-ruby', :require => 'yajl'



7.0   YAML

Rails 的資料庫設定檔 database.yml 是用一種叫 : YAML Ain’t Markup Language 的格式所撰寫，檔案打開來，看起來就像一般的 plain 設定檔，非常容易修改。

YAML 的設計首要目標就是要讓使用者容易看懂，可以和 script 語言搭配良好。用途有 資料序列化 data serialization、設定檔 configuration settings、log files、Internet messaging、filtering 等。網站上已知有支援的 script 語言有 Python,Ruby,Java,PHP,Perl,Javascript 等。

require ‘yaml’

ps2 = YAML.load_file(‘example.yaml’)
ps2.each do |it|
  puts it.inspect
end



8.0   表單

除了用Rails內建的表單Helper，也有一些提供表單設計更方便的套件：

simple_form
formtastic


9.0   Admin 介面

ActiveAdmin
RailsAdmin


10.0  如何畫圖表

使用 GoogleCharts 是最簡單的方式。 如果您使用 jQuery，flot 是一套不錯的圖表工具。


11   Recapache

Recaptcha 是做 captcha 最簡單快速的方式。


12   排程工具

如果您有週期性的任務需要執行，除了可以透過Linux的crontab設定去執行rake腳本。例如輸入crontab -e加入：

0 2 * * * cd /home/your_project/current/ && RAILS_ENV=production /usr/local/bin/rake cron:daily
就是每天凌晨兩點執行rake cron:daily這個任務。

或是你可以安裝whenever這個 gem，就可以用Ruby的語法來定義週期性的任務，可以很方便的設定伺服器上的cron排程。


13   自動備份

https://github.com/meskyanichi/backup
可以搭配 whenever 就可以定期備份了


14   升級Rails

小版號的升級，通常透過以下步驟即可完成：

修改Gemfile的Rails版本： gem 'rails', '3.1.1'
執行bundle update
執行rake rails:update 會嘗試更新Rails自己產生的檔案，例如config/boot.rb，請一一手動檢查。
升級前，也請參閱官方公告的升級注意事項。



15   如何變更 ActiveRecord 預設的資料表和主鍵名稱

如果要將Rails沿用上舊有的資料庫上，就會發生的資料表名稱和主鍵名稱不是 Rails 預設慣例的情況，也就是表格名稱不是Model名稱的複數型，主鍵不叫id。這時候我們可以手動設定過，例如以下 Model 預設的資料表和主鍵是legacy_comments和id，但是我們想要改成comment和comment_id：

class LegacyComment < ActeveRecord::Base
    self.table_name = :comment
    self.primary_key = :comment_id
end






















