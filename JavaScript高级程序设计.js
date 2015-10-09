
//LogicalAndExample01.html
var found = true;
var result (found && someUndefinedVariable);
alert(result);

//LogicalAndExample02.html
var found = false;
var result = (found && someUndefinedVariable);
alert(result);

//IfStatementExample01.html
if (i > 25) {
	alert("Greater than 25.");
}else{
	alert("Less than or equal to 25.")
};

//IfStatementExample02.html
if (i > 25) {
	alert("Greater than 25.")
}else if(i < 0){
	alert ("Less than 0.")
}else{
	alert("Between 0 and 25,inclusive.")
};

//DoWhileStatementExample01.html
do{
	statement
} while (expression);

//
var i = 0;
do{
	i += 2;
}while(i < 10);

alert(i);

//WhileStatementExample01.html
var i = 0;
while(i < 10){
	i += 2;
}

//ForStatementExample01.html
var count = 10;
for (var i = 0;i < count;i++){
	alert(i);
}

//ForStatementExample04.html
var count = 10;
var i = 0;
for(;i < count; ){
	alert(i);
	i++;
}

//ForInStatementExample01.html
for (var propName in window){
	document.write(propName);
}

//BreakStatementExample01.html
var num = 0;
for(var i = 1;i < 10;i ++){
	if(i % 5 == 0){
		break;
	}
	num++;
}
alert(num);  //4

//ContinerStatementExample01.html
var num = 0;
for (var i = 1; i < 10; i++)
{
	if (i % 5 == 0) {
		continue;
	}
	num++;
}
alert(num);  //8

//BreakStatementExample02.html
var num = 0;

outermost:
for(var i = 0;i < 10;i++){
	for (var j=0;j < 10;j++){
		if (i == 5 && j == 5) {
			break outermost;
		}
		num++;
	}
}
alert(num);  //55

//WithStatementExample01.html
with(location){
	var qs = search.substring(1);
	var hostName = hostName;
	var url = href;
}

//FunctionExample01.html
function sayHi(name,message){
	alert("Hello" + name + "," + message);
}

//FunctionExample02.html
function sum(num1,num2){
	return num1 + num2;
}

//FunctionExample03.html
function diff(num1,num2){
	if(num1 < num2){
		return num2 - num1;
	}else{
		return num1 - num2;
	}
}

//FunctionExample06.html
function howManyArgs(){
	alert(argument.length);
}
howManyArgs("string",45);
howManyArgs();
howManyArgs(12);

//FunctionExample07.html
function doAdd(){
	if(arguments.length == 1){
		alert(arguments[0] + 10);
	}else if (arguments.length == 2){
		alert(argument[0] + arguments[1]);
	}
}
doAdd(10);
doAdd(30,20);

//FunctionExample09.html
function doAdd(num1,num2){
	arguments[1] = 10;
	alert(arguments[0] + num2);
}

//FunctionExample10.html
function addSomeNumber(num){
	return num + 100;
}
function addSomeNumber(num){
	return num + 200;
}
var result = addSomeNumber(100);   //300


//DynamicPropertiesExample01.html
var person = new Object();
person.name = "Nicholas";
alert(person.name);   //"Nicholas"

//DynamicPropertiesExample02.html
var name ="Nicholas";
name.age = 27;
alert(name.age);    //undefined

//FunctionArgumentExample01.html
function addTen(num){
	num += 10;
	return num;
}
var count = 20;
var result = addTen(count);
alert(count);	//20
alert(result); 	//30

//FunctionArgumentExample02.html
function setName(obj){
	obj.name = "Nicholas";
}
var person = new Object();
setName(person);
alert(person.name); 	//"Nicholas"

//ExecutionContextExample01.html
var color = "blue";
function changeColor(){
	if (color === "blue") {
		color = "red";
	}else{
		color = "blue";
	};
}
changeColor();
alert("Color is now " + color);

