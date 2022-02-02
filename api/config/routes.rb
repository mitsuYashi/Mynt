Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :example
  resources :users
  resources :menta
  resources :clients
  resources :likes
  resources :tags
  resources :menta_tags
  resources :users_tags
  resources :nones
  resources :messages
end
