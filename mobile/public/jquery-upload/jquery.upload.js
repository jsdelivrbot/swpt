( function ( $ ) {

    'use strict';
    // uploadMethod - editFold 视频问题还没有解决
    var Methods = {
        elem: [],
        init: function ( options, that ) {
            Methods.renderElem = that;
            this.prepareOptions( options );
            this.process();
        },
        prepareOptions: function ( options ) {
            optionsInit = $.extend( optionsInit, options );
        },
        process: function () {
            this.renderInput();
        },
        renderInput: function () {
            var timeStamp = new Date().getTime();
            this.renderElem.append( '<div class="uploadAdd"><label for="aFiles_' + timeStamp + '" class="add"></label><input type="file" id="aFiles_' + timeStamp + '" class="aFiles" name="aFiles" onchange="$.uploadPrivateMethod.filesChange(this)"></div>' );
            this.renderElem[ 0 ].filesArr = [];
            this.elem.push( this.renderElem.selector );
            delete Methods.renderElem;
        },
        renderPrevent: function ( fileInfo, eventTarget, dataId ) {
            var preventUrl = window.URL.createObjectURL( fileInfo ),
                type = fileInfo.type.split( '/' )[ 0 ];
            if ( type === 'image' ) {
                eventTarget.prepend( '<div data-id=' + dataId + ' class= "uploadImg uploadTarget" > <img src=' + preventUrl + '><span class="closed" onclick="$.uploadPrivateMethod.filesDelete(this)"><img src="../../../../public/images/a7.png"></span></div>' );
            } else if ( type === 'video' ) {
                eventTarget.prepend( '<div data-id=' + dataId + ' class= "uploadVideo uploadTarget" > <i class="iconfont">&#xe768;</i><span class="closed" onclick="$.uploadPrivateMethod.filesDelete(this)"><img src="../../../../public/images/a7.png"></span></div>' );
            }
        }
    };

    // private Method 
    $.uploadPrivateMethod = {
        filesChange: function ( that ) {
            // uploading..
            var $parentCon = $( that ).parents( '.uploadContainer' ),
                filesArr = $parentCon[ 0 ].filesArr,
                dataId = new Date().getTime();

            if ( filesArr.length < optionsInit.limit ) { // 判断现在文件数量超过限制数量则不允许上传。
                that.files[ 0 ].dataId = dataId;
                if ( that.files.length > 0 ) filesArr.push( that.files[ 0 ] );
                Methods.renderPrevent( that.files[ 0 ], $parentCon, dataId );
            } else alert( '最多上传' + optionsInit.limit + '个文件' );
            filesArr.length >= optionsInit.limit ? $parentCon.find( '.uploadAdd' ).hide() : $parentCon.find( '.uploadAdd' ).show();
        },
        filesDelete: function ( that ) {
            // delete..
            var flagId = $( that ).parents( '.uploadTarget' )[ 0 ].dataset.id,
                $parentCon = $( that ).parent().parent(),
                filesArr = $parentCon[ 0 ].filesArr;

            filesArr.forEach( function ( val, index ) {
                if ( val.dataId === parseInt( flagId ) ) {
                    filesArr.splice( index, 1 );
                    $( '.uploadTarget[data-id=' + flagId + ']' ).remove();
                }
            } );

            filesArr.length >= optionsInit.limit ? $parentCon.find( '.uploadAdd' ).hide() : $parentCon.find( '.uploadAdd' ).show();
            $parentCon.find( '.aFiles' ).val( '' ); // 重置onchange
        },
        convertImgToBase64: function ( url, callback, outputFormat ) {
            var imgName = url.split( '/image/' )[ 1 ].split( '.' )[ 0 ];

            var canvas = document.createElement( 'CANVAS' ),
                ctx = canvas.getContext( '2d' ),
                img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage( img, 0, 0 );
                var dataURL = canvas.toDataURL( outputFormat || 'image/png' );
                callback.call( this, dataURL, imgName );
                canvas = null;
            };
            img.src = url;
        },
        dataURItoBlob: function ( base64Data ) {
            var byteString;

            if ( base64Data.split( ',' )[ 0 ].indexOf( 'base64' ) >= 0 )
                byteString = atob( base64Data.split( ',' )[ 1 ] );
            else
                byteString = unescape( base64Data.split( ',' )[ 1 ] );
            var mimeString = base64Data.split( ',' )[ 0 ].split( ':' )[ 1 ].split( ';' )[ 0 ];
            var ia = new Uint8Array( byteString.length );
            for ( var i = 0; i < byteString.length; i++ ) {
                ia[ i ] = byteString.charCodeAt( i );
            }
            return new Blob( [ ia ], { type: mimeString } );
        }
    };

    // export Methods
    $.fn.mUpload = function ( options ) {
        var upload = Object.create( Methods );
        upload.init( options, this );
    };

    // user can use Methods
    $.uploadMethod = function ( type, param, param1 ) {
        if ( type === 'toServer' ) {
            // param - form
            // param1 - name
            var data = new FormData( param );
            data.delete( 'aFiles' );
            Methods.elem.forEach( function ( val, index ) {
                $( val )[ 0 ].filesArr.forEach( function ( sVal, sIndex ) {
                    data.append( param1[ index ], sVal );
                } );
            } );
            return data;
        } else if ( type === 'editFold' ) {
            // param - folds
            // param1 - elem
            $.uploadPrivateMethod.convertImgToBase64( param, function ( base64Img, imgName ) {
                var blob = $.uploadPrivateMethod.dataURItoBlob( base64Img ), // 上一步中的函数
                    canvas = document.createElement( 'canvas' ),
                    dataURL = canvas.toDataURL( 'image/jpeg', 0.5 ),
                    dataId = new Date().getTime(),
                    elem = '<div data-id=' + dataId + ' class="uploadImg uploadTarget"><img src=' + param + '><span class="closed" onclick="$.uploadPrivateMethod.filesDelete(this)"><img src="../../../../public/images/a7.png"></span></div>';
                blob.dataId = dataId;
                // blob.name = imgName + '.png';
                $( param1 )[ 0 ].filesArr.push( blob );
                $( param1 )[ 0 ].filesArr.length >= optionsInit.limit ? $( param1 ).find( '.uploadAdd' ).hide() : $( param1 ).find( '.uploadAdd' ).show();
                $( param1 ).prepend( elem );
            } );
        } else {
            console.error( 'The Method "' + type + '" is Not Found;' );
        }
    };

    var optionsInit = {
        limit: 3
    };

} )( jQuery );
