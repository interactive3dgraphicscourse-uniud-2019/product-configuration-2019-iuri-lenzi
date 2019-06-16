function initCoil(){
    //Material 14: coil alluminum 1
    var coil_rough = 0.1;
    var coil_r_map = loadTexture("../../assets/models/acc_coil/acc_coil_copper_RM.png");
    var coil_d_map = loadTexture("../../assets/models/acc_coil/acc_coil_copper_D.png");
    var coil_n_map = loadTexture("../../assets/models/acc_coil/acc_coil_copper_NM.png");
    var AO_map = loadTexture("../../assets/models/acc_coil/acc_coil_copper_AO.png");
    coil_all_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "frameBaseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "frameRoughness": {type: "f",  value: coil_rough},
                "coilBaseColor": {type: "t", value: coil_d_map},
                "coilRoughness": {type: "t", value: coil_r_map},
                "coilNormalMap": {type: "t", value: coil_n_map},
                "AOMap": {type: "t", value: AO_map},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(coil_rough * 8)]}
            },
            vertexShader: 'coil-vertex',
            fragmentShader: 'coil-fragment',
            vertexColors: THREE.VertexColors
        }
    )

    //Material 15: coil alluminum 2
    coil_rough = 0.5;
    coil_all_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "frameBaseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "frameRoughness": {type: "f",  value: coil_rough},
                "coilBaseColor": {type: "t", value: coil_d_map},
                "coilRoughness": {type: "t", value: coil_r_map},
                "coilNormalMap": {type: "t", value: coil_n_map},
                "AOMap": {type: "t", value: AO_map},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(coil_rough * 8)]}
            },
            vertexShader: 'coil-vertex',
            fragmentShader: 'coil-fragment',
            vertexColors: THREE.VertexColors
        }
    )

    //Material 16: coil gold 1
    coil_rough = 0.1;
    coil_gold_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "frameBaseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "frameRoughness": {type: "f",  value: coil_rough},
                "coilBaseColor": {type: "t", value: coil_d_map},
                "coilRoughness": {type: "t", value: coil_r_map},
                "coilNormalMap": {type: "t", value: coil_n_map},
                "AOMap": {type: "t", value: AO_map},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(coil_rough * 8)]}
            },
            vertexShader: 'coil-vertex',
            fragmentShader: 'coil-fragment',
            vertexColors: THREE.VertexColors
        }
    )

    //Material 17: coil gold 2
    coil_rough = 0.5;
    coil_gold_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "frameBaseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "frameRoughness": {type: "f",  value: coil_rough},
                "coilBaseColor": {type: "t", value: coil_d_map},
                "coilRoughness": {type: "t", value: coil_r_map},
                "coilNormalMap": {type: "t", value: coil_n_map},
                "AOMap": {type: "t", value: AO_map},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(coil_rough * 8)]}
            },
            vertexShader: 'coil-vertex',
            fragmentShader: 'coil-fragment',
            vertexColors: THREE.VertexColors
        }
    )

    //Material 18: coil dark iron 1
    coil_rough = 0.4;
    coil_iron_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "frameBaseColor": {type: "v3", value: new THREE.Vector3(0.112, 0.113, 0.116)},
                "frameRoughness": {type: "f",  value: coil_rough},
                "coilBaseColor": {type: "t", value: coil_d_map},
                "coilRoughness": {type: "t", value: coil_r_map},
                "coilNormalMap": {type: "t", value: coil_n_map},
                "AOMap": {type: "t", value: AO_map},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(coil_rough * 8)]}
            },
            vertexShader: 'coil-vertex',
            fragmentShader: 'coil-fragment',
            vertexColors: THREE.VertexColors
        }
    )
}