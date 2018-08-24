$( function () {
    $( '.menuLabel' ).on( 'click', function ( e ) {
        if ( e.target.checked ) {
            $( this ).addClass( 'click' ).siblings().removeClass( 'click' );
        }
    } );

    $( '.menuLabel.notAllow > input' ).attr( 'disabled', 'disabled' );
} );
