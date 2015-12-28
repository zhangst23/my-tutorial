Python装饰器.py
1. 装饰器入门
1.1. 需求是怎么来的？
# 装饰器的定义很是抽象，我们来看一个小例子。
def foo():
	print 'in foo()'

foo()

# 这是一个很无聊的函数没错。但是突然有一个更无聊的人，我们称呼他为B君，说我想看看执行这个函数用了多长时间，好吧，那么我们可以这样做：
import time
def foo():
	start = time.clock()
	print 'in foo()'
	end = time.clock()
	print 'used:',end - start

foo()

# 很好，功能看起来无懈可击。可是蛋疼的B君此刻突然不想看这个函数了，他对另一个叫foo2的函数产生了更浓厚的兴趣。

# 怎么办呢？如果把以上新增加的代码复制到foo2里，这就犯了大忌了~复制什么的难道不是最讨厌了么！而且，如果B君继续看了其他的函数呢？

1.2. 以不变应万变，是变也
# 还记得吗，函数在Python中是一等公民，那么我们可以考虑重新定义一个函数timeit，将foo的引用传递给他，然后在timeit中调用foo并进行计时，这样，我们就达到了不改动foo定义的目的，而且，不论B君看了多少个函数，我们都不用去修改函数定义了！
import time

def foo():
	print 'in foo()'

def timeit(func):
	start = time.clock()
	func()
	end = time.clock()
	print 'used:',end - start

timeit(foo)


1.3. 最大限度地少改动！
# 既然如此，我们就来想想办法不修改调用的代码；如果不修改调用代码，也就意味着调用foo()需要产生调用timeit(foo)的效果。我们可以想到将timeit赋值给foo，但是timeit似乎带有一个参数……想办法把参数统一吧！如果timeit(foo)不是直接产生调用效果，而是返回一个与foo参数列表一致的函数的话……就很好办了，将timeit(foo)的返回值赋值给foo，然后，调用foo()的代码完全不用修改！
#-*- coding:UTF-8 -*-
import time

def foo():
	print 'in foo()'

# 定义一个计时器，传入一个，并返回另一个附加了计时功能的方法
def timeit(func):
	# 定义一个内嵌的包装函数，给传入的函数加上计时功能的包装
	def wrapper():
		start = time.clock()
		func()
		end = time.clock()
		print 'used:',end - start

		# 将包装后的函数返回
		return wrapper

foo = timeit(foo)
foo()


# 这样，一个简易的计时器就做好了！我们只需要在定义foo以后调用foo之前，加上foo = timeit(foo)，就可以达到计时的目的，这也就是装饰器的概念，看起来像是foo被timeit装饰了。在在这个例子中，函数进入和退出时需要计时，这被称为一个横切面(Aspect)，这种编程方式被称为面向切面的编程(Aspect-Oriented Programming)。与传统编程习惯的从上往下执行方式相比较而言，像是在函数执行的流程中横向地插入了一段逻辑。在特定的业务领域里，能减少大量重复代码。面向切面编程还有相当多的术语，这里就不多做介绍，感兴趣的话可以去找找相关的资料。

# 这个例子仅用于演示，并没有考虑foo带有参数和有返回值的情况，完善它的重任就交给你了 ：）

2. Python的额外支持
2.1. 语法糖
# 上面这段代码看起来似乎已经不能再精简了，Python于是提供了一个语法糖来降低字符输入量。
import time
def timeit(func):
	def wrapper():
		start = time.clock()
		func()
		end = time.clock()
		print 'used:',end - start
	return wrapper

@timeit
def foo():
	print 'in foo()'
foo()


# 重点关注第11行的@timeit，在定义上加上这一行与另外写foo = timeit(foo)完全等价，千万不要以为@有另外的魔力。除了字符输入少了一些，还有一个额外的好处：这样看上去更有装饰器的感觉。

2.2. 内置的装饰器
# 内置的装饰器有三个，分别是staticmethod、classmethod和property，作用分别是把类中定义的实例方法变成静态方法、类方法和类属性。由于模块里可以定义函数，所以静态方法和类方法的用处并不是太多，除非你想要完全的面向对象编程。而属性也不是不可或缺的，Java没有属性也一样活得很滋润。从我个人的Python经验来看，我没有使用过property，使用staticmethod和classmethod的频率也非常低。
class Rabbit(object):
	def __init__(self,name):
		self._name = name

	@staticmethod
	def newRabbit(name):
		return Rabbit(name)

	@classmethod
	def newRabbit(name):
		return Rabbit(name)

	@classmethod
	def newRabbit2(cls):
		return Rabbit('')

	@property
	def name(self):
	    return self._name
	
# 这里定义的属性是一个只读属性，如果需要可写，则需要再定义一个setter：
@name.setter
def name(self,name):
	self._name = name


























这是在Python学习小组上介绍的内容，现学现卖、多练习是好的学习方式。


第一步：最简单的函数，准备附加额外功能


# -*- coding:gbk -*-
'''示例1: 最简单的函数,表示调用了两次'''
 
def myfunc():
    print("myfunc() called.")
 
myfunc()
myfunc()
 

第二步：使用装饰函数在函数执行前和执行后分别附加额外功能


# -*- coding:gbk -*-
'''示例2: 替换函数(装饰)
装饰函数的参数是被装饰的函数对象，返回原函数对象
装饰的实质语句: myfunc = deco(myfunc)'''
 
def deco(func):
    print("before myfunc() called.")
    func()
    print("  after myfunc() called.")
    return func
 
def myfunc():
    print(" myfunc() called.")
 
myfunc = deco(myfunc)
 
