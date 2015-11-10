var userInfoModel = angular.module('UserInfoModel',[]);
userInfoModel.controller('UserInfoCtrl',['$scope',function($scope){
	$scope.userInfo{
		email:"123@qq.com",
		password:"222",
		autoLogin:true
	};
	$scope.getFormData=function(){
		console.log($scope.userInfo);
	}
	$scope.setFormData=function(){
		$scope.userInfo{
			email:"cccc3@qq.com",
			password:"22cccc2",
			autoLogin:false
		}

	}
	$scope.resetForm=function(){
		$scope.userInfo{
			email:"cccc3@qq.com",
			password:"22cccc2",
			autoLogin:false
		}
	}
}])