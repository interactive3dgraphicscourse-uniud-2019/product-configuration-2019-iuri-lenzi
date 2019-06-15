var scene, renderer, camera, stats, cube, raycaster; 
var selectedObject = null; 
var mouseVector = new THREE.Vector3();
var group = new THREE.Group();
var switchScene = false;
var p = window.parent;

function trigger(component){
	alert("lasjlsjfddslkj")
}

function Start() {
	raycaster = new THREE.Raycaster();
	bindEvent(window, "mousemove", onDocumentMouseMove );
	bindEvent(window, "click", onDocumentMouseClick );
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	
	var geometry = new THREE.BoxBufferGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	box = new THREE.Mesh( geometry, material );

	group.add( box )
	scene.add( group );
	
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
	alert(p.currentItem)
	//window.parent.postMessage("ciao padre sono tuo figlio", '*');
}