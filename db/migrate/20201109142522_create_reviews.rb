class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :reason
      t.integer :duration
      t.text :good
      t.text :bad
      t.text :advice
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
