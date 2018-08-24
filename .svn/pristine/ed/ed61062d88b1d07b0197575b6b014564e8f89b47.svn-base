/**
 * Created by Administrator on 2018/1/22.
 */
$(function () {
    $.ajax( {
        type: "GET",
        url: '../public/data.json',
        async: true,
        dataType: "json",
        success: function(data) {
            var dataMsg = data.msg[0].children[0];
            var dataMsgLength = dataMsg.children.length;
            console.log(dataMsgLength)
            if (dataMsg.text === "个人中心") {
                for (var i = 0; i < dataMsgLength; i++) {
                    var msgChildren = dataMsg.children[i];
                    $("#"+msgChildren.divId).css("visibility","visible");
                    var len = msgChildren.children.length;
                    for (var j = 0; j < len; j++) {
                        $("#"+msgChildren.children[j].divId).css("visibility","visible");
                    }
                }
            }

        }
    } )
    $.ajax( {
        type: "GET",
        url: '../../public/data.json',
        async: true,
        dataType: "json",
        success: function(data) {
            var dataMsg = data.msg[0].children[0];
            var dataMsgLength = dataMsg.children.length;
            if (dataMsg.text === "个人中心") {
                for (var i = 0; i < dataMsgLength; i++) {
                    var msgChildren = dataMsg.children[i];
                    $("#"+msgChildren.divId).css("visibility","visible");
                    var len = msgChildren.children.length;
                    for (var j = 0; j < len; j++) {
                        $("#"+msgChildren.children[j].divId).css("visibility","visible");
                    }
                }
            }

        }
    } )
})