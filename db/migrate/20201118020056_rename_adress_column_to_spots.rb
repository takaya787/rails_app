class RenameAdressColumnToSpots < ActiveRecord::Migration[6.0]
  def change
    rename_column :spots, :adress, :address
  end
end
