/*
* Light manager
*/

/*
* Init an HemisphereLight
*/
function createHemiLight(){
	var hemiLight = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	hemiLight.position.set( 0.5, 1, 0.75 );
    return hemiLight;
}

/*
* Init a DirectionalLight
*/
function createDirLight(){
    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.color.setHSL( 0.1, 1, 0.95 );
	dirLight.position.set( -1, 1.75, 1 );
	dirLight.position.multiplyScalar( 50 );
	dirLight.castShadow = true;
	dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    return dirLight;
}