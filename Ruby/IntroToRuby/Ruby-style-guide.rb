Ruby-style-guide.ru
来源：https://github.com/JuanitoFatas/ruby-style-guide/blob/master/README-zhCN.md

1.空格，不用制表符tab
def some_method
  do_something
end


2.一行一条语句
puts 'foobar'

puts 'foo'
puts 'bar'

puts 'foo','var' #仅对 puts 适用

3.对于没有主体的类，倾向使用单行定义。
FooError = Class.new(StandardError)


4.定义方法时，避免单行写法。尽管这种写法有时颇为普遍，但其略显古怪的定义语法容易使人犯错。无论如何，至少保证单行写法的方法不应该拥有一个以上的表达式

def some_method
  body
end

例外:空方法
def no_op;end

5.避免在非必要的情形下使用续行符 \。在实践中，除了字符串拼接，避免在其他任何地方使用续行
result = 1 \
		 -2

long_string = 'First part of the long string' \
              ' and second part of the long string'


6.
one.two.three.
  four


7.语法
使用 :: 引用常量（包括类与模块）与构造器（比如 Array()、Nokogiri::HTML()）。不要使用 :: 调用常规方法。

SomeClass.some_method
some_object.some_method
SomeModule::SomeClass::SOME_CONST
SomeModule::SomeClass()

8.除非必要，否则避免在并行赋值时使用单字符的 _ 变量。优先考虑前缀形式的下划线变量，而不是直接使用 _，因为前者可以提供一定的语义信息。但当赋值语句左侧出现带 * 操作符的变量时，使用 _ 也是可以接受的。

foo = 'one,two,three,four,five'

*beginning, _ = foo.split(',')
*beginning, something, _ = foo.split(',')

9. 永远不要使用 for， 除非你很清楚为什么。大部分情况下，你应该使用迭代器。for 是由 each 实现的，所以你绕弯了。另外，for 没有引入一个新的作用域 (each 有），因此在它内部定义的变量在外部仍是可见的

arr = [1,2,3]
arr.each{ |elem| puts elem }


10.倾向使用三元操作符（?:）而不是 if/then/else/end 结构。前者更为常见且简练。

result = some_codition ? something : something_else





##############################################################

############  Improve the Smell of Your Code with Microrefactorings ########################

##############################################################

1.0
# before
sum = 0
numbers.each do |number|
	sum += number
end
sum

# after
numbers.inject(:+)

2.0
# before
anagrams = []
candidates.each do |candidate|
	if anagram_of?(subject, candidate)
		anagrams << candidate
	end
end
anagrams

# after
candidates.select do |candidate|
	anagram_of?(subject, candidate)
end

3.0 
# before
mutations = 0
(0...strand1.length).each do |i|
	if strand1[i] != strand2[i]
		mutations += 1
	end
end
mutations

# after
(0...strand1.length).count { |i| strand[i] != strand2[i] }

4.0
# before
oldest = ""
highest = 0
kids.each do |kid|
	if kid.age > highest
		oldest = kid.name
		highest = age
	end
end
oldest

# after
kids.sort_by { |kid| kid.age }.last.name
# even more after
kids.max_by { |kid| kid.age }.name

5.0 
# before
words.inject([]) do |censured, word|
	censured << word if word.size == 4
	censured
end
# after
words.select { |word| word.size == 4 }





























































































































































































































