require 'rails_helper'

RSpec.describe Review, type: :model do
  describe "reviewのvalidatesを検証" do
    #userとしてlogin
    before do
      FactoryBot.create(:user)
      FactoryBot.create(:host)
      user = User.find_by(email: "testuser@example.com")
      @current_user = user
      @host = User.find_by(email: "testhost@example.com")
    end
    it "reviewが作成できる" do
      before_counts = Review.count
      # review = @current_user.reviews.create(
      #   reason: "test review",
      #   duration: 1,
      #   advice: "this is a test advice",
      #   food: "this is a test food column",
      #   convenient: "this is a test convenient column ",
      #   favorite: "this is a test favorite column",
      #   score: 2.5,
      # )
      review = FactoryBot.create(:review)
      after_counts = Review.count
      review.destroy
      expect(after_counts - before_counts).to eq 1
      expect(review.user_id).to eq @current_user.id
    end
  end
end
