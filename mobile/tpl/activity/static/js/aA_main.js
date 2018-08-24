( function ( $ ) {
    'use strict';
    $( function () {
        var targetId = getQueryString( 'targetId' ),
            type = getQueryString( 'type' ),
            user = getUser(),
            userId = user.id,
            ajaxUrl = 'sign/signUpActivity';

        $( '#userId' ).val( userId );
        // 如果是 type === edit 代表是 修改报名信息
        if ( type === 'edit' ) {
            $.ajax( {
                url: ajaxPrefix + 'sign/searchUserInfo?aId=' + targetId + '&userId=' + userId,
                type: 'GET',
                dataType: 'json',
                success: function ( result ) {
                    var res = result.msg;
                    ajaxUrl = 'sign/editSignUpActivity';
                    if ( result.status === '2' ) {
                        layer.msg( '获取报名信息失败！', { icon: 2 } );
                    } else {
                        $( '#pName' ).val( res.name );
                        $( '#pPhoneNum' ).val( res.phone );
                        $( '#pAddr' ).val( res.address );
                        $( '#pNote' ).val( res.message );
                    }
                },
                error: function ( error ) {
                    layer.msg( '获取报名信息失败！', { icon: 2 } );
                }
            } );
        }
        // 报名活动申请
        $( '#confirmForm' ).on( 'submit', function ( event ) {
            event.preventDefault();
            var dataTmp = decodeURIComponent( $( '#confirmForm' ).serialize() ),
                data = {};
            dataTmp.split( '&' ).forEach( function ( elem ) {
                var tmp = elem.split( '=' );
                data[ tmp[ 0 ] ] = tmp[ 1 ];
            } );
            data.aId = targetId;

            $.ajax( {
                url: ajaxPrefix + '' + ajaxUrl,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify( data ),
                beforeSend: function () {
                    $( '#submit' ).attr( 'disabled', '' );
                },
                success: function ( result ) {
                    $( '#submit' ).removeAttr( 'disabled' );
                    if ( result.status === '0' ) {
                        layer.open( {
                            icon: '1',
                            title: '申请报名成功',
                            content: '恭喜您！您已经申请报名成功！请耐心等待我们系统的审核！',
                            shadeClose: true,
                            time: 5000,
                            end: function () {
                                historyUtils.back();
                            }
                        } );
                    } else {
                        layer.open( {
                            icon: '2',
                            title: '申请报名失败',
                            content: '您已经报过名啦！<br/>如未审核请耐心等待审核通过！',
                            shadeClose: true,
                            time: 5000
                        } );
                    }
                }
            } );
        } );
    } );
} )( jQuery );
