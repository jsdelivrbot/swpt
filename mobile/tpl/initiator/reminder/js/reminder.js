/**
 * Created by Administrator on 2018/5/4.
 */
$(function(){
    $('.btn_go').on('touchend',function(){
        window.history.go(-1)
    })
    var url = window.location.search.replace(/^(\?msg=)/,'')
    var data = JSON.parse(url)
    $('.btn_active').on('touchend',function(){
         $.ajax({
             url:proinsid+data,
             type:'post',
             success:function(res){
                 console.log(res)
             }
         })
        var obj = {
            name:$('.person input').val(),
            proinsid:data,
            message:$('.message textarea').val()
        }
        $.ajax({
            url:remindFirstApply+'message='+obj.message+'&proinsid='+obj.proinsid+'&username='+obj.name,
            type:'get',
            success:function(){

            }
        })
    })
})