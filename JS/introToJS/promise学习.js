// promise学习.js


1.0   

// 使用了回调函数的异步处理
getAsynd("fileA.txt",function(error,result){
	if (error) {  //取得失败时的处理
		throw error;
	};
	//取得成功时的处理
})

//下面是使用了Promise进行异步处理的一个例子
var promise = getAsyncPromise("fileA.txt");
promise.then(function(result){
	//获取文件内容成功时的处理
}).catch(function(error){
	//获取文件内容失败时的处理
});



// 我们可以向这个预设了抽象化异步处理的promise对象， 注册这个promise对象执行成功时和失败时相应的回调函数。

// 这和回调函数方式相比有哪些不同之处呢？ 在使用promise进行一步处理的时候，我们必须按照接口规定的方法编写处理代码。

// 也就是说，除promise对象规定的方法(这里的 then 或 catch)以外的方法都是不可以使用的， 而不会像回调函数方式那样可以自己自由的定义回调函数的参数，而必须严格遵守固定、统一的编程方式来编写代码。

// 这样，基于Promise的统一接口的做法， 就可以形成基于接口的各种各样的异步处理模式。

// 所以，promise的功能是可以将复杂的异步处理轻松地进行模式化， 这也可以说得上是使用promise的理由之一。

// 接下来，让我们在实践中来学习JavaScript的Promise吧。



// 三种类型之一 Constructor
// 要想创建一个promise对象、可以使用new来调用Promise的构造器来进行实例化。
var promise = new Promise(function(resolve,reject){
	//异步处理
	//处理结束后、调用resolve 或 reject
})


// 三种类型之二 Instance Method
// 对通过new生成的promise对象为了设置其值在 resolve(成功) / reject(失败)时调用的回调函数 可以使用promise.then() 实例方法
promise.then(onFullfilled,onRejected)

// resolve(成功)时
// onFulfilled 会被调用

// reject(失败)时
// onRejected 会被调用
// onFulfilled、onRejected 两个都为可选参数。

// promise.then 成功和失败时都可以使用。 另外在只想对异常进行处理时可以采用 promise.then(undefined, onRejected) 这种方式，只指定reject时的回调函数即可。 不过这种情况下 promise.catch(onRejected) 应该是个更好的选择。

// promise.catch(onRejected)


// 三种类型之三 Static Method
// 静态方法
Promise.all()
Promise.resolve()

// promise-workflow.js
function asyncFunction(){
	return new Promise(function (resolve,reject){
		setTimeout(function(){
			resolve('Async Hello world');
		},16);
	});
}

asyncFunction().then(function(value){
	console.log(value);
}).catch(function(error){
	console.log(error);
})


// 创建XHR的promise对象

// 首先，创建一个用Promise把XHR处理包装起来的名为 getURL 的函数。
// xhr-promise.js
function getURL(URL){
	return new Promise(function(resolve,reject){
		var req = new XMLHttpRequest();
		req.open('GET',URL,true);
		req.onload = function(){
			if (req.status === 200) {
				resolve(req.responseText);
			}else{
				reject(new Error(req.statusText));
			};
		}
		req.onerror = function(){
			reject(new Error(req.statusText));
		}
		req.send();
	})
}
//运行示例
var URL = "http://httpbin.org/get";
getURL(URL).then(function onFullfilled(value){
	console.log(value);
}).catch(function onRejected(error){
	console.error(error);
})




2.0    
// 以下总结了"异步模式"编程的几种方法，理解它们可以让你写出结构更合理、性能更出色、维护更方便的JavaScript程序。

2.1   回调函数
// 回调函数是异步编程最基本的方法。
// 假定有两个函数f1和f2，后者等待前者的执行结果。
f1();
f2();
// 如果f1是一个很耗时的任务，可以考虑改写f1，把f2写成f1的回调函数。
function f1(callback){
	setTimeout(function(){
		//f1 的任务代码
		callback();
	},1000);
}
// 执行代码就变成下面这样：
f1(f2);
// 采用这种方式，我们把同步操作变成了异步操作，f1不会堵塞程序运行，相当于先执行程序的主要逻辑，将耗时的操作推迟执行。

// 回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），使得程序结构混乱、流程难以追踪（尤其是回调函数嵌套的情况），而且每个任务只能指定一个回调函数

2.2   事件监听
// 另一种思路是采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

// 还是以f1和f2为例。首先，为f1绑定一个事件（这里采用的jQuery的写法）。
f1.on('done',f2);
// 上面这行代码的意思是，当f1发生done事件，就执行f2。然后，对f1进行改写：
function f1(){
	setTimeout(function(){
		//f1的任务代码
		f1.trigger('done');
	},1000);
}
// f1.trigger('done')表示，执行完成后，立即触发done事件，从而开始执行f2。

