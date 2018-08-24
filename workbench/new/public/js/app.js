/**
 * Created by Administrator on 2018/1/28.
 */

var sbox = document.querySelector("#aside")
var app = angular.module('myApp', [
    //angular树依赖
    'treeControl',
    //angular时间插件依赖
    'ui.bootstrap',
    //    angualr分页插件
    'tm.pagination',
])
app.factory('dataService', function () {
    return {
        DATAstart: '',
        DATAend: ''
    }
}).factory('saveTimes', function () {
    return {
        starttimes: '',
        endtimes: ''
    }
}).factory('dataId', function () {
    return {
        sid: '',
        toggle: '',
    }
})
//总控制器
app.controller("myController", ["$scope", "$rootScope", "$http", function ($scope, $rootScope, $http) {
    var ultoggle = document.getElementsByClassName('ultoggle')[0]
    var toRclick = document.getElementById("torclick")
    var arr = ['教师', '成员', '家长','学生','领导']
    $rootScope.tosendnum = 0
    $scope.user = JSON.parse(localStorage.getItem('user'));
    
    //接受来自myJob的data，并向发送该数据
    $scope.$on("modalTree", function (ele, data) {
        $scope.$broadcast("modalData", data)
    })
    $scope.$on("topatent", function (ele, data) {
        $scope.$broadcast("mdata", data)
    })
    //接收来自mydata中的数据,并传入用户权限
    $scope.$on("yhqxTree", function (ele, data) {
        $scope.$broadcast("toyhqxTree", data)
    })
    //接受来自modalTree中的新数据，并传入mjob
    $scope.$on("newUserTree", function (ele, data) {
        $scope.$broadcast("tonewuserT", data)
    })
    //接收来自myuserdata中的uId
    $scope.$on("toyhqxuId", function (ele, data) {
        $scope.$broadcast("toyhqxMsg", data)
    })
    $scope.$on("toParentRoleid", function (ele, data) {
        $scope.$broadcast("toChildRoleid", data)
    })
    //左侧树结构数据
    $scope.dataForTheTree = {}
    //设置点击布尔值
    $scope.bol = false
    //角色配置
    $scope.toggle = false
    var rolename = document.getElementById('bumenname')
    var btnPrimary = document.getElementById('btnPrimary')
    var btnXiugai = document.getElementById('btnXiugai')
    var btnShanchu = document.getElementById('btnShanchu')
    var bumenname = document.getElementById('bumenname')
    var oldname = document.getElementById('oldname')
    var newname = document.getElementById('newname')
    var delname = document.getElementById('delname')
    var add = document.getElementsByClassName('zengjia')[0]
    var xiugai = document.getElementsByClassName('xiugai')[0]
    var shanchu = document.getElementsByClassName('shanchu')[0]
    add.onclick = function () {
        bumenname.value = ""
    }
    var adminUser = JSON.parse(localStorage.getItem('user'))
    //判断是不是管理员
    $http.get(isAdmin + adminUser.id).then(function (res) {
        $scope.isadmin = res.data.status == '1' ? true : false;
        //如果是管理员保存时用管理接口
    })

    //设置url参数
    var _actionCustomerID = 0
    if (!$scope.bol) {
        //创建组织
        btnPrimary.onclick = function () {
            if (!rolename.value) {
                alert("您不能输入空值")
            }
            $http.get(addRoleChildNodeAndUser + 'rolename=' + rolename.value + '&user_id=' + $scope.user.id + '&description=&role_id=' + _actionCustomerID
            )
                .then(function (res) {
                    if (res.data.status === '1') {
                        $http.get(getSearchInfoRole + $scope.user.id).then(function (scuss) {
                            $scope.dataForTheTree = scuss.data.msg
                            $('#btnPrimary').modal('hide');
                        })
                        arr.forEach(function (item) {
                            $http.get(getAddRoleNode + "posName=" + item + "&role_id=" + res.data.msg.id)
                                .then(function (res) {
                                })
                        })
                    }
                })
        }
    }
    var selId = 1

    //angular Tree 参数设置
    $scope.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    }
    //右击父节点集合函数
    function parentdata(arr, tree) {
        $scope.arrs = []
        for (var i = 0; i < arr.length; i++) {
            arrdata(arr[i], tree)
        }
    }

    //右击父节点的集合判断
    function arrdata(name, tree) {
        var name = name
        var tree = tree
        for (var i = 0; i < tree.length; i++) {
            if (tree[i].id == name) {
                $scope.arrs.push(tree[i])
                return false;
            } else {
                if (tree[i].children != 0) {
                    arrdata(name, tree[i].children)
                }
            }
        }
    }

    //右击的id
    function childrendata(name, tree) {
        var name = name
        var tree = tree
        for (var i = 0; i < tree.length; i++) {
            if (tree[i].id == name) {
                $scope.name = tree[i].name
                $scope.ID = tree[i].id
                return false;
            } else {
                if (tree[i].children != 0) {
                    childrendata(name, tree[i].children)
                }
            }
        }
    }

    $scope.ultoggle = false
    $scope.ulab = false
    $scope.arrs = []
    $scope.changesend = function (id) {
        $http.get(getAddRoleChildNode + "rolename=" + $scope.name + "&description=undefined" + "&role_id=" + id)
            .then(function (res) {
                if (res.data.status === '1') {
                    $http.get(getDeleteRoleNode + "role_id=" + $scope.ID)
                        .then(function (res) {
                            $http.get(getSearchInfoRole + $scope.user.id).then(function (res) {
                                $scope.dataForTheTree = res.data.msg
                                $scope.ultoggle = false
                            })
                        })
                }
            })
    }
    $('#aside .content')[0].oncontextmenu = function (event) {
        return false;
    }
    //左键点击事件
    $scope.nga = function ($event) {
        if ($event.button == 2 && $event.target.className.indexOf('ng-binding') > -1) {
            var arrlis = []
            $scope.ultoggle = !$scope.ultoggle
            $scope.arrul.push({name: $($event.target).text()})
            ultoggle.style.top = $event.clientY + 'px'
            ultoggle.style.left = $event.clientX + $event.target.offsetLeft + 'px'
            var x = angular.element($event.target).parents('ul')[1];
            var lis = $(x).children()
            for (var i = 0; i < lis.length; i++) {
                arrlis.push($(lis[i]).children('div').children('span').attr('ngid'))
            }
            parentdata(arrlis, $scope.dataForTheTree)
            childrendata($event.target.getAttribute('ngid'), $scope.dataForTheTree)
            $scope.arrul = $scope.arrs
        }
        if (!$scope.ultoggle) {
            $scope.arrul = []
        }
    }
    //点击左侧树事件
    $scope.onTreeLeafItemClickFunction = function (sel, selected, $parentNode, $index) {
        // 右击事件
        $scope.name = sel.name
        $scope.bol = selected
        //对是否点击进行判断
        if (!$scope.bol) {
            _actionCustomerID = 0
        }
        if ($scope.bol) {
            _actionCustomerID = sel.id
        }
        $scope.toggle = selected
        //当前点击用户ID
        var id = sel.id
        $scope.selId = id
        $scope.$broadcast('selId', id)
        $http.get(getCodeById + sel.id).then(function (res) {
            if (res.data.statusMsg == '有组织码') {
                $scope.CodeById = res.data.msg.code
            } else {
                $scope.CodeById = null
            }
        })
        //创建节点，如果未点击，则_actionCustomerID=0，创建一级目录
        btnPrimary.onclick = function () {
            if (!!rolename.value) {
                $http.get(addRoleChildNodeAndUser + 'rolename=' + rolename.value + '&user_id=' + $scope.user.id + '&description=&role_id=' + _actionCustomerID
                )
                    .then(function (res) {
                        if (res.data.status === '1') {
                            $http.get(getSearchInfoRole + $scope.user.id).then(function (res) {
                                $scope.dataForTheTree = res.data.msg
                                $('#btnPrimary').modal('hide');
                            })
                            arr.forEach(function (item) {
                                $http.get(getAddRoleNode + "posName=" + item + "&role_id=" + res.data.msg.id)
                                    .then(function (res) {
                                    })
                            })
                        }
                    })
            }
            if (!rolename.value) {
                alert("您不能输入空值")
            }
        }

        //修改节点
        xiugai.onclick = function () {
            oldname.value = sel.name
            newname.value = ""
        }

        btnXiugai.onclick = function () {
            if (!$scope.bol) {
                $('#btnXiugai').modal('hide');
                alert('修改部门不能为空')
            }
            if ($scope.bol) {
                $http.get(getUpdateRoleNode + "rolename=" + newname.value + "&description=" + sel.remark + "&role_id=" + _actionCustomerID + "&pid=" + sel.parentId)
                    .then(function (res) {
                        $http.get(getSearchInfoRole + $scope.user.id).then(function (res) {
                            $scope.dataForTheTree = res.data.msg
                            $('#btnXiugai').modal('hide');
                            _actionCustomerID = 0
                        })
                    })
            }
        }
        //删除节点
        shanchu.onclick = function () {
            delname.value = sel.name
        }
        btnShanchu.onclick = function () {
            if (!$scope.bol) {
                $('#btnXiugai').modal('hide');
                alert('修改部门不能为空')
            }
            if ($scope.bol) {
                $http.get(getDeleteRoleNode + "role_id=" + sel.id)
                    .then(function (res) {
                        $http.get(getSearchInfoRole + $scope.user.id).then(function (res) {
                            $scope.dataForTheTree = res.data.msg
                            $('#btnShanchu').modal('hide');
                            _actionCustomerID = 0
                        })
                    })
            }
        }
    };
    // $http.get(getSearchInfoRole).then(function(res){
    //     $scope.dataForTheTree=res.data.msg
    //     console.log(res)
    // })

    $http.get(getSearchInfoRole + $scope.user.id)
        .then(function (res) {
            $scope.dataForTheTree = res.data.msg
        })

}])
//角色职位模块
app.controller("myJob", ["$scope", "$rootScope", "$http", "dataId", function ($scope, $rootScope, $http, dataId) {
    var JbtnPrimary = document.getElementById('JbtnPrimary')
    var JbtnXiugai = document.getElementById('Jbtnxiugai')
    var JbtnShanchu = document.getElementById('JbtnShanchu')
    var jobname = document.getElementById('jobname')
    var Joldname = document.getElementById('Joldname')
    var Jnewname = document.getElementById('Jnewname')
    var Jdelname = document.getElementById('Jdelname')
    var addJob = document.getElementsByClassName('addJob')[0]
    var modJob = document.getElementsByClassName('modJob')[0]
    var delJob = document.getElementsByClassName('delJob')[0]
    //角色成员
    var btnUser = document.getElementById('btnUser')
    var Ubtnguanli = document.getElementsByClassName('Ubtnguanli')[0]
    var Ubtnshenhe = document.getElementsByClassName('Ubtnshenhe')[0]
    //创建职位函数
    var getRoleName = function (id, val) {
        if (!!val) {
            $http.get(getAddRoleNode + "posName=" + val + "&role_id=" + id)
                .then(function (res) {
                    if (res.data.statusMsg) {
                        $http.get(getRolePosNameDizhi + "role_id=" + id).then(function (res) {
                            $scope.tree = res.data.position
                            jobname.value = ''
                            $('#addJob').modal('hide');
                            alert('职位创建成功')
                        })
                    }
                })
        }
    }
    //修改职位函数
    var getUpdate = function (val, pid, rid) {
        $http.get(getUpdatePositionDizhi + "posName=" + val + "&pos_id=" + pid)
            .then(function (res) {
                if (res.data.statusMsg) {
                    $http.get(getRolePosNameDizhi + "role_id=" + rid).then(function (res) {
                        $scope.tree = res.data.position
                        $('#modJob').modal('hide')
                        alert('职位修改成功')
                    })
                }
            })
    }
    $scope.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    }

    //职位模板点击事件
    $scope.onJobClick = function (sel, selected) {
        $rootScope.tog = selected
        var Jid = sel.pos_id
        $rootScope.sId = Jid
        dataId.sid = sel.pos_id
        Jdelname.value = Joldname.value = sel.posName
        //职位删除方法
        JbtnShanchu.onclick = function () {
            if (selected) {
                $http.get(getDelRolePositionDizhi + "pos_id=" + sel.pos_id)
                    .then(function (res) {
                        if (res.data.statusMsg) {
                            //重新获取数据进行DOM渲染
                            $http.get(getRolePosNameDizhi + "role_id=" + sel.role_id).then(function (res) {
                                $scope.tree = res.data.position
                                $('#delJob').modal('hide')
                            })
                        }
                    })
            }
        }
        //职位修改方法
        JbtnXiugai.onclick = function () {
            if (selected) {
                getUpdate(Jnewname.value, sel.pos_id, sel.role_id)
            }
        }
        //职位修改回车事件
        $('#Jnewname').unbind('keyup');
        $('#Jnewname').on('keyup', function (e) {
            if (e.keyCode == 13) {
                getUpdate(Jnewname.value, sel.pos_id, sel.role_id)
            }
        })
        //用户成员管理
        // console.log(Ubtnguanli)
        Ubtnguanli.onclick = function () {
            //点击用户管理，向太框传入数据
            //向myController传入数据
            $http.get(SeCurrentPosId + Jid).then(function (res) {
                $scope.$emit("modalTree", {
                    Jid: Jid,
                    data: res.data
                })
            })
        }


    }
    $scope.toModal = function (msg) {

    }
    $scope.$on("news", function (ele, data) {
        $scope.$broadcast("tochild", data)
    })
    var toggle = $scope.toggle
    var selId = $scope.selId

    //监听左侧是否被点击
    $scope.$watchGroup(["toggle", "selId"], function (newval, oldval) {
        if (newval === oldval) {
            return
        }
        $scope.$emit('toParentRoleid', newval[1])
        if (newval[0] && newval !== oldval) {
            myval = newval[1]
            //显示职位
            $http.get(getRolePosNameDizhi + "role_id=" + newval[1]).then(function (res) {
                $scope.tree = res.data.position
            })
            //添加职位
            JbtnPrimary.onclick = function () {
                getRoleName(newval[1], jobname.value)
            }
            $('#jobname').unbind('keyup');
            $('#jobname').on('keyup', function (e) {
                if (e.keyCode == 13) {
                    getRoleName(newval[1], jobname.value)
                }
            })
        }
        /*如果点击不同组织，职位tog重置为false*/
        if (newval !== oldval || !newval[0]) {
            $rootScope.tog = false
        }
    })
}])

