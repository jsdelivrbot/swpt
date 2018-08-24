( function ( $ ) {
    'use strict';
    $( function () {
        var user = getUser(),
            targetId = getQueryString( 'id' );
            
        $.ajax( {
            url: ajaxPrefix + 'studyNote/searchById?id=' + targetId + '&userId=' + user.id,
            type: 'GET',
            cache: true,
            timeout: 6000,
            success: function ( result ) {
                if ( result.status === '0' ) {
                    var res = result.msg,
                        time = timestampToTime( res.createTime, 'ymd' );

                    $( '#titleTarget' ).html( res.title ); // header标题
                    $( '#imgTarget' ).prop( 'src', sourcePrefix + res.image ); // banner图片
                    $( '#aName' ).html( res.title ); // 主题名称
                    $( '#aCreateTime' ).html( time ); // 创建时间
                    $( '#aDesc' ).html( res.content ); // 主题简要

                    // 会议记录
                    for ( var i = 0; i < res.children.length; i++ ) {
                        var resC = res.children[ i ],
                            cTime = timestampToTime( resC.createTime, 'ymd' );

                        $( '#records' ).append( $( '.record' ).eq( 0 ).clone( true ) );
                        $( '.record' )[ i ].dataset.id = resC.id;
                        $( '.rImgTarget' ).eq( i ).prop( 'src', sourcePrefix + resC.image ); // banner图片
                        $( '.rTitleTarget' ).eq( i ).html( resC.title ); // 主题名称
                        $( '.rTime' ).eq( i ).html( cTime ); // 创建时间
                        $( '.rMainBodyTarget' ).eq( i ).html( resC.content ); // 主题简要
                    }
                    $( '.record:last' ).remove();
                } else {
                    layer.msg( '获取活动详情失败！', { icon: 2 } );
                }
            },
            error: function ( error ) {
                console.log( error );
                layer.msg( '获取活动详情失败！', { icon: 2 } );
            }
        } );

        // 点击随堂记录跳转到随堂详情页
        $( 'body' ).on( 'click', '.record', function ( event ) {
            var targetId = event.currentTarget.dataset.id;
            window.location.href = './recordDetail.html?id=' + targetId;
        } );

        // 上传记录
        $( 'body' ).on( 'click', '#uploadRecord', function ( event ) {
            window.location.href = './uploadRecord.html?targetId=' + targetId + '&aName=' + $( '#titleTarget' ).html() + '&type=ptpUpload';
        } );

        // 编辑活动
        $( 'body' ).on( 'click', '#edit', function ( event ) {
            layer.msg( '正在开发中...' );
            window.location.href = './createActivity.html?targetId=' + targetId + '&type=edit';
        } );

        // 删除活动
        $( 'body' ).on( 'click', '#confirmDelete', function ( event ) {
            layer.confirm( '请问您确定要删除这条活动吗？', {
                btn: [ '确定', '取消' ] //按钮
            }, function ( index ) {
                $.ajax( {
                    url: ajaxPrefix + 'studyNote/delStudyNote?id=' + targetId,
                    type: 'GET',
                    success: function ( result ) {
                        if ( result.status === '0' ) {
                            layer.close( index );
                            window.location.href = '../index.html';
                        } else {
                            layer.msg( '抱歉！删除失败，请重新尝试！', { icon: 5 } );
                        }
                    }
                } );
            } );
        } );

    } );
}( jQuery ) );