// 这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"（Decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。


2.3    发布/订阅
// "事件"完全可以理解成"信号"，如果存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）。

// 这个模式有多种实现，下面采用的是Ben Alman的Tiny Pub/Sub，这是jQuery的一个插件。

// 首先，f2向"信号中心"jQuery订阅"done"信号。
jQuery.subscribe("done",f2);
// 然后，f1进行如下改写：
function f1(){
	setTimeout(function(){
		//f1的任务代码
		jQuery.publish("done");
	},1000);
}
// jQuery.publish("done")的意思是，f1执行完成后，向"信号中心"jQuery发布"done"信号，从而引发f2的执行。

// f2完成执行后，也可以取消订阅（unsubscribe）。
jQuery.unsubscribe("done",f2);
// 这种方法的性质与"事件监听"类似，但是明显优于后者。因为我们可以通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。


3.0  异步操作的流程控制
// 如果有多个异步操作，就存在一个流程控制的问题：确定操作执行的顺序，以后如何保证遵守这种顺序。

function async(arg,callback){
	console.log('参数为' + arg +',1秒后返回结果');
	setTimeout(function(){callback(arg * 2);},1000);
}

// 上面代码的async函数是一个异步任务，非常耗时，每次执行需要1秒才能完成，然后再调用回调函数。
// 如果有6个这样的异步任务，需要全部完成后，才能执行下一步的final函数。
function final(value){
	console.log('完成:',value);
}
// 请问应该如何安排操作流程？
async(1,function(value){
	async(value,function(value){
		async(value,function(value){
			async(value,function(value){
				async(value,function(value){
					async(value,final);
				})
			})
		})
	})
})
// 上面代码采用6个回调函数的嵌套，不仅写起来麻烦，容易出错，而且难以维护。

3.1  串行执行
// 我们可以编写一个流程控制函数，让它来控制异步任务，一个任务完成以后，再执行另一个。这就叫串行执行。 
var items = [1,2,3,4,5,6];
var results = [];
function series(item){
	if (item) {
		async(item,function(result){
			result.push(result);
			return series(items.shift());
		});
	}else{
		return final(results);
	};
}
series(items.shift());
// 上面代码中，函数series就是串行函数，它会依次执行异步任务，所有任务都完成后，才会执行final函数。items数组保存每一个异步任务的参数，results数组保存每一个异步任务的运行结果。

3.2    并行执行
// 流程控制函数也可以是并行执行，即所有异步任务同时执行，等到全部完成以后，才执行final函数。
var items = [1,2,3,4,5,6];
var results = [];

items.forEach(function(item){
	async(item,function(result){
		results.push(result);
		if (results.length == items.length) {
			final(results);
		};
	})
});
// 上面代码中，forEach方法会同时发起6个异步任务，等到它们全部完成以后，才会执行final函数。

// 并行执行的好处是效率较高，比起串行执行一次只能执行一个任务，较为节约时间。但是问题在于如果并行的任务较多，很容易耗尽系统资源，拖慢运行速度。因此有了第三种流程控制方式。


3.3    并行与串行的结合
// 所谓并行与串行的结合，就是设置一个门槛，每次最多只能并行执行n个异步任务。这样就避免了过分占用系统资源。
var items = [1,2,3,4,5,6];
var results = [];
var running = 0;
var limit = 2;

function launcher(){
	while(running < limit && items.length > 0){
		var item = items.shift();
		async(item,function(result){
			results.push(result);
			running--;
			if (items.length > 0) {
				launcher();
			}else if(running == 0){
				final();
			};
		});
		running++;
	}
}
launcher();
// 上面代码中，最多只能同时运行两个异步任务。变量running记录当前正在运行的任务数，只要低于门槛值，就再启动一个新的任务，如果等于0，就表示所有任务都执行完了，这时就执行final函数。



4.0   Promise对象

// 简单说，它的思想是，每一个异步任务立刻返回一个Promise对象，由于是立刻返回，所以可以采用同步操作的流程。这个Promises对象有一个then方法，允许指定回调函数，在异步任务完成后调用。比如，f1的回调函数f2,可以写成：
(new Promise(f1)).then(f2);
// 这种写法对于嵌套的回调函数尤其有用。

//传统写法
step1(function (value1) {
    step2(value1, function(value2) {
        step3(value2, function(value3) {
            step4(value3, function(value4) {
                // ...
            });
        });
    });
});

// Promises的写法
(new Promise(step1))
.then(step2)
.then(step3)
.then(step4);

// 从上面代码可以看到，采用Promises接口以后，程序流程变得非常清楚，十分易读。

