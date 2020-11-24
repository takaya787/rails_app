Rails.application.routes.draw do
  #reviews関連
  post '/reviews/check' => "reviews#check", as:"check_place"

  root 'roots#root'
 # sns認証用
  get 'auth/:provider/callback', to: "sessions#create"
 #sessions関連
  #get '/login' => "sessions#new" これは使う必要がない
  post '/login' => "sessions#create"
  post '/logout'=> "sessions#destroy"

  resources :reviews
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
