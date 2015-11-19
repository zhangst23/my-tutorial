/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */






angular.module('todomvc',['ngRoute','ngResouce'])
	.config(function($routeProvider){
		'use strict';

		var routeConfig = {
			controller:'TodoCtrl',
			templateUrl:'todomvc-index.html',
			resolve:{
				store:function(todoStorage){
					return todoStorage.then(function(module){
						module.get();
						return module;
					});
				}
			}
		};
		$routeProvider
			.when('/',routeConfig)
			.when('/:status',routeConfig)
			.otherwise({
				redirectTo:'/'
			});
	});

















