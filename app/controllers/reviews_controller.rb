class ReviewsController < ApplicationController
  def index
  end

  def new
  end

  def check
    result = Geocoder.search(params[:keyword])
    if result
      puts result
      debugger
      @result = result.first.coordinates
      session[:lat] = @result[0]
      session[:lon] = @result[1]
      flash[:success]="地図を変更しました"
      redirect_to "/reviews/new"
    else
      flash[:danger]="検索した場所は見つかりませんでした"
      render 'reviews/new'
    end
  end
end
