/**
 * Created by Administrator on 2018/1/27.
 */
$(function () {
    var linkName = getUrlParam("linkName")
    var workUrl = 'workbenchs.html'
    // 页面加载完毕根据参数进行跳转
    if(linkName === '1'){
        $("#maincontents").attr("src")
        $("#gn").css("display", "block")
    }else if(linkName === '2'){
        $("#maincontents").attr("src", web_lcUrl)
        $("#gn").css("display", "block")
    }else if(linkName === '3'){
        $("#maincontents").attr("src", workUrl)
        $("#gn").css("display", "block")
    }
})
// 获取url参数函数
function getUrlParam(param) {
    var val = decodeURIComponent((new RegExp('[?|&]' + param + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    return val;
}