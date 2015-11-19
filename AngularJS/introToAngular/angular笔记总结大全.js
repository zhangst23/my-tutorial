angular笔记.js

1.0

<body ng-controller="PhoneListCtrl">

  <ul>
    <li ng-repeat="phone in phones">
      {{phone.name}}
    <p>{{phone.snippet}}</p>
    </li>
  </ul>
</body>

在<li>标签里面的ng-repeat="phone in phones"语句是一个AngularJS迭代器。这个迭代器告诉AngularJS用
第一个<li>标签作为模板为列表中的每一部手机创建一个<li>元素


尽管控制器看起来并没有起到什么控制的作用，但是它在这里起到了至关重要的作用。通过给定我们数据模型的语境，控制器允许我们建立模型和视图之间的数据绑定。我们是这样把表现层，数据和逻辑部件联系在一起的：

PhoneListCtrl——控制器方法的名字（在JS文件controllers.js中）和<body>标签里面的ngController指令的值相匹配。
手机的数据此时与注入到我们控制器函数的作用域（$scope）相关联。当应用启动之后，会有一个根作用域被创建出来，而控制器的作用域是根作用域的一个典型后继。这个控制器的作用域对所有<body ng-controller="PhoneListCtrl">标记内部的数据绑定有效。
AngularJS的作用域理论非常重要：一个作用域可以视作模板、模型和控制器协同工作的粘接器。AngularJS使用作用域，同时还有模板中的信息，数据模型和控制器。这些可以帮助模型和视图分离，但是他们两者确实是同步的！任何对于模型的更改都会即时反映在视图上；任何在视图上的更改都会被立刻体现在模型中。




2.0


模块和注入器

每个AngularJS应用都有一个唯一的注入器。注入器提供一个通过名字查找对象实例的方法。它将所有对象缓存在内部，所以如果重复调用同一名称的对象，每次调用都会得到同一个实例。如果调用的对象不存在，那么注入器就会让实例工厂(instance factory)创建一个新的实例。

一个模块就是一种配置注入器实例工厂的方式，我们也称为“提供者(provider)”。

注入器真正强大之处在于它可以用来调用方法和实例化的类型。这个精妙的特性让方法和类型能够通过注入器请求到他们依赖的组件，而不需要自己加载依赖。

// You write functions such as this one.
function doSomething(serviceA, serviceB) {
  // do something here.
}

// Angular provides the injector for your application
var $injector = ...;

///////////////////////////////////////////////
// the old-school way of getting dependencies.
var serviceA = $injector.get('serviceA');
var serviceB = $injector.get('serviceB');

// now call the function
doSomething(serviceA, serviceB);

///////////////////////////////////////////////
// the cool way of getting dependencies.
// the $injector will supply the arguments to the function automatically
$injector.invoke(doSomething); // This is how the framework calls your functions

注意，你唯一需要写的就是上例中指出的函数，并把需要的依赖写在函数参数里。当AngularJS调用这个函数时，它会自动体充好需要的参数。

2.1   依赖注入
// 通过依赖注入，ng想要推崇一种声明式的开发方式，即当我们需要使用某一模块或服务时，不需要关心此模块内部如何实现，只需声明一下就可以使用了。在多处使用只需进行多次声明，大大提高可复用性。
// 　　比如我们的controller，在定义的时候用到一个$scope参数。
app.controller('testC',function($scope){});　　

// 如果我们在此处还需操作其他的东西，比如与浏览器地址栏进行交互。我们只需再多添
// 一个参数$location进去：
app.controller('testC',function($scope,$location){});　
　
// 这样便可以通过$location来与地址栏进行交互了，我们仅仅是声明了一下，所需的其他代码，框架已经帮我们注入了。
// 我们很明显的感觉到了这个函数已经不是常规意义上的javascript函数了，在常规的函数中，把形参换一个名字照样可以运行，
// 但在此处若是把$scope换成别的名字，程序便不能运行了。因为这是已经定义好的服务名称。
// 这便是依赖注入机制。顺理成章的推断，我们可以自己定义模块和服务，然后在需要的地方进行声明，由框架来替我们注入。

// 来看下我们如何定义一个服务：
app.factory('tpls',function(){
	return ['tpl1','tpl2','tpl3','tpl4'];
});
// 看上去相当简单，是因为我在这里仅仅是直接返回一个数组。在实际应用中，这里应该是需要向服务器发起一个请求，来获取到这些模板们。
// 服务的定义方式有好几种，包括使用provider方法、使用factory方法，使用service方法。它们之间的区别暂且不关心。
// 我们现在只要能创建一个服务出来就可以了。我使用了factory方法。一个需要注意的地方是，框架提供的服务名字都是由$开头的，
// 所以我们自己定义的最好不要用$开头，防止发生命名冲突。

// 定义好一个服务后，我们就可以在控制器中声明使用了，如下：
app.controller('testC',function($scope,tpls){
    $scope.question = questionModel;
    $scope.nowTime = new Date().valueOf();
    $scope.templates = tpls; //赋值到$scope中
    $scope.addOption = function(){
        var o = {content:''};
        $scope.question.options.push(o);
    };
    $scope.delOption = function(index){
        $scope.question.options.splice(index,1);
    };
});　　
// 此时，若在模板中书写如下代码，我们便可以获取到服务tpls所提供的数据了：
// 模板:
<a href="javascript:void(0);" target="_blank" rel="nofollow"




3.0


Filters过滤器

过滤器扮演着数据翻译的角色。一般他们主要用在数据需要格式化成本地格式的时候。它参照了UNIX过滤的规则，并且也实现了“|”（管道）语法。
 <div ng-init="list = ['Chrome', 'Safari', 'Firefox', 'IE'] ">
      Number formatting: {{ 1234567890 | number }} <br>
      array filtering <input ng-model="predicate">
      {{ list | filter:predicate | json }}
    </div>



假想我们有个购物车的view显示如下：

<span>There are 13 phones in the basket. Total: {{ 1232.12 }}</span>
我们如何利用angular表达式显示为货币格式？形如：$1,232.12。

相当简单，angular为我们提供了叫filter得东东，过滤器其好比unix中的管道pipeline。angular同时也内置了货币currency filter.

<span>There are 13 phones in the basket. Total: {{ 1232.12 | currency }}</span>
如你所见，我们可以用| 使用filter，这和unix管道模型很相似。我们也可以使用|链接更多的filter。


