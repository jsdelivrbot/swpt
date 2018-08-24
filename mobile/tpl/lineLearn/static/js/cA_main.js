( function ( $ ) {
    'use strict';
    $( function () {
        var user = getUser(),
            type = getQueryString( 'type' ),
            targetId = getQueryString( 'targetId' ),
            ajaxUrl = 'studyNote/save',
            ajaxMsg = '新增',
            edit_Img;

        if ( user !== null ) {
            $( '#userId' ).val( user.id );
        } else {
            jumpLogin( '../../login/', '您还未登陆，不能新增活动！' );
        }

        $( '.uploadContainer' ).mUpload( { limit: 1 } );

        if ( type === 'edit' ) {
            ajaxUrl = 'studyNote/updateStudyNote';
            ajaxMsg = '修改';
            $( 'head title' ).html( '修改活动' );
            $( '.centerTitle' ).html( '修改活动' );
            $.ajax( {
                url: ajaxPrefix + 'studyNote/searchNodeInfo?id=' + targetId + '&userId=' + user.id,
                type: 'GET',
                dataType: 'json',
                success: function ( result ) {
                    var res = result.msg;
                    $( '#aTitle' ).val( res.title );
                    $( '#aNote' ).val( res.content );
                    $.uploadMethod( 'editFold', sourcePrefix + res.image, '.uploadContainer' );
                }
            } );
        }
        // 创建主题 
        $( '#activifyForm' ).submit( function ( event ) {
            event.preventDefault();
            var data = $.uploadMethod( 'toServer', $( '#activifyForm' )[ 0 ], [ 'image' ], 'image' );

            if ( type === 'edit' ) {
                data.append( 'id', targetId );
            }

            $.ajax( {
                url: ajaxPrefix + '' + ajaxUrl,
                type: 'POST',
                dataType: 'json',
                contentType: false,
                processData: false,
                cache: false,
                data: data,
                success: function ( result ) {
                    if ( result.status === '0' ) {
                        layer.open( {
                            icon: '1',
                            title: '成功',
                            content: '恭喜您！您已经' + ajaxMsg + '了一条活动！',
                            shadeClose: true,
                            time: 3000,
                            end: function () {
                                window.location.href = './activityDetail.html?id=' + result.msg;
                            }
                        } );

                    } else {
                        layer.open( {
                            icon: '2',
                            title: '失败',
                            content: '抱歉！' + ajaxMsg + '活动失败！请您重新再试！',
                            shadeClose: true,
                            time: 5000
                        } );
                    }
                }
            } );
        } );

    } );
}( jQuery ) );
