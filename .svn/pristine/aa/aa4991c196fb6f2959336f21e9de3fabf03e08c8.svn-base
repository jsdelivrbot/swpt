var selectData = { "status": "", "uId": "" }
var retUrl="";
window.localStorage["retUrl"]="";

function locaVal() {
    var url = window.location.href;
    if (url.indexOf('?') == -1) return false;
    var obj = url.split('?');
    var val = "{";
    if (obj[1].indexOf("&") != -1) {
        obj = obj[1].split('&');
    };
    for (i = 0; i < obj.length; i++) {
        if (obj[i].indexOf("=") != -1) {
            val += '"' + obj[i].replace(/=/g, '":"') + '",';
        }
    }
    val = val.substring(0, val.length - 1)
    val += "}";
    return JSON.parse(val);
}

function $$(id) {
    return $("#iframeAll").contents().find(id);
}

function titleShow(title, isshow,isParent) {
    if (isshow == true) {
        if(isParent==true){
            $("#inquire_Info",parent.document).hide();
            $("#title",parent.document).show().html(title);
            //$("#title").html(title);
            $("#findOrOk",parent.document).html('完成');
        }else{
            $("#inquire_Info").hide();
            $("#title").show();
            $("#title").html(title);
            $("#findOrOk").html('完成');
        }
    } else {
        $("#title").hide();
        $("#inquire_Info").show();
        $("#findOrOk").html('查询');
    }

}

function findOrOk(id) {
    var htmldata = "";
    var locHref = $("#iframeAll").attr("src");
    var newsrc = locHref.substring(locHref.lastIndexOf("/") - 4, locHref.length).toLowerCase();
    switch ($(id).html()) {
        case "查询":
            switch (newsrc) {
                case "view/project_page.html": alert("我是【项目详情页】中的查询按钮!"); break;
                case "view/task_page.html": //任务查询
                    let findContent={
                        "uId":"55",
                        "status":$("#FindTypeId").val(),
                        "content":$("#txtContent").val()
                    }
                    $.ajax({
                        contentType:"application/json; charset:UTF-8;",
                        data:JSON.stringify(findContent),
                        type:"post",
                        url:port_20896+"htSingleTaskService/searchTaskByCondition",
                        beforeSend:function(){
                            $$("#task").html("<div style='width:100%;text-align: center;padding-top:10px;'>正在查询数据...</div>");
                        },
                        success:function(retData){
                            $.each(retData.msg, function (i, task) {
                                htmldata += task_Info(task.id,"", task.taskTitle, "", task.leaderName, task.status);
                            });
                            $$("#task").html(htmldata);
                        }
                    });
                 break;
                default: alert("对不起，查询页有误！"); break;
            }
            break;
        case "完成":
                var teamUser = "", editorUser = "", shareUser = "";
                    teamUser = $$("#selVal")[0].dataset.selval;
                    editorUser = $$("#sel_editorUser")[0].dataset.selval;
                    shareUser = $$("#sel_cooperaUser")[0].dataset.selval;
                    var inserttask = {
                        "taskTitle": $$("#taskName").val(),
                        "startTime": $$("#startDate").val(),
                        "endTime": $$("#endDate").val(),
                        "leader": $$("#sel_prin").val(),
                        "teamMember": teamUser.substring(0, teamUser.length - 1),
                        "shareMember":  shareUser.substring(0, shareUser.length - 1),
                        "editorMember":editorUser.substring(0, editorUser.length - 1),
                        "accessory": "http://www.baidu.com",
                        "accomplishNum": $$("#completeSet").val(),
                        "addUser": 55,
                        "status": $$("input[name='status']:checked").val(),
                        "taskInfo": $$("#task_Info").val(),
                        "Id":window.localStorage["details_find_id"],
                        "uId":"55"
                    };
                    if (inserttask.taskTitle == "") {
                        alert("任务名称不能为空！");
                        return false;
                    }
                    if (inserttask.leader == "0") {
                        alert("请选择负责人！");
                        return false;
                    }
                    if (inserttask.accomplishNum == "") {
                        alert("请设置完成度！ ");
                        return false;
                    }
                    if (inserttask.taskInfo == "") {
                        alert("任务内容不能为空！ ");
                        return false;
                    }
                    if (inserttask.startTime == "") {
                        alert("请选择开始时间！ ");
                        return false;
                    }
                    if (inserttask.endTime == "") {
                        alert("请选择结束时间！ ");
                        return false;
                    }
                    if (inserttask.endTime <= inserttask.startTime) {
                        alert("结束时间不能小于或者等于开始时间！ ");
                        return false;
                    }
            switch ($("#title").html()) {
                case "项目发布页": alert("我是【项目详情页】中的完成按钮!"); break;
                case "任务发布页":
                    $.ajax({
                        url: port_20896 + "htSingleTaskService/addSingleTaskRecord",
                        data: JSON.stringify(inserttask),
                        type: "post",
                        contentType: "application/json; charset:UTF-8;",
                        success: function (retInfo) {
                            if (retInfo.status == "200") {
                                alert("发布成功！");
                                $("#iframeAll").attr("src", window.localStorage["retUrl"]);
                            } else {
                                alert("发布失败！");
                            }
                        }
                    });
                    break;
                    case "任务详情页":
                    console.log(inserttask);
                        $.ajax({
                            url: port_20896 + "htSingleTaskService/updateSingleTaskRecord",
                            data: JSON.stringify(inserttask),
                            type: "post",
                            contentType: "application/json; charset:UTF-8;",
                            success: function (retInfo) {
                                if (retInfo.status == "200") {
                                    alert("更改成功！");
                                    $("#iframeAll").attr("src", window.localStorage["retUrl"]);
                                } else {
                                    alert("更改失败！");
                                }
                            }
                        });
                    break;
                default:
                    alert("对不起，发布页有误！");
                    break;
            }
            break;
    }
}

