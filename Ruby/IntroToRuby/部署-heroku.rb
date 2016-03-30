部署.rb

1.heroku 部署
1.1 添加 product gem 到 Gemfile
group :production do  
  gem 'pg', '0.15.1'  
  gem 'rails_12factor', '0.0.2'  
end  

group :production do  
  gem 'mysql2' 
  gem 'pg'
  gem 'rails_12factor' 
end  


1.2 
bundle install --without production  
git commit -a -m "Update Gemfile.lock for Heroku"  

# 假如部署至Heroku不成功，可以尝试运行一下
rake assets:precompile  
# 或者 RAILS_ENV=production bundle exec rake assets:precompile


git add .  
git commit -m "Add precompiled assets for Heroku"  

heroku login  
heroku create  
git push heroku master 


1.3 
在本地执行 rails s -e production 查看是否正常
执行 heroku run rake assets:precompile

1.4 I could not view the site with bootstrap CSS on Heroku so I did the following change on config/environments/production.rb, change the line:

（翻译：我不能在heroku部署的应用上上看到bootstrap的css样式，所以我在config/environments/production.rb这个文件做了如下改动）

config.assets.compile = false
To:

config.assets.compile = true
哈哈，问题就解决了！多谢多谢！！！！！！IT WORKS！

1.5

0
down vote
From your command prompt, run: bundle exec rake secret

It will generate a long string of characters. Copy this string and paste it into config/secrets.yml as follows:

production:
  secret_key_base: <paste the string here>
Note: only do this if you are not using a public repository. This key should not be accessible to anyone else. An alternate, and more secure way of doing this is using an environment variable. See this: http://daniel.fone.net.nz/blog/2013/05/20/a-better-way-to-manage-the-rails-secret-token/




############################################
1.0
Q: Git push failing after Heroku app name change

# Renaming without a checkout
# You can rename an app while outside a git checkout by passing an explicit --app argument:
$ heroku apps:rename newname --app oldname

















