var scene, renderer, camera, stats, cube;
			
function Start() {

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	
	var geometry = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	box = new THREE.Mesh( geometry, material );
	scene.add( box );
	
	camera.position.z = 5;	
}

function Update() {
	requestAnimationFrame(Update);
	renderer.render(scene, camera);
}


Start();
Update();


bindEvent(window, 'message', function (event) {
	alert(event.data);
});


function send_to_parent(){
	window.parent.postMessage("ciao padre sono tuo figlio", '*');
}