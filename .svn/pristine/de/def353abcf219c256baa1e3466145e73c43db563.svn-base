var tab = null;
var tab2 = null;
var accordion = null;
var tree = null;
var tabItems = [];
var ddd, rmenu_id, rmenu_ti, cu_tabid;
var mgtab2 = null;
var parentName = null;
//树
var power_tree = null;
var itemNodeId;
var itemParentNodeId;
var itemNodeName;

var actionCustomerID; //左键点击角色,当前的id
var _actionCustomerID;
var judge = true;

var actionParm; //  右键点击 当前的节点
var actionPID; //右键点击,当前节点的父节点id
var actionName; //右键点击,当前节点的名字
var actionRemark; //右键点击,当前节点的描述
var actionRowIndex; //右键点击,当前节点的索引
var maingrid = null;
var g = null;
//请求地址
var getUrl = "./data_json/bumenTree.json"
var ediPparentNodeDialog;
var editParentNodeTree;
var editParentNodeTreeId;

var UserService; //职位id当前的用户成员数据
var posId; //当前选择职位的id
var role_user = null; //当前选择的角色用户ID
var memberrightsTree; //成员树
var power_json = null;
var menu_power_node = null;

// -------------部门机构--------------
//部门机构上拉地址
var getUpRoleMenudizhi = root_url + "/htRoleService/getUpRoleMenu"
//部门机构下移地址
var getDownRoleMenudizhi = root_url + "/htRoleService/getDownRoleMenu"
// 角色权限树渲染地址
//var dataTreeUrl = root_url+"/htFormService/getFormMenu?pid=0"
var dataTreeUrl = root_url + "/htNodeService/getNodeMenu"
//部门机构树地址
var getSearchInfoRole = root_url + "/htRoleService/getSearchInfoRole"
//根据选择的部门id,显示权限
var getPowerMenu = root_url + "/htPositionNodeService/getNodeIdByPosId?posId="


//-----------职位模块----------
//添加多个职位 地址
var getAddRoleNode = root_url + "/htRoleService/getAddRolePosName?"
//职位修改地址
var getUpdatePositionDizhi = root_url + "/htRoleService/getUpdateRolePosName?"
//职位删除地址
var getDelRolePositionDizhi = root_url + "/htRoleService/getDelRolePosition?"
//获取职位信息
var getRolePosNameDizhi = root_url + "/htRoleService/getRolePosName?"
//根据选择的职位,显示对应的用户成员 地址
var htUserService = root_url + "/htUserService/selectUserByPostionId?posId="



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


//权限树渲染方法
function getTreedata( data, parentIcon, childIcon ) {
    console.log(data.msg)
    window.dataTree = $( "#treedata" ).ligerTree( {
        data: data.msg,
        height: 50,
        textFieldName: 'text',
        autoCheckboxEven: "true",
        parentIcon: null,
        childIcon: null,
        isLeaf: function ( item ) {
            return !!item.isLeaf;
        },
    } )
}
//职位模版渲染方法
function getPosition( nodeCustomerID ) {
    $.ajax( {
        type: "GET",
        url: getRolePosNameDizhi + "role_id=" + nodeCustomerID,
        success: function ( data ) {
            var datas = {
                'Rows': data.position
            }
            window.positionGrid = $( "#positionData" ).ligerGrid( {
                height: '100%',
                width: "100%",
                columns: [ {
                    display: "职位",
                    name: 'posName',
                    align: 'left',
                }, ],
                data: datas,
                pageSize: 20,
                toolbar: {
                    items: [ {
                        text: '增加',
                        click: AddRole,
                        icon: 'add'
                    },
                        {
                            line: true
                        },
                        {
                            text: '修改',
                            click: getUpdatePosition,
                            icon: 'modify'
                        },
                        {
                            line: true
                        },
                        {
                            text: '删除',
                            click: getDelRolePosition,
                            img: '../public/part/ligerlib/ligerUI/skins/icons/delete.gif'
                        }
                    ]
                },
                autoFilter: true,
                onSelectRow: function ( rowdata, rowid, rowobj ) {
                    posId = rowdata.pos_id;
                    //点击部门机构树,显示权限,勾选中
                    $.ajax( {
                        type: "GET",
                        url: getPowerMenu + posId,
                        success: function ( data ) {
                            var msgdata = data.msg;
                            dataTree.selectNode( function ( tree ) {
                                dataTree.cancelSelect( tree );
                                return false;
                            } );
                            if ( data.status == 1 ) {
                                dataTree.selectNode( function ( tree ) {
                                    for ( var i in msgdata ) {
                                        if ( msgdata[ i ].nodeId == tree.id ) {
                                            return true;
                                        }
                                    }
                                    return false;
                                } );
                            }
                        }
                    } )
                    //先写定数据
                    // posId = 2;
                    getMembersRoleGird_02( posId )
                    getRoleDes()
                }
            } );
            $( "#pageloading" ).hide();
        }
    } )
}
//添加多个职位
function AddRole() {
    //$( "#editNodeName" ).val( actionName )
    add = $.ligerDialog.open( {
        left: '38%',
        top: '35%',
        target: $( "#addNode" ),
        title: "添加职位",
        buttons: [ {
            text: "添加",
            onclick: AddInfo
        }, {
            text: "取消",
            onclick: cancel
        } ]
    } );
}
//添加多个职位
function AddInfo() {
    $.ajax( {
        type: "GET",
        url: getAddRoleNode + "posName=" + $( "#addNodePresentation" ).val() + "&role_id=" + actionCustomerID,
        success: function ( data ) {
            //调用方法重新渲染
            $( "#addNodePresentation" ).val('')
            getPosition( actionCustomerID )
            add.hidden()
        }
    } )
}

function getUpdatePosition() { //职位修改方法
    var roleInfo = positionGrid.getSelectedRow();
    if ( roleInfo !=null ) {
        //弹出面板
        $( "#editNodeName" ).val( roleInfo.posName );
        getUp = $.ligerDialog.open( {
            left: '38%',
            top: '35%',
            target: $( "#editNode" ),
            title: "编辑职位",
            buttons: [ {
                text: "修改",
                onclick: getUpdateClick
            }, {
                text: "取消",
                onclick: cancel
            } ]
        } );
        //职位修改方法
        function getUpdateClick() {
            $.ajax( {
                type: "GET",
                url: getUpdatePositionDizhi + "posName=" + $( "#editNodePresentation" ).val() + "&pos_id=" + roleInfo.pos_id,
                success: function ( data ) {
                    console.log(data);
                    getUp.hidden()
                    $( "#editNodePresentation" ).val( '' );
                    getPosition( actionCustomerID )
                }
            } )
        }
    }

}
//职位删除
function getDelRolePosition( i ) {
    var roleDelInfo = positionGrid.getSelectedRow()
    if ( roleDelInfo != null ) {
        var getDel = $.ligerDialog.open( {
            left: '38%',
            top: '35%',
            // title: "删除节点：" + "部门:" + actionName + "    职位:" + roleDelInfo.posName,
            title: "删除职位:" + roleDelInfo.posName,
            buttons: [ {
                text: "删除",
                onclick: getDelRoleClick
            }, {
                text: "取消",
                onclick: cancel
            } ]
        } );
        //职位删除方法
        function getDelRoleClick() {
            $.ajax( {
                type: "GET",
                url: getDelRolePositionDizhi + "pos_id=" + roleDelInfo.pos_id,
                success: function ( data ) {
                    getDel.hidden()
                    positionGrid.deleteSelectedRow();
                }
            } )
        }
    }
}

//隐藏弹出输入面板
function cancel( item, i ) {
    i.hidden();
}



