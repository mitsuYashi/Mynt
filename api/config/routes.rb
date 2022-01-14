Rails.application.routes.draw do
  get 'nones/create'
  get 'nones/destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :example
  resources :users
  resources :menta
  resources :like
end
