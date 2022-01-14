Rails.application.routes.draw do
  get 'users_tags/index'
  get 'users_tags/create'
  get 'users_tags/show'
  get 'users_tags/destroy'
  get 'tags/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :example
  resources :users
  resources :menta
  resources :like
  resources :tags
  resources :menta_tags
  resources :users_tags
end
