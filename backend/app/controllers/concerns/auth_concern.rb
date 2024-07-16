module AuthConcern
  extend ActiveSupport::Concern

  included do
    before_action :authenticate!
  end

  private

  def authenticate!
    return render json: { status: 'log in first' }, status: :unauthorized unless session[:user_id]

    @current_user = Employee.find(session[:user_id])
  end
end
