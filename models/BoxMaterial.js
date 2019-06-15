class BoxMaterial extends THREE.Mesh{
	constructor(material_index, position){
		super(new THREE.BoxBufferGeometry(1,1,1), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));
		this.position.set( position.x, position.y, position.z );
		//super(new THREE.BoxBufferGeometry(1,1,1), materialVector[material_index]);
		//this.scale.set(params.frames[0].scale, params.frames[0].scale, params.frames[0].scale);
		//this.rotation.set(params.frames[0].rotation.x * 180/Math.PI, params.frames[0].rotation.y* 180/Math.PI, params.frames[0].rotation.z* 180/Math.PI) 
		//this.parameters = params;
	}
}