// promise的妙用.js
来源：http://www.cnblogs.com/whitewolf/p/promise-best-practice.html



由于浏览器的这种内部事件循环机制，所以JavaScript一直以callback回调的方式来处理事件任务。
因此无所避免的对于多个的JavaScript异步任务的处理，将会遇见”callback hell“（回调地狱），
使得这类代码及其不可读和难易维护。

asyncTask1(data,function(data1){
	asyncTask2(data1,function(data2){
		asyncTask3(data2,function(data3){
			//...魔鬼式的金字塔还在继续
		})
	})
})


promise的横空出世
Promise在英语中语义为：”承诺“，它表示如A调用一个长时间任务B的时候，B将返回一个”承诺“给A，A不用关心整个实施的过程，
继续做自己的任务；当B实施完成的时候，会通过A，并将执行A之间的预先约定的回调。而deferred在英语中语义为：”延迟“，
这也说明promise解决的问题是一种带有延迟的事件，这个事件会被延迟到未来某个合适点再执行。



Promise/A+规范：

Promise 对象有三种状态： 
Pending – Promise对象的初始状态，等到任务的完成或者被拒绝；
Fulfilled – 任务执行完成并且成功的状态；
Rejected – 任务执行完成并且失败的状态；

Promise的状态只可能从“Pending”状态转到“Fulfilled”状态或者“Rejected”状态，而且不能逆向转换，
同时“Fulfilled”状态和“Rejected”状态也不能相互转换；
Promise对象必须实现then方法，then是promise规范的核心，而且then方法也必须返回一个Promise对象，
同一个Promise对象可以注册多个then方法，并且回调的执行顺序跟它们的注册顺序一致；
then方法接受两个回调函数，它们分别为：成功时的回调和失败时的回调；并且它们分别在：
Promise由“Pending”状态转换到“Fulfilled”状态时被调用和在Promise由“Pending”状态转换到“Rejected”状态时被调用。



根据Promise/A+规范，我们在文章开始的Promise伪代码就可以转换为如下代码：

asyncTask1(data)
	.then(function(data1){
		return asyncTask2(data1);
	})
	.then(function(data2){
		return asyncTask3(data2);
	})
	//仍然可以继续then方法


Promise将原来回调地狱中的回调函数，从横向式增加巧妙的变为了纵向增长。以链式的风格，纵向的书写，使得代码更加的可读和易于维护。

Promise的妙用

1.0  多个异步任务的串行处理

在上文中提到的回调地狱案例，就是一种试图去将多个异步的任务串行处理的结果，使得代码不断的横向延伸，可读性和维护性急剧下降。
当然我们也提到了Promise利用链式和延迟执行模型，将代码从横向延伸拉回了纵向增长。使用Angular中$http的实现如下：

$http.get('/demo1')
	.then(function(data){
		console.log('demo1',data);
		return $http.get('/demo2',{params:data.result});
	})
	.then(function(data){
		console.log('demo2',data);
		return $http.get('demo3',{params:data.result});
	})
	.then(function(data){
		console.log('demo3',data.result);
	});


因为Promise是可以传递的，可以继续then方法延续下去，也可以在纵向扩展的途中改变为其他Promise或者数据。所以在例子中的$http也可以
换为其他的Promise（如$timeout，$resource …）。



2.0  多个异步任务的并行处理

在有些场景下，我们所要处理的多个异步任务之间并没有像上例中的那么强的依赖关系，只需要在这一系列的异步任务全部完成的时候执行
一些特定逻辑。这个时候为了性能的考虑等，我们不需要将它们都串行起来执行，并行执行它们将是一个最优的选择。如果仍然采用回调函数，
则这是一个非常恼人的问题。利用Promise则同样可以优雅的解决它：


$q.all([$http.get('/demo1'),
		$http.get('/demo2'),
		$http.get('/demo3'),
	])
.then(function(results){
	console.log('result 1',results[0]);
	console.log('result 2',results[1]);
	console.log('result 3',results[2]);
})



这样就可以等到一堆异步的任务完成后，在执行特定的业务回调了。在Angular中的路由机制ngRoute、uiRoute的resolve机制也是
采用同样的原理：在路由执行的时候，会将获取模板的Promise、获取所有resolve数据的Promise都拼接在一起，同时并行的获取它们，
然后等待它们都结束的时候，才开始初始化ng-view、ui-view指令的scope对象，以及compile模板节点，并插入页面DOM中，
完成一次路由的跳转并且切换了View，将静态的HTML模板变为动态的网页展示出来。

Angular路由机制的伪代码如下：

