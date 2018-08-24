

$(function () {
    var select_lis = "<li>请选择</li>";
    var select_options = "<option value='0'>请选择</option>";
    try {
        $.ajax({
            type: "get",
            url: "http://192.168.0.213:20896/htUserService/getSearchUser",
            success: function (retDate) {
                $.each(retDate.msg.userList, function (i, name) {
                    select_lis += select_option(name.chinese_name, name.uId);
                    select_options += "<option value='" + name.uId + "'>" + name.chinese_name + "</option>";
                });
                $("#selUser").html(select_lis);
                $("#sel_prin").html(select_options);
                $("#selUser1").html(select_lis);
                $("#selUser2").html(select_lis);
                setTimeout(() => {
                    var details_find_id = window.localStorage["details_find_id"];
                    if (details_find_id) {
                        $.ajax({
                            url: port_20896 + "htSingleTaskService/selectSingleTaskRecordByPkid?id=" + details_find_id,
                            type: "get",
                            contentType: "application/json; charset:UTF-8;",
                            success: function (retInfo) {
                                //协作人
                                load_SelectData(retInfo.msg.teamMember, "selVal", "selUser");
                                //编辑人
                                load_SelectData(retInfo.msg.editorMember, "sel_editorUser", "selUser2");
                                //共享人
                                load_SelectData(retInfo.msg.shareMember, "sel_cooperaUser", "selUser1");

                                $("#taskName").val(retInfo.msg.taskTitle);
                                $("#startDate").val(retInfo.msg.startTime);
                                $("#endDate").val(retInfo.msg.endTime);
                                $("#sel_prin").val(retInfo.msg.leader);
                                $("#completeSet").val(retInfo.msg.accomplishNum);
                                $("#progress").width(retInfo.msg.accomplishNum + "%");
                                var status=$("input[name='status']");
                                $.each(status,function(i,thiss){
                                    if(thiss.value==retInfo.msg.status){
                                        thiss.checked=true;
                                        $("#status_"+retInfo.msg.status).css("color","red");
                                    }
                                    // if(retInfo.msg.status=="4"){
                                    //     thiss.disabled=true;
                                    // }
                                });
                                $("#task_Info").val(retInfo.msg.taskInfo);
                            }
                        });

                    }
                }, 50);
            }
        });


    } catch (e) {
        console.log("系统出现异常，请联系管理员进行修复！" + e);
    }

    $("#completeSet").change(function () {
        var completeVal = $(this).val();
        if (parseInt(completeVal) > 100 || parseInt(completeVal) < 0) {
            $("#progress").addClass("bdcolor_red").css("width", completeVal + "%");
        } else {
            $("#progress").removeClass("bdcolor_red").css("width", completeVal + "%");
        }
    });



});

function load_SelectData(info, select_id, option_id) {
    var length = info.split(',').length;
    if (length > 0) {
        let array = info.split(',');
        for (let i = 0; i < length; i++) {
            $("#" + select_id)[0].dataset.selval += array[i];
            $.each($("#" + option_id + " input[name='user']"), function (j, name) {
                if (name.dataset.value == array[i]) {
                    name.checked = true;
                    selcoop_option("#chk_this_id_" + array[i], option_id);
                    return false;
                }
            });
        };
    }
}

function selcoop_option(id, fatherID) {

    let checked_name = "";
    let checked_val = "";
    if (fatherID == true) {
        if ($(id).parent().parent().length > 0) {
            fatherID = $(id).parent().parent()[0].id;
        } else { return false; }
    }

    $.each($("#" + fatherID + " input[name='user']"), function (i, name) {
        if (name.checked == true) {
            checked_name += name.dataset.name + ";";
            checked_val += name.dataset.value + ",";
        }
    });
    if (checked_val == "") {
        checked_val = "-1";
        checked_name = "请选择";
    }
    switch (fatherID) {
        case "selUser":
            $("#selVal")[0].dataset.selval = checked_val;
            $("#selVal").html(checked_name);
            break;
        case "selUser1":
            $("#sel_cooperaUser")[0].dataset.selval = checked_val;
            $("#sel_cooperaUser").html(checked_name);
            break;
        case "selUser2":
            $("#sel_editorUser")[0].dataset.selval = checked_val;
            $("#sel_editorUser").html(checked_name);
            break;
    }

}
