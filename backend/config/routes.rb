Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :employees do
        resources :absences, only: %i[index show]
        collection do
          post :bulk_upsert
        end
      end
      resources :absences do
        collection do
          post :bulk_create
        end
      end
      get 'logout', to: 'auths#logout'
      post 'login', to: 'auths#login'
    end
  end
end
