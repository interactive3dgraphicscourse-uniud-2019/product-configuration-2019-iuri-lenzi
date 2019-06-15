var scene, renderer, camera, stats, cube, raycaster; 
var selectedObject = null; 
var mouseVector = new THREE.Vector3();
var group = new THREE.Group();
var switchScene = false;
var p = window.parent;
var aspect = window.innerWidth / window.innerHeight * 2;
var frustumSize = 4;

function trigger(component){
	alert(component.materialIndex);
}

function Start() {
	raycaster = new THREE.Raycaster();
	scene = new THREE.Scene();
	camera = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
	//camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	var materials = [0, 2, 3, 6, 5];

	materials.forEach(function(material, i){
		group.add( new BoxMaterial(material, new THREE.Vector3(
			(2 * i) - (((2 * materials.length) - 1)/2) - 1/2, 0, 0
		)) )
	})

	scene.add( group );
	//initControl(0, 10);
	camera.position.set(-1, 0, 2);	
}

function Update() {
	requestAnimationFrame(Update);
	renderer.render(scene, camera);
}


Start();
Update();

bindEvent(window, "click", onDocumentMouseClick)
bindEvent(window, "mousemove", onDocumentMouseMove)
bindEvent(window, 'message', function (event) {
	updateQuaternion(event.data);
});


function send_to_parent(){
	alert(p.currentItem)
}


function updateQuaternion( rotation ){
	group.children.forEach(function(box){
		box.rotation.set(rotation._x, rotation._y, rotation._z)
	})
}