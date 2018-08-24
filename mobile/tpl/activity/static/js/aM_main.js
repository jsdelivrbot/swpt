( function ( $ ) {
    'use strict';
    $( function () {
        var user = getUser(),
            classify;

        if ( user !== null ) {
            // 创建Tab标签栏
            createSwiper( 4, 'activity/searchActivityStatus', user.id, 'aM' );

            // 查询用户创建的活动
            getActivityInfo( 'activity/searchActivityStatus', 0, user.id, '#isApply', 'aM' );
        } else {
            jumpLogin( '../../login/', '您还未登录，不能管理活动！' );
        }

        $( 'body' ).on( 'click', '.project', function ( event ) {
            var targetId = $( this )[ 0 ].dataset.id,
                type = $( this ).parents( '.swiper-slide' )[ 0 ].id;

            window.location.href = './activityDetail/index.html?targetId=' + targetId + '&type=A' + type;
        } );
    } );
} )( jQuery );
