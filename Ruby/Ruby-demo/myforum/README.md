rails new myform
gem devise
rails g devise:install
rails g devise User
***
class DeviseCreateUsers < ActiveRecord::Migration
  def change
    create_table(:users) do |t|

      ## Admin?
      t.boolean :admin
    end
  end
end
***
rails g scaffold Question content:string
rails g model Answer content:text
***
class Answer < ActiveRecord::Base
  belongs_to :question
  belongs_to :user
end
class User < ActiveRecord::Base
  has_many :questions
  has_many :answers
end
class Question < ActiveRecord::Base
  belongs_to :user
  has_many :answers
end
***
class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.text :content
      t.integer :question_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end

class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :content
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
***
rails g controller home index
sign_in or sing_out and routes change
***
add answers_controller.rb page
class AnswersController < ApplicationController

	def create
		@question = Question.find(params[:question_id])
		@answer = Question.answers.build(answers_params)
		@answer.user = current_user
		@answer.save

		redirect_to questions_url
	end

	def destroy
		@question = Question.find(params[:question_id])
		@answer = @question.answers.find(params[:id]).destroy
		redirect_to questions_url
	end



	private

	def answers_params
		params.require(:answer).permit(:content)
	end


end
***
Pages: questions/index.html.erb  answers/_answer.html.erb
rails s
***
gem 'cancan'
rails g cancan:ability
# ability.rb
if user.admin?

    can :manage, :all

else

end

***
questions/index.html.erb   and can?
_answer.html.erb    and can?
rails c  test
***
class QuestionsController < ApplicationController

 def show
    authorize! :update, @question
  end

  def edit
    authorize! :update, @question
  end

***
class ApplicationController < ActionController::Base

  rescue_from CanCan::AccessDenied do |exception|
  	redirect_to questions_url, :alert => exception.message
  end

end

***



























