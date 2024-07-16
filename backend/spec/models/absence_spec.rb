require 'rails_helper'

RSpec.describe Absence, type: :model do
  let(:employee) { FactoryBot.create(:employee) }
  let(:absence) { FactoryBot.build(:absence, employee:, start_date: '2024-01-01', end_date: '2024-01-10') }

  describe 'Validations' do
    it 'is valid with valid attributes' do
      expect(absence).to be_valid
    end

    it 'is valid with invalid withut start date' do
      absence.start_date = nil
      expect(absence).not_to be_valid
    end

    it 'is valid with invalid withut end date' do
      absence.end_date = nil
      expect(absence).not_to be_valid
    end
  end
end
