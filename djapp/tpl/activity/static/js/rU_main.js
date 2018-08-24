( function ( $ ) {
    'use strict';
    $( function () {
        var user = getUser(),
            targetId = getQueryString( 'targetId' ),
            status;

        // 创建Tab标签
        createSwiper( 2, '', '', '', function () {
            renderUser();
        } );

        // 渲染用户数据
        function renderUser() {
            var target = '#' + $( '.swiper-slide.actived' )[ 0 ].dataset.target;
            target === '#noReview' ? status = 0 : status = 1;
            if ( $( target ).data( 'dataReload' ) ) {
                $( target + ' .projectMain:not(:first-of-type)' ).remove();
            }
            $.ajax( {
                url: ajaxPrefix + 'sign/searchIsSuccess?aId=' + targetId + '&status=' + status,
                type: 'GET',
                dataType: 'json',
                success: function ( result ) {
                    var res = result.msg,
                        status;

                    $( target ).eq( 0 )[ 0 ].dataset.render = true;
                    res.length < 1 ? $( target + ' #noData' ).fadeIn().siblings().hide() : $( target + ' .bodyMain' ).fadeIn().siblings().fadeOut();

                    for ( var i = 0; i < res.length; i++ ) {
                        var time = timestampToTime( res[ i ].createTime, 'ymd' );
                        $( target + ' .projectBody' ).append( $( target + ' .projectMain' ).eq( i ).clone( true ) );
                        $( target + ' .projectMain' ).eq( i )[ 0 ].dataset.id = res[ i ].id;
                        $( target + ' .name' ).eq( i ).html( res[ i ].name );
                        $( target + ' .phone' ).eq( i ).html( res[ i ].phone );
                        $( target + ' .time' ).eq( i ).html( time );
                        $( target + ' .address' ).eq( i ).html( res[ i ].address );
                        if ( target === '#hadReview' ) {
                            $( target + ' .control' ).eq( i ).find( 'span' ).remove();
                            switch ( res[ i ].status ) {
                            case 1:
                                status = '通过';
                                $( target + ' .projectMain[data-id=' + res[ i ].id + '] .control' ).append( '<span class="noPass">拒绝</span>' );
                                break;
                            case 2:
                                status = '拒绝';
                                $( target + ' .projectMain[data-id=' + res[ i ].id + '] .control' ).append( '<span class="pass">通过</span>' );
                                break;
                            }
                        }
                        $( target + ' .status' ).eq( i ).html( status );
                    }

                    if ( res.length > 0 ) {
                        $( target + ' .projectMain:last' ).remove();
                    }
                }
            } );
        }

        renderUser();

        // 点击 通过/拒绝 按钮
        $( 'body' ).on( 'click', '.control', function ( event ) {
            var current = event.target.className,
                applyId = $( this ).parents( '.projectMain' )[ 0 ].dataset.id;
            $( '.dataShow' ).data( 'dataReload', true ); // 重绘制数据
            $( '.dataShow' ).each( function ( index, value ) {
                value.dataset.render = false;
            } );
            switch ( current ) {
            case 'pass':
                status = 1;
                break;
            case 'noPass':
                status = 2;
                break;
            }
            status = 0;
            $.ajax( {
                url: ajaxPrefix + 'sign/approvalPerson?id=' + applyId + '&status=' + status + '&aId=' + targetId,
                type: 'GET',
                dataType: 'json',
                success: function ( result ) {
                    var target = '#' + $( '.swiper-slide.actived' )[ 0 ].dataset.target;
                    renderUser();
                }
            } );
        } );

    } );
} )( jQuery );
