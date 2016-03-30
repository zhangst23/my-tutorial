部署ubuntu .rb



1.0 # rbenv 安装 ruby
rbenv install --list  # 列出所有 ruby 版本
rbenv install 2.2.0-dev     # 安装 
### 列出版本
rbenv versions               # 列出安装的版本
rbenv version                # 列出正在使用的版本

### 设置ruby版本
rbenv global 2.2.0-dev      # 默认使用 1.9.3-p392
rbenv shell 2.2.0-dev       # 当前的 shell 使用 1.9.3-p392, 会设置一个 `RBENV_VERSION` 环境变量

2.0 ### 安装 gem
gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/
gem sources -l

# *** CURRENT SOURCES ***
# https://gems.ruby-china.org

# 请确保只有 gems.ruby-china.org

3.0  ## gem 安装 rails 
gem install rails
rails -v

### 如果你使用 Gemfile 和 Bundle (例如：Rails 项目)
bundle config mirror.https://rubygems.org https://gems.ruby-china.org


4.0  ## 安装数据库
#### 安装MySQL：
sudo apt-get install mysql-server
(要设置密码：8108317hi  再重复一遍)
#### 或者PostgreSQL:
sudo apt-get install postgresql postgresql-client libpq-dev
你还可以请参考阿里云的OTS。

## 5.0  Git Server
我们来配置一下Git Server，首先我们需要新建一个名为git的用户并且为它添加公钥。
sudo adduser git
sudo vi /home/git/.ssh/authorized_keys
这一步需要到本机去找到公钥复制粘贴到 authorized_keys 里面。
进入本机 .ssh/id_rsa.pub   复制内容 ssh-rsa AAAAB3N*****  
连接服务器，输入命令 sudo vi /home/git/.ssh/authorized_keys  粘贴刚才的内容
退出vi编辑器：  输入命令： :wq!    (！强制退出，！必须在wq后面)

[
一种方法可以免密码输入: 
brew install ssh-copy-id
# [注: ssh-copy-id 把密钥追加到远程主机的 .ssh/authorized_key 上]
ssh-copy-id -i ~/.ssh/id_rsa.pub root@155.123.34.235
# 此时便可直接登录[SSH不会再询问密码]
ssh root@155.123.34.235

]

我这里假设你的项目名称是project和准备把git仓库的目录设定为/opt/git，如果你没有一个/opt/git目录，需要切换到root新建并且把这个目录的所有者改为git：
    su - root
    cd /opt
    mkdir git
    cd /opt/git
    mkdir project.git
    cd project.git
    git --bare init
如果你之前已经有一个Rails项目，那么可以跳过此步骤。

在本地计算机上，新建一个Rails项目，并且把它纳入git版本管理中：

    rails new project --skip-bundle
    cd project
    git init
    git add .
    git commit -m 'initial commit'
我们需要添加git remote连接服务器，并且把这个项目push到服务器上去。

    git remote add origin git@[ipaddress]:/opt/git/project.git
    git push origin master
	    Counting objects: 59, done.
	    Delta compression using up to 8 threads.
	    Compressing objects: 100% (48/48), done.
	    Writing objects: 100% (59/59), 13.41 KiB | 0 bytes/s, done.
	    Total 59 (delta 2), reused 0 (delta 0)
	    To git@[ipaddress]:/opt/git/project.git
	     * [new branch]      master -> master
如果你的系统没有报错的话，这个时候我们已经完成了Git Server的部署。

上面已经测试 git 服务端 安装成功了

现在 进入 cd ~ 主页面， ls  后 
git clong https://github.com/zhangst23/ywlist3.git  

仓库里的文件到服务器，这样就可以利用 git 向服务器传送文件了
cd ywlist3
- 取决于你的应用，这里需要安装数据库等其他系统组件，例如 PostgreSQL：
sudo apt-get install postgresql libpq-dev
- 执行 bundle 和 migrate：
bundle install
RAILS_ENV=production rake db:create db:migrate
(rake 失败的话，使用：  bundle exec rake db:create db:migrate)
- 执行 assets precompile:
/var/www/example.com/current $ rake assets:precompile

### Passenger for Nginx
因为我这里使用passenger for Nginx，Passenger需要重新编译Nginx，如果之前有Nginx需要卸载掉
sudo apt-get remove nginx-common nginx-full nginx
然后安装Passenger：
gem install passenger
passenger -v
		~ Phusion Passenger 5.0.26

进入rvmsudo使用Passenger安装Nginx：

rvmsudo passenger-install-nginx-module

如果无法运行我们可以尝试下面这个方法：

$ export ORIG_PATH="$PATH"
$ rvmsudo -E /bin/bash

(也可以用 rbenv 安装
gem install passenger
rbenv rehash
sudo bash -c "source ~/.bashrc && passenger-install-nginx-module"
)


按照默认的选项一路回车下去，这里输入1继续回车。

Automatically download and install Nginx? Nginx does not support loadable modules such as some other web servers do,
so in order to install Nginx with Passenger support, it must be recompiled. Do you want this installer to download, compile and install Nginx for you?
1. Yes: download, 
2. No: I want to 

耐心等待编译。

最后看到

Nginx with Passenger support was successfully installed.
恭喜你安装成功，若是出现问题可以参考Passenger官方文档。


6 ## 配置Nginx和站点

以下内容几乎照抄《在 Ubuntu…应用》一文。

打开Nginx的nginx.conf
sudo vim /opt/nginx/conf/nginx.conf
PS: 如果你不是Passenger安装的Nginx，这个配置文件还有可能在/usr/local/nginx/或/etc/nginx下面

请参考下面的例子修改：

```
user wwwroot; # 修改成你的系统帐号名，不然项目目录/home/wwwroot这里没有权限
worker_processes 8; # 修改成和你 CPU 核数一样
pid /var/run/nginx.pid;

http {
  include       mime.types;
  default_type  application/octet-stream;

  client_max_body_size 50m;

  sendfile        on;

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  gzip on;
  gzip_disable "msie6";

  ## ------------ 重点修改内容 --------

  server {    
    # 此处用于防止其他的域名绑定到你的网站上面
    listen 80 default;
    return 403;
  }

  server {
    listen       80;
    server_name  you.host.name; # 请替换成你网站的域名
    rails_env    production;
    root         /home/wwwroot/project/public;
    passenger_enabled on;

    location ~ ^(/assets) {
      access_log        off;
      # 设置 assets 下面的浏览器缓存时间为最大值（由于 Rails Assets Pipline 的文件名是根据文件修改产生的 MD5 digest 文件名，所以此处可以放心开启）
      expires           max; 
    }
  }

  ## ---------------------------------
}

重启Nginx查看你的网站。

sudo /etc/init.d/nginx start
在浏览器打开服务器的 IP 地址或域名，应该看到你的网站在运行。

```

#













