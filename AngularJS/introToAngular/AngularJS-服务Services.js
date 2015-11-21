
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


