// 职位权限模块
app.controller("myData", ["$scope", "$rootScope", "$http", function ($scope, $rootScope, $http) {
    var zwqxnodeName = document.getElementById('zwqxnodeName')
    var zwqxnodeUrl = document.getElementById('zwqxnodeUrl')
    var tog = $rootScope.tog
    var sId = $rootScope.sId
    //点击模太框隐藏
    $scope.zwqxtg = function ($event) {
        var tagname = $event.target.id
        if (tagname === 'zwqxmodal') {
            $('#zwqxbox').hide()
            $('#zwqxmodal').hide()
        }
    }

    //增加权限添加节点
    $scope.zwqxaddbtn = function () {
        var data = {
            nodeName: zwqxnodeName.value,
            parentId: $scope.actionNode.data.id,
            url: zwqxnodeUrl.value,
            isDelete: 0
        }
        $http({
            method: 'post',
            url: test_root_url + '/htNodeService/insertNode',
            data: data
        }).success(function (res) {
            if (res.data.statusMsg == 'success') {
                if ($scope.isadmin) { //如果是管理员
                    $http.get(dataTreeUrl).then(function (res) {
                        getTreedata(res);
                        $("#treedata").css("width", 100 + '%')
                        //角色配置关闭图片
                        $($($($($(".l-tab-links").children()[2]).children()[0]).children()[0]).children()[0]).addClass("icon-remove")
                        //关闭配置,让右键菜单为空,显示和隐藏板块
                        $($(".cosl")[0]).on("click", function () {
                            //关闭配置,让右键菜单为空,显示和隐藏板块
                            rmenu_s = "null";
                            $($(".l-layout-center")[1]).css("display", "block")
                            $($($(".l-layout-center")[1])).children().attr("id", "framecenter")
                            $($(".l-layout-center")[0]).css("display", "none")
                            $($($(".l-layout-center")[0])).children().attr("id", "framecenter2")
                            //树图标变回来
                            $(".l-tree-icon-folder").removeClass("treeimg")
                            $(".l-tree-icon-folder-open").removeClass("treeimg")
                        })

                        $http.get(getAllRoleNodeIdsByOther + newval[1]).then(function (res) {
                            if (!!res.data.msg) {
                                var msgdata = res.data.msg.nodeIds;
                                dataTree.selectNode(function (tree) {
                                    dataTree.cancelSelect(tree);
                                    return false;
                                });
                                if (res.data.status == 1) {
                                    var arr = []
                                    for (var i = 0, len = msgdata.length; i < len; i++) {
                                        arr.push(msgdata[i])
                                    }
                                    dataTree.selectNode(function (tree) {
                                        if (arr.indexOf(tree.id) > -1) {
                                            return true;
                                        }
                                        return false;
                                    });
                                }
                            }
                        })
                    })
                } else {
                    $http.get(showRoleNodeTree + newval[1]).then(function (res) {
                        getTreedata(res);
                        $("#treedata").css("width", 100 + '%')
                        //角色配置关闭图片
                        $($($($($(".l-tab-links").children()[2]).children()[0]).children()[0]).children()[0]).addClass("icon-remove")
                        //关闭配置,让右键菜单为空,显示和隐藏板块
                        $($(".cosl")[0]).on("click", function () {
                            //关闭配置,让右键菜单为空,显示和隐藏板块
                            rmenu_s = "null";
                            $($(".l-layout-center")[1]).css("display", "block")
                            $($($(".l-layout-center")[1])).children().attr("id", "framecenter")
                            $($(".l-layout-center")[0]).css("display", "none")
                            $($($(".l-layout-center")[0])).children().attr("id", "framecenter2")
                            //树图标变回来
                            $(".l-tree-icon-folder").removeClass("treeimg")
                            $(".l-tree-icon-folder-open").removeClass("treeimg")
                        })

                        $http.get(getAllRoleNodeIdsByOther + newval[1]).then(function (res) {
                            if (!!res.data.msg) {
                                var msgdata = res.data.msg.nodeIds;
                                dataTree.selectNode(function (tree) {
                                    dataTree.cancelSelect(tree);
                                    return false;
                                });
                                if (res.data.status == 1) {
                                    var arr = []
                                    for (var i = 0, len = msgdata.length; i < len; i++) {
                                        arr.push(msgdata[i])
                                    }
                                    dataTree.selectNode(function (tree) {
                                        if (arr.indexOf(tree.id) > -1) {
                                            return true;
                                        }
                                        return false;
                                    });
                                }
                            }
                        })
                    })
                }
            }
        })
    }
    //删除权限节点
    // $scope.zwqxrembtn = function(){
    //     var data  = {
    //         nodeName:$('.zwqxnodeName').val(),
    //         parentId:$scope.actionNode.data.id,
    //         url:'',
    //         isDelete:0
    //     }
    //     $http({
    //         method:'post',
    //         url:'http://192.168.0.121:20896/htNodeService/insertNode',
    //         data:data
    //     }).success(function(res){
    //         console.log(res)
    //     })
    // }

    var treeurl,
        savetree,
        roleid,
        posId,
        select


    $scope.toTree = function (msg) {
        $scope.$broadcast("PID", {
            pid: msg
        })
        $scope.$emit("news", {
            pid: msg
        })
    }
    $scope.toSend = function (msg) {
        $scope.$emit("yhqxTree", {
            msg: msg
        })
    }
    var toggle = $scope.toggle
    var selId = $scope.selId
    $scope.$watchGroup(["toggle", "selId"], function (newval, oldval) {
        if (newval === oldval) {
            return
        }
        if (newval[0] && newval !== oldval) {
            roleid = newval[1]
            select = true
            //点击组织，刷新权限树
            if ($scope.isadmin) { //如果是管理员
                $http.get(dataTreeUrl).then(function (res) {
                    getTreedata(res);
                    $("#treedata").css("width", 100 + '%')
                    //角色配置关闭图片
                    $($($($($(".l-tab-links").children()[2]).children()[0]).children()[0]).children()[0]).addClass("icon-remove")
                    //关闭配置,让右键菜单为空,显示和隐藏板块
                    $($(".cosl")[0]).on("click", function () {
                        //关闭配置,让右键菜单为空,显示和隐藏板块
                        rmenu_s = "null";
                        $($(".l-layout-center")[1]).css("display", "block")
                        $($($(".l-layout-center")[1])).children().attr("id", "framecenter")
                        $($(".l-layout-center")[0]).css("display", "none")
                        $($($(".l-layout-center")[0])).children().attr("id", "framecenter2")
                        //树图标变回来
                        $(".l-tree-icon-folder").removeClass("treeimg")
                        $(".l-tree-icon-folder-open").removeClass("treeimg")
                    })

                    $http.get(getAllRoleNodeIdsByOther + newval[1]).then(function (res) {
                        if (!!res.data.msg) {
                            var msgdata = res.data.msg.nodeIds;
                            dataTree.selectNode(function (tree) {
                                dataTree.cancelSelect(tree);
                                return false;
                            });
                            if (res.data.status == 1) {
                                var arr = []
                                for (var i = 0, len = msgdata.length; i < len; i++) {
                                    arr.push(msgdata[i])
                                }
                                dataTree.selectNode(function (tree) {
                                    if (arr.indexOf(tree.id) > -1) {
                                        return true;
                                    }
                                    return false;
                                });
                            }
                        }
                    })
                })
            } else {
                $http.get(showRoleNodeTree + newval[1]).then(function (res) {
                    getTreedata(res);
                    $("#treedata").css("width", 100 + '%')
                    //角色配置关闭图片
                    $($($($($(".l-tab-links").children()[2]).children()[0]).children()[0]).children()[0]).addClass("icon-remove")
                    //关闭配置,让右键菜单为空,显示和隐藏板块
                    $($(".cosl")[0]).on("click", function () {
                        //关闭配置,让右键菜单为空,显示和隐藏板块
                        rmenu_s = "null";
                        $($(".l-layout-center")[1]).css("display", "block")
                        $($($(".l-layout-center")[1])).children().attr("id", "framecenter")
                        $($(".l-layout-center")[0]).css("display", "none")
                        $($($(".l-layout-center")[0])).children().attr("id", "framecenter2")
                        //树图标变回来
                        $(".l-tree-icon-folder").removeClass("treeimg")
                        $(".l-tree-icon-folder-open").removeClass("treeimg")
                    })

                    $http.get(getAllRoleNodeIdsByOther + newval[1]).then(function (res) {
                        if (!!res.data.msg) {
                            var msgdata = res.data.msg.nodeIds;
                            dataTree.selectNode(function (tree) {
                                dataTree.cancelSelect(tree);
                                return false;
                            });
                            if (res.data.status == 1) {
                                var arr = []
                                for (var i = 0, len = msgdata.length; i < len; i++) {
                                    arr.push(msgdata[i])
                                }
                                dataTree.selectNode(function (tree) {
                                    if (arr.indexOf(tree.id) > -1) {
                                        return true;
                                    }
                                    return false;
                                });
                            }
                        }
                    })
                })
            }
        }
    })

    //默认模板

    //点击保存
    $scope.treeDataSave = function () {
        var arr = dataTree.getChecked();
        // 根据是否是管理员进行不同的请求发送
        if ($scope.isadmin && select) {   //是管理员且保存时选择了组织
            var subdata = {'roleid': roleid, "nodeIds": []};
            savetree = saveRoleNode
        } else if (!$scope.isadmin && select) { //不是管理员，选择了组织
            var subdata = {'roleid': roleid, "nodeIds": []};
            savetree = saveRoleNodeByOther
        } else {   //不是管理员，点击的是职位
            var subdata = {'posId': posId, "nodeIds": []};
            savetree = getUpdateOrDeleteNodeMenu
        }

        var ids = [];
        for (var i = 0; i < arr.length; i++) {
            ids.push(arr[i].data.id);
            subdata.nodeIds.push({"nodeId": arr[i].data.id});
        }
        if (subdata.nodeIds.length > 0) {
            $('.l-checkbox-incomplete').closest('li').each(function (o) {
                var tmpid = $(this).attr('id');
                if (tmpid > 0 && $.inArray(tmpid, ids) == -1) {
                    subdata.nodeIds.push({"nodeId": tmpid});
                }
            })
        }
        //保存的请求
        $http({
            method: 'post',
            // url: root_url + "/htPositionNodeService/getUpdateOrDeleteNodeMenu",
            url: savetree,
            data: subdata
        }).success(function (res) {
            alert(res.statusMsg);
            if (res.status == 0) {
                $scope.getRoleDes1();
            }
        })
    }
    //职位模板渲染方法
    $scope.getRoleDes1 = function () {
        $http.get(root_url + "/htNodeService/selectNodeMenuByPosId?posId=" + $rootScope.sId)
            .then(function (res) {
                //执行回调，向用户权限发送数据
                $rootScope.tosendnum += 1
                $scope.toSend(res.data.msg)
            })
    }

    //监听职位成员变化
    $scope.$watchGroup(["tog", "sId"], function (newval, oldval) {
        if (newval === oldval) {
            return
        }
        if (newval[0] && newval !== oldval) {
            savetree = getUpdateOrDeleteNodeMenu
            $scope.toTree(newval[1])
            //根据职位改变进行赋值
            select = false
            posId = newval[1]
            $http.get(getPowerMenu + newval[1]).then(function (res) {
                var msgdata = res.data.msg;
                dataTree.selectNode(function (tree) {
                    dataTree.cancelSelect(tree);
                    return false;
                });
                if (res.data.status == 1) {
                    var arr = []
                    for (var i = 0, len = msgdata.length; i < len; i++) {
                        arr.push(msgdata[i].nodeId)
                    }
                    dataTree.selectNode(function (tree) {
                        if (arr.indexOf(tree.id) > -1) {
                            return true;
                        }
                        return false;
                    });
                }
            })
        }
    })

//职位权限渲染树
    function getTreedata(data, parentIcon, childIcon) {
        var menu;
        var actionNode;

        function itemclick(item, i) {
            $('#zwqxmodal').modal({
                show: true
            })
        }

        menu = $.ligerMenu({
            top: 100, left: 100, width: 120, items: [
                {text: '增加', click: itemclick, icon: 'add'},
                {text: '修改',},
                {line: true},
                {text: '查看',}
            ]
        });
        window.dataTree = $("#treedata").ligerTree({
            data: data.data.msg,
            height: 50,
            isExpand: 4,
            textFieldName: 'text',
            autoCheckboxEven: "true",
            parentIcon: null,
            childIcon: null,
            isLeaf: function (item) {
                return !!item.isLeaf;
            },
            onContextmenu: function (node, e) {
                actionNode = node
                $scope.actionNode = node
                menu.show({top: e.pageY, left: e.pageX});
                return false;
            }
        })
    }
}])
//成员权限
app.controller("myusertree", ["$scope", "$rootScope", "$http", "dataId", function ($scope, $rootScope, $http, dataId) {
    var btnUserDel = document.getElementById("btnUserDel")
    //职位
    var jszwcontent = $('.i_jczw .m_content')
    var jscycontent = $('.i_jscy .content')
    //成员权限权限
    var memberrights = $("#memberrights")
    //记载动画
    var loadingbol = $('#loading')
    //每页数据数
    var itemsPerPage = 8
    //监听组织ID
    $scope.$on("toChildRoleid", function (ele, data) {
        $scope.roleid = data
    })
    //监听职位Id
    $scope.$on("tochild", function (ele, data) {
        $scope.pid = data.pid
    })
    //接收模太框传过来的count数据
    /*监听'组织','职位','成员'是否点击*/
    $scope.$watchGroup(['toggle', 'tog', 'usertoggle', 'roleid', 'pid', 'usertreeid'], function (newval, oldval) {
        if (newval === oldval) {
            return
        }
        // 判断组织是否点击
        if (newval[0]) {
            jszwcontent.show()
            //判断职位是否点击
            if (newval[1]) {
                jscycontent.show()
                //判断成员是否点击
                if (newval[2]) {
                    memberrights.show()
                } else {
                    memberrights.hide()
                }
            } else if (!newval[1]) {
                jscycontent.hide()
                memberrights.hide()
            }
        } else if (!newval[0]) {
            jszwcontent.hide()
            jscycontent.hide()
            memberrights.hide()
        }
    })
    $scope.$watchGroup(["roleid", "pid"], function (newval, oldval) {
        if (newval === oldval) {
            return
        }

        $http.get(htUserService + newval[1])
            .then(function (res) {
                $scope.usertree = res.data.msg.userList
            })
    })
    //接受来自moadlTree的回调数据
    $scope.$on("tonewuserT", function (ele, data) {
        $scope.usertree = data
    })
    $scope.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    }

    //点击成员
    $scope.onUserTree = function (sel, selected) {
        $scope.usertoggle = selected
        $scope.usertreeid = sel.uId
        if (selected) {
            //点击删除用户
            btnUserDel.onclick = function () {
                var uids = [{
                    uid: sel.uId
                }]
                $http({
                    method: 'post',
                    url: root_url + '/htUserService/getDelUserByIds',
                    data: JSON.stringify({"uids": uids})
                }).success(function (res) {
                    if (res.status == 0) {
                        $http.get(htUserService + $scope.sId.pid)
                            .then(function (res) {
                                $scope.usertree = res.data.msg.userList
                            })
                    }
                })
            }
            // memberrights.show()
        }
        $scope.$emit("toyhqxuId", sel.uId)
    }
    var Ubtnshenhe = document.getElementsByClassName('Ubtnshenhe')[0]
    $rootScope.pagenone = false
    /*用户管理分页*/
    //分页判断函数
    function countfun(count, limit) {
        var num = Math.ceil(count / limit)
        var sum = [], bol
        if (num < 6) {
            for (var i = 0; i < num; i++) {
                sum.push(i + 1)
            }
            bol = false
        } else {
            sum = [1, 2, 3, 4, 5]
            bol = true
        }
        return {
            "count": Math.ceil(count / limit),
            "sum": sum,
            "bol": bol,
            "activeNum": 1
        }
    }

    function modalPageBtn(num) {
        var sumEnd = $scope.modalpage.sum[$scope.modalpage.sum.length - 1]
        if (!!num) {
            $scope.modalpage.activeNum = num
        } else {
            if ($scope.modalpage.activeNum < $scope.modalpage.count) {
                $scope.modalpage.activeNum += 1
            }
            showPassApplyRoleUserByPagefun($scope.modalpage.activeNum, itemsPerPage)
        }
        if ($scope.modalpage.activeNum === sumEnd && $scope.modalpage.activeNum < ($scope.modalpage.count - 1)) {
            $scope.modalpage.sum = $scope.modalpage.sum.map(function (item) {
                return item + 1
            })
        }
    }

    //用户管理点击事件
    $scope.modalpaging = function () {

        $http.get(showPassApplyRoleUserByPage + 'role_id=' + $scope.selId + '&offset=' + 0 + '&limit=' + itemsPerPage).then(function (res) {
            loadingbol.show()
            if (res.data.status == '0') {
                loadingbol.hide()
                $rootScope.pagenone = false
                $scope.modaldata = res.data.msg.userList
                var pagecouont = res.data.msg.count
                $scope.modalpage = countfun(pagecouont, itemsPerPage)
            } else if (res.data.status == '1') {
                loadingbol.hide()
                $rootScope.pagenone = true
                $scope.modalpage = {}
                $scope.modaldata = []
            }
        })
    }
    //用户管理分页点击函数
    $scope.modalPageActive = function (num) {
        if (!!num) {
            showPassApplyRoleUserByPagefun(num, itemsPerPage)
        }
        modalPageBtn(num)
    }
    //用户管理执行函数
    function showPassApplyRoleUserByPagefun(num, itemsPerPage) {
        var n
        if (num === 0) {
            n = num * itemsPerPage
        } else {
            n = (num - 1) * itemsPerPage
        }
        loadingbol.show()
        $http.get(showPassApplyRoleUserByPage + 'role_id=' + $scope.selId + '&offset=' + n + '&limit=' + itemsPerPage).then(function (res) {
            if (res.data.status == '0') {
                $rootScope.pagenone = false
                loadingbol.hide()
                $scope.modaldata = res.data.msg.userList
            } else if (res.data.status == '1') {
                $rootScope.pagenone = true
                loadingbol.hide()
                $scope.modalpage = {}
                $scope.modaldata = []
            }
        })
    }


}])

