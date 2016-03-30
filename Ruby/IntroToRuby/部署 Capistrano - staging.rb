部署 Capistrano - staging.rb


# 关于Stage，详见:
# 一个很重要的配置是Role、Server（User）以及其对应关系，为了方便，Cap3中提供了多种配置形式，
# 各有不同的侧重，但用途都是一样的，见下面。
# stage中的role/server

# 以role为中心的写法
role :app, %w{deploy@example.com, deploy@example.local}
role :web, %w{deploy@example.com}
role :db,  %w{deploy@example.com}

# 以server为中心的写法，上面的写法可以用以下写法代替：
server 'example.com', user: 'deploy', roles: %w{web app db}
server 'example.local', user: 'deploy', roles: %w{app}

# 如果要对某服务器配置SSH等更多时，也可以用这种写法：
server 'example.com',
  user: 'user_name',
  roles: %w{web app},
  ssh_options: {
    user: 'user_name', # overrides user setting above
    keys: %w(/home/user_name/.ssh/id_rsa),
    forward_agent: false,
    auth_methods: %w(publickey password)
    # password: 'please use keys'
  }


# 2.3.1 Stage示例
set :stage, :test
set :branch, 'develop'

server '192.168.1.1', user: 'deploy', roles: %w{web app db}

set :deploy_to, "/home/#{fetch(:deploy_user)}/apps/appname"

# dont try and infer something as important as environment from
# stage name.
set :rails_env, :test

# number of unicorn workers, this will be reflected in
# the unicorn.rb and the monit configs
set :unicorn_worker_count, 5

# whether we're using ssl or not, used for building nginx
# config file
set :enable_ssl, false







##############################################################

##############################################################

##############################################################


















































