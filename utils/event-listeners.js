/*
* Define an event listener on the window resize event (in order to adjust the aspect ratio)
*/

/*
* Support for IE8
*/
function BindEvent(element, eventName, eventHandler) {
	if (element.addEventListener){
		element.addEventListener(eventName, eventHandler, false);
	} else if (element.attachEvent) {
		element.attachEvent('on' + eventName, eventHandler);
	}
}


function UnbindEvent(element, eventName, eventHandler) {
	if (element.addEventListener){
		element.removeEventListener(eventName, eventHandler, false);
	} else if (element.attachEvent) {
		element.detachEvent('on' + eventName, eventHandler);
	}
}


function OnMessage(event) {
	alert(event.data);
}


function OnWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function OnDocumentMouseClick( event ){
	if(selectedObject != null && selectedObject != undefined && !switchScene){
		trigger( selectedObject );
	}
}

function OnDocumentMouseMove( event ) {
	event.preventDefault();
	if ( selectedObject ) {
		selectedObject = null;
	}
	var intersects = GetIntersects( event.layerX, event.layerY );
	if ( intersects.length > 0 ) {
		var res = intersects.filter( function ( res ) {
			return res && res.object;
		} )[ 0 ];
		if ( res && res.object ) {
			selectedObject = res.object;
		}
	}
}

function GetIntersects( x, y ) {
	x = ( x / window.innerWidth ) * 2 - 1;
	y = - ( y / window.innerHeight ) * 2 + 1;
	mouseVector.set( x, y, 0.5 );
	raycaster.setFromCamera( mouseVector, camera );
	if(!switchScene)
		return raycaster.intersectObject( group, true );
	else
		return raycaster.intersectObject( inspectorScene, true );
}

function CloseInspector() {
	switchScene = false;
	applyTemplate("../arc-reactor-controls/arc-reactor-controls.html");
	scene.add(skyMesh);
	switchScene = false;
}


var mouseDown = false;

function OnMouseDown( event ){
	mouseDown = true
}

function OnMouseUp( event ){
	mouseDown = false
}


function SendRotation( event ){
	var inspectorControl = document.getElementById("inspector-controls");
	if(mouseDown && inspectorControl != null){
		inspectorControl.contentWindow.postMessage({_x: camera.rotation._x, _y: camera.rotation._y, _z: camera.rotation._z}, '*');
	}
}