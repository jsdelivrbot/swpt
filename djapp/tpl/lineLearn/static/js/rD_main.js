( function ( $ ) {
    'use strict';
    $( function () {
        var user = getUser(),
            targetId = getQueryString( 'id' );
        // 获取心得详情记录
        $.ajax( {
            url: ajaxPrefix + 'markStudyNote/searchById?id=' + targetId + '&userId=' + user.id,
            type: 'GET',
            cache: true,
            success: function ( result ) {
                var res = result.msg;
                $( '#pTitle' ).html( res.sTitle ); // header 标题
                $( '#rTitle' ).html( res.title ); // body 标题
                $( '#rDesc' ).html( res.content ); // body 内容
                res.image === null ? $( '.rImg' ).hide() : $( '#rImg' ).prop( 'src', sourcePrefix + res.image ); // 图片
                res.video === null ? $( '.rVideo' ).hide() : $( '#rVideo' ).prop( 'src', sourcePrefix + res.video ); // 视频
            }
        } );

        // 删除心得详情记录
        $( 'body' ).on( 'click', '#confirmDelete', function ( event ) {
            layer.confirm( '请问您确定要删除这条心得吗？', {
                btn: [ '确定', '取消' ] //按钮
            }, function ( index ) {
                $.ajax( {
                    url: ajaxPrefix + 'markStudyNote/delMarkStudyNote?id=' + targetId,
                    type: 'GET',
                    success: function ( result ) {
                        if ( result.status === '0' ) {
                            layer.close( index );
                            historyUtils.back();
                        } else {
                            layer.msg( '抱歉！删除失败，请重新尝试！', { icon: 5 } );
                        }
                    }
                } );
            } );
        } );

        // 编辑心得详情记录
        $( 'body' ).on( 'click', '#edit', function ( event ) {
            window.location.href = './uploadRecord.html?targetId=' + targetId + '&aName=' + $( '#pTitle' ).html() + '&type=edit';
        } );
    } );
}( jQuery ) );
