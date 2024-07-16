class Absence < ApplicationRecord
  enum :absence_type, %i[Incapacidad Vacaciones]
  enum :status, %i[Pendiente Rechazado Aprobado]

  belongs_to :employee
  validates :start_date, :end_date, presence: true
  before_save :calculate_days

  def calculate_days
    self.days = (end_date - start_date).to_i
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[start_date end_date employee_id absence_type status]
  end

  def self.ransackable_associations(_auth_object = nil)
    []
  end

  ransacker :status, formatter: proc { |v| statuses[v] } do |parent|
    parent.table[:status]
  end

  ransacker :absence_type, formatter: proc { |v| absence_types[v] } do |parent|
    parent.table[:absence_type]
  end
end
