//Creates materia, 
var blueEmissive, redEmissive, greenEmissive, alluminium1, alluminium2, alluminium3, iron1, iron2, gold1, gold2, gold3, copper1, copper2, copper3, coilAll1, coilAll2, coilGold1, coilGold2, coilIron1, gridAll1, gridAll2, gridGold1, gridGold2, ringsCopp1, ringsGold1;

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
    LoadEnvMaps();
    pointLightColor = new THREE.Vector3(dirLight.color.r*dirLight.intensity, dirLight.color.g*dirLight.intensity, dirLight.color.b*dirLight.intensity);
    envLightColor = new THREE.Vector3(hemiLight.color.r*hemiLight.intensity, hemiLight.color.g*hemiLight.intensity, hemiLight.color.b*hemiLight.intensity);
    
    InitCoil();
    InitEmissive();
    InitGrid();
    InitInnerRings();
    InitMetal();
    InitSkyBox();

    materialVector.push(blueEmissive);  //0
    materialVector.push(redEmissive);   //1
    materialVector.push(greenEmissive); //2
    materialVector.push(alluminium1);   //3
    materialVector.push(alluminium2);   //4
    materialVector.push(alluminium3);   //5
    materialVector.push(iron1);         //6
    materialVector.push(iron2);         //7
    materialVector.push(gold1);         //8
    materialVector.push(gold2);         //9
    materialVector.push(gold3);         //10
    materialVector.push(copper1);       //11
    materialVector.push(copper2);       //12
    materialVector.push(copper3);       //13
    materialVector.push(coilAll1);     //14
    materialVector.push(coilAll2);     //15
    materialVector.push(coilGold1);    //16
    materialVector.push(coilGold2);    //17
    materialVector.push(coilIron1);    //18
    materialVector.push(gridAll1);     //19
    materialVector.push(gridAll2);     //20
    materialVector.push(gridGold1);    //21
    materialVector.push(gridGold2);    //22
    materialVector.push(ringsCopp1);   //23
    materialVector.push(ringsGold1);   //24
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

function LoadEnvMaps()
{
    for(var i = 0; i <= 8; i++)
    {
        var filename = "../../assets/textures/envmap_mip" + String(i) + ".png";
        var thisTex = LoadTexture(filename);
        environmentMaps.push(thisTex);
    }
}

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