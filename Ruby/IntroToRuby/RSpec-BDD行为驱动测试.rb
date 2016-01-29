RSpec-BDD行为驱动测试.rb


1.0  安装

group :development, :test do
  gem 'rspec-rails', '~> 3.0'
end

%w[rspec-core rspec-expectations rspec-mocks rspec-rails rspec-support].each do |lib|
  gem lib, :git => "https://github.com/rspec/#{lib}.git", :branch => 'master'
end
 
bundle install 

rails g respec:install

bundle exec rspec


# 此命令的作用是为Rails程序安装RSpec框架，使RSpec取代Test::Unit而存在，
# 这条命令会建立’.rspec’文件、’spec’目录和’spec/spec_helper.rb’文件，他们分别的作用是：

   ‘.rspec’文件：存放运行rake spec任务时，RSpec需要加载的配置信息。

   ‘spec’目录：我们的RSpec测试用例的存放空间，针对mvc，我们可以建立models、views和controllers目录分别存放模型、视图和控制器各个层面的测试用例，每一个测试文件以_spec结尾。

   ‘spec/spec_helper.rb’文件：运行测试用例的RSpec配置文件。每一个以_spec结尾的文件都需要引入该文件，即在文件开头添加：require ‘spec_helper’代码。

   ’spec/rails_helper.rb‘


# require ‘spec_helper’：目的是加载’spec/spec_helper.rb’文件中的RSpec配置，运行时需要。
1.1 describe()方法：
      # 我们用describe()方法定义一个测试用例组，describe()方法的参数可以是我们要测试的对象(如例中的People)，
      # 可以是一个字符串，用来描述该组，describe方法后的字符串所描述的内容可以对应一个用户故事。

      # 注意describe()方法是可以嵌套的，两个describe()方法衔接起来可以更细化一个用户故事，
      # 如上边的里面的describe()方法内就表示：”People have enough money pay for house”。

1.2 it()方法：
      # 我们用it()方法定义一个具体的测试用例（在RSpec中，称一个测试用例为一个example）。其后的字符串为该方法
      # 的参数，用来描述一个具体的场景，it方法体就是我们对系统在该场景下的行为的定义。

      # It()方法和describe()方法衔接起来，可以完整的描述一个系统行为，以上边的最后的一个测试用例
      # 为：”People have enough money pay for house should travel ”。

1.3 context()方法：
      # Context()方法和describe()方法的作用一样，不同点在于describe倾向于描述我们的测试对象，
      # 而context()方法倾向于用字符串描述用户故事。

1.4 before()和after()：
      # 这两个方法很多测试框架都支持，需要说明的是这两个方法的参数，例子中为符号’:each’，表明对于每一个测试用例，
      # 先执行 before()方法中的代码，用例完成后执行after()方法中的代码，若参数为’:all’，则表示在所有的
      # 测试用例执行之前，先执行 before()方法中的代码，所有的用例完成后执行after()方法中的代码。

      # RSpec还提供around()方法，暂不懂其用法，之后的报告中补上。
1.5 帮助方法：
      # 所谓的帮助方法就是把多个测试用例中重复的操作抽出作为一个公用的方法，提高代码重用度。
      # 如例子中的work_hard()方法。

1.6 共享行为：
      # 系统的某一个行为是很多场景下都具有的，那么我们可以把它定义为一个共享行为，
#       我们通过share_examples_for()方法 定义共享行为，使用it_behaves_like()方法共享定义过的系统行为，
#       如例子中的share_examples_for “any people”， it_behaves_like “any people”。

# 1.7 pending()方法：
      # 我们确定系统拥有一个行为，但是还没有具体定义，这时我们可以将该行为使用pending()方法来设置该行为为待定义，
      # 其后的字符串参数将在生成的报告中显示。

      # pending()方法的另外一种用法就是，当一个测试用例失败时，我们可以利用pending方法设置其为一个
      # 待修复的bug，方法体内包含使用例失败的代码。例如最后一个测试用例的内容



2.0 TDD

describe User do
  it "should be in any roles assigned to it" do
    user = User.new
    user.assign_role("assigned role")
    user.should be_in_role("assigned role")
  end

  it "should NOT be in any roles not assigned to it" do
    user = User.new
    user.should_not be_in_role("unassigned role")
  end
end



class User
  def in_role?(role)
    role == @role
  end
  def assign_role(role)
    @role = role
  end
end
















#####################################################


