RSpec 测试.rb


1.0  
class RecipesController < ApplicationController

	def index
		@recipes ||= @user.recipes.order(:title) if @user
		@recipes ||= Recipe.order(:title)
	end

end

# rspec
require 'spec_helper'

describe RecipesController do
	let(:recipes_controller) { RecipesController.new }

	describe '#index' do
		it 'orders recipes by title' do
			recipes_controller.stub(:set_user)
			Recipe.should_receive(:order).with(:title)
			recipes_controller.index
		end
	end
end



2.0 
class MenuItemsController < ApplicationController

	def create
		@menu_item = MenuItem.create(params[:menu_item])
		if !@menu_item.new_record?
			flash[:notice] = 'MenuItem was successfully created.'
			redirect_to menu_items_url
		else
			render :action => :new
		end
	end

	def new
		@menu_item = MenuItem.new
	end
end

#  rspec

require File.dirname(__FILE__) + '/../spec_helper'

describe MenuItemsController, "creating a new menu item do"
	integrate_views
	fixtures :menu_items

	it "should redirect to index with a notice on successful save" do
		MenuItem.any_instance.stubs(:valid?).returns(true)
		post 'create'
		assigns[:menu_item].should_not be_new_record
		flash[:notice].should_not be_nil
		response.should redirect_to(menu_items_path)
	end

	it "should re-render new template on failed save" do
		MenuItem.any_instance.stubs(:valid?).returns(false)
		post 'create'
		assigns[:menu_item].should be_new_record
		flash[:notice].should be_nil
		response.should render_template('new')
	end

	it "should pass params to menu item" do
		post 'create', :menu_item => { :name => 'Plain' }
		assigns[:menu_item].name.should == 'Plain'
	end

end



3.0  

FactoryGirl.define do
	factory :post do
		title "My New Title"
		body "My New Body"
	end
end

# rsepc

require 'rails_helper'
RSpec.feature "add posts" do
	
	scenario " allow a user to add a post " do
		post = create(:post, title: "My other title")
		visit post_path(post)

		expect(page).to have_content("My New Title")
		expect(page).to have_content("My New Body")
	end
end


4.0


gem ''
install

rails g integration_test password_reset

# password_resets_spec.rb
require 'spec_helper'

describe "PasswordResets" do
	it "email user when requesting password reset" do
		user = Factory(:user)
		visit login_path
		click_link "password"
		fill_in "Email", :with => user.email
		click_button "Reset Password"

		current_path.should eq(root_path)
		page.should have_content("Email sent")
		last_email.to.should include(user.email)
	end
end





rails g controller password_resets new --no-test-frameword

#  mailer_macros.rb
module MailerMacros
	def last_email
		ActionMailer::Base.deliveries.last
	end

	def reset_email
		ActionMailer::Base.deliveries = []
	end
end

# spec_helper.rb

config.include(MailerMacros)
config.before(:each) { reset_emails }


rails g mailer user_mailer password_reset


# user_mailer.rb
class UserMail < ActionMailer::Base
	default from: "from@example.com"

	def password_reset(user)
		@user = user
		mail :to => user.email, :subject => "Password Reset"
	end
end

# password_resets_controller.rb
class PasswordResetsController < ApplicationController
	def new
	end

	def create
		user = User.find_by_email(params[:email])
		user.send_password_reset
		# UserMailer.password_resent(user).deliver
		redirect_to root_url, :notice => "Emial sent with password reset instruction."
	end
end

# user.rb
class User < ActiveRecord::Base
	attr_accessible :email, :password, :password_confirmation
	has_secure_password
	validates_presence_of :password, :on => :create

	def send_password_reset
		UserMailer.password_reset(self).deliver
	end
end

# models/user_spec.rb



5.0   【特快車】RSpec技術分享系列
require 'rspec'

# eg 1
describe "Math" do
	it  'do basic math' do
		expect(1+1).to eq(2)
		expect(1+1).to eq(3)
	end
end