//ExecutionContextExample02.html
var color ="blue";
function changeColor(){
	var anotherColor = "red";

	function swapColors(){
		var tempColor = anotherColor;
		anotherColor = color;
		color = tempColor
	}
}

//ExecutionContextExample03.html
function buildUrl(){
	var qs = "?debug= true";

	with(location){
		var url = href + qs;
	}

	return url;
}

//ExecutionContextExample04.html
function add(num1,num2){
	var sum = num1 + num2;
	return sum;
}

var result = add(10,20);  //30
alert(sum);

//ExecutionContextExample05.html
function add(num1,num2){
	sum = num1 + num2;
	return sum;
}
var result = add(10,20);   //30
alert(sum);					//30

//在编写JavaScript代码的过程中，不声明而直接初始化变量是一个常见的错误做法，因为这样可能会导致意外。
//我们建议在初始化变量之前，
//一定要先声明，这样就可以避免类似问题，在严格模式下，初始化未经声明的变量会导致错误

//ExecutionContextExample06.html
var color ="blue";

function getColor(){
	return color;
}
alert (getColor());  //"blue"

//ObjectTypeExample01.html
var person = new Object();
person.name = "Nicholas";
person.age = 29;

//ObjectTypeExample02.html
var person = {
	name:"Nicholas",
	age:29
};

//在通过对象字面量定义对象时，实际上不会调用Object构造函数
//ObjectTypeExample04.html
function displayInfo(args){
	var output = "";

	if (typeof args.name == "string") {
		output += "Name:" + args.name + "\n";
	}
	if (typeof args.age == "number") {
		output += "Age:" + args.age + "\n";
	}
	alert(output);
}
displayInfo({
	name:"Nicholas",
	age:29
});
displayInfo({
	name:"Greg"
});
//这种传递参数的模式最适合需要向函数传入大量可选参数的情形，一般来讲，命名参数虽然容易处理，但在有多个可选参数
//的情况下就会显示不够灵活，最好的做法是对那些必需值使用命名参数，而使用对象字面量来封装多个可选参数


//ArrayTypeExample01.html
var colors = new Array(3);
var names = new Array("Greg");
//ArrayTypeExample02.html
var colors = ["red","blue","green"];
var names = [];
var values = [1,2,];
var options = [,,,,,];

//ArrayTypeExample03.html
var colors = ["red","blue","green"];
colors.length = 4;
alert(colors[3]);

//ArrayTypeExample04.html
var colors = ["red","blue","green"];
colors[colors.length] = "black";
colors[colors.length] = "brown";

//ArrayTypeExample07.html
var colors = ["red","blue","green"];
alert(colors.toString());
alert(colors.valueOf());
alert(colors);

//ArrayTypeExample08.html
var person1 = {
	toLocaleString : function(){
		return "Nicholas";
	},

	toString : function(){
		return "Nikolaos";
	}
};

var person2 = {
	toLocaleString : function(){
		return "Grigorios";
	},

	toString : function(){
		return "Greg";
	}
}

var people = [person1,person2];
alert(people);
alert(people.toString());
alert(people.toLocaleString());

//ArrayTypeJoinExample01.html
var colors = ["red","blue","green"];
alert(colors.join(","));
alert(colors.join("||"));

//ArrayTypeExample09.html
var colors = new Array();
var count = colors.push("red","green");
alert(count);		//2

count = colors.push("black");
alert(count);		//3

var item = colors.pop();
alert(item);				//"black"
alert(colors.length);		//2

//ArrayTypeExample10.html
var colors = ["red","blue"];
colors.push("brown");
colors[3] = "black";
alert(colors.length);

var item = colors.pop();
alert(item);

//ArrayTypeExample11.html
var colors = new Array();
var count = colors.push("red","green");
alert(count);

count = colors.push("black");
alert(count);

var item = colors.shift();
alert(item);
alert(colors.length);

