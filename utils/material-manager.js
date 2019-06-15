//Creates material vector

function initMaterials()
{
    //Environment map loading
    loadEnvMaps();

    var pointLightColor = new THREE.Vector3(dirLight.color.r*dirLight.intensity, dirLight.color.g*dirLight.intensity, dirLight.color.b*dirLight.intensity);
    var envLightColor = new THREE.Vector3(hemiLight.color.r*hemiLight.intensity, hemiLight.color.g*hemiLight.intensity, hemiLight.color.b*hemiLight.intensity);

    var blue_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(0.6, 0.8, 1.0)}},
            vertexShader:   emissive_mat_vert,
            fragmentShader: emissive_mat_frag
        }
    );

    var red_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(1.0, 0.7, 0.4)}},
            vertexShader:   emissive_mat_vert,
            fragmentShader: emissive_mat_frag
        }
    );

    var all_rough = 0.3;
    var alluminium = new THREE.ShaderMaterial(
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
    
    var iron_rough = 0.5;
    var iron = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.1, 0.1, 0.1)},
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

    var coil_rough = 0.1;
    var coil_r_map = loadTexture("assets/models/acc_coil/acc_coil_copper_RM.png");
    var coil_d_map = loadTexture("assets/models/acc_coil/acc_coil_copper_D.png");
    var coil_n_map = loadTexture("assets/models/acc_coil/acc_coil_copper_NM.png");
    var AO_map = loadTexture("assets/models/acc_coil/acc_coil_copper_AO.png")
    var coil_all_mat = new THREE.ShaderMaterial(
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
    
    var grid_rough = 0.5;
    var grid_m_map = loadTexture("assets/models/grid/grid_alum_Metal.png");
    var grid_n_map = loadTexture("assets/models/grid/grid_alum_NM.png");
    var grid_AO_map = loadTexture("assets/models/grid/grid_alum_AO.png");
    var grid_all_mat = new THREE.ShaderMaterial(
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
    
    var rings_rough = 0.7;
    var rings_copp_mat = new THREE.ShaderMaterial(
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

    materialVector.push(blue_emissive); //0
    materialVector.push(red_emissive);  //1
    materialVector.push(alluminium);    //2
    materialVector.push(iron);          //3
    materialVector.push(coil_all_mat);  //4
    materialVector.push(grid_all_mat);  //5
    materialVector.push(rings_copp_mat) //6
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