class Review < ApplicationRecord
  belongs_to: user
  has_one: spot, dependent: :destroy
  validates()
  attr_accessor :address, :lat, :lon, :keyword
end
