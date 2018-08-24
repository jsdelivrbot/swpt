/**
 * Created by Administrator on 2018/1/30.
 */
var app = angular.module("Personal",['ui.router'])
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('main')
    $stateProvider
        .state('main',{
            url:'/main',
            templateUrl:'./pubic/tpls/main.html'
        })
        .state('nickname',{
          url:'/nickname',
          templateUrl:'./pubic/tpls/nickname.html'
        })
        .state('phone',{
            url:'/phone',
            templateUrl:'./pubic/tpls/phone.html'
        })
        .state('address',{
            url:'/address',
            templateUrl:'./pubic/tpls/address.html'
        })
        .state('user',{
          url:'/user',
          templateUrl:'./pubic/tpls/user.html'
        })
}])
app.controller("myController",["$scope","$http",function ($scope,$http) {
    $scope.router = 1;
    $scope.class = '';
    // var url = parent.document.getElementById("maincontent").contentWindow.location.href
    $scope.checkDevice = function(){
        var browser = {
            versions: function () {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return { //移动终端浏览器版本信息
                    trident: u.indexOf( 'Trident' ) > -1, //IE内核
                    presto: u.indexOf( 'Presto' ) > -1, //opera内核
                    webKit: u.indexOf( 'AppleWebKit' ) > -1, //苹果、谷歌内核
                    gecko: u.indexOf( 'Gecko' ) > -1 && u.indexOf( 'KHTML' ) == -1, //火狐内核
                    mobile: !!u.match( /AppleWebKit.*Mobile/i ) || !!u.match( /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/ ), //是否为移动终端
                    ios: !!u.match( /\(i[^;]+;( U;)? CPU.+Mac OS X/ ), //ios终端
                    android: u.indexOf( 'Android' ) > -1 || u.indexOf( 'Linux' ) > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf( 'iPhone' ) > -1 || u.indexOf( 'Mac' ) > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf( 'iPad' ) > -1, //是否iPad
                    webApp: u.indexOf( 'Safari' ) == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: ( navigator.browserLanguage || navigator.language ).toLowerCase()
        };
        $scope.browser = browser;
    };
    $scope.checkDevice();
    $scope.isPhone = $scope.browser.versions['mobile'];
    console.log($scope.isPhone)
    //判断是否有来源
    $scope.userInfo=window.localStorage['user']?JSON.parse(window.localStorage['user']):false;
    //根据用户判断权限隐藏
    $scope.source = $scope.browser.versions['mobile']?$scope.browser.versions['mobile']:false
    if ( $scope.userInfo !== null ){
        $scope.userState = false;
        $scope.userName = $scope.userInfo[ 'username' ];
        console.log($scope.userName)
        $http({
            url:'http://192.168.0.121:20896/htUserService/getUserById?id='+$scope.userInfo[ 'id' ]
        }).then(function (res) {
            var data = res.data.msg.htUser
            console.log(data)
            $scope.userjob ={
                nickname:data.chinese_name?data.chinese_name:'',
                phone:data.family_phone ? data.family_phone:'',
                address:data.address ? data.address:'',
                sex:data.sex?data.sex:''
            }
        })
    }
    $scope.outLogin = function () {
        if($scope.userInfo){
            window.localStorage.clear();
            var android =  navigator.userAgent.toLowerCase();
            var bool = false
            if(android.indexOf('android') > -1){
                bool = true
            }
            // console.log(window.browser.versions.mobile)
            // if(window.browser.versions.mobile) {
            if(bool){
                window.loginMessage.unLogin()
            }
            //跳转到登陆接口
            window.location.href = '../login2/#'
        }
    }
    var userMove = $('.user_move')
    var userImg = $('.user_img')
    var move = $('.move_box')
    $scope.userMove = function(){
        if(!$scope.userInfo) {
            window.location.href = '../../login2/#'
        }
    }
    $scope.urlGO = function(){
        window.location.href = '../../../editor/assets/ueditor/formdesign/preview.html'
    }
    $scope.goBtn = function(){
        // userMove.css({
        //     'transform' : 'translateX(100%)'
        // })
        move.css({
            'transform' : 'translateX(0)'
        })
    }
    $scope.disnone =function($event){
        if(!$scope.userInfo){
            $event.preventDefault();
            window.location.href = '../login2/#'
        }
    }
    $scope.goUmBtn =function () {
        move.css({
            'transform' : 'translateX(-100%)'
        })
    }

    $scope.changeFile =function() {
        var reader=new FileReader();
        $scope.aValue = document.getElementById('file').files[0], // 获取图片内容
        console.log($scope.aValue)
    }

    $scope.chSave =function () {
        move.css({
            'transform' : 'translateX(-100%)'
        })
        console.log($scope.aValue)
        $http({
            method:'POST',
            url:'http://192.168.0.121:20896/htUserService/UpdateUserAndPic',
            data: {
                family_phone:$scope.userjob.phone,
                address:$scope.userjob.address,
                chinese_name:$scope.userjob.nickname,
                username :$scope.userInfo['username'],
                uid:$scope.userInfo['id'],
                picblog:$scope.aValue,
            },
            // header:{'Content-Type':'application/x-www-form-urlencoded'}
        }).then(function(res){
            var data = res.data.msg
            $scope.userjob ={
                nickname:data.chinese_name,
                phone:data.family_phone,
                address:data.address,
                sex:'sex',
            }
        })
    }
}]);