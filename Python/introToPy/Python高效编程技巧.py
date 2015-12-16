Python高效编程技巧.py

1.0 字典推导和集合推导   Dictionary  Set   comprehensions

# 一个list comprehension就是一个更简短、简洁的创建一个list的方法。
>>> some_list = [1,2,3,4,5]
>>> another_list = [x + 1 for x in some_list]
>>> another_list
[1,2,3,4,5,6]

# 自从python 3.1 (甚至是Python 2.7)起，我们可以用同样的语法来创建集合和字典表：
>>> # Set Comprehensions
>>> some_list = [1,2,3,4,5,2,5,1,4,8]
>>> even_set = { x for x in some_list if x % 2 == 0}
>>> even_set
set([8,2,4])

>>> # Dict Comprehensions

>>> d = { x: x % 2 == 0 for x in range(1,11) }

>>> d
{1: False, 2: True, 3: False, 4: True, 5: False, 6: True, 7: False, 8: True, 9: False, 10: True}


# 这里另外一个值得注意的事情是集合的字面量表示法。我们可以简单的用这种方法创建一个集合：
>>> my_set = {1,2,1,2,3,4}
>>> my_set
set([1,2,3,4])


2.0    计数时使用Counter计数对象。

# 这听起来显而易见，但经常被人忘记。对于大多数程序员来说，数一个东西是一项很常见的任务，而且在大多数情况下并不是很有挑战性的事情——这里有几种方法能更简单的完成这种任务。

# Python的collections类库里有个内置的dict类的子类，是专门来干这种事情的：
>>> from collections import Counter
>>> c = Counter('hello world')

>>> c
Counter({'l': 3, 'o': 2, ' ': 1, 'e': 1, 'd': 1, 'h': 1, 'r': 1, 'w': 1})

>>> c.most_common(2)
[('l', 3), ('o', 2)]


3.0  漂亮的打印出JSON

# JSON是一种非常好的数据序列化的形式，被如今的各种API和web service大量的使用。使用python内置的json处理，可以使JSON串具有一定的可读性，但当遇到大型数据时，它表现成一个很长的、连续的一行时，人的肉眼就很难观看了。

# 为了能让JSON数据表现的更友好，我们可以使用indent参数来输出漂亮的JSON。当在控制台交互式编程或做日志时，这尤其有用：

>>> import json

>>> print(json.dumps(data))  # No indention
{"status": "OK", "count": 2, "results": [{"age": 27, "name": "Oz", "lactose_intolerant": true}, {"age": 29, "name": "Joe", "lactose_intolerant": false}]}

>>> print(json.dumps(data, indent=2))  # With indention

{
  "status": "OK",
  "count": 2,
  "results": [

    {
      "age": 27,
      "name": "Oz",

      "lactose_intolerant": true
    },
    {
      "age": 29,

      "name": "Joe",
      "lactose_intolerant": false
    }
  ]

}
# 同样，使用内置的pprint模块，也可以让其它任何东西打印输出的更漂亮。


4. 创建一次性的、快速的小型web服务

# 有时候，我们需要在两台机器或服务之间做一些简便的、很基础的RPC之类的交互。我们希望用一种简单的方式使用B程序调用A程序里的一个方法——有时是在另一台机器上。仅内部使用。

# 我并不鼓励将这里介绍的方法用在非内部的、一次性的编程中。我们可以使用一种叫做XML-RPC的协议 (相对应的是这个Python库)，来做这种事情。

# 下面是一个使用SimpleXMLRPCServer模块建立一个快速的小的文件读取服务器的例子
from SimpleXMLRPCServer import SimpleXMLRPCServer
def file_reader(file_name):
	with open(file_name,'r') as f:
		return f.read()

server = SimpleXMLRPCServer(('localhost',8000))
server.register_introspection_functions()

server.register_function(file_reader)

server.register_function(file_reader)

server.serve_forever()


# 客户端：
import xmlrpclib
proxy = xmlrpclib.ServerProxy('http://localhost:8000/')

proxy.file_reader('/tmp/secret.txt')

# 我们这样就得到了一个远程文件读取工具，没有外部的依赖，只有几句代码(当然，没有任何安全措施，所以只可以在家里这样做)。



5.0

 # Make a script both importable and executable

 if __name__ == '__main__':

# ######## ######## ######## #######
def main():
 print('Doing stuff in module', __name__)

if __name__ == '__main__':
 print('Executed from the command line')
 main()

$ python mymodule.py

Executed from the command line
Doing stuff in module __main__
>>> import mymodule
>>> mymodule.main()
Doing stuff in module mymodule



6.0    Test for “truthy” and “falsy” values
 if x:
 if not x:

# ######## ######## ######## #######


