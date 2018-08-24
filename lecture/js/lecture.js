$(function(){

	function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    var id = getUrlParam("id");
    var userId = getUrlParam("userId");

    var data = {"id": id,"userId": userId};

    function base2blob(url){
       var arr = url.split(','), mime = arr[0].match(/:(.*?);/)[1],
               bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
       while(n--){
           u8arr[n] = bstr.charCodeAt(n);
       }
       var obj = new Blob([u8arr], {type:mime});
       return obj;
   }

    //获取讲课内容
    $.ajax({
    	/*url: 'http://192.168.0.192:21002/prepare/attendClass',*/
    	url: _prepare_root_url+'/prepare/attendClass',
        type: 'post',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(data){
        	console.log(data)
            var html = "";
            var huabu = data.msg.bk_huabu;
            //遍历数据中的画布
            for (var i = 0; i < huabu.length; i++) {
                var box = huabu[i];
                html +=box;
            }

            $(html).appendTo(".viewer_wrap"); //将遍历好的所有画布添加到画布包中

            $(".viewer_wrap div:first-child").addClass("current").siblings().removeClass("current"); //默认显示第一个画布

            $(".teath_a").html(getUrlParam("userId")+"老师"); //讲课老师

            $(".lesson_b").html(data.msg.title); //讲课标题

            $("#page_count").html(huabu.length); //讲课画布长度

            $(".box").css("user-select","text"); //改变画布中组件css属性

            //以下是将画布截图生成图片
             //var str = $('.show_cont');  
             //console.log(str);  
             // html2canvas([str.get(0)], {
             //    allowTaint: true,    
             //    taintTest: false,
             //    onrendered: function (canvas) {
             //        var image = canvas.toDataURL("image/png");
              //       var pHtml = '<img src="'+image+'" crossorigin="anonymous" />';
             //        $('.show_cont').html(pHtml);
             //    },
           //  });  
        },
        error: function(data){
        	alert("链接服务器失败");
        }
    })
});