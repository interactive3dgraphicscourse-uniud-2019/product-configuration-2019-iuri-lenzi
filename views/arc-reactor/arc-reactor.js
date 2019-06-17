/*
* Arc-reactor view script
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


// Global variables and constants
var camera, scene, renderer, controls, stats;
var clock = new THREE.Clock();

// Raycast
var group = new THREE.Group();
var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();
var selectedObject = null;

// Inspector
var inspectorScene;
var inspectorHemiLight;
var inspectorDirectLight;
var switchScene = false;

// Lights
var hemiLight, dirLight;

// Materials
var materialVector = new Array();

// Skybox
var skyMesh;
var skyMaterial;

/*
* Init function
*/ 
function Init() {

	// loads arc-reactor-controls view
	ApplyTemplate("../arc-reactor-controls/arc-reactor-controls.html");
	InitStat();
	InitScene();
	InitInspectorScene();
	InitMaterials();
	InitCamera();

	// load architecture.json and add to the scene the components
	LoadArchitecture("../../assets/models/architecture.json");

	// init scene and camera pose
	group.rotation.z += Math.PI / 4
	group.rotation.y += Math.PI / 2
	camera.position.set(150,0,150)
	scene.add(group);
		
	// desktop events
	BindEvent(window, "mousemove", OnDocumentMouseMove );
	BindEvent(document, "mousedown", OnMouseDown );
	BindEvent(document, "mouseup", OnMouseUp );
	// touch screen events
	BindEvent(document, "touchmove", OnDocumentMouseMove );
	BindEvent(document, "touchstart", OnMouseDown );
	BindEvent(document, "touchend", OnMouseUp );
	// general events
	BindEvent(window, "resize", OnWindowResize );
	BindEvent(window, "click", OnDocumentMouseClick );
	// custom event triggered once the shader loading is completed
	BindEvent(document, "loading-complete", function(){
		skyMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(500, 64, 64), skyMaterial);
		scene.add(skyMesh);
		Animate();
	})

	InitRenderer();
}


/*
* deserialize the json content and setup each component defined
*/ 
function LoadArchitecture( file ) {
	Read(file, function(content){
		var architecture = JSON.parse(content);   
		architecture.forEach(function(component){
			SetupMesh(component);
		});
	})
}


/*
* Given a component definition loads the component and add it to the scene
*/ 
function SetupMesh( parameters ) {
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
function Animate() {
	TWEEN.update();
	stats.update();
	controls.update();
	requestAnimationFrame( Animate );
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
function InitRenderer(){
	renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
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
	scene.background = new THREE.Color( 0x000022 );
	scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
	hemiLight = CreateHemiLight();
	dirLight = CreateDirLight();
    scene.add( hemiLight );  
	scene.add( dirLight );  
}


/*
* Inspector scene init
*/
function InitInspectorScene()
{
	inspectorScene = new THREE.Scene();
	inspectorScene.background = new THREE.Color( 0x000022 );
	inspectorHemiLight = CreateHemiLight();
	inspectorDirectLight = CreateDirLight();
}


/*
* Skybox init
*/
function InitSkyBox()
{
	skyMaterial = new THREE.ShaderMaterial(
		{
			vertexShader: 'sky-vertex',
			fragmentShader: 'sky-fragment',
			uniforms: {"skyMap": {type: "t", value: environmentMaps[0]}},
			side: THREE.BackSide
		}
	)
}


/*
* Stat init
*/
function InitStat(){
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	// uncomment for debugging purpose only in order to see rendering stats
	//document.body.appendChild( stats.domElement );
}


// entry-point call
Init();