var getTemplatePromise = function(options){
	//...拼接所有template或者templateUrl
}；
var getResolvePromises = function(resolves){
	//...拼接所有resolve
};
var constrollerLoader = function(options,currentScope,tplAndVars,initLocals){
	//...

	ctrlInstance = $controller(options.controller,ctrlLocals);
	if (options.controllerAs) {
		currentScope[options.controllerAs] = ctrlInstance;
	};
	//...
	return currentScope;
}
var templateAndResolvePromise = $q.all([getTemplatePromise(options)].concat(getResolvePromises(options.resolve || {})));

return templateAndResolvePromise.then(function resolveSuccess(tplAndVars){
	var currentScope = currentScope || $rootScope.$new();
	constrollerLoader(options,currentScope,tplAndVars,initLocals);
	//...compile & append dom
});




3.0   对于同步数据的Promise处理，统一调用接口

有了Promise的处理，因为在前端代码中最多的异步处理就是Ajax，它们都被包装为了Promise .then的风格。
那么对于一部分同步的非异步处理呢？如localStorage、setTimeout、setInterval之类的方法。在大多数情况下，
博主仍然推荐使用Promise的方式包装，使得项目Service的返回接口统一。这样也便于像上例中的多个异步任务的串行、并行处理。
在Angular路由中对于只设置template的情况，也是这么处理的。

对于setTimeout、setInterval在Angular中都已经为我们内置了$timeout和$interval服务，它们就是一种Promise的封装。
对于localStorage呢？可以采用$q.when方法来直接包装localStorage的返回值的为Promise接口，如下所示：

var data = $window.localStorage.getItem('data-api-key');
return $q.when(data);

整个项目的Service层的返回值都可以被封装为统一的风格使用了，项目变得更加的一致和统一。在需要多个Service同时并行或者串行处理的时候，也变得简单了，一致的使用方式。


4.0    对于延迟任务的Promise DSL语义化封装


在前面已经提到Promise是延迟到未来执行某些特定任务，在调用时候则给消费者返回一个”承诺“，消费者线程并不会被阻塞。在消费者接受到”承诺“之后，消费者就不用再关心这些任务是如何完成的，以及督促生产者的任务执行状态等。直到任务完成后，消费者手中的这个”承诺“就被兑现了。

对于这类延迟机制，在前端的UI交互中也是极其常见的。比如模态窗口的显示，对于用户在模态窗口中的交互结果并不可提前预知的，用户是点击”ok“按钮，或者是”cancel“按钮，这是一个未来将会发生的延迟事件。对于这类场景的处理，也是Promise所擅长的领域。在Angular-UI的Bootstrap的modal的实现也是基于Promise的封装。

$modal.open({
	templateUrl:'/templates/modal.html',
	controller:'ModalController',
	controllerAs:'modal',
	resolve:{

	}
})

	.result
	.then(function ok(data){
		//用户点击ok按钮事件
	},function cancel(){
		//用户点击cancel按钮事件
	})

这是因为modal在open方法的返回值中给了我们一个Promise的result对象（承诺）。等到用户在模态窗口中点击了ok按钮，则Bootstrap会使用$q的defer来resolve来执行ok事件；相反，如果用户点击了cancel按钮，则会使用$q的defer来reject执行cancel事件。

这样就很好的解决了延迟触发的问题，也避免了callback的地狱。我们仍然可以进一步将其返回值语义化，以业务自有的术语命名而形成一套DSL API。


function open(data){
	var defer = $q.defer();

	//resolve or reject defer;

	var promise = defer.promise;
	promise.ok = function(func){
		promise.then(func);
		return promise;
	};

	promise.cancel = function(func){
		promise.then(null,func);
		return promise;
	};
	return promise;
}


则我们可以如下方式来访问它：

$modal.open(item)
	.ok(function(data){
		// ok逻辑
	})
	.cancel(function(data){
		// cancel 逻辑
	})


是不是感觉更具有语义呢？在Angular中$http的返回方法success、error也是同样逻辑的封装。将success的注册函数注册为.then方法的成功回调，error的注册方法注册为then方法的失败回调。所以success和error方法只是Angular框架为我们在Promise语法之上封装的一套语法糖而已。

Angular的success、error回调的实现代码：


promise.success = function(fn){
	promise.then(function(response){
		fn(response.data,response.status,response.headers,config);
	});
	return promise;
};

promise.error = function(fn){
	promise.then(null,function(response){
		fn(response.data,response.status,response.headers,config);
	});
	return promise;
}



5.0 利用Promise来实现管道式AOP拦截


http://www.cnblogs.com/whitewolf/p/promise-best-practice.html




################################################
################################################
################################################
################################################

6.0

