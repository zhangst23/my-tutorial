
angular.module('app',[])

.config(function($httpProvider){

})
.controller('MyCtrl',function($scope,$http){
	$scope.id="";
	$scope.name="";
	$scope.roles=[];
	$scope.rights=[];
	$scope.curselect="";

	$scope.$watch('curselect',function(){
		loadRoleRight();
	})

	function loadRoleRight(){
		$http.get('http://127.0.0.1:80/user/getRolesRight',{roleid})
		.success(function(resp){
			var rights=resp;
			for (var i = 0; i < $scope.rights.length; i++) {
				for (var j = 0; j < $scope.length; j++) {
					if ($scope.rights[i].id==rights[j].rightid) {
						$scope.rights[i].ischecked=false;
					};
				};
			};
			$scope.roles=resp;
		})
	}


	function init(){
		$http.get('http://127.0.0.1:80/user/getRoles')
		.success(function(resp){
			$scope.roles=resp;
		})
		$http.get('http://127.0.0.1:80/user/getRights')
		.success(function(resp){
			$scope.right=resp;
		})
	}

	
})


























