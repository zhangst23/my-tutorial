var app=angular.module('app',[]);

app.directive('hello',function(){
	return{
		restrict:'E',		//A属性   E.template   C 类名
		replace:true,    //替换掉我们自定义的directive的名称
		template:'<div>Hello Angulars</div>'
	}
})