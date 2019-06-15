var scene, renderer, camera, stats, cube, raycaster; 
var selectedObject = null; 
var mouseVector = new THREE.Vector3();
var group = new THREE.Group();
var switchScene = false;
var p = window.parent;
var mouseDown = false;

function trigger(component){
	alert("lasjlsjfddslkj")
}

function Start() {
	raycaster = new THREE.Raycaster();
	bindEvent(window, "mousemove", updateQuaternion );
	//bindEvent(window, "click", updateQuaternion );
	bindEvent(document, "mousedown", onMouseDown );
	bindEvent(document, "mouseup", onMouseUp );
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	var materials = [0, 2, 3];

	materials.forEach(function(material, i){
		group.add( new BoxMaterial(material, new THREE.Vector3(
			(2 * i) - (((2 * materials.length) - 1)/2) + 1/2, 0, 0
		)) )
	})

	scene.add( group );
	initControl(0, 10);
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

function updateQuaternion( event ){
	if(mouseDown)
	{
		console.log("quaternion")
		group.children.forEach(function(box){
			box.rotation.set(camera.rotation._x, camera.rotation._y, camera.rotation._z)
		})
	}
}