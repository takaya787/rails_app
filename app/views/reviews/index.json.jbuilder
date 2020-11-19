#@reviewsが複数で、jsonは単一のオブジェクトからしかデータを取得できないので、array!で一つずつ扱えるように設定する必要がある
#部分partialを用いてjson表示
json.reviews do
  json.array! @reviews, partial: "reviews/review", as: :review
end
