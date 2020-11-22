class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    auth = request.env['omniauth.auth']
    if auth.present?
      user = User.find_or_create_from_auth(auth)
      log_in (user)
      current_user
      redirect_to root_url
    else
      @user = User.find_by(email: params[:session][:email].downcase)
      if @user && !!@user.authenticate(params[:session][:password])
        log_in (@user)
        current_user
        redirect_to root_url
      else
        flash.now[:danger] = "Invalid email or password combination"
        render "new"
      end
    end
  end

  def destroy
    current_user
    log_out (@current_user)
    redirect_to root_url
  end

end
