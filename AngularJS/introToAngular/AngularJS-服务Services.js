
// Angular带来了很多类型的services。每个都会它自己不同的使用场景。我们将在本节来阐述。

// 首先我们必须记在心里的是所有的services都是singleton(单例)的，这也是我们所希望得到的预期结果。

// 下面让我开始今天的services之旅吧：

1.0   Constant 
<script>
	app.constant('fooConfig',{
		config1:true,
		config2:"Default config2"
	});

</script>

// constant是个很有用的东东，我们经常会用于对directive之类的做配置信息。所以当你想创建一个directive，
// 并且你希望能够做一些配置信息，同时给些默认的配置，constant是个不错的的选择。

// constant可以译作常量，因为我们所设置的值value是不能被改变的。其可以接受基础类型和object对象。
<!DOCTYPE html>
<html ng-app="app">
<head>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
<meta charset=utf-8 />
<title>JS Bin</title>
</head>
  <body ng-controller="MainCtrl">
    config1: {{fooConfig.config1}}
    <br />
    config2: {{fooConfig.config2}}


 	<script>
    	app = angular.module("app", []);

		app.controller('MainCtrl', function($scope, fooConfig) {
		  $scope.fooConfig = fooConfig;
		});
		
		app.constant('fooConfig', {
		  config1: true,
		  config2: "Default config2"
		});
    </script>
  </body>
</html>


// output:

// config1: true 
// config2: Default config2




2.0  Value 

// Value和上面的constant很相似，唯一是其在赋值后还可以被改变。它也被常用于directive配置信息。
// Value service只会保留values，我们不会在service中计算其值。
<!DOCTYPE html>
<html ng-app="app">
<head>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
<meta charset=utf-8 />
<title>JS Bin</title>
</head>
  <body ng-controller="MainCtrl">
    config1: {{fooConfig.config1}}
    <br />
    config2: {{fooConfig.config2}}
    <br />
    config3: {{fooConfig.config3}}

    <script>
    	app = angular.module("app", []);

		app.controller('MainCtrl', function($scope, fooConfig) {
		  $scope.fooConfig = fooConfig;
		  angular.extend(fooConfig, {config3: "I have been extended"});
		});
		
		app.value('fooConfig', {
		  config1: true,
		  config2: "Default config2 but it can changes"
		});
    </script>
  </body>
</html>


// output:

// config1: true 
// config2: Default config2 but it can changes 
// config3: I have been extended



3.0    Factory 
<script>
app.factory('foo', function() {

var thisIsPrivate = "Private";

function getPrivate() {

return thisIsPrivate;

}



return {

variable: "This is public",

getPrivate: getPrivate

};

});
</script>


// Factory是我们最常用的service。其很容易被理解。

// factory会返回一个object对象，至于你如何创建这个对象angular没任何限制。
// 在示例中我选择了我喜欢的模式 Revealing module pattern,你可以选择其他你所希望的方式。

// 如我之前所说，所有的services都是singleton的，所以当我们修改foo.variable的时候，会影响到其他使用的地方

<!DOCTYPE html>
<html ng-app="app">
<head>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
<meta charset=utf-8 />
<title>JS Bin</title>
</head>
  <body ng-controller="MainCtrl">
    public variable: {{foo.variable}}
    <br />
    private variable (through getter): {{foo.getPrivate()}}
  	
  	<script>

		app = angular.module("app", []);
		
		app.controller('MainCtrl', function($scope, foo) {
		  $scope.foo = foo;
		});
		
		app.factory('foo', function() {
		  var thisIsPrivate = "Private";
		  function getPrivate() {
		    return thisIsPrivate;
		  }
		  
		  return {
		    variable: "This is public",
		    getPrivate: getPrivate
		  };
		});
  	</script>
  </body>
</html>



4.0    Service 

<script>
app.service('foo', function() {

var thisIsPrivate = "Private";

this.variable = "This is public";

this.getPrivate = function() {

return thisIsPrivate;

};

});
</script>
 

