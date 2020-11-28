class RemoveColumnsFromReviews < ActiveRecord::Migration[6.0]
  def change
    remove_column :reviews, :good
    remove_column :reviews, :bad
  end
end
