//Creates material vector

function initMaterials()
{
    //Environment map loading
    loadEnvMaps();

    var pointLightColor = new THREE.Vector3(dirLight.color.r*dirLight.intensity, dirLight.color.g*dirLight.intensity, dirLight.color.b*dirLight.intensity);
    var envLightColor = new THREE.Vector3(hemiLight.color.r*hemiLight.intensity, hemiLight.color.g*hemiLight.intensity, hemiLight.color.b*hemiLight.intensity);

    var blue_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(0.4, 0.7, 1.0)}},
            vertexShader:   emissive_mat_vert,
            fragmentShader: emissive_mat_frag
        }
    );

    var red_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(0.1, 0.7, 0.4)}},
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
    
    var iron_rough = 0.7;
    var iron = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.562, 0.565, 0.578)},
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

    materialVector.push(blue_emissive);
    materialVector.push(red_emissive);
    materialVector.push(alluminium);
    materialVector.push(iron);
    materialVector.push(coil_all_mat);
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
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
    });

    return result;
}