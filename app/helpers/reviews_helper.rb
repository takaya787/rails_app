module ReviewsHelper
  def getspot
    @spot = Spot.find_by(review_id: review.id)
  end
end
