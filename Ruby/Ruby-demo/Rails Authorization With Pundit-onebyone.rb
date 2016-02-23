

rails new pundit-app --database=postgresql --skip-test-unit
***
# add some gem
source 'https://rubygems.org'

gem 'rails', '4.2.5'
gem 'pg', '~> 0.15'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc

gem 'devise'
gem 'auto_html'
gem 'acts_as_votable'
gem 'faker'
gem 'pundit'

# design
gem 'font-awesome-rails'
gem 'bourbon'
gem 'neat'
# gem 'refills'
gem 'normalize-rails'

group :development, :test do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'capybara'
  gem 'database_cleaner'
  gem 'shoulda-matchers'
  gem 'faker'
end

***
bundle
***
#  delete gem 'faker'
bundle
***
git init
git add .
git commit -m "first commit"
***
rails g rspec:install
# 调整 spec/rails_helper.rb 里的 相关配置
***
rspec
git add .
git commit -m "adds rspec"
***
mkdir spec/features
touch spec/features/sign_in_spec.rb
# 编写 feature 'Sign in', :devise do - end
***
mkdir spec/support
mkdir spec/support/features
touch spec/support/features/session_helper.rb
# 
***
rake db:create
# sign_in_spec.rb  测试内容
rspechttp://translate.google.cn/?hl=zh-CN
***
rails g devise:install
rails g controller static_pages

#
rails g devise User
rake db:migrate
***
git add .
git commit -m "devise User" 
**

























