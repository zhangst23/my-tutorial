// AngularJS-指令directive.js

1.0   创建指令
// 指令也是一种服务，只是这种服务的定义有几个特殊要求：

		(1)必须使用模块的directive()方法注册服务
		(2)必须以对象工厂/factory()方法定义服务实现
		(3)对象工厂必须返回一个指令定义对象


//定义指令的类工厂
var directiveFactory = function(injectables){
    //指令定义对象
    var directiveDefinationObject = {
        ...
    };
    return directiveDefinationObject;
};
//在模块上注册指令
angular.module("someModule",[])
.directive("directiveName",directiveFactory);

// INSIDE：指令在注入器中的登记名称是：指令名+Directive。 例如，ng-app指令的服务名称是："ngAppDirective"。

// 右边的示例定义一个简单的指令ez-hoverable，这个指令被限制只能 出现在属性的位置，每个具有这个指令的HTML元素，将在鼠标移入 时以虚线边框突出显示。
<html ng-app="ezstuff">
<head>
	<script src="http://lib.sinaapp.com/js/angular.js/angular-1.2.19/angular.min.js"></script>
</head>
<body>
	<span ez-hoverable>我是SPAN</span>
	<button ez-hoverable>我是BUTTON</button>
	<div ez-hoverable>我是DIV</div>
	<textarea ez-hoverable>我是TEXTAREA</textarea>
<script>
var ezHoverableFactory = function(){
	return {
		restrict : "A",
		link : function(scope,element,attrs){
			element.on("mouseover",function(){
				element.css({outline:"#ff0000 dotted thick"});
			})
			.on("mouseout",function(){
				element.css({outline:"none"});
			})
		}
	};
};
angular.module("ezstuff",[])
.directive("ezHoverable",ezHoverableFactory);
</script>
</body>
</html>




2.0   指令定义对象
// 每个指令定义的工厂函数，需要返回一个指令定义对象。指令定义对象就是 一个具有约定属性的JavaScript对象，编译器/$compile在编译时就根据这 个定义对象对指令进行展开。

// 指令定义对象的常用属性如下：

template : string
		使用template指定的HTML标记替换指令内容（或指令自身）

restrict : string
		用来限定指令在HTML模板中出现的位置。

replace : true|false
		使用这个属性指明template的替换方式。

scope : true|false|{...}
		scope属性为指令创建私有的作用域，这在创建可复用的Widget时非常有用。

link : function(..){...}
		link属性是一个函数，用来在指令中操作DOM树、实现数据绑定。

transclude : true|false|'element'
		允许指令包含其他HTML元素，这通常用于实现一个容器类型的Widget。


//右侧例子
var ezHoverableFactory = function(){
	return {
		restrict : "A",
		link : function(scope,element,attrs){
			element.on("mouseover",function(){
				element.css({outline:"#ff0000 dotted thick"});
			})
			.on("mouseout",function(){
				element.css({outline:"none"});
			})
		}
	};
};
angular.module("ezstuff",[])
.directive("ezHoverable",ezHoverableFactory);


3.0   指令参数


3.1   template：定义替换模板
// 最简单的指令只需要使用template属性进行模板替换就可以实现。

// template指明一个HTML片段，可以用来：

	~替换指令的内容。这是默认的行为，可以使用replace属性更改。
	~如果replace = true，那么用HTML片段替换指令本身。
	~包裹指令的内容，如果transclue属性为true。
// 右边的示例实现了一个ezCustomer指令，这个指令只是简单的使用template指定的 模板替换ez-customer的内容：


angular.module("ezstuff",[])
.controller("ezCtrl", ["$scope", function($scope) {
  $scope.customer = {
    name: "Naomi",
    address: "1600 Amphitheatre"
  };
}])
.directive("ezCustomer", function() {
  return {
    template: "Name: {{customer.name}} Address: {{customer.address}}"
  };
});

3.2   restrict：限制指令的出现位置
// restict属性可以是EACM这四个字母的任意组合，用来限定指令的应用场景。 如果不指定这个属性，默认情况下，指令将仅允许被用作元素名和属性名：

