require 'rails_helper'

RSpec.describe Api::V1::AuthsController, type: :controller do
  let(:valid_credentials) { { username: 'admin', password: 'password' } }
  let(:invalid_credentials) { { username: 'admin', password: 'wrongpassword' } }
  let!(:user) do
    FactoryBot.create(:employee, username: 'admin', password: 'password', password_confirmation: 'password')
  end

  describe 'POST #login' do
    context 'with valid credentials' do
      it 'logs in the user and sets the session' do # rubocop:disable RSpec/MultipleExpectations
        post :login, params: valid_credentials

        expect(response).to have_http_status(:ok)
        expect(session[:user_id]).to eq(user.id)
      end
    end

    context 'with invalid credentials' do
      it 'does not log in the user and returns unauthorized status' do # rubocop:disable RSpec/MultipleExpectations
        post :login, params: invalid_credentials

        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('unauthorized')
        expect(session[:user_id]).to be_nil
      end
    end
  end

  describe 'POST #logout' do
    before do
      post :login, params: valid_credentials
    end

    it 'logs out the user and clears the session' do # rubocop:disable RSpec/MultipleExpectations
      post :logout

      expect(response).to have_http_status(:ok)
      expect(response.body).to include('ok')
      expect(session[:user_id]).to be_nil
    end
  end
end
