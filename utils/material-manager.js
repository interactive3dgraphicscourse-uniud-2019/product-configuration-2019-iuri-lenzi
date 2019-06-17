//Creates materia, 
var blue_emissive, red_emissive, green_emissive, alluminium_1, alluminium_2, alluminium_3, iron_1, iron_2, gold_1, gold_2, gold_3, copper_1, copper_2, copper_3, coilAll1, coilAll2, coilGold1, coilGold2, coilIron1, grid_all_1, grid_all_2, grid_gold_1, grid_gold_2, rings_copp_1, rings_gold_1

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

function initMaterials()
{
    //Environment map loading
    loadEnvMaps();
    pointLightColor = new THREE.Vector3(dirLight.color.r*dirLight.intensity, dirLight.color.g*dirLight.intensity, dirLight.color.b*dirLight.intensity);
    envLightColor = new THREE.Vector3(hemiLight.color.r*hemiLight.intensity, hemiLight.color.g*hemiLight.intensity, hemiLight.color.b*hemiLight.intensity);
    
    InitCoil();
    initEmissive();
    initGrid();
    initInnerRings();
    initMetal();
    initSkyBox();

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
    materialVector.push(coilAll1);     //14
    materialVector.push(coilAll2);     //15
    materialVector.push(coilGold1);    //16
    materialVector.push(coilGold2);    //17
    materialVector.push(coilIron1);    //18
    materialVector.push(grid_all_1);     //19
    materialVector.push(grid_all_2);     //20
    materialVector.push(grid_gold_1);    //21
    materialVector.push(grid_gold_2);    //22
    materialVector.push(rings_copp_1);   //23
    materialVector.push(rings_gold_1);   //24
    materialVector.push(skyMaterial);

    loadGlsl("../../shaders/coil/vertex.glsl");
    loadGlsl("../../shaders/coil/fragment.glsl");
    loadGlsl("../../shaders/emissive/vertex.glsl");
    loadGlsl("../../shaders/emissive/fragment.glsl");
    loadGlsl("../../shaders/grid/vertex.glsl");
    loadGlsl("../../shaders/grid/fragment.glsl");
    loadGlsl("../../shaders/inner-rings/vertex.glsl");
    loadGlsl("../../shaders/inner-rings/fragment.glsl");
    loadGlsl("../../shaders/metal/vertex.glsl");
    loadGlsl("../../shaders/metal/fragment.glsl");
    loadGlsl("../../shaders/skybox/vertex.glsl");
    loadGlsl("../../shaders/skybox/fragment.glsl");
}

function loadEnvMaps()
{
    for(var i = 0; i <= 8; i++)
    {
        var filename = "../../assets/textures/envmap_mip" + String(i) + ".png";
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