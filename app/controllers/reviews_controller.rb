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
      flash[:success]="地図を変更しました"
      redirect_to "/reviews/new"
    else
      flash[:danger]="検索した場所は見つかりませんでした"
      render 'reviews/new'
    end
  end
end
