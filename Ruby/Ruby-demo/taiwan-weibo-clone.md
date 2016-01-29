# 神秘的 X 项目 taiwan-weibo-clone

rvm gemset create rails-x  
gem install rails -v 3.2.3  
rails new x_weibo --skip-test-unit --skip-bundle  
首先你需要安装 PostgreSQL  
改动 Gemfile  
设定 config/database.yml  
bundle install --binstubs --without production  
***
rails generate rspec:install  
修改.gitignore 内容  
mv README.rdoc README.md  
***
git init
git add .
git commit -m 'Init Commit'  
***
去 Github 创一个新的 repo 哦 
git remote add origin git@github.com:<username>/your-repo-name.git
git push -u origin master
接下了是新增一个 heroku 域名（如果你还没设置好 Heroku，这里有步骤)
heroku create --stack cedar
git push heroku master
之后如何推送、上传到 Github：
git push
之后如何推送、上传到 Heroku：
git push heroku
***
git checkout -b static_pages  
rails generate controller StaticPages home help --no-test-framework  
***
git add .
git commit -m 'Add a StaticPages controller
***
rails generate integration_test static_pages  





