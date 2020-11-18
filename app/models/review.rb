class Review < ApplicationRecord
  belongs_to :user
  #has_oneではmodelのclassを親classと同じものにして扱っている
  has_one :spot, dependent: :destroy, class_name: Spot.to_s
  validates(:reason, presence: true, length: {maximum: 50 })
  validates(:duration, presence: true)
  validates(:good, length: {maximum: 300 })
  validates(:bad, length: {maximum: 300 })
  validates(:advice, length: {maximum: 300 })
end