// Service service和factory工作原理一样，只是他service接收的是一个构造函数，当第一次使用service的时候，
// angular会new Foo() 来初始化这个对象。以后的时候返回的都是同一个对象。

// 实际上，下面是factory等价的写法：

<script>
app.factory('foo2', function() {

return new Foobar();

});

function Foobar() {

var thisIsPrivate = "Private";

this.variable = "This is public";

this.getPrivate = function() {

return thisIsPrivate;

};

}
</script>
 

// Foobar是一个class(类)在factory中我们手动初始化它，在返回它。和service一样Foobar class只在第一次初始化，
// 并以后返回的都是同一个对象。

// 如果我们已经存在了一个class，那么我可以直接使用：

app.service('foo3', Foobar);



5.0    Provider
// Provider 在angular中是个最终的高级选项，在上例factory中最后一个示例用provider将是如下：

<script>
app.provider('foo', function() {

return {

$get: function() {

var thisIsPrivate = "Private";

function getPrivate() {

return thisIsPrivate;

}

return {

variable: "This is public",

getPrivate: getPrivate

};

}

};

});
</script>



6.0   理解
// AngularJS服务是一种能执行一个常见操作的单例，比如$http服务是用来操作浏览器的XMLHttpRequest对象的。

// 要使用AngularJS服务，你只需要在需要的地方（控制器，或其他服务）指出依赖就行了。AngularJS的依赖注入系统会帮你完成剩下的事情。
// 它负责实例化，查找左右依赖，并且按照工场函数要求的样子传递依赖。

// AngularJS通过“构造器注入”来注入依赖（通过工场函数来传递依赖）。以为Javascript是动态类型语言，AngularJS无法通过静态类型
// 来识别服务，所以你必须使用$inject属性来显式地指定依赖。比如:formatDate

myController.$inject = ['$location'];
// AngularJS web框架提供了一组常用操作的服务。和其他的内建变量或者标识符一样，内建服务名称也总是以"$"开头。
// 另外你也可以创建你自己的服务。


6.1    创建服务
// 如果你要创建一个很棒的应用，你可能还是要写自己的服务。(1)你可以通过在模块中注册一个服务工场函数，
// 或者(2)通过Modeul#factory api或者(3)直接通过模块配置函数中的$provide api来实现。

// 所有的服务都符合依赖注入的原则。它们用一个唯一的名字将自己注册进AngularJS的依赖注入系统（injector），并且声明需要提供给工场函数的依赖。它们的依赖在测试中可以是虚拟的，这使得它们能很好地被测试。

 6.2  注册服务
// 要注册服务，你首先要有一个包含该服务的模块。然后你就能通过模块的api或者使用模块配置函数中的$provide服务来注册你的服务了。下面的伪代码显示了这两种方法。

// 使用angular.Module api:
var  myModule = angular.module('myModule',[]);
myModule.factory('serviceId',function(){
	var shinyNewServiceInstance;
	//factory function body that constructs shinyNewServiceInstance
	return shinyNewServiceInstance;
})

// 使用$provide服务:
angular.module('myModule',[],function($provide){
	$provide.factory('serviceId',function(){
		var shinyNewServiceInstance;
		//factory function body that constructs shinyNewServiceInstance
		return shinyNewServiceInstance;
	})
})

// 注意，你不应该注册一个服务实例，而是一个会在被调用时创建实例的工场函数。

6.2  依赖

// 服务不仅可以被依赖，还可以有自己的依赖。依赖可以在工场函数的参数中指定。参阅AngularJS的依赖注入系统，和使用依赖的数组表示法和$inject属性来让依赖表示精简化。

// 下面是一个很简单的服务的例子。这个服务依赖于$window服务（会被当成参数传递给工场函数），并且只是个函数。这个服务的任务是存储所有的通知；在第三个通知以后，服务会用window的alert来输出所有的通知。
angular.module('myModule',[],function($provide){
	$provide.factory('notify',['$window',function(win){
		var msgs = [];
		return function(msg){
			msgs.push(msg);
			if (msgs.length == 3) {
				win.alert(msgs.join("\n"));
				msgs = [];
			};
		}
	}])
})