// 总的来说，传统的回调函数写法使得代码混成一团，变得横向发展而不是向下发展。Promises规范就是为了解决这个问题而提出的，
// 目标是使用正常的程序流程（同步），来处理异步操作。它先返回一个Promise对象，后面的操作以同步的方式，寄存在这个对象上面。
// 等到异步操作有了结果，再执行前期寄放在它上面的其他操作。

4.1  Promise接口
// Promise对象的运行结果，最终只有两种。

//~~ 得到一个值，状态变为fulfilled
//~~ 抛出一个错误，状态变为rejected

// promise对象的then方法用来添加回调函数。它可以接受两个回调函数，第一个是操作成功（fulfilled）时的回调函数，第二个是操作失败（rejected）时的回调函数（可以不提供）。一旦状态改变，就调用相应的回调函数。

(new Promise(step1))
.then(step2)
.then(step3)
.then(step4)
.then(console.log, console.error);

// 再来看上面的代码就很清楚，step1是一个耗时很长的异步任务，然后使用then方法，依次绑定了三个step1操作成功后的回调函数step2、step3、step4，最后再用then方法绑定两个回调函数：操作成功时的回调函数console.log，操作失败时的回调函数console.error。

// console.log和console.error这两个最后的回调函数，用法上有一点重要的区别。console.log只显示回调函数step4的返回值，而console.error可以显示step2、step3、step4之中任何一个发生的错误。也就是说，假定step2操作失败，抛出一个错误，这时step3和step4都不会再运行了，promises对象开始寻找接下来的第一个错误回调函数，在上面代码中是console.error。所以，结论就是Promises对象的错误有传递性。

// 换言之，上面的代码等同于下面的形式。

try {
  var v1 = step1();
  var v2 = step2(v1);
  var v3 = step3(v2);
  var v4 = step4(v3);
  console.log(v4);
} catch (error) {
  console.error(error);
}
// 上面代码表示，try部分任何一步的错误，都会被catch部分捕获，并导致整个Promise操作的停止

4.2       用法辨析
// Promise的用法，简单说就是一句话：使用then方法添加回调函数。但是，不同的写法有一些细微的差别，请看下面四种写法，它们的差别在哪里？

// 写法一
doSomething().then(function () {
  return doSomethingElse();
});

// 写法二
doSomething().then(function () {
  doSomethingElse();
});

// 写法三
doSomething().then(doSomethingElse());

// 写法四
doSomething().then(doSomethingElse);

// 为了便于解释，上面四种写法都再用then方法接一个回调函数。

// 写法一的finalHandler回调函数的参数，是doSomethingElse函数的运行结果。

doSomething().then(function () {
  return doSomethingElse();
}).then(finalHandler);

// 写法二的finalHandler回调函数的参数，是undefined。

doSomething().then(function () {
  doSomethingElse();
}).then(finalHandler);

// 写法三的finalHandler回调函数的参数，是doSomethingElse函数返回的回调函数的运行结果。

doSomething().then(doSomethingElse())
  .then(finalHandler);

// 写法四与写法一只有一个差别，那就是doSomethingElse会接收到doSomething()返回的结果。

doSomething().then(doSomethingElse)
  .then(finalHandler);


4.3       Promises对象的实现
// 为了真正理解Promise对象，下面我们自己动手写一个Promise的实现。

// 首先，将Promise定义成构造函数
var Promise = function(){
	this.state = 'pending';
	this.thenables = [];
};

// 上面代码表示，Promise的实例对象的state属性默认为“未完成”状态（pending），还有一个thenables属性指向一个数组，用来存放then方法生成的内部对象。
// 接下来，部署实例对象的resolve方法，该方法用来将实例对象的状态从“未完成”变为“已完成”。
Promise.prototype.resolve = function(value){
	if (this.state != 'pending') return;

	this.state = 'fulfilled';
	this.value = value;
	this._handleThen();
	return this;
}

// 上面代码除了改变实例的状态，还将异步任务的返回值存入实例对象的value属性，然后调用内部方法_handleThen，最后返回实例对象本身。

// 类似地，部署实例对象的reject方法。
Promise.prototype.reject = function(reason){
	if (this.state != 'pending') return;

	this.state = 'rejected';
	this.reason = reason;
	this._handleThen();
	return this;
};

// 然后，部署实例对象的then方法。它接受两个参数，分别是异步任务成功时的回调函数（onFulfilled）和出错时的回调函数（onRejected）。
// 为了可以部署链式操作，它必须返回一个新的Promise对象。

Promise.prototype.then = function(onFullfilled,onRejected){
	var thenable = {};

	if (typeof onFullfilled == 'function') {
		thenable.fulfill = onFullfilled;
	};
	if (typeof onRejected == 'function') {
		thenable.reject = onRejected;
	};
	if (this.state != 'pending') {
		setImmediate(function(){
			this._handleThen();

		}.bind(this));
	};
	thenable.promise = new Promise();
	this.thenables.push(thenable);

	return thenable.promise;
}