//ArrayTypeExample12.html
var values = [1,2,3,4,5];
values.reverse();
alert(values);
//
var values = [0,1,5,10,15];
values.sort();
alert(values);

//ArrayTypeExample15.html
function compare(value1,value2){
	if(value1 < value2){
		return -1;
	}else if(value1 > value2){
		return 1;
	}else{
		return 0;
	}
}

var values = [0,1,5,10,15];
values.sort();
alert(values);     //0,1,5,10,15

//reverse()和sort()方法的返回值是经过排序之后的数组
//ArrayTypeSpliceExample01.html
var colors = ["red","green","blue"];
var removed = colors.splice(0,1);
alert(colors);
alert(removed);

removed = colors.splice(1,0,"yellow","orange");
alert(colors);
alert(removed);

removed = colors.splice(1,1,"red","orange");
alert(colors);
alert(removed);

//ArrayEveryAndSomeExample01.html
var numbers = {1,2,3,4,5,4,3,2,1};
var everyResult = numbers.every(function(item,index,array){
	return (item > 2);
});
alert(everyResult);		//false

var someResult = numbers.some(function(item,index,array){
	return (item > 2);
});
alert(someResult);			//true

//ArrayFilterExample01.html
var numbers = [1,2,3,4,5,4,3,2,1];
var filterResult = numbers.filter(function(item,index,array){
	return (item > 2);
});
alert(filterResult);		//[3,4,5,4,3]

//ArrayMapExample01.html
var numbers = [1,2,3];
var mapResult = numbers.map(function(item,index,array){
	return item * 2;
});
alert(mapResult);	//[2,4,6]

//ArrayReductionExample01.html
var values = [1,2,3];
var sum = value.reduce(function(prev,cur,index,array){
	return prev + cur;
});
alert(sum);

//DateTypeExample01.html
var someDate = new Date(Date.parse("May 25,2004"));
var someDate = new Date("May 25,2004");

//FunctionTypeExample01.html
function sum(num1,num2){
	return num1 + num2;
}
alert(sum(10,10));

var anotherSum = sum;
alert(anotherSum(10,10));	//20

sum = null;
alert(anotherSum(10,10)).	//20

//FunctionAsAnArgumentExample01.html
function add10(num){
	return num + 10;
}
var result = callSomeFunction(add10,10)
alert(result1);	//20

function getGreeting(name){
	return "Hello," + name;
}

var result2 = callSomeFunction(getGreeting,}Nicholas);
alert(result2);			//Hello,Nicholas

//FunctionReturningFunctionExample01.html
function createComparisonFunction(propertyName){
	return function(object1,object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];

		if (value1 < value2) {
			return -1;
		}else if(value1 > value2){
			return 1;
		}else{
			return 0;
		};
	}
}

//FunctionTypeArgumentExample01.html
function factorial(num){
	if (num <= 1) {
		return 1;
	}else{
		return num * arguments.callee(num-1)
	};
}

//FunctionTypeThisExample01.html
window.color = "red";
var o = { color:"blue" };

function sayColor(){
	alert(this.color);
}

sayColor();		//"red"
o.sayColor = sayColor;
o.sayColor();		//"blue"

// 请读者一定要牢记，函数的名字仅仅是一个包含指针的变量而已，因此，即使是在不同的环境中执行，全局的sayColor（）函数与
// sayColor()指向的仍然是同一个函数

function outer(){
	inner();
}
function inner(){
	alert(inner.caller);
}
outer();

//FunctionTypeLengthPropertyExample01.html
function sayName(name){
	alert(name);
}
function sum(num1,num2){
	return num1 + num2;
}
function sayHi(){
	alert("hi");
}
alert(sayName.length);		//1
alert(sum.length);			//2
alert(sayHi.length);		//0