// 作为单例的服务

// 最好，要注意的是所有AngularJS服务都是单例的。这意味着在每一个注入器中都只有一个需要的服务的实例。因为AngularJS极度讨厌全局的东西，所以是可以创建多个注入器的，并且每个住一起有自己的服务实例。但这种情况很少，除非在测试中，这样的特性才极度重要。



7.0  将服务注入到控制器中

// 将服务用作控制器的依赖和将服务用作其他服务的依赖很类似。

// 因为Javascript是一种动态语言，依赖注入系统无法通过静态类型来知道应该注入什么样的服务（静态类型语言就可以）。
// 所以，你应该$inject的属性来指定服务的名字，这个属性是一个包含这需要注入的服务的名字字符串的数组。
// 名字要和服务注册到系统时的名字匹配。服务的名称的顺序也很重要：当执行工场函数时传递的参数是依照数组里的顺序的。
// 但是工场函数中参数的名字不重要，但最好还是和服务本身的名字一样，下面展示了这样的好处:formatDate
function myController($loc,$log){
	this.firstMethod = function(){
		//use $location service
		$loc.setHash();
	};
	this.secondMethod = function(){
		//use $log service
		$log.info('...');
	};
}
//which services to inject ?
myController.$inject = ['$location','$log'];


// index.html:

<!doctype html>
<html ng-app="MyServiceModule">
  <head>
    <script src="http://code.angularjs.org/angular-1.0.2.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="myController">
      <p>Let‘s try this simple notify service, injected into the controller...</p>
      <input ng-init="message='test'" ng-model="message" >
      <button ng-click="callNotify(message);">NOTIFY</button>
    </div>
  </body>
</html>


// script.js
angular.
  module('MyServiceModule',[]).
  factory('notify',['$window',function(win){
  	var msgs = [];
  	return function(msg){
  		msgs.push(msg);
  		if (msgs.length == 3) {
  			win.alert(msgs.join("\n"));
  			msgs = [];
  		};
  	};
  }]);

function myController(scope,notifyService){
	scope.callNotify = function(msg){
		notifyService(msg);
	};
}

myController.$inject = ['$scope','notify'];


// end to end test：

it('should test service', function() {
    expect(element(':input[ng\\:model="message"]').val()).toEqual('test');
});



7.1   隐式依赖注入

// AngularJS依赖注入系统的新特性使得AngularJS可以通过参数名称来判断依赖。让们重写上面的例子，展示一下隐式地依赖$window, $scope：

index.html:

<!doctype html>
<html ng-app="MyServiceModuleDI">
  <head>
    <script src="http://code.angularjs.org/angular-1.0.2.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="myController">
      <p>Let’s try the notify service, that is implicitly injected into the controller...</p>
      <input ng-init="message='test'" ng-model="message">
      <button ng-click="callNotify(message);">NOTIFY</button>
    </div>
  </body>
</html>


// script.js:

angular.
 module('MyServiceModuleDI', []).
 factory('notify', function($window) {
    var msgs = [];
    return function(msg) {
      msgs.push(msg);
      if (msgs.length == 3) {
        $window.alert(msgs.join("\n"));
        msgs = [];
      }
    };
  });