filter的两种使用方法：
		1. 在模板中使用filter

		// 　　我们可以直接在{{}}中使用filter，跟在表达式后面用 | 分割，语法如下：
		{{ expression | filter }} 
		// 也可以多个filter连用，上一个filter的输出将作为下一个filter的输入：
		{{ expression | filter1 | filter2 | ... }}　　
		// filter可以接收参数，参数用 : 进行分割，如下：
		{{ expression | filter:argument1:argument2:... }}　　
		// 除了对{{}}中的数据进行格式化，我们还可以在指令中使用filter，例如先对数组array进行过滤处理，然后再循环输出：
		<span ng-repeat="a in array | filter ">　　


		2. 在controller和service中使用filter
		// 　　我们的js代码中也可以使用过滤器，方式就是我们熟悉的依赖注入，例如我要在controller中使用currency过滤器，
		// 只需将它注入到该controller中即可，代码如下：
		app.controller('testC',function($scope,currencyFilter){
		    $scope.num = currencyFilter(123534);  
		}　　
		// 在模板中使用{{num}}就可以直接输出$123,534.00了！在服务中使用filter也是同样的道理。
		// 　　如果你要在controller中使用多个filter，并不需要一个一个注入吗，ng提供了一个$filter服务可以来调用所需的filter，
		// 你只需注入一个$filter就够了，使用方法如下：
		app.controller('testC',function($scope,$filter){
		$scope.num = $filter('currency')(123534);　　
		$scope.date = $filter('date')(new Date());  
		}　　
		// 可以达到同样的效果。好处是你可以方便使用不同的filter了


3.1   ng的内置过滤器
ng内置了九种过滤器，使用方法都非常简单，看文档即懂。不过为了以后不去翻它的文档，我在这里还是做一个详细的记录。

currency(货币)、date(日期)、filter(子串匹配)、json(格式化json对象)、limitTo(限制个数)、
lowercase(小写)、uppercase(大写)、number(数字)、orderBy(排序)
//
{{num | currency : '￥'}}　
//
{{date | data:'yyyy-MM-dd hh:mm:ss EEEE'}}
//
$scope.childrenArray = [
	    {name:'kimi',age:3},
        {name:'cindy',age:4},
        {name:'anglar',age:4},
        {name:'shitou',age:6},
        {name:'tiantian',age:5}
];
$scope.func = function(e){return e.age>4;}{{ childrenArray | filter:'a' }} // 匹配属性值中含有a的
{{ childrenArray | filter:4 }}   // 匹配属性值中含有4的
{{ childrenArray | filter:{name:'i'} }}    //参数是对象，匹配name属性中含有i的
{{ childrenArray | filter:func }}  //参数是函数，指定返回age>4的

//
{{jsonTest | json}}
//
{{ childrenArray | limitTo:2 }}
//
{{ num | number:2 }}
//
<div>{{ childrenArray | orderBy : 'age' }}</div>      //按age属性值进行排序，若是-age，则倒序
<div>{{ childrenArray | orderBy : orderFunc }}</div>   //按照函数的返回值进行排序
<div>{{ childrenArray | orderBy : ['age','name'] }}</div>  //如果age相同，按照name进行排序


3.2     自定义过滤器及示例
　　filter的自定义方式也很简单，使用module的filter方法，返回一个函数，该函数接收
输入值，并返回处理后的结果。话不多说，我们来写一个看看。比如我需要一个过滤器，它可以返回一个数组中下标为奇数的元素，代码如下：

app.filter('odditems',function(){
	return function(inputArray){
		var array = [];
		for (var i = 0; i < inputArray.length; i++) {
			if(i%2!==0){
				array.push(inputArray[i]);
			}
		};
		return array;
	}
});


格式就是这样，你的处理逻辑就写在内部的那个闭包函数中。你也可以让自己的过滤器接收参数，参数就定义在return的那个函数中，作为第二个参数，或者更多个参数也可以。
自定义过滤器实例（例04）：

/* View html */
First name：<input ng-model="user.firstName"/><br/>
Last  name：<input ng-model="user.lastName"/> <br/>
First name：{{user.firstName}}      Last  name：{{user.lastName}} <br/>
Fullname：{{user | flFullname}}<br/>
Fullname：{{user | flFullname:"－"}}<br/>
Fullname：{{user | flFullname:"•" | uppercase }}

/* Controller js */
demoApp.filter("flFullname", function() {
    return function(user, sep) {
        sep = sep || " ";
        user = user || {};
        fullName = "";
        if(user.firstName){fullName += user.firstName;}
 		if(user.lastName){fullName = fullName + sep + user.lastName;}
        if(fullName && fullName.length>0){return fullName;
        }else{return "";}
    };
});












4.0


<body ng-app>				
 
<span>Insert your name:</span>
 
<input type="text" ng-model="user.name" />
 
<h3>Echo: {{user.name}}</h3>
 
</body>


$scope是连接controllers（控制器）和templates（模板view/视图）的主要胶合体

意味着我们我们从template上为$scope设置了一个属性对象user.name，所以我们也可以在controller中访问这个对象(user.name).


5.0

var app = angular.module('app',[]);
app.controller('MainCtrl',function($scope){
	$scope.message = 'World';
});


<body ng-app="app" ng-controller="MainCtrl">
	Hello,{{ message }}
</body>


详细解读：在这里首先我们定义了 angular application,
		只是简单地创建了一个angular module,其接受一个module名字和依赖数组为参数.
		紧接着创建了一个controller，
		通过调用app module的controller方法，并传入了一个controller名字和function。
		function函数接受$scope参数（可以接受更多的参数，放在后面部分)。
		所以我们可以开始双向绑定了。
		在$scope中我们附加了message的字符串属性。

		在view中，注意到body tag多出一些东西，这些是angular的指令(directives)，
		它给HTML带来了新的语法拓展，在这例子中我们使用了两个angular内置的指令：
		ng-app:
		ng-controller:

		最后我们将message插入我们的remplate。




6.0    Services

//    在文章最后，我们需要再次较少下services。这是一个的维护应用程序功能逻辑部分，他是一个单间模式singleton。

//    为了保持应用程序的逻辑层次分明，更趋向于将其业务逻辑放到不同的services，保持controller的逻辑只有流程控制和view交互逻辑。

//    angular内置了很多services，如$http http请求，$q 异步promises编程模式...在这里我们不会讨论angular的内置services，
//    于有很多的services，并且很难一次性解释完，将在后续文章。我们将创建一个简单的自定义services。

//    在controller之间共享数据对我们很有用，每个controller都有自己的scope所以我们不能将其绑定到其他的controller。
//    所以解决方案是services，可以吧数据共享到services，在需要用到的地方引用它。


//    angular核心是DI(依赖注入)在需要使用的地方会自定注入service。DI将不会在本节中讲述，我们可以简单的说，你创建了一个service，
//    你可以在module作用域的controller，directive，甚至是其他service作为参数来轻松使用。


// AngularJS服务其作用就是对外提供某个特定的功能。
// AngularJS拥有内建的依赖注入（DI）子系统，可以帮助开发人员更容易的开发，理解和测试应用。
// DI允许你请求你的依赖，而不是自己找寻它们。比如，我们需要一个东西，DI负责找创建并且提供给我们。
// 为了而得到核心的AngularJS服务，只需要添加一个简单服务作为参数，AngularJS会侦测并且提供给你：

function EditCtrl($scope, $location, $routeParams) {
     // Something clever here...
}

// 你也可以定义自己的服务并且让它们注入：

angular.module('MyServiceModule', []).
    factory('notify', ['$window', function (win) {
    return function (msg) {
        win.alert(msg);
    };
}]);
function myController(scope, notifyService) {
    scope.callNotify = function (msg) {
        notifyService(msg);
    };
}
myController.$inject = ['$scope', 'notify']; 



// 其作用就是对外提供某个特定的功能，如消息服务，文件压缩服务等，是一个独立的模块。ng的服务是这样定义的：
// Angular services are singletons objects or functions that carry out specific tasks common to web apps.
// 它是一个单例对象或函数，对外提供特定的功能。
// 首先是一个单例，即无论这个服务被注入到任何地方，对象始终只有一个实例。
// 其次这与我们自己定义一个function然后在其他地方调用不同，因为服务被定义在一个模块中，所以其使用范围是可以被我们管理的。
// ng的避免全局变量污染意识非常强。
// 我们在controller中直接声明$location服务，这依靠ng的依赖注入机制。$location提供地址栏相关的服务，
// 我们在此只是简单的获取当前的地址。
// 服务的使用是如此简单，我们可以把服务注入到controller、指令或者是其他服务中。


6.1    自定义服务
// 　　如同指令一样，系统内置的服务以$开头，我们也可以自己定义一个服务。定义服务的方式有如下几种：
l 使用系统内置的$provide服务；
l 使用Module的factory方法；
l 使用Module的service方法。
// 　　下面通过一个小例子来分别试验一下。我们定义一个名为remoteData服务，它可以从远程获取数据，这也是我们在程序中经常使用的功能。不过我这里没有远程服务器，就写死一点数据模拟一下。

//使用$provide来定义
var app = angular.module('MyApp',[],function($provide){
	$provide.factory('remoteData',function(){
		var data = {name:'n',value:'v'};
		return data;
	});
});
//使用factory方法
app.factory('remoteData',function(){
	var data ={name:'n',value:'v'};
 	return data;
});
//使用service方法
app.service('remoteData',function(){
    this.name = 'n';
    this.value = 'v';
});

// Module的factory和$provide的factory方法是一模一样的，从官网文档看它们其实就是一回事。
// 至于Module内部是如何调用的，我此处并不打算深究，我只要知道怎么用就好了。

// 再看Module的service方法，它没有return任何东西，是因为service方法本身返回一个构造器，
// 系统会自动使用new关键字来创建出一个对象。所以我们看到在构造器函数内可以使用this，
// 这样调用该服务的地方便可以直接通过remoteData.name来访问数据了



6.2   管理服务的依赖关系
// 服务与服务中间可以有依赖关系，例如我们这里定义一个名为validate的服务，它的作用是验证数据是否合法，它需要依赖我们从远程获取数据
// 的服务remoteData。代码如下：
// 在factory的参数中，我们可以直接传入服务remoteData，ng的依赖注入机制便帮我们做好了其他工作。不过一定要保证这个参数的
// 名称与服务名称一致，ng是根据名称来识别的。若参数的名次与服务名称不一致，你就必须显示的声明一下，方式如下：
app.factory('validate',['remoteData',function(remoteDataService){
	return function(){
		if (remoteDataService.name=='n') {
			alert('验证通过');
		};
	}
}])

// 我们在controller中注入服务也是同样的道理，使用的名称需要与服务名称一致才可以正确注入。否则，你必须使用$inject来手动指定注入的服务。比如：
function testC(scope,rd){
	scope.getData = function(){
		alert('name:'+rd.name+'value:'+rd.value);
	}
}
testC.$inject = ['$scope','remoteData'];

// 在controller中注入服务，也可以在定义controller时使用数组作为第二个参数，在此处
// 把服务注入进去，这样在函数体中使用不一致的服务名称也是可以的，不过要确保注入的顺序是一致的，如：
app.controller('testC',['$scope','remoteData',function($scope,rd){
	$scope.getData = function(){
		alert('name:'+rd.name+'value:'+rd.value)
	}
}])


6.3  自定义服务示例
// 接下来让我们看下例子（例08 自定义服务）代码，自定义userService服务：
demoApp.factory('userService',['$http',function($http){
	var doGetUser = function(userId,path){
		//return $http({
			//method:'JSONP',
			//url:path
		//})
	// 手动指定数据
	var data = {userId:"woshishui",userName:"我是谁",userInfo:"我是谁，我是谁。"};;
	if (userId=='zhangsan') {
		data = {userId:"zhangsan",userName:"张三",userInfo:"我是张三，我为自己"};
	}else if(userId=="lisi"){
		data = {userId:"lisi",userName:"李四",userInfo:"我是李四，我为卿狂！"};
	}
	return data;

	}
	return{
		/*userService对外暴露的函数，可有多个*/
		getUser: function(userId) { 
		return doGetUser(userId, '../xxx/xxx.action'); 
		}
	}
}]);

// 我们创建了一个只有一个方法的userService，getUser为这个服务从后台获取用户信息的函数，并且对外暴露。当然，由于这是一个静态的
// 例子，无法访问后台，那么我们便制定其返回的数据。

// 然后我们把这个服务添加到我们的controller中。我们建立一个controller并加载（或者注入）userService作为运行时依赖，
// 我们把service的名字作为参数传递给controller 函数：

demoApp.controller("test8Controller",function($scope,userService){
/*文章信息*/
$scope.articles = [{
	title : "爱飞像风",
	userId : "zhangsan",
	userName : "张三"
},{
	title : "无法停止的雨",
	userId : "lisi",
	userName : "李四"
}];
$scope.showUserInfo = false;//显示作者详细信息开关

$scope.currentUser = {}; //当前选中的作者
	$scope.getUserInfo = function(userId){
		$scope.currentUser = userService.getUser(userId);
		//调用 userService的getUser函数
		$scope.showUserInfo = true;
		setTimeout(function(){//定时器：隐藏作者详细信息
			$scope.showUserInfo = false;
		},3000);
	}
});
// 我们的userService注入到我们的test8Controller后，我们就可以像使用其他服务（我们前面提到的$http服务）一样的
// 使用userService了。
// 相关的HTML代码如下：

/* View HTML*/
<tr ng-repeat="article_ in articles">
	<td>
		{{article_.title}}
	</td>
	<td>
		<a href="javascript:void(0);" target="_blank" rel="nofollow">
	</td>
</tr>
...

<div ng-show="showUserInfo">
	用户ID：{{currentUser.userId}}<br/>
	用户名：{{currentUser.userName}}<br/>
	用户简介：{{currentUser.userInfo}}<br/>
</div>










7.0  MVC

// 针对客户端应用开发AngularJS吸收了传统的MVC基本原则。MVC或者Model-View-Controll设计模式针对不同的人可能意味不同的东西。AngularJS并不执行传统意义上的MVC，更接近于MVVM（Moodel-View-ViewModel)。 

Model
// model是应用中的简单数据。一般是简单的javascript对象。这里没有必要继承框架的classes，使用proxy对象封装或者使用特别的setter/getter方法来访问。事实上我们处理vanilla javascript的方法就是一个非常好的特性，这种方法使得我们更少使用应用的原型。

ViewModel
// viewmodel是一个用来提供特别数据和方法从而维护指定view的对象。
// viewmodel是$scope的对象，只存在于AnguarJS的应用中。$scope只是一个简单的js对象，这个对象使用简单的API来侦测和广播状态变化。

Controller
// controller负责设置初始状态和参数化$scope方法用以控制行为。需要指出的controller并不保存状态也不和远程服务互动。

View
// view是AngularJS解析后渲染和绑定后生成的HTML 。这个部分帮助你创建web应用的架构。
// $scope拥有一个针对数据的参考，
// controller定义行为，
// view处理布局和互动。




8.0  指令（Directives）

// 指令是我个人最喜欢的特性。你是不是也希望浏览器可以做点儿有意思的事情？那么AngularJS可以做到。
// 指令可以用来创建自定义的标签。它们可以用来装饰元素或者操作DOM属性。可以作为标签、属性、注释和类名使用。
// 这里是一个例子，它监听一个事件并且针对的更新它的$scope ，如下：

myModule.directive('myComponent',function(mySharedService){
	return{
		restrict:'E',
		controller:function($scope,$attrs,mySharedService){
			$scope.$on('handleBroadcast',function(){
				$scope.message = 'Directive:' + mySharedService.message;
			});
		},
		replace:true,
		template:'<input>'
	};
});

// 然后，你可以使用这个自定义的directive来使用:
<my-component ng-model="message"></my-component>

// 使用一系列的组件来创建你自己的应用将会让你更方便的添加，删除和更新功能。


8.1   

// 通过使用模板，我们可以把model和controller中的数据组装起来呈现给浏览器，还可以通过数据绑定，实时更新视图，让我们的页面变成动态的。
// 模板中可以使用的东西包括以下四种：
		1.指令(directive)：ng提供的或者自定义的标签和属性，用来增强HTML表现力；
		2.标记(markup)：即双大括号{{}}，可将数据单向绑定到HTML中；
		3.过滤器(filter)：用来格式化输出数据；
		4.表单控制：用来增强表单的验证功能。

// 其中，指令无疑是使用量最大的，ng内置了很多指令用来控制模板，如ng-repeat，ng-class，也有很多指令来帮你完成业务逻辑，如ng-controller,ng-model。
// 指令的几种使用方式如下：

 	作为标签：<my-dir></my-dir>
 	作为属性：<span my-dir="exp"></span>
 	作为注释：<!-- directive: my-dir exp -->
 	作为类名：<span class="my-dir: exp;"></span>

// 其实常用的就是作为标签和属性。


8.2   样式相关的指令
8.2.1 
ng-class   用来给元素绑定类名，其表达式的返回值可能是以下三种：
			1 类名字符串，可以用空格分隔多个类名，如'redtext boldtext';
			2 类名数组，数组中的每一项都会层叠起来
			3 一个名值对应的map，其键值为类名，值为boolean类型，当值为true时，该类会被加在元素上
				红色 加粗 删除线
				map:{redtext:{{red}}},boldtext:{{bold}},striketext:{{strike}}
				<div class="{{style}}text">字体样式测试</div>
				然后在controller中指定style的值：
				$scope.style = 'red';
8.2.2
ng-style	用来绑定元素的css样式，其表达式的返回值为一个js对象，键为css样式名，值为该样式对应的合法取值。
			<div ng-style="{color:'red'}">ng-style测试</div>	
			<div ng-style="style">ng-style测试</div>	

			$scope.style = {color:'red'};

8.2.3 
ng-show   ng-hide

8.3  表单控件功能相关指令
		
   			ng-checked控制radio和checkbox的选中状态
　　			ng-selected控制下拉框的选中状态
　　			ng-disabled控制失效状态
　　			ng-multiple控制多选
　　			ng-readonly控制只读状态

// 以上指令的取值均为boolean类型，当值为true时相关状态生效，道理比较简单就不多做解释。注意： 上面的这些
// 只是单向绑定，即只是从数据到模板，不能反作用于数据。要双向绑定，还是要使用 ng-model 。

8.4   事件绑定相关指令

   ng-click
　　ng-change
　　ng-dblclick
　　ng-mousedown
　　ng-mouseenter
　　ng-mouseleave
　　ng-mousemove
　　ng-mouseover
　　ng-mouseup
　　ng-submit

// 事件绑定指令的取值为函数，并且需要加上括号，例如：

<select ng-change="change($event)"></select>
然后在controller中定义如下：
$scope.change = function($event){
	alert($event.target);
	//...
}
// 在模板中可以用变量$event将事件对象传递到controller中。





8.5   特殊的ng-src和ng-href


// 在说明这两个指令的特殊之前，需要先了解一下ng的启动及执行过程，如下图：
 
   1) 浏览器加载静态HTML文件并解析为DOM；
