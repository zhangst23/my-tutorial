
rails new vote-example
rails g scaffold Movie title:string image:string
rails g controller home index
rake db:migrate
gem devise
rails g devise:install
rails g devise User
rake db:migrate
rails s
***
gem acts_as_votable
rails generate acts_as_votable:migration
rake db:migrate
***
class Post < ActiveRecord::Base
  acts_as_votable
end

class User < ActiveRecord::Base
  acts_as_voter
end

***
class MoviesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_movie, only: [:show, :edit, :update, :destroy, :upvote, :downvote]

  ###

  def upvote
    @movie.upvote_from current_user
    redirect_to movies_path
  end


  def downvote
    @movie.downvote_from current_user
    redirect_to movies_path
  end

  ###

end
***
<!-- routes.rb -->
Rails.application.routes.draw do

  resources :movies do
    member do
      put "like" => "movies#upvote"
      put "unlike" => "movies#downvote"
    end
  end

end

***

<div class="caption" style="text-align:center;">
              
                <%= link_to like_movie_path(movie), class: "like", method: :put do %>
                    <button type="button" class="btn btn-info" aria-label="Left Align">
                        <span class="glyphicon glyphicon-thumbs-up glyphicon-align-center" aria-hidden="true"></span>
                        <span class="badge"><%= movie.get_upvotes.size %></span>
                    </button>
                <% end %>

                <%= link_to unlike_movie_path(movie), class: "like", method: :put do %>
                    <button type="button" class="btn btn-info" aria-label="Left Align">
                        <span class="glyphicon glyphicon-thumbs-down glyphicon-align-center" aria-hidden="true"></span>
                        <span class="badge"><%= movie.get_downvotes.size %></span>
                    </button>
                <% end %>
</div>


***
rails g migration AddCachedVotesToMovies
add cache example from github to db
rake db:migrate

<!-- moviescontroller -->
def index
    @movies = Movie.all.order(:cached_votes_up => :desc)
end

rake db:migrate:status
rake db:migrate:down VERSION=20160317063434
RAKE db:migrate











