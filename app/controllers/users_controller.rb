class UsersController < ApplicationController
  before_action :current_user
  #admin以外ユーザー一覧見れない
  before_action :admin_user, only: [:index, :search]
  before_action :set_user, only: [ :edit, :update, :destroy]

  before_action :correct_user_for_users, only: [:show, :edit, :update, :destroy]
  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])
    @reviews = Review.where(user_id: @user.id).includes(:spot)
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    @user.email.downcase!
    respond_to do |format|
      if @user.save
        format.html { redirect_to root_url, notice: 'User was successfully created.' }
        format.json { render "roots/root", status: :created, location: @user }
        log_in (@user)
        current_user
      else
        #format.html { render 'controller/name' }でもいける
        flash.now[:danger] = "ユーザーを作成できませんでした。"
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    if @current_user.id = @user.id
      log_out (@current_user)
    end
    @user.destroy
    respond_to do |format|
      format.html { redirect_to root_url, notice: 'ユーザーが削除されました。' }
      format.json { head :no_content }
    end
  end

  def search
    if  params[:email].present?
      @users = User.where(email: "#{params[:email]}")
      #privateに設定
      search_response
    elsif params[:name].present?
      @users = User.where(' name LIKE ?', "%#{params[:name]}%")
      search_response
    else
      flash.now[:danger]="フォームを入力してください"
      render "index"
    end
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def search_response
      unless @users.empty?
        flash.now[:success]="ユーザーが見つかりました"
      else
        flash.now[:danger]="お探しのユーザーは見つかりませんでした。"
      end
      render "index"
    end
end