Promise对象有三种状态：pending（初始状态）  fulfilled（成功执行）  rejected（执行出错）
var fs = require('fs')
var Promise = require('bluebird')
//改造fs.readFile为Promise版本
	var readFileAsync = function(path){
		//返回一个Promise对象，初始状态pending
		return new Promise(function(path){
			fs.readFile(path,'utf8',function(err,content){
				//由 pending 状态进入 rejected 状态
				if (err)return reject(err)
				//由 pending 状态进入 fulfilled 状态
				return fulfill(content)
			})
		})
	}

	//开始使用，调用其then方法，回调接受执行成功的返回值
	readFileAsync('./promise-1.js').then(function(content){
		console.log(content)
	})


// 比较一下传统回调和Promises的使用上的差别
// 需求：读取两个文件并打印内容

//callbacks
fs.readFile('./promise-1.js','utf8',function(err,content1){
	//嵌套一次
	console.log('#',content1)
	fs.readFile('./Promise-1.js','utf8',function(err,content2){
		//第二次嵌套
		console.log('#',content2)
	})
})



//Promises
readFileAsync('./promise-1.js').then(function(content1){
	console.log('#',content)
	//这里返回一个Promise对象
	return readFileAsync('./promiscuitye-1.js')
}).then(function(content2){
	console.log('#',content2)
})




################################################
################################################
################################################
################################################
来源：http://es6.ruanyifeng.com/#docs/promise





// 基本用法
// ES6规定，Promise对象是一个构造函数，用来生成Promise实例。

// 下面代码创造了一个Promise实例。

var promise = new Promise(function(resolve,reject){
	//...some code

	if (/* 异步操作成功 */) {
		resolve(value);
	}else{
		reject(error);
	};
});

// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。

// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

// Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。
promise.then(function(value){
	//success
},function(value){
	//failure
})

// then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

// 下面是一个Promise对象的简单例子。
function timeout(ms){
	return new Promise((resolve,reject) => {
		setTimeout(resolve,ms,'done');
	});
}
timeout(100).then((value) => {
	console.log(value);
})

// 上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。过了指定的时间（ms参数）以后，Promise实例的状态变为Resolved，就会触发then方法绑定的回调函数。

// 下面是异步加载图片的例子。
function loadImageAsync(url){
	return new Promise(function(resolve,reject){
		var image = new Image();

		image.onload = function(){
			resolve(image);
		};
		image.onerror = function(){
			reject(new Error('Could not load image at' + url));
		};
		image.src = url;
	})
}

// 下面是一个用Promise对象实现的Ajax操作的例子。
var getJSON = function(url){
	var promise = new Promise(function(resolve,reject){
		var client = new XMLHttpRequest();
		client.open("GET",url);
		client.onreadystatechange = handler;
		client.responseType = "json";
		client.setRequestHeader("Accept","application/json");
		client.send();

		function handler(){
			if (this.readyState !== 4) {
				return;
			}
			if (this.status === 200) {
				resolve(this.response);
			}else{
				reject(new Error(this.statusText));
			}
		};
	});
	return promise;
};

getJSON("/posts.json").then(function(json){
	console.log('Contents:' + json);
},function(error){
	console.error('出错了',error);
});


// 上面代码中，getJSON是对XMLHttpRequest对象的封装，用于发出一个针对JSON数据的HTTP请求，并且返回一个Promise对象。需要注意的是，在getJSON内部，resolve函数和reject函数调用时，都带有参数。

// 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个Promise实例，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作，比如像下面这样。

var p1 = new Promise(function(resolve, reject){
  // ...
});

var p2 = new Promise(function(resolve, reject){
  // ...
  resolve(p1);
})
// 上面代码中，p1和p2都是Promise的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

// 注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是Pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是Resolved或者Rejected，那么p2的回调函数将会立刻执行。

var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})
var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})
p2.then(result => console.log(result))
p2.catch(error => console.log(error))
// Error: fail


// 上面代码中，p1是一个Promise，3秒之后变为rejected。p2的状态由p1决定，1秒之后，p2调用resolve方法，但是此时p1的状态还没有改变，因此p2的状态也不会变。又过了2秒，p1变为rejected，p2也跟着变为rejected。


// 3.0  Promise.prototype.then()
// Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为Promise实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。

// then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

getJSON("/posts.json").then(function(json){
	return json.post;
}).then(function(post){
	//...
})

// 上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

// 采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
getJSON("/post/1.json").then(function(post){
	return getJSON(post.commentURL);
}).then(function funA(comments){
	console.log("Resolved:",comments);
},function funcB(err){
	console.log("Rejected:",err);
});

// 上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为Resolved，就调用funcA，如果状态变为Rejected，就调用funcB。

// 如果采用箭头函数，上面的代码可以写得更简洁。
getJSON("/post/1.json").then(
	post => getJSON(post.commentURL)
).then(
	comments => console.log("Resolved:",comments),
	err => console.log("Rejected:",err)
);

