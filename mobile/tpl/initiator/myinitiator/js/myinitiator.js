/**
 * Created by Administrator on 2018/4/18.
 */
window.onload = function(){
    var mouse = {
        Y: null,
        startY: null,
        moveY: null,
        endY:null,
        down: function () {
            $('.top').css({
                'max-height': '2rem',
                'overflow': 'auto'
            })
        },
        up: function () {
            $('.top').css({
                'max-height': '0',
                'overflow': 'hidden'
            })
        }
    }
    var data = {
        arr: [],
        completedArr:[],
        //待审核分页
        await_page: {
            limit: 10,
            isfinish: 0,
            total:0,
            index:-1
        },
        //已审核分页
        completed_page: {
            limit: 10,
            isfinish: 1,
            total:0,
            index:-1
        },
        //用户ID
        userId: JSON.parse(localStorage.getItem('user')).id,
        obj: {
            classname: null,
            deploymentId: null,
            nodeid: null,
            variableid: null,
            starttime: null,
            type: null,
            endtime: null,
            time: null
        }
    }
    var nav  = 'await'
    var WaitH = $('.volatileWait').height()
    var CompletedH = $('.volatileCompleted').height()
    var h = window.innerHeight
    $('.load').css('height',h)
    var topH = document.getElementsByClassName('top')[0].scrollHeight
    var fn = {
        load:function () {
            $('.load').css({
                'opacity':'1',
                'zIndex':'99999',
            })
            setTimeout(function(){
                $('.load').css({
                    'opacity':'0',
                    'zIndex':'-1',
                })
            },1000)
        }
    }
    $('.quit').on('touchstart',function(){
        window.history.go(-1)
    })
    //首次加载请求分页
    page(data.await_page, data.userId,'await')
    page(data.completed_page, data.userId,'completed')
    //tob点击切换事件
    $('.navbar').on('touchstart', function (e) {
        var e = window.event || e
        var ele = e.srcElement || e.target
        var className = ele.classList[0]
        switch (className) {
            case 'await':
                $('.await').addClass('pass').siblings().removeClass('audit')
                $('.moudleBox').css({
                    'transform': 'translateX(0%)',
                })
                $('.moudle').css({
                    'height':$('.volatileWait').height()
                })
                $('.moudle').css({
                    'height':WaitH
                })
                nav = 'await'
                break
            case 'completed':
                $('.completed').addClass('audit').siblings().removeClass('pass')
                $('.moudleBox').css({
                    'transform': 'translateX(-50%)',
                })
                $('.moudle').css({
                    'height':CompletedH
                })
                nav = 'completed'
                break
        }
    })
    //页面加载滑动事件
    $(window).on('scroll', function () {
        var _this = $(this)
        if (Math.floor($(document).height()- _this.scrollTop()) == h) {
            switch (nav){
                case 'await':
                    var c = data.await_page.limit*data.await_page.index
                    $('.moudle').css({
                        'height':WaitH
                    })
                    if(c<data.await_page.total){
                        page(data.await_page,data.userId,'await')
                    }else {
                        $('.volatileWait .hint').css({
                            'display':'block'
                        })
                    }
                    break;
                case 'completed':
                    var c = data.completed_page.limit*data.completed_page.index
                    $('.moudle').css({
                        'height':CompletedH
                    })
                    if(c<data.completed_page.total){
                        page(data.completed_page,data.userId,'completed')
                    }else {
                        $('.volatileCompleted .hint').css({
                            'display':'block'
                        })
                    }
                    break;
            }
        }
    })
    $(document).on('touchstart', function (e) {
        mouse.startY = (window.event || e).targetTouches[0].clientY
    })
    $(document).on('touchmove', function (e) {
        mouse.moveY = mouse.startY - (window.event || e).targetTouches[0].clientY
        if (($('body').height() - $(window).scrollTop()) > h){
            //上滑top显示
            if (mouse.moveY < 10) {
                mouse.down()
                //下滑top隐藏
            } else if (mouse.moveY > -10) {
                mouse.up()
            }
        }
    })
    $(document).on('touchend', function (e) {
        var e = window.event || e
        mouse.endY = mouse.startY - (window.event || e).changedTouches[0].clientY
    })
    //page函数
    function page(obj, id,who) {
        switch (who){
            case 'await':
                data.await_page.index+=1
                var offset = data.await_page.index*obj.limit
                $('.volatileWait .loading').css({
                    'display':'block'
                })

                $.ajax({
                    type: 'get',
                    url: findMyApplyProc+'offset=' + offset + '&limit=' + obj.limit + '&beginTime=&endTime=&isfinish=' + obj.isfinish + '&userId=' + id,
                    success: function (res) {
                        if (res.result === 'success') {
                            if(res.rows.length != 0){
                                data.await_page.total = res.total
                                var html = ''
                                res.rows.forEach(function (item) {
                                    var state = '待审批'
                                    var tplobj = {
                                        start:state,
                                        // deploymentId:item.formData.deploymentId,
                                        nodeid:item.formData.nodeid,
                                        variableid:item.formData.variableid,
                                        processDefId:item.processDefId,
                                        processInId:item.processInId,
                                        classname: item.formData.classname,
                                        time: item.processStartDate,
                                        // type:item.formData.eName==null?'':item.formData.eName,
                                        // starttime:item.formData.eBeginTime ==null?'':item.formData.eBeginTime,
                                        // endtime:item.formData.eEndTime ==null?'':item.formData.eEndTime,
                                    }
                                    var mo = {
                                        classname: item.formData.classname,
                                        time: item.processStartDate,
                                        type:item.formData.eName==null?'':item.formData.eName,
                                        starttime:item.formData.eBeginTime ==null?'':item.formData.eBeginTime,
                                        endtime:item.formData.eEndTime ==null?'':item.formData.eEndTime,
                                        start:state,
                                    }
                                    data.arr.push(tplobj)
                                    html += tpl(mo,state)
                                })
                                $('.Wait_main').append(html)
                                WaitH = $('.volatileWait ').height()
                                $('.volatileWait .group').on('click',function(){
                                    fn.load()
                                    if(mouse.endY===0){
                                        var index = $(this).index()
                                        var obje = encodeURIComponent(JSON.stringify(data.arr[index]))
                                        window.location.href = "../mydetails/index.html?obj="+obje
                                    }
                                })
                                $('.volatileWait .loading').css({
                                    'display':'none'
                                })
                                $('.moudle').css({
                                    'height':WaitH+'px'
                                })
                                //    获取渲染后的高度
                            }else{
                                $('.volatileWait .hint').css({
                                    'display':'block'
                                })
                                $('.volatileWait .loading').css({
                                    'display':'none'
                                })
                            }
                        }
                    }
                })

                break
            case 'completed':
                data.completed_page.index+=1
                var offset = data.completed_page.index*obj.limit
                $('.volatileCompleted .loading').css({
                    'display':'block'
                })
                $.ajax({
                    type: 'get',
                    url: findMyApplyProc+'offset=' + offset + '&limit=' + obj.limit + '&beginTime=&endTime=&isfinish=' + obj.isfinish + '&userId=' + id,
                    success: function (res) {
                        if (res.result === 'success') {
                            if(res.rows.length != 0){
                                data.await_page.total = res.total
                                var html = ''
                                res.rows.forEach(function (item) {
                                    var state ='已审批'
                                    var tplobj = {
                                        start:state,
                                        // deploymentId:item.formData.deploymentId,
                                        nodeid:item.formData.nodeid,
                                        variableid:item.formData.variableid,
                                        processDefId:item.processDefId,
                                        processInId:item.processInId,
                                        classname: item.formData.classname,
                                        time: item.processStartDate,
                                        // type:item.formData.eName==null?'':item.formData.eName,
                                        // starttime:item.formData.eBeginTime ==null?'':item.formData.eBeginTime,
                                        // endtime:item.formData.eEndTime ==null?'':item.formData.eEndTime,
                                    }
                                    var mo = {
                                        classname: item.formData.classname,
                                        time: item.processStartDate,
                                        type:item.formData.eName==null?'':item.formData.eName,
                                        starttime:item.formData.eBeginTime ==null?'':item.formData.eBeginTime,
                                        endtime:item.formData.eEndTime ==null?'':item.formData.eEndTime,
                                        start:state,
                                    }
                                    data.completedArr.push(tplobj)
                                    html += tpl(mo,state)
                                })
                                $('.Completed_main').append(html)
                                CompletedH = $('.volatileCompleted').height()
                                $('.volatileCompleted .group').on('click',function(){
                                    fn.load()
                                    if(mouse.endY===0){
                                        var index = $(this).index()
                                        var obje = encodeURIComponent(JSON.stringify(data.completedArr[index]))
                                        window.location.href = "../mydetails/index.html?obj="+obje
                                    }
                                })
                                $('.volatileCompleted .loading').css({
                                    'display':'none'
                                })
                                if(offset!=0&&nav!='Completed'){
                                    $('.moudle').css({
                                        'height':CompletedH
                                    })
                                }
                                //    获取渲染后的高度
                            }else{
                                $('.volatileCompleted .hint').css({
                                    'display':'block'
                                })
                                $('.volatileCompleted .loading').css({
                                    'display':'none'
                                })
                            }
                        }
                    }
                })
                break
        }
    }
    //模板函数
    function tpl(obj,nav) {
        var s = nav === '待审批'?'待审批':'已审批'
        var cla = nav === '待审批'?'pass':'audit'
        var tiem = getTime(obj.time)
        var tpl = '<a  class="group">' +
            '<div class="phone">' +
            '<img src="" alt="">' +
            '</div>' +
            '<div class="container">' +
            '<div class="call">' + obj.classname + '</div>' +
            '<div class="type">请假类型:&nbsp;'+obj.type+'</div>' +
            '<div class="starttime">开始时间: '+obj.starttime+'</div>' +
            '<div class="endtime">结束时间: '+obj.endtime+'</div>' +
            '<div class="state '+cla+'">'+s+'</div>' +
            '</div>' +
            '<div class="time">' + tiem + '</div>' +
            '</a>'
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
}

