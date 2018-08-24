/**
 * Created by Administrator on 2018/5/16.
 */
$(function () {
    $('.quit').on('touchstart', function () {
        window.history.go(-1)
        localStorage.setItem('url',url)
    })
    var url = window.location.search
    var data = {
        my: JSON.parse(localStorage.getItem('user')),
        search: decodeURIComponent(url).split('&').map(function (item) {
            return item.replace(/(\?posid=)|(title=)|(roid=)/g, '')
        }),
        arr:[]
    }
    data.posid = data.search[0] !== decodeURIComponent(window.location.search) && data.search[0] != '' ? data.search[0] : null
    data.title = data.search[1] !== decodeURIComponent(window.location.search) && data.search[1] != '' ? data.search[1] : null
    data.roid = data.search[2] !== decodeURIComponent(window.location.search) && data.search[2] != '' ? data.search[2] : null
    $('.change_post').text(data.title)
    $('.bodies').css({
        'minHeight':h-$('.header').height()+'px'
    })
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
    Apply()
    //申请渲染函数
    function Apply(){
        $.ajax({
            url:showJoinPosForDjApply+'offset=0'+'&limit=100'+'&posId='+data.posid+'&isPass=0',
            type:'get',
            success:function(res){
                if(res.status === '0'){
                    data.arr = res.msg.userList
                    var html = template(data.arr)
                    $('.box').html(html)
                    pass()
                    reject()
                    document.querySelector('.none').style.display = 'none'
                }else if(res.status === '1'){
                //如果没有用户申请
                    $('.box').html('')
                    document.querySelector('.none').style.display = 'block'
                }
            },
            error:function(err){
                modal('.e')
            }
        })
    }
    //申请渲染模板
    function template(arr){
        var html = ''
        var tpl = function(obj) {
            var tpl = '<li class="everyone f15">' +
                '<div class="photo"><img src="" alt=""></div>' +
                '<div class="party">'+obj.chinese_name+'</div>' +
                '<div class="phone">'+obj.username+'</div>' +
                '<div class="btn">' +
                '<div class="btn_confirm btn_pass">确定</div>' +
                '<div class="btn_reject btn_audit">拒绝</div>' +
                '</div>' +
                '</li>'
            return tpl
        }
        arr.forEach(function(item){
            html+=tpl(item)
            data.arr.push(item)
        })
        return html
    }
    //同意加入成功函数
    function pass(){
        $('.btn_confirm').on('touchstart',function(){
            var index = $(this).parent().parent().index()
            $.ajax({
                url:passPosForDjApply+data.arr[index].id,
                type:'get',
                success:function(res){
                    if(res.status === '1'){
                        modal('.a')
                        Apply()
                    }else{
                        Apply()
                        modal('.c')
                    }
                },
                error:function(err){
                    //如果报错
                    modal('.e')
                }
            })
        })
    }
    //拒绝加入函数
    function reject(){
        $('.btn_reject').on('touchstart',function(){
            var index = $(this).parent().parent().index()
            $.ajax({
                url:invitePosForDjBack+data.arr[index].id,
                type:'get',
                success:function(res){
                    if(res.status === '1'){
                        Apply()
                        modal('.b')
                    }else{
                        Apply()
                        modal('.d')
                    }
                },
                error:function(err){
                    modal('.e')
                }
            })
        })
    }
})