function myController($scope, notify) {
  $scope.callNotify = function(msg) {
    notify(msg);
  };
// 但是如你要压缩你的代码，你的变量名会被重命名，你就只能显示地指定依赖了。



8.0    管理服务依赖

// AngularJS允许服务声明它的实例和构造依赖的服务。

// 要声明依赖，你可以在工场方法参数中隐式指明他们，也可以将$inject属性设置成包含了依赖名称的数组，或者是使用数组表示法。
// 不推荐使用$inject属性的这种方法。

// 使用数组表示法:
function myModuleCfgFn($provide){
	$provide.factory('myService',['dep1','dep2',function(dep1,dep2){}]);
}
//使用$inject属性
function myModuleCfgFn($provide){
	var myServiceFactory = function(dep1,dep2) {};
	myServiceFactory.$inject = ['dep1','dep2'];
	$provide.factory('myService',myServiceFactory);
}

// 使用隐式依赖(使用代码压缩是会失效):

function myModuleCfgFn($provide) {
  $provide.factory('myService', function(dep1, dep2) {});
}



// 下面是一个互相依赖的两个服务的例子。它们也依赖了其他AngularJS提供的服务。

/**
 * batchLog service allows for messages to be queued in memory and flushed
 * to the console.log every 50 seconds.
 *
 * @param {*} message Message to be logged.
 */
  function batchLogModule($provide){
    $provide.factory('batchLog', ['$timeout', '$log', function($timeout, $log) {
      var messageQueue = [];

      function log() {
        if (messageQueue.length) {
          $log('batchLog messages: ', messageQueue);
          messageQueue = [];
        }
        $timeout(log, 50000);
      }

      // start periodic checking
      log();

      return function(message) {
        messageQueue.push(message);
      }
    }]);

    /**
     * routeTemplateMonitor monitors each $route change and logs the current
     * template via the batchLog service.
     */
    $provide.factory('routeTemplateMonitor',
                ['$route', 'batchLog', '$rootScope',
         function($route,   batchLog,   $rootScope) {
      $rootScope.$on('$routeChangeSuccess', function() {
        batchLog($route.current ? $route.current.template : null);
      });
    }]);
  }

  // get the main service to kick of the application
  angular.injector([batchLogModule]).get('routeTemplateMonitor');


// 上例中有几点要注意：

// ~batchLog服务依赖内建的$timeout和$log服务，并且允许消息批量地使用console.log记录。
// ~和batchLog服务一样，routeTemplateMonitor服务依赖内建的$route服务。
// ~自定义的服务都使用隐式表示和数组法来表示自己的依赖。最重要的是数组中的服务的名字顺序要和工厂函数参数的名字顺序对应。除非依赖是隐式地通过函数参数名表示的，那么就是有声明依赖的数组名称顺序决定依赖注入的顺序。



9.0   

factory方法
// factory方法要求提供一个对象工厂，调用该类工厂将返回服务实例。
var myServiceFactory = function(){
    return ...
};
angular.module("myModule",[])
.factory("myService",myServiceFactory);
// INSIDE：AngularJS会将factory方法封装为provider，上面的示例 等同于：

var myServiceFactory = function(){
    return ...
};
angular.module("myModule",[])
.provider("myService",function(){
    this.$get = myServiceFactory;
});
// 右边预置了使用factory方法改写的ezCalculator示例，感受下和provider方法的区别！

angular.module("ezstuff",[])
  .factory("ezCalculator",function(){
    return{
      add:function(a,b){return a+b;},
      subtract:function(a,b){return a-b;},

    }
  })


10.0   service方法
// service方法要求提供一个构造函数，AngularJS使用这个构造函数创建服务实例：
var myServiceClass = function(){
    this.method1 = function(){...}
};
angular.module("myModule",[])
.service("myService",myServiceClass);
// INSIDE：AngularJS会将service方法封装为provider，上面的示例 等同于：

var myServiceClass = function(){
    //class definition.
};
angular.module("myModule",[])
.provider("myService",function(){
    this.$get = function(){
        return new myServiceClass();
    };
});
// 右边预置了使用service方法改写的ezCalculator示例，感受下和factory方法的区别！
var ezCalculatorClass = function(){
  this.add = function(a,b){return a+b;};
  this.subtract = function(a,b){return a-b;};
  this.multiply = function(a,b){return a*b;};
  this.divide = function(a,b){return a/b;};
};

angular.module("ezstuff",[])
.service("ezCalculator",ezCalculatorClass);



11.0   value方法
// 有时我们需要在不同的组件之间共享一个变量，可以将这种情况视为一种服务： provider返回的总是变量的值。

// value方法提供了对这种情况的简化封装：

angular.module("myModule",[])
.value("myValueService","cx129800123");
// INSIDE：AngularJS会将value方法封装为provider，上面的示例 等同于：

angular.module("myModule",[])
.provider("myService",function(){
    this.$get = function(){
        return "cx129800123";
    };
});

//右侧例子

angular.module("ezstuff",[])
.value("ezUserName","whoami");



12.0  constant方法
// 有时我们需要在不同的组件之间共享一个常量，可以将这种情况视为一种服务： provider返回的总是常量的值。

// constant方法提供了对这种情况的简化封装：

angular.module("myModule",[])
.constant("myConstantService","Great Wall");
// 和value方法不同，AngularJS并没有将constant方法封装成一个provider，而仅仅 是在内部登记这个值。这使得常量在AngularJS的启动配置阶段就可以使用（创建任何 服务之前）：你可以将常量注入到模块的config()方法中。

// 在右边的示例中，你可以试着将constant()改成value()，看看还能正常运行吗？

angular.module("ezstuff",[])
  .constant("ezCurrency","CN")
  .provider("ezCalculator",function(){
    var currency = "$";
    this.setLocal = function(l){
      var repo = {
        "CN":"¥",
        "US":"$",
        "JP":"¥",
        "EN":"€"
      };
      if(repo[l]) currency = repo[l];
    };
    this.$get = function(){
      return {
        add : function(a,b){return currency + (a+b);},
        subtract : function(a,b){return currency + (a-b);},
        multiply : function(a,b){return currency + (a*b);},
        divide: function(a,b){return currency + (a/b);}
      }
    };
  })
  .config(function(ezCurrency,ezCalculatorProvider){
    ezCalculatorProvider.setLocal(ezCurrency);
  });





13.0    Understanding Service Types
来源：http://angular-tips.com/blog/2013/08/understanding-service-types/
13.1    Provider

// Provider is the parent of almost all the other services (all but constant) and it is also the most complex but more configurable one.

// Let’s see a basic example:
app.provider('foo',function(){
  return{
    $get:function(){
      var thisIsPrivate = "Private";
      function getPrivate(){
        return thisIsPrivate;
      }
      return {
        variable:"This is public",
        getPrivate:getPrivate
      };
    }
  };
});

// A provider on its simplest form, just needs to return a function called $get which is what we inject on the other components. So if we have a controller and we want to inject this foo provider, what we inject is the $get function of it.

// Why should we use a provider when a factory is much simple? Because we can configure a provider in the config function. We can do something like this:
app.provider('foo',function(){
  var thisIsPrivate = "Private";
  return{
    setPrivate:function(newVal){
      thisIsPrivate = newVal;
    },
    $get:function(){
      function getPrivate(){
        return thisIsPrivate;
      }
      return{
        variable:"This is public",
        getPrivate:getPrivate
      };
    }
  };
});
app.config(function(fooProvider){
  fooProvider.setPrivate('New value from config');
});

// Here we moved the thisIsPrivate outside our $get function and then we created a setPrivate function to be able to change thisIsPrivate in a config function. Why do we need to do this? Won’t it be easier to just add the setter in the $get? This has a different purpose.

// Imagine we want to create a generic library to manage our models and make some REST petitions. If we hardcode the endpoints URLs, we are not making it any generic, so the idea is to be able to configure those URLs and to do so, we create a provider and we allow those URLs to be configured on a config function.

// Notice that we have to put nameProvider instead of just name in our config function. To consume it, we just need to use name.

// Seeing this we realize that we already configured some services in our applications, like $routeProvider and $locationProvider, to configure our routes and html5mode respectively.

// Providers have two different places to make injections, on the provider constructor and on the $get function. On the provider constructor we can only inject other providers and constants (is the same limitation as the config function). On the $get function we can inject all but other providers (but we can inject other provider’s $get function).

// Remember: To inject a provider you use: name + ‘Provider’ and to inject its $get function you just use name

13.2     Factory
// Provider are good, they are quite flexible and complex. But what if we only want its $get function? I mean, no configuration at all. Well, in that cases we have the factory. Let’s see an example:
app.factory('foo',function(){
  var thisIsPrivate = "Private";
  function getPrivate(){
    return thisIsPrivate;
  }
  return{
    variable:"This is public",
    getPrivate:getPrivate
  };
});
//or..
app.factory('bar',function(a){
  return a * 2;
})

// As you see, we moved our provider $get function into a factory so we have what we had on the first provider example but with a much simpler syntax. In fact, internally a factory is a provider with only the $get function.

// As I said before, all types are singleton, so if we modify foo.variable in one place, the other places will have that change too.

// We can inject everything but providers on a factory and we can inject it everywhere except on the provider constructor and config functions.

13.3    Value

// Factory is good, but what if I just want to store a simple value? I mean, no injections, just a simple value or object. Well angular has you covered with the value service:

// Example:
app.value('foo','A simple value');
// Internally a value is just a factory. And since it is a factory the same injection rules applies, AKA can’t be injected into provider constructor or config functions.

13.4    Service

// So having the complex provider, the more simple factory and the value services, what is the service service? Let’s see an example first:

// Example:
app.service('foo',function(){
  var thisIsPrivate = "Private";
  this.variable = "This is public";
  this.getPrivate = function(){
    return thisIsPrivate;
  };
});

// The service service works much the same as the factory one. The difference is simple: The factory receives a function that gets called when we create it and the service receives a constructor function where we do a new on it (actually internally is uses Object.create instead of new).

// In fact, it is the same thing as doing this:
app.factory('foo2',function(){
  return new Foobar();
});
function Foobar(){
  var thisIsPrivate = "Private";
  this.variable = "This is public";
  this.getPrivate = function(){
    return thisIsPrivate;
  };
}

// Foobar is a constructor function and we instantiate it in our factory when angular processes it for the first time and then it returns it. Like the service, Foobar will be instantiated only once and the next time we use the factory it will return the same instance again.

// If we already have the class and we want to use it in our service we can do that like the following:
app.service('foo3', Foobar);
// If you’re wondering, what we did on foo2 is actually what angular does with services internally. That means that service is actually a factory and because of that, same injection rules applies.


13.5    Constant

// Then, you’re expecting me to say that a constant is another subtype of provider like the others, but this one is not. A constant works much the same as a value as we can see here:

// Example:
app.constant('fooConfig',{
  config1:true,
  config2:"Default config2"
});

// So… what’s the difference then? A constant can be injected everywhere and that includes provider constructor and config functions. That is why we use constant services to create default configuration for directives, because we can modify those configuration on our config functions.

// You are wondering why it is called constant if we can modify it and well that was a design decision and I have no idea about the reasons behind it.



14.0    service
// 在Angular里面，services作为单例对象在需要到的时候被创建，只有在应用生命周期结束的时候（关闭浏览器）才会被清除。而controllers在不需要的时候就会被销毁了。

// 现在我们开始看怎么创建service。每个方法我们都会看到下面两个一样的参数：

~name-我们要定义的service的名字

~function-service方法


14.1    1、factory()

// Angular里面创建service最简单的方式是使用factory()方法。


// factory()让我们通过返回一个包含service方法和数据的对象来定义一个service。在service方法里面我们可以注入services，比如 $http 和 $q等。
angular.module('myApp.services')
.factory('User',function($http){    //injectables go here
  var backendUrl = "http://localhost:3000";
  var service = {       //our factory definition
    user:{},
    setName:function(newName){
      service.user['name'] = newName;
    },
    setEmail:function(newEmail){
      service.user['email'] = newEmail;
    },
    save:function(){
      return $http.post(backendUrl + '/users',{
        user:service.user
      });
    }
  };return service;
})
// 在应用里面使用factory()方法

// 在应用里面可以很容易地使用factory ，需要到的时候简单地注入就可以了
angular.module('myApp')
.controller('MainCtrl',function($scope,User){
  $scope.saveUser = User.save;
})

// 什么时候使用factory()方法

// 在service里面当我们仅仅需要的是一个方法和数据的集合且不需要处理复杂的逻辑的时候，factory()是一个非常不错的选择。

// 注意：需要使用.config()来配置service的时候不能使用factory()方法


14.2    2、service()
// service()通过构造函数的方式让我们创建service，我们可以使用原型模式替代javaScript原始的对象来定义service。

// 和factory()方法一样我们也可以在函数的定义里面看到服务的注入

angular.module('myApp.services')
.service('User', function($http) { // injectables go here
  var self = this; // Save reference
  this.user = {};
  this.backendUrl = "http://localhost:3000";
  this.setName = function(newName) {
    self.user['name'] = newName;
  }
  this.setEmail = function(newEmail) {
    self.user['email'] = newEmail;
  }
  this.save = function() {
    return $http.post(self.backendUrl + '/users', {
      user: self.user
    })
  }
});


// 这里的功能和使用factory()方法的方式一样，service()方法会持有构造函数创建的对象。

// 在应用里面使用service()方法

angular.module('myApp')
.controller('MainCtrl', function($scope, User) {
  $scope.saveUser = User.save;
});



// 什么时候适合使用service()方法

// service()方法很适合使用在功能控制比较多的service里面

// 注意：需要使用.config()来配置service的时候不能使用service()方法

14.3    provider()

// provider()是创建service最底层的方式，这也是唯一一个可以使用.config()方法配置创建service的方法

// 不像上面提到的方法那样，我们在定义的this.$get()方法里面进行依赖注入

angular.module('myApp.services')
.provider('User', function() {
  this.backendUrl = "http://localhost:3000";
  this.setBackendUrl = function(newUrl) {
    if (url) this.backendUrl = newUrl;
  }
  this.$get = function($http) { // injectables go here
    var self = this;
    var service = {
      user: {},
      setName: function(newName) {
        service.user['name'] = newName;
      },
      setEmail: function(newEmail) {
        service.user['email'] = newEmail;
      },
      save: function() {
        return $http.post(self.backendUrl + '/users', {
          user: service.user
        })
      }
    };
    return service;
  }
});


// 在应用里面使用provider()方法

// 为了给service进行配置，我们可以将provider注入到.config()方法里面

angular.module('myApp')
.config(function(UserProvider) {
  UserProvider.setBackendUrl("http://myApiBackend.com/api");
})


// 这样我们就可以和其他方式一样在应用里面使用这个service了

angular.module('myApp')
.controller('MainCtrl', function($scope, User) {
  $scope.saveUser = User.save;
});


// 什么时候使用provider()方法

// 当我们希望在应用开始前对service进行配置的时候就需要使用到provider()。比如，我们需要配置services在不同的部署环境里面（开发，演示，生产）使用不同的后端处理的时候就可以使用到了

// 当我们打算发布开源provider()也是首选创建service的方法，这样就可以使用配置的方式来配置services而不是将配置数据硬编码写到代码里面。


15.0   Service vs Factory
以下是它们在AngularJS源代码中的定义:
function factory(namemfactoryFn){
  return provider(name,{ $get:factoryFn });
}

function service(name,constructor){
  return factory(name,['$injector',function($injector){
    return $injector.instantiate(constructor);
  }])
}

// 从源代码中你可以看到，service仅仅是调用了factory函数，而后者又调用了provider函数。事实上，AngularJS也为一些值、常量和装饰提供额外的provider封装，而这些并没有导致类似的困惑，它们的文档都非常清晰。

// 由于service仅仅是调用了factory函数，这有什么区别呢？线索在$injector.instantiate：在这个函数中，$injector在service的构造函数中创建了一个新的实例。

// 以下是一个例子，展示了一个service和一个factory如何完成相同的事情：
var app = angular.module('app',[]);

app.service('helloWorldService',function(){
  this.hello = function(){
    return "Hello World";
  };
});

app.factory('helloWorldService',function(){
  return{
    hello:function(){
      return "Hello World";
    }
  }
});

// 当helloWorldService或helloWorldFactory被注入到控制器中，它们都有一个hello方法，返回”hello world”。service的构造函数在声明时被实例化了一次，同时factory对象在每一次被注入时传递，但是仍然只有一个factory实例。所有的providers都是单例。

// 既然能做相同的事，为什么需要两种不同的风格呢？相对于service，factory提供了更多的灵活性，因为它可以返回函数，这些函数之后可以被新建出来。这迎合了面向对象编程中工厂模式的概念，工厂可以是一个能够创建其他对象的对象。

app.factory('helloFactory',function(){
  return function(name){
    this.name = name;

    this.hello = function(){
      return "Hello" + this.name;
    };
  };
});
// 这里是一个控制器示例，使用了service和两个factory，helloFactory返回了一个函数，当新建对象时会设置name的值。
app.controller('helloCtrl',function($scope,helloWorldService,helloWorldFactory,helloFactory){
  init = function(){
    helloWorldService.hello();
    //'Hello World'
    helloWorldFactory.hello();
    //'Hello World'
    new helloWorldFactory('Readers').hello()
    //'Hello Readers
  }
  init();
});
// 在初学时，最好只使用service。

// Factory在设计一个包含很多私有方法的类时也很有用：
app.factory('privateFactory',function(){
  var privateFunc = function(name){
    return name.split("").reverse().join("");
    //reverses the name
  };
  return{
    hello:function(name){
      return "Hello" + privateFunc(name);
    }
  }
})
// 通过这个例子，我们可以让privateFactory的公有API无法访问到privateFunc方法，这种模式在service中是可以做到的，但在factory中更容易。


16.0   
16.1.0    什么是 provider ?

// provider 可以为应用提供通用的服务，形式可以是常量，也可以是对象。

// 比如我们在 controller 里注入进来的 $http, $scope 都可以认为是 provider。
app.controller('MainCtrl',function($scope,$http){
  $http.get(...).then(...);
})
16.1.1   provider　　

// 现在让我们自己来定制一个 provider
//方法1
$provide.provider('test',{
  n:1;
  $get:function(){
    return n;
  }
})
//方法2
$provide.provider('test',function(){
  this.n=2;
  this.$get = function(){
    return n;
  }
})
//使用
app.controller('MainCtrl'，function($scope,test){
  $scope.test = test;
})

// 让我们看看 provider 的内部实现代码

function provider(name, provider_) {
 
  if (isFunction(provider_)) {
 
      provider_ = providerInjector.instantiate(provider_);
 
  }
 
   if (!provider_.$get) {
 
       throw Error('Provider ' + name + ' must define $get factory method.');
 
   }
 
   return providerCache[name + providerSuffix] = provider_;
 
}

// 可以看到 provider 的基本原则就是通过实现 $get 方法来进行单例注入，使用时获得的就是 $get 执行后的结果。

16.2   factory
// 那如果每次都要写一个 $get 是不是很麻烦？ OK，所以我们有了 factory。 factory 可以说是 provider 的变种， 方法中的第二个参数就是 $get 中的内容。

//定义factory
$provide.factory('dd',function(){
  return new Date();
});
//使用
app.controller('MainCtrl',function($scope,dd){
  $scope.mydate = dd;
});

// factory 的实现源代码:
function factory(name, factoryFn) {
 
 return provider(name, {
 
   $get: factoryFn
 
  });
 
}

16.3   4、service


// 在 factory 的例子中我们还是需要 new 一个对象返回，而 service 就更简单了，这一步都帮你省了， 他的第二个参数就是你要返回的对象类， 也就是 new 的哦给你工作都不用你做了。够清爽吧？

// 定义 service

$provide.service('dd', Date);


// 下面是 service 的实现源代码：
function service(name, constructor) {
 
  return factory(name, ['$injector', function($injector) {
 
       return $injector.instantiate(constructor);
 
   }]);
}
 

// 然后 factory 和 service 带来代码精简的同时也损失了一些特性。 provider 定义的服务是可以通过模块 config 来配置的。






















