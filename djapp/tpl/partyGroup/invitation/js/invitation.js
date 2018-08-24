/**
 * Created by Administrator on 2018/4/26.
 */
$(function () {
    var input = $('.search_group input')
    var url = window.location.search
    var data = {
        user: {},
        my:JSON.parse(localStorage.getItem('user')),
        search  : decodeURIComponent(url).split('&').map(function (item) {
            return item.replace(/(\?posid=)|(title=)|(roid=)/g, '')
        }),
        arr:[]
    }
    data.posid = data.search[0] !== decodeURIComponent(window.location.search) && data.search[0] != '' ? data.search[0] : null
    data.title = data.search[1] !== decodeURIComponent(window.location.search) && data.search[1] != '' ? data.search[1] : null
    data.roid = data.search[2] !== decodeURIComponent(window.location.search) && data.search[2] != '' ? data.search[2] : null
    $('.change_post').text(data.title)
    inputfun()
    search()
    member()
    $('.quit').on('touchstart', function () {
        window.history.go(-1)
        localStorage.setItem('url',url)
    })
    function inputfun() {
        input.val('ID号/手机号')
        input.css('color', '#787878')
        input.focus(function () {
            if (input.val() === 'ID号/手机号') {
                input.val('')
                input.css('color', '#454545')
            }
        })
        input.blur(function () {
            if (input.val() === '') {
                input.val('ID号/手机号')
                input.css('color', '#787878')
            }
        })
    }
    $(document).ready(function(e) {
        var counter = 0;
        if (window.history && window.history.pushState) {
            window.onpopstate = function () {
                window.history.forward(1);
                localStorage.setItem('url',url)
                window.history.go(-1)
            };
        }
    });
    //搜索事件
    function search() {
        $('.search_group div').on('touchstart', function () {
            if (input.val() !== ('ID号/手机号' || '')) {
                $.ajax({
                    url: getUserByUsername + input.val(),
                    type: 'get',
                    success: function (res) {
                        if (res.status == '1') {
                            data.user = res.msg.htUser
                            var tpl = '<li class="everyone">' +
                                '<div class="photo">' +
                                '<img src="" alt="">' +
                                '</div>' +
                                '<div class="message">' +
                                '<div class="name">' + res.msg.htUser.chinese_name + '</div>' +
                                '<div class="phone">' + res.msg.htUser.username + '</div>' +
                                '</div>' +
                                '<div class="invitation btn_invite f15">邀请</div>' +
                                '</li>'
                            $('.search_main').html(tpl)
                            active()
                        }
                    },
                    error: function (err) {
                        modal('.b')
                    }
                })
            } else {
                modal('.a')
            }
        })
    }
    // 邀请点击事件
    function active() {
        $('.invitation').on('touchstart',function(){
            if (data.role_id!==null) {
                $.ajax({
                    url: invitePosForDj + 'telephone=' + data.user.username + '&posId=' + data.roid+'&inviter='+data.my.id,
                    type: 'get',
                    success: function (res) {
                        if(res.status === '1'){
                            member()
                            modal('.d')
                        }else if(res.status === '5'){
                            modal('.h')
                        }else{
                            modal('.c')
                        }
                    },
                    error: function (err) {
                         modal('.e')
                        // setTimeout(function () {
                        //     window.location.href = '../party/index.html'
                        // },600)
                    }
                })
            } else {
                modal('.b')
                setTimeout(function () {
                    window.location.href = '../party/index.html'
                },600)
            }
        })
    }
     //邀请用户列表渲染函数
     function member(){
         if (!!data.roid) {
             $.ajax({
                 url:showInvitePosForDjByPosId+'offset='+0+'&limit='+100+'&inviter='+data.my.id+'&posId='+data.roid,
                 type:'get',
                 success:function(res){
                     if(res.status === "1"){
                         var html = template(res.msg.userList)
                         $('.member').html(html)
                         repeal()
                         document.querySelector('.none').style.display = 'none'
                     }else if(res.status === '3'){
                         $('.member').html('')
                         document.querySelector('.none').style.display = 'block'
                     }
                 },
                 error:function(err){
                     // modal('.b')
                     // setTimeout(function () {
                     //     window.location.href = '../party/index.html'
                     // },1200)
                 }
             })
         } else {
             modal('.b')
             setTimeout(function () {
                 window.location.href = '../party/index.html'
             },600)
         }
     }
    // 邀请撤回
    function repeal(){
         $('.repeal').on('touchstart',function(){
             var $index = $(this).parent().index()
             $.ajax({
                 url:invitePosForDjBack+data.arr[$index].id,
                 type:'get',
                 success:function(res){
                     if(res.status === '1'){
                         data.arr =[]
                         member()
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
    //邀请用户模板
    function template(arr){
        var html = ''
        var tpl = function(obj) {
             var tpl = '<li class="everyone">' +
                 '<div class="photo"><img src="" alt=""></div>' +
                 // '<div class="job">'+obj.rolename+obj.posname+'</div>' +
                 '<div class="message">' +
                 '<div class="name">'+obj.chinese_name+'</div>' +
                 '<div class="phone">'+obj.username+'</div>' +
                 '</div>' +
                 '<div class="state pass">审核中</div>' +
                 '<div class="repeal btn_pass">撤销</div>' +
                 '</li>'
             return tpl
         }
        arr.forEach(function(item){
            html+=tpl(item)
            data.arr.push(item)
        })
        return html
    }
})