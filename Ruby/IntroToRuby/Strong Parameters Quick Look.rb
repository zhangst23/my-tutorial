Mass-Assignment: Assigning attributes of a model in a hash


# Let’s take an simple example.
# The Rails way of creating a user looks like:
params[:user] = {:name => 'Foo', :email => 'foo@example.com'}
@user = User.new(params[:user])

# and updating
@user = User.update_attributes(params[:user])



# Strong Parameters: New way to handle mass-assignment protection
# Today with the Strong Parameters gem made by DHH, you can just call “PERMIT” .

# To explore it more lets write some code.
# Say we have a book_store app, with a model called Book. The Book model has name, author and public(boolean) attributes. We have user authentication based on role (admin,user).

class Book < ActiveRecord::Base
	attr_accessible :name, :public, :author
end


# Every user can create and update book and make them public from User Interface.

# If we want to restrict users that are not admins from updating the public attribute, then we need to do something like:

class Book < ActiveRecord::Base
	attr_accessible :name, :author, :public as : :admin
	attr_accessible :name, :author, as : :user
end

# In BooksController we need to do like :

class BooksController < ApplicationController
	def create
		@book = Book.new(params[:book], as : current_user.try(:admin) ? :admin : :user)
		respond_to do |format|
			if @book.save
				format.html { redirect_to @book notice 'Book was successfully created.' }
			else
				format.html { render action : "new" }
			end
		end
	end

	def update
		@book = Book.find(params[:id])
		respond_to do |format|
			if @book.update_attributes(params[:book], as :
				current_user.try(:admin) ? :admin : :user)
				format.html { redirect_to @book, notice : 'Book was successfully updated.' }
			else
				format.html { render action : "edit" }
			end
		end
	end
end


# Now only admin can update public field through form. Now, we add a new role called reporting_user who can only update name.

class Book < ActiveRecord::Base
	attr_accessible :name, :author, :public as : :admin
	attr_accessible :name, :author, as : :user
	attr_accessible :name, as : :reporting_user
end

# We have to add some more conditions in controller also like

class BooksController < ApplicationController
  def create
    @book = Book.new(params[:book], as : user_role)
    respond_to do |format|
      if @book.save
        format.html { redirect_to @book notice 'Book was successfully created.' }
      else
        format.html { render action : "new" }
      end
    end
  end

  def update
    @book = Book.find(params[:id])
    respond_to do |format|
      if @book.update_attributes(params[:book], as :
        user_role)
        format.html { redirect_to @book, notice : 'Book was successfully updated.' }
      else
        format.html { render action : "edit" }
      end
    end
  end


  private

  def user_role
  	current_user.try(:admin) ? :admin : (current_user.try(:user) ? :user :reporting_user)
  end
end

# Mass-Assignment Protection at Controller Level: Strong Parameter Gem
# Now in our controller we handle mass-assignment calling a permit :

class BooksController < ApplicationController
  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        format.html { redirect_to @book, notice : 'Book was successfully created.' }
      else
        format.html { render action : "new" }
      end
    end
  end

  def update
    @book = Book.find(params[:id])

    respond_to do |format|
      if @book.update_attributes(book_params)
        format.html { redirect_to @book, notice : 'Book was successfully updated.' }
      else
        format.html { render action : "edit" }
      end
    end
  end

  private

  def book_params
  	if current_user && current_user.admin?
  		params[:book].permit(:name, :author, :public)
  	else
  		params[:book].permit(:name, :author)
  	end
  end
  	
end



#
params.require(:book).permit(:name,:author,:public)

# According to the docs, it supports nested attributes. For example, if a book has many chapters, then in the controller we can call permit like:
params[:book].permit(:name, :author, :chapters_attributes => [:number_of_pages])


# Strong Parameters will be part of Rails 4.
# If you make a sample app with Rails 4 and generate a scaffold user with name and email attributes, it will generate a user_params private method 
def user_params
	params.require(:user).permit(:name, :email)
end




































