//Creates material vector

function initMaterials()
{
    //Environment map loading
    loadEnvMaps();

    var pointLightColor = new THREE.Vector3(dirLight.color.r*dirLight.intensity, dirLight.color.g*dirLight.intensity, dirLight.color.b*dirLight.intensity);
    var envLightColor = new THREE.Vector3(hemiLight.color.r*hemiLight.intensity, hemiLight.color.g*hemiLight.intensity, hemiLight.color.b*hemiLight.intensity);

    //Material 0: blue emissive
    var blue_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(0.6, 0.8, 1.0)}},
            vertexShader:   emissive_mat_vert,
            fragmentShader: emissive_mat_frag
        }
    );
    
    //Material 1: red emissive
    var red_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(1.0, 0.8, 0.6)}},
            vertexShader:   emissive_mat_vert,
            fragmentShader: emissive_mat_frag
        }
    );

    //Material 2: green emissive
    var green_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(0.6, 1.0, 0.8)}},
            vertexShader:   emissive_mat_vert,
            fragmentShader: emissive_mat_frag
        }
    );

    //Material 3: alluminum 1
    var all_rough = 0.1;
    var alluminium_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: all_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(all_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )

    //Material 4: alluminum 2
    all_rough = 0.4;
    var alluminium_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: all_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(all_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )

    //Material 5: alluminum 3
    all_rough = 0.7;
    var alluminium_3 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: all_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(all_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )
    
    //Material 6: dark iron 1
    var iron_rough = 0.4;
    var iron_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.112, 0.113, 0.116)},
                "roughness": {type: "f",  value: iron_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(iron_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )

    //Material 7: dark iron 2
    iron_rough = 0.8;
    var iron_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.112, 0.113, 0.116)},
                "roughness": {type: "f",  value: iron_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(iron_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )

    //Material 8: gold 1
    var gold_rough = 0.1;
    var gold_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: gold_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(gold_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )

    //Material 9: gold 2
    gold_rough = 0.4;
    var gold_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: gold_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(gold_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )

    //Material 10: gold 3
    gold_rough = 0.7;
    var gold_3 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "roughness": {type: "f",  value: gold_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(gold_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )

    //Material 11: copper 1
    var copper_rough = 0.1;
    var copper_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "roughness": {type: "f",  value: copper_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(copper_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )

    //Material 12: copper 2
    copper_rough = 0.4;
    var copper_2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "roughness": {type: "f",  value: copper_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(copper_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )

    //Material 13: copper 3
    copper_rough = 0.7;
    var copper_3 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "roughness": {type: "f",  value: copper_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(copper_rough * 8)]}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag,
        }
    )

    //Material 14: coil alluminum 1
    var coil_rough = 0.1;
    var coil_r_map = loadTexture("assets/models/acc_coil/acc_coil_copper_RM.png");
    var coil_d_map = loadTexture("assets/models/acc_coil/acc_coil_copper_D.png");
    var coil_n_map = loadTexture("assets/models/acc_coil/acc_coil_copper_NM.png");
    var AO_map = loadTexture("assets/models/acc_coil/acc_coil_copper_AO.png");
    var coil_all_1 = new THREE.ShaderMaterial(
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
            vertexShader: coil_mat_vert,
            fragmentShader: coil_mat_frag,
            vertexColors: THREE.VertexColors
        }
    )

    //Material 15: coil alluminum 2
    coil_rough = 0.5;
    var coil_all_2 = new THREE.ShaderMaterial(
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
            vertexShader: coil_mat_vert,
            fragmentShader: coil_mat_frag,
            vertexColors: THREE.VertexColors
        }
    )

    //Material 16: coil gold 1
    coil_rough = 0.1;
    var coil_gold_1 = new THREE.ShaderMaterial(
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
            vertexShader: coil_mat_vert,
            fragmentShader: coil_mat_frag,
            vertexColors: THREE.VertexColors
        }
    )

    //Material 17: coil gold 2
    coil_rough = 0.5;
    var coil_gold_2 = new THREE.ShaderMaterial(
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
            vertexShader: coil_mat_vert,
            fragmentShader: coil_mat_frag,
            vertexColors: THREE.VertexColors
        }
    )
    
    //Material 18: coil dark iron 1
    coil_rough = 0.4;
    var coil_iron_1 = new THREE.ShaderMaterial(
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
            vertexShader: coil_mat_vert,
            fragmentShader: coil_mat_frag,
            vertexColors: THREE.VertexColors
        }
    )

    //Material 19: grid aluminum 1
    var grid_rough = 0.1;
    var grid_m_map = loadTexture("assets/models/grid/grid_alum_Metal.png");
    var grid_n_map = loadTexture("assets/models/grid/grid_alum_NM.png");
    var grid_AO_map = loadTexture("assets/models/grid/grid_alum_AO.png");
    var grid_all_1 = new THREE.ShaderMaterial(
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
            vertexShader: grid_mat_vert,
            fragmentShader: grid_mat_frag
        }
    )

    //Material 20: grid aluminum 2
    grid_rough = 0.4;
    var grid_all_2 = new THREE.ShaderMaterial(
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
            vertexShader: grid_mat_vert,
            fragmentShader: grid_mat_frag
        }
    )

    //Material 21: grid gold 1
    grid_rough = 0.1;
    var grid_gold_1 = new THREE.ShaderMaterial(
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
            vertexShader: grid_mat_vert,
            fragmentShader: grid_mat_frag
        }
    )

    //Material 22: grid gold 2
    grid_rough = 0.4;
    var grid_gold_2 = new THREE.ShaderMaterial(
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
            vertexShader: grid_mat_vert,
            fragmentShader: grid_mat_frag
        }
    )
    
    //Material 23: rings copper 1
    var rings_rough = 0.7;
    var rings_copp_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "inBaseColor": {type: "v3", value: new THREE.Vector3(0.955, 0.638, 0.538)},
                "inRoughness": {type: "f",  value: rings_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(all_rough * 8)]}
            },
            vertexShader: inner_rings_mat_vert,
            fragmentShader: inner_rings_mat_frag,
            vertexColors: THREE.VertexColors
        }
    )

    //Material 24: rings gold 1
    rings_rough = 0.7;
    var rings_gold_1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "inBaseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "inRoughness": {type: "f",  value: rings_rough},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(all_rough * 8)]}
            },
            vertexShader: inner_rings_mat_vert,
            fragmentShader: inner_rings_mat_frag,
            vertexColors: THREE.VertexColors
        }
    )

    materialVector.push(blue_emissive);  //0
    materialVector.push(red_emissive);   //1
    materialVector.push(green_emissive); //2
    materialVector.push(alluminium_1);   //3
    materialVector.push(alluminium_2);   //4
    materialVector.push(alluminium_3);   //5
    materialVector.push(iron_1);         //6
    materialVector.push(iron_2);         //7
    materialVector.push(gold_1);         //8
    materialVector.push(gold_2);         //9
    materialVector.push(gold_3);         //10
    materialVector.push(copper_1);       //11
    materialVector.push(copper_2);       //12
    materialVector.push(copper_3);       //13
    materialVector.push(coil_all_1);     //14
    materialVector.push(coil_all_2);     //15
    materialVector.push(coil_gold_1);    //16
    materialVector.push(coil_gold_2);    //17
    materialVector.push(coil_iron_1);    //18
    materialVector.push(grid_all_1);     //19
    materialVector.push(grid_all_2);     //20
    materialVector.push(grid_gold_1);    //21
    materialVector.push(grid_gold_2);    //22
    materialVector.push(rings_copp_1);   //23
    materialVector.push(rings_gold_1);   //24
}

function loadEnvMaps()
{
    for(var i = 0; i <= 8; i++)
    {
        var filename = "assets/textures/envmap_mip" + String(i) + ".png";
        var thisTex = loadTexture(filename);
        environmentMaps.push(thisTex);
    }
}

function loadTexture(filename)
{
    var result = new THREE.TextureLoader().load(filename, function(texture)
    {
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
    });

    return result;
}