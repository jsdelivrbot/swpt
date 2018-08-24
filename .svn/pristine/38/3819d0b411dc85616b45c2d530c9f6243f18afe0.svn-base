/**
 * Created by Administrator on 2018/5/3.
 */

//var localHost = window.location.host;
var localHost = "1388w.cn";
var u = 'http://' + localHost + ':8081';
var d = 'http://' + localHost + ':20896';
var a = 'http://' + localHost + ':20896';
var s = 'http://' + localHost + ':20890';
//百度编辑器表单
/*template*/
var getPageContent = s + "/pageDesignQueryFacade/getPageContent?id=",
    nodeId = s + '/nodeQueryFacade/getByNodeName?nodeId=',
    insertFormRecord =  'http://192.168.0.192:20890/pageDesignOperatorFacade/insertFormRecord',
    getStartFormAndStartProcess = u + '/rapid_dev/getStartFormAndStartProcess.do',
    createSession = u + '/rapid_dev/createSession.do?',
    //流程查看
    activitiTrack = u + '/rapid_dev/activitiTrack.do?processInstanceId=',
    //流程表分页
    processList = u + '/rapid_dev/processList.do?',
    /*详情页*/
    selectUserById = a+'/htUserService/selectUserById?uid='
/*myinitiator*/
//待审核分页
findMyApplyProc = u + '/rapid_dev/findMyApplyProc.do?',
//去百度编辑器查找详情页
    selectFormRecord = s + '/pageDesignOperatorFacade/selectFormRecord',
    /*任务催办*/
    proinsid = u + '/rapid_dev/findRemind.do?proinsid=',
    remindFirstApply = u + '/rapid_dev/remindFirstApply.do?',
    /*我的审核*/
    findTask = u + '/rapid_dev/findTask.do?',
    completeTask = u + '/rapid_dev/completeTask.do',
    //已审核分页
    hisTaskByPage = u + '/rapid_dev/hisTaskByPage.do?',
    findStartVariableContrl = u + '/rapid_dev/findStartVariableContrl.do?processInstanceId=',
    //根据用户电话查询用户信息
    getUserByUsername = u + '/htUserService/getUserByUsername?username=',
    withdraw = 'http://192.168.0.251:8081/rapid_dev/withdraw.do?processInstanceId=',
    /*加入党组织*/
    getRoleByUser = a + '/htRoleService/getRoleByUser?user_id=',
    /*//申请加入组织*/
    //根据组织码查询组织
    getRoleByCodeId = a + '/htRoleService/getRoleByCodeId?codeId=',
    userJoinRole = a + '/htRoleService/userJoinRole?',
    //用户加入的组织
    getUserJoinRole = a + '/htRoleService/getUserJoinRole?uId=',
    // 跟距用户电话查询用户信息
    getUserByUsername = a + '/htUserService/getUserByUsername?username=',
    //根据用户Id查询自己创建组织接口
    getRoleTreeByUser = a + '/htRoleService/getRoleTreeByUser?user_id=',
    // 根据组织role_id查询组织下的职位
    getRolePosName = a + '/htRoleService/getRolePosName?role_id=',
    //党建的，职位的申请加入
    joinPosForDjApply = d + '/htPostionService/joinPosForDjApply?',
//党建的，邀请加入
    invitePosForDj = d + '/htPostionService/invitePosForDj?',
//党建的，邀请列表展示,展示没有撤回的，并且没有通过的
    showInvitePosForDj = d + '/htPostionService/showInvitePosForDj?',
    //党建的，邀请撤回
    invitePosForDjBack = d+'/htPostionService/invitePosForDjBack?id=',
//党建的，查看别人邀请我，列表展示
    showInvitePosForDjForMe = d+'/htPostionService/showInvitePosForDjForMe?',
	//党建的，查看别人邀请我，接受加入
showInvitePosForDjForMeToAccept = d+'/htPostionService/showInvitePosForDjForMeToAccept?id=',
    //党建的，邀请列表展示,这个是根据职位的id下，并不是所有的
showInvitePosForDjByPosId =  d + '/htPostionService/showInvitePosForDjByPosId?',
    //职位下已通过组织人员
    showApplyPosUserByPageByPass =a + '/htPostionService/showApplyPosUserByPageByPass?posId=',
    //党建的，查看我加入的
    showPosForDjForMe = d+'/htPostionService/showPosForDjForMe?',
    //党建的，职位的申请加入展示（状态isPass 为1是通过的，0是待审核的）
    showJoinPosForDjApply =  d+'/htPostionService/showJoinPosForDjApply?',
//党建的，别人的申请加入的同意
    passPosForDjApply = d+'/htPostionService/passPosForDjApply?id=',
//党建的，查看我的在申请列表,或者已经同意的，0为在申请，1为同意的
    showPosForDjMyApply = d+'/htPostionService/showPosForDjMyApply?',
    //查询用户数据
getUserById = a+'/htUserService/getUserById?id=',
//获取用户上级组织
getParentRole = d+'/htPostionService/getParentRole?uId=',
    //获取用户本身组织
getCurrentRole = d+'/htPostionService/getCurrentRole?uId=',
    //获取用户本的顶级组织
getTopicRole = d+'/htPostionService/getTopicRole?uId=',
    //获取用户本身组织的上级组织和管理员的的uid集合（多个组织的管理员）
    getParentRoleAndAdminList= d+'/htPostionService/getParentRoleAndAdminList?uId='
