//Creates materials
var blueEmissive, redEmissive, greenEmissive, alluminium1, alluminium2, alluminium3, 
iron1, iron2, gold1, gold2, gold3, copper1, copper2, copper3, coilAll1, coilAll2, coilGold1, 
coilGold2, coilIron1, gridAll1, gridAll2, gridGold1, gridGold2, ringsCopp1, ringsGold1;

// Textures
var environmentMaps = new Array();

var todo = new Set([
    "emissive-vertex", 
    "emissive-fragment",
    "metal-vertex",
    "metal-fragment",
    "coil-vertex",
    "coil-fragment",
    "grid-vertex",
    "grid-fragment",
    "inner-rings-vertex",
    "inner-rings-fragment",
    "sky-vertex",
    "sky-fragment"
]);

var pointLightColor = new THREE.Vector3();
var envLightColor = new THREE.Vector3();

function InitMaterials()
{
    // Environment map loading
    LoadEnvMaps();

    // Light setup
    pointLightColor = new THREE.Vector3( dirLight.color.r * dirLight.intensity, 
                                         dirLight.color.g * dirLight.intensity, 
                                         dirLight.color.b * dirLight.intensity);
    envLightColor = new THREE.Vector3( hemiLight.color.r * hemiLight.intensity, 
                                       hemiLight.color.g * hemiLight.intensity, 
                                       hemiLight.color.b * hemiLight.intensity);
    
    // Init materials definitions
    InitCoil();
    InitEmissive();
    InitGrid();
    InitInnerRings();
    InitMetal();
    InitSkyBox();

    // Add material definitions to the materialVector
    materialVector.push(blueEmissive);  // 0
    materialVector.push(redEmissive);   // 1
    materialVector.push(greenEmissive); // 2
    materialVector.push(alluminium1);   // 3
    materialVector.push(alluminium2);   // 4
    materialVector.push(alluminium3);   // 5
    materialVector.push(iron1);         // 6
    materialVector.push(iron2);         // 7
    materialVector.push(gold1);         // 8
    materialVector.push(gold2);         // 9
    materialVector.push(gold3);         // 10
    materialVector.push(copper1);       // 11
    materialVector.push(copper2);       // 12
    materialVector.push(copper3);       // 13
    materialVector.push(coilAll1);      // 14
    materialVector.push(coilAll2);      // 15
    materialVector.push(coilGold1);     // 16
    materialVector.push(coilGold2);     // 17
    materialVector.push(coilIron1);     // 18
    materialVector.push(gridAll1);      // 19
    materialVector.push(gridAll2);      // 20
    materialVector.push(gridGold1);     // 21
    materialVector.push(gridGold2);     // 22
    materialVector.push(ringsCopp1);    // 23
    materialVector.push(ringsGold1);    // 24
    materialVector.push(skyMaterial);   // Sky map

    // Load glsl shaders from file
    LoadGlsl("../../shaders/coil/vertex.glsl");
    LoadGlsl("../../shaders/coil/fragment.glsl");
    LoadGlsl("../../shaders/emissive/vertex.glsl");
    LoadGlsl("../../shaders/emissive/fragment.glsl");
    LoadGlsl("../../shaders/grid/vertex.glsl");
    LoadGlsl("../../shaders/grid/fragment.glsl");
    LoadGlsl("../../shaders/inner-rings/vertex.glsl");
    LoadGlsl("../../shaders/inner-rings/fragment.glsl");
    LoadGlsl("../../shaders/metal/vertex.glsl");
    LoadGlsl("../../shaders/metal/fragment.glsl");
    LoadGlsl("../../shaders/skybox/vertex.glsl");
    LoadGlsl("../../shaders/skybox/fragment.glsl");
}


/*
* Load environment map
*/
function LoadEnvMaps()
{
    for(var i = 0; i <= 8; i++)
    {
        var filename = "../../assets/textures/envmap_mip" + String(i) + ".png";
        var thisTex = LoadTexture(filename);
        environmentMaps.push(thisTex);
    }
}


/*
* Load texture
*/
function LoadTexture(filename)
{
    var result = new THREE.TextureLoader().load(filename, function(texture)
    {
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
    });

    return result;
}