　　2) 浏览器加载angular.js文件；
　　3) angular监听DOMContentLoaded 事件，监听到时开始启动；
　　4) angular寻找ng-app指令，确定作用范围；
　　5) 找到app中定义的Module使用$injector服务进行依赖注入；
　　6) 根据$injector服务创建$compile服务用于编译；
　　7) $compile服务编译DOM中的指令、过滤器等；
　　8) 使用ng-init指令，将作用域中的变量进行替换；
　　9) 最后生成了我们在最终视图。

// 可以看到，ng框架是在DOMcontent加载完毕后才开始发挥作用。假如我们模板中有一张图片如下：
//<img src="http://m.cnblogs.com/142260/”{{imgUrl}}”/>

// 那么在页面开始加载到ng编译完成之前，页面上会一直显示一张错误的图片，因为路径{{imgUrl}}还未被替换。

// 为了避免这种情况，我们使用ng-src指令，这样在路径被正确得到之前就不会显示找不到图片。同理，
// <a>标签的href属性也需要换成ng-href，这样页面上就不会先出现一个地址错误的链接。
// 顺着这个思路再多想一点，我们在模板中使用{{}}显示数据时，在ng编译完成之前页面上岂不是会显示出大括号及里面的表达式？
// 确实是这样。为了避免这个，ng中有一个与{{}}等同的指令:ng-bind，同样用于单向绑定，在页面刚加载的时候就不会显示出对
// 用户无用的数据了。尽管这样你可能不但没舒心反而更纠结了，{{}}那么好用易理解，还不能用了不成？好消息是我们依然可以使用。
// 因为我编写的是单页面应用，页面只会在加载index.html的时

