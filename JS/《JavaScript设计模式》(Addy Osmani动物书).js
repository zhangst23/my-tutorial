// 《JavaScript设计模式》(Addy Osmani动物书).js

1.0   什么是模式
// 模式是已经验证的解决方案，模式很容易复用，模式富有表达力。

2.0   设计模式类别
		(1)创建型设计模式：专注于处理对象创建机制，以适合给定情况的方式来创建对象。（通过控制创建过程来解决项目复杂性的增加）
			Constructor(构造器)、Factory(工厂)、Abstract(抽象)、Prototype(原型)、Singleton(单例)、Builder(生成器)。
		(2)结构型设计模式：可以用于找出在不同对象之间建立关系的简单方法。有助于确保在系统某一部分发生变化时，系统的整个结构不需要
						同时改变。同时对于不适合因某一特定目的而改变的系统部分，帮助它们完成重组。
			Decorator(装饰者)、Facade(外观)、Flyweight(享元)、Adapter(适配器)、Proxy(代理).
		(3)行为设计模式：专注于改善或简化系统中不同对象之间的通信
			Iterator(迭代器)、Mediator(中介者)、Observer(观察者)、Visitor.

3.0   设计模式			

？？？？

4.0   模块化的Javascript

？？？？


5.0    jQuery中的设计模式

		
5.1   Composite(组合)模式：
composite模式描述了一组对象，可以使用与处理对象的单个实例同样的方式来进行处理
//jquery选择器，可以向单一元素添加一个active类(class)或一组具有相同标签名或类的元素，而无需额外的工作。
//Single elements
$("#singleItem").addClass("active");
$("#container").addClass("active");
//Collections of elements
$("div").addClass("active");
$(".item").addClass("active");
$("input").addClass("active");

5.2  Adapter(适配器)模式：
Adapter模式将对象或类的接口(interface)转变为与特定的系统兼容的接口
//跨浏览器透明度 
//opacity:0.9;Chrome 4+,FF2+,Saf3.1+,Opera9+,IE9+,iOS 3.2+,Android 2.1+
//filter:alpha(opacity=90);IE6-IE8

//设置opacity
$(".container").css({ opacity:.5 });

//获取opacity
var currentOpacity = $(".container").css('opacity');

5.3  Facade(外观)模式：
为更大的(可能更复杂的)代码体提供了一个更简单的接口
//下面是jQuery的$.ajax()外观：
$.get(url,data,callback,dataType);
$.post(url,data,callback,dataType);
$.getJSON(url,data,callback);
$.getScript(url,callback);
//这些是在后台进行转变
//$.get()
$.ajax({
	url:url,
	data:data,
	dataType:dataType
}).done(callback);

//$.post()
$.ajax({
	type:"POST",
	url:url,
	data:data,
	dataType:dataType
}).done(callback);

//$.getJSON()
$.ajax({
	url:url,
	dataType:"json",
	data:data,
}).done(callback);


//$.getScript()
$.ajax({
	url:url,
	dataType:"script",
}).done(callback);

5.4   Observer(观察者)模式：
// jQuery中的自定义事件
$(document).on("topicName",function(){
	//..执行相应行为
})

$(document).trigger("topicName");

$(document).off("topicName");

5.5   Iterator(迭代器)模式：
// 迭代器(允许我们遍历集合的所有元素的对象)顺便访问聚合对象的元素，无需公开其基本形式
$.each(["john","dava","rick","julian"],function(index,value){
	console.log(index + ":" + value);
});

$("li").each(function(index){
	console.log(index + ":" + $(this).text());
});


5.6  延迟初始化
// jQuery中的.ready()函数，当DOM准备就绪时，它仅执行一次回调。
$(document).ready(function(){
	//DOM就绪之前ajax请求不会执行
	var jqxhr = $.ajax({
		url:"http://domain.com/api/",
		data:"display=latest&order=ascending"
	})
	.done(function(data)){
		$(".status").html("content loaded");
		console.log("Data output:" + data);
	};
});


// LazyLoading



5.7   Proxy(代理)模式：
// 我们有必要控制对象后面的访问权限和上下文

？？？



5.8  Builder(生成器)模式
Builder使我们能够仅通过指定对象的类型和内容就可以创建复杂的对象，而无需显示创建或表示该对象











