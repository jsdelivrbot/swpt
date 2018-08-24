$(function(){
    $('.modal').css({
        'height':h
    })
})
var w = window.innerWidth
var h = window.innerHeight
var modal = function(name){
    $('.modal').css({
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
        $('.modal').css({
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
    }, 2000)
}
// 对象数组去重
function objHeavy(oldarr) {
    for (var i = 0; i < oldarr.length; i++) {
        for (var j = i + 1; j < oldarr.length;) {
            if (oldarr[i].id == oldarr[j].id && oldarr[i].rolename == oldarr[j].rolename) {
                oldarr.splice(j, 1);
            }
            else j++;
        }
    }
    return oldarr
}
