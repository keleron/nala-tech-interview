module Api
  module V1
    class AuthsController < ApplicationController
      skip_before_action :authenticate!, only: [:login]

      def login
        @user = Employee.find_by(username: params['username']).try(:authenticate, params[:password])
        return render json: { status: 'unauthorized' }, status: :unauthorized unless @user

        session[:user_id] = @user.id if @user
        render json: @user, status: :ok
      end

      def logout
        session[:user_id] = nil
        render json: { status: 'ok' }, status: :ok
      end
    end
  end
end
