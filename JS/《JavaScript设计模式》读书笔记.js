// 《JavaScript设计模式》读书笔记.js


// 接口
// 接口提供了一种用以说明一个对象应该具有哪些方法的手段。
// 尽管它可以表明（或至少暗示）这些方法的语义，但它并不规定这些方法应该如何实现。


// 结合使用Interface类和注释的示例
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

// 单体模式的好处在于它对代码的组织利用，把相关方法和属性组织在一个不会被多次实例化的单体中，可以使代码的调试和维护变得更轻松，
// 描述性的命名空间还可以增强代码的自我说明性，有利于新手的阅读和理解。把你的方法包裹在单体中，可以防止它们被其他程序员误改，
// 还可以防止全局命名空间被一大堆变量弄得一团糟。单体可以把你的代码与第三方的库代码和广告代码隔离开来，从而在整体上提高页面的稳定性，。

// 单体模式的一些高级变体可以在开发周期的后期用于对脚本进行优化，提升其性能。使用惰性实例化技术，可以直到需要一个对象
// 的时候才创建它，从而减少那些不需要他的用户承受的不必要的内存消耗。分支技术则可以用来创造高效的方法，不用管浏览器或环境的兼容性如何，
// 通过根据运行时的条件确定赋给单体变量的对象字面量，你可以创建出特定环境量身定制的方法，这种发发布会在每次调用时都一再浪费时间去检查运行环境。


// 单体模式的不好地方就是它是一种单点访问，所以它有可能导致模块间的强耦合。








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


// 好处：
// 工厂模式的主要好处是在于消除对象间的耦合。通过使用工厂方法而不是new关键字及具体类，你可以把所有实例化代码集中在一个位置。这可以大大简化
// 更换所用的类或在运行期间动态选择所用的类的工作。使用工厂模式，你可以先创建一个抽象的父类，然后再子类中创建工厂方法，从而把成员对象的实例化
// 推迟到更专门化的子类中进行。
// 所有这些好处都与面向对象设计的这两条原则有关：弱化对象间的耦合；防止代码的重复。

// 弊端：
// 有人把它当万金油，把普通的构造函数扔到一边。
// 如果根本不可能另外换用一个类，或者不需要在运行期间在一系列可互换的类中进行选择，那就不应该使用工厂方法。







//8.0 ########################  桥接模式



// 在实现API的时候，桥接模式非常有用，在设计一个JavaScriptAPI的时候，可以用这个模式来弱化它与使用它的类和对象之间的耦合。
// 桥接模式的作用在于“将抽象与其实现隔离开来，以便二者独立变化”。

// 8.1  示例：事件监听器
// 桥接模式最常见和实际的应用场合之一就是事件监听器回调函数。

// eg：假设有一个名为getBeerById的API函数，他根据一个标识符返回有关某种啤酒的信息，你希望在用户在执行某种操作时获取这种信息。
// 那个被点击的元素很可能具有啤酒的标识符信息，他可能是作为元素自身的ID保存，也可能是作为别的自定义属性保存。
// 做法一：
addEvent(element,'click',getBeerById);
function getBeerById(e){
	var id = this.id;
	asyncRequest('GET','beer.uri?id=' +id,function(resp){
		//Callback response
		console.log('Requested Beer:' + resp.responseText);
	});
}

// 做法二：从逻辑上讲把ID作为参数传递给一个名为getBeerById的函数使合情合理的。如“getter”函数，使用了一个回调函数。
function getBeerById(id,callback){
	//Make request for beer by ID,then return the beer data
	asyncRequest('GET','beer.uri?id=',function(resp){
		//callback response
		callback(resp.responseText);
	})
}

//做法三：桥接模式把抽象隔离开来，看看修改后的那个事件监听器
addEvent(element,'click',getBeerByIdBridge);
function getBeerByIdBridge(e){
	getBeerById(this.id,function(beer){
		console.log('Requested Beer:'+beer);
	});
}
//有了这层桥接元素，这个API的适用范围大大拓宽了，这给了你更大的设计自由。



