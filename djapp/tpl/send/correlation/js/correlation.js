/**
 * Created by Administrator on 2018/4/21.
 */
$(function () {
    var $modal = $('#modal')
    var $modal_approver = $('#modal_box_approver')
    var $modal_copyto = $('#modal_box_capyto')
    var $jump_approver = $('#jump .approver')
    var $jump_copeto = $('#jump .copyto')
    h = window.innerHeight
    $modal.css({
        'height': h + 'px'
    })
    var modal = {
        slideUp: function () {
            $modal.css({
                'opacity': '0',
                'zIndex': '-1'
            })
        },
        slideDown: function (ele) {
            $modal.css({
                'opacity': '1',
                'zIndex': '999'
            })
        }
    }
    modalfun()
    function modalfun() {
        $('#box').on('touchstart', function (e) {
            var e = window.event || e
            var ele = e.srcElement || e.target
            if ($(ele).is($('.group *'))) {
                modal.slideDown()
                $modal_approver.css({
                    "zIndex": "999",
                    "width": '7rem',
                    "opacity": '1'
                })
            } else if (ele.className === 'person') {
                modal.slideDown()
                $modal_copyto.css({
                    "zIndex": "999",
                    "width": '7rem',
                    "opacity": '1'
                })
            }
        })
        $modal.on('touchstart', function (e) {
            var e = window.event || e
            var ele = e.srcElement || e.target
            if ($(ele).is($modal)) {
                modal.slideUp()
                if ($modal_approver.css('zIndex') === '999') {
                    $modal_approver.css({'zIndex': '0', 'width': '0', 'opacity': '0'})
                }
                if ($modal_copyto.css('zIndex') === '999') {
                    $modal_copyto.css({'zIndex': '0', 'width': '0', 'opacity': '0'})
                }
            }
        })
    }

    var template = {
        c_approver_group: '<div class="group">' +
        '<div class="lastgroup">' +
        '<div class="num">1</div>' +
        '<div class="border"></div>' +
        '<div class="vessel"></div>' +
        '</div>' +
        '<div class="nextgroup">' +
        '<div class="num">2</div>' +
        '<div class="border"></div>' +
        '<div class="vessel"></div>' +
        '</div>' +
        '</div>'
,
        c_copyto_person: '<div class="person"><img src="" alt=""></div>'
    }
    $('.c_approver .main').append(template.c_approver_group)
    $('.c_copyto .add_copyto').before(template.c_copyto_person)
    $('.add_approver').on('touchstart', function () {
        $('.c_approver .main').append(template.c_approver_group)
        change.approver()
    })
    $('.add_copyto').on('touchstart', function () {
        $('.c_copyto .add_copyto').before(template.c_copyto_person)
        change.copyto()
    })

    $('.copyto_quit').click(function () {
        change.go()
        document.body.scrollTop = document.documentElement.scrollTop = $('.person').last().offset().top
        console.log(document.body.scrollTop)
        console.log($('.person').last().offset().top)
    })
    $('.approver_quit').click(function () {
        change.go()
        document.body.scrollTop = document.documentElement.scrollTop = $('.group').last().offset().top
    })
    var url = window.location.href
    if(url.indexOf('jump')>-1){

    }

    var change = {
        jump: function () {
            $('#box').css({
                'marginLeft': '-100%'
            })
        },
        approver: function () {
            this.jump()
            $jump_approver.css({
                'zIndex': '999'
            })
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            history.pushState('approver', '', '?jump=approver')
        },
        copyto: function () {
            this.jump()
            $jump_copeto.css({
                'zIndex': '999'
            })
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            history.pushState('copyto', '', '?jump=copyto')
        },
        go: function () {
            window.history.go(-1)
            $('#box').css({
                'marginLeft': '0'
            })
            if ($jump_approver.css('zIndex') === '999') {
                $jump_approver.css('zIndex', '0')
            } else if ($jump_copeto.css('zIndex') === '999') {
                $jump_copeto.css('zIndex', '0')
            }
        }
    }
})