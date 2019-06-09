function inspect(component){
    console.dir(component);
    
    //Empty old inspector scene
    emptyInspScene();

    //Load component and create inspector scene
    loadComponent(component);

    //Switch Scene
    switchScene = true;

    //Create close inspector button
    $("#container").html("<div id=\"info\"><span style=\"font-size:20px\">[Second Course Project 2019 - Product Configuration]</span><br /><br /><span style=\"font-size:15px\">Team: Marco Iuri and Edoardo Lenzi</span></div>");
    $("#container").append("<button onclick=\"closeInspector()\">Close Inspector</button>");
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

                    var elementToInsp = new THREE.Mesh(gltfMesh.geometry, new THREE.MeshPhongMaterial({ color: "#6699ff"}));
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