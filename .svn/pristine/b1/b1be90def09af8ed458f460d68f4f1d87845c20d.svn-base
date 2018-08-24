( function ( $ ) {
    $( function () {
        var user = getUser();
        if ( user !== null ) {
            $( '#noLogin' ).hide().siblings( '#hasLogin' ).show();
            $( '#userName' ).html( user.user.username );
        } else {
            $( '#hasLogin' ).hide().siblings( '#noLogin' ).show();
            $( '#noLogin' ).on( 'click', function ( event ) {
                window.location.href = '../login/';
            } );
        }

        $( '.navTop' ).on( 'click', '.nav', function ( event ) {
            if ( window.localStorage.getItem( 'user' ) === null ) {
                event.preventDefault();
                layer.confirm( '您需要登陆才能允许访问！', { icon: 0, title: '需要权限' }, function ( index ) {
                    window.location.href = '../login/';
                } );
            }
        } );

        $( '.subNav' ).on( 'click', '.nav', function ( event ) {
            var id = event.currentTarget.id;
            if ( id !== '' ) {
                event.preventDefault();
                switch ( id ) {
                case 'logout':
                    if ( window.localStorage.getItem( 'user' ) !== null ) {
                        layer.confirm( '确认要退出登陆吗？', { icon: 0, title: '退出登陆' }, function ( index ) {
                            window.localStorage.removeItem( 'user' );
                            window.location.reload();
                        } );
                    } else {
                        layer.msg( '您还没登陆呢' );
                    }
                    break;

                default:
                    break;
                }

            }
        } );
    } );
} )( jQuery );
