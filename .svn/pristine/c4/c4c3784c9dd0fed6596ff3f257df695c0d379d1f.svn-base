/**
 * Created by Administrator on 2018/3/13.
 */
var app = angular.module('myApp',['ui.router'])
//总函数
app.controller('enterprise',['$scope','$http',function($scope,$http){
   // var loginpwd=window.prompt("输入[加入/创建新平台]使用密码：");
   // if(loginpwd!="5656")history.back();
    $scope.current = 1
    $scope.user = JSON.parse(localStorage.getItem('user'))
    $scope.Stay = function(){
        $('.success').css({
            'display':'none'
        })
    }
}])
// 加入组织
app.controller('addgroup',['$scope','$http',function($scope,$http){
    var role_id
    var input = $('.selectdiv input')
    $scope.personalName="";
    $scope.num = 0;
    $('#name').attr('value',$scope.user.username)
    //个人加入组织数据
    $scope.$on ('to-personal-id',function(d,data){
       /* $scope.personalName  = data.name
        personalRole_id = data.id
        $scope.$apply()*/
    })
    //点击加入组织数据
    $scope.$on ('to-group-id',function(d,data){
        $scope.groupName  = data.name
        groupRole_id = data.id
        $scope.$apply()
    })
    //接收被加入组织数据
    $scope.$on ('to-add-id',function(d,data){
        $scope.addName  = data.name
        addRole_id = data.id
        $scope.$apply()
    })
    //加入函数
    $scope.send = function(){
        if($scope.num === 0){
            if($scope.personalName==''||$scope.personalName==undefined){
                alert('请输入想要加入的组织CODE');
                return false;
            }else{
                $http({
                    method: 'GET',
                    url:userJoinRole+'code=' + $scope.personalName + '&user_id=' + $scope.user.id
                })
                    .then(function (res) {
                        if (res.data.status === '200') {
                            $scope.personalName = ''
                            alert(res.data.statusMsg)
                        }else{
                            alert(res.data.statusMsg);
                        }
                    })
            }
            /*if(!personalRole_id){
                alert('请选择想要加入的组织')
            }else{
                console.log('加入按钮（加入组织）URL接口：'+userJoinRole+'role_id=' + personalRole_id + '&user_id=' + $scope.user.id);
                $http({
                    method: 'GET',
                    url:userJoinRole+'role_id=' + personalRole_id + '&user_id=' + $scope.user.id
                })
                    .then(function (res) {
                        if (res.data.status === '0') {
                            $scope.personalName = ''
                            alert(res.data.statusMsg)
                        }
                    })
            }*/
        }else if($scope.num === 1){
            if(!addRole_id){
                alert('请选择想要加入的组织')
            }else if(!groupRole_id){
                alert('请选择当前组织')
            }else{
                $http({
                    method: 'GET',
                    url:roleAddRole+'croleid='+groupRole_id + '&froleid='+addRole_id+'&uid='+$scope.user.id
                })
                    .then(function (res) {
                        $scope.groupName = ''
                        $scope.addName = ''
                        alert(res.data.statusMsg)
                    })
            }
        }
    }
    $(document).click(function(e){
        var e = window.event || e
        var ele = $(e.srcElement || e.target)
        if(!$(ele).is('#grouptext,#grouptext *,#addtext,#addtext *,#presenttext,#presenttext *')){
            if(document.getElementsByClassName('groupbox')[0].style.height !== '0'){
                document.getElementsByClassName('groupbox')[0].style.height = '0'
                document.getElementsByClassName('groupbox')[0].style.border = '0'
            }
            if(document.getElementsByClassName('groupbox')[2].style.height !== '0'){
                document.getElementsByClassName('groupbox')[2].style.height = '0'
                document.getElementsByClassName('groupbox')[2].style.border = '0'
            }
            if(document.getElementsByClassName('groupbox')[1].style.height !== '0'){
                document.getElementsByClassName('groupbox')[1].style.height = '0'
                document.getElementsByClassName('groupbox')[1].style.border = '0'
            }
        }
    })
    input[$scope.num].checked = true
    $scope.selected =function (num) {
        $scope.num = num
        input[$scope.num].checked = true
        if($scope.num === 0){
            $('.detailsbox').css({
                'transform':'translateX(0)'
            })
        }else if($scope.num === 1){
            $('.detailsbox').css({
                'transform':'translateX(-50%)'
            })
        }
    }
}])
/*创建组织*/
app.controller('creatgroup',['$scope','$http',function($scope,$http){
       var arr = ['教师','成员','家长']

    //http://1388w.cn:20896/htRoleService/addRoleChildNodeAndUser?rolename=%E8%80%81%E6%9C%B1%E9%83%A8%E9%97%A8&user_id=521&description=%E8%80%81%E6%9C%B1%E7%BB%84&role_id=0
    //http://1388w.cn:20896/htRoleService/getAddRolePosName?posName=%E6%95%99%E5%B8%88&role_id=1199
    //http://1388w.cn:20896/htRoleService/getAddRolePosName?posName=%E6%88%90%E5%91%98&role_id=1199
    //http://1388w.cn:20896/htRoleService/getAddRolePosName?posName=%E5%AE%B6%E9%95%BF&role_id=1199
       $('#groupAccount').attr('value',$scope.user.username)
       $scope.creat = function(){
           var newusername=$('#groupName').val();
           if(newusername==''){
               alert("没有填写组织名称");
               return false;
           }
           $http.get(addRoleChildNodeAndUser+'rolename='+newusername+'&user_id='+$scope.user.id+'&description='+$('#groupDescribe').val()+'&role_id=0').then(function(res){
               if(res.data.status == '200'){
                   /*arr.forEach(function(item){

           console.log("创建按钮（创建组织）URL接口："+addRoleChildNodeAndUser+'rolename='+$('#groupName').val()+'&user_id='+$scope.user.id+'&description='+$('#groupDescribe').val()+'&role_id=0');
           $http.get(addRoleChildNodeAndUser+'rolename='+$('#groupName').val()+'&user_id='+$scope.user.id+'&description='+$('#groupDescribe').val()+'&role_id=0').then(function(res){
               if(res.data.status === '1'){
                   arr.forEach(function(item){
                       $http.get(getAddRoleNode + "posName=" + item + "&role_id=" + res.data.msg.id)
                           .then(function (res) {
                           })
                   })*/
                   $('#groupName').val('')
                   $('#groupDescribe').val('');
                   window.location.href="../workbench/workbenchs.html";
                   /*$('.success').css({
                       'display':"block"
                   })*/
               }else{
                   alert(res.data.statusMsg);
               }

           })
       }
}])


