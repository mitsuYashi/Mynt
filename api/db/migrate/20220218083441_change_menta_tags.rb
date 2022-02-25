class ChangeMentaTags < ActiveRecord::Migration[5.2]
  def change
    remove_column :menta_tags, :experience, :string
  end
end
