class ChangeProfileColmn < ActiveRecord::Migration[5.2]
  def change
    change_column :menta, :profile, :text
    change_column :clients, :profile, :text
    #Ex:- change_column("admin_users", "email", :string, :limit =>25)
    #Ex:- change_column("admin_users", "email", :string, :limit =>25)
  end
end
