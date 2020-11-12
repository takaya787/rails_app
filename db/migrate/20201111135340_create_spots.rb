class CreateSpots < ActiveRecord::Migration[6.0]
  def change
    create_table :spots do |t|
      t.float :lat
      t.float :lon
      t.text :adress
      t.references :review, null: false, foreign_key: true

      t.timestamps
    end
  end
end
