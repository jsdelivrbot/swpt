/**
 * Created by Administrator on 2018/3/16.
 */

//获取服务器时间
var getCurrentDate = test_root_url+'/htUserNodeService/getCurrentDate?userId='
//获取用户权限
var getNodeContentByIdAndTime = test_root_url+'/htUserNodeService/getNodeContentByIdAndTime'
var isCreateRole= test_root_url+'/htRoleService/isCreateRole?user_id='
var buyRoleNode = root_url+'/htRoleNodeService/buyRoleNode'
// 根据节点来获取父节点集合和子节点集合
var getParentNodeListById = root_url+'/htNodeService/getParentNodeListById?id='
//保存该用户工作表
var saveNodeAssociateUserByChange = root_url+'/htUserNodeService/saveNodeAssociateUserByChange'
//主要用于组织已经购买界面的显示
var roleNodeList = root_url+'/htRoleNodeService/roleNodeList?uId='
// 查询用户所创建的组织（非树形结构显示）
var getRoleByUser = root_url+'/htRoleService/getRoleByUser?user_id='
//用于首页显示用户加入的组织
var getUserJoinRole = root_url+'/htRoleService/getUserJoinRole?uId='
//查询不同组织下用户的权限节点，这里是权限列表
var getNodeByRoleAndOther = root_url+'/htUserNodeService/getNodeByRoleAndOther?'
//判断用户是否为管理员
var isAdmin = root_url+'/htUserService/isAdmin?id='