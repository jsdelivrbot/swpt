var app=angular.module('gzsw',[
	"ngRoute",
	"swgetData"
])
.directive('ngFocus',[function(){
    var focusClass = 'ng-focused';
    return{
        restrict:'AE',
        require:'ngModel',
        link:function(scope,element,attrs,ctrl){
            ctrl.$focused = false;
            element.bind('focus',function(e){
                element.addClass(focusClass);
                scope.$apply(function(){
                    ctrl.$focused = true;
                });
                element.bind('blur',function(e){
                    element.removeClass(focusClass);
                    scope.$apply(function(){
                        ctrl.$focused = false;
                    });
                });
            })
        }
    };
}])
.config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/index',{
		templateUrl:"./tpl/index.html",
        controller:"loginStr"
	}).otherwise({
			redirectTo:"/index"
	});
}]).controller('loginStr',["$scope","$http",'$interval',"getData",function($scope,$http,$interval,getData){
	$scope.deng_lu_flag='deng_lu';
	$scope.main_flag="login";
	var mobileYzm =/^1(3|4|5|7|8)\d{9}$/i;
    var pwdYzm = /^[a-zA-Z0-9]{9,24}/;
    var codeYzm=/^\d{6}/;
    $scope.code = "";
    $scope.ispwd=false;
    $scope.isrepwd=false;
	$scope.login_code_msg_css='';
	$scope.userinfo=null;
    $scope.show_company=false;
	$scope.pass={
	    'ipone':false,
        'pwd':false,
        'repwd':false,
        'code':false
    };
	//$scope.login_code_msg_css='login_code_msg_css';
	$scope.login_code_msg='点击获取验证码';
    var userinfo=window.localStorage['user']?JSON.parse(window.localStorage['user']):null;
    if(userinfo!=null){
        window.parent.location.href='/';
    }

	$scope.setMoRenZhi=function(){
        $scope.user={
            'ipone':'',
            'pwd':'',
            'repwd':'',
            'code':''
        }
        $scope.pass={
            'ipone':false,
            'pwd':false,
            'repwd':false,
            'code':false
        };
        $scope.login_check=false;
        $scope.login_code_msg_css='';
        $scope.login_code_msg='点击获取验证码';
        $scope.err_ipone='';
        $scope.err_pwd='';
        $scope.err_repwd='';
        $scope.err_code='';
        $scope.ispwd=false;
        $scope.isrepwd=false;
	}
        $scope.setMoRenZhi();
        var autologin=window.localStorage['userisauto']?JSON.parse(window.localStorage['userisauto']):null;
        if(autologin!=null){
            $scope.user.ipone=autologin.username;
            $scope.user.pwd=autologin.userpwd;
        }
        $scope.loginblur_msg='';
        $scope.loginblur_pwdmsg='';
        $scope.loginFocus=function(){
            console.log('登录获得焦点')
        }
        $scope.loginBlur=function(){
            if($scope.user.ipone==''){
                $scope.pass.ipone=false;
                $scope.err_ipone='*手机号输入有误，请重新输入';
            }else if(!mobileYzm.test($scope.user.ipone)){
                $scope.pass.ipone=false;
                $scope.err_ipone='*手机号输入有误，请重新输入';
            }else{
                $scope.err_ipone='';
                getData.getUrlData2(root_url+'/htUserService/checkUserRegister?username='+$scope.user.ipone,"iphoe").then(function (d) {
                   var tmp=d.data;
                   if(tmp.msg===false){
                       $scope.err_ipone='';
                       $scope.pass.ipone=true;
                   }else{
                       $scope.pass.ipone=false;
                       $scope.err_ipone="该手机号尚未注册，请点击注册，完成登录";
                   }
                })
            }
        }
        $scope.iponeFocus=function(){
            $scope.err_ipone="";
        }
        $scope.loginPwdBlur=function(){
            $scope.ispwd=false;
            if($scope.user.pwd==''){
                $scope.pass.pwd=false;
                $scope.err_pwd='*密码格式不正确';
            }else if(!pwdYzm.test($scope.user.pwd)){
                $scope.pass.pwd=false;
                $scope.err_pwd='*密码格式不对';
            }else if($scope.user.pwd.length<9||$scope.user.pwd.length>24){
                $scope.pass.pwd=false;
                $scope.err_pwd='*密码长度格式不对';
            }else{
                $scope.pass.pwd=true;
                $scope.err_pwd='';
            }
        }
        $scope.loginPwd2Blur=function() {
               $scope.pass.pwd = true;
               $scope.err_pwd = '';
        }

        $scope.cloginBlur=function(){
            if($scope.user.ipone==''){
                $scope.pass.ipone=false;
                $scope.err_ipone='*手机号输入有误，请重新输入';
            }else if(!mobileYzm.test($scope.user.ipone)){
                $scope.pass.ipone=false;
                $scope.err_ipone='*手机号输入有误，请重新输入';
            }else{
                $scope.pass.ipone=true;
                $scope.err_ipone='';
            }
        }
        $scope.codeBlur=function(){
            if($scope.user.code==''){
                $scope.pass.code=false;
                $scope.err_code='*手机验证码不能为空';
            }else if(!codeYzm.test($scope.user.code)){
                $scope.pass.code=false;
                $scope.err_code='*验证码输入有误';
            }else if($scope.user.code.length>6){
                $scope.pass.code=false;
                $scope.err_code='*验证码输入有误';
            }else if($scope.user.code!=$scope.code){
                console.log($scope.user.code,$scope.code)
                $scope.pass.code=false;
                $scope.err_code='*验证码输入有误';
            }else{
                $scope.pass.code=true;
                $scope.err_code='';
            }
        }
        $scope.codeFocus=function(){
            $scope.err_code='';
        }
        //**********************注册
        $scope.rePwdFocus=function () {
            $scope.isrepwd=true;
        }
        $scope.pwdFocus=function () {
            $scope.ispwd=true;
        }
        $scope.pwd2Focus=function () {
            $scope.err_pwd='';
        }
        $scope.loginrePwdBlur=function(){
            $scope.isrepwd=false;
            if($scope.user.repwd==''){
               // $scope.pass.repwd=false;
               // $scope.err_repwd='*密码格式不正确';
            }else if($scope.user.repwd!=$scope.user.pwd){
                $scope.pass.repwd=false;
                $scope.err_repwd='*两次密码输入不一致';
            }else{
                $scope.pass.repwd=true;
                $scope.err_repwd='';
            }
        }
        $scope.rIphoeBlur=function(){
            if($scope.user.ipone==''){
                $scope.pass.ipone=false;
                $scope.err_ipone='*手机号输入有误，请重新输入';
            }else if(!mobileYzm.test($scope.user.ipone)){
                $scope.pass.ipone=false;
                $scope.err_ipone='*手机号输入有误，请重新输入';
            }else{
                $scope.err_ipone='';                
                getData.getUrlData2(root_url+'/htUserService/checkUserRegister?username='+$scope.user.ipone,"iphoe").then(function (d) {
                    var tmp=d.data;
                    if(tmp.msg===false){
                        $scope.pass.ipone=false;
                        $scope.err_ipone='该手机号已被注册，请直接登录';
                    }else{
                        $scope.pass.ipone=true;
                        $scope.err_ipone="";
                        //$scope.err_ipone="该手机号尚未注册";
                    }
                })
            }
        }

	$scope.setDengLu=function(flag){
        $scope.setMoRenZhi();
        $scope.deng_lu_flag=flag;

	}
	//提交登录
	$scope.tjDengLu=function(){
	    //console.log($scope.pass.ipone)
        //console.log($scope.pass.pwd)
        if($scope.user.ipone==""||$scope.user.pwd==""){
           $scope.err_pwd='*账号或密码输入错误';
            return;
        }
        /*if(!$scope.pass.ipone||!$scope.pass.pwd){
            return false;
        }*/
        $.ajax({
            type:"post",
            url:root_url+"/htUserService/login",
            contentType:"application/json",
            headers:{"Access-Control-Allow-Origin":"*"},
            data:JSON.stringify({
                "username":$scope.user.ipone,//用户名
                "password":$scope.user.pwd //密码
            }),
            success:function(data){
                if(data.status==0){
                    var user = data.msg;
                    if (user.username === '18520119450') {
                        user.nikename = '陈老师';
                    } else if (user.username === '18520119451') {
                        user.nikename = '鲁炫辰';
                    } else if (user.username === '18520119452') {
                        user.nikename = '官校长';
                    }
                    user = JSON.stringify(user);
                    localStorage.setItem("user",user);
                    console.log(window.browser.versions.mobile)
                    console.log(data.msg.jsessionid)
                    if ( window.browser.versions.mobile ) {
                        // window.loginMessage.getLoginMsg( data.msg.jsessionid )
                        window.history.go(-1)
                    }
                    if($scope.login_check){
                        var userisauto=JSON.stringify({"username":$scope.user.ipone,"userpwd":$scope.user.pwd});
                        localStorage.setItem("userisauto",userisauto);
                    }else{
                        localStorage.removeItem("userisauto");
                    }
                    window.location.href="../home";                    
                }
                if(data.status==2){                   
                    $scope.pass.ipone=false;
                    $scope.err_ipone='*用户名不存在';
                    $scope.$apply()
                }
                if(data.status==1){
                    $scope.pass.pwd=false;
                    $scope.err_pwd='*账号或密码输入错误';
                    $scope.$apply()                    
                }
            },
            error:function(){                
                $scope.err_pwd='*登录服务器出错';
                $scope.$apply()                
            }
        })
	}
        $scope.tjDengLu2=function(){            
            alert('后续添加...')
        }
	$scope.setMainFlag=function(flag){

        $scope.setMoRenZhi();
		$scope.main_flag=flag;
	}
    $scope.createCode=function() {
        $scope.code = "";
        var codeLength = 6; //验证码的长度  
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9); //随机数  
        for (var i = 0; i < codeLength; i++) { //循环操作  
            var index = Math.floor(Math.random() * 10); //取得随机数的索引（0~35）  
            $scope.code += random[index]; //根据索引取得随机数加到code上  
        }        
    }
	$scope.getLogInCode=function(){
        $scope.login_code_msg=5;
        $scope.login_code_msg_css='login_code_msg_css';        
        $scope.createCode();
        $scope.login_code_msg=$scope.code;
        //$scope.$apply();
        /*var toDoTime = function () {
            $scope.login_code_msg--;
            if($scope.login_code_msg<1){
                $scope.login_code_msg_css='';
                $scope.login_code_msg='点击获取验证码';
			}
        };
        $interval(toDoTime,1000,5);*/

    }

	//提交注册
        $scope.tjZhuCe=function(){
            if($scope.user.ipone==""||$scope.user.pwd==""){
                alert("请输入帐号或密码")
                return;
            }
            if($scope.user.pwd!=$scope.user.repwd){
                alert("二次输入密码不相同")
                return;
            }
            if($scope.user.code==""){
                alert("验证码不能为空")
                return;
            }
            if($scope.user.code!=$scope.code){
                alert("验证码不正确")
                return;
            }
            if(!$scope.pass.ipone||!$scope.pass.pwd||!$scope.pass.code){
                return false;
            }

            $.ajax({
                type:"post",
                url:root_url+"/htUserService/getAddUser",
                contentType:"application/json",
                headers:{"Access-Control-Allow-Origin":"*"},
                data:JSON.stringify({
                    "username":$scope.user.ipone,//用户名
                    "password":$scope.user.pwd, //密码
                    "identifyingCode":$scope.user.code, //验证码
                }),
                success:function(data){                    
                    if(data.status==0){
                        $scope.show_company=true;
                        $scope.$apply();
                        var user = JSON.stringify({"id":data.msg.id,"username":$scope.user.ipone,"companyExit":false});
                        localStorage.setItem("user",user);
                    }else{
                        alert(data.statusMsg)
                    }
                },
                error:function(){
                    alert('登录服务器出错')
                }
            })
        }
        //找回密码
        $scope.tjZhaoHuiMiMa=function(){
            if($scope.user.ipone==""||$scope.user.pwd==""){
                alert("请输入帐号或密码")
                return;
            }
            if($scope.user.pwd==""||$scope.user.repwd==""){
                alert("二次输入密码不一样")
                return;
            }
            if(!$scope.pass.ipone||!$scope.pass.pwd||!$scope.pass.code){
                return false;
            }

            $.ajax({
                type:"post",
                url:root_url+"/htUserService/forgetPassword",
                contentType:"application/json",
                headers:{"Access-Control-Allow-Origin":"*"},
                data:JSON.stringify({
                    "username":$scope.user.ipone,//用户名
                    "password":$scope.user.pwd, //密码
                    "identifyingCode":$scope.user.code, //验证码
                }),
                success:function(data){                    
                    if(data.status==0){
                        alert('修改成功')
                        $scope.setMainFlag('login');
                        $scope.$apply();
                    }else{
                        alert(data.msg)
                    }
                },
                error:function(){
                    alert('登录服务器出错')
                }
            });
        };

        //跳转
        $scope.goCompanySw=function(b){
            $scope.show_company=false;
            if(b){
                window.location.href="../workbench/workbench.html?goCompany";
            }else{
                window.location.href="../home";
            }
        };
        //回车键登录
        $scope.enterEvent = function(e) {
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.tjDengLu();
            }
        };

        // 判断，如果是首页 注册 按钮跳转，则直接展开注册页面
        console.log(window.location.search.split('?')[1])
        if(window.location.search.split('?')[1] === 'register') {
            $scope.setMainFlag('reg');
        }

       
}]).run(['$http',function($http){
        //$http.post(accountQuery_root_url + "/accountQuery/getPhone",{});$
}]);