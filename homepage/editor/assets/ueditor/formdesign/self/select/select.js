$( function () {
    $.extend( {
        'divSelect': function ( selectBoxId, inputSelectId ) {
            var showBox = "#" + selectBoxId + " .showBox", // 展示已选择的div
                listBox = "#" + selectBoxId + " .listBox", // 展示所有列表的ul
                inputSelect = "#" + inputSelectId; // 上传表单的input

            $( showBox ).on( 'click', function ( e ) {
                $( this ).toggleClass( 'click' );
                $( listBox ).stop().slideToggle( 200 );

                // 展开选择选项后，点击其他地方则把选择选项关闭
                $( document ).on( "click", function () {
                    $( listBox ).slideUp( 200 );
                    $( showBox ).removeClass( 'click' );
                } );
                // 阻止冒泡事件 防止showBox的事件冒泡到document 触发关闭
                e.stopPropagation ? e.stopPropagation() : ( e.cancelBubble = true );

            } )
            $( listBox ).on( 'click', 'li', function ( e ) {
                var html = e.target.innerHTML;
                $( showBox + " .info" ).html( html );
                $( listBox ).slideUp( 200 );
                $( showBox ).removeClass( 'click' );
                $( inputSelect ).val( $( e.target ).children( '.title' ).data( 'val' ) );

                if ( $( e.target ).children( '.selectShow' ).length == 1 ) {
                    // 判断：当选项前面有小图标的时候才执行这个
                    // 将小图标的地址存放在input的data-src里面，方便调用
                    $( inputSelect ).data( 'src', $( e.target ).children(
                        '.selectShow' ).children()[ 0 ].src );
                }
                if ( $( "#" + selectBoxId + " + .imgPost" ).length == 1 ) {
                    // 判断：当有imgPost这个元素的时候才执行这个
                    // 把小图标展示在imgPost里面
                    $( "#" + selectBoxId + " + .imgPost" ).attr( 'src', $( e.target )
                        .children( '.selectShow' ).children()[ 0 ].src );
                }
            } )
        }
    } )
} )
