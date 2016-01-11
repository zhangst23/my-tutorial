Rails.application.routes.draw do
  devise_for :users
  resources :posts do 
    member do
      get "like", to: "posts#upvote"
      put "dislike", to: "post#downvote"
    end

    resources :comments

  end

  root 'posts#index'
 
  
end
