Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :example
  resources :users
  resources :menta
  resources :like
  resources :nones
end
