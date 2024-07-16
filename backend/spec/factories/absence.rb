FactoryBot.define do
  factory :absence do
    id { nil }
    employee { FactoryBot.create(:employee) }
    leader { Faker::Name.name }
    start_date { Faker::Time.between(from: 2.months.ago, to: 1.day.ago) }
    end_date { start_date + rand(1..5).days }
    days { nil }
    absence_type { 'Vacaciones' }
    details { Faker::Lorem.paragraph }
    status { 'Pendiente' }
  end
end