describe Programmer do
	it "is lonely" do
		Programmer.lonely?.should be_true
	end	
end


#
describe Girl do
	it "has chance?" do
		Girl.new.chance?.should be_true
	end

	it "taken!" do
		girl = Girl.new
		girl.taken!
		girl.should_not be_chance
	end
end


#
class Girl
	def chance?
		true
	end
end


#  2 pending 测试大纲
descript xxxController do

descript 'GET #show' do
	it "assigns the requested xxx to @xxx"
	it "renders the :show template"
end

descript 'GET #new' do
	it "assigns a new xxx to @xxx"
	it "renders the :new template"
end



3 简单的测试
测试代码的结构

descript AA do
	it 'should do something' do
		something.should
	end
end


#
descript "Home page" do
	it "should have the content 'Sample App'" do
		visit '/static_pages/home'
		expect(page).to have_content('Sample App')
	end
end

# 运行bundle exec rspec spec/requests/static_pages_spec.rb, 运行失败!
# 因为在app/views/static_pages/home.html.erb文件中并没有"Sample App"关键字.在该文件中,
# 添加上"Sample App"测试就能通过.



4 let和let!的用法

# spec/helpers/let_spec.rb
descript "let" do
other_count = 0
invocation_order = []

let(:count) do
	invocation_order << :let!
	other_count += 1
end

it "calls the helper method in a before hook" do
	invocation_order << :example
	expect(invocation_order).to eq([:example])
	expect(other_count).to eq(0)
	other_count += 1
	expect(other_count).to eq(1)
end

it "calls the helper method in a before hook again" do
	invocation_order << :example
	expect(invocation_order).to eq([:example,:example])
	expect(other_count).to eq(1)
	other_count += 1
	expect(other_count).to eq(2)
end

end




descript "let test" do
	let(:count) { $count += 1 }
	# 可以使用 count
end

descript "no let test" do
	# 不能使用count
end


# 下面是let!的使用方法
# spec/helpers/let_bang_spec.rb

descript "let!" do
count = 0
invocation_order = []

let!(:count) do
	invocation_order << :let!
	count += 1
end

it "calls the helper method in a before hook" do
	invocation_order << :example
	expect(invocation_order).to eq([:let!, :example])
	expect(count).to eq(1)
end

it "calls the helper method in a before hook again" do
	invocation_order << :example
	expect(invocation_order).to eq([:let!, :example, :let!, :example])
	expect(count).to eq(2)
end
end


# 5 before用法
# http://stackoverflow.com/questions/5974360/rspec-difference-between-let-and-before-block
# http://stackoverflow.com/questions/5359558/when-to-use-rspec-let?lq=1
# let 和 before(:each)的区别, let不会自动初始化变量,而before(:each)会自动初始化变量.如果我其中的某一个测试用力不需要这些变量,依然需要初始化,如初始化变量需要很多时间,对这个测试的初始化就是浪费的时间和资源.

# before(:each)的用法
# spec/helpers/before_each_spec.rb

require "rspec/expectations"
class Thing
	def widgets
		@widgets ||= []
	end
end

describe Thing do
	before(:each) do
		@thing = Thing.new
	end
	describe "initialized in before(:each)" do
		it "has 0 widgets" do
			@thing.should have(0).widgets
		end
		it "can get accept new widgets" do
			@thing.widgets << Object.new
		end
		it "does not share state across example" do
			@thing.should_not have(1).widgets
		end
	end
end


# before(:all)用法
# spec/helpers/before_all_spec.rb

require "rspec/expectations"
class Thing
  def widgets
    @widgets ||= []
  end
end
describe Thing do
  before(:all) do
    @thing = Thing.new
  end
  describe "initialized in before(:all)" do
    it "has 0 widgets" do
      @thing.should have(0).widgets
    end
    it "can get accept new widgets" do
      @thing.widgets << Object.new
    end
    it "shares state across examples" do
      @thing.should have(1).widgets
    end
    it "should not have 0 widgets"  do
      @thing.should_not have(0).widgets
    end
  end
end