# eg 2
class Divider
	def salary_divide(salary)
		case salary
		when 0..300000
			"年收入30万以下"
		when 30000..60000
			"年收入30-60万"
		when 60000..90000
			"年收入60-90万"
		else
			"年收入90万以上"
		end
	end
end

describe "Divider" do
	it 'successfully divides people based on salary' do
		expect(Divider.new.salary_divide(25000)).to eq("年收入30万以下")
		expect(Divider.new.salary_divide(29000)).to eq("年收入30-60万")
		expect(Divider.new.salary_divide(35000)).to eq("年收入30-60万")
		expect(Divider.new.salary_divide(65000)).to eq("年收入年收入60-90万")
		expect(Divider.new.salary_divide(96000)).to eq("年收入90万以上")
	end
end



5.1   controller測試

# spec/controller/posts_spec.rb
require 'rails_helper'

RSpec.describe PostsController, type: :controller do
	before(:all) do
		@post_1 = Post.create(title: "title_1", content: "content_1")
		@post_2 = Post.create(title: "title_2", content: "content_2")
	end


	it "#index" do
		get :index
		expect(response).to have_http_status(200)
		expect(response).to render_template(:index)
	end

	# # 泡一下测试，命令行
	# rspec
	# # 或者
	# rspec spec/controllers

	it "#new" do
		get :new
		expect(response).to have_http_status(200)
		expect(response).to render_template(:new)
	end
	
	it "#edit" do
		get :edit, id: @post_1[:id]
		expect(response).to have_http_status(200)
		expect(response).to render_template(:edit)
	end

	#命令行: rspec spec/controllers

	describe "#create" do
		before(:all) do
			@params_params = {title: "title", content: "content"}
		end

		it "create record" do			
			expect{ post :create, post: @post_params }.to change{Post.all.size}.by(1)
		end

		it "redirect on success" do
			post :create, post: @post_params
			expect(response).not_to have_http_status(302)
			expect(response).to have_http_status(302)
			expect(response).to redirect_to(post_path(Post.last))
		end

		it "render :new on fail" do
			allow_any_instance_of(Post).to receive(:save).and_return(false)
			post :create, post: @post_params
			expect(response).not_to have_http_status(302)
			expect(response).to render_template(:new)
		end
	end

	describe "#update" do
		before(:all) do
			@params_params = {title: "title_3", content: "content"}
		end

		it "changes record" do			
			post :update, post: @post_params, id: @post_2[:id]
			expect(Post.find(@post_2[:id])[:title]).to eq("title_3")

		end

		it "redirect on success" do
			post :update, post: @post_params, id: @post_2[:id]
			expect(response).not_to have_http_status(302)
			expect(response).to have_http_status(302)
			expect(response).to redirect_to(post_path(Post.find(@post_2[:id])))
		end

		it "render :edit on fail" do
			allow_any_instance_of(Post).to receive(:update).and_return(false)
			post :update, post: @post_params, id: @post_2[:id]
			expect(response).not_to have_http_status(302)
			expect(response).to render_template(:edit)
		end
	end



	describe "#destroy" do
		before(:each) do
			@post_3 = @post_2 || Post.create(title: "title_3", content: "content_3")
		end

		it "destroy record" do			
			expect{ post :destroy, id: @post_3[:id] }.to change{Post.all.count}.by(-1)
		end

		it "redirect_to index after destroy" do
			delete :destroy, id: @post_3[:id]
			expect(response).to have_http_status(302)
			expect(response).to redirect_to(posts_path)
		end
	end
end



5.2  
检查型别、方法
target.should be_a_kind_of(Array)
# target.class.should === Array
target.should be_an_instance_of(Array)
# target.class.should === Array

target.should respond_to(:foo)
# target.repond_to?(:foo).should === true

检查Array、Hash
target.should have_key(:foo)
# target[:foo].should_not == nil
target.should include(4)
# taregt.include?(4).should == true
target.should have(3).items
# target.items.length == 3



任何 be_开头
target.should be_empty
# target.empty?.should == true
target.should be_blank
# target.blank?.should == true
target.should be_admin
# target.admin?.should == true


















