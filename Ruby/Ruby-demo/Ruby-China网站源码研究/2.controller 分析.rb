2. controller 分析
2.0 官方定义
http://guides.ruby-china.org/action_controller_overview.html
控制器的作用
Action Controller 是 MVC 中的 C（控制器）。路由决定使用哪个控制器处理请求后，控制器负责解析请求，生成对应的请求。Action Controller 会代为处理大多数底层工作，使用易懂的约定，让整个过程清晰明了。
在大多数按照 REST 规范开发的程序中，控制器会接收请求（开发者不可见），从模型中获取数据，或把数据写入模型，再通过视图生成 HTML。如果控制器需要做其他操作，也没问题，以上只不过是控制器的主要作用。
因此，控制器可以视作模型和视图的中间人，让模型中的数据可以在视图中使用，把数据显示给用户，再把用户提交的数据保存或更新到模型中。


2.0.1 先移步到 models 分析

2.1 AccountController
# Devise User Controller
class AccountController < Devise::RegistrationsController
end

2.2 ApplicationController

protect_form_forgery
helper_method
before_action do ~ end

before_action :set_active_menu
def set_active_menu ~ end
before_action :set_locale
def set_locale ~ end

def render_404 ~ end
def render_403 ~ end
def render_optional_error_file(status_code) ~ end
rescue_form CanCan::AccessDenied do |_exception|	~ end
def set_seo_meta(~) ~ end
def store_location ~ end
def redirect_back_or_default(default) ~ end
def redirect_referrer_or_default(default) ~ end
def require_user ~ end
def unread_notify_count ~ end
def fresh_when(opts = {}) ~ end
  private
    def user_locale ~ end
    def http_head_locale ~ end

2.3 CommentsController

before_action :require_user
def create ~ end
def comment_params ~ end

2.4 HomeController

def index ~ end
def api ~ end
def twitter ~ end
def error_404 ~ end
def markdown ~ end


2.5 JobsController

helper_method :feed_node_topics_url

def feed_node_topics_url  end
def index ~ end

2.6 LikesController

before_action :require_user
before_action :find_likeable

def create ~ end
def destroy ~ end
private
def find_likeable ~~ end


2.7 NodesController

before_action :require_user, only: [:block, :unblock]

def index ~ end
def block ~ end
def unblock ~ end


2.8 NotesController
before_action :require_user, except: [:show]
load_and_authorize_resource

def index ~ end
def show ~ end
def new ~ end
def edit ~ end
def create ~ end
def update ~ end
def preview ~ end
def destroy ~ end
private
def note_params ~ end


2.9 NotificationsController

before_action :require_user
respond_to :html, :js, :only: [:destroy, :mark_all_as_read]

def index ~ end
def destroy ~ end
def clear ~ end
def unread ~ end


2.10 PagesController

authorize_resource :page

def index ~ end
def recent ~ end
def show ~ end
def comments ~ end
def new ~ end
def edit ~ end
def create ~ end
def update ~ end
def preview ~ end
protected
def page_params ~ end


2.11 PasswordsController
def create ~ end

2.12 PhotosController

load_and_authorize_resource

def create ~ end


2.13 RepliesController

load_and_authorize_resource
before_action :find_topic

def create ~ end
def index ~ end
def show ~ end
def edit ~ end
def update ~ end
def destroy ~ end
protected
def find_topic ~ end
def reply_params ~ end


2.14 SearchController
# Elasticsearch 
def index ~ end


2.15 SessionsController
# class SessionsController < Devise::SessionsController
prepend_before_filter :valify_captcha!, only: [:create]
skip_before_action :set_locale, only: [:create]

def new ~ end
def create ~~ end
def valify_captcha! ~ end
private 
def cache_referrer ~ end


2.16 SitesController

load_and_authorize_resource

def index ~ end
def new ~ end
def create ~ end
private
def site_params ~ end


2.17 TopicsController

load_and_authorize_resource only: [:new, :edit, :create, :update, :destroy,
								   :favorite, :unfavorite, :follow, :unfollow, :suggest, :unsuggest, :ban]

def index ~~~ end						
def feed ~ end
def node ~ end
def node_feed ~ end
%w(no_reply popular).each do |name|
	define_method(name) do ~ end
end
def recent ~ end
def excellent ~ end
def show ~~~ end
def check_current_user_liked_replies ~ end
def check_current_user_status_for_topic ~~~ end
def set_special_node_active_menu ~ end
def new ~ end
def edit ~ end
def create ~ end
def preview ~ end
def update ~~ end
def destroy ~ end
def favorite ~ end
def unfavorite ~ end
def follow ~ end
def unfollow ~ end
def suggest ~ end
def unsuggest ~ end
def ban ~ end
private 
def topic_params ~ end


2.18 UsersController
require 'will_paginate/array'
# class UsersController < ApplicationController
before_action :require_user, only: [:block, :unblock, :auth_unbind, :follow, :unfollow]
before_action :find_user, only: [:show, :topics, :replies, :favorites, :notes,
                                   :block, :unblock, :blocked,
                                   :follow, :unfollow, :followers, :following]

def index ~ end
def show ~ end
def topics ~ end
def replies ~ end
def favorites ~ end
def notes ~ end
def auth_unbind ~ end
def update_private_token ~ end
def city ~ end
def block ~ end
def unblock ~ end
def blocked ~ end
def follow ~ end
def unfollow ~ end
def followers ~ end
def following ~ end
protected
def find_user ~~ end

































