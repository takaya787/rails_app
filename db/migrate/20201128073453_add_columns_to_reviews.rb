class AddColumnsToReviews < ActiveRecord::Migration[6.0]
  def change
    add_column :reviews, :food, :text
    add_column :reviews, :safety, :text
    add_column :reviews, :convenient, :text
    add_column :reviews, :favorite, :string
    add_column :reviews, :score, :float
  end
end
