gem-Rolify.rb 
# Rolify is a popular gem that helps to manage roles in a Rails application. It allows you to create three types of roles:

@user.add_role(:admin)               # global role
@user.add_role(:admin, Forum)        # class role
@user.add_role(:admin, Forum.first)  # instance role
# The gem adds two tables to your database (roles and users_roles), and provides useful methods to easily add, remove, list and check roles. In this article, we will discuss the has_role? method, which checks if the user has a specific role in the system:

@user.add_role(:admin, Forum.first)    #=> adds the admin role for @user in the first forum

@user.has_role?(:admin, Forum.first)   #=> true
@user.has_role?(:admin, Forum.last)    #=> false


###########################

gem 'devise'
gem 'cancancan'
gem 'rolify'

# run bundle install to install all required gems

Run Devise generator

# rails generate devise:install
Create the User model from Devise

# rails generate devise User
Create the Ability class from CanCanCan

# rails generate cancan:ability
Create the Role class from rolify

# rails generate rolify Role User
Run migrations

# rake db:migrate


#########################


class Ability
  include CanCan::Ability

  def initialize(user)
    if user.blank?
        cannot :manage, :all
        basic_read_only
    elsif user.has_role?(:admin)
        can :manage, :all
    elsif user.has_role?(:manager)
        can :read, Wrkrec
    end
  end


  protected

  def basic_read_only
    can :read,  Wrkrec
  end


end



######################








接著我們可以在page裡面寫
 <% if current_user.has_role? :admin %>
        <%= link_to 'Edit', edit_question_path(question) ,class: "btn btn-primary"%>
  <% end %>