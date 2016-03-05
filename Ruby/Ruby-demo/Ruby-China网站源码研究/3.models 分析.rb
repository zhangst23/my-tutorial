3. models 分析


3.1 concerns/++
# Concerns（关注点）是一种组织代码结构的方式，用来帮助开发者将复杂的逻辑和重复代码梳理清楚，把 重复model代码抽离出来。
# 代码过多加 module, 职责过多加 scope
3.1.1 base_model 	基础model
module Mentionable
	extend ActiveSupport::Concern
	included do ~	end
	def push(hash) ~ end
	def pull(hash) ~ end
3.1.2 likeable 	喜欢功能
	extend ActiveSupport::Concern
	included do  end
	def like_by_user?(user) ~ end
3.1.3 markdown_body  文本编辑
    extend ActiveSupport::Concern
    include ActionView::Helpers::SanitizeHelper
    include ApplicationHelper
    included do ~	end
    private
	def markdown_body ~ end
3.1.4 mentionable		提及/消息通知
	extend ActiveSupport::Concern
	included do ~	end
	def delete_notification_mentions ~ end
	def mentioned_users ~ end
	def mentioned_user_logins ~ end
	def extract_mentioned_users ~ end
	def no_mention_users ~ end
	def send_mention_notification ~ end
soft_delete  软删除
	extend ActiveSupport::Concern
	included do ~	end
	def destroy ~ end
	def deleted? ~ end


3.2 	notification/++	消息通知系统

3.2.1 base 	基础通知模块
module Notification
  class Base < ApplicationRecord
    include BaseModel
    self.table_name = 'notifications'
    belongs_to :user
    scope :unread, -> { where(read: false) }
    after_create :realtime_push_to_client
    after_update :realtime_push_to_client
	def realtime_push_to_client ~ end
	def self.realtime_push_to_client(user) ~ end
	def content_path ~ end
	def actor ~ end
	def anchor ~ end

3.2.2 follow		关注消息 推送
module Notification
  class Follow < Base
    belongs_to :follower, class_name: 'User'
	def self.notify(opts = {}) ~ end
	def actor ~ end
	def notify_hash ~ end
	def content_path ~ end
3.2.3 mention 	提到你	消息推送
module Notification
  class Mention < Base
    belongs_to :mentionable, polymorphic: true
    delegate :body, to: :mentionable, prefix: true, allow_nil: true
    def notify_hash ~ end
    def actor ~ end
    def content_path ~ end



3.2.4 node_changed	文章节点改变	消息推送
module Notification
  class NodeChanged < Base
    belongs_to :topic, class_name: '::Topic'
    belongs_to :node
    delegate :name, to: :node, allow_nil: true, prefix: true
    def notify_hash ~ end
    def content_path ~ end

3.2.5 topic_reply		文章回复		消息推送
module Notification
  class TopicReply < Base
    belongs_to :reply, class_name: 'Reply'
    delegate :body, to: :reply, prefix: true, allow_nil: true
    def notify_hash ~ end
    def actor ~ end	
    def content_path ~ end

3.2.6 topic 		文章 消息推送
module Notification
  class Topic < Base
    belongs_to :topic, class_name: '::Topic'
    delegate :body, to: :topic, prefix: true, allow_nil: true
    def notify_hash ~ end
    def actor ~ end	
    def content_path ~ end



3.3 user	用户






3.3 user/omniauth_callbacks   用户第三方认证登陆








3.4	ability  
# cancancan  权限控制的配置文件


3.5  application_record

3.6  authorization

3.7	cache_version
# 用于记录特定的 cache version

3.8 page_version

3.9 comment 评论模块

4.0	reply 回复别人
# 使用 concerns 抽离出来的代码

4.2	exception_log



4.1	page 	
# 单页的文档页面
# 采用 Markdown 编写
4.0 photo


4.3	topic 	话题


4.5	section  设置
class Section < ApplicationRecord

4.5	setting	设置
class Setting < Settingslogic

4.6	site_config 站点默认设置
# RailsSettings Model
class SiteConfig < RailsSettings::CachedSettings
end

4.8	node 	节点

4.9	site_node	设置节点
class SiteNode < ApplicationRecord

4.9	site 	节点设置
class Site < ApplicationRecord


5.4  note 	记事本
5.5	location	位置


