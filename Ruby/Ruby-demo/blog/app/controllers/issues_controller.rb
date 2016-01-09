class IssuesController < ApplicationController

	def show
		@issue = Issue.find(params[:id])
	end

	def show
		@issue = Issue.find(params[:id])
	end

	def destroy
		i = Issue.find(params[:id])
		i.destroy
		redirect_to :root

	end
end