/*
* Entry point script for renderer and scene management and initializations
*/

// Global variables and constants
var camera, scene, renderer, controls, stats;

// Lights
var hemiLight, dirLight;

/*
* Init function
*/ 
function Init() {
	InitStat();
	InitScene();

	var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
	var material = new THREE.MeshBasicMaterial( );
	material.color.setHex( 0xf0f0f0 );
	mesh = new THREE.Mesh( geometry, material );
	//scene.add( mesh );
	LoadGLTF('assets/models/inner_structure/inner_structure.glb', 100);	
	LoadGLTF( 'assets/models/acc_ring/acc_ring.glb', 50);	
	LoadGLTF( 'assets/models/acc_coil/acc_coil.glb', 100);	
	LoadGLTF( 'assets/models/chamber/chamber.glb', 100);	
	LoadGLTF( 'assets/models/chamber_heatsink/chamber_heatsink.glb', 100);	
	LoadGLTF( 'assets/models/chamber_rings/chamber_rings.glb', 100);	
	LoadGLTF( 'assets/models/grid/grid.glb', 100);	
	LoadGLTF( 'assets/models/inner_copper_rings/inner_copper_rings.glb', 100);	
	LoadGLTF( 'assets/models/inner_structure/inner_structure.glb', 100);	
	InitCamera();
	
	window.addEventListener( 'resize', OnWindowResize, false );
	
	InitRenderer();
}

function LoadGLTF(url, scale){
	var loader = new THREE.GLTFLoader();
	loader.load( url, function( gltf ) {
		mesh = gltf.scene.children[ 0 ];
		mesh.scale.set( scale, scale, scale );
		scene.add( mesh );
	} );
}


/*
* Loop function
*/
function Animate() {
	stats.update();
	controls.update();
	requestAnimationFrame( Animate );
	renderer.render( scene, camera );
}


/*
* Renderer init
*/
function InitRenderer(){
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaOutput = true;
	renderer.gammaInput = true;
	renderer.shadowMap.enabled = true;
	document.body.appendChild( renderer.domElement );
}


/*
* Scene init
*/
function InitScene(){
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );
	scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
	hemiLight = CreateHemiLight();
	dirLight = CreateDirLight();
    scene.add( hemiLight );  
	scene.add( dirLight );  
}


/*
* Stat init
*/
function InitStat(){
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );
}


Init();
Animate();