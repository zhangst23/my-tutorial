1.0 在AngularJS中，控制器是一个Javascript函数（类型/类），用来增强除了根作用域意外的作用域实例的。

// 控制器用于：

// 			~设置好作用域对象的初始状态。
// 			~给作用域对象增加行为。

// 一般来说，当你创建应用时，你需要对它的作用域设置初始状态。

// AngularJS将对作用域对象调用控制器的构造函数（从某种意义上来说就像使用的Javascript的apply方法），
// 以此来设置作用域的初始状态。这意味着AngularJS不会创建控制器类型的实例（不会使用new方法来调用控制器构造函数）。
// 控制器总是对某个已存在的作用域对象调用。

// 你可以通过创建一个模型属性来设置初始作用域的初始状态。 比如:
 function GreetingCtrl($scope){ $scope.treeting = 'Hola!'; }


2.0  给作用域对象增加行为

// AngularJS作用域对象的行为是由作用域的方法来表示的。这些方法是可以在模板或者说视图中调用的。
// 这些方法和应用模型交互，并且能改变模型。

// 如我们在模型那一章所说的，任何对象（或者原生的类型）被赋给作用域后就会变成模型。任何赋给作用域的方法，
// 都能在模板或者说视图中被调用，并且能通过表达式或者ng事件指令调用。（比如，ngClick）


3.0 正确地使用控制器

// 总的来说，一个控制器不应该做太多工作。它应该只包含单个视图的业务逻辑。

// 保持控制器职责单一的最常见做法是将那些不属于控制器的工作抽离到服务中，然后通过依赖注入在控制器中使用这些服务。
// 这在依赖注入服务的章节中会详细讨论。

// 不要用控制器干下面的事情：

// 		~~控制器应该只关心业务逻辑。DOM操作（表现层逻辑）通常会把测试弄得很难。将任何表现层逻辑放到控制器中都会显著地增加对业务逻辑的测试难度。
// 			  AngularJS提供dev_guide.templates.databinding用来自动进行DOM操作。如果你需要手动操作DOM，将表现层的逻辑抽离到指令中。
// 		~~对输入格式化 — 你应该用AngularJS的表单控制来实现格式化。.
// 		~~对输出格式化 — 该用AngularJS的过滤器实现。.
// 		~~在控制器中运行无状态或者有状态但在控制器中共享的代码 — 该用服务来实现.
// 		~~实例化组件或者控制其它组件的生命周期（比如创建一个服务的实例）.

4.0 将控制器和AngularJS的作用域对象联系起来

// 你可以显示地用scope.$new来将控制器和作用域对象显示地联系起来，或者隐式地通过ngController指令或者$route服务来联系。


控制器构造函数和方法的例子

// 为了阐述AngularJS的控制器组件的运行原理，让我们来创建一个拥有下面这些组件的小应用：

// 一个有两个按钮和一条消息的模板
// 一个叫spice的字符串模型。
// 一个拥有两个方法的控制器。方法是用来设置spice的值得。
// 模板中的消息包含了一个对spice模型的绑定，它初始的字符串是“very”。这个spice模型会被设置成 chili 或者 jalapeno，这取决于哪个按钮会被点击。消息会通过data-binding自动更新。

// 一个 spice 控制器例子

<body ng-controller="SpicyCtrl">
	<button ng-click="chiliSpicy()">Chili</button>
	<button ng-click="JalapenoSpicy()">Jalapeno</button>
	<p>The food is {{spice}} spicy!</p>
</body>

function SpicyCtrl($scope){
	$scope.spice = 'very';
	$scope.chiliSpicy = function(){
		$scope.spice = 'child';

	}
	$scope.JalapenoSpicy = function(){
		$scope.spice = 'jalapeno';
	}
}



// 例子中有下面这些需要注意：

~ngController指令是用来（隐式地）为模板创建作用域的。并且使用命令中指定的spicyCtrl控制器来增强这个作用域。
~spicyCtrl只是一个纯Javascript函数。使用了驼峰式命名法（可选）命名并以Ctrl或者Controller结尾。
~对作用域对象赋予一个新的属性会创建或者更新模型。
~控制器方法能够直接通过赋格作用域对象这个方式创建（如例子中的chiliSpicy方法）。
~控制器中的所用方法都能在模板中调用（在body元素或者子元素中）.
~NB:AngularJS的老版本（1.0RC之前的）能让你用它来替换$scope方法。但是现在不行了。在作用域中定义的方法中，他和$scope是可以互换的（AngularJS将它设置成$scope），那是在你的控制器构造函数中就不行了。
~NB: AngularJS的老版本（1.0RC之前的）自动给作用域对象原型添加方法，现在不会了。所有的方法都必须手动添加到作用域。


