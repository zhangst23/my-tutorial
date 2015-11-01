// 《JavaScript设计模式》读书笔记.js


接口
接口提供了一种用以说明一个对象应该具有哪些方法的手段。
尽管它可以表明（或至少暗示）这些方法的语义，但它并不规定这些方法应该如何实现。


结合使用Interface类和注释的示例
//Interfaces

var Composite = new Interface('Composite',['add','remove','getChild']);
var FormItem = new Interface('FormItem',['save']);

//CompositeForm class
var CompositeForm = function(id,method,action){   //implements Composite,FormItem
	...

};
...

function addForm(formInstance){
	Interface.ensureImplements(formInstance,Composite,FormItem);

}


下面是本书中使用的Interface类的定义
// Constructor
var Interface = function(name,methods){
	if (arguments.length != 2) {
		throw new Error("Interface constructor called with" + arguments.length + "arguments,but expected expected 2.");

	};
	this.name = name;
	this.methods = [];
	for (var i = 0; len < methods.length; i < len; i++) 
		if (typeof methods[i] !== 'string') {
			throw new Error("Interface constructor expects methods method names to be" + "passed in as a string.");
		};
		this.methods.push(methods[i]);
	};
}


//static class method

Interface.ensureImplements = function(object){
	if (arguments.length < 2) {
		throw new Error("Function Interface.ensureImplements called with" + arguments.length + "arguments,but expected at least 2.");

	};
	for (var i = 0; len = arguments.length;i < len;  i++) {
		var interface = arguments[i];
		if (interface.constructor !== Interface) {
			throw new Error("Function Interface.ensureImplements expects arguments" + "two and above to be instances of Interface.");

		};
		for(var j = 0,methodssLen = interface.methods.length;j < methodsLen;j++){
			var method = interface.methods[j];
			if (!object[method] || typeof object[method] !== 'function') {
				throw new Error("Function Interface.ensureImplements:object"
					+ "does not implement the " + interface.name
					+ "interface.method" + method +"was not found.");
			};
		}

	};
}


封装，可以被定义为对对象的内部数据表现形式和实现细节进行隐藏。

在向其他对象隐藏信息的过程中接口是如何发挥作用的呢？接口提供了一份记载着可供公众访问的方法的契约，它定义了两个对象间可以具有的关系。
只要接口不变，这个关系的双方都是可替换的。

创建对象的3种基本模式之一： 门户大开型 
以Book类为例，常见一个用来存储关于一本书的数据的类，并为其实现一个以HTML形式显示这些数据的方法。
你只负责创建这个类，别人会创建并使用其实例。它会被这样使用：
//Book(isbn,title,author)
var theHobbit = new Book('0-395-02111','The Hobbit','J.R.R.Tolkien');
theHobbit.display();        //Outputs the data by creating and populating an HTML element


实现Book类最简单的做法是按传统方式创建一个类，用一个函数来做其构造器，称之为门户大开型，因为她的所有属性和方法都是公开的、可访问的。
这些公用属性需要使用this关键字来创建
var Book = function(isbn,title,author){
	if (isbn == undefined) throw new Error('Book constructor requires an isbn.');
	this.isbn = isbn;
	this.title = title || 'No title specified';
	this.author = author || 'No author specified';
}
Book.prototype.display = function(){
	...
};

在构造器中，如果检查到没有提供ISBN，将会抛出一个错误。这是因为display方法要求书籍对象有一个准确的ISBN，否则不能找到相应的图片，也不能生成一个用于购书的链接。
下面的版本强化了对ISBN的检查。
var Book = function(isbn,title,author){
	if (isbn == undefined) throw new Error('Book constructor requires an isbn.');
	this.isbn = isbn;
	this.title = title || 'No title specified';
	this.author = author || 'No author specified';
}
Book.prototype.display = function(){
	checkIsbn:function(isbn){
		if (isbn == undefined || typeof isbn != 'string') {
			return false;
		};
		isbn = isbn.replace(/-/,'');    //Remove dashes.
		if (isbn.length != 10 && isbn.length != 13) {
			return false;
		};

		var sum = 0;
		if (isbn.length === 10) {  //10 digit ISBN};
		if (!isbn.match(/^\d{9}/)) {    //Ensure characters 1 through 9 are digits.
			return false;

		};
		for(var i = 0; i < 9;i++){
			sum += isbn.charAt(i)*(10 - i);
		}
		var checksum = sum & 11;
		if (checksum === 10)checksum = 'x'; 
		if (isbn.charAt(9) != checksum) {
			return false;
		};
	  }
	}else{      //13 digit ISBN
		if(!isbn.match(/^\d{2}/)){      //Ensure characters 1 through 12 are digits.
			return false;
		}
		for(var i = 0;i < 12; i++){
			sum += isbn.charAt(i)*((i % 2 === 0) ? 1 : 3);
		}
		var checksum = sum % 10;
		if (isbn.charAt(12) != checksum) {
			return false;
		};

	}
	return true;     //All tests  passed.
   }
   display:function(){
   	...
   }
};



