/**
 * Created by Administrator on 2018/1/28.
 */
//http://1388w.cn
var root_url=test_root_url;
//根据用户ID，获取组织
var getSearchInfoRole = test_root_url+'/htRoleService/getRoleTreeByUser?user_id='
//点击不同组织，刷新相应的权限树
var showRoleNodeTree = root_url+'/htRoleNodeService/showRoleNodeTree?roleId='
//组织授权保存
var saveRoleNode = test_root_url+'/htRoleNodeService/saveRoleNode'
//判断用户是否为管理员
var isAdmin = test_root_url+'/htUserService/isAdmin?id='
// 组织权限打钩：
// var getAllRoleNodeIds = test_root_url +'/htRoleNodeService/getAllRoleNodeIds?roleId='
// 不是管理员组织授权保存：
var saveRoleNodeByOther = test_root_url +'/htRoleNodeService/saveRoleNodeByOther'
// 查询不是管理员勾选的nodeid集合
var getAllRoleNodeIdsByOther = test_root_url+'/htRoleNodeService/getAllRoleNodeIdsByOther?roleId='
// 保存组织 用户权限：
var saveUserNodeByOther = test_root_url+'/htUserNodeService/saveUserNodeByOther'
//时间权限保存
 var insertNodeAndTime = test_root_url+'/htUserNodeService/insertNodeAndTime'
//用户打钩权限保存
var saveNodeAssociateUserByChange = root_url + "/htUserNodeService/saveNodeAssociateUserByChange"
//点击成员发送请求，获取时间权限
var getTimeByNodeAndUser = test_root_url + '/htUserNodeService/getTimeByNodeAndUser'
// 获取组织下用户权限节点集合：
var getNodeIdByRoleAndOther =  test_root_url + '/htUserNodeService/getNodeIdByRoleAndOther?'
// 分页查询组织下的用户：
var  showApplyRoleUserByPage = test_root_url+'/htRoleService/showApplyRoleUserByPage?'
// 组织用户总数目接口：
var getApplyRoleUserCount = test_root_url+ '/htRoleService/getApplyRoleUserCount?'
// 批量组织审核通过接口：
var mostChangeApplyRoleUserStatus = test_root_url+'/htRoleService/mostChangeApplyRoleUserStatus'
// 通过的审核的用户管理：
var showPassApplyRoleUserByPage = test_root_url+'/htRoleService/showPassApplyRoleUserByPage?'

// 管理员 分页查看所有用户的分页显示：
var getAllUserByPage = test_root_url+'/htUserService/getAllUserByPage?'
// 获取组织码：
var getCodeById = test_root_url+'/htRoleService/getCodeById?roleId='
// -------------部门机构--------------
//创建组织
var addRoleChildNodeAndUser =test_root_url + '/htRoleService/addRoleChildNodeAndUser?'
// var addRoleChildNodeAndUser ='http://192.168.0.121:20896/htRoleService/addRoleChildNodeAndUser?'
//部门机构上拉地址
var getUpRoleMenudizhi = root_url + "/htRoleService/getUpRoleMenu"
//部门机构下移地址
var getDownRoleMenudizhi = root_url + "/htRoleService/getDownRoleMenu"
// 角色权限树渲染地址
//var dataTreeUrl = root_url+"/htFormService/getFormMenu?pid=0"
var dataTreeUrl = root_url + "/htNodeService/getNodeMenu"
// var dataTreeUrl = root_url + "/htPermissionService/getPermissionMenu"
//部门机构树地址
// var getSearchInfoRole = root_url + "/htRoleService/getSearchInfoRole"
//根据选择的部门id,显示权限
var getPowerMenu = root_url + "/htPositionNodeService/getNodeIdByPosId?posId="

// var getPowerMenu = root_url + "/htPositionPermissionService/getPermissionIdByPosId?posId="
//-----------职位模块----------
//添加多个职位 地址
var getAddRoleNode = root_url + "/htRoleService/getAddRolePosName?"
// var getAddRoleNode = "http://192.168.0.121:20896/htRoleService/getAddRolePosName?"
//职位修改地址
var getUpdatePositionDizhi = root_url + "/htRoleService/getUpdateRolePosName?"
//职位删除地址
var getDelRolePositionDizhi = root_url + "/htRoleService/getDelRolePosition?"
//获取职位信息
var getRolePosNameDizhi = root_url + "/htRoleService/getRolePosName?"
//根据选择的职位,显示对应的用户成员 地址
// var htUserService = root_url + "/htUserService/selectUserByPostionId?posId="
var htUserService = root_url+'/htPostionService/showApplyPosUserByPageByPass?posId='
var getUpdateOrDeleteNodeMenu =root_url+'/htPositionNodeService/getUpdateOrDeleteNodeMenu'
var posAssociatedMoreUsers = root_url+'/htPostionService/posAssociatedMoreUsers'
//----------角色成员---------用户模块------
//查询成员地址
var getHtUserNamedizhi = root_url + "/htRoleService/getHtUserName?role_id="
//查询全部用户地址
var getSearchUser = root_url + "/htUserService/getSearchUser"
//添加用户地址
var getAddRoleUser = root_url + "/htRoleService/getAddRoleUser?"
//修改用户地址
var getUpdatadizhi = root_url + "/htUserService/getUpdateUser"
//新增用户地址
var getAddUserdizhi = root_url + "/htUserService/getAddUser"
//从用户表删除用户信息地址
var getDelUserdizhi = root_url + "/htUserService/getDelUser?uId="
//用户删除地址
var delroleUserId = root_url + "/htRoleService/getDeleteUser?"
//根据选择的职位id 查询出当前职位没有的用户成员表
var SeCurrentPosId = root_url + "/htUserService/selectUserNotAssociatedCurrentPosId?posId="


//添加子节点  地址
var getAddRoleChildNode = root_url + "/htRoleService/getAddRoleChildNode?"
//添加兄弟节点 地址
var getAddBrotherNode = root_url + "/htRoleService/getAddRoleNode?"
//修改节点  地址
var getUpdateRoleNode = root_url + "/htRoleService/getUpdateRoleNode?"
//删除节点 地址
var getDeleteRoleNode = root_url + "/htRoleService/getDeleteRoleNode?"
//用户帐号,用户名列表 地址
var getSearchUser = root_url + "/htUserService/getSearchUser";
//添加角色成员 地址
var getAddRoleUser = root_url + "/htRoleService/getAddRoleUser?"

//读取百度编辑器表单的组件

var getPageContent = 'http://192.168.0.192:20890/pageDesignQueryFacade/getPageContent?id='
//保存用户的表单控件的权限
var saveFormPermission = '192.168.0.121:20896/htFormPermissionService/saveFormPermission'

//arr转为json
function jsonARR(msg){
    var str =  JSON.stringify(msg)
    return str
}
$( document ).ready( function () {
    if (JSON.parse(localStorage.getItem('user')) != null) {
        $.ajaxSetup({
            aysnc: true,
            type: 'post',
            //发送请求前触发
            beforeSend: function (XMLHttpRequest) {
                //可以设置自定义标头
                var sessionid = JSON.parse(localStorage.getItem('user')).jsessionid;
                XMLHttpRequest.setRequestHeader( 'jsessionid', sessionid );
            },
        })
    }
})
