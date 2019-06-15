//Creates material vector

var todo = new Set([
    "emissive-vertex", 
    "emissive-fragment",
    "metal-vertex",
    "metal-fragment"]);

function initMaterials()
{
    var pointLightColor = new THREE.Vector3(dirLight.color.r*dirLight.intensity, dirLight.color.g*dirLight.intensity, dirLight.color.b*dirLight.intensity);
    var envLightColor = new THREE.Vector3(hemiLight.color.r*hemiLight.intensity, hemiLight.color.g*hemiLight.intensity, hemiLight.color.b*hemiLight.intensity);

    var blue_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(0.4, 0.7, 1.0)}},
            vertexShader:   'emissive-vertex',
            fragmentShader: 'emissive-fragment'
        }
    );

    var red_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(0.1, 0.7, 0.4)}},
            vertexShader:   'emissive-vertex',
            fragmentShader: 'emissive-fragment'
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
            vertexShader: 'metal-vertex',
            fragmentShader: 'metal-fragment'
        }
    )

    materialVector.push(blue_emissive);
    materialVector.push(alluminium);
    materialVector.push(red_emissive);
    loadGlsl("../../shaders/emissive/vertex.glsl");
    loadGlsl("../../shaders/emissive/fragment.glsl");
    loadGlsl("../../shaders/metal/vertex.glsl");
    loadGlsl("../../shaders/metal/fragment.glsl");
}