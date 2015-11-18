// Factory:  EmailFactory
angular.module('EmailApp')
  .factory('EmailFactory',function EmailFactory($q,$http,$routeParams){
  	'use strict';
  	var exports = {};

  	exports.reply = function(message){
  		if (message) {
  			alert('Reply content:' + message);
  		};
  	}

  	exports.getMessage = function(params){
  		if (params.id) {
  			var deferred = $q.deter();
  			$http.get('json/message/' + params.id + '.json')
  			  .success(function(data){
  			  	deferred.resolve(data);
  			  })
  			  .error(function(data){
  			  	deferred.reject(data);
  			  });
  			return deferred.promise;
  		};
  	};
  	return exports;
  })







