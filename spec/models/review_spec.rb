require 'rails_helper'

RSpec.describe Review, type: :model do
  describe "reviewのvalidatesを検証" do
    # before do
    #   FactoryBot.create(:user)
    #   FactoryBot.create(:host)
    #   user = User.find_by(email: "testuser@example.com")
    #   session[:user_id]= user.id
    #   @current_user = user
    #   @host = User.find_by(email: "testhost@example.com")
    # end
    it "reviewが作成できるか" do
      before_counts = Review.count
      review = Review.create(
        reason: "test review",
        duration: 1,
        advice: "this is a test advice",
        food: "this is a test food column",
        convenient: "this is a test convenient column ",
        favorite: "this is a test favorite column",
        score: 2.5,
      )
      after_counts = Review.count
      review.destroy
      expect(after_counts - before_counts).to eq 1
    end
  end
end
