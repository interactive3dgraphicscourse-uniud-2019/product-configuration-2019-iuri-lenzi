function initEmissive(){    
    //Material 0: blue emissive
    blue_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(0.6, 0.8, 1.0)}},
            vertexShader:   'emissive-vertex',
            fragmentShader: 'emissive-fragment'
        }
    );
    
    //Material 1: red emissive
    red_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(1.0, 0.8, 0.6)}},
            vertexShader:   'emissive-vertex',
            fragmentShader: 'emissive-fragment'
        }
    );

    //Material 2: green emissive
    green_emissive = new THREE.ShaderMaterial(
        {
            uniforms: {"emissiveColor": {type: "v3", value: new THREE.Vector3(0.6, 1.0, 0.8)}},
            vertexShader:   'emissive-vertex',
            fragmentShader: 'emissive-fragment'
        }
    );
}