5.0   控制器方法可以接受参数，像下面里中演示的：

// 控制器方法参数的例子
<body ng-controller="SpicyCtrl">
	<input ng-model="customSpice" value="wasabi">
	<button ng-click="spicy('chili')">Chili</button>
	<button ng-click="spicy(customSpice)">custom spice</button>
	<p>The food is {{spice}} spicy!</p>
</body>

function SpicyCtrl($scope){
	$scope.spice = 'very';
	$scope.spicy = function(spice){
		$scope.spice = spice;
	}
}
// 注意SpicyCtrl控制器只定义了一个叫spicy的方法，它接受一个叫做spice的参数。和这个控制器相关的模板在第一个按钮事件中传递了一个chili常量给控制器方法，在第二个按钮中传递一个模型属性。


6.0   控制器继承示例

// AngularJS中的控制器继承是基于作用域的继承的。让我们看下面这个例子：
<body ng-controller="MainCtrl">
	<p>Good {{timeOfDay}},{{name}}!</p>
	<div ng-controller="ChildCtrl">
		<p>Good {{timeOfDay}},{{name}}!</p>
		<p ng-controller="BabyCtrl">Good {{timeOfDay}},{{name}}!</p>
	</div>
</body>

function MainCtrl($scope){
	$scope.timeOfDay = 'morning';
	$scope.name = 'Nikki';
}

function ChildCtrl($scope){
	$scope.name = 'Mattie';
}

function BabyCtrl($scope){
	$scope.timeOfDay = 'evening';
	$scope.name = 'Gingerbreak Baby';
}

// 注意我们是如何在模板中嵌套我们的ngController指令的。这个模板结构会使得AngularJS为视图创建四个作用域：

// ~ 根作用域
// ~ MainCtrl作用域， 它包含了模型timeOfDay和模型name。
// ~ ChildCtrl作用域，它继承了上层作用域的timeOfDay，复写了name。
// ~ BabyCtrl作用域，复写了MainCtrl中定义的timeOfDay和ChildCtrl中的name。

// 控制器的继承和模型继承是同一个原理。所以在我们前面的例子中，所有的模型都用返回相应字符串的控制器方法代替。

// 注意：常规的原型继承对控制器来说不起作用。因为正如我们之前提到的，控制器不是直接实例化的，而是对作用域对象调用的。


7.0   测试控制器

// 尽管有很多测试控制器的方法。但最好的是像我们下面这样展示的。这个例子注入了$rootScope和$controller。

// 控制器函数：
function myController($scope){
	$scope.spices =  [{"name":"pasilla", "spiciness":"mild"},
                 	  {"name":"jalapeno", "spiceiness":"hot hot hot!"},
                  	  {"name":"habanero", "spiceness":"LAVA HOT!!"}];

	$scope.spice = "habanero"
}

// 控制器测试：
describe('myController function',function(){
	describe('myController',function(){
		var scope;

		beforeEach(inject(function($rootScope,$controller){
			scope = $rootScope.$new();
			var ctrl = $controller(myController,{$scope:scope});
		}));

		it('should create "spices" model with 3 spices',function(){
			export(scope.spices.length).toBe(3);
		});

		it('should set the default value of spice',function(){
			expect(scope.spice).toBe('habanero');
		});
	});
});

// 如果你需要测试嵌套的控制器，你需要创建和DOM中相同相同的作用域层级。


describe('state', function() {
    var mainScope, childScope, babyScope;

    beforeEach(inject(function($rootScope, $controller) {
        mainScope = $rootScope.$new();
        var mainCtrl = $controller(MainCtrl, {$scope: mainScope});
        childScope = mainScope.$new();
        var childCtrl = $controller(ChildCtrl, {$scope: childScope});
        babyScope = childCtrl.$new();
        var babyCtrl = $controller(BabyCtrl, {$scope: babyScope});
    }));

    it('should have over and selected', function() {
        expect(mainScope.timeOfDay).toBe('morning');
        expect(mainScope.name).toBe('Nikki');
        expect(childScope.timeOfDay).toBe('morning');
        expect(childScope.name).toBe('Mattie');
        expect(babyScope.timeOfDay).toBe('evening');
        expect(babyScope.name).toBe('Gingerbreak Baby');
    });
});






8.0   Angularjs Controller间通信机制
// 原文地址:http://www.cnblogs.com/whitewolf/archive/2013/04/16/3024843.html

 // 在Angularjs开发一些经验总结随笔中提到我们需要按照业务却分angular controller，避免过大无所不能的上帝controller，
 // 我们把controller分离开了，但是有时候我们需要在controller中通信，一般为比较简单的通信机制，告诉同伴controller我的某个
 // 你所关心的东西改变了，怎么办？如果你是一个javascript程序员你会很自然的想到异步回调响应式通信—事件机制(或消息机制)。
 // 对，这就是angularjs解决controller之间通信的机制，所推荐的唯一方式，简而言之这就是angular way。



