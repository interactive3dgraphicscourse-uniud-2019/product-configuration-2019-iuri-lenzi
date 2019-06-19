/*
* Inspector view script
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


/*
* autoresize the iframe content in order to avoid th comparison of the scroll bars
*/
function AutoResize(){
    $( '#inspector-controls' ).height($( '#inspector-controls' ).contents().height());
    $( '#inspector-controls' ).width($( '#inspector-controls' ).contents().width());
}


/*
* Close inspector view and block the event in order to prevent possible event overlapping
*/
$( '#buttons-bar' ).on( 'mousedown', function( event ){
    CloseInspector();
    event.preventDefault();
})