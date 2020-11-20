class RenameLonColumnToSpots < ActiveRecord::Migration[6.0]
  def change
    rename_column :spots, :lon, :lng
  end
end
