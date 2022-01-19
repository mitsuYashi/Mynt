class CreateContracts < ActiveRecord::Migration[5.2]
  def change
    create_table :contracts do |t|
      t.string :menta_id
      t.string :client_id
      t.string :status

      t.timestamps
    end
  end
end
