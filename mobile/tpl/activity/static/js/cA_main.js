( function ( $ ) {
    'use strict';
    $( function () {
        var user = getUser(),
            type = getQueryString( 'type' ),
            ajaxUrl;

        if ( type === null ) {
            // type === null 代表只是默认页面, 创建活动的页面
            ajaxUrl = 'activity/release';
        } else if ( type === 'edit' ) {
            // type === edit 代表是 活动详情 - 修改活动 进来的页面
            ajaxUrl = 'activity/edit';
            var targetId = getQueryString( 'targetId' );
            // 获取用户之前提交的数据作以修改
            $.ajax( {
                url: ajaxPrefix + 'activity/searchActivityInfo?aId=' + targetId + '&userId=' + user.id,
                type: 'GET',
                dataType: 'json',
                success: function ( result ) {
                    if ( result.status === '2' ) {
                        layer.msg( '获取报名信息失败！', { icon: 2 } );
                    } else {
                        var res = result.msg,
                            pApplyTime = $.trim( timestampToTime( res.activityTime, 'ymd' ) ),
                            pStartTime = $.trim( timestampToTime( res.startTime, 'ymd' ) ),
                            pEndTime = $.trim( timestampToTime( res.endTime, 'ymd' ) ),
                            isMark;
                        res.mark ? isMark = 0 : isMark = 1;

                        $( '#pName' ).val( res.name ); // 活动名称
                        $( '#pTheme' ).val( res.theme ); // 活动主题
                        $( '#pLocation' ).val( res.address ); // 活动地址
                        $( '#pTime' ).val( pApplyTime ); // 报名截止
                        $( '#pStartTime' ).val( pStartTime ); // 活动时间 - 开始
                        $( '#pEndTime' ).val( pEndTime ); // 活动时间 - 结束
                        $( '#pNote' ).val( res.explain ); // 详细说明
                        $( '#pType option[value=' + res.type + ']' ).attr( 'selected', '' ); // 发布类型
                        $( '#pPhoneNum' ).val( res.phone ); // 手机号
                        $( '.pQrcode[value=' + isMark + ']' ).attr( 'checked', '' ); // 发布类型
                        $( '#pLimitNum' ).val( res.upNumber ); // 报名上限

                    }
                },
                error: function ( error ) {
                    layer.msg( '获取报名信息失败！', { icon: 2 } );
                }
            } );
        }

        // 点击发布按钮
        if ( user !== null ) {
            $( '#userId' ).val( user.id );
            $( '#confirmForm' ).on( 'submit', function ( event ) {
                event.preventDefault();
                var data = new FormData( $( '#confirmForm' )[ 0 ] );
                if ( type === 'edit' ) {
                    data.append( 'id', targetId );
                }

                $.ajax( {
                    url: ajaxPrefix + '' + ajaxUrl,
                    type: 'POST',
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function ( result ) {
                        if ( result.status === '0' ) {
                            layer.open( {
                                icon: '1',
                                title: '课程发布成功',
                                content: '我们将在 1-2 个工作日内通知您，请留意信息',
                                shadeClose: true,
                                btn: [ '查看', '确定' ],
                                yes: function ( index, layero ) {
                                    window.location.href = './activityManage.html';
                                    // window.location.href = './activityDetail/index.html?targetId=' + result.msg;
                                },
                                end: function () {
                                    window.history.back();
                                    // historyUtils.back();
                                    document.documentElement.scrollTop = 0;
                                }
                            } );
                        } else {
                            layer.msg( '课程发布失败！请重新尝试！', { icon: 2 } );
                        }
                    },
                    error: function ( error ) {
                        layer.msg( '课程发布失败！请重新尝试！', { icon: 2 } );
                    }
                } );
            } );
        } else {
            jumpLogin( '../../login/', '您还未登录，不能创建活动！' );
        }
    } );
}( jQuery ) );
