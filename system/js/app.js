/**
 * Created by Administrator on 2018/5/25.
 */
angular.module('app', [
    "ui.router"
])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('yuming')
        $stateProvider
            .state('yuming', {
                url: '/yuming',
                templateUrl: './tpl/yuming.html'
            })
            .state('qiyejianzhan',{
                url:'/qiyejianzhan',
                templateUrl:'./tpl/qiyejianzhan.html'
            })
            .state('dnsjiexi',{
              url:'/dnsjiexi',
              templateUrl:'./tpl/dnsjiexi.html'
            })
            .state('yunxunizhuji',{
              url:'/yunxunizhuji',
              templateUrl:'./tpl/yunxunizhuji.html'
            })
}])
/*.controller("total", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {
      $scope.ck = function(ele){

      }
}])*/
.controller("yuming",["$scope","$http",function($scope,$http){
        $socpe.show = true;
        $scope.port='';
        $scope.domain='';
        $scope.btnSave=function () {
            alert();
            console.log($scope.domain);
            console.log($scope.port);
        }
}])
