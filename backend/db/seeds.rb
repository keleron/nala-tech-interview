# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Employee.destroy_all

FactoryBot.create(:employee, username: 'admin')

10.times do
  employee = FactoryBot.create(:employee)
  10.times do
    FactoryBot.create(:absence, employee:)
  end
end