//用户管理模态框
app.controller("modalTree", ["$timeout", "$scope", "$http", function ($timeout, $scope, $http) {
    //用户管理添加信用户表单
    var md_name = document.getElementById('md_name')
    var md_user = document.getElementById('md_user')
    var md_key = document.getElementById('md_key')
    var md_keys = document.getElementById('md_keys')
    var md_phone = document.getElementById('md_phone')
    var md_sex = document.getElementById('md_sex')
    var md_change = document.getElementById('md_change')
    //用户管理修改用户表单
    var mnu_name = document.getElementById('mnu_name')
    var mnu_user = document.getElementById('mnu_user')
    var mnu_key = document.getElementById('mnu_key')
    var mnu_keys = document.getElementById('mnu_keys')
    var mnu_phone = document.getElementById('mnu_phone')
    var mnu_sex = document.getElementById('mnu_sex')
    var mnu_change = document.getElementById('mnu_change')
    var oldmun_user = $('')
    //用户管理提交按钮
    var btnAddUser = $('#btnAddUser')

    //用户管理修改提交按钮
    var btnModifyU = $('#btnModifyU')
    // 监听职位ID
    $scope.$on("modalData", function (ele, data) {
        //post_id
        $scope.Jid = data.Jid
    })
    //posAssociatedMoreUsers  传参数据
    $scope.arr = []
    $scope.delarr = []
    //点击添加新用户
    btnAddUser.click(function () {
        var sex_value = md_sex.value == "男" ? 0 : 1;
        //将输入值传入data对象
        var data = {
            "username": md_user.value,
            "chinese_name": md_name.value,
            "sex": sex_value,
            "password": md_keys.value,
            "mobile": md_phone.value,
            "is_online": md_change.value
        }
        $http({
            method: 'post',
            url: root_url + '/htUserService/getAddUser',
            data: JSON.stringify(data)
        }).success(function (res) {
            if (res.status == 0) {
                $http.get(showPassApplyRoleUserByPage + 'role_id=' + $scope.selId + '&offset=' + 0 + '&limit=10').then(function (suc) {
                    btnAddUser.modal('hide');
                    $scope.modaldata = suc.data.msg.userList
                    $scope.modalcount = suc.data.msg.count
                })
                if (res.status == 1) {
                    btnAddUser.modal('hide');
                    alert('该账号已被注册请重新注册')
                }
            }
        })
    })
    // 点击修改用户
    btnModifyU.click(function () {
        var mnuobj = {
            "chinese_name": mnu_name.value,
            "sex": mnu_sex.value,
            "mobile": mnu_phone.value,
            "is_online": $scope.pdata.is_online,
            "uId": $scope.pdata.uId,
            "username": $scope.pdata.username
        }
        //判断用户是否被点击，如果被点击则请求数据
        if ($scope.alertbol) {
            $http({
                method: 'post',
                url: getUpdatadizhi,
                headers: {'Access-Control-Allow-Origin': '*'},
                data: JSON.stringify(mnuobj)
            }).success(function (res) {
                if (res.status == 1) {
                    $http.get(showPassApplyRoleUserByPage + 'role_id=' + $scope.selId + '&offset=' + 0 + '&limit=10').then(function (suc) {
                        btnAddUser.modal('hide');
                        $scope.modaldata = suc.data.msg.userList
                    })
                }
            })
        }

    })
    $scope.toUserP = function (msg) {
        $scope.$emit("newUserTree", msg)
    }
    //删除选中用户
    $scope.deluser = function (arr) {
        $http({
            method: 'post',
            url: root_url + '/htUserService/getDelUserByIds',
            data: JSON.stringify({"uids": $scope.delarr})
        }).success(function (res) {
            if (res.status == 0) {
                $http.get(showPassApplyRoleUserByPage + 'role_id=' + $scope.selId + '&offset=' + 0 + '&limit=10').then(function (suc) {
                    btnAddUser.modal('hide');
                    $scope.modaldata = suc.data.msg.userList
                    $scope.delarr = []
                })
            }
            if (res.status == 1) {
                alert('删除失败')
            }
        })
    }
    //点击向用户表单增加用户
    $scope.adduser = function (arr) {
        $http({
            method: 'post',
            url: posAssociatedMoreUsers,
            data: JSON.stringify({"user": $scope.arr})
        }).success(function (res) {
            if (res.msg == 'success') {
                $http.get(htUserService + $scope.Jid).then(function (data) {
                    $scope.toUserP(data.data.msg.userList)
                    $scope.arr = []
                })
            }
        })
    }
    $scope.sex = function (res) {
        return res == 0 ? '男' : '女'
    }

    var mnu_user = document.getElementById('mnu_user')
    //监听data.msg
    // $scope.$on("modalData",function (ele,data) {
    //     $scope.data = data.data.msg
    // })
    //全选按钮
    $scope.pick = function ($event) {
        var pick = $event.target.checked
        // $event.target.checked = !pick
        var inps = $('.pk_item')
        for (var i = 0, len = inps.length; i < len; i++) {
            inps[i].checked = pick
        }
    }
    //点击li 选中 复选框
    $scope.modalfn = function ($event, key, value, Jid) {
        mnu_user.value = value.username
        $scope.pdata = {
            "is_online": value.is_online,
            "uId": value.uId,
            "username": value.username
        }

        var bin = $('.pk_item')[key].checked
        $('.pk_item')[key].checked = !bin
        $scope.alertbol = $('.pk_item')[key].checked
        //删除用户参数
        var delobj = {
            uid: value.uId
        }
        //添加用户参数
        var obj = {
            userId: value.uId,
            posId: Jid
        }

        if ($('.pk_item')[key].checked) {
            $scope.arr.push(obj)
            $scope.delarr.push(delobj)
        }
        if (!$('.pk_item')[key].checked) {
            var arr = $scope.arr
            var delarr = $scope.delarr
            $scope.arr = arr.del(obj, 'userId')
            $scope.delarr = delarr.del(delobj, 'uid')
        }
    }
}])

