class RemoveMentaColmn < ActiveRecord::Migration[5.2]
  def change
    remove_column :menta, :price
  end
end