function iframeAll_Load() {
    
    var htmldata = "";
    var locHref = $("#iframeAll").attr("src");
    var newsrc = locHref.substring(locHref.lastIndexOf("/") - 4, locHref.length).toLowerCase();
    setTimeout(() => {
        if(window.localStorage["retUrl"]==""&& newsrc!="view/index.html"){
            iframeAll_Load();
            return false;
        }
    }, 2000);
    $("#i_botton").hide();
    $("#createNew").hide();
    if (newsrc == "view/index.html") {
        $("#createNew").hide();
        $("#i_top").slideUp();
        $("#i_middle").css("height", "100%");
    } else {
        $("#i_top").slideDown();
        $("#i_middle").css("height", "94.2%");
        switch (newsrc) {
            case "view/project_info.html":
            case "view/task_info.html":
                $("#createNew").hide();
                break;
            default:
                $("#createNew").show();
                break;
        }
    }
    //只能小写
    switch (newsrc) {
        case "view/index.html":
            console.log("首页");
            break;
        case "view/project_page.html":
            window.localStorage["retUrl"] = "./view/index.html";
            console.log("项目页");
            titleShow("", false);
            for (var i = 0; i < 15; i++) {
                htmldata += peoject_Info("", "", "", "");
            }
            $$("#project").html(htmldata);
            break;
        case "view/task_page.html":
            window.localStorage["retUrl"] = "./view/index.html";
            console.log("任务页");
            titleShow("", false);
            selectData.status = "";
            selectData.uId = "55";
            try {
                $.ajax({
                    data: JSON.stringify(selectData),
                    type: "post",
                    contentType: "application/json; charset=UTF-8;",
                    url: port_20896 + "htSingleTaskService/selectListSingleTaskRecord",
                    success: function (retData) {
                        //window.localStorage["task_data_info"]=JSON.stringify(retData.msg);
                        $.each(retData.msg, function (i, task) {
                            htmldata += task_Info(task.id,"", task.taskTitle, "", task.leaderName, task.status);
                        });
                        $$("#task").html(htmldata);
                    }
                });
            } catch (e) {
                alert("异常：请联系管理人员！" + e);
            }
            break;
        default:
            console.log("加载数据失败，当前页面不在范围内！");
            break;
    }

}

var rawUrl = "";
//监控iframe
function monitoring_iframe() {
    setTimeout(function () {
        if (rawUrl != $("#iframeAll").attr("src")) {
            //console.log("监控中，发现跳转页面！");
            rawUrl = $("#iframeAll").attr("src");
            iframeAll_Load();
        }
        monitoring_iframe();
        load_Fun(true);
    }, 300);

}


function this_details(id){
    let $iframe=$("#iframeAll",parent.document);
        switch($iframe.attr("src")){
            case "./view/project_page.html":
            window.localStorage["retUrl"]="./view/project_page.html";
                $iframe.attr("src","./view/project_Info.html");
                titleShow("项目详情页",true,true);
            break;
            case "./view/task_page.html":
            window.localStorage["retUrl"]="./view/task_page.html";
                $iframe.attr("src","./view/task_Info.html");
                titleShow("任务详情页",true,true);
            break;
        } 
    window.localStorage["details_find_id"]=id;
}
