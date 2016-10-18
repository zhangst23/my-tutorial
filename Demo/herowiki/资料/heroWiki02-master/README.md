# HeroWiki 神人百科

### 灵感(为什么)
知乎上看到一个提问: 有哪些人堪称「神人」，却不为大众所知？  
总共有 610 个回答, 最高票的有 31 万人给赞。
尤其阅读到天才的苦难时代背景, 想想令人扼腕。却又无比励志。
这些人物的生平记录又都不完整清晰, 值得我去挖出埋藏在历史尘埃中的他们。

### 目的(是什么)
大神级人物的真实百科

### 形式(怎么做)

#### hero  :类
1. views
- index :卡片人物排列
- show  :人物详情

2. 字段
- name:string
- birthday:integer
- title:string
- country:string
- school:string  学校
- scope:string   领域

#### node  :节点




#### 技术点
1. gem 
- ElasticSearch  搜索
- carrierwave	上传图片
- redcart?		Markdown,
- comment		评论, 先采用第三方的。

2. 功能点
- 搜索栏
- 


3. 布局
- 搜索栏
- dorpdown*5 (node节点)
- card (人物卡片)


#### 要点
- 去世的人物头像用黑白，活着的用彩色
- 人物头像一定是他最帅或最靓的照片


### 步骤
rails g scaffold hero name:string birthday:integer country:string school:string description:text constellation:string
gem: simple_form   bootstrap-sass
rails g scaffold nodes name:string
gem: carrierwave mini_magick
rails g migtation add_image_to_hero image:string
***
rails g migration add_node_id_to_hero node_name:string
rails g migration add_node_name_to_hero node_name:string
***
gem 'redcarpet', '~> 3.0.0'
gem 'kaminari', '~> 0.15.1'
***
rails g model tag name
rails g model tagging tag:belongs_to article:belongs_to

***
rails g migration add_video_list_to_hero video_list:text
rails g migration add_article_list_to_hero article_list:text
rails g migration add_success_list_to_hero successful_list:text

***




















