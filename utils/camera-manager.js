/*
* Camera management class
*/

/*
* Init camera and call camera control initialization
*/
function InitCamera(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	InitControl()
}

/*
* Init Camera Control
*/
function InitControl(){

	controls = new THREE.OrbitControls( camera );
	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.25;
	controls.screenSpacePanning = false;
	controls.minDistance = 100;
	controls.maxDistance = 500;
	controls.maxPolarAngle = Math.PI / 2;

}
