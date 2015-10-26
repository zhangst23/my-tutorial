ES6.js
// 章节2.let和const命令
//let命令，用来声明变量，用法类似于var，但是所声明的变量只是在let命令所在的代码块内有效
{
	let a = 10;
	var b = 1;
}
a //ReferenceError:a is not defined
b //1

//for循环的计数器
for(let i = 0;i < arr.length;i++){}

console.log(i)

//rest参数
// ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10

//################################# 8.函数的扩展


//arguments变量的写法
const sortNumbers = () => Array.prototype.slice.call(arguments).sort();
//rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

//利用rest参数改写push方法的例子
function push(array,...items){
	items.forEach(function(item){
		array.push(item);
		console.log(item);
	});
}
var a = [];
push(a,1,2,3)

//rest参数之后不能再有其他参数
//报错
function f(a,...b,c){
	//...
}

//函数的length属性，不包括rest参数
(function(a){}).length	//1
(function(...a){}).length	//0
(function(a,...b){}).length	//1

//3.扩展运算符，它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列
//该运算符主要用于函数调用
function push(array,...items){
	array.push(...items);
}
function add(x,y){
	return x + y;
}
var numbers = [4,38];
add(...numbers)	//42

//由于扩展运算符可以展开数组，所以不需要apply方法，将数组转为函数的参数了
//ES5的写法
function f(x,y,z){}
var args = [0,1,2];
f.apply(null,args);
//ES6的写法
function f(x,y,z){}
var args = [0,1,2];
f(...args);

//应用Math.max方法，简化求出一个数组最大元素的写法
//ES5的写法
Math.max.apply(null,[14,3,77])
//ES6的写法
Math.max(...[14,3,77])
//等同于
Math.max(14,3,77);


//扩展运算符和正常的函数参数可以结合使用，非常灵活
function f(v,w,x,y,z){ }
var args = [0,1];
f(-1,...args,2,...[3]);

//扩展运算符可以简化很多ES5的写法
//ES5
[1,2].concat(more)
//ES6
[1,2,...more]

//ES5
list.push.apply(list,[3,4])
//ES6
list.push(...[3,4])

//ES5
a = list[0],rest = list.slice(1)
//ES6
[a,...rest] = list


//ES5
new (Date.bind.apply(Date,[null,2015,1,1]))
//ES6
new Date(...[2015,1,1]);



//4.name属性
function foo(){}
foo.name 	//"foo"

//只有具名函数才有name这个属性，匿名函数是没有的
'name' in (function(){})
//false
'name' in (() => {})
//false

5.箭头函数
var f = v => v;
//上面的箭头函数等同于
var f = function(v){
	return v;
}

//如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分
var f = () => 5;
//等同于
var f = function(){ return 5 };

var sum = (num1,num2) => num1 + num2;
//等同于
var sum = function(num1,num2){
	return num1 + num2;
}


//如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回
var sum = (num1,num2) => { return num1 + num2;}

//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号
var getTempItem = id => ({ id:id,name:"Temp" });

//箭头函数可以与变量结构结合使用
const full = ({first,last}) => first + '' + last;
//等同于
function full(person){
	return person.first + '' + person.name;
}

//箭头函数使得表达更加简洁
const isEven = n => n % 2 == 0;
const square = n => n * n;

//箭头函数的一个用处是简化回调函数
//正常写法
[1,2,3].map(function(x){
	return x * y;
});
//箭头写法
[1,2,3].map(x => x * x);

//正常写法
var result = values.sort(function(a,b){
	return a - b;
});
//箭头写法
var result = values.sort((a,b) => a - b);

//rest参数和箭头函数结合的例子
const numbers = (...nums) => nums;

numbers(1,2,3,4,5)
//[1,2,3,4,5]

const headAndTail = (head,...tail) => [head,tail];

headAndTail(1,2,3,4,5)
//[1,[2,3,4,5]]

//注意：函数体内的this对象，绑定定义时所在的对象，而不是使用时所在的对象。（this对象的指向是可变的，但是在箭头函数中，它是固定的）
[1,2,3].map(n => n * 2);
//等同于
[1,2,3].map(function(n){ return n * 2; },this);


//嵌套的箭头函数
//ES5语法的多重嵌套函数
function insert(value){
	return {into:function(array){
		return{after:function(afterValue){
			array.splice(array.indexOf(afterValue) + 1,0,value);
			return array;
		}};
	}};
}
insert(2).into([1,3]).after(1);		//[1,2,3]
//箭头函数改写
let insert = (value) => ({into:(array) => ({after:(afterValue) => {
	array.splice(array.indexOf(afterValue) + 1,0,value);
	return array;
}})});
insert(2).into([1,3]).after(1);		//[1,2,3]


6.函数绑定

// 函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

foo::bar;
//等同于
bar.call(foo);

foo::bar(...arguments);
i//等同于
bar.apply(foo,arguments);

const hasOwnProperty = object.prototype.hasOwnProperty;
function hasOwn(obj,key){
	return obj::hasOwnProperty(key);
}

// 如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。
var method = obj::obj.foo;
//等同于
var method = ::obj.foo;

let log = ::console.log;
//等同于
var log = console.log.bind(console); 

// 由于双冒号运算符返回的还是原对象，因此可以采用链式写法。
//eg1
import { map,takeWhile,forEach }from "iterlib";

getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));

//eg2
let { find,html } = jake;

document.querySelectorAll("div.myClass")
::find("p")
::html("hahaha");


7.尾调用优化
// 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
function f(x){
	return g(x);
}

// 上面代码中，函数f的最后一步是调用函数g，这就叫尾调用。

// 以下三种情况，都不属于尾调用。
//情况一:调用函数g之后，还有赋值操作，所以不属于尾调用，即使语义完全一样
function f(x){
	let y = g(x);
	return y;
}
//情况二：属于调用后还有操作，即使写在一行内。
function f(x){
	return g(x) + 1;
}

//情况三
function f(x){
	g(x);
}
//情况三等同于下面的代码。

function f(x){
  g(x);
  return undefined;
}

// 尾调用不一定出现在函数尾部，只要是最后一步操作即可。
function f(x){
	if(x > 0){
		return m(x)
	}
	return n(x);
}


// 尾递归
// 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

function factorial(n){
	if(n === 1)return 1;
	return n * factorial(n - 1);
}
factorial(5)	//120

// 上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。

// 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // 120


//################################# 9.对象的扩展
2.属性名表达式
//
obj.foo = true;
//
obj['a' + 'bc'] = 123;

//
var obj = {
	foo:true;
	abc:123
};


//
var foo = 'bar';
var baz = { [foo]:'abc' };


3.方法的name属性
var person = {
	sayName:function(){
		console.log(this.name);
	},
	get firstName(){
		return "Nicholas"
	}
}
person.sayName.name   //"sayName"
person.firstName.name  //"get firstName"




























