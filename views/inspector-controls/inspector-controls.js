var scene, renderer, camera, stats, cube, raycaster; 
var selectedObject = null; 
var mouseVector = new THREE.Vector3();
var group = new THREE.Group();
var switchScene = false;
var p = window.parent;
var aspect = window.innerWidth / window.innerHeight * 2;
var frustumSize = 4;

function trigger(component){
	//alert(component.materialIndex);
	p.updateSceneMaterials(component.materialIndex)
}

function Start() {
	raycaster = new THREE.Raycaster();
	scene = new THREE.Scene();
	camera = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );

	renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaOutput = true;
	renderer.gammaInput = true;
	renderer.shadowMap.enabled = true;
	document.body.appendChild( renderer.domElement );
	var materials = p.inspectedObject.parameters.materials;

	materials.forEach(function(material, i){
		group.add( new BoxMaterial(material, new THREE.Vector3(
			(2 * i) - (((2 * materials.length) - 1)/2) - 1/2, 0, 0
		)) )
	})

	var plane = new THREE.Mesh(new THREE.BoxBufferGeometry(15,0.2,3), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ))
	plane.position.set(-1,-1.5,0);
	plane.rotation.x += 0.2;
	scene.add( group );
	scene.add(createDirLight())
	camera.position.set(-1, 0, 2);	
}

function Update() {
	requestAnimationFrame(Update);
	renderer.render(scene, camera);
}


Start();
Update();

BindEvent(window, "click", OnDocumentMouseClick)
BindEvent(window, "mousemove", OnDocumentMouseMove)
BindEvent(window, 'message', function (event) {
	updateQuaternion(event.data);
});


function updateQuaternion( rotation ){
	group.children.forEach(function(box){
		box.rotation.set(rotation._x, rotation._y, rotation._z)
	})
}