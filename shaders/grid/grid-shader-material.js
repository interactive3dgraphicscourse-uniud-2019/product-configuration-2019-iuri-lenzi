function initGrid(){
    //Material 19: grid aluminum 1
    var grid_rough = 0.1;
    var grid_m_map = loadTexture("../../assets/models/grid/grid_alum_Metal.png");
    var grid_n_map = loadTexture("../../assets/models/grid/grid_alum_NM.png");
    var grid_AO_map = loadTexture("../../assets/models/grid/grid_alum_AO.png");
    grid_all_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: grid_rough},
                "normalMap": {type: "t", value: grid_n_map},
                "metalMap": {type: "t", value: grid_m_map},
                "AOMap": {type: "t", value: grid_AO_map},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(grid_rough * 8)]}
            },
            vertexShader: 'grid-vertex',
            fragmentShader: 'grid-fragment'
        }
    )

    //Material 20: grid aluminum 2
    grid_rough = 0.4;
    grid_all_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: grid_rough},
                "normalMap": {type: "t", value: grid_n_map},
                "metalMap": {type: "t", value: grid_m_map},
                "AOMap": {type: "t", value: grid_AO_map},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(grid_rough * 8)]}
            },
            vertexShader: 'grid-vertex',
            fragmentShader: 'grid-fragment'
        }
    )

    //Material 21: grid gold 1
    grid_rough = 0.1;
    grid_gold_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: grid_rough},
                "normalMap": {type: "t", value: grid_n_map},
                "metalMap": {type: "t", value: grid_m_map},
                "AOMap": {type: "t", value: grid_AO_map},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(grid_rough * 8)]}
            },
            vertexShader: 'grid-vertex',
            fragmentShader: 'grid-fragment'
        }
    )

    //Material 22: grid gold 2
    grid_rough = 0.4;
    grid_gold_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: grid_rough},
                "normalMap": {type: "t", value: grid_n_map},
                "metalMap": {type: "t", value: grid_m_map},
                "AOMap": {type: "t", value: grid_AO_map},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(grid_rough * 8)]}
            },
            vertexShader: 'grid-vertex',
            fragmentShader: 'grid-fragment'
        }
    )
}