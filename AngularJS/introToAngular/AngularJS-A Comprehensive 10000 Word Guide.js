
// 3.0 Modules
// 3.1 Setters
	angular.module('app',[]);
// 3.2 Getters
	angular.module('app');
// 3.3 Module Practices
	var app = angular.mosule('app',[]);

// 4.0 Understanding $scope
	$scope.someValue = 'Hello';
	//
	<div ng-controller="AppCtrl">
	  {{ someValue }}
	</div>
// 5.0  Controllers
angular
  .module('app',[])
  .controller('MainCtrl',function(){

  });


//
function MainCtrl(){

}

angular
  .module('app',[])
  .controller('MainCtrl',MainCtrl);

// 5.1 Methods and presentational logic
function MainCtrl($scope){
	$scope.items = [{
		name:'Scuba Diving Kit',
		id:7297510
	},
	{
		name:'2Scuba Diving Kit',
		id:7297510
	},
	{
		name:'3Scuba Diving Kit',
		id:7297510
	},
	{
		name:'4Scuba Diving Kit',
		id:7297510
	},
	{
		name:'5Scuba Diving Kit',
		id:7297510
	}];
}

angular
  .module('app')
  .controller('MainCtrl',MainCtrl);

//
<div ng-controller="MainCtrl">
	<ul>
		<li ng-repeat="item in items">
		  {{item.name}}
		</li>
	</ul>
</div>

// 5.2 New "controllerAs" syntax
function MainCtrl(){
	this.items = [{
    name: 'Scuba Diving Kit',
    id: 7297510
  },{
    name: 'Snorkel',
    id: 0278916
  },{
    name: 'Wet Suit',
    id: 2389017
  },{
    name: 'Beach Towel',
    id: 1000983
  }];
}

angular
  .module('app')
  .controller('MainCtrl', MainCtrl);

//
<div ng-controller="MainCtrl as main">
  <ul>
      <li ng-repeat="item in main.items">
          {{ item.name }}
      </li>
  </ul>
</div>

// 6.0 Services and Factories
// 6.1 Service method
function UserService(){
	this.sayHello = function(name){
		return 'Hello there' + name;
	};
}
angular
  .module('app')
  .service('UserService',UserService);

//we could then jnject the Service into a Controller to use it
function MainCtrl(UserService){
	this.sayHello = function(name){
		UserService.sayHello(name);
	};
}
angular
  .module('app')
  .controller('MainCtrl',MainCtrl);

// 6.2 Factory method
function UserService(){
	var UserService = {};
	function greeting(name){
		return 'Hello there' + name;
	}
	UserService.sayHello = function(name){
		return greeting(name);
	}
	return UserService;
}
angular
  .module('app')
  .factory('UserService',UserService);


//
function MainCtrl(UserService){
	this.sayHello = function(name){
		UserService.sayHello(name);
	};
}
angular
  .module('app')
  .controller('MainCtrl',MainCtrl);


// 7.0  Templating with the Angular core
// 7.2 Using Angular core Directives
<div>
	<div>{{{main.items.length}}items in stock}</div>
	<ul>
		<li ng-repeat="item in main.items" ng-click="main.removeFromStock(item,$index)">
		  {{item.name}}
		</li>
	</ul>
</div>
//
function MainCtrl(){
	this.removeFromStock = function(item,index){
		this.items.splice(index,1);
	};
	this.items = [...];
}
angular 
  .module('app')
  .controller('MainCtrl',MainCtrl);

//
function MainCtrl(){
	var vm = this;
	vm.removeFromStock = function(item,index){
		vm.items.splice(index,1);
	};
	vm.items = [...];
}
angular
  .module('app')
  .controller('MainCtrl',MainCtrl);


