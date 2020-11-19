class ReviewsController < ApplicationController
  before_action:current_user
  before_action:back_login

  def index
    #loadの回数を減らすためにincludeメソッドでデータを予め取得する
    #またjbuilderで関連modelの情報を表示させることができる
    @reviews = Review.includes(:spot, :user)
    @spots = Spot.all
    # respond_to do |format|
    #   format.html
    #   format.json { render :json => @reviews }
    # end
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
        #byebug #debug用
        flash[:success]="redirectします"
        format.html { redirect_to reviews_url }
      else
        flash[:danger]="reviewを作成できませんでした。"
        format.html { render :new }
      end
    end
  end


  def check
    result = Geocoder.search(params[:keyword])
    respond_to do |format|
      if !result.empty?
        geography= result.first.coordinates
        session[:lat] = geography[0]
        session[:lng] = geography[1]
        #@center["lat"], @center["lng"]
        flash[:success]="検索した場所に移動します"
        format.html { redirect_to new_review_url}
        format.json { geography }
        #format.js {flash[:success]= "検索した場所は見つかりませんでした"}
      else
        flash[:danger]="検索した場所が見つかりませんでした"
        format.html { render :new }
        format.json {　geography　}
        #format.js { flash[:danger]= "検索した場所は見つかりませんでした"}
      end
    end
  end

  private
    def review_params
      params.require(:review).permit(:reason, :duration, :good, :bad, :advice)
    end
end
