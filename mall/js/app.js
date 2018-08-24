/**
 * Created by Administrator on 2018/3/27.
 */
var app = angular.module('app',[
    'ui.router',
    'swgetData'
])
app.factory('data',function(){
    return{
        selectdata:[30,60,90],
    }
})
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('productList')
    $stateProvider
        .state('productList', {
            url: '/productList',
            templateUrl: './tpls/productList.html'
        })
        .state('detailsPage', {
            url: '/detailsPage?id',
            templateUrl: './tpls/detailsPage.html',
            controller: 'detailsPage'
        })
        .state('shopfunction', {
            url: '/shopfunction?id',
            templateUrl: './tpls/shopfunction.html',
            controller: 'shopfunction'
        })
        .state('myfunction',{
            url: '/myfunction',
            templateUrl: './tpls/myfunction.html',
            controller: 'myfunction'
        })
}])
/*总控制器*/
app.controller('masterControl',["$scope","$rootScope","$http","$state","getData",function($scope,$rootScope,$http,$state,getData,$location,$anchorScroll){
    //初始化参数
    $rootScope.detnum = 0
    $rootScope.user = JSON.parse(localStorage.getItem('user'))
    //重置选择
    $scope.root =function(list,event){
        $rootScope.detnum = 0
        // var nodeID = list.nodeID
        // $http.get(isBuy+'userid='+$rootScope.user.id+'&nodeid='+nodeID).then(function(res){
        //     // if(res.data.msg = '该权限已经购买了'){
        //     //
        //     // }else {
        //     //     $state.go('detailsPage',{id:list.id})
        //     // }
        // })
    }
    //账户余额
    $rootScope.balance = 1000
    var count = true
    $scope.fn = function(event,index,id){
        $(event.target).addClass('state').parent().siblings().find('.h_list').removeClass('state')

        var scroll = $('#'+id).offset().top-70
        $("html,body").animate({scrollTop:scroll},500)
    }
    $('.s_ul').on('mouseenter','.s_li_icon',function(){
        if(count){
            $(this).parent().find('.s_li_text').css({
                'left':'-60px'
            })
        }
    }).on('mouseleave','.s_li',function(){
        $(this).find('.s_li_text').css({
            'left':'10px'
        })
    })
    $('.nav div').on('click',function(){
        $(this).addClass('divafter').siblings().removeClass('divafter')
    })
    $scope.gouwuche = function(event){
        if(count){
            $(event.currentTarget).parent().parent().css({
                'transform':'translateX(0)'
            })
            count = false
        }else{
            $(event.currentTarget).parent().parent().css({
                'transform':'translateX(260px)'
            })
            count = true
        }
    }
    $scope.$watch("active",function(n,o){
        if(n===o){
            return
        }
        console.log(n)
    })
    $scope.vip_moudle = []
    getData.getUrlData2('../data/vip_module.js','vip_module').then(function(res){
        $scope.vip_moudle = res.data
    })
}])
/*功能事件*/
app.directive('moveli',function(){
    return{
        restrict:'AE',
        link:function(scope,ele,attr){
            $(ele).on('mouseenter',function(){
                $(this).find('.cli_link').css({
                    'bottom':'10px',
                    'opacity':'1'
                })
                $(this).find('.cli_box').css({
                    'paddingTop':'45px'
                })
            }).on('mouseleave',function(){
                $(this).find('.cli_link').css({
                    'bottom':'-40px',
                    'opacity':'0'
                })
                $(this).find('.cli_box').css({
                    'paddingTop':'50px'
                })
            })
        }
    }
})
/*滚动事件*/
app.directive('rolling',function(){
    return {
        restrict: 'AE',
        link: function (scope, ele, attr) {
            var H = $(ele).offset().top
            window.onscroll =function(){
                var wT = $(window).scrollTop()
                if(H < wT){
                    $(ele).css({
                        'position':'fixed',
                        'top':'0',
                    })
                }else if(H >= wT){
                    $(ele).css({
                        'position':'static',
                    })
                }
            }
        }
    }
})
//购物详情页控制器
app.controller('detailsPage',["$scope","$rootScope","$http","$stateParams","data",function($scope,$rootScope,$http,$stateParams,data){
    var vip = $scope.vip_moudle
    $scope.detid = Number($stateParams.id)
    for(var i=0;i<vip.length;i++){
        for(var j=0;j<vip[i].child.length;j++){
            if(vip[i].child[j].id === $scope.detid){
                $scope.detailsData =  vip[i].child[j]
            }
        }
    }
    //时间选择
    $scope.selectdata = data.selectdata
    //自定义价格
    $scope.money = "￥"+100
    //tab选择事件
    $scope.selfn = function(index){
        $rootScope.detnum = index
    }
}])
//功能购买详情页
app.controller("shopfunction",["$scope","$rootScope","$http","$stateParams","data",function($scope,$rootScope,$http,$stateParams,data){
    //已购买功能
    var authId = []
    var vip = $scope.vip_moudle
    $scope.shopid = Number($stateParams.id)
    for(var i=0;i<vip.length;i++){
        for(var j=0;j<vip[i].child.length;j++){
            if(vip[i].child[j].id === $scope.shopid){
                $scope.shopidData =  vip[i].child[j]
            }
        }
    }
    // //查询已购买功能
    // $http.get(getCurrentDate+$rootScope.user.id).then(function(getDateres){
    //     if(getDateres.data.status === '0'){
    //         var NodeDate = getTime(getDateres.data.msg)
    //         $http({
    //             url:getNodeContentByIdAndTime,
    //             method:'post',
    //             data:{
    //                 userId:$rootScope.user.id,
    //                 currentTime:NodeDate
    //             }
    //         }).then(function(idSuccess){
    //             var idSuccessArr = idSuccess.data.msg.nodeList
    //             if(idSuccess.status == 200 ){
    //                 for(var i=0;i<vip.length;i++){
    //                     for(var j=0;j<vip[i].child.length;j++){
    //                         for(var k=0;k<idSuccessArr.length;k++){
    //                             if(vip[i].child[j].id == idSuccessArr[k].divId){
    //                                 var resnodeid = vip[i].child[j].nodeID
    //                                 $http.get(getParentNodeListById+resnodeid).then(function(res){
    //                                     var a =  res.data.msg.allList.map(function(item){
    //                                         return {'nodeId':item}
    //                                     })
    //                                     authId.push({'arr':a})
    //                                 })
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         })
    //     }
    // })
    // $http.get(getParentNodeListById+$scope.shopidData.nodeID).then(function(res){
    //     var a =  res.data.msg.allList.map(function(item){
    //         return {'nodeId':item}
    //     })
    //     authId.push({'arr':a})
    // })
    var w = $(window).width()
    var h  = $(window).height()
    $('.alert').css({
        'width':w+'px',
        'height':h+'px'
    })
    //数据
    $scope.shopdata={
        selectdata :data.selectdata,
        num:0,
        mony:100
    }
    $scope.selfn = function(index){
        $rootScope.detnum = index
        $scope.shopdata.num = index
    }
    $scope.bol = true
    //购买函数
    $scope.shopbtn = function(){

        $('.alert').css({
            'display':'block'
        })
        $scope.bol = false
        //购买接口
        $http.get(getParentNodeListById+$scope.shopidData.nodeID).then(function(sus){
            if(sus.data.statusMsg == 'success'){
                var arr =[]
                var susarr = sus.data.msg.allList
                susarr.forEach(function(list){
                    return arr.push({'nodeId':list})
                })
                $http({
                    method:'POST',
                    url:buyRoleNodeAdd,
                    data:{
                        userid:$rootScope.user.id,
                        nodeIds:arr
                    }
                }).then(function(res){
                    if(res.data.msg === '购买成功'){
                        $scope.bol = true
                    }
                })
            }
        })
    }
}])
//我的数据
app.controller("myfunction",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
    var vipdata = $scope.vip_moudle
    $scope.myfunindex = 0
    $scope.myfundata =[]
    $http.get(roleNodeList+$rootScope.user.id).then(function(res){
        if(res.data.statusMsg == 'success'){
            $scope.authId = res.data.msg.nodeIdListAll
            for ( var i = 0; i < vipdata.length; i++ ) {
                for (var j = 0; j < vipdata[i].child.length; j++) {
                    for ( var k = 0; k < $scope.authId.length; k++ ) {
                        if ($scope.authId[k].divId == vipdata[i].child[j].id) {
                            $scope.myfundata.push(vipdata[i].child[j])
                            $scope.myfunbol = true
                        }

                    }
                }
            }
        }else if(res.data.statusMsg == 'error'){
            $scope.myfunbol = false
        }
    })
}])
//时间函数
function getTime(data){
    var date = new Date(data)
    var Y = date.getFullYear()
    var M = date.getMonth()+1
    var D = date.getDate()
    var H = date.getHours()
    var Mi = date.getMinutes()
    var S = date.getSeconds()
    return Y+'-'+M+'-'+D+' '+H+':'+Mi+':'+S
}
//对象数组去重
function norepeat(arr){
    var res = [arr[0]];
    for(var i=1;i<arr.length;i++){
        var repeat = false;
        for(var j=0;j<res.length;j++){
            if(JSON.stringify(arr[i]) == JSON.stringify(res[j])){
                repeat = true;
                break;
            }
        }
        if(!repeat){
            res.push(arr[i]);
        }
    }
    return res;
}