// 8.0 Directives (Core)
// 8.1 ng-repeat
// 8.2 ng-model
// 8.3 ng-click
<input type="text" ng-model="main.message">
<a href="" ng-click="main.showMessage(main.message);">Show my message</a>
// 8.4 ng-href/ng-src
<a ng-href="{{ main.someValue }}">Go</a>
<img ng-src="{{ main.anotherValue}}" alt="">
// 8.5 ng-class
<div className="notificition" ng-class="{
	warning:main.response == 'error',
	ok:main.response == 'success'
}">
  {{main.responseMsg}}
</div>

// 8.6  ng-show/ng-hide
<a href="" ng-click="showMenu = !showMenu">Toggle menu!</a>
<ul ng-show="showMenu">
	<li>1</li>
	<li>2</li>
	<li>3</li>
</ul>


// 8.7 ng-if
<div ng-if="main.userExists">
	Please log in
</div>

// 8.8  ng-switch
<div ng-switch on="main.user.access">
	<div ng-switch-when="admin"><!-- code for admins --></div>
	<div ng-switch-when="user"><!-- code for user --></div>
	<div ng-switch-when="author"><!-- code for author --></div>
</div>
// 8.9 ng-bind
<p>{{ main.name }}</p>
<p ng-bind="main.name"></p>

// 9.0 Directives (Custom)
// 9.1 Custom Elements
<my-element></my-element>
<div my-element></div>
<div className="my-element"></div>
// directive:my-element

// 9.2 Shadow DOM
<my-element>
  Hi there!
</my-element>

// 9.3.1 template property
{
  template: '<div>' + 
    '<ul>' +
      '<li ng-repeat="item in vm.items">' +
        '{{ item }}' +
      '</li>' +
    '</ul>' +
  '</div>'
}

//
{
  template: [
    '<div>',
      '<ul>',
        '<li ng-repeat="item in vm.items">',
          '{{ item }}',
        '</li>',
      '</ul>',
    '</div>'
  ].join('')
}
// 9.3.2 templateUrl property
{
  templateUrl: 'items.html'
}

//
<script type="text/ng-template" id="/hello.html">
  <div>
    <ul>
      <li ng-repeat="item in vm.items">
        {{ item }}
      </li>
    </ul>
  </div>
</script>

// 9.4 Directive API
function someDirective () {
  return {

  };
}

angular
  .module('app')
  .controller('someDirective', someDirective);

//
function someDirective(){
	return{
		restrict:'EA',
		replace:'true',
		scope:true,
		controllerAs:'something',
		controller:function(){

		},
		link:function($scope,$element,$attrs){

		},
		template:[
			'<div class="some-directive">',
			'My directive',
			'</div>'
		].join('')
	};
}
angular
  .module('app')
  .controller('someDirective',someDirective);

// 9.5 Directive creation
function composeEmail () {
  return {
    restrict: 'EA',
    replace: true,
    scope: true,
    controllerAs: 'compose',
    controller: function () {

    },
    link: function ($scope, $element, $attrs) {

    },
    template: [
      '<div class="compose-email">',
        '<input type="text" placeholder="To..." ng-model="compose.to">',
        '<input type="text" placeholder="Subject..." ng-model="compose.subject">',
        '<textarea placeholder="Message..." ng-model="compose.message"></textarea>',
      '</div>'
    ].join('')
  };
}

angular
  .module('app')
  .controller('composeEmail', composeEmail);


// 10.0 Filters (Core)
// HTML expression syntax.
{{ filter_expression | filter : expression : comparator }}
// JavaScript syntax.
$filter('filter')(array,expression,comparator);
// 10.1 Date filters
<p>
	Today‘s date:{{timeNow | date:'dd-MM-yyyy'}}
</p>
// 10.2 JSON filter
<pre>
	{{myObject | json}}
</pre>
// 10.3 limitTo and orderBy
<ul>
	<li ng-repeat="user in users | limitTo:10">
	  {{user.name}}
	</li>
</ul>

// 11 Filters (Custom)
function myFilter(){
	return function(){
		//return filtered output
	};
}
angular
  .module('app')
  .filter('myFilter',myFilter);

