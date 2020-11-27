class ApplicationController < ActionController::Base
  include SessionsHelper

  # validates用
  def correct_user_for_users
    if @current_user
        #userにadminを加えてadminなら通すように設定しておく
      if @current_user.id != @user.id
        flash[:danger]="あなたは正当なユーザーではありません"
        redirect_to root_url
      end
      return
    else
      flash[:danger]="ユーザー登録、またはログインをしてください"
      redirect_to root_url
    end
  end

  def correct_user_for_reviews
    #userにadminを加えてadminなら通すように設定しておく
    if @current_user.id != @review.user_id
      flash[:danger]="あなたは正当なユーザーではありません"
      redirect_to new_review_url
    end
  end
end
