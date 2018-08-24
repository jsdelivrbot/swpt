/**
 * Created by Administrator on 2018/1/27.
 */
$(function () {

    var name = document.getElementById('bumenname')
    var aside = document.getElementById('aside')
    var leftBtn= document.getElementsByClassName('leftbtn')[0]
    var mBox = document.getElementsByClassName('m_box')[0]
    var main = document.getElementById('main')
    var btns = document.getElementsByClassName('r_btn')
    var doms = document.getElementsByClassName('m_item')
    for(var i=0,len=btns.length;i<len;i++){
        var first = i
        var last = i+1
        move(btns[i],doms[first],doms[last])
    }
    moveBox(leftBtn,aside,main)
})
function moveBox(btn,leftELE,rightELE) {
    btn.onmousedown =function (e) {
        var dix = (e || window.event).clientX
        var W = $(leftELE).width()
        var left = btn.offsetLeft
        var iT,moveX,CW
        document.documentElement.onmousemove = function (e) {
            CW = (e || window.event).clientX - dix
            btn.style.left = CW  +'px'
        }
        document.documentElement.onmouseup = function (e) {
            iT = left + CW
            moveX = W + iT
            leftELE.style.width = rightELE.style.marginLeft = moveX +'px'
            btn.style.left = -4+'px'
            document.documentElement.onmousemove = null;
        }
    }
}

function move(btn,leftELE,rightELE) {
    btn.onmousedown =function (e) {
        var dix = (e || window.event).clientX
        var LW = $(leftELE).width()
        var RW = $(rightELE).width()
        var left = btn.offsetLeft
        var iT,moveX,CW
        document.documentElement.onmousemove = function (e) {
            CW = (e || window.event).clientX - dix
            btn.style.left = CW  +'px'
        }
        document.documentElement.onmouseup = function (e) {
            iT = left + CW
            moveX = LW + iT
            leftELE.style.width  = moveX +'px'
            rightELE.style.width = RW - iT +'px'
            btn.style.left = -3+'px'
            document.documentElement.onmousemove = null;
        }
    }
}
