// 点击其他区域就关闭modal
$( function () {
    $( 'body' ).on( 'click', '.modal-backdrop', function ( e ) {
        $( '#avatar-modal' ).modal( 'hide' );
        $( '#video-modal' ).modal( 'hide' );
    } );

    // 上传图片
    $( 'body' ).on( 'click', '.uploadImage', function ( e ) {
        e.preventDefault();
        $( '#avatar-modal' ).modal( 'show' );
        window.getImageTarget = function () {
            return e.target;
        };
    } );
    window.shutdown = function () {
        $( '#avatar-modal' ).modal( 'hide' );
        $( '#video-modal' ).modal( 'hide' );
    };

    // 上传视频
    $( 'body' ).on( 'click', '.uploadVideo', function ( e ) {
        e.preventDefault();
        $( '#video-modal' ).modal( 'show' );
    } )

    // 上传其他资源
    $( 'body' ).on( 'change', '#uploadData', function ( e ) {
        var fileName = $( '#uploadData' )[ 0 ].files[ 0 ].name;

        if ( window.location.search.split( '?' )[ 1 ] === 'show' ) { // 编辑器界面进来的
            /* $( '#previewImg', window.parent.document ).html( result ); // 预览图像
            var data = { "src": result.toDataURL('image/jpeg', 1)};
            $.ajax( {
                url: 'http://192.168.0.251:20890/ueditor/baseToImage',
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify( data ),
                success: function ( res ) {
                    window.parent.showImage = res.msg;
                    window.parent.shutdown(); // 关闭父页面模态框
                }
            } ); */
        } else { // 预览界面进来的
            $( '#insertForm' ).attr( 'enctype', 'multipart/form-data' );

            var item = document.getElementById( 'uploadData' ).files[ 0 ],
                formData = new FormData(),
                data;
            formData.append( 'fileVideo', item );

            $.ajax( {
                url: prevent_HOST + 'ueditor/uoloadFile',
                type: 'POST',
                data: formData,
                cache: false,
                processData: false, // 不处理发送的数据，因为data值是FormData对象，不需要对数据做处理
                contentType: false, // 不设置Content-type请求头
                success: function ( res ) {
                    data = res.msg;
                    var imageTarget = $( '#uploadData' ),
                        div = document.createElement( 'div' );
                    div.innerHTML = fileName;
                    $( imageTarget ).parent().parent().find( 'input' ).attr( 'value', data ) // 设置input的属性
                    $( imageTarget ).parent( 'label' ).before( div );
                    $( imageTarget ).parent( 'label' ).remove(); // 把 上传按钮 删掉
                }
            } );
        }
    } )
} );
