require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe 'api/v1/absences', type: :request do
  let(:valid_credentials) { { username: 'admin', password: 'password', password_confirmation: 'password' } }

  let(:valid_attributes) { FactoryBot.build(:absence).attributes }
  let(:invalid_attributes) { {} }
  let(:valid_headers) { {} }

  before do
    FactoryBot.create(:employee, valid_credentials)
    post api_v1_login_url, params: valid_credentials
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      FactoryBot.create(:absence, employee: FactoryBot.create(:employee))
      get api_v1_absences_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      absence = FactoryBot.create(:absence, employee: FactoryBot.create(:employee))
      get api_v1_absence_url(absence), as: :json
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Absence' do
        employee = FactoryBot.create(:employee)
        expect do
          post api_v1_absences_url,
               params: { absence: FactoryBot.build(:absence, employee:).attributes }, headers: valid_headers, as: :json
        end.to change(Absence, :count).by(1)
      end

      it 'renders a JSON response with the new absence' do # rubocop:disable RSpec/MultipleExpectations
        employee = FactoryBot.create(:employee)
        post api_v1_absences_url,
             params: { absence: FactoryBot.build(:absence, employee:).attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end
  end

  describe 'POST /absences/bulk_create' do
    context 'with bulk file' do # rubocop:disable RSpec/MultipleMemoizedHelpers
      let(:file_path) { Rails.root.join('spec/fixtures/files/times.csv') }
      let(:uploaded_file) { Rack::Test::UploadedFile.new(file_path, 'text/csv') }

      it 'creates a bunch of new Absences' do
        post bulk_upsert_api_v1_employees_url, params: { file: uploaded_file }
        expect do
          post bulk_create_api_v1_absences_url, params: { file: uploaded_file }
        end.to change(Absence, :count).by(318)
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        FactoryBot.build(:absence).attributes
      end

      it 'updates the requested absence' do # rubocop:disable RSpec/NoExpectationExample
        absence = FactoryBot.create(:absence)
        patch api_v1_absence_url(absence),
              params: { absence: new_attributes }, headers: valid_headers, as: :json
        absence.reload
        # skip('Add assertions for updated state')
      end

      it 'renders a JSON response with the absence' do # rubocop:disable RSpec/MultipleExpectations
        absence = FactoryBot.create(:absence)
        patch api_v1_absence_url(absence),
              params: { absence: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested absence' do
      absence = Absence.create! valid_attributes
      expect do
        delete api_v1_absence_url(absence), headers: valid_headers, as: :json
      end.to change(Absence, :count).by(-1)
    end
  end
end
