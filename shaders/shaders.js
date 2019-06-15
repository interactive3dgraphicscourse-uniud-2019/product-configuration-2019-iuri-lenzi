var emissive_mat_vert = `
void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

var emissive_mat_frag = `
uniform vec3 emissiveColor;

void main()
{
    vec3 radiance = pow(emissiveColor, vec3(1.0/2.2));
    gl_FragColor = vec4(radiance, 1.0);
}
`

var metal_mat_vert = `
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main()
{
    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = viewPos.xyz;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * viewPos;
}
`

var metal_mat_frag = `
#define EPS 0.000001

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
uniform vec3 baseColor;
uniform float roughness;
uniform vec3 pointLightWorldPosition;
uniform vec3 pointLightColor;
uniform vec3 envLightColor;
uniform sampler2D envMap;

vec3 FSchlick(float lDoth) {
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

    //Direct light calculation
    vec3 l = normalize(pointLightViewPosition.xyz - vViewPosition.xyz);
    vec3 v = normalize(-vViewPosition);
    vec3 h = normalize(l + v);
    vec3 n = normalize(vNormal);
    float sqRoughness = roughness*roughness;
    vec3 directLightRadiance = pointLightColor * max(dot(n, l), EPS) * (FSchlick( max(dot(l, h), EPS)) * GSmith(max(dot(n, v), EPS), max(dot(n, l), EPS), sqRoughness) * DGGX(max(dot(n, h), EPS), sqRoughness)) / 4.0;

    //Indirect light calculation
    vec3 worldV = vWorldPosition - cameraPosition;
    vec3 worldN = InverseTransformDirection( n, viewMatrix );
    vec3 r = normalize(reflect(worldV, worldN));
    float den = 2.0 * sqrt(pow(r.x, 2.0) + pow(r.y, 2.0) + pow(r.z + 1.0, 2.0));
    vec2 envUV = (r.xy / den) + 0.5;
    vec3 F = FSchlick(max(dot(n, v), EPS));
    int envLOD = int(floor(roughness * 8.0));
    vec3 refEnvColor = texture2D(envMap, envUV).rgb * F;
    vec3 indirLightRadiance = envLightColor * baseColor + refEnvColor;

    vec3 radiance = directLightRadiance + indirLightRadiance;
    gl_FragColor = vec4(pow(radiance, vec3(1.0/2.2)), 1.0);
}
`

var coil_mat_vert = `
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying vec3 vColor;

void main()
{
    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = viewPos.xyz;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalMatrix * normal;
    vUV = uv;
    vColor = color;
    gl_Position = projectionMatrix * viewPos;
}
`
var coil_mat_frag = `
#define EPS 0.000001

varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying vec3 vColor;

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
    vec3 n = normalize(vNormal);
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
        int envLOD = int(floor(roughness * 8.0));
        refEnvColor = texture2D(envMap, envUV).rgb * F;
    }
    vec3 indirLightRadiance = envLightColor * baseColor * texture2D(AOMap, vUV).rgb + refEnvColor;

    vec3 radiance = directLightRadiance + indirLightRadiance;
    gl_FragColor = vec4(pow(radiance, vec3(1.0/2.2)), 1.0);
}
`