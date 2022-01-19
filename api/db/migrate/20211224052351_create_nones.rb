class CreateNones < ActiveRecord::Migration[5.2]
  def change
    create_table :nones do |t|
      t.string :menta_id
      t.string :client_id
      t.date :date

      t.timestamps
    end
  end
end
