class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.string :menta_id
      t.string :user_id
      t.boolean :status

      t.timestamps
    end
  end
end
