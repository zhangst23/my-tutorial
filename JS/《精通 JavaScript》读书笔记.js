// 《精通 JavaScript》读书笔记.js

//1.1.1
//用面向对象的Javascript表示课程及安排
//'Lecture'类的构造函数   用名称name和教师teacher作为参数
function Lecture(name,teacher){
	//将参数保存为对象的局部属性 (local property)
	this.name = name;
	this.teacher = teacher;

}
//Lecture 类的一个方法（method），用于生成   一条显示lecture信息的字符串
Lecture.prototype.display = function(){
	return this.teacher + " is teaching " + this.name;
};
//Schedule类的构造函数，以课程的数组作为参数
function Schedule(lectures){
	this.lectures = lectures;
}
//构造一条字符串，表示课程的安排表
Schedule.prototype.display = function(){
	var str = "";
	//遍历每项课程，建立包含他们信息的字符串
	for (var i = 0; i < this.lectures.length; i++) 
		str += this.lectures[i].display + "";

	return str;
	
}


//
//给用户提供一个课程列表
//创建一个新的 Schedule 对象，保存在变量 ‘mySchedule’ 中
var mySchedule = new Schedule([
	//创建一个Lecture对象的数组，作为Schedule对象的唯一参数传入
	new Lecture("Gym","Mr.Smith"),
	new Lecture("Math","Mrs.Jones"),
	new Lecture("English","TBD")
	]);
//以弹出窗口的形式显示这个课程信息
alert(mySchedule.display());


//1.4.2 使用DOM和事件来提供视觉特效
//我们必须在文档完成加载后再操作DOM
window.onload = function(){
	//获取所有的<li>元素，给他们添加上事件处理函数(event handler)
	var li = document.getElementsByTagName("li");
	for (var j = 0; j < li.length; j++) {
		//给这个<li>元素加上 mouseover 的事件处理函数  他将这个<li> 的背景颜色改为蓝色
		li[i].onmouseover = function(){
			this.style.backgroundColor = 'blue';
		}
		//给这个<li>元素加上 mouseout 的事件处理函数  他将它的背景颜色重置为默认的白色
		li[i].onmouseout = function(){
			this.style.backgroundColor = 'White';
		}
	};
}


// 2.1.4 闭包如何是代码更清晰的两个例子
//找出ID为‘main’的元素
var obj = document.getElementById("main");
//修改它的border样式
obj.style.border = "1px solid red";
//初始化一个在一秒后执行的回调函数(callback)
setTimeout(function(){
	//他将隐藏此对象
	obj.style.display = 'none';

},1000);
//一个用于延时显示警告信息的通用函数
function delayedAlert(msg,time){
	//初始化一个封装的回调函数
	setTimeout(function(){
		//它将使用包含本函数的外围函数传入的msg变量
		alert(msg);
	},time);
}
//用两个参数调用delayedAlert 函数
delayedAlert("welcome",2000);


// 2.2.5 使用匿名函数来隐藏全局作用域变量的例子
(function(){
	var msg = "Thanks for visiting";
	window.onunload = function(){
		alert(msg);
	}
})();

//2.2.6  使用匿名函数来激发出创建多个使用闭包的函数所需的作用域
var obj = document.getElementById("main");
var items = ["click","keypress"];
for (var i = 0; i < items.length; i++) {
	(function(){
		var item = items[i];
		obj["on" + item ] = function(){
			alert("Thanks for you " + item);
		}
	})
};
 

//修改函数上下文对象的例子
function changeColor( color ){
	this.style.color = color;
}
changeColor("white");

var main = document.getElementById("main");
changeColor.call(main,"black");

function setBodyColor(){
	changeColor.apply(document.body,arguments);
}

setBodyColor("black");



//创建一个对象
var obj = {
	val:5,
	click:function(){
		alert("hello");
	}
}
//1.1公有方法
//对象的方法通过prototype对象添加的例子
//创建一个新的User构造函数
function User(name,age){
	this.name = name;
	this.age = age;
}
//将一个新的函数添加到此对象的prototype对象中
User.prototype.getName = function(){
	return this.name;
}
//并再给此 prototype 对象添加一个函数   注意其上下文是实例化后的对象
User.prototype.getAge = function(){
	return this.age;
}
//实例化一个新的User 对象
var user = new User("Bob",44);

//可以看到我们添加的这两个属性都在刚才创建的对象中，并且有合适的上下文
alert(user.getName() == "Bob");
alert(user.getAge() == 44);



//1.2私有方法
//只能有构造函数访问的私有方法的例子
function Classroom(students,teacher){
	function disp(){
		alert(this.names.join(","));
	}
	this.students = students;
	this.teacher = teacher;
	//调用私有方法来显示错误
	disp();
}

var class = new Classroom(["John","Bob"],"Mr.Smith");
//调用disp方法会失败，因为它不是该对象的公共属性
class.disp();



//1.3特权方法
function User(name,age){
	var year = (new Data()).getFullYear() - age;

	this.getYearBorn = function(){
		return year;
	};
}
var user = new User("Bob",44);
alert(user.getYearBorn() == 1962);
alert(user.year == null);



//1.4 动态生成方法的例子，这些方法在新对象实例化时创建
function User(properties){
	for (var i in properties){(function(which){
		var p = i;
		which[ "get" + p ] = function(){
			return properties[p];
		};
		which["set" + p] = function(val){
			properties[p] = val;
		};
	})(this)};
}
var user = new User({
	name:"Bob",
	age:44
});

alert(user.name == null);

alert(user.getname == "Bob");

user.setage(22);
alert(user.getage() == 22);

// 1.5  静态方法
User.cloneUser = function(user){
	return new User(
		user.getName(),
		user.getAge()
	);
};

//3.0 创建可重用代码
// 3.1  原型式继承的例子

//为Person 对象创建一个构造函数
function Person(name){
	this.name = name;
}
//给 Peison 对象添加一个新方法
Person.prototype.getName = function(){
	return this.name;
}
//创建一个新的 User 对象的构造函数
function User(name,password){
	this.name = name;
	this.password = password;
};

//User 对象继承所有 Person 对象的方法
User.prototype = new Person();
//我们添加一个新方法到 User 对象中
User.prototype.getPassword = function(){
	return this.password;
}


// 3.2  类式继承的例子















