json.employees do
  json.array! @employees, partial: 'api/v1/employees/employee', as: :employee
end

json.partial! 'meta/meta', meta_object: @employees
