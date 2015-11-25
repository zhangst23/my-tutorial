angular-styleguide.js
来源：https://github.com/johnpapa/angular-styleguide

1.0    controllerAS  
1.1   controllerAs View Syntax
// Use the controllerAs syntax over the classic controller with $scope syntax.
 // It promotes the use of binding to a "dotted" object in the View (e.g. customer.name instead of name), which is more contextual, easier to read, and avoids any reference issues that may occur without "dotting".
// avoid
<div ng-controller="CustomerController">
  {{name}}
</div>
//recommended
<div ng-controller="CustomerController as customer">
  {{customer.name}}
</div>

1.2    controllerAs Controller Syntax
// The controllerAs syntax uses this inside controllers which gets bound to $scope
// Why?: controllerAs is syntactic sugar over $scope. You can still bind to the View and still access $scope methods.
// Why?: Helps avoid the temptation of using $scope methods inside a controller when it may otherwise be better to avoid them or move the method to a factory, and reference them from the controller. Consider using $scope in a controller only when needed. For example when publishing and subscribing events using $emit, $broadcast, or $on.

//avoid
function CustomerController($scope){
	$scope.name = {};
	$scope.sendMessage = function(){};
}
//recommended - but see next section
function CustomerController(){
	this.name = {};
	this.sendMessage = function(){};
}


1.3    controllerAs with vm
// Why?: The this keyword is contextual and when used within a function inside a controller may change its context. Capturing the context of this avoids encountering this problem.

//avoid
function CustomerController(){
	this.name = {};
	this.sendMessage = function(){}
}
//recommended
function CustomerController(){
	var vm = this;
	vm.name = {};
	vm.sendMessage = function(){};
}


1.4
// avoid
function SessionsController(){
	var vm = this;
	vm.gotoSession = function(){
		//...
	}
	vm.refresh = function(){

	};
	vm.search = function(){

	};
	vm.sessions = [];
	vm.title = 'Sessions';
}

//recommended
function SessionsController(){
	var vm = this;

	vm.gotoSession = gotoSession;
	vm.refresh = refresh;
	vm.search = search;
	vm.sessions = [];
	vm.title = 'Sessions';

	//

	function gotoSession(){
		//
	}
	function refresh(){
		//
	}
	function search(){
		//
	}
}


2.0    Services

2.1  Singletons
//service
angular
	.module('app')
	.service('logger',logger);
function logger(){
	this.logError = function(msg){
		//...
	};
}


// factory
angular
	.module('app')
	.factory('logger',logger);
function logger(){
	return {
		logError:function(msg){
			//...
		}
	}
}



2.2   Factories
2.2.1   Accessible Members Up Top

//avoid
function dataService(){
	var someValue = '';
	function save(){
		//
	};
	function validate(){
		//
	};
	return {
		save:save,
		someValue:someValue,
		validate:validate
	};
}

//recommended
function dataService(){
	var someValue = '';
	var service = {
		save:save,
		someValue:someValue,
		validate:validate
	};
	return service;
	////
	function save(){
		//...
	};
	function validate(){
		//...
	};

}














