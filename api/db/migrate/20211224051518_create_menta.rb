class CreateMenta < ActiveRecord::Migration[5.2]
  def change
    create_table :menta, id: false do |t|
      t.string :uuid, primary_key: true
      t.string :profile
      t.string :url
      t.boolean :status

      t.timestamps
    end
    add_index :menta, :uuid, unique: true
  end
end
