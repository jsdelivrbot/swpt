/**
 * Created by Administrator on 2018/4/20.
 */
//var config = '192.168.0.121:8080'
$(function () {
    $('.chart .quit').on('touchstart',function(){
        window.history.go(-1)
    })

    console.log(window.localHost);
    var uid = JSON.parse(localStorage.getItem('user')).id
    var username = JSON.parse(localStorage.getItem('user')).username
    var wid = window.innerWidth
    var $modal = $('#modal')
    var $news = $('.news')
    var $flowPath_box = $('.flowPath_box')
    var url = window.location.href
    /*数据存储*/
    var database = {
        active: {
            name: null,
            description: null,
            id: null,
            deploymentId: null
        },
        $imgW: 0,
        page:{
            itemsPerPage: 10,
            count: 0,
            index: 0,
        },
        user: {},
        person:null
    }
    var org_data = null
    var job_data = null
    var person_data = null
   var admin_data = null
    var site = {
        moveX:null,
        startX:null,
        endX :null
    }
    h = window.innerHeight
    $modal.css({
        'height': h + 'px'
    })
    $('.modual').css({
        'height': h + 'px'
    })
    //发送流程请求
    $.ajax({
        type: 'get',
        url: createSession + 'id=' + uid + '&name=' + username,
        success: function (res) {
            active_page(database.page.index, database.page.itemsPerPage)
        }
    })
    //流程模板
    function template(obj) {
        var str = '<div class="table">' +
            '<div class="span"></div>' +
            '<div class="meseage">' +
            '<div class="name f14">流程名称:<span class="f16"> ' + obj.name + '</span></div>' +
            '<div class="description f14">' + obj.description + '</div>' +
            '</div>' +
            '<div class="id btn_chakan" cid="' + obj.id + '">流程图</div>' +
            '<div class="check btn_pass" deploymentId="' + obj.deploymentId + '">确定</div>' +
            '</div>'
        return str
    }

    $('.flow').css({
        'height': h,
        'overflow': 'hidden'
    })
    $('.user').css({
        'height': h + 'px',
        'overflow': 'hidden'
    })
    $('.user .bodies').css({
        'height': h - $('.header').height() + 'px',
    })
    var tpl = {
        last: function (who) {
            $('#template_box').css({
                'transform': 'translateX(-50%)'
            })
            switch (who) {
                case 'flow':
                    $('.flow').css({
                        'height': 'auto',
                        'overflow': 'auto',
                        'zIndex': '9999'
                    })
                    history.pushState('flow', '', url + '#/flow')
                    break;
                case 'user':
                    $('.user').css({
                        'zIndex': '9999'
                    })
                    history.pushState('flow', '', url + '#/user')
                    break
            }
            $('.chart').css({
                'height': h + 'px',
                'overflow': 'hidden'
            })
            document.body.scrollTop = document.documentElement.scrollTop = 0
        },
        next: function (who) {
            $('#template_box').css({
                'transform': 'translateX(0%)'
            })
            switch (who) {
                case 'flow':
                    $('.flow').css({
                        'height': h,
                        'overflow': 'hidden',
                        'zIndex': '0'
                    })
                    break;
                case 'user':
                    $('.user').css({
                        'zIndex': '0'
                    })
                    break
            }
            $('.chart').css({
                'height': 'auto',
                'overflow': 'auto'
            })
        },
        hidden: function (ele) {
            $(ele).css({
                'overflow': 'hidden'
            })
        },
        auto: function (ele) {
            $(ele).css({
                'overflow': 'auto'
            })
        },
        newsblock: function (name) {
            $('.news').css({
                'top': $(document).scrollTop(),
                'opacity': '1',
                'zIndex': '888',
                'height': h + 'px',
            })
            $('.news_box').css({
                'width': '4rem',
                'height': '2rem'
            })
            $(name).css({
                'display': 'block'
            })
        },
        newsnone: function (name) {
            $('.news').css({
                'top': $(document).scrollTop(),
                'opacity': '0',
                'zIndex': '-1',
                'height': '0'
            })
            $('.news_box').css({
                'width': '0',
                'height': '0'
            })
            $(name).css({
                'display': 'none'
            })
        }
    }


    modalfun()
    function modalfun() {
        // if (url.indexOf('#/')> -1) {
        //     var address = null
        //     if(url.indexOf('#/flow')>-1){
        //         address = url.replace(/#\/flow/g, '')
        //     }else if(url.indexOf('#/user')>-1){
        //         address = url.replace(/#\/user/g, '')
        //     }
        //     history.replaceState('', '', address)
        // }
        window.addEventListener('popstate', function (event) {
            var tembox = function (who, some) {
                document.querySelector(who).style.transform = some
            }
            if (event.state === '' || event.state === null) {
                tpl.next('flow')
                tpl.next('user')
            } else if (event.state === 'flow') {
                tembox('.user_box', 'translateX(0%)')
            }else if(event.state === 'job'){
                tembox('.user_box', 'translateX(-33.33%)')
            }
        })

        $('.flowPath_box').on('touchstart', function () {
            tpl.last('flow')
        })
        $('.userPath_box').on('touchstart', function () {
            tpl.last('user')
        })
        $('.flow .quit').on('touchstart', function () {
            tpl.next('flow')
            window.history.go(-1)
        })
        $('.org .quit').on('touchstart', function () {
            tpl.next('user')
            window.history.go(-1)
        })
        $('.job .quit').on('touchstart', function () {
            window.history.go(-1)
            document.querySelector('.user_box').style.transform = 'translateX(0)'
        })
        $('.person .quit').on('touchstart',function(){
            window.history.go(-1)
            document.querySelector('.user_box').style.transform = 'translateX(-33.33%)'
        })
        //流程列表事件
        flowfun()
        //流程图触屏事件
        active_img()
        function flowfun() {
            var $modal_main = $('.modal_main')
            /*check函数*/
            $modal_main.on('touchstart', function (e) {
                var e = window.event || e
                var ele = e.srcElement || e.target
                var $ele = $(ele)
                //如果点击的是确定,则返回该条数据,并跳回首页
                if ($ele.is('.check,.check *')) {
                    var part = $ele.parent()
                    database.active.name = part.find('.name').find('span').text()
                    database.active.description = part.find('.description').text()
                    database.active.id = part.find('.id').attr('cid')
                    database.active.deploymentId = part.find('.check').attr('deploymentId')
                    $('.flowPath_box').text(database.active.name + '模型')
                    tpl.next('flow')
                    window.history.go(-1)
                }
                //如果点击的是模型图,则显示模型图
                if ($ele.is('.id,.id *')) {
                    var top = $(document).scrollTop();
                    $('#modal').css({
                        'zIndex': '999',
                        'opacity': '1',
                        'top': top
                    })
                    var part = $ele.parent()
                    var processDefinitionId = part.find('.id').attr('cid')
                    var adres = u+'/rapid_dev/getProcessDefDiagram.do?processDefinitionId=' + processDefinitionId
                    $('.modal_img').attr('src', adres)
                    database.$imgW = $('.modal_img').width()
                    tpl.hidden('html,body')
                }
            })
        }

        //点击模太框消失
        $('#modal').on('touchstart', function (e) {
            var e = window.event || e
            var ele = e.srcElement || e.target
            if ($(ele).is('#modal')) {
                $('#modal').css({
                    'zIndex': '-1',
                    'opacity': '0'
                })
                tpl.auto('html,body')
            }
        })
        function active_img() {
            var $modal_img = $('.modal_img')
            var startX, moveX, X, endX, Y, startY, moveY
            var left = $modal_img[0].offsetLeft
            var $boxW = $('#modal_box').width()

            var img = {
                small: function () {
                    $('.modal_img').css('width', '100%')
                },
                big: function () {
                    $('.modal_img').css('width', '190%')
                },
                bol: false
            }
            $modal_img.on('touchstart', function (e) {
                startX = (window.event || e).targetTouches[0].clientX
                startY = (window.event || e).targetTouches[0].clientY
            })
            $modal_img.on('touchmove', function (e) {
                var width = parseInt($modal_img.css('width').replace(/px/, ''))
                moveX = (window.evnet || e).targetTouches[0].clientX - startX
                moveY = (window.evnet || e).targetTouches[0].clientY - startY
                X = $modal_img[0].offsetLeft + moveX
                Y = $modal_img[0].offsetTop + moveY
                $modal_img.css({
                    'marginLeft': X,
                    'moarginTop': Y
                })
                if (X > left) {
                    $modal_img.css({
                        'marginLeft': '-10%'
                    })
                } else if (X < -(width - wid)) {
                    $modal_img.css({
                        'marginLeft': -(width - wid) + 'px'
                    })
                }
            })
            $modal_img.on('touchend', function (e) {
                endX = (window.event || e).changedTouches[0].clientX
                if (startX - endX === 0) {
                    switch (img.bol) {
                        case false :
                            img.big()
                            img.bol = !img.bol
                            break
                        case true:
                            img.small()
                            $modal_img.css({
                                'marginLeft': '-10%'
                            })
                            img.bol = !img.bol
                            break
                    }
                }
            })
        }

        $(window).on('scroll', function () {
            var _this = $(this)
            if (Math.floor($('.flow').height() - _this.scrollTop()) === h) {
                page()
            }
        })
        function page() {
            if ($('.hint').css('display') !== 'block') {
                active_page(database.page.index, database.page.itemsPerPage)
            }
        }
    }

    //流程分页
    function active_page(offset, limit) {
        var mes = {
            offset: offset,
            limit: limit,
        }
        $('.loading').css('display', 'block')
        $.ajax({
            type: 'GET',
            dataType: 'JSON',
            url: processList + 'offset=' + mes.offset + '&limit=' + mes.limit + '&param=&uid=' + uid,
            success: function (res) {
                if (res.rows.length > 0) {
                    var html = ''
                    database.page.count = res.total
                    res.rows.map(function (item) {
                        var obj = {
                            name: item.name,
                            description: item.description,
                            id: item.id,
                            deploymentId: item.deploymentId
                        }
                        html += template(obj)
                    })
                    database.page.index += database.page.itemsPerPage
                    $('.modal_main').append(html)
                    $('.loading').css('display', 'none')
                } else {
                    $('.hint').css('display', 'block')
                    $('.loading').css('display', 'none')
                }
            }
        })
    }

    //点击发送,表单提交
    $('#tplsend').on('touchstart', function () {
        var o = $('form').serializeObject()
        var serializeArray = $('form').serializeArray()
        for (var i = 0; i < serializeArray.length; i++) {
            if (serializeArray[i].value === '') {
             
                tpl.newsblock('.b')
                setTimeout(function(){
                    tpl.newsnone('.b')
                },800)
                return 
            }
        }
        if(database.active.deploymentId === null){
            tpl.newsblock('.a')
            console.log(1)
            setTimeout(function(){
                tpl.newsnone('.a')
            },800)
        }else if(database.person === null){
            tpl.newsblock('.d')
            setTimeout(function(){
                tpl.newsnone('.d')
            },800)
        }else{
            //获取表单值
            var o = $('form').serializeObject()

            //获取流程信息
            var b = {'deploymentid': database.active.deploymentId, 'userid': uid, 'username': username}
            //将二者合并为新对象
            var record = $.extend({}, o, b)
            var data = {
                classname: '',
                method: "insert",
                record: record
            }
            // 发送插入请求
            $.ajax({
                type: 'GET',
                url: nodeId + utfId,
                success: function (sus) {
                    if (sus.msg !== null) {
                        data.classname = sus.msg.value;
                        if (data.classname !== null) {
                            $.ajax({
                                type: 'POST',
                                url: insertFormRecord,
                                data: JSON.stringify(data),
                                headers: {'Content-Type': 'application/json; charset=UTF-8'},
                                dataType: 'json',
                                success: function (res) {
                                    if (res.status == '0') {
                                        var msg = res.msg;
                                        var dataobj = 'variableid=' + msg + '&classname=' + data.classname + '&nodeid=' + utfId + '&deploymentid=' + database.active.deploymentId + '&userId=' + uid + '&eName=' + o.data1 + '&eBeginTime=' + o.data2 + '&eEndTime=' + o.data3 + '&nextUserId='+database.person.userId
                                        $.ajax({
                                            url: getStartFormAndStartProcess,
                                            type: 'post',
                                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                            data: dataobj,
                                            success: function (Formres) {
                                                if (Formres.result) {
                                                    tpl.newsblock('.c')
                                                    setTimeout(function(){
                                                        tpl.newsnone('.c')
                                                    },800)
                                                    //清空表单
                                                    $(":input", "form")
                                                        .not(":button", ":reset", "hidden", "submit")
                                                        .val("")
                                                        .removeAttr("checked")
                                                        .removeAttr("selected");
                                                    //清空流程
                                                    database.active = {
                                                        name: null,
                                                        description: null,
                                                        id: null,
                                                        deploymentId: null
                                                    }
                                                    database.person = null
                                                    $('.userPath_box').text('点击选择流程图')
                                                    $('.flowPath_box').text('点击选择审批人')
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                }
            })
        }
    })
    //
    $('.news').on('touchstart', function (e) {
        if ($(this).is('.news')) {
            tpl.newsnone('.a')
            $('.b').css({
                'display': 'none'
            })
        }
    })

    last_party()
    //审核人选择函数
    function last_party() {
        $.ajax({
            url: getParentRoleAndAdminList + uid,
            type: 'get',
            success: function (res) {
                if (res.status === '1') {
                    if(res.msg.adminList.length >0){
                        admin_data = []
                        admin(res.msg.adminList)
                    }
                    org_data = []
                    var rolarr = objHeavy(res.msg.pRoleList)
                    var html = org_tpl(rolarr)
                    $('.org .bodies').html(html)
                    org()
                } else if (res.status === '2') {
                    //    如果没有用户
                    $('.org .bodies').html($('<div class="m_t_40 t_c f16">暂无组织</div>'))
                }
            },
            error: function (err) {

            }
        })
    }

   // 管理员 函数
   function admin(uidarr){
           for(var i=0;i<uidarr.length;i++){
               var uid = uidarr[i]
               $.ajax({
                   url:getUserById+uidarr[i],
                   type:'get',
                   success:function(res){
                       if(res.status == '1'){
                           var obj = {
                               userId:uid,
                               chinese_name:res.msg.htUser.chinese_name
                           }
                           admin_data.push(obj)
                           var html = admin_tpl(res.msg.htUser)
                           $('.admin').append(html)
                           $('.admin_btn').on('touchstart',function(){
                               var index = $(this).parent().index()
                               database.person = admin_data[index]
                               document.querySelector('#template_box').style.transform = 'translateX(0)'
                               $('.userPath_box').text('管理员-'+database.person.chinese_name)
                               window.history.go(-1)
                           })
                       }
                   },
                   error:function(err){

                   }
               })
           }
   }
   //管理员模板函数
   function admin_tpl(item){
       var tpl = '<div class="person_item f17">管理员:' +item.chinese_name+
           '<span class="person_phone f17">'+item.username+'</span>' +
           '<span class="btn_pass admin_btn f17">确定</span>' +
           '</div>'
       return tpl
   }
    // 组织函数,点击切换到对应组织职位.
    function org() {
       var startY = null,endY = null
        $('.org_item').on('touchstart', function (e) {
             startY = (window.event || e).targetTouches[0].clientY
        })
        $('.org_item').on('touchend',function(e){
            endY= (window.event || e).changedTouches[0].clientY
            if(startY === endY){
                var index = $(this).index()
                $.ajax({
                    url: getRolePosName + org_data[index].id,
                    type: 'get',
                    success: function (res) {
                        if (res.position.length != 0) {
                            job_data = []
                            var html = job_tpl(res.position)
                            $('.job .bodies').html(html)
                            job()
                            history.pushState('job', '', url + '#/job')
                            document.querySelector('.user_box').style.transform = 'translateX(-33.33%)'
                        } else {
                            // 如果数组为空
                        }
                    },
                    error: function (err) {
                        //如果错误
                    }
                })
            }
        })
    }

    //职位函数
    function job() {
       var startY = null,endY =null
        $('.job_item').on('touchstart', function (e) {
            startY = (window.evnet||e).targetTouches[0].clientY
        })
        $('.job_item').on('touchend',function(e){
            endY = (window.evnet||e).changedTouches[0].clientY
            if(startY === endY){
                var index = $(this).index()
                $.ajax({
                    url: showJoinPosForDjApply + 'offset=0&limit=200&isPass=1' + '&posId=' + job_data[index].pos_id,
                    type: 'get',
                    success: function (res) {
                        if(res.status === '0'){
                            person_data = []
                            var html = person_tpl(res.msg.userList)
                            $('.person .bodies').html(html)
                            person()
                            history.pushState('person', '', url + '#/person')
                            document.querySelector('.user_box').style.transform = 'translateX(-66.66%)'
                        }else if(res.status === "1"){
                            //    如果没有数据
                            history.pushState('person', '', url + '#/person')
                            document.querySelector('.user_box').style.transform = 'translateX(-66.66%)'
                            $('.person .bodies').html($('<div class="">该职位暂无用户</div>'))
                        }else{
                            //    如果请求错误
                        }
                    },
                    error: function (err) {
                        // 如果请求失败
                    }
                })
            }
        })
    }

    //成员函数
    function person() {
      $('.person_btn').on('touchstart',function(){
          var index = $(this).parent().index()
          database.person = person_data[index]
          $('.userPath_box').text(database.person.rolename+'-'+database.person.posname+'-'+database.person.chinese_name)
          window.history.go(-3)
      })
    }

    //组织函数
    function org_tpl(arr) {
        var html = []
        var tpl = function (item) {
            var tpl = '<div class="org_item f17">' + item.rolename +
                '<span class="iconfont icon-zuo"></span>' +
                '</div>'
            return tpl
        }
        arr.forEach(function (item) {
            html += tpl(item)
            org_data.push(item)
        })
        return html
    }

    //职位函数模板
    function job_tpl(arr) {
        var html = ''
        var tpl = function (item) {
            var tpl = '<div class="job_item f17">' + item.posName +
                '<span class="iconfont icon-zuo"></span>' +
                '</div>'
            return tpl
        }
        arr.forEach(function (item) {
            html += tpl(item)
            job_data.push(item)
        })
        return html
    }

    //用户函数
    function person_tpl(arr) {
        var html = ''
        var tpl = function (item) {
            var tpl = '<div class="person_item f17">' +item.chinese_name+
                '<span class="person_phone f17">'+item.username+'</span>' +
                '<span class="btn_pass person_btn f17">确定</span>' +
                '</div>'
            return tpl
        }
        arr.forEach(function (item) {
            html += tpl(item)
            person_data.push(item)
        })
        return html
    }


})

jQuery.prototype.serializeObject = function () {
    var obj = new Object();
    $.each(this.serializeArray(), function (index, param) {
        if (!( param.name in obj )) {
            obj[param.name] = param.value;
        }
    });
    return obj;
};