//用户成员渲染方法--默认根据选择部门渲染
function getMembersRoleGird( nodeCustomerID ) {
    $.ajax( {
        type: "GET",
        url: getHtUserNamedizhi + nodeCustomerID,
        success: function ( data ) {
            var MembersRoleData = {
                'Rows': data.msg.roleUser
            }
            window.MembersRoleGird = $( "#MembersRole" ).ligerGrid( {
                height: '100%',
                width: 250,
                columns: [ {
                    display: "用户名",
                    name: 'chinese_name',
                    align: 'left',
                    maxWidth: 250
                    },
                    {
                        display: "姓名",
                        name: 'username',
                        align: 'left',
                        maxWidth: 250
                    } ],
                data: MembersRoleData,
                onSelectRow: function ( rowdata, rowid, rowobj ) {
                    role_user = rowdata.uId;
                    console.log( 'role_user:' + role_user );
                    setUserRoleDes();
                    //newPowerTree(role_user);
                },
                toolbar: {
                    items: [
                        {
                            text: '删除',
                            click: DelMembersRole,
                            img: '../public/part/ligerlib/ligerUI/skins/icons/delete.gif'
                        }
                    ]
                }
            } );
            $( "#pageloading" ).hide();
        }
    } )
}
//获取角色权限
function getRoleDes() {
    $.ajax( {
        type: "GET",
        url: root_url + "/htNodeService/selectNodeMenuByPosId?posId=" + posId,
        success: function ( dt ) {
            var mydata = [];
            if ( dt.status == 0 ) {
                mydata = dt.msg;
            }
            memberrightsTree = $( "#memberrights" ).ligerTree( {
                parentIcon: null,
                childIcon: null,
                checkbox: true,
                data: mydata,
                onClick: function(node) {
                    //console.log(node.data.id)
                    if (node.data.text == "网络硬盘" || ( node.data.id > 217 && node.data.id < 239 && node.data.id != 233 ) ) {
                        $( '.biaodan' ).fadeIn();
                        $( '#ifms' ).contents().find( '#label' )
                            .html('<input name="" type="checkbox" value="view" id="view_result">'+node.data.text)
                    }
                }
            } );
            memberrightsTree.selectNode( function ( tree ) {
                memberrightsTree.cancelSelect( tree );
                return false;
            } );
            if ( dt.status == 0 ) {
                memberrightsTree.selectNode( function ( tree ) {
                    return true;
                } );
            }
        }
    } )
}
//获取部门机构
function newPowerTree(obj) {
    var fromdefine = $( '#ifms' ).contents().find( '.fromdefine' );
    fromdefine.empty();
    $.ajax( {
        type: "GET",
        //url: getSearchInfoRole,
        success: function (data) {
           /* var newdata = obj.data.children;
            var len = newdata.length;
            for(var i = 0; i < len; i++){
                fromdefine.append( "<option value='" +newdata[i].name+ "'>" +newdata[i].name+ "</option>" )
            }*/
        }
    } )
}
//用户详细权限
function setUserRoleDes() {
    console.log( root_url + "/htPowerUserService/getFormIdByPosIdOrUserId?user_id=" + role_user + "&pos_id=" + posId );
    //选择用户,显示权限,勾选中
    $.ajax( {
        type: "GET",
        url: root_url + "/htUserNodeService/getNodeIdByPosIdOrUserId?user_id=" + role_user + "&pos_id=" + posId,
        success: function ( data ) {
            var msgdata = data.msg;
            //console.log(msgdata)
            memberrightsTree.selectNode( function ( tree ) {
                memberrightsTree.cancelSelect( tree );
                return false;
            } );
            if ( data.status == 0 ) {
                memberrightsTree.selectNode( function ( tree ) {
                    /*for (var i in msgdata) {
                     if (msgdata[i].form_id == tree.id) {
                     return true;
                     }
                     }*/
                    if ( $.inArray( tree.id, msgdata ) != -1 ) {
                        return true;
                    }
                    return false;
                } );
            }
        }
    } )
}
//用户成员渲染方法2 根据选择职位的id渲染对应的成员
function getMembersRoleGird_02( posId ) {
    $.ajax( {
        type: "GET",
        url: htUserService + posId,
        success: function ( data ) {
            if ( data.status == 0 ) {
                UserService = data.msg;
            } else {
                UserService = null;
            }
            var MembersRoleData = {
                'Rows': UserService
            }
            window.MembersRoleGird = $( "#MembersRole" ).ligerGrid( {
                height: '100%',
                width: '100%',
                columns: [ {
                    display: "用户名",
                    name: 'chinese_name',
                    align: 'left',
                    maxWidth: '50%'
                },
                    {
                        display: "姓名",
                        name: 'username',
                        align: 'left',
                        maxWidth: '50%'
                    }, ],
                data: MembersRoleData,
                pageSize: 20,
                //isScroll: false,
                allowAdjustColWidth: false,
                onSelectRow: function ( rowdata, rowid, rowobj ) {
                    role_user = rowdata.uId;
                    //console.log( 'role_user:' + role_user );
                    setUserRoleDes();
                },
                toolbar: {
                    items: [
                        {
                            text: '删除',
                            click: DelMembersRole,
                            img: '../public/part/ligerlib/ligerUI/skins/icons/delete.gif'
                        }
                    ]
                }
            } );
            $( "#pageloading" ).hide();
        }
    } )

}
//用户删除方法
function DelMembersRole() {
    var MembersRoleInfo = MembersRoleGird.getSelectedRow();
    if ( MembersRoleInfo.uId == undefined || MembersRoleInfo.uId < 1 ) {
        return false;
    }
    $.ajax( {
        type: "POST",
        url: root_url + "/htUserService/getDelUserByIds",
        data: JSON.stringify( { "uids": [ { "uid": MembersRoleInfo.uId } ] } ),
        contentType: "application/json",
        async: false,
        success: function ( data ) {
            //g.deleteSelectedRow();
            getMembersRoleGird_02( posId );
        }
    } )
    /* var  MembersRoleInfo = MembersRoleGird.getSelectedRow();
     $.ajax({
     type: "GET",
     url: delroleUserId + "roleUserId=" + MembersRoleInfo.uId,
     success: function (data) {
     //成功后重新渲染
     getMembersRoleGird_02(posId);
     }
     })*/

}
//点管理按钮,显示
$( document ).ready( function () {
    $( ".yg" ).on( "click", function () {
        //判断有没有点击职位,如果没有就停止执行
        if ( posId == undefined ) { return }
        $( '.show_yg' ).fadeIn();
        $( ".show_ys" ).fadeOut();
        maingridReload();
        function maingridReload() {
            $.ajax( {
                type: "get",
                url: SeCurrentPosId + posId,
                async: true,
                success( data ) {
                    var CustomersData = data.msg;
                    window[ 'g' ] = $( "#maingrid" ).ligerGrid( {
                        height: '100%',
                        columns: [ {
                            display: '用户',
                            name: 'username',
                            align: 'left',
                            width: 100,
                            minWidth: 60
                        },
                            {
                                display: '姓名',
                                name: 'chinese_name',
                                minWidth: 120
                            },
                            {
                                display: '性别',
                                name: 'sex',
                                render: function ( data ) {
                                    if ( data.sex == '0' ) {
                                        return "男";
                                    } else {
                                        return "女";
                                    }
                                },
                                minWidth: 140
                            },
                            {
                                display: '手机',
                                name: 'mobile',
                                minWidth: 140
                            },
                            {
                                display: '注册时间',
                                name: 'reg_data',
                                minWidth: 140
                            },
                            {
                                display: '状态',
                                name: 'is_online',
                                minWidth: 140
                            }
                        ],
                        data: {
                            Rows: CustomersData
                        },
                        pageSize: 30,
                        rownumbers: true,
                        checkbox: true,
                        toolbar: {
                            items: [ {
                                text: '添加新用户',
                                click: getAddUserclick,
                                icon: 'add'
                            },
                                {
                                    line: true
                                },
                                /*{
                                 text: '审核',
                                 click: setUserPass,
                                 icon: 'add'
                                 },
                                 {
                                 line: true
                                 },*/
                                {
                                    text: '修改',
                                    click: getUpdateclick,
                                    icon: 'modify'
                                },
                                {
                                    line: true
                                },
                                {
                                    text: '删除',
                                    click: getDelUserclick,
                                    img: '../public/part/ligerlib/ligerUI/skins/icons/delete.gif'
                                },
                                {
                                    line: true
                                },
                                {
                                    text: '增加到',
                                    click: itemclick,
                                    icon: 'add'
                                },
                                {
                                    line: true
                                }
                            ]
                        }
                    } );
                }
            } );
        }

        //添加用户
        function itemclick( item ) {
            if ( !posId ) return false;
            var rowdataArray = g.getSelectedRows();
            if ( rowdataArray.length === 0 ) return false;
            var userdata = [];
            for ( var i = 0; len = rowdataArray.length, i < len; i++ ) {
                userdata.push( {
                    "userId": rowdataArray[ i ].uId,
                    "posId": posId
                } );
            }
            /*str = str.substring(0, str.lastIndexOf(","))*/
            $.ajax( {
                url: root_url + "/htPostionService/posAssociatedMoreUsers",
                type: "POST",
                data: JSON.stringify( { "user": userdata } ),
                contentType: "application/json",
                async: false,
                success: function ( data ) {
                    console.log(data);
                    if ( data.status == 0 ) {
                        //添加用户成功之后重新渲染模版
                        getMembersRoleGird_02( posId );
                        alert( "增加成功" );
                        g.deleteSelectedRow();
                    }
                    if ( data.status == 1 ) {
                        alert( data.msg )
                    }
                }
            } );

        }
        //---------------修改用户
        //修改用户
        function getUpdateclick() {
            var getUpdateInfo = g.getSelectedRow();
            if ( getUpdateInfo == null ) return false;
            var modif = $.ligerDialog.open( {
                left: '38%',
                top: '35%',
                target: $( "#getUpdate" ),
                title: "修改用户" + getUpdateInfo.username,
                buttons: [ {
                    text: "修改",
                    onclick: getUpdate
                }, {
                    text: "取消",
                    onclick: cancel
                } ]
            } );
            //为弹出层填充信息
            $( "#getUpdateuserName" ).val( getUpdateInfo.username )
            $( "#getUpdateName" ).val( getUpdateInfo.chinese_name )
            $( "#getUpdateMobile" ).val( getUpdateInfo.mobile )
            var sex = getUpdateInfo.sex == 0 ? "男" : "女";
            $( "#getUpdateSex" ).val( sex )
            //点击修改按钮,调用getUpdate()
            function getUpdate() {
                var sexNow = $( "#getUpdateSex" ).val() == "男" ? "0" : "1";
                $.ajax( {
                    type: "POST",
                    url: getUpdatadizhi,
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    contentType: "application/json",
                    data: JSON.stringify( {
                        "username": getUpdateInfo.username,
                        "chinese_name": $( "#getUpdateName" ).val(),
                        "sex": sexNow,
                        "mobile": $( "#getUpdateMobile" ).val(),
                        "is_online": getUpdateInfo.is_online,
                        "uId": getUpdateInfo.uId
                    } ),
                    success: function ( data ) {
                        //更新一行
                        /*var selected = g.getSelected();
                        g.updateRow( selected, {
                            username: getUpdateInfo.username,
                            chinese_name: $( "#getUpdateName" ).val(),
                            sex: $( "#getUpdateSex" ).val(),
                            mobile: $( "#getUpdateMobile" ).val(),
                        } );*/
                        maingridReload();
                        modif.hidden()
                    }
                } )
            }
        }
        //-------------------------新增用户

        //新增用户弹出层
        function getAddUserclick() {
            adduser = $.ligerDialog.open( {
                left: '38%',
                top: '35%',
                target: $( "#getAddUser" ),
                title: "新增用户",
                buttons: [ {
                    text: "新增",
                    onclick: getaddClick
                }, {
                    text: "取消",
                    onclick: cancel
                } ]
            } );
        }
        //新增用户数据
        function getaddClick() {
            var sexnow = $( "#getAddUserSex" ).val() == "男" ? "0" : "1";
            var pwd = $( "#getAddUserpwd" ).val();
            var rpwd = $( "#getAddUserrpwd" ).val();
            if ( pwd == '' || pwd != rpwd ) {
                alert( "二次输出密码不一致" );
                return false;
            }
            if ( posId < 1 ) {
                alert( "没有选择角色" );
                return false;
            }
            $.ajax( {
                type: "POST",
                url: root_url + '/htUserService/getAddUser',
                contentType: "application/json",
                data: JSON.stringify( {
                    // "posId": posId,
                    "username": $( "#getAddUseruserName" ).val(),
                    "chinese_name": $( "#getAddUserName" ).val(),
                    "sex": sexnow,
                    "password": pwd,
                    "mobile": $( "#getAddUserMobile" ).val(),
                    "is_online": $( "#getAddUserOnline" ).val()
                } ),
                success: function ( data ) {
                    //console.log( data );
                    //完成后,添加一行
                    /*var managerrow = $("#maingrid").ligerGetGridManager();
                    managerrow.addRow({*/
                    //console.log(g)
                    /*g.addRow({
                        username: $("#getAddUseruserName").val(),
                        chinese_name: $("#getAddUserName").val(),
                        reg_data: data.msg.reg_data,
                        sex: $("#getAddUserSex").val(),
                        mobile: $("#getAddUserMobile").val(),
                        is_online: $("#getAddUserOnline").val(),
                    });*/
                    maingridReload();
                    adduser.hidden();
                    $( "#getAddUseruserName" ).val( '' )
                    $( "#getAddUserName" ).val( '' )
                    $( "#getAddUserpwd" ).val( '' )
                    $( "#getAddUserrpwd" ).val( '' )
                    $( "#getAddUserMobile" ).val( '' )
                    $( "#getAddUserSex" ).val( '' )
                    $( "#getAddUserOnline" ).val( '' )
                }
            } )
        }

        //删除选中用户
        function getDelUserclick() {
            var getDelUserArray = g.getSelectedRows();
            console.log( getDelUserArray );
            var userdata = [];
            for ( var i = 0; len = getDelUserArray.length, i < len; i++ ) {
                userdata.push( {
                    "uid": getDelUserArray[ i ].uId
                } );
            }
            $.ajax( {
                type: "POST",
                url: root_url + "/htUserService/getDelUserByIds",
                data: JSON.stringify( { "uids": userdata } ),
                contentType: "application/json",
                async: true,
                success: function ( data ) {
                    g.deleteSelectedRow();
                    //g.reRender();
                }
            } )
        }
    } )
    //点击审核,显示
    $( ".ys" ).on( "click", function () {
        $( ".show_yg" ).fadeOut();
        $( ".show_ys" ).fadeIn();
        $.ajax( {
            type: "get",
            url: SeCurrentPosId + posId,
            async: true,
            success( data ) {
                var CustomersData = data.msg;
                window[ 'ueg' ] = $( "#user_examine_grid" ).ligerGrid( {
                    height: '100%',
                    columns: [ {
                        display: '用户',
                        name: 'username',
                        align: 'left',
                        width: 100,
                        minWidth: 60
                    },
                        {
                            display: '姓名',
                            name: 'chinese_name',
                            minWidth: 120
                        },
                        {
                            display: '性别',
                            name: 'sex',
                            render: function ( data ) {
                                if ( data.sex == '0' ) {
                                    return "男";
                                } else {
                                    return "女";
                                }
                            },
                            minWidth: 140
                        },
                        {
                            display: '手机',
                            name: 'mobile',
                            minWidth: 140
                        },
                        {
                            display: '申请时间',
                            name: 'reg_data',
                            minWidth: 140
                        },
                        {
                            display: '状态',
                            name: 'is_online',
                            minWidth: 140
                        }
                    ],
                    data: {
                        Rows: CustomersData
                    },
                    pageSize: 30,
                    rownumbers: true,
                    checkbox: true,
                    toolbar: {
                        items: [
                            {
                                text: '通过',
                                click: setUserPass,
                                icon: 'add'
                            },
                            {
                                text: '拒绝',
                                click: setUserRefuse,
                                icon: 'add'
                            }
                        ]
                    }
                } );
            }
        } );
    } )

    function setUserPass() {
        if ( !posId ) return false;
        var rowdataArray = ueg.getSelectedRows();
        var userdata = [];
        for ( var i = 0; len = rowdataArray.length, i < len; i++ ) {
            userdata.push( {
                "userId": rowdataArray[ i ].uId,
                "posId": posId
            } );
        }
        console.log( "通过用户审核" );
        console.log( userdata );
        /*$.ajax({
         url: root_url + "/htPostionService/posAssociatedMoreUsers",
         type: "POST",
         data:JSON.stringify({"user":userdata}),
         contentType:"application/json",
         async: false,
         success: function (data) {
         if (data.status == 0) {
         //添加用户成功之后重新渲染模版
         getMembersRoleGird_02(posId);
         alert("增加成功");
         g.deleteSelectedRow();
         }
         if (data.status == 1) {
         alert(data.msg)
         }
         }
         });*/
    }

    function setUserRefuse() {
        if ( !posId ) return false;
        var rowdataArray = ueg.getSelectedRows();
        var userdata = [];
        for ( var i = 0; len = rowdataArray.length, i < len; i++ ) {
            userdata.push( {
                "userId": rowdataArray[ i ].uId,
                "posId": posId
            } );
        }
        console.log( "拒绝用户审核" );
        console.log( userdata );
        /*$.ajax({
         url: root_url + "/htPostionService/posAssociatedMoreUsers",
         type: "POST",
         data:JSON.stringify({"user":userdata}),
         contentType:"application/json",
         async: false,
         success: function (data) {
         if (data.status == 0) {
         //添加用户成功之后重新渲染模版
         getMembersRoleGird_02(posId);
         alert("增加成功");
         g.deleteSelectedRow();
         }
         if (data.status == 1) {
         alert(data.msg)
         }
         }
         });*/
    }
    //用户审核/管理 / 关闭按钮
    $( ".colsout" ).on( "click", function () {
        $( ".show_in" ).fadeOut()
    } )

} );


