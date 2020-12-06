require 'rails_helper'
RSpec.describe UsersController, type: :controller do
  # user = FactoryBot.create(:user)
  # host = FactoryBot.create(:user, admin: true)
  describe "loginしていない" do
    describe "#index" do
    # redirectされるか
      it "redirect to root" do
        get :index
        expect(response).to redirect_to(root_url)
      end
    end
  end
  describe "一般ユーザーでログイン" do
    before do
      FactoryBot.create(:user)
      FactoryBot.create(:host)
      user = User.find_by(email: "testuser@example.com")
      session[:user_id]= user.id
      @current_user = user
      @host = User.find_by(email: "testhost@example.com")
    end

    describe "#index" do
    # indexページのアクセスはredirectされる
      it "redirect to root" do
        get :index
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(root_url)
      end
    end
    describe "#show" do
    #myページにaccessできる
      it "open mypage" do
        get :show, params: {id: @current_user.id}
        expect(response).to have_http_status(200)
      end
    #他のuserのmyページにはaccessできない
      it "can not open others pages" do
        get :show, params: {id: @host.id }
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(root_url)
      end
    end

    describe "#search" do
    # search actionはredirectされる
      it "redirect to root" do
        get :search
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(root_url)
      end
    end
  end
  describe "hostユーザーでログイン" do
    before do
      FactoryBot.create(:user)
      FactoryBot.create(:host)
      host = User.find_by(email: "testhost@example.com")
      session[:user_id]= host.id
      @current_user = host
      @user = User.find_by(email: "testuser@example.com")
    end

    describe "#index" do
    # indexページのアクセスできる
      it "redirect to root" do
        get :index
        expect(response).to have_http_status(200)
      end
    end
    describe "#show" do
    #全てのshowにaccessできる
      it "open mypage" do
        get :show, params: {id: @current_user.id}
        expect(response).to have_http_status(200)
        get :show, params: {id: @user.id}
        expect(response).to have_http_status(200)
      end
    end
  end
end
