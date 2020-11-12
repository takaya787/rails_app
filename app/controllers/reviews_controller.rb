class ReviewsController < ApplicationController
  def index
  end

  def new
  end

  def check
    result = Geocoder.search(params[:keyword])
    if !result.empty?
      puts result
      @result = result.first.coordinates
      session[:lat] = @result[0]
      session[:lng] = @result[1]
      flash[:success]="検索した場所に移動します"
      redirect_to "/reviews/new"
    else
      render 'reviews/new'
      flash[:danger]="検索した場所は見つかりませんでした"

    end
  end
end