# 6 model 测试
# spec/models/widget_spec.rb
descript Widget do
	context "test fields" do
		before do
			@widget = create(:widget)
		end

		subject{ @widget }
		# response_to 用来判断属性有没有
		it { should response_to(:name) }
		it { should response_to(:email) }
		it { should response_to(:address) }
		it { should response_to(:lat) }
		it { should response_to(:lng) }
		it { should be_valid }

		# 简约的写法
		describe "when name is not present" do
			before { @widget.name = " " }
			it { should_not be_valid }
		end

		# 繁琐的写法
		describe "when name is not present" do
			before { @widget.name = " " }
			# 将 it 的单行的方式，改写成多行的方式
			it "should not be valid" do
				expect(@widget).not_to be_valid
			end
		end

		describe "when name is invalid" do
			before { @widget.name = nil }
			it { should have(1).errors_on(:name) }
		end

		describe "when name length > 50 " do
			before do
				@widget.name = "a"*50
			end
			it { should_not be_valid }
		end

		describe "when email is invalid" do
			before { @widget.email = nil }
			it do
				# Email can't be blank, Email is invalid
				should have(2).errors_on(:email)
			end
		end

		describe "when email is invalid" do
			it "should be invalid" do
				# 使用 each 循环，遍历非法的email
				addresses = %w[user@foo.com user_at_foo.org example.user@foo.
								foo@bar_baz.com foo@bar+baz.com]
				addresses.each do |addr|
					@widget.email = addr
					expect(@widget).not_to be_valid
				end
			end
		end

		 describe "when email is valid" do
      it "should be valid"  do
      # 使用each 循环,遍历可用的email
      addresses = %w[user@foo.COM A_US-ER@f.b.org
                    frst.lst@foo.jp a+b@baz.cn]
        addresses.each do |addr|
          @widget.email = addr
          expect(@widget).to be_valid
        end
      end
    end
   # ========== 上述验证邮箱的可该写成如下
   describe "when email" do
      context "is valid" do 
        it "should be valid"  do
          addresses = %w[user@foo.COM A_US-ER@f.b.org
                   frst.lst@foo.jp a+b@baz.cn]
          addresses.each do |addr|
            @widget.email = addr
            expect(@widget).to be_valid
         end
      end
    end

      context "is invalid" do
        it "should be invalid" do
          addresses = %w[user@foo,com user_at_foo.org example.user@foo.
                  foo@bar_baz.com foo@bar+baz.com]
          addresses.each  do |addr|
            @widget.email = addr
            expect(@widget).not_to  be_valid
          end
        end
    end
  end
end



  context "when initialized" do
    # 创建默认的共享变量
    subject(:widget) { Widget.new(:name => Faker::Name.name,
                                  :email => Faker::Internet.email) }


    it "should increment the Relationship count" do
      expect do
        Widget.create!(:name => "first comment", :email => Faker::Internet.email)
        Widget.create!(:name => "second comment", :email => Faker::Internet.email)
      end.to change(Widget, :count).by(2) # from(1).to(3)
      # https://www.relishapp.com/rspec/rspec-expectations/v/2-0/docs/matchers/expect-change
    end

    # 第一种写法
    it "is a new widget" do
      expect(widget).to be_a_new(Widget)
    end

    # 第二种写法
    it { should be_a_new(Widget) }

    it "is not a new string" do
      expect(widget).not_to be_a_new(String)
    end
  end

  context "when saved" do
    subject(:widget) { create(:widget) }

    it "is not a new widget" do
      expect(widget).not_to be_a_new(Widget)

    end
    it "is not a new string" do
      expect(widget).not_to be_a_new(String)
    end
  end
end





# 7 controller测试
# spec/controllers/widgets_controller_spec.rb