// 8.2   桥接模式的其他例子   可以用一些具有特殊权力的方法作为桥梁以便访问私有变量空间，而不必冒险下到具体实现的浑水里。这一特例中的桥接性函数又称特权函数.
var Public = function(){
	var secret = 3;
	this.privilegedGetter = function(){
		return secret;
	}
}
var o = new Public;
var data = o.privilegedGetter();


// 8.3  用桥接模式连接多个类
var Class1 = function(a,b,c){
	this.a = a;
	this.b = b;
	this.c = c;
}
var Class2 = function(d){
	this.d = d;
};
var BridgeClass = function(a,b,c,d){
	this.one = new Class1(a,b,c);
	this.two = new Class2(d);
};
//这看起来很像是适配器.



// 8.4   示例：构建XHR连接队列




// 8.5   桥接模式的适用场合    
// 判断什么地方应该使用交接模式通常很简单，假如有下面的代码：
$('example').onclick = function(){
	new RichTextEditor();
};
// 从中你无法看出那个编辑器要显示在什么地方、它有些什么配置选项以及应该怎样修改它。这里的要诀就是让接口“可桥接”，实际就是可适配。



// 8.6   桥接模式好处
// 把抽象与其实现隔离开，有助于独立的管理软件的各组成部分。Bug也因此更容易查找，软件发生严重故障的可能性也减小。


// 8.7   桥接模式弊端
// 暂时无，它只会让API更加健壮、提高组件的模块化程度并促成更简洁的客户系统实现。
// 但是每使用一次桥接元素都要增加一次函数调用，这对应用程序的性能有一些负面影响。此外，他们也提高了系统的复杂程度，在出现问题时会导致代码更难调试。
// 注意不要滥用。
// 如果一个桥接函数被用于连接两个函数，而其中某个函数根本不会再桥接函数之外被调用，那么此时这个桥接函数就不是非要不可了，可以放心将它删除。




//9.0 ########################  组合模式
组合模式是一种专为创建web上的动态用户界面量身定制的模式。使用这种模式，可以用一条命令在多个对象上继发复杂的或递归的行为。
这可以简化粘合性代码，使其更容易维护，而那些复杂行为则被委托给各个对象。

//9.1  组合对象的结构
一个组合对象由一些别的组合对象和叶对象组成。

//9.2  使用组合模式(只有同时具备如下两个条件才适合用)
1.存在一批组织成某种层次体系的对象（具体的结构在开发期间可能无法得知）
2.希望对这批对象或其中的一部分对象实施一个操作
组合模式产长于对大批对象进行操作


//9.3   示例：表单验证










//9.4  组合模式好处
使用组合模式，简单的操作也能产生复杂的结果。你不必编写大量手工遍历数组或其它数据结构的粘合代码，只需对最顶层的对象执行操作，让每一个子对象自己传递这个操作即可。



//9.5  组合模式弊端
由于对组合对象调用的任何操作都会被传递到它的所有子对象，如果这个层次体系很大的话，系统的性能将会受到影响。




//10.0 ########################  门面模式
门面模式有两个作用：一是简化类的接口；二是消除类与使用它的客户代码之间的耦合。



//10.3   用作便利方法的门面元素
门面模式给予开发人员的另一个好处表现在对函数的组合上，这些组合而得的函数又叫便利函数。下面是一个纯粹形式化的例子
function a(x){
	//do stuff here...
}
function b(y){
	//do stuff here...
}
function ab(x,y){
	a(x);
	b(x);
}



// 理想案例：
var DED = window.DED || {};
DED.util = {
	stopPropagation:function(e){
		if (ev.stopPropagation) {
			//w3 interface
			e.stopPropagation();
		}else{
			//IE's interface
			e.cancelBubble = true;
		}
	},
	preventDefault:function(e){
		if (e.preventDefault) {
			//W3 interface
			e.preventDefault();
		}else{
			//IE's interface
			e.returnValue = false;
		}
	}
	stopEvent:function(e){
		DED.util.stopPropagation(e);
		DED.util.preventDefault(e);
	}

}



//10.4   示例：设置HTML元素的样式


//10.5   示例：设计一个事件工具


