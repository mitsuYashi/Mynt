class CreateCreditcards < ActiveRecord::Migration[5.2]
  def change
    create_table :creditcards do |t|
      t.string :user_id
      t.string :number
      t.string :name
      t.string :limit
      t.string :code

      t.timestamps
    end
  end
end
