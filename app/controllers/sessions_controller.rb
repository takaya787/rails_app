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
      flash[:success]="Login しました。"
      redirect_to new_review_url
    else
      @user = User.find_by(email: params[:session][:email].downcase)
      if @user && !!@user.authenticate(params[:session][:password])
        log_in (@user)
        current_user
        flash[:success]="Login しました。"
        redirect_to new_review_url
      else
        flash.now[:danger] = "メールアドレスかパスワードが正しくありません"
        render "roots/root"
      end
    end
  end

  def destroy
    current_user
    log_out (@current_user)
    flash[:danger] = "ログアウトしました。"
    redirect_to root_url
  end

end
