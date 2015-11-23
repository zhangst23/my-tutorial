
1.0   

// angularjs的注入方式.html
// 所以在这节将引用angularjs的注入代码来分析angularjs的注入方式。angularjs的注入方式分为3中方式:
// ~~（1）.推断式注入：在angularjs中我们可以在我们需要注入的地方按照名称注入，这里要求参数名称必须和注入服务实例名称相同，
//       	一种名称约定，angularjs会提取参数名称查找相应DI实例注入
// ~~（2）.标记注入：在angularjs中我们可以利用$inject标注DI注入，这里需要注入服务名称的顺序和构造参数对应，这里可以解决以上约定的死板性；
// ~~（3）.内联注入：对于directives，factory，filter等特殊指令使用$indect标注注入使用不是那么友好，angularjs特别增加了内联注入




/** 
* @ngdoc overview 
* @name AUTO 
* @description 
* 
* Implicit module which gets automatically added to each {@link AUTO.$injector $injector}. 
*/ 

var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m; 
var FN_ARG_SPLIT = /,/; 
var FN_ARG = /^\s*(_?)(.+?)\1\s*$/; 
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg; 
function annotate(fn) { 
  var $inject, 
      fnText, 
      argDecl, 
      last; 

  if (typeof fn == 'function') { 
    if (!($inject = fn.$inject)) { 
      $inject = []; 
      fnText = fn.toString().replace(STRIP_COMMENTS, ''); 
      argDecl = fnText.match(FN_ARGS); 
      forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg){ 
        arg.replace(FN_ARG, function(all, underscore, name){ 
          $inject.push(name); 
        }); 
      }); 
      fn.$inject = $inject; 
    } 
  } else if (isArray(fn)) { 
    last = fn.length - 1; 
    assertArgFn(fn[last], 'fn') 
    $inject = fn.slice(0, last); 
  } else { 
    assertArgFn(fn, 'fn', true); 
  } 
  return $inject; 
}




//   关于angularjs注入就到这里，在最后想说下说这代码中我们能获取的两个javascript技巧：

// 对于javascript是运行时解释的弱类型语言，我们无法利用c#，java类似的反射机制去获取参数信息，我们只能靠正则从javascript代码中匹配（从function.toString()）.
// 正则的强大之处，在javascript中replace函数的强大应用：
arg.replace(FN_ARG, function(all, underscore, name){ 
$inject.push(name); 
}); 



2.0    依赖注入

// 依赖注入是AngularJS最好的模式之一，它使得测试更为简单，并且依赖任何指定对象都很明确。AngularJS的注入方式非常灵活，最简单的方式只需要将依赖的名字传入模块的function中即可：

var app = angular.module('app',[]);
 
app.controller('MainCtrl', function($scope, $timeout){
    $timeout(function(){
        console.log($scope);
    }, 1000);
});
// 这里，很明显，MainCtrl依赖$scope和$timeout。

// 直到你准备将其部署到生产环境并希望精简代码时，一切都很美好。如果使用UglifyJS，之前的例子会变成下面这样：

var app=angular.module("app",[]);
app.controller("MainCtrl",function(e,t){t(function(){console.log(e)},1e3)})
// 现在AngularJS怎么知道MainCtrl依赖谁？AngularJS提供了一种非常简单的解决方法，即将依赖作为一个数组传入，数组的最后一个元素是一个函数，所有的依赖项作为它的参数。

app.controller('MainCtrl', ['$scope', '$timeout', function($scope, $timeout){
    $timeout(function(){
        console.log($scope);
    }, 1000);
}]);
// 这样做能够精简代码，并且AngularJS知道如何解释这些明确的依赖：

app.controller("MainCtrl",["$scope","$timeout",function(e,t){t(function(){console.log(e)},1e3)}])














