//3,2,4  使用闭包实现私有成员 
var Book = function(newIsbn,newTitle,newAuthor){   //implemeents Publication
	//Private attributes
	var isbn,title,author;

	//Private method
	function checkIsbn(isbn){
		...
	}

	//Privileged methods.
	this.getIsbn = function(){
		return isbn;
	};
	this.setIsbn = function(newIsbn){
		if(!checkIsbn(newIsbn)) throw new Error('Book:Invalid ISBN.');
		isbn = newIsbn;
	};
	this.getTitle = function(){
		return title;
	};
	this.setTitle = function(newTitle){
		title = newTitle || 'No title specified';
	};
	this.getAuthor = function(){
		return author;
	};
	this.setAuthor = function(newAuthor){
		author = newAuthor || 'No author specified';
	}

	//Constructor code
	this.setIsbn(newIsbn);
	this.setTitle(newTitle);
	this.setAuthor(newAuthor);

};

//Public,non-privileged methods.
Book.prototype = {
	display:function(){
		...
	}
}


//3.2.5   下面是添加了静态属性和方法的Book类



//4.0 继承

//4.1  类式继承
// Class Person
function Person(name){
	this.name = name;
}
Person.prototype.getName = function(){
	return this.name;
}



//4.2    原型式继承  ：  只需要直接创建一个对象即可，这个对象随后可以被新的对象重用，这得益于原型链查找的工作机制
// Person Prototype Object
var Person = {
	name:'default name',
	getName:function(){
		return this.name
	}
};

var Author = clone(Person);
Author.books = [];  //default value
Author.getBooks = function(){
	return this.books;
}


//5.0 ########################  单体模式
// 最简单的单体实际上就是一个对象字面量，他把一批有一定关联的方法和属性组织在一起。
/* Basic Singleton */
var Singleton = {
	attribute1:true,
	attribute2:10,

	method1:function(){

	},
	method2:function(arg){

	}
};
//为了避免无意中改写变量，最好的解决办法之一是用单体对象将代码组织在命名空间之中，下面是前面的例子用单体模式改良后的结果
/* Using a namespace */
var MyNamespace = {
	findProduct:function(id){
		...
	},
	//Other methods can go here as well

}
...
// Later in your page,another programmer adds...
var resetProduct = $('reset-product-button');
var findProduct = $('find-product-button');   //Nothing was overwritten


//为了避免冲突，可以定义一个用来包含自己的所有代码的全局对象
/* GiantCorp namespace */
var GiantCorp = {};
//然后可以分门别类的把自己的代码和数据组织到这个全局对象（单体）中
GiantCorp.Common = {
	// A singleton with common methods used by all objects and modules

};
GiantCorp.ErrorCodes = {
	// An object literal used to store data.
}
GiantCorp.PageHandler = {
	// A singleton with page specific methods and attributes
}


//5.4.2  使用闭包   下面的代码示范了在那个匿名函数中添加私用成员的作法
/* Singleton with Private Members,step 3 */
MyNamespace.Singleton = (function(){
	//Private menbers
	var privateAttribute1 = false;
	var privateAttribute2 = [1,2,3];

	function privateMethod1(){
		...
	}
	function privateMethod2(args){
		...
	}
	return {  //Public members
		publicAttribute1:true,
		publicAttribute2:10,

		publicMethod1:function(){
			...
		},
		publicMethod2:function(args){
			...
		}
	};
})();

单体模式的好处在于它对代码的组织利用，把相关方法和属性组织在一个不会被多次实例化的单体中，可以使代码的调试和维护变得更轻松，
描述性的命名空间还可以增强代码的自我说明性，有利于新手的阅读和理解。把你的方法包裹在单体中，可以防止它们被其他程序员误改，
还可以防止全局命名空间被一大堆变量弄得一团糟。单体可以把你的代码与第三方的库代码和广告代码隔离开来，从而在整体上提高页面的稳定性，。

单体模式的一些高级变体可以在开发周期的后期用于对脚本进行优化，提升其性能。使用惰性实例化技术，可以直到需要一个对象
的时候才创建它，从而减少那些不需要他的用户承受的不必要的内存消耗。分支技术则可以用来创造高效的方法，不用管浏览器或环境的兼容性如何，
通过根据运行时的条件确定赋给单体变量的对象字面量，你可以创建出特定环境量身定制的方法，这种发发布会在每次调用时都一再浪费时间去检查运行环境。