$( function () {
    //左边的主要菜单
    $( "#tab1" ).ligerTab();
    //右边的主要菜单
    $( "#tab2" ).ligerTab();
    mgtab2 = $( "#tab2" ).ligerGetTabManager();
    //布局
    $( "#layout1" ).ligerLayout( {
        leftWidth: 200,
        height: '100%',
        heightDiff: -5,
        space: 4,
        onHeightChanged: f_heightChanged,
        isLeftCollapse: false
    } );

    //右边布局
    $( "#layout2" ).ligerLayout( {
        leftWidth: 200,
        height: '100%',
        heightDiff: -5,
        space: 4,
        onHeightChanged: f_heightChanged,
        isLeftCollapse: true
    } );
    var height = $( ".l-layout-center" ).height();
    /*$( $( ".l-layout-header-inner" )[ 0 ] ).append(
        "<a target='_self' id='website' style='margin-left: 10px;'>成员设置</a>" )*/

    $( "#tab1 #toobar" ).ligerGrid( {
        toolbar: {
            items: [ {
                text: '增加',
                click: addChildNode,
                icon: 'add',
            },
                {
                    line: true
                },
                {
                    text: '修改',
                    click: editBrotherNode,
                    icon: 'modify',
                },
                {
                    line: true
                },
                {
                    text: '删除',
                    click: deleteNode,
                    img: '../public/part/ligerlib/ligerUI/skins/icons/delete.gif'
                }
            ]
        },
        usePager: false,
        isScroll: false,
        headerRowHeight: 0,
        rowHeight: 0,
    });
    //树渲染-----------------------------------------


    //部门机构树渲染
    $.ajax( {
        url: getSearchInfoRole,
        type: "GET",
        success: function ( data ) {
            if ( data.msg == "error" ) return false;
            // 角色窗口关闭图标
            $( $( $( $( ".l-tab-links" ).children()[ 2 ] ).children()[ 0 ] ).children()[ 0 ] ).append(
                "<span class='icon-remove cosl' style='position:relative;right:-32px;top:-2px;'></span>" )
            var Objdata = power_json = data.msg;
 console.log(Objdata.name)
            window.power_tree = $( "#power_tree" ).ligerTree( {
                textFieldName: 'name',
                nodeWidth: 200,
                data: Objdata,
                isExpand: 1,
                parentIcon: null,
                childIcon: null,
                onClick: function ( node ) {
                    if ( rmenu_s == null ) {
                        f_addTab( node.data.id, node.data.name, encodeURI( './workbench_news?type=dep&id=' +
                            node.data.id ) );
                        // return false;
                    }
                    //第二次渲染,获取最新数据
                    nodeCustomerID = node.data.id; //当前节点的id
                    nodeID = node.data.parentId; //当前节点的父节点id
                    nodeName = node.data.name; //当前节点的名字
                    nodeRemark = node.data.remark; //当前节点的描述

                    //角色职位需要的数据
                    actionName = node.data.name
                    actionRemark = node.data.remark;
                    actionCustomerID = node.data.id;
                    var nodedata = {
                        "id": nodeCustomerID,
                        "name": nodeName,
                        "remark": nodeRemark,
                        "parentId": nodeID
                    }
                    //judge = false;
                    itemdata = JSON.stringify( nodedata )
                    //设置缓存
                    localStorage.setItem( "remark", itemdata )
                    //atrtemplate模板数据 -- 职位
                    getPosition( nodeCustomerID )
                    // //角色成员模版方法调用
                    // getMembersRoleGird(nodeCustomerID)
                    //center内容区
                    var tabid = $( node.target ).attr( "tabid" );
                    if ( !tabid ) {
                        tabid = new Date().getTime();
                        $( node.target ).attr( "tabid", tabid )
                    }
                    //判断如果右键菜单存在,就是配置状态,tab不用
                    if ( rmenu_s == "null" ) {
                        if ( node.isonclick ) {
                            f_addTab( tabid + node.data.id, node.data.name + " 网盘硬盘", encodeURI( '../upload/index.html?type=dep&id=' + node.data.id ) );
                        } else if ( !node.data.isLeaf ) {
                            f_addTab( node.data.id, node.data.name, encodeURI( './workbench_news.html?role_id=' +
                                    node.data.id ) + '&roleName=' + nodeName );
                        }
                    }
                    //itemNodeId = node.data.id
                    //console.log(itemNodeId)
                },
                render: function ( e ) {
                    var tabid = $( e.target ).attr( "tabid" );
                    if ( !tabid ) {
                        tabid = new Date().getTime();
                        $( e.target ).attr( "tabid", tabid )
                    }
                    return e.name;
                    /*
                     + "<img src='./images/role.png' class='power_tree_role' data-id='" + e.id + "'><img src='./images/save.gif' class='power_tree_disk' data-tabid='" + tabid + "' data-title='" + e.name + "' data-id='" + e.id + "'>";
                     */
                },
                onSuccess: function ( node, e ) //点击选择,打开网络银盘
                {
                    actionParm = node; //当前节点
                    actionCustomerID = node.data.id; //当前节点的id
                    actionPID = node.data.parentId; //当前节点的父节点id
                    actionName = node.data.name; //当前节点的名字
                    actionRemark = node.data.remark; //当前节点的描述
                    var actiondata = {
                        "id": actionCustomerID,
                        "name": actionName,
                        "remark": actionRemark,
                        "parentId": actionPID
                    }
                    itemdata = JSON.stringify( actiondata )
                    //设置缓存
                    localStorage.setItem( "remark", itemdata )
                    menu_power_node = {
                        "id": node.data.id,
                        "name": node.data.name,
                        "remark": node.data.remark,
                        "parentId": node.data.parentId
                    };

                    if ( node.data.isLeaf ) return false;
                    rmenu_id = node.data.id;
                    //rmenu_ti=node.data.children[0].formName;
                    rmenu_ti = node.data.formName;
                    // //这里有个小bug,如果数据没有chinldren下面没有内容了,就会报错
                    if ( rmenu_s != "null" ) {
                        rmenu_s.show( {
                            top: e.pageY,
                            left: e.pageX
                        } );
                    }
                    return false;
                },
                onSelect: function (node) {
                    judge = false;
                    itemNodeId = node.data.id;
                    itemParentNodeId = node.data.parentId;
                    itemNodeName = node.data.name;
                    //console.log(itemNodeId)
                },
                onCancelselect: function (node) {
                    itemNodeId = 0;
                    itemNodeName = null;
                    itemParentNodeId = null;
                },
                checkbox: false
            } );
        }
    } )

    //默认权限树渲染
    $.ajax( {
        type: "GET",
        url: dataTreeUrl,
        success: function ( data ) {
            //角色权限树方法调用
            //getTreedata( data, archives, archives );
            getTreedata( data );
            $( "#treedata" ).css( "width", 300 + "px" )
            //角色配置关闭图片
            $( $( $( $( $( ".l-tab-links" ).children()[ 2 ] ).children()[ 0 ] ).children()[ 0 ] ).children()[ 0 ] ).addClass( "icon-remove" )
            //关闭配置,让右键菜单为空,显示和隐藏板块
            $( $( ".cosl" )[ 0 ] ).on( "click", function () {
                //关闭配置,让右键菜单为空,显示和隐藏板块
                rmenu_s = "null";
                $( $( ".l-layout-center" )[ 1 ] ).css( "display", "block" )
                $( $( $( ".l-layout-center" )[ 1 ] ) ).children().attr( "id", "framecenter" )
                $( $( ".l-layout-center" )[ 0 ] ).css( "display", "none" )
                $( $( $( ".l-layout-center" )[ 0 ] ) ).children().attr( "id", "framecenter2" )
                //树图标变回来
                $( ".l-tree-icon-folder" ).removeClass( "treeimg" )
                $( ".l-tree-icon-folder-open" ).removeClass( "treeimg" )
            } )
        }
    } )

    //功能右键显示网络银盘
    rmenu = $.ligerMenu( {
        top: 100,
        left: 100,
        width: 120,
        items: [ {
            text: '网络硬盘',
            click: godisk,
            icon: 'add'
        } ]
    } );

    //角色右键菜单
    function getrmenu() {
        return $.ligerMenu( {
            top: 100,
            left: 100,
            width: 120,
            items: [ {
                text: '添加子节点',
                click: addChildNode,
                icon: 'add'
            },
                {
                    text: '添加兄弟节点',
                    click: addBrotherNode,
                    icon: 'add'
                },
                {
                    text: '编辑节点',
                    click: editBrotherNode,
                    icon: 'edit'
                },
                {     text: '删除节点',
                    click: deleteNode,
                    icon: 'delete'
                },
                {
                    text: '上拉',
                    click: function ( node ) {
                        move_node_up( actionParm, -1 );
                    }
                },
                {
                    text: '下移',
                    click: function ( node ) {
                        move_node_down( actionParm, 1 );
                    }
                },

                // {
                // 	text: '修改父节点',
                // 	click: function(node) {
                // 		ediPparentNode(node);
                // 	}
                // },
                {
                    text: '关闭',
                    click: function ( node ) {
                        rmenu_s.hide();
                    }
                }

            ]
        } );

    }
    rmenu_s = null; //角色右键菜单

    //  ------------- 增删改查功能-----------------------------

    function cancel( item, i ) {
        i.hidden();
    }
    var i = -1;

    function getNewData( withchildren ) //获取输入框的值
    {
        i++;
        var dept = {
            "name": $( "#addChildName" ).val(),
            "remark": $( "#addChildPresentation" ).val()
        };
        var data = {
            name: dept.name,
            id: dept + i,
            remark: dept.remark + i
        };
        if ( withchildren ) {
            data.children = [];
            data.children.push( getNewData() );
            data.children.push( getNewData() );
            data.children.push( getNewData() );
        }
        return data;
    }

    function addRow( withchildren ) //增加子节点
    {
        var data = getNewData( withchildren );
        var selectRow = maingrid.getSelectedRow();
        var parentRow = selectRow;

        if ( maingrid.isLeaf( parentRow ) ) {
            tip( '叶节点不能增加子节点' );
            return;
        }
        maingrid.add( data, null, true, parentRow );

    }

    function upgrade() //升级
    {
        var row = maingrid.getSelected();
        maingrid.upgrade( row );
    }

    function appendToCurrentNodeDown() //在下方添加兄弟节点
    {
        var selectRow = power_tree.getSelected();
        if ( !selectRow ) return;
        var selectRowParnet = power_tree.getParent( selectRow );
        var data = getNewData();
        // power_tree.add(data, selectRow, false, selectRowParnet);
    }

    function deleteRow() //删除行
    {
        var node = power_tree.getSelected();
        if ( node ) {
            power_tree.remove( node.target );
        } else {
            alert( '请先选择节点' );
        }

    }


    //点击添加子节点,打开输入框面板
    function addChildNode( item, i ) {
        $.ligerDialog.open( {
            left: '38%',
            top: '35%',
            target: $( "#addChildNode" ),
            title: "添加部门",
            buttons: [ {
                text: "添加",
                onclick: addChildN
            }, {
                text: "取消",
                onclick: cancel
            } ]
        } );
    }
    //添加子节点
    function addChildN( item, i ) {
        //点击添加,发送请求
        var rolename = $( "#addChildName" ).val();
        var remark = $( "#addChildPresentation" ).val()
        if ( judge ) {
            _actionCustomerID = 0;
        }else {
            _actionCustomerID = itemNodeId;
        }
        $.ajax( {
            url: getAddRoleChildNode + "rolename=" + rolename + "&description=" + remark + "&role_id=" + _actionCustomerID,
            type: "GET",
            success: function ( data ) {
                if ( data.status == 1 ) {
                    $.ajax( {
                        type: "GET",
                        url: getSearchInfoRole,
                        success: function ( data ) {
                            var Objdata = data.msg;
                            $( "#power_tree" ).ligerTree( {
                                textFieldName: 'name',
                                nodeWidth: 200,
                                data: Objdata,
                                isExpand: 1,
                            } )
                            $( ".l-tree-icon-folder" ).addClass( "treeimg" )
                            $( ".l-tree-icon-folder-open" ).addClass( "treeimg" )
                            //power_tree.expandAll()
                            if ( itemNodeId > 0 ) {
                                power_tree.expandNode(itemNodeId)
                            }                        }
                    } )
                    i.hidden();
                    $( "#addChildName" ).val( '' );
                    $( "#addChildPresentation" ).val( '' )
                }
                /*if ( itemNodeId > 0 ) {
                    power_tree.expandNode(itemNodeId)
                }*/
            },
            error: function ( er ) {
                //					alert(er);
            }
        } );
    }

    //添加兄弟节点
    function addBrotherNode( item, i ) {
        $.ligerDialog.open( {
            left: '38%',
            top: '35%',
            target: $( "#addBrotherNode" ),
            title: "添加兄弟节点",
            buttons: [ {
                text: "添加",
                onclick: addBrotherN
            }, {
                text: "取消",
                onclick: cancel
            } ]
        } );
    }
    //调用缓存
    function x() {
        menu_power_node = localStorage.getItem( "remark");
        menu_power_node = JSON.parse(menu_power_node);
    }
    //编辑节点
    function editBrotherNode( item, i ) {
        //console.log( i );
        //console.log( item );
        x();
        // $( "#editBrotherNodeName" ).val( menu_power_node.name );
        $( "#editBrotherNodeName" ).val( itemNodeName );
        $( "#newBrotherNodeDes" ).val( menu_power_node.remark );
        /*var nodehtml = setPtree( power_json, 0 );
        nodehtml = "<option value='" + menu_power_node.parentId + "' selected>默认</option>" + nodehtml;
        $( "#editPBrotherNodeName" ).html( nodehtml );*/
        if ( itemNodeName != null ) {
            $.ligerDialog.open( {
                left: '38%',
                top: '35%',
                target: $( "#editBrotherNode" ),
                title: "编辑部门",
                buttons: [ {
                    text: "修改",
                    onclick: editBN
                }, {
                    text: "取消",
                    onclick: cancel
                } ]
            } );
        }
    }
    function setPtree( arr, level ) {
        x();
        var html = '';
        var line = '';
        for ( var j = 0; j < level; j++ ) {
            line += '--';
        }
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[ i ].id != menu_power_node.id ) {
                html += "<option value='" + arr[ i ].id + "'>" + line + arr[ i ].name + "</option>";
                if ( arr[ i ].children.length > 0 ) html += setPtree( arr[ i ].children, level + 1 );
            }
        }
        return html;
    }
    //修改节点
    function editBN( item, i ) {
        x();
        var name = $( "#newBrotherNodeName" ).val();
        if ( name == '' ) {
            alert( "节点名不能为空" );
            return false;
        }
        var des = $( "#newBrotherNodeDes" ).val();
        //var pid = $( "#editPBrotherNodeName" ).val();
        // var pid = menu_power_node.parentId;
        var pid = itemParentNodeId;
        // var id = menu_power_node.id;
        var id = itemNodeId;
        $.ajax( {
            //url: root_url + "/htRoleService/getUpdateRoleNode?rolename=" + name + "&description=" + des + "&role_id=" + id + "&pid=" + pid,
            url: root_url + "/htRoleService/getUpdateRoleNode?rolename=" + name + "&description=" + des + "&role_id=" + id + "&pid=" + pid,
            type: "GET",
            success: function ( data ) {
                if ( data.msg == true ) {
                    $.ajax( {
                        type: "GET",
                        url: getSearchInfoRole,
                        success: function ( data ) {
                            //修改完成,获取最新数据重新渲染
                            var Objdata = power_json = data.msg;
                            $( "#power_tree" ).ligerTree( {
                                textFieldName: 'name',
                                nodeWidth: 200,
                                data: Objdata,
                            } )
                            if ( itemNodeId > 0 ) {
                                power_tree.expandNode(itemNodeId)
                            }
                        }
                    } )
                    $( "#newBrotherNodeName" ).val( '' );
                    $( "#newBrotherNodeDes" ).val( '' );
                    i.hidden();
                }
            },
            error: function ( er ) {
                $.ligerDialog.error( er );
            }
        } );

    }

    function addBrotherN( item, i ) {
        var addBrotherName = $( "#addBrotherName" ).val()
        var addBrotherremark = $( "#addBrotherPresentation" ).val()
        $.ajax( {
            url: getAddBrotherNode + "rolename=" + addBrotherName + "&description=" + addBrotherremark + "&role_id=" +
            actionCustomerID,
            type: "GET",
            success: function ( data ) {
                if ( data.status == 1 ) {
                    //点击添加,获取最新数据渲染树
                    $.ajax( {
                        type: "GET",
                        url: getSearchInfoRole,
                        success: function ( data ) {
                            var Objdata = data.msg;
                            $( "#power_tree" ).ligerTree( {
                                textFieldName: 'name',
                                nodeWidth: 200,
                                data: Objdata,
                                isExpand: 1,
                            } )
                            $( ".l-tree-icon-folder" ).addClass( "treeimg" )
                            $( ".l-tree-icon-folder-open" ).addClass( "treeimg" )
                        }
                    } )
                    appendToCurrentNodeDown()
                    i.hidden();

                }
            },
            error: function ( er ) {
                //					$.ligerDialog.error(er);
            }
        } );
    }

    //修改节点
    /*function editNode( item, i ) {
        $( "#editNodeName" ).val( actionName );
        $( "#editNodePresentation" ).val( actionRemark );
        $.ligerDialog.open( {
            left: '38%',
            top: '35%',
            target: $( "#editNode" ),
            title: "修改节点",
            buttons: [ {
                text: "修改",
                onclick: editN
            }, {
                text: "取消",
                onclick: cancel
            } ]
        } );

    }*/
    //修改节点
    /*function editN( item, i ) {
        var editNodeName = $( "#editNodeName" ).val();
        var editNodePresentation = $( "#editNodePresentation" ).val()
        $.ajax( {
            url: getUpdateRoleNode + "rolename=" + editNodeName + "&description=" + editNodePresentation + "&role_id=" +
            actionCustomerID,
            type: "GET",
            success: function ( data ) {
                if ( data.status == 1 ) {
                    $.ajax( {
                        type: "GET",
                        url: getSearchInfoRole,
                        success: function ( data ) {
                            //修改完成,获取最新数据重新渲染
                            var Objdata = data.msg;
                            $( "#power_tree" ).ligerTree( {
                                textFieldName: 'name',
                                nodeWidth: 200,
                                data: Objdata,
                            } )
                        }
                    } )
                    //修改完成后,重新渲染模版引擎
                    nodeName = $( "#editNodeName" ).val(); //当前节点的名字
                    nodeRemark = $( "#editNodePresentation" ).val(); //当前节点的描述
                    var nodedata = {
                        "id": nodeCustomerID,
                        "name": nodeName,
                        "remark": nodeRemark,
                        "parentId": nodeID
                    }
                    var infos = {
                        "list": [ nodedata ]
                    }
                    var htmlStr = template( "juese_tpl", infos );
                    $( ".juese_tbody_content" ).html( htmlStr );

                    var node = power_tree.getSelected();
                    if ( node ) {
                        power_tree.update( node.target, {
                            textFieldName: editNodeName
                        } );
                    }
                    $( "#editNodeName" ).val( '' );
                    $( "#editNodePresentation" ).val( '' );
                    i.hidden();

                }
            },
            error: function ( er ) {
                $.ligerDialog.error( er );
            }
        } );

    }*/
    //删除节点
    function deleteNode( item, i ) {
        //            if(!confirm('确定要删除该内容吗?'))return false;   //弹窗提示
        if ( itemNodeName != null ) {
            var lo = $.ligerDialog.open( {
                left: '38%',
                top: '35%',
                //title: "删除节点：" + "部门:" + actionName + "    职位:" + actionRemark,
                title: "删除部门:" + itemNodeName,
                buttons: [ {
                    text: "删除",
                    onclick: deleteN
                }, {
                    text: "取消",
                    onclick: cancel
                } ]
            } );
        }
    }

    function deleteN( item, i ) {
        $.ajax( {
            // url: getDeleteRoleNode + "role_id=" + actionCustomerID,
            url: getDeleteRoleNode + "role_id=" + itemNodeId,
            type: "GET",
            success: function ( data ) {
                if ( data.status == 1 ) {
                    //删除重新渲染
                    $.ajax( {
                        type: "GET",
                        url: getSearchInfoRole,
                        success: function ( data ) {
                            var Objdata = data.msg;
                            $( "#power_tree" ).ligerTree( {
                                textFieldName: 'name',
                                nodeWidth: 200,
                                data: Objdata,
                                isExpand: 1,
                            } )
                            $( ".l-tree-icon-folder" ).addClass( "treeimg" )
                            $( ".l-tree-icon-folder-open" ).addClass( "treeimg" )
                            if ( itemNodeId > 0 ) {
                                power_tree.expandNode(itemParentNodeId)
                            }
                        }
                    } )
                    i.hidden();
                }
                i.hidden();
            },
            error: function ( er ) {
                //alert(er.statusText);
            }
        } );
    }

    //上拉
    function move_node_up( actionParm, type ) {
        $.ajax( {
            type: "POST",
            url: getUpRoleMenudizhi,
            data: JSON.stringify( {
                "id": actionCustomerID,
            } ),
            contentType: "application/json",
            success: function ( data ) {
                console.log( data )
                //返回上拉成功后数据后,重新渲染树
                $.ajax( {
                    type: "GET",
                    url: getSearchInfoRole,
                    success: function ( data ) {
                        power_tree.setData( data.msg );
                    }
                } )
            }
        } );
    }

    //下移
    function move_node_down( node, type ) {
        $.ajax( {
            type: "POST",
            url: getDownRoleMenudizhi,
            data: JSON.stringify( {
                "id": actionCustomerID,
            } ),
            contentType: "application/json",
            success: function ( data ) {
                if ( data.statusMsg != "error" ) {
                    //返回上拉成功字段后,重新请求部门机构树数据,渲染
                    $.ajax( {
                        type: "GET",
                        url: getSearchInfoRole,
                        success: function ( data ) {
                            power_tree.setData( data.msg );
                        }
                    } )
                }
            }
        } );
    }
    //修改父节点
    function ediPparentNode( node ) {
        $.ajax( {
            url: root_url + "/htRoleService/getSearchInfoRole?role_id=0",
            type: "GET",
            success: function ( res ) {
                if ( res.status == 1 ) {
                    var newsdata = res.msg;
                    editParentNodeTree = $( "#editParentNodeTree" ).ligerTree( {
                        textFieldName: 'name',
                        nodeWidth: 200,
                        data: newsdata,
                        isExpand: 1,
                    } );
                }
            }
        } )
        ediPparentNodeDialog = $.ligerDialog.open( {
            target: $( "#ediPparentNode" ),
            left: '38%',
            top: '35%',
            width: "350",
            title: "修改【" + actionName + "】父节点",
            buttons: [ {
                text: "确定",
                onclick: function () {
                    ediPparentNodeDialog.hide();
                    $.ajax( {
                        url: formMenuFacade_root_url + "/formMenuFacade/getFormMenu?pid=0",
                        type: "GET",
                        data: {
                            id: actionCustomerID,
                            pid: editParentNodeTreeId
                        },
                        success: function ( data ) {
                            if ( data.status == 1 ) {
                                $.ligerDialog.alert( '修改成功', '提示' )
                                getNewData();
                                return;
                            }
                        }

                    } );

                }
            }, {
                text: "取消",
                onclick: function () {
                    ediPparentNodeDialog.hide();
                }
            } ]
        } );
        // ajaxNewData(function (data) {
        // 	if (typeof (data) == "object") {
        // 		var ss = editParentNodeTree.rows;
        // 		editParentNodeTree.deleteRange(ss);
        // 		editParentNodeTree.addRows(data);
        // 		return;
        // 	}
        // 			alert(data);
        // });
    }



    function ajaxNewData( callback ) {
        $.ajax( {
            url: getUrl,
            type: "GET",
            async: false,
            data: {
                "rtype": "ajaxNewData"
            },
            success: function ( data ) {
                callback( data );
            },
            error: function ( er ) {
                callback( "网络出错" );
            }
        } );
    }

    //-------------------------------------------

    //加载完成插入图标

    //只有左边菜单可以点击齿轮编辑
    //$( "#tab1 li[tabid=tabitem1] a" ).after( "<img src='./images/sz.png'/>" );
    $( "#tab1 li[tabid=tabitem1] a" ).remove("a:first-child");
    $( "#tab1 .l-tab-links" ).remove();
    $( "#tab1 li[tabid=tabitem1] a" ).after( "<a id='website'>机构</a>" );
    $( "#tab2 li[tabid=tabitem1] a" ).after( "<img src='./images/sz.png' ng-click=getgourl('form') />" );
    $( "#tab2 li[tabid=tabitem2] a" ).after( "<img src='./images/sz.png' ng-click=getgourl('flow') />" );


    //模块显示
    $( $( ".l-layout-center" )[ 1 ] ).css( "display", "block" )
    $( $( ".l-layout-center" )[ 0 ] ).css( "display", "none" )
    //点击齿轮,显示角色配置
    /*$( $( "#tab1 li[tabid=tabitem1]" ).children()[ 1 ] ).on( "click", function () {
     if ( rmenu_s == null ) {
     */

    $( "#website" ).on( "click", function () {
        if ( rmenu_s == null ) {
            //右键菜单
            rmenu_s = getrmenu();
            $( $( ".l-layout-center" )[ 0 ] ).css( "display", "block" )
            $( $( $( ".l-layout-center" )[ 0 ] ) ).children().attr( "id", "framecenter" )
            $( $( ".l-layout-center" )[ 1 ] ).css( "display", "none" )
            $( $( $( ".l-layout-center" )[ 1 ] ) ).children().attr( "id", "framecenter2" )
        } else {
            //右键菜单
            rmenu_s = null;
            $( $( ".l-layout-center" )[ 0 ] ).css( "display", "none" )
            $( $( $( ".l-layout-center" )[ 0 ] ) ).children().attr( "id", "framecenter" )
            $( $( ".l-layout-center" )[ 1 ] ).css( "display", "block" )
            $( $( $( ".l-layout-center" )[ 1 ] ) ).children().attr( "id", "framecenter2" )
        }
    } )


    function godisk( item ) {
        //          console.log(item)
        var tabid = $( this.target ).attr( "tabid" );
        if ( !tabid ) {
            tabid = "rmenu" + rmenu_id;
            $( this.target ).attr( "tabid", tabid )
        }
        f_addTab( tabid, rmenu_ti + ' ' + item.text, encodeURI( './upload/filetest.html?oId=' + rmenu_id + '&mode=fileOpen' ) );
    }
    //Tab
    tab = $( "#framecenter" ).ligerTab( {
        height: height,
        showSwitchInTab: true,
        showSwitch: true,
        onAfterAddTabItem: function ( tabdata ) {
            if ( tabdata.tabid == "role" ) {
                // rmenu_s = getrmenu();
            }
            //添加一个tab的时候,让关闭隐藏,菜单显示,主页条位置回来
            $( $( ".l-layout-collapse-left" )[ 0 ] ).css( "display", "none" )
            $( $( $( ".l-layout-left" )[ 1 ] )[ 0 ] ).css( "display", "block" )
            $( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 0 + "px" )
            tabItems.push( tabdata );
            saveTabStatus();
        },
        onAfterRemoveTabItem: function ( tabid ) {
            if ( tabid == "role" ) {
                rmenu_s = "null";
            }
            //删除一个tab卡的时候,判断主要菜单是否是打开状态
            //先判断是否主页tab是否有l-selected这个class,如果有证明是选择了,或者是最后一个
            if ( $( $( $( ".l-tab-links" )[ 2 ] ).children().children()[ 0 ] ).hasClass( "l-selected" ) ) {
                if ( $( $( $( ".l-layout-left" )[ 1 ] )[ 0 ] ).css( "display" ) == "block" ) {
                    $( $( $( $( ".l-layout-center" )[ 2 ] ) )[ 0 ] ).css( "left", 200 + "px" )
                    //$( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 210 + "px" )
                    $( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 0 + "px" )
                } else {
                    $( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 37 + "px" )
                }
            }
            for ( var i = 0; i < tabItems.length; i++ ) {
                var o = tabItems[ i ];
                if ( o.tabid == tabid ) {
                    tabItems.splice( i, 1 );
                    saveTabStatus();
                    break;
                }
            }
        },
        onReload: function ( tabdata ) {
            var tabid = tabdata.tabid;
            addFrameSkinLink( tabid );
        },
        onAfterSelectTabItem: function ( tabid ) {
            //选择了主页以外的tab卡的时候,主页条位置改变
            $( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 0 + "px" )
            cu_tabid = tabid;
        }
    } );

    tab2 = $( "#framecenter2" ).ligerTab( {
        height: height,
        showSwitchInTab: true,
        showSwitch: true,
        onAfterAddTabItem: function ( tabdata ) {
            tabItems.push( tabdata );
            saveTabStatus();
        },
        onAfterRemoveTabItem: function ( tabid ) {
            for ( var i = 0; i < tabItems.length; i++ ) {
                var o = tabItems[ i ];
                if ( o.tabid == tabid ) {
                    tabItems.splice( i, 1 );
                    saveTabStatus();
                    break;
                }
            }
        },
        /*onReload: function(tabdata) {
         console.log("tabdata:"+tabdata);
         var tabid = tabdata.tabid;
         addFrameSkinLink(tabid);
         },*/
        onAfterSelectTabItem: function ( tabid ) {
            cu_tabid = tabid;
        }
    } );

    function retab( tabid ) {
        tab.reload( tabid );
    }
    //面板
    $( "#accordion1" ).ligerAccordion( {
        height: height - 24,
        speed: null
    } );

    $( ".l-link" ).hover( function () {
        $( this ).addClass( "l-link-over" );
    }, function () {
        $( this ).removeClass( "l-link-over" );
    } );
    accordion = liger.get( "accordion1" );
    tree = liger.get( "tissue_nav_tree" );
    $( "#pageloading" ).hide();
    css_init();
    //pages_init();

    //$("#power_tree .l-tree-icon-folder-open").removeClass("");
    /*var lic=$(".role_name").children("li");
     lic.mouseover(function () {
     $(this).find("ul").show();
     });
     lic.mouseout(function () {
     $(this).find("ul").hide();
     })*/
} );

