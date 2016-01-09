class Api::V1::MicropostsController < ApplicationController
  def index
  	user = User.find(params[:user_id])
  	@microposts = paginate(user.microposts)
  end



end
