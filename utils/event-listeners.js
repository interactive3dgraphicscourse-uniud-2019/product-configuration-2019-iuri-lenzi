/*
* Define an event listener on the window resize event (in order to adjust the aspect ratio)
*/
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function onDocumentMouseClick( event ){
	if(selectedObject != null && selectedObject != undefined){
		alert("Inspect:" + selectedObject.parameters.url)
	}
}

function onDocumentMouseMove( event ) {
	//console.log(event.layerX, event.layerY);
	event.preventDefault();
	if ( selectedObject ) {
		selectedObject.material.color.set( '#69f' );
		selectedObject = null;
	}
	var intersects = getIntersects( event.layerX, event.layerY );
	if ( intersects.length > 0 ) {
		var res = intersects.filter( function ( res ) {
			return res && res.object;
		} )[ 0 ];
		if ( res && res.object ) {
			selectedObject = res.object;
			selectedObject.material.color.set( '#f00' );
		}
	}
}

function getIntersects( x, y ) {
	x = ( x / window.innerWidth ) * 2 - 1;
	y = - ( y / window.innerHeight ) * 2 + 1;
	mouseVector.set( x, y, 0.5 );
	raycaster.setFromCamera( mouseVector, camera );
	return raycaster.intersectObject( group, true );
}