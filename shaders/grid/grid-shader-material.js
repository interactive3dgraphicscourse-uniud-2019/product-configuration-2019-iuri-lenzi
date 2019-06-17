/*
* Grid shader material defition
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitGrid(){
    //Material 19: grid aluminum 1
    var gridRough = 0.1;
    var gridMMap = LoadTexture("../../assets/models/grid/grid_alum_Metal.png");
    var gridNMap = LoadTexture("../../assets/models/grid/grid_alum_NM.png");
    var gridAOMap = LoadTexture("../../assets/models/grid/grid_alum_AO.png");
    gridAll1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: gridRough},
                "normalMap": {type: "t", value: gridNMap},
                "metalMap": {type: "t", value: gridMMap},
                "AOMap": {type: "t", value: gridAOMap},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(gridRough * 8)]}
            },
            vertexShader: 'grid-vertex',
            fragmentShader: 'grid-fragment'
        }
    )

    //Material 20: grid aluminum 2
    gridRough = 0.4;
    gridAll2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: gridRough},
                "normalMap": {type: "t", value: gridNMap},
                "metalMap": {type: "t", value: gridMMap},
                "AOMap": {type: "t", value: gridAOMap},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(gridRough * 8)]}
            },
            vertexShader: 'grid-vertex',
            fragmentShader: 'grid-fragment'
        }
    )

    //Material 21: grid gold 1
    gridRough = 0.1;
    gridGold1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: gridRough},
                "normalMap": {type: "t", value: gridNMap},
                "metalMap": {type: "t", value: gridMMap},
                "AOMap": {type: "t", value: gridAOMap},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(gridRough * 8)]}
            },
            vertexShader: 'grid-vertex',
            fragmentShader: 'grid-fragment'
        }
    )

    //Material 22: grid gold 2
    gridRough = 0.4;
    gridGold2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: gridRough},
                "normalMap": {type: "t", value: gridNMap},
                "metalMap": {type: "t", value: gridMMap},
                "AOMap": {type: "t", value: gridAOMap},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(gridRough * 8)]}
            },
            vertexShader: 'grid-vertex',
            fragmentShader: 'grid-fragment'
        }
    )
}