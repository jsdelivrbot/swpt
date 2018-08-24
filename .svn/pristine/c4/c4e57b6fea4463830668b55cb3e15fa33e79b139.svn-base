angular.module('app', [
    "ngRoute"
]).config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/yuming',{
        templateUrl:"./tpl/yuming.html",
        controller:"yuming"
    }).otherwise({
        redirectTo:"/yuming"
    });
}])
.controller('yuming',["$scope","$http",function($scope,$http){
    //var loginpwd=window.prompt("输入[本平台配置]使用密码：");
    //if(loginpwd!="5656")history.back();
    $scope.domain='';
    $scope.port="";
    $scope.lists=[];
    $scope.cureditid=null;
    /*$.ajax({
        type:"GET",
        url:YUMING_URL,
        headers:{"Access-Control-Allow-Origin":"*"},
        success:function(data){
            console.log();
        },
        error:function(){
        }
    })*/
    $scope.btnSave=function () {
        if($scope.domain==''){
            alert('域名不能为空');
            return false;
        }
        var data={"domain":$scope.domain,"port":$scope.port};
        if($scope.cureditid==null){
            $scope.lists.push(data);
            var purl=YUMING_URL+"?act=1&domain="+$scope.domain;
            $.ajax({
                type:"GET",
                url:purl,
                headers:{"Access-Control-Allow-Origin":"*"},
                success:function(data){
                    console.log();
                },
                error:function(){
                }
            })
        }else{
            $scope.lists[$scope.cureditid]=data;
        }
        $scope.domain='';
        $scope.port="";
        $scope.cureditid=null;
        $('#myModal').modal('hide');
    }
    $scope.delDomain=function (index) {
        $scope.lists.splice(index,1);
    }
    $scope.editDomain=function (index) {
        var tmp=$scope.lists[index];
        $scope.cureditid=index;
        $scope.domain=tmp.domain;
        $scope.port=tmp.port;
        $('#myModal').modal('show');
    }
}]);
