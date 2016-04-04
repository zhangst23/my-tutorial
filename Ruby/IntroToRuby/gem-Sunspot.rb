rails-gem-Sunspot.rb


# Add to Gemfile:

gem 'sunspot_rails'
gem 'sunspot_solr' # optional pre-packaged Solr distribution for use in development
# Bundle it!

bundle install
# Generate a default configuration file:

rails generate sunspot_rails:install
# If sunspot_solr was installed, start the packaged Solr distribution with:

bundle exec rake sunspot:solr:start # or sunspot:solr:run to start in foreground

# Setting Up Objects

# Add a searchable block to the objects you wish to index.

class Post < ActiveRecord::Base
	searchable do
		text :title, :body
		text :comments do
			comments.map{ |comment| comment.body }
		end

		boolean :featured
		integer :blog_id
		integer :author_id
		integer :category_ids, :multiple => true
		double :average_rating
		time :published_at
		time :expired_at

		string :sort_title do
			title.downcase.gsub(/^(an?|the)/,'')
		end
	end
end


# text fields will be full-text searchable. Other fields (e.g., integer and string) can be used to scope queries.

# Searching Objects

Post.search do
	fulltext 'best pizza'

	with :blog_id, 1
	with(:published_at).less_than Time.now
	order_by :published_at, :desc
	paginate :page => 2, :per_page => 15
	facet :category_ids, :author_id
end


# Search In Depth

# Given an object Post setup in earlier steps ...

# Full Text

Post.search { fulltext 'pizza' }

Post.search do
	fulltext 'pizza' do
		boost_fields :title => 2.0
	end
end

Post.search do
	fulltext 'pizza' do
		boost(2.0) { with(:featured, true) }
	end
end

Post.search do
	fulltext 'pizza' do
		fields(:title)
	end
end

Post.search do
	fulltext 'pizza' do
		fields(:body, :title => 2.0)
	end
end





























