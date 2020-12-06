require 'rails_helper'

RSpec.describe Review, type: :model do
  describe "reviewのvalidatesを検証" do
    #userとしてlogin
    before do
      user = FactoryBot.create(:user)
      host = FactoryBot.create(:host)
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
    describe "reviewが失敗する用のテスト" do
      it "reason無しで作成" do
        before_counts = Review.count
        review = @current_user.reviews.create(
          duration: 1,
          advice: "this is a test advice",
          food: "this is a test food column",
          convenient: "this is a test convenient column ",
          favorite: "this is a test favorite column",
          score: 2.5,
        )
        after_counts = Review.count
        expect(review).not_to be_valid
        expect(after_counts - before_counts).to eq 0
      end
    end
  end
end
