// InboxDrctv.js
angular.module('EmailApp')
  .directive('inbox',function InboxDrctv(){
  	'use strict';

  	return {
  		restrict:'EA',
  		replace:true,
  		scope:true,
  		templateUrl:"js/directive/inbox.tmpl.html",
  		controllerAs:'inbox',

  		controller:function(InboxFactory){
  			this.messages = [];

  			this.goToMessage = function(id){
  				InboxFactory.goToMessage(id);
  			};
  			this.deleteMessage = function(id,index){
  				InboxFactory.deleteMessage(id,index);
  			};
  			InboxFactory.getMessages()
  			  .then(angular.bind(this,function then(){
  			  	this.messages = InboxFactory.messages;
  			  }));
  		},
  		link:function(scope,element,attrs,ctrl){
  			
  		}
  	}
  })