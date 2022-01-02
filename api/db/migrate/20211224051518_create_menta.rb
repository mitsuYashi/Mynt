class CreateMenta < ActiveRecord::Migration[5.2]
  def change
    create_table :menta do |t|
      t.string :uuid
      t.string :name
      t.string :mail
      t.date :birth
      t.string :profile
      t.string :url
      t.boolean :status

      t.timestamps
    end
    add_index :menta, :uuid, unique: true
    add_index :menta, :mail, unique: true
  end
end
