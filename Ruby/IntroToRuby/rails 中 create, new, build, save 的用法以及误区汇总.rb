rails 中 create, new, build, save 的用法以及误区汇总 （转）

# 自己很初级，初级的不能再初级，所以初次接触rails的时候，对于里面的create，new，build等方法不是很了解，
# 用的很混乱，导致经常出现不必要的bug，很苦恼，决定，总结一下，结合网上已有资源，深入理解下 向数据库插记录时
# 经常会用到new, build, create。这三个方法很容易混淆

# save：rails中的save其实是create_or_update，新建或修改记录！不一定是新建，切记 new ：只是在内存中新建一个对象，操作数据库要调用save方法。 
# create = new + 执行sql。 
# build：与new基本相同，多用于一对多情况下。

# 还有一个不同请看使用示例 !：new!, create!, build!与new, create, 
# build的区别是带!的方法会执行validate，如果验证失败会抛出导常。 
# save是实例方法，而create, build, new是模型类的类方法

# 还有另外一种说法，也挺好，如下:首先说new吧，app = App.new(params[:app]),这个是用给定的params来
# 实例化一个app对象，注意此时只是初始化了一个对象，ruby只是在内存里面给app分配了一个内存地址，但是,这 个
# 地址还没有指定任何的有效的内存，所以接下来ruby要做的就是调用model里面的initialize函数来根据给定的
# 参数进行初始化这个对象，并将该对象保存到堆里面。     

# 对于new！来说，这个跟new相比，就是在save到数据库的时候，如果save失败，就会报一个错误。     
# 对于create来说，过程大致跟new差不多，唯一的区别是，create = new + save，即create一步操作等于new和save的两部操作。     
# 对于create！来说，类似于new！过程大致也是跟new！差不多 区别是create！ = new！ + save  如果保存失败的话会返回一个错误。     
# 对于build来说，主要的混淆的地方在于与new的区别，其实，我认为build是new的一个别名，但是用的地方
# 可能跟new有点区别，在我看来，build大多是用于有关联关系的对象模型的时 候，用来创建子model用的，
# 比如说 Person  与 Order是一对多的关系，那么我们可以用 @persion.build()方法来创建于该person对应的orders
 

# 下面有一个简单的示例：

 


# 本来是想用accepts_nested_attributes_for写一个nested form
class User < ActiveRecord::Base 
  attr_accessible :email, :account_attributes 
  has_one :account 
  accepts_nested_attributes_for :account 
end 
 
 
class Account < ActiveRecord::Base 
  attr_accessible :password, :password_confirmation 
  has_secure_password 
  belongs_to :user  
end 
 
 
class UsersController < ApplicationController 
  defnew 
    @user = User.new 
  end 
end 
class User < ActiveRecord::Base
  attr_accessible :email, :account_attributes
  has_one :account
  accepts_nested_attributes_for :account
end


class Account < ActiveRecord::Base
  attr_accessible :password, :password_confirmation
  has_secure_password
  belongs_to :user 
end


class UsersController < ApplicationController
  def new
    @user = User.new
  end
end
 

# view里

 

<%= form_for @userdo |f| %> 
  email: <%= f.text_field :name %> 
  <%= f.fields_for :accountdo |account_form| %> 
    password: <%= account_form.password_field :password %> 
    password_confirmation: <%= account_form.password_field :password_confirmation %> 
  <% end %> 
<% end %> 
<%= form_for @user do |f| %>
  email: <%= f.text_field :name %>
  <%= f.fields_for :account do |account_form| %>
    password: <%= account_form.password_field :password %>
    password_confirmation: <%= account_form.password_field :password_confirmation %>
  <% end %>
<% end %>

# 一开始无法显示account里的内容，后来发现没有在controller里build account, 于是
 

 

class UsersController < ApplicationController 
  defnew 
    @user = User.new 
    @user.account.build 
  end 
end 
class UsersController < ApplicationController
  def new
    @user = User.new
    @user.account.build
  end
end
# 报错 undefined method `build' for nil:NilClass

# 刚开始怎么也想不通，隔了一天去翻http://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html 才发现原来has_one的build方法是build_association而不是collection.build。因为不常用has_one，rails里“约定”又比较多，才会当has_many的方法来写。
# 把controller里改成
 

 

class UsersController < ApplicationController 
  defnew 
    @user = User.new 
    @user.build_account 
  end 
end 
class UsersController < ApplicationController
  def new
    @user = User.new
    @user.build_account
  end
end
 

 

# 程序才正常跑起来
# 一言蔽之 在has_many中：User#accounts.build 在has_one中：User#build_account

