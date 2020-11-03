class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by(email: params[:session][:email].downcase)
      if @user && !!@user.authenticate(params[:session][:password])
        log_in (@user)
        current_user
        redirect_to root_url
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
  end

  def destroy
    current_user
    log_out (@current_user)
    redirect_to root_url
  end

end
