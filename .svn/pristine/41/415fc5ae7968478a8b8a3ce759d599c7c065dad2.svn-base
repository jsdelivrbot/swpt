/**
 * Created by Administrator on 2018/4/24.
 */
$(function () {
    //测试用的
    var cs_rol = [],
       cs_arr= [],
        cs_fn= []
/*            */
    var data = {
        arr: [],
        navarr: [],
        post: {},
        role: '',
        person:[]
    }
    var dis = {
        startY: 0,
        endY: 0,
        Y:0
    }
    var index = null
    var url = null
    var url_seatch = localStorage.getItem('url')
    if(url_seatch != null){
        url = sech(url_seatch)
        localStorage.removeItem('url')
    }
    function sech(str){
        var arr = decodeURIComponent(str).split('&').map(function (item) {
            return item.replace(/(\?posid=)|(title=)|(roid=)/g, '')
        })
        return {
            roid:arr[2],
            posid:arr[0]
        }
    }
    $('.quit').on('touchstart', function () {
        window.history.go(-1)
    })
    $('.bodies').css({
        'minHeight': h - $('.header').height() + 'px'
    })
    $('.load').css({
        'height':h+'px'
    })

    var fn = {
        display: function (name, value) {
            $(name).css('display', value)
        },
        //组织点击事件
        change: function (name, cls) {
            $(name).on('touchstart', function () {
                $(this).addClass(cls).siblings().removeClass(cls)
                var index = $(this).index()
                $('.header_template').text(data.arr[index].name)
                data.role = data.arr[index].name
                navfn(data.arr[index].id)
                $('.meau').css({
                    'transform': 'rotate(0deg)'
                })
                $('.meau_box').css({
                    'right': -w + 'px',
                })
            })
        },
        //职位点击事件
        post: function (name, cls) {
            $(name).on('touchstart', function () {
                $(this).addClass(cls).siblings().removeClass(cls)
                var index = $(this).index()
                data.post = data.navarr[index]
                box(data.navarr[index].pos_id)
            })
        }
    }
    fn.display('.load', 'flex')
    var tpl = {
        //职位DOM渲染函数
        nav: function (arr, name) {
            var tpl = ''
            arr.forEach(function (i, index) {
                tpl += index === 0 ? '<li class="select red">' + i[name] + '</li>' : '<li class="select">' + i[name] + '</li>'
                data.navarr.push(i)
            })
            if(url === null){
                data.post = data.navarr[0]
                box(data.navarr[0].pos_id)
            }else{
                var eq
                for(var i=0;i<data.navarr.length;i++){
                    if(parseInt(data.navarr[i].pos_id) === parseInt(url.posid) ){
                        index = i
                        eq =  data.navarr[i]
                    }
                }
                data.post = eq
                box(eq.pos_id)

            }
            //默认为0
            return tpl
        },
        //组织DOM渲染函数
        meau: function (arr, name) {
            var tpl = ''
            arr.forEach(function (item, index) {
                tpl += index === 0 ? '<li class="meau_item f15 red">' + item[name] + '</li>' : '<li class="meau_item f15">' + item[name] + '</li>'
            })
            return tpl
        },
        //职位下已加入用户渲染函数
        everyone: function (arr) {
            var tpl = ''
            function every(item) {
                var t = '<li class="everyone">' +
                    '<a>' +
                    '<div class="photo"><img src="" alt=""></div>' +
                    '<div class="message">' +
                    '<span class="name">' + item.chinese_name + '</span>' +
                    '<span class="time">' + item.username + '</span>' +
                    '</div>' +
                    '<div class="operation">' +
                    '<span class="iconfont icon-more"></span>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                data.person.push(item.userId)
                return t
            }

            arr.forEach(function (item) {
                tpl += every(item)
            })
            return tpl
        }
    }
    //页面加载进入后,根据用户所加入的组织进行渲染
    function aj(bol){
        $.ajax({
            url:getTopicRole+JSON.parse(localStorage.getItem('user')).id,
            type:'get',
            async: false,
            success:function(res){
                var boxarr =  res.msg
                Current(boxarr,bol)
            },
            error:function(err){
              //如果请求错误
            }
        })
    }
    //请求所加入组织
    function Current(array,bol){
        $.ajax({
            url:getCurrentRole+JSON.parse(localStorage.getItem('user')).id,
            type:'get',
            async: false,
            success:function(res){
                if(res.status === '1'){
                    cs_rol = objHeavy(res.msg.roleList)
                    var a = cut(array,cs_rol)
                    if(bol){
                        for(var i=0;i<a.length;i++) {
                            arrfn(data.arr,a[i].children)
                        }
                    }else{
                        //判断数组的子是否有值
                        switch (a.length){
                            case 0:
                                $('.header_template').text('暂无权限')
                                fn.display('.load', 'none')
                                fn.display('.bodies', 'block')
                                fn.display('.search','none')
                                $('.bodies').html($('<div class="t_c m_t_20 f16">暂无权限</div>'))
                                break;
                            default:
                                for(var i=0;i<a.length;i++){
                                    arrfn(data.arr,a[i].children)
                                    $('.meau_box').append(tpl.meau(data.arr, 'name'))
                                }
                                if(url === null){
                                    navfn(data.arr[0].id)
                                    $('.header_template').text(data.arr[0].name)
                                }else{
                                    var eq = data.arr.filter(function(item){
                                        return parseInt(item.id) === parseInt(url.roid)
                                    })
                                    $('.header_template').text(eq[0].name)
                                    data.role = eq[0].name
                                    navfn(eq[0].id)
                                }
                                fn.change('.meau_item', 'red')
                                fn.display('.load', 'none')
                                fn.display('.bodies', 'block')
                                break
                        }
                    }
                }else if(res.status === '2'){
                    fn.display('.load', 'none')
                    fn.display('.bodies', 'block')
                    if(!bol){
                        $('.header_template ').text('暂未组织')
                        $('.bodies').html($('<div class="f17 m_t_40 t_c">当前用户没有组织</div>'))
                    }
                }
            }
        })
    }
    //页面加载进入后,根据用户创建的组织进行渲染组织
    $.ajax({
        url: getRoleTreeByUser + JSON.parse(localStorage.getItem('user')).id,
        type: 'get',
        success: function (res) {
            if (res.status == '1') {
                for (var i = 0, msg = res.msg; i < msg.length; i++) {
                        data.arr.push(msg[i])
                        arrfn(data.arr, msg[i].children)
                        //判断url是否有参数
                }
                aj(true)
                $('.meau_box').append(tpl.meau(data.arr, 'name'))
                if(url === null){
                    $('.header_template').text(data.arr[0].name)
                    data.role = data.arr[0].name
                    navfn(data.arr[0].id)
                }else{
                    var eq = data.arr.filter(function(item){
                        return parseInt(item.id) === parseInt(url.roid)
                    })
                    $('.header_template').text(eq[0].name)
                    data.role = eq[0].name
                    navfn(eq[0].id)
                }
                fn.change('.meau_item', 'red')
                fn.display('.load', 'none')
                fn.display('.bodies', 'block')
            } else if (res.status === '0') {
                //检测到未创建组织,则查询是否加入过组织
                aj(false)
            }
        },
        error: function (err) {

        }
    })
    //职位下用户渲染函数
    function box(posid) {
        $.ajax({
            url:showJoinPosForDjApply+'offset=0'+'&limit=100'+'&posId='+posid+'&isPass=1',
            type: 'get',
            success: function (res) {
                if (res.status === '0') {
                    data.person = []
                    var html = tpl.everyone(res.msg.userList)
                    $('.box').html(html)
                    person()
                } else if (res.status === '1') {
                    //如果没有用户
                    $('.box').html($('<div class="m_t_40 f15" style="text-align:center">该职位暂无用户</div>'))
                }
            },
            error: function (err) {
                //    报错
            }
        })
    }

    $('.meau').on('touchstart', function () {
        switch ($('.meau_box').css('right')) {
            case '0px':
                $(this).css({
                    'transform': 'rotate(0deg)'
                })
                $('.meau_box').css({
                    'right': '-100%',
                })
                break;
            case -w + 'px':
                $(this).css({
                    'transform': 'rotate(-90deg)'
                })
                $('.meau_box').css({
                    'right': '0%',
                })
                break
        }
    })
    scroll()
   // 滑动时,判断是否滑动
   function scroll(){
       $('body').on('touchstart', function (e) {
           dis.startY = (window.event||e).targetTouches[0].clientY
       })
       $('body').on('touchend', function (e) {
           var ele = window.event||e
           dis.endY = ele.changedTouches[0].clientY
           dis.Y = dis.endY - dis.startY
           if(dis.Y == 0){
               if($(ele.target).is('.invite,.invite *')){
                   document.querySelector('.load').style.display = 'flex'
                   var search = 'posid=' + data.post.pos_id + '&title=' + data.role + '-' + data.post.posName+'&roid='+data.post.role_id
                   window.location.href = '../invitation/index.html?' + encodeURIComponent(search)
               }else if($(ele.target).is('.assess,.assess *')){
                   document.querySelector('.load').style.display = 'flex'
                   var search = 'posid=' + data.post.pos_id + '&title=' + data.role + '-' + data.post.posName+'&roid='+data.post.role_id
                   window.location.href = '../partyAudit/index.html?' + encodeURIComponent(search)
               }
           }
       })
   }
   //点击search跳转
    $('.search').on('touchstart', function () {
        window.location.href = '../partySearch/index.html'
    })
    //根据点击的组织ID进行后台请求函数
    function navfn(roid) {
        $.ajax({
            url: getRolePosName + roid,
            type: 'get',
            success: function (res) {
                data.navarr = []
                var html = tpl.nav(res.position, 'posName')
                $('.nav').html(html)
                if(url!==null){
                    $('.select').eq(index).addClass('red').siblings().removeClass('red')
                    url = null
                }
                fn.post('.select', 'red')
            },
            error: function (err) {

            }
        })
    }
    //将树形变为数组
    function arrfn(a, arr) {
        if (arr.length != 0) {
            for (var i = 0; i < arr.length; i++) {
                a.push(arr[i])
                arrfn(a, arr[i].children)
            }
            return false
        }
    }
   // 切割函数
   function cut(arr,fitarr){
       var v = []
       var rolarr = []
       fitarr.forEach(function(item){
           rolarr.push(item.id)
       })
       for(var i =0;i<rolarr.length;i++){
           iteration(arr,rolarr[i])
       }
       //迭代判断
       function iteration(arr,id){
           for(var i =0;i<arr.length;i++){
               if(arr[i].id == id && arr[i].children.length != 0){
                   v.push(arr[i])
                   return false
               }else if(arr[i].id !== id &&arr[i].children.length != 0){
                   iteration(arr[i].children,id)
               }
           }
       }
       return v
   }
    //成员点击函数
    function person(){
       var startY = null,endY=null
       $('.everyone').on('touchstart',function(e){
           startY = (window.event||e).targetTouches[0].clientY
       })
        $('.everyone').on('touchend',function(e){
            var index = $(this).index()
            endY = (window.event||e).changedTouches[0].clientY
            if(startY ==endY){
                var search = 'posid=' + data.post.pos_id + '&title=' + data.role + '-' + data.post.posName+'&roid='+data.post.role_id+'&itemid='+data.person[index]
                window.location.href = '../partyItem/index.html?' + encodeURIComponent(search)
            }
        })
    }
})