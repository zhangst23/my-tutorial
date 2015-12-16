Style Guide for Python Code.py
来源：https://www.python.org/dev/peps/pep-0008/

1.0   Indentation
# Use 4 spaces per indentation level.

# Continuation lines should align wrapped elements either vertically using Python's implicit line joining inside parentheses, brackets and braces, or using a hanging indent [5] . When using a hanging indent the following considerations should be applied; there should be no arguments on the first line and further indentation should be used to clearly distinguish itself as a continuation line.

Yes:

# Aligned with opening delimiter.
foo = long_function_name(var_one, var_two,
                         var_three, var_four)

# More indentation included to distinguish this from the rest.
def long_function_name(
        var_one, var_two, var_three,
        var_four):
    print(var_one)

# Hanging indents should add a level.
foo = long_function_name(
    var_one, var_two,
    var_three, var_four)
No:

# Arguments on first line forbidden when not using vertical alignment.
foo = long_function_name(var_one, var_two,
    var_three, var_four)

# Further indentation required as indentation is not distinguishable.
def long_function_name(
    var_one, var_two, var_three,
    var_four):
    print(var_one)





2.Imports
Imports should usually be on separate lines, e.g.:

Yes: import os
     import sys

No:  import sys, os
It's okay to say this though:

from subprocess import Popen, PIPE



3.
from . import sibling
from .sibling import example



4

Pet Peeves
Avoid extraneous whitespace in the following situations:

Immediately inside parentheses, brackets or braces.

Yes: spam(ham[1], {eggs: 2})
No:  spam( ham[ 1 ], { eggs: 2 } )
Immediately before a comma, semicolon, or colon:

Yes: if x == 4: print x, y; x, y = y, x
No:  if x == 4 : print x , y ; x , y = y , x
However, in a slice the colon acts like a binary operator, and should have equal amounts on either side (treating it as the operator with the lowest priority). In an extended slice, both colons must have the same amount of spacing applied. Exception: when a slice parameter is omitted, the space is omitted.

Yes:

ham[1:9], ham[1:9:3], ham[:9:3], ham[1::3], ham[1:9:]
ham[lower:upper], ham[lower:upper:], ham[lower::step]
ham[lower+offset : upper+offset]
ham[: upper_fn(x) : step_fn(x)], ham[:: step_fn(x)]
ham[lower + offset : upper + offset]
No:

ham[lower + offset:upper + offset]
ham[1: 9], ham[1 :9], ham[1:9 :3]
ham[lower : : upper]
ham[ : upper]
Immediately before the open parenthesis that starts the argument list of a function call:

Yes: spam(1)
No:  spam (1)
Immediately before the open parenthesis that starts an indexing or slicing:

Yes: dct['key'] = lst[index]
No:  dct ['key'] = lst [index]
More than one space around an assignment (or other) operator to align it with another.

Yes:

x = 1
y = 2
long_variable = 3
No:

x             = 1
y             = 2
long_variable = 3


5


Other Recommendations
Always surround these binary operators with a single space on either side: assignment ( = ), augmented assignment ( += , -= etc.), comparisons ( == , < , > , != , <> , <= , >= , in , not in , is , is not ), Booleans ( and , or , not ).

If operators with different priorities are used, consider adding whitespace around the operators with the lowest priority(ies). Use your own judgment; however, never use more than one space, and always have the same amount of whitespace on both sides of a binary operator.

Yes:

i = i + 1
submitted += 1
x = x*2 - 1
hypot2 = x*x + y*y
c = (a+b) * (a-b)
No:

i=i+1
submitted +=1
x = x * 2 - 1
hypot2 = x * x + y * y
c = (a + b) * (a - b)
Don't use spaces around the = sign when used to indicate a keyword argument or a default parameter value.

Yes:

def complex(real, imag=0.0):
    return magic(r=real, i=imag)
No:

def complex(real, imag = 0.0):
    return magic(r = real, i = imag)
Do use spaces around the = sign of an annotated function definition. Additionally, use a single space after the : , as well as a single space on either side of the -> sign representing an annotated return value.

Yes:

def munge(input: AnyStr):
def munge(sep: AnyStr = None):
def munge() -> AnyStr:
def munge(input: AnyStr, sep: AnyStr = None, limit=1000):
No:

def munge(input: AnyStr=None):
def munge(input:AnyStr):
def munge(input: AnyStr)->PosInt:
Compound statements (multiple statements on the same line) are generally discouraged.

Yes:

if foo == 'blah':
    do_blah_thing()
do_one()
do_two()
do_three()
Rather not:

if foo == 'blah': do_blah_thing()
do_one(); do_two(); do_three()
While sometimes it's okay to put an if/for/while with a small body on the same line, never do this for multi-clause statements. Also avoid folding such long lines!

Rather not:

if foo == 'blah': do_blah_thing()
for x in lst: total += x
while t < 10: t = delay()
Definitely not:

if foo == 'blah': do_blah_thing()
else: do_non_blah_thing()

try: something()
finally: cleanup()

do_one(); do_two(); do_three(long, argument,
                             list, like, this)

if foo == 'blah': one(); two(); three()












































































