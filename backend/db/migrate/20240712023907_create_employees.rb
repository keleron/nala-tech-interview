class CreateEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :employees do |t|
      t.string :username, index: { unique: true }
      t.string :password_digest
      t.string :name

      t.timestamps
    end
  end
end
