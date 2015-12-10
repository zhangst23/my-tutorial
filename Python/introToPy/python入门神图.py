# 有编程基础的人一看就可以了解 Python 的用法了。真正的 30 分钟上手。
# 国外一高手画的，现把它翻译成中文，入门超简单
# python入门神图

#单行注释   脚本文件一般用.py后缀
# _*_ coding:utf-8 _*_   中文用户一定得先用这行来声明编码，同时文件本身也得存储成UTF-8编码

import os    #导入其他代码模块  模块名，其实是导入了os.py

def main():    函数名“main”在这儿并不是必须的，调用在这段脚本的最后部分
	print 'Hello World!'

	print "这是Alice\'的问候."   #声明单行字串，使用双\单引号都成，注意对字串中的引号进行逃逸处理
	print '这是鲍勃的问候'

	foo(5,10)    #函式调用，声明在后述代码

	print '=' * 10    #字符可乘，等于：‘==========’
	print '这将直接执行'+os.getcwd()    #调用了os模块中的函式   +号是连接字符

	counter = 0     #变量得先实例化才可进一步计算
	counter += 1

	food = ['苹果','杏子','李子','梨']
	for i in food:					#单行的语句块，其实可以不换行的，但是，建议清晰起见，规范点，另起一行，缩进一级
		print '俺就爱政治:' + i      #再循环中，i 指代了列表中按顺序的每个“food”

	print '数到10'
	for i in range(10):			#range()内置函数，返回类似[0,1,2,3,4,5,6,7,8,9,]的数字列表，注意 for in 循环语句使用冒号结束声明
		print i 	

def foo(param1,secondParam):		#函式声明，注意使用冒号结束声明
	res = param1 + secondParam
	print '%s 加 %s 等于 %s'%(param1,secondParam,res)			#字符串的格式化输出类似C语言
	if res < 50:			#判定式也基本和C语言的相同
		pring '这个'
	elif(res>=50) and ((param1==42)or(secondParam==24)):		#用冒号来结束判断句，在 if elif else 行最后
		print '那个'				#and  or  逻辑运算符，不使用  && 和  || ，使用直观的E文单词
	else:
		pring '嗯...'
	return res     
	'''这是
	多行注释'''

	if __name__=='__main__': 		#每级语法块不用}之类的括号引领，用__           
		main()						
# 一般在脚本最后调用主函数main();而且使用 内置的运行脚本名来判定；
# 当且仅当我们直接运行当前脚本时，__name__才为__main__
# 这样当脚本被当做模块进行 import 导入时，并不运行 main()
# 所以，一般这里是进行测试代码安置的

















































