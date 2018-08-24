( function ( $ ) {
    'use strict';
    $( function () {
        var user = getUser();
        if ( user !== null ) {
            // 创建Tab标签栏
            createSwiper( 2, 'activity/searchApproval', user.id, 'rA' );

            // 查询用户创建的活动
            getActivityInfo( 'activity/searchApproval', 0, user.id, '#isApply', 'aM' );

            // 点击跳转 审核管理 - 活动详情
            $( 'body' ).on( 'click', '.project', function ( event ) {
                var targetId = event.currentTarget.dataset.id;
                window.location.href = './activityDetail/index.html?targetId=' + targetId + '&type=review';
            } );

        } else {
            jumpLogin( '../../login/', '您还未登录，不能管理活动！' );
        }
    } );
} )( jQuery );
