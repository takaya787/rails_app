class Spot < ApplicationRecord
  belongs_to :review
  #lat, lonにcolumnを変更
  geocoded_by :adress, latitude: :lat, longitude: :lon
  after_validation :geocode
end