//用户审核模太框
app.controller("reviewedTree", ["$timeout", "$scope", "$rootScope", "$http", function ($timeout, $scope, $rootScope, $http) {
    //记载动画
    var loadingbol = $('#loading')
    //每页数据数
    var itemsPerPage = 8

    function countfun(count, limit) {
        var num = Math.ceil(count / limit)
        var sum = [], bol
        if (num < 6) {
            for (var i = 0; i < num; i++) {
                sum.push(i + 1)
            }
            bol = false
        } else {
            sum = [1, 2, 3, 4, 5]
            bol = true
        }
        return {
            "count": Math.ceil(count / limit),
            "sum": sum,
            "bol": bol,
            "activeNum": 1
        }
    }

    //点击分页按钮动态改变函数
    function reviewedPageBtn(num) {
        var sumEnd = $scope.reviewed.sum[$scope.reviewed.sum.length - 1]
        if (!!num) {
            $scope.reviewed.activeNum = num
        } else {
            if ($scope.reviewed.activeNum < $scope.reviewed.count) {
                $scope.reviewed.activeNum += 1
            }
            showApplyRoleUserByPageFun($scope.reviewed.activeNum, itemsPerPage)
        }
        if ($scope.reviewed.activeNum === sumEnd && $scope.reviewed.activeNum < ($scope.reviewed.count - 1)) {
            $scope.reviewed.sum = $scope.reviewed.sum.map(function (item) {
                return item + 1
            })
        }
    }

    //分页点击函数
    $scope.reviewedPageActive = function (num) {
        if (!!num) {
            showApplyRoleUserByPageFun(num, itemsPerPage)
        }
        reviewedPageBtn(num)
    }
    //审核分页函数
    function showApplyRoleUserByPageFun(num, itemsPerPage) {
        var n
        if (num === 0) {
            n = num * itemsPerPage
        } else {
            n = (num - 1) * itemsPerPage
        }
        loadingbol.show()
        $scope.reviewdata = []
        $http.get(showApplyRoleUserByPage + 'role_id=' + $scope.selId + '&offset=' + n + '&limit=' + itemsPerPage).then(function (res) {
            if (res.data.status == '0') {
                $rootScope.pagenone = false
                loadingbol.hide()
                $scope.reviewdata = res.data.msg.userList
            } else if (res.data.status == '1') {
                $rootScope.pagenone = true
                loadingbol.hide()
                $scope.reviewdata = []
            }
        })
    }

    $scope.$on("modalData", function (ele, data) {
        //post_id
        $scope.Jid = data.Jid
    })

    //posAssociatedMoreUsers  传参数据
    $scope.reviewarr = []
    $scope.reviewdelarr = []

    $scope.toUserP = function (msg) {
        $scope.$emit("newUserTree", msg)
    }
    //通过待选中用户
    $scope.pass = function (arr) {
        $http({
            method: 'post',
            url: mostChangeApplyRoleUserStatus,
            data: {
                role_id: $scope.selId,
                user: $scope.reviewarr,
                ispass: 1
            }
        }).then(function (res) {
            if (res.data.msg == "success") {
                showApplyRoleUserByPageFun(0, itemsPerPage)
                $http.get(getApplyRoleUserCount + 'role_id=' + $scope.selId).then(function (suces) {
                    if (res.data.status == '0') {
                        $scope.reviewarr = []
                        var reviewedcount = suces.data.msg.count
                        $scope.reviewed = countfun(reviewedcount, itemsPerPage)
                        alert('通过')
                    } else if (res.data.status == '1') {

                    } else {
                        alert('未知错误,请重新进入页面!')
                    }
                })
            }
            if (res.data.msg == "error") {
                alert('请选择成员')
            }
        })
    }
    // 拒绝待审核用户
    $scope.refuse = function (arr) {
        alert('拒绝')
    }
    var mnu_user = document.getElementById('mnu_user')
    //监听data.msg
    // $scope.$on("modalData",function (ele,data) {
    //     $scope.data = data.data.msg
    // })
    //全选按钮
    $scope.pick = function ($event) {
        var pick = $event.target.checked
        // $event.target.checked = !pick
        var inps = $('.pk_item')
        for (var i = 0, len = inps.length; i < len; i++) {
            inps[i].checked = pick
        }
    }
    //点击li 选中 复选框
    $scope.reviewedfn = function ($event, key, value, Jid) {
        mnu_user.value = value.username
        var bin = $('.pk_item')[key].checked
        $('.pk_item')[key].checked = !bin
        $scope.alertbol = $('.pk_item')[key].checked
        var delobj = {
            userId: value.uId
        }
        //添加用户参数
        var obj = {
            userId: value.uId,
            posId: Jid
        }
        if ($('.pk_item')[key].checked) {
            $scope.reviewarr.push(obj)
            $scope.reviewdelarr.push({'userId': value.uId})
        }
        if (!$('.pk_item')[key].checked) {
            var arr = $scope.reviewarr
            var delarr = $scope.reviewdelarr
            $scope.reviewarr = arr.del(obj, 'userId')
            $scope.reviewdelarr = delarr.del(delobj, 'userId')
        }
    }
    //审核点击事件
    $rootScope.reviewpaging = function () {
        showApplyRoleUserByPageFun(0, itemsPerPage)
        $http.get(getApplyRoleUserCount + 'role_id=' + $scope.selId).then(function (res) {
            if (res.data.status == '0') {
                var reviewedcount = res.data.msg.count
                $scope.reviewed = countfun(reviewedcount, itemsPerPage)
            } else if (res.data.status == '1') {

            } else {
                alert('未知错误,请重新进入页面!')
            }
        })
    }
}])

