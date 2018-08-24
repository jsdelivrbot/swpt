//var root_url=_root_url;
var root_burl='/data/';
var app=angular.module('curriculum',[
	"ngRoute",
    "cur-ctr"
])
.config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/index',{
		templateUrl:"tpl/index.html",
        controller:"listCtr"
	}).when('/add',{
        templateUrl:"tpl/add.html",
        controller:"addCtr"
    }).when('/list',{
        templateUrl:"tpl/list.html",
        controller:"curriculumCtr"
    }).when('/edit/:id',{
        templateUrl:"tpl/edit.html",
        controller:"editCtr"
    }).otherwise({
			redirectTo:"/index"
	});
}])
.factory('getData', ['$http', function($http){
        var f = {};
        f.school_period=[
            {"id":1,"name":"小学"},
            {"id":2,"name":"初中"},
            {"id":3,"name":"高中"}
        ];
        f.getUrlData=function(url,flag){
            //url=_root_url+url;
            return $http.get(url)
                .then(function(r) {
                    console.log('服务器数据');
                    return {"status":"ok","data":r.data};
                })
                .catch(function(err) {
                    console.log('文件数据');
                    console.log(g_data);
                    console.log(flag);
                    return {"status":"ok","data":g_data[flag]}
                });
        }
        return f;
}])
.run(['$http',function($http){
        //$http.post(accountQuery_root_url + "/accountQuery/getPhone",{});
}]);
