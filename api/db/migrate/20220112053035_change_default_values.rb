class ChangeDefaultValues < ActiveRecord::Migration[5.2]
  def change
    change_column_default :menta, :status, to: true
  end
end