$( document ).on( 'mouseover', '.role_name > li', function () {
    $( this ).find( "ul" ).show();
} )
$( document ).on( 'mouseout', '.role_name > li', function () {
    $( this ).find( "ul" ).hide();
} )

function f_heightChanged( options ) {
    if ( tab )
        tab.addHeight( options.diff );
    if ( accordion && options.middleHeight - 24 > 0 )
        accordion.setHeight( options.middleHeight - 24 );
}

function f_getTabId( text, url ) {
    for ( i in tabItems ) {
        if ( tabItems[ i ].text == text && tabItems[ i ].url == url ) {
            return tabItems[ i ].tabid;
        }
    }
    return -1;
}

function f_addTab( tabid, text, url ) {
    var id = f_getTabId( text, url );
    if ( id != -1 ) tabid = id;
    //        console.log(id)
    tab.addTabItem( {
        tabid: tabid,
        text: text,
        url: url,
        callback: function () {
            //                 addShowCodeBtn(tabid);
            //                 addFrameSkinLink(tabid);
        }
    } );
}

function f_addTab2( tabid, text, url ) {
    var id = f_getTabId( text, url );
    if ( id != -1 ) tabid = id;
    //        console.log(id)
    tab.addTabItem( {
        tabid: tabid,
        text: text,
        url: url,
        callback: function () {
            //                 addShowCodeBtn(tabid);
            //                 addFrameSkinLink(tabid);
        }
    } );
}

