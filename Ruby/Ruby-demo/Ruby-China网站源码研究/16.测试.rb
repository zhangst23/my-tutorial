group :development, :test do
  gem 'rubocop'

  gem 'rspec-rails', github: 'rspec/rspec-rails'
  gem 'rspec-mocks', github: 'rspec/rspec-mocks'
  gem 'rspec-core', github: 'rspec/rspec-core'
  gem 'rspec-support', github: 'rspec/rspec-support'
  gem 'rspec-expectations', github: 'rspec/rspec-expectations'
  gem 'rspec', github: 'rspec/rspec'

  gem 'rails-controller-testing'

  gem 'factory_girl_rails', '~> 4.5.0'
  gem 'database_cleaner'
  gem 'capybara'

  gem 'jasmine-rails', '~> 0.10.2'

  gem 'colorize'
  gem 'letter_opener'

  gem 'bundler-audit', require: false
end