# Full-Text Search in PostgreSQL-clone.md

ArticlesController中代码片段：
`
def index
	@article = Article.text_search(params[:query]).page(params[:page]).per_page(3)
end
`
/models/article.rb 代码片段  
`
def self.text_search(query)
	if query.present?
		where("name @@ :q or content @@ :q", q: query)
	else
		scoped
	end
end
`
***
rails db  
select 'ninja trutles' @@ 'turtles';  
select 'ninja trutles' @@ 'green';  
select to_tsvector('ninja turtles') @@ plainto_tsquery('turtle');  
select to_tsvector('english', 'ninja turtles') @@ plainto_tsquery('english', 'turtle');  
select to_tsvector('sample', 'ninja turtles') @@ plainto_tsquery('sample', 'turtle');    
select to_tsvector('sample', 'ninja turtles') @@ plainto_tsquery('sample', 'ninja turtle');  
select to_tsvector('sample', 'ninja turtles') @@ plainto_tsquery('sample', 'ninja & turtle');  
select to_tsvector('sample', 'ninja turtles') @@ plainto_tsquery('sample', 'ninja | turtle');  
select to_tsvector('sample', 'ninja turtles') @@ plainto_tsquery('sample', 'ninja & !turtle');  
select ts_rank(to_tsvector('ninja turtles'), to_tsquery('turtles'));  
***
gem 'will_paginate'  
gem 'texticle', require: 'texticle/rails'
修改 models/article.rb  为 
`
def self.text_search(query)
	if query.present?
		search(query)
	else
		scoped
	end
end
`
***
gem 'pg'  
在 models/article.rb  中添加
` 
include PgSearch
pg_search_scope :search, against: [:name, :content],
	using: {tsearch: {dictionary: "english"}},
	associated_against: {author: :name, comments: [:name, :content]}
	ignoring: :accents
`
***
rails g migration add_unaccent_extension  
rake db:migrate  
???  制造循环假数据
rake db:seed  
***
rails g migration add_search_index_to_articles  
rake db:migrate  
***










