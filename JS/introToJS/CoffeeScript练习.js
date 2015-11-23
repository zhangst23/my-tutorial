# 赋值:
number = 41
opposite = true

# 条件
number = -42 if opposite

# 函数
square = (x) -> x * x

#数组
list = [1,2,3,4,5]

# 对象
math = 
  root: Math.sqrt
  square: square
  cube: (x) -> x * square x

# Splats:
race = (winner,runners...) ->
  print winner,runners

# 存在性
alert "I knew it!" if elvis?

# 数组 推导
cubes = (math.cube num for num in list)
//函数
fill = (container,liquid = "coffee") ->
  "Filling the #{container} with #{liquid}..."

//对象和数组
song =["do","re","mi","fa","so"]

singers = {Jagger:"Rock",Elvis:"Roll"}

bitlist = [
	1,0,1
	0,0,1
	1,1,0
]

kids = 
  brother:
    name:"Max"
    age:11
  sister:
    name:"Ida"
    age:9


//
$('.account').attr class:'active'

log object.class

//词法作用域和变量安全
outer = 1
changeNumbers = ->
  inner = -1
  outer = 10
inner = changeNumbers()

//if,else,unless 和条件赋值
mood = greatlyImproved if singing

if happy and knowsIt
  clapsHands()
  chaChaCha()
else
  showIt()
date = if friday then sue else jill

//变参
gold = silver = rest = "unknown"

awardMedals = (first,second,others...) ->
  gold = first
  silver = second
  rest = others

contenders = [
  "Michael Phelps"
  "Liu Xiang"
  "Yao Ming"
  "Allyson Felix"
  "Roman Sebrle"
]

awardMedals contenders...

alert "Gold:" + gold
alert "Silver:" + silver
alert "The Field:" + rest

//循环和推导式
//吃午饭
eat food for food in ['toast','cheese','wine']
//精致的五道菜
course = ['greens','caviar','truffles','roast','cake']
menu i + 1, dish for dish, i in courses
//注重健康的一餐
foods = ['broccoli','spinach','chocolate']
eat food for food in foods isnt 'chocolate'

countdown = (num for num in [10..1])

//
yearsOld = max: 10, ida:9, tim:11

ages = for child, age of yearsOld
  "#{child} is #{age}"


// 
if this.studyingEconomics
  buy() while supply > demand
  sell() until supply > demand

//
num = 6
lyrics = while num -= 1
  "#{num} little monkeys,jumping on the bed. One fell out and bumped his head."

//
for filename in list
  do (filename) ->
    fs.rendFile filename,(err,contents) ->
      compile filename,contents.toString()

//数组的切片和用range进行拼接
numbers = [1,2,3,4,5,6,7,8,9]

start = numbers[0..2]

middle = numbers[3...-2]

end = numbers[-2..]

copy = numbers[..]

//
numbers = [1,2,3,4,5,6,7,8,9]
numbers[3..6] = [-3, -4, -5, -6]

//一切都是表达式
grade = (student) ->
  if student.excellentWork
    "A+"
  else if student.okayStuff
  	if student.triedHard then "B" else "B-"
  else
  	"C"
eldest = if 24 > 21 then "Liz" else "Ike"

//
six = (one = 1) + (two = 2) + (three = 3)

//前十个全局属性（变量）
globals = (name for name of window)[0...10]

//
alert(
  try
    nonexistent / underfined
  catch error
    "And the error is ... #{error}"
)

//操作符和aliase

launch() if ignition is on

volume = 10 if band isnt SppinalTap

letTheWildRumpusBegin() unless answer is no

if car.speed < limit then accelerate()

winner = yes if pick in [47,92,13]

print inspect "My name is #{@name}"

//存在性操作符
solipsism = true if mind? and not world?

speed = 0

speed ?= 15

footprints = yeti ? "bear"

//
zip = lottery.drawWinner?().address?.zipcode


//class,继承，super
class Animal
  constructo:(@name) ->

  move:(meters) ->
    alert @name + " moved #{meters}m."

class Snake extends Animal
  move: ->
    alert "Slithering..."
    super 5

class Horse extends Animal
  move: ->
    alert "Galloping..."
    super 45

sam = new Snake "Sammy the Python"
tom = new Horse "Tommy the Palomino"

sam.move()
tom.move()

//解构赋值
theBait = 1000
theSwitch = 0

[theBait,theSwitch] = [theSwitch,theBait]

//
weatherReport = (location) ->
  #发起一个Ajax请求获取天气
  [location,72,"Mostly Sunny"]

[city,temp,forecast] = weatherReport "Berkeley,CA"

//








































