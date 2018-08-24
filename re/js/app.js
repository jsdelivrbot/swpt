/*var root_url=re_root_url + '';*/
//var root_url=courseware_root_url;
//var root_url='/data/';
var root_burl='/data/';
var app=angular.module('dd8w',[
	"ngRoute",
	"re",
	"paper",
	"Footer"
    /*"commonConfig"*/
])
.config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/index',{
		templateUrl:"/re/tpl/index.html",
        controller:"rectr"
	}).otherwise({
			redirectTo:"/index"
	});
}]).factory('getData', ['$http', function($http){
   var f = {};
   f.school_period=[
       {"id":1,"name":"小学"},
       {"id":2,"name":"初中"},
       {"id":3,"name":"高中"}
   ];
   f.teaching_plan_type=[
       {
           "id": 2,
           "title": "微课",
          // "fileType":1
       },
       {
           "id": 3,
           "title": "优课"
          // "fileType":2
       },
       {
           "id": 11,
           "title": "文档"
          // "fileType":3
       },
       {
           "id": 4,
           "title": "试卷"
         //  "fileType":4
       },
       {
           "id": 10,
           "title": "题目"
           //"fileType":5
       },
       {
           "id": 4,
           "title": "课件"
          // "fileType":6
       },
       {
           "id": 5,
           "title": "教案"
          // "fileType":7
       },
       {
           "id": 6,
           "title": "导学案"
          // "fileType":8
       },
       {
           "id": 12,
           "title": "视频"
         //  "fileType":9
       },
       {
           "id": 13,
           "title": "音频"
           //"fileType":10
       },
       {
           "id": 14,
           "title": "图片"
           //"fileType":11
       }
   ];
        f.teaching_plan_type_oth=[
            {
                "id": 1,
                "title": "试卷"
            },
            {
                "id": 2,
                "title": "教案"
            },
            {
                "id": 3,
                "title": "课件"
            },
            {
                "id": 4,
                "title": "素材"
            },
            {
                "id": 6,
                "title": "视频"
            },
            {
                "id": 7,
                "title": "综合"
            },
            {
                "id": 8,
                "title": "学案"
            }
        ];
        f.library_type=[
            {
                "id": 1,
                "title": "系统推荐"
            },
            {
                "id": 3,
                "title": "本校资源"
            },
            {
                "id": 4,
                "title": "我的资源"
            },
            {
            	"id":5,
            	"title":"参考资源"
            },
            {
                "id": 2,
                "title": "更多资源"
            }
        ];
        f.courseware = [
          {
          	 "id" : 1,
          	 "title":"文档"
          },
          {
          	"id":3,
          	"title":"视频"
          },
          {
          	"id":2,
          	"title":"图片"
          },
          {
          	"id":4,
          	"title":"音频"
          }
        ];
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
    }]);