//用户权限控制器
app.controller("sendTree", ["$scope", "$rootScope", "$http", "dataService", "saveTimes", function ($scope, $rootScope, $http, dataService, saveTimes) {
    $scope.arr = []
    $scope.formctrol = []
    var node_id = null
    var body = document.querySelector('body')
    //点击模太框隐藏
    $scope.datatg = function ($event) {
        var tagname = $event.target.id
        if (tagname === 'datamodal') {
            $('#databox').hide()
            $('body').css('overflow','auto')
            $('#datamodal').hide()
            $scope.arr = []
            $scope.formctrol = []
            var node_id = null
        }
    }
    var check = function (action, item) {
       if(action === 'add'){
           $scope.formctrol.push(item)
       }else if( action ==='remove'){
           for(var i=0;i<$scope.formctrol.length;i++){
               if($scope.formctrol[i].id===item.id){
                   $scope.formctrol.splice(i,1)
               }
           }
       }
    }

    function formatDateTime(data) {
        var y = data.getFullYear()
        var m = data.getMonth() + 1
        var d = data.getDate()
        var h = data.getHours()
        var minute = data.getMinutes()
        var second = data.getSeconds()
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }

    $scope.ischeck = function ($event, item) {
        var checkbox = $event.target
        var action = checkbox.checked?'add':'remove'
        check(action,item)
    }

    //权限保存
    $scope.sendtreedate = function(){
        $http({
            method:'post',
            url:'http://192.168.0.121:20896/htFormPermissionService/saveFormPermission',
            data:{
                userId:JSON.parse(localStorage.getItem('user')).id,
                formId:node_id,
                formctrol:$scope.formctrol
            }
        }).then(function(res){
            if(res.data.status == '1'){
               alert('设置成功')
                //如果保存成功,则重置选项
                $('#databox').hide()
                $('body').css('overflow','auto')
                $('#datamodal').hide()
                $scope.arr = []
                $scope.formctrol = []
                var node_id = null
        }
        })
    //     var data = {
    //         nodeId:$scope.nodeId,
    //         userId:$scope.userId,
    //         starttime:formatDateTime(saveTimes.starttimes),
    //         endtime:formatDateTime(saveTimes.endtimes)
    //     }
    //     $http({
    //         url:'insertNodeAndTime',
    //         method:'post',
    //         data:JSON.stringify(data)
    //     }).then(function(res){
    //         console.log(res)
    //     })

    }
    //成员权限权限
    var memberrights = $("#memberrights")
    $scope.$on("toyhqxTree", function (ele, data) {
        $scope.treemsg = data.msg
    })
    //监听组织ID
    $scope.$on('selId', function (ele, data) {
        $scope.roleid = data
    })
    //监听角色成员是否改变，如果改变，重新发送请求，渲染用户树
    $scope.$on("toyhqxMsg", function (ele, data) {
        $scope.userId = data
        $http.get(getNodeIdByRoleAndOther + "user_id=" + data + "&role_id=" + $scope.roleid).then(function (res) {
            var msgdata = res.data.msg;
            memberrightsTree.selectNode(function (tree) {
                memberrightsTree.cancelSelect(tree);
                return false;
            });
            if (res.data.status == 0) {
                memberrightsTree.selectNode(function (tree) {
                    if (msgdata.indexOf(tree.id) != -1) {
                        return true
                    }
                    return false;
                });
            }
        })
    })
    $scope.$watch("tosendnum", function (n, o) {
        if (n === o) {
            return
        }
        selectNodeMenuByPosId(sendsID)
    })
    var sendsID
    $scope.$watch("sId", function (newval, oldval) {
        if (newval === oldval) {
            return
        }
        sendsID = newval
        selectNodeMenuByPosId(newval)
    })
    var mydata
    var selectNodeMenuByPosId = function (pid) {
        $http.get(root_url + "/htNodeService/selectNodeMenuByPosId?posId=" + pid)
            .then(function (res) {
                if (res.data.status == 0) {
                    mydata = res.data.msg;
                }
                setUserRoleDes(mydata)
                memberrights.hide()
            })
    }
    //成员权限保存
    $scope.treeDataSave2 = function () {
        var arr = memberrightsTree.getChecked();
        /*用户ID userId ，组织IDroleid，选中的权限集合nodeIds*/
        var subdata = {"userid": $scope.userId, "roleid": $scope.roleid, "nodeIds": []};
        var ids = [];
        for (var i = 0; i < arr.length; i++) {
            ids.push(arr[i].data.id);
            subdata.nodeIds.push({"nodeId": arr[i].data.id});
        }
        if (subdata.nodeIds.length > 0) {
            $('.l-checkbox-incomplete').closest('li').each(function (o) {
                var tmpid = $(this).attr('id');
                if (tmpid > 0 && $.inArray(tmpid, ids) == -1) {
                    subdata.nodeIds.push({"nodeId": tmpid});
                }
            })
        }
        //内部递归函数
        $http({
            method: 'post',
            url: saveUserNodeByOther,
            data: subdata
        }).then(function (res) {
            alert(res.data.msg);
        })
    }
    //成员权限渲染树
    function setUserRoleDes(data) {
        window.memberrightsTree = $("#memberrights").ligerTree({
            parentIcon: null,
            childIcon: null,
            isExpand: 2,
            checkbox: true,
            data: data,
            onClick: function (node) {
                    var name = node.target.firstChild.className
                    $scope.nodeId = node.data.id
                    $http({
                        method: 'get',
                        url: getPageContent + node.data.id,
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then(function (res) {
                        if (res.data.status.indexOf('获取编辑页面成功') > -1) {
                            $scope.arr = []
                            arr(res.data.msg.data)
                            node_id = res.data.msg.node_id
                        }
                    })
                if (name.indexOf('l-selected') > 0) {
                    $('#databox').show()
                    $('body').css('overflow','hidden')
                    $('#datamodal').show()
                }
                //点击成员发送请求，获取时间权限
                // $http({
                //     method:'post',
                //     url:getTimeByNodeAndUser,
                //     data:{
                //         nodeId:node.data.id,
                //         userId:$scope.userId
                //     }
                // }).then(function(res){
                //     if(res.data.status === '0'){
                //         var starttime = res.data.msg.htUserNodeResult.starttime
                //         var endtime = res.data.msg.htUserNodeResult.endtime
                //         if(!!starttime){
                //             dataService.DATAstart = new Date(res.data.msg.htUserNodeResult.starttime)
                //         }else{
                //             dataService.DATAstart = new Date()
                //         }
                //         if(!!endtime){
                //             dataService.DATAend = new Date(res.data.msg.htUserNodeResult.endtime)
                //         }else {
                //             dataService.DATAend = new Date()
                //         }
                //     }
                // })
            }
        })
    }

    function arr(arr) {
        arr.forEach(function (item) {
            $scope.arr.push({
                id: item.id,
                title: !!item.title ? item.title : '未命名'
            })
        })
    }
}])

/*app.controller("startdata",["$scope","dataService","saveTimes",function($scope,dataService,saveTimes){
    $scope.dataService = dataService
    $scope.$watch('dataService',function(n,o){
        if(n === o){
            return
        }
        $scope.dat = n.DATAstart
    },true)
    // $scope.$watch('dat',function(n,v){
    //     if(n === v){
    //         return
    //     }
    //     dataService.DATAstart = n
    //     alert(dataService.DATAstart)
    // })
    // dataService.starttimes= $scope.dat
    // console.log(dataService.DATAstart)
    $scope.format = "yyyy/MM/dd";
    $scope.altInputFormats = ['yyyy/M!/d!'];
    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.$watch('dat',function(n,v){
        if(n === v){
            return
        }
        saveTimes.starttimes = n
    })
}])
app.controller("enddata",["$scope","dataService","saveTimes",function($scope,dataService,saveTimes){
    $scope.dataService = dataService
    $scope.$watch('dataService',function(n,o){
        if(n === o){
            return
        }
        $scope.dat = n.DATAend
    },true)
    // dataService.endtimes = $scope.dat
    // $scope.dat = dataService.DATAend;
    $scope.format = "yyyy/MM/dd";
    $scope.altInputFormats = ['yyyy/M!/d!'];
    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.$watch('dat',function(n,v){
        if(n === v){
            return
        }
        saveTimes.endtimes = n
    })
}])*/

//原生数组判断函数
Array.prototype.del = function (value, name) {
    var index = this.length;
    var deleindex = 0;
    for (var i = 0; i < index; i++) {
        if (this[i][name] === value[name]) deleindex = i;
    }
    this.splice(deleindex, 1);
    return this;
};
// document.oncontextmenu = function(){
//     event.returnValue = false;
// }

$('#addJob').on('shown.bs.modal', function (e) {
    $('#addJob input').focus(); //通过ID找到对应输入框，让其获得焦点
});
$('#modJob').on('shown.bs.modal', function (e) {
    $('#Jnewname').focus(); //通过ID找到对应输入框，让其获得焦点
});
$('#add').on('shown.bs.modal', function (e) {
    $('#bumenname').focus(); //通过ID找到对应输入框，让其获得焦点
});
$('#modify').on('shown.bs.modal', function (e) {
    $('#newname').focus(); //通过ID找到对应输入框，让其获得焦点
});