describe WidgetsController do
  # show ============
  describe "GET #show" do
   #• 和控制器动作交互的基本 DSL 句法:每个 HTTP 请求方法都对应于一个方法(本例中的方法
   #是 get) ,其后跟着动作的 Symbol 形式(:show) ,然后是传入的请求参数(id: contact) 。
   #• 控制器动作实例化的变量可以通过 assigns(:variable_name) 方法获取。
   #• 控制器动作的返回结果可以通过 response 获取。
    it "assigns the required 1 to @1" do
      widget = create(:widget)
      get :show, id: widget
      expect(assigns(:widget)).to eq widget
     # http://stackoverflow.com/questions/8616508/what-does-assigns
     # 
    end

    it "renders the :show template "  do
      widget = create(:widget)
      get :show, id: widget
      expect(response).to render_template :show
    end
  end

  # new ============
  describe "GET #new" do
    it "assigns a new Widget to @widget" do
      get :new
      expect(assigns(:widget)).to  be_a_new(Widget)
    end

    it "renders the :new template" do
      get :new
      expect(response).to render_template :new
    end
  end

  # edit ============
  describe "GET #edit" do
    it "assigns the request widget to @widget" do
      widget = create(:widget)
      get :edit, id: widget
      expect(assigns(:widget)).to eq widget
    end

    it "renders the :edit template" do
      widget = create(:widget)
      get :edit, id: widget
      expect(response).to render_template :edit
    end
  end

  # create ============
  describe "POST #create" do
    context "with invalid attributes" do
      # create动作, 在符合 REST 架构的程序中,这个动作可以响应 POST 请求。
      # create 动作和响应 GET 请求的动作最主要的不同点是,不能像 GET 请求那样只传入:id 参数,而
      # 要传入 params[:widget] 对应的值,这个值就是用户可能在表单中输入的内容。
      it "does not save the new widget in the database" do
        expect{
          post :create,
          widget: attributes_for(:invalid_widget)
        }.to change(Widget, :count).by(0)
      end

     # expect的另一种写法
     it "does save the new widget in the database again" do
       expect do
         post :create,
         widget: attributes_for(:widget)
       end.to  change(Widget, :count).by(1)
     end

      it "re-renders the :new template" do
        post :create,
          widget: attributes_for(:invalid_widget)
        expect(response).to render_template :new
      end
    end

    context  "with valid attributes" do
      it "does save the new widget in the database" do
        expect{
          post :create,
          widget: attributes_for(:widget)
        }.to change(Widget, :count).by(1)
      end
      it "re-renders the assigns[:widget] template" do
        post :create,
          widget: attributes_for(:widget)
        expect(response).to redirect_to widget_path(assigns[:widget])
      end
    end

    # update ============
    describe "PATH #update" do
      before :each do
        @widget = create(:widget, name: 'lisi', email: 'lisi@126.com')
      end
      context "valid attribute" do
        # 先测试请求
        it "located the request @widget " do
          patch :update, id: @widget, widget: attributes_for(:widget)
          expect(assigns(:widget)).to  eq(@widget)
        end

        # 其次测试上传的数据,是否发生了变化
        it "changes @widget`s attributes" do
          patch :update, id: @widget,
            widget: attributes_for(:widget, name: "lol", email: "lol@126.com")
          @widget.reload
          expect(@widget.name).to eq("lol")
          expect(@widget.email).to eq("lol@126.com")
        end

        # 最后测试,返回结果
        it "redirect to the updated widget" do
          patch :update, id: @widget, widget: attributes_for(:widget)
          expect(response).to redirect_to @widget
        end
      end

      context "with invalid attributes" do
        it "does not change the contact`s attribues" do
          patch :update, id: @widget,
            widget: attributes_for(:widget, name: nil, email: "nil@126.com")
          @widget.reload
          expect(@widget.name).to eq("lisi")
          expect(@widget.email).not_to eq("nil@126.com")
        end

        it "re-renders the edit template" do
          patch :update, id: @widget,
            widget: attributes_for(:invalid_widget)
          expect(response).to render_template :edit
        end
      end
    end

    # delete ============
    describe "DELETE destroy" do
      before :each do
        @widget = create(:widget)
      end

      it "delete the widget" do
        expect{
          delete :destroy, id: @widget
        }.to change(Widget, :count).by(-1)
      end

      it "redirect to widget#index" do
        delete :destroy, id: @widget
        expect(response).to redirect_to widgets_path
      end
    end
  end


  describe "GET index" do
    it "has a 200 status code" do
      get :index
      expect(response.status).to eq(200)
    end

    it "renders the index template"  do
      get :index
      expect(response).to render_template("index")
      expect(response.body).to eq ""
    end

    it "renders the widgets/index template"  do
      get :index
      expect(response).to  render_template("widgets/index")
      expect(response.body).to eq ""
    end

    it "not renders the 'new' template"  do
      get :index
      expect(response).not_to  render_template("new")
    end
  end
end





# 8 route测试
# 首先运行
# rails generate controller admin/Accounts index
# 用这个来创建一个namespace为admin的account_controller.rb
# spec/routing/admin_routing_spec.rb



require "spec_helper"
describe "routes for Widgets" do
  it "routes /admin/accounts to the admin/accounts controller" do
    expect(get("/admin/accounts")).
      to route_to("admin/accounts#index")
  end
  it "routes /admin/accounts to the admin/accounts controller again" do
    expect(get("/admin/accounts")).
      to route_to(:controller => "admin/accounts", :action => "index")
  end
