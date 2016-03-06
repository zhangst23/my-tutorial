0.1  Ruby 元编程.rb


1.0   对象模型

常量： 任何以大写字母开头的引用（包括类名和模块名），都是常量。
Rake 是 Ruby 流行的构建系统。
像 Rake 这样紧紧用来充当常量容器的模块，被称为 命名空间(Namespace).
常量路径使用双冒号进行分隔
使用命名空间可以轻松搞定 Text 类和 ActionMail 中 Text 类 的命名冲突问题，只需将类放到一个命名空间中即可。
module Bookworm
	class Text
		# ...




2.0  方法








0.2   Rails 中的元编程

7.0 ActiveRecord 的设计














10.0  
10.1 空指针保护
a ||= []
#
a = a || []


#
if a != nil
	a = a
else
	a = []
end

#

class C
	def initialize
		@a = []
	end

	def elements
		@a
	end
end

# 相当于
class C
	def elements
		@a ||= []
	end
end






10.2 领域专属语言
10.2.1 数组参数
# 把一组参数压入到一个数组中
def my_method(*args)
	args.map{ |arg|arg.reverse }
end

my_method('abc', 'xyz', '123') #=> ["cba","zyx","321"]

10.2.2 环绕别名
从一个重新定义的方法中调用原始的、被重命名的版本
class String
	alias :old_reverse:reverse

	def reverse
		"x#{old_reverse}x"
	end
end

"abc".reverse#=> "xcbax"

10.2.3 白板 
# 移除一个对象中的所有方法，以便把它们转换成幽灵方法
class C
	def method_missing(name, *args)
		"a Ghost Method"
	end
end

obj=C.new
obj.to_s#=>"#<C:0:357258>"

class C
	instance_methods.each do |m|
		undef_methodm unless m.to_s=~/method_missing|respond_to?|^/
	end
end

obj.to_s#=>"a Ghost Method"


10.2.6 类宏
# 在类定义中使用一个类方法
class C;end

class<<C
	def my_macro(arg)
		"my_macro(#{arg}) called"
	end
end

class C
	my_macro:x#=>"my_macro(x) called"
end


10.2.8  钩子方法
# 通过覆写某个特殊方法来截获对象模型事件
$INHERITORS = []

class C
	def self.inherited(subclass)
		$INHERITORS<<subclass
	end
end

class D<C
end

class E<C
end

class E<C
end

class F<E
end

$INHERITORS #=> [D,E,F]



10.2.9 内核方法
# 在 Kernel 模块中定义一个方法，使之对所有对象都可用
module Kernel
	def a_mentod
		"a kernel method"
	end
end

a_method#=>"a kernel method"

10.2.10 惰性实例变量
# 当第一次访问一个实例变量时才对之进行初始化
class C
	def attribute
		@attribute=@attribute||"some value"
	end
end

obj=C.new
obj.attribute#=>"some value"

10.2.11 拟态方法
# 把一个方法伪装成另外一种语言构件
def BaseClass(name)
	name == "String" ? String : Object
end

class C<BaseClass "string" # 一个看起来像类的方法
	attr_accessor :an_attribute # 一个看起来像关键字的方法
end

obj = C.new
obj.an_attribute=1 # 一个看起来像属性的方法


10.2.12 猴子打补丁
# 修改已有类的特性
"abc".reverse #=>"cba"

class String
	def reverse
		"override"
	end
end

"abc".reverse #=>"override"

10.2.13 有名参数
# 把方法参数收集到一个哈希表中，以便通过名字访问
def my_method(args)
	args[:arg2]
end

my_method(:arg1=>"A", :arg2=>"B", :arg3=>"C") #=> "B"


10.2.14 命名空间
# 在一个模块中定义常量，以防止命名冲突
module MyNamespace
	class Array
		def to_s
			"myclass"
		end
	end
end

Array.new #=> []
MyNamespace::Array.new #=>my class


10.2.15 空指针保护
# 用 “或” 操作符覆写一个空引用
x=nil
y=x || "a value"  # => "a value"


10.2.16 对象扩展
通过给一个对象的 eigenclass 混入模块来定义单件方法。
obj=object.new

module M
	def my_method
		'a singleton method'
	end
end

class<<obj
	include M
end

obj.my_method # => "a singleton method"


10.2.17 打开类
# 修改已有的类
class String
	def my_string_method
		"my method"
	end
end

"abc".my_string_method # => "my method"

10.2.18
# 根据名字来选择需要调用的方法
$x=0

class C
	def my_first_method
		$x += 1
	end

	def my_second_method
		$x += 2
	end
end

obj=C.new
obj.methods.each do |m|
	obj.send(m) if m.to_s=~/^my_/
end

$x # => 3

10.2.19 沙盒
# 在一个安全的环境中执行未授信的代码
def sandbox(&code)
	proc {
		$SAFE = 2
		yield
	}.call
end

begin
	sandbox{File.delete 'a_file'}
resue Exception=>ex
	ex #=> #<SecurityError:Insecure operation 'delete' at level 2>
end


10.2.20  作用域门
# 用 class module 或 def 关键字来隔离作用域
a = 1
defined? a #=> "local-variable"

module MyModule
	b = 1
	defined? a #=> nil
	defined? b #=> "local-variable"
end

defined? a #=> "local-variable"
defined? b #=> nil

10.2.21 Self Yield
# 把 self 传给当前块
class Person
	attr_accessor :name, :surname

	def initialize
		yield self
	end
end

joe = Person.new do |p|
	p.name = "Joe"
	p.surname = 'Smith'
end


10.2.22 共享作用域
# 在同一个扁平作用域的多个上下文中共享变量
lambda {
	shared = 10
	self.class.class_eval do
		define_method: counter do
			shared
		end

		define_method :down do
			shared -= 1
		end
	end
}.call

Counter #=> 10
3.times { down }
Counter #=> 7

10.2.24 单件方法
# 在一个对象上定义一个方法
obj = "abc"

class << obj
	def my_singleton_method
		"x"
	end
end

obj.my_singleton_method # => "x"






















































































































