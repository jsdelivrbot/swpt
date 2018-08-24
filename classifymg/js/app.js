var app=angular.module('swclassifymg',[
	"ui.router"
])
.config(["$stateProvider",'$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('start');
    $stateProvider
        .state('start', {
            url: '/start',
            views: {
                'home': {
                    templateUrl: './tpl/start.html',
                    controller: 'start'
                }
            }
        }).state('test', {
        url: '/test',
        views: {
            'home': {
                templateUrl: './tpl/test.html',
                controller: 'test'
            }
        }
    })
}]).controller('start',["$scope","$http",function($scope,$http){
    //var DEFAULT_URL = 'http://192.168.0.213:20890/';
    $scope.editId=null;
    $scope.alldata=[];
    $scope.jobList=[{id:0,name:"请选择组织机构"}];
    $scope.roleList=[{pos_id:0,posName:"请选择职位"}];
    $scope.nodeinfo='';
    $scope.classPid=0;
    $scope.currNode=null;
    $scope.curJobId=0;
    $scope.curRoleId=0;

    var manager=null;
    var treedata=[];
    var grid=null;

    $scope.user=null;
    try{
        $scope.user=window.localStorage['user']?JSON.parse(window.localStorage['user']):null;
    }catch (e) {
        alert("你还没有登录");
        return false;
    }
    function itemclick(item)
    {
        $scope.nodeinfo='';
        $scope.editId=null;
        $scope.classPid=0;
        if($scope.currNode!=null){
            $scope.curJobId=$scope.currNode.jobId;
            $scope.curRoleId=$scope.currNode.roleId;
            setRoleSelect();
        }
        $('#addroolclass').modal('show');
    }
    function itemDel(item)
    {
        if($scope.currNode==null){
            alert("点击选择删除分类");
            return false;
        }
        $.ligerDialog.confirm('确定删除'+$scope.currNode.name+'?', function (yes) {
            if(yes){
                $http.get(DEFAULT_URL + 'pageDesignOperatorFacade/delCascadeClassifyRecord?id='+$scope.currNode.id).then(function (res) {
                    if (res.data.status == '200') {
                        $.ligerDialog.success("删除成功");
                        $scope.currNode=null;
                        setGrid();
                    }else{
                    }
                });
            }
        });
    }
    function itemEdit(item)
    {
        if($scope.currNode==null){
            alert("点击选择修改分类");
            return false;
        }
        $scope.editId=$scope.currNode.id;
        $scope.nodeinfo=$scope.currNode.name;
        $scope.classPid=$scope.currNode.parentId;
        $scope.curJobId=$scope.currNode.jobId;
        $scope.curRoleId=$scope.currNode.roleId;
        $scope.$apply();
        $('#addroolclass').modal('show');
    }
    function doJob(arr){
        for(var i=0;i<arr.length;i++){
            $scope.jobList.push({id:arr[i].id,name:arr[i].name});
            if(arr[i].children.length>0){
                doJob(arr[i].children);
            }
        }
    }


    function setRoleSelect(){
        $http.get(root_url + '/htRoleService/getRolePosName?role_id='+$scope.curJobId).then(function (res) {
            var tmp={pos_id:0,posName:"请选择职位"};
            if(res.data.position.length>0){
                //$scope.curRoleId=res.data.position[0].pos_id;
                res.data.position.push(tmp);
                console.log(res.data.position);
                $scope.roleList=res.data.position;

                //$scope.$apply();
                console.log($scope.roleList);
                //$scope.roleList=res.data.position;
            }else{
                $scope.roleList=[tmp];
            }

        });
    }
    function setJobSelect(){
        $http.get(root_url+'/htRoleService/getRoleTreeByUser?user_id='+$scope.user.id).then(function (res) {
            if (res.data.status == '1') {
                if(res.data.msg.length>0){
                    //$scope.curJobId=res.data.msg[0].id;
                    doJob(res.data.msg);
                    //$scope.jobList=res.data.msg;
                    //setRoleSelect();
                }
            }else{
            }
        });
    }
    $scope.setRoleInfo=function (jobid) {
        
    }
    var classifylist=[];
    function doClassifyArry(arr){
        for(var i=0;i<arr.length;i++){
            classifylist.push({"id":arr[i].id,"jobId":arr[i].jobId,"name":arr[i].name,"parentId":arr[i].parentId,"roleId":arr[i].roleId});
            if(arr[i].children.length>0)doClassifyArry(arr[i].children);
        }
    }
    function setGrid(){
        /*var griddata={Rows:[],Total: 0};
        grid = $("#lists").ligerGrid({
            height:'100%',
            columns: [
                { display: 'ID', name: 'id', align: 'left', width: 120, minWidth: 100 },
                { display: 'PID', name: 'parentId', width: 120, minWidth: 120 },
                { display: '分类名', name: 'name', minWidth: 140 }
            ], data:griddata, pageSize:50 ,rownumbers:true,width: '99%',allowUnSelectRow:true,
            onSelectRow: function (data, rowindex, rowobj)
            {
                $scope.currNode=data;
            },
            onUnSelectRow: function (data, rowindex, rowobj)
            {
                $scope.currNode=null;
            },toolbar: { items: [
                    { text: '增加', click: itemclick, icon: 'add' },
                    { text: '修改', click: itemEdit, icon: 'edit' },
                    { line: true },
                    { text: '删除', click: itemDel, img: '../public/part/ligerlib/ligerUI/skins/icons/delete.gif' }
                ]
            }
        });*/
        $http.get(DEFAULT_URL + 'pageDesignQueryFacade/getAllCascadeClassify?uId='+$scope.user.id).then(function (res) {
            var griddata=null;
            if (res.data.status == '200') {
                $scope.alldata=[{id:0,parentId:0,name:'根节点'}].concat(res.data.msg);

                //manager.setData(res.data.msg);
                classifylist=[];
                doClassifyArry(res.data.msg);
                griddata={Rows:classifylist,Total: classifylist.length};

            }else{
                griddata={Rows:[],Total:0};
            }
            grid = $("#lists").ligerGrid({
                height:'100%',
                columns: [
                    { display: 'ID', name: 'id', align: 'left', width: 120, minWidth: 100 },
                    { display: 'PID', name: 'parentId', width: 120, minWidth: 120 },
                    { display: '分类名', name: 'name', minWidth: 140 }
                ], data:griddata, pageSize:50 ,rownumbers:true,width: '99%',allowUnSelectRow:true,
                onSelectRow: function (data, rowindex, rowobj)
                {
                    $scope.currNode=data;
                },
                onUnSelectRow: function (data, rowindex, rowobj)
                {
                    $scope.currNode=null;
                },toolbar: { items: [
                        { text: '增加', click: itemclick, icon: 'add' },
                        { text: '修改', click: itemEdit, icon: 'edit' },
                        { line: true },
                        { text: '删除', click: itemDel, img: '../public/part/ligerlib/ligerUI/skins/icons/delete.gif' }
                    ]
                }
            });
        });
    }
    setJobSelect();
    setGrid();

    //设置分页
    $scope.setList=function(page){

    }
    $scope.addRoot=function () {
        $scope.nodeinfo='';
        $scope.editId=null;
        $scope.classPid=0;
        $('#addroolclass').modal('show');
    }

    $scope.btnSaveEditClass=function () {
        var formData={id:$scope.editId,parentId:$scope.classPid,name: $scope.nodeinfo,jobId:$scope.curJobId,roleId:$scope.curRoleId};
        $.ajax({
            url: DEFAULT_URL + 'pageDesignOperatorFacade/updateCascadeClassifyRecord',
            method: "POST",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(formData),
            success: function ( res ) {
                if(res.status=="200") {
                    setGrid();
                    $scope.currNode=null;
                    alert(res.statusMsg);
                    $('#addroolclass').modal('hide');
                }else{
                    alert(res.statusMsg);
                }
            }
        });
    }

    $scope.btnSaveClass=function () {
        if($scope.nodeinfo==''){
            alert("分类名不能为空");
            return false;
        }
        var formData=null;
        formData={ parentId:$scope.classPid,name: $scope.nodeinfo,jobId:$scope.curJobId,roleId:$scope.curRoleId};
        $.ajax({
            url: DEFAULT_URL + 'pageDesignOperatorFacade/addCascadeClassifyRecord',
            method: "POST",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(formData),
            success: function ( res ) {
                if(res.status=="200") {
                    //nodes.push({id:res.msg, parentId:node.data.id,name: $scope.nodeinfo });
                    //manager.append(node.target, nodes);
                    setGrid();
                    $scope.currNode=null;
                    alert(res.statusMsg);
                    $('#addroolclass').modal('hide');
                }else{
                    alert(res.statusMsg);
                }
            }
        });

    }
    $scope.$watch('curJobId', function(n, o){
        if(n==0){
            $scope.curRoleId=0;
            $scope.roleList=[{pos_id:0,posName:"请选择职位"}];
            return false;
        }
        if(n!=o)setRoleSelect();

    })


    }]).controller('test',["$scope","$http",function($scope,$http){



}]).run(['$http',function($http){
        // $http.post(accountQuery_root_url + "/accountQuery/getPhone",{});$
}]);