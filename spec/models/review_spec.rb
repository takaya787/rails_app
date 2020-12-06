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
    it "reviewがuserで作成できる" do
      before_counts = Review.count
      review = FactoryBot.create(:review)
      after_counts = Review.count
      review.destroy
      expect(after_counts - before_counts).to eq 1
      expect(review.user_id).to eq @current_user.id
    end
    describe "reviewが失敗する用のテスト" do
      it "reason無しで投稿" do
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
        review.destroy
        expect(review).not_to be_valid
        expect(after_counts - before_counts).to eq 0
      end
      it "duration文字で投稿" do
        before_counts = Review.count
        review = @current_user.reviews.create(
          reason: "this is a test reason",
          duration: "１０",
          advice: "this is a test advice",
          food: "this is a test food column",
          convenient: "this is a test convenient column ",
          favorite: "this is a test favorite column",
          score: 2.5,
        )
        after_counts = Review.count
        review.destroy
        expect(review).to be_valid
        expect(after_counts - before_counts).to eq 1
      end
    end
  end
end