单体模式的不好地方就是它是一种单点访问，所以它有可能导致模块间的强耦合。








//6.0 ########################  方法的链式调用
//6.1 调用链的结构
function $(){
	var elements = [];
	for (var i = 0; len < arguments.length; i < len; ++i) {
		var element = arguments[i];
		if (typeof element === 'string') {
			element = document.getElementById(element);
		}
		if (arguments.length === 1) {
			return element;
		}
		elements.push(element);
	}
	return elements;
}

//如果，把这个函数改造为一个构造器，把那些元素作为数组保存在一个实例属性中，
// 并让所有定义在构造函数的prototype属性所指对象中的方法都返回用以调用方法的那个实例的引用，
// 那么它就具有了进行链式调用的能力。

(function(){
	//Use a private class.
	function _$(els){
		this.elements = [];
		for (var i = 0; len < els.length; i < len; ++i) {
			var element = els[i];
			if (typeof element === 'string') {
				element = document.getElementById(element);
			};
			this.elements.push(element);
		};
	}
	//The public interface remains the same.
	window.$ = function(){
		return new _$(arguments);
	};
})();

//由于所有对象都会继承其原型对象的属性和方法，所以我们可以让定义在原型对象中的那几个方法都返回用以调用方法的
// 实例对象的引用，这样就可以对这些方法进行链式调用。我们现在就动手在_$这个私用构造函数的prototype对象中添加方法。以便实现链式调用。
(function(){
	function _$(els){
		//...
	}
	_$.prototype = {
		each:function(fn){
			for (var i = 0; len = this.element.length; i < len; ++i) {
				fun.call(this,this.element[i]);
			}
			return this;
		},
		setStyle:function(prop,val){
			this.each(function(el){
				el.style[prop] = val;
			});
			return this;
		},
		show:function(){
			var that = this;
			this.each(function(el){
				that.setStyle('display','block');
			});
			return this;
		},
		addEvent:function(type,fn){
			var add = function(el){
				if (window.addEventListener) {
					el.addEventListener(type,fn,false);
				}else if(window.attachEvent){
					el.attachEvent('on'+type,fn);

				}
			};
			this.each(function(el){
				add(el);
			});
			return this;
		}
	};
	window.$ = function(){
		return new_$(arguments);
	};

})();


//现在可以像这样写代码了
$(window).addEvent('load',function(){
	$('test-1','test-2').show().
	setStyle('color','red').
	addEvent('click',function(e){
		$(this).setStyle('color','green');
	});
});


// 6.2  设计一个支持方法链式调用的JavaScript库
// 常见于大多数JavaScript中的特性：事件（添加和删除事件监听器，对事件对象进行规范化处理）
// 							DOM（类名管理，样式管理）
// 							Ajax（对XMLHttpRequest进行规范化处理）
// Include sntactic sugar to help the development of our interface
Function.prototype.method = function(name,fn){
	this.prototype[name] = fn;
	return this;
};
(function(){
	function _$(els){
		//...
	}
})

/* 
	Events
		* addEvent
		* getEvent
 */
_$.method('addEvent',function(type,fn){
	//...
}).method('getEvent',function(e){
	//...
})

/* 
	DOM
		* addClass
		* removeClass
		* replaceClass
		* hasClass
		* getStyle
		* setStyle
 */

method('addClass',function(className){
	//...
}).method('removeClass',function(calssName){
	//...
}).method('replaceClass',function(oldClass,newClass){
	//...
}).method('hasClass',function(className){
	//...
}).method('getStyle',function(prop){
	//...
}).method('setStyle',function(prop,val){
	//...
})

/* 
	Ajax
		* load.Fetches an HTML fragment from a URL and inserts it into an element
		
 */
method('load',function(uri,method){
	//...
});
window.$ = function(){
	return new _$(arguments);
});
})();

//7.0 ########################  工厂模式
// 7.1 简单工厂   ：  假设你想开几个开几个自行车商店，每个店都有几种型号的自行车出售，这可以用一个类来表示
/* BicycleShop class */
var BicycleShop = function(){};
BicycleShop.prototype = {
	sellBicycle:function(model){
		var bicycle;

		switch(model){
			case 'The Speedster':
				bicycle = new Speedster();
				break;
			case 'The Lowrider':
				bicycle = new Lowrider();
				break;
			case 'The ComfortCruiser()';
			default:
				bicycle = new ComfortCruiser();
		}
		Interface.ensureImplements(bicycle,Bicycle);
		bicycle.assemble();
		bicycle.wash();

		return bicycle;
	}
};

//sellBicycle 方法根据所要求的自行车型号用switch语句创建一个自行车的实例，
// 各种型号的自行车实例可以互换使用，因为他们都实现了Bicycle接口
/* The Bicycle interface. */
var Bicycle = new Interface('Bicycle',['assemble','wash','ride','repair']);

