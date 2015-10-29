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





















