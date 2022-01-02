class CreateMentaTags < ActiveRecord::Migration[5.2]
  def change
    create_table :menta_tags do |t|
      t.string :menta_id
      t.string :tag_id
      t.string :experience

      t.timestamps
    end
  end
end
