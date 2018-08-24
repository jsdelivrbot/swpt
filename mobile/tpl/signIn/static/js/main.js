( function ( $ ) {

    'use strict';

    $( function () {

        // 获取二维码活动id
        var a = location.href,
            b = a.substring( a.lastIndexOf( '=' ) + 1 ),
            user = getUser();
        $( '.sign_button' ).click( function () {
            $( this ).css( {
                'backgroundColor': 'rgba(255,255,255,0.6)'
            } );
            $( this ).attr( "disabled", true );
        } );

        // 签到成功弹框关闭
        $( "#suc_close" ).click( function () {
            $( "#suc_tk,.sign_bg" ).fadeOut( 400 );
        } );

        // 签到失败弹框关闭
        $( "#unsuc_close" ).click( function () {
            $( "#unsuc_tk,.sign_bg" ).fadeOut( 400 );
        } );

        //请求活动数据
        $.ajax( {
            url: ajaxPrefix + 'activity/searchById?id=' + b,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function ( result ) {
                if ( result.msg != null ) {
                    $( "#time" ).text( timestampToTime( result.msg.createTime, 'ymd' ) + '-' + timestampToTime( result.msg.endTime, 'ymd' ) );
                    $( "#name" ).text( result.msg.name );
                    if ( result.msg.status == 2 || result.msg.status == 4 ) {
                        $( '.sign_button' ).css( { 'backgroundColor': 'rgba(255,255,255,0.6)', } );
                        $( '.sign_button button' ).text( '活动无效' ).attr( "disabled", '' );
                    } else if ( result.msg.status == 0 || result.msg.status == 3 ) {
                        $( '.sign_button' ).css( { 'backgroundColor': 'rgba(255,255,255,0.6)', } );
                        $( '.sign_button button' ).text( '活动未审核' ).attr( "disabled", '' );
                    }
                }
            }
        } );

        // 查询用户签到状态
        $.ajax( {
            url: ajaxPrefix + 'activity/searchSignIn?id=' + b + '&userId=' + user.id,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function ( result ) {
                if ( result != null ) {
                    if ( result.status == 0 ) {
                        $( '.sign_button' ).css( { 'backgroundColor': 'rgba(255,255,255,0.6)', } )
                        $( '.sign_button button' ).text( '已签到' ).attr( "disabled", '' );
                    }
                }
            }
        } );

        // 签到
        $( '.sign_button' ).click( function ( event ) {
            event.preventDefault();
            $.ajax( {
                url: ajaxPrefix + 'activity/signInActivity?id=' + b + '&userId=' + user.id,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success: function ( result ) {
                    if ( result.status == 0 ) {
                        // 签到成功
                        $( '.sign_bg' ).fadeIn( 400 );
                        $( '#suc_tk' ).fadeIn( 400 );
                        $( '#success' ).text( result.statusMsg );
                        $( '.sign_button button' ).text( '已签到' ).attr( "disabled", '' );
                    } else if ( result.status == 1 || result.status == 2 ) {
                        // 签到异常或错误
                        $( '.sign_bg' ).fadeIn( 400 );
                        $( '#unsuc_tk' ).fadeIn( 400 );
                        $( '#error' ).text( result.statusMsg );
                        $( '.sign_button button' ).text( '签到失败' ).attr( "disabled", '' );
                    }
                }
            } );
        } );

    } );
} )( jQuery );
