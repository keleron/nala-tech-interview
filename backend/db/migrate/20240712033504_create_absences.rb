class CreateAbsences < ActiveRecord::Migration[7.1]
  def change
    create_table :absences do |t|
      t.references :employee, null: false, foreign_key: true
      t.string :leader
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :days, null: false
      t.integer :absence_type, null: false
      t.string :details
      t.integer :status, null: false

      t.timestamps
    end
  end
end
