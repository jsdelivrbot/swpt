var app=angular.module('gzsw',[
	"ngRoute",
	"swgetData"
])
.config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/index',{
		templateUrl:"./tpl/index.html",
        controller:"msgStr"
	}).otherwise({
			redirectTo:"/index"
	});
}]).controller('msgStr',["$scope","$http","getData",function($scope,$http,getData){

}]).run(['$http',function($http){
        //$http.post(accountQuery_root_url + "/accountQuery/getPhone",{});
}]);
