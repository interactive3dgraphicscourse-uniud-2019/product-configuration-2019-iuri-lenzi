//Creates material vector

function initMaterials()
{
    var emissive_mat = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(0.4, 0.7, 1.0)}},
            vertexShader:   emissive_mat_vert,
            fragmentShader: emissive_mat_frag
        }
    );

    materialVector.push(emissive_mat);
}