/*
* Entry point script for renderer and scene management and initializations
*/

// Global variables and constants
var camera, scene, renderer, controls, stats;
var meshComponents = []
var clock = new THREE.Clock();
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
	readTextFile("assets/models/architecture.csv");
	InitCamera();
	
	window.addEventListener( 'resize', OnWindowResize, false );
	
	InitRenderer();
}


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                ParseArchitecture(rawFile.responseText);   
            }
        }
    }
    rawFile.send(null);
}


function ParseArchitecture(csv)
{
	csv = csv.split('\n');
	csv.shift(); 
	csv.pop();
	csv.forEach(function(row) {
		row = row.split(',');
			SetupMesh({
				url: row[0], 
				scale: parseFloat(row[1]),
				initPos: new THREE.Vector3(parseFloat(row[2]), parseFloat(row[3]), parseFloat(row[4])),
				initRotation: new THREE.Vector3(parseFloat(row[5]), parseFloat(row[6]), parseFloat(row[7])),
				finalPos: new THREE.Vector3(parseFloat(row[8]), parseFloat(row[9]), parseFloat(row[10])),
				finalRotation:new THREE.Vector3(parseFloat(row[11]), parseFloat(row[12]), parseFloat(row[13])),	
				repeat: parseInt(row[14]),
				circRadious: parseFloat(row[15]),
				effect: row[16]
			});
	});
}


function SetupMesh(mesh){
	var loader = new THREE.GLTFLoader();
	loader.load( mesh.url, function( gltf ) {
		gltfMesh = gltf.scene.children[ 0 ];
		gltfMesh.scale.set( mesh.scale, mesh.scale, mesh.scale );
		gltfMesh.rotation.set( mesh.initRotation.x * 180/Math.PI, mesh.initRotation.y* 180/Math.PI, mesh.initRotation.z* 180/Math.PI );
		gltfMesh.position.set( mesh.initPos.x, mesh.initPos.y, mesh.initPos.z );
		if(mesh.repeat == 0){
			scene.add( gltfMesh );
			meshComponents.push(new AnimatedMesh(gltfMesh, mesh.initPos, mesh.initRotation, mesh.finalPos, mesh.finalRotation, mesh.effect));
		} else {
			debugger;
			var circ = new THREE.Group();
			var component = new THREE.Group();
			gltfMesh.position.x += mesh.circRadious;
			component.add(gltfMesh);
			for(var i = 0; i < mesh.repeat; i++){
				var newComponent = component.clone()
				newComponent.rotation.y += (2 * Math.PI * i) / 10;
				circ.add(newComponent);
				meshComponents.push(new AnimatedMesh(newComponent, mesh.initPos, mesh.initRotation, mesh.finalPos, mesh.finalRotation, mesh.effect));
			}
			scene.add(circ);
		}
	} );
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
	RenderAnimation();
	requestAnimationFrame( Animate );
	renderer.render( scene, camera );
}


function RenderAnimation(){ }
function RenderVoidAnimation(){ }


function RenderExplosion(){
	var speed = 10;
	var delta = clock.getDelta() * speed;
	var hasChanged = false;
	var endAnimation = true;
	meshComponents.forEach(function(component) {
		debugger;
		hasChanged = false;
		if(component.mesh.position.x < component.finalPos.x){
			component.mesh.position.x += delta;
			hasChanged = true;
		} 
		if(component.mesh.position.y < component.finalPos.y){
			component.mesh.position.y += delta;
			hasChanged = true;
		} 
		if(component.mesh.position.z < component.finalPos.z){
			component.mesh.position.z += delta;
			hasChanged = true;
		} 
		if(!hasChanged){
			component.mesh.position.set(component.finalPos.x, component.finalPos.y, component.finalPos.z)
		} else {
			endAnimation = false;
		}
	});
	if(endAnimation){
		RenderAnimation = RenderVoidAnimation;
	}
}


function RenderImplosion(){
	var speed = 10;
	var delta = clock.getDelta() * speed;
	var hasChanged = false;
	var endAnimation = true;
	meshComponents.forEach(function(component) {
		debugger;
		hasChanged = false;
		if(component.mesh.position.x > component.initPos.x){
			component.mesh.position.x -= delta;
			hasChanged = true;
		} 
		if(component.mesh.position.y > component.initPos.y){
			component.mesh.position.y -= delta;
			hasChanged = true;
		} 
		if(component.mesh.position.z > component.initPos.z){
			component.mesh.position.z -= delta;
			hasChanged = true;
		} 
		if(!hasChanged){
			component.mesh.position.set(component.initPos.x, component.initPos.y, component.initPos.z)
		} else {
			endAnimation = false;
		}
	});
	if(endAnimation){
		RenderAnimation = RenderVoidAnimation;
	}
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