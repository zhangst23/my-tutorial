angular.module('app',[])
.controller('AddressCtrl',function($scope){
	$scope.list={
		{ id:1,address:"莲花小区14东2层" },
		{ id:2,address:"天安门" },
		{ id:3,address:"鸟巢" },
		{ id:4,address:"故宫"},
	}
})
