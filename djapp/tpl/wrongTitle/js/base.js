$.fn.extend( {
    callBack: function ( f ) { //回调函数
        if ( typeof f == 'function' ) f();
    },
    bulletSide: function () { // 在元素附近旁边可以弹出一个弹框

    },
    getValue: function ( json ) { //获取一个模块里的所有值
        if ( $( this ).find( 'input[type="file"]' ).length > 0 ) {
            var value = new FormData( $( this )[ 0 ] );
        } else {
            var value = {};
            $( this ).find( 'input' ).each( function ( i, e ) {
                if ( $( e ).attr( 'name' ) == undefined && $( e ).val() != undefined ) return;
                value[ $( e ).attr( 'name' ) ] = $( e ).val();
            } );
            $( this ).find( 'select' ).each( function ( i, e ) {
                value[ $( e ).attr( 'name' ) ] = $( e ).val();
            } );
            $( this ).find( 'textarea' ).each( function ( i, e ) {
                value[ $( e ).attr( 'name' ) ] = $( e ).val();
            } );
        }
        if ( json instanceof Array ) { //删除不想要的数据
            for ( var i in json ) {
                delete value[ json[ i ] ];
            }
        } else { //替换指定数据
            for ( var i in json ) {
                value[ i ] = json[ i ];
            }
        }
        return value;
    },
    fillValue: function ( json ) { //给一个模块里所有的元素填充数据
        for ( var i in json ) {
            $( this ).find( '[name="' + i + '"]' ).val( json[ i ] );
        }
    },
    nextPage: function ( next, f ) { // 传入下一页的路径，跳转到下一页，并且将本页加到历史记录里
        $x = {};
        $( this ).clear( function () { dj.loading(); } )
            .load( next, function () {
                dj.loading( true );
                var jump = dj.getStorage( 'jump' ),
                    currentPage = dj.getStorage( 'currentPage' );
                jump.push( currentPage );
                dj.setStorage( { 'currentPage': next, 'jump': jump } );
                try { f(); } catch ( e ) {}
            } );
    },
    prePage: function ( f ) { // 返回上一页
        $x = {};
        var jump = dj.getStorage( 'jump' ),
            pre = jump[ jump.length - 1 ];
        if ( dj.getStorage( 'currentPage' ) != pre ) {
            $( this ).clear( function () { dj.loading(); } )
                .load( pre, function () {
                    dj.loading( true );
                    jump.pop();
                    dj.setStorage( { 'currentPage': pre, 'jump': jump } );
                    try { f(); } catch ( e ) {}
                } );
        }

    },
    rePage: function ( f ) { //重载本页
        $x = {};
        var currentPage = dj.getStorage( 'currentPage' );
        $( this ).clear( function () { dj.loading(); } ).load( currentPage, function () {
            dj.loading( true );
            try { f(); } catch ( e ) {}
        } );
    },
    clear: function ( f ) {
        this.children( '*' ).remove();
        if ( f ) {
            f();
        }
        return this;
    },
    loadingWindow: function ( f ) {
        this.clear().html( '<img src="./images/loading.png" style="width: .8rem;" class="loading posi-ab margin-auto center-x center-y">' +
            '<p class="loadingText font-36 text-center">正在加载</p>' );
        if ( f && f() ) {
            $( this ).find( '.loading, .loadingText' ).remove();
        }
    },
    closeLoadingWindow() {
        $( '.loading, .loadingText' ).remove();
    }
} );

function Dj() {}

