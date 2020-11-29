class ApplicationController < ActionController::Base
  include SessionsHelper

  # validates用
  def correct_user_for_users
    if @current_user
      unless @current_user.admin?
        #current_userがadminなら通す
        if @current_user.id != @user.id
          flash[:danger]="あなたは正当なユーザーではありません"
          redirect_to root_url
        end
      end
    else
      flash[:danger]="ユーザー登録、またはログインをしてください"
      redirect_to root_url
    end
  end

  def correct_user_for_reviews
    unless @current_user.admin?
      #current_userがadminなら通す
      if @current_user.id != @review.user_id
        flash[:danger]="あなたは正当なユーザーではありません"
        redirect_to new_review_url
      end
    end
  end

  def admin_user
    if logged_in?
      unless @current_user.admin?
        flash[:danger]="アクセス権限がありません"
        redirect_to root_url
      end
    else
      flash[:danger]="このページはアクセスできません"
      redirect_to root_url
    end
  end
end
