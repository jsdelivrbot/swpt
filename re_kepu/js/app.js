
var root_burl='/data/';
var app=angular.module('dd8w',[
    "ngRoute",
    "ui.router",
	"re_dangjian"
 ])

.config(["$stateProvider","$urlRouterProvider","$locationProvider",function($stateProvider,$urlRouterProvider,$locationProvider){
    $urlRouterProvider.otherwise("/main");
    $stateProvider.state('main',{
        url:'/re_examinezj',
        templateUrl:'tpl/examinezj.html',
        controller:'examinezj'
    }).state('bookdetail',{
        params:{
            'detailId':null
        },
        url:'/book_detail',
        templateUrl:'tpl/bookDetail.html',
        controller:'bookdetail'
    })
}]) 
.factory('getData', ['$http', function($http){
   var f = {};
  f.examData = [{
      "id":1,
      "name":"通 过"
  },{
    "id":2,
    "name":"未 通 过" 
  }
 ],
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
}])
  