Pundit 代码片段.rb

# Style for brevity...
class NotePolicy < ApplicationPolicy
	def show? 	  ; true; end
	def create?   ; true; end
	def update?   ; record.user == user; end
	def destroy?  ; record.user == user; end

end


# And a top-level policy for setting defaults
class ApplicationPolicy
	attr_reader :user,  # User performing the action
				:record # Instance upon which action is performed

	def initialize(user, record)
		raise Pundit::NotAuthorizedError, "Must be signed in." unless user
		@user = user
		@record = record
	end


	def index?		; false;		end
	def show?		; scope.where(id: record.id).exists?;	end
	def new?		; create?;		end
	def create?		; false;	end
	def edit?		; update?;	end
	def update?		; false;	end
	def destroy?	; false;	end


	def scope
		Pundit.policy_scope!(user, record.class)
	end
end 



# 通过ApplicationController 让 Pundit在所有的controllers 生效
class ApplicationController < ActionController::Base
	include Pundit

	after_filter :verify_authorized, except: :index
	after_filter :verify_policy_scoped, only: :index

	rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

	private

	def user_not_authorized
		flash[:error] = "You are not authorized to perform this action."
		redirect_to request.headers["Referer"] || root_path
	end


end


























