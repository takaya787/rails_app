class RootsController < ApplicationController
  def root
    @user = User.new
  end

  def beginner
  end

  def guest
    if session[:lat] && session[:lng]
      @center = { "lat" => session[:lat], "lng" => session[:lng]}
    else
      @center = { "lat" => -33.8888197, "lng" => 151.2092955 }
    end
    respond_to do |format|
      format.html
      format.json { render :json => @center}
    end
  end
end
