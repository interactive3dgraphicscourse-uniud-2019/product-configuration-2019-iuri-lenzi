class BoxMaterial extends THREE.Mesh{
	constructor(materialIndex, position){
		super(new THREE.BoxBufferGeometry(1,1,1), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));
		this.materialIndex = materialIndex;
		this.position.set( position.x, position.y, position.z );
	}
}