Rails.application.routes.draw do
  root 'roots#root'
 # sns認証用
  get 'auth/:provider/callback', to: "sessions#create"
 #sessions(users resource) 関連
  get '/login' => "sessions#new"
  post '/login' => "sessions#create"
  post '/logout'=> "sessions#destroy"

  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
