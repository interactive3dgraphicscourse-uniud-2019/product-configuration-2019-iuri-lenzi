/*
* TODO doc
*/


function renderAnimation(){ }
function renderVoidAnimation(){ }


function renderExplosion(){
	var speed = 10;
	var delta = clock.getDelta() * speed;
	var hasChanged = false;
	var endAnimation = true;
	group.children.forEach(function(component) {
        if(component instanceof THREE.Mesh)
        {
            hasChanged = false;
            if(component.position.x < component.parameters.frames[1].position.x){
                component.position.x += delta;
                hasChanged = true;
            } 
            if(component.position.y < component.parameters.frames[1].position.y){
                component.position.y += delta;
                hasChanged = true;
            } 
            if(component.position.z < component.parameters.frames[1].position.z){
                component.position.z += delta;
                hasChanged = true;
            } 
            if(!hasChanged){
                component.position.set(component.parameters.frames[1].position.x, component.parameters.frames[1].position.y, component.parameters.frames[1].position.z)
            } else {
                endAnimation = false;
            }
        } else if (component instanceof THREE.Group){
            //TODO
        }
	});
	if(endAnimation){
		renderAnimation = renderVoidAnimation;
	}
}


function renderImplosion(){
	var speed = 10;
	var delta = clock.getDelta() * speed;
	var hasChanged = false;
	var endAnimation = true;
	group.children.forEach(function(component) {
        if(component instanceof THREE.Mesh)
        {
            hasChanged = false;
            if(component.position.x > component.parameters.frames[0].position.x){
                component.position.x -= delta;
                hasChanged = true;
            } 
            if(component.position.y > component.parameters.frames[0].position.y){
                component.position.y -= delta;
                hasChanged = true;
            } 
            if(component.position.z > component.parameters.frames[0].position.z){
                component.position.z -= delta;
                hasChanged = true;
            } 
            if(!hasChanged){
                component.position.set(component.parameters.frames[0].position.x, component.parameters.frames[0].position.y, component.parameters.frames[0].position.z)
            } else {
                endAnimation = false;
            }
        } else if (component instanceof THREE.Group){
            //TODO
        }
	});
	if(endAnimation){
		renderAnimation = renderVoidAnimation;
	}
}