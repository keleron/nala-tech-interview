# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_07_12_033504) do
  create_table "absences", force: :cascade do |t|
    t.integer "employee_id", null: false
    t.string "leader"
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.integer "days", null: false
    t.integer "absence_type", null: false
    t.string "details"
    t.integer "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_absences_on_employee_id"
  end

  create_table "employees", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_employees_on_username", unique: true
  end

  add_foreign_key "absences", "employees"
end
