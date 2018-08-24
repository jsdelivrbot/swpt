/**
 * Created by Administrator on 2018/4/25.
 */
$(function(){
 $('.quit').on('touchstart',function(){
     window.history.go(-1)
 })
 var data = {
     htUser:'',
     title:''
 }
    var url = window.location.search
    var data = {
        my: JSON.parse(localStorage.getItem('user')),
        search: decodeURIComponent(url).split('&').map(function (item) {
            return item.replace(/(\?posid=)|(title=)|(roid=)|(itemid=)/g, '')
        }),
        arr:[]
    }
    data.posid = data.search[0] !== decodeURIComponent(window.location.search) && data.search[0] != '' ? data.search[0] : null
    data.title = data.search[1] !== decodeURIComponent(window.location.search) && data.search[1] != '' ? data.search[1] : null
    data.roid = data.search[2] !== decodeURIComponent(window.location.search) && data.search[2] != '' ? data.search[2] : null
    data.itemid = data.search[3] !== decodeURIComponent(window.location.search) && data.search[3] != '' ? data.search[3] : null
 $.ajax({
     url:getUserById+data.itemid,
     type:'get',
     success:function(res){
         if(res.status === '1'){
             data.htUser = res.msg.htUser
             var html = change(data.htUser)
             $('.contact').html(html)
         }else{
         //    如果后台出错
         }
     },
     error:function(err){
     //    如果请求出错
     }
 })

    $(document).ready(function(e) {
        var counter = 0;
        if (window.history && window.history.pushState) {
            window.onpopstate = function () {
                window.history.forward(1);
                window.location.href = '../party/index.html'+url
            };
        }
        window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
        window.history.forward(1);
    });
 function change(obj){
     $('#change_name').text(obj.chinese_name)
     $('#change_title').text(data.title)
     var address = !!obj.address ? obj.address :'暂未填写'
     var family_phone = !!obj.family_phone ? obj.family_phone :'暂未填写'
     var tpl = '<div class="photo item">' +
         '<span class="iconfont icon-shijian1"></span>联系电话&nbsp;&nbsp;' +
         '<span id="change_photo">'+family_phone+'</span>' +
         '</div>' +
         '<div class="address item">' +
         '<span class="iconfont icon-shijian">' +
         '</span>联系地址&nbsp;&nbsp;<span id="change_address">'+address+'</span>' +
         '</div>'
     return tpl
 }
})