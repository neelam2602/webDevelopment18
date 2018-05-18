angular
.module("crud",[])
.controller("crudController",function($scope){
	$scope.fname =""
	$scope.lname = ""
	$scope.results = []
	$scope.add_data=function(){
		// alert(1)
		obj = {x1:$scope.fname,x2:$scope.lname}
		// console.log(obj)
		$scope.results.push(obj)
		// console.log($scope.results)
		$scope.fname=""
		$scope.lname=""
	}
})