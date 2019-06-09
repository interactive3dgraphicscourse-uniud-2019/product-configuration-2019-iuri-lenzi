function inspect(component){
    console.dir(component);
    
    //Empty old inspector scene
    emptyInspScene();

    //Load component and create inspector scene
    loadComponent(component);

    //Switch Scene
    switchScene = true;
}

function emptyInspScene()
{
    
}

function loadComponent(component)
{
    var params = component.parameters;
    var loader = new THREE.GLTFLoader();
    loader.load( component.parameters.url, 
                 function( gltf ) {
                    var gltfMesh = gltf.scene.children[0];

                    var elementToInsp = new THREE.Mesh(gltfMesh.geometry, new THREE.MeshPhongMaterial({vertexColors:    true}));
                    elementToInsp.scale.set(params.frames[0].scale, params.frames[0].scale, params.frames[0].scale);
                    
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