Dj.prototype = {
    curtain: function ( f ) { //幕布
        $( 'body' ).toggleClass( 'overflow-hidden' );
        if ( $( 'body' ).find( '.curtain' ).length > 0 ) {
            $( '.curtain' ).fadeToggle( 'fast' ).callBack( function () {
                try {
                    if ( typeof f == 'function' ) f();
                } catch ( e ) {}
            } );
        } else {
            $( 'body' ).prepend( '<div class="curtain "></div>' ).callBack( function () {
                try {
                    if ( typeof f == 'function' ) f();
                } catch ( e ) {}
            } );
        }
    },
    bulletMid: function ( json ) { // 弹出一个弹框，再次执行可以关闭弹框
        if ( $( 'body' ).find( '.bulletMid' ).length > 0 ) {
            $( '.bulletMid' ).fadeToggle( 'slow' ).callBack( function () {
                try {
                    $( '.bulletMid' ).html( json.content );
                    if ( typeof json.f == 'function' ) json.f();
                } catch ( e ) {}
            } );
        } else if ( json ) {
            var text = '<div class="bulletMid dis-none">' + json.content + '</div>';
            $( 'body' ).prepend( text ).callBack( function () {
                $( '.bulletMid' ).fadeIn( 'slow' )
                try {
                    if ( typeof json.f == 'function' ) json.f();
                } catch ( e ) {}
            } );
        }
    },
    setStorage: function ( key, value ) { // 设置本地存储，需要更改数组长度的时候，则将数组以对象的形式传入
        if ( !key ) return;
        var data = JSON.parse( sessionStorage.getItem( 'data' ) );
        if ( typeof value == 'string' || typeof value == 'number' ) {
            try { data[ key ] = value; } catch ( e ) {}
        } else if ( typeof value == 'object' ) {
            if ( value instanceof Array ) {
                for ( var i in value ) {
                    data[ key ][ i ] = value[ i ];
                }
            } else {
                data[ key ] = value;
            }
        } else if ( typeof key == 'object' ) {
            for ( var i in key ) {
                try { data[ i ] = key[ i ]; } catch ( e ) {}
            }
        }
        sessionStorage.setItem( 'data', JSON.stringify( data ) );
    },
    getStorage: function ( key ) { //获取本地存储内容
        var data = JSON.parse( sessionStorage.getItem( 'data' ) );
        if ( typeof key == 'string' ) {
            return data[ key ];
        } else if ( key instanceof Array ) {
            var json = {};
            for ( var i in key ) {
                json[ key[ i ] ] = data[ key[ i ] ];
            }
            return json;
        } else if ( !key ) {
            return data;
        }
    },
    getDate: function ( date, format ) { //传入时间戳， 格式 例如： getDate('1524543364000', 'Y-M-D');
        date = new Date( parseInt( date.length = 10 ? date : date * 1000 ) );
        var Y = date.getFullYear(),
            M = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
            D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
            returnDate = '';
        if ( format.indexOf( 'Y' ) != -1 ) {
            returnDate += Y + format.substring( format.indexOf( 'Y' ) + 1, format.indexOf( 'Y' ) + 2 );
        }
        if ( format.indexOf( 'M' ) != -1 ) {
            returnDate += M + format.substring( format.indexOf( 'M' ) + 1, format.indexOf( 'M' ) + 2 );
        }
        if ( format.indexOf( 'D' ) != -1 ) {
            returnDate += D + format.substring( format.indexOf( 'D' ) + 1, format.indexOf( 'D' ) + 2 );
        }
        if ( format.indexOf( 'h' ) != -1 ) {
            returnDate += h + format.substring( format.indexOf( 'h' ) + 1, format.indexOf( 'h' ) + 2 );
        }
        if ( format.indexOf( 'm' ) != -1 ) {
            returnDate += m + format.substring( format.indexOf( 'm' ) + 1, format.indexOf( 'm' ) + 2 );
        }
        if ( format.indexOf( 's' ) != -1 ) {
            returnDate += s + format.substring( format.indexOf( 's' ) + 1, format.indexOf( 's' ) + 2 );
        }
        return returnDate;
    },
    getScrollTop: function () {
        var scrollTop = 0;
        if ( document.documentElement && document.documentElement.scrollTop ) {
            scrollTop = document.documentElement.scrollTop;
        } else if ( document.body ) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    },
    getClientHeight: function () {
        var clientHeight = 0;
        if ( document.body.clientHeight && document.documentElement.clientHeight ) {
            clientHeight = Math.min( document.body.clientHeight, document.documentElement.clientHeight );
        } else {
            clientHeight = Math.max( document.body.clientHeight, document.documentElement.clientHeight );
        }
        return clientHeight;
    },
    getScrollHeight: function () {
        return Math.max( document.body.scrollHeight, document.documentElement.scrollHeight );
    },
    loading: function ( status ) {
        var t = this;
        if ( status ) {
            $( '.curtain' ).remove();
            $( '.bulletMid' ).remove();
            $( 'body' ).removeClass( 'overflow-hidden' );
            return;
        }
        t.curtain( function () {
            t.bulletMid( {
                content: '<img id="loading" src="./images/loading.png" style="width: .8rem;" class="posi-ab margin-auto center-x center-y">' +
                    '<p class="font-36" style="margin-top:1.8rem;">正在加载</p>',
            } );
        } );
    }
}

var dj = new Dj();

function scrollBottom() {}

$( document ).on( "scroll", function () {
    if ( dj.getScrollTop() + dj.getClientHeight() > ( dj.getScrollHeight() - 50 ) ) {
        scrollBottom();
    }
} );
