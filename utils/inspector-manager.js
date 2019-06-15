var currentItem = null;

function trigger(component){
    console.dir(component);
    description = component.parameters.url;
    currentItem = description;
    //Empty old inspector scene
    emptyInspScene();

    //Load component and create inspector scene
    loadComponent(component);

    //Switch Scene
    switchScene = true;

    //Create close inspector button
    applyTemplate( "../inspector/inspector.html", [ ["{description}", description] ] );
}

function emptyInspScene()
{
    inspectorScene.children.forEach(child => {
        inspectorScene.remove(child);
    })
}

function loadComponent(component)
{
    var params = component.parameters;
    var loader = new THREE.GLTFLoader();
    loader.load( component.parameters.url, 
                 function( gltf ) {
                    var gltfMesh = gltf.scene.children[0];

                    var elementToInsp;

                    if(params.materials[0] != -1)
                        elementToInsp = new THREE.Mesh(gltfMesh.geometry, materialVector[params.materials[0]]);
		            else
                        elementToInsp = new THREE.Mesh(gltfMesh.geometry, new THREE.MeshPhongMaterial({ color: "#6699ff"}));
                    
                    elementToInsp.scale.set(params.inspectorScale, params.inspectorScale, params.inspectorScale);
                    
                    //Create insp scene element object
                    elements = new Array(inspectorHemiLight, inspectorDirectLight, elementToInsp);

                    //Create new inspector scene
                    createInspScene(elements);
                 }
	);
}

var fixed_cube;

function createInspScene(elements)
{
	elements.forEach(element => {
        inspectorScene.add(element);
    });
    var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
    var material = new THREE.MeshBasicMaterial( );
    material.color.setHex( 0x000 );
    fixed_cube = new THREE.Mesh( geometry, material );
    fixed_cube.position.z += 40;
    inspectorScene.add( fixed_cube );
}


function renderFixedElements(){
    var cam_dir = new THREE.Vector3();
    camera.getWorldDirection( cam_dir );
    var cam_pos = camera.position;
    if(fixed_cube != undefined && fixed_cube!= null){
        //fixed_cube.position.x -= 10;
        //(
            //cam_pos.x - ((cam_pos.x/100) * 50),
            //cam_pos.y - ((cam_pos.y/100) * 50),
            //cam_pos.z - ((cam_pos.z/100) * 50)
            //cam_pos.x,
            //cam_pos.y,
            //cam_pos.z
        //)
    }
}


function send_to_child(){
    iframeEl.contentWindow.postMessage("ciao figlio sono tuo padre", '*');
}