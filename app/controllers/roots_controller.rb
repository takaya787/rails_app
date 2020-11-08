class RootsController < ApplicationController
  def root
    @user = User.new
  end
end
