class CreateClients < ActiveRecord::Migration[5.2]
  def change
    create_table :clients, id:false do |t|
      t.string :uuid, primary_key: true
      t.boolean :status, default: true

      t.timestamps
    end
    add_index :clients, :uuid, unique: true
  end
end
