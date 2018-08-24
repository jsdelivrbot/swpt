/**
 * Created by Administrator on 2018/4/19.
 */
$(function(){
    modal()
    function modal(){
        h = window.innerHeight
        $h = $('.header').height()
        $('.conditionModal').css({
            'height': (h - $h) + 'px'
        })
        $('.prevent').css({
            'height': (h - $h) + 'px'
        })
    }

    //点击监听函数
    $('.filtrate').on('touchstart', function () {
        slideDown()
    })
    //模太框点击取消
    $(document).on('touchstart', function (e) {
        var e = window.event || e
        var ele = e.srcElement || e.target
        if ($(ele).is(".conditionModal")) {
            slideUp()
        }
    })
    function slideDown() {
        $('.conditionModal').css({
            'opacity': '1',
            'zIndex': '9999'
        })
        $('.prevent').css({
            'zIndex':'333'
        })
        $('.conditionModal .box').css({
            'transform': 'translateY(0%)'
        })
    }

    function slideUp() {
        $('.conditionModal').css({
            'opacity': '0',
            'zIndex': '-1'
        })
        $('.conditionModal .box').css({
            'transform': 'translateY(200%)'
        })
        setTimeout(function(){
            $('.prevent').css({
                'zIndex':'-1'
            })
        },300)
    }

})