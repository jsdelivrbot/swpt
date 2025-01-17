// Ajax 请求路径

var ROOT_HOST = "192.168.0.213";
//var ROOT_HOST = window.location.host;
var ajaxPrefix = 'http://'+ROOT_HOST+':21008/',
    sourcePrefix = 'http://'+ROOT_HOST+':8888/',
    ajaxLogin = 'http://'+ROOT_HOST+':20896/';

// 关闭uc手势
if ( navigator.userAgent.indexOf( "UC" ) !== -1 && navigator.userAgent.match( /\(i[^;]+;( U;)? CPU.+Mac OS X/ ) !== -1 ) {
    document.addEventListener( 'touchmove', function ( event ) {
        event.preventDefault();
        event.stopPropagation();
    }, false );
}

/**
 * @description 模拟 stack 移动端返回功能
 * @author MIse
 */
var historyUtils = {
    add: function ( url ) {
        var historyArray = historyUtils.getLocal();
        if ( !historyArray ) {
            historyArray = [];
        }
        var currentPage = historyArray.pop();
        if ( currentPage && currentPage == url ) {
            //do nothing
        } else if ( currentPage ) {
            historyArray.push( currentPage ); //历史里面没有现在传入的url，在加回去
        }
        historyArray.push( url );
        historyUtils.saveLocal( historyArray );
    },
    back: function () {
        var historyArray = historyUtils.getLocal();
        var currentPage = historyArray.pop(); //去掉当前页面，pop取最后，类似stack
        var history = historyArray.pop();
        if ( !history ) { //没有历史页面
            historyUtils.add( currentPage ); //将当前页面加入回数组中
            return;
        }
        historyUtils.saveLocal( historyArray );
        window.location.href = history;
    },
    getLocal: function () {
        var result = window.sessionStorage.getItem( historyUtils.key );
        if ( !result ) {
            return null;
        }
        return JSON.parse( result );
    },
    saveLocal: function ( data ) {
        window.sessionStorage.setItem( historyUtils.key, JSON.stringify( data ) );
    },
    key: "_history_"
};

historyUtils.add( window.location.href );

/**
 * @description 时间戳转日期
 * @author MIse
 * @param {number} timestamp 
 * @param {string} type 'ymd' 是 年月日 格式  'ymdhms' 是 年月日时分秒
 * @returns 一个转义后的日期
 */
function timestampToTime( timestamp, type ) {
    timestamp === null ? timestamp = '' : timestamp = timestamp;
    var tmpTimesTamp = timestamp.toString().split( '' ),
        date;
    if ( tmpTimesTamp.length === 13 ) { //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        date = new Date( timestamp );
    } else {
        date = new Date( timestamp * 1000 );
    }
    Y = date.getFullYear() + '-';
    M = ( date.getMonth() + 1 < 10 ? '0' + ( date.getMonth() + 1 ) : date.getMonth() + 1 ) + '-';
    D = ( date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ) + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();

    if ( type === 'ymd' ) {
        return Y + M + D;
    } else {
        return Y + M + D + h + m + s;
    }
}

/**
 * @description 取url参数
 * @author MIse
 * @param {string} name 传你要取的key
 * @returns 返回对应key的value
 */
function getQueryString( name ) {
    var reg = new RegExp( "(^|&)" + name + "=([^&]*)(&|$)", "i" );
    var r = decodeURI( window.location.search ).substr( 1 ).match( reg );
    if ( r != null ) return ( r[ 2 ] );
    return null;
}

/**
 * @description 创建Tab标签栏
 * @author MIse
 * @param {any} count Tab的数量
 * @param {any} method getActivityInfo 需要使用的请求的方法
 * @param {any} userId getActivityInfo 需要使用的userId
 * @param {any} type getActivityInfo 需要使用的响应状态
 */
function createSwiper( count, method, userId, type, callback ) {
    $( 'html' ).css( 'overflow', 'hidden' );
    var changeSwiper = function ( index ) {
        var isRender = $( '#swiperBody .swiper-slide' ).eq( index )[ 0 ].dataset.render,
            elemId = '#' + $( '#swiperBody .swiper-slide' ).eq( index )[ 0 ].id;
        $( '.tabNav-slide' ).eq( index ).addClass( 'actived' ).siblings().removeClass( 'actived' );
        window.swiperBody.slideTo( index, 500, false );
        if ( isRender !== 'true' ) {
            // 根据点击的Tab来渲染对应的数据
            var id = $( '#swiperBody .swiper-slide' ).eq( index ).prop( 'id' );
            if ( method !== '' ) {
                getActivityInfo( method, index, userId, elemId, type, function () {
                    $( '#swiperBody .swiper-slide' ).eq( index )[ 0 ].dataset.render = true;
                    var height = $( '#swiperBody .swiper-slide' ).eq( index ).find( '.body' ).height();
                } );
            } else {
                callback();
            }
        }
        /* var height = $('#swiperBody .swiper-slide').eq(index).find('.body').height();
        $('#swiperBody .swiper-slide').eq(index).height(height); */
    };
    window.swiperNav = new Swiper( '#swiperNav', {
        direction: 'vertical',
        freeMode: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            hide: true
        },
        allowTouchMove: false,
        slidesPerView: 'auto',
    } );

    $( '#tabNav' ).on( 'click', '.tabNav-slide', function ( event ) {
        window.swiperBody.slideTo( $( this ).index(), 500, false );
    } );

    window.swiperBody = new Swiper( '#swiperBody', {
        direction: 'horizontal',
        on: {
            slideChange: function () {
                changeSwiper( this.activeIndex );
            }
        }
    } );
}

