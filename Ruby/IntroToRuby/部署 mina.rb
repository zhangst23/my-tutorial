部署 mina.rb



# 本地
gem 'mina'
bundle
mina init
config/deploy.rb
mina setup

***
# 服务器端
ssh deploy@baidu.com
cd /opt/www
ls
rm -rf baidu.com
ls
***
# 本地
mina setup
***
# 服务器端
ls
cd baidu.com/shared/config
vi database.yml
# 文件中添加
production:
	adapter: postgresql
	encoding: unicode
	reconnect: false
	database: shopper_production
	pool: 5
	username: deployer
	password: 12345678
	host: localhostipt

***
# 本地
mina deploy
***
# 好像出错了error
# 进 服务器端
cd ~
ssh-keygen -t rsa -C deployer@baidu.com
cat ~/.ssh/id_rsa.pub




##############################################################

############################      优秀脚本       ##################################

##############################################################






require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rvm'    # for rvm support. (http://rvm.io)

set :domain, 'xxx.xxx.xxx'
set :deploy_to, '/xxx/xxxx/xxxx'
set :repository, 'git@xxx.xxx/xxx.git'
set :shared_paths, ['config/database.yml', 'log']
set :user, 'xxx'    # Username in the server to SSH to.

task :environment do
  invoke :'rvm:use[ruby-2.0.0-p0]'
end

task :setup => :environment do
  queue! %[mkdir -p "#{deploy_to}/shared/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/log"]

  queue! %[mkdir -p "#{deploy_to}/shared/config"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/config"]
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  set :branch, 'master'
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'
    invoke :'rails:assets_precompile'  
  end
end

task :restart => :environment do
  queue """
  if [ -d #{deploy_to}/current/tmp ]
  then
    touch #{deploy_to}/current/tmp/restart.txt 
  else
    mkdir #{deploy_to}/current/tmp
    touch #{deploy_to}/current/tmp/restart.txt 
  fi
  """
end

task :deploy_to_dev => :environment do
  set :branch, 'dev'
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'
    invoke :'rails:assets_precompile'  
  end
end

task :cat_server_log => :environment do
  queue "tail -n 200 #{deploy_to}/current/log/production.log"
end

task :remove => :environment do
  queue "rm -rf #{deploy_to}"
end

task :console => :environment do
  queue "cd #{deploy_to}/current && bundle exec rails c production"
end








