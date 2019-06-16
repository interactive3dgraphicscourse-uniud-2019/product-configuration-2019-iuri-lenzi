function initMetal(){
    //Material 3: alluminum 1
    var all_rough = 0.1;
    alluminium_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: all_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(all_rough * 8)]}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )

    //Material 4: alluminum 2
    all_rough = 0.4;
    alluminium_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: all_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(all_rough * 8)]}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: "metal-fragment",
        }
    )

    //Material 5: alluminum 3
    all_rough = 0.7;
    alluminium_3 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: all_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(all_rough * 8)]}
            },
            vertexShader: "metal-vertex",
            fragmentShader: "metal-fragment",
        }
    )
    
    //Material 6: dark iron 1
    var iron_rough = 0.4;
    iron_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.112, 0.113, 0.116)},
                "roughness": {type: "f",  value: iron_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(iron_rough * 8)]}
            },
            vertexShader: "metal-vertex",
            fragmentShader: "metal-fragment",
        }
    )

    //Material 7: dark iron 2
    iron_rough = 0.8;
    iron_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.112, 0.113, 0.116)},
                "roughness": {type: "f",  value: iron_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(iron_rough * 8)]}
            },
            vertexShader: "metal-vertex",
            fragmentShader: "metal-fragment",
        }
    )

    //Material 8: gold 1
    var gold_rough = 0.1;
    gold_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: gold_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(gold_rough * 8)]}
            },
            vertexShader: "metal-vertex",
            fragmentShader: "metal-fragment",
        }
    )

    //Material 9: gold 2
    gold_rough = 0.4;
    gold_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: gold_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(gold_rough * 8)]}
            },
            vertexShader: "metal-vertex",
            fragmentShader: "metal-fragment",
        }
    )

    //Material 10: gold 3
    gold_rough = 0.7;
    gold_3 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: gold_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(gold_rough * 8)]}
            },
            vertexShader: "metal-vertex",
            fragmentShader: "metal-fragment",
        }
    )

    //Material 11: copper 1
    var copper_rough = 0.1;
    copper_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "roughness": {type: "f",  value: copper_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(copper_rough * 8)]}
            },
            vertexShader: "metal-vertex",
            fragmentShader: "metal-fragment",
        }
    )

    //Material 12: copper 2
    copper_rough = 0.4;
    copper_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "roughness": {type: "f",  value: copper_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(copper_rough * 8)]}
            },
            vertexShader: "metal-vertex",
            fragmentShader: "metal-fragment",
        }
    )

    //Material 13: copper 3
    copper_rough = 0.7;
    copper_3 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "roughness": {type: "f",  value: copper_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(copper_rough * 8)]}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment'
        }
    );
}