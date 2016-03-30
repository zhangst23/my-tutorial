部署 Capistrano 学习笔记.rb

##############################################################
## 1.0 安装::

在Gemfile中添加Capistrano和其它用到的插件

group :development do
  gem 'capistrano'
  gem 'capistrano-bundler'
  gem 'capistrano-rails'
  gem 'capistrano-rbenv'
  # Add this if you're using rvm
  # gem 'capistrano-rvm'
end


# 1.1  项目中初始化 Capistrano

cap install

# 会生成如下目录文件，Capfile用来配置Capistrano，deploy.rb是一些共用task的定义，
# 而production.rb/staging.rb用来定义具体的stage的tasks。
# 安装完成之后，通过
cap -vT 
# 来查看当前项目的可执行任务列表。



## 2.0 配置
# 2.1  在Capfile里开启要用到的一些插件
require 'capistrano/setup'
require 'capistrano/deploy'

require 'capistrano/rbenv'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'

Dir.glob('lib/capistrano/tasks/*.cap').each { |r| import r }


# 2.2 Deploy.rb
# deploy.rb  本文件中用来配置共用变量。




# 2.3 配置Stage


# 3.0  开始部署::

# 3.1 部署
# 部署需要Remote sever从Git服务器上拉代码，这里需要验证Git server，不然会有Agent admitted failure to sign using the key的Error。
ssh -T git@github.com
# 开始部署：
cap production deploy --dry-run
cap production deploy

# 输入服务器用户密码后就deploy就进行了。不想每次都输密码，ssh-copy-id可能是你想要的。
# Mac OSX 上 ssh-copy-id不是默认安装的，可通过Homebrew进行安装
# brew install ssh-copy-id

# 服务器生成目录详解
# 运行多次deploy之后会生成这样的目录结构：
.
├── current -> /home/deploy/apps/appname/releases/20140325071623
├── releases
│   ├── 20140325065734
│   ├── 20140325071310
│   ├── 20140325071623
│   └── 20140325074922
├── repo
│   ├── branches
│   ├── config
│   ├── description
│   ├── FETCH_HEAD
│   ├── HEAD
│   ├── hooks
│   ├── info
│   ├── objects
│   ├── packed-refs
│   └── refs
├── revisions.log
└── shared
    ├── bin
    ├── bundle
    ├── config
    ├── log
    ├── public
    ├── tmp
    └── vendor


# release 每次发布都会产成一个目录，该目录下存放着Rails项目源码，多个目录是为了rollback而设。
# current 是指当前版本，软链接到release下的某个版本目录。
# repo 存的是项目的.git目录
# shared 是项目中共享的内容，如config文件，不随每次发布而改动。


# 3.2 Rollback
cap production deploy:rollback

# Rollback其实就是把current目录指向到releases里上次发布的目录。








#   4.2、验证配置的执行deploy

# 全部准备好后，先试试我们的 recipe，以便让 Capistrano
# 在服务器上创建初始的目录结构。从你的应用根目录执行下列命令：

cap deploy:setup 

# 当你执行该命令时，Capistrano 将 SSH 到你的服务器，进入你在 deploy_to 变量中所指定的目录，并创建特殊的 Capistrano 目录结构。如果遇到权限或 SSH
# 访问错误，你将获得错误消息。当命令执行时仔细看看 Capistrano 的输出。

# 在我们使用 Capistrano 做实际部署之前的最后一步是，确保 setup
# 命令在服务器上全都设置正确。使用以下命令进行简单验证：

cap deploy:check 

# 该命令将检查你的本机环境及服务器，并定位问题。如果你看到错误消息，修复后再运行此命令。一旦你执行 cap deploy:check 没有错误，则可继续处理。

# 部署过程中我们还会用到下面的语句（需要在deploy.rb里事先进行定义task）：

 cap deploy:setup #建立部署路径
 cap deploy:update #部署
 cap deploy:start    #启动服务
 cap deploy:stop   #停止服务
 cap deploy:restart #重启服务
 cap deploy:rollback #回滚





# 4.3.3  将 Git 分支与环境关联
# 因为我们有两个服务器环境（临时和生产），你可能想要绑定 Git
# 分支到这些环境。这样，你可以自动部署 staging 分支到临时环境，master
# 分支到生产环境。简单添加下列内容到 production.rb：
set :branch, 'production' 

# 并添加以下内容到 staging.rb
set :branch, 'staging' 

# 现在每次你执行 cap deploy 时，Capistrano 将从你的 staging 分支（因为 staging
# 是我们的默认环境）部署代码。如果你运行 cap production deploy，Capistrano
# 将从你的 master 分支部署代码


##############################################################

##############################################################

##############################################################

