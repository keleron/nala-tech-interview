json.extract! employee, :id, :username, :name
json.total_days employee.absences.sum(&:days)

json.url api_v1_employee_url(employee, format: :json)
json.absences api_v1_employee_absences_url(employee)
