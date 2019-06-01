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
		row = row.split(';');
			SetupMesh({
				url: row[0], 
				scale: row[1],
				init_pos: new THREE.Vector3(row[2], row[3], row[4]),
				init_rotation: new THREE.Vector3(row[5], row[6], row[7]),
				final_pos: new THREE.Vector3(row[8], row[9], row[10]),
				final_rotation:new THREE.Vector3(row[11], row[12], row[13]),	
				repeat: row[14],
				circ_radious: row[15]
			});
	});
}


function SetupMesh(mesh){
	var loader = new THREE.GLTFLoader();
	loader.load( mesh.url, function( gltf ) {
		gltf_mesh = gltf.scene.children[ 0 ];
		gltf_mesh.scale.set( mesh.scale, mesh.scale, mesh.scale );
		gltf_mesh.rotation.set( mesh.init_rotation.x * 180/Math.PI, mesh.init_rotation.y* 180/Math.PI, mesh.init_rotation.z* 180/Math.PI );
		gltf_mesh.position.set( mesh.init_pos.x, mesh.init_pos.y, mesh.init_pos.z );
		if(mesh.repeat == 0){
			scene.add( gltf_mesh );
		} else {
			debugger;
			var circ = new THREE.Group();
			var tmp = new THREE.Group();
			gltf_mesh.position.x += mesh.circ_radious;
			tmp.add(gltf_mesh);
			for(var i = 0; i < mesh.repeat; i++){
				var new_tmp = tmp.clone()
				new_tmp.rotation.y += (2 * Math.PI * i) / 10;
				circ.add(new_tmp);
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