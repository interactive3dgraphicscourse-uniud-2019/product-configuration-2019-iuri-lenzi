function initInnerRings(){
    //Material 23: rings copper 1
    var rings_rough = 0.7;
    var all_rough = 0.7;
    rings_copp_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "inBaseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "inRoughness": {type: "f",  value: rings_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(all_rough * 8)]}
            },
            vertexShader: 'inner-rings-vertex',
            fragmentShader: 'inner-rings-fragment',
            vertexColors: THREE.VertexColors
        }
    )

    //Material 24: rings gold 1
    rings_rough = 0.7;
    rings_gold_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "inBaseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "inRoughness": {type: "f",  value: rings_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(all_rough * 8)]}
            },
            vertexShader: 'inner-rings-vertex',
            fragmentShader: 'inner-rings-fragment',
            vertexColors: THREE.VertexColors
        }
    );
}