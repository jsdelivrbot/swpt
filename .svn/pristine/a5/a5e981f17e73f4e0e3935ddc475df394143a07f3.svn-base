/**
 * Created by Administrator on 2018/4/18.
 */
window.onload = function () {
    var search = window.location.search
    var url = search.replace(/^(\?parameter=)/, '')
    var obj = JSON.parse(decodeURIComponent(url))
    var user = JSON.parse(localStorage.getItem('user'))
    var d = {
        assignee: null,
        name: null,
        bol: true
    }
    var org_data = null
    var job_data = null
    var person_data = null
    var database = {
        person: null
    }
    var data = {
        uid: 0,
        taskId: obj.taskId,
        deploymentid: obj.deploymentId,
        processinsid: obj.processinsid,
        comment: $('textarea').val(),
        assignee: null,
        mail: null,
        userid: null,
        classname: obj.classname,
        variableid: obj.variableid,
        nodeid: obj.nodeid,
        eName: obj.eName,
        eEndTime: obj.eEndTime,
        eBeginTime: obj.eBeginTime
    }
    var fn = {
        modal: function (name) {
            $('#modal').css({
                'zIndex': '999',
                'opacity': '1'
            })
            $('.modal_box').css({
                'width': '4rem',
                'height': '2rem'
            })
            $(name).css({
                'display': 'block'
            })
            setTimeout(function () {
                $('#modal').css({
                    'zIndex': '-1',
                    'opacity': '0'
                })
                $('.modal_box').css({
                    'width': '0',
                    'height': '0'
                })
                $(name).css({
                    'display': 'none'
                })
            }, 1000)
        }
    }
    var h = window.innerHeight
    $('#modal').css({
        'height': h + 'px'
    })
    $('.add_btn').on('touchstart', function () {
        modal('.a')
    })
    $('.b_btn').on('touchstart', function () {
        if (data.assignee != (null || undefined)) {
            $.ajax({
                type: 'post',
                url: completeTask,
                data: data,
                success: function (res) {
                    if (res.result === 'success') {
                        modal('.c')
                        window.location.href = '../myApproval/index.html'
                    }
                },
                error: function (res) {
                    modal('.d')
                }
            })
        } else {
            modal('.b')
        }
    })

    $('.news').on('touchstart', function (e) {
        if ($(this).is('.news')) {
            tpl.newsnone()
            $('.b').css({
                'display': 'none'
            })
        }
    })

    //返回页面
    $('.opinion .quit').on('touchstart', function () {
        window.history.back(-2)
    })
    //点击选择审核人跳转到选择审核人页面
    $('.active ').on('touchstart', function () {
        history.pushState('avtive', '', '?jump=org')
        d.bol = false
        $('.box').css({
            'transform': 'translateX(-50%)'
        })
        Current()
        document.body.scrollTop = document.documentElement.scrollTop = 0
    })
    //审核页面,点击确定选择审批人
    $('.avtive_go').on('touchstart', function () {
        d.assignee = data.assignee
        if (data.assignee != null) {
            window.history.go(-1)
            d.bol = true
            $('.active').text($('.p_input').val())
            $('.box').css({
                'transform': 'translateX(0%)'
            })
        } else {
            modal('.b')
        }
    })
    $('.org .quit').on('touchstart', function () {
        document.querySelector('.box').style.transform = 'translateX(0)'
        window.history.go(-1)
    })
    $('.job .quit').on('touchstart', function () {
        window.history.go(-1)
        document.querySelector('.user_box').style.transform = 'translateX(0)'
    })
    $('.person .quit').on('touchstart', function () {
        window.history.go(-1)
        document.querySelector('.user_box').style.transform = 'translateX(-33.33%)'
    })
    function Current() {
        $.ajax({
            url: getCurrentRole + user.id,
            type: 'get',
            success: function (res) {
                if (res.status === '1') {
                    org_data = []
                    var arr = objHeavy(res.msg.roleList)
                    var html = org_tpl(arr)
                    $('.org .bodies').html(html)
                    org()
                }
            },
            error: function (err) {
                //    如果请求错误
            }
        })
    }

    window.addEventListener('popstate', function (event) {
        var tembox = function (who, some) {
            document.querySelector(who).style.transform = some
        }
        if (event.state === 'index') {
            tembox('.box', 'translateX(0%)')
        } else if (event.state === 'avtive') {
            tembox('.user_box', 'translateX(0%)')
        } else if (event.state === 'job') {
            tembox('.user_box', 'translateX(-33.33%)')
        }
    })
    // 组织函数,点击切换到对应组织职位.
    function org() {
        var startY = null, endY = null
        $('.org_item').on('touchstart', function (e) {
            startY = (window.event || e).targetTouches[0].clientY
        })
        $('.org_item').on('touchend', function (e) {
            endY = (window.event || e).changedTouches[0].clientY
            if (startY === endY) {
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
                            document.querySelector('.user_box').style.transform = 'translateX(-33.33%)'
                            history.pushState('job', '', '?jump=job')
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
        var startY = null, endY = null
        $('.job_item').on('touchstart', function (e) {
            startY = (window.event || e).targetTouches[0].clientY

        })
        $('.job_item').on('touchend', function (e) {
            endY = (window.event || e).changedTouches[0].clientY
            if (startY === endY) {
                var index = $(this).index()
                $.ajax({
                    url: showJoinPosForDjApply + 'offset=0&limit=200&isPass=1' + '&posId=' + job_data[index].pos_id,
                    type: 'get',
                    success: function (res) {
                        if (res.status === '0') {
                            person_data = []
                            var html = person_tpl(res.msg.userList)
                            $('.person .bodies').html(html)
                            person()
                            history.pushState('person', '', '?jump=person')
                            document.querySelector('.user_box').style.transform = 'translateX(-66.66%)'
                        } else if (res.status === "1") {
                            history.pushState('person', '', '?jump=person')
                            document.querySelector('.user_box').style.transform = 'translateX(-66.66%)'
                            $('.person .bodies').html($('<div class="">该职位暂无用户</div>'))
                        } else {
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

    // 管理员 函数
    function admin(uidarr) {
        for (var i = 0; i < uidarr.length; i++) {
            var uid = uidarr[i]
            $.ajax({
                url: getUserById + uidarr[i],
                type: 'get',
                success: function (res) {
                    if (res.status == '1') {
                        var obj = {
                            userId: uid,
                            chinese_name: res.msg.htUser.chinese_name
                        }
                        admin_data.push(obj)
                        var html = admin_tpl(res.msg.htUser)
                        $('.admin').append(html)
                        $('.admin_btn').on('touchstart', function () {
                            var index = $(this).parent().index()
                            database.person = admin_data[index]
                            document.querySelector('#template_box').style.transform = 'translateX(0)'
                            $('.userPath_box').text('管理员-' + database.person.chinese_name)
                            window.history.go(-1)
                        })
                    }
                },
                error: function (err) {

                }
            })
        }
    }

    //管理员模板函数
    function admin_tpl(item) {
        var tpl = '<div class="person_item f17">管理员:' + item.chinese_name +
            '<span class="person_phone f17">' + item.username + '</span>' +
            '<span class="btn_pass admin_btn f17">确定</span>' +
            '</div>'
        return tpl
    }

    //成员函数
    function person() {
        $('.person_btn').on('touchstart', function () {
            var index = $(this).parent().index()
            database.person = person_data[index]
            data.assignee = database.person.userId
            $('.active').text(database.person.rolename + '-' + database.person.posname + '-' + database.person.chinese_name)
            document.querySelector('.user_box').style.transform = 'translateX(0)'
            document.querySelector('.box').style.transform = 'translateX(0)'
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
            var tpl = '<div class="person_item f17">' + item.chinese_name +
                '<span class="person_phone f17">' + item.username + '</span>' +
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
}

/**
 * code is far away from bug with the animal protecting
 * ┏┓　　　┏┓
 * ┏┛━━━━┛┻━┓
 * ┃　　　　　　┃
 * ┃　　　━　     ┃
 * ┃　┳┛　┗┳　┃
 * ┃　　　　　　┃
 * ┃　　　┻　　 ┃
 * ┃　　　　　　┃
 * ┗━┓　　　┏━┛
 *　     ┃　　　┃神兽保佑
 *　　 ┃　　　┃代码无BUG！
 *　　 ┃　　　┗━━━┓
 *　　 ┃　　　　　　┣┓
 *　　 ┃　　　　　　┏┛
 *　　 ┗┓┓┏━┳┓┏┛
 *　　　┃┫┫ ┃┫┫
 *　　　┗┻┛ ┗┻┛
 *
 *
 * ---------------------------------
 * @Author : Lin.Zhijie
 * @since : Create in 2018年4月16日 下午3:11:57
 **/