Active Record 数据验证.rb

1.0
# 下列方法会做数据验证，如果验证失败就不会把对象存入数据库：

create
create!
save
save!
update
update!

爆炸方法（例如 save!）会在验证失败后抛出异常。验证失败后，非爆炸方法不会抛出异常，save 和 update 返回 false，create 返回对象本身。



2.0

validates :name, presence: true



3.0

error[:attribute]

acceptance


validates_associated


confirmation

exclusion


format


inclusion


length


numericality


presence


absence

uniqueness

validates_with

validates_each


3  常用的验证选项

:allow_nil

:allow_blank


:message

:on



4.条件验证
指定symbol

指定字符串


指定Proc


5.
处理验证错误

###############################################


rails常用验证方法

1.0  validates_presence_of   # 确定属性值不为nil也不为空

用法： validates_length_of attr..., [选项]
选项： :message => 缺省是 "is can't be blank." :on => :save, :create, 或 :update

2、validates_length_of   —— 确认属性值的长度。遵循一些约束: 至少要给出一个长度(如最小长度:minimum，最大长度:maximum，或一个区间:in or :within，但是这三者只能选其一，长度不能负数)，而不能只有单个:message选项，这个确认器允许为不同的确认失败分离消息，只要:message还可以使用。

用法： validates_length_of attr..., [ 选项... ]

例子：

validates_length_of :name, :maximum => 50   #这个时候可以自定义:message validates_length_of :password, :in => 6..20  #这个时候采用默认的:message,忽略自定义内容 validates_length_of :address, :minimum => 10, :message => "seems too short"

 

选项: :in (或 :within) =>值的长度必须在一个范围内。 :is => integer， 值必须是整数的字符长度。 :minimum =>是一个integer， 值不能小于此整数。 :maximum=> 是一个integer ，值不能大于此整数。 :message =>是一个 text ，消息可以包含一个将被maximun，minimum，或确定长度代替的%d序列。 :on=> :save, :create, 或 :update :too_long => 是一个text ，使用:maximum时的:message同义词。 :too_short =>是一个 text，使用:minimum时的:message同义词。 :wrong_length =>是一个 text，使用:is 时的:message同义词。

 

 

3、validates_uniqueness_of —— 确认属性是唯一的。对于每个属性，确认数据库内的其它行当前没有与给定列同样的值。 用法： validates_uniqueness_of  attr... [ 选项... ]

选项： :message =>  缺省是 "has already been taken." :on =>:save, :create, 或 :update

:scope => attr Limits the check to rows having the same value in the column as the row being checked.

 

4、validates_confirmation_of —— 确认字段和它的值有同样内容。很多表单要求用户输入同一信息两次（如确认密码）如果你使用命名约定，即第二字段的名字附有_confirmation，你可以使用validates_confirmation_of ()来检查两个字段是否有同样的值。

用法：validates_confirmation_of attr... [ 选项... ]

选项： :message => 缺省是"doesn't match confirmation." :on  =>:save, :create, 或 :update

 

5、validates_format_of ——  在一个模式上确认属性。通过与正则表达式匹配它的值来确认每个字段。

用法：validates_format_of attr..., :with => regexp  [ 选项... ]

选项： :message => 缺省是"is invalid." :on  =>:save, :create, 或 :update

 

此外还有一些验证如下：

 

6、validates_acceptance_of —— 确认checkbox是否被标记。许多表单有checkbox，用户必须选择以便接受一些条款或条件。这个确认简单地检验这个box已经确认被标记，这个属性值是个字符串。属性本身并不被保存在数据库内(如果你希望明确地记录确认的话，没有什么东西会阻止你这样做)。

用法: validates_acceptance_of attr... [ 选项... ] 例子：

validates_acceptance_of :terms, :message => "Please accept the terms to proceed"

选项：

:message => 缺省是"must be accepted." :on  =>:save, :create, 或 :update

7、validates_associated —— 在关联的对象上完成确认。在给定的属性上完成确认，它被假设为是"活动记录模型"。对每个与属性关联的确认失败的话，一个单独的消息将被添加到那个属性的错误列表中(也就是说，个别的细节原因而出现的失败，将不会写到"模型"的错误列表中)。小心不要包含一个validates_associated()调用在彼此引用的"模型"中：第一个将会试图确认第二个，它依次将确认第一个等等，直接你堆栈溢出。

用法： validates_associated name... [ 选项... ]

例子：

class Order < ActiveRecord::Base   has_many :line_items   belongs_to :user   validates_associated :line_items, :message => "are messed up"   validates_associated :user end

选项：

:message => 缺省是"is invalid." :on  =>:save, :create, 或 :update

 

8、validates_each —— 使用一个块来确认一或多个属性。为每个属性调用块(如果:allow_nil为true，则跳过是nil的属性)。传递属性的名字，属性的值到被确认的"模型"内。如下面例子显示的，如果一个确认失败，块应该被添加给"模型"的错误列表

用法： validates_each attr... [ 选项... ] { |model, attr, value| ... }

例子：

class User < ActiveRecord::Base   validates_each :name, :email do |model, attr, value|     if value =~ /groucho|harpo|chico/i

      model.errors.add(attr, "You can't be serious, #{value}")     end   end end
选项：

:allow_nil => boolean值， 如果 :allow_nil 为 true，带有值nil的属性将不被传递给块而是被跳过。

:on  =>:save, :create, 或 :update

 

9、validates_exclusion_of —— 确认属性不在一组值中。确认属性没有出现在枚举中(任何对象都支持include?()断言)。 用法：validates_exclusion_of attr..., :in => enum [ 选项... ]

例子：

class User < ActiveRecord::Base   validates_exclusion_of :genre,:in => %w{ polka twostep foxtrot },

                         :message => "no wild music allowed"   validates_exclusion_of :age, :in => 13..19, :message => "cannot be a teenager" end

选项： :allow_nil => 如果属性为nil，并且:allow_nil选项为true。则枚举不被检查。 :in (或 :within) => 一个可枚举对象。 :message => 缺省是"is invalid." :on  =>:save, :create, 或 :update

 

10、validates_inclusion_of —— 确认属性是否属于一个值集。确认每个属性的值是否出现在枚举中(任何对象都支持include?()断言)。 用法：validates_inclusion_of attr..., :in => enum [ 选项... ]

例子：

class User < ActiveRecord::Base   validates_inclusion_of :gender,:in => %w{ male female },

                         :message => "should be 'male' or 'female'"   validates_inclusion_of :age,:in => 0..130, :message => "should be between 0 and 130" end

选项： :allow_nil => 如果属性为nil，并且:allow_nil选项为true。则枚举不被检查。 :in (或 :within) => 一个可枚举对象。 :message => 缺省是 "is not included in the list." :on  =>:save, :create, 或 :update

 

 

11、validates_numericality_of —— 确认那个属性是有效的数字。确认每个属性是个有效数字。在:only_integer选项中，属性必须由可选的符号后跟随一个或多个数字。在选项中(或者如果选项不是true)，可由Ruby Float()方法允许的任何浮点数都被接受。

用法：validates_numericality_of attr... [ 选项... ] 例子：

class User < ActiveRecord::Base   validates_numericality_of :height_in_meters   validates_numericality_of :age, :only_integer => true end

选项： :message => 缺省是 "is not a number." :on=> :save, :create, 或 :update :only_integer =>如果为 true，则属性必须是包含一个可选的符号后跟随数字的字符串





