end



# spec/routing/widgets_routing_spec.rb

 describe "routes for Widgets" do
      it "route to widgets" do
        expect(:get => "/widgets").to be_routable
      end
      it "does not route to widgets/foo/bar" do
        expect(:get => "/widgets/foo/bar").not_to be_routable
      end
 end





# spec/routing/widgets_routing_spec.rb

it "routes a named route" do
      expect(:get => new_widget_path).
      to route_to(:controller => "widgets", :action => "new")
end






# 9 factory_girl 的使用
# 1.修改Gemfile配置




group :development, :test do
    gem 'factory_girl_rails', '4.2.1'
    gem 'ffaker', '~> 1.21.0'
    gem 'rspec-rails', '2.13.1'
 end

 
# 并且使用 gem 'jbuilder', '1.5.0'
# 配置完成之后,执行bundle install





# 2.在 app/views/widgets/index.json.jbuilder 文件中

json.widgets @widgets do |widget|
    json.id         widget.id
    json.name       widget.name
 end


# 在 app/views/widgets/show.json.jbuilder文件中

json.widget do
    json.id        @widget.id
    json.name      @widget.name
end





# 3.在 spec/factories/widget.rb文件中

FactoryGirl.define do
  factory :widget do
    name { Faker::Name.name }
  end
end




# 4.在 spec/requests/widgets_spec.rb 文件中

describe "Widgets" do
  describe "GET /widgets" do
    let(:widgets)  { FactoryGirl.create_list(:widget, 10) }
    let(:url)      { "/widgets.json" }
    before do
      WidgetsController.stub(:index).and_return(widgets)
      get(url)
    end
    describe "return JSON" do
      it { MultiJson.decode(response.body)["widgets"].should   have_at_most(10).items }
      it "should be correct" do
        expect(MultiJson.decode(response.body)["widgets"].first["id"]).to      eq(widgets.first.id)
        expect(MultiJson.decode(response.body)["widgets"].first["name"]).to    eq(widgets.first.name)
      end
    end
  end
  describe "specify widget" do
    let(:widget) { FactoryGirl.create(:widget) }
    let(:url) {"/widgets/#{widget.id}.json"}
    before { get(url) }
    it "should be correct" do
      expect(MultiJson.decode(response.body)["widget"]).to         include("id")
      expect(MultiJson.decode(response.body)["widget"]).to         include("name")
    end
    it "should render the deal in JSON format" do
      expect(MultiJson.decode(response.body)["widget"]["id"]).to     eq(widget.id)
      expect(MultiJson.decode(response.body)["widget"]["name"]).to   eq(widget.name)
    end
  end
end




# 5.在spec/spec_helper.rb文件中配置如下
# 每次在测试中,都必须使用FactoryGirl.create(xxx) FactoryGirl.create_list(xxx)
# 在Factory Girl 3.0 开始, 只要做一个设置,Rails就会变得简洁,美好
# 可以加在spec_helper.rb文件Rspec.configure块中的任何地方

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
end
# 然后在测试的代码中,就能使用比较简洁的语法create(xxx) create_list(xxx)
# 还能使用attributes_for(xxx)等




# 6.Factory生成文件存放的位置

# 通过Factory Girl生成器生成的文件都会放在 spec/factories文件夹
# 中,文件的名字会试用对应模型名字的复数形式(所以Contact
# 模型的预构件文件是spec/factories/contacts.rb)



# 10 ffaker的使用
# faker在用来创建比较真实的假数据.
# ffaker是faker的重写,速度比faker块一些.

# 修改Gemfile配置

require 'ffaker'
# 之后执行bundle installl给应用程序安装ffaker gem包.
# 下面是常用的示例.





11 mock的使用
# 为什么要使用mock?
# 系统总是很复杂,不同的模块功能耦合在一起,A调用B, B调用C甚至A.但是我们在测试A
# 的某个方法的时候,应该把注意力集中在A这个方法功能上,而没有必要把这个方法中需要的其他方法
# (A的或者B,C)都测试一遍,虽然这些其他方法的正确是A的这个方法正确的保证!B,C的方法应该在各自的测试中独立进行.

# 如一个方法，读取rss，然后解析，生成view

url = "http://forum.rccchina.com/api/posts/meetings.xml"
require 'net/http'
require 'uri'
xml = Net::HTTP.get_print URI.parse(url)
# 这段代码核心在后面解析生成view的功能，测试的时候，完全不需要真的去从forum.rccchina.com上面获取xml的数据，覆盖Net::HTTP.get_print方法即可。

