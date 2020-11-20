class Spot < ApplicationRecord
  belongs_to :review
  #lat, lngにcolumnを変更
  geocoded_by :address, latitude: :lat, longitude: :lng
  after_validation :geocode

  # def address
  #   [street, city, state, country].compact.join(', ')
  # end
end
