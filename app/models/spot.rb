class Spot < ApplicationRecord
  belongs_to :review
  #lat, lonにcolumnを変更
  geocoded_by :address, latitude: :lat, longitude: :lon
  after_validation :geocode

  # def address
  #   [street, city, state, country].compact.join(', ')
  # end
end
