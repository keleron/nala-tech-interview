class Employee < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: true, presence: true

  before_validation :generate_random_password, if: -> { password.blank? }
  has_many :absences, dependent: :destroy

  def self.ransackable_attributes(_auth_object = nil)
    %w[id name username]
  end

  def self.ransackable_associations(_auth_object = nil)
    []
  end

  def generate_random_password
    self.password = self.password_confirmation = SecureRandom.hex(16)
  end
end
