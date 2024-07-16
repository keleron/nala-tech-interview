FactoryBot.define do
  factory :employee do
    id { nil }
    name { Faker::Name.name }
    username { Faker::Internet.email }
    password { 'pass' }
    password_confirmation { 'pass' }
  end
end
