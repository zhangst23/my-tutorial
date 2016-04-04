# Deploying to a VPS

rails new blog -d postgresql  
rails g scaffold article name content:text  

***

取得 ssh root@72.14.183.289  并输入命令行 后 进入 root@li45-209 命令行中  
apt-get -y update  
apt-get -y install curl git-core python-software-properties  
add-apt-repository ppa:nginx/stable  
apt-get -y update  
apt-get -y install nginx  
serveice nginx start 


***
add-apt-repository ppa:pitti/postgresql  
apt-get -y update  
apt-get -y install postgresql libpq-dev  
sudo -u postgres psql  进入 postgres 命令行中
postgres=# 命令行下输入： \password  
postgres=# 命令行下输入： create user blog with password 'secret';  
postgres=# 命令行下输入： create database blog_production owner blog;  
postgres=# 命令行下输入：\q（退出，进入 root@li45-209 命令行中）
***

apt-get -y install telnet postfix  
选择 Internet Site 进入  
nadd-apt-repository ppa:chris-lea/node.js  
apt-get -y update  
apt-get -y install nodejs 

***
whoami  
adduser deployer --ingroup admin  
su deployer(退出，进入本地命令行)  
***

(从 gitgub 中安装 fesplugas/rbenv-installer) curl https://raw.githubusercontent.com/fesplugas/rbenv-installer/master/bin/rbenv-installer | bash  
vim ~/.bashrc 
wq （退出）  
. ~/.bashrc  
rbenv bootstrap-ubuntu-10-04  
rbenv install 1.9.3-p125  
rbenv global 1.9.3-p125  
ruby -v  
gem install bundler --no-ri --no-rdoc  
rbenv rehash  
bundle -v  

***

ssh git@github.com  
在 github 建立空的同名 blog 仓库  
mate .gitignore   进入 .gitignore 文件  
添加 ： /config/database.yml  
blog命令行下输入： config/database.yml config/database.example.yml  
git init  
git add .  
git commit -m "initial commit" 
从空仓库中复制并输入命令行： git remote add origin git@github.com:ryanb/blog.git  
git push origin master  

***

gem 'unicorn'  gem 'capistrano'  (从Gemfile中恢复)  
bundle  
capity .  
进入 app/Capfile 中 恢复 load 'deploy/assets'  

***

在 config 中 创建 nginx.conf 文件  和 unicorn.rb 文件  和 unicorn_init.sh 文件  
chmod +x config/unicorn_init.sh  
git add .  
git commit -m "deployment configs"  
git push  

***

cap deploy:setup  
输入 password  
ssh deployer@72.14.183.289  
输入 password  
cd apps/blog/shared/config/  
vim database.yml  
添加 production 中 host: localhost  和  password: secret 
exit  退出 

***

ssh deployer@72.14.183.289  
exit  
ssh-add  
ssh-add -K  
cap deploy:cold  

***

ssh deployer@72.14.183.289  
在 deplouer@li46-209 命令行 下 输入 ： sudo rm /etc/nginx/sites-emabled/default
sudo service nginx restart  
sudo update-rc.d unicorn_blog default  

***
git commit -am "add a 2"
git push  
cap deploy






