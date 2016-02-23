



1.0

gem "mongoid", "2.0.0.rc.7"
gem "bson_ext", "~> 1.2.2"
gem 'paperclip'
gem 'carrierwave'
gem 'mini_magick'
gem "mongoid-paperclip", :require => "mongoid_paperclip"
gem 'mongo-rails-instrumentation'
gem 'authlogic'


2.0  
current_user_session



session_user是指登陆时的用户，这个是无法改变的，除非重新登陆。
current_user是指当前用户，在登陆时和session_user一致，可以修改。


3.0   db:create

db/migrate/20100824055046_create_users.rb
db/migrate/20100824055225_create_sections.rb
db/migrate/20100824055320_create_nodes.rb
db/migrate/20100824055700_create_topics.rb
db/migrate/20100824055819_create_replies.rb
db/migrate/20100824055944_create_counters.rb

db/migrate/20100825092035_add_authlogic_fields_to_users.rb
db/migrate/20100826153218_create_photos.rb
db/migrate/20100827081204_create_notes.rb
db/migrate/20110211041644_create_authorizations.rb



4.0  

devise + views



5.0 

Add mongoid_auto_increment_id

6.0 

db:seed

7.0  

gem 'redis-store'


8.0  

SoftDelete for Topic/Reply;

# app/controllers/cpanel/topics_controller.rb
def index
	@topics = Topic.unscoped.desc(:id).paginate :page => params[:page], :per_page => 30


def show
	# @topic = Topic.find(params[:id])
	@topic = Topic.unscoped.find(params[:id])


def edit
	@topic = Topic.unscoped.find(params[:id])


def update
	@topic = Topic.unscoped.find(params[:id])


def destroy
	@topic = Topic.unscoped.find(params[:id])

#

# app/models/mongoid/soft_delete.rb
# coding: utf-8
# 软删除
module Mongoid
  module SoftDelete      
    extend ActiveSupport::Concern
  
    def self.included(base)
      base.instance_eval do
        field :deleted_at, :type => DateTime
      
        default_scope where(:deleted_at => nil)
        alias_method :destroy!, :destroy

        include InstanceMethods
      end
    end
  
    module InstanceMethods
      def destroy
        if persisted?
          self.update_attributes(:deleted_at => Time.now.utc)
        end

        @destroyed = true
        freeze
      end
    end
  end
end 




9.0   
I18n fix;

gem "rmmseg-cpp-huacnlee", "0.2.8"
gem 'redis-search', '0.5.2'
gem "rails-i18n","0.1.8"



10.0   Timeago translate;
# add redis-objects;
# Topic add hits;
# Redis config added.

gem "redis-objects", "0.5.2"


public/javascripts/jquery.timeago.js


11   Omniauth login fixed.
gem 'omniauth', '0.3.0'




12
Fix asset pipeline in production environment.
Add hot key for Submit Reply.
# 一个jQuery热键插件:js-hotkeys




13  

Add Posts feature


Homeland ---> RubyChina



14

gem "cells", "3.6.7"


15
Add wiki Control Panel feature.



16
Wiki Markdown improve.
Change Markdown to Rdiscount to use C impelement version Markdown

gem "rdiscount","1.6.8"



17

Add Capistrano deploy script.








































































































































































































































