// 4.0  Promise.prototype.catch()
// Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
getJSON("/posts.json").then(function(posts){
	//...
}).catch(function(error){
	//处理前一个回调函数运行时发生的错误
	console.log('发生错误',error);
});


// 上面代码中，getJSON方法返回一个Promise对象，如果该对象状态变为Resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为Rejected，就会调用catch方法指定的回调函数，处理这个错误。
p.then((val) => console.log("fulfilled:",val))
  .catch((err) => console.log("rejected:",err));

//等同于
p.then((val) => console.log("fulfilled:",val))
  .then(null,(err) => console.log("rejected:",err));




// Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
// 上面代码中，一共有三个Promise对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。

// 一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。

//bad
promise
  .then(function(data){
  	//success
  },function(err){
  	//error
  });

//good
promise
  .then(function(data){
  	//success
  })
  .catch(function(err){
  	//error

  })

// 上面代码中，第二种写法要好于第一种写法，理由是前者更接近同步的写法（try/catch）。



####################################
################################################
################################################
// Examples
// Creating a Promise

'use strict';
var promiseCount = 0;
function testPromise(){
	var thisPromiseCount = ++promiseCount;

	var log = document.getElementById('log');
	log.insertAdjacentHTML('beforeend',thisPromiseCount +
		')Started(<small>Sync code started</small>)<br/>')
    // We make a new promise: we promise the string 'result' (after waiting 3s)

	var p1 = new Promise(
		 // The resolver function is called with the ability to resolve or
        // reject the promise

		function(resolve,reject){
			log.insertAdjacentHTML('beforeend',thisPromiseCount + 
				 ') Promise started (<small>Async code started</small>)<br/>');
            // This is only an example to create asynchronism)
			window.setTimeout(
				function(){
					//we fulfill the promise!
					resolve(thisPromiseCount);
				},Math.random() * 2000 + 1000);
				
		});
	// We define what to do when the promise is fulfilled
	//but we only call this if the promise is resolved/fulfilled
	p1.then(
		//Just log the message and a value
		function(val){
			log.insertAdjacentHTML('beforeend',val+
				 ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
		})
	.catch(
		//Rejected promises are passed on by Promise.prototype.then(onFulfilled)
		function(reason){
			console.log('Handle rejected promise('+reason+')here.');
		});
	log.insertAdjacentHTML('beforeend',thisPromiseCount + 
		') Promise made (<small>Sync code terminated</small>)<br/>');


}




// Example using new XMLHttpRequest()
// Creating a Promise

// This example shows the implementation of a method which uses a Promise to report the success or failure of an XMLHttpRequest.
'use strict';
//A-> $http function is implemented in order to follow the standard Adapter pattern
function $http(url){
	//A small example of object
	var core = {
		//Method that performs the ajax request
		ajax:function(method,url,args){
			//Creating a promise
			var promise = new Promise(function (resolve,reject){
				//Instantiates the XMLHttpRequest
				var client = new XMLHttpRequest();
				var url = url;

				if (args && (method === 'POST' || method === 'PUT')) {
					url += '?';
					var argcount = 0;
					for(var key in args){
						if (args.hasOwnProperty(key)) {
							if (argcount++) {
								uri += '&';
							};
							uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
						};
					}
				};
				client.open(method,uri);
				client.send();

				client.onload = function(){
					if(this.status >= 200 && this.status < 300){
						//Performs the function "resolve" when this.status is equal to 2xx
						resolve(this.response);
					}else{
						//Performs the function "reject" when this.status is diffenrent than 2xx
						reject(this.statusText);
					}
				};
				client.onerror = function(){
					reject(this.statusText);
				}
			});

			//Adapter pattern
			return {
				'get' : function(args){
					return core.ajax('GET',url,args);
				},
				'post' : function(args){
					return core.ajax('POST',url,args);
				},
				'put' : function(args){
					return core.ajax('DELETE',url,args);
				}
			};
		};
		//End A


		//B-> Here you define its functions and its payload
		var mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
		var payload = {
		  'topic' : 'js',
		  'q'     : 'Promise'
		};
		
		var callback = {
		  success : function(data){
		     console.log(1, 'success', JSON.parse(data));
		  },
		  error : function(data){
		     console.log(2, 'error', JSON.parse(data));
		  }
		};
		// End B


		//Executes the method call
		$http(mdnAPI)
		  .get(payload)
		  .then(callback,success)
		  .catch(callback,error);

		//Executes the method call but an alternative way (1) to handle Promise Reject case 
		$http(mdnAPI) 
		  .get(payload) 
		  .then(callback.success, callback.error);
		
		// Executes the method call but an alternative way (2) to handle Promise Reject case 
		$http(mdnAPI) 
		  .get(payload) 
		  .then(callback.success)
		  .then(undefined, callback.error);

















































