
var root_burl='/data/';
var app=angular.module('dd8w',[
    "ngRoute",
    "ui.router",
	"upLoadRe_pc"
 ])

.config(["$stateProvider","$urlRouterProvider","$locationProvider",function($stateProvider,$urlRouterProvider,$locationProvider){
    $urlRouterProvider.otherwise("/main");
    $stateProvider.state('main',{
        url:'/main',
        templateUrl:'tpl/nav.html',
        controller:'rectr'
    }).state('main.examine',{
        url:'/re_examine',
        templateUrl:'tpl/examine.html',
        controller:'examine'
    }).state('main.examinezj',{
        url:'/re_examinezj',
        templateUrl:'tpl/examinezj.html',
        controller:'examinezj'
    })
}]) 
.factory('getData', ['$http', function($http){
   var f = {};
   
  f.contentText = [{
      "context":"内容与创建资源不符合"
    },
    {
        "context":"内容违法"
    },
    { 
        "context":"内容不适合推荐,过于暴力"
   }],

   f.getUrlData=function(url,flag){
       url=courseware_root_url+url;
       return $http.get(url)
           .then(function(r) {
               return {"status":"ok","data":r.data};
           })
           .catch(function(err) {
               console.log('文件数据');
               return {"status":"ok","data":g_data[flag]}
           });
   }
   return f;
}]).run(['$http',function($http){
        //$http.post(accountQuery_root_url + "/accountQuery/getPhone",{});
    }])
