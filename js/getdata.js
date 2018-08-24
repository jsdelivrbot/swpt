//var root_url=_root_url + '';
//var root_url=search_root_url;
angular.module('swgetData',[])
.factory('getData', ['$http', function($http){
    var f = {};
    f.getUrlData=function(url,flag){
        return $http.get(search_root_url+url)
            .then(function(r) {
                console.log('服务器数据');
                return {"status":"ok","data":r.data};
            })
            .catch(function(err) {
                console.log('文件数据');
                return {"status":"ok","data":g_data[flag]}
            });
    }
    f.getUrlData2=function(url,flag){
        return $http.get(url)
            .then(function(r) {
                return {"status":"ok","data":r.data};
            })
            .catch(function(err) {
                return {"status":"ok","data":g_data[flag]}
            });
    }
    return f;
}]).run(['$http',function($http){
    //$http.post(accountQuery_root_url + "/accountQuery/getPhone",{});
}]);
