class Review < ApplicationRecord
  belongs_to :user
  has_one :spot, dependent: :destroy
  validates(:duration, presence: true)
  validates(:reason, presence: true)
end
