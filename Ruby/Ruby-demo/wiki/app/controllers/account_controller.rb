class AccountController < ApplicationController
  def create
  	@user = User.new(params[:user])
  	if verify_rucaptcha?(@user) && @user.save
  		redirect_to root_path, notice: 'Sign up successed.'
  	else
  		render 'account/new'	
  	end
  end
end
