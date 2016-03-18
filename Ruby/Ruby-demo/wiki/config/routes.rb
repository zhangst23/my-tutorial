Rails.application.routes.draw do

  get 'account/create'

  devise_for :users
  resources :articles
  
  root 'articles#index'

  mount RuCaptcha::Engine => "/rucaptcha"
  






end