//10.6   实现门面模式的一般步骤


//10.7   门面模式的适用场合
判断是否该应用门面模式的关键在于辨认那些反复成组出现的代码。如果函数b出现在函数a之后这种情况经常出现，那么也许你应该考虑添加一个把
这两个函数组合起来的门面函数。




//10.8  门面模式好处
编写一次组合代码，然后就可以反复使用它。


//10.9  门面模式弊端
小题大做，被滥用。
对于简单的个人网站或少量营销网页来说，仅为工具提示和弹出式窗口这样一点增强行为就导入整个Javascript库可能并不明智。此时也许可以考虑只使用
少许简单的门面元素而不是一个满是这类东西的库。



//11.0 ########################  适配器模式
适配器模式可用来在现有接口和不兼容的类之间进行适配。使用这种模式的对象又叫包装器，因为他们是在用一个新的接口包装另一个对象。


//11.1    适配器的特点
门面元素展现的是一个简化的接口，他并不提供额外的选择，而且又是为了方便完成常见任务它还会做出一些假设。
适配器则要把一个接口转换为另一个接口，它并不会滤除某些能力，也不会简化接口。


//11.2    示例：适配两个库
//从Prototype库的$函数到YUI的get方法的转换
//Prototype $ function
function $(){
	var elements = new Array();
	for(var i = 0;i < arguments.length;i++){
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);
		if (arguments.length == 1) 
			return element;
		elements.push(element);
	}
	return elements;
}

//YUI get method
YAHOO.util.Dom.get = function(el){
	if (YAHOO.lang.isString(el)) {
		return document.getElementById(el);
	};
	if (YAHOO.lang.isArray(el)) {
		var c = [];
		for (var i = 0; len = el.length; ++i) {
			c[c.length] = YAHOO.util.Dom.get(el[i]);
		};
		return c;
	}
	if(el){
		return el;
	}
	return null;
}


二者的区别在于：get具有一个参数，这个参数可以是一个HTML元素、字符串或者由字符串或HTML元素组成的数组，与此不同，￥函数没有正式列出参数，
而是允许客户传入任意数目的参数，不管是字符串还是HTML元素都行。
适配器：
function PrototypeYUIAdapter(){
	return YAHOO.util.Dom.get(arguments);
}
function YUIToPrototypeAdapter(el){
	return $.apply(window,el instanceof Array ? el:[el]);
}

//因此，对于从Prototype改投YUI的人来说，只要添加下面这行代码即可
$ = PrototypeToYUIAdapter;
// 而对于从YUI改投Prototype的人来说，
YAHOO.util.Dom.get = YUIToPrototypeAdapter;



//11.3    示例:适配电子邮件API











//12.0 ########################  装饰者模式
是一种为对象增添特性的技术，它并不使用创建子类这种手段。装饰者模式可用来透明的把对象包装在具有同样接口的另一对象之中。


// 12.1   装饰者的结构
// 装饰者可用于为对象那个增加功能。他可以用来替代大量子类。


// 12.1.1  接口在装饰者模式中的角色

// 12.1.2  装饰者模式与组合模式的比较

// 12.2   装饰者修改其组件的方式

// 12.2.1  在方法之后添加行为
HeadlightDecorator.prototype.getPrice = function(){
	return this.bicycle.getPrice() + 15.00;
}

// 12.2.2  在方法之前添加行为




// 12.2.3  替换方法


// 12.2.4  添加新方法




// 12.3  工厂的角色


// 12.4  函数装饰者

//12.5    装饰者模式的适用场合
如果需要为类增添特性或职责，而从该类派生子类的解决办法并不实际的话，就应该使用装饰者模式。

如果需要为对象增添特性而又不想改变使用该对象的代码的话，使用装饰者模式。




// 12.6  示例：方法性能分析器



// 12.7     装饰者模式好处



// 12.8     装饰者模式弊端
1.在遇到用装饰者包装起来的对象时，那些依赖于类型检查的代码会出问题。
2.使用装饰者模式往往会增加架构的复杂程度。




//13.0 ########################  享元模式

