//FunctionTypeApplyMethodExample01.html
function sum(num1,num2){
	return num1 + num2;
}
function callSum1(num1,num2){
	return sum.apply(this,arguments);		//传入arguments对象
}
function callSum2(num1,num2){
	return sum.apply(this,[num1,num2]);
}
alert(callSum1(10,10));		//20
alert(callSum2(10,10));		//20

//FunctionTypeCallExample01.html
window.color = "red";
var o = { color:"blue" };
function sayColor(){
	alert(this.color);
}
sayColor();			//red

sayColor.call(this);	//red
sayColor.call(window);	//red
sayColor.call(o);		//blue

//FunctionTypeBindMethodExample01.html
window.color = "red";
var o ={color:"blue"};

function sayColor(){
	alert(this.color);
}

var objectSayColor = sayColor.bind(o);
objectSayColor();		//blue

//MathObjectMinExample01.html
var max = Math.max(3,54,32,28);
alert(max);

var min = Math.min(3,54,32,19);
alert(min);

//CreatingObjectExample01.html
var person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";

person.sayName = function(){
	alert(this.name);
};

//CreatingObjectExample01.html
var person = {
	name:"Nicholas",
	age:29,
	job:"Software",

	sayName:function(){
		alert(this.name);
	}
}

//AccessorPropertiesExample01.html
var book = {
	_year:2004,
	edition:1
};
Object.defineProperty(book,"year",{
	get:function(){
		return this._year;
	},
	set:function(newValue){
		if(newValue > 2004){
			this._year = newValue;
			this.edition += newValue - 2004;
		}
	}
}),
book.year = 2005;
alert(book.edition);		//2

//MultiplePropertiesExample01.html
var book = {};
Object.defineProperties(book,{
	_year:{
		value:2004
	},
	edition:{
		value:1
	},
	year:{
		get:function(){
			return this._year;
		},
		set:function(newValue){
			if (newValue > 2004) {
				this._year = newValue;
				this.edition += newValue - 2004;
			}
		}
	}
})

var descriptor = Object.getOwnPropertyDescriptor(book,"_year");
alert(descriptor.value);		//2004
alert(descriptor.configurable);			//false
alert(typeof descroptor.get);		//"undefined"

var descriptor = Object.getOwnPropertyDescriptor(book,"year");
alert(descriptor.value);		//undefined
alert(descriptor.enumerable);		//false
alert(typeof descriptor.get)		//"function"

//FactoryPatternExample01.htm
function createPerson(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name);
	};
	return o;
}

var person1 = createPerson("Nicholas",29,"Software Engineer");
var person2 = createPerson("Greg",27,"Doctor");

//ConstructorPatternExample01.htm
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		alert(this.name);
	};
}

var person1 = new Person("Nicholas",29,"Software Engineer");
var person2 = new Person("Greg",27,"Doctor");

////ConstructorPatternExample02.htm
var person = new Person("Nicholas",29,"Software Engineer");
person.sayName();		//"Nicholas"

Person("Greg",27,"Doctor");
window.sayName();		//"Greg"

var o = new Object();
Person.call(o,"Kristen",25,"Nurse");
o.sayName();		//"Kristen"

////ConstructorPatternExample03.htm
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}
function sayName(){
	alert(this.name);
}
var person1 = new Person("Nicholas",29,"Software Engineer");
var person2 = new Person("Greg",27,"Doctor");

//PrototypePatternExample01.htm
function Person(){

}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
	alert(this.name);
}

var person1 = new Person();
person1.sayName();		//"Nicholas"

var person2 = new Person();
person2.sayName();		//"Nicholas"

alert(person1.sayName == person2.sayName);		//true

//PrototypePatternExample09.htm
var friend = new Person();

Person.prototype.sayHi = function(){
	alert("hi");
};

friend.sayHi();		//"hi"

//PrototypePatternExample10.htm
function Person(){

}

var friend = new Person();

Person.prototype = {
	constructor:Person,
	name:"Nicholas",
	age:29,
	job:"Software Engineer",
	sayName:function(){
		alert(this.name);
	}
};
friend.sayName();		//error

