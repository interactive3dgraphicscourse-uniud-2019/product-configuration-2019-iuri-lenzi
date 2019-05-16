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
	scene.add( mesh );
	InitCamera();
	InitGround();
	
	window.addEventListener( 'resize', OnWindowResize, false );
	
	InitRenderer();
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