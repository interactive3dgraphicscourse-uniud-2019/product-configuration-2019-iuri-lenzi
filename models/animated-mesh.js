/*
* Mesh extension that keeps some parameters as instance variables and 
* apply autonomously any transition animation using TweenJs 
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


class AnimatedMesh extends THREE.Mesh{
	constructor( mesh, params ){

		var geom = mesh.geometry;
		THREE.BufferGeometryUtils.computeTangents( geom );

		if( params.materials[ 0 ] != -1 )
			super( geom, materialVector[ params.materials[ 0 ] ] );
		else
			super( geom, mesh.material );
		this.scale.set( params.frames[0].scale, params.frames[0].scale, params.frames[0].scale );
		this.rotation.set( params.frames[0].rotation.x * 180/Math.PI, params.frames[0].rotation.y* 180/Math.PI, params.frames[0].rotation.z* 180/Math.PI ); 
		this.position.set( params.frames[0].position.x, params.frames[0].position.y, params.frames[0].position.z );
		this.parameters = params;
	}


	/*
	* Mesh.clone() override to preserve the parameters
	*/
	clone(){
		return new AnimatedMesh(
			new THREE.Mesh( this.geometry, this.material ), 
			this.parameters 
		);
	} 


	/*
	* Start the explosion animation 
	* (accordingly with the vector of frames defined in parameters.frames)
	*/
	Explode( speed = 1000 ){
		var frames = this.parameters.frames;
		var firstTween = this.TweenTo( frames[ 1 ].position, speed );
		if( frames.length > 2 ){
			for( var i = 2; i < frames.length; i++ ){
				firstTween.chain( this.TweenTo( frames[ i ].position, speed ) )
			}
		}
		firstTween.start();
	}


	/*
	* Implosion is the inversion of the Explosion() method
	*/
	Implode( speed = 1000 ){
		this.parameters.frames.reverse();
		this.Explode( speed );
		this.parameters.frames.reverse();
	}


	/*
	* Tween to the next frame 
	*/
	TweenTo( nextPosition, speed ){
		var tween = new TWEEN.Tween( this.position ).to( nextPosition, speed );
		tween.easing( TWEEN.Easing.Elastic.InOut )
		return tween;
	}
}


/*
* The analogy of AnimatedMesh for groups of mesh
* (used for the coil group)
*/
class AnimatedGroup extends THREE.Group{
	constructor( mesh, rotation ){
		super();
		var self = this; 
		mesh.children.forEach( function( child ){
			self.add( child );
		});
		this.rotation.set( 0, rotation, 0 );
	}
}