//PrototypePatternExample11.htm
String.prototype.startsWith = function(text){
	return this.indexOf(text) == 0;
};
var msg = "Hello world!";
alert(msg.startsWith("Hello"));		//true

//HybridPatternExample01.htm
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ["Shelby","Court"];
}

Person.prototype = {
	constructor : Person,
	sayName : function(){
		alert(this.name);
	}
}

var person1 = new Person("Nicholas",29,"Software Engineer");
var person2 = new Person("Greg",27,"Doctor");

person1.friends.push("Van");
alert(person1.friends);			//"Shelby,Count,Van"
alert(person2.friends);			//"Shelby,Count"
alert(person1.friends === person2.friends);		//false			
alert(person1.sayName === person2.sayName);		//true

//DynamicPrototypeExample01.htm
function Person(name,age,job){
	//属性
	this.name = name;
	this.age = age;
	this.job = job;
	//方法
	if (typeof this.sayName != "function") {

		Person.prototype.sayName = function(){
			alert(this.name);
		}
	};
}

var friend = new Person("Nicholas",29,"Software Engineer");
friend.sayName();
//使用动态原型模式时，不能使用对象字面量重写原型，前面已经解释过了，如果在已经创建了实例的情况下重写原型
//那么就会切短线有实例与新原型之间的联系


//HybridFactoryPatternExample01.htm
function Person(name,age,job){
	var o = new Object(){
		o.name = name;
		o.age = age;
		o.job = job;
		o.sayName = function(){
			alert(this.name);
		};
		return o;
	}
}
var friend = new Person("Nicholas",29,"Software Engineer");
friend.sayName();			//"Nicholas"

//HybridFactoryPatternExample02.htm
function SpecialArray(){
	//创建数组
	var values = new Array();
	//添加值
	values.push.apply(values,arguments);
	//添加方法
	values.toPipedString = function(){
		return this.join("|");
	};
	//返回数组
	return values;
}
var colors = new SpecialArray("red","blue","green");
alert(colors.toPipedString());		//"red|blue|green"

//PrototypeChainingExample01.htm
function SuperType(){
	this.prototype = true;
}

SuperType.prototype.getSuperValue = function(){
	return this property;
};

function SubType(){
	this.subproperty = false;
}

		//继承了SuperType
SubType.prototype = new SuperType();

SuperType.prototype.getSubValua = function(){
	return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue());			//true

//PrototypeChainingExample04.htm
function SuperType(){
	this.colors = ["red","blue","green"];

}
function SubType(){

}
		//继承了SuperType
SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors);	//"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors);	//"red,blue,green,black"


//ConstructorStealingExample01.htm
function SuperType(){
	this.colors = ["red","blue","green"];
}
function SubType(){
	//继承了SuperType
	SuperType.call(this);
}

var instancel1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors);		//"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors);		//"red,blue,green"

//ConstructorStealingExample02.htm
function SuperType(name){
	this.name = name;
}
function SubType(){
	//继承了SuperType,同时还传递了参数
	SuperType.call(this,"Nicholas");
	//实例属性
	this.age = 29;
}
var instance = new SubType();
alert(instance.name);	//"Nicholas"
alert(instance.age);	//29

//CombinationInheritanceExample01.htm
function SuperType(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
}
function SubType(name,age){
	//继承属性
	SuperType.call(this,name);
	this.age = age;
}
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	alert(this.age);
};
var instance1 = new SubType("Nicholas".29);
instance1.colors.push("black");
alert(instance1.colors);
instance1.sayName();
instance1.sayAge();

var instance2 = new SubType("Greg".27);
alert(instance2.colors);
instance2.sayName();
instance2/sayAge();

