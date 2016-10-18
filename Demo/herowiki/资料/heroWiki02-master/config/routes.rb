Rails.application.routes.draw do
  devise_for :users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :nodes
  resources :heros
  
  root 'heros#index'
  get 'tags/:tag', to: 'heros#index', as: :tag





end
