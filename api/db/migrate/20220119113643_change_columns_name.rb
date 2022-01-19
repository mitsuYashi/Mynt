class ChangeColumnsName < ActiveRecord::Migration[5.2]
  def change
    rename_column :clients, :uuid, :user_id
    rename_column :menta, :uuid, :user_id
  end
end
