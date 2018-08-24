( function ( $ ) {
    'use strict';
    $( function () {
        var user = getUser();
        if ( user !== null ) {
            $.ajax( {
                url: ajaxPrefix + 'studyNote/searchStudyNote?userId=' + user.id,
                type: 'GET',
                cache: true,
                success: function ( result ) {
                    var _titleId_ = {};
                    for ( var i = 0; i < result.msg.length; i++ ) {
                        var res = result.msg[ i ],
                            time = timestampToTime( res.createTime, 'ymd' );
                        $( '#activityC' ).append( $( '.activity' ).eq( 0 ).clone( true ) );
                        $( '.activity' )[ i ].dataset.id = res.id; // data-Id
                        $( '.aImgTarget' ).eq( i ).attr( 'src', sourcePrefix + res.image ); // 封面
                        $( '.titleTarget' ).eq( i ).html( res.title ); // 标题
                        $( '.timeTarget' ).eq( i ).html( time ); // 时间
                        _titleId_[ res.id ] = res.title;
                    }
                    $( '.activity:last' ).remove();
                    window.sessionStorage.setItem( '_titleId_', JSON.stringify( _titleId_ ) ); // 保存起来，方便上传记录使用
                    result.msg.length < 1 ? $( '#noData' ).fadeIn() : $( '.activity' ).fadeIn();
                }
            } );
        } else {
            jumpLogin( '../login/', '抱歉，您还未登录！' );
        }

        // 点击header右边的按钮显示更多菜单
        $( '#subNav' ).on( 'click', function ( event ) {
            event.stopPropagation();
            $( '#subNavMenu' ).fadeIn( 300 );
        } );

        $( 'body' ).on( 'click', function ( event ) {
            if ( $( '#subNavMenu' ).css( 'display' ) === 'block' ) {
                $( '#subNavMenu' ).fadeOut( 300 );
            }
        } );

        // 点击活动进入活动详情
        $( 'body' ).on( 'click', '.activity', function ( event ) {
            var targetId = event.currentTarget.dataset.id;
            window.location.href = './tpl/activityDetail.html?id=' + targetId;
        } );

    } );
}( jQuery ) );
