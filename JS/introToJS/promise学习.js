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























































