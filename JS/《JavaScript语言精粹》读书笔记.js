《JavaScript语言精粹》读书笔记.js
//对象字面量
var empty_object = {};

var stooge = {
	"first-name":"Jerome",
	"last-name":"Howard"
};
//
var flight = {
	airline:"Oceanic",
	number:815,
	departure:{
		IATA:"SYD",
		time:"2004-09-22 14:55",
		city:"Sydney"
	},
	arrival:{
		IATA:"LAX",
		time:"2003-09-22 14:55",
		city:"Los Angeles"
	}
};
//枚举
var name;
for(name in another_stooge){
	if(typeof another_stooge[name]!== 'function'){
		document.writeln(name + ':' + another_stooge[name]);
	}
}

//
var i;
var properties = [
	'first-name',
	'middle-name',
	'last-name',
	'profession'
];
for (i = 0;i < properties.length;i += 1){
	document.writeln(properties[i] + ':' + another_stooge[properties[i]]);
}

//最小化使用全局变量的方法之一就是为你的应用只创建一个唯一的全局变量
var MYAPP = {};

MYAPP.stooge = {

}
MYAPP.flight ={

}
//函数字面量
//创建一个名为add的变量，并用来把两个数字相加的函数赋值给它
var add = function(a,b){
	return a + b;
};

//方法调用模式
//创建myObject对象，它有一个 value 属性和一个 increment 方法；
//increment方法接受一个可选的参数，如果参数不是数字，那么默认使用数字1。
var myObject = {
	value:0,
	increment:function(inc){
		this.value += typeof inc === 'number' ? inc : 1;
	}
};
myObject.increment();
document.writeln(myObject.value);	//1

myObject.increment(2);
document.writeln(myObject.value);	//3


//函数调用模式
myObject.double = function(){
	var that = this;	//解决方法

	var helper = function(){
		that.value = add(that.value,that.value);
	};
	helper();		//以函数的形式调用helper
};
//以方法的形式调用double
myObject.double();
document.writeln(myObject.value);	//6


//构造器调用模式
//创建一个名为Quo的构造器函数，它构造一个带有status属性的对象
var Quo = function(string){
	this.status = string;
};
//给Quo的所有实例提供一个名为get——status的公共方法
Quo.prototype.get_status = function(){
	return this.status;
};
//构造一个Quo
var myQuo = new("confused");
document.writeln(myQuo.get_status());	//打印显示“confused”


//Apply调用方式
//构造一个包含两个数字的数组，并将它们相加
var array = [3,4];
var sum = add.apply(null,array);
//构造一个包含status成员的对象
var statusObject = {
	status:'A-OK'
};
//statusObject并没有继承自Quo.prototype,但我们可以在statusObject上调用get_status方法，尽管statusObject并没有一个名为get_status的方法
var status = Quo.prototype.get_status.apply(statusObject);
	//status值为‘A-OK’.


//闭包
var myObject = (function(){
	var value = 0;

	return {
		increment:function(inc){
			value += typeof inc === 'number' ? inc : 1;
		},
		getValue:function(){
			return value;
		}
	}
}());


//定义一个函数，它设置一个DOM节点为黄色，然后把它渐变为白色
var fade = function(node){
	var level = 1;
	var step = function(){
		var hex = level.toString(16);
		node.style.backgroundColor = '#FFFF' + hex + hex;
		if (level < 15) {
			level += 1;
			setTimeout(step,100);
		};
	}
	setTimeout(step,100);
}
fade(document.body);

//回调
request = prepare_the_request();
send_request_asynchronously(request,function(response){
	display(response);
});

//模块
String.method('deentityify',function(){
	//字符实体表，它映射字符实体的名字到对应的字符
	var entity = {
		quot:'"',
		lt:'<',
		gt:'>'
	};
	//返回deentityify方法
	return function(){
	//这才是deentityify方法，它调用字符串的replace方法
	//查找‘&’开头和‘;’结束的子字符串，如果这些字符可以在字符实体表中找到，呢么就将该字符实体替换为映射表中的值，他用到了一个正则表达式

	return this.replace(/&([^$;]+);/g),
		function(a,b){
			var r = entity[b]{
				return typeof r === 'string' ? r : a;
			}
		};
	};
}());