// Angularjs为在scope中为我们提供了冒泡和隧道机制，$broadcast会把事件广播给所有子controller，而$emit则会将事件冒泡
// 传递给父controller，$on则是angularjs的事件注册函数，有了这一些我们就能很快的以angularjs的方式去
// 解决angularjs controller之间的通信，代码如下：
 

//  View: 
<div ng-app="app" ng-controller="parentCtr">
	<div ng-controller="childCtr1">
		name:<input ng-model="name" type="text" ng-change="change(name)";>
	</div>
	<div ng-controller="childCtr2">
		Ctr1 name:<input ng-model="ctr1Name">
	</div>

</div>


//Controller: 
angular.module("app",[])
.controller("parentCtr",function($scope){
	$scope.$on("Ctr1NameChange",

	function (event,msg){
		console.log("parent",msg);
		$scope.$broadcast("Ctr1NameChangeFromParent",msg);

	});
})
.controller("childCtr1",function($scope){
	$scope.change = function(name){
		console.log("childCtr1",name);
		$scope.$emit("Ctr1NameChange",name);
	};
})
.controller("childCtr2",function ($scope){
	$scope.$on("Ctr1NameChangeFromParent",function(event,msg){
		console.log("childCtr2",msg);
		$scope.ctr1Name = msg;
	});
});


// 这里childCtr1的name改变会以冒泡传递给父controller，而父controller会对事件包装在广播给所有子controller，
// 而childCtr2则注册了change事件，并改变自己。注意父controller在广播时候一定要改变事件name。



9.0   向cope对象添加方法

<div ng-controller="ezController">
	<button ng-click="vm.shuffle();">Shuffle</button>
	<div>name:{{vm.sb.name}}</div>
	<div>gender:{{vm.sb.gender}}</div>
	<div>age:{{vm.sb.age}}</div>
	<div>career:{{vm.sb.career}}</div>
	<div><img ng-src="{{vm.sb.photo}}"></div>
</div>

// scope
var ezControllerClass = function($scope){
	//view model
	$scope.vm = {
		sb:{
			name:"Json Stantham",
			gender:"male",
			career:"actor",
			photo:"http://b.hiphotos.baidu.com/baike/w%3D268/sign=a03742145bee3d6d22c680cd7b176d41/359b033b5bb5c9eae4c45250d739b6003af3b34a.jpg"
		},
		shuffle:function(){
			var repo = [
					{name:"Jason Stantham",gender:"male",age:48,career:"actor",photo:"http://b.hiphotos.baidu.com/baike/w%3D268/sign=a03742145bee3d6d22c680cd7b176d41/359b033b5bb5c9eae4c45250d739b6003af3b34a.jpg"},
					{name:"Jessica Alba",gender:"female",age:32,career:"actress",photo:"http://h.hiphotos.baidu.com/baike/w%3D268/sign=ce8cdcb43bdbb6fd255be2203125aba6/b219ebc4b74543a91d7092831c178a82b9011411.jpg"},
					{name:"Nicolas Cage",gender:"male",age:53,career:"actor",photo:"http://f.hiphotos.baidu.com/baike/w%3D268/sign=e97412d2359b033b2c88fbdc2dcf3620/4a36acaf2edda3cc4187b7f600e93901203f9280.jpg"},
					{name:"崔永元",gender:"male",age:48,career:"independent journalist",photo:"http://e.hiphotos.baidu.com/baike/w%3D268/sign=856e3aab34d3d539c13d08c50286e927/8c1001e93901213ff48a548956e736d12f2e952d.jpg"},
					{name:"Sheetal Sheth",gender:"female",age:36,career:"actress",photo:"http://h.hiphotos.baidu.com/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=f3627d0333fa828bc52e95b19c762a51/060828381f30e924f7c565374c086e061d95f757.jpg"},
					{name:"Barack Obama",gender:"male",age:58,career:"president",photo:"http://a.hiphotos.baidu.com/baike/w%3D268/sign=2a0045f7f1d3572c66e29bdab2126352/f7246b600c338744cb293d62520fd9f9d72aa03b.jpg"},
					{name:"Владимир Владимирович Путин",gender:"male",age:63,career:"president",photo:"http://h.hiphotos.baidu.com/baike/w%3D268/sign=657e210bb17eca8012053ee1a9239712/8435e5dde71190efa1a915f7cf1b9d16fdfa604c.jpg"}
				];
			var idx = Math.floor(Math.random()*repo.length);
			$scope.vm,sb = repo[idx];
		}
	};
};

angular.module("ezstuff",[])
.controller("ezController",ezControllerClass);





