// 候出这个问题，只需在index.html中的模板中换成ng-bind就行。其他的模板是我们动态加载的，就可以放心使用{{}}了。



 8.6   自定义指令示例
// 下面我们来解析下指令的例子（例07）。

// 1.首先，我们定义一个名为userInfo的指令：
demoApp.directive('userInfo',function(){
	return{
		restrict:'E',		//Restrict为'E'：用作标签
		templateUrl:'userInfoTemplate.html',         //模板内容为ng-template定义ID为userInfoTemplate.html的内容
		replace:true,			//replace为true：用模板替换当前标签
		transclude:true,		//transclude为true：将当前元素的内容转移到模板中
		scope:{					//定义一个名为mytitle的MODEL，其值指向当前元素的etitle属性
			mytitle:'=etitle'
		},					

		link:function(scope,element,attrs){          //link：指定所包含的行为
			scope.showText = false;
			scope.toggleText = function(){
				scope.showText = !scope.showText;
			}
		}
	}
})



//2.userInfoTemplate.html模板为：
<script type="text/ng-template" id="userInfoTemplate.html">
	<div calss="mybox">
		<div className="mytitle" style="cursor:pointer;" ng-click="toggleText()">
			{{mytitle}}
		</div>
		<div ng-transclude ng-show="show Text"></div>
	</div>
</script>
将当前元素的内容添加到有ng-transclude属性的这个DIV下，默认是隐藏的。


//  3.Controller信息：
demoApp.controller("test7Controller", function($scope){
	$scope.title = '个人简介';
	$scope.text = '大家好，我正在研究AngularJs，欢迎大家与我交流。';
	$scope.updateInfo = function (){
		$scope.title = '个人信息';
		$scope.text = '大家好，今天天气真好！';
	}
});


//4.指令使用方式（View信息）为：
<user-info etitle="title">{ {text} }</user-info>
// Etitle指向Controller中的$scope.title。注意命名方式：指令名为userInfo，对应的标签为user-info












9.0   数据绑定


// 从Server到Controller再到View的数据交互（例02）：

<html ng-app="demoApp">
...
	<div  ng-controller="demoController">
	<input type="text" ng-model="user.name" disabled="disabled"/>
	<a href="javascript:void(0);" target="_blank" rel="nofollow">获取名字</a>
...


	demoApp.controller("demoController", function($http, $scope){
		$scope. getAjaxUser = function(){
		// $http.get({url:"../xxx.action"}).success(function(data){
		// $scope.user= data;
		// });
			$scope.user = {"name":"从JOSN中获取的名称","age":22};
		};
	});


// 改变$scope中的user，View也会自动更新。


10.0   ajax
// $http 服务是AngularJS的核心服务之一，它帮助我们通过XMLHttpRequest对象或JSONP与远程HTTP服务进行交流。
// $http 服务是这样一个函数：它接受一个设置对象，其中指定了如何创建HTTP请求；
// 它将返回一个承诺（*参考JavaScript异步编程的promise模式），其中提供两个方法： success方法和error方法。

demoApp.controller("demoController",function($http,$scope){
	$scope.getAjaxUser = function(){
		$http.get({url:"../xxx.action"}).success(function(data){
			alert(data);
		}).error(function(){
			alert("出错了");
		});
	};
});

AngularJS的AJAX与jquery等框架的AJAX基本一致，这里就不多说了。


 11.0     表达式

// ng中的表达式与javascript表达式类似但是不可以划等号，它是ng自己定义的一套模式。表达式可以作为指令的值，
// 如ng-modle=”people.name”、ng-click=”showMe()”，看起来是如此像字符串，故而也叫字符串表达式。
// 也可以在标记中使用表达式，如{{1+2}}，或者与过滤器一起使用{{1+2 | currency}}。在框架内部，
// 字符串不会简单的使用eval()来执行，而是有一个专门的$parse服务来处理。在ng表达式中不可以使用循环语句、判断语句，
// 事实上在模板中使用复杂的表达式也是一个不推荐的做法，这样视图与逻辑就混杂在一起了

// 我们在使用其他模板库时，一般都会有模板的循环输出、分支输出、逻辑判断等类似的控制。

// 要想理解指令属性的运作，我们必须先理解表达式。在之前的例子里我们已经见过表达式，例如 {{ user.name }}。
// 请查看例03、例04、例05。
{{ 8 + 1 }} 9
{{ person }} {"name":"Ari Lerner"}
{{ 10 * 3.3 | currency }} $33.00

// 表达式粗略来看有点像 eval(javascript) 的结果。它们会经过Angular.js的处理，从而拥有以下重要而独特的性质：

