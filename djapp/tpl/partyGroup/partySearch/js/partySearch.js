/**
 * Created by Administrator on 2018/4/25.
 */
$(function () {
    var indexMax
    var list = document.getElementsByClassName('nav_list')
    var  mavW = (list.length-1) * 23.5+15
    $('.nav').css({
        "width":mavW+'%'
    })
    translateX()
    function translateX(){
        var navWidth = $('.nav_box').width()
        var el = $('.nav')[0]
        var rightW = $('.nav').width() - navWidth
        var w = $(list[1]).width()/25
        var x,startX,moveX,endX
        var index = 0
        el.addEventListener('touchstart',function(e){
            startX = (e||window.event).targetTouches[0].clientX
        })
        el.addEventListener('touchmove',function(e){
            moveX = (e || window.event).targetTouches[0].clientX - startX
            x = $('.nav')[0].offsetLeft + moveX
            $('.nav').css({
                'left':x+'px'
            })
        })
        el.addEventListener('touchend',function(e){
            var e = window.event||e
            var ele = e.srcElement||e.target
            var end = e.changedTouches[0].clientX
            var endX = end - startX
            if(end===startX){
                navActive(ele)
            }
            if(Math.abs(endX)>w){
                var width = endX+$('.nav')[0].offsetLeft
                $('.nav').css({
                    'left':width+'px'
                })
                if(width >0){
                    $('.nav').css({
                        'left':0+'px'
                    })
                }
                if(width<-rightW){
                    $('.nav').css({
                        'left':-rightW+'px'
                    })
                }
            }
        })
    }
    function navActive(ele){
            $(ele).addClass('red').siblings().removeClass('red')
    }
})