/**
 * Created by Administrator on 2018/3/27.
 */
var app = angular.module('app',[
    'ui.router',
    'swgetData'
])
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('detailPages')
    $stateProvider
        .state('detailPages',{
            url:'/detailPages',
            templateUrl:'./public/tpls/detailPages.html'
        })
}])
app.controller('masterControl',["$scope","$http","getData",function($scope,$http,getData){
    $scope.vip_moudle = []
    getData.getUrlData2('/data/vip_module.js','vip_module').then(function(res){
        $scope.vip_moudle = res.data
        console.log(12,$scope.vip_moudle)
    })
}])

app.controller('',["$scope","$http",function($scope,$http){

}])
app.controller("",["$scope","$http",function($scope,$http){

}])