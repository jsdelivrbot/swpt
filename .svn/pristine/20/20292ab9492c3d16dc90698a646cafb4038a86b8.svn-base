/**
 * Created by Administrator on 2018/5/25.
 */
angular.module('app',['ui.router'])
.controller('total',["$scope","rootScope","$http",function($scope,$rootScope,$http){
    var user = JSON .parse(localStorage.getItem('user'))
    $scope.click=function(id){

    }
    $http.get(getRoleTreeByUser+user.id).then(function(res){
        if(res.data.status === '1'){

        }
    }).then(function(err){

    })

}])