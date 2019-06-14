class AnimatedMesh extends THREE.Mesh{
	constructor(mesh, params){

		if(params.materials[0] == 0)
			super(mesh.geometry, materialVector[params.materials[0]]);
		else
			super(mesh.geometry, mesh.material);
		this.scale.set(params.frames[0].scale, params.frames[0].scale, params.frames[0].scale);
		this.rotation.set(params.frames[0].rotation.x * 180/Math.PI, params.frames[0].rotation.y* 180/Math.PI, params.frames[0].rotation.z* 180/Math.PI) 
		this.position.set( params.frames[0].position.x, params.frames[0].position.y, params.frames[0].position.z );
		this.parameters = params;
	}

	clone(){
		return new AnimatedMesh(
			new THREE.Mesh(this.geometry, this.material), 
			this.parameters);
	}
}

class AnimatedGroup extends THREE.Group{
	constructor(mesh, rotation){
		super()
		var self = this; 
		mesh.children.forEach(function(child){
			self.add(child);
		});
		this.rotation.set(0, rotation, 0) 
	}
}