// l 所有表达式都在scope这个context里被执行，因此可以使用所有本地 $scope 中的变量。
// l 如果一个表达式的执行导致类型错误或引用错误，这些错误将不会被抛出。
// l 表达式里不允许任何控制函数流程的功能（如if/else等条件语句）
// l 表达式可接受一个或多个串联起来的过滤器。


12.0   路由route

// 在谈路由机制前有必要先提一下现在比较流行的单页面应用，就是所谓的single page APP。为了实现无刷新的视图切换，
// 我们通常会用ajax请求从后台取数据，然后套上HTML模板渲染在页面上，然而ajax的一个致命缺点就是导致浏览器后退按钮失效，
// 尽管我们可以在页面上放一个大大的返回按钮，让用户点击返回来导航，但总是无法避免用户习惯性的点后退。解决此问题的一个方法是使用hash，
// 监听hashchange事件来进行视图切换，另一个方法是用HTML5的history API，通过pushState()记录操作历史，
// 监听popstate事件来进行视图切换，也有人把这叫pjax技术。基本流程如下：

// 如此一来，便形成了通过地址栏进行导航的深度链接（deeplinking ），也就是我们所需要的路由机制。通过路由机制，
// 一个单页应用的各个视图就可以很好的组织起来了。

12.1.1 ng的路由机制
// 　　第一步：引入文件和依赖
// 　　ngRoute模块包含在一个单独的文件中，所以第一步需要在页面上引入这个文件，如下：
<script src="http://code.angularjs.org/1.2.8/angular.min.js" rel="nofollow"/>
<script src="http://code.angularjs.org/1.2.8/angular-route.min.js" rel="nofollow"/>　　
// 光引入还不够，我们还需在模块声明中注入对ngRoute的依赖，如下：
var app = angular.module('MyApp', ['ngRoute']);　　
// 完成了这些，我们就可以在模板或是controller中使用上面的服务和指令了。下面我们需要定义一个路由表。

// 　　第二步：定义路由表
$routeProvider提供了定义路由表的服务，它有两个核心方法，when(path,route)和otherwise(params)，
// 先看一下核心中的核心when(path,route)方法。
　　
// when(path,route)方法接收两个参数，path是一个string类型，表示该条路由规则所匹配的路径，
// 它将与地址栏的内容($location.path)值进行匹配。如果需要匹配参数，可以在path中使用冒号加名称的方式，
// 如：path为/show/:name，如果地址栏是/show/tom，那么参数name和所对应的值tom便会被保存在$routeParams中，
// 像这样：{name : tom}。我们也可以用*进行模糊匹配，如：/show*/:name将匹配/showInfo/tom。

// 　　route参数是一个object，用来指定当path匹配后所需的一系列配置项，包括以下内容：
  		 controller //function或string类型。在当前模板上执行的controller函数，生成新的scope；
  		 controllerAs //string类型，为controller指定别名；
  		 template //string或function类型，视图z所用的模板，这部分内容将被ngView引用；
  		 templateUrl //string或function类型，当视图模板为单独的html文件或是使用了<script type="text/ng-template">定义模板时使用；
  		 resolve //指定当前controller所依赖的其他模块；
  		 redirectTo //重定向的地址。
// 最简单情况，我们定义一个html文件为模板，并初始化一个指定的controller：
function emailRouteConfig($routeProvider){
	$routeProvider.when('/show',{
		controller:ShowController,
		templateeUrl:'show.html'
	})
	when('/put/:name',{
		controller:PutController,
		templateeUrl:'put.html'
	});
};

//otherwise(params)方法对应路径匹配不到时的情况，这时候我们可以配置一个redirectTo参数，让它重定向到404页面或者是首页。


// 第三步：在主视图模板中指定加载子视图的位置
// 我们的单页面程序都是局部刷新的，那这个“局部”是哪里呢，这就轮到ngView出马了，只需在模板中简单的使用此指令，在哪里用，哪里就是“局部”。例如：
<div ng-view></div>　　或：<ng-view></ng-view>　　
// 我们的子视图将会在此处被引入进来。完成这三步后，你的程序的路由就配置好了。

12.1.2 路由示例
// 下面我们将用一个例子（例09）来说明路由的使用方式及步骤：

// 1.为demoApp添加一个路由，代码如下：
demoApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/list',{
		templateUrl:'route/list.html',
		controller:'routeListController'
	}).when('/list/:id',{
		templateUrl:'route/detail.html',
		controller:'routeDetailController'
	}).otherwise({
		redirectTo:'/list'
	});
}]);

//  /list 对应为：route/list.html页面，显示用户列表；/list/:id对应于route/detail.html页面，显示用户详细信息。


// 2.为list.html和detail.html分别声明Controller：routeListController和routeDetailController。
demoApp.controller('routeListController',function($scope){
	$scope.users = [{userId:"zhangsan",userName:"张三",userInfo:"我是张三，我为自己带盐！"},
					{userId:"lisi",userName:"李四",userInfo:"我是李四，我为卿狂！"},
					{userId:"woshishui",userName:"我是谁",userInfo:"我是谁！我是谁！我是谁！"}
	];
});

demoApp.controller('routeDetailController',function($scope,$routeParams,userService){
	$scope.userDetail = userService.getUser($routeParams.id);
})

// routeDetailController中如上面提到的一样，注入了userService服务，在这里直接拿来用。


// 3.创建list.html和detail.html页面，代码如下：
<hr/>  
<h3>Route : List.html（用户列表页面）</h3>  
<ul>  
	<li ng-repeat="user in users">  
      <a href="http://m.cnblogs.com/142260/3817063.html?full=1#/list/{{ user.userId }}" target="_blank" rel="nofollow">
	</li>  
</ul>
<hr/>
 
<h3>Route : detail.html（用户详细信息页面）</h3>  
<h3>用户名：<span style="color: red;">{{userDetail.userName}}</span></h3>
<div>
	<span>用户ID：{{userDetail.userId}}</span><span>用户名：{{userDetail.userName}}</span>
</div>
<div>
	用户简介：<span>{{userDetail.userInfo}}</span>
</div>
<div>
	<a href="http://m.cnblogs.com/142260/3817063.html?full=1#/list" target="_blank" rel="nofollow">返回</a>  
</div>


// 4. 路由局部刷新位置：
<h1>AngularJS路由（Route） 示例</h1>  
<div ng-view></div>





13.0    自定义指令详解

13.1.1  指令的编译过程
// 　　在开始自定义指令之前，我们有必要了解一下指令在框架中的执行流程：
	1.浏览器得到 HTML 字符串内容，解析得到 DOM 结构。
	2.ng 引入，把 DOM 结构扔给 $compile 函数处理：
			① 找出 DOM 结构中有变量占位符；
			② 匹配找出 DOM 中包含的所有指令引用；
			③ 把指令关联到 DOM；
			④ 关联到 DOM 的多个指令按权重排列；
			⑤ 执行指令中的 compile 函数（改变 DOM 结构，返回 link 函数）；
			⑥ 得到的所有 link 函数组成一个列表作为 $compile 函数的返回。
	3. 执行 link 函数（连接模板的 scope）。

// 这里注意区别一下$compile和compile，前者是ng内部的编译服务，后者是指令中的编译函数，两者发挥作用的范围不同。
// compile和link函数息息相关又有所区别，这个在后面会讲。了解执行流程对后面的理解会有帮助。
// 在这里有些人可能会问，angular不就是一个js框架吗，怎么还能跟编译扯上呢，又不是像C++那样的高级语言。其实此编译非彼编译，
// ng编译的工作是解析指令、绑定监听器、替换模板中的变量等。因为工作方式很像高级语言编辑中的递归、堆栈过程，所以起名为编译，不要疑惑。

13.1.2 指令的使用方式及命名方法

// 　　指令的几种使用方式如下：
		作为标签：<my-dir></my-dir>
		作为属性：<span my-dir="exp"></span>
		作为注释：<!-- directive: my-dir exp -->
		作为类名：<span class="my-dir: exp;"></span>