function f_addTab3( tabid, text, url ) {
    var id = f_getTabId( text, url );
    if ( id != -1 ) tabid = id;
    //        console.log(id)
    tab.addTabItem( {
        tabid: tabid,
        text: text,
        url: url,
        callback: function () {
            //                 addShowCodeBtn(tabid);
            //                 addFrameSkinLink(tabid);
        }
    } );
}

function treeDataSave() {
    var arr = dataTree.getChecked();
    var subdata = { "posId": posId, "nodeIds": [] };
    var ids = [];
    for ( var i = 0; i < arr.length; i++ ) {
        ids.push( arr[ i ].data.id );
        subdata.nodeIds.push( { "nodeId": arr[ i ].data.id } );
    }
    if ( subdata.nodeIds.length > 0 ) {
        $( '.l-checkbox-incomplete' ).closest( 'li' ).each( function ( o ) {
            var tmpid = $( this ).attr( 'id' );
            if ( tmpid > 0 && $.inArray( tmpid, ids ) == -1 ) {
                subdata.nodeIds.push( { "nodeId": tmpid } );
            }
        } )
    }
    $.ajax( {
        type: "POST",
        url: root_url + "/htPositionNodeService/getUpdateOrDeleteNodeMenu",
        data: JSON.stringify( subdata ),
        contentType: "application/json",
        async: false,
        success: function ( data ) {
            alert( data.statusMsg );
            if ( data.status == 0 ) {
                //getTreedata(data);
                getRoleDes();
            }
            //g.deleteSelectedRow();
            // getMembersRoleGird_02(posId);
        }
    } )
}

