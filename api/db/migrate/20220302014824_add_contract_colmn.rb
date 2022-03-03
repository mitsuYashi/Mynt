class AddContractColmn < ActiveRecord::Migration[5.2]
  def change
      add_column :contracts, :price, :integer, :default => 0
  end
end
