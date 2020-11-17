class ReviewsController < ApplicationController
  before_action:current_user

  def index
    @current_user
  end

  def new
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
    p @review
    respond_to do |format|
      flash[:success]="redirectします"
      format.html { redirect_to new_review_url }
      format.json { render :json => @review }
    end
  end


  def check
    result = Geocoder.search(params[:keyword])
    respond_to do |format|
      if !result.empty?
        puts result
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