myfunc()
myfunc()

第三步：使用语法糖@来装饰函数

# -*- coding:gbk -*-
'''示例3: 使用语法糖@来装饰函数，相当于“myfunc = deco(myfunc)”
但发现新函数只在第一次被调用，且原函数多调用了一次'''
 
def deco(func):
    print("before myfunc() called.")
    func()
    print("  after myfunc() called.")
    return func
 
@deco
def myfunc():
    print(" myfunc() called.")
 
myfunc()
myfunc()

第四步：使用内嵌包装函数来确保每次新函数都被调用

# -*- coding:gbk -*-
'''示例4: 使用内嵌包装函数来确保每次新函数都被调用，
内嵌包装函数的形参和返回值与原函数相同，装饰函数返回内嵌包装函数对象'''
 
def deco(func):
    def _deco():
        print("before myfunc() called.")
        func()
        print("  after myfunc() called.")
        # 不需要返回func，实际上应返回原函数的返回值
    return _deco
 
@deco
def myfunc():
    print(" myfunc() called.")
    return 'ok'
 
myfunc()
myfunc()




第五步：对带参数的函数进行装饰


# -*- coding:gbk -*-
'''示例5: 对带参数的函数进行装饰，
内嵌包装函数的形参和返回值与原函数相同，装饰函数返回内嵌包装函数对象'''
 def deco(func):
 	def _deco(a,b):
 		print("before myfunc() called.")
 		ret = func(a,b)
 		print("after myfunc() called.result:%s" % ret)
 		return ret
 	return _deco

 @deco
 def myfunc(a,b):
 	print("myfunc(%s,%s) called." %(a,b))
 	return a+b

 myfunc(1,2)

# 第六步：对参数数量不确定的函数进行装饰
# -*- coding:gbk -*-
'''示例6: 对参数数量不确定的函数进行装饰，
参数用(*args, **kwargs)，自动适应变参和命名参数'''

def deco(func):
	def _deco(*args,**kwargs):
		print("before %s called." %func._name__)
		ret = func(*args,**kwargs)
		print(" after %s called.result:%s" %(func.__name__.ret))
		return ret
	return _deco

@deco
def myfunc(a,b):
	print("myfunc(%s,%s) called" % (a,b))
	return a+b

@deco
def myfunc2(a, b, c):
    print(" myfunc2(%s,%s,%s) called." % (a, b, c))
    return a+b+c
 
myfunc(1, 2)
myfunc(3, 4)
myfunc2(1, 2, 3)
myfunc2(3, 4, 5)


第七步：让装饰器带参数

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
# -*- coding:gbk -*-
'''示例7: 在示例4的基础上，让装饰器带参数，
和上一示例相比在外层多了一层包装。
装饰函数名实际上应更有意义些'''
 
def deco(arg):
    def _deco(func):
        def __deco():
            print("before %s called [%s]." % (func.__name__, arg))
            func()
            print("  after %s called [%s]." % (func.__name__, arg))
        return __deco
    return _deco
 
@deco("mymodule")
def myfunc():
    print(" myfunc() called.")
 
@deco("module2")
def myfunc2():
    print(" myfunc2() called.")
 
myfunc()
myfunc2()

第八步：让装饰器带 类 参数

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
# -*- coding:gbk -*-
'''示例8: 装饰器带类参数'''
 
class locker:
    def __init__(self):
        print("locker.__init__() should be not called.")
         
    @staticmethod
    def acquire():
        print("locker.acquire() called.（这是静态方法）")
         
    @staticmethod
    def release():
        print("  locker.release() called.（不需要对象实例）")
 
def deco(cls):
    '''cls 必须实现acquire和release静态方法'''
    def _deco(func):
        def __deco():
            print("before %s called [%s]." % (func.__name__, cls))
            cls.acquire()
            try:
                return func()
            finally:
                cls.release()
        return __deco
    return _deco
 
@deco(locker)
def myfunc():
    print(" myfunc() called.")
 
myfunc()
myfunc()

第九步：装饰器带类参数，并分拆公共类到其他py文件中，同时演示了对一个函数应用多个装饰器

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
# -*- coding:gbk -*-
'''mylocker.py: 公共类 for 示例9.py'''
 
class mylocker:
    def __init__(self):
        print("mylocker.__init__() called.")
         
    @staticmethod
    def acquire():
        print("mylocker.acquire() called.")
         
    @staticmethod
    def unlock():
        print("  mylocker.unlock() called.")
 
class lockerex(mylocker):
    @staticmethod
    def acquire():
        print("lockerex.acquire() called.")
         
    @staticmethod
    def unlock():
        print("  lockerex.unlock() called.")
 
def lockhelper(cls):
    '''cls 必须实现acquire和release静态方法'''
    def _deco(func):
        def __deco(*args, **kwargs):
            print("before %s called." % func.__name__)
            cls.acquire()
            try:
                return func(*args, **kwargs)
            finally:
                cls.unlock()
        return __deco
    return _deco

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
# -*- coding:gbk -*-
'''示例9: 装饰器带类参数，并分拆公共类到其他py文件中
同时演示了对一个函数应用多个装饰器'''
 
from mylocker import *
 
class example:
    @lockhelper(mylocker)
    def myfunc(self):
        print(" myfunc() called.")
 
    @lockhelper(mylocker)
    @lockhelper(lockerex)
    def myfunc2(self, a, b):
        print(" myfunc2() called.")
        return a + b
 
if __name__=="__main__":
    a = example()
    a.myfunc()
    print(a.myfunc())
    print(a.myfunc2(1, 2))
    print(a.myfunc2(3, 4))








































































