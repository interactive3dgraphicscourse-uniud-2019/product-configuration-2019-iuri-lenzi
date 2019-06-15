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


function createInspScene(elements)
{
	elements.forEach(element => {
        inspectorScene.add(element);
    });
}


function send_to_child(){
    iframeEl.contentWindow.postMessage("ciao figlio sono tuo padre", '*');
}