app.directive('activenode',function(){
    return {
        restrict:'AE',
        link:function(scope,element,attrs,transclude){
            $(element).bind('click',function(){
                document.getElementsByClassName('groupbox')[0].style.height = '200px'
                document.getElementsByClassName('groupbox')[0].style.border = '1px solid #dedede'
            });
        }
    }
})
app.directive('activeadd',function(){
    return {
        restrict:'AE',
        link:function(scope,element,attrs,transclude){
            $(element).bind('click',function(){
                document.getElementsByClassName('groupbox')[2].style.height = '200px'
                document.getElementsByClassName('groupbox')[2].style.border = '1px solid #dedede'
            });
        }
    }
})
app.directive('activegroup',function(){
    return {
        restrict:'AE',
        link:function(scope,element,attrs,transclude){
            $(element).bind('click',function(){
                document.getElementsByClassName('groupbox')[1].style.height = '200px'
                document.getElementsByClassName('groupbox')[1].style.border = '1px solid #dedede'
                
            });
        }
    }
})

app.directive('activeTree',function($http){
    return {
        restrict:'AE',
        link:function(scope,element,attrs,transclude){
            console.log("组织（个人加入）加载URL接口："+getSearchInfoRole);
            $http.get(getSearchInfoRole).then(function(res){
                if(res.data.status === '1') {
                    scope.data = res.data.msg
                    $("#dirtree").ligerTree({
                        data:scope.data,
                        textFieldName:'name',
                        checkbox: false,
                        parentIcon: null,
                        childIcon: null,
                        isExpand:1,
                        onSelect: function (node)
                        {
                            if (!node.data.name) {
                                return
                            };
                            //处理导航树的点击事件TODO
                            scope.$emit('to-personal-id',node.data)
                            document.getElementsByClassName('groupbox')[0].style.height = '0'
                            document.getElementsByClassName('groupbox')[0].style.border = '0'
                        }
                    })
                    $("#addtree").ligerTree({
                        data:scope.data,
                        textFieldName:'name',
                        checkbox: false,
                        parentIcon: null,
                        childIcon: null,
                        isExpand:1,
                        onSelect: function (node)
                        {
                            if (!node.data.name) {
                                return
                            };
                            //处理导航树的点击事件TODO
                            scope.$emit('to-add-id',node.data)
                            document.getElementsByClassName('groupbox')[2].style.height = '0'
                            document.getElementsByClassName('groupbox')[2].style.border = '0'
                        }
                    })
                }
            }).then(function(err){

            })
            console.log("当前组织（组织加入）加载URL接口："+getRoleTreeByUser+scope.user.id);
            $http.get(getRoleTreeByUser+scope.user.id).then(function(res){
                if(res.data.statusMsg === 'success'){
                    var data = res.data.msg
                    $("#grouptree").ligerTree({
                        data:data,
                        textFieldName:'name',
                        checkbox: false,
                        parentIcon: null,
                        childIcon: null,
                        isExpand:1,
                        onSelect: function (node)
                        {
                            if (!node.data.name) {
                                return
                            };
                            //处理导航树的点击事件TODO
                            scope.$emit('to-group-id',node.data)
                            document.getElementsByClassName('groupbox')[1].style.height = '0'
                            document.getElementsByClassName('groupbox')[1].style.border = '0'
                        }
                    })
                }
            })
        }
    }
})