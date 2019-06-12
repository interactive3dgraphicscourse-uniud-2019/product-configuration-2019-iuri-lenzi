/*
* Entry point script for renderer and scene management and initializations
*/

// Global variables and constants
var camera, scene, renderer, controls, stats;
var clock = new THREE.Clock();

//Raycast
var group = new THREE.Group();
var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();
var selectedObject = null;

//Inspector
var inspectorScene;
var inspectorHemiLight;
var inspectorDirectLight;
var switchScene = false;

// Lights
var hemiLight, dirLight;


/*
* Init function
*/ 
function init() {
	initStat();
	initScene();
	initInspectorScene();

	loadArchitecture("assets/models/architecture.json");
	scene.add(group);
	initCamera();
	
	window.addEventListener( 'resize', onWindowResize, false );
	window.addEventListener( "mousemove", onDocumentMouseMove, false );
	window.addEventListener( "click", onDocumentMouseClick, false );
	initRenderer();
}


function loadArchitecture(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
				var architecture = JSON.parse(rawFile.responseText);   
				architecture.forEach(function(component){
					setupMesh(component);
				});
            }
        }
    }
    rawFile.send(null);
}


function setupMesh(parameters){
	var loader = new THREE.GLTFLoader();
	loader.load( parameters.url, function( gltf ) {
		var gltfMesh = gltf.scene.children[ 0 ];
		if(parameters.repeat > 0){
			var component = new THREE.Group();
			component.add(new AnimatedMesh(gltfMesh, parameters));
			for(var i = 0; i < parameters.repeat; i++){
				var new_component = component.clone();
				group.add(new AnimatedGroup(new_component, ((2 * Math.PI * i) / 10)));
			}
		} else {
			group.add(new AnimatedMesh(gltfMesh, parameters));
		}
	});
}


/*
* Loop function
*/
function animate() {
	stats.update();
	controls.update();
	renderAnimation();
	requestAnimationFrame( animate );
	Render();
}

/*
* Render function
*/
function Render()
{
	if(!switchScene)
		renderer.render( scene, camera );
	else
		renderer.render( inspectorScene, camera );
}


/*
* Renderer init
*/
function initRenderer(){
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaOutput = true;
	renderer.gammaInput = true;
	renderer.shadowMap.enabled = true;
	//document.getElementById( 'arc-reactor' ).appendChild( renderer.domElement );
	document.body.appendChild( renderer.domElement );
}


/*
* Scene init
*/
function initScene(){
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );
	scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
	hemiLight = createHemiLight();
	dirLight = createDirLight();
    scene.add( hemiLight );  
	scene.add( dirLight );  
}

/*
* Inspector scene init
*/
function initInspectorScene()
{
	inspectorScene = new THREE.Scene();
	inspectorScene.background = new THREE.Color( 0xffffff	 );
	inspectorHemiLight = createHemiLight();
	inspectorDirectLight = createDirLight();
}


/*
* Stat init
*/
function initStat(){
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );
}


init();
animate();