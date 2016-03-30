部署 Capistrano - deploy.rb

# config valid only for Capistrano 3.1
lock '3.3.5'

set :application, 'appname'
set :deploy_user, 'deployer'

set :scm, :git
set :repo_url, 'git@github.org:lanvige/railsapp.git'

# rbenv
set :rbenv_type, :user
set :rbenv_ruby, '2.2.0'
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails}

# how many old releases do we want to keep, not much
set :keep_releases, 5

# files we want symlinking to specific entries in shared
set :linked_files, %w{config/database.yml config/application.yml config/secrets.yml}

# dirs we want symlinking to shared
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

namespace :deploy do
  after :finishing, 'deploy:cleanup'
end

##############################################################

##############################################################

##############################################################


# 4.0  配置deploy.rb文件
# 以下 deploy.rb 文件中一些详细的分析
require 'bundler/capistrano'     #添加之后部署时会调用bundle install， 如果不需要就可以注释掉
require "capistrano/ext/multistage"     #多stage部署所需
set :stages, %w(development production)
set :default_stage, "development"
set :application, "crm_app_end"   #应用名称
set :repository,  "https://test.361way.com/svn/trunk"
set :keep_releases, 5          #只保留5个备份
set :deploy_to, "/var/www/#{application}"  #部署到远程机器的路径
set :user, "user1"              #登录部署机器的用户名
set :password, "user1"      #登录部署机器的密码， 如果不设部署时需要输入密码
default_run_options[:pty] = true          #pty: 伪登录设备
#default_run_options[:shell] = false     #Disable sh wrapping
set :use_sudo, true                            #执行的命令中含有sudo， 如果设为false， 用户所有操作都有权限
set :runner, "user2"                          #以user2用户启动服务
set :svn_username, "xxxx"
set :scm, :subversion                        #注意subversion前有冒号，不能少
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`
#set :deploy_via, :copy                     #如果SCM设为空， 也可通过直接copy本地repo部署
#set :domain, "crm.abc.com"    #custom define
role :web, "192.168.0.13", "192.168.0.117"                          # Your HTTP server, Apache/etc
role :app, "192.168.0.13", "192.168.0.117"                          # This may be the same as your `Web` server
role :db,  "192.168.0.13", :primary => true # This is where Rails migrations will run
#role :db,  "your slave db-server here"
#
namespace :deploy do
    desc "remove and destory this app"
    task :destory, :roles => :app do
        run "cd #{deploy_to}/../ && #{try_sudo} mv #{application} /tmp/#{application}_#{Time.now.strftime('%Y%d%m%H%M%S')}"      #try_sudo 以sudo权限执行命令
    end
    after "deploy:update", "deploy:shared:setup" 
                 #after， before 表示在特定操作之后或之前执行其他任务
    namespace :shared do
        desc "setup shared folder symblink"
        task :setup do
            run "cd #{deploy_to}/current; rm -rf shared; ln -s #{shared_path} ."
        end
    end
    after "deploy:setup", "deploy:setup_chown"

    desc "change owner from root to user1"
    task :setup_chown do
        run "cd #{deploy_to}/../ && #{try_sudo} chown -R #{user}:#{user} #{application}"
    end
    task :start do
       run "cd #{deploy_to}/current && ./crmd.sh start"
       #try_sudo "cd #{deploy_to}/current && ./restart.sh"
    end
    task :stop do
       run "cd #{deploy_to}/current && ./crmd.sh stop"
    end
    task :restart do
       run "cd #{deploy_to}/current && ./crmd.sh restart"
    end
end





##############################################################

##############################################################

##############################################################





#   4.3  提示与技巧
# 4.3.1 使用远端缓存改进性能
# Capistrano的工作方式在每次部署时都将创建新的仓库克隆及导出。那必将很慢，通过添加一些扩展选项到
# deploy.rb recipe 则可提速。添加下列内容到 deploy.rb 文件描述 scm 设置的位置：

set :deploy_via, :remote_cache 

# 此命令使 Capistrano 在服务器上只克隆/导出仓库一次，然后在每次部署时使用 svn
# up 或 git pull 代替。如果你经常部署，你将发现提速明显。

# 4.3.2 添加定制的部署钩子（Hook）

# Capistrano 显然比通过 SSH复制文件要高级。你可以配置事件或命令以便在文件复制完成后执行，如重启 Web
# 服务器、执行定制的脚本等。Capistrano 称这些为“任务”。例如，添加以下代码到
# deploy.rb 文件：

namespace :deploy do
  task :restart, :roles => :web do
    run "touch #{ current_path }/tmp/restart.txt"
  end
  task :restart_daemons, :roles => :app do
    sudo "monit restart all -g daemons"
  end
end
# Capistrano 中的任务非常强大，我们在本指南中仅接触到表皮。你可以创建任务在部署
# 前、部署后或单独操作服务器。这可以是任何维护类型：重启进程、清理文件、发送
# 邮件通知、执行数据库迁移、运行脚本等等。

# 我们的示例包括两个定制任务。“restart”任务是内建于 Capistrano
# 中的，将在部署完成后自动执行。我们使用由 Passenger 驱动的现代 Rails 应用技术
# touch tmp/restart.txt，你的 Web 服务器可能需要不同的命令。

# 我们的第二个示例任务是“restart_daemons”，Capistrano
# 不会默认执行此定制任务。为了让它运行，我们需要添加一个 hook：

after "deploy", "deploy:restart_daemons" 

# 此命令告诉 Capistrano 在我们的部署操作完成后执行任务。其他可用的 hook 是
# before，将在文件复制之前执行任务。




##############################################################

##############################################################

##############################################################


# Ensure that bundle is used for rake tasks
SSHKit.config.command_map[:rake] = "bundle exec rake"

# config valid only for Capistrano 3.1
lock '3.1.0'

set :repo_url, 'YOUR_REPO_URL'
set :branch, "master"
set :deploy_via, :remote_cache

set :application, "YOUR-APPLICATION-NAME"
# We are only going to use a single stage: production
set :stages, ["production"]

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/var/www/YOUR_APP_PATH'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Restarts Phusion Passenger
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end



