//函数化
//这是一个函数化构造器的伪代码模板
var constructor = function(spec,my){
	var that,其他的私有实例变量;
	my = my || {};
	把共享的变量和函数添加到my中
	that = 一个新对象
	添加给that的特权方法
	return that;
};


//部件
var eventuality = function(that){
	var registry = {};

	that.fire = function(event){
		var array,
			func,
			handler,
			i,
			type = typeof event === 'string' ? event : event.type;

		if (registry.hasOwnProperty(type)) {
			array = registry[type];
			for(i = 0;i < array.length;i += 1){
				handler = array[i];

				func = handler.method;
				if (typeof func === 'string') {
					func = this[func];
				};

				func.apply(this,handler.parameters || [event]);
			}
		};
		return this;
	}

	that.on = function(type,method,parameters){
		var handler = {
			method:method,
			parameters:parameters
		};
		if (registry.hasOwnProperty(type)) {
			registry[type].push(handler);
		}else{
			registry[type] = [handler];
		};
		return this;
	}
	return that;
};

//方法
//array.contat(item...)
var a = ['a','b','c'];
var b = ['x','y','z'];
var c = a.concat(b,true);
//c 变成 ['a','b','c','x','y','z',true]

//array.join(separator)
var a = ['a','b','c'];
a.push('d');
var c = a.join('');		//c是'abcd';

//array.pop()
var a = ['a','b','c'];
var c = a.pop();		
//
Array.method('pop',function(){
	return this.splice(this.length - 1,1)[0];
});

//array.push(item...)
var a = ['a','b','c'];
var b = ['x','y','z'];
var c = a.push(b,true);
//a是['a','b','c',['x','y','z'],true]
//
Array.method('push',function(){
	this.splice.apply(
		this,
		[this.length,0].concat(Array.prototype.slice.apply(arguments)));
	return this.length;
});

//array.reverse()
var a = ['a','b','c'];
var b = a.reverse();
//a 和 b 都是['c','b','a']

//array.shift()
var a = ['a','b','c'];
var b = a.shift();		//a 是['b','c'] & c 是 'a'
//
Array.method('shift',function(){
	return this.splice(0,1)[0];
});

//array.slice(start,end)


//array.sort(comparefn)
var n = [4,8,15,16,23,42];
n.sort();
//n 是[15,16,23,4,42,8]
n.sort(function(a,b){
	return a - b;
});
//n 是[4,8,15,16,23,42]
//
var m = ['aa','bb','a',4,8,15,16,23,42];
m.sort(function(a,b){
	if (a === b) {
		return 0;
	}
	if (typeof a === typeof b) {
		return a < b ? -1 : 1;
	}
	return typeof a < typeof b ? -1 : 1;
});
//m 是 [4,8,15,16,23,42,'a','aa','bb'];

//构造比较函数的函数，使对象数组排序
//by 函数接受一个成员名字符串作为参数，并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
var by = function(name){
	return function(o,p){
		var a,b;
		if (typeof o === 'object' && typeof p === 'object' && o && p) {
			a = o[name];
			b = p[name];
			if (a === b) {
				return 0;
			};
			if (typeof a === typeof b) {
				return a < b ? -1 : 1;
			};
			return typeof a < typeof b ? -1 : 1;
		}else{
			throw{
				name:'Error',
				message:'Expected an object when sorting by' + name
			}
		};
	}
}

var s = [
	{first:'Joe',lase:'Besser'},
	{first:'Moe',lase:'Howard'},
	{first:'Joe',lase:'DeRita'},
	{first:'Shemp',lase:'Howard'},
	{first:'Larry',lase:'Fine'},
	{first:'Curry',lase:'Howard'},
];

s.sort(by('first'));		//s 是 []
//sort方法是不稳定的，所以下面调用
s.sort(by('first')).sort(by('last'));



//array.splice(start,deleteCount,item...)
//array.unshit(item...)

Function
//1.0 function.apply(thisArg,argArray)
Function.method('bind',function(that){
	//返回一个函数，调用这个函数就像调用那个对象的一个方法
	var method = this,
		slice = Array.prototype.slice,
		args = slice.apply(arguments,[i]);
	return function(){
		return method.apply(that,args.concat(slice.apply(arguments,[0])));
	}
})

var x = function(){
	return this.value;
}.bind({value:666});
alert(x());	//666


Number
//number.toExponential(fractionDigits)




















