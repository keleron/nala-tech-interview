json.absences do
  json.array! @absences, partial: 'api/v1/absences/absence', as: :absence
end

json.partial! 'meta/meta', meta_object: @absences
