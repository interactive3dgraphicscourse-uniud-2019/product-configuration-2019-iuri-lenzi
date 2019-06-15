/*
* Camera management class
*/

/*
* Init camera and call camera control initialization
*/
function initCamera(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	initControl()
}

/*
* Init Camera Control
*/
function initControl(minDistance = 100, maxDistance=500){

	controls = new THREE.OrbitControls( camera );
	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.25;
	controls.screenSpacePanning = false;
	controls.minDistance = minDistance;
	controls.maxDistance = maxDistance;
	controls.maxPolarAngle = Math.PI / 2;
	
}
