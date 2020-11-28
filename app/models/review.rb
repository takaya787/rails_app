class Review < ApplicationRecord
  #新しいものが上に(更新されたらまた上になる)表示されるようにする
  default_scope -> { order(updated_at: :desc) }
  belongs_to :user
  #has_oneではmodelのclassを親classと同じものにして扱っている
  has_one :spot, dependent: :destroy, class_name: Spot.to_s
  validates(:reason, presence: true, length: {maximum: 50 })
  validates(:duration, presence: true)
  validates(:good, length: {maximum: 300 })
  validates(:bad, length: {maximum: 300 })
  validates(:advice, length: {maximum: 300 })
end
