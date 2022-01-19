class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users, id:false do |t|
      t.string :uuid, primary_key: true
      t.string :name
      t.string :mail
      t.date :birth

      t.timestamps
    end
    add_index :users, :uuid, unique: true
    add_index :users, :mail, unique: true
  end
end