E - 指令可以作为HTML元素使用
A - 指令可以作为HTML属性使用
C - 指令可以作为CSS类使用
M - 指令可以在HTML注释中使用
// 我们对之前的示例，增加一个restrict属性，限制这个只能作为元素名使用。 代码已经预置到右边，你可以看到，现在唯一合法的方式是使用如下方式应用指令：

<ez-customer></ez-customer>
// 考查编译后的DOM结构，你会发现ez-customer这个”伪“HTML标签还被保留着，这有时让完美 主义者有点闹心：


//右边例子
angular.module("ezstuff",[])
.controller("ezCtrl",["$scope",function($scope){
	$scope.customer = {
		name:"Naomi",
		address:"1600 Amphitheatre"
	};
}])
.directive("ezCustomer",function(){
	return{
		restrict:"E",
		template:"Name:{{customer.name}} Address:{{customer.address}}"
	};
});



3.3   replace：模板的使用方式
// 我们希望使用template完整地替换原始的DOM对象，而不是填充其内容，replace 属性负责这件事。

// replace属性指明使用template时，如何替换指令元素：

true - 编译时，将使用template替换指令元素
false - 编译时，将使用template替换指令元素的内容
// 右边的示例增加了replace属性，值为true意味着这个指令要求编译器使用template 替换原始的DOM元素:
.directive("ezCustomer", function() {
  return {
	  restrict:"E",
	  replace:true,
	  template: "<div>Name: {{customer.name}} Address: {{customer.address}}</div>"
  };
});


3.4   作用域问题
// 默认情况下，指令没有自己的scope对象，换句话说，它使用所在DOM对象对应的scope对象。

// 那么问题来了，如果一个指令在同一个scope内出现多次，会怎样？

<div ng-controller="ezCtrl">
    <ez-customer></ez-customer>
    <ez-customer></ez-customer>
</div>
// 没错，由于两个ez-customer指令都处在ezCtrl开辟的作用域内，所以两个指令绑定到了同样的 数据模型上，得到的是重复的结果。

// 显然，我们可以将每个ez-customer指令置于不同的作用域下，这意味着我们给每个ez-customer 一个不同的控制器：

<div ng-controller="ezCtrl1">
    <ez-customer></ez-customer>
</div>
<div ng-controller="ezCtrl2">
    <ez-customer></ez-customer>
</div>
// 看起来很怪异，对吗？

3.5   scope：使用隔离的作用域
// 通过设置scope属性，指令的每个实例都将获得一个隔离的本地作用域：

var ezCustomerDirectiveFactory = function(){
    return {
        restrict:"E",
        replace:true,
        scope:{
            name : "@name", 
            address : "=address"
        },
        template:"<div>name:{{name}} address:{{address}}</div>"
    }
}
// 在上面的例子中，我们在本地scope上定义了两个属性：name和address，这样在 模板中就可以使用name和address了。

// 你应该已经注意到，name属性的值之前有一个@符号，这是一个约定好的标记，它 告诉编译器，本地scope上的name值需要从应用这个指令的DOM元素的name属性值 读取，如果DOM元素的name属性值变了，那么本地scope上的name值也会变化。

// 同样，address属性之前的=符号也是一个约定好的标记，它告诉编译器，本地scope 上的address属性值和DOM元素的address属性值指定的外部scope对象上的模型需要 建立双向连接：外部scope上模型的变化会改变本地scope上的address属性，本地 scope上address属性的变化也会改变外部scope上模型的变化。

// 有点绕，上个图：



// 从图中可以看出：

// 指令的template绑定的是本地scope上的name和address。
// 本地scope的name属性的值始终是ez-customer对象上name属性的值
// 本地scope的address属性值始终和ez-customer对应的scope对象上的Emmy.address 保持同步。
// 再送个示例→_→，多琢磨下。
<html ng-app="ezstuff">
<head>
	<script src="http://lib.sinaapp.com/js/angular.js/angular-1.2.19/angular.min.js"></script>
</head>
<body>
	<div ng-controller="ezCtrl">
		<ez-customer sb="Emmy"></ez-customer>
		<ez-customer sb="Edison"></ez-customer>
	</div>
	<script>
