Ruby 元编程.rb


1.0  
常量： 任何以大写字母开头的引用（包括类名和模块名），都是常量。
Rake 是 Ruby 流行的构建系统。
像 Rake 这样紧紧用来充当常量容器的模块，被称为 命名空间(Namespace).
常量路径使用双冒号进行分隔
使用命名空间可以轻松搞定 Text 类和 ActionMail 中 Text 类 的命名冲突问题，只需将类放到一个命名空间中即可。
module Bookworm
	class Text
		# ...




