//ConstructorStealingExample02.htm
function SuperType(name){
	this.name = name;
}
function SubType(){
	//继承了SuperType，同时还传递了参数
	SuperType.call(this,"Nicholas");

	//实力属性
	this.age = 29;
}
var instance = new SubType();
alert(instance.name);		//"Nicholas"
alert(instance.age);		//29

//CombinationInheritanceExample01.htm
function SuperType(name){
	this.name = name;
	this.colors = ["red","blue"."green"];
}
SuperType.property.sayName = function(){
	alert(this.name);
}
function SubType(name,age){
	//继承属性
	SuperType.call(this,name);

	this.age = age;
}
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	alert(this.age);
}
var instance1 = new SubType("Nicholas",29);
instance1.colors.push("black");
alert(instance1.colors);		//"red,blue,green,black"
instance1.sayName();			//"Nicholas"
instance1.sayAge();				//29

var instance2 = new SubType("Greg",23);
alert(instance2.colors);		//"red,blue,green"
instance2.sayName();			//"Grey"
instance2.sayAge();				//23


//PrototypalInheritanceExample01.htm
var person = {
	name:"Nicholas",
	friends:["Shelby","Court","Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = Object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends);		//"Shelby,Court,Van,Rob,Barbie"

//替代上面的构造函数
var anotherPerson = Object.creat(person,{
	name:{
		value:"Greg"
	}
});


//ParasiticCombinationInheritanceExample01.htm
function SuperType(name){
	this.name = name;
	this.colors = ["red","blue","green"];

}
SuperType.prototype.sayName = function(){
	alert(this.name);
}
function SubType(name,age){
	SuperType.call(this,name);
	this.age = age;
}
inheritPrototype(SubType,SuperType);
SubType.prototype.sayAge = function(){
	alert(this.age);
}

//FunctionDeclarationExample01.htm
sayHi();
function sayHi(){
	alert("Hi!");
}

//RecursionExample01.htm
function factorial(num){
	if (num <= 1) {
		return 1;
	}else{
		return num * factorial(num-1);		//更好。return num * arguments.callee(num-1)
	};
}


//RecursionExample01.htm 同上
var factorial = (function f(num){
	if(num <= 1){
		return 1;
	}else{
		return num * f(num-1);
	}
})

//ClosureExample01.htm
function createFunction(){
	var  result = new Array();

	for (var i = 0;i < 10;i++){
		result[i] = function(){
			return i;
		}
	}
	return result;
}

//ClosureExample02.htm
function createFunctions(){
	var result = new Array();

	for (var i = 0; i < 10; i++){
		result[i] = function(num){
			return function(){
				return num;
			}
		}(i);
	}
	resturn result;
}

//ThisObjectExample01.htm
var name = "The Window";

var object  = {
	name:"My Object",

	getNameFunc : function(){
		return function(){
			return this.name;
		}
	}
}

alert(object.getNameFunc()());		//"The Window"

//BlockScopeExample01.htm
function outputNumbers(count){
	for(var i = 0; i < count; i++){
		alert(i);
	}
	alert(i);		//计数
}

//BlockScopeExample03.htm
function outputNumbers(count){
	(function(){
		for(var i=0;i < count;i++){
			alert(i);
		}
	})();
	alert(i);	//导致一个错误
}

//PrivilegedMethodExample01.htm
function Person(name){
	this.getName = function(){
		return name;
	};
	this.setName = function(value){
		name = value;
	};
}
var person = new Person("Nicholas");
alert(person.getName());	//"Nicholas"
person.setName("Greg");
alert(person.getName());		//"Greg"

// ##################  第8章 BOM  ###########################
//DeleteOperatorExample01.htm
var age = 29;
window.color = "red";

delete window.age;

delete window.color;

alert(window.age);
alert(window.color);


// ##################  第10章 DOM  ###########################
//DynamicScriptExample01.htm
var script = document.createElement("script");
script.type = "text/javascript";
script.text = "function sayHi(){alert('Hi');}";
document.body.appendChild(script);

//DynamicScriptExample01.htm
function loadScriptString(code){
	var script = document.createElement("script");
	script.type = "text/javascript";
	try{
		script.appendChild(document.createTextNode(code));
	}catch(ex){
		script.text = code;
	}
	document.body.appendChild(script);
}
//下面是调用这个函数的实例
locdScriptString("function sayHi(){alert('Hi');}");

//NodeIteratorExample01.htm
var div = document.getElementById("div1");
var iterator = document.createNodeIterator(div,NodeFilter.SHOW_ELEMENT,null，false);
var node = iterator.nextNode();
while(node !== null){
	alert(node.tagName);
	node = iterator.nextNode();
} 

// ##################  第13章 事件  ###########################
//ClientCoordinatesExample01.htm
var div = document.getElementById("myDiv");
EventUtil.addHandler(div,"click",function(event){
	event = EventUtil.getEvent(event);
	alert("Client coordinates:" + event.clientX + "," + event.clientY);

})
//PageCoordinatesExample01.htm
var div = document.getElementById("myDiv");
EventUtil.addHandler(div,"click",function(event){
	event = EventUtil.getEvent(event);
	alert("Page coordinates:" + event.pageX + "," + event.pageY);

})

//PageCoordinatesExample01.htm
var div = document.getElementById("myDiv");
EventUtil.addHandler(div,"click",function(event){
	event = EventUtil.getEvent(event);
	var pageX = event.pageX,
	    pageY = event.pageY;

	if (pageX === underfined) {
		pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
	};
	if (pageY === underfined) {
		pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
	};
	alert("Page coordinates:" + pageX + "," + pageY);
})


// ##################  第14章 表单脚本  ###########################
//
var form = document.getElementById("myForm");
EventUtil.addHandler(form,"submit",function(event){
	//取得事件对象
	event = EventUtil.getEvent(event);
	//阻止默认事件
	EventUtil.preventDefault(event);
});

// 通用提交按钮
<input type="submit" value="Submit Form">
//自定义提交按钮
<button type="submit">Submit Form</button>
// 图像按钮
<input type="image" src="graphic.gif">
//通用重置按钮
<input type="reset" value="Reset Form">
//自定义重置按钮
<button type="reset">Reset Form</button>

//FormFieldsExample02.htm
//避免多次提交表单
EventUtil.addHandler(form,"submit",function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	//取得提交按钮
	var btn = target.elements["submit-btn"];
	//禁用它
	btn.disabled = true;
})

//TextboxClipboardExample01.htm
EventUtil.addHandler(textbox,"paste",function(event){
	event = EventUtil.getEvent(event);
	var text = EventUtil.getClipboardText(event);

	if(!/^\d*$/.test(text)){
		EventUtil.preventDefault(event);
	}
})

//TextboxTapForwardExample01.htm
(function(){
	function tabForward(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getEvent(event);

		if (target.value.length == target.maxLength) {
			var form = target.form;

			for(var i = 0,len = form.elements.length;i < len;i++){
				if (form.elements[i+1] == target) {
					if (form.elements[i+1]) {
						form.elements[i+1].focus();
					};
					return;
				};
			}
		};
	}

	var textbox1 = document.getElementById("txtTel1");
	var textbox2 = document.getElementById("txtTel2");
	var textbox3 = document.getElementById("txtTel3");

	EventUtil.addHandler(textbox1,"keyup",tabForward);
	EventUtil.addHandler(textbox2,"keyup",tabForward);
	EventUtil.addHandler(textbox3,"keyup",tabForward);

})

//FormSerializationExample01.htm
function serialize(form){
	var parts = [],
	field = null,
	  i,
	  len,
	  j,
	  optLen,
	  option,
	  optValue;
	for(i=0,len=form.elements.length;i<len;i++){
		field = form.elements[i];

		switch(field.type){
			case "select-one":
			case "select-multiple":

			if(field.name.length){
				for(j=0,option = field.option.length;j < optLen;j++){
					option = field.options[j];
					if(option.selected){
						optValue = "";
						if (option.hasAttribute) {
							optValue = (option.hasAttribute("value") ? option.value:option.text);
						}else{
							optValue = (option.attributes["value"].specified ? option.value : option.text);
						}
						parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
					}
				}
			}
			break;
		case undefined:  		//字段集
		case "file": 			//文件输入
		case "submit": 			//提交按钮
		case "reset": 			//重置按钮
		case "button": 			//自定义按钮
			break;
		case "radio": 			//单选按钮
		case "checkbox": 		//复选框
			if(!field.checked){
				break;
			}
			// 执行默认操作
			default:
			//不包含没有名字的表单字段
			if (field.name.length) {
				parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
			};

		}
	}
	return parts.join("&");
}


// ##################  第15章 Canvas  ###########################
//2DDataUrlExample01.htm
var drawing = document.getElementById("drawing");

if(drawing.getContext){
	var imgURI = drawing.toDataURL("image/png");

	var image = document.createElement("img");
	image.src = imgURI;
	document.body.appendChild(image);
}


// ##################  第17章 错误处理  ###########################
//TryCatchExample01.htm
try{
	window.someNonexistentFunction()
}catch(error){
	alert(error.message);
}


// ##################  第20章 JSON  ###########################




// ##################  第21章 AJAX  ###########################
//XHRExample01.htm
xhr.open("get","example.txt",false);
xhr.send(null);

if ((xhr.status >= 200 && xhr.status < 300 || xhr.status == 304)) {
	alert(xhr.responseText);
}else{
	alert("Request was unsuccessful:" + xhr.status);
};

//XHRAsyncExample01.htm
var xhr = createXHR();
xhr.onreadystatechange = fucntion(){
	if(xhr.readyState == 4){
		if (xhr.readyState == 4) {
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				alert(xhr.responseText);
			}else{
				alert("Request was unsuccessfun:" + xhr.status);
			}
		};
	}
	xhr.open("get","example.txt",true);
	xhr.send(null);
}

