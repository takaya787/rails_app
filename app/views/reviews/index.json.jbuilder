#@reviewsが複数で、jsonは単一のオブジェクトからしかデータを取得できないので、array!で一つずつ扱えるように設定する必要がある
#部分partialを用いてjson表示
# json.array! @reviews, partial: "reviews/review", as: :review
json.array! @reviews do |review|
  json.extract! review, :id, :reason, :duration, :food, :convenient, :favorite, :score, :advice, :user_id
  json.lat review.spot.lat
  json.lng review.spot.lng
  json.address review.spot.address
end
