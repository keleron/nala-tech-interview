json.extract! absence, :id, :employee_id, :leader, :start_date, :end_date, :absence_type, :details, :status, :days

json.url api_v1_absence_url(absence, format: :json)