////XHRRequestHeaderExample01.htm
xhr.setRuquestHeader("MyHeader","MyValue");

//GET 请求
xhr.open("get","example.php?name1=value1&name2=value2",true);
	//
function addURLParam(url,name,value){
	url += (url.indexOf("?") == -1 ? "?":"&");
	url += encodeURIComponent(name) + "=" encodeURIComponent(value);
	return url;
}
	//
var url = "example.php";

url = addURLParam(url,"name","Nicholas");
url = addURLParam(url,"book","Professional javascript");

xhr.open("get",url,false);

//POST请求
//XHRPostExample01.htm
function submitData(){
	var xhr = createXHR();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				alert(xhr.responseText);
			}else{
				alert("Request was unsuccessful:" + xhr.status);
			}
		}
	}
	xhr.open("post","postexample.php",true);
	xhr.setRuquestHeader("Content-Type","application/x-www-form-urlencoded");
	var form = document.getElementById("user-info");
	xhr.send(serializez(form));
}

//XHRFormDataExample01.htm
var xhr = createXHR();
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			alert(xhr.responseText);
		}else{
			alert("Request was unsuccessful:" + xhr.status);
		};
	}
}

xhr.open("post","postexample.php",true);
var form = document.getElementById("user-info");
xhr.send(new FormData(form)); 

//########   Wev Sockets  ##########
var socket = new WebSocket("ws://www.example.com/server.php");

socket.close();

//
var socket = new WebSocket("ws://www.example.com/server.php");
socket.send("Hello world!");
//
var message = {
	time:new Date(),
	text:"Hello world!",
	clientId:"asdfp8734rew"
};
socket.send(JSON.stringify(message));

//
socket.onmessage = function(event){
	var data = event.data;
	//处理数据
}



































































