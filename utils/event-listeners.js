/*
* Define an event listener on the window resize event (in order to adjust the aspect ratio)
*/

/*
* Support for IE8
*/
function bindEvent(element, eventName, eventHandler) {
	if (element.addEventListener){
		element.addEventListener(eventName, eventHandler, false);
	} else if (element.attachEvent) {
		element.attachEvent('on' + eventName, eventHandler);
	}
}


function unbindEvent(element, eventName, eventHandler) {
	if (element.addEventListener){
		element.removeEventListener(eventName, eventHandler, false);
	} else if (element.attachEvent) {
		element.detachEvent('on' + eventName, eventHandler);
	}
}


function onMessage(event) {
	alert(event.data);
}


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function onDocumentMouseClick( event ){
	if(selectedObject != null && selectedObject != undefined && !switchScene){
		trigger( selectedObject );
	}
}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	if ( selectedObject ) {
		//selectedObject.material.color.set( '#69f' );
		selectedObject = null;
	}
	var intersects = getIntersects( event.layerX, event.layerY );
	if ( intersects.length > 0 ) {
		var res = intersects.filter( function ( res ) {
			return res && res.object;
		} )[ 0 ];
		if ( res && res.object ) {
			selectedObject = res.object;
			//selectedObject.material.color.set( '#f00' );
		}
	}
}

function getIntersects( x, y ) {
	x = ( x / window.innerWidth ) * 2 - 1;
	y = - ( y / window.innerHeight ) * 2 + 1;
	mouseVector.set( x, y, 0.5 );
	raycaster.setFromCamera( mouseVector, camera );
	if(!switchScene)
		return raycaster.intersectObject( group, true );
	else
		return raycaster.intersectObject( inspectorScene, true );
}

function closeInspector() {
	switchScene = false;
	applyTemplate("../arc-reactor-controls/arc-reactor-controls.html");
	scene.add(skyMesh);
}


var mouseDown = false;

function onMouseDown( event ){
	mouseDown = true
}

function onMouseUp( event ){
	mouseDown = false
}


function sendRotation( event ){
	var inspectorControl = document.getElementById("inspector-controls");
	if(mouseDown && inspectorControl != null){
		inspectorControl.contentWindow.postMessage({_x: camera.rotation._x, _y: camera.rotation._y, _z: camera.rotation._z}, '*');
	}
}