function treeDataSave2() {
    var arr = memberrightsTree.getChecked();
    var subdata = { "userId": role_user, "nodeIds": [] };
    for ( var i = 0; i < arr.length; i++ ) {
        subdata.nodeIds.push( { "nodeId": arr[ i ].data.id } );
    }
    $.ajax( {
        type: "POST",
        url: root_url + "/htUserNodeService/saveNodeAssociateUserByChange",
        data: JSON.stringify( subdata ),
        contentType: "application/json",
        async: false,
        success: function ( data ) {
            alert( data.msg );
            if ( data.status == 0 ) {
                //getTreedata(data);
            }
            //g.deleteSelectedRow();
            // getMembersRoleGird_02(posId);
        }
    } )
}

function saveTabStatus() {
    // $.cookie('liger-home-tab', JSON2.stringify(tabItems));
}

function css_init() {
    var css = $( "#mylink" ).get( 0 ),
        skin = getQueryString( "skin" );
    $( "#skinSelect" ).val( skin );
    $( "#skinSelect" ).change( function () {
        if ( this.value ) {
            location.href = "index.htm?skin=" + this.value;
        } else {
            location.href = "index.htm";
        }
    } );

    if ( !css || !skin ) return;
    skin = skin.toLowerCase();
    $( 'body' ).addClass( "body-" + skin );
    $( css ).attr( "href", skin_links[ skin ] );
}

