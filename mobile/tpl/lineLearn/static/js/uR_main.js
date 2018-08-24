( function ( $ ) {
    'use strict';
    $( function () {

        var user = getUser(),
            type = getQueryString( 'type' ),
            ajaxUrl = 'markStudyNote/saveMarkStudyNote',
            ajaxMsg = '新增';
        if ( user !== null ) {
            $( '#userId' ).val( user.id );
        } else {
            jumpLogin( '../../login/', '您还未登录，不能上传记录！' );
        }

        if ( type === null ) {
            try {
                var titleId = JSON.parse( window.sessionStorage.getItem( '_titleId_' ) ),
                    key = Object.keys( titleId );
                for ( var i = 0; i < key.length; i++ ) {
                    var elem = '<option value=' + key[ i ] + '>' + titleId[ key[ i ] ] + '</option>';
                    $( '#pType' ).append( elem );
                }
                $( '#sId' ).val( $( '#pType option:first-of-type' ).val() );
            } catch ( error ) {
                console.error( '选择活动 - 获取不了活动数据啦' );
            }
        } else if ( type === 'ptpUpload' || type === 'edit' ) {
            // type === ptpUpload 代表是从 指定详情页 点右上角的 添加记录按钮 进来的
            var targetId = getQueryString( 'targetId' ),
                aName = getQueryString( 'aName' );
            $( '#pType' ).append( '<option value=' + targetId + '>' + aName + '</option>' );
            if ( type === 'edit' ) {
                ajaxUrl = 'markStudyNote/updateMarkStudyNote';
                ajaxMsg = '修改';
                $( 'head title' ).html( '修改记录' );
                $( '.centerTitle' ).html( '修改记录' );
                $.ajax( {
                    url: ajaxPrefix + 'markStudyNote/searchById?id=' + targetId + '&userId=' + user.id,
                    type: 'GET',
                    dataType: 'json',
                    success: function ( result ) {
                        var res = result.msg;
                        $( '#aTitle' ).val( res.title );
                        $( '#aNote' ).val( res.content );
                        $.uploadMethod( 'editFold', sourcePrefix + res.image, '.uploadContainer.image' );
                        $.uploadMethod( 'editFold', sourcePrefix + res.video, '.uploadContainer.video' );
                    }
                } );
            }
        }

        // 上传图片
        $( '.uploadContainer.image' ).mUpload( { limit: 1 } );
        // 上传视频
        $( '.uploadContainer.video' ).mUpload( { limit: 1 } );

        $( '#activityForm' ).submit( function ( event ) {
            event.preventDefault();
            $( '#sId' ).val( $( '#pType option:selected' ).val() );
            var data = $.uploadMethod( 'toServer', $( '#activityForm' )[ 0 ], [ 'image', 'video' ] ),
                loading;

            $.ajax( {
                url: ajaxPrefix + '' + ajaxUrl,
                type: 'POST',
                cache: false,
                contentType: false,
                processData: false,
                data: data,
                beforeSend: function () {
                    loading = layer.load( 0 );
                },
                success: function ( result ) {
                    layer.close( loading );
                    if ( result.status === '0' ) {
                        layer.open( {
                            icon: '1',
                            title: '成功',
                            content: '恭喜您！您已经' + ajaxMsg + '了一条活动！',
                            shadeClose: true,
                            time: 3000,
                            end: function () {
                                window.location.href = './recordDetail.html?id=' + result.msg;
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
