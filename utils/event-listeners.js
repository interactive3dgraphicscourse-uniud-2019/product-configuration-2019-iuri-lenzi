/*
* Define an event listener on the window resize event (in order to adjust the aspect ratio)
*/
function OnWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
