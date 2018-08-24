( function ( $ ) {
    'use strict';
    $( function () {
        var searchVal = getQueryString( 'sV' ),
            searchType = getQueryString( 'sT' ),
            searchLocation = getQueryString( 'sL' ),
            searchTime = getQueryString( 'sT' );

        var data = {

        };
        $.ajax( {
            url: ajaxPrefix + 'activity/serachKey?key=' + searchVal,
            type: 'GET',
            dataType: 'json',
            data: JSON.stringify( data ),
            success: function ( result ) {
                renderActivity( result.msg, '#body' );
                result.msg.length < 1 ? $( '#noData' ).fadeIn() : $( '.project' ).fadeIn();
            }
        } );

        // 点击活动跳转到活动详情页
        $( 'body' ).on( 'click', '.project', function ( event ) {
            window.location.href = './activityDetail/index.html?targetId=' + event.currentTarget.dataset.id;
        } );
    } );
}( jQuery ) );
