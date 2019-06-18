/*
* Inner rings shader material defition
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitInnerRings(){
    //Material 23: rings copper 1
    var ringsRough = 0.7;
    var allRough = 0.7;
    ringsCopp1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "inBaseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "inRoughness": {type: "f",  value: ringsRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(allRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'inner-rings-vertex',
            fragmentShader: 'inner-rings-fragment',
            vertexColors: THREE.VertexColors
        }
    )

    //Material 24: rings gold 1
    ringsRough = 0.7;
    ringsGold1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "inBaseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "inRoughness": {type: "f",  value: ringsRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(allRough * 8)]},
                
            },
            vertexShader: 'inner-rings-vertex',
            fragmentShader: 'inner-rings-fragment',
            vertexColors: THREE.VertexColors
        }
    );
}