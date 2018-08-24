/**
 * Created by Administrator on 2018/4/26.
 */
$(function () {
    var data = {
        msg: null,
        user: JSON.parse(localStorage.getItem('user')),
        role: null,
        arr:[]
    }
    $('.quit').on('touchstart', function () {
        window.history.go(-1)
    })
    var input = $('.search_group_input')
    //根据组织码查询职位
    $('.search_group div').on('touchstart', function () {
        var codeId = $('.search_group_input').val()
        $.ajax({
            url: getRoleByCodeId + codeId,
            type: 'get',
            success: function (res) {
                if (res.status === '1') {
                    data.role = res.msg.htRole,
                        $.ajax({
                            url: getRolePosName + data.role.id,
                            type: 'get',
                            success: function (res) {
                                if (res.position.length > 0) {
                                    data.msg = res.position
                                    var html = template(res.position, data.role)
                                    $('.search_main').html(html)
                                    Apply()
                                } else {
                                    $('.search_main').html($('<div class="m_t_10 f15" style="text-align:center">该组织暂未创建职位</div>'))
                                    //如果组织没有职位
                                }
                            },
                            error: function (err) {
                                modal('.c')
                            }
                        })
                } else if (res.status === '0') {
                    modal('.d')
                }
            },
            error: function (err) {
                modal('.c')
            }
        })
    })
    inputfun()
    showPos()
    function inputfun() {
        input.val('请输入组织码')
        input.css('color', '#787878')
        input.focus(function () {
            if (input.val() === '请输入组织码') {
                input.val('')
                input.css('color', '#454545')
            }
        })
        input.blur(function () {
            if (input.val() === '') {
                input.val('请输入组织码')
                input.css('color', '#787878')
            }
        })
        input.change(function(){
            if(input.val() === ''){
                $('.search_main').html('')
            }
        })
    }
    //点击申请函数
    function Apply(){
         $('.invitation').on('touchstart',function(){
             var index = $(this).parent().index()
             $.ajax({
                 url:joinPosForDjApply+'telephone='+data.user.username+'&posId='+data.msg[index].pos_id,
                 type:'get',
                 success:function(res){
                      if(res.status == '1'){
                          modal('.a')
                          showPos()
                      }else if(res.status == '4'){
                          modal('.e')
                      }else if(res.status === '5'){
                          modal('.h')
                      }else{
                          modal('b')
                      }
                 },
                 error:function(err){
                     modal('.b')
                 }
             })
         })
    }
    //申请列表循环
    function template(arr, role) {
        var html = ''
        var tpl = function tpl(item) {
            var str = '<li class="everyone">' +
                '<div class="message">' +
                '<div class="name">' + role.rolename + '</div>' +
                '<div class="id">' + item.posName + '</div>' +
                '</div>' +
                '<div class="invitation btn_invite f15">申请</div>' +
                '</li>'
            return str
        }
        arr.forEach(function (item) {
            html += tpl(item)
        })
        return html
    }
    //申请列表显示模板
    function showPos_tpl(arr){
        var html = ''
        var tpl = function(item) {
            var tpl = '<li class="everyone">' +
                '<div class="message">' +
                '<div class="name">'+item.rolename+'-'+item.posname+'</div>' +
                '<div class="phone">'+item.username+'</div>' +
                '</div>' +
                '<div class="state pass">审核中</div>' +
                '<div class="repeal btn_pass">撤销</div>' +
                '</li>'
            return tpl
        }
        arr.forEach(function(item){
            html+=tpl(item)
        })
        return html
    }
    //已递交待审核的申请列表
    function showPos(){
        $.ajax({
            url:showPosForDjMyApply+'offset=0'+'&limit=200'+'&isPass=0'+'&uId='+data.user.id,
            type:'get',
            success:function(res){
                if(res.status === '1'){
                   data.arr = res.msg.userList
                   var html = showPos_tpl(res.msg.userList)
                   $('.member').html(html)
                    repeal()
                    document.querySelector('.none').style.display='none'
                }else if(res.status === '3'){
                    document.querySelector('.none').style.display='block'
                    $('.member').html('')
                }
            },
            error:function(err){
             modal('.b')
            }
        })
    }
//    点击撤销
    function repeal(){
        $('.repeal').on('touchstart',function(){
            var index = $(this).parent().index()
            $.ajax({
                url:invitePosForDjBack+data.arr[index].id,
                type:'get',
                success:function(res){
                    if(res.status === '1'){
                        showPos()
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