5.0   使用 Capistrano 部署 Web 应用
# 终端或命令行执行下列命令：
$ gem install capistrano
# 我们推荐安装 capistrano-ext gem，它包含使你部署更加容易的扩展工具集：
$ gem install capistrano-ext
# 如果你遇到了问题或想要了解更多细节，可以参考官方的 Capistrano 入门指南，或找到使 Capistrano 工作的各种组件。

5.1 准备项目
# 在终端中导航到你的应用根目录，并执行以下命令：
capify .

5.2  编写 Capistrano Recipe

5.2.2 验证 Recipe
# 全部准备好后，先试试我们的 recipe，以便让 Capistrano 在服务器上创建初始的目录结构。从你的应用根目录执行下列命令：
cap deploy:setup

# 当你执行该命令时，Capistrano 将 SSH 到你的服务器，进入你在 deploy_to 变量中所指定的目录，并创建特殊的 Capistrano 目录结构。如果遇到权限或 SSH 访问错误，你将获得错误消息。当命令执行时仔细看看 Capistrano 的输出。
# 在我们使用 Capistrano 做实际部署之前的最后一步是，确保 setup 命令在服务器上全都设置正确。使用以下命令进行简单验证：
cap deploy:check

# 该命令将检查你的本机环境及服务器，并定位问题。如果你看到错误消息，修复后再运行此命令。一旦你执行 cap deploy:check 没有错误，则可继续处理。


5.3 使用新的 Recipe 部署
# 一旦验证通过你的本机及服务器配置，执行下列命令：

$ cap deploy
# 这将执行部署到你的默认 stage，即临时环境。如果你想部署到生产环境，执行：

$ cap production deploy
# 当命令执行时，你将看到许多输出。Capistrano 打印在服务器上执行的所有命令及其输出，以便有问题时调试。



##############################################################

##############################################################

##############################################################


6.0  怎么写一个任务
# 任务是capistrano的基础。 任务可以定义在deploy.rb中或者Capfile中。 也可以写在其他文件中，由Capfile指定加载。
# 一个最简单的capistrano任务如下：

desc "Search Remote Application Server Libraties"
task :search_libs, :roles => :app do
	run "ls -x1 /usr/lib | grep -i xml"
end

# 第一行 desc是一行描述。
# 第二行 task 指定了任务的名字，以及在哪些role上运行这个任务。 每台被部署的服务器都会指定一个或多个role。
# 第三行 run 是DSL语言的一个action module。 可以用来运行命令

6.1  部署的任务流程
# 一个deploy任务流程如下：
namespace :deploy do
	task :default do
		update
		update_code
		strategy.deploy!
		finalize_update
		symlink
		restart  # <= v2.5.5
	end
end

# default是一个namespace下的默认流程。
# cap deploy 相当于执行 cap deploy:default


6.2 如何把自己的任务放入任务流
# 可以利用before/ after， 把你自己的流程加入到部署的默认流程当中  。
# 例如下面的流程定义
after("deploy:symlink") do
	# Some more logic here perhaps
	notifier.email_the_boss
end

# 你可以在deploy:symlink完成之后 运行 notifier.email_the_boss。
# 一般情况下你需要自定义deploy:restart  deploy:start deploy:stop 这3个task。
# 例如
namespace :deploy do
	task :start, roles => :app do
		puts "start vines"
	end
	task :stop, roles => :app do
		puts "stop vines"
	end
	task :restart, :roles => :app do
		puts "restart vines"
	end
end

6.3  如何上传、下载文件
# 可以用 upload , download实现上传和下载
# 上传文件或者文件夹使用
upload(from, to, options={}, &block)

# 下载文件或者文件夹使用
download(from, to, options={}, $block)

task :test_upload do
	upload_options={}
	upload_options[:recursive] = true
	upload_options[:via] = :scp
	upload("/home/costa/test/log", "/home/deploy/", upload_options)
end

# 运行后， 可把 /home/costa/test/log上传到/home/deploy/log的位置。

6.4  如何直接执行远程命令
# cap invoke COMMAND=""
costa@pepsi:~/test/vines$ cap invoke COMMAND="free -m"

6.5  事务性
# cap简单的实现了事务性功能， 也就是说确保任务成功， 若不能成功，则回滚。
# eg:
task :deploy do
	transaction do
		update_code
		symlink
	end
end

task :update_code do
	on_rollback { run "rm -rf #{release_path}" }
	source.checkout(release_path)
end

task :symlink do
	on_rollback do
		run <<-EOC
			rm #{current_path};
			ln -s #{previous_release} #{current_path}
		EOC
	end
end





##############################################################

##############################################################

##############################################################

一 安装
gem install capistrano

二、命令行测试
root@ubuntu:/tmp# cap capfile
task :du, :hosts => "ubuntu.hadoop.com" do
run "df -h"
end

