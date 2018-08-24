/**
 * Created by Administrator on 2018/3/16.
 */
var test_root_url = root_url
console.log(test_root_url+'/htUserNodeService/getCurrentDate?userId=')
//获取服务器时间
var getCurrentDate = test_root_url+'/htUserNodeService/getCurrentDate?userId='
//获取用户权限
var getNodeContentByIdAndTime = test_root_url+'/htUserNodeService/getNodeContentByIdAndTime'
var isCreateRole= test_root_url+'/htRoleService/isCreateRole?user_id='
var buyRoleNode = test_root_url+'/htRoleNodeService/buyRoleNode'
// 根据节点来获取父节点集合和子节点集合
var getParentNodeListById = test_root_url+'/htNodeService/getParentNodeListById?id='
//保存该用户工作表
var saveNodeAssociateUserByChange = test_root_url+'/htUserNodeService/saveNodeAssociateUserByChange'
// 购买，这里是多个组织累加的
var buyRoleNodeAdd = test_root_url+'/htRoleNodeService/buyRoleNodeAdd'
// 判断是否已经购买
var isBuy = test_root_url+'/htRoleNodeService/isBuy?'
//主要用于组织已经购买界面的显示
var roleNodeList = test_root_url+'/htRoleNodeService/roleNodeList?uId='