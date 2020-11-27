class ReviewsController < ApplicationController
  before_action :current_user
  before_action :back_login
  before_action :set_review, only: [:show, :edit, :update, :destroy]
  before_action :correct_user_for_reviews, only: [:edit, :update, :destroy]
  #skip_before_action:verify_authenticity_token
  def index
    #loadの回数を減らすためにincludeメソッドでデータを予め取得する
    #またjbuilderで関連modelの情報を表示させることができる
    @reviews = Review.includes(:spot, :user)

    #jsonではindex.json.jbuilderが表示されるようにする
    respond_to do |format|
      format.html #index.html.erb
      format.json { render :index } #index.json.jbuilder
    end
  end

  def new
    @review = Review.new
    @current_user
    if session[:lat] && session[:lng]
      @center = { "lat" => session[:lat], "lng" => session[:lng]}
    else
      @center = { "lat" => 34.6937249, "lng" => 135.5022535 }
    end
    respond_to do |format|
      format.html
      format.js { render "reviews/new" }
      format.json { render :json => @center}
    end
  end

  def create
    @review = @current_user.reviews.new(review_params)
    respond_to do |format|
      if @review.save
        result = Geocoder.search([ params[:lat], params[:lng] ]).first.address
        # has_manyとhas_oneでコードが変わる(former: has_many, latter: has_one)
        # spot = @review.spot.create(:address => result )
        spot = @review.create_spot(:address => result )
        flash[:success]="投稿を作成しました。"
        format.html { redirect_to reviews_url }
         #二重送信を防ぐ処理の都合によりflash messageが表示できていない
        format.js { render "reviews/new" }
      else
        flash[:danger]="投稿を作成できませんでした。"
        format.html { render :new }
          #二重送信を防ぐ処理の都合によりflash messageが表示できていない
        format.js { render "reviews/new" }
      end
    end
  end
  def show
    @user = User.find_by(id: @review.user_id)
  end

  def edit
  end

  def update
    respond_to do |format|
      if @review.update(review_params)
        flash[:success]="投稿を変更しました。"
        format.js { render "reviews/new"}
        format.html { redirect_to user_path(@current_user) }
      else
        flash[:danger]="投稿を変更できませんでした。"
        format.js { render "reviews/new" }
        format.html { render :new }
      end
    end
  end

  def destroy
    @review.destroy
    redirect_to user_path(@current_user)
  end

  def check
    result = Geocoder.search(params[:keyword])
    respond_to do |format|
      if !result.empty?
        @center= result.first.coordinates
        session[:lat] = @center[0]
        session[:lng] = @center[1]
        #@center["lat"], @center["lng"]
        flash[:success]="検索した場所に移動します"
        format.html { redirect_to new_review_url}
        format.json { @center }
        format.js { render "reviews/new"}
      else
        flash[:danger]="検索した場所が見つかりませんでした"
        format.html { render :new }
        format.json {　@center　}
        format.js { render "reviews/new" }
      end
    end
  end

  private
    def set_review
      @review = Review.find(params[:id])
    end
    def review_params
      params.require(:review).permit(:reason, :duration, :good, :bad, :advice)
    end
end