Example
 # GOOD
 name = 'Safe'
 pets = ['Dog', 'Cat', 'Hamster']
 owners = {'Safe': 'Cat', 'George': 'Dog'}
 if name and pets and owners:
 print('We have pets!')
 # NOT SO GOOD
 if name != '' and len(pets) > 0 and owners != {}:
 print('We have pets!')



7. Use in where possible

Contains:
 if x in items:
Iteration:
 for x in items:

# ######## ######## ######## #######


Example (contains)
 # GOOD
 name = 'Safe Hammad'
 if 'H' in name:
 print('This name has an H in it!')
 # NOT SO GOOD
 name = 'Safe Hammad'
 if name.find('H') != -1:
 print('This name has an H in it!')
● Using in to check if an item is in a sequence is clear and concise.
● Can be used on lists, dicts (keys), sets, strings, and your own classes by
implementing the __contains__ special method.



Example (iteration)
 # GOOD
 pets = ['Dog', 'Cat', 'Hamster']
 for pet in pets:
 print('A', pet, 'can be very cute!')
 # NOT SO GOOD
 pets = ['Dog', 'Cat', 'Hamster']
 i = 0
 while i < len(pets):
 print('A', pets[i], 'can be very cute!')
 i += 1
● Using in to for iteration over a sequence is clear and concise.
● Can be used on lists, dicts (keys), sets, strings, and your own classes by
implementing the __iter__ special method.



7. Swap values without temp variable
 a, b = b, a

# ######## ######## ######## #######


 # GOOD
 a, b = 5, 6
 print(a, b) # 5, 6
 a, b = b, a
 print(a, b) # 6, 5

 # NOT SO GOOD
 a, b = 5, 6
 print(a, b) # 5, 6

 temp = a
 a = b
 b = temp
 print(a, b) # 6, 5


9. Build strings using sequence

 ''.join(some_strings)

# ######## ######## ######## #######

# GOOD
 chars = ['S', 'a', 'f', 'e']
 name = ''.join(chars)
 print(name) # Safe
 # NOT SO GOOD
 chars = ['S', 'a', 'f', 'e']
 name = ''
 for char in chars:
 name += char
 print(name) # Safe
● The join method called on a string and passed a list of strings takes
linear time based on length of list.
● Repeatedly appending to a string using '+' takes quadratic time!



10.0  EAFP is preferable to LBYL
"It's Easier to ask for forgiveness than permission"
"Look Before you leap"

try:	v. 	 if ...:
except

# ######## ######## ######## #######

Example
# GOD
d = {'x':'5'}
try:
	value = int(d['x'])
except (KeyError,TypeError,ValueError):
	value = None

# NOT SO GOOD
d = {'x':'5'}
if 'x' in d and \
	isinstance(d['x'],str) and \
	d['x'].isdigit():
	  value = int(d['x'])
else:
	value = None


11   Enumerate
for i, item in enumerate(items):

# ######## ######## ######## #######

Example
# GOD
names = ['Safe','George','Mildred']
for i,name in enumerate(names):
	print(i,name)  # 0 Safe, 1 George etc.

# NOT SO GOOD
names = ['Safe','George','Mildred']
count = 0
for name in names:
	print(i,name)  
	count += 1


12     8. Build lists using list comprehensions

[i * 3 for i in data if i > 10]

# ######## ######## ######## #######


Example
 # GOOD
 data = [7, 20, 3, 15, 11]
 result = [i * 3 for i in data if i > 10]
 print(result) # [60, 45, 33]
 # NOT SO GOOD (MOST OF THE TIME)
 data = [7, 20, 3, 15, 11]
 result = []
 for i in data:
 if i > 10:
 result.append(i * 3)
 print(result) # [60, 45, 33]
● Very concise syntax.
● Be careful it doesn't get out of hand (in which case the second form
can be clearer).



13     Create dict from keys and values using zip

d = dict(zip(keys, values))

# ######## ######## ######## #######

Example
 # GOOD
 keys = ['Safe', 'Bob', 'Thomas']
 values = ['Hammad', 'Builder', 'Engine']
 d = dict(zip(keys, values))
 print(d) # {'Bob': 'Builder',
 'Safe': 'Hammad',
'Thomas': 'Engine'}
 # NOT SO GOOD
 keys = ['Safe', 'Bob', 'Thomas']
 values = ['Hammad', 'Builder', 'Engine']
 d = {}
 for i, key in enumerate(keys):
 d[keys] = values[i]
 print(d) # {'Bob': 'Builder',
 'Safe': 'Hammad',
'Thomas': 'Engine'}
● There are several ways of constructing dicts!



10. And the rest … !
● while True:
 break # This will spark discussion!!!
● Generators and generator expressions.
● Avoid from module import *
Prefer: import numpy as np; import pandas as pd
● Use _ for “throwaway” variables e.g.:
for k, _ in [('a', 1), ('b', 2), ('c', 3)]
● dict.get() and dict.setdefault()
● collections.defaultdict
● Sort lists using l.sort(key=key_func)











