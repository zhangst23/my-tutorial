// AngularJS组织代码知识点.js

1.0    #########################


Organization

// This is the typical folder layout that I recommend:

root-app-folder
├── index.html
├── scripts
│   ├── controllers
│   │   └── main.js
│   │   └── ...
│   ├── directives
│   │   └── myDirective.js
│   │   └── ...
│   ├── filters
│   │   └── myFilter.js
│   │   └── ...
│   ├── services
│   │   └── myService.js
│   │   └── ...
│   ├── vendor
│   │   ├── angular.js
│   │   ├── angular.min.js
│   │   ├── es5-shim.min.js
│   │   └── json3.min.js
│   └── app.js
├── styles
│   └── ...
└── views
    ├── main.html
    └── ...







angular.module('yourAppDep').controller('MyCtrl',function(){
	//...
})


angular.module('yourAppDep').directive('btlaControlPanel',function(){
	//...
})

angular.module('yourAppDep').service('MyCtrl',function(){
	//...
})


// Filters
{{someModel.name | titlecase}}
//
angular.module('myApp').controller('MyCtrl',function($scope,$http,$filter){
	$http.get('/someModel')
	  .success(function(data){
	  	$scope.someModel = data;
	  	//run the same "titlecase" fliter inside the controller after loading the data
	  	$scope.someModel.name = $filter('titlecase')($scope.someModel.name);
	  });
});


2.0    #########################

//

cart/
	CartModel.js
	CartService.js
common/
	directives.js
	filters.js
product/
	search/
		SearchResultsController.js
		SearchResultsModel.js
	ProductDetailController.js
	ProductModel.js
	ProductService.js
user/
	LoginController.js
	RegistrationController.js
	UserModel.js
	UserService.js


//


Example

// Let’s view an example of an app with this configuration.
// First, the main HTML will look something like this:

<html>
  <head>
    <!-- Include here Styles and AngularJS scripts-->
  </head>
  <body>
    <div class="container" ng-app="example" ng-controller="MainCtrl" ng-cloak>
      <header>
      <div>This is the common headers for all of the tabs of this little app</div>
      </header>
      <!-- This is the div that will change when the URL changes via the -->
      <div ng-view>
      </div>
      <footer><div id="white-logo">My Company Logo</div><span id="copyright">© 2013 My Company</span></footer>
    </div>

  </body>
</html>


// Now, let’s see the app.js the app definition:
'use strict';

var module = angular.module('example',['restangular','ngResource'])
  .config(['$routeProvider','$locationProvider',
  	function($routeProvider,$locationProvider){
  		$routeProvider
  		.when('/test/firstTab',{
  			templateUrl:'js/test/angular/views/firstTab.html',
  			controller:'FirstTabCtrl'
  		})
  		.when('/test/secondTab',{
  			templateUrl:'js/test/angular/views/secondTab.html',
  			controller:'SecondTabCtrl'
  		})
  		.otherwise({
  			redirectTo:'/test/firstTab'
  		});
  		$locationProvider.html5Mode(true);
  	}]);



3.0    #########################






// Now, let’s see an example of a directive, in the firstTab.html we have the following:
<div>
	<h1>First Tab</h1>
	<input type="text" ng-model="query.searchText/">
	<pie data="data.valuesData | forPie" type="valuesPie"></pie>
</div>

// Let’s see the code of the directive.
module.directive('pie',function(){
	return{
		replace:true,
		restrict:'EA',
		scope:{type:'0',data="="},
		templateUrl:"/js/test/angular/partials/pie.html",
		controller:['$scope','$routeParams','$element','$filter',function($scope,$routeParams,$element,$filter){

			$scope.$watch('data',function(){
				if (_.isUndefined($scope.data) || +.isNull($scope.data) || $filter('isZeroData')($scope.data)){
					element.hide();
				}else{
					$element.show();
					$element.plot($scope.data);
				};
			})
		}]
	}
})



//



<div>
  <div header></div>

  <div class="main-content">
    <p>
      Here it’s this page specific content :)
    </p>
  </div>

  <div footer></div>
</div>
//
<div>
  <div header user="player"></div>

  <div class="main-content">
    <p>
      Here it‘s this page specific content :)
    </p>
  </div>

  <div footer></div>
</div>
//
<div>
  <div header user="userModel"></div>

  <div class="main-content">
    <p>
      Here it‘s this page specific content :)
    </p>
  </div>

</div>
// And we finished. We’ve an app up and running with a header, a footer and specific content for each page. Now, every time we add a page, all we need to do is just create the controller, create the template and add the header and footer if needed and that’s it.



4.0    #########################




// Defining the Modules

// Let’s have a look at the app.js file where we setup our modules and define dependencies.
// Define all your modules with no dependencies
angular.module('BirthdayApp', []);
angular.module('CollectionApp', []);
angular.module('DashboardApp', []);
angular.module('LoginApp', []);
angular.module('MessageApp', []);
angular.module('PatientApp', []);
angular.module('PhoneApp', []);
angular.module('ReportsApp', []);

// Lastly, define your "main" module and inject all other modules as dependencies
angular.module('MainApp',
  [
    'BirthdayApp',
    'CollectionApp',
    'DashboardApp',
    'LoginApp',
    'MessageApp',
    'PatientApp',
    'PhoneApp',
    'ReportsApp',
    'templates-main',
  ]
);




/* 
* Adding more related features for searching 
* and editing.
*/

app/
    app.module.js
    app.config.js
    app.routes.js
    directives.js
    layout/
        shell.html      
        shell.controller.js
        topnav.html      
        topnav.controller.js       
    people/
        attendees.html
        attendees.controller.js  
        speakers.html
        speakers.controller.js
        speaker-detail.html
        speaker-detail.controller.js
    sessions/
        sessions.html      
        sessions.controller.js
        session-detail.html
        session-detail.controller.js  
    services/       
        data.service.js  
        localstorage.service.js
        logger.service.js   
        spinner.service.js


































