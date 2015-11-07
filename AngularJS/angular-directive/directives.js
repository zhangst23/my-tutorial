angular.module('components',[])
	.directive('helloWorld',function(){
		return{
			restrict:'E',
			scope:{
				name:'bind'
			},
			templateUrl:'hello.html'
		}
	})

angular.module('helloApp',['components'])