/* Speedster class */
var Speedster = function(){    //implements Bicycle
	...

}
Speedster.prototype = {
	assemble:function(){
		...
	},
	wash:function(){
		...
	},
	ride:function(){
		...
	},
	repair:function(){
		...
	}
};
// 要出售某种型号的自行车，只要调用sellBicycle方法即可
var californiaCruisers = new BicycleShop();
var yourNewBike = califormiaCruisers.sellBicycle('The Speedster')
//但是要想在供货目录中加入一款新车型又会怎么样呢？你得为此修改BicycleShop的代码，，，，
// 更好的办法是把sellBicycle方法中的“创建新实例”这部分工作转交给一个简单工厂对象
/* BicycleFactory namespace */
var BicycleFactory = {
	createBicycle:function(model){
		var bicycle;

		switch(model){
		  case 'The Speedster':
			bicycle = new Speedster();
			break;
		  case 'The Lowrider':
		    bicycle = new Lowrider();
		    break;
		  case 'The Comfort Cruiser':
		  default;
		  	bicycle = new ComfortCruiser();

		}
		Interface.ensureImplements(bicycle,Bicycle);
		return bicycle;
	}
}

//BicycleFactory是一个单体，用来把createBicycle方法封装在一个命名空间中，这个方法返回一个实现了Bicycle接口的对象，然后可以照常对其进行组装和清洗
/* BicycleShop class,improved. */
var BicycleShop = function(){};
BicycleShop.prototype = {
	sellBicycle:function(model){
		var bicycle = BicycleFactory.createBicycle(model);

		bicycle.assemble();
		bicycle.wash();

		return bicycle;
	}
};

//这个BicycleFactory对象可以供各种类用来创建新的自行车实例。有关可供车型的所有信息都集中在一个地方管理，所以添加更多车型很容易
/* BicycleFactory namespace,with more models. */
var BicycleFactory = {
	createBicycle:function(model){
		var bicycle;

		switch(model){
		  case 'The Speedster':
			bicycle = new Speedster();
			break;
		  case 'The Lowrider':
		    bicycle = new Lowrider();
		    break;
		  case 'The Flatlander':
		  	bicycle = new Flatlander();
		  	break;
		  case 'The Comfort Cruiser':
		  default;
		  	bicycle = new ComfortCruiser();
		}
		Interface.ensureImplements(bicycle,Bicycle);
		return bicycle;
	}
}
// BicycleFactory就是一个简单工厂的例子。这种模式把成员对象的创建工作转交给一个外部对象。


// 7.2  工厂模式
// 真正的工厂模式和简单工厂模式的区别在于，它不是另外使用一个类或对象来创建自行车，而是使用一个子类。
// 按照正式定义，工厂是一个将其成员对象的实例化推迟到子类中进行的类，我们还是以BicycleFactory为例说下：
// 我们把BicycleShop设计为抽象类，让子类根据各自的进货渠道实现其createBicycle方法
/* BicycleShop class (abstract) */
var BicycleShop = function(){};
BicycleShop.prototype = {
	sellBicycle:function(model){
		var bicycle = this.createBicycle(model);

		bicycle.assemble();
		bicycle.wash();

		return bicycle;
	},
	createBicycle:function(model){
		throw new Error('Unsupported operation on an abstract class')
	}
};


//7.4  示例：XHR工厂(简单工厂)
/* AjaxHandler interface */
var AjaxHandler = new Interface('AjaxHandler',['request','createXhrObject']);
/* SimpleHandler class */
var SimpleHandler = function(){};   //implements AjaxHandler
SimpleHandler.prototype = {
	request:function(method,url,callback,postVars){
		var xhr = this.createXhrObject();
		xhr.onreadystatechange = function(){
			if (xhr.readyState !== 4) return; 
			(xhr.status === 200)?
		 	  callback.success(xhr.responseText,xhr.responseXml):
		 	  callback.failure(xhr.status);
		};
		xhr.open(method,url,true);
		if (method !== 'POST') postVars = null;
		xhr.send(postVars);
	},
	createXhrObject:function(){     //Factory method
		var methods = [
			function(){ return new XMLHttpRequest(); },
			function(){ return new ActiveXObject('Msxml2.XMLHttp'); },
			function(){ return new ActiveXObject('Microsoft.XMLHttp'); }
		];

		for (var i = 0; len = methods.length; i < len; i++) {
			try{
				methods[i]();
			}
			catch(e){
				continue;
			}
			//If we reach this point,method[i] worked.
			this.createXhrObject = methods[i];   //Memoize the method
			return methods[i];
		};

		//If we reach this point,none of the methods worked.
		throw new Error('SimpleHandler:Could not create an XHR object.')
	}
};


