// 　　其实常用的就是作为标签和属性，下面两种用法目前还没见过，感觉就是用来卖萌的，姑且留个印象。我们自定义的指令就是要支持这样的用法。
// 关于自定义指令的命名，你可以随便怎么起名字都行，官方是推荐用[命名空间-指令名称]这样的方式，像ng-controller。
// 不过你可千万不要用ng-前缀了，防止与系统自带的指令重名。另外一个需知道的地方，指令命名时用驼峰规则，使用时用-分割各单词。
// 如：定义myDirective，使用时像这样：<my-directive>。

13.1.3   自定义指令的配置参数
// 下面是定义一个标准指令的示例，可配置的参数包括以下部分：

myModule.directive('namespaceDirectiveName', function factory(injectables) {

        var directiveDefinitionObject = {
            restrict: string,//指令的使用方式，包括标签，属性，类，注释
            priority: number,//指令执行的优先级
            template: string,//指令使用的模板，用HTML字符串的形式表示
            templateUrl: string,//从指定的url地址加载模板
            replace: bool,//是否用模板替换当前元素，若为false，则append在当前元素上
            transclude: bool,//是否将当前元素的内容转移到模板中
            scope: bool or object,//指定指令的作用域
       		controller: function controllerConstructor($scope, $element, $attrs, $transclude){...},//定义与其他指令进行交互的接口函数
            require: string,//指定需要依赖的其他指令

			link: function postLink(scope, iElement, iAttrs) {...},//以编程的方式操作DOM，包括添加监听器等

            compile: function compile(tElement, tAttrs, transclude){
                return: {
                    pre: function preLink(scope, iElement, iAttrs, controller){...},
                    post: function postLink(scope, iElement, iAttrs, controller){...}
                }
            }//编程的方式修改DOM模板的副本，可以返回链接函数
        };

        return directiveDefinitionObject;
});      


// 看上去好复杂的样子，定义一个指令需要这么多步骤嘛？当然不是，你可以根据自己的需要来选择使用哪些参数。
// 事实上priority和compile用的比较少，template和templateUrl又是互斥的，两者选其一即可。
// 所以不必紧张，接下来分别学习一下这些参数：
          指令的表现配置参数：restrict、template、templateUrl、replace、transclude；
          指令的行为配置参数：compile和link；
          指令划分作用域配置参数：scope；
          指令间通信配置参数：controller和require。

13.1.4   指令的表现参数restrict等

// 指令的表现配置参数：restrict、template、templateUrl、replace、transclude。
// 我将先从一个简单的例子开始。
//     例子的代码如下：

var app = angular.module('MyApp', [], function(){console.log('here')});
app.directive('sayHello',function(){
	return {
	     restrict : 'E',
		 template : '<div>hello</div>'
	};
})         
// 然后在页面中，我们就可以使用这个名为sayHello的指令了，它的作用就是输出一个hello单词。像这样使用：
<say-hello></say-hello>         
// 这样页面就会显示出hello了，看一下生成的代码：
<say-hello>
	<div>hello</div>
</say-hello> 
 // 　　稍稍解释一下我们用到的两个参数，restirct用来指定指令的使用类型，其取值及含义如下：

<!--directive:my-menu Products-->
// 默认值是A。也可以使用这些值的组合，如EA，EC等等。我们这里指定为E，那么它就可以像标签一样使用了。如果指定为A，我们使用起来应该像这样：
<div say-hello></div>
// 从生成的代码中，你也看到了template的作用，它就是描述你的指令长什么样子，这部分内容将出现在页面中，即该指令所在的模板中，既然是模板中，template的内容中也可以使用ng-modle等其他指令，就像在模板中使用一样。
// 在上面生成的代码中，我们看到了<div>hello</div>外面还包着一层<say-hello>标签，如果我们不想要这一层多余的东西了，replace就派上用场了，在配置中将replace赋值为true，将得到如下结构：
<div>hello</div>
//  　　replace的作用正如其名，将指令标签替换为了temple中定义的内容。不写的话默认为false。
// 上面的template未免也太简单了，如果你的模板HTML较复杂，如自定义一个ui组件指令，难道要拼接老长的字符串？当然不需要，此时只需用templateUrl便可解决问题。你可以将指令的模板单独命名为一个html文件，然后在指令定义中使用templateUrl指定好文件的路径即可，如：
// templateUrl : ‘helloTemplate.html’         
// 系统会自动发一个http请求来获取到对应的模板内容。是不是很方便呢，你不用纠结于拼接字符串的烦恼了。如果你是一个追求完美的有考虑性能的工程师，可能会发问：那这样的话岂不是要牺牲一个http请求？这也不用担心，因为ng的模板还可以用另外一种方式定义，那就是使用<script>标签。使用起来如下：
<script type="text/ng-template" id="helloTemplate.html">
     <div>hello</div>
</script>        
//  你可以把这段代码写在页面头部，这样就不必去请求它了。在实际项目中，你也可以将所有的模板内容集中在一个文件中，只加载一次，然后根据id来取用。
// 接下来我们来看另一个比较有用的配置：transclude，定义是否将当前元素的内容转移到模板中。看解释有点抽象，不过亲手试试就很清楚了，看下面的代码（例06）：
app.directive('sayHello',function(){
	return {
	     restrict : 'E',
		 template : '<div>hello，<b ng-transclude></b>！</div>',
	     replace : true,
	     transclude : true
	};
})         
// 指定了transclude为true，并且template修改了一下，加了一个<b>标签，并在上面使用了ng-transclude指令，用来告诉指令把内容转移到的位置。那我们要转移的内容是什么呢？请看使用指令时的变化：
<say-hello>美女</say-hello>
// 内容是什么你也看到了哈~在运行的时候，美女将会被转移到<b>标签中，原来此配置的作用就是——乾坤大挪移！看效果：
hello, 美女！
// 这个还是很有用的，因为你定义的指令不可能老是那么简单，只有一个空标签。当你需要对指令中的内容进行处理时，此参数便大有可用。


13.1.5  指令的行为参数：compile和link

// 自定义一个指令的几个简单参数，restrict、template、templateUrl、replace、transclude，这几个理解起来相对容易很多，因为它们只涉及到了表现，而没有涉及行为。我们继续学习ng自定义指令的几个重量级参数：compile和link
// l 理解compile和link
　　不知大家有没有这样的感觉，自己定义指令的时候跟写jQuery插件有几分相似之处，都是先预先定义好页面结构及监听函数，然后在某个元素上调用一下，该元素便拥有了特殊的功能。区别在于，jQuery的侧重点是DOM操作，而ng的指令中除了可以进行DOM操作外，更注重的是数据和模板的绑定。jQuery插件在调用的时候才开始初始化，而ng指令在页面加载进来的时候就被编译服务($compile)初始化好了。
在指令定义对象中，有compile和link两个参数，它们是做什么的呢？从字面意义上看，编译、链接，貌似太抽象了点。其实可大有内涵，为了在自定义指令的时候能正确使用它们，现在有必要了解一下ng是如何编译指令的。
// l 指令的解析流程详解
　　我们知道ng框架会在页面载入完毕的时候，根据ng-app划定的作用域来调用$compile服务进行编译，这个$compile就像一个大总管一样，清点作用域内的DOM元素，看看哪些元素上使用了指令(如<div ng-modle=”m”></div>)，或者哪些元素本身就是个指令(如<mydierc></mydirec>)，或者使用了插值指令( {{}}也是一种指令，叫interpolation directive)，$compile大总管会把清点好的财产做一个清单，然后根据这些指令的优先级(priority)排列一下，真是个细心的大总管哈~大总管还会根据指令中的配置参数(template，place，transclude等)转换DOM，让指令“初具人形”。
然后就开始按顺序执行各指令的compile函数，注意此处的compile可不是大总管$compile，人家带着$是土豪，此处执行的compile函数是我们指令中配置的，compile函数中可以访问到DOM节点并进行操作，其主要职责就是进行DOM转换，每个compile函数执行完后都会返回一个link函数，这些link函数会被大总管汇合一下组合成一个合体后的link函数，为了好理解，我们可以把它想象成葫芦小金刚，就像是进行了这样的处理。
//合体后的link函数
function AB(){
  A(); //子link函数
  B(); //子link函数
}　　
// 接下来进入link阶段，合体后的link函数被执行。所谓的链接，就是把view和scope链接起来。链接成啥样呢？就是我们熟悉的数据绑定，通过在DOM上注册监听器来动态修改scope中的数据，或者是使用$watchs监听 scope中的变量来修改DOM，从而建立双向绑定。由此也可以断定，葫芦小金刚可以访问到scope和DOM节点。
// 不要忘了我们在定义指令中还配置着一个link参数呢，这么多link千万别搞混了。那这
// 个link函数是干嘛的呢，我们不是有葫芦小金刚了嘛？那我告诉你，其实它是一个小三。此话怎讲？compile函数执行后返回link函数，但若没有配置compile函数呢？葫芦小金刚自然就不存在了。 
// 正房不在了，当然就轮到小三出马了，大总管$compile就把这里的link函数拿来执行。这就意味着，配置的link函数也可以访问到scope以及DOM节点。值得注意的是，compile函数通常是不会被配置的，因为我们定义一个指令的时候，大部分情况不会通过编程的方式进行DOM操作，而更多的是进行监听器的注册、数据的绑定。所以，小三名正言顺的被大总管宠爱。
// 听完了大总管、葫芦小金刚和小三的故事，你是不是对指令的解析过程比较清晰了呢？不过细细推敲，你可能还是会觉得情节生硬，有些细节似乎还是没有透彻的明白，所以还需要再理解下面的知识点：
l compile和link的区别
// 　　其实在我看完官方文档后就一直有疑问，为什么监听器、数据绑定不能放在compile函数中，而偏偏要放在link函数中？为什么有了compile还需要link？就跟你质疑我编的故事一样，为什么最后小三被宠爱了？所以我们有必要探究一下，compile和link之间到底有什么区别。好，正房与小三的PK现在开始。
// 首先是性能。举个例子：
<ul>
  <li ng-repeat="a in array">
    <input ng-modle=”a.m” />
  </li>
