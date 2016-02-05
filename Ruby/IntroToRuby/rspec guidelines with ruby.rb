rspec guidelines with ruby.rb


1.0 How to describe your methods

describe '.authenticate' do
describe '#admin?' do

2.0 Use contexts

context 'when logged in' do
	it { is_expected.to respond_with 200 }
end
context 'when logged out' do
	it { is_expected.to respond_with 401 }
end

3.0 Keep your description short

context 'when not valid' do
	it { is_expected.to respond_with 422 }
end

4.0 Single expectation test

# GOOD (ISOLATED)
it { is_expected.to respond_with_content_type(:json) }
it { is_expected.to assign_to(:resource) }
# GOOD (NOT ISOLATED)
it 'creates a resource' do
	expect(response).to respond_with_content_type(:json)
	expect(response).to assign_to(:resource)
end

5.0 Test all possible cases

# DESTROY ACTION
before_filter :find_owned_resources
before_filter :find_resource

def destroy
	render 'show'
	@consumption.destroy
end

# GOOD
describe '#destroy' do
	context 'when resource is found' do
		it 'responds with 200'
		it 'shows the resource'
	end

	context 'when resource is not found' do
		it 'responds with 404'
	end

	context 'when resource is not owned' do
		it 'responds with 404'
	end
end


6.0 Expect vs Should syntax

it 'creates a resource' do
	expect(response).to respond_with_content_type(:json)
end

#

# spec_helper.rb
RSpec.configure do |config|
	#...
	config.expect_with :rspec do |c|
		c.syntax = :expect
	end
end

#
context 'when not valid' do
	it { is_expected.to respond_with 422 }
end

7.0  Use subject

subject { assigns('message') }
it { is_expected.to match / it was born in Billville/ }

subject { Hero.first }
it "carries a sword" do
	expect(hero.equipment).to include "sword"
end

8.0 Use let and let!

describe '#type_id' do
	let(:resource) { FactoryGirl.create :devise }
	let(:type) { Type.find resource.type_id }

	it 'sets the type_id field' do
		expect(resource.type_id).to equal(type.id)
	end
end

#

context 'when updates a not existing property value' do
	let(:properties) { { id: Settings.resource_id, value: 'on' } }

	def update
		resource.properties = properties
	end

	it 'raises a not found error' do
		expect { update }.to raise_error Mongoid::Errors::DocumentNotFound
	end
end


#

#this
let(:foo) { Foo.new }

#is very nearly equivalent to this:
def foo
	@foo ||= Foo.new
end


9.0  Mock or not to mock

# simulate a not found resource
context "when not found" do
	before { allow(Resource).to receive(:where).with(created_from: params[:id]).and_return(false) }
	it { is_expected.to respond_with 404 }
end

10.0 Create only the data you need

describe "User" do
	describe ".top" do
		before { FactoryGirl.create_list(:user, 3) }
		it { expect(User.top(2).to have(2).item) }
	end
end


11.0 Use factories and not fixtures

user = FactoryGirl.create :user


12.0 Easy to read matcher

expect { model.save! }.to raise_error Mongoid::Errors::DocumentNotFound


13  Shared Examples

describe 'GET /devices' do
	let!(:resource) { FactoryGirl.create :device, created_from: user.id }
	let(:url) { '/devices' }

	context 'when shows all resources' do
		let!(:not_owned) { FactoryGirl.create factory }

		it 'shows all owned resource' do
			page.driver.get url
			expect(page.status_code).to be(200)
			contains_owned_resource resource
			does_not_contain_resource not_owned
		end
	end

	describe '?start=:uri' do
		it 'shows the next page' do
			page.driver.get uri, start: resource.uri
			expect(page.status_code).to be(200)
			contains_resource resources.first
			expect(page).to_not have_content resource.id.to_s
		end
	end
end


#

describe 'GET /devices' do
	let!(:resource) { FactoryGirl.create :device, created_from: user.id }
	let(:uri) { '/devices' }

	it_behaves_like 'a listable resource'
  	it_behaves_like 'a paginable resource'
  	it_behaves_like 'a searchable resource'
  	it_behaves_like 'a filterable list'
end



14 Test what you see

it 'does not change timings' do
	expect(consumption.occur_at).to equal(valid.occur_at)
end



15 Automatic tests with guard

bundle exec guard

#

16 Faster tests (preloading Rails)



17 Stubbing HTTP requests


context "with unauthorized access" do
	let(:uri) { 'http://api.lelylan.com/types' }
	before { stub_request(:get, uri).to_return(status: 401, body: fixture('401.json')) }
	it "gets a not authorized notification" do
		page.driver.get uri
		expect(page).to have_content 'Access denied'
	end
end


18  Useful formatter
# Gemfile
group :development, :test do
	gem 'fuubar'



















































































































