/*
* Metal shader material defition
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitMetal(){
    //Material 3: alluminum 1
    var allRough = 0.1;
    alluminium1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: allRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(allRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )

    //Material 4: alluminum 2
    allRough = 0.4;
    alluminium2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: allRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(allRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )

    //Material 5: alluminum 3
    allRough = 0.7;
    alluminium3 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: allRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(allRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )
    
    //Material 6: dark iron 1
    var ironRough = 0.4;
    iron1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.112, 0.113, 0.116)},
                "roughness": {type: "f",  value: ironRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(ironRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )

    //Material 7: dark iron 2
    ironRough = 0.8;
    iron2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.112, 0.113, 0.116)},
                "roughness": {type: "f",  value: ironRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(ironRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )

    //Material 8: gold 1
    var goldRough = 0.1;
    gold1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: goldRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(goldRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )

    //Material 9: gold 2
    goldRough = 0.4;
    gold2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: goldRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(goldRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )

    //Material 10: gold 3
    goldRough = 0.7;
    gold3 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: goldRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(goldRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )

    //Material 11: copper 1
    var copperRough = 0.1;
    copper1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "roughness": {type: "f",  value: copperRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(copperRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )

    //Material 12: copper 2
    copperRough = 0.4;
    copper2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "roughness": {type: "f",  value: copperRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(copperRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment',
        }
    )

    //Material 13: copper 3
    copperRough = 0.7;
    copper3 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "roughness": {type: "f",  value: copperRough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(copperRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment'
        }
    );
}