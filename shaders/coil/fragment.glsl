//coil-fragment
#define EPS 0.000001

varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying vec3 vColor;
varying vec3 vTangent;
varying vec3 vBitangent;

uniform vec3 frameBaseColor;
uniform float frameRoughness;
uniform sampler2D coilBaseColor;
uniform sampler2D coilRoughness;
uniform sampler2D coilNormalMap;
uniform sampler2D AOMap;
uniform vec3 pointLightWorldPosition;
uniform vec3 pointLightColor;
uniform vec3 envLightColor;
uniform sampler2D envMap;

vec3 FSchlick(float lDoth, vec3 baseColor) {
    return (baseColor + (vec3(1.0)-baseColor)*pow(1.0 - lDoth,5.0));
}

float DGGX(float nDoth, float alpha) {
    float alpha2 = alpha*alpha;
    float d = nDoth*nDoth*(alpha2-1.0)+1.0;
    return (  alpha2 / (d*d));
}

float G1(float dotProduct, float k) {
    return (1.0 / (dotProduct*(1.0-k) + k) );
}

float GSmith(float nDotv, float nDotl, float k) {
        return G1(nDotl,k)*G1(nDotv,k);
}

vec3 InverseTransformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}

void main()
{
    vec4 pointLightViewPosition = viewMatrix * vec4(pointLightWorldPosition, 1.0);

    float roughness;
    vec3 baseColor;
    if(vColor == vec3(0.0, 1.0, 0.0))
    {
        roughness = frameRoughness;
        baseColor = frameBaseColor;
    }
    else
    {
        roughness = texture2D(coilRoughness, vUV).r;
        baseColor = texture2D(coilBaseColor, vUV).rgb;
    }

    //Direct light calculation
    vec3 l = normalize(pointLightViewPosition.xyz - vViewPosition.xyz);
    vec3 v = normalize(-vViewPosition);
    vec3 h = normalize(l + v);
    vec3 normal = normalize(vNormal);
    vec3 tang = normalize(vTangent);
    vec3 bitang = normalize(vBitangent);
    mat3 vTBN = mat3( tang, bitang, normal );
	vec3 mapN = texture2D( coilNormalMap, vUV ).xyz * 2.0 - 1.0;
    vec3 n = normalize(vTBN * mapN);
    float sqRoughness = roughness*roughness;
    vec3 directLightRadiance = pointLightColor * max(dot(n, l), EPS) * (FSchlick( max(dot(l, h), EPS), baseColor) * GSmith(max(dot(n, v), EPS), max(dot(n, l), EPS), sqRoughness) * DGGX(max(dot(n, h), EPS), sqRoughness)) / 4.0;

    //Indirect light calculation
    vec3 refEnvColor = vec3(0.0, 0.0, 0.0);
    if(vColor == vec3(0.0, 1.0, 0.0))
    {
        vec3 worldV = vWorldPosition - cameraPosition;
        vec3 worldN = InverseTransformDirection( n, viewMatrix );
        vec3 r = normalize(reflect(worldV, worldN));
        float den = 2.0 * sqrt(pow(r.x, 2.0) + pow(r.y, 2.0) + pow(r.z + 1.0, 2.0));
        vec2 envUV = (r.xy / den) + 0.5;
        vec3 F = FSchlick(max(dot(n, v), EPS), baseColor);
        refEnvColor = texture2D(envMap, envUV).rgb * F;
    }
    vec3 indirLightRadiance = envLightColor * baseColor * texture2D(AOMap, vUV).rgb + refEnvColor;

    vec3 radiance = directLightRadiance + indirLightRadiance;
    gl_FragColor = vec4(pow(radiance, vec3(1.0/2.2)), 1.0);
}