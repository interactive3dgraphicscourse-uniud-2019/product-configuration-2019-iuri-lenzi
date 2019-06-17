var inspectedObject;

function trigger(component){
    console.dir(component);
    description = "";
    //Empty old inspector scene
    emptyInspScene();

    //Load component and create inspector scene
    inspectedObject = component.clone();
    inspectedObject.position.set(0,0,0);
    inspectedObject.scale.set(inspectedObject.parameters.inspectorScale, inspectedObject.parameters.inspectorScale, inspectedObject.parameters.inspectorScale);
    inspectedObject.rotation.set(0,0,0);
    loadComponent(component);

    //Switch Scene
    switchScene = true;

    //Create close inspector button
    applyTemplate( "../inspector/inspector.html", [ ["{description}", description] ] );
    bindEvent(window, "mousemove", sendRotation );
    bindEvent(document, "touchmove", sendRotation );

}

function emptyInspScene()
{
    inspectorScene.children.forEach(child => {
        inspectorScene.remove(child);
    })
}

function loadComponent(component)
{
    elements = new Array(skyMesh, inspectorHemiLight, inspectorDirectLight, inspectedObject);

    //Create new inspector scene
    createInspScene(elements);
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


function changeMaterial(mesh, materialIndex){
    mesh.material = materialVector[materialIndex];
    mesh.parameters.materials[mesh.parameters.materials.indexOf(materialIndex)] = mesh.parameters.materials[0];
    mesh.parameters.materials[0] = materialIndex; 
    mesh.material.needsUpdate = true;
}

function updateSceneMaterials(materialIndex){
    changeMaterial(inspectedObject, materialIndex)
    group.children.forEach(function(child){
        if(child instanceof AnimatedMesh && child.parameters.url == inspectedObject.parameters.url){
            changeMaterial(child, materialIndex)
        } else if(child instanceof AnimatedGroup && child.children[0].parameters.url == inspectedObject.parameters.url){
            child.children.forEach(function(c){
                changeMaterial(c, materialIndex)
            })
        }
    })   
}