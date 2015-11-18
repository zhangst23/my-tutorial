angular.module('EmailApp',[
	'ngRoute',
	'ngSanitize'
	]).config(function($routeProvider){
		'use strict';

		$routeProvider
		  .when('/inbox',{
		  	templateUrl:'views/inbox.html',
		  	controller:'InboxCtrl',
		  	controllerAs:'inbox'
		  })
		  .when('/inbox/email/:id',{
		  	templateUrl:'views/email.html',
		  	controller:'EmailCtrl',
		  	controllerAs:'email'
		  })
		  .otherwise({
		  	redirectTo:'/index'
		  });

	}).run(function($routeScope){
		$routeScope.$on('$routeChangeError',function(event,current,previous,rejection){
			console.log(event,current,previous,rejection)
		})
	});










