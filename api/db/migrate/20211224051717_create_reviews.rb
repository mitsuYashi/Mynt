class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :menta_id
      t.string :client_id
      t.integer :star
      t.string :comment

      t.timestamps
    end
  end
end
