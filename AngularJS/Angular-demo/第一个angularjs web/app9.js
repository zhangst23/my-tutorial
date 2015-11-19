
//1.0   使用$http查询MySQL数据
angular.module('app',[])
.config(function($httpProvider){

})
.controller('MyCtrl',function($scope,$http){
	$http('http://127.0.0.1:80/user/getUsers')
	.success(function(resp){
		console.log(resp);
	})
})



//2.0   $http实现对数据的增删改
angular.module('app',[])
.config(function($httpProvider){

})
.controller('MyCtrl',function($scope,$http){
	$scope.id="";
	$scope.name="";
	$scope.adduser=function(){
		$http.post('http://127.0.0.1:80/user/adduser',{id:$scope.id,name:$scope.name})
		.success(function(resp){
			if (resp.success) {
				alert("添加成功");
			}
		})
	}
	$scope.deluser=function(){
		$http.post('http://127.0.0.1:80/user/delUser',{id:$scope.id})
		.success(function(resp){
			if (resp.success) {
				alert('删除成功');
			};
		})
	}

	
})




























