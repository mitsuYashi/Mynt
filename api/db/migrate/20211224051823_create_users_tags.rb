class CreateUsersTags < ActiveRecord::Migration[5.2]
  def change
    create_table :users_tags do |t|
      t.string :user_id
      t.string :tag_id

      t.timestamps
    end
  end
end