</ul>         
// 我们的观察目标是ng-repeat指令。假设一个前提是不存在link。大总管$compile在编译这段代码时，会查找到ng-repeat，然后执行它的compile函数，compile函数根据array的长度复制出n个<li>标签。而复制出的<li>节点中还有<input>节点并且使用了ng-modle指令，所以compile还要扫描它并匹配指令，然后绑定监听器。每次循环都做如此多的工作。而更加糟糕的一点是，我们会在程序中向array中添加元素，此时页面上会实时更新DOM，每次有新元素进来，compile函数都把上面的步骤再走一遍，岂不是要累死了，这样性能必然不行。
// 现在扔掉那个假设，在编译的时候compile就只管生成DOM的事，碰到需要绑定监听器的地方先存着，有几个存几个，最后把它们汇总成一个link函数，然后一并执行。这样就轻松多了，compile只需要执行一次，性能自然提升。
// 另外一个区别是能力。
// 尽管compile和link所做的事情差不多，但它们的能力范围还是不一样的。比如正房能管你的存款，小三就不能。小三能给你初恋的感觉，正房却不能。
// 我们需要看一下compile函数和link函数的定义：
function compile(tElement, tAttrs, transclude) { ... }
function link(scope, iElement, iAttrs, controller) { ... }            
// 这些参数都是通过依赖注入而得到的，可以按需声明使用。从名字也容易看出，两个函数各自的职责是什么，compile可以拿到transclude，允许你自己编程管理乾坤大挪移的行为。而link中可以拿到scope和controller，可以与scope进行数据绑定，与其他指令进行通信。两者虽然都可以拿到element，但是还是有区别的，看到各自的前缀了吧？compile拿到的是编译前的，是从template里拿过来的，而link拿到的是编译后的，已经与作用域建立了
// 关联，这也正是link中可以进行数据绑定的原因。
// 　　我暂时只能理解到这个程度了。实在不想理解这些知识的话，只要简单记住一个原则就行了：如果指令只进行DOM的修改，不进行数据绑定，那么配置在compile函数中，如果指令要进行数据绑定，那么配置在link函数中。


13.1.6    指令的划分作用域参数：scope
// 我们在上面写了一个简单的<say-hello></say-hello>，能够跟美女打招呼。但是看看人家ng内置的指令，都是这么用的：ng-model=”m”，ng-repeat=”a in array”，不单单是作为属性，还可以赋值给它，与作用域中的一个变量绑定好，内容就可以动态变化了。假如我们的sayHello可以这样用：<say-hello speak=”content”>美女</say-hello>，把要对美女说的话写在一个变量content中，然后只要在controller中修改content的值，页面就可以显示对美女说的不同的话。这样就灵活多了，不至于见了美女只会说一句hello，然后就没有然后。
// 为了实现这样的功能，我们需要使用scope参数，下面来介绍一下。
// 使用scope为指令划分作用域
// 　　顾名思义，scope肯定是跟作用域有关的一个参数，它的作用是描述指令与父作用域的关系，这个父作用域是指什么呢？想象一下我们使用指令的场景，页面结构应该是这个样子：
<div ng-controller="testC">
    <say-hello speak="content">美女</say-hello>
</div>　　
// 外层肯定会有一个controller，而在controller的定义中大体是这个样子：
var app = angular.module('MyApp', [], function(){console.log('here')});
app.controller('testC',function($scope){
$scope.content = '今天天气真好！';
});　
// 所谓sayHello的父作用域就是这个名叫testC的控制器所管辖的范围，指令与父作用域的关系可以有如下取值：

false
// 默认值。使用父作用域作为自己的作用域
true
// 新建一个作用域，该作用域继承父作用域

// javascript对象
// 与父作用域隔离，并指定可以从父作用域访问的变量
// 乍一看取值为false和true好像没什么区别，因为取值为true时会继承父作用域，即父作用域中的任何变量都可以访问到，效果跟直接使用父作用域差不多。但细细一想还是有区别的，有了自己的作用域后就可以在里面定义自己的东西，与跟父作用域混在一起是有本质上的区别。好比是父亲的钱你想花多少花多少，可你自己挣的钱父亲能花多少就不好说了。你若想看这两个作用域的区别，可以在link函数中打印出来看看，还记得link函数中可以访问到scope吧。
// 最有用的还是取值为第三种，一个对象，可以用键值来显式的指明要从父作用域中使用属性的方式。当scope值为一个对象时，我们便建立了一个与父层隔离的作用域，不过也不是完全隔离，我们可以手工搭一座桥梁，并放行某些参数。我们要实现对美女说各种话就得靠这个。使用起来像这样：
scope: {
        attributeName1: 'BINDING_STRATEGY',
        attributeName2: 'BINDING_STRATEGY',...
}　　
// 键为属性名称，值为绑定策略。等等！啥叫绑定策略？最讨厌冒新名词却不解释的行为！别急，听我慢慢道来。
 
　　先说属性名称吧，你是不是认为这个attributeName1就是父作用域中的某个变量名称？错！其实这个属性名称是指令自己的模板中要使用的一个名称，并不对应父作用域中的变量，稍后的例子中我们来说明。再来看绑定策略，它的取值按照如下的规则：

@
传递一个字符串作为属性的值
str : ‘@string’
=
使用父作用域中的一个属性，绑定数据到指令的属性中
name : ‘=username’
&
使用父作用域中的一个函数,可以在指令中调用
getName : ‘&getUserName’
　　总之就是用符号前缀来说明如何为指令传值。你肯定迫不及待要看例子了，我们结合例子看一下，小二，上栗子~
举例说明
我想要实现上面想像的跟美女多说点话的功能，即我们给sayHello指令加一个属性，通过给属性赋值来动态改变说话的内容 主要代码如下：
app.controller('testC',function($scope){
   $scope.content = '今天天气真好！';
});
app.directive('sayHello',function(){
    return {
        restrict : 'E',
template: '<div>hello,<b ng-transclude></b>,{{ cont }}</div>',
        replace : true,
        transclude : true,
        scope : {
 
             cont : '=speak'
         }
    };
});
然后在模板中，我们如下使用指令：
<div ng-controller="testC">
    <say-hello speak=" content ">美女</say-hello>
