部署 Capistrano.rb

######################     部署 Capistrano, Nginx, and Puma.rb       #####################
https://www.digitalocean.com/community/tutorials/deploying-a-rails-app-on-ubuntu-14-04-with-capistrano-nginx-and-puma

Step 1 — Installing Nginx

sudo apt-get update
sudo apt-get install curl git-core nginx -y


Step 2 — Installing Databases


2.1  MySQL
2.1.1 Install MySQL
sudo apt-get update
sudo apt-get install mysql-server mysql-client libmysqlclient-dev
sudo mysql_install_db
sudo mysql_secure_installation
# 2.1.2 Install MySQL Gem
# gem install mysql2
# 2.1.3 Create New Rails Application
# cd ~
# rails new appname -d mysql
# cd appname
# 2.1.4 Configure Database Connection
# vi config/database.yml
# password: mysql_root_password
# 2.1.5 Create Application Databases
# rake db:create
# 2.1.6 Test Configuration
# rails server
# 或
# rails server --binding=server_public_IP
# http://server_public_IP:3000



2.2  PostgreSQL
# Postgres 9.3 is available in the Ubuntu repositories and we can install it like so:

sudo apt-get install postgresql postgresql-contrib libpq-dev
# Next we need to setup our postgres user:

sudo su - postgres
# createuser --pwprompt
# exit


2.3  MongoDB


Step 3 — Installing RVM and Ruby

# Before installing RVM, you need to import the RVM GPG Key:
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3

# Then install RVM to manage our Rubies:
curl -sSL https://get.rvm.io | bash -s stable

source ~/.rvm/scripts/rvm
rvm requirements

#  ruby
rvm install 2.2.1
rvm use 2.2.1 --default



Step 4 — Installing Rails and Bundler

gem install rails -V --no-ri --no-rdoc
gem install bundler -V --no-ri --no-rdoc

# Three flags were used:
# -V (Verbose Output): Prints detailed information about Gem installation
# --no-ri - (Skips Ri Documentation): Doesn't install Ri Docs, saving space and making installation fast
# --no-rdoc - (Skips RDocs): Doesn't install RDocs, saving space and speeding up installation


# Note: You can also install a specific version of Rails according to your requirements by using the -v flag:
gem install rails -v '4.2.0' -V --no-ri --no-rdoc



Step 5 — Setting up SSH Keys




Step 6 — Adding Deployment Configurations in the Rails App


# 6.1  Gemfile
group :development do
    gem 'capistrano',         require: false
    gem 'capistrano-rvm',     require: false
    gem 'capistrano-rails',   require: false
    gem 'capistrano-bundler', require: false
    gem 'capistrano3-puma',   require: false
end

gem 'puma'

#
bundle

cap install

# Replace the contents of your Capfile with the following:

# 6.2  Capfile

# Load DSL and Setup Up Stages
require 'capistrano/setup'
require 'capistrano/deploy'

require 'capistrano/rails'
require 'capistrano/bundler'
require 'capistrano/rvm'
require 'capistrano/puma'

# Loads custom tasks from `lib/capistrano/tasks' if you have any defined.
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }



#  6.3
# config/deploy.rb

# Change these
server 'your_server_ip', port: your_port_num, roles: [:web, :app, :db], primary: true

set :repo_url,        'git@example.com:username/appname.git'
set :application,     'appname'
set :user,            'deploy'
set :puma_threads,    [4, 16]
set :puma_workers,    0

# Don't change these unless you know what you're doing
set :pty,             true
set :use_sudo,        false
set :stage,           :production
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/id_rsa.pub) }
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true  # Change to false when not using ActiveRecord

## Defaults:
# set :scm,           :git
# set :branch,        :master
# set :format,        :pretty
# set :log_level,     :debug
# set :keep_releases, 5

## Linked Files & Directories (Default None):
# set :linked_files, %w{config/database.yml}
# set :linked_dirs,  %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc "Make sure local git is in sync with remote."
  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/master`
        puts "WARNING: HEAD is not the same as origin/master"
        puts "Run `git push` to sync changes."
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  before :starting,     :check_revision
  after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
  after  :finishing,    :restart
end

# ps aux | grep puma    # Get puma pid
# kill -s SIGUSR2 pid   # Restart puma
# kill -s SIGTERM pid   # Stop puma



# 6.4
# config/nginx.conf

upstream puma {
  server unix:///home/deploy/apps/appname/shared/tmp/sockets/appname-puma.sock;
}

server {
  listen 80 default_server deferred;
  # server_name example.com;

  root /home/deploy/apps/appname/current/public;
  access_log /home/deploy/apps/appname/current/log/nginx.access.log;
  error_log /home/deploy/apps/appname/current/log/nginx.error.log info;

  location ^~ /assets/ {
    gzip_static on;
    expires max;
    add_header Cache-Control public;
  }

  try_files $uri/index.html $uri @puma;
  location @puma {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;

    proxy_pass http://puma;
  }

  error_page 500 502 503 504 /500.html;
  client_max_body_size 10M;
  keepalive_timeout 10;
}



Step 7 — Deploying your Rails Application

git add -A
git commit -m "Set up Puma, Nginx & Capistrano"
git push origin master


# Note: If this is the first time using GitHub from this system, you might have to issue the following commands with your GitHub username and email address:
# git config --global user.name 'Your Name'
# git config --global user.email you@example.com


cap production deploy:initial


# On the Droplet, Symlink the nginx.conf to the sites-enabled directory:

sudo rm /etc/nginx/sites-enabled/default
sudo ln -nfs "/home/deploy/apps/appname/current/config/nginx.conf" "/etc/nginx/sites-enabled/appname"

# Restart the Nginx service:

sudo service nginx restart




8.0   Normal Deployments
# Whenever you make changes to your app and want to deploy a new release to the server, commit the changes, push to your git remote like usual, and run the deploy command:

git add -A
git commit -m "Deploy Message"
git push origin master
cap production deploy

# Note: If you make changes to your config/nginx.conf file, you'll have to reload or restart your Nginx service on the server after deploying your app:
sudo service nginx restart




#######################################################





