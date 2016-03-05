4.用户登录系统.rb

```
gem 'devise'
rails generate devise:install
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
root to: "home#index"
rails generate devise:views
rails generate devise:views users
```

```
devise :database_authenticatable, :registerable, :confirmable, :recoverable, stretches: 20
rails generate devise MODEL
before_action :authenticate_user!
user_signed_in?
current_user
user_session
```