// 上面代码首先定义了一个内部变量thenable对象，将then方法的两个参数都加入这个对象的属性。然后，检查当前状态，如果不等于“未完成”，
// 则在当前操作结束后，立即调用_handleThen方法。接着，在thenable对象的promise属性上生成一个新的Promise对象，
// 并在稍后返回这个对象。最后，将thenable对象加入实例对象的thenables数组。

// 下一步就要部署内部方法_handleThen，它用来处理通过then方法绑定的回调函数。
Promise.prototype._handleThen = function(){
	if (this.state === 'pending') return;

	if (this.thenable.length) {
		for (var i = 0; i < this.thenables.length; i++) {
			var thenPromise = this.thenables[i].promise;
			var returnedVal;
			try{
				//运行回调函数

			}catch(e){
				thenPromise.reject(e);
			}
		};
		this.thenables = [];
	};
}

// 上面代码的逻辑是这样的：如果实例对象的状态是“未完成”，就返回，否则检查thenables属性是否有值。如果有值，表明里面储存了需要执行的回调函数，则依次运行回调函数。运行完成后，清空thenables属性。

// 之所以把回调函数的执行放在try...catch结构中，是因为一旦出错，就会自动执行catch代码块，从而可以运行下一个Promise实例对象的reject方法，这使得调用reject方法变得很简单。下面是try代码块中的代码。

try {
  switch (this.state) {
    case 'fulfilled':
      if (this.thenables[i].fulfill) {
        returnedVal = this.thenables[i].fulfill(this.value);
      } else {
        thenPromise.resolve(this.value);
      }
      break;
    case 'rejected':
      if (this.thenables[i].reject) {
        returnedVal = this.thenables[i].reject(this.reason);
      } else {
        thenPromise.reject(this.reason);
      }
      break;
  }
  if (returnedVal === null) {
    this.thenables[i].promise.resolve(returnedVal);
  } else if (returnedVal instanceof Promise || typeof returnedVal.then === 'function') {
    returnedVal.then(thenPromise.resolve.bind(thenPromise), thenPromise.reject.bind(thenPromise));
  } else {
    this.thenables[i].promise.resolve(returnedVal);
  }
}
// 上面代码首先根据实例对象的状态，分别调用fulfill或reject回调函数，并传入相应的参数，并将返回值存入returnVal变量。然后再去改变this.thenables[i].promise对象的状态，触发下一个Promise对象的resolve或者reject方法。

// 针对returnedVal的判断，目的是如果returnedVal是一个Promise对象，那么后面的回调函数都要改为绑定在它上面。

// 最后，由于我们写的是供调用的函数库，需要将构造函数输出。

module.exports = Promise;


4.4    Promise的应用
4.4.1   加载图片
// 我们可以把图片的加载写成一个Promise
var preloadImage = function(path){
	return new Promise(function(resolve,reject){
		var image = new Image();
		image.onload = resolve;
		image.onerror = reject;
		image.src = path;
	});
};
4.4.2   Ajax操作
// Ajax操作是典型的异步操作，传统上往往写成下面这样。
function search(term,onload,onerror){
	var xhr,results,url;

	url = 'http://example.com/search?q=' + term;

	xhr = new XMLHttpRequest();
	xhr.open('GET',url,true);

	xhr.onload = function(e){
		if (this.status === 200){
			results = JSON.parse(this.responseTest);
			onload(results);
		};
	}
	xhr.onerror = function(e){
		onerror(e);
	}
	xhr.send();
}
search("Hello World",f1,f2);

// 上面代码的回调函数，必须直接传入。如果使用Promises方法，就可以写成下面这样。
function search(term){
	var url = 'http://example.com/search?q=' + term;
	var p = new Promise();
	var xhr = new XMLHttpRequest();
	var result;

	xhr.open('GET',url,true);
	xhr.onload = function(e){
		if (this.status === 200) {
			results = JSON.parse(this.responseText);
			p.resolve(results);
		};
	}
	xhr.onerror = function(e){
		p.reject(e);
	};
	xhr.send();
	return p;

}
search("Hello World").then(f1,f2);

// 用了Promises以后，回调函数就可以用then方法加载。

4.5   小结
// Promises的优点在于，让回调函数变成了规范的链式写法，程序流程可以看得很清楚。它的一整套接口，可以实现许多强大的功能，比如为多个异步操作部署一个回调函数、为多个回调函数中抛出的错误统一指定处理方法等等。

// 而且，它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。这种方法的缺点就是，编写和理解都相对比较难。

// 实际可以使用的Promises实现，参见jQuery的deferred对象一节。




















