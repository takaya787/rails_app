class ReviewsController < ApplicationController
  def index

  end

  def new
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
        format.html { render :new }
        format.json { }
        #format.js { flash[:danger]= "検索した場所は見つかりませんでした"}
      end
    end
  end
end
