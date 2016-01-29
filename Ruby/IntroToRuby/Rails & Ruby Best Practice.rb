Rails & Ruby Best Practice.rb


1.0 default_scope is Evil
class Post
	default_scope where(published: true).order("created_at desc")
end












