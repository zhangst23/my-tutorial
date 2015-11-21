1.0  demo 


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="script/foundation.min.css">

</head>
<body>
	<div ng-app="app" ng-controller="test">
num:<input ng-model="num" />
<br/>
{{num | number}}
<br/>
{{num | number:2}}
<br/>
first name:<input ng-model="person.first"/>
<br/>
last name:<input ng-model="person.last"/>
<br/>
name: {{person | fullname}}
</div>
<script src="script/angular.min.js"></script>
	<script type="text/javascript">
	function test($scope) {

}
angular.module("app", []).controller("test", test).
filter("fullname", function() {
    var filterfun = function(person, sep) {
        sep = sep || " ";
        person = person || {
            first : "",
            last: ""
        };
        return person.first + sep + person.last;
    };
    return filterfun;
});
	</script>
	<script src="script/angular.min.js"></script>
</body>

</html>



2.0   在视图模板中使用过滤器
// 过滤器也是一种服务，负责对输入的内容进行处理转换，以便更好地向用户显示。

// 过滤器可以在模板中的{{}}标记中使用：

{{ expression | filter:arg1:arg2}}
// 预置的过滤器
// AngularJS的ng模块实现了一些预置的过滤器，如：currency、number等等，可以直接 使用。例如下面的示例将对数字12使用currency过滤器，结果将是"$12.00"：

{{12|currency}}
// 带参数的过滤器
// 过滤器也可以有参数，例如下面的示例将数字格式化为"1,234.00":

{{1234|number:2}}
// 过滤器流水线
// 过滤器可以应用于另一个过滤器的输出，就像流水线，语法如下：

{{expression|filter1|filter2|...}}
// 右边是使用过滤器的示例。


3.0   在代码中使用过滤器
// 别忘了过滤器也是一种服务，所以你可以将它注入你的代码中。

// 和普通的服务不同，过滤器在注入器中注册时，名称被加了一个后缀：Filter。 例如，number过滤器的服务名称是：numberFilter，而currency过滤器的服务名称是： currencyFilter。

// 通常我们的代码被封装在三个地方：控制器、服务、指令。这些地方都支持服务的直接 注入，例如：

angular.module('myModule',[])
.controller(function($scope,numberFilter){
    //...
})
// 有时你需要显式的通过注入器调用过滤器，那么使用注入器的invoke()方法：

angular.injector(['ng'])
.invoke(function(numberFilter){
    //...
})
// 总之，记住过滤器是一种服务，除了名字需要追加Filter后缀，和其他服务的调用方法没 什么区别。

// 右边的示例在控制器中注入了number和currency过滤器，实现对total的格式化。
<html ng-app="ezstuff">
<head>
    <script src="http://lib.sinaapp.com/js/angular.js/angular-1.2.19/angular.min.js"></script>
</head>
<body>
<div ng-controller="ezCtrl">
    Total salary is {{total}}
</div>

<script>
    angular.module("ezstuff",[])
    .controller("ezCtrl",function($scope,numberFilter,currencyFiler){
        $scope.total = currencyFiler(numberFilter(123,2));
    })

</script>

</body>
</html>



4.0    创建过滤器
// 和指令类似，过滤器也是一种特殊的服务，与创建一个普通的服务相比较：

// ~~ 必须使用模块的filter()接口注册服务
// ~~ 必须提供对象工厂/factory方法
// ~~ 对象工程必须返回一个过滤器函数，其第一个参数为输入变量

//定义过滤器类工厂
var filterFactory = function(){
    //定义过滤器函数
    var filter = function(input,extra_args){
        //process input and generate output
        return output
    }
};
//在模块上注册过滤器
angular.module("someModule",[])
.filter("filterName",filterFactory);


// 右边的示例定义了一个将字符串格式化为大写的过滤器。
<html ng-app="ezstuff">
<head>
    <script src="http://lib.sinaapp.com/js/angular.js/angular-1.2.19/angular.min.js"></script>
</head>
<body ng-init="text='just a demo!'">
    <p>{{text|ezUC}}</p>

    <script>
        //过滤器对象工厂定义
        var ezUCFilterFactory = function(){
            //过滤器对象返回的是一个过滤函数
            var filter = function(input){
                return input.toUpperCase();
            }
            return filter;
        };
        angular.module("ezstuff",[])
        //使用模块filter()接口注册过滤器
        .filter("ezUC",ezUCFilterFactory);
    </script>


</body>
</html>


5.0  为过滤器增加参数
// 过滤器的行为可以通过额外的参数来调整。比如，我们希望改进上一节的示例，使其可以 支持仅大写每个单词的首字母。

// (1)实现
// 通过在过滤器类工厂返回的过滤器函数中传入额外的参数，就可以实现这个功能。

var filter = function(input,argument1,argument2){...}

// (2)使用
// 在使用过滤器时，额外的参数通过前缀:引入，比如

{{expression|filter:argument1:argument2}}

// 右边的示例实现了支持参数的过滤器ezUC，试着去掉HTML模板中过滤器ezUC的参数， 看看显示输出的区别！
<html ng-app="ezstuff">
<head>
    <script src="http://lib.sinaapp.com/js/angular.js/angular-1.2.19/angular.min.js"></script>
</head>
<body ng-init="text='just a demo!'">
    <p>{{text|ezUC:true}}</p>

<script>
    //过滤器对象工厂定义
    var ezUCFilterFactory = function(){
        //过滤器对象返回的是一个过滤函数
        return function(input,cap){
            if (!cap) return input.toUpperCase();
            var output = input.replace(/\b\w+\b/g,function(word){
                return word.substring(0,1).toUpperCase() + word.substring(1);
            });
            return output;
        }
    };
    angular.module("ezstuff",[])
    //使用模块的filter()接口注册过滤器
    .filter("ezUC",ezUCFilterFactory);
</script>

</body>
</html>



































