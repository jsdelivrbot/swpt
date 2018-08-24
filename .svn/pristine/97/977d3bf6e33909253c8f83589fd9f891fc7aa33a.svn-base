 var app=angular.module("myApp", []);
    app.controller('toRMBCtrl',function($scope,$http) {
        var payValue=undefined;
        $('.zhifb').change(function(){
                if($(this).prop("checked") == true) {
                    $(this).addClass('active');
                    payValue=2;
                }else{
                    $(this).removeClass('active');
                    payValue=0;
                }
        });
        $('.weixin').change(function(){
            if($(this).prop("checked") == true) {
                $(this).addClass('active');
                payValue=1;
            }else{
                $(this).removeClass('active');
                payValue=0;
            }
        });
        $scope.toPrice=function(){
            var integral = $scope.integral;
            var name =  $scope.name;
            var account = $scope.account;
            if(integral==undefined){
                alert("请输入提现的金额");
                return ;
            }else if(name==undefined){
                alert("请输入提现的姓名");
                return;
            }else if(account==undefined){
                alert("请输入提现的账号");
                return;
            }else if(integral<100){
                alert("提现的积分不能低于10000");
                return;
            }else if(payValue==undefined){
                alert("请选择提现方式");
                return;
            }  else{
                $http({
                    method:"POST",
                    url:luckilyListFacade_root_url + "/accountIntegralManagementFacade/subtractAccountIntegral",
                    data:JSON.stringify({'uid':20881,"integral":integral, "name":name,"account":account, "payValue":payValue}),
                    //headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    contentType:"application/json; charset=UTF-8",
                    dataType:"json",
                    async: true
                }).then(function(response) {
                    console.log(response.data);
                    if(response.data.status=='0'){
                        alert(response.data.statusMsg);
                    }else{
                        alert(response.data.statusMsg);
                    }
                }).catch(function(){
                    console.log("加载超时");
                })
            }
        };

    });