//
function toLowercase(){
	return function(item){
		return item.toLowercase();
	};
}
angular
  .module('app')
  .filter('toLowercase',toLowercase);

//
<p>{{user.name | toLowercase}}</p>


// 11.2 Data set Filters
// Let's create a Filter that looks for users whose name starts with 'a'.
function namesStartingWithA(){
	return function(items){
		return items.filter(function(item){
			return /$a/i.test(item.name);
		});
	};
}
angular
  .module('app')
  .filter('namesStartingWithA',namesStartingWithA);

// Usage would be inside an ng-repeat.
<ul>
  <li ng-repeat="item in items | namesStartingWithA">
    {{ item }}
  </li>
</ul>

//
<ul>
  <li ng-repeat="item in items | namesStartingWithA:something">
    {{ item }}
  </li>
</ul>
// The something, be it a Model value or variable, can be passed in and accessed in the Filter closure.
function namesStartingWithA () {
  return function (items, something) {
    // access to "items" and "something"
  };
}
angular
  .module('app')
  .filter('namesStartingWithA', namesStartingWithA);


// 11.3 Controller ($scope) Filters
function SomeCtrl () {
  this.namesStartingWithA = function () {

  };
}
angular
  .module('app')
  .controller('SomeCtrl', SomeCtrl);

//
<ul>
  <li ng-repeat="item in vm.items | filter:namesStartingWithA">
    {{ item }}
  </li>
</ul>

// 12 Dynamic routing with $routeProvider
angular
  .module('app', [
    'ngRoute'
  ]);

//
function router ($routeProvider) {
  $routeProvider
  .when('/inbox', {})
  .otherwise({
    redirectTo: '/inbox'
  });
}

angular
  .module('app')
  .config(router);


//
$routeProvider
.when('/inbox',{
	templateUrl:'views/inbox.html'
})
.otherwise({
	redirectTo:'.inbox'
});

//
$routeProvider
.when('/inbox', {
  templateUrl: 'views/inbox.html',
  controller: 'InboxCtrl',
  controllerAs: 'inbox'
})
.otherwise({
  redirectTo: '/inbox'
});


//
 $routeProvider
  .when('/inbox', {
    templateUrl: 'views/inbox.html',
    controller: 'InboxCtrl',
    controllerAs: 'inbox'
  })
   .when('/inbox/email/:id', {
    templateUrl: 'views/email.html',
    controller: 'EmailCtrl',
    controllerAs: 'email'
  })
  .otherwise({
    redirectTo: '/inbox'
  });
});

angular
  .module('app')
  .config(router);



// 12.1 $routeParams
function EmailCtrl ($routeParams, EmailService) {
  // $routeParams { id: 20999851 }
  EmailService
  .get($routeParams.id) // pass the Object in
  .success(function (response) {})
  .error(function (reason) {});
}
angular
  .module('app')
  .('EmailCtrl', EmailCtrl);


// 13 Form Validation
<form name="myForm"></form>

// 14 Server communication with $http and $resource
// 14.1 $http
$http.get('/url')
.success(function(data,status,headers,config){

})
.error(function(data,status,headers,config){

})

//
$http.get('/url')
.success(function(response){

})
.error(function(reason){

});

//
$http.get('/url')
.then(function(response){
	//success
}),function(reason){
	//error
};


// 14.2 $resource
function MovieService($resource){
	return $resource('/api/movie/:id',{id:'@_id'},
	{
		update:{
			method:'PUT'
		}
	});
}
angular
  .module('app')
  .factory('MovieService',MovieService);

// We could dependency inject this simple Factory called Movies into our Controllers to obtain the data we need.
function MovieCtrl(MovieService){
	var movies = new MovieService();
	//have something update a movie
	movies.update(/* some data */);
}
angular
  .module('app')
  .controller('MovieCtrl',MovieCtrl);























