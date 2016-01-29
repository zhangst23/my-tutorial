how-to-send-email-in-rails.rb


new blog
#
rails g mailer CommentMailer
#
app/mailers/comment_mailer.rb

class CommentMailer < ActionMail::Base
	default from: "poshboytl@gmail.com"

	def comment_notify_email(comment)
		@comment = comment
		@url = post_url(@comment.post)

		mail to: 'poshboytl@gmail.com', subject: 'There is a new comment on your blog'
	end
end


# app/views/comment_mailer/comment_notify_email.html.erb
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" content="text/html">
	
</head>
<body>
	<h1>There is a new comment on your blog</h1>
	<p><%= @comment.content %></p>
	<p> url: <%= @url %> </p>
</body>
</html>


#  config/enviroments/development.rb 添加 emial 配置

config.action_mailer.delivery_method = :stmp
config.action_mailer.stmp_settings = {
	:address			    => "smtp.gmail.com",
	:port 				    => 587,
	:user_name			    =>
	:password			    =>
	:authentication		    =>
	:enable_starttles_auto	=>
}


#
rails c
CommentMailer.comment_notify_email(Comment.last)
???

#
class CommentsController < ApplicationController
	def create
		@post = Post.find(params[:post_id])
		@comment = @post.comments.new(params[:comment])
		if @comment.save
			CommentMailer.comment_notify_email(@comment).deliver
			redirect_to @post 
		end
	end
end























