require 'test_helper'

class UsersEditTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:michael)
  end



  test "unsuccessful edit" do
  	log_in_as(@user)
    get edit_user_path(@user)
    patch user_path(@user), user: { name:  '',
                                    email: 'foo@invalid',
                                    password:              'foo',
                                    password_confirmation: 'bar' }
    assert_template 'users/edit'
  end


  test "successful edit" do
  	get edit_user_path(@user)
  	log_in_as(@user)
  	assert_redirected_to edit_user_path(@user)
  	name = "Foo Bar"
  	email = "foo@bar.com"
  	patch user_path(@user),user: {
  		name: name,
  		email: email,
  		password: "",
  		password_confirmation: ""
  	}
  	assert_not flash.empty?
  	assert_redirected_to @user
  	@user.reload
  	assert_equal @user.name, name
  	assert_equal @user.email, email
  end


  # 重定向到存储的地址，或者默认地址
  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

  # 存储以后需要获取的地址
  def store_location
    session[:forwarding_url] = request.url if request.get?
  end











end