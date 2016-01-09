Ruby 学习笔记.rb

1. 在 Ruby 中定义类

class Customer
end

# Ruby 提供了四种类型的变量：
# 局部变量：局部变量是在方法中定义的变量。局部变量在方法外是不可用的。在后续的章节中，您将看到有关方法的更多细节。局部变量以小写字母或 _ 开始。
# 实例变量：实例变量可以跨任何特定的实例或对象中的方法使用。这意味着，实例变量可以从对象到对象的改变。实例变量在变量名之前放置符号（@）。
# 类变量：类变量可以跨不同的对象使用。类变量属于类，且是类的一个属性。类变量在变量名之前放置符号（@@）。
# 全局变量：类变量不能跨类使用。如果您想要有一个可以跨类使用的变量，您需要定义全局变量。全局变量总是以美元符号（$）开始。


2.在 Ruby 中使用 new 方法创建对象
cust1 = Customer. new


3.下面的实例将创建类 Sample 的一个对象，并调用 hello 方法：

class Sample
	def hello
		puts "Hello Ruby!"
	end
end

#使用上面的类来创建对象
object = Sample. new
object.hello


4.Ruby 类案例
# 下面将创建一个名为 Customer 的 Ruby 类，声明两个方法：
# display_details：该方法用于显示客户的详细信息。
# total_no_of_customers：该方法用于显示在系统中创建的客户总数量。

class Customer
	@@no_of_customers=0
	def initialize(id,name,addr)
		@cust_id=id
		@cust_name=name
		@cust_addr=addr
	end
	def display_details()
		puts "Customer id #@cust_id"
		puts "Customer name #@cust_name"
		puts "Customer address #@cust_addr"
	end
	def total_no_of_customers()
		@@no_of_customers += 1
		puts "Total number of customers: #@@no_of_customers"
	end
end


# 创建对象
cust1=Customer.new("1","John","Wisdom Apartments,Ludhiya")
cust2=Customer.new("2","Poul","New Empire road,Khandala")

# 调用方法
cust1.display_details()
cust1.total_no_of_customers()
cust2.display_details()
cust2.total_no_of_customers()



5.Ruby 循环
5.1 while循环
while conditional [do]
	code
end

5.3 while 修饰符

code while condition

或者

begin
	code
end while condition

# 实例
$i = 0
$num = 5

begin
	puts("在循环语句中 i = #$i" )
	$i += 1
end while $i < $num

6  Ruby until 语句
until conditional [do]
   code
end

6.1  Ruby until 修饰符
语法
code until conditional

或者

begin
   code
end until conditional


7.Ruby for 语句
for variable [, variable ...] in expression [do]
	code
end

# 实例
fro i in 0..5
  puts "局部变量的值为 #{i}"
end


7.1  
for...in 循环几乎是完全等价于：
(expression).each do |variable[, variable...]| code end
但是，for 循环不会为局部变量创建一个新的作用域。
语法中 do 可以省略不写。但若要在一行内写出 for 式，则必须以 do 隔开条件式或程式区块。
实例
#!/usr/bin/ruby
# -*- coding: UTF-8 -*-

(0..5).each do |i|
   puts "局部变量的值为 #{i}"
end


8. Ruby break 语句


9. Ruby next 语句

10. Ruby redo 语句

重新开始最内部循环的该次迭代，不检查循环条件。如果在块内调用，则重新开始 yield 或 call。
实例
#!/usr/bin/ruby
# -*- coding: UTF-8 -*-

for i in 0..5
   if i < 2 then
      puts "局部变量的值为 #{i}"
      redo
   end
end


11
如果 retry 出现在 begin 表达式的 rescue 子句中，则从 begin 主体的开头重新开始。
如果 retry 出现在迭代内、块内或者 for 表达式的主体内，则重新开始迭代调用。迭代的参数会重新评估。


for i in 1..5
	retry if i > 2
	puts "局部变量的值为 #{i}"
end


12
module Trig
	PI = 3.1415926
	def Trig.sin(x)
	# ..
	end
	def Trig.cos(x)
	# ..
	end
end


13

require 'trig.rb'
require 'moral'



14
include modulename


15
class Sample
include A
include B
	def s1
	end
end


15 迭代器
15.1  each
collection.each do |variable|
  code
end

#
ary = [1,2,3,4,5]
ary.each do |i|
	puts i
end


15.2  Ruby collect 迭代器
#
a = [1,2,3,4,5]
b = Array.new
b = a.collect( |x|x )
puts b


16 File

File.new方法
# 您可以使用 File.new 方法创建一个 File 对象用于读取、写入或者读写，读写权限取决于 mode 参数。最后，您可以使用 File.close 方法来关闭该文件。
语法
aFile = File.new("filename","mode")
	#...处理文件
aFile.close


File.open方法
# 您可以使用 File.open 方法创建一个新的 file 对象，并把该 file 对象赋值给文件。但是，File.open 和 File.new 方法之间有一点不同。不同点是 File.open 方法可与块关联，而 File.new 方法不能。
File.open("filename","mode") do |aFile|
	# ... process the file
end


读取和写入文件
sysread 方法
# 您可以使用方法 sysread 来读取文件的内容。当使用方法 sysread 时，您可以使用任意一种模式打开文件。例如：

# 下面是输入文本文件：
This is a simple text file for testing purpose.
# 现在让我们尝试读取这个文件：
aFile = File.new("input.txt","r")
if aFile
	content = aFile.sysread(20)
	puts content
else
	puts "Unable to open file!"
end












































