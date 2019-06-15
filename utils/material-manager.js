//Creates material vector

function initMaterials()
{
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

    var alluminium = new THREE.ShaderMaterial(
        {
            uniforms: {
                "baseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "roughness": {type: "f",  value: 0.5},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor}
            },
            vertexShader: metal_mat_vert,
            fragmentShader: metal_mat_frag
        }
    )

    materialVector.push(blue_emissive);
    materialVector.push(red_emissive);
    materialVector.push(alluminium);
}