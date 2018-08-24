( function ( $ ) {
    'use strict';
    $( function () {
        // 获取targetId的数据
        var targetId = getQueryString( 'targetId' ),
            user = getUser();
        $.ajax( {
            url: ajaxPrefix + 'activity/searchById?id=' + targetId,
            type: 'GET',
            dataType: 'json',
            success: function ( result ) {
                var pEndTime = timestampToTime( result.msg.activityTime, 'ymd' ),
                    pTime = timestampToTime( result.msg.startTime, 'ymd' ) + '&nbsp;~&nbsp;' + timestampToTime( result.msg.endTime, 'ymd' ),
                    status = result.msg.signNumber + '/' + result.msg.upNumber,
                    shareTitle = '党建活动详情 - ' + result.msg.name,
                    shareDesc = '活动主题：' + result.msg.theme + '&nbsp;活动时间：' + pTime + '&nbsp;详细说明：' + result.msg.explain,
                    metaDec = '<meta name="description" content=' + shareDesc.replace( /\s/g, "" ) + '>';

                $( '.mainDetail' ).data( 'reviewStatus', result.msg.status );

                window.document.title = shareTitle; // 设置分享内容标题
                $( 'head' ).append( metaDec ); // 设置分享内容描述
                $( '#banner img' ).prop( 'src', sourcePrefix + result.msg.image ); // Banner图
                $( '#contact' ).prop( 'href', 'tel:' + result.msg.phone ); // 联系活动人
                $( '#status' ).html( status ); // 已报名
                $( '#activityName' ).html( result.msg.name ); // 活动标题
                $( '#activityTheme' ).html( result.msg.theme ); // 活动主题
                $( '#activityTime' ).html( pTime ); // 活动时间
                $( '#activityLocation' ).html( result.msg.address ); // 活动地点
                $( '#activityEndTime' ).html( pEndTime ); // 报名截止
                $( '#activityDesc' ).html( result.msg.explain ); // 详细说明
            },
            error: function ( error ) {
                console.log( error );
                layer.msg( '获取活动详情失败！', { icon: 2 } );
            }
        } );

        // 获取报名活动状态
        var type = getQueryString( 'type' ),
            typeBtn = {
                'review': [ 'deleteBtn', '查看报名信息' ],
                'isApply': [ '', '取消报名' ],
                'isDone': [ 'deleteBtn', '已结束' ],
                'noDone': [ '', '修改报名信息' ],
                'isCancel': [ '', '重新报名' ],
                'AisApply': [ 'deleteBtn', '审核中', '取消活动', '修改活动' ],
                'AisDone': [ 'deleteBtn', '已完结' ],
                'AnoDone': [ 'deleteBtn', '修改活动' ],
                'AisCancel': [ '修改活动', '重新启用活动' ]
            };

        if ( type === null ) {
            // type === null 代表只是默认页面, 加入活动的页面
            if ( user !== null ) {
                $( '#userId' ).val( user.id );
                var userId = $( '#userId' ).val();
                $.ajax( {
                    url: ajaxPrefix + 'sign/searchSignUp?aId=' + targetId + '&userId=' + userId,
                    type: 'GET',
                    success: function ( result ) {
                        if ( result.status === '0' ) {
                            $( '#apply' ).addClass( 'inReview' ).html( '审核中' );
                            $( '#apply' ).on( 'click', function ( event ) {
                                layer.open( {
                                    icon: '0',
                                    title: '报名审核中',
                                    content: '我们将在 1-2 个工作日内通知您，请留意信息，在 我的 - 我的报名 中修改和查看已报名活动',
                                    shadeClose: true,
                                    time: 5000
                                } );
                            } );
                        } else if ( result.status === '2' ) {
                            $( '#apply' ).addClass( 'inReview' ).html( '审核不通过' );
                            $( '#apply' ).on( 'click', function ( event ) {
                                window.location.href = './activityApply.html?targetId=' + targetId;
                            } );
                        } else {
                            $( '#apply' ).on( 'click', function ( event ) {
                                window.location.href = './activityApply.html?targetId=' + targetId;
                            } );
                        }
                    },
                    error: function ( error ) {
                        layer.msg( '获取报名状态失败！', { icon: 2 } );
                        $( '#apply' ).on( 'click', function ( event ) {
                            layer.msg( '因获取您的报名状态失败！所以暂不能报名！', { icon: 2 } );
                        } );
                    }
                } );
            } else {
                $( '#apply' ).on( 'click', function ( event ) {
                    jumpLogin( '../../../login/', '您还未登录，不能加入活动！' );
                } );
            }
        } else if ( type === 'review' ) {
            // type === review 代表是审核进来的页面
            $( '.leftBtn' ).remove();
            $( '.rightBtn' ).unbind().html( typeBtn[ type ][ 1 ] ).on( 'click', function ( event ) {
                window.location.href = './reviewUser.html?targetId=' + targetId;
            } );
        } else if ( type === 'isApply' ) {
            // type === isApply 代表是 我的活动 - 已报名 进来的页面
            $( '.rightBtn' ).unbind().addClass( 'inReview' ).html( typeBtn[ type ][ 1 ] ).on( 'click', function ( event ) {
                layer.confirm( '取消后将不能参加此次活动！', { icon: 0, title: '确定取消报名？' }, function ( index ) {
                    $.ajax( {
                        url: ajaxPrefix + 'sign/cancelSignUp?aId=' + targetId + '&userId=' + user.id,
                        type: 'GET',
                        dataType: 'json',
                        success: function ( result ) {
                            if ( result.status === '0' ) {
                                layer.msg( '取消报名成功！', {
                                    icon: 1,
                                    time: 2000,
                                    end: function () {
                                        historyUtils.back();
                                    }
                                } );
                            } else {
                                layer.msg( '取消报名失败！请重新尝试！', { icon: 2 } );
                            }
                        }
                    } );
                    layer.close( index );
                } );
            } );
        } else if ( type === 'isDone' ) {
            // type === isDone 代表是 我的活动 - 已完成 进来的页面
            $( '.leftBtn' ).remove();
            $( '.rightBtn' ).unbind().addClass( 'inReview' ).html( typeBtn[ type ][ 1 ] ).on( 'click', function ( event ) {
                layer.msg( '活动已结束！', { icon: 6 } );
            } );
        } else if ( type === 'noDone' ) {
            // type === noDone 代表是 我的活动 - 未完成 进来的页面
            $( '.rightBtn' ).unbind().addClass( 'inReview' ).html( typeBtn[ type ][ 1 ] ).on( 'click', function ( event ) {
                window.location.href = './activityApply.html?targetId=' + targetId + '&type=edit';
            } );
        } else if ( type === 'isCancel' ) {
            // type === noDone 代表是 我的活动 - 已取消 进来的页面
            $( '.rightBtn' ).unbind().addClass( 'inReview' ).html( typeBtn[ type ][ 1 ] ).on( 'click', function ( event ) {
                $.ajax( {
                    url: ajaxPrefix + 'sign/cancelSignUp?aId=' + targetId + '&userId=' + user.id,
                    type: 'GET',
                    dataType: 'json',
                    success: function ( result ) {
                        if ( result.status === '0' ) {
                            layer.msg( '重新报名成功！', {
                                icon: 1,
                                time: 2000,
                                end: function () {
                                    historyUtils.back();
                                }
                            } );
                        } else {
                            layer.msg( '重新报名失败！请重新尝试！', { icon: 2 } );
                        }
                    }
                } );
            } );
        } else if ( type === 'AisApply' ) {
            // type === AisApply 代表是 活动管理 - 已发布 进来的页面
            setTimeout( function () {
                var reviewStatus = $( '.mainDetail' ).data( 'reviewStatus' );
                if ( reviewStatus !== undefined ) {
                    if ( reviewStatus === 0 ) {
                        // 代表现在是 未审核 状态
                        $( '.rightBtn' ).unbind().addClass( 'inReview' ).html( typeBtn[ type ][ 1 ] ).on( 'click', function ( event ) {
                            layer.msg( '活动正在审核中..', { icon: 0 } );
                        } );
                    } else if ( reviewStatus === 1 ) {
                        // 代表现在是 招募中 状态
                        $( '.leftBtn' ).unbind().html( typeBtn[ type ][ 2 ] ).on( 'click', function ( event ) {
                            layer.confirm( '取消后将不能开展此次活动！', { icon: 0, title: '确定取消活动？' }, function ( index ) {
                                $.ajax( {
                                    url: ajaxPrefix + 'activity/cancelActivity?aId=' + targetId + '&userId=' + user.id,
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function ( result ) {
                                        if ( result.status === '0' ) {
                                            layer.msg( '取消活动成功！', {
                                                icon: 1,
                                                time: 2000,
                                                end: function () {
                                                    historyUtils.back();
                                                }
                                            } );
                                        } else {
                                            layer.msg( '取消活动失败！请重新尝试！', { icon: 2 } );
                                        }
                                    }
                                } );
                                layer.close( index );
                            } );
                        } );
                        $( '.rightBtn' ).unbind().addClass( 'inReview' ).html( typeBtn[ type ][ 3 ] ).on( 'click', function ( event ) {
                            window.location.href = '../createActivity.html?targetId=' + targetId + '&type=edit';
                        } );
                    }
                } else {
                    layer.msg( '获取审批状态失败！<br/>系统将自动帮您重新刷新页面!', {
                        icon: 2,
                        btn: [ '返回上一页' ],
                        time: 2000,
                        yes: function ( index ) {
                            historyUtils.back();
                        },
                        end: function () {
                            window.location.reload();
                        }
                    } );
                }
            }, 100 );
        } else if ( type === 'AisDone' ) {
            // type === AisDone 代表是 活动管理 - 已完成 进来的页面
            $( '.leftBtn' ).remove();
            $( '.rightBtn' ).unbind().addClass( 'inReview' ).html( typeBtn[ type ][ 1 ] ).on( 'click', function ( event ) {
                layer.msg( '活动已完结！', { icon: 6 } );
            } );
        } else if ( type === 'AnoDone' ) {
            // type === AisDone 代表是 活动管理 - 已完成 进来的页面
            $( '.leftBtn' ).remove();
            $( '.rightBtn' ).unbind().addClass( 'inReview' ).html( typeBtn[ type ][ 1 ] ).on( 'click', function ( event ) {
                window.location.href = '../createActivity.html?targetId=' + targetId + '&type=edit';
            } );
        } else if ( type === 'AisCancel' ) {
            // type === AisDone 代表是 活动管理 - 已取消 进来的页面
            $( '.leftBtn' ).unbind().html( typeBtn[ type ][ 0 ] ).on( 'click', function ( event ) {
                window.location.href = '../createActivity.html?targetId=' + targetId + '&type=edit';
            } );
            $( '.rightBtn' ).unbind().addClass( 'inReview' ).html( typeBtn[ type ][ 1 ] ).on( 'click', function ( event ) {
                $.ajax( {
                    url: ajaxPrefix + 'activity/cancelActivity?aId=' + targetId + '&userId=' + user.id,
                    type: 'GET',
                    dataType: 'json',
                    success: function ( result ) {
                        if ( result.status === '0' ) {
                            layer.msg( '重新启动活动成功！', {
                                icon: 1,
                                time: 2000,
                                end: function () {
                                    historyUtils.back();
                                }
                            } );
                        } else {
                            layer.msg( '重新启动活动失败！请重新尝试！', { icon: 2 } );
                        }
                    }
                } );
            } );
        }
    } );
}( jQuery ) );
