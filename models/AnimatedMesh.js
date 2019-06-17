class AnimatedMesh extends THREE.Mesh{
	constructor(mesh, params){

		var geom = mesh.geometry;
		THREE.BufferGeometryUtils.computeTangents(geom);

		if(params.materials[0] != -1)
			super(geom, materialVector[params.materials[0]]);
		else
			super(geom, mesh.material);
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

	explode(speed = 1000){
		var frames = this.parameters.frames
		var firstTween = this.tweenTo(frames[1].position, speed)
		if(frames.length > 2){
			for(var i = 2; i < frames.length; i++){
				firstTween.chain(this.tweenTo(frames[i].position, speed))
			}
		}
		firstTween.start();
	}

	implode(speed = 1000){
		this.parameters.frames.reverse();
		this.explode(speed);
		this.parameters.frames.reverse();
	}

	tweenTo(nextPosition, speed){
		var tween = new TWEEN.Tween(this.position).to(nextPosition, speed);
		tween.easing(TWEEN.Easing.Elastic.InOut)
		return tween;
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