function getQueryString( name ) {
    var now_url = document.location.search.slice( 1 ),
        q_array = now_url.split( '&' );
    for ( var i = 0; i < q_array.length; i++ ) {
        var v_array = q_array[ i ].split( '=' );
        if ( v_array[ 0 ] == name ) {
            return v_array[ 1 ];
        }
    }
    return false;
}
//页面加载完成执行
$( document ).ready( function () {
    /*$( $( ".l-layout-header-inner" )[ 0 ] ).append(
     "<a target='_self' title='胜网科技首页' id='website'><img src='./images/sz.png'></a>" )*/

    //部门机构齿轮宽度
    $( $( $( $( ".l-tab-links" )[ 0 ] ).children()[ 0 ] ).children()[ 0 ] ).css( {
        "width": 200 + "px",
        "text-align": "center"
    } )
    //主要菜单
    $( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 37 + "px" )
    // // //主要菜单角色按钮
    $( $( $( $( ".l-tab-links" )[ 0 ] ).children()[ 0 ] ).children()[ 0 ] ).siblings( "li" ).remove();


    //主要菜单上移
    $( $( ".l-layout-left" )[ 1 ] ).css( "top", -25 + "px" )
    //设置主要菜单关闭时的位置
    $( $( ".l-layout-collapse-left" )[ 0 ] ).css( "top", -25 + "px" )
    //设置超出不隐藏
    $( $( ".l-tab-content-item" )[ 4 ] ).css( "overflow", "visible" )
    //刷新页面的时候,判断是否主页状态,主要主页条的位置
    if ( $( $( $( ".l-tab-links" )[ 2 ] ).children().children()[ 0 ] ).hasClass( "l-selected" ) ) {
        //$( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 37 + "px" )
        $( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 0 + "px" )
    } else {
        $( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 0 + "px" )
    }
    //直接点击主页的时候
    $( $( $( ".l-tab-links" )[ 2 ] ).children().children()[ 0 ] ).on( "click", function () {
        console.log( 898989 );
        $( $( ".l-layout-collapse-left" )[ 0 ] ).css( "display", "block" )
        $( $( $( ".l-layout-left" )[ 1 ] )[ 0 ] ).css( "display", "none" )
        //$( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 37 + "px" )
        $( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 0 + "px" )
        $( $( $( $( ".l-layout-center" )[ 2 ] ) )[ 0 ] ).css( "left", 37 + "px" )
    } )

    $( $( ".l-layout-header-toggle" )[ 1 ] ).on( "click", function () {
        //主要菜单关闭时,主页条位置改变
        $( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 37 + "px" )
    } )
    $( $( ".l-layout-collapse-left-toggle" )[ 0 ] ).on( "click", function () {
        //主要菜单打开时,主页条位置改变
        $( $( ".l-tab-links" )[ 2 ] ).css( "margin-left", 210 + "px" )
    } )

    $( $( "#myTab4" ).children() ).on( "click", function () {
        $( this ).addClass( "active" ).siblings().removeClass( "active" )
        // $("#" + $(this).attr("data")).css("display", "block").siblings().css("display", "none")
    } )
} );
var power_tree_role_id = 1;
$( document ).on( 'click', '.power_tree_role', function () {
    if ( rmenu_s != null ) return false;
    var load = $( "#role_block_loading2" );
    load.show();
    var p = $( this ).offset();
    var tm = $( ".role_block" );
    tm.css( { "top": p.top, "left": p.left + 17 } );
    var id = $( this ).data( "id" );
    $.get( root_url + "/htPostionService/selectPosAndUserByRoleId?roleId=" + id, function ( data ) {
        load.hide();
        var html = '';
        if ( data.status == 0 && data.msg[ 0 ] != null ) {
            for ( var i = 0; i < data.msg.length; i++ ) {
                html += '<li><span class="dep_role_name" data-rid="' + data.msg[ i ].id + '">' + data.msg[ i ].posName + '</span>';
                if ( data.msg[ i ].htUsers.length > 0 ) {
                    html += '<span class="role_lower"></span>';
                    html += '<ul class="role_user">';
                    for ( var j = 0; j < data.msg[ i ].htUsers.length; j++ ) {
                        html += '<li data-rid="' + data.msg[ i ].id + '" data-uid="' + data.msg[ i ].htUsers[ j ].uId + '">' + data.msg[ i ].htUsers[ j ].chinese_name + '</li>';
                    }
                    html += '</ul>';
                }
                html += "</li>";
            }
        } else {
            html = '<li>没有分配</li>';
        }
        $( '.role_name' ).html( html );
    }, 'json' );
    /*$.ajax({
     url: root_url+"/htPostionService/selectPosAndUserByRoleId?roleId="+id,
     async: false,
     success: function (data) {
     load.hide();
     console.log(data);
     var html='';
     if(data.status==0 && data.msg!=null){
     for(var i=0;i<data.msg.length;i++){
     html+="<li>"+data.msg[i].posName;
     if(data.msg[i].htUsers.length>0){
     html+='<span class="role_lower"></span>';
     html+='<ul class="role_user">';
     for(var j=0;j<data.msg[i].htUsers.length;j++){
     html+='<li>'+data.msg[i].htUsers[j].chinese_name+'</li>';
     }
     html+='</ul>';
     }
     html+="</li>";
     }
     }
     $('.role_name').html(html);
     //g.deleteSelectedRow();
     // getMembersRoleGird_02(posId);
     }
     })*/
    if ( id != power_tree_role_id ) {
        tm.show();
    } else {
        if ( tm.is( ":hidden" ) ) {
            tm.show();
        } else {
            tm.hide();
        }
    }
    power_tree_role_id = id;
} )
$( document ).on( 'click', '.role_user li', function () {
    var uid = $( this ).data( 'uid' );
    var rid = $( this ).data( 'rid' );
    var name = $( this ).html();
    f_addTab( 'user' + uid, name, encodeURI( './workbench_news?type=user&id=' + uid + '&rid=' + rid ) );
    console.log( uid, name );
} )
$( document ).on( 'click', '.dep_role_name', function () {
    var rid = $( this ).data( 'rid' );
    var name = $( this ).html();
    f_addTab( 'user' + rid, name, encodeURI( './workbench_news?type=role&id=' + rid ) );
    console.log( rid, name );
} )
$( document ).on( 'click', '.power_tree_disk', function () {
    var id = $( this ).data( "id" );
    var tabid = $( this ).data( "tabid" );
    var title = $( this ).data( "title" );
    f_addTab( tabid, title + " 网盘硬盘", encodeURI( '../upload/index.html?type=dep&id=' + id ) );
} )
/*$( document ).on( 'click', '#website', function () {
 f_addTab( 'EnterpriseInformation', " 企业信息", encodeURI( './company' ) );
 } )*/

function showUserRole( my, pwid ) {
    console.log( my );
    console.log( pwid );
}

/* 如果是注册界面过来的 - 显示企业添加画面 */
$( document ).ready( function () {
    if ( window.location.search.split( '?' )[ 1 ] === 'goCompany' ) $( '.companyContainer' ).fadeIn();
    var x = false;
    if ( !x ) $('.companyContainer').fadeIn();
} );

$( document ).on( 'click', '.companyContainer', function () {
    $( this ).fadeOut();
} )
