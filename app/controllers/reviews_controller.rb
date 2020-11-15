class ReviewsController < ApplicationController
  def index
  end

  def new
    @lat = session[:lat]
    @lng = session[:lng]
  end

  def check
    result = Geocoder.search(params[:keyword])
    respond_to do |format|
      if !result.empty?
        puts result
        result = result.first.coordinates
        @center = { "lat" => result[0], "lng" => result[1] }
        #@center["lat"], @center["lng"]
        flash[:success]="検索した場所に移動します"
        format.html { redirect_to new_review_url}
        format.js
      else
        format.html { render :new }
        format.json { render "reviews/new" }
        flash[:danger]="検索した場所は見つかりませんでした"
      end
    end
  end
end
