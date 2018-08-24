var app = angular.module('gzsw', [
    "ngRoute",
    "swgetData"
])
    .filter('vipOkMod', function () {
        return function (m) {
            var out = [];
            if (m !== undefined) {
                for (var j = 0; j < m.length; j++) {
                    for (var i = 0; i < m[j].child.length; i++) {
                        if (m[j].child[i].isChoice) {
                            out.push(m[j]);
                            break;
                        }
                    }
                }
                return out;
            }
        }
    })
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: "./tpl/index.html",
            controller: "homeStr"
        }).otherwise({
            redirectTo: "/index"
        });
    }]).controller('homeStr', ["$scope", "$http", "getData", function ($scope, $http, getData) {
        var setVipArr = []
        var already = []
        var user_id
        var userisAdmin = false
        if (JSON.parse(localStorage.getItem('user')) === null) {
            alert('抱歉,您没有登陆账号,暂无权查看!')
            window.location.href = '../login2/'
        }else{
            user_id = JSON.parse(localStorage.getItem('user')).id
        }
        //判断用户是否是管理员,如果不是管理员,则查找该用户已创建组织
        $http.get(isAdmin+user_id).then(function(res){
            if(res.data.status === '1'){
                $scope.header = []
                userisAdmin = true
                mycreate()
            }else{
                //创建组织
                $http.get(getRoleByUser+user_id).then(function(res){
                    $scope.header = res.data.msg[0].roleList
                })
                //加入组织
                $http.get(getUserJoinRole+user_id).then(function(res){
                    if(res.data.status === "1"){
                        $scope.myadd = res.data.msg.htRoleList
                    }
                })
                mycreate()
            }
        }).then(function(err){
            console.log(root_url)
        })

        $scope.active_nav = 0
        $scope.active = function(num){
            $scope.active_nav = num
            if($scope.active_nav === 1){
                $scope.myuserfun($scope.myadd[0],0)
            }
            if($scope.active_nav === 0){
                mycreate()
            }
        }
        $scope.myuserfun = function(list,$index){
                $http.get(getNodeByRoleAndOther + 'userId='+user_id+'&roleId='+list.id).then(function(res){
                    if(res.data.statusMsg == 'success'){
                        $scope.authId = res.data.msg
                        for (var i = 0; i < $scope.vipDateModule.length; i++) {
                            for (var j = 0; j < $scope.vipDateModule[i].child.length; j++) {
                                for (var k = 0; k < $scope.authId.length; k++) {
                                    if ($scope.authId[k].divId == $scope.vipDateModule[i].id) {
                                        $scope.vipDateModule[i].isChoice = true;
                                    }else{
                                        $scope.vipDateModule[i].isChoice = false
                                    }
                                    if ($scope.authId[k].divId == $scope.vipDateModule[i].child[j].id) {
                                        $scope.vipDateModule[i].child[j].isChoice = true;
                                    }else{
                                        $scope.vipDateModule[i].child[j].isChoice = false
                                    }
                                }
                            }
                        }
                    }
                })
        }
        $scope.show_more_module = false;
        $scope.module_class = {
            1: {"id": 1, "name": "课前"},
            2: {"id": 2, "name": "上课"},
            3: {"id": 3, "name": "课后"}
        };
        $scope.vip_module = [];
        $scope.other_module = [];
        $scope.showMoreModule = function () {
            $scope.show_more_module = !$scope.show_more_module;
        }
        $scope.active_num = 0
        $scope.hdactive = function(index){
            $scope.active_num = index
        }


        //时间函数
        function getTime(data) {
            var date = new Date(data)
            var Y = date.getFullYear()
            var M = date.getMonth() + 1
            var D = date.getDate()
            var H = date.getHours()
            var Mi = date.getMinutes()
            var S = date.getSeconds()
            return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S
        }

        function mycreate(){
            if(userisAdmin === false){
                $http.get(roleNodeList + user_id).then(function (sucs) {
                    if (sucs.data.statusMsg == 'success') {
                        $scope.authId = sucs.data.msg.nodeIdListAll
                        for (var i = 0; i < $scope.vipDateModule.length; i++) {
                            for (var j = 0; j < $scope.vipDateModule[i].child.length; j++) {
                                for (var k = 0; k < $scope.authId.length; k++) {
                                    if ($scope.authId[k].divId == $scope.vipDateModule[i].id) {
                                        $scope.vipDateModule[i].isChoice = true;
                                    }
                                    if ($scope.authId[k].divId == $scope.vipDateModule[i].child[j].id) {
                                        $scope.vipDateModule[i].child[j].isChoice = true;
                                    }
                                }
                            }
                        }
                    }
                })
            }else if(userisAdmin === true){
                for (var i = 0; i < $scope.vipDateModule.length; i++) {
                    $scope.vipDateModule[i].isChoice = true;
                    for (var j = 0; j < $scope.vipDateModule[i].child.length; j++) {
                        $scope.vipDateModule[i].child[j].isChoice = true;
                    }
                }
            }
        }
        $scope.$watch('active_num', function (n, o) {
            if (n === o) {
                return
            }
            $http.get(roleNodeList + user_id).then(function (sucs) {
                if (sucs.data.statusMsg == 'success') {
                    $scope.authId = sucs.data.msg.nodeIdListAll
                    for (var i = 0; i < $scope.vipDateModule.length; i++) {
                        for (var j = 0; j < $scope.vipDateModule[i].child.length; j++) {
                            for (var k = 0; k < $scope.authId.length; k++) {
                                if ($scope.authId[k].divId == $scope.vipDateModule[i].id) {
                                    $scope.vipDateModule[i].isChoice = true;
                                }
                                if ($scope.authId[k].divId == $scope.vipDateModule[i].child[j].id) {
                                    $scope.vipDateModule[i].child[j].isChoice = true;
                                }
                            }
                        }
                    }
                }
            })
        })
        //初始化 vip模块
        getData.getUrlData2("/data/vip_module.js", "vip_module").then(function (res) {
            var vipres = res
            var a = 2
            $scope.bol = true
            $scope.vipDateModule = res.data

            /*
             * 第一个循环是循环 data文件夹下面的vip_module.js的所有的文件
             * 第二个循环是循环 父节点的所有子节点
             * 第三个循环是循环 所有子节点
             * 第四个循环是循环 判断 权限Id 相同的话 就显示
             */

            $scope.vip_module = res.data;
            //console.log(res.data)
            // $scope.vip_module2=res.data;
            $scope.vip_module2 = [{
                "id": 10,
                "m_name": "公文包",
                "isChoice": false,
                "pid": 2,
                "child": [{
                    "id": 15,
                    "name": "网络硬盘",
                    "url": "/upload?type=public",
                    "pic": "./img/u68.png",
                    "isChoice": false,
                    "pid": 10
                },
                    {
                        "id": 16,
                        "name": "工作文档",
                        "url": "/upload",
                        "pic": "./img/more/582044cc2c036.png",
                        "isChoice": false,
                        "pid": 10
                    }]
            },
                {
                    "id": 11,
                    "m_name": "教师类",
                    "isChoice": false,
                    "pid": 2,
                    "child": [{
                        "id": 22,
                        "name": "备课",
                        "url": "/courseware",
                        "pic": "./img/more/5820449fe1122.png",
                        "isChoice": false,
                        "pid": 11
                    },
                        {
                            "id": 26,
                            "name": "课程表",
                            "url": "/curriculum",
                            "pic": "./img/more/58204570916dc.png",
                            "isChoice": false,
                            "pid": 11
                        },
                        {
                            "id": 27,
                            "name": "讲堂",
                            "url": "/lecture/lecture.html",
                            "pic": "./img/more/582044fc4c2c6.png",
                            "isChoice": false,
                            "pid": 11
                        }]
                }];

            var userName = JSON.parse(localStorage.getItem('user')).username;
            $scope.vip_module2 = [];
            if (userName === '18520119450') {
                res.data.filter(function (item) {
                    if (item.m_class === 1 || item.m_class === 2) {
                        $scope.vip_module2.push(item);
                    }
                    return $scope.vip_module2;
                })
            } else if (userName === '18520119451') {
                res.data.filter(function (item) {
                    if (item.m_class === 3 || item.m_class === 4) {
                        $scope.vip_module2.push(item);
                    }
                    return $scope.vip_module2;
                })
            } else {
                $scope.vip_module2 = res.data;
            }

            //$scope.vip_module2 = JSON.parse(localStorage.getItem('user')).permissionTreeList;
            //console.log($scope.vip_module2)
        });
        //初始化 其它模块
        getData.getUrlData2("/data/other_module.js", "other_module").then(function (res) {
            $scope.other_module = res.data;
        });
        //选中的功能数组
        $scope.setVipModule = function (nodeID, event) {
            if (event.target.checked) {
                $http.get(getParentNodeListById + nodeID).then(function (res) {
                    var arr = res.data.msg.allList.map(function (item) {
                        return {'nodeId': item}
                    })
                    setVipArr.push({'key': nodeID, 'arr': arr})
                })
            } else if (!event.target.checked) {
                var idx = setindex(setVipArr, 'key', nodeID)
                replaceindex(setVipArr, idx)
            }
        }
        //查找对象在数组中的位置
        function setindex(arr, key, nodeid) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][key] == nodeid) {
                    return i
                }
            }
            return -1
        }

        //根据对象在数组中的位置进行删除
        function replaceindex(arr, index) {
            if (index == 0) {
                arr.shift()
                return
            } else if (index == arr.length - 1) {
                arr.pop()
                return
            } else {
                arr.splice(index, 1)
                return
            }
        }

        //对象数组去重
        function norepeat(arr) {
            var res = [arr[0]];
            for (var i = 1; i < arr.length; i++) {
                var repeat = false;
                for (var j = 0; j < res.length; j++) {
                    if (JSON.stringify(arr[i]) == JSON.stringify(res[j])) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    res.push(arr[i]);
                }
            }
            return res;
        }

        //保存VIP设置
        $scope.saveVipSet = function () {
            var arr = []
            for (var i = 0; i < setVipArr.length; i++) {
                arr = arr.concat(setVipArr[i]['arr'])
            }
            console.log(arr)
            //发送购买的功能，数据同步到组织
            $http({
                method: 'POST',
                url: buyRoleNode,
                data: {
                    userid: user_id,
                    nodeIds: norepeat(arr)
                }
            }).then(function (res) {
                if (res.data.msg === '购买成功') {
                    alert(res.data.msg)
                    /*发送成功，重新刷新工作表*/
                    location.reload();
                    $scope.show_more_module = !$scope.show_more_module;
                }
            })
            //刷新购买记录,数据同步到用户
            $http({
                method: 'POST',
                url: saveNodeAssociateUserByChange,
                data: {
                    userId: user_id,
                    nodeIds: norepeat(arr)
                }
            }).then(function (res) {
                console.log(res.data.msg)
            })

            // $http({
            //     method:'post',
            //     url:'http://oa.com/test.php',
            //     data:$scope.vip_module,
            //     headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            //     transformRequest: function (data) {
            //         return $.param(data);
            //     }
            // }).then(function successCallback(response) {
            //     $scope.showMoreModule();
            //     console.log(response)
            //     alert('保存成功');
            // }, function errorCallback(response) {
            //     alert('保存失败');
            // });
            /**/
            // $http.get(getCurrentDate+user_id)
            //     .then(function(ressuss){
            //         if(ressuss.data.status === '0'){
            //             console.log('重新刷新视图')
            //             $scope.judge = true
            //             $scope.NodeDate = getTime(ressuss.data.msg)
            //             $http({
            //                 url:getNodeContentByIdAndTime,
            //                 method:'post',
            //                 data:{
            //                     userId:user_id,
            //                     currentTime:$scope.NodeDate
            //                 }
            //             })
            //                 .then(function(sucs){
            //                     $scope.authId = sucs.data.msg.nodeList
            //                     if(sucs.status == 200 ){
            //                         for ( var i = 0; i < vipres.data.length; i++ ) {
            //                             for (var j = 0; j < vipres.data[i].child.length; j++) {
            //                                 for ( var k = 0; k < $scope.authId.length; k++ ) {
            //                                     if($scope.authId[k].divId == vipres.data[i].id){
            //                                         vipres.data[i].isChoice = true;
            //                                     }
            //                                     if ($scope.authId[k].divId == vipres.data[i].child[j].id) {
            //                                         vipres.data[i].child[j].isChoice = true;
            //                                     }
            //                                 }
            //                             }
            //                         }
            //                     }
            //                 })
            //         }
            //     })
        }

        console.log($('.module-class-lists'));
        console.log($('.h-content').width())
        var ww = $('.h-content').width() - 50;
        var html_st = '<style>.module-class-lists{width:' + ww + 'px;}</style>';
        $('.h-content').before(html_st);
        function setHeight() {
            console.log($('.module-block-list').length);
            /*$('.module-block-list').each(function(){
             console.log($(this).height());
             });*/
        }

        setHeight();
    }]).run(['$http', function ($http) {
        //$http.post(accountQuery_root_url + "/accountQuery/getPhone",{});
    }]);
