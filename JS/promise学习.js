// promise学习.js
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



































































