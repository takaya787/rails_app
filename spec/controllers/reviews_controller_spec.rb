require 'rails_helper'
RSpec.describe ReviewsController, type: :controller do
  describe "review controller test" do
    let (:req_params) { { review: {
      reason: "test reason",
      duration: 1,
      advice: "this is a test advice",
      food: "this is a test food column",
      convenient: "this is a test convenient",
      favorite: "this is a test favorite",
      score: 2.5
    } } }

    describe "loginしていない" do
      describe "#new" do
        # redirectされるか
        it "reject access to the new page" do
          get :index
          expect(response).to have_http_status(302)
          expect(response).to redirect_to(root_url)
        end
      end
      describe "#create" do
        # redirectされるか
        it "reject to create review" do
          before_reviews = Review.count
          post :create, params: req_params
          after_reviews = Review.count
          expect(response).to have_http_status(302)
          expect(after_reviews - before_reviews).to eq 0
          expect(response).to redirect_to(root_url)
        end
      end
    end

    describe "userでloginしている" do
      #userとしてlogin
      before do
        user = FactoryBot.create(:user) #user作成
        @host = FactoryBot.create(:host) #host作成
        @review = FactoryBot.create(:review) #userで作成
        #@other_review = FactoryBot.create(:other_review) #hostで作成
        session[:user_id] = user.id #userでlog in
        @current_user = User.find(session[:user_id])
      end
      describe "#new" do
        # map pageがひらける
        it "can open map page" do
          get :new
          expect(response).to have_http_status(200)
          expect(session[:user_id]).to eq @current_user.id
        end
      end
      describe "#edit" do
        #review edit が開ける
        it "can open review edit page " do
          get :edit, params: {id: @review.id}
          expect(response).to have_http_status(200)

        end
        #その他のユーザーのreview edit は開けない
        it "can open review edit page " do
          other_review = @host.reviews.create( reason: "test review",
            duration: 1,
            advice: "this is a test advice",
            food: "this is a test food column",
            convenient: "this is a test convenient column ",
            favorite: "this is a test favorite column",
            score: 2.5,
          )
          get :edit, params: {id: other_review.id}
          expect(response).to have_http_status(302)
          expect(response).to redirect_to(new_review_path)
        end
      end
    end
  end
end
