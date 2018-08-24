/**
 * Created by Administrator on 2018/4/26.
 */
$(function(){
    var mydata = {
        uid:JSON.parse(localStorage.getItem('user')).id,
        arr:[]
    }
    $('.quit').on('touchstart',function(){
        window.history.go(-1)
    })
   $('.nav li').on('touchstart',function(e){
       var e = window.event || e
       var ele = e.srcElement || e.target
       $(this).addClass('red').siblings().removeClass('red')
       var name = ele.classList[0]
       activeClass(name)
   })
    already()
    invite()
    //点击切换函数
    function activeClass(name){
       var n = name.replace(/nav_/,'')
       var label = document.getElementsByClassName('box')[0]
        switch (name){
            case 'nav_already':
                label.style.transform = 'translateX(0)'
                break
            case 'nav_invite':
                label.style.transform = 'translateX(-50%)'
                break
        }
    }
    //已加入列表渲染
    function already(){
        $.ajax({
            url:showPosForDjForMe+'offset=0'+'&limit=100'+'&uId='+mydata.uid,
            type:'get',
            success:function(res){
               if(res.status === '1'){
                   var html = already_tpl(res.msg.userList)
                   $('.already_box').html(html)
                   document.querySelector('.already .none').style.display = 'none'
               }else if(res.status === '3'){
                  document.querySelector('.already .none').style.display = 'block'
               }
            },
            error:function(err){
               //请求错误
            }
        })

    }
    //已邀请列表渲染
    function invite(){
        $.ajax({
            url:showInvitePosForDjForMe+'offset=0'+'&limit=100'+'&uId='+mydata.uid,
            type:'get',
            success:function(res){
                if(res.status === '0'){
                    data.arr = []
                    var html = template(res.msg.userList)
                    $('.invite_box').html(html)
                    pass()
                    reject()
                    document.querySelector('.invite .none').style.display = 'none'
                }else if(res.status === '3'){
                    $('.invite_box').html('')
                    document.querySelector('.invite .none').style.display = 'block'
                }
            },
            error:function(err){
               modal('.b')
            }
        })
    }
    //已加入模板函数
    function already_tpl(arr){
        var html = ''
        var tpl = function(obj){
            var tpl = '<div class="everyone f15">' +
                '<div class="photo"><img src="" alt=""></div>' +
                '<div class="party">'+obj.rolename+'</div>' +
                '<div class="position">'+obj.posname+'</div>' +
                '</div>'
            return tpl
        }
        arr.forEach(function(item){
            html+=tpl(item)
        })
        return html
    }
    //已邀请模板函数
    function template(arr){
        var html = ''
        var tpl = function(obj) {
            var tpl = '<div class="everyone f15">' +
                '<div class="photo"><img src="" alt=""></div>' +
                '<div class="party">'+obj.rolename+'-'+obj.posname+'</div>' +
                '<div class="btn">' +
                '<div class="btn_confirm btn_pass">确定</div>' +
                '<div class="btn_reject btn_audit">拒绝</div>' +
                '</div>' +
                '</div>'
            return tpl
        }
        arr.forEach(function(item){
            html+=tpl(item)
            data.arr.push(item)
        })
        return html
    }
    //通过函数
    function  pass(){
        $('.btn_confirm').on('touchstart',function () {
            var index = $(this).parent().parent().index()
            $.ajax({
                url:showInvitePosForDjForMeToAccept+mydata.arr[index].id,
                type:'get',
                success:function(res){
                    if(res.status === '1'){
                        invite()
                        already()
                        modal('.a')
                    }else{
                        modal('.b')
                    }
                },
                error:function(err){
                    modal('.b')
                }
            })
        })
    }
//    拒绝函数
    function reject(){
        $('.btn_reject').on('touchstart',function(){
            var index = $(this).parent().parent().index()
            $.ajax({
                url:invitePosForDjBack+data.arr[index].id,
                type:'get',
                success:function(res){
                    if(res.status === '1'){
                        invite()
                        modal('.f')
                    }else{
                        modal('.g')
                    }
                },
                error:function(err){
                    modal('.b')
                }
            })
        })
    }
})