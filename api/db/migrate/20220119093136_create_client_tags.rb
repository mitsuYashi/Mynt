class CreateClientTags < ActiveRecord::Migration[5.2]
  def change
    create_table :client_tags do |t|
      t.string :client_id
      t.string :tag_id

      t.timestamps
    end
  end
end