xml = "<meetings>...</meetings>"
Net::HTTP.stub!(:get_print).and_return(xml)
# 下面是一个mock的例子

`spec/factories/widget.rb`

FactoryGirl.define do
  factory :widget do
    name  { Faker::Name.name }
    email { Faker::Internet.email }
    tel   { 123456 }

    factory :invalid_widget do
      name  nil
      email nil
    end
  end
end

`spec/first/mock_spec.rb`

require 'spec_helper'

class Hello
  def say
    "hello world"
  end
end

describe Hello do
  context "factory girl spec " do
    let(:widget) { FactoryGirl.create(:widget) }

    subject { widget }

    it { should respond_to(:name) }
    it { should respond_to(:email) }
    it { should respond_to(:tel) }
  end

  context "mock saying hello " do
    before(:each) do
      @hello = mock(Hello)
      @hello.stub!(:say).and_return("hello world")
      @hello.stub!(:sleep).and_return("sleep")
    end

    subject { @hello }

    it { should respond_to(:say) }
    it { should respond_to(:sleep) }
  end


  context "saying hello" do
    before(:each) do
      @hello = mock(Hello)
      @hello.stub!(:say).and_return("hello world")
      @hello.stub!(:sleep).and_return("sleep")
    end


    it "#sleep should return sleep" do
      @hello.should_receive(:sleep).and_return("sleep")
      answer = @hello.sleep
      answer.should match("sleep")
    end


    it "#say should return hello world" do
      @hello.should_receive(:say).and_return("hello world")
      answer = @hello.say
      answer.should match("hello world")
    end

    it "#say should not return zzz"  do
      @hello.should_receive(:say).and_return("hello world")
      answer = @hello.say
      answer.should_not match("zzz")
    end
  end
end
# 从上述的例子中可以看出,FactoryGirl 是根据模型来模拟真实的字段属性.
# 而mock可以模拟出模型中不存在的字段属性.mock可以用来虚拟比较复杂的属性

12 shared_examples 的使用

# shared_examples 解决在测试用需要复用的代码

# 包含shared groups 的文件必须在使用前首先被加载,

# 一种方法是把所有包含shared examples 的文件放到 spec/support目录下
# 并且在spec/spec_helper.rb中导入他们
Dir["./spec/support/**/*.rb"].each { |f| require f }

spec/helpers/shared_examples_spec.rb

shared_examples 'a collection' do
  let(:collection) { described_class.new([7,2,4]) }

  context 'initialized with 3 items' do
    it "says it has three items" do
      expect(collection.size).to    eq 3
    end
  end

  describe "#include?" do
    context 'with an item that is in the collection' do
      it "returns true" do
        expect(collection).to      include(7)
      end
    end

    context "with an item that is not in the collection" do
      it "returns false" do
        expect(collection).not_to  include(9)
      end
    end
  end
end


describe Array do
  it_behaves_like 'a collection'
end

describe Set do
  it_behaves_like 'a collection'
end
spec/helpers/shared_examples_block_spec.rb

shared_examples 'a collection' do

  context 'initialized with 3 items' do
    it "says it has three items" do
      expect(collection.size).to    eq 3
    end
  end

  describe "#include?" do
    context 'with an item that is in the collection' do
      it "returns true" do
        expect(collection).to      include(7)
      end
    end

    context "with an item that is not in the collection" do
      it "returns false" do
        expect(collection).not_to  include(9)
      end
    end
  end
end


describe Array do
  it_behaves_like 'a collection' do
    let(:collection) { Array.new([7,2,4]) }
  end
end

describe Set do
  it_behaves_like 'a collection' do
    let(:collection) { Set.new([7,2,4]) }
  end
end
spec/helpers/shared_examples_block_params_spec.rb

require 'set'

shared_examples "a measurable object" do |measurement, measurement_methods|
  measurement_methods.each do |measurement_method|
    it "should return #{measurement} from ##{measurement_method}" do
      subject.send(measurement_method).should == measurement
    end
  end
end

describe Array, "with 3 items" do
  subject { [1,2,3] }
  it_should_behave_like "a measurable object", 3, [:size, :length]
end

describe String , "of 6 characters" do
  subject { "FooBar" }
  it_should_behave_like "a measurable object", 6, [:size, :length]
end





























































































































































































































































































