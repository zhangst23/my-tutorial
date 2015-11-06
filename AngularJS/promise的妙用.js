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





















