module SessionsHelper
  def log_in (user)
    session[:user_id]= user.id
  end

  def log_out (user)
    session[:user_id]= nil
  end
  #現在ログイン中のユーザーを返す(いる場合)
  def current_user
    if (user_id = session[:user_id] )
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user && user.authenticated?(:remember, cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end
  #渡されたuserがcurrent_userであればtrueを返す
  def current_user?(user)
    user && user == current_user
  end

   #ユーザーがログインしていればtrue,そうでなければfalse
  def logged_in?
    !current_user.nil?
  end

  def back_login
    unless logged_in?
      redirect_to root_url
    end
  end


end