angular.module("ezstuff",[])
.controller("ezCtrl", ["$scope", function($scope) {
  $scope.Emmy = {
    name: "Emmy",
    address: "1600 Amphitheatre"
  };
  $scope.Edison = {
    name: "Edison",
    address: "2500 Amphitheatre"
  };
}])
.directive("ezCustomer", function() {
  return {
	  restrict:"E",
	  replace:true,
	  scope:{
		customer:"=sb",
	  },
	  template: "<div>Name: {{customer.name}} Address: {{customer.address}}</div>"
  };
});
	</script>
</body>
</html>



3.6    link:在指令中操作DOM
// 如果需要在指令中操作DOM，我们需要在对象中定义link属性，link函数的定义如下：

function link(scope, iElement, iAttrs, controller, transcludeFn) { ... }
// 注意link函数的参数，AngularJS在编译时负责传入正确的值：

		scope
		指令对应的scope对象。如果指令没有定义自己的本地作用域，那么传入的就是外部的 作用域对象。
		
		iElement
		指令所在DOM对象的jqLite封装。如果使用了template属性，那么iElement对应 变换后的DOM对象的jqLite封装。
		
		iAttrs
		指令所在DOM对象的属性集。这是一个Hash对象，每个键是驼峰规范化后 的属性名。

// 后两个参数我们先略过。

// 示例
// 在右边的示例中，我们实现了一个可以指定显示格式的小时钟指令：ezCurrentTime。和原来一样， 我们在link函数中启动定时器，并在定时器中更新DOM。有几点解释下：

// ~ 我们在scope上使用$watch()方法对format的值进行监听，并使用这个值调整显示格式
// ~ 我们监听element的$destroy事件，这个事件是在DOM对象销毁时触发。我们在这个事件触发时 销毁定时器以释放资源
// ~ 我们使用了AngularJS内置的$interval服务，而不是setInterval()函数创建定时器。
// ~ 我们使用了AngularJS内置的dateFilter过滤器服务，对时间的显示进行格式化。 和$interval一样，dateFilter服务也是通过注入器注入的。

//  右侧例子
<html ng-app="ezstuff">
<head>
	<script src="http://lib.sinaapp.com/js/angular.js/angular-1.2.19/angular.min.js"></script>
</head>
<body>
<div ng-controller="ezCtrl">
  Date format: <input ng-model="format"> <hr/>
  Current time is: <span ez-current-time="format"></span>
</div>

<script>
angular.module("ezstuff",[])
.controller("ezCtrl",["$scope",function($scope){
	$scope.format = "M/d/yy h:mm:ss a";
}])
.directive("ezCurrentTime",["$interval","dateFilter",
	function($interval,dateFilter){
		//定义link函数
		function link(scope,element,attrs){
			var format,
				timeoutId;
			//更新DOM内容
			function updateTime(){
				element.text(dateFilter(new Date(),format));
			}
	
			//监听时钟格式
			scope.$watch(attrs.ezCurrentTime,function(value){
				format = value;
				updateTime();
			});
	
			//在DOM对象销毁时注销定时器
			element.on("$destroy",function(){
				$interval.cancel(timeoutId);
			});
	
			//启动定时器
			timeoutId = $interval(function(){
				updateTime();     //update  DOM
			},1000);
		};

		//返回指令定义对象
		return{
			link:link
	};
	}]);



</script>
</body>
</html>


3.7    transclude:包含其他元素

// 有些指令需要能够包含其他未知的元素。比如我们定义一个指令ez-dialog，用来 封装对话框的样式和行为，它应当允许在使用期（也就是在界面模板文件里）才指 定其内容：

<ez-dialog>
    <p>对话框的内容在我们开发ez-dialog指令的时候是无法预计的。这部分内容需要
		被转移到展开的DOM树中适当的位置。</p>
</ez-dialog>
// transclude属性可以告诉编译器，利用所在DOM元素的内容，替换template中包含 ng-transclude指令的元素的内容：


// 从上图中可以看到，使用transclude有两个要点：

// ~ 需要首先声明transclude属性值为true，这将告诉编译器，使用我们这个指令的 DOM元素，其内容需要被复制并插入到编译后的DOM树的某个点。
// ~ 需要在template属性值中使用ng-transclude指明插入点。

// 右边嵌入了ez-dialog的实现实例。
































