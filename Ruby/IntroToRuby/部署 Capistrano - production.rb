部署 Capistrano - production.rb













##############################################################

##############################################################

##############################################################

# Define roles, user and IP address of deployment server
# role :name, %{[user]@[IP adde.]}
role :app, %w{deployer@162.243.74.190}
role :web, %w{deployer@162.243.74.190}
role :db,  %w{deployer@162.243.74.190}

# Define server(s)
server '162.243.74.190', user: 'deployer', roles: %w{web}

# SSH Options
# See the example commented out section in the file
# for more options.
set :ssh_options, {
    forward_agent: false,
    auth_methods: %w(password),
    password: 'user_deployers_password',
    user: 'deployer',
}

























