3.1 concerns 分析.rb

1) DRYing up model codes
2) Skin-nizing Fat Models.




3.1.1 stackoverflow上的例子

# app/models/product.rb
class Product
	include Taggable
	...
end


# app/models/concerns/taggable.rb
# notice than file name has to match the module name
# (applying Rails conventions for autoloading)
module Taggable
	extend ActiveSupport::Concern

	included do
		has_many :taggings, as: :taggable
		has_many :tags, through: :taggings

		class_attribute :tag_limit
	end

	def tags_string
		tags.map(&:name).join(', ')
	end

	def tags_string=(tag_string)
		tag_names = tag_string.to_s.split(', ')

		tag_names.each do |tag_name|
			tags.build(name: tag_name)
		end
	end

	# methods defined here are going to extend the class, not the instance of it
	module ClassMethods
		def tag_limit(value)
			self.tag_limit_value = value
		end
	end

end

# So following the Product sample, you can add Taggable to any class you desire and share its functionality.




3.1.2
# Consider a Article model, a Event model and a Comment model. An article or an event has many comments. A comment belongs to either Article or Event.
# Traditionally, the models may look like this:
# Comment Model:
class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
end

# Article Model:
class Article < ActiveRecord::Base
  has_many :comments, as: :commentable 

  def find_first_comment
    comments.first(created_at DESC)
  end

  def self.least_commented
   #return the article with least number of comments
  end
end

# Event Model
class Event < ActiveRecord::Base
  has_many :comments, as: :commentable 

  def find_first_comment
    comments.first(created_at DESC)
  end

  def self.least_commented
   #returns the event with least number of comments
  end
end

# As we can notice, there is a significant piece of code common to both Event and Article. Using concerns we can extract this common code in a separate module Commentable.
# For this create a commentable.rb file in app/model/concerns.
module Commentable
	extend ActiveSupport::Concern

	included do
		has_many :comments, as: :commentable
	end

	# for the given article/event returns the first comment
	def find_first_comment
		comments.first(created_at DESC)
	end

	module ClassMethods
		def least_commented
			# returns the article/event which has least number of comments
		end
	end
end

# And now your models look like this

# Comment Model
class Comment < ActiveRecord::Base
	belongs_to :commentable, polymorphic: true
end

# Article Model:
class Article < ActiveRecord::Base
	include Commentable
end

# Event Model
class Event < ActiveRecord::Base
	include Commentable
end



2) Skin-nizing Fat Models.
Consider a Event model. A event has many attenders and comments.

Typically, the event model might look like this

 class Event < ActiveRecord::Base   
    has_many :comments
    has_many :attenders


    def find_first_comment
        # for the given article/event returns the first comment
    end

    def find_comments_with_word(word)
        # for the given event returns an array of comments which contain the given word
    end 

    def self.least_commented
        # finds the event which has the least number of comments
    end

    def self.most_attended
        # returns the event with most number of attendes
    end

    def has_attendee(attendee_id)
        # returns true if the event has the mentioned attendee
    end
end
Models with many associations and otherwise have tendency to accumulate more and more code and become unmanageable.Concerns provide a way to skin-nize fat modules making them more modularized and easy to understand.

The above model can be refactored using concerns as below: Create a attendable.rd and commentable.rb file in app/model/concern/event folder

attendable.rb

module Attendable
    extend ActiveSupport::Concern

    included do 
        has_many :attenders
    end

    def has_attender(attender_id)
        # returns true if the event has the mentioned attendee
    end

    module ClassMethods
      def most_attended
        # returns the event with most number of attendes
      end
    end
end
commentable.rb

module Commentable
    extend ActiveSupport::Concern

    included do 
        has_many :comments
    end

    def find_first_comment
        # for the given article/event returns the first comment
    end

    def find_comments_with_word(word)
        # for the given event returns an array of comments which contain the given word
    end   

    module ClassMethods
      def least_commented
        # finds the event which has the least number of comments
      end
    end
end
And now using Concerns , your Event model reduces to

class Event < ActiveRecord::Base    
    include Commentable
    include Attendable
end





参考：
https://gist.github.com/nightire/5227819
http://stackoverflow.com/questions/14541823/how-to-use-concerns-in-rails-4
https://signalvnoise.com/posts/3372-put-chubby-models-on-a-diet-with-concerns
https://richonrails.com/articles/rails-4-code-concerns-in-active-record-models#.UnC0FSSGnDc
https://www.bignerdranch.com/blog/breaking-table-model-controller-symmetry/