# 在ubuntu.hadoop.com（本机）机器上运行df –h命令查看磁盘空间
root@ubuntu:/tmp# cap du


三、代码部署（结合git）
测试环境
主机名                 ip          状态      ruby
ubuntu.hadoop.com   192.168.56.102  server      1.9.3
server.hadoo.com        192.168.56.101  client      1.9.3
1、进入tmp目录，然后创建capi目录
cd /tmp
mkdir capi
cd capi
2、capistrano部署我的应用
capify .
3、修改config/deploy.rb文件
4、部署目录结构
cap deploy:setup
5、检查
root@ubuntu:/tmp/capi# cap deploy:check
6、更新
root@ubuntu:/tmp/capi# cap deploy:update

四、代码回滚
1、为了做测试，我新部署个应用，然后用本机测试
cap deploy:rollback


##############################################################

##############################################################

##############################################################



Step-by-step
1.0
gem install capistrano
gem install capistrano-ext
2.0 在项目根目录执行 "capify ." 这将在根目录创建Capfile 和 config目录下创建deploy.rb 文件
capify .
3.0 编辑 deploy.rb
4.0  在项目根目录执行  cap deploy:setup
        cap deploy:setup #建立部署路径
        cap deploy:update #部署
        cap deploy:start    #启动服务
        cap deploy:stop   #停止服务
        cap deploy:restart #重启服务

5.0 如果有多个stage要部署，则在config下创建deploy文件夹， 在该文件夹下有各stages文件, 
文件名和 set :stages, %w(development production) 对应， 如development.rb production.rb，
在各文件中设置相应变量即可， 然后可用 cap production deploy:... 来执行对应production的操作


##############################################################

##############################################################

##############################################################

Step by step

1.0 #  Add the following Gems to your Gemfile

gem 'capistrano', '~> 3.1.0'
# rails specific capistrano funcitons
gem 'capistrano-rails', '~> 1.1.0'
# integrate bundler with capistrano
gem 'capistrano-bundler'
# if you are using RBENV
gem 'capistrano-rbenv', "~> 2.0" 
# Use the Unicorn app server
gem 'unicorn'


bundle install

2.0  # Assuming you have archived off any legacy Capistrano configs, you can now run:

bundle exec cap install

# 

├── Capfile
├── config
│   ├── deploy
│   │   ├── production.rb
│   │   └── staging.rb
│   └── deploy.rb
└── lib
    └── capistrano
            └── tasks

3.0 
deploy.rb
production.rb
staging.rb

4.0  
cap production deploy


##############################################################
##############################################################
##############################################################

4.0  Configure SSH

5.0  Push To git Via SSH

5.0  Update the production.rb and staging.rb Files

6.0  First Deployment with Capistrano 3
6.1  Prepare the Server

# If you have an existing application on your server, you should now backup any files that are not under source control and move them to your hard drive suing SFTP (or FTP) or move them to a folder outside of your application on the server. In particular, you’ll want to grab any log files, user generated content or files that contain secrets (if they’re not already on your hard drive).

# If you do not have an existing application, you should create a folder for it on the server now. (The full path to the application on the server, should be set in the :deploy_to variable in your deploy.rb as well.)

ssh user_name@server.com
sudo mkdir /srv/www/my-app.com   # /var/www may be a better location for your server
sudo chown user_name:user_name /srv/www/my-app.com   # Make sure the deploy user owns the folder

6.2  Clear the Directory

# If you have an existing application we need to delete everything in the root application (you could keep non source code files in there if you wanted). We need to start fresh.

ssh user_name@server.com
cd my_app_directory
rm -rf *   # Kiss your files good-bye
ls -lha    # Verify the directory is empty
exit

6.3  Create the database

# If you have an existing application, then the database should be left alone.

# If this is the first time you are installing the application, you should use your preferred to create the database and database user that can access the database. This should correspond to the data in the database.yml file. Capistrano will try and run the migrations as part of the deploy and it needs a database to act on.

6.4  Run the Deployment

# At long last we are finally ready to deploy. If you’re coming from Capistrano 2, the old command was simply cap deploy:migrations. In Capistrano 3, we must specify the type of server we want to deploy to (and the migrations will automatically be run). If you are still connected to your server via ssh, disconnect now.

# To deploy to the production server, execute:

cap production deploy
# To deploy to the staging server, execute:

cap staging deploy
# Almost immediately, Capistrano will ask you for your ssh passphrase. This will happen every time so go ahead and enter it now. Capistrano will execute a couple commands and eventually break. You should see an error like the following:

ERROR linked file /srv/www/app.com/shared/config/database.yml does not exist on app.com

##############################################################
##############################################################
##############################################################

sudo adduser deploy
adduser deploy sudo
su deploy
sudo ls
exit





















































