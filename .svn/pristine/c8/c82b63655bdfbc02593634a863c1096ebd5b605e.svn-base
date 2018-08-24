var app=angular.module('gzsw',[
	"ngRoute",
	"swgetData"
])
.config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/index',{
		templateUrl:"./tpl/index.html",
        controller:"homeStr"
	}).when('/disk/:id',{
        templateUrl:"./tpl/disk.html",
        controller:"diskStr"
    }).otherwise({
			redirectTo:"/index"
	});
}]).controller('homeStr',["$scope","$http","getData",function($scope,$http,getData){
        var  role_id = window.location.href.split("?")[1].split("=")[1]
        console.log(role_id);
        var tab = null;
        var accordion = null;
        var tree = null;
        var tabItems = [];
        var ddd,rmenu_id,rmenu_ti,cu_tabid;
        var url_type=getQueryString('type');
        var url_id=getQueryString('id');
        $(function() {
            var getRolePosNameDizhi = root_url + "/htRoleService/getRolePosName?";
            var menu_power_node = JSON.parse(localStorage.getItem( "remark"));
            var nodeCustomerID = menu_power_node.id;
            $.ajax({
                type: "GET",
                url: getRolePosNameDizhi + "role_id=" + nodeCustomerID,
                success: function (data) {
                    //console.log(data);
                    var datas = {
                        'Rows': data.position
                    }
                    window.positionGrid = $("#positionDatas").ligerGrid({
                        height: '100%',
                        width: "100%",
                        columns: [{
                            display: "角色职位",
                            name: 'posName',
                            align: 'left',
                        }],
                        data: datas,
                        usePager: false,
                        isScroll: false,
                        allowAdjustColWidth: false,
                        onLoadData: function () {
                            window.MembersRoleGird = $("#positionDatass").ligerGrid({
                                height: '100%',
                                width: "100%",
                                columns: [{
                                    display: "角色成员",
                                    //name: 'chinese_name',
                                    align: 'left',
                                }],
                                usePager: false,
                                isScroll: false,
                                allowAdjustColWidth: false,
                                //data: MembersRoleData,
                            })

                        },
                        onSelectRow: function ( rowdata, rowid, rowobj ) {
                            var htUserService = root_url + "/htUserService/selectUserByPostionId?posId=";
                            posId = rowdata.pos_id;
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
                                    window.MembersRoleGird = $("#positionDatass").ligerGrid({
                                        height: '100%',
                                        width: "100%",
                                        columns: [{
                                            display: "角色成员",
                                            name: 'chinese_name',
                                            align: 'left',
                                        }],
                                        usePager: false,
                                        isScroll: false,
                                        allowAdjustColWidth: false,
                                        data: MembersRoleData,
                                    })
                                }
                            } )
                        },
                        //autoFilter: true,
                });
                }
            })
            $("#tab1").ligerTab();
            var workUrl = 'workbenchs.html'
            // var works_gnUrl = 'http://192.168.0.251/form/index.html';
            console.log($("#tab1 .l-tab-links a:first-child"))
            $("#tab1 .l-tab-links li:first-child").click(function(e){
                e.preventDefault();
                $("html").css("overflow", "hidden");
                $("#maincontents").attr("src", works_gnUrl)
                console.log($(".sbs").contents().find("html").height());
                $("#gn").css("display", "block")
             })
            $("#tab1 .l-tab-links li:last-child").click(function(e){
                // var works_lcUrl = 'http://192.168.0.251:8080/rapid_dev/toActivitiIndex.do?id="+id+"&name="+name';
                e.preventDefault();
                $("html").css("overflow", "hidden");
                $("#maincontents").attr("src", works_lcUrl)
                $("#gn").css("display", "block")
            })
            $("#tab1 .l-tab-links li:first-child").trigger("click")
            //console.log($("#tab1"))
            var gn_url=net_url=root_url;
            var net_url=search_root_url + '/search/getMenuFolder?';
            var url_rid=null;
            var getuid=window.localStorage['user']?JSON.parse(window.localStorage['user']):null;
            if(url_type=='dep'){
                gn_url+='/htNodeService/selectNodeMenuByRoleId?roleId='+url_id;
                net_url+='uId='+getuid.id+'&type=dep&rId='+url_id;
            }else if(url_type=='role'){
                gn_url+='/htNodeService/selectNodeMenuByPosId?posId='+url_id;
                net_url+='uId='+getuid.id+'&type=role&rId='+url_id;
            }else if(url_type=='user'){
                url_rid=getQueryString('rid');
                gn_url+='/htPowerUserService/getFormIdByPosIdOrUserId?pos_id='+url_rid+"&user_id="+url_id;
                net_url+='uId='+url_id+'&type=user&rId='+url_rid;
            }
            //网盘内容
            /*$.ajax({
                type:"GET",
                url:net_url,
                success:function(data){
                        console.log(data)
                    if(data.status==0){
                        var da = data.msg
                        $("#tissue_disk_tree").ligerTree(
                            {data:da,
                                onselect: function (node)
                                {
                                    var tabid = $(node.target).attr("tabid");
                                    if (!tabid)
                                    {
                                        tabid = new Date().getTime();
                                        $(node.target).attr("tabid", tabid)
                                    }
                                    //cu_tabid=tabid;
                                    if (!node.data.isLeaf)
                                    {
                                        f_addTab(tabid,node.data.text,encodeURI('#!/disk/' + node.data.id));
                                    }

                                },
                                checkbox:false
                            }
                        );
                    }
                }

            })*/
            //权限内容
           /* $.ajax({
                type:"GET",
                url:gn_url,
                success:function(data){
                    //    console.log(data)
                    if(data.status==0){
                        data = data.msg
                        $("#tissue_nav_tree").ligerTree({
                            data:data,
                            textFieldName:'text',
                            checkbox: false,
                            slide: false,
                            nodeWidth: 120,
                            render: function (item)
                            {
                                return item.text;
                            },
                            isLeaf:function(item){
                                //页面是true 文件夹是false
                                //    return item.isLeaf;
                                // return false;
                                if(item.isLeaf==1){
                                    return true
                                }else if(item.isLeaf==0){
                                    return false
                                }
                            },
                            isExpand: 2,
                            onContextmenu: function (node, e)
                            {

                                if(node.data.isLeaf)return false;
                                rmenu_id = node.data.id;
                                rmenu_ti=node.data.text;
                                rmenu.show({ top: e.pageY, left: e.pageX });
                                return false;
                            },
                            onselect: function (node)
                            {
                                var tabid = $(node.target).attr("tabid");
                                if (!tabid)
                                {
                                    tabid = new Date().getTime();
                                    $(node.target).attr("tabid", tabid)
                                }

                                if(node.data.isLeaf == 0){
                                    //如果不是网页,
                                    f_addTab(tabid,node.data.text+" 网盘硬盘",encodeURI('../../upload/filemg.html'));
                                }else if(node.data.isLeaf == 1){
                                    f_addTab(tabid, node.data.text, encodeURI("./role/content.html?id="+node.data.form_id));
                                }

                            }
                        });
                    }
                }

            })*/
            //布局
            //$("#layout1").ligerLayout({ leftWidth: 200, height: '100%', heightDiff: -5, space: 4, onHeightChanged: f_heightChanged });
            var height = $(".l-layout-center").height();
            //rmenu = $.ligerMenu({ top: 100, left: 100, width: 120, items:[{ text: '网络硬盘', click: godisk,icon:'add' }]});
            /*$("#flow_tree").ligerTree(
                {data:
                    [{text:'我发起的流程',children:[{text:'我的请求',type:'getmyflow'},{text:'办结流程',type:'getmyendflow'},{text:'待办流程',type:'getnoendflow'}],isLeaf:true},{text:'承接流程',children:[{text:'待办流程',type:'chulinode'},{text:'处理记录',type:'chuliendnode'}],isLeaf:true}],
                    onselect: function (node)
                    {
                        var tabid = $(node.target).attr("tabid");
                        if (!tabid)
                        {
                            tabid = new Date().getTime();
                            $(node.target).attr("tabid", tabid)
                        }
                        //cu_tabid=tabid;
                        if (!node.data.isLeaf)
                        {
                            f_addTab(tabid,node.data.text,encodeURI('/s/tp/wwwroot/index.php?s=/Flow/run/getflowlist/type/' + node.data.type));
                        }

                    },
                    checkbox:false
                }
            );*/
            function godisk(item){
                var tabid = $(this.target).attr("tabid");
                if (!tabid)
                {
                    tabid = "rmenu"+rmenu_id;
                    $(this.target).attr("tabid", tabid)
                }
                f_addTab(tabid,rmenu_ti+' '+item.text,encodeURI('/front/UploadFile/Uopen.htm?oId='+rmenu_id+'&mode=fileOpen'));
            }
            //Tab
            tab=$("#framecenter").ligerTab({
                height: height,
                showSwitchInTab: true,
                showSwitch: true,
                onAfterAddTabItem: function(tabdata) {
//                    console.log(tabdata)
                    tabItems.push(tabdata);
                    saveTabStatus();
                },
                onAfterRemoveTabItem: function(tabid) {
                    for (var i = 0; i < tabItems.length; i++) {
                        var o = tabItems[i];
                        if (o.tabid == tabid) {
                            tabItems.splice(i, 1);
                            saveTabStatus();
                            break;
                        }
                    }
                },
                onReload: function(tabdata) {
                    var tabid = tabdata.tabid;
                    console.log(tabid)
                    addFrameSkinLink(tabid);
                },
                onAfterSelectTabItem: function (tabid)
                {
//                    console.log(tabid)
                    cu_tabid=tabid;
                }
            });
            function retab(tabid){
                tab.reload(tabid);
            }
            //面板
            $("#accordion1").ligerAccordion({
                height: height - 24, speed: null
            });

            $(".l-link").hover(function() {
                $(this).addClass("l-link-over");
            }, function() {
                $(this).removeClass("l-link-over");
            });

            var data;
            var tissue_nav_tree_id;
            accordion = liger.get("accordion1");
            tree = liger.get("tissue_nav_tree");
            $("#pageloading").hide();
            css_init();
            pages_init();
        });

        function f_heightChanged(options) {
            if (tab)
                tab.addHeight(options.diff);
            if (accordion && options.middleHeight - 24 > 0)
                accordion.setHeight(options.middleHeight - 24);
        }
        function f_getTabId(text, url)
        {
            for(i in tabItems)
            {
                if(tabItems[i].text==text && tabItems[i].url==url)
                {
                    return tabItems[i].tabid;
                }
            }
            return -1;
        }
        function f_addTab(tabid, text, url) {
            var id=f_getTabId(text,url);
            if(id!=-1)tabid=id;
            tab.addTabItem({
                tabid: tabid,
                text: text,
                url: url,
                callback: function() {
                    // addShowCodeBtn(tabid);
                    // addFrameSkinLink(tabid);
                }
            });
        }

        function addShowCodeBtn(tabid) {
            var viewSourceBtn = $('<a class="viewsourcelink" href="javascript:void(0)">查看源码</a>');
            var jiframe = $("#" + tabid);
            viewSourceBtn.insertBefore(jiframe);
            viewSourceBtn.click(function() {
                showCodeView(jiframe.attr("src"));
            }).hover(function() {
                viewSourceBtn.addClass("viewsourcelink-over");
            }, function() {
                viewSourceBtn.removeClass("viewsourcelink-over");
            });
        }
        function showCodeView(src) {
            $.ligerDialog.open({
                title: '源码预览',
                url: 'dotnetdemos/codeView.aspx?src=' + src,
                width: $(window).width() * 0.9,
                height: $(window).height() * 0.9
            });

        }
        function addFrameSkinLink(tabid) {
            var prevHref = getLinkPrevHref(tabid) || "";
            var skin = getQueryString("skin");
            if (!skin) return;
            skin = skin.toLowerCase();
            attachLinkToFrame(tabid, prevHref + skin_links[skin]);
        }
        var skin_links = {
            "aqua": "lib/ligerUI/skins/Aqua/css/ligerui-all.css",
            "gray": "lib/ligerUI/skins/Gray/css/all.css",
            "silvery": "lib/ligerUI/skins/Silvery/css/style.css",
            "gray2014": "lib/ligerUI/skins/gray2014/css/all.css"
        };
        function pages_init() {
            var tabJson = $.cookie('liger-home-tab');
            if (tabJson) {
                var tabitems = JSON2.parse(tabJson);
                for (var i = 0; tabitems && tabitems[i]; i++) {
                    f_addTab(tabitems[i].tabid, tabitems[i].text, tabitems[i].url);
                }
            }
        }
        function saveTabStatus() {
            $.cookie('liger-home-tab',JSON2.stringify(tabItems));
        }
        function css_init() {
            var css = $("#mylink").get(0), skin = getQueryString("skin");
            $("#skinSelect").val(skin);
            $("#skinSelect").change(function() {
                if (this.value) {
                    location.href = "index.htm?skin=" + this.value;
                } else {
                    location.href = "index.htm";
                }
            });


            if (!css || !skin) return;
            skin = skin.toLowerCase();
            $('body').addClass("body-" + skin);
            $(css).attr("href", skin_links[skin]);
        }
        function getQueryString(name) {
            var now_url = document.location.search.slice(1), q_array = now_url.split('&');
            for (var i = 0; i < q_array.length; i++) {
                var v_array = q_array[i].split('=');
                if (v_array[0] == name) {
                    return v_array[1];
                }
            }
            return false;
        }
        function attachLinkToFrame(iframeId, filename) {
            if (!window.frames[iframeId]) return;
            var head = window.frames[iframeId].document.getElementsByTagName('head').item(0);
            var fileref = window.frames[iframeId].document.createElement("link");
            if (!fileref) return;
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            head.appendChild(fileref);
        }
        function getLinkPrevHref(iframeId) {
            if (!window.frames[iframeId]) return;
            var head = window.frames[iframeId].document.getElementsByTagName('head').item(0);
            var links = $("link:first", head);
            for (var i = 0; links[i]; i++) {
                var href = $(links[i]).attr("href");
                if (href && href.toLowerCase().indexOf("ligerui") > 0) {
                    return href.substring(0, href.toLowerCase().indexOf("lib"));
                }
            }
        }
}]).controller('diskStr',["$scope","$http","getData","$routeParams",function($scope,$http,getData,$routeParams){
    var id=$routeParams.id;
    //var root_url=search_root_url;
    $scope.list=null;
     getData.getUrlData('/search/getMenuFolderId?folderId='+id,'disk').then(function (rs) {
         $scope.list=rs.data.msg;
     })
    $scope.fileDownload=function(id){
         console.log(id)
        if(id<1){
            return false;
        }
        //window.open(search_root_url+"/resource/download?rid="+rid+"&type="+type+"&uId="+uid+"&fileId="+id);
        window.open(search_root_url+"/resource/download?fileId="+id);
    }
}]).run(['$http',function($http){
        //$http.post(accountQuery_root_url    + "/accountQuery/getPhone",{});
}]);
