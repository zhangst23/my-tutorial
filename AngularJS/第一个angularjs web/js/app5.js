angular.module("app",[])
.value('realname','zhaoliu')
.value('realname','wangwu')  // 是可以改变值的
.constant('http',"www.baidu.com")
.constant('http',"www.google.com")
.factory('Data',function(){
	return{
		msg:'你好啊',
		setMsg:function(){
			this.msg="我不好";
		}
	}
})

.service('User',function(){
	this.firstname="上官";
	this.lastname="飞燕";
	this.getName=function(){
		return this.firstname+this.lastname;
	}
})
.controller("MyCtrl",function($scope,realname,http,Data,User){
	$scope.msg="你好";
	$scope.realname=realname;
	$scope.http=http;
	$scope.data=Data;
	Data.setMsg();
	$scope.uname=User.getName();

})
























