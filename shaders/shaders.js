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

void main()
{
    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = viewPos.xyz;
    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * viewPos;
}
`

var metal_mat_frag = `
#define EPS 0.000001

varying vec3 vNormal;
varying vec3 vViewPosition;
uniform vec3 baseColor;
uniform float roughness;
uniform vec3 pointLightWorldPosition;
uniform vec3 pointLightColor;
uniform vec3 envLightColor;

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

void main()
{
    vec4 pointLightViewPosition = viewMatrix * vec4(pointLightWorldPosition, 1.0);

    vec3 l = normalize(pointLightViewPosition.xyz - vViewPosition.xyz);
    vec3 v = normalize(-vViewPosition);
    vec3 h = normalize(l + v);
    vec3 n = normalize(vNormal);

    float sqRoughness = roughness*roughness;
    vec3 directLightRadiance = pointLightColor * max(dot(n, l), EPS) * (FSchlick( max(dot(l, h), EPS)) * GSmith(max(dot(n, v), EPS), max(dot(n, l), EPS), sqRoughness) * DGGX(max(dot(n, h), EPS), sqRoughness)) / 4.0;
    vec3 indirLightRadiance = envLightColor * baseColor;
    vec3 radiance = directLightRadiance + indirLightRadiance;
    gl_FragColor = vec4(pow(radiance, vec3(1.0/2.2)), 1.0);
}
`