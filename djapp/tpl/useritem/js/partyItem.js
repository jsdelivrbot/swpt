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
 $.ajax({
     url:getUserById+1572911305,
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
 function change(obj){
     $('.change_name').text(obj.chinese_name)
     $('.change_title').text(data.title)
     var address = !!obj.address ? obj.address :'暂未填写'
     var family_phone = !!obj.family_phone ? obj.family_phone :'暂未填写'
     var tpl = '<div class="photo item">' +
         '<span class="iconfont icon-shijian1"></span>联系电话&nbsp;&nbsp;' +
         '<span id="change_photo">'+family_phone+'</span>' +
         '<i class="btn_photo iconfont icon-xiugai-copy"></i>' +
         '</div>' +
         '<div class="address item">' +
         '<span class="iconfont icon-shijian">' +
         '</span>联系地址&nbsp;&nbsp;<span id="change_address">'+address+'</span>' +
         '<i class="btn_address iconfont icon-xiugai-copy"></i>' +
         '</div>'
     return tpl
 }
})