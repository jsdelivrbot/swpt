/**
 * Created by Administrator on 2018/4/18.
 */
/**
 * Created by Administrator on 2018/4/19.
 */
$(function () {
    var u = {
        bol: null,
        main: null
    }
    var url = window.location.search
    // 根据url的字段进行判断,obj为表单,u.bol则为true;acrivity为活动,u.bol则为fasle
    if (url.indexOf('?obj=') > -1) {
        u.bol = true
        u.main = url.replace(/^(\?obj=)/, '')
    } else if (url.indexOf('?activity=') > -1) {
        u.bol = false
        u.main = url.replace(/^(\?activity=)/, '')
    }
    var uid = JSON.parse(localStorage.getItem('user')).id
    // var uid = 441
    var fn = {
        block: function () {
            $('.bodies').css({
                "display": "block"
            })
            $('.footer').css({
                "display": "block"
            })
        },
        none: function () {
            $('.bodies').css({
                "display": "none"
            })
            $('.footer').css({
                "display": "none"
            })
        },
        loading: function (num) {
            switch (num) {
                case 'none':
                    $('.loading').css({
                        'display': 'none'
                    })
                    break;
                case 'block':
                    $('.loading').css({
                        'display': 'block'
                    })
                    break
            }
        }
    }
    fn.loading('none')
    try {
        if (!!url) {
            $('.quit').on('touchstart', function () {
                window.history.go(-1)
            })
            var obj = JSON.parse(decodeURIComponent(u.main))
            var parameter = {
                taskId: obj.taskId,
                deploymentId: obj.deploymentId,
                processinsid: obj.processInId,
                classname: obj.classname,
                eName: obj.type,
                nodeid: obj.nodeid,
                eBeginTime: obj.starttime,
                eEndTime: obj.endtime,
                variableid: obj.variableid
            }
            $('.repeal_btn').on('touchstart', function () {
                var o = encodeURIComponent(JSON.stringify(parameter))
                window.location.href = '../opinion/index.html?parameter=' + o
            })
            switch (obj.start) {
                case '已审批':
                    $('.state').addClass('audit')
                    break;
                case '待审批':
                    $('.state').addClass('pass')
                    break
            }
            var data = {
                classname: obj.classname,
                method: "getById",
                node_id: obj.nodeid,
                record: obj.variableid
            }
            var bol = Object.keys(obj).every(function (item, index) {
                return !!obj[item]
            })
            request(u.bol)
            $('.reminder_btn').on('touchend', function () {
                window.location.href = '../reminder/index.html?msg=' + encodeURIComponent(obj.processInId)
            })
        }
    } catch (err) {
        $('.nothing').css({
            'display': 'block'
        })
    }


    //相应成功函数
    function request(bol) {
        $('.alterable').text(data.classname)
        $('.firstflow .flowtime').text(getTime(obj.time))
        $('.loading').css({
            'display': 'block'
        })
        $.ajax({
            type: 'get',
            url: selectUserById + uid,
            success: function (suc) {
                if (suc.status === '1') {
                    var user = suc.msg.user
                    switch (bol) {
                        case true:
                            $.ajax({
                                type: 'POST',
                                url: selectFormRecord,
                                headers: {'Content-Type': 'application/json'},
                                data: JSON.stringify(data),
                                success: function (res) {
                                    if (res.status == '0') {
                                        $('.loading').css({
                                            'display': 'none'
                                        })
                                        fn.block()
                                        var html = tpl('state', obj, user, res.msg.data, res.msg.selected, res.msg.title)
                                        $('.details').append(html)
                                    } else if (res.status == '2') {
                                        $('.loading').css({
                                            'display': 'none'
                                        })
                                        $('.nothing').css({
                                            'display': 'block'
                                        })
                                    }
                                }
                            })
                            $.ajax({
                                type: 'get',
                                url: activitiTrack + obj.processInId + '&uid=0',
                                success: function (res) {
                                    if (res.isLogin === 'yes') {
                                        var html = ''
                                        var arr = res.activitiTrackList
                                        arr.splice(0, 1)
                                        if (arr[arr.length - 1].name === '结束') {
                                            arr.pop()
                                            $('.repeal_btn').remove()
                                            $('.reminder').remove()
                                        }
                                        for (var i = 0; i < arr.length; i++) {
                                            if (arr[i].name === '本人' && !!arr[i].lastUpdateTime && obj.start === '已审批') {
                                                $('.repeal_btn').remove()
                                                $('.reminder').remove()
                                            }
                                        }
                                        arr.forEach(function (item) {
                                            html += flowTpl(item)
                                        })
                                        $('.firstflow').after(html)
                                    }
                                }
                            })
                            break;
                        case flase:
                            $.ajax({
                                url: 'http://192.168.0.192:21008/activity/searchKey?key=王',
                                type: 'get',
                                success: function (res) {
                                    var res = res.msg[0]
                                    console.log(res)
                                    var html = activity(res, user)
                                    $('.details').append(html)
                                }
                            })

                            break
                    }
                }
            }
        })

    }

    // 活动模板,参数为活动请求对象,用户信息
    function activity(obj, user) {
        var uptpl = '<p class="name f17">姓名:&nbsp;' + user.chinese_name + '</p>' +
            // '<p class="section">部门:&nbsp;产品部</p>' +
            // '<p class="state">状态:&nbsp;当日末排班</p>' +
            '<p class="phone">电话:&nbsp;' + obj.phone + '</p>' +
            '<p >活动名称:&nbsp;' + obj.name + '</p>' +
            '<p >开始时间:&nbsp;' + getTime(obj.startTime) + '</p>' +
            '<p >结束时间:&nbsp;' + getTime(obj.endTime) + '</p>' +
            '<p >活动说明:&nbsp;' + obj.explain + '</p>' +
            '<p >活动主题:&nbsp;' + obj.theme + '</p>' +
            '<p >活动地址:&nbsp;' + obj.address + '</p>'
        return uptpl
    }

    //模板函数,方法传入6个参数,分别是跳转页面的审批状态,传入对象,用户信息,百度编辑器的三个参数
    function tpl(name, obj, user, data, selected, title) {
        var stateDom = document.getElementsByClassName(name)
        $('.flow_name').text(user.chinese_name)
        for (var i = 0; i < stateDom.length; i++) {
            stateDom[i].innerText = obj.start
            switch (obj.start) {
                case '待审批':
                    $(stateDom[i]).addClass('pass')
                    break;
                case '已审批':
                    $(stateDom[i]).addClass('audit')
                    break
            }
        }
        var uptpl = '<p class="name f17">姓名:&nbsp;' + user.chinese_name + '</p>' +
            // '<p class="section">部门:&nbsp;产品部</p>' +
            // '<p class="state">状态:&nbsp;当日末排班</p>' +
            '<p class="phone">电话:&nbsp;' + user.family_phone + '</p>' +
            '<p class="number">审批编号:&nbsp;' + obj.processInId + '</p>'

        var downtpl = ''
        Object.keys(selected).reverse().forEach(function (item, index) {
            downtpl += '<p>' + title[index] + ':&nbsp;' + data[item] + '</p>'
        })
        return uptpl + downtpl
    }

    function flowTpl(obj) {
        var createTime = getTime(obj.createTime)
        var state = !!obj.lastUpdateTime ? '已同意' : '待审核'
        var span = !!obj.lastUpdateTime ? '转交' : '发送'
        var cls = !!obj.lastUpdateTime ? "audit" : "pass"
        if (obj.commentMessage === '申请人已撤回') {
            var tpl = '<div class="lastflow">' +
                '<div class="flowphoto">' +
                '<img src="" alt="">' +
                '<div class="flowborder"></div>' +
                '</div>' +
                '<div class="flowname"><span class=' + cls + '>申请人已撤回</span>' +
                '</div>' +
                '<div class="flowtime">' + createTime + '撤回</div>' +
                '</div>'
        } else {
            var tpl = '<div class="lastflow">' +
                '<div class="flowphoto">' +
                '<img src="" alt="">' +
                '<div class="flowborder"></div>' +
                '</div>' +
                '<div class="flowname">' + obj.assigneeName + '&nbsp;&nbsp;<span class=' + cls + '>' + state + '</span>' +
                '</div>' +
                '<div class="flowtime">' + createTime + span + '</div>' +
                '</div>'
        }
        return tpl
    }

    //时间函数
    function getTime(data) {
        var date = new Date(data)
        var Y = date.getFullYear()
        var M = date.getMonth() + 1
        var D = date.getDate()
        return Y + '-' + M + '-' + D
    }
})