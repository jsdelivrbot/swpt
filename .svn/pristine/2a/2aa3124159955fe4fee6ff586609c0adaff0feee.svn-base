/**
 * Created by Administrator on 2018/1/17.
 */
$( document ).ready( function () {
    $.ajaxSetup({
        aysnc: true,
        type: 'POST',
        //发送请求前触发
        beforeSend: function (XMLHttpRequest) {
            //可以设置自定义标头
            var sessionid = 'SessionID';
            XMLHttpRequest.setRequestHeader( sessionid, 'sid' );
        },
    })
})