/**
 * @description 查询用户创建的活动
 * @author MIse
 * @param {any} method 针对不同的页面 添加不同的接口
 * @param {any} status 现在是处于哪个选项（已发布、已完成....）
 * @param {any} userId 用户Id
 * @param {any} elem 渲染活动模块 renderActivity 需要的父元素
 * @param {any} type 渲染活动模块 renderActivity 需要的响应状态
 * @param {any} callback 渲染活动模块 renderActivity callback
 */
function getActivityInfo( method, status, userId, elem, type, callback ) {
    $.ajax( {
        url: ajaxPrefix + '' + method + '?status=' + status + '&userId=' + userId,
        type: 'GET',
        dataType: 'json',
        success: function ( result ) {
            if ( result.status !== '2' ) {
                renderActivity( result.msg, elem, type, function () {
                    $( elem )[ 0 ].dataset.render = true;
                } );
                result.msg.length < 1 ? $( elem + ' #noData' ).fadeIn() : $( elem + ' .project' ).fadeIn();
                if ( callback ) callback();
            } else {
                layer.msg( '查询失败！<br/>请重新点击尝试！', { icon: 2 } );
            }
        },
        error: function ( error ) {
            console.log( error );
            layer.msg( '数据获取失败！<br/>请刷新后重新尝试！', { icon: 2 } );
        }
    } );
}

/**
 * @description 渲染活动模块
 * @author MIse
 * @param {any} result 传后台返回的结果
 * @param {any} elem 父元素对象
 * @param {any} type 区别不同页面的响应不同状态
 * @param {function} callback 回调函数
 */
function renderActivity( result, elem, type, callback ) {

    for ( var i = 0; i < result.length; i++ ) {
        var pEndTime = timestampToTime( result[ i ].activityTime, 'ymd' ),
            pTime = timestampToTime( result[ i ].startTime, 'ymd' ) + ' ~ ' + timestampToTime( result[ i ].endTime, 'ymd' );
        $( elem + ' .bodyMain' ).append( $( '.project' ).eq( 0 ).clone( true ) );
        $( elem + ' .project' )[ i ].dataset.id = result[ i ].id;
        $( elem + ' .project' ).eq( i ).find( 'img' ).attr( 'src', sourcePrefix + result[ i ].image );
        $( elem + ' .project' ).eq( i ).find( '.pName' ).html( result[ i ].name );
        $( elem + ' .project' ).eq( i ).find( '.pTime' ).html( pTime );
        $( elem + ' .project' ).eq( i ).find( '.pEndTime' ).html( pEndTime );

        if ( type === 'aM' ) {
            var statusMsg;
            switch ( result[ i ].status ) {
            case 0:
                statusMsg = '未审核';
                break;
            case 1:
                statusMsg = '招募中';
                break;
            case 2:
                statusMsg = '已完成';
                break;
            case 3:
                statusMsg = '未通过';
                break;
            case 4:
                statusMsg = '已取消';
                break;
            }
            $( elem + ' .project' ).eq( i ).find( '.pStatus' ).html( statusMsg );
        }
    }
    $( elem + ' .project:last' ).remove();

    if ( callback ) callback();
}

/**
 * @description 获取用户登录信息
 * @author MIse
 */
function getUser() {
    var getUser = window.localStorage.getItem( 'user' ),
        user;
    getUser !== null ? user = JSON.parse( getUser ) : user = null;
    return user;
}

/**
 * @description 检测没有登录则跳转登录页面
 * @author MIse
 * @param {any} url Login模块的相对路径
 * @param {any} msg 要提示什么信息
 */
function jumpLogin( url, msg ) {
    msg ? msg = msg : msg = '您还未登录！';
    layer.open( {
        icon: '2',
        title: '出错',
        content: msg + '<br/>我们将于3秒后帮您跳转到登陆界面！',
        shadeClose: true,
        time: 3000,
        btn: [ '跳转' ],
        end: function () {
            window.location.href = url;
        }
    } );
}