</div>
看看运行效果：
美女今天天气真好！
　　执行的流程是这样的：
　　① 指令被编译的时候会扫描到template中的{ {cont} }，发现是一个表达式；
　　② 查找scope中的规则：通过speak与父作用域绑定，方式是传递父作用域中的属性；
　　③ speak与父作用域中的content属性绑定，找到它的值“今天天气真好！”；
　　④ 将content的值显示在模板中。
这样我们说话的内容content就跟父作用域绑定到了一其，如果动态修改父作用域的content的值，页面上的内容就会跟着改变，正如你点击“换句话”所看到的一样。
　　这个例子也太小儿科了吧！简单虽简单，但可以让我们理解清楚，为了检验你是不是真的明白了，可以思考一下如何修改指令定义，能让sayHello以如下两种方式使用：
<span say-hello speak="content">美女</span>
<span say-hello="content" >美女</span>
　　答案我就不说了，简单的很。下面有更重要的事情要做，我们说好了要写一个真正能用的东西来着。接下来就结合所学到的东西来写一个折叠菜单，即点击可展开，再点击一次就收缩回去的菜单。
控制器及指令的代码如下（例07）：
app.controller('testC',function($scope){
        $scope.title = '个人简介';
    $scope.text = '大家好，我是一名前端工程师，我正在研究AngularJs，欢迎大家与我交流';
});
    app.directive('expander',function(){
        return {
            restrict : 'E',
            templateUrl : 'expanderTemp.html',
            replace : true,
            transclude : true,
            scope : {
                mytitle : '=etitle'
            },
            link : function(scope,element,attris){
                scope.showText = false;
                scope.toggleText = function(){
                    scope.showText = ! scope.showText;
                }
            }
        };
    });
HTML中的代码如下：
 
<script type="text/ng-template" id="expanderTemp.html">
    <div  class="mybox">
<div class="mytitle" ng-click="toggleText()">
{{mytitle}}
</div>
<div ng-transclude ng-show="showText">
</div>
</div>
</script>
<div ng-controller="testC">
    <expander etitle="title">{{text}}</expander>
</div>
　　还是比较容易看懂的，我只做一点必要的解释。首先我们定义模板的时候使用了ng的一种定义方式<script type=”text/ng-template”id="expanderTemp.html">，在指令中就可以用templateUrl根据这个id来找到模板。指令中的{{mytitle}}表达式由scope参数指定从etitle传递，etitle指向了父作用域中的title。为了实现点击标题能够展开收缩内容，我们把这部分逻辑放在了link函数中，link函数可以访问到指令的作用域，我们定义showText属性来表示内容部分的显隐，定义toggleText函数来进行控制，然后在模板中绑定好。 如果把showText和toggleText定义在controller中，作为$scope的属性呢？显然是不行的，这就是隔离作用域的意义所在，父作用域中的东西除了title之外通通被屏蔽。
上面的例子中，scope参数使用了=号来指定获取属性的类型为父作用域的属性，如果我们想在指令中使用父作用域中的函数，使用&符号即可，是同样的原理。
6.2.6指令间通信参数：controller和require
　　使用指令来定义一个ui组件是个不错的想法，首先使用起来方便，只需要一个标签或者属性就可以了，其次是可复用性高，通过controller可以动态控制ui组件的内容，而且拥有双向绑定的能力。当我们想做的组件稍微复杂一点，就不是一个指令可以搞定的了，就需要指令与指令的协作才可以完成，这就需要进行指令间通信。
想一下我们进行模块化开发的时候的原理，一个模块暴露（exports）对外的接口，另外一个模块引用（require）它，便可以使用它所提供的服务了。ng的指令间协作也是这个原理，这也正是自定义指令时controller参数和require参数的作用。
controller参数用于定义指令对外提供的接口，它的写法如下：
 
controller: function controllerConstructor($scope, $element, $attrs, $transclude)　　
它是一个构造器函数，将来可以构造出一个实例传给引用它的指令。为什么叫controller（控制器）呢？其实就是告诉引用它的指令，你可以控制我。至于可以控制那些东西呢，就需要在函数体中进行定义了。先看controller可以使用的参数，作用域、节点、节点的属性、节点内容的迁移，这些都可以通过依赖注入被传进来，所以你可以根据需要只写要用的参数。关于如何对外暴露接口，我们在下面的例子来说明。
require参数便是用来指明需要依赖的其他指令，它的值是一个字符串，就是所依赖的指令的名字，这样框架就能按照你指定的名字来从对应的指令上面寻找定义好的controller了。不过还稍稍有点特别的地方，为了让框架寻找的时候更轻松些，我们可以在名字前面加个小小的前缀：^，表示从父节点上寻找，使用起来像这样：require : ‘^directiveName’，如果不加，$compile服务只会从节点本身寻找。另外还可以使用前缀：？，此前缀将告诉$compile服务，如果所需的controller没找到，不要抛出异常。
所需要了解的知识点就这些，接下来是例子时间，依旧是从书上抄来的一个例子，我们要做的是一个手风琴菜单，就是多个折叠菜单并列在一起，此例子用来展示指令间的通信再合适不过。
首先我们需要定义外层的一个结构，起名为accordion，代码如下：
app.directive('accordion',function(){
        return {
            restrict : 'E',
            template : '<div ng-transclude></div>',
            replace : true,
            transclude : true,
controller :function(){
                var expanders = [];
                this.gotOpended = function(selectedExpander){
                    angular.forEach(expanders,function(e){
                        if(selectedExpander != e){
                            e.showText = false;
                        }
                    });
                }
                this.addExpander = function(e){
                    expanders.push(e);
                }
            }
        }
    });
需要解释的只有controller中的代码，我们定义了一个折叠菜单数组expanders，并且通过this关键字来对外暴露接口，提供两个方法。gotOpended接受一个selectExpander参数用来修改数组中对应expander的showText属性值，从而实现对各个子菜单的显隐控制。addExpander方法对外提供向expanders数组增加元素的接口，这样在子菜单的指令中，便可以调用它把自身加入到accordion中。
看一下我们的expander需要做怎样的修改呢：
app.directive('expander',function(){
        return {
            restrict : 'E',
            templateUrl : 'expanderTemp.html',
            replace : true,
            transclude : true,
            require : '^?accordion',
            scope : {
                title : '=etitle'
            },
 
            link : function(scope,element,attris,accordionController){
                scope.showText = false;
                accordionController.addExpander(scope);
                scope.toggleText = function(){
                    scope.showText = ! scope.showText;
                    accordionController.gotOpended(scope);
                }
            }
        };
    });
首先使用require参数引入所需的accordion指令，添加?^前缀表示从父节点查找并且失败后不抛出异常。然后便可以在link函数中使用已经注入好的accordionController了，调用addExpander方法将自己的作用域作为参数传入，以供accordionController访问其属性。然
后在toggleText方法中，除了要把自己的showText修改以外，还要调用accordionController的gotOpended方法通知父层指令把其他菜单给收缩起来。
指令定义好后，我们就可以使用了，使用起来如下：
 
<accordion>
<expander ng-repeat="expander in expanders" etitle="expander.title"> 
{{expander.text}} 
</expander>
</accordion>　　
外层使用了accordion指令，内层使用expander指令，并且在expander上用ng-repeat循环输出子菜单。请注意这里遍历的数组expanders可不是accordion中定义的那个expanders，如果你这么认为了，说明还是对作用域不够了解。此expanders是ng-repeat的值，它是在外层controller中的，所以，在testC中，我们需要添加如下数据：
$scope.expanders = [
            {title: '个人简介',
             text: '大家好，我是一名前端工程师，我正在研究AngularJs，欢迎大家与我交流'},
            {title: '我的爱好',
             text: 'LOL '},
            {title: '性格',
             text: ' 我的性格就是无性格'}
        ];














































