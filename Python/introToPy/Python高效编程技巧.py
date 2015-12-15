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
同样，使用内置的pprint模块，也可以让其它任何东西打印输出的更漂亮。


























































































