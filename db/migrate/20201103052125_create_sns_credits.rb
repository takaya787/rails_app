class CreateSnsCredits < ActiveRecord::Migration[6.0]
  def change
    create_table :sns_credits do |t|
      t.string :uid
      t.string :provider
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
