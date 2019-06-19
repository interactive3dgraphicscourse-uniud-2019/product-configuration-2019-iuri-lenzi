/*
* Inspector-controls view script
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


// global variables
var scene, renderer, camera, stats, cube, raycaster; 
var group = new THREE.Group();
var switchScene = false;

// ray caster variables
var selectedObject = null; 
var mouseVector = new THREE.Vector3();

// used to interact with the parent view
var p = window.parent;


/*
* handler for mouse click on a cube event
*/
function Trigger( component ){
	p.UpdateSceneMaterials( component.materialIndex );
}


/*
* Entry point function for scene initialization
*/
function Start() {

	// init scene and ray caster
	raycaster = new THREE.Raycaster();
	scene = new THREE.Scene();

	// orthographic camera setup
	var aspect = window.innerWidth / window.innerHeight * 2;
	var frustumSize = 4;
	camera = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
	camera.position.set(-1, 0, 2);	

	// renderer setup
	renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaOutput = true;
	renderer.gammaInput = true;
	renderer.shadowMap.enabled = true;
	document.body.appendChild( renderer.domElement );

	// load material choices (cubes)
	var materials = p.inspectedObject.parameters.materials;
	materials.forEach(function( material, i ){
		group.add( new BoxMaterial( material, new THREE.Vector3(
			(2 * i) - (((2 * materials.length) - 1)/2) - 1/2, 0, 0
		)));
	})
	scene.add( group );
	scene.add(CreateDirLight());

	// setup event listeners
	BindEvent(window, 'click', OnDocumentMouseClick );
	BindEvent(window, 'mousemove', OnDocumentMouseMove );
	BindEvent(window, 'message', function ( event ) {
		UpdateQuaternion( event.data );
	});
	
}


/* 
* loop function 
*/
function Update() {
	requestAnimationFrame( Update );
	renderer.render( scene, camera );
}


/*
* Apply an arbitrary rotation on the cubes
*/
function UpdateQuaternion( rotation ){
	group.children.forEach( function( box ){
		box.rotation.set( rotation._x, rotation._y, rotation._z );
	})
}


/*
* entry point calls
*/
Start();
Update();