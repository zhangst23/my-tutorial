angularjs的注入方式.html
所以在这节将引用angularjs的注入代码来分析angularjs的注入方式。angularjs的注入方式分为3中方式:
1.推断式注入：在angularjs中我们可以在我们需要注入的地方按照名称注入，这里要求参数名称必须和注入服务实例名称相同，
			一种名称约定，angularjs会提取参数名称查找相应DI实例注入
2.标记注入：在angularjs中我们可以利用$inject标注DI注入，这里需要注入服务名称的顺序和构造参数对应，这里可以解决以上约定的死板性；
3.内联注入：对于directives，factory，filter等特殊指令使用$indect标注注入使用不是那么友好，angularjs特别增加了内联注入



<!-- code -->
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



<!--  -->

  关于angularjs注入就到这里，在最后想说下说这代码中我们能获取的两个javascript技巧：

对于javascript是运行时解释的弱类型语言，我们无法利用c#，java类似的反射机制去获取参数信息，我们只能靠正则从javascript代码中匹配（从function.toString()）.
正则的强大之处，在javascript中replace函数的强大应用：
arg.replace(FN_ARG, function(all, underscore, name){ 
$inject.push(name); 
}); 








