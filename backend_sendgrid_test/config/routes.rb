Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # auth routes
  post '/api/auth/login',      to: 'auth#login',      as: 'login'
  post '/api/auth/signup',     to: 'auth#signup',     as: 'signup'

  # mails routes
  get  '/api/mails/templates', to: 'mails#templates', as: 'list-templates'
  post '/api/mails/send',      to: 'mails#send_mail', as: 'send-email'
end
