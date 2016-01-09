class Wrkrecs_Controller < ApplicationController
  authorize_resource   #加入这行
  def index
  	@post = Wrkrec.all
  end

  def show
  	...
  end

end